import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { Img } from "@/components/site/Img";
import type { ImageName } from "@/lib/image-meta";
import { L, useLocale } from "@/components/site/L";
import { Inspection } from "@/components/sections/Inspection";
import { getProject } from "@/content/projects";
import { META, isProjectSlug } from "@/content/meta";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/{-$locale}/projects/$slug")({
  beforeLoad: ({ params }) => {
    if (!isProjectSlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const locale = toLocale(params.locale);
    return isProjectSlug(params.slug)
      ? pageHead({
          locale,
          path: `/projects/${params.slug}/`,
          ...META.projects[params.slug][locale],
        })
      : {};
  },
  component: ProjectPage,
});
function ProjectPage() {
  const { slug } = Route.useParams();
  const locale = useLocale();
  const project = getProject(slug);
  if (!project) throw notFound();
  const d = project.locales[locale];
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Img
            src={d.copy["attr1"]! as ImageName}
            fill
            alt={d.copy["attr0"]!}
            priority
            className="kenburns object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/20"
        />
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6 sm:pb-20 lg:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm font-semibold text-white/70">
              <L className="transition-colors hover:text-brand" to={d.copy["attr2"]!}>
                {d.copy["text3"]!}
              </L>
              <span aria-hidden="true" className="mx-2 text-white/30">
                {d.copy["text4"]!}
              </span>
              <span className="text-white">{d.copy["text5"]!}</span>
            </nav>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl">
              {d.copy["text6"]!}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-bright">
              <MapPin className="size-4" aria-hidden="true" />
              {d.copy["text7"]!}
            </p>
          </Reveal>
        </div>
      </section>
      <section className="relative bg-white blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="relative -mt-10 grid grid-cols-2 gap-3 glass glass-flat glass-light glass-interactive rounded-[28px] p-3 shadow-[0_30px_80px_-30px_rgba(6,20,28,0.35)] lg:grid-cols-4">
            <Reveal>
              <div className="h-full rounded-2xl bg-secondary p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {d.copy["text8"]!}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-extrabold leading-snug text-ink">
                  {d.copy["text9"]!}
                </dd>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="h-full rounded-2xl bg-secondary p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {d.copy["text10"]!}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-extrabold leading-snug text-ink">
                  {d.copy["text11"]!}
                </dd>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="h-full rounded-2xl bg-secondary p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {d.copy["text12"]!}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-extrabold leading-snug text-ink">
                  {d.copy["text13"]!}
                </dd>
              </div>
            </Reveal>
            <Reveal delay={270}>
              <div className="h-full rounded-2xl bg-secondary p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {d.copy["text14"]!}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-extrabold leading-snug text-ink">
                  {d.copy["text15"]!}
                </dd>
              </div>
            </Reveal>
          </dl>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24 blueprint-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-deep">
                {d.copy["text16"]!}
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">
                <Words>{d.copy["text17"]!}</Words>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {d.copy["text18"]!}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {d.copy["text19"]!}
              </p>
            </Reveal>
          </div>
          <Reveal variant="right" delay={150}>
            <aside className="glass glass-flat glass-dark rounded-[28px] p-8 text-white shadow-[0_30px_60px_-25px_rgba(242,107,29,0.35)] lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                {d.copy["text20"]!}
              </p>
              <p className="mt-3 font-display text-2xl font-extrabold leading-snug">
                {d.copy["text21"]!}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-ink transition-[transform,background-color,border-color,color,opacity] hover:bg-brand-bright"
                  href="#inspection"
                >
                  {d.copy["text22"]!}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition-colors hover:border-brand hover:text-brand"
                  href="tel:+17863724754"
                >
                  <Phone className="size-4 text-brand" aria-hidden="true" />
                  {d.copy["text23"]!}
                </a>
              </div>
              <L
                className="group mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5 text-sm font-semibold text-white/80 transition-colors hover:text-brand"
                to={d.copy["attr24"]!}
              >
                {d.copy["text25"]!}
                <ArrowUpRight
                  className="size-4 shrink-0 transition-transform group-hover:rotate-45"
                  aria-hidden="true"
                />
              </L>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                  {d.copy["text26"]!}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">{d.copy["text27"]!}</p>
                <a
                  className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand"
                  href="https://www.google.com/maps/search/?api=1&query=Centurion%20Roofing%2C%203190%20NW%2038th%20St%2C%20Miami%2C%20FL%2033142"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {d.copy["text28"]!}
                  <ArrowUpRight
                    className="size-4 shrink-0 transition-transform group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
      <section className="bg-secondary py-16 sm:py-24 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            <Words>{d.copy["text29"]!}</Words>
          </h2>
          <ol className="how-steps mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <Reveal className="h-full">
                <div className="step-card group relative h-full overflow-hidden glass glass-flat glass-dark rounded-[28px] p-7 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(242,107,29,0.45)]">
                  <span className="relative font-display text-4xl font-black text-brand [text-shadow:0_0_24px_rgba(242,107,29,0.45)]">
                    {d.copy["text30"]!}
                  </span>
                  <h3 className="relative mt-4 font-display text-lg font-extrabold">
                    {d.copy["text31"]!}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                    {d.copy["text32"]!}
                  </p>
                </div>
              </Reveal>
            </li>
            <li>
              <Reveal delay={130} className="h-full">
                <div className="step-card group relative h-full overflow-hidden glass glass-flat glass-dark rounded-[28px] p-7 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(242,107,29,0.45)]">
                  <span className="relative font-display text-4xl font-black text-brand [text-shadow:0_0_24px_rgba(242,107,29,0.45)]">
                    {d.copy["text33"]!}
                  </span>
                  <h3 className="relative mt-4 font-display text-lg font-extrabold">
                    {d.copy["text34"]!}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                    {d.copy["text35"]!}
                  </p>
                </div>
              </Reveal>
            </li>
            <li>
              <Reveal delay={260} className="h-full">
                <div className="step-card group relative h-full overflow-hidden glass glass-flat glass-dark rounded-[28px] p-7 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(242,107,29,0.45)]">
                  <span className="relative font-display text-4xl font-black text-brand [text-shadow:0_0_24px_rgba(242,107,29,0.45)]">
                    {d.copy["text36"]!}
                  </span>
                  <h3 className="relative mt-4 font-display text-lg font-extrabold">
                    {d.copy["text37"]!}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                    {d.copy["text38"]!}
                  </p>
                </div>
              </Reveal>
            </li>
            <li>
              <Reveal delay={390} className="h-full">
                <div className="step-card group relative h-full overflow-hidden glass glass-flat glass-dark rounded-[28px] p-7 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(242,107,29,0.45)]">
                  <span className="relative font-display text-4xl font-black text-brand [text-shadow:0_0_24px_rgba(242,107,29,0.45)]">
                    {d.copy["text39"]!}
                  </span>
                  <h3 className="relative mt-4 font-display text-lg font-extrabold">
                    {d.copy["text40"]!}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                    {d.copy["text41"]!}
                  </p>
                </div>
              </Reveal>
            </li>
          </ol>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              <Words>{d.copy["text42"]!}</Words>
            </h2>
            <L
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-brand"
              to={d.copy["attr43"]!}
            >
              {d.copy["text44"]!}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </L>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            <li>
              <Reveal className="h-full">
                <L
                  className="group block h-full overflow-hidden glass glass-flat glass-light glass-interactive rounded-[28px] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl"
                  to={d.copy["attr45"]!}
                >
                  <div className="img-zoom relative aspect-[16/10] overflow-hidden">
                    <Img
                      src={d.copy["attr47"]! as ImageName}
                      fill
                      alt={d.copy["attr46"]!}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-deep">
                      {d.copy["text48"]!}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-extrabold text-ink">
                      {d.copy["text49"]!}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d.copy["text50"]!}</p>
                  </div>
                </L>
              </Reveal>
            </li>
            <li>
              <Reveal delay={110} className="h-full">
                <L
                  className="group block h-full overflow-hidden glass glass-flat glass-light glass-interactive rounded-[28px] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl"
                  to={d.copy["attr51"]!}
                >
                  <div className="img-zoom relative aspect-[16/10] overflow-hidden">
                    <Img
                      src={d.copy["attr53"]! as ImageName}
                      fill
                      alt={d.copy["attr52"]!}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-deep">
                      {d.copy["text54"]!}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-extrabold text-ink">
                      {d.copy["text55"]!}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d.copy["text56"]!}</p>
                  </div>
                </L>
              </Reveal>
            </li>
            <li>
              <Reveal delay={220} className="h-full">
                <L
                  className="group block h-full overflow-hidden glass glass-flat glass-light glass-interactive rounded-[28px] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl"
                  to={d.copy["attr57"]!}
                >
                  <div className="img-zoom relative aspect-[16/10] overflow-hidden">
                    <Img
                      src={d.copy["attr59"]! as ImageName}
                      fill
                      alt={d.copy["attr58"]!}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-deep">
                      {d.copy["text60"]!}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-extrabold text-ink">
                      {d.copy["text61"]!}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d.copy["text62"]!}</p>
                  </div>
                </L>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>
      <Inspection />
    </>
  );
}
