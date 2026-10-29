import { cn } from "@/lib/utils";

/**
 * Fixed film-grain layer. Keeps large dark fields from banding and gives the
 * console a physical, printed quality. Purely decorative and non-interactive.
 */
export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("noise-layer pointer-events-none fixed inset-0 z-[70]", className)}
    />
  );
}
