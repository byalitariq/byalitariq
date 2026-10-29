"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DURATION_MS = 1400;

/** Splits "< 60s" into prefix "< ", number "60", suffix "s". */
function parseDisplay(value: string) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numeric, suffix] = match;
  return {
    prefix,
    suffix,
    target: Number.parseFloat(numeric),
    decimals: numeric.includes(".") ? numeric.split(".")[1].length : 0,
  };
}

/**
 * Counts a numeric stat up from zero the first time it scrolls into view.
 * Digits are written straight to the DOM, so counting costs no React render.
 * Screen readers get the final value once; the ticking digits are hidden.
 */
export function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    const parsed = parseDisplay(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }

    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          started = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / DURATION_MS);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = (parsed.target * eased).toFixed(parsed.decimals);
            el.textContent = `${parsed.prefix}${current}${parsed.suffix}`;
            if (progress < 1) frame = requestAnimationFrame(tick);
            else el.textContent = value;
          };

          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span className={cn("tabular", className)}>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
