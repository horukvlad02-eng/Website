export const LOCALES = ["en", "es", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

/** Resolve the optional `{-$locale}` route param to a supported locale. */
export function toLocale(param: string | undefined): Locale {
  return isLocale(param) ? param : DEFAULT_LOCALE;
}

/** Ensure a trailing slash on the path part (site URLs always end with "/"). */
function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Prefix an app path ("/projects/", "/#inspection", "/") with the locale.
 * English lives at the root, other locales under "/es", "/fr".
 */
export function localizePath(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href;
  const hashIdx = href.indexOf("#");
  const path = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  const clean = withSlash(path || "/");
  if (locale === DEFAULT_LOCALE) return clean + hash;
  return (clean === "/" ? `/${locale}/` : `/${locale}${clean}`) + hash;
}

/** Split a pathname into its locale and the locale-less app path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(es|fr)(\/.*)?$/);
  if (m) return { locale: m[1] as Locale, path: withSlash(m[2] || "/") };
  return { locale: DEFAULT_LOCALE, path: withSlash(pathname || "/") };
}

export const HTML_LANG: Record<Locale, string> = { en: "en", es: "es", fr: "fr" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", es: "es_US", fr: "fr_FR" };
export const DATE_LOCALE: Record<Locale, string> = { en: "en-US", es: "es-US", fr: "fr-FR" };
