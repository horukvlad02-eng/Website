declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    va?: (...args: unknown[]) => void;
  }
}
/** Fire an analytics event to Google Analytics and/or Vercel Web Analytics, whichever is present. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", event, params);
  if (typeof window.va === "function") {
    // Vercel custom events accept flat string/number/boolean values only.
    const data: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(params))
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") data[k] = v;
    window.va("event", { name: event, data });
  }
}
