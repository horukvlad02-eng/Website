import type React from "react";
import { useLocale, L } from "@/components/site/L";
import { home } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { BadgeCheck, Banknote, ShieldCheck, Zap } from "lucide-react";

export function ValuesSection() {
  const t = home[useLocale()].values;
  return (
    <section
      aria-labelledby="values-heading"
      className="blueprint-paper relative pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="values-heading" className="sr-only">
          <Words>{t.text01}</Words>
        </h2>
        <ul className="glass glass-flat glass-light grid grid-cols-1 gap-y-10 rounded-[28px] px-6 py-9 sm:grid-cols-2 sm:gap-x-10 sm:px-8 lg:grid-cols-4 lg:gap-y-0 lg:px-10">
          <li className="lg:border-l lg:border-ink/10 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
            <Reveal>
              <div className="group">
                <span
                  className="flex size-11 items-center justify-center rounded-2xl bg-ink text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <Zap className="size-5" aria-hidden="true" />
                </span>
                <p className="label-mono mt-5 min-h-[2.6em] text-ink/45">{t.text02}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{t.text03}</p>
              </div>
            </Reveal>
          </li>
          <li className="lg:border-l lg:border-ink/10 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
            <Reveal delay={90}>
              <div className="group">
                <span
                  className="flex size-11 items-center justify-center rounded-2xl bg-ink text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <Banknote className="size-5" aria-hidden="true" />
                </span>
                <p className="label-mono mt-5 min-h-[2.6em] text-ink/45">{t.text04}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{t.text05}</p>
              </div>
            </Reveal>
          </li>
          <li className="lg:border-l lg:border-ink/10 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
            <Reveal delay={180}>
              <div className="group">
                <span
                  className="flex size-11 items-center justify-center rounded-2xl bg-ink text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <p className="label-mono mt-5 min-h-[2.6em] text-ink/45">{t.text06}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{t.text07}</p>
              </div>
            </Reveal>
          </li>
          <li className="lg:border-l lg:border-ink/10 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
            <Reveal delay={270}>
              <div className="group">
                <span
                  className="flex size-11 items-center justify-center rounded-2xl bg-ink text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <BadgeCheck className="size-5" aria-hidden="true" />
                </span>
                <p className="label-mono mt-5 min-h-[2.6em] text-ink/45">{t.text08}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{t.text09}</p>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
