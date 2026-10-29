import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/final-cta";
import { ToolStrip } from "@/components/sections/tool-strip";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ali Tariq builds AI automation, custom agents and lead-generating websites for small businesses and agencies. How I work and what I believe.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    title: "Boring beats clever",
    text: "A workflow your team understands and can fix is worth more than a clever one only I can maintain. Everything ships with docs and a walkthrough.",
  },
  {
    title: "Your accounts, your data",
    text: "Automations run inside your own n8n, CRM and inbox with least-privilege access. No middleman service holding your customer data.",
  },
  {
    title: "Fixed scope, fixed price",
    text: "You know the cost before the build starts. If scope changes, we agree on it first — no surprise invoices.",
  },
  {
    title: "Honest numbers only",
    text: "If a metric isn't measured, it isn't published. Case studies say what is live and what is still in progress.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="About"
              title="I'm Ali. I build the systems, not the slides."
              description="I'm an AI automation engineer and marketer based in Lahore, working with small businesses and agencies in the US, UK, EU and Gulf."
            />

            <div className="space-y-4 text-sm leading-relaxed text-muted">
              <p>
                Most owners I talk to don&apos;t need more software. They need the tools
                they already pay for to talk to each other, and a system that answers
                a lead before it goes cold.
              </p>
              <p>
                So that&apos;s what I build: n8n and Make workflows, AI agents that
                qualify and reply, content engines that don&apos;t need a full-time
                marketer, and fast websites wired into the CRM from day one.
              </p>
              <p>
                I work in short, fixed-scope projects. You get the automation, the
                documentation and a video walkthrough — and you can leave with all of
                it. If something breaks in the first 30 days, I fix it free.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border/60 pt-6">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Based in</dt>
                <dd className="mt-1 text-sm text-text">{SITE.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Working with</dt>
                <dd className="mt-1 text-sm text-text">SMBs &amp; marketing agencies</dd>
              </div>
            </dl>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-xl border border-border/70 bg-surface/60 p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                How I work
              </h2>
              <ul className="mt-4 space-y-4">
                {PRINCIPLES.map((item) => (
                  <li key={item.title}>
                    <p className="text-sm font-semibold text-text">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <ToolStrip />
      <FinalCta />
    </>
  );
}
