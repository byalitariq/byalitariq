import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    step: "01",
    title: "Process audit",
    time: "48 hours · free",
    description:
      "I map your current stack, bottlenecks and manual time sinks, then hand you a prioritized blueprint showing what to automate first.",
    tag: "NO RISK",
  },
  {
    step: "02",
    title: "Engineering & build",
    time: "1–3 weeks",
    description:
      "Fixed scope, fixed price, no surprise billing. I build the automations, train the agents and connect your systems with weekly updates.",
    tag: "FIXED SCOPE",
  },
  {
    step: "03",
    title: "Deployment & handoff",
    time: "Launch day",
    description:
      "Edge-case testing, credential lockdown and complete video documentation, so your team owns every workflow outright.",
    tag: "ZERO LOCK-IN",
  },
  {
    step: "04",
    title: "Monitor & care",
    time: "Ongoing monthly",
    description:
      "APIs change and webhooks break. The care plan adds uptime monitoring, bug fixes and continuous improvement.",
    tag: "UPTIME CARE",
  },
];

export function Process() {
  return (
    <Section bordered className="relative overflow-hidden">
      <SectionHeader
        eyebrow="04 · Delivery framework"
        title="Predictable execution. Zero guesswork."
        description="How a messy manual workflow becomes a production system running in the background, 24/7."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {STEPS.map((item, index) => (
          <Reveal key={item.step} delay={index * 0.05} className="h-full">
            <div className="sheen-top rim group relative flex h-full flex-col justify-between rounded-[18px] border border-border bg-surface/70 p-5 transition-colors duration-300 hover:border-border-strong hover:bg-surface">
              <div>
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-base font-bold leading-none text-accent tabular">
                    {item.step}
                  </span>
                  <span className="rounded border border-border-strong bg-surface-2 px-1.5 py-0.5 tracking-[0.12em] text-muted">
                    {item.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-text">
                  {item.title}
                </h3>
                <p className="mt-0.5 font-mono text-[11px] text-accent/80">{item.time}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
              <div className="mt-5 flex items-center gap-1.5 border-t border-border/50 pt-3 font-mono text-[10px] text-muted-2">
                <span className="h-1 w-1 rounded-full bg-accent/70" />
                step {item.step} of 04
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
