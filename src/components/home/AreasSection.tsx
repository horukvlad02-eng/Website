import type React from "react";
import { useLocale, L } from "@/components/site/L";
import { home } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { MapPin } from "lucide-react";

export function AreasSection() {
  const t = home[useLocale()].areas;
  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="scroll-mt-20 bg-white py-20 sm:py-28 blueprint-paper"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="label-mono text-brand-deep">{t.text01}</p>
          <h2
            id="areas-heading"
            className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
          >
            <Words>{t.text02}</Words>
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/60">
            {t.text03}
          </p>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <Reveal>
              <L
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-secondary hover:shadow-lg"
                to="/locations/miami/"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="size-5 text-brand" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-lg font-extrabold text-ink">
                    {t.text04}
                  </span>
                  <span className="block text-sm text-muted-foreground">{t.text05}</span>
                </span>
              </L>
            </Reveal>
          </li>
          <li>
            <Reveal delay={70}>
              <L
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-secondary hover:shadow-lg"
                to="/locations/coral-gables/"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="size-5 text-brand" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-lg font-extrabold text-ink">
                    {t.text06}
                  </span>
                  <span className="block text-sm text-muted-foreground">{t.text07}</span>
                </span>
              </L>
            </Reveal>
          </li>
          <li>
            <Reveal delay={140}>
              <L
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-secondary hover:shadow-lg"
                to="/locations/hialeah/"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="size-5 text-brand" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-lg font-extrabold text-ink">
                    {t.text08}
                  </span>
                  <span className="block text-sm text-muted-foreground">{t.text09}</span>
                </span>
              </L>
            </Reveal>
          </li>
          <li>
            <Reveal delay={210}>
              <L
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-secondary hover:shadow-lg"
                to="/locations/fort-lauderdale/"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="size-5 text-brand" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-lg font-extrabold text-ink">
                    {t.text10}
                  </span>
                  <span className="block text-sm text-muted-foreground">{t.text11}</span>
                </span>
              </L>
            </Reveal>
          </li>
          <li>
            <Reveal delay={280}>
              <L
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-secondary hover:shadow-lg"
                to="/locations/doral/"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="size-5 text-brand" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-lg font-extrabold text-ink">
                    {t.text12}
                  </span>
                  <span className="block text-sm text-muted-foreground">{t.text13}</span>
                </span>
              </L>
            </Reveal>
          </li>
          <li>
            <Reveal delay={350}>
              <L
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-secondary hover:shadow-lg"
                to="/locations/kendall/"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="size-5 text-brand" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-lg font-extrabold text-ink">
                    {t.text14}
                  </span>
                  <span className="block text-sm text-muted-foreground">{t.text15}</span>
                </span>
              </L>
            </Reveal>
          </li>
        </ul>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t.text16}
          <a
            href="tel:+17863724754"
            className="font-semibold text-ink underline underline-offset-4"
          >
            {t.text17}
          </a>
          {t.text18}
        </p>
      </div>
    </section>
  );
}
