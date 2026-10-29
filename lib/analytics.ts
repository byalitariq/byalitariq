// Funnel events from docs/09-seo-and-analytics.md. Sends to Plausible when it is loaded.
export type AnalyticsEvent =
  | "cta_click"
  | "lead_submit"
  | "call_booked"
  | "tool_start"
  | "tool_complete"
  | "template_download"
  | "demo_chat_start";

type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

export function track(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as { plausible?: Plausible }).plausible;
  plausible?.(event, props ? { props } : undefined);
}
