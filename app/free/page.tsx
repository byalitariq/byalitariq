import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calculator, ClipboardCheck, FileStack, Mail } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { LeadForm } from "@/components/forms/lead-form";
import { TOOLS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free tools",
  description:
    "Free automation audit, ROI calculator, AI readiness scorecard and n8n starter templates — no email gate on the guides.",
  alternates: { canonical: "/free" },
};

const TOOL_CARDS = [
  {
    icon: Calculator,
    title: "Automation ROI calculator",
    text: "Enter hours spent and an hourly rate to see what a workflow saves per month.",
    status: "Coming soon",
    href: "",
  },
  {
    icon: ClipboardCheck,
    title: "AI readiness scorecard",
    text: "Ten questions that show which part of your operation is ready to automate first.",
    status: "Coming soon",
    href: "",
  },
  {
    icon: FileStack,
    title: "n8n starter templates",
    text: "The lead-capture, follow-up and reporting workflows I reuse most, exported as JSON.",
    status: "Coming soon",
    href: "",
  },
  {
    icon: Mail,
    title: "Free automation audit",
    text: "A personal video breakdown of the first workflow I'd build for your business, in 48 hours.",
    status: "Available now",
    href: "/audit",
  },
];

export default function FreePage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeader
          eyebrow="Free tools"
          title="Useful things, before you spend anything."
          description="I'd rather you automate the right thing than hire me for the wrong one. These tools are free and the guides have no email gate."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TOOL_CARDS.map((card) => {
            const Icon = card.icon;
            const isAvailable = Boolean(card.href);
            return (
              <div
                key={card.title}
                className={`flex flex-col justify-between rounded-xl border p-6 ${
                  isAvailable
                    ? "border-accent/30 bg-surface/70"
                    : "border-border/60 bg-surface/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-2 text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[11px] ${
                        isAvailable
                          ? "border-accent/30 bg-accent/15 text-accent"
                          : "border-border bg-surface-2 text-muted"
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-text">{card.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{card.text}</p>
                </div>

                {isAvailable ? (
                  <Link
                    href={card.href}
                    className="mt-5 inline-flex items-center gap-1 font-mono text-xs font-medium text-accent hover:underline"
                  >
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <p className="mt-5 font-mono text-[11px] text-muted/60">
                    In build · check back soon
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section bordered>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Newsletter"
              title="One workflow, every other week."
              description="Short emails with a real automation breakdown and the JSON to copy. No course funnels."
            />
            <p className="font-mono text-[11px] text-muted/70">
              Built with: {TOOLS.slice(0, 6).join(" · ")}
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-border/70 bg-surface/60 p-6">
              <LeadForm
                source="newsletter"
                submitLabel="Subscribe"
                showBudget={false}
                messagePlaceholder="Optional: what would you like automated?"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
