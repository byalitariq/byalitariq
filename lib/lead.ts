import { leadRequestSchema, type LeadRequest } from "@/lib/schemas";

type ErrorStatus = 400 | 403 | 413 | 429 | 500 | 502;

export type LeadResult =
  | { status: 200; body: { success: true; error: null } }
  | { status: ErrorStatus; body: { success: false; error: string } };

export type LeadEnv = {
  isProduction: boolean;
  webhookUrl?: string;
  webhookSecret?: string;
  turnstileSecret?: string;
};

export type LeadDeps = {
  env: LeadEnv;
  ip: string;
  allowRequest: (key: string) => boolean;
  fetchFn: typeof fetch;
};

export const MAX_BODY_CHARS = 10_000;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SERVER_ERROR = "Something went wrong on my side. Please email me directly.";

const ok = (): LeadResult => ({ status: 200, body: { success: true, error: null } });
const fail = (status: ErrorStatus, error: string): LeadResult => ({
  status,
  body: { success: false, error },
});

async function verifyTurnstile(token: string | undefined, deps: LeadDeps): Promise<boolean> {
  const secret = deps.env.turnstileSecret;
  if (!secret) return !deps.env.isProduction; // Dev convenience only; production fails closed.
  if (!token) return false;

  const form = new URLSearchParams({ secret, response: token, remoteip: deps.ip });
  const res = await deps.fetchFn(TURNSTILE_VERIFY_URL, { method: "POST", body: form });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function forwardToWebhook(lead: LeadRequest, deps: LeadDeps): Promise<boolean> {
  const { webhookUrl, webhookSecret, isProduction } = deps.env;
  if (!webhookUrl || !webhookSecret) {
    if (isProduction) return false;
    console.warn("[lead] n8n webhook not configured; lead accepted but not forwarded (dev only).");
    return true;
  }

  // Strip spam-check fields before the lead leaves the server.
  const { turnstileToken, company, ...clean } = lead;
  void turnstileToken;
  void company;

  const res = await deps.fetchFn(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Webhook-Secret": webhookSecret },
    body: JSON.stringify({ ...clean, receivedAt: new Date().toISOString() }),
  });
  return res.ok;
}

// Core of POST /api/lead. Side effects are injected so it can be unit tested.
export async function handleLead(rawBody: string, deps: LeadDeps): Promise<LeadResult> {
  if (rawBody.length > MAX_BODY_CHARS) return fail(413, "Request too large.");
  if (!deps.allowRequest(deps.ip)) return fail(429, "Too many requests. Please try again in a minute.");

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return fail(400, "Invalid request.");
  }

  const parsed = leadRequestSchema.safeParse(json);
  if (!parsed.success) {
    return fail(400, parsed.error.issues[0]?.message ?? "Please check the form and try again.");
  }

  // Bots that fill the honeypot get a fake success so they don't retry.
  if (parsed.data.company) return ok();

  try {
    if (!(await verifyTurnstile(parsed.data.turnstileToken, deps))) {
      return fail(403, "Spam check failed. Please refresh and try again.");
    }
    if (!(await forwardToWebhook(parsed.data, deps))) {
      console.error("[lead] Webhook forwarding failed", { source: parsed.data.source });
      return fail(502, SERVER_ERROR);
    }
  } catch (error) {
    console.error("[lead] Unexpected error", error);
    return fail(500, SERVER_ERROR);
  }

  return ok();
}
