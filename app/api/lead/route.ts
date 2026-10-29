import { handleLead } from "@/lib/lead";
import { createRateLimiter } from "@/lib/rate-limit";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const allowRequest = createRateLimiter(RATE_LIMIT, RATE_WINDOW_MS);

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const result = await handleLead(await request.text(), {
    ip: clientIp(request),
    allowRequest,
    fetchFn: fetch,
    env: {
      isProduction: process.env.NODE_ENV === "production",
      webhookUrl: process.env.N8N_LEAD_WEBHOOK_URL,
      webhookSecret: process.env.N8N_WEBHOOK_SECRET,
      turnstileSecret: process.env.TURNSTILE_SECRET_KEY,
    },
  });

  return Response.json(result.body, { status: result.status });
}
