import { describe, expect, it, vi } from "vitest";
import { handleLead, MAX_BODY_CHARS, type LeadDeps, type LeadEnv } from "@/lib/lead";

const VALID = JSON.stringify({
  source: "contact",
  name: "Sam",
  email: "sam@example.com",
  message: "Automate my lead follow-up",
  turnstileToken: "token",
});

const PROD_ENV: LeadEnv = {
  isProduction: true,
  webhookUrl: "https://n8n.example.com/webhook/lead",
  webhookSecret: "s3cret",
  turnstileSecret: "ts-secret",
};

function jsonResponse(body: unknown, ok = true) {
  return { ok, json: async () => body } as Response;
}

function makeDeps(overrides: Partial<LeadDeps> = {}): LeadDeps {
  const fetchFn = vi.fn(async (url: string | URL | Request) =>
    String(url).includes("turnstile") ? jsonResponse({ success: true }) : jsonResponse({}),
  ) as unknown as typeof fetch;

  return { env: PROD_ENV, ip: "1.2.3.4", allowRequest: () => true, fetchFn, ...overrides };
}

describe("handleLead", () => {
  it("forwards a valid lead to n8n with the secret header", async () => {
    const deps = makeDeps();
    const result = await handleLead(VALID, deps);

    expect(result).toEqual({ status: 200, body: { success: true, error: null } });
    const calls = vi.mocked(deps.fetchFn).mock.calls;
    const [url, init] = calls[1];
    expect(url).toBe(PROD_ENV.webhookUrl);
    expect((init?.headers as Record<string, string>)["X-Webhook-Secret"]).toBe("s3cret");

    const forwarded = JSON.parse(String(init?.body));
    expect(forwarded.email).toBe("sam@example.com");
    expect(forwarded).not.toHaveProperty("turnstileToken");
    expect(forwarded).toHaveProperty("receivedAt");
  });

  it("returns 429 when the rate limit is hit", async () => {
    const result = await handleLead(VALID, makeDeps({ allowRequest: () => false }));
    expect(result.status).toBe(429);
  });

  it("returns 413 for oversized bodies", async () => {
    const result = await handleLead("x".repeat(MAX_BODY_CHARS + 1), makeDeps());
    expect(result.status).toBe(413);
  });

  it("returns 400 for malformed JSON", async () => {
    const result = await handleLead("{not json", makeDeps());
    expect(result.status).toBe(400);
  });

  it("returns 400 with a field message for invalid input", async () => {
    const result = await handleLead(JSON.stringify({ source: "contact", email: "bad" }), makeDeps());
    expect(result.status).toBe(400);
    expect(result.body.error).toMatch(/email/i);
  });

  it("silently accepts honeypot submissions without forwarding", async () => {
    const deps = makeDeps();
    const body = JSON.stringify({ ...JSON.parse(VALID), company: "Bot Inc" });
    const result = await handleLead(body, deps);

    expect(result.status).toBe(200);
    expect(deps.fetchFn).not.toHaveBeenCalled();
  });

  it("returns 403 when Turnstile verification fails", async () => {
    const fetchFn = vi.fn(async () => jsonResponse({ success: false })) as unknown as typeof fetch;
    const result = await handleLead(VALID, makeDeps({ fetchFn }));
    expect(result.status).toBe(403);
  });

  it("fails closed in production when Turnstile is not configured", async () => {
    const env = { ...PROD_ENV, turnstileSecret: undefined };
    const result = await handleLead(VALID, makeDeps({ env }));
    expect(result.status).toBe(403);
  });

  it("returns 502 in production when the webhook is not configured", async () => {
    const env = { ...PROD_ENV, webhookUrl: undefined };
    const result = await handleLead(VALID, makeDeps({ env }));
    expect(result.status).toBe(502);
  });

  it("returns 502 when n8n rejects the lead", async () => {
    const fetchFn = vi.fn(async (url: string | URL | Request) =>
      String(url).includes("turnstile") ? jsonResponse({ success: true }) : jsonResponse({}, false),
    ) as unknown as typeof fetch;
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await handleLead(VALID, makeDeps({ fetchFn }));
    expect(result.status).toBe(502);
  });

  it("returns 500 when the network throws", async () => {
    const fetchFn = vi.fn(async () => {
      throw new Error("network down");
    }) as unknown as typeof fetch;
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await handleLead(VALID, makeDeps({ fetchFn }));
    expect(result.status).toBe(500);
  });

  it("accepts leads in development without Turnstile or webhook config", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const env: LeadEnv = { isProduction: false };
    const deps = makeDeps({ env });

    const result = await handleLead(VALID, deps);
    expect(result.status).toBe(200);
    expect(deps.fetchFn).not.toHaveBeenCalled();
  });
});
