"use client";

import * as React from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** 0-1: how far the element follows the cursor. */
  strength?: number;
}

/**
 * Pulls its child toward the cursor with a spring-damped GSAP tween, then
 * releases on leave. Pointer-only; inert under reduced motion.
 */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </div>
  );
}
