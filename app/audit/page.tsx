import type { Metadata } from "next";
import { Check, Clock, Video, FileText } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Free automation audit",
  description:
    "Send your tool stack and one manual task you dread. Within 48 hours you get a free video walkthrough of the exact automation I'd build to replace it.",
  alternates: { canonical: "/audit" },
};

const INCLUDED = [
  { icon: Video, title: "Personal video review", text: "A 5–10 minute walkthrough recorded for your business, not a template." },
  { icon: FileText, title: "Workflow blueprint", text: "The exact nodes, triggers and tools for the first automation to build." },
  { icon: Clock, title: "Time-saved estimate", text: "An honest estimate of the hours it removes per week — or a straight no if it isn't worth it." },
];

const STEPS = [
  "Send your website and the task you dread most.",
  "I map your current tools and where data gets stuck.",
  "You get a video blueprint within 48 hours.",
  "Build it yourself, or hire me to ship it.",
];

export default function AuditPage() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Free · 48 hours"
            title="Find out what to automate first."
            description="Most businesses automate the wrong thing. Send me your setup and I'll show you the one workflow that saves the most time — before you spend anything."
          />

          <div className="space-y-5">
            {INCLUDED.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <ol className="mt-8 space-y-2.5 border-t border-border/60 pt-6">
            {STEPS.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-xs text-muted">
                <span className="mt-0.5 font-mono text-[11px] font-bold text-accent">0{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-xl border border-accent/25 bg-surface/60 p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Request your audit
            </div>
            <LeadForm
              source="audit"
              submitLabel="Request free audit"
              messagePlaceholder="e.g. Every lead from our form sits in Gmail until someone replies, and I rebuild the same report every Monday."
            />
            <p className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-muted/70">
              <Check className="h-3 w-3 text-accent" />
              No sales call required. No obligation to hire.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
