// Case study registry. Add an entry + matching MDX file per project (docs/05-case-studies.md).
// Only real projects and real numbers belong here.
export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  client: string;
  industry: string;
  services: string[];
  stack: string[];
  timeline: string;
  year: number;
  status: "live" | "in-progress";
  heroMetric: Metric;
  metrics: Metric[];
  featured: boolean;
  testimonial?: { quote: string; name: string; role: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "byalitariq-lead-engine",
    title: "How this website turns visitors into booked calls",
    summary:
      "The lead system behind byalitariq.com: one secure form endpoint feeding an n8n workflow that stores, scores and answers every enquiry.",
    client: "byalitariq.com (my own site)",
    industry: "Professional services",
    services: ["automation", "websites"],
    stack: ["Next.js", "zod", "Cloudflare Turnstile", "n8n", "Resend"],
    timeline: "Ongoing build",
    year: 2026,
    status: "in-progress",
    heroMetric: { value: "1", label: "endpoint for every form" },
    metrics: [],
    featured: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export const FEATURED_CASE_STUDIES = CASE_STUDIES.filter((study) => study.featured);
