import { ArrowRight } from "lucide-react";
import { L, useLocale } from "@/components/site/L";
import { Words } from "@/components/motion/Words";
import { SITE } from "@/lib/site";
import { DATE_LOCALE, type Locale } from "@/lib/i18n";

/** Published Miami-Dade price per sq ft (low, high) — same table as the estimate calculator. */
const SYSTEMS = [
  { key: "shingle", low: 6, high: 9 },
  { key: "tile", low: 12, high: 20 },
  { key: "metal", low: 13, high: 22 },
  { key: "flat", low: 8, high: 15 },
] as const;
const SIZES = [1500, 2000, 2500];

const T: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    system: string;
    unit: string;
    names: Record<(typeof SYSTEMS)[number]["key"], string>;
    note: string;
    cta: string;
    call: string;
    all: string;
  }
> = {
  en: {
    eyebrow: "Before financing",
    title: "What the roof costs, before the payment plan.",
    intro:
      "These are the published Miami-Dade ranges for a typical home — tear-off, materials, labor, permit and cleanup included. Your inspection turns this band into one written number.",
    system: "System",
    unit: "sq ft",
    names: {
      shingle: "Architectural shingle",
      tile: "Concrete or clay tile",
      metal: "Standing seam metal",
      flat: "Flat / low slope",
    },
    note: "Ballpark only. Roof shape, the number of layers and the deck condition move the final price — and only the written quote is the real price.",
    cta: "Get my written price",
    call: "or call",
    all: "See all services",
  },
  es: {
    eyebrow: "Antes del financiamiento",
    title: "Lo que cuesta el techo, antes de hablar de pagos.",
    intro:
      "Estas son las cifras publicadas de Miami-Dade para una casa típica — remoción, materiales, mano de obra, permiso y limpieza incluidos. Su inspección convierte esta horquilla en un número escrito.",
    system: "Sistema",
    unit: "pies²",
    names: {
      shingle: "Shingle arquitectónico",
      tile: "Teja de hormigón o barro",
      metal: "Metal standing seam",
      flat: "Plano / poca pendiente",
    },
    note: "Solo una cifra aproximada. La forma del techo, las capas y el estado del deck cambian el precio final — y solo la cotización escrita es el precio real.",
    cta: "Quiero mi precio por escrito",
    call: "o llame al",
    all: "Ver todos los servicios",
  },
  fr: {
    eyebrow: "Avant le financement",
    title: "Ce que coûte le toit, avant de parler des mensualités.",
    intro:
      "Voici les fourchettes publiées pour Miami-Dade sur une maison type — dépose, matériaux, main-d’œuvre, permis et nettoyage compris. L’inspection transforme cette fourchette en un chiffre écrit.",
    system: "Système",
    unit: "pi²",
    names: {
      shingle: "Bardeau architectural",
      tile: "Tuile béton ou terre cuite",
      metal: "Métal standing seam",
      flat: "Plat / faible pente",
    },
    note: "Estimation indicative. La forme du toit, le nombre de couches et l’état du support changent le prix final — seul le devis écrit fait foi.",
    cta: "Obtenir mon devis écrit",
    call: "ou appelez",
    all: "Voir tous les services",
  },
};

const thCls = "px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground";

/** Total-price table (desktop table, stacked cards on mobile). */
export function TotalPrice() {
  const locale = useLocale();
  const t = T[locale];
  const money = new Intl.NumberFormat(DATE_LOCALE[locale], {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const num = new Intl.NumberFormat(DATE_LOCALE[locale]);
  const range = (s: (typeof SYSTEMS)[number], size: number) =>
    `${money.format(s.low * size)} – ${money.format(s.high * size)}`;
  const sizeLabel = (size: number) => `${num.format(size)} ${t.unit}`;

  return (
    <section
      aria-labelledby="total-price-heading"
      className="bg-surface py-20 sm:py-28 blueprint-paper"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-mono text-brand-deep">{t.eyebrow}</p>
        <h2 id="total-price-heading" className="display-title mt-4 max-w-3xl text-ink sm:text-5xl">
          <Words>{t.title}</Words>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">{t.intro}</p>
        <div className="glass glass-flat glass-light mt-12 hidden overflow-hidden rounded-[28px] p-0 lg:block">
          <table className="w-full text-left">
            <caption className="sr-only">{t.system}</caption>
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className={thCls}>
                  {t.system}
                </th>
                {SIZES.map((s) => (
                  <th key={s} scope="col" className={`${thCls} text-right`}>
                    {sizeLabel(s)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SYSTEMS.map((sys) => (
                <tr key={sys.key} className="border-b border-hairline last:border-0">
                  <th
                    scope="row"
                    className="px-6 py-5 font-display text-base font-extrabold text-ink"
                  >
                    {t.names[sys.key]}
                  </th>
                  {SIZES.map((s) => (
                    <td
                      key={s}
                      className="px-6 py-5 text-right font-display text-lg font-extrabold text-ink"
                    >
                      {range(sys, s)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-10 grid gap-4 lg:hidden">
          {SYSTEMS.map((sys) => (
            <li key={sys.key} className="glass glass-flat glass-light rounded-[28px] p-6">
              <h3 className="font-display text-lg font-extrabold text-ink">{t.names[sys.key]}</h3>
              <dl className="mt-4 space-y-2">
                {SIZES.map((s) => (
                  <div
                    key={s}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2 last:border-0"
                  >
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {sizeLabel(s)}
                    </dt>
                    <dd className="font-display text-lg font-extrabold text-ink">
                      {range(sys, s)}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t.note}</p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#inspection" className="btn-primary">
            {t.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href={SITE.phoneHref}
            className="font-display text-lg font-extrabold text-ink hover:text-brand-deep"
          >
            {t.call} {SITE.phone}
          </a>
          <L className="font-bold text-brand-deep underline underline-offset-4" to="/services/">
            {t.all}
          </L>
        </div>
      </div>
    </section>
  );
}
