import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { L, useLocale } from "@/components/site/L";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { LOCALES, localizePath, splitLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV: Record<Locale, { path: string; label: string }[]> = {
  en: [
    { path: "/#services", label: "Services" },
    { path: "/projects/", label: "Our Work" },
    { path: "/#areas", label: "Areas" },
    { path: "/insurance-claims/", label: "Insurance" },
    { path: "/financing/", label: "Financing" },
    { path: "/why-centurion/", label: "Why Us" },
  ],
  es: [
    { path: "/#services", label: "Servicios" },
    { path: "/projects/", label: "Proyectos" },
    { path: "/#areas", label: "Zonas" },
    { path: "/insurance-claims/", label: "Seguro" },
    { path: "/financing/", label: "Financiamiento" },
    { path: "/why-centurion/", label: "Nosotros" },
  ],
  fr: [
    { path: "/#services", label: "Services" },
    { path: "/projects/", label: "Projets" },
    { path: "/#areas", label: "Secteurs" },
    { path: "/insurance-claims/", label: "Assurance" },
    { path: "/financing/", label: "Financement" },
    { path: "/why-centurion/", label: "Pourquoi" },
  ],
};
const UI: Record<
  Locale,
  {
    cta: string;
    call: string;
    open: string;
    close: string;
    lang: string;
    primary: string;
    mobile: string;
  }
> = {
  en: {
    cta: "Free Inspection",
    call: "Call",
    open: "Open menu",
    close: "Close menu",
    lang: "Language",
    primary: "Primary",
    mobile: "Mobile",
  },
  es: {
    cta: "Inspección gratuita",
    call: "Llamar",
    open: "Abrir el menú",
    close: "Cerrar el menú",
    lang: "Idioma",
    primary: "Principal",
    mobile: "Móvil",
  },
  fr: {
    cta: "Inspection gratuite",
    call: "Appeler",
    open: "Ouvrir le menu",
    close: "Fermer le menu",
    lang: "Langue",
    primary: "Principale",
    mobile: "Mobile",
  },
};

/** Remember the chosen language (non-English) for a year, like the original site. */
function rememberLang(l: Locale) {
  const base = "site_lang=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = base;
  if (l !== "en")
    document.cookie = `site_lang=${l}; path=/; max-age=31536000; samesite=lax; secure`;
}

function LangLinks({
  current,
  path,
  compact,
}: {
  current: Locale;
  path: string;
  compact?: boolean;
}) {
  return (
    <>
      {LOCALES.map((l, i) => (
        <span key={l} className={compact ? undefined : "flex items-center gap-1.5"}>
          {!compact && i > 0 ? (
            <span className="text-white/25" aria-hidden="true">
              ·
            </span>
          ) : null}
          <a
            href={localizePath(l, path)}
            hrefLang={l}
            aria-current={l === current ? "true" : undefined}
            onClick={() => {
              if (l === current) return;
              rememberLang(l);
              document.documentElement.classList.add("lang-switching");
            }}
            className={cn(
              "inline-flex size-7 items-center justify-center",
              l === current ? "text-brand" : "text-white/60 transition-colors hover:text-white",
            )}
          >
            {l.toUpperCase()}
          </a>
        </span>
      ))}
    </>
  );
}

export function SiteHeader() {
  const locale = useLocale();
  const { pathname, hash } = useLocation();
  const { path } = splitLocale(pathname);
  const [open, setOpen] = useState(false);
  const nav = NAV[locale];
  const t = UI[locale];

  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="glass-bar vt-header">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:h-20 lg:px-8">
          <Logo />
          <nav aria-label={t.primary} className="hidden lg:block">
            <ul className="flex items-center gap-3 xl:gap-4 2xl:gap-6">
              {nav.map((n) => (
                <li key={n.path}>
                  <L
                    to={n.path}
                    className="whitespace-nowrap text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {n.label}
                  </L>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <div
              className="hidden items-center gap-1.5 text-xs font-bold sm:flex"
              role="group"
              aria-label={t.lang}
            >
              <LangLinks current={locale} path={path} />
            </div>
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:text-brand md:flex lg:hidden 2xl:flex"
            >
              <Phone className="size-4 text-brand" aria-hidden="true" />
              {SITE.phone}
            </a>
            <L to="/#inspection" className="btn-primary hidden whitespace-nowrap sm:inline-flex">
              {t.cta}
            </L>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="glass-chip flex size-9 items-center justify-center rounded-full text-white sm:size-10 lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
              <span className="sr-only">{open ? t.close : t.open}</span>
            </button>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/5"
          aria-hidden="true"
        >
          <div className="scroll-progress h-full bg-gradient-to-r from-brand to-brand-bright" />
        </div>
      </div>
      <div className="mnav lg:hidden" data-open={open}>
        <div>
          <nav id="mobile-nav" aria-label={t.mobile} className="glass-bar border-t border-white/10">
            <ul className="flex flex-col px-4 py-4">
              {nav.map((n) => (
                <li key={n.path}>
                  <L
                    to={n.path}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {n.label}
                  </L>
                </li>
              ))}
              <li className="flex items-center justify-center gap-4 pt-3 text-sm font-bold">
                <LangLinks current={locale} path={path} compact />
              </li>
              <li className="pt-2">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-base font-bold text-ink"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {t.call} {SITE.phone}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
