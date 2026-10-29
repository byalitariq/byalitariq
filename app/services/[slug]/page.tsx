import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FaqSection } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Button } from "@/components/ui/button";
import { SERVICES, getService } from "@/content/services";
import { serviceJsonLd, serializeJsonLd } from "@/lib/json-ld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.short },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }}
      />

      <Section className="pb-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-text"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All services
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{service.keyword}</p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text leading-[1.1]">
              {service.headline}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">{service.forWho}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="primary" size="lg" className="justify-center font-semibold">
                Book a free call
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button href="/audit" variant="secondary" size="lg" className="justify-center">
                Get a free audit
              </Button>
            </div>
            {service.note && (
              <p className="mt-4 font-mono text-xs text-muted/70">{service.note}</p>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-xl border border-border/70 bg-surface/60 p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted">Packages</h2>
              <ul className="mt-4 space-y-4">
                {service.packages.map((pkg) => (
                  <li key={pkg.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold text-text">{pkg.name}</p>
                      <span className="shrink-0 font-mono text-sm text-accent tabular">{pkg.price}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted">{pkg.scope}</p>
                    {pkg.timeline && (
                      <p className="mt-0.5 font-mono text-[11px] text-muted/60">{pkg.timeline}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section bordered>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-text">Sounds familiar?</h2>
            <ul className="mt-5 space-y-3">
              {service.problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3 text-sm text-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted/50" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text">What you get</h2>
            <ul className="mt-5 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section bordered>
        <SectionHeader
          eyebrow="Examples"
          title="What this looks like in practice."
          description="Typical builds, adapted to the tools you already pay for."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {service.examples.map((example) => (
            <div key={example.title} className="rounded-lg border border-border/60 bg-surface/60 p-5">
              <h3 className="text-sm font-semibold text-text">{example.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {example.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded border border-border/60 bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FaqSection
        items={service.faq}
        title={`${service.title} questions`}
        description="The things people ask before starting."
      />

      <FinalCta />
    </>
  );
}
