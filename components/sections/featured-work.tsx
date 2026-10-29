import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { WorkCard } from "@/components/sections/work-card";
import { Reveal } from "@/components/ui/reveal";
import { FEATURED_CASE_STUDIES } from "@/content/work";

export function FeaturedWork() {
  return (
    <Section bordered id="work">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            <span className="h-1 w-1 rounded-full bg-accent" />
            03 · Production proof
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl md:text-4xl">
            Results, not demos.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Real production architectures, documented with the stack and the measured outcome. Numbers are published only when they are real.
          </p>
        </div>
        <Link
          href="/work"
          className="group inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-medium text-accent"
        >
          <span className="link-line">View all work</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        {FEATURED_CASE_STUDIES.map((study, index) => (
          <Reveal key={study.slug} delay={index * 0.06} className="h-full">
            <WorkCard study={study} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
