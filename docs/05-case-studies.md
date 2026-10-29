# 05 · Case Studies

Ali will supply real projects. Each one becomes an MDX file at `content/work/<slug>.mdx` using the template below. Get client permission; anonymise ("UK e-commerce brand") if needed.

## Intake checklist (fill per project)

- [ ] Client name / anonymised label, industry, country
- [ ] Service(s): automation · ai-agents · ai-marketing · websites · care-plan
- [ ] The problem in the client's words
- [ ] What was built (tools, steps, integrations)
- [ ] Before/after numbers: hours saved, response time, leads, revenue, errors, cost
- [ ] Timeline and your role
- [ ] Screenshots: workflow canvas, dashboard, UI (blur private data)
- [ ] Loom walkthrough link (optional)
- [ ] Testimonial quote + name, role, photo (with permission)

## MDX frontmatter

```yaml
---
title: "Cut lead response time from 6 hours to 60 seconds"
client: "Acme Realty"            # or anonymised label
industry: "Real estate"
services: ["automation", "ai-agents"]
stack: ["n8n", "OpenAI", "HubSpot", "Twilio"]
timeline: "2 weeks"
year: 2026
heroMetric: { value: "60s", label: "lead response time" }
metrics:
  - { value: "-92%", label: "manual data entry" }
  - { value: "+38%", label: "booked calls" }
cover: "/work/acme/cover.webp"
featured: true
testimonial:
  quote: ""
  name: ""
  role: ""
---
```

## Body structure

1. **Snapshot**: two sentences on who they are and the result.
2. **Challenge**: what was broken, and what it cost them.
3. **Solution**: what was built, with a workflow diagram and a short step list.
4. **Results**: metrics grid plus a one-paragraph narrative.
5. **Stack & how it runs**: tools, monthly running cost, maintenance.
6. **Testimonial**.
7. **CTA**: "Want the same for your business?" → audit.

## Rules

- Lead with the outcome in the title, not the tool ("Saved 20 h/week", not "n8n workflow").
- Use real numbers only. If unmeasured, describe the qualitative change honestly.
- Blur emails, names and API keys in every screenshot.

## Experience to turn into stories

- IT Track Solution: AI workflows in n8n/Make with model and API integrations.
- SEO Vancouver Agency: WordPress builds and responsiveness work.
- Nexus Monkey: AI-assisted app prototypes.
- Freelance clients: custom agents and integrations.
- **Meta case study:** this website's own lead system (Phase 1 lead magnets).

## Placeholder slots (replace when Ali shares projects)

| Slug | Working title | Service | Status |
|---|---|---|---|
| `project-1` | TODO | automation | waiting for details |
| `project-2` | TODO | ai-agents | waiting for details |
| `project-3` | TODO | websites | waiting for details |
| `byalitariq-lead-engine` | How this site turns visitors into booked calls | automation + websites | build with site |
