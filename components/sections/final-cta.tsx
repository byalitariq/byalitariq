import { ArrowUpRight, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SITE } from "@/lib/site";

export function FinalCta() {
  return (
    <Section bordered className="py-20 sm:py-28 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Get Started
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text leading-[1.15]">
          Ready to put your online business on autopilot?
        </h2>

        <p className="mt-5 text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
          Book a 20-minute architecture call. No sales pitch, no fluff — just an honest whiteboard review of your current bottlenecks and the exact workflows to fix them.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto font-semibold px-8"
          >
            <span>Book a 20-min call</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            href="/audit"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto px-6"
          >
            <span>Request a free audit</span>
            <ArrowRight className="h-4 w-4 text-muted" />
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-muted/80">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {SITE.responseTime}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            100% Confidential / NDA Friendly
          </span>
        </div>
      </div>
    </Section>
  );
}
