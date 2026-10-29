import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Engagements & Packages",
  description:
    "Tailored scopes for workflow automation, AI agents, AI marketing, websites and care plans. Fixed scope, clear deliverables.",
  alternates: { canonical: "/pricing" },
};

const PRICING_FAQ = [
  { q: "Are these fixed prices?", a: "Once we agree on scope you get one fixed price before the build starts. No surprise invoices." },
  { q: "What does it cost to run?", a: "Usually minimal tool and API costs. I estimate exact operational running costs upfront before we start." },
  { q: "Do you take deposits?", a: "Yes — 50% to start, 50% on delivery. Care plans are billed monthly and can be cancelled any time." },
  { q: "Can I hire you white-label as an agency?", a: "Yes. White-label delivery under NDA with your branding is available for agencies." },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeader
          eyebrow="Engagements"
          title="Tailored project scopes. No surprise invoices."
          description="Every project is scoped and planned before work begins. Fixed timelines, clear milestones, and zero proprietary lock-in."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col justify-between rounded-xl border border-border/70 bg-surface/60 p-6"
            >
              <div>
                <h2 className="text-lg font-semibold text-text">{service.title}</h2>
                <p className="mt-1 text-xs text-muted">{service.short}</p>

                <ul className="mt-4 space-y-2 border-t border-border/50 pt-4">
                  {service.packages.map((pkg) => (
                    <li key={pkg.name} className="flex items-baseline justify-between gap-3">
                      <div>
                        <p className="text-sm text-text">{pkg.name}</p>
                        <p className="text-xs text-muted">{pkg.scope}</p>
                      </div>
                      <span className="shrink-0 font-mono text-sm text-accent tabular">
                        {pkg.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="mt-5 inline-flex items-center gap-1 font-mono text-xs font-medium text-accent hover:underline"
              >
                What&apos;s included
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-surface-2/60 p-6">
          <div className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-sm text-muted">
              <span className="font-medium text-text">Every project includes:</span>{" "}
              documented workflows, a video walkthrough, least-privilege access to your
              accounts, and 30 days of free fixes after launch.
            </p>
          </div>
        </div>
      </Section>

      <FaqSection
        items={PRICING_FAQ}
        title="Pricing questions"
        description="What people ask before getting a quote."
      />

      <FinalCta />
    </>
  );
}
