import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms for using this site and for project work: scope, payment, ownership, confidentiality and liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Terms of service
        </h1>
        <p className="mt-3 font-mono text-xs text-muted">Last updated: 27 October 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="text-base font-semibold text-text">Using this site</h2>
            <p className="mt-2">
              The content here is provided for information. Prices shown are starting
              ranges in USD and are not an offer; every engagement is confirmed in a
              written scope before work starts.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Project work</h2>
            <p className="mt-2">
              Projects are delivered against an agreed scope and fixed price. Payment
              is typically 50% to begin and 50% on delivery. Care plans are billed
              monthly and may be cancelled with 30 days&apos; notice. Late payment may
              pause active work.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Ownership</h2>
            <p className="mt-2">
              On final payment you own the workflows, code and documentation built for
              you, and they run in your own accounts. Third-party tools remain governed
              by their own terms and subscriptions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Confidentiality</h2>
            <p className="mt-2">
              Client data and business details are treated as confidential. I am happy
              to sign an NDA before any discovery call. Case studies are only published
              with permission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Liability</h2>
            <p className="mt-2">
              Automations depend on third-party services. I test what I build and fix
              defects free for 30 days after launch, but I am not liable for outages,
              API changes or data loss caused by providers outside my control.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                {SITE.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </Section>
  );
}
