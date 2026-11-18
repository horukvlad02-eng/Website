import { Award, BadgeCheck, Leaf, ShieldCheck } from "lucide-react";
import { useLocale } from "@/components/site/L";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { Blueprint } from "@/components/site/Blueprint";
import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const ICONS = [Award, BadgeCheck, ShieldCheck, Leaf];

const T: Record<
  Locale,
  { eyebrow: string; title: string; items: [string, string][]; status: string; expires: string }
> = {
  en: {
    eyebrow: "Credentials",
    title: "Certified. Licensed. Recognized.",
    items: [
      [
        "Recognized Among the Best Roofers in Miami",
        "Named one of the Best Roofers in Miami for 2022 by Expertise.com — an honor that reflects our commitment to quality craftsmanship, exceptional service and customer satisfaction.",
      ],
      [
        "GAF-Certified Roofing Professionals",
        "As a GAF-certified contractor, we meet the highest standards in the roofing industry — unlocking superior products backed by GAF’s leading warranties.",
      ],
      [
        "Fully Licensed & Insured",
        "Florida State Certified Roofing Contractor (CCC1331979) — license current and active through 08/31/2028. Every project complies with Florida’s stringent regulations — your peace of mind is built in.",
      ],
      [
        "Ygrene-Certified Contractor",
        "Our Ygrene certification lets homeowners access energy-efficient roofing with affordable PACE financing — invest in a durable, high-quality roof with $0 upfront costs.",
      ],
    ],
    status: "Status:",
    expires: "Expires:",
  },
  es: {
    eyebrow: "Certificaciones",
    title: "Certificados. Con licencia. Reconocidos.",
    items: [
      [
        "Reconocidos entre los mejores techadores de Miami",
        "Nombrados uno de los mejores techadores de Miami en 2022 por Expertise.com — un reconocimiento que refleja nuestro compromiso con la calidad, el servicio excepcional y la satisfacción del cliente.",
      ],
      [
        "Profesionales de techos certificados por GAF",
        "Como contratista certificado por GAF, cumplimos los más altos estándares del sector — con productos superiores respaldados por las mejores garantías de GAF.",
      ],
      [
        "Con licencia y totalmente asegurados",
        "Contratista de techos certificado por el Estado de Florida (CCC1331979) — licencia vigente y activa hasta 08/31/2028. Cada proyecto cumple la estricta normativa de Florida.",
      ],
      [
        "Contratista certificado por Ygrene",
        "Nuestra certificación Ygrene permite a los propietarios acceder a un techo de alta eficiencia energética con financiamiento PACE accesible — un techo duradero y de calidad sin costo inicial.",
      ],
    ],
    status: "Estado:",
    expires: "Vence:",
  },
  fr: {
    eyebrow: "Certifications",
    title: "Certifiés. Agréés. Reconnus.",
    items: [
      [
        "Reconnu parmi les meilleurs couvreurs de Miami",
        "Nommé l’un des meilleurs couvreurs de Miami en 2022 par Expertise.com — une distinction qui reflète notre engagement envers la qualité, le service et la satisfaction client.",
      ],
      [
        "Professionnels de la toiture certifiés GAF",
        "En tant que contractant certifié GAF, nous répondons aux normes les plus élevées du secteur — avec des produits supérieurs et les meilleures garanties GAF.",
      ],
      [
        "Entièrement agréé et assuré",
        "Contractant en toiture certifié par l’État de Floride (CCC1331979) — licence en cours et valide jusqu’au 08/31/2028. Chaque projet respecte la réglementation stricte de la Floride.",
      ],
      [
        "Contractant certifié Ygrene",
        "Notre certification Ygrene permet aux propriétaires d’accéder à une toiture écoénergétique grâce au financement PACE abordable — un toit durable et de qualité, sans frais initiaux.",
      ],
    ],
    status: "Statut :",
    expires: "Expire le :",
  },
};

/** Certifications + state license card. */
export function Credentials() {
  const t = T[useLocale()];
  return (
    <section
      aria-labelledby="credentials-heading"
      className="blueprint-paper relative overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -left-24 bottom-0 opacity-[0.09]"
        aria-hidden="true"
      >
        <Blueprint className="h-[460px] w-[840px] text-blueprint-ink-dark" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="label-mono text-brand">{t.eyebrow}</p>
        <Reveal>
          <h2
            id="credentials-heading"
            className="display-title mt-6 max-w-3xl text-ink sm:text-5xl lg:text-6xl"
          >
            <Words>{t.title}</Words>
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.items.map(([title, body], i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <li key={title}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="glass glass-flat glass-light glass-interactive group h-full rounded-[28px] p-7 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_36px_80px_-44px_rgba(242,107,29,0.45)]">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-extrabold leading-snug text-ink">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/55">{body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <Reveal delay={120}>
          <div className="glass glass-flat glass-light mx-auto mt-14 max-w-2xl rounded-[22px] border-dashed px-6 py-8 text-center sm:px-10">
            <p className="label-mono text-ink/45">
              Florida DBPR <span className="text-brand">·</span> {SITE.license}
            </p>
            <p className="label-mono mt-4 text-ink/45">
              {t.status} <span className="text-ink">Current, Active</span>
            </p>
            <p className="label-mono mt-4 text-ink/45">
              {t.expires} <span className="text-ink">{SITE.licenseExpires}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
