import type { Locale } from "@/lib/i18n";

/**
 * Roof lifespan calculator — v17.
 *
 * "How long should my roof last?" is the question a Miami homeowner actually asks, and the answer
 * depends on material, age and local conditions. This section gives a straight answer, then hands
 * the visitor to the free inspection. All copy lives here (never in JSX) so the three locales stay
 * in sync, per the project content rule.
 */
export interface LifespanMaterial {
  id: string;
  label: string;
  /** Expected service life in years, under South Florida conditions. */
  min: number;
  max: number;
  note: string;
}

export interface LifespanCopy {
  eyebrow: string;
  title: string;
  description: string;
  materials: LifespanMaterial[];
  materialLabel: string;
  ageLabel: string;
  ageUnit: string;
  resultLabel: string;
  /** Shown when the roof is younger than the material's expected life. */
  remaining: (years: number) => string;
  /** Shown when the roof has reached or passed the expected life. */
  overdue: (years: number) => string;
  verdictGood: string;
  verdictWatch: string;
  verdictReplace: string;
  hint: string;
  cta: string;
  ctaSecondary: string;
  disclaimer: string;
  noteTitle: string;
  notes: string[];
}

const copy: Record<Locale, LifespanCopy> = {
  en: {
    eyebrow: "Roof lifespan",
    title: "How long should your roof last?",
    description:
      "Pick your roofing material and how old the roof is. You get the honest service life in South Florida — and where your roof stands today.",
    materials: [
      {
        id: "shingle",
        label: "Asphalt shingle",
        min: 15,
        max: 25,
        note: "The most common roof in Miami-Dade. Salt air and UV shorten it faster than inland.",
      },
      {
        id: "tile",
        label: "Concrete / clay tile",
        min: 30,
        max: 50,
        note: "Long-lived, but underlayment and fasteners usually go first — not the tile itself.",
      },
      {
        id: "metal",
        label: "Standing seam metal",
        min: 40,
        max: 60,
        note: "The longest service life on a Miami home. Seams and fasteners are the wear points.",
      },
      {
        id: "flat",
        label: "Flat / membrane",
        min: 10,
        max: 20,
        note: "Coatings and membrane seams are the weak points, and standing water makes it worse.",
      },
    ],
    materialLabel: "What kind of roof do you have?",
    ageLabel: "How old is your roof?",
    ageUnit: "years",
    resultLabel: "Expected service life",
    remaining: (years) => `${years} more year${years === 1 ? "" : "s"} of useful life`,
    overdue: (years) => `${years} year${years === 1 ? "" : "s"} past expected life`,
    verdictGood: "Your roof is still in working order",
    verdictWatch: "Your roof is in the second half of its life",
    verdictReplace: "Your roof is due for replacement",
    hint: "A free on-roof inspection confirms what the calculator can only estimate.",
    cta: "Book my free inspection",
    ctaSecondary: "Call (786) 372-4754",
    disclaimer:
      "An estimate from age and material, not a diagnosis. Only an on-roof inspection can confirm the condition of your roof.",
    noteTitle: "What actually shortens a Miami roof's life",
    notes: [
      "Salt air off the Atlantic corrodes fasteners and flashing long before the material itself fails.",
      "A tropical storm can take years off a roof in a single afternoon.",
      "Missing granules or a lifted edge after a storm is the real deadline, not the calendar.",
      "Roofs in Broward's older neighborhoods often predate the current HVHZ fastening code.",
    ],
  },
  es: {
    eyebrow: "Vida útil del techo",
    title: "¿Cuánto debe durar su techo?",
    description:
      "Elija su material y la antigüedad de su techo. Le diremos la vida útil real en el sur de Florida y en qué estado está hoy.",
    materials: [
      {
        id: "shingle",
        label: "Shingle de asfalto",
        min: 15,
        max: 25,
        note: "El techo más común en Miami-Dade. El aire salado y los rayos UV lo acortan más rápido.",
      },
      {
        id: "tile",
        label: "Teja de hormigón o barro",
        min: 30,
        max: 50,
        note: "Dura mucho, pero la membrana y los fijadores fallan antes que la teja misma.",
      },
      {
        id: "metal",
        label: "Metal de junta alzada",
        min: 40,
        max: 60,
        note: "La mayor duración en una casa de Miami. Las juntas y los fijadores son los puntos débiles.",
      },
      {
        id: "flat",
        label: "Plano / membrana",
        min: 10,
        max: 20,
        note: "Los recubrimientos y las uniones de la membrana son lo más débil, y el agua estancada empeora todo.",
      },
    ],
    materialLabel: "¿Qué tipo de techo tiene?",
    ageLabel: "¿Qué antigüedad tiene su techo?",
    ageUnit: "años",
    resultLabel: "Vida útil esperada",
    remaining: (years) => `${years} año${years === 1 ? "" : "s"} más de vida útil`,
    overdue: (years) => `${years} año${years === 1 ? "" : "s"} más allá de la vida útil`,
    verdictGood: "Su techo todavía está en buen estado",
    verdictWatch: "Su techo está en la segunda mitad de su vida",
    verdictReplace: "Su techo necesita ser reemplazado",
    hint: "Una inspección gratis sobre el techo confirma lo que la calculadora solo puede estimar.",
    cta: "Reservar mi inspección gratis",
    ctaSecondary: "Llamar (786) 372-4754",
    disclaimer:
      "Es una estimación según la antigüedad y el material, no un diagnóstico. Solo una inspección sobre el techo puede confirmar el estado de su techo.",
    noteTitle: "Lo que realmente acorta la vida de un techo en Miami",
    notes: [
      "El aire salado del Atlántico corroe fijadores y flashing mucho antes de que el material falle.",
      "Una tormenta tropical puede restar años de vida a un techo en una sola tarde.",
      "Gránulos faltantes o un borde levantado tras una tormenta son el verdadero plazo, no el calendario.",
      "Los techos en los vecindarios más antiguos de Broward suelen ser anteriores al código de fijación HVHZ actual.",
    ],
  },
  fr: {
    eyebrow: "Durée de vie du toit",
    title: "Combien de temps votre toit devrait durer ?",
    description:
      "Choisissez votre matériaux et l'âge de votre toit. Vous obtenez sa durée de vie réelle dans le sud de la Florida — et où il en est aujourd'hui.",
    materials: [
      {
        id: "shingle",
        label: "Bardeaux d'asphalte",
        min: 15,
        max: 25,
        note: "Le toit le plus courant à Miami-Dade. L'air salé et les UV le shorten plus vite.",
      },
      {
        id: "tile",
        label: "Tuile béton / terre cuite",
        min: 30,
        max: 50,
        note: "Très durable, mais c'est la membrane et les fixations qui lâchent en premier — pas la tuile.",
      },
      {
        id: "metal",
        label: "Métal à joint debout",
        min: 40,
        max: 60,
        note: "La plus longue durée de vie sur une maison de Miami. Les joints et fixations sont les points faibles.",
      },
      {
        id: "flat",
        label: "Toit plat / membrane",
        min: 10,
        max: 20,
        note: "Les revêtements et les recouvrements de membrane sont les points faibles, aggravés par l'eau stagnante.",
      },
    ],
    materialLabel: "Quel type de toit avez-vous ?",
    ageLabel: "Quel âge a votre toit ?",
    ageUnit: "ans",
    resultLabel: "Durée de vie attendue",
    remaining: (years) => `${years} an${years === 1 ? "" : "s"} de vie utile restante`,
    overdue: (years) => `${years} an${years === 1 ? "" : "s"} au-delà de la durée de vie`,
    verdictGood: "Votre toit est encore en bon état",
    verdictWatch: "Votre toit est dans la seconde moitié de sa vie",
    verdictReplace: "Votre toit doit être remplacé",
    hint: "Une inspection gratuite sur le toit confirme ce que le calculateur ne peut qu'estimer.",
    cta: "Réserver mon inspection gratuite",
    ctaSecondary: "Appeler (786) 372-4754",
    disclaimer:
      "Une estimation fondée sur l'âge et le matériau, pas un diagnostic. Seule une inspection sur le toit peut confirmer l'état de votre toit.",
    noteTitle: "Ce qui raccourcit vraiment la vie d'un toit à Miami",
    notes: [
      "L'air salé de l'Atlantique corrode fixations et solins bien avant que le matériau ne cède.",
      "Une tempête tropicale peut retirer des années de vie à un toit en un seul après-midi.",
      "Des granules manquantes ou un soulèvement après une tempête : c'est la vraie échéance, pas le calendrier.",
      "Les toits des quartiers plus anciens du Broward précèdent souvent le code de fixation HVHZ actuel.",
    ],
  },
};

export const lifespan: Record<Locale, LifespanCopy> = copy;
