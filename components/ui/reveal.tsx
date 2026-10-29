"use client";

import * as React from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset in pixels before the element settles. */
  y?: number;
  delay?: number;
}

/**
 * Scroll-triggered entrance: a short rise plus fade, played once. Under
 * reduced motion the element is simply left visible.
 */
export function Reveal({ children, className, y = 26, delay = 0 }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let tween: gsap.core.Tween | null = null;

    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      tween = gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    });

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [y, delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
