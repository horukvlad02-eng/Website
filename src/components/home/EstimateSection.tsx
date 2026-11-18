import { useId, useState } from "react";
import { useLocale, L } from "@/components/site/L";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { Calculator, Check } from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
const copy = {
  en: {
    title: "Roof Cost Estimate",
    subtitle: "Miami-Dade price ranges · No signup",
    size: "Roof size",
    unit: "sq ft",
    material: "Material",
    labels: { shingle: "Shingle", tile: "Tile", metal: "Metal", flat: "Flat" },
    warranty: { manufacturer: "Manufacturer warranty", workmanship: "Workmanship warranty" },
    investment: "Estimated investment",
    freeQuote: "Free written quote",
    cta: "Get My Exact Price",
    disclaimer:
      "Ballpark for tear-off, materials, labor, permit and cleanup on a typical home. Your written quote comes after a free inspection.",
    sendTitle: "Send me this estimate",
    sendNote: "Get the exact number for your roof — free, no obligation.",
    phone: "Phone",
    phonePh: "(305) 555-0123",
    email: "Email",
    emailPh: "you@example.com",
    emailOptional: "optional",
    send: "Send my estimate",
    sending: "Sending...",
    success: "Estimate sent!",
    successNote: "We will call you with the exact price for your roof.",
    error: "Something went wrong. Please call us at (786) 372-4754.",
    privacy: "We never sell your information.",
  },
  fr: {
    title: "Estimation du coût du toit",
    subtitle: "Fourchettes de prix Miami-Dade · Sans inscription",
    size: "Surface du toit",
    unit: "pi²",
    material: "Matériau",
    labels: { shingle: "Bardeaux", tile: "Tuiles", metal: "Métal", flat: "Toit plat" },
    warranty: { manufacturer: "Garantie fabricant", workmanship: "Garantie main-d’œuvre" },
    investment: "Investissement estimé",
    freeQuote: "Devis écrit gratuit",
    cta: "Obtenir mon prix exact",
    disclaimer:
      "Estimation indicative pour la dépose, les matériaux, la main-d’œuvre, le permis et le nettoyage d’une maison type. Votre devis écrit suit une inspection gratuite.",
    sendTitle: "Recevoir cette estimation",
    sendNote: "Obtenez le chiffre exact pour votre toit — gratuit, sans engagement.",
    phone: "Téléphone",
    phonePh: "(786) 555-0123",
    email: "E-mail",
    emailPh: "vous@exemple.com",
    emailOptional: "facultatif",
    send: "Envoyer mon estimation",
    sending: "Envoi...",
    success: "Estimation envoyée !",
    successNote: "Nous vous appellerons avec le prix exact de votre toit.",
    error: "Une erreur est survenue. Appelez-nous au (786) 372-4754.",
    privacy: "Nous ne vendons jamais vos informations.",
  },
  es: {
    title: "Estimado del costo del techo",
    subtitle: "Rangos de precio de Miami-Dade · Sin registro",
    size: "Tamaño del techo",
    unit: "pies²",
    material: "Material",
    labels: { shingle: "Shingle", tile: "Tejas", metal: "Metal", flat: "Plano" },
    warranty: { manufacturer: "Garantía del fabricante", workmanship: "Garantía de mano de obra" },
    investment: "Inversión estimada",
    freeQuote: "Cotización gratis por escrito",
    cta: "Quiero mi precio exacto",
    disclaimer:
      "Cifra aproximada para la remoción, materiales, mano de obra, permiso y limpieza en una casa típica. Su cotización por escrito llega después de una inspección gratis.",
    sendTitle: "Envíame este estimado",
    sendNote: "Obtenga el número exacto para su techo — gratis, sin compromiso.",
    phone: "Teléfono",
    phonePh: "(305) 555-0123",
    email: "Correo electrónico",
    emailPh: "usted@ejemplo.com",
    emailOptional: "opcional",
    send: "Enviar mi estimado",
    sending: "Enviando...",
    success: "¡Estimado enviado!",
    successNote: "Le llamaremos con el precio exacto de su techo.",
    error: "Algo salió mal. Llámenos al (786) 372-4754.",
    privacy: "Nunca vendemos su información.",
  },
};
const materials = {
  shingle: {
    key: "shingle",
    low: 6,
    high: 9,
    warranty: "manufacturer",
    label: {
      en: "Architectural shingle",
      es: "Shingle arquitectónico",
      fr: "Bardeau architectural",
    },
    phrase: {
      en: "an architectural shingle roof",
      es: "un techo de shingle arquitectónico",
      fr: "un toit en bardeaux architecturaux",
    },
  },
  tile: {
    key: "tile",
    low: 12,
    high: 20,
    warranty: "manufacturer",
    label: {
      en: "Concrete or clay tile",
      es: "Teja de hormigón o barro",
      fr: "Tuile béton ou terre cuite",
    },
    phrase: { en: "a tile roof", es: "un techo de teja", fr: "un toit en tuiles" },
  },
  metal: {
    key: "metal",
    low: 13,
    high: 22,
    warranty: "manufacturer",
    label: { en: "Standing seam metal", es: "Metal standing seam", fr: "Métal standing seam" },
    phrase: {
      en: "a standing seam metal roof",
      es: "un techo de metal standing seam",
      fr: "un toit métallique standing seam",
    },
  },
  flat: {
    key: "flat",
    low: 8,
    high: 15,
    warranty: "workmanship",
    label: { en: "Flat / low slope", es: "Plano / poca pendiente", fr: "Plat / faible pente" },
    phrase: {
      en: "a flat or low-slope roof",
      es: "un techo plano o de poca pendiente",
      fr: "un toit plat ou à faible pente",
    },
  },
};
const consentCopy = {
  en: {
    body: "I agree that Centurion Roofing may contact me by phone call and text message, including through automated technology, at the number I provided about my request. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
    see: "See our",
    privacy: "Privacy Policy",
    and: "and",
    terms: "Terms of Use",
    missing: "Please tick the box to agree to be contacted.",
  },
  es: {
    body: "Acepto que Centurion Roofing pueda contactarme por llamada telefónica y mensaje de texto, incluso mediante tecnología automatizada, al número que proporcioné, en relación con mi solicitud. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Responda STOP para cancelar o HELP para recibir ayuda.",
    see: "Consulte nuestra",
    privacy: "Política de privacidad",
    and: "y los",
    terms: "Términos de uso",
    missing: "Marque la casilla para aceptar que le contactemos.",
  },
  fr: {
    body: "J’accepte que Centurion Roofing me contacte par appel téléphonique et par SMS, y compris au moyen d’une technologie automatisée, au numéro que j’ai fourni, au sujet de ma demande. Le consentement n’est pas une condition d’achat. Des frais de messages et de données peuvent s’appliquer. Répondez STOP pour vous désinscrire ou HELP pour obtenir de l’aide.",
    see: "Consultez notre",
    privacy: "politique de confidentialité",
    and: "et nos",
    terms: "conditions d’utilisation",
    missing: "Veuillez cocher la case pour accepter d’être contacté.",
  },
};
const intro = {
  en: {
    eyebrow: "Instant Estimate",
    title: "What will your roof cost?",
    description:
      "Slide to your roof size and pick a material to see a typical Miami-Dade price range. No signup, no phone number.",
    bullets: [
      "Includes tear-off, materials, labor, permit and cleanup",
      "Final price depends on roof size, pitch, condition of the decking and material",
      "Your itemized written quote comes after a free inspection",
    ],
  },
  es: {
    eyebrow: "Estimado al instante",
    title: "¿Cuánto costará su techo?",
    description:
      "Ajuste el tamaño de su techo y elija un material para ver un rango de precio típico en Miami-Dade. Sin registro y sin dar su teléfono.",
    bullets: [
      "Incluye remoción, materiales, mano de obra, permiso y limpieza",
      "El precio final depende del tamaño, la pendiente, el estado de la base y el material",
      "Su cotización detallada por escrito llega después de una inspección gratis",
    ],
  },
  fr: {
    eyebrow: "Estimation instantanée",
    title: "Combien coûtera votre toit ?",
    description:
      "Réglez la surface de votre toit et choisissez un matériau pour voir une fourchette de prix typique à Miami-Dade. Sans inscription, sans numéro de téléphone.",
    bullets: [
      "Comprend la dépose, les matériaux, la main-d’œuvre, le permis et le nettoyage",
      "Le prix final dépend de la surface, de la pente, de l’état du support et du matériau",
      "Votre devis écrit détaillé suit une inspection gratuite",
    ],
  },
};
export function EstimateSection() {
  const locale = useLocale(),
    t = copy[locale],
    c = consentCopy[locale],
    heading = intro[locale],
    id = useId();
  const [sqft, setSqft] = useState(2200),
    [material, setMaterial] = useState<keyof typeof materials>("shingle"),
    [show, setShow] = useState(false),
    [phone, setPhone] = useState(""),
    [email, setEmail] = useState(""),
    [consent, setConsent] = useState(false),
    [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle"),
    [error, setError] = useState("");
  const m = materials[material],
    low = 100 * Math.round((sqft * m.low) / 100),
    high = 100 * Math.round((sqft * m.high) / 100),
    lang = { en: "en-US", es: "es-US", fr: "fr-FR" }[locale],
    currency = new Intl.NumberFormat(lang, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }),
    number = new Intl.NumberFormat(lang);
  const errors = {
    en: {
      phone: "Please enter a valid 10-digit phone number.",
      email: "Please enter a valid email address.",
    },
    es: {
      phone: "Ingrese un número de teléfono válido de 10 dígitos.",
      email: "Ingrese una dirección de correo electrónico válida.",
    },
    fr: {
      phone: "Veuillez saisir un numéro de téléphone valide à 10 chiffres.",
      email: "Veuillez saisir une adresse e-mail valide.",
    },
  }[locale];
  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
    if (digits.length !== 10) {
      setError(errors.phone);
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError(errors.email);
      return;
    }
    if (!consent) {
      setError(c.missing);
      return;
    }
    setStatus("sending");
    try {
      const result = await submitLead({
        data: {
          phone,
          locale,
          source: "estimate",
          page: location.pathname,
          details: { material, sqft, low, high, ...(email.trim() ? { email: email.trim() } : {}) },
          consent: true,
        },
      });
      setStatus(result.ok ? "success" : "error");
      if (!result.ok) setError(t.error);
    } catch {
      setStatus("error");
      setError(t.error);
    }
  }
  return (
    <section
      id="estimate"
      aria-labelledby="estimate-heading"
      className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-deep">
            {heading.eyebrow}
          </p>
          <h2
            id="estimate-heading"
            className="mt-4 text-balance font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl"
          >
            <Words>{heading.title}</Words>
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            {heading.description}
          </p>
          <ul className="mt-8 space-y-4">
            {heading.bullets.map((text) => (
              <li key={text} className="flex items-start gap-3 text-ink/80">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15">
                  <Check className="size-3.5 text-brand-deep" aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-br from-brand/50 via-white/10 to-transparent opacity-80"
              aria-hidden="true"
            />
            <div className="glass glass-flat glass-dark relative overflow-hidden rounded-[28px] p-6 text-white shadow-2xl shadow-ink/40 sm:p-8">
              <header className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10">
                  <Calculator className="size-5 text-brand" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-extrabold">{t.title}</h3>
                  <p className="text-xs text-white/50">{t.subtitle}</p>
                </div>
              </header>
              <div className="relative mt-8">
                <div className="flex items-end justify-between">
                  <label htmlFor={id} className="text-sm font-medium text-white/70">
                    {t.size}
                  </label>
                  <p className="font-display text-2xl font-extrabold tabular-nums">
                    {number.format(sqft)} <span className="text-sm text-white/50">{t.unit}</span>
                  </p>
                </div>
                <input
                  id={id}
                  type="range"
                  min={800}
                  max={5000}
                  step={50}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="range-brand mt-4"
                  style={{
                    background: `linear-gradient(to right,#f26b1d 0%,#ff8a3d ${((sqft - 800) / 4200) * 100}%,rgba(255,255,255,.1) ${((sqft - 800) / 4200) * 100}%)`,
                  }}
                />
                <div className="mt-2 flex justify-between text-[11px] text-white/40">
                  <span>800</span>
                  <span>{number.format(5000)}+</span>
                </div>
              </div>
              <fieldset className="relative mt-7">
                <legend className="text-sm font-medium text-white/70">{t.material}</legend>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {(Object.keys(materials) as (keyof typeof materials)[]).map((key) => (
                    <label
                      key={key}
                      className={`relative cursor-pointer rounded-xl border px-3 py-3 text-center text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-brand ${material === key ? "border-brand bg-brand/10 text-white" : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25"}`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name={id + "material"}
                        checked={material === key}
                        onChange={() => setMaterial(key)}
                      />
                      {t.labels[key]}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="relative mt-7 rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  {t.investment}
                </p>
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="mt-2 font-display text-3xl font-black tabular-nums sm:text-4xl"
                >
                  {currency.format(low)}
                  <span className="text-white/30">–</span>
                  {currency.format(high)}
                </p>
                <p className="mt-3 text-sm text-white/60">
                  {m.label[locale]} · {t.warranty[m.warranty as keyof typeof t.warranty]}
                </p>
                <p className="mt-2 text-xs text-brand">{t.freeQuote}</p>
              </div>
              <L to="/#inspection" className="btn-primary mt-5 w-full">
                {t.cta}
              </L>
              <p className="mt-4 text-xs leading-relaxed text-white/40">{t.disclaimer}</p>
              <div className="mt-6 border-t border-white/10 pt-5">
                {status === "success" ? (
                  <div role="status">
                    <h4 className="font-bold text-brand">{t.success}</h4>
                    <p className="mt-2 text-sm text-white/65">{t.successNote}</p>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      aria-expanded={show}
                      onClick={() => setShow(!show)}
                      className="text-sm font-bold text-brand hover:text-white"
                    >
                      {t.sendTitle}
                    </button>
                    {show && (
                      <form onSubmit={send} className="step-in mt-4">
                        <p className="text-sm text-white/60">{t.sendNote}</p>
                        <label className="mt-4 block text-sm">
                          {t.phone}
                          <input
                            required
                            type="tel"
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t.phonePh}
                            className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base text-white"
                          />
                        </label>
                        <label className="mt-3 block text-sm">
                          {t.email} ({t.emailOptional})
                          <input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.emailPh}
                            className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base text-white"
                          />
                        </label>
                        <label className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/60">
                          <input
                            type="checkbox"
                            required
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="mt-1 shrink-0 accent-brand"
                          />
                          <span>
                            {c.body} {c.see}{" "}
                            <L to="/privacy/" className="underline">
                              {c.privacy}
                            </L>{" "}
                            {c.and}{" "}
                            <L to="/terms/" className="underline">
                              {c.terms}
                            </L>
                            .
                          </span>
                        </label>
                        {error && (
                          <p role="alert" className="mt-3 text-sm text-red-300">
                            {error}
                          </p>
                        )}
                        <button
                          disabled={status === "sending"}
                          type="submit"
                          className="btn-primary mt-4 w-full disabled:opacity-60"
                        >
                          {status === "sending" ? t.sending : t.send}
                        </button>
                        <p className="mt-3 text-center text-xs text-white/40">{t.privacy}</p>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
