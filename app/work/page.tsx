import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/final-cta";
import { CASE_STUDIES } from "@/content/work";
import { WorkCard } from "@/components/sections/work-card";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Real production systems: n8n automations, AI agents and lead-generating websites, with honest results and no inflated metrics.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeader
          eyebrow="Work"
          title="Systems that run in production."
          description="Every case study below is a real build, documented with the stack, the problem and the measured outcome. Numbers are only published when they are real."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <WorkCard key={study.slug} study={study} />
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-dashed border-border/80 bg-surface/40 p-6 sm:p-8 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">More case studies</p>
          <p className="mt-2 text-sm text-muted">
            New builds are being documented now. If you want to see how a specific workflow would be built for your business, ask for a free audit.
          </p>
          <Link
            href="/audit"
            className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-medium text-accent hover:underline"
          >
            Request a free audit
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
