import { LOCALES, OG_LOCALE, localizePath, type Locale } from "./i18n";
import { SITE } from "./site";

type HeadInput = {
  locale: Locale;
  /** Locale-less app path, e.g. "/services/metal-roofing/". */
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

/** Per-page head: unique title/description, canonical, hreflang alternates and social cards. */
export function pageHead({ locale, path, title, description, ogTitle, ogDescription }: HeadInput) {
  const url = SITE.url + localizePath(locale, path);
  const image = `${SITE.url}/og/${locale}.jpg`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: SITE.indexable
          ? "index, follow, max-image-preview:large, max-snippet:-1"
          : "noindex, nofollow",
      },
      { property: "og:title", content: ogTitle ?? title },
      { property: "og:description", content: ogDescription ?? description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: OG_LOCALE[locale] },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle ?? title },
      { name: "twitter:description", content: ogDescription ?? description },
      { name: "twitter:image", content: image },
    ],
    links: [
      { rel: "canonical", href: url },
      ...LOCALES.map((l) => ({
        rel: "alternate",
        hrefLang: l,
        href: SITE.url + localizePath(l, path),
      })),
      { rel: "alternate", hrefLang: "x-default", href: SITE.url + localizePath("en", path) },
    ],
  };
}
