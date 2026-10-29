import Link from "next/link";
import { ArrowUpRight, Check, Zap, Bot, Megaphone, Globe, Shield } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { SERVICES } from "@/content/services";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  automation: Zap,
  "ai-agents": Bot,
  "ai-marketing": Megaphone,
  websites: Globe,
  "care-plan": Shield,
};

const SERVICE_THEMES: Record<string, { iconGrad: string; checkColor: string }> = {
  automation: { iconGrad: "bg-blue-600 text-white shadow-sm shadow-blue-500/20", checkColor: "text-blue-600" },
  "ai-agents": { iconGrad: "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20", checkColor: "text-indigo-600" },
  "ai-marketing": { iconGrad: "bg-amber-600 text-white shadow-sm shadow-amber-500/20", checkColor: "text-amber-600" },
  websites: { iconGrad: "bg-sky-600 text-white shadow-sm shadow-sky-500/20", checkColor: "text-sky-600" },
  "care-plan": { iconGrad: "bg-emerald-600 text-white shadow-sm shadow-emerald-500/20", checkColor: "text-emerald-600" },
};

/** Asymmetric bento: automation takes the wide tile, care plan closes as a strip. */
const TILE_SPAN: Record<string, string> = {
  automation: "lg:col-span-2",
  "ai-agents": "lg:col-span-1",
  "ai-marketing": "lg:col-span-1",
  websites: "lg:col-span-1",
  "care-plan": "lg:col-span-2",
};

export function ServicesGrid() {
  return (
    <Section bordered id="services">
      <SectionHeader
        eyebrow="02 · Core capabilities"
        title="Engineered for businesses that want output."
        description="Every system is custom-built, documented and handed over with no proprietary lock-in. Start with one project or wire the whole stack."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {SERVICES.map((service, index) => {
          const Icon = ICONS[service.slug] ?? Zap;
          const theme = SERVICE_THEMES[service.slug] ?? SERVICE_THEMES.automation;
          const isFeatured = service.slug === "automation";
          const isCarePlan = service.slug === "care-plan";

          return (
            <Reveal
              key={service.slug}
              delay={index * 0.04}
              className={cn("h-full", TILE_SPAN[service.slug])}
            >
              <SpotlightCard
                className={cn(
                  "h-full p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 bg-surface border-border shadow-sm hover:shadow-md hover:border-border-strong",
                  isFeatured && "bg-gradient-to-br from-surface via-surface to-surface-2 border-border-strong",
                  isCarePlan && "sm:col-span-2 bg-gradient-to-br from-surface to-surface-2/80 border-border",
                )}
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl",
                          theme.iconGrad,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.16em] text-muted-2 font-semibold">
                        /0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold tracking-tight text-text">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                      {service.short}
                    </p>

                    <ul
                      className={cn(
                        "mt-5 grid gap-2 border-t border-border/50 pt-4",
                        isFeatured ? "sm:grid-cols-2" : "",
                      )}
                    >
                      {service.deliverables.slice(0, isFeatured ? 4 : 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-relaxed text-text"
                        >
                          <Check className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", theme.checkColor)} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end justify-between gap-3 border-t border-border/50 pt-4">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-accent font-semibold">
                        Delivery
                      </span>
                      <span className="font-mono text-xs font-semibold text-text">
                        Fixed Scope · Custom Built
                      </span>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/link inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-accent hover:underline"
                    >
                      <span className="link-line">Details</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
