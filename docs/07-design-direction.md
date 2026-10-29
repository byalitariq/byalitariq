# 07 · Design Direction

Goal: a premium, technical site that looks hand-built, not like an AI template. Avoid purple-blue gradients, glowing robot brains, generic glassmorphism and stock "AI" imagery.

## Concept: "The Control Room"

The site feels like a calm, well-lit operations console where automations run quietly. The signature visual is a **live workflow graph**: nodes (Form → AI → CRM → Email) connected by lines, with data pulses travelling along them. It echoes the circuit motif in the existing logo (`Ali Tariq Logo with Circuit Design.png`).

## Palette (tokens)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B0B0C` warm off-black | page background |
| `--surface` | `#141416` | cards, panels |
| `--border` | `#26262A` | hairlines |
| `--text` | `#EDEDEA` | primary text |
| `--muted` | `#8E8E89` | secondary text |
| `--accent` | `#C6F432` signal lime | CTAs, active nodes, key metrics |
| `--accent-2` | `#FF8A3D` amber | warnings, highlights (sparingly) |

One accent dominates. Check contrast with the `better-colors` skill; lime on dark needs dark text on lime buttons.

Optional light mode for blog and case-study reading: `#F6F5F1` paper background.

## Typography

- Display: a characterful grotesk, e.g. **Geist**, **Satoshi** or **General Sans**, at 600–700 with slightly tight tracking.
- Body: same family, or **Inter** at 400/16px+ and 1.6 line-height.
- Mono: **Geist Mono / JetBrains Mono** for node labels, metrics and code.
- Follow `better-typography`: 60–75 character measure, `tabular-nums` on metrics, `text-wrap: balance` on headings.

## Motion (GSAP + Lenis, per installed skills)

- Hero: workflow graph draws in on load (~1.2 s), then pulses loop slowly.
- Scroll: section reveals with small y-offsets; the metrics count up once.
- Services: hovering a card lights up its node in a mini graph.
- Case study pages: a scroll-scrubbed workflow diagram.
- Optional 3D (Three.js / R3F): one hero scene, a slowly rotating node network. Lazy-load it, fall back to SVG on mobile and low power.
- Respect `prefers-reduced-motion`: static graph, no scroll scrubbing.

## Components

- Buttons: primary (lime fill, dark text), secondary (outline), ghost link.
- Metric card: big mono number + label.
- Workflow card: tool icons in a row with arrows.
- Case study card: cover, headline metric, service chips.
- Tool chips/logos: monochrome, colour on hover.
- Forms: dark inputs, 16px text, inline validation, clear success state.

Base: shadcn/ui primitives themed with the tokens above; Magic UI / Aceternity pieces only where they fit the concept.

## Imagery

- Real workflow screenshots (n8n canvas) in browser frames.
- A professional photo of Ali on About and in the hero side panel (warm, natural light).
- Simple line icons (Lucide/Phosphor), no clip-art.

## Skills to use while building

`frontend-design` (art direction pass), `design-taste-frontend`, `impeccable` (critique/polish), `better-typography`, `better-colors`, `better-ui`, GSAP skills, `threejs-scroll-worlds` (only if doing the 3D hero), `shadcn`.

## References

Use `design-refs/linear-DESIGN.md` for density and dark-surface discipline. Also look at linear.app, vercel.com, raycast.com and n8n.io for workflow visuals.
