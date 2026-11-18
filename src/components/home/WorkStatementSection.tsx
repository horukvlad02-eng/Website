import { Blueprint } from "@/components/site/Blueprint";
import type React from "react";
import { useLocale, L } from "@/components/site/L";
import { home } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";

export function WorkStatementSection() {
  const t = home[useLocale()].workStatement;
  return (
    <section
      id="work"
      aria-labelledby="work-statement-heading"
      className="relative overflow-hidden blueprint-grid scroll-mt-20 py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 opacity-[0.12]"
        aria-hidden="true"
      >
        <Blueprint className="pointer-events-none absolute select-none text-blueprint-ink h-[520px] w-[900px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-mono text-brand">{t.text01}</p>
        <Reveal>
          <h2
            id="work-statement-heading"
            className="display-title mt-6 max-w-4xl text-white sm:text-6xl lg:text-7xl"
          >
            <Words>{t.text02}</Words>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">{t.text03}</p>
        </Reveal>
      </div>
    </section>
  );
}
