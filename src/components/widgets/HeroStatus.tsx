import { useEffect, useState } from "react";
import { CloudLightning } from "lucide-react";
import { useLocale } from "@/components/site/L";
import { SITE } from "@/lib/site";
const copy = {
  en: {
    open: (e: number | string) => `Open now \xb7 until ${e}`,
    closed: (e: number | string) => `Closed \xb7 opens ${e}`,
    season: (e: number | string) => `Hurricane season \xb7 ${e} ${1 === e ? "day" : "days"} left`,
    pre: (e: number | string) => `Hurricane season starts in ${e} ${1 === e ? "day" : "days"}`,
    seasonLast: "Hurricane season ends today",
    seasonStart: "Hurricane season starts today",
  },
  es: {
    open: (e: number | string) => `Abierto ahora \xb7 hasta las ${e}`,
    closed: (e: number | string) => `Cerrado \xb7 abre ${e}`,
    season: (e: number | string) =>
      `Temporada de huracanes \xb7 ${e} ${1 === e ? "día" : "días"} restantes`,
    pre: (e: number | string) =>
      `La temporada de huracanes empieza en ${e} ${1 === e ? "día" : "días"}`,
    seasonLast: "Hoy termina la temporada de huracanes",
    seasonStart: "Hoy empieza la temporada de huracanes",
  },
  fr: {
    open: (e: number | string) => `Ouvert maintenant \xb7 jusqu’\xe0 ${e}`,
    closed: (e: number | string) => `Ferm\xe9 \xb7 ouvre ${e}`,
    season: (e: number | string) =>
      `Saison des ouragans \xb7 ${e} ${1 === e ? "jour" : "jours"} restants`,
    pre: (e: number | string) =>
      `La saison des ouragans commence dans ${e} ${1 === e ? "jour" : "jours"}`,
    seasonLast: "La saison des ouragans se termine aujourd’hui",
    seasonStart: "La saison des ouragans commence aujourd’hui",
  },
};
export function HeroStatus() {
  const locale = useLocale(),
    [state, setState] = useState<{
      open: boolean;
      label: string;
      season: string;
      inSeason: boolean;
    } | null>(null);
  useEffect(() => {
    function update() {
      const t = copy[locale],
        lang = { en: "en-US", es: "es-US", fr: "fr-FR" }[locale],
        parts = new Intl.DateTimeFormat("en-US", {
          timeZone: SITE.timeZone,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          hourCycle: "h23",
        }).formatToParts(new Date()),
        get = (key: string) => Number(parts.find((p) => p.type === key)?.value),
        year = get("year"),
        month = get("month"),
        day = get("day"),
        hour = get("hour"),
        stamp = Date.UTC(year, month - 1, day),
        weekday = new Date(stamp).getUTCDay(),
        hours = SITE.hours[weekday],
        open = !!hours && hour >= hours[0] && hour < hours[1];
      // Same short format as the original chip: "7 AM", "5 PM" (French: "7 h").
      const time = (h: number) =>
        locale === "fr" ? `${h % 12 || 12} h` : `${h % 12 || 12} ${h >= 12 ? "PM" : "AM"}`;
      let label = "";
      if (open) label = t.open(time(hours[1]));
      else
        for (let offset = 0; offset < 8; offset++) {
          const w = (weekday + offset) % 7,
            h = SITE.hours[w];
          if (!h || (offset === 0 && hour >= h[0])) continue;
          label = t.closed(
            (offset
              ? new Date(Date.UTC(2026, 0, 4 + w, 12)).toLocaleDateString(lang, {
                  weekday: "long",
                  timeZone: "UTC",
                }) + " "
              : "") + time(h[0]),
          );
          break;
        }
      const start = Date.UTC(year, 5, 1),
        end = Date.UTC(year, 10, 30),
        inSeason = stamp >= start && stamp <= end,
        days = Math.round(
          ((inSeason ? end : stamp > end ? Date.UTC(year + 1, 5, 1) : start) - stamp) / 86400000,
        );
      setState({
        open,
        label,
        inSeason,
        season: inSeason
          ? days === 0
            ? t.seasonLast
            : t.season(days)
          : days === 0
            ? t.seasonStart
            : t.pre(days),
      });
    }
    update();
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", update);
    let timer: ReturnType<typeof setTimeout>;
    function schedule() {
      timer = setTimeout(() => {
        update();
        schedule();
      }, 60000);
    }
    schedule();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [locale]);
  return (
    <div className="mt-4 flex min-h-8 flex-wrap items-center gap-2 text-xs font-semibold text-white/80 sm:text-[13px]">
      {state && (
        <>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span
              aria-hidden="true"
              className={`relative inline-flex size-2 rounded-full ${state.open ? "bg-emerald-400" : "bg-white/40"}`}
            />
            {state.label}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <CloudLightning
              aria-hidden="true"
              className={`size-3.5 ${state.inSeason ? "text-brand" : "text-white/50"}`}
            />
            {state.season}
          </span>
        </>
      )}
    </div>
  );
}
