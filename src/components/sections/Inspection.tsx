import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  LoaderCircle,
  Lock,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { useLocale } from "@/components/site/L";
import { Words } from "@/components/motion/Words";
import { Consent, CONSENT } from "@/components/forms/Consent";
import { submitLead } from "@/lib/leads.functions";
import { hoursSentence } from "@/lib/hours";
import { track } from "@/lib/track";
import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const PROJECTS = ["replacement", "metal", "commercial", "emergency", "inspection"] as const;
type Project = (typeof PROJECTS)[number];
type Field = "name" | "phone" | "zip" | "project" | "consent";

const T: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    perks: [string, string, string];
    prefer: string;
    booked: (n: string) => string;
    bookedNote: string;
    honeypot: string;
    name: string;
    namePh: string;
    phone: string;
    phonePh: string;
    zip: string;
    zipPh: string;
    project: string;
    projectPh: string;
    options: Record<Project, string>;
    pending: string;
    submit: string;
    private: string;
    err: { fail: string; fix: string; name: string; phone: string; zip: string; project: string };
  }
> = {
  en: {
    eyebrow: "100% Free · No Obligation",
    title: "Claim Your Free Roof Inspection",
    subtitle:
      "A certified Centurion specialist will assess your roof and deliver a transparent, fixed-price quote.",
    perks: [
      "Free on-roof inspection",
      "Appointments usually same or next day",
      "Written, itemized quote — zero obligation",
    ],
    prefer: "Prefer to talk? Call us",
    booked: (n) => `Thanks, ${n} — request received.`,
    bookedNote: `Your inspection request is in. A Centurion specialist will call you during business hours (${hoursSentence("en")}) to confirm the time of your free inspection.`,
    honeypot: "Leave this field empty",
    name: "Full name",
    namePh: "John Smith",
    phone: "Phone number",
    phonePh: "(305) 555-0123",
    zip: "ZIP code",
    zipPh: "33101",
    project: "Project type",
    projectPh: "Select a project type",
    options: {
      replacement: "Residential Roof Replacement",
      metal: "Metal Roofing",
      commercial: "Flat / Commercial Roof",
      emergency: "Emergency Leak Fix",
      inspection: "Storm Damage Inspection",
    },
    pending: "Booking...",
    submit: "Claim My Free Inspection",
    private: "Your info is private. We don’t sell it.",
    err: {
      fail: "Something went wrong. Please call us at (786) 372-4754.",
      fix: "Please fix the highlighted fields.",
      name: "Please enter your full name.",
      phone: "Please enter a valid 10-digit phone number.",
      zip: "Please enter a valid 5-digit ZIP code.",
      project: "Please choose a project type.",
    },
  },
  es: {
    eyebrow: "100% gratis · Sin compromiso",
    title: "Reserve su inspección de techo gratis",
    subtitle:
      "Un especialista certificado de Centurion evaluará su techo y le entregará una cotización transparente a precio fijo.",
    perks: [
      "Inspección gratis sobre el techo",
      "Citas generalmente el mismo día o al día siguiente",
      "Cotización detallada por escrito — sin compromiso",
    ],
    prefer: "¿Prefiere hablar? Llámenos",
    booked: (n) => `Gracias, ${n} — solicitud recibida.`,
    bookedNote: `Su solicitud de inspección quedó registrada. Un especialista de Centurion le llamará en horario de atención (${hoursSentence("es")}) para confirmar la hora de su inspección gratis.`,
    honeypot: "Deje este campo vacío",
    name: "Nombre completo",
    namePh: "Juan Pérez",
    phone: "Teléfono",
    phonePh: "(786) 555-0123",
    zip: "Código postal (ZIP)",
    zipPh: "33101",
    project: "Tipo de proyecto",
    projectPh: "Seleccione un tipo de proyecto",
    options: {
      replacement: "Reemplazo de techo residencial",
      metal: "Techo de metal",
      commercial: "Techo plano / comercial",
      emergency: "Reparación de goteras",
      inspection: "Inspección por daños de tormenta",
    },
    pending: "Reservando...",
    submit: "Reservar mi inspección gratis",
    private: "Su información es privada. No la vendemos.",
    err: {
      fail: "Algo salió mal. Llámenos al (786) 372-4754.",
      fix: "Corrija los campos resaltados.",
      name: "Ingrese su nombre completo.",
      phone: "Ingrese un número de teléfono válido de 10 dígitos.",
      zip: "Ingrese un código postal (ZIP) válido de 5 dígitos.",
      project: "Elija un tipo de proyecto.",
    },
  },
  fr: {
    eyebrow: "100 % gratuit · Sans engagement",
    title: "Obtenez votre inspection de toit gratuite",
    subtitle:
      "Un spécialiste certifié Centurion évaluera votre toit et vous remettra un devis transparent à prix fixe.",
    perks: [
      "Inspection gratuite sur le toit",
      "Rendez-vous généralement le jour même ou le lendemain",
      "Devis écrit détaillé — sans aucun engagement",
    ],
    prefer: "Vous préférez parler ? Appelez-nous",
    booked: (n) => `Merci, ${n} — demande reçue.`,
    bookedNote: `Votre demande d’inspection est enregistrée. Un spécialiste Centurion vous appellera pendant les heures d’ouverture (${hoursSentence("fr")}) pour confirmer l’heure de votre inspection gratuite.`,
    honeypot: "Laissez ce champ vide",
    name: "Nom complet",
    namePh: "Jean Dupont",
    phone: "Téléphone",
    phonePh: "(786) 555-0123",
    zip: "Code postal (ZIP)",
    zipPh: "33101",
    project: "Type de projet",
    projectPh: "Choisissez un type de projet",
    options: {
      replacement: "Remplacement de toit résidentiel",
      metal: "Toiture métallique",
      commercial: "Toit plat / commercial",
      emergency: "Réparation de fuite d’urgence",
      inspection: "Inspection après tempête",
    },
    pending: "Réservation...",
    submit: "Réserver mon inspection gratuite",
    private: "Vos informations restent privées. Nous ne les vendons pas.",
    err: {
      fail: "Une erreur est survenue. Appelez-nous au (786) 372-4754.",
      fix: "Veuillez corriger les champs en surbrillance.",
      name: "Veuillez saisir votre nom complet.",
      phone: "Veuillez saisir un numéro de téléphone valide à 10 chiffres.",
      zip: "Veuillez saisir un code postal (ZIP) valide à 5 chiffres.",
      project: "Veuillez choisir un type de projet.",
    },
  },
};

const PERK_ICONS = [ShieldCheck, Clock, CircleCheck];
const inputCls =
  "mt-2 block h-14 w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-ink/35 shadow-sm outline-none transition-all focus:border-brand focus:ring-4 focus:ring-brand/15";
const SELECT_BG =
  'appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27%230B0F17%27%20stroke-width%3D%272%27%3E%3Cpath%20d%3D%27m6%209%206%206%206-6%27/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-12';

/** Client-side checks mirror the server schema so most mistakes never leave the browser. */
export function validateLead(v: {
  name: string;
  phone: string;
  zip: string;
  project: string;
  consent: boolean;
}) {
  const errs: Field[] = [];
  const name = v.name.trim();
  if (name.length < 2 || name.length > 80) errs.push("name");
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) errs.push("phone");
  if (!/^\d{5}$/.test(v.zip.trim())) errs.push("zip");
  if (!(PROJECTS as readonly string[]).includes(v.project)) errs.push("project");
  if (!v.consent) errs.push("consent");
  return errs;
}

function FieldError({ id, msg }: { id: string; msg?: string | undefined }) {
  return msg ? (
    <p id={id} className="mt-1.5 text-sm font-medium text-destructive">
      {msg}
    </p>
  ) : null;
}

/** "Claim your free roof inspection" — the lead form at the end of almost every page. Saves to the database. */
export function Inspection() {
  const locale = useLocale();
  const pathname = useLocation({ select: (l) => l.pathname });
  const t = T[locale];
  const [v, setV] = useState({
    name: "",
    phone: "",
    zip: "",
    project: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "pending" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");

  const set = (k: keyof typeof v) => (val: string | boolean) => {
    setV((p) => ({ ...p, [k]: val }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "pending") return;
    const bad = validateLead(v);
    if (bad.length) {
      const map: Partial<Record<Field, string>> = {};
      for (const f of bad) map[f] = f === "consent" ? CONSENT[locale].missing : t.err[f];
      setErrors(map);
      setStatus("error");
      setMessage(t.err.fix);
      document.getElementById(`lead-${bad[0] === "consent" ? "consent" : bad[0]}`)?.focus();
      return;
    }
    setStatus("pending");
    setErrors({});
    try {
      const res = await submitLead({
        data: {
          name: v.name.trim(),
          phone: v.phone,
          zip: v.zip.trim(),
          project: v.project,
          locale,
          source: "inspection",
          page: pathname,
          consent: v.consent,
          website: v.website,
        },
      });
      if (!res.ok) {
        setStatus("error");
        if (res.field && res.field in t.err) {
          setErrors({
            [res.field]:
              res.field === "consent"
                ? CONSENT[locale].missing
                : t.err[res.field as Exclude<Field, "consent">],
          });
          setMessage(t.err.fix);
        } else setMessage(t.err.fail);
        return;
      }
      setFirstName(v.name.trim().split(/\s+/)[0] ?? "");
      setStatus("success");
      track("generate_lead", { form: "inspection" });
    } catch {
      setStatus("error");
      setMessage(t.err.fail);
    }
  }

  const aria = (f: Field) => ({
    "aria-invalid": !!errors[f],
    "aria-describedby": errors[f] ? `lead-${f}-error` : undefined,
  });

  return (
    <section
      id="inspection"
      aria-labelledby="inspection-heading"
      className="scroll-mt-20 bg-surface py-24 sm:py-32 blueprint-paper"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[32px] bg-ink shadow-2xl shadow-ink/30 lg:grid-cols-[1fr_1.15fr]">
          <div className="relative min-w-0 p-8 sm:p-12 lg:p-14">
            <div
              className="pointer-events-none absolute -left-20 -top-20 size-72 glow"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
                {t.eyebrow}
              </p>
              <h2
                id="inspection-heading"
                className="mt-4 text-balance font-display text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl"
              >
                <Words>{t.title}</Words>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">{t.subtitle}</p>
              <ul className="mt-9 flex flex-col gap-4">
                {t.perks.map((p, i) => {
                  const Icon = PERK_ICONS[i] ?? CircleCheck;
                  return (
                    <li key={p} className="flex items-center gap-3 text-white/85">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10">
                        <Icon className="size-4 text-brand" aria-hidden="true" />
                      </span>
                      {p}
                    </li>
                  );
                })}
              </ul>
              <a
                href={SITE.phoneHref}
                className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-colors hover:border-brand/40"
              >
                <Phone className="size-5 text-brand" aria-hidden="true" />
                <span>
                  <span className="block text-xs text-white/50">{t.prefer}</span>
                  <span className="block font-display text-lg font-extrabold text-white">
                    {SITE.phone}
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div className="glass glass-flat glass-light min-w-0 rounded-[26px] p-6 sm:p-10 lg:m-3 lg:p-12">
            {status === "success" ? (
              <div
                className="flex h-full flex-col items-center justify-center py-12 text-center"
                role="status"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-brand/15">
                  <CircleCheck className="size-8 text-brand" aria-hidden="true" />
                </span>
                <p className="mt-6 font-display text-3xl font-black text-ink">
                  {t.booked(firstName)}
                </p>
                <p className="mt-3 max-w-sm text-muted-foreground">{t.bookedNote}</p>
              </div>
            ) : (
              <form noValidate className="flex flex-col gap-5" onSubmit={onSubmit}>
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="contact-website">{t.honeypot}</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    name="contact_website"
                    value={v.website}
                    onChange={(e) => set("website")(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lead-name" className="text-sm font-semibold text-ink">
                    {t.name}
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    autoComplete="name"
                    placeholder={t.namePh}
                    required
                    value={v.name}
                    onChange={(e) => set("name")(e.target.value)}
                    className={cn(inputCls, errors.name ? "border-destructive" : "border-input")}
                    {...aria("name")}
                  />
                  <FieldError id="lead-name-error" msg={errors.name} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-phone" className="text-sm font-semibold text-ink">
                      {t.phone}
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={t.phonePh}
                      required
                      value={v.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      className={cn(inputCls, errors.phone ? "border-destructive" : "border-input")}
                      {...aria("phone")}
                    />
                    <FieldError id="lead-phone-error" msg={errors.phone} />
                  </div>
                  <div>
                    <label htmlFor="lead-zip" className="text-sm font-semibold text-ink">
                      {t.zip}
                    </label>
                    <input
                      id="lead-zip"
                      name="zip"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      placeholder={t.zipPh}
                      required
                      value={v.zip}
                      onChange={(e) => set("zip")(e.target.value.replace(/\D/g, ""))}
                      className={cn(inputCls, errors.zip ? "border-destructive" : "border-input")}
                      {...aria("zip")}
                    />
                    <FieldError id="lead-zip-error" msg={errors.zip} />
                  </div>
                </div>
                <div>
                  <label htmlFor="lead-project" className="text-sm font-semibold text-ink">
                    {t.project}
                  </label>
                  <select
                    id="lead-project"
                    name="project"
                    required
                    value={v.project}
                    onChange={(e) => set("project")(e.target.value)}
                    className={cn(
                      inputCls,
                      SELECT_BG,
                      errors.project ? "border-destructive" : "border-input",
                    )}
                    {...aria("project")}
                  >
                    <option value="" disabled>
                      {t.projectPh}
                    </option>
                    {PROJECTS.map((p) => (
                      <option key={p} value={p}>
                        {t.options[p]}
                      </option>
                    ))}
                  </select>
                  <FieldError id="lead-project-error" msg={errors.project} />
                </div>
                <Consent
                  locale={locale}
                  idPrefix="lead"
                  error={errors.consent}
                  checked={v.consent}
                  onChange={(c) => set("consent")(c)}
                />
                {status === "error" && message ? (
                  <p
                    role="alert"
                    className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
                  >
                    {message}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={status === "pending"}
                  className="group mt-2 flex h-16 w-full items-center justify-center gap-2 rounded-xl bg-brand text-lg font-bold text-ink shadow-[0_14px_40px_-12px_rgba(242,107,29,0.8)] transition-[transform,background-color,border-color,color,opacity] hover:-translate-y-0.5 hover:bg-brand-bright disabled:translate-y-0 disabled:opacity-70"
                >
                  {status === "pending" ? (
                    <>
                      <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                      {t.pending}
                    </>
                  ) : (
                    <>
                      {t.submit}
                      <ArrowRight
                        className="size-5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                  <Lock className="size-3.5" aria-hidden="true" />
                  {t.private}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
