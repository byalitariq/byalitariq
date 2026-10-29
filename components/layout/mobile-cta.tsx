"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileCta() {
  const pathname = usePathname();

  // Hide on contact and audit pages where the form is already prominent
  if (pathname === "/contact" || pathname === "/audit") {
    return null;
  }

  return (
    <aside
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-2.5 border-t border-border/80 bg-bg/95 px-4 py-2.5 shadow-lg backdrop-blur-lg sm:hidden"
    >
      <Button
        href="/audit"
        variant="secondary"
        size="sm"
        className="h-9 flex-1 justify-center text-xs"
        data-analytics-cta="mobile-free-audit"
      >
        Free audit
      </Button>
      <Button
        href="/contact"
        variant="primary"
        size="sm"
        className="h-9 flex-1 justify-center text-xs"
        data-analytics-cta="mobile-book-call"
      >
        <span>Book a call</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Button>
    </aside>
  );
}