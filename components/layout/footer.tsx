import Link from "next/link";
import { SITE, NAV_LINKS, SOCIAL_LINKS } from "@/lib/site";
import { SERVICES } from "@/content/services";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40 text-sm text-muted">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-text hover:text-accent transition-colors"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded bg-surface-2 border border-border font-mono text-xs font-bold text-accent">
                AT
              </span>
              <span className="font-semibold tracking-tight">{SITE.name}</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted leading-relaxed">
              AI automation, custom agents, and lead-generating websites for
              businesses that want output without the bloat.
            </p>
            <p className="mt-4 font-mono text-xs text-muted/80">
              {SITE.location}
            </p>
            <p className="mt-1 font-mono text-xs text-accent">
              {SITE.responseTime}
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-muted hover:text-text"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="hover:text-text transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/audit" className="text-accent hover:underline">
                  Free audit →
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-text transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools & Legal */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text">
              Resources & Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/free" className="hover:text-text transition-colors">
                  Free Tools Hub
                </Link>
              </li>
              <li>
                <Link href="/audit" className="hover:text-text transition-colors">
                  Automation Audit
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-text transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-text transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row text-xs">
          <p className="text-muted">
            © 2026 {SITE.name}. Built with Next.js, Tailwind v4 & n8n.
          </p>
          <p className="font-mono text-muted/70">
            No hype. Real systems, real metrics.
          </p>
        </div>
      </div>
    </footer>
  );
}
