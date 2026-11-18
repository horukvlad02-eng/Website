declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
/** Fire an analytics event when Google Analytics is present (no-op otherwise). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function")
    window.gtag("event", event, params);
}
