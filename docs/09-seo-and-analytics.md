# 09 · SEO, Content & Analytics

## Target keywords (start narrow, long-tail)

| Intent | Examples |
|---|---|
| Hire | "n8n automation expert", "hire n8n developer", "AI automation freelancer", "Make.com expert", "AI chatbot developer for small business" |
| Problem | "automate lead follow-up", "automate Shopify order emails", "connect forms to HubSpot automatically" |
| Learn | "n8n vs Make vs Zapier", "how to build an AI agent with n8n", "n8n workflow templates" |

Each service page targets one hire keyword; blog posts target problem and learn keywords and link to the matching service and lead magnet.

## On-page

- Unique title/description per page (Next.js `metadata`).
- JSON-LD: `Person` + `ProfessionalService` on home/about, `Article` on blog, `FAQPage` on service pages.
- Dynamic OG images per page/case study.
- `sitemap.ts`, `robots.ts`, canonical URLs, clean slugs.
- Internal links: blog → service → case study → audit.

## Content plan (first 8 posts)

1. n8n vs Make vs Zapier in 2026: which should a small business use?
2. 7 automations every online business should set up first
3. How I built an AI lead-qualifying agent with n8n (with template)
4. Automate your lead follow-up in under an hour
5. AI content repurposing: 1 video → 20 posts (workflow inside)
6. What an AI automation project really costs
7. How agencies can white-label AI automation
8. Build log: the lead engine behind this website

## Distribution

- LinkedIn: 3 posts/week (workflow breakdowns, results, build-in-public). It's the main B2B channel.
- X/Twitter: short workflow clips.
- YouTube/Loom: build walkthroughs embedded in posts.
- Upwork / Contra / Fiverr Pro profiles linking to case studies.
- n8n community and template marketplace: publish templates that link back.

## Analytics & funnel events

Track with PostHog (or Plausible goals):

`cta_click` (location) · `tool_start` (tool) · `tool_complete` · `lead_submit` (source) · `call_booked` · `template_download` · `demo_chat_start`

Weekly review: visitors by source → magnet conversion → calls booked → deals. Double down on the best channel and magnet.

## Tools

Google Search Console, Bing Webmaster, Vercel Speed Insights, PostHog funnels, UTM links on every social post.
