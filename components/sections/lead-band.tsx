import Link from "next/link";
import { ArrowUpRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LeadBand() {
  return (
    <section className="border-t border-border/60 bg-surface-2/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent/30 bg-gradient-to-b from-surface-2 to-surface p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle accent highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent mb-3">
                <Zap className="h-3.5 w-3.5" />
                Free Diagnostic Tool · No Pitch
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
                Wondering what parts of your business can actually be automated?
              </h2>
              <p className="mt-3 text-base text-muted max-w-2xl leading-relaxed">
                Send me your current tool stack and one manual task you dread.
                Within 48 hours, I will send you a personalized video breakdown
                showing the exact n8n workflow architecture to replace it.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-accent" />
                  100% free video audit
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-accent" />
                  Specific workflow blueprint
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-accent" />
                  Delivered in 48 hours
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Button
                href="/audit"
                variant="primary"
                size="lg"
                className="w-full justify-center font-semibold"
              >
                <span>Request your free audit</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Link
                href="/free"
                className="text-center font-mono text-xs text-muted hover:text-text transition-colors"
              >
                Or explore the Free Tools Hub →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
