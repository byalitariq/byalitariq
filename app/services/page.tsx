import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/final-cta";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Workflow automation, custom AI agents, AI marketing, websites and care plans for small businesses and agencies. Fixed scope, fixed price.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-8 sm:pb-10">
        <SectionHeader
          eyebrow="Services"
          title="Five ways I remove work from your week."
          description="Every engagement is scoped, priced and handed over with documentation. No retainers you can't leave, no proprietary lock-in."
        />
      </Section>

      <Section className="pt-0">
        <div className="space-y-6">
          {SERVICES.map((service, index) => (
            <article
              key={service.slug}
              className="rounded-xl border border-border/70 bg-surface/60 p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted">
                    <span className="text-accent">0{index + 1}</span>
                    <span className="h-px w-8 bg-border" />
                    <span className="uppercase tracking-wider">{service.keyword}</span>
                  </div>
                  <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-text">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
                    {service.headline}
                  </p>
                  <p className="mt-4 text-sm text-muted/90">
                    <span className="font-medium text-text">Who it&apos;s for: </span>
                    {service.forWho}
                  </p>

                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {service.deliverables.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted/90">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 lg:border-l lg:border-border/50 lg:pl-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Packages</p>
                  <ul className="mt-3 space-y-3">
                    {service.packages.map((pkg) => (
                      <li key={pkg.name} className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-2 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-text">{pkg.name}</p>
                          <p className="text-xs text-muted">{pkg.scope}</p>
                        </div>
                        <span className="shrink-0 font-mono text-sm text-accent tabular">{pkg.price}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-medium text-accent hover:underline"
                  >
                    Full breakdown
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
