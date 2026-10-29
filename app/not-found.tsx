import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          404 · Node not found
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
          This page never made it into the workflow.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The link is broken or the page has moved. The homepage has everything,
          including the free audit.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg" className="justify-center">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
          <Button href="/audit" variant="secondary" size="lg" className="justify-center">
            Free audit
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-8 font-mono text-[11px] text-muted/60">
          Or email{" "}
          <Link href="mailto:hey@byalitariq.com" className="text-accent hover:underline">
            hey@byalitariq.com
          </Link>
        </p>
      </div>
    </section>
  );
}
