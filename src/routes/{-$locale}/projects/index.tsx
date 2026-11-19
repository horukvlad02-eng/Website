import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Phone } from "lucide-react";
import { Words } from "@/components/motion/Words";
import { L, useLocale } from "@/components/site/L";
import { Inspection } from "@/components/sections/Inspection";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { PROJECT_HUB } from "@/content/projects";
import { META } from "@/content/meta";
import { toLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/{-$locale}/projects/")({
  head: ({ params }) => {
    const locale = toLocale(params.locale);
    return pageHead({ locale, path: "/projects/", ...META.projectsHub[locale] });
  },
  component: ProjectsPage,
});
function ProjectsPage() {
  const d = PROJECT_HUB[useLocale()];
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[900px] -translate-x-1/2 glow-soft"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="label-mono text-brand">{d.copy["text4"]!}</p>
          <h1 className="display-title mt-6 max-w-4xl text-balance text-[2.4rem] text-white sm:text-6xl lg:text-7xl">
            {d.copy["text6"]!}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            {d.copy["text8"]!}
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a className="btn-primary" href="#inspection">
              <ArrowDown className="size-4" aria-hidden="true" />
              {d.copy["text14"]!}
            </a>
            <a className="btn-outline-light" href="tel:+17863724754">
              <Phone className="size-4 text-brand" aria-hidden="true" />
              {d.copy["text18"]!}
            </a>
          </div>
          <p className="label-mono mt-8 text-white/55">{d.copy["text20"]!}</p>
        </div>
      </section>
      <ProjectGallery />
      <section className="bg-secondary py-16 blueprint-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
            <Words>{d.copy["text24"]!}</Words>
          </h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            <li>
              <L
                className="inline-block rounded-full border border-border bg-white px-5 py-2.5 text-sm font-bold text-ink transition-[transform,background-color,border-color,color,opacity] hover:border-brand hover:text-brand-deep"
                to="/services/metal-roofing/"
              >
                {d.copy["text28"]!}
              </L>
            </li>
            <li>
              <L
                className="inline-block rounded-full border border-border bg-white px-5 py-2.5 text-sm font-bold text-ink transition-[transform,background-color,border-color,color,opacity] hover:border-brand hover:text-brand-deep"
                to="/services/tile-shingle-replacement/"
              >
                {d.copy["text31"]!}
              </L>
            </li>
            <li>
              <L
                className="inline-block rounded-full border border-border bg-white px-5 py-2.5 text-sm font-bold text-ink transition-[transform,background-color,border-color,color,opacity] hover:border-brand hover:text-brand-deep"
                to="/services/flat-commercial/"
              >
                {d.copy["text34"]!}
              </L>
            </li>
            <li>
              <L
                className="inline-block rounded-full border border-border bg-white px-5 py-2.5 text-sm font-bold text-ink transition-[transform,background-color,border-color,color,opacity] hover:border-brand hover:text-brand-deep"
                to="/services/emergency-leak-repair/"
              >
                {d.copy["text37"]!}
              </L>
            </li>
          </ul>
        </div>
      </section>
      <Inspection />
    </>
  );
}
