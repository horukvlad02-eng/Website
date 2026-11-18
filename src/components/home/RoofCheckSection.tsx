import { useEffect, useRef, useState, useId } from "react";
import { useLocale, L } from "@/components/site/L";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
const copy = {
  en: {
    eyebrow: "60-Second Roof Health Check",
    title: "Is your roof asking for help?",
    description: "Six quick yes/no questions. No signup. You get a risk level and a next step.",
    step: (e: number, t: number) => `Question ${e} of ${t}`,
    yes: "Yes",
    no: "No / Not sure",
    back: "Back",
    questions: [
      "Is your roof more than 15 years old?",
      "Any missing, cracked, curling or slipped shingles or tiles?",
      "Water stains on a ceiling or wall?",
      "Granules or debris collecting in your gutters?",
      "Has a storm hit your roof since it was last inspected?",
      "Sagging areas, or daylight visible in the attic?",
    ],
    levels: {
      low: {
        title: "Looking good",
        text: "Nothing here points to urgent trouble. A yearly check before hurricane season keeps it that way.",
      },
      mid: {
        title: "Worth a look",
        text: "Some of these signs can get worse after the next big rain or storm. A free inspection will tell you exactly where you stand.",
      },
      high: {
        title: "Get it checked soon",
        text: "Several warning signs add up. Water finds small openings fast, so book an inspection before the next storm.",
      },
    },
    score: "Risk score",
    note: "A quick self-check, not a diagnosis. Only an on-roof inspection can confirm the condition of your roof.",
    cta: "Book my free inspection",
    again: "Start over",
  },
  es: {
    eyebrow: "Chequeo del techo en 60 segundos",
    title: "¿Su techo está pidiendo ayuda?",
    description:
      "Seis preguntas rápidas de sí o no. Sin registro. Recibe un nivel de riesgo y el siguiente paso.",
    step: (e: number, t: number) => `Pregunta ${e} de ${t}`,
    yes: "Sí",
    no: "No / No estoy seguro",
    back: "Atrás",
    questions: [
      "¿Su techo tiene más de 15 años?",
      "¿Hay tejas o shingles faltantes, rotos, curvados o movidos?",
      "¿Hay manchas de agua en un techo interior o una pared?",
      "¿Se acumulan gránulos o residuos en sus canaletas?",
      "¿Ha pasado una tormenta por su techo desde su última inspección?",
      "¿Hay zonas hundidas o se ve luz del día en el ático?",
    ],
    levels: {
      low: {
        title: "Se ve bien",
        text: "Nada aquí indica un problema urgente. Una revisión anual antes de la temporada de huracanes lo mantiene así.",
      },
      mid: {
        title: "Vale la pena revisarlo",
        text: "Algunas de estas señales pueden empeorar con la próxima lluvia fuerte o tormenta. Una inspección gratis le dirá exactamente cómo está.",
      },
      high: {
        title: "Hágalo revisar pronto",
        text: "Varias señales de alerta se suman. El agua encuentra rápido las aberturas pequeñas, así que reserve una inspección antes de la próxima tormenta.",
      },
    },
    score: "Nivel de riesgo",
    note: "Es una autoevaluación rápida, no un diagnóstico. Solo una inspección sobre el techo puede confirmar su estado.",
    cta: "Reservar mi inspección gratis",
    again: "Empezar de nuevo",
  },
  fr: {
    eyebrow: "Bilan de santé du toit en 60 secondes",
    title: "Votre toit appelle-t-il à l’aide ?",
    description:
      "Six questions rapides par oui ou non. Sans inscription. Vous obtenez un niveau de risque et la prochaine étape.",
    step: (e: number, t: number) => `Question ${e} sur ${t}`,
    yes: "Oui",
    no: "Non / Je ne sais pas",
    back: "Retour",
    questions: [
      "Votre toit a-t-il plus de 15 ans ?",
      "Des bardeaux ou tuiles manquants, fissurés, gondolés ou déplacés ?",
      "Des taches d’eau sur un plafond ou un mur ?",
      "Des granulés ou débris s’accumulent-ils dans vos gouttières ?",
      "Une tempête a-t-elle touché votre toit depuis sa dernière inspection ?",
      "Des zones affaissées, ou de la lumière visible dans les combles ?",
    ],
    levels: {
      low: {
        title: "Tout va bien",
        text: "Rien ici n’indique un problème urgent. Un contrôle annuel avant la saison des ouragans vous garde à l’abri.",
      },
      mid: {
        title: "À faire vérifier",
        text: "Certains de ces signes peuvent s’aggraver à la prochaine grosse pluie ou tempête. Une inspection gratuite vous dira où vous en êtes.",
      },
      high: {
        title: "À faire vérifier vite",
        text: "Plusieurs signaux d’alerte s’additionnent. L’eau trouve vite les moindres ouvertures : réservez une inspection avant la prochaine tempête.",
      },
    },
    score: "Niveau de risque",
    note: "Un auto-contrôle rapide, pas un diagnostic. Seule une inspection sur le toit peut confirmer l’état de votre toit.",
    cta: "Réserver mon inspection gratuite",
    again: "Recommencer",
  },
};
export function RoofCheckSection() {
  const locale = useLocale(),
    t = copy[locale];
  const [answers, setAnswers] = useState<boolean[]>([]);
  const focus = useRef<HTMLDivElement>(null),
    interacted = useRef(false);
  useEffect(() => {
    if (interacted.current) focus.current?.focus({ preventScroll: true });
    interacted.current = true;
  }, [answers.length]);
  const score = answers.reduce((sum, yes, i) => sum + (yes ? ([2, 2, 3, 1, 2, 3][i] ?? 0) : 0), 0),
    level = score <= 2 ? "low" : score <= 6 ? "mid" : "high",
    done = answers.length === 6;
  return (
    <section
      id="roof-check"
      aria-labelledby="roof-check-heading"
      className="scroll-mt-20 bg-secondary py-24 sm:py-32 blueprint-paper"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="label-mono text-brand-deep">{t.eyebrow}</p>
          <h2
            id="roof-check-heading"
            className="mt-4 text-balance font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-5xl"
          >
            <Words>{t.title}</Words>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.description}
          </p>
        </Reveal>
        <Reveal className="mt-12">
          <div
            ref={focus}
            tabIndex={-1}
            className="glass glass-flat glass-dark relative overflow-hidden rounded-[28px] p-6 text-white shadow-2xl shadow-ink/30 sm:p-10 outline-none"
          >
            {done ? (
              <div role="status" className="step-in relative">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  {t.score}
                </p>
                <h3
                  className={`font-display text-3xl font-black ${level === "low" ? "text-emerald-400" : level === "mid" ? "text-amber-400" : "text-red-400"}`}
                >
                  {t.levels[level].title}
                </h3>
                <div className="mt-6 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-brand transition-[width]"
                    style={{ width: `${Math.round((score / 13) * 100)}%` }}
                  />
                </div>
                <p className="mt-5 text-lg text-white/80">{t.levels[level].text}</p>
                <p className="mt-4 text-sm text-white/50">{t.note}</p>
                <L to="/#inspection" className="btn-primary mt-6">
                  {t.cta}
                </L>
                <button
                  type="button"
                  className="mt-5 block text-sm text-white/60 hover:text-white"
                  onClick={() => setAnswers([])}
                >
                  {t.again}
                </button>
              </div>
            ) : (
              <div className="step-in relative">
                <p className="label-mono text-brand">{t.step(answers.length + 1, 6)}</p>
                <div className="mt-4 flex gap-2">
                  {t.questions.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i <= answers.length ? "bg-brand" : "bg-white/10"}`}
                    />
                  ))}
                </div>
                <h3 className="mt-8 min-h-20 font-display text-2xl font-bold sm:text-3xl">
                  {t.questions[answers.length]}
                </h3>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setAnswers([...answers, true])}
                  >
                    {t.yes}
                  </button>
                  <button
                    type="button"
                    className="btn-outline-light"
                    onClick={() => setAnswers([...answers, false])}
                  >
                    {t.no}
                  </button>
                </div>
                {answers.length > 0 && (
                  <button
                    type="button"
                    className="mt-6 text-sm text-white/60"
                    onClick={() => setAnswers(answers.slice(0, -1))}
                  >
                    {t.back}
                  </button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
