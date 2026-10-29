# 02 · Sitemap & Page Specs

## Sitemap

```
/                     Home
/services             Services overview
/services/[slug]      automation · ai-agents · ai-marketing · websites · care-plan
/work                 Case studies grid (filter by service)
/work/[slug]          Case study (MDX)
/free                 Lead magnet hub
/free/roi-calculator  Automation ROI calculator
/free/scorecard       AI readiness scorecard (quiz)
/free/templates       n8n template pack
/audit                Free automation audit request
/pricing              Packages & ranges
/about                Story, stack, process
/blog                 Articles & build-in-public (MDX)
/blog/[slug]
/contact              Book a call + short form
/privacy  /terms
```

Global: sticky header (Work · Services · Free tools · Pricing · About · **Book a call**), footer (email, socials, newsletter, legal).

## Home: section order

1. **Hero**: headline, subline, two CTAs (Book a call / Get a free audit). Visual: animated workflow graph (nodes light up as data flows), not a stock image.
2. **Logo / tool strip**: n8n, Make, OpenAI, Anthropic, CrewAI, HubSpot, Shopify, WordPress, Google Workspace.
3. **Problem → outcome**: three before/after cards ("Leads wait 6 hours" → "Leads answered in 60 seconds").
4. **Services**: four cards (Automation, AI Agents, AI Marketing, Websites) plus a care-plan note.
5. **Featured work**: two or three case studies, each with one headline metric.
6. **Live demo**: embedded mini agent or ROI calculator teaser.
7. **Process**: Audit → Build → Launch → Improve (four steps with timelines).
8. **Testimonials**.
9. **Lead magnet band**: "Find out how many hours you could save" → calculator.
10. **FAQ**: 6–8 objection-handling answers.
11. **Final CTA**: book a call + email.

## Service page template (`/services/[slug]`)

- Hero: outcome headline + who it's for.
- Problems it solves (bullets).
- What you get (deliverables list).
- Example workflows (3–6 cards with tool icons).
- Related case study.
- Package and price range + "Book a call".
- FAQ specific to the service.

## Case study template (`/work/[slug]`)

Client · Industry · Services · Timeline → Challenge → Solution (workflow diagram) → Results (metrics) → Stack → Testimonial → CTA. See `05-case-studies.md`.

## About

Story (from WordPress dev to AI automation), how I work, stack, values, photo, timeline, certifications, "currently building" block.

## Contact / Book

- Cal.com embed (30-min discovery call).
- Short form: name, email, website, what they want automated, budget range (select), how they heard.
- WhatsApp and email alternatives.
- Expectation line: "Reply within 24 hours, Mon–Sat (PKT)."

## Conversion rules

- Every page ends in exactly one primary CTA.
- Max 5 fields on any form; extra questions go after submit.
- Pricing ranges visible; no "contact for price" only.
- Mobile-first: thumb-reach CTAs, sticky "Book a call" on mobile.
