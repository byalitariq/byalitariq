// Case study body. Kept as TSX rather than MDX because the MDX loader spawns a
// worker process, which restricted build environments do not permit.
// The .mdx file of the same name stays as the editable source copy.

export default function LeadEngineCaseStudy() {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-muted sm:text-base">
      <section>
        <h2 className="text-xl font-semibold text-text">Snapshot</h2>
        <p className="mt-2">
          This site is my own first client. Every form on it, from the contact page
          to the free audit, runs through one lead system I built with Next.js and
          n8n. This page is a live build log: results will be added here once
          there&apos;s real data to show.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text">Challenge</h2>
        <p className="mt-2">
          A freelancer&apos;s site usually sends form entries to an inbox and hopes
          someone replies in time. Replies take hours, there&apos;s no record of where
          a lead came from, and every new lead magnet needs its own form and its own
          logic.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text">Solution</h2>
        <p className="mt-2">One endpoint handles every form:</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>
            <strong className="text-text">The form</strong> validates input in the
            browser with the same schema the server uses.
          </li>
          <li>
            <strong className="text-text">POST /api/lead</strong> rate-limits
            requests, checks a Cloudflare Turnstile token, drops honeypot bots and
            validates again with zod.
          </li>
          <li>
            <strong className="text-text">The n8n webhook</strong> receives the clean
            lead with a secret header, so the URL is never exposed to the browser.
          </li>
          <li>
            <strong className="text-text">The workflow</strong> de-duplicates by
            email, stores the lead with its source and tags, sends a personal reply
            and alerts me.
          </li>
        </ol>
        <p className="mt-3">
          Adding a new lead magnet means adding a new{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-text">
            source
          </code>{" "}
          value, not a new backend.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text">Stack &amp; how it runs</h2>
        <p className="mt-2">
          Next.js on Vercel, zod for validation, Cloudflare Turnstile for spam, n8n
          for the workflow and Resend for email. Running cost is a few dollars a
          month at this volume.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text">Results</h2>
        <p className="mt-2">
          Coming soon. I&apos;ll publish response time, conversion per lead magnet and
          booked calls once the site has been live long enough to measure honestly.
        </p>
      </section>
    </div>
  );
}
