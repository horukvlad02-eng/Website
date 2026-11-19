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
import type { ServiceData } from "@/content/services";
export function ServicePage({ data }: { data: ServiceData }) {
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
          <p className="label-mono mt-8 text-white/55">{data.hero.copy[5]!}</p>
        </div>
      </section>
      <section className="bg-white py-20 sm:py-28 blueprint-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-ink/20">
            <Img
              src={data.overview.copy[1]! as ImageName}
              alt={data.overview.copy[0]!}
              className="aspect-[4/3] w-full object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-deep">
              {data.overview.copy[2]!}
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
              <Words>{`${data.overview.copy[3]!} ${data.overview.copy[4]!}`}</Words>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {data.overview.copy[5]!}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {data.overview.copy[6]!}
            </p>
            <a
              href="tel:+17863724754"
              className="mt-8 inline-flex items-center gap-2 font-display text-lg font-extrabold text-ink transition-colors hover:text-brand-deep"
            >
              <Phone className="size-5 text-brand" aria-hidden="true" />
              {data.overview.copy[7]!} {data.overview.copy[8]!}
            </a>
          </div>
        </div>
      </section>
      <section className="bg-secondary py-20 sm:py-28 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            <Words>{data.benefits.copy[0]!}</Words>
          </h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.benefits.items1?.map((item1, index) => (
              <li key={index}>
                {" "}
                <Reveal delay={index * 100} className="h-full">
                  {" "}
                  <div className="h-full glass glass-flat glass-light glass-interactive rounded-[28px] p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    {" "}
                    <CircleCheck className="size-8 text-brand" aria-hidden="true" />{" "}
                    <h3 className="mt-4 font-display text-lg font-extrabold text-ink">
                      {item1.copy[0]!}
                    </h3>{" "}
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item1.copy[1]!}
                    </p>{" "}
                  </div>{" "}
                </Reveal>{" "}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="pricing" className="bg-surface py-20 sm:py-28 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {data.repairNotice && (
            <p className="mb-10 max-w-3xl rounded-2xl border border-brand/25 bg-brand/5 px-6 py-5 text-base leading-relaxed text-ink">
              {data.repairNotice}
            </p>
          )}
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            <div>
              <p className="label-mono text-brand-deep">{data.pricing.copy[0]!}</p>
              <h2 className="display-title mt-4 max-w-2xl text-balance">
                <Words>{data.pricing.copy[1]!}</Words>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {data.pricing.copy[2]!}
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {data.pricing.items1?.map((item1, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm font-semibold text-ink"
                  >
                    {" "}
                    <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />{" "}
                    {item1.copy[0]!}{" "}
                    <span className="font-mono text-xs text-muted-foreground">
                      {" "}
                      {item1.copy[1]!} {item1.copy[2]!}{" "}
                    </span>{" "}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#inspection" className="btn-primary">
                  {data.pricing.copy[3]!}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="tel:+17863724754"
                  className="inline-flex items-center gap-2 font-display text-lg font-extrabold text-ink transition-colors hover:text-brand-deep"
                >
                  <Phone className="size-5 text-brand" aria-hidden="true" />
                  <span className="font-sans text-base font-medium text-muted-foreground">
                    {data.pricing.copy[4]!}
                  </span>
                  {data.pricing.copy[5]!}
                </a>
              </div>
            </div>
            <div className="glass glass-flat glass-light rounded-[28px] hidden overflow-hidden p-0 lg:block">
              <table className="w-full text-left">
                <caption className="sr-only">{data.pricing.copy.slice(6, 9).join(" ")}</caption>
                <thead>
                  <tr className="border-b border-hairline">
                    <th
                      scope="col"
                      className="px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {data.pricing.copy[9]!}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {data.pricing.copy[10]!}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.pricing.items2?.map((item2, index) => (
                    <tr key={index} className="border-b border-hairline last:border-0">
                      <th
                        scope="row"
                        className="px-6 py-5 align-top font-display text-base font-extrabold text-ink"
                      >
                        {" "}
                        {item2.copy[0]!}{" "}
                        <span className="mt-1 block font-sans text-xs font-normal text-muted-foreground">
                          {item2.copy[1]!}
                        </span>{" "}
                      </th>
                      <td className="px-6 py-5 text-right align-top">
                        {item2.items3?.map((item3, index) => (
                          <span
                            key={index}
                            className="block whitespace-nowrap font-display text-lg font-extrabold text-ink"
                          >
                            {" "}
                            {item3.copy[0]!}{" "}
                            <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">
                              {" "}
                              {item3.copy[1]!} {item3.copy[2]!}{" "}
                            </span>{" "}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-hairline bg-white/60 px-6 py-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">
                {data.pricing.copy[11]!}
              </p>
            </div>
            <ul className="glass glass-flat glass-light rounded-[28px] space-y-4 p-5 lg:hidden">
              {data.pricing.items4?.map((item4, index) => (
                <li key={index} className="border-b border-hairline pb-4 last:border-0 last:pb-0">
                  {" "}
                  <p className="font-display text-base font-extrabold text-ink">
                    {item4.copy[0]!}
                  </p>{" "}
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {item4.copy[1]!}
                  </p>{" "}
                  <dl className="mt-3 space-y-1.5">
                    {" "}
                    <div className="flex items-baseline justify-between gap-3">
                      {" "}
                      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">
                        {" "}
                        {item4.copy[2]!} {item4.copy[3]!}{" "}
                      </dt>{" "}
                      <dd className="whitespace-nowrap font-display text-lg font-extrabold text-ink">
                        {item4.copy[4]!}
                      </dd>{" "}
                    </div>{" "}
                    <div className="flex items-baseline justify-between gap-3">
                      {" "}
                      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">
                        {" "}
                        {item4.copy[5]!} {item4.copy[6]!}{" "}
                      </dt>{" "}
                      <dd className="whitespace-nowrap font-display text-lg font-extrabold text-ink">
                        {item4.copy[7]!}
                      </dd>{" "}
                    </div>{" "}
                    <div className="flex items-baseline justify-between gap-3">
                      {" "}
                      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">
                        {" "}
                        {item4.copy[8]!} {item4.copy[9]!}{" "}
                      </dt>{" "}
                      <dd className="whitespace-nowrap font-display text-lg font-extrabold text-ink">
                        {item4.copy[10]!}
                      </dd>{" "}
                    </div>{" "}
                  </dl>{" "}
                </li>
              ))}
            </ul>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
              {data.pricing.copy[12]!}
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {data.pricing.copy[13]!}
          </p>
          <ul className="mt-10 grid gap-4 border-t border-hairline pt-6 sm:grid-cols-3">
            {data.pricing.items5?.map((item5, index) => (
              <li key={index} className="label-mono text-ink">
                {item5.copy[0]!}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {data.proof && (
        <section
          aria-labelledby="service-proof-heading"
          className="bg-white py-20 sm:py-28 blueprint-paper"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="label-mono text-brand">{data.proof.copy[0]!}</p>
            <Reveal>
              <h2
                id="service-proof-heading"
                className="display-title mt-6 max-w-3xl text-ink sm:text-5xl"
              >
                <Words>{data.proof.copy[1]!}</Words>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/60">
                {data.proof.copy[2]!}
              </p>
            </Reveal>
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {data.proof.items1?.map((item1, index) => (
                <li key={index} className="h-full">
                  {" "}
                  <Reveal delay={index * 100} className="h-full">
                    {" "}
                    <L
                      to={item1.copy[0]!}
                      className="glass glass-flat glass-light glass-interactive group flex h-full flex-col overflow-hidden rounded-[28px] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]"
                    >
                      {" "}
                      <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                        {" "}
                        <Img
                          src={item1.copy[2]! as ImageName}
                          fill
                          alt={item1.copy[1]!}
                          loading="lazy"
                          className="object-cover"
                          sizes="(min-width: 768px) 33vw, 100vw"
                        />{" "}
                        <span className="label-mono absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-ink">
                          {item1.copy[3]!}
                        </span>{" "}
                        <span
                          className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white/95 text-ink transition-[transform,background-color,color] duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-ink"
                          aria-hidden="true"
                        >
                          {" "}
                          <ArrowUpRight className="size-5" aria-hidden="true" />{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex flex-1 flex-col p-7">
                        {" "}
                        <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                          {" "}
                          <span className="flex items-center gap-1.5">
                            {" "}
                            <MapPin className="size-3.5" aria-hidden="true" /> {item1.copy[4]!}{" "}
                          </span>{" "}
                          <span className="flex items-center gap-1.5 text-brand-deep">
                            {" "}
                            <svg
                              viewBox="0 0 24 24"
                              className="size-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              aria-hidden="true"
                            >
                              {" "}
                              <path d="M3 11l18-8-8 18-2-8-8-2z" strokeLinejoin="round" />{" "}
                            </svg>{" "}
                            {item1.copy[5]!}{" "}
                          </span>{" "}
                        </span>{" "}
                        <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">
                          {item1.copy[6]!}
                        </h3>{" "}
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/55">
                          {item1.copy[7]!}
                        </p>{" "}
                        <span className="mt-6 inline-flex items-center gap-2 pt-1 text-sm font-bold text-brand-deep">
                          {" "}
                          {item1.copy[8]!}{" "}
                          <ArrowRight
                            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />{" "}
                        </span>{" "}
                      </div>{" "}
                    </L>{" "}
                  </Reveal>{" "}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <L
                to={data.proof.copy[3]!}
                className="group inline-flex items-center gap-2 font-bold text-brand-deep"
              >
                {data.proof.copy[4]!}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </L>
            </div>
          </div>
        </section>
      )}
      <section className="bg-white py-20 sm:py-28 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            <Words>{data.process.copy[0]!}</Words>
          </h2>
          <ol className="how-steps mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.process.items1?.map((item1, index) => (
              <li key={index}>
                {" "}
                <Reveal delay={index * 100} className="h-full">
                  {" "}
                  <div className="step-card group relative h-full overflow-hidden glass glass-flat glass-dark rounded-[28px] p-7 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(242,107,29,0.45)]">
                    {" "}
                    <span
                      className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7.5rem] font-black leading-none text-white/5 transition-colors duration-500 group-hover:text-brand/10"
                      aria-hidden="true"
                    >
                      {item1.copy[0]!}
                    </span>{" "}
                    <span className="relative font-display text-4xl font-black text-brand [text-shadow:0_0_24px_rgba(242,107,29,0.45)]">
                      {item1.copy[1]!}
                    </span>{" "}
                    <h3 className="relative mt-4 font-display text-lg font-extrabold">
                      {item1.copy[2]!}
                    </h3>{" "}
                    <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                      {item1.copy[3]!}
                    </p>{" "}
                    <span
                      className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand to-transparent transition-transform duration-500 group-hover:scale-x-100"
                      aria-hidden="true"
                    />{" "}
                  </div>{" "}
                </Reveal>{" "}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        aria-labelledby="service-faq-heading"
        className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="label-mono text-brand-deep">{data.faq.copy[0]!}</p>
          <h2
            id="service-faq-heading"
            className="display-title mt-5 text-balance text-[2rem] sm:text-5xl lg:text-6xl text-ink"
          >
            <Words>{data.faq.copy[1]!}</Words>
          </h2>
          <Accordion items={data.faqItems} variant="light" className="mt-12" />
        </div>
      </section>
      <section className="bg-white py-16 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
            <Words>{data.more.copy[0]!}</Words>
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {data.more.items1?.map((item1, index) => (
              <li key={index}>
                {" "}
                <L
                  to={item1.copy[0]!}
                  className="group flex h-full flex-col glass glass-flat glass-light glass-interactive rounded-[28px] p-7 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
                >
                  {" "}
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">
                    {item1.copy[1]!}
                  </span>{" "}
                  <h3 className="mt-3 font-display text-xl font-extrabold text-ink group-hover:text-brand-deep">
                    {item1.copy[2]!}
                  </h3>{" "}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item1.copy[3]!}
                  </p>{" "}
                </L>{" "}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Inspection />
    </>
  );
}
