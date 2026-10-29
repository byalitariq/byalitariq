# 10 · Launch Roadmap

## Phase 0 · Inputs from Ali (before build)

- [ ] Pick a hero headline (`06-homepage-copy.md`)
- [ ] Confirm or adjust prices (`03-services-and-pricing.md`)
- [ ] Share 2–3 real projects for case studies (`05-case-studies.md`)
- [ ] Professional photo + final logo files (SVG)
- [ ] Testimonials (LinkedIn recommendations, client messages with permission)
- [ ] Accounts: Vercel, Cal.com, Resend, n8n, Cloudflare Turnstile, PostHog/Plausible
- [ ] Domain DNS access for byalitariq.com

## Phase 1 · MVP site (week 1–2)

- [ ] Next.js + Tailwind + shadcn setup, design tokens, fonts
- [ ] Layout: header, footer, mobile nav, sticky CTA
- [ ] Home (all sections, static graph hero first)
- [ ] Services overview + 5 service pages from `content/services.ts`
- [ ] Work grid + case study MDX template (+ meta case study)
- [ ] About, Contact (Cal.com + form), Pricing, Privacy, Terms
- [ ] `/api/lead` + n8n lead workflow + emails
- [ ] SEO basics, OG images, sitemap, analytics events
- [ ] Deploy to Vercel on the domain

## Phase 2 · Lead magnets (week 3)

- [ ] ROI calculator (+ unit tests for the maths)
- [ ] Free audit page + n8n audit workflow
- [ ] Template pack (5 workflows exported from n8n, credentials stripped)
- [ ] Nurture sequence (5 emails)
- [ ] `/free` hub

## Phase 3 · Wow layer (week 4)

- [ ] Animated workflow graph hero (GSAP), reduced-motion fallback
- [ ] Optional R3F node-network scene, lazy-loaded
- [ ] Live demo AI assistant (RAG over the site's content, rate-limited, cost-capped)
- [ ] Design critique and polish pass (impeccable, better-ui, better-typography)

## Phase 4 · Growth (ongoing)

- [ ] AI readiness scorecard
- [ ] Blog: 2 posts/month from `09-seo-and-analytics.md`
- [ ] Mini-course + prompt toolkit
- [ ] Monthly: add a case study, review funnel metrics, update prices

## Definition of done (launch)

- Lighthouse mobile 95+ on home, a service page and a case study
- Every form tested end to end (submission reaches the CRM, email arrives, alert fires)
- No secrets in client bundle; Turnstile and rate limit active
- Keyboard and screen-reader smoke test passed
- At least 2 real case studies live
