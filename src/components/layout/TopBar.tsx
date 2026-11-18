import { ArrowRight, TriangleAlert } from "lucide-react";
import { useLocale } from "@/components/site/L";
import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { lead: string; hours: string }> = {
  en: { lead: "Roof leak? Call us", hours: "— Mon–Fri 7am–5pm · Sat 7am–2pm" },
  es: { lead: "¿Gotera en el techo? Llámenos", hours: "— Lun–vie 7am–5pm · sáb 7am–2pm" },
  fr: { lead: "Fuite de toit ? Appelez-nous", hours: "— Lun–ven 7 h–17 h · sam 7 h–14 h" },
};

export function TopBar() {
  const t = T[useLocale()];
  return (
    <div className="relative z-50 border-b border-white/5 bg-black text-white">
      <a
        href={SITE.phoneHref}
        className="group mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-xs font-medium tracking-wide sm:text-sm"
      >
        <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand" />
          <span className="relative inline-flex size-2.5 rounded-full bg-brand shadow-[0_0_10px_#f26b1d]" />
        </span>
        <span className="text-white/90">
          <TriangleAlert
            className="mr-1 inline size-3.5 align-[-2px] text-brand"
            aria-hidden="true"
          />
          <span className="font-semibold text-white">{t.lead}</span>{" "}
          <span className="hidden sm:inline">{t.hours}</span>
        </span>
        <span className="hidden items-center gap-1 font-semibold text-brand sm:inline-flex">
          {SITE.phone}
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </a>
    </div>
  );
}
