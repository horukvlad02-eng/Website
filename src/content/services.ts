import type { Locale } from "@/lib/i18n";
export interface CopyBlock {
  copy: string[];
  items1?: CopyBlock[];
  items2?: CopyBlock[];
  items3?: CopyBlock[];
  items4?: CopyBlock[];
  items5?: CopyBlock[];
  items6?: CopyBlock[];
  items7?: CopyBlock[];
  items8?: CopyBlock[];
  items9?: CopyBlock[];
  items10?: CopyBlock[];
  items11?: CopyBlock[];
  items12?: CopyBlock[];
}
export interface ServicesData {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: CopyBlock;
  faq: CopyBlock;
  faqItems: { q: string; a: string }[];
  overview?: CopyBlock;
  benefits?: CopyBlock;
  pricing?: CopyBlock;
  proof?: CopyBlock;
  process?: CopyBlock;
  more?: CopyBlock;
  cards?: CopyBlock;
  compare?: CopyBlock;
  included?: CopyBlock;
  repairNotice?: string | null;
}
export type HubData = ServicesData & Required<Pick<ServicesData, "cards" | "compare" | "included">>;
export type ServiceData = ServicesData &
  Required<Pick<ServicesData, "overview" | "benefits" | "pricing" | "process" | "more">>;
export const servicesHub: Record<Locale, HubData> = {
  en: {
    meta: {
      title: "Roofing Services Miami-Dade | Centurion Roofing",
      description:
        "Metal, tile, shingle and flat roofing in Miami-Dade & Broward. Free inspection and written quote on every job. Call (786) 372-4754.",
      ogTitle: "Roofing Services Miami-Dade | Centurion Roofing",
      ogDescription:
        "Metal, tile, shingle and flat roofing in Miami-Dade & Broward. Free inspection and written quote on every job. Call (786) 372-4754.",
    },
    faqItems: [
      {
        q: "Do I need a permit to replace my roof in Miami-Dade? +",
        a: "Yes. A roof replacement in Miami-Dade requires a building permit, and the work is inspected. We handle the permit paperwork for you.",
      },
      {
        q: "Which roofing material should I choose? +",
        a: "It depends on your roof shape, budget and how long you plan to stay. Metal lasts longest, tile suits the South Florida look, and architectural shingle is the fastest and cheapest option. We price all three at your free inspection.",
      },
      {
        q: "How much does a new roof cost in Miami? +",
        a: "Most residential projects land between $6 and $22 per square foot installed, depending on material, roof complexity and deck condition. Your free inspection includes an exact written number.",
      },
      {
        q: "Do you work on flat roofs and tile roofs? +",
        a: "Yes. We work on tile, shingle, metal and flat roofs, including flat roof coatings, for homes, businesses and HOAs.",
      },
      {
        q: "Which areas do you serve? +",
        a: "Miami-Dade and Broward counties, including Miami, Coral Gables, Hialeah, Fort Lauderdale, Doral and Kendall.",
      },
    ],
    hero: {
      copy: [
        "Services",
        "Every roof we build, starts with a free inspection.",
        "Metal, tile, shingle and flat roofing for homes, businesses and HOAs across Miami-Dade and Broward. Pick the service you need — the inspection and the written quote are free either way.",
        "Free Inspection",
        "(786) 372-4754",
        "Free inspection · Licensed & insured · FL CCC1331979",
      ],
    },
    cards: {
      copy: [
        "Long-lasting",
        "Metal Roofing",
        "Standing seam metal built for South Florida wind and sun.",
        "/services/metal-roofing/",
        "See Metal Roofing details",
        "→",
        "Most popular",
        "Tile & Shingle Replacement",
        "Full tear-off and installation of tile or shingle roofs, with permit and cleanup handled.",
        "/services/tile-shingle-replacement/",
        "See Tile & Shingle Replacement details",
        "→",
        "Business",
        "Flat & Commercial",
        "Flat roof repair, replacement and coatings for homes, businesses and HOAs.",
        "/services/flat-commercial/",
        "See Flat & Commercial details",
        "→",
        "Leaks",
        "Emergency Leak Repair",
        "Storm tarping and permanent repairs when water is getting into your home or building.",
        "/services/emergency-leak-repair/",
        "See Emergency Leak Repair details",
        "→",
      ],
    },
    compare: {
      copy: [
        "Compare",
        "Which one fits your roof?",
        "Same crew, same permit, same cleanup. What changes is the system you pick — and what it costs.",
        "Long-lasting",
        "Metal Roofing",
        "Standing seam metal",
        "13 – 22",
        "per sq ft",
        "Manufacturer warranty",
        "Homes that want the last roof they will ever buy, and lower summer cooling bills.",
        "/services/metal-roofing/",
        "See the service",
        "Most popular",
        "Tile & Shingle Replacement",
        "Architectural shingle",
        "6 – 9",
        "per sq ft",
        "Concrete or clay tile",
        "12 – 20",
        "per sq ft",
        "Manufacturer warranty",
        "Most Miami-Dade homes replacing an aging shingle roof.",
        "/services/tile-shingle-replacement/",
        "See the service",
        "Business",
        "Flat & Commercial",
        "Flat / low slope",
        "8 – 15",
        "per sq ft",
        "Workmanship warranty",
        "Low-slope roofs, buildings, HOAs and roofs that need coatings instead of tear-off.",
        "/services/flat-commercial/",
        "See the service",
        "Leaks",
        "Emergency Leak Repair",
        "Quoted after inspection",
        "Active leaks and storm damage that cannot wait for a planned replacement.",
        "/services/emergency-leak-repair/",
        "See the service",
      ],
    },
    included: {
      copy: ["What every job includes", "Call the office", "·", "(786) 372-4754"],
      items1: [
        { copy: ["Free on-roof inspection with photos"] },
        { copy: ["Written, itemized quote — no surprises"] },
        { copy: ["Permits pulled and city inspection scheduled"] },
        { copy: ["Full cleanup, including a magnet sweep for nails"] },
      ],
    },
    faq: { copy: ["Common Questions", "Roofing questions, answered."] },
  },
  es: {
    meta: {
      title: "Servicios de Techos en Miami-Dade | Centurion Roofing",
      description:
        "Techos de metal, teja, shingle y planos en Miami-Dade y Broward. Inspección gratis y cotización por escrito en cada trabajo. Llame al (786) 372-4754.",
      ogTitle: "Servicios de Techos en Miami-Dade | Centurion Roofing",
      ogDescription:
        "Techos de metal, teja, shingle y planos en Miami-Dade y Broward. Inspección gratis y cotización por escrito en cada trabajo. Llame al (786) 372-4754.",
    },
    faqItems: [
      {
        q: "¿Necesito un permiso para cambiar mi techo en Miami-Dade? +",
        a: "Sí. El reemplazo de un techo en Miami-Dade requiere un permiso de construcción y una inspección. Nosotros nos encargamos del trámite por usted.",
      },
      {
        q: "¿Qué material de techo debería elegir? +",
        a: "Depende de la forma de su techo, su presupuesto y cuánto tiempo planea estar en la casa. El metal dura más, la teja va más con el aspecto del sur de Florida, y el shingle es la opción más rápida y económica. Cotizamos las tres en su inspección gratis.",
      },
      {
        q: "¿Cuánto cuesta un techo nuevo en Miami? +",
        a: "La mayoría de los proyectos residenciales están entre $6 y $22 por pie cuadrado instalado, según el material, la complejidad del techo y el estado de la base. Su inspección gratis incluye una cifra exacta por escrito.",
      },
      {
        q: "¿Trabajan en techos planos y de tejas? +",
        a: "Sí. Trabajamos en techos de tejas, shingle, metal y techos planos, incluidos los recubrimientos para techo plano, en casas, negocios y HOA.",
      },
      {
        q: "¿Qué zonas atienden? +",
        a: "Los condados de Miami-Dade y Broward, incluidas Miami, Coral Gables, Hialeah, Fort Lauderdale, Doral y Kendall.",
      },
    ],
    hero: {
      copy: [
        "Servicios",
        "Cada techo que construimos empieza con una inspección gratis.",
        "Techos de metal, tejas, shingle y planos para casas, negocios y HOA en Miami-Dade y Broward. Elija el servicio que necesita — la inspección y la cotización por escrito son gratis en ambos casos.",
        "Inspección gratuita",
        "(786) 372-4754",
        "Inspección gratuita · Licencia y seguro · FL CCC1331979",
      ],
    },
    cards: {
      copy: [
        "Larga duración",
        "Techos de metal",
        "Metal de junta alzada, construido para el viento y el sol del sur de Florida.",
        "/services/metal-roofing/",
        "Ver detalles de Techos de metal",
        "→",
        "Más solicitado",
        "Reemplazo de teja de barro y shingle",
        "Remoción completa e instalación de techos de teja de barro o shingle, con permisos y limpieza incluidos.",
        "/services/tile-shingle-replacement/",
        "Ver detalles de Reemplazo de teja de barro y shingle",
        "→",
        "Negocios",
        "Techos planos y comerciales",
        "Reparación, reemplazo y recubrimientos de techos planos para viviendas, negocios y HOAs.",
        "/services/flat-commercial/",
        "Ver detalles de Techos planos y comerciales",
        "→",
        "Filtraciones",
        "Reparación de goteras",
        "Protección de emergencia con lona y reparaciones permanentes cuando el agua entra en su casa o edificio.",
        "/services/emergency-leak-repair/",
        "Ver detalles de Reparación de goteras",
        "→",
      ],
    },
    compare: {
      copy: [
        "Comparar",
        "¿Cuál le sirve a su techo?",
        "La misma cuadrilla, el mismo permiso, la misma limpieza. Lo que cambia es el sistema que elige — y lo que cuesta.",
        "Larga duración",
        "Techos de metal",
        "Metal standing seam",
        "13 – 22",
        "por pie²",
        "Garantía del fabricante",
        "Casas que quieren el último techo que van a comprar, y facturas de aire más bajas en verano.",
        "/services/metal-roofing/",
        "Ver el servicio",
        "Más solicitado",
        "Reemplazo de teja de barro y shingle",
        "Shingle arquitectónico",
        "6 – 9",
        "por pie²",
        "Teja de hormigón o barro",
        "12 – 20",
        "por pie²",
        "Garantía del fabricante",
        "La mayoría de las casas de Miami-Dade que cambian un techo de shingle viejo.",
        "/services/tile-shingle-replacement/",
        "Ver el servicio",
        "Negocios",
        "Techos planos y comerciales",
        "Plano / poca pendiente",
        "8 – 15",
        "por pie²",
        "Garantía de mano de obra",
        "Techos de poca pendiente, comercios, HOAs y techos que llevan coatings en vez de remoción.",
        "/services/flat-commercial/",
        "Ver el servicio",
        "Filtraciones",
        "Reparación de goteras",
        "Se cotiza tras la inspección",
        "Goteras activas y daños de tormenta que no pueden esperar un reemplazo programado.",
        "/services/emergency-leak-repair/",
        "Ver el servicio",
      ],
    },
    included: {
      copy: ["Qué incluye cada trabajo", "Llame a la oficina", "·", "(786) 372-4754"],
      items1: [
        { copy: ["Inspección gratis sobre el techo, con fotos"] },
        { copy: ["Cotización detallada por escrito — sin sorpresas"] },
        { copy: ["Permisos tramitados y cita con la inspección de la ciudad"] },
        { copy: ["Limpieza completa, con barrido magnético para clavos"] },
      ],
    },
    faq: { copy: ["Preguntas frecuentes", "Preguntas sobre techos, con respuestas claras."] },
  },
  fr: {
    meta: {
      title: "Services de Toiture à Miami-Dade | Centurion Roofing",
      description:
        "Toiture métallique, tuiles, bardeaux et toits plats à Miami-Dade et Broward. Inspection gratuite et devis écrit sur chaque chantier. Appelez le (786) 372-4754.",
      ogTitle: "Services de Toiture à Miami-Dade | Centurion Roofing",
      ogDescription:
        "Toiture métallique, tuiles, bardeaux et toits plats à Miami-Dade et Broward. Inspection gratuite et devis écrit sur chaque chantier. Appelez le (786) 372-4754.",
    },
    faqItems: [
      {
        q: "Ai-je besoin d’un permis pour remplacer mon toit à Miami-Dade ? +",
        a: "Oui. Le remplacement d’un toit à Miami-Dade nécessite un permis de construire et une inspection. Nous nous occupons des démarches pour vous.",
      },
      {
        q: "Quel matériau de couverture choisir ? +",
        a: "Cela dépend de la forme de votre toit, de votre budget et de la durée de votre séjour. Le métal dure le plus longtemps, la tuile correspond à l’esthétique du sud de la Floride, et le bardeau est l’option la plus rapide et la moins chère. Nous chiffrons les trois lors de l’inspection gratuite.",
      },
      {
        q: "Combien coûte un nouveau toit à Miami ? +",
        a: "La plupart des projets résidentiels se situent entre 6 et 22 dollars le pied carré posé, selon le matériau, la complexité du toit et l’état du support. L’inspection gratuite comprend un chiffre exact écrit.",
      },
      {
        q: "Travaillez-vous sur les toits plats et les toits en tuiles ? +",
        a: "Oui. Nous travaillons sur les toits en tuiles, bardeaux, métal et toits plats, y compris les revêtements de toiture plate, pour les maisons, les entreprises et les HOA.",
      },
      {
        q: "Quelles zones couvrez-vous ? +",
        a: "Les comtés de Miami-Dade et Broward, dont Miami, Coral Gables, Hialeah, Fort Lauderdale, Doral et Kendall.",
      },
    ],
    hero: {
      copy: [
        "Services",
        "Chaque toit que nous construisons commence par une inspection gratuite.",
        "Toiture métallique, en tuiles, en bardeaux et toits plats pour les maisons, entreprises et syndics de copropriété dans Miami-Dade et Broward. Choisissez le service dont vous avez besoin — l’inspection et le devis écrit sont gratuits dans tous les cas.",
        "Inspection gratuite",
        "(786) 372-4754",
        "Inspection gratuite · Agréé et assuré · FL CCC1331979",
      ],
    },
    cards: {
      copy: [
        "Longue durée de vie",
        "Toiture métallique",
        "Métal à joint debout conçu pour le vent et le soleil du sud de la Florida.",
        "/services/metal-roofing/",
        "Voir le détail : Toiture métallique",
        "→",
        "Le plus courant",
        "Remplacement de tuiles et bardeaux",
        "Dépose complète et pose de toitures en tuiles ou en bardeaux, permis et nettoyage pris en charge.",
        "/services/tile-shingle-replacement/",
        "Voir le détail : Remplacement de tuiles et bardeaux",
        "→",
        "Professionnels",
        "Toits plats et commerciaux",
        "Réparation, remplacement et revêtements de toits plats pour logements, entreprises et syndics de copropriété.",
        "/services/flat-commercial/",
        "Voir le détail : Toits plats et commerciaux",
        "→",
        "Fuites",
        "Réparation de fuites d’urgence",
        "Bâchage d’urgence et réparations définitives quand l’eau s’infiltre dans votre maison ou votre bâtiment.",
        "/services/emergency-leak-repair/",
        "Voir le détail : Réparation de fuites d’urgence",
        "→",
      ],
    },
    compare: {
      copy: [
        "Comparer",
        "Lequel convient à votre toit ?",
        "Même équipe, même permis, même nettoyage. Ce qui change, c’est le système que vous choisissez — et son prix.",
        "Longue durée de vie",
        "Toiture métallique",
        "Métal standing seam",
        "13 – 22",
        "le pi²",
        "Garantie fabricant",
        "Les maisons qui veulent le dernier toit à jamais, et des factures de clim moins élevées en été.",
        "/services/metal-roofing/",
        "Voir le service",
        "Le plus courant",
        "Remplacement de tuiles et bardeaux",
        "Bardeau architectural",
        "6 – 9",
        "le pi²",
        "Tuile béton ou terre cuite",
        "12 – 20",
        "le pi²",
        "Garantie fabricant",
        "La plupart des maisons de Miami-Dade qui remplacent un vieux toit en bardeaux.",
        "/services/tile-shingle-replacement/",
        "Voir le service",
        "Professionnels",
        "Toits plats et commerciaux",
        "Plat / faible pente",
        "8 – 15",
        "le pi²",
        "Garantie main-d’œuvre",
        "Toits à faible pente, commerces, syndics et toits qui reçoivent un revêtement plutôt qu’une dépose.",
        "/services/flat-commercial/",
        "Voir le service",
        "Fuites",
        "Réparation de fuites d’urgence",
        "Chiffré après inspection",
        "Les fuites actives et les dégâts de tempête qui ne peuvent pas attendre un remplacement planifié.",
        "/services/emergency-leak-repair/",
        "Voir le service",
      ],
    },
    included: {
      copy: ["Ce que comprend chaque chantier", "Appelez le bureau", "·", "(786) 372-4754"],
      items1: [
        { copy: ["Inspection gratuite sur le toit, avec photos"] },
        { copy: ["Devis écrit et détaillé — aucune surprise"] },
        { copy: ["Permis déposés et inspection municipale planifiée"] },
        { copy: ["Nettoyage complet, balayage magnétique des clous compris"] },
      ],
    },
    faq: { copy: ["Questions fréquentes", "Questions sur la toiture, réponses claires."] },
  },
};
export const services = {
  "metal-roofing": {
    en: {
      meta: {
        title: "Standing Seam Metal Roofing Miami | Centurion Roofing",
        description:
          "Standing seam metal roofing in Miami-Dade and Broward. Hurricane-rated, energy efficient, up to 50-year warranty. Free inspection: (786) 372-4754.",
        ogTitle: "Standing Seam Metal Roofing Miami | Centurion Roofing",
        ogDescription:
          "Standing seam metal roofing in Miami-Dade and Broward. Hurricane-rated, energy efficient, up to 50-year warranty. Free inspection: (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "How much does a metal roof cost in Miami? +",
          a: "Most residential standing seam projects land between $12 and $20 per square foot installed, depending on panel profile, roof complexity and deck condition. Your free inspection includes an exact written number.",
        },
        {
          q: "Is metal roofing noisy when it rains? +",
          a: "Not when installed over solid deck and proper underlayment — it is typically quieter inside than a tile roof during a storm.",
        },
        {
          q: "Will a metal roof lower my insurance? +",
          a: "It can. Wind-mitigation features and impact ratings may qualify for discounts with some insurers. Ask your agent, and we’ll provide the roof documentation they ask for.",
        },
        {
          q: "How long does installation take? +",
          a: "A typical single-family home takes 3–5 working days from tear-off to final trim.",
        },
      ],
      hero: {
        copy: [
          "Services · Long-lasting",
          "Metal roofs engineered for hurricane season.",
          "Standing seam metal is the strongest residential roofing system money can buy in South Florida — and the one our crews install most.",
          "Free Inspection",
          "(786) 372-4754",
          "Free inspection · Licensed & insured · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Metal Roofing",
          "service-metal",
          "Why homeowners choose it",
          "Metal Roofing",
          "in Miami-Dade & Broward",
          "South Florida sun and salt air destroy ordinary roofing materials. A standing seam metal roof reflects heat, sheds water instantly, and is rated to withstand the wind loads Miami-Dade building code demands — often with a service life two to three times longer than shingles.",
          "As a GAF-certified contractor installing Englert standing seam systems, we handle everything: tear-off, deck inspection, underlayment, panel fabrication and trim — permitted, inspected and warrantied.",
          "Questions? Call",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["What’s included in every metal roofing job"],
        items1: [
          {
            copy: [
              "Hurricane-rated systems",
              "Tested and installed to Miami-Dade HVHZ wind requirements",
            ],
          },
          {
            copy: [
              "Energy efficient",
              "Reflective coatings can cut cooling costs through Miami summers",
            ],
          },
          {
            copy: [
              "50-year service life",
              "Metal outlasts shingles 2–3× with almost zero maintenance",
            ],
          },
          { copy: ["Manufacturer warranty", "Backed by Englert and GAF material warranties"] },
        ],
      },
      pricing: {
        copy: [
          "What it costs",
          "What a standing seam metal roof costs in Miami-Dade.",
          "Tear-off, materials, labor, permit and cleanup are all in these numbers. Your exact price comes after a free inspection — written, itemized, and yours to keep.",
          "Get my exact price",
          "or call",
          "(786) 372-4754",
          "Roof size",
          "—",
          "Typical installed cost",
          "Roof size",
          "Typical installed cost",
          "Includes tear-off · materials · labor · permit · cleanup",
          "Includes tear-off · materials · labor · permit · cleanup",
          "Ballpark for a typical Miami-Dade home. Your roof’s shape, the number of layers and the deck condition move the final number — the written quote is the real price.",
        ],
        items1: [{ copy: ["Standing seam metal", "13 – 22", "per sq ft"] }],
        items2: [
          {
            copy: ["Standing seam metal", "Manufacturer warranty"],
            items3: [
              { copy: ["$19,500 – $33,000", "1,500", "sq ft"] },
              { copy: ["$26,000 – $44,000", "2,000", "sq ft"] },
              { copy: ["$32,500 – $55,000", "2,500", "sq ft"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Standing seam metal",
              "Manufacturer warranty",
              "1,500",
              "sq ft",
              "$19,500 – $33,000",
              "2,000",
              "sq ft",
              "$26,000 – $44,000",
              "2,500",
              "sq ft",
              "$32,500 – $55,000",
            ],
          },
        ],
        items5: [
          { copy: ["Licensed CCC1331979"] },
          { copy: ["4.9★ · 60+ Google reviews"] },
          { copy: ["Free inspection"] },
        ],
      },
      proof: {
        copy: [
          "Proof",
          "Metal Roofing jobs we finished.",
          "Real roofs, real areas, photographed on site. Open one to see the system we installed and how far it is from our shop.",
          "/projects/",
          "See every project",
        ],
        items1: [
          {
            copy: [
              "/projects/red-standing-seam-metal-roof/",
              "Completed red standing seam metal roof project",
              "project-red-metal",
              "Metal Roofing",
              "Miami, FL",
              "4.8 mi from our shop",
              "Red Standing Seam Metal Roof",
              "Standing seam metal roof on a single-story home, finished in red over a hip roof with several valleys.",
              "See this project",
            ],
          },
          {
            copy: [
              "/projects/white-standing-seam-metal-roof/",
              "Completed white standing seam metal roof project",
              "project-white-metal",
              "Metal Roofing",
              "Miami-Dade, FL",
              "15.5 mi from our shop",
              "White Standing Seam Metal Roof",
              "Light-colored standing seam panels on a hip roof, a popular choice in South Florida for reducing heat absorbed by the roof.",
              "See this project",
            ],
          },
        ],
      },
      process: {
        copy: ["How it works"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Free on-roof inspection",
              "We measure, photograph and document your existing roof.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Written, itemized quote",
              "Panel type, color, trim and timeline — no surprises.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Permits & installation",
              "We pull permits and install to code with certified crews.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Final inspection & warranty",
              "City inspection passed, warranty registered, site spotless.",
            ],
          },
        ],
      },
      faq: { copy: ["Common Questions", "Metal Roofing: your questions, answered."] },
      more: {
        copy: ["More services"],
        items1: [
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Most popular",
              "Tile & Shingle Replacement",
              "Full tear-off and installation of tile or shingle roofs, with permit and cleanup handled.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Business",
              "Flat & Commercial",
              "Flat roof repair, replacement and coatings for homes, businesses and HOAs.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Leaks",
              "Emergency Leak Repair",
              "Storm tarping and permanent repairs when water is getting into your home or building.",
            ],
          },
        ],
      },
    },
    es: {
      meta: {
        title: "Techos Metálicos Standing Seam en Miami | Centurion Roofing",
        description:
          "Techos metálicos de junta alzada en Miami-Dade y Broward. Resistentes a huracanes, garantía de hasta 50 años. Inspección: (786) 372-4754.",
        ogTitle: "Techos Metálicos Standing Seam en Miami | Centurion Roofing",
        ogDescription:
          "Techos metálicos de junta alzada en Miami-Dade y Broward. Resistentes a huracanes, garantía de hasta 50 años. Inspección: (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "¿Cuánto cuesta un techo de metal en Miami? +",
          a: "La mayoría de los proyectos residenciales de junta alzada se sitúa entre $12 y $20 por pie cuadrado instalado, según el perfil del panel, la complejidad del techo y el estado de la base. Su inspección gratuita incluye una cifra escrita exacta.",
        },
        {
          q: "¿Los techos metálicos hacen ruido cuando llueve? +",
          a: "No cuando se instalan sobre una base sólida y una capa impermeable bajo el techo adecuada; por lo general son más silenciosos en el interior que un techo de teja durante una tormenta.",
        },
        {
          q: "¿Un techo de metal puede bajar mi seguro? +",
          a: "Puede. Las características de mitigación de viento y las clasificaciones de impacto pueden dar lugar a descuentos con algunas aseguradoras. Consulte con su agente y nosotros le proporcionamos la documentación del techo que le solicite.",
        },
        {
          q: "¿Cuánto tarda la instalación? +",
          a: "Una vivienda unifamiliar típica toma de 3 a 5 días hábiles, desde la remoción del techo hasta el remate final.",
        },
      ],
      hero: {
        copy: [
          "Servicios · Larga duración",
          "Techos metálicos diseñados para la temporada de huracanes.",
          "El metal de junta alzada es el sistema de techos residenciales más resistente que existe en el sur de Florida, y es el que nuestros equipos instalan con mayor frecuencia.",
          "Inspección gratuita",
          "(786) 372-4754",
          "Inspección gratuita · Licencia y seguro · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Techos de metal",
          "service-metal",
          "Por qué nos eligen",
          "Techos de metal",
          "en Miami-Dade y Broward",
          "El sol y el aire salado del sur de Florida deterioran los materiales de cubierta más comunes. Un techo de metal de junta alzada refleja el calor, evacua el agua de inmediato y está certificado para resistir las cargas de viento que exige el código de construcción de Miami-Dade, a menudo con una vida útil de dos a tres veces mayor que la de las tejas asfálticas.",
          "Como contratista certificado por GAF e instalador de sistemas Englert de junta alzada, nos encargamos de todo: remoción del techo existente, inspección de la base, capa impermeable bajo el techo, fabricación de paneles y remates, con permiso, inspección final y garantía.",
          "¿Preguntas? Llame al",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["Qué incluye cada trabajo de techos de metal"],
        items1: [
          {
            copy: [
              "Sistemas resistentes a huracanes",
              "Probados e instalados según los requisitos de viento HVHZ de Miami-Dade",
            ],
          },
          {
            copy: [
              "Eficiencia energética",
              "Los recubrimientos reflectantes pueden reducir el costo de enfriamiento durante los veranos de Miami",
            ],
          },
          {
            copy: [
              "Vida útil de 50 años",
              "El metal dura 2 a 3 veces más que las tejas, con casi cero mantenimiento",
            ],
          },
          {
            copy: [
              "Garantía del fabricante",
              "Respaldada por las garantías de materiales de Englert y GAF",
            ],
          },
        ],
      },
      pricing: {
        copy: [
          "Cuánto cuesta",
          "Cuánto cuesta un techo de metal standing seam en Miami-Dade.",
          "La remoción, los materiales, la mano de obra, el permiso y la limpieza están incluidos en estas cifras. Su precio exacto llega después de una inspección gratis — por escrito, desglosado, y suyo para quedarse.",
          "Quiero mi precio exacto",
          "o llame al",
          "(786) 372-4754",
          "Tamaño del techo",
          "—",
          "Costo típico instalado",
          "Tamaño del techo",
          "Costo típico instalado",
          "Incluye remoción · materiales · mano de obra · permiso · limpieza",
          "Incluye remoción · materiales · mano de obra · permiso · limpieza",
          "Cifra aproximada para una casa típica de Miami-Dade. La forma del techo, las capas y el estado del deck cambian el número final — la cotización escrita es el precio real.",
        ],
        items1: [{ copy: ["Metal standing seam", "13 – 22", "por pie²"] }],
        items2: [
          {
            copy: ["Metal standing seam", "Garantía del fabricante"],
            items3: [
              { copy: ["$19,500 – $33,000", "1,500", "pies²"] },
              { copy: ["$26,000 – $44,000", "2,000", "pies²"] },
              { copy: ["$32,500 – $55,000", "2,500", "pies²"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Metal standing seam",
              "Garantía del fabricante",
              "1,500",
              "pies²",
              "$19,500 – $33,000",
              "2,000",
              "pies²",
              "$26,000 – $44,000",
              "2,500",
              "pies²",
              "$32,500 – $55,000",
            ],
          },
        ],
        items5: [
          { copy: ["Licenciado CCC1331979"] },
          { copy: ["4.9★ · 60+ reseñas de Google"] },
          { copy: ["Inspección gratis"] },
        ],
      },
      proof: {
        copy: [
          "Prueba",
          "Trabajos de Techos de metal que terminamos.",
          "Techos reales, áreas reales, fotografiados en la obra. Abra uno para ver el sistema que instalamos y a qué distancia está de nuestra oficina.",
          "/projects/",
          "Ver todos los proyectos",
        ],
        items1: [
          {
            copy: [
              "/projects/red-standing-seam-metal-roof/",
              "Proyecto terminado: techo de metal standing seam rojo",
              "project-red-metal",
              "Techos de metal",
              "Miami, FL",
              "4.8 mi de nuestra oficina",
              "Techo de metal standing seam rojo",
              "Techo de metal standing seam en una casa de un piso, terminado en rojo, con techo a cuatro aguas y varios valles.",
              "Ver este proyecto",
            ],
          },
          {
            copy: [
              "/projects/white-standing-seam-metal-roof/",
              "Proyecto terminado: techo de metal standing seam blanco",
              "project-white-metal",
              "Techos de metal",
              "Miami-Dade, FL",
              "15.5 mi de nuestra oficina",
              "Techo de metal standing seam blanco",
              "Paneles standing seam de color claro en un techo a cuatro aguas, una opción popular en el sur de Florida para reducir el calor que absorbe el techo.",
              "Ver este proyecto",
            ],
          },
        ],
      },
      process: {
        copy: ["Cómo funciona"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Inspección gratuita en el techo",
              "Medimos, fotografiamos y documentamos su techo actual.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Cotización escrita y desglosada",
              "Tipo de panel, color, remates y cronograma, sin sorpresas.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Permisos e instalación",
              "Tramitamos los permisos e instalamos según el código con equipos certificados.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Inspección final y garantía",
              "Inspección municipal aprobada, garantía registrada y área limpia.",
            ],
          },
        ],
      },
      faq: { copy: ["Preguntas frecuentes", "Techos de metal: sus preguntas, respondidas."] },
      more: {
        copy: ["Más servicios"],
        items1: [
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Más solicitado",
              "Reemplazo de teja de barro y shingle",
              "Remoción completa e instalación de techos de teja de barro o shingle, con permisos y limpieza incluidos.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Negocios",
              "Techos planos y comerciales",
              "Reparación, reemplazo y recubrimientos de techos planos para viviendas, negocios y HOAs.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Filtraciones",
              "Reparación de goteras",
              "Protección de emergencia con lona y reparaciones permanentes cuando el agua entra en su casa o edificio.",
            ],
          },
        ],
      },
    },
    fr: {
      meta: {
        title: "Toiture Métal Joint Debout à Miami | Centurion Roofing",
        description:
          "Toiture métallique à joint debout à Miami-Dade et Broward. Anti-ouragan, économe en énergie, garantie 50 ans. Inspection gratuite : (786) 372-4754.",
        ogTitle: "Toiture Métal Joint Debout à Miami | Centurion Roofing",
        ogDescription:
          "Toiture métallique à joint debout à Miami-Dade et Broward. Anti-ouragan, économe en énergie, garantie 50 ans. Inspection gratuite : (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "Combien coûte un toit métallique à Miami ? +",
          a: "La plupart des projets résidentiels en joint debout se situent entre 12 et 20 $ le pied carré posé, selon le profil des panneaux, la complexité de la toiture et l’état du support. Votre inspection gratuite comprend un montant écrit exact.",
        },
        {
          q: "Un toit métallique est-il bruyant quand il pleut ? +",
          a: "Non, lorsqu’il est posé sur un support plein avec un écran sous-toiture adapté — il est généralement plus silencieux à l’intérieur qu’une toiture en tuiles pendant un orage.",
        },
        {
          q: "Un toit métallique peut-il réduire ma prime d’assurance ? +",
          a: "Il peut. Les dispositifs de mitigation du vent et les classements d’impact peuvent ouvrir droit à des remises chez certains assureurs. Demandez à votre courtier : nous vous fournissons la documentation du toit qu’il demande.",
        },
        {
          q: "Combien de temps dure l’installation ? +",
          a: "Une maison individuelle classique demande 3 à 5 jours ouvrés, de la dépose aux finitions finales.",
        },
      ],
      hero: {
        copy: [
          "Services · Longue durée de vie",
          "Des toits métalliques conçus pour la saison des ouragans.",
          "Le métal à joint debout est le système de toiture résidentielle le plus solide que vous puissiez faire installer dans le sud de la Florida — et c’est celui que nos équipes posent le plus souvent.",
          "Inspection gratuite",
          "(786) 372-4754",
          "Inspection gratuite · Agréé et assuré · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Toiture métallique",
          "service-metal",
          "Pourquoi nous choisir",
          "Toiture métallique",
          "à Miami-Dade et Broward",
          "Le soleil et l’air salé du sud de la Florida détruisent les matériaux de couverture ordinaires. Un toit métallique à joint debout réfléchit la chaleur, évacue l’eau immédiatement et est dimensionné pour résister aux charges de vent exigées par le code du bâtiment de Miami-Dade — souvent avec une durée de vie de deux à trois fois supérieure à celle des bardeaux.",
          "En tant qu’entrepreneur certifié GAF installant les systèmes à joint debout Englert, nous prenons tout en charge : dépose, inspection du support, écran sous-toiture, découpe des panneaux et finitions — permis, inspection et garantie inclus.",
          "Une question ? Appelez le",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["Ce que comprend chaque chantier de toiture métallique"],
        items1: [
          {
            copy: [
              "Systèmes homologués anti-ouragan",
              "Testés et installés conformément aux exigences de vent HVHZ de Miami-Dade",
            ],
          },
          {
            copy: [
              "Économe en énergie",
              "Les revêtements réfléchissants peuvent réduire les coûts de refroidissement pendant les étés de Miami",
            ],
          },
          {
            copy: [
              "Durée de vie de 50 ans",
              "Le métal dure 2 à 3 fois plus longtemps que les bardeaux, avec presque aucun entretien",
            ],
          },
          {
            copy: ["Garantie du fabricant", "Couverte par les garanties matière d’Englert et GAF"],
          },
        ],
      },
      pricing: {
        copy: [
          "Combien ça coûte",
          "Combien coûte un toit métallique standing seam à Miami-Dade ?",
          "La dépose, les matériaux, la main-d’œuvre, le permis et le nettoyage sont inclus dans ces chiffres. Votre prix exact arrive après une inspection gratuite — écrit, détaillé, et à vous.",
          "Obtenir mon prix exact",
          "ou appelez",
          "(786) 372-4754",
          "Surface du toit",
          "—",
          "Coût typique installé",
          "Surface du toit",
          "Coût typique installé",
          "Comprend dépose · matériaux · main-d’œuvre · permis · nettoyage",
          "Comprend dépose · matériaux · main-d’œuvre · permis · nettoyage",
          "Estimation pour une maison typique de Miami-Dade. La forme du toit, le nombre de couches et l’état du support changent le chiffre final — le devis écrit est le vrai prix.",
        ],
        items1: [{ copy: ["Métal standing seam", "13 – 22", "le pi²"] }],
        items2: [
          {
            copy: ["Métal standing seam", "Garantie fabricant"],
            items3: [
              { copy: ["19 500 $US – 33 000 $US", "1 500", "pi²"] },
              { copy: ["26 000 $US – 44 000 $US", "2 000", "pi²"] },
              { copy: ["32 500 $US – 55 000 $US", "2 500", "pi²"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Métal standing seam",
              "Garantie fabricant",
              "1 500",
              "pi²",
              "19 500 $US – 33 000 $US",
              "2 000",
              "pi²",
              "26 000 $US – 44 000 $US",
              "2 500",
              "pi²",
              "32 500 $US – 55 000 $US",
            ],
          },
        ],
        items5: [
          { copy: ["Licencié CCC1331979"] },
          { copy: ["4,9★ · 60+ avis Google"] },
          { copy: ["Inspection gratuite"] },
        ],
      },
      proof: {
        copy: [
          "Preuve",
          "Chantiers Toiture métallique que nous avons terminés.",
          "Des toits réels, de vraies zones, photographiés sur le chantier. Ouvrez-en un pour voir le système posé et la distance depuis notre bureau.",
          "/projects/",
          "Voir toutes les réalisations",
        ],
        items1: [
          {
            copy: [
              "/projects/red-standing-seam-metal-roof/",
              "Chantier terminé : toit métallique à joint debout rouge",
              "project-red-metal",
              "Toiture métallique",
              "Miami, FL",
              "4.8 mi de notre bureau",
              "Toit métallique à joint debout rouge",
              "Toit métallique à joint debout sur une maison de plain-pied, fini en rouge, avec un toit à quatre pans et plusieurs noues.",
              "Voir cette réalisation",
            ],
          },
          {
            copy: [
              "/projects/white-standing-seam-metal-roof/",
              "Chantier terminé : toit métallique à joint debout blanc",
              "project-white-metal",
              "Toiture métallique",
              "Miami-Dade, FL",
              "15.5 mi de notre bureau",
              "Toit métallique à joint debout blanc",
              "Panneaux à joint debout de couleur claire sur un toit à quatre pans, un choix courant en Floride du Sud pour limiter la chaleur absorbée par la toiture.",
              "Voir cette réalisation",
            ],
          },
        ],
      },
      process: {
        copy: ["Comment ça se passe"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Inspection gratuite sur le toit",
              "Nous mesurons, photographions et documentons votre toiture existante.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Devis écrit et détaillé",
              "Type de panneau, couleur, finitions et calendrier — aucune surprise.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Permis et installation",
              "Nous obtenons les permis et posons selon le code, avec des équipes certifiées.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Inspection finale et garantie",
              "Inspection de la ville validée, garantie enregistrée, chantier impeccable.",
            ],
          },
        ],
      },
      faq: { copy: ["Questions fréquentes", "Toiture métallique : vos questions, nos réponses."] },
      more: {
        copy: ["Autres services"],
        items1: [
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Le plus courant",
              "Remplacement de tuiles et bardeaux",
              "Dépose complète et pose de toitures en tuiles ou en bardeaux, permis et nettoyage pris en charge.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Professionnels",
              "Toits plats et commerciaux",
              "Réparation, remplacement et revêtements de toits plats pour logements, entreprises et syndics de copropriété.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Fuites",
              "Réparation de fuites d’urgence",
              "Bâchage d’urgence et réparations définitives quand l’eau s’infiltre dans votre maison ou votre bâtiment.",
            ],
          },
        ],
      },
    },
  },
  "tile-shingle-replacement": {
    en: {
      meta: {
        title: "Roof Replacement Miami | Tile & Shingle | Centurion Roofing",
        description:
          "Full roof replacement in Miami: tile and architectural shingle tear-off, permits, cleanup. 4.9★ rated, GAF-certified. Free written quote: (786) 372-4754.",
        ogTitle: "Roof Replacement Miami | Tile & Shingle | Centurion Roofing",
        ogDescription:
          "Full roof replacement in Miami: tile and architectural shingle tear-off, permits, cleanup. 4.9★ rated, GAF-certified. Free written quote: (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "Tile or shingle — which is better for Miami? +",
          a: "Tile lasts longer and fits the South Florida look, but costs more and needs a structure that can carry the weight. Architectural shingles are faster and cheaper to install. We will show you both numbers at inspection.",
        },
        {
          q: "Can you help with my insurance claim? +",
          a: "Yes — storm-damaged roofs are often covered. See our insurance claims page; we document the damage and can be on the roof during your adjuster’s visit.",
        },
        {
          q: "How long does a replacement take? +",
          a: "Shingle roofs: 2–4 days. Tile: 5–8 days including underlayment and re-set.",
        },
        {
          q: "Do you offer financing? +",
          a: "Yes — $0 down and monthly payment options are available, including Ygrene PACE financing for energy-efficient upgrades.",
        },
      ],
      hero: {
        copy: [
          "Services · Most popular",
          "Full roof replacement, done right — start to spotless finish.",
          "The most common project we run in Miami-Dade: complete tear-off and replacement of aging tile or shingle roofs, with permits and cleanup fully handled.",
          "Free Inspection",
          "(786) 372-4754",
          "Free inspection · Licensed & insured · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Tile & Shingle Replacement",
          "service-residential",
          "Why homeowners choose it",
          "Tile & Shingle Replacement",
          "in Miami-Dade & Broward",
          "A 20–25 year old roof in South Florida is living on borrowed time. Hurricane season does not negotiate with brittle shingles or slipped tiles — and neither do insurance carriers, who increasingly non-renew homes with worn roofs.",
          "We replace concrete and clay tile systems and install GAF architectural shingle systems, always with full tear-off (never layovers), fresh underlayment, new flashing and full debris removal. Permit and city inspection included in every job.",
          "Questions? Call",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["What’s included in every tile & shingle replacement job"],
        items1: [
          {
            copy: ["Permit handled", "We pull the permit and schedule the city inspection for you"],
          },
          {
            copy: [
              "Full tear-off only",
              "No layovers — we inspect the deck before anything goes back on",
            ],
          },
          {
            copy: [
              "GAF-certified installer",
              "Certified Roofing Contractor status unlocks stronger warranties",
            ],
          },
          { copy: ["Full cleanup", "Magnet sweep for nails, tarped landscaping, spotless yard"] },
        ],
      },
      pricing: {
        copy: [
          "What it costs",
          "What an architectural shingle roof or a tile roof costs in Miami-Dade.",
          "Tear-off, materials, labor, permit and cleanup are all in these numbers. Your exact price comes after a free inspection — written, itemized, and yours to keep.",
          "Get my exact price",
          "or call",
          "(786) 372-4754",
          "Roof size",
          "—",
          "Typical installed cost",
          "Roof size",
          "Typical installed cost",
          "Includes tear-off · materials · labor · permit · cleanup",
          "Includes tear-off · materials · labor · permit · cleanup",
          "Ballpark for a typical Miami-Dade home. Your roof’s shape, the number of layers and the deck condition move the final number — the written quote is the real price.",
        ],
        items1: [
          { copy: ["Architectural shingle", "6 – 9", "per sq ft"] },
          { copy: ["Concrete or clay tile", "12 – 20", "per sq ft"] },
        ],
        items2: [
          {
            copy: ["Architectural shingle", "Manufacturer warranty"],
            items3: [
              { copy: ["$9,000 – $13,500", "1,500", "sq ft"] },
              { copy: ["$12,000 – $18,000", "2,000", "sq ft"] },
              { copy: ["$15,000 – $22,500", "2,500", "sq ft"] },
            ],
          },
          {
            copy: ["Concrete or clay tile", "Manufacturer warranty"],
            items3: [
              { copy: ["$18,000 – $30,000", "1,500", "sq ft"] },
              { copy: ["$24,000 – $40,000", "2,000", "sq ft"] },
              { copy: ["$30,000 – $50,000", "2,500", "sq ft"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Architectural shingle",
              "Manufacturer warranty",
              "1,500",
              "sq ft",
              "$9,000 – $13,500",
              "2,000",
              "sq ft",
              "$12,000 – $18,000",
              "2,500",
              "sq ft",
              "$15,000 – $22,500",
            ],
          },
          {
            copy: [
              "Concrete or clay tile",
              "Manufacturer warranty",
              "1,500",
              "sq ft",
              "$18,000 – $30,000",
              "2,000",
              "sq ft",
              "$24,000 – $40,000",
              "2,500",
              "sq ft",
              "$30,000 – $50,000",
            ],
          },
        ],
        items5: [
          { copy: ["Licensed CCC1331979"] },
          { copy: ["4.9★ · 60+ Google reviews"] },
          { copy: ["Free inspection"] },
        ],
      },
      proof: {
        copy: [
          "Proof",
          "Tile & Shingle Replacement jobs we finished.",
          "Real roofs, real areas, photographed on site. Open one to see the system we installed and how far it is from our shop.",
          "/projects/",
          "See every project",
        ],
        items1: [
          {
            copy: [
              "/projects/architectural-shingle-replacement/",
              "Completed architectural shingle replacement project",
              "project-shingle-aerial",
              "Tile & Shingle",
              "Kendall, FL",
              "12.5 mi from our shop",
              "Architectural Shingle Replacement",
              "Architectural shingle roof on a single-story home in Kendall, with clean hip lines and ridge ventilation.",
              "See this project",
            ],
          },
        ],
      },
      process: {
        copy: ["How it works"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Free on-roof inspection",
              "We document age, condition and any storm damage for your records.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Written, itemized quote",
              "Materials, labor, permit and timeline — one transparent number.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Tear-off & installation",
              "Deck repaired as needed, new underlayment, then your new roof.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Inspection & handover",
              "City sign-off, warranty paperwork and a yard cleaner than we found it.",
            ],
          },
        ],
      },
      faq: { copy: ["Common Questions", "Tile & Shingle Replacement: your questions, answered."] },
      more: {
        copy: ["More services"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Long-lasting",
              "Metal Roofing",
              "Standing seam metal built for South Florida wind and sun.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Business",
              "Flat & Commercial",
              "Flat roof repair, replacement and coatings for homes, businesses and HOAs.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Leaks",
              "Emergency Leak Repair",
              "Storm tarping and permanent repairs when water is getting into your home or building.",
            ],
          },
        ],
      },
    },
    es: {
      meta: {
        title: "Reemplazo de Tejas y Shingle en Miami | Centurion Roofing",
        description:
          "Reemplazo completo de techos en Miami: teja de barro y asfáltica, permisos y limpieza. Certificados por GAF. Cotización: (786) 372-4754.",
        ogTitle: "Reemplazo de Tejas y Shingle en Miami | Centurion Roofing",
        ogDescription:
          "Reemplazo completo de techos en Miami: teja de barro y asfáltica, permisos y limpieza. Certificados por GAF. Cotización: (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "¿Qué es mejor en Miami, teja de barro o shingle? +",
          a: "La teja de barro dura más y encaja con la estética del sur de Florida, pero cuesta más y requiere una estructura capaz de soportar el peso. El shingle arquitectónico es más rápido y más barato de instalar. Le mostraremos ambas cifras durante la inspección.",
        },
        {
          q: "¿Me pueden ayudar con mi reclamación de seguro? +",
          a: "Sí, los techos dañados por tormentas suelen estar cubiertos. Consulte nuestra página de reclamaciones de seguro: documentamos el daño y podemos estar en el techo durante la visita de su ajustador.",
        },
        {
          q: "¿Cuánto tarda un reemplazo? +",
          a: "Techos asfálticos: de 2 a 4 días. Teja de barro: de 5 a 8 días, incluyendo la membrana y la reinstalación.",
        },
        {
          q: "¿Ofrecen financiamiento? +",
          a: "Sí, hay opciones de $0 de cuota inicial y pagos mensuales, incluido el financiamiento Ygrene PACE para mejoras energéticamente eficientes.",
        },
      ],
      hero: {
        copy: [
          "Servicios · Más solicitado",
          "Reemplazo completo de techo, bien hecho, del inicio al acabado limpio.",
          "El proyecto más común que realizamos en Miami-Dade: remoción total y reemplazo de techos de teja de barro o shingle envejecidos, con permisos y limpieza totalmente gestionados.",
          "Inspección gratuita",
          "(786) 372-4754",
          "Inspección gratuita · Licencia y seguro · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Reemplazo de teja de barro y shingle",
          "service-residential",
          "Por qué nos eligen",
          "Reemplazo de teja de barro y shingle",
          "en Miami-Dade y Broward",
          "Un techo de 20 a 25 años en el sur de Florida vive de prestado. La temporada de huracanes no negocia con tejas quebradizas ni tejas desprendidas, y tampoco lo hacen las aseguradoras, que cada vez más se niegan a renovar las pólizas de viviendas con techos deteriorados.",
          "Reemplazamos sistemas de teja de concreto y de barro, e instalamos sistemas de shingle arquitectónico de GAF, siempre con remoción completa, nunca con una cubierta encima, membrana nueva, tapajuntas nuevas y eliminación total de escombros. El permiso y la inspección municipal están incluidos en cada trabajo.",
          "¿Preguntas? Llame al",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["Qué incluye cada trabajo de reemplazo de teja de barro y shingle"],
        items1: [
          {
            copy: [
              "Permiso gestionado",
              "Tramitamos el permiso y coordinamos la inspección municipal por usted",
            ],
          },
          {
            copy: [
              "Solo remoción completa",
              "Sin cubiertas encima; inspeccionamos la base antes de volver a colocar nada",
            ],
          },
          {
            copy: [
              "Instalador certificado por GAF",
              "La certificación de contratista de techos da acceso a garantías más amplias",
            ],
          },
          {
            copy: [
              "Limpieza completa",
              "Barrido magnético de clavos, jardín protegido con lonas y un patio impecable",
            ],
          },
        ],
      },
      pricing: {
        copy: [
          "Cuánto cuesta",
          "Cuánto cuesta un techo de shingle arquitectónico o un techo de teja en Miami-Dade.",
          "La remoción, los materiales, la mano de obra, el permiso y la limpieza están incluidos en estas cifras. Su precio exacto llega después de una inspección gratis — por escrito, desglosado, y suyo para quedarse.",
          "Quiero mi precio exacto",
          "o llame al",
          "(786) 372-4754",
          "Tamaño del techo",
          "—",
          "Costo típico instalado",
          "Tamaño del techo",
          "Costo típico instalado",
          "Incluye remoción · materiales · mano de obra · permiso · limpieza",
          "Incluye remoción · materiales · mano de obra · permiso · limpieza",
          "Cifra aproximada para una casa típica de Miami-Dade. La forma del techo, las capas y el estado del deck cambian el número final — la cotización escrita es el precio real.",
        ],
        items1: [
          { copy: ["Shingle arquitectónico", "6 – 9", "por pie²"] },
          { copy: ["Teja de hormigón o barro", "12 – 20", "por pie²"] },
        ],
        items2: [
          {
            copy: ["Shingle arquitectónico", "Garantía del fabricante"],
            items3: [
              { copy: ["$9,000 – $13,500", "1,500", "pies²"] },
              { copy: ["$12,000 – $18,000", "2,000", "pies²"] },
              { copy: ["$15,000 – $22,500", "2,500", "pies²"] },
            ],
          },
          {
            copy: ["Teja de hormigón o barro", "Garantía del fabricante"],
            items3: [
              { copy: ["$18,000 – $30,000", "1,500", "pies²"] },
              { copy: ["$24,000 – $40,000", "2,000", "pies²"] },
              { copy: ["$30,000 – $50,000", "2,500", "pies²"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Shingle arquitectónico",
              "Garantía del fabricante",
              "1,500",
              "pies²",
              "$9,000 – $13,500",
              "2,000",
              "pies²",
              "$12,000 – $18,000",
              "2,500",
              "pies²",
              "$15,000 – $22,500",
            ],
          },
          {
            copy: [
              "Teja de hormigón o barro",
              "Garantía del fabricante",
              "1,500",
              "pies²",
              "$18,000 – $30,000",
              "2,000",
              "pies²",
              "$24,000 – $40,000",
              "2,500",
              "pies²",
              "$30,000 – $50,000",
            ],
          },
        ],
        items5: [
          { copy: ["Licenciado CCC1331979"] },
          { copy: ["4.9★ · 60+ reseñas de Google"] },
          { copy: ["Inspección gratis"] },
        ],
      },
      proof: {
        copy: [
          "Prueba",
          "Trabajos de Reemplazo de teja de barro y shingle que terminamos.",
          "Techos reales, áreas reales, fotografiados en la obra. Abra uno para ver el sistema que instalamos y a qué distancia está de nuestra oficina.",
          "/projects/",
          "Ver todos los proyectos",
        ],
        items1: [
          {
            copy: [
              "/projects/architectural-shingle-replacement/",
              "Proyecto terminado: reemplazo con shingles arquitectónicos",
              "project-shingle-aerial",
              "Teja y shingle",
              "Kendall, FL",
              "12.5 mi de nuestra oficina",
              "Reemplazo con shingles arquitectónicos",
              "Techo de shingles arquitectónicos en una casa de un piso en Kendall, con líneas limpias a cuatro aguas y ventilación en la cumbrera.",
              "Ver este proyecto",
            ],
          },
        ],
      },
      process: {
        copy: ["Cómo funciona"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Inspección gratuita en el techo",
              "Documentamos la antigüedad, el estado y cualquier daño de tormenta para sus registros.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Cotización escrita y desglosada",
              "Materiales, mano de obra, permiso y cronograma: una sola cifra transparente.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Remoción e instalación",
              "Tablero reparado según sea necesario, membrana nueva y luego su nuevo techo.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Inspección y entrega",
              "Aprobación municipal, documentación de garantía y el patio más limpio de como lo encontramos.",
            ],
          },
        ],
      },
      faq: {
        copy: [
          "Preguntas frecuentes",
          "Reemplazo de teja de barro y shingle: sus preguntas, respondidas.",
        ],
      },
      more: {
        copy: ["Más servicios"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Larga duración",
              "Techos de metal",
              "Metal de junta alzada, construido para el viento y el sol del sur de Florida.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Negocios",
              "Techos planos y comerciales",
              "Reparación, reemplazo y recubrimientos de techos planos para viviendas, negocios y HOAs.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Filtraciones",
              "Reparación de goteras",
              "Protección de emergencia con lona y reparaciones permanentes cuando el agua entra en su casa o edificio.",
            ],
          },
        ],
      },
    },
    fr: {
      meta: {
        title: "Remplacement Tuiles et Bardeaux à Miami | Centurion Roofing",
        description:
          "Remplacement de toiture à Miami : dépose de tuiles et de bardeaux, permis, nettoyage. Certifié GAF. Devis écrit gratuit : (786) 372-4754.",
        ogTitle: "Remplacement Tuiles et Bardeaux à Miami | Centurion Roofing",
        ogDescription:
          "Remplacement de toiture à Miami : dépose de tuiles et de bardeaux, permis, nettoyage. Certifié GAF. Devis écrit gratuit : (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "Tuiles ou bardeaux — quel est le meilleur choix à Miami ? +",
          a: "Les tuiles durent plus longtemps et correspondent au style du sud de la Florida, mais elles coûtent plus cher et exigent une structure capable d’en supporter le poids. Les bardeaux architecturaux sont plus rapides et moins chers à poser. Nous vous présentons les deux chiffres lors de l’inspection.",
        },
        {
          q: "Pouvez-vous m’aider avec ma réclamation auprès de l’assurance ? +",
          a: "Oui — les toitures endommagées par la tempête sont souvent couvertes. Consultez notre page sur les réclamations d’assurance ; nous documentons les dégâts et pouvons être présents sur le toit pendant la visite de votre expert.",
        },
        {
          q: "Combien de temps dure un remplacement ? +",
          a: "Toiture en bardeaux : 2 à 4 jours. Tuiles : 5 à 8 jours, écran sous-toiture et repose compris.",
        },
        {
          q: "Proposez-vous un financement ? +",
          a: "Oui — des options à 0 $ d’acompte et de paiement mensuel sont disponibles, y compris le financement PACE Ygrene pour les améliorations économes en énergie.",
        },
      ],
      hero: {
        copy: [
          "Services · Le plus courant",
          "Un remplacement de toiture complet, du début à la finition impeccable.",
          "Le projet le plus courant dans le Miami-Dade : dépose complète et remplacement de toitures de tuiles ou de bardeaux vieillissantes, permis et nettoyage entièrement pris en charge.",
          "Inspection gratuite",
          "(786) 372-4754",
          "Inspection gratuite · Agréé et assuré · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Remplacement de tuiles et bardeaux",
          "service-residential",
          "Pourquoi nous choisir",
          "Remplacement de tuiles et bardeaux",
          "à Miami-Dade et Broward",
          "Une toiture de 20 à 25 ans dans le sud de la Florida ne tient plus que par miracle. La saison des ouragans ne négocie ni avec les bardeaux cassants ni avec les tuiles déplacées — et les compagnies d’assurance non plus, qui renoncent de plus en plus à couvrir les maisons dont le toit est usé.",
          "Nous remplaçons les systèmes de tuiles en béton et en terre cuite et installons les systèmes de bardeaux architecturaux GAF, toujours en dépose complète (jamais de superposition), avec écran sous-toiture neuf, nouveaux habillages et évacuation totale des gravats. Permis et inspection municipale inclus dans chaque chantier.",
          "Une question ? Appelez le",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["Ce que comprend chaque chantier de remplacement de tuiles et bardeaux"],
        items1: [
          {
            copy: [
              "Permis pris en charge",
              "Nous obtenons le permis et fixons l’inspection de la ville à votre place",
            ],
          },
          {
            copy: [
              "Dépose complète uniquement",
              "Pas de superposition — nous inspectons le support avant toute repose",
            ],
          },
          {
            copy: [
              "Installateur certifié GAF",
              "Le statut de Certified Roofing Contractor ouvre droit à des garanties renforcées",
            ],
          },
          {
            copy: [
              "Nettoyage complet",
              "Ramassage magnétique des clous, bâches sur la végétation, jardin impeccable",
            ],
          },
        ],
      },
      pricing: {
        copy: [
          "Combien ça coûte",
          "Combien coûte un toit en bardeaux architecturaux ou un toit en tuiles à Miami-Dade ?",
          "La dépose, les matériaux, la main-d’œuvre, le permis et le nettoyage sont inclus dans ces chiffres. Votre prix exact arrive après une inspection gratuite — écrit, détaillé, et à vous.",
          "Obtenir mon prix exact",
          "ou appelez",
          "(786) 372-4754",
          "Surface du toit",
          "—",
          "Coût typique installé",
          "Surface du toit",
          "Coût typique installé",
          "Comprend dépose · matériaux · main-d’œuvre · permis · nettoyage",
          "Comprend dépose · matériaux · main-d’œuvre · permis · nettoyage",
          "Estimation pour une maison typique de Miami-Dade. La forme du toit, le nombre de couches et l’état du support changent le chiffre final — le devis écrit est le vrai prix.",
        ],
        items1: [
          { copy: ["Bardeau architectural", "6 – 9", "le pi²"] },
          { copy: ["Tuile béton ou terre cuite", "12 – 20", "le pi²"] },
        ],
        items2: [
          {
            copy: ["Bardeau architectural", "Garantie fabricant"],
            items3: [
              { copy: ["9 000 $US – 13 500 $US", "1 500", "pi²"] },
              { copy: ["12 000 $US – 18 000 $US", "2 000", "pi²"] },
              { copy: ["15 000 $US – 22 500 $US", "2 500", "pi²"] },
            ],
          },
          {
            copy: ["Tuile béton ou terre cuite", "Garantie fabricant"],
            items3: [
              { copy: ["18 000 $US – 30 000 $US", "1 500", "pi²"] },
              { copy: ["24 000 $US – 40 000 $US", "2 000", "pi²"] },
              { copy: ["30 000 $US – 50 000 $US", "2 500", "pi²"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Bardeau architectural",
              "Garantie fabricant",
              "1 500",
              "pi²",
              "9 000 $US – 13 500 $US",
              "2 000",
              "pi²",
              "12 000 $US – 18 000 $US",
              "2 500",
              "pi²",
              "15 000 $US – 22 500 $US",
            ],
          },
          {
            copy: [
              "Tuile béton ou terre cuite",
              "Garantie fabricant",
              "1 500",
              "pi²",
              "18 000 $US – 30 000 $US",
              "2 000",
              "pi²",
              "24 000 $US – 40 000 $US",
              "2 500",
              "pi²",
              "30 000 $US – 50 000 $US",
            ],
          },
        ],
        items5: [
          { copy: ["Licencié CCC1331979"] },
          { copy: ["4,9★ · 60+ avis Google"] },
          { copy: ["Inspection gratuite"] },
        ],
      },
      proof: {
        copy: [
          "Preuve",
          "Chantiers Remplacement de tuiles et bardeaux que nous avons terminés.",
          "Des toits réels, de vraies zones, photographiés sur le chantier. Ouvrez-en un pour voir le système posé et la distance depuis notre bureau.",
          "/projects/",
          "Voir toutes les réalisations",
        ],
        items1: [
          {
            copy: [
              "/projects/architectural-shingle-replacement/",
              "Chantier terminé : remplacement par des bardeaux architecturaux",
              "project-shingle-aerial",
              "Tuile et bardeau",
              "Kendall, FL",
              "12.5 mi de notre bureau",
              "Remplacement par des bardeaux architecturaux",
              "Toit en bardeaux architecturaux sur une maison de plain-pied à Kendall, aux lignes nettes à quatre pans, avec ventilation de faîtage.",
              "Voir cette réalisation",
            ],
          },
        ],
      },
      process: {
        copy: ["Comment ça se passe"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Inspection gratuite sur le toit",
              "Nous documentons l’âge, l’état et les éventuels dégâts de tempête pour vos dossiers.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Devis écrit et détaillé",
              "Matériaux, main-d’œuvre, permis et calendrier — un montant transparent.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Dépose et installation",
              "Support réparé si nécessaire, nouvel écran sous-toiture, puis votre nouveau toit.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Inspection et remise",
              "Validation de la ville, documents de garantie et un jardin plus propre qu’à notre arrivée.",
            ],
          },
        ],
      },
      faq: {
        copy: [
          "Questions fréquentes",
          "Remplacement de tuiles et bardeaux : vos questions, nos réponses.",
        ],
      },
      more: {
        copy: ["Autres services"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Longue durée de vie",
              "Toiture métallique",
              "Métal à joint debout conçu pour le vent et le soleil du sud de la Florida.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Professionnels",
              "Toits plats et commerciaux",
              "Réparation, remplacement et revêtements de toits plats pour logements, entreprises et syndics de copropriété.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Fuites",
              "Réparation de fuites d’urgence",
              "Bâchage d’urgence et réparations définitives quand l’eau s’infiltre dans votre maison ou votre bâtiment.",
            ],
          },
        ],
      },
    },
  },
  "flat-commercial": {
    en: {
      meta: {
        title: "Flat & Commercial Roofing Miami | Centurion Roofing",
        description:
          "Flat roof repair, replacement and coatings in Miami-Dade & Broward for homes, businesses and HOAs. Licensed & insured. Free inspection: (786) 372-4754.",
        ogTitle: "Flat & Commercial Roofing Miami | Centurion Roofing",
        ogDescription:
          "Flat roof repair, replacement and coatings in Miami-Dade & Broward for homes, businesses and HOAs. Licensed & insured. Free inspection: (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "My flat roof leaks every rain — repair or replace? +",
          a: "If the membrane is past about 60% of its life or leaks come from multiple areas, coating or replacement usually beats chasing repairs. Our inspection gives you an honest written answer either way.",
        },
        {
          q: "Do you work with property managers and HOAs? +",
          a: "Yes — we handle certificates of insurance, W-9s, board approvals and phased scheduling for occupied buildings regularly.",
        },
        {
          q: "What flat systems do you install? +",
          a: "Torch-down modified bitumen, TPO/PVC single-ply, and liquid-applied coating restoration systems from Polyglass and Firestone.",
        },
      ],
      hero: {
        copy: [
          "Services · Business",
          "Flat roofing for homes, businesses and HOAs.",
          "From single-ply membranes to torch-down systems and reflective coatings — flat roofing is half our workload, and we treat a small office exactly like a high-rise.",
          "Free Inspection",
          "(786) 372-4754",
          "Free inspection · Licensed & insured · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Flat & Commercial",
          "service-commercial",
          "Why homeowners choose it",
          "Flat & Commercial",
          "in Miami-Dade & Broward",
          "Flat and low-slope roofs demand a different skill set than pitched residential work — drainage design, seam welding, penetration flashing and coating systems all have to be right, or the leaks never stop.",
          "We install and restore flat systems across Miami-Dade and Broward: residential flat additions, office and retail buildings, warehouses and HOA common structures. Polyglass and Firestone systems, reflective coating programs and preventive maintenance plans.",
          "Questions? Call",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["What’s included in every flat & commercial job"],
        items1: [
          {
            copy: [
              "Flat roof coatings",
              "Reflective restoration systems that extend life and cut cooling load",
            ],
          },
          { copy: ["Free inspection", "Infrared and visual leak assessment included"] },
          {
            copy: [
              "HOA & commercial ready",
              "Certificates of insurance, W-9s and documentation handled",
            ],
          },
          { copy: ["Minimal downtime", "Phased work plans that keep your business operating"] },
        ],
      },
      pricing: {
        copy: [
          "What it costs",
          "What a flat or low-slope roof costs in Miami-Dade.",
          "Tear-off, materials, labor, permit and cleanup are all in these numbers. Your exact price comes after a free inspection — written, itemized, and yours to keep.",
          "Get my exact price",
          "or call",
          "(786) 372-4754",
          "Roof size",
          "—",
          "Typical installed cost",
          "Roof size",
          "Typical installed cost",
          "Includes tear-off · materials · labor · permit · cleanup",
          "Includes tear-off · materials · labor · permit · cleanup",
          "Ballpark for a typical Miami-Dade home. Your roof’s shape, the number of layers and the deck condition move the final number — the written quote is the real price.",
        ],
        items1: [{ copy: ["Flat / low slope", "8 – 15", "per sq ft"] }],
        items2: [
          {
            copy: ["Flat / low slope", "Workmanship warranty"],
            items3: [
              { copy: ["$12,000 – $22,500", "1,500", "sq ft"] },
              { copy: ["$16,000 – $30,000", "2,000", "sq ft"] },
              { copy: ["$20,000 – $37,500", "2,500", "sq ft"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Flat / low slope",
              "Workmanship warranty",
              "1,500",
              "sq ft",
              "$12,000 – $22,500",
              "2,000",
              "sq ft",
              "$16,000 – $30,000",
              "2,500",
              "sq ft",
              "$20,000 – $37,500",
            ],
          },
        ],
        items5: [
          { copy: ["Licensed CCC1331979"] },
          { copy: ["4.9★ · 60+ Google reviews"] },
          { copy: ["Free inspection"] },
        ],
      },
      proof: {
        copy: [
          "Proof",
          "Flat & Commercial jobs we finished.",
          "Real roofs, real areas, photographed on site. Open one to see the system we installed and how far it is from our shop.",
          "/projects/",
          "See every project",
        ],
        items1: [
          {
            copy: [
              "/projects/commercial-flat-roof-installation/",
              "Completed commercial flat roof installation project",
              "project-flat-crew",
              "Flat & Commercial",
              "Miami, FL",
              "4.8 mi from our shop",
              "Commercial Flat Roof Installation",
              "Our crew installing a multi-layer flat roof system on a commercial building in Miami.",
              "See this project",
            ],
          },
          {
            copy: [
              "/projects/hot-applied-flat-roof-installation/",
              "Completed hot-applied flat roof installation project",
              "project-torchdown",
              "Flat & Commercial",
              "Miami-Dade, FL",
              "15.5 mi from our shop",
              "Hot-Applied Flat Roof Installation",
              "Flat roof section being rolled out and sealed with hot asphalt by our crew.",
              "See this project",
            ],
          },
        ],
      },
      process: {
        copy: ["How it works"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Free inspection",
              "We locate every failure point — seams, penetrations, ponding areas.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Repair vs. replace analysis",
              "An honest written recommendation with both options priced.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Scheduled execution",
              "Crews, materials and crane time coordinated around your hours.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Warranty & maintenance",
              "Manufacturer warranty plus optional annual maintenance plan.",
            ],
          },
        ],
      },
      faq: { copy: ["Common Questions", "Flat & Commercial: your questions, answered."] },
      more: {
        copy: ["More services"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Long-lasting",
              "Metal Roofing",
              "Standing seam metal built for South Florida wind and sun.",
            ],
          },
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Most popular",
              "Tile & Shingle Replacement",
              "Full tear-off and installation of tile or shingle roofs, with permit and cleanup handled.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Leaks",
              "Emergency Leak Repair",
              "Storm tarping and permanent repairs when water is getting into your home or building.",
            ],
          },
        ],
      },
    },
    es: {
      meta: {
        title: "Techos Planos y Comerciales en Miami | Centurion Roofing",
        description:
          "Reparación, reemplazo y recubrimientos de techos planos en Miami-Dade y Broward. Licenciado y asegurado. Inspección: (786) 372-4754.",
        ogTitle: "Techos Planos y Comerciales en Miami | Centurion Roofing",
        ogDescription:
          "Reparación, reemplazo y recubrimientos de techos planos en Miami-Dade y Broward. Licenciado y asegurado. Inspección: (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "Mi techo plano se filtra con cada lluvia, ¿reparo o reemplazo? +",
          a: "Si la membrana ha pasado aproximadamente el 60% de su vida útil o las filtraciones provienen de varias áreas, el recubrimiento o el reemplazo suelen ser mejores que seguir persiguiendo reparaciones. Nuestra inspección le dará una respuesta escrita y honesta en cualquier caso.",
        },
        {
          q: "¿Trabajan con administradores de propiedades y HOAs? +",
          a: "Sí, gestionamos certificados de seguro, formularios W-9, aprobaciones de la junta.directiva y programación por fases en edificios ocupados de forma rutinaria.",
        },
        {
          q: "¿Qué sistemas planos instalan? +",
          a: "Betún modificado con soplete, TPO y PVC de una sola capa, y sistemas de restauración con recubrimiento líquido de Polyglass y Firestone.",
        },
      ],
      hero: {
        copy: [
          "Servicios · Negocios",
          "Techos planos para viviendas, negocios y HOAs.",
          "Desde membranas de una sola capa hasta sistemas con soplete y recubrimientos reflectantes: los techos planos son la mitad de nuestro trabajo, y tratamos una pequeña oficina exactamente como un rascacielos.",
          "Inspección gratuita",
          "(786) 372-4754",
          "Inspección gratuita · Licencia y seguro · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Techos planos y comerciales",
          "service-commercial",
          "Por qué nos eligen",
          "Techos planos y comerciales",
          "en Miami-Dade y Broward",
          "Los techos planos y de poca pendiente exigen un conjunto de habilidades distinto al trabajo residencial inclinado: diseño de drenaje, soldadura de juntas, tapajuntas de penetraciones y sistemas de recubrimiento deben quedar bien, o las filtraciones nunca terminan.",
          "Instalamos y restauramos sistemas planos en todo Miami-Dade y Broward: adiciones residenciales planas, edificios de oficinas y comercios, almacenes y estructuras comunes de HOAs. Sistemas Polyglass y Firestone, programas de recubrimiento reflectante y planes de mantenimiento preventivo.",
          "¿Preguntas? Llame al",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["Qué incluye cada trabajo de techos planos y comerciales"],
        items1: [
          {
            copy: [
              "Recubrimientos para techos planos",
              "Sistemas de restauración reflectantes que extienden la vida útil y reducen la carga de enfriamiento",
            ],
          },
          {
            copy: [
              "Inspección gratuita",
              "Incluye evaluación de filtraciones con infrarrojo y visual",
            ],
          },
          {
            copy: [
              "Listo para HOA y comercial",
              "Certificados de seguro, formularios W-9 y documentación gestionados",
            ],
          },
          {
            copy: [
              "Interrupción mínima",
              "Planes de trabajo por fases que mantienen su negocio operando",
            ],
          },
        ],
      },
      pricing: {
        copy: [
          "Cuánto cuesta",
          "Cuánto cuesta un techo plano o de poca pendiente en Miami-Dade.",
          "La remoción, los materiales, la mano de obra, el permiso y la limpieza están incluidos en estas cifras. Su precio exacto llega después de una inspección gratis — por escrito, desglosado, y suyo para quedarse.",
          "Quiero mi precio exacto",
          "o llame al",
          "(786) 372-4754",
          "Tamaño del techo",
          "—",
          "Costo típico instalado",
          "Tamaño del techo",
          "Costo típico instalado",
          "Incluye remoción · materiales · mano de obra · permiso · limpieza",
          "Incluye remoción · materiales · mano de obra · permiso · limpieza",
          "Cifra aproximada para una casa típica de Miami-Dade. La forma del techo, las capas y el estado del deck cambian el número final — la cotización escrita es el precio real.",
        ],
        items1: [{ copy: ["Plano / poca pendiente", "8 – 15", "por pie²"] }],
        items2: [
          {
            copy: ["Plano / poca pendiente", "Garantía de mano de obra"],
            items3: [
              { copy: ["$12,000 – $22,500", "1,500", "pies²"] },
              { copy: ["$16,000 – $30,000", "2,000", "pies²"] },
              { copy: ["$20,000 – $37,500", "2,500", "pies²"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Plano / poca pendiente",
              "Garantía de mano de obra",
              "1,500",
              "pies²",
              "$12,000 – $22,500",
              "2,000",
              "pies²",
              "$16,000 – $30,000",
              "2,500",
              "pies²",
              "$20,000 – $37,500",
            ],
          },
        ],
        items5: [
          { copy: ["Licenciado CCC1331979"] },
          { copy: ["4.9★ · 60+ reseñas de Google"] },
          { copy: ["Inspección gratis"] },
        ],
      },
      proof: {
        copy: [
          "Prueba",
          "Trabajos de Techos planos y comerciales que terminamos.",
          "Techos reales, áreas reales, fotografiados en la obra. Abra uno para ver el sistema que instalamos y a qué distancia está de nuestra oficina.",
          "/projects/",
          "Ver todos los proyectos",
        ],
        items1: [
          {
            copy: [
              "/projects/commercial-flat-roof-installation/",
              "Proyecto terminado: instalación de techo plano comercial",
              "project-flat-crew",
              "Planos y comerciales",
              "Miami, FL",
              "4.8 mi de nuestra oficina",
              "Instalación de techo plano comercial",
              "Nuestro equipo instalando un sistema de techo plano multicapa en un edificio comercial en Miami.",
              "Ver este proyecto",
            ],
          },
          {
            copy: [
              "/projects/hot-applied-flat-roof-installation/",
              "Proyecto terminado: instalación de techo plano con asfalto caliente",
              "project-torchdown",
              "Planos y comerciales",
              "Miami-Dade, FL",
              "15.5 mi de nuestra oficina",
              "Instalación de techo plano con asfalto caliente",
              "Sección de techo plano desenrollada y sellada con asfalto caliente por nuestro equipo.",
              "Ver este proyecto",
            ],
          },
        ],
      },
      process: {
        copy: ["Cómo funciona"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Inspección gratuita",
              "Localizamos cada punto de falla: juntas, penetraciones y zonas de encharcamiento.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Análisis: reparar o reemplazar",
              "Una recomendación escrita y honesta con ambas opciones presupuestadas.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Ejecución programada",
              "Equipos, materiales y tiempo de grúa coordinados según su horario.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Garantía y mantenimiento",
              "Garantía del fabricante y, si lo desea, plan de mantenimiento anual.",
            ],
          },
        ],
      },
      faq: {
        copy: ["Preguntas frecuentes", "Techos planos y comerciales: sus preguntas, respondidas."],
      },
      more: {
        copy: ["Más servicios"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Larga duración",
              "Techos de metal",
              "Metal de junta alzada, construido para el viento y el sol del sur de Florida.",
            ],
          },
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Más solicitado",
              "Reemplazo de teja de barro y shingle",
              "Remoción completa e instalación de techos de teja de barro o shingle, con permisos y limpieza incluidos.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Filtraciones",
              "Reparación de goteras",
              "Protección de emergencia con lona y reparaciones permanentes cuando el agua entra en su casa o edificio.",
            ],
          },
        ],
      },
    },
    fr: {
      meta: {
        title: "Toiture Plate et Commerciale à Miami | Centurion Roofing",
        description:
          "Réparation, remplacement et revêtements de toits plats à Miami-Dade et Broward. Agréé et assuré. Inspection gratuite : (786) 372-4754.",
        ogTitle: "Toiture Plate et Commerciale à Miami | Centurion Roofing",
        ogDescription:
          "Réparation, remplacement et revêtements de toits plats à Miami-Dade et Broward. Agréé et assuré. Inspection gratuite : (786) 372-4754.",
      },
      repairNotice: null,
      faqItems: [
        {
          q: "Mon toit plat fuit à chaque pluie — réparer ou remplacer ? +",
          a: "Si la membrane a dépassé environ 60 % de sa durée de vie ou que les fuites viennent de zones multiples, le revêtement ou le remplacement est généralement préférable à des réparations successives. Notre inspection vous donne une réponse écrite honnête dans les deux cas.",
        },
        {
          q: "Travaillez-vous avec les gestionnaires de biens et les syndics ? +",
          a: "Oui — nous gérons régulièrement les attestations d’assurance, les W-9, les autorisations du conseil et la planification par phases pour les immeubles occupés.",
        },
        {
          q: "Quels systèmes plats installez-vous ? +",
          a: "Bitume modifié au chalumeau, monocouches TPO/PVC et systèmes de restauration par revêtement liquide Polyglass et Firestone.",
        },
      ],
      hero: {
        copy: [
          "Services · Professionnels",
          "La toiture plate pour les logements, les entreprises et les syndics.",
          "Des membranes monocouches aux systèmes au chalumeau et aux revêtements réfléchissants — la toiture plate représente la moitié de notre activité, et nous traitons un petit bureau comme une tour de bureaux.",
          "Inspection gratuite",
          "(786) 372-4754",
          "Inspection gratuite · Agréé et assuré · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Toits plats et commerciaux",
          "service-commercial",
          "Pourquoi nous choisir",
          "Toits plats et commerciaux",
          "à Miami-Dade et Broward",
          "Les toits plats et à faible pente exigent un savoir-faire différent des travaux résidentiels en toiture inclinée — conception du drainage, soudure des recouvrements, habillage des percements et systèmes de revêtement doivent être parfaits, sinon les fuites ne cessent jamais.",
          "Nous posons et restaurons des systèmes plats dans tout le Miami-Dade et Broward : extensions plates résidentielles, immeubles de bureaux et de commerce, entrepôts et équipements communs de copropriété. Systèmes Polyglass et Firestone, programmes de revêtement réfléchissant et plans de maintenance préventive.",
          "Une question ? Appelez le",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["Ce que comprend chaque chantier de toits plats et commerciaux"],
        items1: [
          {
            copy: [
              "Revêtements de toits plats",
              "Des systèmes de restauration réfléchissants qui prolongent la durée de vie et réduisent la charge thermique",
            ],
          },
          {
            copy: [
              "Inspection gratuite",
              "Évaluation des fuites par infrarouge et visuelle incluse",
            ],
          },
          {
            copy: [
              "Prêt pour les syndics et le commercial",
              "Attestations d’assurance, formulaires W-9 et documentation gérés",
            ],
          },
          {
            copy: [
              "Interruption minimale",
              "Des plans de travaux phasés qui maintiennent votre activité en cours",
            ],
          },
        ],
      },
      pricing: {
        copy: [
          "Combien ça coûte",
          "Combien coûte un toit plat ou à faible pente à Miami-Dade ?",
          "La dépose, les matériaux, la main-d’œuvre, le permis et le nettoyage sont inclus dans ces chiffres. Votre prix exact arrive après une inspection gratuite — écrit, détaillé, et à vous.",
          "Obtenir mon prix exact",
          "ou appelez",
          "(786) 372-4754",
          "Surface du toit",
          "—",
          "Coût typique installé",
          "Surface du toit",
          "Coût typique installé",
          "Comprend dépose · matériaux · main-d’œuvre · permis · nettoyage",
          "Comprend dépose · matériaux · main-d’œuvre · permis · nettoyage",
          "Estimation pour une maison typique de Miami-Dade. La forme du toit, le nombre de couches et l’état du support changent le chiffre final — le devis écrit est le vrai prix.",
        ],
        items1: [{ copy: ["Plat / faible pente", "8 – 15", "le pi²"] }],
        items2: [
          {
            copy: ["Plat / faible pente", "Garantie main-d’œuvre"],
            items3: [
              { copy: ["12 000 $US – 22 500 $US", "1 500", "pi²"] },
              { copy: ["16 000 $US – 30 000 $US", "2 000", "pi²"] },
              { copy: ["20 000 $US – 37 500 $US", "2 500", "pi²"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Plat / faible pente",
              "Garantie main-d’œuvre",
              "1 500",
              "pi²",
              "12 000 $US – 22 500 $US",
              "2 000",
              "pi²",
              "16 000 $US – 30 000 $US",
              "2 500",
              "pi²",
              "20 000 $US – 37 500 $US",
            ],
          },
        ],
        items5: [
          { copy: ["Licencié CCC1331979"] },
          { copy: ["4,9★ · 60+ avis Google"] },
          { copy: ["Inspection gratuite"] },
        ],
      },
      proof: {
        copy: [
          "Preuve",
          "Chantiers Toits plats et commerciaux que nous avons terminés.",
          "Des toits réels, de vraies zones, photographiés sur le chantier. Ouvrez-en un pour voir le système posé et la distance depuis notre bureau.",
          "/projects/",
          "Voir toutes les réalisations",
        ],
        items1: [
          {
            copy: [
              "/projects/commercial-flat-roof-installation/",
              "Chantier terminé : installation d’un toit plat commercial",
              "project-flat-crew",
              "Toits plats et commerciaux",
              "Miami, FL",
              "4.8 mi de notre bureau",
              "Installation d’un toit plat commercial",
              "Notre équipe installe un système de toit plat multicouche sur un bâtiment commercial à Miami.",
              "Voir cette réalisation",
            ],
          },
          {
            copy: [
              "/projects/hot-applied-flat-roof-installation/",
              "Chantier terminé : toit plat posé à l’asphalte chaud",
              "project-torchdown",
              "Toits plats et commerciaux",
              "Miami-Dade, FL",
              "15.5 mi de notre bureau",
              "Toit plat posé à l’asphalte chaud",
              "Une section de toit plat déroulée et scellée à l’asphalte chaud par notre équipe.",
              "Voir cette réalisation",
            ],
          },
        ],
      },
      process: {
        copy: ["Comment ça se passe"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Inspection gratuite",
              "Nous localisons chaque point de défaillance — recouvrements, percements, zones de stagnation.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Analyse réparation ou remplacement",
              "Une recommandation écrite honnête, avec les deux options chiffrées.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Exécution planifiée",
              "Équipes, matériaux et grue coordonnés selon vos horaires.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Garantie et maintenance",
              "Garantie du fabricant et plan de maintenance annuel optionnel.",
            ],
          },
        ],
      },
      faq: {
        copy: ["Questions fréquentes", "Toits plats et commerciaux : vos questions, nos réponses."],
      },
      more: {
        copy: ["Autres services"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Longue durée de vie",
              "Toiture métallique",
              "Métal à joint debout conçu pour le vent et le soleil du sud de la Florida.",
            ],
          },
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Le plus courant",
              "Remplacement de tuiles et bardeaux",
              "Dépose complète et pose de toitures en tuiles ou en bardeaux, permis et nettoyage pris en charge.",
            ],
          },
          {
            copy: [
              "/services/emergency-leak-repair/",
              "Fuites",
              "Réparation de fuites d’urgence",
              "Bâchage d’urgence et réparations définitives quand l’eau s’infiltre dans votre maison ou votre bâtiment.",
            ],
          },
        ],
      },
    },
  },
  "emergency-leak-repair": {
    en: {
      meta: {
        title: "Roof Leak Repair & Storm Tarping Miami | Centurion Roofing",
        description:
          "Roof leaking? Leak repair and storm tarping across Miami-Dade & Broward. Free inspection and written quote. Call Centurion Roofing: (786) 372-4754.",
        ogTitle: "Roof Leak Repair & Storm Tarping Miami | Centurion Roofing",
        ogDescription:
          "Roof leaking? Leak repair and storm tarping across Miami-Dade & Broward. Free inspection and written quote. Call Centurion Roofing: (786) 372-4754.",
      },
      repairNotice:
        "If the damage is small, we repair it — a repair is quoted after the inspection, and most storm tarping happens the same day. The ranges below are what a full replacement runs.",
      faqItems: [
        {
          q: "My roof is leaking right now. Can you come today? +",
          a: "Call (786) 372-4754 during business hours — Monday to Friday 7:00 AM–5:00 PM, Saturday 7:00 AM–2:00 PM. We will schedule the earliest visit and can tarp the roof to stop further damage.",
        },
        {
          q: "Will insurance cover the leak? +",
          a: "Storm damage is commonly covered; wear and tear usually is not. Our free assessment documents the condition and any visible storm damage so you know more before you file.",
        },
        {
          q: "Do you charge for the tarping? +",
          a: "Tarp emergency stabilization is part of the free inspection. There is no charge for coming out and securing the roof.",
        },
        {
          q: "Can you match the repair to my existing roof? +",
          a: "Yes. We match the material, profile and colour of what is already there so the repair blends with the rest of the roof.",
        },
      ],
      hero: {
        copy: [
          "Services · Leaks",
          "Roof leaking? Call us and we’ll get it stopped.",
          "When water is coming through the ceiling, you need a crew, not a sales pitch. We stabilize the roof first, then schedule the permanent repair.",
          "Free Inspection",
          "(786) 372-4754",
          "Free inspection · Licensed & insured · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Emergency Leak Repair",
          "service-emergency",
          "Why homeowners choose it",
          "Emergency Leak Repair",
          "in Miami-Dade & Broward",
          "South Florida storms do not check the clock, and a leak can damage ceilings, drywall and floors quickly. The sooner the roof is covered, the smaller the repair bill.",
          "Call us during business hours (Monday to Friday 7:00 AM–5:00 PM, Saturday 7:00 AM–2:00 PM). We stabilize first — tarping, temporary sealing and water diversion — then return for the permanent repair once the weather allows. We photograph the damage for your records and your insurer.",
          "Questions? Call",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["What’s included in every emergency leak repair job"],
        items1: [
          { copy: ["Same-day response", "Emergency tarping to stop water before it spreads"] },
          { copy: ["Damage documented", "Photos and notes you can hand to your insurer"] },
          { copy: ["Permanent repair", "A real fix once the weather clears, not a patch"] },
          { copy: ["Insurance-friendly", "We can be present during your adjuster’s visit"] },
        ],
      },
      pricing: {
        copy: [
          "What it costs",
          "What a new roof costs in Miami-Dade.",
          "Tear-off, materials, labor, permit and cleanup are all in these numbers. Your exact price comes after a free inspection — written, itemized, and yours to keep.",
          "Get my exact price",
          "or call",
          "(786) 372-4754",
          "Roof size",
          "—",
          "Typical installed cost",
          "Roof size",
          "Typical installed cost",
          "Includes tear-off · materials · labor · permit · cleanup",
          "Includes tear-off · materials · labor · permit · cleanup",
          "Ballpark for a typical Miami-Dade home. Your roof’s shape, the number of layers and the deck condition move the final number — the written quote is the real price.",
        ],
        items1: [
          { copy: ["Architectural shingle", "6 – 9", "per sq ft"] },
          { copy: ["Concrete or clay tile", "12 – 20", "per sq ft"] },
          { copy: ["Standing seam metal", "13 – 22", "per sq ft"] },
          { copy: ["Flat / low slope", "8 – 15", "per sq ft"] },
        ],
        items2: [
          {
            copy: ["Architectural shingle", "Manufacturer warranty"],
            items3: [
              { copy: ["$9,000 – $13,500", "1,500", "sq ft"] },
              { copy: ["$12,000 – $18,000", "2,000", "sq ft"] },
              { copy: ["$15,000 – $22,500", "2,500", "sq ft"] },
            ],
          },
          {
            copy: ["Concrete or clay tile", "Manufacturer warranty"],
            items3: [
              { copy: ["$18,000 – $30,000", "1,500", "sq ft"] },
              { copy: ["$24,000 – $40,000", "2,000", "sq ft"] },
              { copy: ["$30,000 – $50,000", "2,500", "sq ft"] },
            ],
          },
          {
            copy: ["Standing seam metal", "Manufacturer warranty"],
            items3: [
              { copy: ["$19,500 – $33,000", "1,500", "sq ft"] },
              { copy: ["$26,000 – $44,000", "2,000", "sq ft"] },
              { copy: ["$32,500 – $55,000", "2,500", "sq ft"] },
            ],
          },
          {
            copy: ["Flat / low slope", "Workmanship warranty"],
            items3: [
              { copy: ["$12,000 – $22,500", "1,500", "sq ft"] },
              { copy: ["$16,000 – $30,000", "2,000", "sq ft"] },
              { copy: ["$20,000 – $37,500", "2,500", "sq ft"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Architectural shingle",
              "Manufacturer warranty",
              "1,500",
              "sq ft",
              "$9,000 – $13,500",
              "2,000",
              "sq ft",
              "$12,000 – $18,000",
              "2,500",
              "sq ft",
              "$15,000 – $22,500",
            ],
          },
          {
            copy: [
              "Concrete or clay tile",
              "Manufacturer warranty",
              "1,500",
              "sq ft",
              "$18,000 – $30,000",
              "2,000",
              "sq ft",
              "$24,000 – $40,000",
              "2,500",
              "sq ft",
              "$30,000 – $50,000",
            ],
          },
          {
            copy: [
              "Standing seam metal",
              "Manufacturer warranty",
              "1,500",
              "sq ft",
              "$19,500 – $33,000",
              "2,000",
              "sq ft",
              "$26,000 – $44,000",
              "2,500",
              "sq ft",
              "$32,500 – $55,000",
            ],
          },
          {
            copy: [
              "Flat / low slope",
              "Workmanship warranty",
              "1,500",
              "sq ft",
              "$12,000 – $22,500",
              "2,000",
              "sq ft",
              "$16,000 – $30,000",
              "2,500",
              "sq ft",
              "$20,000 – $37,500",
            ],
          },
        ],
        items5: [
          { copy: ["Licensed CCC1331979"] },
          { copy: ["4.9★ · 60+ Google reviews"] },
          { copy: ["Free inspection"] },
        ],
      },
      process: {
        copy: ["How it works"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Call us",
              "Storms do not keep office hours — call and we will plan the response.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Stabilize the roof",
              "Tarping, temporary sealing and water diversion.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Document the damage",
              "Photographs and notes for you and your insurer.",
            ],
          },
          { copy: ["04", "04", "Permanent repair", "Scheduled as soon as the weather allows."] },
        ],
      },
      faq: { copy: ["Common Questions", "Emergency Leak Repair: your questions, answered."] },
      more: {
        copy: ["More services"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Long-lasting",
              "Metal Roofing",
              "Standing seam metal built for South Florida wind and sun.",
            ],
          },
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Most popular",
              "Tile & Shingle Replacement",
              "Full tear-off and installation of tile or shingle roofs, with permit and cleanup handled.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Business",
              "Flat & Commercial",
              "Flat roof repair, replacement and coatings for homes, businesses and HOAs.",
            ],
          },
        ],
      },
    },
    es: {
      meta: {
        title: "Reparación de Goteras en Miami | Centurion Roofing",
        description:
          "¿Se le filtra el techo? Reparación de filtraciones y cubiertas en Miami-Dade y Broward. Inspección y cotización gratis. Llame: (786) 372-4754.",
        ogTitle: "Reparación de Goteras en Miami | Centurion Roofing",
        ogDescription:
          "¿Se le filtra el techo? Reparación de filtraciones y cubiertas en Miami-Dade y Broward. Inspección y cotización gratis. Llame: (786) 372-4754.",
      },
      repairNotice:
        "Si el daño es pequeño, lo reparamos — una reparación se cotiza tras la inspección, y la mayoría de los sellos de emergencia se hacen el mismo día. Las cifras de abajo son para un reemplazo completo.",
      faqItems: [
        {
          q: "Mi techo se está filtrando ahora mismo. ¿Pueden venir hoy? +",
          a: "Llame al (786) 372-4754 en horario de oficina, de lunes a viernes de 7:00 AM a 5:00 PM y los sábados de 7:00 AM a 2:00 PM. Programaremos la visita más temprana posible y podemos cubrir el techo para evitar más daños.",
        },
        {
          q: "¿El seguro cubrirá la filtración? +",
          a: "Los daños por tormenta suelen estar cubiertos; el desgaste por el tiempo, por lo general, no. Nuestra evaluación gratuita documenta el estado y cualquier daño de tormenta visible, para que usted sepa más antes de presentar la reclamación.",
        },
        {
          q: "¿Cobran por la cubierta de emergencia? +",
          a: "La estabilización de emergencia con cubierta forma parte de la inspección gratuita. No hay ningún cargo por salir a asegurar el techo.",
        },
        {
          q: "¿Pueden igualar la reparación con mi techo existente? +",
          a: "Sí. Igualamos el material, el perfil y el color de lo que ya existe, para que la reparación se funda con el resto del techo.",
        },
      ],
      hero: {
        copy: [
          "Servicios · Filtraciones",
          "¿Se le filtra el techo? Llámenos y lo detenemos.",
          "Cuando el agua atraviesa el techo, usted necesita un equipo de trabajo, no un discurso de ventas. Primero estabilizamos el techo y luego programamos la reparación permanente.",
          "Inspección gratuita",
          "(786) 372-4754",
          "Inspección gratuita · Licencia y seguro · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Reparación de goteras",
          "service-emergency",
          "Por qué nos eligen",
          "Reparación de goteras",
          "en Miami-Dade y Broward",
          "Las tormentas del sur de Florida no respetan el reloj, y una filtración puede dañar rápidamente los cielos rasos, el drywall y los pisos. Entre más pronto se cubra el techo, menor será la factura de la reparación.",
          "Llámenos en horario de oficina, de lunes a viernes de 7:00 AM a 5:00 PM y los sábados de 7:00 AM a 2:00 PM. Primero estabilizamos: cubrimos, sellamos de forma temporal y desvíamos el agua; luego regresamos para la reparación permanente cuando el clima lo permita. Fotografiamos el daño para sus registros y para su aseguradora.",
          "¿Preguntas? Llame al",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["Qué incluye cada trabajo de reparación de goteras"],
        items1: [
          {
            copy: [
              "Respuesta el mismo día",
              "Cubiertas de emergencia para detener el agua antes de que se extienda",
            ],
          },
          { copy: ["Daño documentado", "Fotos y notas que puede entregar a su aseguradora"] },
          {
            copy: [
              "Reparación permanente",
              "Una solución real cuando despeja el clima, no un parche",
            ],
          },
          {
            copy: [
              "Amigable con el seguro",
              "Podemos estar presentes durante la visita de su ajustador",
            ],
          },
        ],
      },
      pricing: {
        copy: [
          "Cuánto cuesta",
          "Cuánto cuesta un techo nuevo en Miami-Dade.",
          "La remoción, los materiales, la mano de obra, el permiso y la limpieza están incluidos en estas cifras. Su precio exacto llega después de una inspección gratis — por escrito, desglosado, y suyo para quedarse.",
          "Quiero mi precio exacto",
          "o llame al",
          "(786) 372-4754",
          "Tamaño del techo",
          "—",
          "Costo típico instalado",
          "Tamaño del techo",
          "Costo típico instalado",
          "Incluye remoción · materiales · mano de obra · permiso · limpieza",
          "Incluye remoción · materiales · mano de obra · permiso · limpieza",
          "Cifra aproximada para una casa típica de Miami-Dade. La forma del techo, las capas y el estado del deck cambian el número final — la cotización escrita es el precio real.",
        ],
        items1: [
          { copy: ["Shingle arquitectónico", "6 – 9", "por pie²"] },
          { copy: ["Teja de hormigón o barro", "12 – 20", "por pie²"] },
          { copy: ["Metal standing seam", "13 – 22", "por pie²"] },
          { copy: ["Plano / poca pendiente", "8 – 15", "por pie²"] },
        ],
        items2: [
          {
            copy: ["Shingle arquitectónico", "Garantía del fabricante"],
            items3: [
              { copy: ["$9,000 – $13,500", "1,500", "pies²"] },
              { copy: ["$12,000 – $18,000", "2,000", "pies²"] },
              { copy: ["$15,000 – $22,500", "2,500", "pies²"] },
            ],
          },
          {
            copy: ["Teja de hormigón o barro", "Garantía del fabricante"],
            items3: [
              { copy: ["$18,000 – $30,000", "1,500", "pies²"] },
              { copy: ["$24,000 – $40,000", "2,000", "pies²"] },
              { copy: ["$30,000 – $50,000", "2,500", "pies²"] },
            ],
          },
          {
            copy: ["Metal standing seam", "Garantía del fabricante"],
            items3: [
              { copy: ["$19,500 – $33,000", "1,500", "pies²"] },
              { copy: ["$26,000 – $44,000", "2,000", "pies²"] },
              { copy: ["$32,500 – $55,000", "2,500", "pies²"] },
            ],
          },
          {
            copy: ["Plano / poca pendiente", "Garantía de mano de obra"],
            items3: [
              { copy: ["$12,000 – $22,500", "1,500", "pies²"] },
              { copy: ["$16,000 – $30,000", "2,000", "pies²"] },
              { copy: ["$20,000 – $37,500", "2,500", "pies²"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Shingle arquitectónico",
              "Garantía del fabricante",
              "1,500",
              "pies²",
              "$9,000 – $13,500",
              "2,000",
              "pies²",
              "$12,000 – $18,000",
              "2,500",
              "pies²",
              "$15,000 – $22,500",
            ],
          },
          {
            copy: [
              "Teja de hormigón o barro",
              "Garantía del fabricante",
              "1,500",
              "pies²",
              "$18,000 – $30,000",
              "2,000",
              "pies²",
              "$24,000 – $40,000",
              "2,500",
              "pies²",
              "$30,000 – $50,000",
            ],
          },
          {
            copy: [
              "Metal standing seam",
              "Garantía del fabricante",
              "1,500",
              "pies²",
              "$19,500 – $33,000",
              "2,000",
              "pies²",
              "$26,000 – $44,000",
              "2,500",
              "pies²",
              "$32,500 – $55,000",
            ],
          },
          {
            copy: [
              "Plano / poca pendiente",
              "Garantía de mano de obra",
              "1,500",
              "pies²",
              "$12,000 – $22,500",
              "2,000",
              "pies²",
              "$16,000 – $30,000",
              "2,500",
              "pies²",
              "$20,000 – $37,500",
            ],
          },
        ],
        items5: [
          { copy: ["Licenciado CCC1331979"] },
          { copy: ["4.9★ · 60+ reseñas de Google"] },
          { copy: ["Inspección gratis"] },
        ],
      },
      process: {
        copy: ["Cómo funciona"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Llámenos",
              "Las tormentas no respetan el horario de oficina; llámenos y coordinaremos la respuesta.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Estabilizamos el techo",
              "Cubiertas, sellado temporal y desvío del agua.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Documentamos el daño",
              "Fotografías y notas para usted y para su aseguradora.",
            ],
          },
          {
            copy: [
              "04",
              "04",
              "Reparación permanente",
              "Programada en cuanto el clima lo permita.",
            ],
          },
        ],
      },
      faq: { copy: ["Preguntas frecuentes", "Reparación de goteras: sus preguntas, respondidas."] },
      more: {
        copy: ["Más servicios"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Larga duración",
              "Techos de metal",
              "Metal de junta alzada, construido para el viento y el sol del sur de Florida.",
            ],
          },
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Más solicitado",
              "Reemplazo de teja de barro y shingle",
              "Remoción completa e instalación de techos de teja de barro o shingle, con permisos y limpieza incluidos.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Negocios",
              "Techos planos y comerciales",
              "Reparación, reemplazo y recubrimientos de techos planos para viviendas, negocios y HOAs.",
            ],
          },
        ],
      },
    },
    fr: {
      meta: {
        title: "Réparation de Fuite à Miami | Centurion Roofing",
        description:
          "Votre toit fuit ? Réparation de fuites et bâchage d’urgence à Miami-Dade et Broward. Inspection gratuite et devis écrit : (786) 372-4754.",
        ogTitle: "Réparation de Fuite à Miami | Centurion Roofing",
        ogDescription:
          "Votre toit fuit ? Réparation de fuites et bâchage d’urgence à Miami-Dade et Broward. Inspection gratuite et devis écrit : (786) 372-4754.",
      },
      repairNotice:
        "Si les dégâts sont légers, nous réparons — une réparation est chiffrée après l’inspection, et la plupart des bâches d’urgence se font le jour même. Les fourchettes ci-dessous concernent un remplacement complet.",
      faqItems: [
        {
          q: "Mon toit fuit en ce moment. Pouvez-vous venir aujourd’hui ? +",
          a: "Appelez le (786) 372-4754 aux horaires d’ouverture — du lundi au vendredi de 7 h à 17 h et le samedi de 7 h à 14 h. Nous planifions la visite la plus rapide et pouvons bâcher la toiture pour limiter les dégâts.",
        },
        {
          q: "L’assurance couvrira-t-elle la fuite ? +",
          a: "Les dégâts de tempête sont généralement couverts ; l’usure ne l’est généralement pas. Notre évaluation gratuite documente l’état du toit et les dégâts de tempête visibles, afin que vous en sachiez plus avant de déclarer.",
        },
        {
          q: "Le bâchage est-il facturé ? +",
          a: "La stabilisation d’urgence par bâchage fait partie de l’inspection gratuite. Le déplacement pour sécuriser la toiture n’est pas facturé.",
        },
        {
          q: "Pouvez-vous assortir la réparation à ma toiture existante ? +",
          a: "Oui. Nous reprenons le matériau, le profil et la couleur de ce qui est déjà en place afin que la réparation s’accorde au reste du toit.",
        },
      ],
      hero: {
        copy: [
          "Services · Fuites",
          "Votre toit fuit ? Appelez-nous, nous interromprons les dégâts.",
          "Quand l’eau traverse le plafond, il vous faut une équipe, pas un argumentaire commercial. Nous stabilisons d’abord la toiture, puis planifions la réparation définitive.",
          "Inspection gratuite",
          "(786) 372-4754",
          "Inspection gratuite · Agréé et assuré · FL CCC1331979",
        ],
      },
      overview: {
        copy: [
          "Réparation de fuites d’urgence",
          "service-emergency",
          "Pourquoi nous choisir",
          "Réparation de fuites d’urgence",
          "à Miami-Dade et Broward",
          "Les tempêtes du sud de la Florida ne consultent pas l’horaire, et une fuite peut endommager rapidement plafonds, cloisons et sols. Plus la toiture est protégée tôt, plus la facture de réparation est légère.",
          "Appelez-nous aux horaires d’ouverture (du lundi au vendredi de 7 h à 17 h, le samedi de 7 h à 14 h). Nous stabilisons d’abord — bâchage, calfeutrement temporaire et déviation des eaux — puis nous revenons pour la réparation définitive dès que la météo le permet. Nous photographions les dégâts pour vos dossiers et votre assurance.",
          "Une question ? Appelez le",
          "(786) 372-4754",
        ],
      },
      benefits: {
        copy: ["Ce que comprend chaque chantier de réparation de fuites d’urgence"],
        items1: [
          {
            copy: [
              "Intervention le jour même",
              "Bâchage d’urgence pour arrêter l’eau avant qu’elle ne s’étende",
            ],
          },
          {
            copy: [
              "Dégâts documentés",
              "Photos et notes que vous pouvez remettre à votre assureur",
            ],
          },
          {
            copy: [
              "Réparation définitive",
              "Un vrai remède une fois le temps au calme, pas une rustine",
            ],
          },
          {
            copy: [
              "Compatible assurance",
              "Nous pouvons être présents lors de la visite de votre expert",
            ],
          },
        ],
      },
      pricing: {
        copy: [
          "Combien ça coûte",
          "Combien coûte un nouveau toit à Miami-Dade ?",
          "La dépose, les matériaux, la main-d’œuvre, le permis et le nettoyage sont inclus dans ces chiffres. Votre prix exact arrive après une inspection gratuite — écrit, détaillé, et à vous.",
          "Obtenir mon prix exact",
          "ou appelez",
          "(786) 372-4754",
          "Surface du toit",
          "—",
          "Coût typique installé",
          "Surface du toit",
          "Coût typique installé",
          "Comprend dépose · matériaux · main-d’œuvre · permis · nettoyage",
          "Comprend dépose · matériaux · main-d’œuvre · permis · nettoyage",
          "Estimation pour une maison typique de Miami-Dade. La forme du toit, le nombre de couches et l’état du support changent le chiffre final — le devis écrit est le vrai prix.",
        ],
        items1: [
          { copy: ["Bardeau architectural", "6 – 9", "le pi²"] },
          { copy: ["Tuile béton ou terre cuite", "12 – 20", "le pi²"] },
          { copy: ["Métal standing seam", "13 – 22", "le pi²"] },
          { copy: ["Plat / faible pente", "8 – 15", "le pi²"] },
        ],
        items2: [
          {
            copy: ["Bardeau architectural", "Garantie fabricant"],
            items3: [
              { copy: ["9 000 $US – 13 500 $US", "1 500", "pi²"] },
              { copy: ["12 000 $US – 18 000 $US", "2 000", "pi²"] },
              { copy: ["15 000 $US – 22 500 $US", "2 500", "pi²"] },
            ],
          },
          {
            copy: ["Tuile béton ou terre cuite", "Garantie fabricant"],
            items3: [
              { copy: ["18 000 $US – 30 000 $US", "1 500", "pi²"] },
              { copy: ["24 000 $US – 40 000 $US", "2 000", "pi²"] },
              { copy: ["30 000 $US – 50 000 $US", "2 500", "pi²"] },
            ],
          },
          {
            copy: ["Métal standing seam", "Garantie fabricant"],
            items3: [
              { copy: ["19 500 $US – 33 000 $US", "1 500", "pi²"] },
              { copy: ["26 000 $US – 44 000 $US", "2 000", "pi²"] },
              { copy: ["32 500 $US – 55 000 $US", "2 500", "pi²"] },
            ],
          },
          {
            copy: ["Plat / faible pente", "Garantie main-d’œuvre"],
            items3: [
              { copy: ["12 000 $US – 22 500 $US", "1 500", "pi²"] },
              { copy: ["16 000 $US – 30 000 $US", "2 000", "pi²"] },
              { copy: ["20 000 $US – 37 500 $US", "2 500", "pi²"] },
            ],
          },
        ],
        items4: [
          {
            copy: [
              "Bardeau architectural",
              "Garantie fabricant",
              "1 500",
              "pi²",
              "9 000 $US – 13 500 $US",
              "2 000",
              "pi²",
              "12 000 $US – 18 000 $US",
              "2 500",
              "pi²",
              "15 000 $US – 22 500 $US",
            ],
          },
          {
            copy: [
              "Tuile béton ou terre cuite",
              "Garantie fabricant",
              "1 500",
              "pi²",
              "18 000 $US – 30 000 $US",
              "2 000",
              "pi²",
              "24 000 $US – 40 000 $US",
              "2 500",
              "pi²",
              "30 000 $US – 50 000 $US",
            ],
          },
          {
            copy: [
              "Métal standing seam",
              "Garantie fabricant",
              "1 500",
              "pi²",
              "19 500 $US – 33 000 $US",
              "2 000",
              "pi²",
              "26 000 $US – 44 000 $US",
              "2 500",
              "pi²",
              "32 500 $US – 55 000 $US",
            ],
          },
          {
            copy: [
              "Plat / faible pente",
              "Garantie main-d’œuvre",
              "1 500",
              "pi²",
              "12 000 $US – 22 500 $US",
              "2 000",
              "pi²",
              "16 000 $US – 30 000 $US",
              "2 500",
              "pi²",
              "20 000 $US – 37 500 $US",
            ],
          },
        ],
        items5: [
          { copy: ["Licencié CCC1331979"] },
          { copy: ["4,9★ · 60+ avis Google"] },
          { copy: ["Inspection gratuite"] },
        ],
      },
      process: {
        copy: ["Comment ça se passe"],
        items1: [
          {
            copy: [
              "01",
              "01",
              "Appelez-nous",
              "Les tempêtes ne respectent pas les horaires de bureau — appelez et nous organiserons l’intervention.",
            ],
          },
          {
            copy: [
              "02",
              "02",
              "Stabiliser le toit",
              "Bâchage, calfeutrement temporaire et déviation des eaux.",
            ],
          },
          {
            copy: [
              "03",
              "03",
              "Documenter les dégâts",
              "Photographies et notes pour vous et votre assureur.",
            ],
          },
          { copy: ["04", "04", "Réparation définitive", "Planifiée dès que la météo le permet."] },
        ],
      },
      faq: {
        copy: [
          "Questions fréquentes",
          "Réparation de fuites d’urgence : vos questions, nos réponses.",
        ],
      },
      more: {
        copy: ["Autres services"],
        items1: [
          {
            copy: [
              "/services/metal-roofing/",
              "Longue durée de vie",
              "Toiture métallique",
              "Métal à joint debout conçu pour le vent et le soleil du sud de la Florida.",
            ],
          },
          {
            copy: [
              "/services/tile-shingle-replacement/",
              "Le plus courant",
              "Remplacement de tuiles et bardeaux",
              "Dépose complète et pose de toitures en tuiles ou en bardeaux, permis et nettoyage pris en charge.",
            ],
          },
          {
            copy: [
              "/services/flat-commercial/",
              "Professionnels",
              "Toits plats et commerciaux",
              "Réparation, remplacement et revêtements de toits plats pour logements, entreprises et syndics de copropriété.",
            ],
          },
        ],
      },
    },
  },
} satisfies Record<string, Record<Locale, ServiceData>>;
export type ServiceSlug = keyof typeof services;
export function isServiceSlug(slug: string): slug is ServiceSlug {
  return Object.prototype.hasOwnProperty.call(services, slug);
}
