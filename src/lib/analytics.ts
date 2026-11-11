import { site } from "@/config/site";

/** GA4 measurement ID from NEXT_PUBLIC_GA_ID. Empty string disables analytics. */
export const GA_MEASUREMENT_ID = site.analytics.gaId;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}
