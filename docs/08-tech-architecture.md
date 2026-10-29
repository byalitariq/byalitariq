# 08 · Tech Architecture

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | SEO, MDX, API routes, Vercel deploy |
| Styling | Tailwind CSS v4 + shadcn/ui | Matches installed skills, owned components |
| Motion | GSAP (+ ScrollTrigger), Lenis | Scroll storytelling per design doc |
| 3D (optional) | React Three Fiber + drei | Hero node network, lazy-loaded |
| Content | MDX in `content/` (work, blog) with zod-validated frontmatter | Git-based, no CMS cost |
| Forms | react-hook-form + zod | Same schema on client and server |
| Booking | Cal.com embed | Free, timezone-aware |
| Email | Resend (transactional) + Brevo/ConvertKit (newsletter) | |
| Automation | n8n (self-hosted or cloud) via webhooks | Dogfooding, and becomes a case study |
| Analytics | Plausible or Vercel Analytics + PostHog (funnels) | Privacy-friendly |
| Spam | Cloudflare Turnstile | |
| Hosting | Vercel; domain `byalitariq.com` | |

## Folder structure

```
app/
  (site)/page.tsx            home
  services/[slug]/page.tsx
  work/page.tsx  work/[slug]/page.tsx
  free/roi-calculator/page.tsx  free/scorecard/page.tsx  free/templates/page.tsx
  audit/page.tsx  pricing/page.tsx  about/page.tsx  contact/page.tsx
  blog/page.tsx  blog/[slug]/page.tsx
  api/lead/route.ts          single lead-capture endpoint
  sitemap.ts  robots.ts  opengraph-image.tsx
components/  ui/ (shadcn)  sections/  motion/  three/
content/     work/*.mdx  blog/*.mdx  services.ts  faq.ts
lib/         schemas.ts  mdx.ts  analytics.ts  rate-limit.ts
public/      work/  og/  templates/
```

## Lead API (`POST /api/lead`)

Request body (validated with zod):

```ts
{
  source: "contact" | "audit" | "roi-calculator" | "scorecard" | "templates" | "newsletter",
  name?: string,            // max 100
  email: string,            // email format
  website?: string,         // url
  message?: string,         // max 2000
  budget?: "<1k" | "1-3k" | "3-10k" | "10k+",
  payload?: Record<string, unknown>,   // tool answers/results, size-limited
  turnstileToken: string,
  utm?: { source?: string; medium?: string; campaign?: string }
}
```

Server steps: verify Turnstile → rate limit per IP (e.g. 5/min via Upstash) → validate → forward to the n8n webhook with an `X-Webhook-Secret` header → return `{ success, error }`. Never expose the n8n URL or secret to the client.

Env vars: `N8N_LEAD_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Keep them in `.env.local` (gitignored) and Vercel env settings.

## n8n lead workflow

Webhook (check secret) → dedupe by email → upsert to CRM/Sheet with source + tags → branch per source (calculator: LLM writes a personalised report; audit: create task + Slack alert) → send email via Resend → add to newsletter list → notify Ali.

## Quality bars

- Lighthouse 95+ on mobile; LCP < 2.5 s; 3D and heavy motion lazy-loaded.
- WCAG 2.2 AA target: keyboard nav, focus rings, contrast, reduced motion. Confirm with manual testing.
- Tests: Vitest for schemas and calculator logic, Playwright for lead-form flows.
- Security headers (CSP, HSTS), no secrets client-side, input validation on every endpoint.
