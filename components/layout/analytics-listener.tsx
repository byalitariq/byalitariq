"use client";

import * as React from "react";
import Script from "next/script";
import { track } from "@/lib/analytics";

export function AnalyticsListener() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.("[data-analytics-cta]");
      if (!target) return;
      const ctaName = target.getAttribute("data-analytics-cta");
      if (ctaName) {
        track("cta_click", { cta: ctaName });
      }
    }

    document.addEventListener("click", handleClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
