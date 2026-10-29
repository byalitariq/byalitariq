import { SITE } from "@/lib/site";

// Escape "<" so content can never close the surrounding <script> tag.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "AI Automation Specialist",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  knowsAbout: ["n8n", "Make", "AI agents", "CrewAI", "Python", "WordPress", "Next.js"],
};

export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${SITE.name} · AI Automation`,
  url: SITE.url,
  email: SITE.email,
  areaServed: "Worldwide",
  description: SITE.description,
};

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
