import { ArrowUpRight } from "lucide-react";
import { L, useLocale } from "@/components/site/L";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import type { Locale } from "@/lib/i18n";

const BRANDS: [string, string][] = [
  ["gaf", "GAF"],
  ["boral", "Boral"],
  ["englert", "Englert"],
  ["polyglass", "Polyglass"],
  ["firestone", "Firestone"],
  ["mule-hide", "Mule-Hide"],
];

const T: Record<Locale, { eyebrow: string; title: string; note: string }> = {
  en: {
    eyebrow: "Materials",
    title: "Only the best products.",
    note: "We install systems from manufacturers we are certified with. Open a brand to see the products and warranty we install.",
  },
  es: {
    eyebrow: "Materiales",
    title: "Solo los mejores productos.",
    note: "Instalamos sistemas de fabricantes con los que estamos certificados. Toque una marca para ver los productos y la garantía que instalamos.",
  },
  fr: {
    eyebrow: "Matériaux",
    title: "Uniquement les meilleurs produits.",
    note: "Nous posons des systèmes de fabricants avec lesquels nous sommes certifiés. Ouvrez une marque pour voir les produits et la garantie que nous posons.",
  },
};

/** Manufacturer tiles linking to the material pages. */
export function Brands() {
  const t = T[useLocale()];
  return (
    <section
      aria-labelledby="brands-heading"
      className="border-y border-border bg-white py-16 sm:py-20 blueprint-paper"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="label-mono text-brand-deep">{t.eyebrow}</p>
          <h2
            id="brands-heading"
            className="display-title mt-5 text-balance text-[2rem] text-ink sm:text-5xl lg:text-6xl"
          >
            <Words>{t.title}</Words>
          </h2>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BRANDS.map(([slug, name], i) => (
            <li key={slug}>
              <Reveal delay={i * 70}>
                <L
                  to={`/materials/${slug}/`}
                  className="group relative flex h-20 items-center justify-center overflow-hidden rounded-2xl border border-border bg-secondary px-4 font-display text-lg font-black tracking-tight text-ink/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:text-ink hover:shadow-[0_16px_40px_-20px_rgba(242,107,29,0.5)]"
                >
                  <span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    aria-hidden="true"
                  />
                  <span className="relative">{name}</span>
                  <ArrowUpRight
                    className="absolute right-3 top-3 size-4 text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </L>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted-foreground">{t.note}</p>
      </div>
    </section>
  );
}
