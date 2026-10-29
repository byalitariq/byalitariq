# byalitariq.com

Portfolio, services and lead-generation site for Ali Tariq (AI automation, AI agents, AI marketing, websites).

## Source of truth

The plan lives in `docs/`. Read `docs/README.md` first, then the doc for the area you're working on. If code and docs disagree, ask before changing either.

## Stack

Next.js (App Router) + TypeScript, Tailwind v4, shadcn/ui, GSAP, MDX content, zod, Vercel. Details in `docs/08-tech-architecture.md`.

## Rules

- Design follows `docs/07-design-direction.md`. No purple AI gradients, robot imagery or template look.
- Copy follows the voice in `docs/01-brand-positioning.md`: plain, outcome-first, no hype.
- Every form goes through `POST /api/lead` (zod + Turnstile + rate limit). Never expose the n8n webhook URL or secrets client-side.
- Never publish personal ID data (CNIC, address).
- Respect `prefers-reduced-motion`; lazy-load 3D; target Lighthouse mobile 95+.
- Use real numbers only in case studies and metrics.
