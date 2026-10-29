"use client";

import * as React from "react";
import Lenis from "lenis";
import gsap from "gsap";

// The live instance, so overlays can lock scrolling properly instead of
// fighting Lenis with body overflow.
let activeLenis: Lenis | null = null;

export function stopScroll() {
  activeLenis?.stop();
}

export function startScroll() {
  activeLenis?.start();
}

/**
 * Lenis smooth scrolling driven by the GSAP ticker, so ScrollTrigger and the
 * scroll position never disagree. Disabled entirely under reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let cancelled = false;

    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      activeLenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      activeLenis = null;
    };
  }, []);

  return <>{children}</>;
}
