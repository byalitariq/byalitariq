"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Surface whose border lights up under the cursor. Coordinates are written to
 * CSS variables, so the effect costs one style write per pointer move and no
 * React re-render.
 */
export function SpotlightCard({ className, children, onMouseMove, ...props }: SpotlightCardProps) {
  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      onMouseMove?.(event);
    },
    [onMouseMove],
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight relative overflow-hidden rounded-[18px] border border-border bg-surface",
        className,
      )}
      {...props}
    >
      <span className="spotlight-fill" aria-hidden="true" />
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </div>
  );
}
