import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { LeadForm } from "@/components/forms/lead-form";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me what you want to automate. I read every message myself and reply within 24 hours, Mon–Sat (PKT).",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Contact"
            title="Tell me what's slowing you down."
            description="One short message is enough. I'll reply with honest thoughts on whether automation is worth it for you, and what I'd do first."
          />

          <dl className="space-y-5 border-t border-border/60 pt-6 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${SITE.email}`} className="text-text hover:text-accent">
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Response time</dt>
                <dd className="mt-1 text-muted">{SITE.responseTime}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Based in</dt>
                <dd className="mt-1 text-muted">{SITE.location}</dd>
              </div>
            </div>
          </dl>

          <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted/70">
            Prefer a call? Ask in your message and I&apos;ll send a booking link.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-xl border border-border/70 bg-surface/60 p-6 sm:p-8">
            <LeadForm source="contact" submitLabel="Send message" />
          </div>
        </div>
      </div>
    </Section>
  );
}
