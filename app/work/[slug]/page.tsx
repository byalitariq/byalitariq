import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/final-cta";
import { CASE_STUDIES, getCaseStudy } from "@/content/work";
import LeadEngineCaseStudy from "@/content/work/byalitariq-lead-engine";

// Case-study bodies are plain components rather than MDX imports: the MDX
// loader spawns a worker process, which restricted build environments block.
const CONTENT: Record<string, React.ComponentType> = {
  "byalitariq-lead-engine": LeadEngineCaseStudy,
};

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: study.title, description: study.summary },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const Content = CONTENT[slug];
  if (!study || !Content) notFound();

  return (
    <>
      <Section className="pb-6">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-text"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All work
        </Link>

        <div className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <span className="uppercase tracking-wider text-accent">{study.industry}</span>
            <span>·</span>
            <span>{study.client}</span>
            <span>·</span>
            <span>{study.year}</span>
            <span
              className={`rounded border px-2 py-0.5 ${
                study.status === "live"
                  ? "border-accent/30 bg-accent/15 text-accent"
                  : "border-border bg-surface-2 text-muted"
              }`}
            >
              {study.status === "live" ? "Live" : "In progress"}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {study.summary}
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border/60 py-6 sm:grid-cols-4">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Timeline</dt>
            <dd className="mt-1 text-sm text-text">{study.timeline}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Services</dt>
            <dd className="mt-1 text-sm text-text">{study.services.join(", ")}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Stack</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border/60 bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </Section>

      <Section className="pt-2">
        <article className="mx-auto max-w-3xl">
          <Content />
        </article>
      </Section>

      <Section bordered>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm text-muted">
            Want this kind of system in your business? Start with a free audit.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-1 font-mono text-xs font-medium text-accent hover:underline"
          >
            Get a free audit
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
