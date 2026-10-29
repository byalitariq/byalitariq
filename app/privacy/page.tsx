import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What data this site collects through forms, why it is collected, how long it is kept and how to have it deleted.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Privacy policy
        </h1>
        <p className="mt-3 font-mono text-xs text-muted">Last updated: 27 October 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="text-base font-semibold text-text">What I collect</h2>
            <p className="mt-2">
              When you submit a form on this site I receive the name, email address,
              website URL, budget range and message you choose to provide, plus the
              page or tool the form came from. Nothing else is collected by the form.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Why</h2>
            <p className="mt-2">
              Solely to reply to your enquiry, deliver a requested audit or resource,
              and keep a record of the conversation. I do not sell or rent your details,
              and I do not add you to a mailing list unless you subscribe to it.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Spam protection</h2>
            <p className="mt-2">
              Forms are protected by Cloudflare Turnstile, which may set a technical
              cookie to tell humans from bots. Analytics, when enabled, is
              cookie-less and does not track you across sites.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Where it is stored</h2>
            <p className="mt-2">
              Submissions are processed by an n8n workflow running in a private,
              access-controlled environment and stored in my own email and CRM
              accounts. Access is limited to me.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Retention and your rights</h2>
            <p className="mt-2">
              Enquiries are kept for up to 24 months, then deleted. You can ask me to
              show, correct or delete anything I hold about you at any time by emailing{" "}
              <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                {SITE.email}
              </a>
              . I will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text">Changes</h2>
            <p className="mt-2">
              If this policy changes, the date above is updated. Material changes are
              announced on this page.
            </p>
          </section>
        </div>
      </article>
    </Section>
  );
}
