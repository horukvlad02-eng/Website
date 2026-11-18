import { ArrowRight, Clock, MapPin, Phone, Star } from "lucide-react";
import { L, useLocale } from "@/components/site/L";
import { Words } from "@/components/motion/Words";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

type FooterText = {
  about: string;
  hoursTitle: string;
  hours: [string, string][];
  services: string;
  serviceLinks: [string, string][];
  company: string;
  companyLinks: [string, string][];
  areas: string;
  rights: string;
  privacy: string;
  terms: string;
  reviews: string;
  hoursShort: string;
  callNow: string;
  freeInspection: string;
};

const AREAS: [string, string][] = [
  ["/locations/miami/", "Miami"],
  ["/locations/coral-gables/", "Coral Gables"],
  ["/locations/hialeah/", "Hialeah"],
  ["/locations/fort-lauderdale/", "Fort Lauderdale"],
  ["/locations/doral/", "Doral"],
  ["/locations/kendall/", "Kendall"],
];

const T: Record<Locale, FooterText> = {
  en: {
    about:
      "Residential and commercial roofing in Miami-Dade and Broward. FL License CCC1331979. Family-owned & operated — GAF-certified, Ygrene-certified, named one of Miami’s best roofers by Expertise.com.",
    hoursTitle: "Business hours",
    hours: [
      ["Monday – Friday", "7:00 AM – 5:00 PM"],
      ["Saturday", "7:00 AM – 2:00 PM"],
      ["Sunday", "Closed"],
    ],
    services: "Services",
    serviceLinks: [
      ["/services/metal-roofing/", "Metal Roofing"],
      ["/services/tile-shingle-replacement/", "Tile & Shingle Replacement"],
      ["/services/flat-commercial/", "Flat & Commercial"],
      ["/services/emergency-leak-repair/", "Emergency Leak Repair"],
    ],
    company: "Company",
    companyLinks: [
      ["/why-centurion/", "Why Centurion"],
      ["/projects/", "Our Work"],
      ["/insurance-claims/", "Insurance Claims"],
      ["/financing/", "Financing"],
      ["/#reviews", "Reviews"],
    ],
    areas: "Service Areas",
    rights: "© 2026 Centurion Roofing. All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    reviews: "4.9 · 65+ Google reviews",
    hoursShort: "Mon–Fri 7am–5pm · Sat 7am–2pm",
    callNow: "Call now",
    freeInspection: "Free inspection",
  },
  es: {
    about:
      "Techos residenciales y comerciales en Miami-Dade y Broward. Licencia de FL CCC1331979. Empresa familiar — certificada por GAF y por Ygrene, nombrada una de las mejores techadoras de Miami por Expertise.com.",
    hoursTitle: "Horario de atención",
    hours: [
      ["Lunes – Viernes", "7:00 AM – 5:00 PM"],
      ["Sábado", "7:00 AM – 2:00 PM"],
      ["Domingo", "Cerrado"],
    ],
    services: "Servicios",
    serviceLinks: [
      ["/services/metal-roofing/", "Techo de metal"],
      ["/services/tile-shingle-replacement/", "Reemplazo de tejas y shingle"],
      ["/services/flat-commercial/", "Techo plano y comercial"],
      ["/services/emergency-leak-repair/", "Reparación de goteras"],
    ],
    company: "Empresa",
    companyLinks: [
      ["/why-centurion/", "Por qué Centurion"],
      ["/projects/", "Nuestro trabajo"],
      ["/insurance-claims/", "Reclamos de seguro"],
      ["/financing/", "Financiamiento"],
      ["/#reviews", "Reseñas"],
    ],
    areas: "Zonas de servicio",
    rights: "© 2026 Centurion Roofing. Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
    reviews: "4.9 · 65+ reseñas de Google",
    hoursShort: "Lun–vie 7am–5pm · sáb 7am–2pm",
    callNow: "Llamar",
    freeInspection: "Inspección gratis",
  },
  fr: {
    about:
      "Toiture résidentielle et commerciale dans les comtés de Miami-Dade et Broward. Licence FL CCC1331979. Entreprise familiale — certifié GAF, certifié Ygrene, nommé l’un des meilleurs couvreurs de Miami par Expertise.com.",
    hoursTitle: "Heures d’ouverture",
    hours: [
      ["Lundi – Vendredi", "7 h – 17 h"],
      ["Samedi", "7 h – 14 h"],
      ["Dimanche", "Fermé"],
    ],
    services: "Services",
    serviceLinks: [
      ["/services/metal-roofing/", "Toiture métallique"],
      ["/services/tile-shingle-replacement/", "Remplacement tuiles & bardeaux"],
      ["/services/flat-commercial/", "Toits plats & commerciaux"],
      ["/services/emergency-leak-repair/", "Réparation de fuite d’urgence"],
    ],
    company: "Entreprise",
    companyLinks: [
      ["/why-centurion/", "Pourquoi Centurion"],
      ["/projects/", "Réalisations"],
      ["/insurance-claims/", "Réclamations d’assurance"],
      ["/financing/", "Financement"],
      ["/#reviews", "Avis"],
    ],
    areas: "Zones desservies",
    rights: "© 2026 Centurion Roofing. Tous droits réservés.",
    privacy: "Confidentialité",
    terms: "Conditions",
    reviews: "4.9 · 65+ avis Google",
    hoursShort: "Lun–ven 7 h–17 h · sam 7 h–14 h",
    callNow: "Appeler",
    freeInspection: "Inspection gratuite",
  },
};

const linkCls = "inline-block py-1 text-sm text-white/60 transition-colors hover:text-white";

function LinkList({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
        <Words>{title}</Words>
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map(([to, label]) => (
          <li key={to}>
            <L className={linkCls} to={to}>
              {label}
            </L>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const t = T[useLocale()];
  return (
    <>
      <footer className="bg-ink pb-28 pt-16 text-white md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <Logo />
              <p className="mt-5 text-sm leading-relaxed text-white/50">{t.about}</p>
              <p className="mt-4 flex items-start gap-2 text-sm text-white/50">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                {SITE.address}
              </p>
              <div className="mt-5">
                <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
                  <Words>{t.hoursTitle}</Words>
                </h2>
                <dl className="mt-3 space-y-1.5 text-sm text-white/60">
                  {t.hours.map(([d, h]) => (
                    <div key={d} className="flex justify-between gap-4">
                      <dt>{d}</dt>
                      <dd className="text-white/80">{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <LinkList title={t.services} links={t.serviceLinks} />
            <LinkList title={t.company} links={t.companyLinks} />
            <LinkList title={t.areas} links={AREAS} />
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row">
            <p>
              {t.rights}{" "}
              <L
                className="inline-block py-1 underline underline-offset-2 hover:text-white"
                to="/privacy/"
              >
                {t.privacy}
              </L>{" "}
              ·{" "}
              <L
                className="inline-block py-1 underline underline-offset-2 hover:text-white"
                to="/terms/"
              >
                {t.terms}
              </L>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-star text-star" aria-hidden="true" />
                {t.reviews}
              </span>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 font-semibold text-white/70 hover:text-brand"
              >
                <Phone className="size-4 text-brand" aria-hidden="true" />
                {SITE.phone}
              </a>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-brand" aria-hidden="true" />
                {t.hoursShort}
              </span>
            </div>
          </div>
        </div>
      </footer>
      <div className="glass-bar vt-callbar fixed inset-x-0 bottom-0 z-40 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={SITE.phoneHref}
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-sm font-semibold text-white"
          >
            <Phone className="size-4 text-brand" aria-hidden="true" />
            {t.callNow}
          </a>
          <L
            className="flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-bold text-ink shadow-[0_10px_30px_-10px_rgba(242,107,29,0.8)]"
            to="/#inspection"
          >
            {t.freeInspection}
            <ArrowRight className="size-4" aria-hidden="true" />
          </L>
        </div>
      </div>
    </>
  );
}
