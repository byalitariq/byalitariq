import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";

const COMPARISONS = [
  {
    before: "New inbound leads wait hours (or overnight) for a reply.",
    after: "Every lead receives an intelligent, personalized reply in under 60 seconds.",
    metric: "< 60s",
    metricLabel: "reply speed",
  },
  {
    before: "Team members spend 10+ hours a week copying data between CRM, sheets and tools.",
    after: "Data self-syncs between CRM, inbox, payments and dashboards.",
    metric: "100%",
    metricLabel: "manual entry removed",
  },
  {
    before: "Creating marketing content burns your entire week and drains focus.",
    after: "One core asset repurposes into a week of multi-channel posts and emails.",
    metric: "5x",
    metricLabel: "content leverage",
  },
  {
    before: "Customer support questions bottleneck your senior team members.",
    after: "Trained AI agents triage routine inquiries and route complex cases with full context.",
    metric: "24/7",
    metricLabel: "instant coverage",
  },
];

export function ProblemOutcome() {
  return (
    <Section bordered className="relative">
      <SectionHeader
        eyebrow="01 · Shift the baseline"
        title="Stop running your business on manual busywork."
        description="The difference between a stressed owner and a scalable operation is automated leverage. Here is what changes when the systems run themselves."
      />

      <div className="grid grid-cols-1 gap-4 lg:gap-5">
        {COMPARISONS.map((item, index) => (
          <Reveal key={item.metricLabel} delay={index * 0.05}>
            <SpotlightCard className="bg-surface/70 p-0">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="flex items-start gap-3 p-5 sm:p-6 md:col-span-5">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-2" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                      Without automation
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted/90">
                      {item.before}
                    </p>
                  </div>
                </div>

                <div className="relative hidden items-center justify-center md:col-span-1 md:flex">
                  <span className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border-strong to-transparent" />
                  <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-muted">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="flex items-start gap-3 border-t border-border p-5 sm:p-6 md:col-span-6 md:border-l md:border-t-0 md:border-border bg-gradient-to-r from-surface to-surface-2/60">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent font-bold">
                        With the system running
                      </span>
                      <span className="shrink-0 rounded-md border border-border bg-surface px-2 py-0.5 text-right font-mono shadow-sm">
                        <span className="block text-sm font-bold leading-none text-accent">
                          <AnimatedCounter value={item.metric} />
                        </span>
                        <span className="mt-0.5 block text-[9px] uppercase tracking-wide text-muted font-semibold">
                          {item.metricLabel}
                        </span>
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold leading-relaxed text-text">
                      {item.after}
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
