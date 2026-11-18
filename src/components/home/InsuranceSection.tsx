import type React from "react";
import { useLocale, L } from "@/components/site/L";
import { home } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { ArrowRight, Banknote, Camera, ClipboardCheck, FileText } from "lucide-react";

export function InsuranceSection() {
  const t = home[useLocale()].insurance;
  return (
    <section
      id="insurance"
      aria-labelledby="insurance-heading"
      className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="label-mono text-brand-deep">{t.text01}</p>
          <h2
            id="insurance-heading"
            className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
          >
            <Words>{t.text02}</Words>
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/60">
            {t.text03}
          </p>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          <li>
            <Reveal className="h-full">
              <div className="group h-full glass glass-flat glass-light glass-interactive rounded-[28px] p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-ink ring-1 ring-brand/30 transition-transform duration-300 group-hover:scale-110">
                  <Camera className="size-5 text-brand" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold text-ink">{t.text04}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{t.text05}</p>
              </div>
            </Reveal>
          </li>
          <li>
            <Reveal delay={120} className="h-full">
              <div className="group h-full glass glass-flat glass-light glass-interactive rounded-[28px] p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-ink ring-1 ring-brand/30 transition-transform duration-300 group-hover:scale-110">
                  <FileText className="size-5 text-brand" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold text-ink">{t.text06}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{t.text07}</p>
              </div>
            </Reveal>
          </li>
          <li>
            <Reveal delay={240} className="h-full">
              <div className="group h-full glass glass-flat glass-light glass-interactive rounded-[28px] p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-ink ring-1 ring-brand/30 transition-transform duration-300 group-hover:scale-110">
                  <ClipboardCheck className="size-5 text-brand" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold text-ink">{t.text08}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{t.text09}</p>
              </div>
            </Reveal>
          </li>
        </ul>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <L
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-bold text-white transition-colors hover:bg-ink-soft"
            to="/insurance-claims/"
          >
            {t.text10}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </L>
          <L
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 font-bold text-ink transition-colors hover:border-brand/50"
            to="/financing/"
          >
            <Banknote className="size-4 text-brand" aria-hidden="true" />
            {t.text11}
          </L>
        </div>
      </div>
    </section>
  );
}
