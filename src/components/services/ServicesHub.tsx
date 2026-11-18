import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { L } from "@/components/site/L";
import { Img } from "@/components/site/Img";
import type { ImageName } from "@/lib/image-meta";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { Accordion } from "@/components/site/Accordion";
import { Inspection } from "@/components/sections/Inspection";
import type { HubData } from "@/content/services";
export function ServicesHub({ data }: { data: HubData }) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[900px] -translate-x-1/2 glow-soft"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="label-mono text-brand">{data.hero.copy[0]!}</p>
          <h1 className="display-title mt-6 max-w-4xl text-balance text-[2.4rem] text-white sm:text-6xl lg:text-7xl">
            {data.hero.copy[1]!}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {data.hero.copy[2]!}
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="#inspection" className="btn-primary">
              <ArrowDown className="size-4" aria-hidden="true" />
              {data.hero.copy[3]!}
            </a>
            <a href="tel:+17863724754" className="btn-outline-light">
              <Phone className="size-4 text-brand" aria-hidden="true" />
              {data.hero.copy[4]!}
            </a>
          </div>
          <p className="label-mono mt-8 text-white/35">{data.hero.copy[5]!}</p>
        </div>
      </section>
      <section className="bg-white py-20 sm:py-28 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-6 sm:grid-cols-2">
            <li>
              <Reveal className="h-full">
                <div className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-8 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                    {data.cards.copy[0]!}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-ink group-hover:text-brand-deep">
                    <Words>{data.cards.copy[1]!}</Words>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {data.cards.copy[2]!}
                  </p>
                  <L
                    to={data.cards.copy[3]!}
                    className="mt-6 inline-flex items-center gap-2 font-display text-base font-extrabold text-brand-deep transition-colors hover:text-brand"
                  >
                    {data.cards.copy[4]!}
                    <span aria-hidden="true">{data.cards.copy[5]!}</span>
                  </L>
                </div>
              </Reveal>
            </li>
            <li>
              <Reveal delay={80} className="h-full">
                <div className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-8 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                    {data.cards.copy[6]!}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-ink group-hover:text-brand-deep">
                    <Words>{data.cards.copy[7]!}</Words>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {data.cards.copy[8]!}
                  </p>
                  <L
                    to={data.cards.copy[9]!}
                    className="mt-6 inline-flex items-center gap-2 font-display text-base font-extrabold text-brand-deep transition-colors hover:text-brand"
                  >
                    {data.cards.copy[10]!}
                    <span aria-hidden="true">{data.cards.copy[11]!}</span>
                  </L>
                </div>
              </Reveal>
            </li>
            <li>
              <Reveal delay={160} className="h-full">
                <div className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-8 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                    {data.cards.copy[12]!}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-ink group-hover:text-brand-deep">
                    <Words>{data.cards.copy[13]!}</Words>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {data.cards.copy[14]!}
                  </p>
                  <L
                    to={data.cards.copy[15]!}
                    className="mt-6 inline-flex items-center gap-2 font-display text-base font-extrabold text-brand-deep transition-colors hover:text-brand"
                  >
                    {data.cards.copy[16]!}
                    <span aria-hidden="true">{data.cards.copy[17]!}</span>
                  </L>
                </div>
              </Reveal>
            </li>
            <li>
              <Reveal delay={240} className="h-full">
                <div className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-8 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                    {data.cards.copy[18]!}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-ink group-hover:text-brand-deep">
                    <Words>{data.cards.copy[19]!}</Words>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {data.cards.copy[20]!}
                  </p>
                  <L
                    to={data.cards.copy[21]!}
                    className="mt-6 inline-flex items-center gap-2 font-display text-base font-extrabold text-brand-deep transition-colors hover:text-brand"
                  >
                    {data.cards.copy[22]!}
                    <span aria-hidden="true">{data.cards.copy[23]!}</span>
                  </L>
                </div>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>
      <section
        aria-labelledby="compare-heading"
        className="bg-surface py-20 sm:py-28 blueprint-paper"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="label-mono text-brand-deep">{data.compare.copy[0]!}</p>
          <h2 id="compare-heading" className="display-title mt-4 max-w-3xl text-ink sm:text-5xl">
            <Words>{data.compare.copy[1]!}</Words>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">
            {data.compare.copy[2]!}
          </p>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <li className="h-full">
              <article className="glass glass-flat glass-light rounded-[28px] flex h-full flex-col p-7">
                <span className="label-mono text-brand-deep">{data.compare.copy[3]!}</span>
                <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
                  {data.compare.copy[4]!}
                </h3>
                <div className="mt-5 space-y-3">
                  <div className="border-b border-hairline pb-2 last:border-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">
                      {data.compare.copy[5]!}
                    </span>
                    <span className="mt-1 block whitespace-nowrap font-display text-xl font-black text-ink">
                      {data.compare.copy[6]!}
                      <span className="ml-1 font-sans text-[0.7rem] font-medium text-muted-foreground">
                        {data.compare.copy[7]!}
                      </span>
                    </span>
                  </div>
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs font-semibold text-ink/50">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {data.compare.copy[8]!}
                </p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {data.compare.copy[9]!}
                </p>
                <L
                  to={data.compare.copy[10]!}
                  className="mt-6 inline-flex items-center gap-2 font-bold text-brand-deep"
                >
                  {data.compare.copy[11]!}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </L>
              </article>
            </li>
            <li className="h-full">
              <article className="glass glass-flat glass-light rounded-[28px] flex h-full flex-col p-7">
                <span className="label-mono text-brand-deep">{data.compare.copy[12]!}</span>
                <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
                  {data.compare.copy[13]!}
                </h3>
                <div className="mt-5 space-y-3">
                  <div className="border-b border-hairline pb-2 last:border-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">
                      {data.compare.copy[14]!}
                    </span>
                    <span className="mt-1 block whitespace-nowrap font-display text-xl font-black text-ink">
                      {data.compare.copy[15]!}
                      <span className="ml-1 font-sans text-[0.7rem] font-medium text-muted-foreground">
                        {data.compare.copy[16]!}
                      </span>
                    </span>
                  </div>
                  <div className="border-b border-hairline pb-2 last:border-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">
                      {data.compare.copy[17]!}
                    </span>
                    <span className="mt-1 block whitespace-nowrap font-display text-xl font-black text-ink">
                      {data.compare.copy[18]!}
                      <span className="ml-1 font-sans text-[0.7rem] font-medium text-muted-foreground">
                        {data.compare.copy[19]!}
                      </span>
                    </span>
                  </div>
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs font-semibold text-ink/50">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {data.compare.copy[20]!}
                </p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {data.compare.copy[21]!}
                </p>
                <L
                  to={data.compare.copy[22]!}
                  className="mt-6 inline-flex items-center gap-2 font-bold text-brand-deep"
                >
                  {data.compare.copy[23]!}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </L>
              </article>
            </li>
            <li className="h-full">
              <article className="glass glass-flat glass-light rounded-[28px] flex h-full flex-col p-7">
                <span className="label-mono text-brand-deep">{data.compare.copy[24]!}</span>
                <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
                  {data.compare.copy[25]!}
                </h3>
                <div className="mt-5 space-y-3">
                  <div className="border-b border-hairline pb-2 last:border-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-ink/50">
                      {data.compare.copy[26]!}
                    </span>
                    <span className="mt-1 block whitespace-nowrap font-display text-xl font-black text-ink">
                      {data.compare.copy[27]!}
                      <span className="ml-1 font-sans text-[0.7rem] font-medium text-muted-foreground">
                        {data.compare.copy[28]!}
                      </span>
                    </span>
                  </div>
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs font-semibold text-ink/50">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {data.compare.copy[29]!}
                </p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {data.compare.copy[30]!}
                </p>
                <L
                  to={data.compare.copy[31]!}
                  className="mt-6 inline-flex items-center gap-2 font-bold text-brand-deep"
                >
                  {data.compare.copy[32]!}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </L>
              </article>
            </li>
            <li className="h-full">
              <article className="glass glass-flat glass-light rounded-[28px] flex h-full flex-col p-7">
                <span className="label-mono text-brand-deep">{data.compare.copy[33]!}</span>
                <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
                  {data.compare.copy[34]!}
                </h3>
                <div className="mt-5 space-y-3">
                  <p className="font-display text-xl font-extrabold text-ink">
                    {data.compare.copy[35]!}
                  </p>
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {data.compare.copy[36]!}
                </p>
                <L
                  to={data.compare.copy[37]!}
                  className="mt-6 inline-flex items-center gap-2 font-bold text-brand-deep"
                >
                  {data.compare.copy[38]!}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </L>
              </article>
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-secondary py-20 sm:py-28 blueprint-paper">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            <Words>{data.included.copy[0]!}</Words>
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {data.included.items1?.map((item1, index) => (
              <li key={index} className="flex items-start gap-3 text-ink/80">
                {" "}
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15">
                  {" "}
                  <CircleCheck className="size-4 text-brand-deep" aria-hidden="true" />{" "}
                </span>{" "}
                {item1.copy[0]!}{" "}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <a
              href="tel:+17863724754"
              className="inline-flex items-center gap-2 font-display text-lg font-extrabold text-ink transition-colors hover:text-brand-deep"
            >
              <Phone className="size-5 text-brand" aria-hidden="true" />
              {data.included.copy[1]!}
              {data.included.copy[2]!}
              {data.included.copy[3]!}
            </a>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="services-faq-heading"
        className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="label-mono text-brand-deep">{data.faq.copy[0]!}</p>
          <h2
            id="services-faq-heading"
            className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
          >
            <Words>{data.faq.copy[1]!}</Words>
          </h2>
          <Accordion items={data.faqItems} variant="light" className="mt-12" />
        </div>
      </section>
      <Inspection />
    </>
  );
}
