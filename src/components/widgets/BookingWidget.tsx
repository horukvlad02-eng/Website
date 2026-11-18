import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Phone, CalendarCheck, Calculator } from "lucide-react";
import { useLocale, L } from "@/components/site/L";
import { SITE } from "@/lib/site";
import { getTakenWindows, requestBooking } from "@/lib/leads.functions";
const copy = {
  en: {
    open: "Chat with us",
    close: "Close",
    title: "Centurion Roofing",
    sub: "Usually replies by phone within business hours",
    hello: "Hi! 👋 How can we help with your roof?",
    book: "Book a free inspection",
    quote: "See an instant price range",
    call: "Call the office",
    pickDay: "Pick a day",
    pickTime: "Pick an arrival window",
    contact: "Where should we call to confirm?",
    name: "Your name",
    phone: "Phone number",
    send: "Request this time",
    sending: "Sending...",
    back: "Back",
    thanks: (e: string) => `Request sent, ${e}!`,
    thanksNote: "We will call you to confirm the time. Your slot is not final until we do.",
    today: "Today",
    noDays: "No open slots right now. Please call us.",
    noWindows: "Every window on this day is already taken. Please pick another day or call us.",
  },
  es: {
    open: "Chatee con nosotros",
    close: "Cerrar",
    title: "Centurion Roofing",
    sub: "Normalmente respondemos por teléfono en horario de oficina",
    hello: "¡Hola! 👋 ¿En qué podemos ayudarle con su techo?",
    book: "Reservar inspección gratis",
    quote: "Ver un rango de precio al instante",
    call: "Llamar a la oficina",
    pickDay: "Elija un día",
    pickTime: "Elija una franja de llegada",
    contact: "¿A qué número le llamamos para confirmar?",
    name: "Su nombre",
    phone: "Teléfono",
    send: "Solicitar este horario",
    sending: "Enviando...",
    back: "Atrás",
    thanks: (e: string) => `\xa1Solicitud enviada, ${e}!`,
    thanksNote: "Le llamaremos para confirmar la hora. Su horario no es definitivo hasta entonces.",
    today: "Hoy",
    noDays: "No hay horarios libres ahora. Por favor llámenos.",
    noWindows: "Todas las franjas de este día ya están ocupadas. Elija otro día o llámenos.",
  },
  fr: {
    open: "Discuter avec nous",
    close: "Fermer",
    title: "Centurion Roofing",
    sub: "Réponse en général par téléphone pendant les heures d’ouverture",
    hello: "Bonjour ! 👋 Comment pouvons-nous aider pour votre toit ?",
    book: "Réserver une inspection gratuite",
    quote: "Voir une fourchette de prix",
    call: "Appeler le bureau",
    pickDay: "Choisissez un jour",
    pickTime: "Choisissez un créneau d’arrivée",
    contact: "Quel numéro appeler pour confirmer ?",
    name: "Votre nom",
    phone: "Téléphone",
    send: "Demander ce créneau",
    sending: "Envoi...",
    back: "Retour",
    thanks: (e: string) => `Demande envoy\xe9e, ${e} !`,
    thanksNote:
      "Nous vous appellerons pour confirmer l’heure. Le créneau n’est pas définitif avant cela.",
    today: "Aujourd’hui",
    noDays: "Aucun créneau libre pour le moment. Appelez-nous.",
    noWindows:
      "Toutes les plages de ce jour sont déjà prises. Choisissez un autre jour ou appelez-nous.",
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
type WindowId = "am" | "mid" | "pm";
const windows: { id: WindowId; start: number; end: number }[] = [
  { id: "am", start: 7, end: 10 },
  { id: "mid", start: 10, end: 13 },
  { id: "pm", start: 13, end: 16 },
];
function eastern() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const part = (key: string) => Number(parts.find((p) => p.type === key)?.value);
  return { year: part("year"), month: part("month"), day: part("day"), hour: part("hour") };
}
export default function BookingWidget() {
  const locale = useLocale(),
    t = copy[locale],
    c = consentCopy[locale];
  const [visible, setVisible] = useState(false),
    [open, setOpen] = useState(false),
    [step, setStep] = useState<"menu" | "day" | "time" | "contact" | "done">("menu"),
    [date, setDate] = useState(""),
    [windowId, setWindowId] = useState<WindowId>("am"),
    [name, setName] = useState(""),
    [phone, setPhone] = useState(""),
    [consent, setConsent] = useState(false),
    [taken, setTaken] = useState<string[]>([]),
    [loading, setLoading] = useState(false),
    [sending, setSending] = useState(false),
    [error, setError] = useState(""),
    [now, setNow] = useState<ReturnType<typeof eastern> | null>(null);
  const panel = useRef<HTMLDivElement>(null),
    fab = useRef<HTMLButtonElement>(null),
    wasOpen = useRef(false);
  useEffect(() => {
    const sentinel = document.createElement("span");
    sentinel.setAttribute("aria-hidden", "true");
    Object.assign(sentinel.style, {
      position: "absolute",
      top: "280px",
      left: "0",
      width: "1px",
      height: "1px",
      pointerEvents: "none",
    });
    document.body.append(sentinel);
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return () => sentinel.remove();
    }
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!!entry && entry.boundingClientRect.top < 0),
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);
  useEffect(() => {
    if (open) {
      setNow(eastern());
      panel.current?.focus();
    } else if (wasOpen.current) fab.current?.focus();
    wasOpen.current = open;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  useEffect(() => {
    if (!date) return;
    let active = true;
    setLoading(true);
    setError("");
    getTakenWindows({ data: { date } })
      .then((value) => {
        if (active) setTaken(value);
      })
      .catch(() => {
        if (active) setError(messages.fail);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [date]);
  const messages = {
    en: {
      fail: "Something went wrong. Please call us at (786) 372-4754.",
      invalid: "Please check your name, phone number and time slot.",
      taken: "That time is no longer available. Please pick another.",
    },
    es: {
      fail: "Algo salió mal. Llámenos al (786) 372-4754.",
      invalid: "Revise su nombre, teléfono y horario.",
      taken: "Ese horario ya no está disponible. Elija otro.",
    },
    fr: {
      fail: "Une erreur est survenue. Appelez-nous au (786) 372-4754.",
      invalid: "Veuillez vérifier votre nom, votre téléphone et le créneau.",
      taken: "Ce créneau n’est plus disponible. Choisissez-en un autre.",
    },
  }[locale];
  const langs = { en: "en-US", es: "es-US", fr: "fr-FR" },
    labels =
      locale === "fr"
        ? { am: "7 h–10 h", mid: "10 h–13 h", pm: "13 h–16 h" }
        : { am: "7–10 AM", mid: "10 AM–1 PM", pm: "1–4 PM" };
  const today = now
    ? `${now.year}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`
    : "";
  function available(day: number, sameDay: boolean) {
    const hours = SITE.hours[day];
    return hours
      ? windows.filter(
          (w) =>
            w.start >= hours[0] &&
            w.end <= hours[1] &&
            (day !== 6 || w.end <= 13) &&
            (!sameDay || !now || now.hour <= w.start - 1),
        )
      : [];
  }
  const days: { date: string; weekday: number }[] = [];
  if (now)
    for (let i = 0; i < 14 && days.length < 8; i++) {
      const day = new Date(Date.UTC(now.year, now.month - 1, now.day + i)),
        value = day.toISOString().slice(0, 10);
      if (available(day.getUTCDay(), i === 0).length)
        days.push({ date: value, weekday: day.getUTCDay() });
    }
  const chosen = days.find((day) => day.date === date),
    slots = chosen
      ? available(chosen.weekday, date === today).filter((w) => !taken.includes(w.id))
      : [];
  function format(value: string) {
    return value === today
      ? t.today
      : new Date(value + "T12:00:00Z").toLocaleDateString(langs[locale], {
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        });
  }
  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (
      name.trim().length < 2 ||
      phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "").length !== 10
    ) {
      setError(messages.invalid);
      return;
    }
    if (!consent) {
      setError(c.missing);
      return;
    }
    setSending(true);
    try {
      const result = await requestBooking({
        data: { date, window: windowId, name, phone, locale, consent: true },
      });
      if (result.ok) setStep("done");
      else {
        setError(result.error === "server" ? messages.fail : messages[result.error]);
        if (result.error === "taken") {
          setTaken((previous) => [...previous, windowId]);
          setStep("time");
        }
      }
    } catch {
      setError(messages.fail);
    } finally {
      setSending(false);
    }
  }
  const option =
    "rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-brand/60 disabled:opacity-50";
  return (
    <div
      className={`fixed bottom-24 right-4 z-50 flex flex-col items-end md:bottom-6 md:right-6 transition-[opacity,transform] duration-300 ${visible || open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`}
    >
      {open && (
        <div
          ref={panel}
          tabIndex={-1}
          role="dialog"
          aria-label={t.title}
          className="step-in mb-3 flex outline-none max-h-[min(34rem,calc(100dvh-9rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden vt-chat-panel glass-panel rounded-3xl border border-white/12 text-white"
        >
          <header className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-5 py-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand text-ink">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="font-display text-base font-extrabold leading-tight">{t.title}</p>
              <p className="text-[11px] leading-snug text-white/55">{t.sub}</p>
            </div>
            <button
              type="button"
              aria-label={t.close}
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </header>
          <div className="overflow-y-auto p-5">
            {step === "menu" && (
              <div className="step-in">
                <p className="w-fit max-w-[90%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-sm">
                  {t.hello}
                </p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <button
                    type="button"
                    className="flex items-center gap-3 rounded-2xl bg-brand px-4 py-3.5 text-left text-sm font-bold text-ink hover:bg-brand-bright"
                    onClick={() => {
                      setNow(eastern());
                      setStep("day");
                    }}
                  >
                    <CalendarCheck className="size-5" />
                    {t.book}
                  </button>
                  <L
                    to="/#estimate"
                    onClick={() => setOpen(false)}
                    className={option + " flex items-center gap-3"}
                  >
                    <Calculator className="size-5 text-brand" />
                    {t.quote}
                  </L>
                  <a href={SITE.phoneHref} className={option + " flex items-center gap-3"}>
                    <Phone className="size-5 text-brand" />
                    {t.call} · {SITE.phone}
                  </a>
                </div>
              </div>
            )}
            {step === "day" && (
              <div className="step-in">
                <p className="text-sm font-bold">{t.pickDay}</p>
                {days.length ? (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {days.map((day) => (
                      <button
                        type="button"
                        key={day.date}
                        className={option}
                        onClick={() => {
                          setTaken([]);
                          setDate(day.date);
                          setStep("time");
                        }}
                      >
                        {format(day.date)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-white/60">{t.noDays}</p>
                )}
              </div>
            )}
            {step === "time" && (
              <div className="step-in" aria-busy={loading}>
                <p className="text-sm font-bold">{t.pickTime}</p>
                <p className="mt-1 text-xs text-brand">{format(date)}</p>
                {loading ? (
                  <p role="status" className="mt-3 text-sm text-white/60">
                    …
                  </p>
                ) : slots.length ? (
                  <div className="mt-3 grid gap-2">
                    {slots.map((slot) => (
                      <button
                        type="button"
                        key={slot.id}
                        className={option}
                        onClick={() => {
                          setWindowId(slot.id);
                          setError("");
                          setStep("contact");
                        }}
                      >
                        {labels[slot.id]}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-white/60">{t.noWindows}</p>
                )}
              </div>
            )}
            {step === "contact" && (
              <form onSubmit={send} className="step-in">
                <p className="text-sm font-bold">{t.contact}</p>
                <p className="mt-1 text-xs text-brand-bright">
                  {format(date)} · {labels[windowId]}
                </p>
                <input
                  aria-label={t.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.name}
                  autoComplete="name"
                  required
                  maxLength={120}
                  className="mt-3 h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base sm:text-sm text-white outline-none focus:border-brand"
                />
                <input
                  aria-label={t.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phone}
                  type="tel"
                  autoComplete="tel"
                  required
                  className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white outline-none focus:border-brand"
                />
                <label className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-white/60">
                  <input
                    required
                    type="checkbox"
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
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-brand text-sm font-bold text-ink hover:bg-brand-bright disabled:opacity-70"
                >
                  {sending ? t.sending : t.send}
                </button>
              </form>
            )}
            {error && (
              <p role="alert" className="mt-3 text-sm text-red-300">
                {error}
              </p>
            )}
            {step === "done" ? (
              <div role="status" className="step-in py-4 text-center">
                <p className="mt-4 font-display text-xl font-extrabold">
                  {t.thanks(name.trim().split(" ")[0] ?? "")}
                </p>
                <p className="mt-2 text-sm text-white/65">{t.thanksNote}</p>
                <button
                  type="button"
                  onClick={() => {
                    setStep("menu");
                    setOpen(false);
                    setError("");
                  }}
                  className="mt-5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold"
                >
                  {t.close}
                </button>
              </div>
            ) : (
              step !== "menu" && (
                <button
                  type="button"
                  className="mt-4 text-xs font-semibold text-white/55 hover:text-white"
                  onClick={() => {
                    setError("");
                    setStep(step === "contact" ? "time" : step === "time" ? "day" : "menu");
                  }}
                >
                  ← {t.back}
                </button>
              )
            )}
          </div>
        </div>
      )}
      <button
        type="button"
        ref={fab}
        tabIndex={visible || open ? 0 : -1}
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="vt-chat flex size-14 items-center justify-center rounded-full bg-brand text-ink shadow-xl shadow-black/30 transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
