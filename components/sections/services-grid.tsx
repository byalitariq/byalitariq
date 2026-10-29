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
                  "h-full p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 bg-white border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(79,70,229,0.14)] hover:border-indigo-300",
                  isFeatured && "bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/30 border-indigo-200",
                  isCarePlan && "sm:col-span-2 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/20 border-emerald-200/80",
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
                      <span className="font-mono text-[10px] tracking-[0.16em] text-slate-400 font-semibold">
                        /0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">
                      {service.short}
                    </p>

                    <ul
                      className={cn(
                        "mt-5 grid gap-2 border-t border-slate-100 pt-4",
                        isFeatured ? "sm:grid-cols-2" : "",
                      )}
                    >
                      {service.deliverables.slice(0, isFeatured ? 4 : 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-relaxed text-slate-700"
                        >
                          <Check className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", theme.checkColor)} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-indigo-600 font-semibold">
                        Delivery
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-900">
                        Fixed Scope · Custom Built
                      </span>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/link inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
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
