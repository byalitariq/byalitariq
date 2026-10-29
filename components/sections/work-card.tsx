import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { CaseStudy } from "@/content/work";

export interface WorkCardProps {
  study: CaseStudy;
}

export function WorkCard({ study }: WorkCardProps) {
  return (
    <SpotlightCard className="h-full bg-surface/70 p-6 transition-colors duration-300 hover:bg-surface sm:p-7">
      <div className="flex h-full flex-col justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-muted-2">
            <div className="flex items-center gap-2">
              <span className="uppercase tracking-[0.14em] text-accent/90">{study.industry}</span>
              <span className="text-border-strong">/</span>
              <span>{study.client}</span>
            </div>
            <span
              className={
                study.status === "live"
                  ? "rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-accent"
                  : "rounded border border-border-strong bg-surface-2 px-1.5 py-0.5 text-muted"
              }
            >
              {study.status === "live" ? "LIVE" : "IN PROGRESS"}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold tracking-tight text-text">
            <Link href={`/work/${study.slug}`} className="after:absolute after:inset-0 focus:outline-none">
              {study.title}
            </Link>
          </h3>

          <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-muted">
            {study.summary}
          </p>

          {study.heroMetric && (
            <div className="mt-5 flex items-baseline gap-3 rounded-xl border border-border/60 bg-surface-2/50 px-4 py-3">
              <span className="font-mono text-2xl font-bold leading-none text-accent tabular sm:text-3xl">
                <AnimatedCounter value={study.heroMetric.value} />
              </span>
              <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-muted">
                {study.heroMetric.label}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {study.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded border border-border/60 bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-accent">
            <span className="link-line">Read case study</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}
