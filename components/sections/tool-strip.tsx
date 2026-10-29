import { TOOLS } from "@/lib/site";

export function ToolStrip() {
  return (
    <section className="border-y border-border/50 bg-surface/30 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted shrink-0">
            Systems built on open &amp; modern stacks:
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3 font-mono text-xs text-text/80">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-border/50 bg-surface px-2.5 py-1 text-muted hover:text-text hover:border-border transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
