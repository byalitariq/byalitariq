"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { startScroll, stopScroll } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Floating island dock. Sits 16px off the top edge on desktop, rounded,
 * with heavy backdrop blur, 1px sheen line, and a live availability beacon.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop the Lenis instance itself; body overflow alone lets the page drift.
  React.useEffect(() => {
    if (mobileOpen) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      startScroll();
      document.body.style.overflow = "";
    }
    return () => {
      startScroll();
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "sheen-top rim mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-indigo-100/90 bg-white/90 px-4 backdrop-blur-xl transition-all duration-300 sm:h-15 sm:px-5",
          scrolled
            ? "border-indigo-200/90 bg-white/95 shadow-[0_12px_36px_-10px_rgba(79,70,229,0.12)]"
            : "shadow-[0_4px_20px_-4px_rgba(79,70,229,0.06)]",
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold text-text transition-colors hover:text-accent"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 font-mono text-xs font-bold text-indigo-600 transition-transform duration-200 group-hover:scale-105 group-hover:border-indigo-400">
            AT
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
            {SITE.name}
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-2.5 py-0.5 font-mono text-[10px] text-emerald-700 md:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span>AVAILABLE</span>
          </span>
        </Link>

        {/* Desktop segmented nav */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-0.5 rounded-full border border-indigo-100 bg-slate-100/80 p-1 text-xs font-medium text-slate-600 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1 transition-all duration-200 hover:text-text",
                  isActive
                    ? "bg-surface-3 text-text shadow-sm"
                    : "text-muted hover:bg-surface-3/50",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            href="/audit"
            variant="ghost"
            size="sm"
            className="h-8 rounded-full px-3 text-xs text-muted hover:text-text"
          >
            Free audit
          </Button>
          <Button
            href="/contact"
            variant="primary"
            size="sm"
            className="h-8 rounded-full px-3.5 text-xs font-semibold"
          >
            <span>Book a call</span>
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <Button
            href="/audit"
            variant="primary"
            size="sm"
            className="h-7 rounded-full px-2.5 text-[11px] font-semibold"
          >
            Free audit
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 text-text transition-colors hover:bg-surface-3"
          >
            {mobileOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="sheen-top rim fixed inset-x-3 top-20 z-50 flex flex-col rounded-3xl border border-border-strong bg-surface/95 p-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-surface-2 hover:text-text",
                    isActive ? "bg-surface-2 text-text font-semibold" : "text-muted",
                  )}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-muted/60">→</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 flex flex-col gap-2.5 border-t border-border/60 pt-5">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full justify-center rounded-xl font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Book a call
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              href="/audit"
              variant="secondary"
              size="lg"
              className="w-full justify-center rounded-xl"
              onClick={() => setMobileOpen(false)}
            >
              Request free automation audit
            </Button>
            <p className="mt-2 text-center font-mono text-[11px] text-muted">
              {SITE.responseTime}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
