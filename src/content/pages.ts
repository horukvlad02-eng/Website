import type { Locale } from "@/lib/i18n";

export type InfoPage = "why-centurion" | "insurance-claims" | "financing" | "privacy" | "terms";
export interface PageCopy {
  meta: { title: string; description: string; ogTitle?: string; ogDescription?: string };
  text: string[];
  attributes: string[];
  faq: { q: string; a: string }[];
  legal: { heading: string; paragraphs: string[] }[];
}
export const pages: Record<InfoPage, Record<Locale, PageCopy>> = {
  "why-centurion": {
    en: {
      meta: {
        title: "Why Centurion Roofing | Family-Owned in Miami",
        description:
          "Family-owned and operated, Florida State-certified (CCC1331979), GAF-certified and named one of Miami’s best roofers. Meet the team behind Centurion Roofing.",
        ogTitle: "Why Centurion Roofing | Family-Owned in Miami",
        ogDescription:
          "Family-owned and operated, Florida State-certified (CCC1331979), GAF-certified and named one of Miami’s best roofers. Meet the team behind Centurion Roofing.",
      },
      text: [
        "Family-owned & operated",
        "A father-and-son team that treats your roof like their own.",
        "As a family-owned and operated business, the father-and-son duo behind Centurion Roofing combines traditional expertise with modern roofing techniques to deliver exceptional results. We stay at the forefront of the industry by utilizing the latest technological advancements, ensuring our customers receive the most effective and durable roofing solutions — whether it’s a minor repair, a complete replacement, or a new installation.",
        "Being a Florida State-certified and fully insured roofing contractor, your safety and satisfaction are our top priorities. From the initial consultation to the final inspection, our team is with you every step of the way. When you choose us, you’re not just hiring a roofing contractor — you’re partnering with a family that values quality, trust, and lasting relationships.",
      ],
      attributes: ["Centurion Roofing crew installing a flat roof system"],
      faq: [],
      legal: [],
    },
    es: {
      meta: {
        title: "Por qué Centurion Roofing | Contratista familiar",
        description:
          "Empresa familiar con licencia estatal de Florida (CCC1331979), certificada por GAF y reconocida entre los mejores techadores de Miami. Conozca al equipo de Centurion Roofing.",
        ogTitle: "Por qué Centurion Roofing | Contratista familiar",
        ogDescription:
          "Empresa familiar con licencia estatal de Florida (CCC1331979), certificada por GAF y reconocida entre los mejores techadores de Miami. Conozca al equipo de Centurion Roofing.",
      },
      text: [
        "Empresa familiar",
        "Un equipo de padre e hijo que cuida su techo como si fuera el suyo.",
        "Somos una empresa familiar: padre e hijo combinan la experiencia de toda la vida con las técnicas más modernas para lograr resultados excepcionales. Nos mantenemos a la vanguardia con los últimos avances del sector, para que usted reciba la solución más eficaz y duradera, ya sea una reparación pequeña, un reemplazo completo o una instalación nueva.",
        "Como contratista con licencia estatal de Florida y seguro completo, su seguridad y su tranquilidad son nuestra prioridad. Desde la primera consulta hasta la inspección final, nuestro equipo lo acompaña en cada paso. Al elegirnos no solo contrata a un contratista: se une a una familia que valora la calidad, la confianza y las relaciones duraderas.",
      ],
      attributes: ["Equipo de Centurion Roofing instalando un sistema de techo plano"],
      faq: [],
      legal: [],
    },
    fr: {
      meta: {
        title: "Pourquoi Centurion Roofing | Couvreur familial à Miami",
        description:
          "Entreprise familiale agréée par l’État de Floride (CCC1331979), certifiée GAF et reconnue parmi les meilleurs couvreurs de Miami. Découvrez l’équipe de Centurion Roofing.",
        ogTitle: "Pourquoi Centurion Roofing | Couvreur familial à Miami",
        ogDescription:
          "Entreprise familiale agréée par l’État de Floride (CCC1331979), certifiée GAF et reconnue parmi les meilleurs couvreurs de Miami. Découvrez l’équipe de Centurion Roofing.",
      },
      text: [
        "Entreprise familiale",
        "Un père et son fils qui traitent votre toit comme le leur.",
        "Entreprise familiale, Centurion Roofing réunit un père et son fils qui allient savoir-faire traditionnel et techniques modernes pour des résultats exceptionnels. Nous suivons les dernières avancées du métier afin de vous proposer la solution la plus efficace et la plus durable, qu’il s’agisse d’une petite réparation, d’un remplacement complet ou d’une nouvelle installation.",
        "Couvreur agréé par l’État de Floride et entièrement assuré, nous plaçons votre sécurité et votre satisfaction avant tout. De la première consultation à l’inspection finale, notre équipe vous accompagne à chaque étape. En nous choisissant, vous ne faites pas qu’engager un couvreur : vous vous associez à une famille qui croit à la qualité, à la confiance et aux relations durables.",
      ],
      attributes: ["L’équipe de Centurion Roofing installe un système de toit plat"],
      faq: [],
      legal: [],
    },
  },
  "insurance-claims": {
    en: {
      meta: {
        title: "Roof Insurance Claims Help Miami | Centurion Roofing",
        description:
          "Storm damage? We document, meet your adjuster and help you navigate the roof insurance claim process in Miami-Dade & Broward. Free damage assessment: (786) 372-4754.",
        ogTitle: "Roof Insurance Claims Help Miami | Centurion Roofing",
        ogDescription:
          "Storm damage? We document, meet your adjuster and help you navigate the roof insurance claim process in Miami-Dade & Broward. Free damage assessment: (786) 372-4754.",
      },
      text: [
        "Insurance Claims",
        "Storm damage is stressful. Your claim shouldn’t be.",
        "Hurricanes, hail and wind storms damage thousands of South Florida roofs every year. We inspect, document and explain what we find, so you can talk to your insurance company with clear facts.",
        "Free Inspection",
        "(786) 372-4754",
        "Free inspection · Licensed & insured · FL CCC1331979",
        "How we handle your claim",
        "1. Call us first",
        "Stop the damage first. Call us and we will schedule emergency stabilization such as tarping, and we photograph the damage along the way.",
        "2. Free damage documentation",
        "We inspect the full roof, not just the obvious hole, and document wind, hail and water damage with measurements and photos you can share with your insurer.",
        "3. We can join the adjuster visit",
        "If you’d like, we can be on the roof during your adjuster’s visit to answer technical questions about the roof and materials. You and your insurer make the claim decisions.",
        "4. You get a code-compliant roof",
        "We handle the permitted repair or replacement to current Miami-Dade code and hand you the warranty paperwork. If a code-required item is missing from your insurer’s estimate, we give you a written estimate to share with them.",
        "The honest part: what we will and won’t do",
        "We are a licensed Florida roofing contractor, not a public adjuster. We can’t negotiate your claim or interpret your policy for you, and Florida law prohibits contractors from waiving or paying your deductible. What we can do is document the roof, write an itemized estimate and explain the work, so you and your adjuster are looking at the same facts.",
        "We don’t inflate claims, we don’t chase storms door-to-door, and we’ll tell you straight when damage looks smaller than your deductible. Our 4.9-star Google rating is built on that approach.",
        "Common Questions",
        "Insurance claim FAQs.",
      ],
      attributes: [],
      faq: [
        {
          q: "Will my homeowner’s insurance cover my roof?",
          a: "Storm damage from hurricanes, hail and wind is commonly covered under standard Florida policies — wear and tear usually is not. Our free assessment documents the roof’s condition and any visible storm damage, so you know more before you file.",
        },
        {
          q: "Should I file the claim myself or with your help?",
          a: "You always file, because it is your policy and your claim. We prepare photos and a written estimate, can be present at the adjuster visit if you ask, and explain the roofing work. If you want someone to negotiate for you, a licensed public adjuster or attorney can do that.",
        },
        {
          q: "What if my claim is denied or underpaid?",
          a: "Ask your insurer for a written explanation of the decision. We can share our inspection photos and estimate with you, your public adjuster or your attorney. The Florida Department of Financial Services also handles consumer insurance complaints.",
        },
        {
          q: "Can you waive or cover my deductible?",
          a: "No. Florida law prohibits contractors from waiving, absorbing or rebating an insurance deductible. Be careful with anyone who offers to.",
        },
        {
          q: "Do you charge for claim assistance?",
          a: "No. Damage documentation is part of our free inspection. We are not public adjusters and do not charge for claim negotiation.",
        },
      ],
      legal: [],
    },
    es: {
      meta: {
        title: "Reclamos de Seguro de Techos en Miami | Centurion Roofing",
        description:
          "¿Daño por tormenta? Documentamos, acompañamos a su ajustador y le ayudamos con su reclamación de seguro en Miami-Dade y Broward. Evaluación: (786) 372-4754.",
        ogTitle: "Reclamos de Seguro de Techos en Miami | Centurion Roofing",
        ogDescription:
          "¿Daño por tormenta? Documentamos, acompañamos a su ajustador y le ayudamos con su reclamación de seguro en Miami-Dade y Broward. Evaluación: (786) 372-4754.",
      },
      text: [
        "Reclamaciones de seguro",
        "El daño por tormenta es estresante. Su reclamación no debería serlo.",
        "Huracanes, granizo y tormentas de viento dañan miles de techos del sur de Florida cada año. Inspeccionamos, documentamos y explicamos lo que encontramos, para que usted converse con su aseguradora con datos claros.",
        "Inspección gratuita",
        "(786) 372-4754",
        "Inspección gratuita · Licencia y seguro · FL CCC1331979",
        "Cómo gestionamos su reclamación",
        "1. Llámenos primero",
        "Primero se detiene el daño. Llámenos y programaremos la estabilización de urgencia, como la cubierta, y fotografiamos el daño durante el proceso.",
        "2. Documentación gratuita del daño",
        "Inspeccionamos todo el techo, no solo el agujero evidente, y documentamos los daños de viento, granizo y agua con medidas y fotos que puede compartir con su aseguradora.",
        "3. Podemos acompañar al ajustador",
        "Si usted lo desea, podemos estar en el techo durante la visita de su ajustador para responder preguntas técnicas sobre el techo y los materiales. La decisión sobre la reclamación es de usted y de su aseguradora.",
        "4. Usted recibe un techo conforme al código",
        "Gestionamos la reparación o el reemplazo con permiso y conforme al código vigente de Miami-Dade y le entregamos la documentación de la garantía. Si en el presupuesto de su aseguradora falta un elemento exigido por el código, le entregamos un presupuesto escrito que puede compartir con ellos.",
        "La parte honesta: lo que sí hacemos y lo que no",
        "Somos contratistas de techos licenciados en Florida, no un ajustador público. No podemos negociar su reclamación ni interpretar su póliza, y la ley de Florida prohíbe que los contratistas renuncien ni paguen su deducible. Lo que sí podemos hacer es documentar el techo, redactar un presupuesto desglosado y explicar el trabajo, para que usted y su ajustador estén viendo los mismos datos.",
        "No inflamos reclamaciones, no vamos puerta a puerta tras las tormentas y le diremos con franqueza cuando el daño parezca menor que su deducible. Nuestra calificación de 4.9 estrellas en Google se apoya en ese criterio.",
        "Preguntas frecuentes",
        "Preguntas sobre reclamos de seguro.",
      ],
      attributes: [],
      faq: [
        {
          q: "¿Mi seguro de hogar cubrirá mi techo?",
          a: "El daño por tormenta de huracanes, granizo y viento suele estar cubierto en las pólizas estándar de Florida; el desgaste por el tiempo, por lo general, no. Nuestra evaluación gratuita documenta el estado del techo y cualquier daño de tormenta visible, para que usted sepa más antes de presentar la reclamación.",
        },
        {
          q: "¿Debo presentar la reclamación yo mismo o con su ayuda?",
          a: "Siempre la presenta usted, porque es su póliza y su reclamación. Nosotros preparamos fotos y un presupuesto escrito, podemos estar presentes en la visita del ajustador si usted lo pide y explicamos el trabajo del techo. Si desea que alguien negocie por usted, un ajustador público licenciado o un abogado puede hacerlo.",
        },
        {
          q: "¿Qué pasa si mi reclamación es denegada o pagada de menos?",
          a: "Pida a su aseguradora una explicación escrita de la decisión. Podemos compartir con usted, su ajustador público o su abogado las fotos de nuestra inspección y el presupuesto. El Florida Department of Financial Services también atiende las quejas de los consumidores sobre seguros.",
        },
        {
          q: "¿Pueden renunciar a mi deducible o cubrirlo?",
          a: "No. La ley de Florida prohíbe que los contratistas renuncien, absorban o reembolsen un deducible de seguro. Tenga cuidado con quien le ofrezca eso.",
        },
        {
          q: "¿Cobran por la asistencia con la reclamación?",
          a: "No. La documentación del daño forma parte de nuestra inspección gratuita. No somos ajustadores públicos y no cobramos por negociar reclamaciones.",
        },
      ],
      legal: [],
    },
    fr: {
      meta: {
        title: "Réclamations d’assurance toiture Miami | Centurion Roofing",
        description:
          "Dégâts de tempête ? Nous documentons et vous aidons à gérer votre réclamation d’assurance toiture à Miami-Dade et Broward. Évaluation gratuite : (786) 372-4754.",
        ogTitle: "Réclamations d’assurance toiture Miami | Centurion Roofing",
        ogDescription:
          "Dégâts de tempête ? Nous documentons et vous aidons à gérer votre réclamation d’assurance toiture à Miami-Dade et Broward. Évaluation gratuite : (786) 372-4754.",
      },
      text: [
        "Réclamations d’assurance",
        "Les dégâts de tempête sont stressants. Votre réclamation ne devrait pas l’être.",
        "Ouragans, grêle et tempêtes de vent endommagent chaque année des milliers de toitures du sud de la Florida. Nous inspectons, documentons et expliquons nos constatations, afin que vous puissiez parler à votre compagnie d’assurance sur des faits clairs.",
        "Inspection gratuite",
        "(786) 372-4754",
        "Inspection gratuite · Agréé et assuré · FL CCC1331979",
        "Comment nous gérons votre réclamation",
        "1. Appelez-nous d’abord",
        "Stoppez les dégâts d’abord. Appelez-nous et nous planifierons une stabilisation d’urgence comme le bâchage, en photographiant les dégâts au passage.",
        "2. Documentation gratuite des dégâts",
        "Nous inspectons la toiture entière, pas seulement le trou évident, et documentons les dégâts de vent, de grêle et d’eau avec des mesures et des photos que vous pouvez transmettre à votre assureur.",
        "3. Nous pouvons rejoindre la visite de l’expert",
        "Si vous le souhaitez, nous pouvons être sur le toit pendant la visite de votre expert pour répondre aux questions techniques sur la toiture et les matériaux. C’est vous et votre assureur qui prenez les décisions.",
        "4. Vous obtenez une toiture conforme au code",
        "Nous prenons en charge la réparation ou le remplacement sous permis, selon le code de Miami-Dade en vigueur, et vous remettons les documents de garantie. Si un élément exigé par le code manque à l’estimation de votre assureur, nous vous remettons un devis écrit à lui transmettre.",
        "La partie honnête : ce que nous ferons et ne ferons pas",
        "Nous sommes un couvreur agréé en Floride, pas un expert d’assurances. Nous ne pouvons ni négocier votre réclamation ni interpréter votre contrat d’assurance à votre place, et la loi de Floride interdit aux entrepreneurs de renoncer à votre franchise ou de la payer. Ce que nous pouvons faire, c’est documenter la toiture, rédiger un devis détaillé et expliquer les travaux, afin que vous et votre expert regardiez les mêmes faits.",
        "Nous n’exagérons pas les réclamations, nous ne courons pas de porte en porte après les tempêtes, et nous vous dirons franchement quand les dégâts semblent inférieurs à votre franchise. Notre note de 4,9 étoiles sur Google repose sur cette approche.",
        "Questions fréquentes",
        "FAQ des réclamations d’assurance.",
      ],
      attributes: [],
      faq: [
        {
          q: "Mon assurance habitation couvre-t-elle ma toiture ?",
          a: "Les dégâts de tempête — ouragans, grêle et vent — sont généralement couverts par les contrats standard de Floride ; l’usure ne l’est généralement pas. Notre évaluation gratuite documente l’état de la toiture et les dégâts de tempête visibles, afin que vous en sachiez plus avant de déclarer.",
        },
        {
          q: "Dois-je déclarer le sinistre moi-même ou avec votre aide ?",
          a: "C’est toujours vous qui déclarez, car il s’agit de votre contrat et de votre réclamation. Nous préparons les photos et un devis écrit, pouvons être présents lors de la visite de l’expert si vous le souhaitez, et expliquons les travaux de toiture. Si vous souhaitez que quelqu’un négocie pour vous, un expert d’assurances agréé ou un avocat peut le faire.",
        },
        {
          q: "Que faire si ma réclamation est refusée ou sous-évaluée ?",
          a: "Demandez à votre assureur une explication écrite de la décision. Nous pouvons partager avec vous, votre expert d’assurances ou votre avocat nos photos d’inspection et notre devis. Le Florida Department of Financial Services traite également les réclamations des consommateurs en matière d’assurance.",
        },
        {
          q: "Pouvez-vous renoncer à ma franchise ou la prendre en charge ?",
          a: "Non. La loi de Floride interdit aux entrepreneurs de renoncer à une franchise d’assurance, de l’absorber ou de la rembourser. Méfiez-vous de quiconque vous le propose.",
        },
        {
          q: "Facturez-vous l’assistance pour une réclamation ?",
          a: "Non. La documentation des dégâts fait partie de notre inspection gratuite. Nous ne sommes pas des experts d’assurances et ne facturons pas la négociation d’une réclamation.",
        },
      ],
      legal: [],
    },
  },
  financing: {
    en: {
      meta: {
        title: "Roof Financing Miami | $0 Down | Centurion Roofing",
        description:
          "Replace your roof now, pay over time. $0-down financing, monthly payments and Ygrene PACE financing for Miami-Dade & Broward homeowners. Free quote: (786) 372-4754.",
        ogTitle: "Roof Financing Miami | $0 Down | Centurion Roofing",
        ogDescription:
          "Replace your roof now, pay over time. $0-down financing, monthly payments and Ygrene PACE financing for Miami-Dade & Broward homeowners. Free quote: (786) 372-4754.",
      },
      text: [
        "Financing",
        "A new roof shouldn’t wait for a savings account.",
        "Roof replacement is one of the biggest line items a homeowner faces — and waiting costs more than financing ever does. Leaks don’t send invoices; they send ceiling stains.",
        "Free Inspection",
        "(786) 372-4754",
        "Free inspection · Licensed & insured · FL CCC1331979",
        "Four ways to pay over time",
        "$0 down, monthly payments",
        "Get the roof your house needs now and spread the cost with predictable monthly payments through our lending partners. Approval and terms depend on the lender.",
        "Ygrene PACE financing",
        "As a Ygrene-certified contractor, we offer PACE financing: qualifying energy-efficient roofing upgrades repaid through your property tax bill, typically with no money down. Approval looks at your property rather than only your credit score, so read the terms carefully.",
        "Flexible terms",
        "Terms vary by program. We walk you through the real numbers, including the monthly payment, the total cost and what fits your budget.",
        "Insurance claims + financing together",
        "Insurance proceeds don’t always cover the whole project. If part of the cost falls to you, we can walk you through financing for the remainder.",
        "Financing is subject to credit or property approval and lender terms. Centurion Roofing is not a lender. Ask about current rates during your free inspection, or call (786) 372-4754.",
        "Common Questions",
        "Financing questions, answered straight.",
      ],
      attributes: [],
      faq: [
        {
          q: "Can I really get a new roof with no money down?",
          a: "Yes. Many homeowners qualify for $0-down plans where the first payment comes after installation. Exact terms depend on the program and approval.",
        },
        {
          q: "What is PACE / Ygrene financing?",
          a: "PACE (Property Assessed Clean Energy) finances qualifying energy-efficient improvements, repaid through your property tax bill over time. Approval is based on your property equity rather than credit score alone.",
        },
        {
          q: "Will financing affect my insurance or home sale?",
          a: "PACE assessments typically transfer to the buyer at sale. We explain the details in writing before you sign anything — no surprises at closing.",
        },
        {
          q: "How do I find out what I qualify for?",
          a: "Start with a free inspection and written quote. With the exact number in hand we run financing scenarios with you and give you a decision quickly.",
        },
      ],
      legal: [],
    },
    es: {
      meta: {
        title: "Financiamiento de Techos en Miami | Centurion Roofing",
        description:
          "Reemplace su techo ahora y pague a plazos. Financiamiento con $0 inicial, pagos mensuales y Ygrene PACE en Miami-Dade y Broward. Cotización: (786) 372-4754.",
        ogTitle: "Financiamiento de Techos en Miami | Centurion Roofing",
        ogDescription:
          "Reemplace su techo ahora y pague a plazos. Financiamiento con $0 inicial, pagos mensuales y Ygrene PACE en Miami-Dade y Broward. Cotización: (786) 372-4754.",
      },
      text: [
        "Financiamiento",
        "Un techo nuevo no debería esperar a una cuenta de ahorros.",
        "El reemplazo de techo es uno de los gastos más grandes que enfrenta un propietario, y esperar cuesta más que financiar. Las filtraciones no envían facturas: envían manchas de humedad en el cielo raso.",
        "Inspección gratuita",
        "(786) 372-4754",
        "Inspección gratuita · Licencia y seguro · FL CCC1331979",
        "Cuatro maneras de pagar a lo largo del tiempo",
        "$0 de cuota inicial, pagos mensuales",
        "Obtenga el techo que su casa necesita ahora y reparta el costo en pagos mensuales predecibles a través de nuestros socios prestamistas. La aprobación y las condiciones dependen de la entidad prestamista.",
        "Financiamiento Ygrene PACE",
        "Como contratista certificado por Ygrene, ofrecemos financiamiento PACE: mejoras energéticamente eficientes en los techos, elegibles, que se pagan a través de la factura de impuestos de su propiedad, por lo general sin cuota inicial. La aprobación evalúa su propiedad y no solo su puntaje de crédito, así que lea las condiciones con atención.",
        "Condiciones flexibles",
        "Las condiciones varían según el programa. Le explicamos las cifras reales, incluyendo el pago mensual, el costo total y lo que se ajusta a su presupuesto.",
        "Reclamación de seguro y financiamiento juntos",
        "El pago del seguro no siempre cubre todo el proyecto. Si una parte del costo queda en sus manos, podemos guiarle en el financiamiento del resto.",
        "El financiamiento está sujeto a aprobación crediticia o de la propiedad y a las condiciones de la entidad prestamista. Centurion Roofing no es una entidad prestamista. Pregunte por las tasas vigentes durante su inspección gratuita o llame al (786) 372-4754.",
        "Preguntas frecuentes",
        "Preguntas sobre financiamiento, respondidas claras.",
      ],
      attributes: [],
      faq: [
        {
          q: "¿De verdad puedo tener un techo nuevo sin pagar nada por adelantado?",
          a: "Sí. Muchos propietarios califican para planes con $0 de cuota inicial, en los que el primer pago se realiza después de la instalación. Las condiciones exactas dependen del programa y de la aprobación.",
        },
        {
          q: "¿Qué es el financiamiento PACE / Ygrene?",
          a: "PACE (Property Assessed Clean Energy) financia mejoras energéticamente eficientes elegibles, que se pagan a través de la factura de impuestos de su propiedad con el paso del tiempo. La aprobación se basa en el valor patrimonial de su propiedad y no solo en el puntaje de crédito.",
        },
        {
          q: "¿El financiamiento afecta mi seguro o la venta de mi casa?",
          a: "Las evaluaciones PACE suelen transferirse al comprador en el momento de la venta. Le explicamos los detalles por escrito antes de que firme nada, para que no haya sorpresas al cierre.",
        },
        {
          q: "¿Cómo sé para qué califiqué?",
          a: "Comience con una inspección gratuita y una cotización escrita. Con la cifra exacta en mano, evaluamos escenarios de financiamiento con usted y le damos una respuesta rápida.",
        },
      ],
      legal: [],
    },
    fr: {
      meta: {
        title: "Financement de toiture Miami | Centurion Roofing",
        description:
          "Financement de toiture à Miami : 0 $ d’acompte, paiements mensuels et financement PACE Ygrene pour Miami-Dade et Broward. Devis gratuit : (786) 372-4754.",
        ogTitle: "Financement de toiture Miami | Centurion Roofing",
        ogDescription:
          "Financement de toiture à Miami : 0 $ d’acompte, paiements mensuels et financement PACE Ygrene pour Miami-Dade et Broward. Devis gratuit : (786) 372-4754.",
      },
      text: [
        "Financement",
        "Un nouveau toit ne devrait pas attendre un livret d’épargne.",
        "Le remplacement de toiture est l’une des plus grosses dépenses auxquelles un propriétaire doit faire face — et attendre coûte plus cher que le financement. Les fuites n’envoient pas de factures : elles envoient des taches au plafond.",
        "Inspection gratuite",
        "(786) 372-4754",
        "Inspection gratuite · Agréé et assuré · FL CCC1331979",
        "Quatre façons de payer dans la durée",
        "0 $ d’acompte, paiements mensuels",
        "Faites installer dès maintenant le toit dont votre maison a besoin et étalez le coût grâce à des mensualités prévisibles auprès de nos partenaires prêteurs. L’accord et les conditions dépendent du prêteur.",
        "Financement PACE Ygrene",
        "En tant qu’entrepreneur certifié Ygrene, nous proposons le financement PACE : les rénovations de toiture économes en énergie éligibles sont remboursées via votre taxe foncière, généralement sans apport. L’accord tient à votre bien immobilier et pas seulement à votre score de crédit : lisez donc attentivement les conditions.",
        "Des conditions souples",
        "Les conditions varient selon le programme. Nous vous expliquons les chiffres réels, y compris la mensualité, le coût total et ce qui correspond à votre budget.",
        "Réclamations d’assurance + financement",
        "L’indemnisation d’assurance ne couvre pas toujours l’ensemble du projet. Si une part du coût vous revient, nous pouvons vous guider dans le financement du solde.",
        "Le financement est soumis à l’approbation de crédit ou du bien immobilier et aux conditions du prêteur. Centurion Roofing n’est pas un prêteur. Demandez les taux en vigueur lors de votre inspection gratuite, ou appelez le (786) 372-4754.",
        "Questions fréquentes",
        "Vos questions sur le financement, en clair.",
      ],
      attributes: [],
      faq: [
        {
          q: "Puis-je vraiment obtenir un nouveau toit sans argent ?",
          a: "Oui. De nombreux propriétaires bénéficient de plans à 0 $ d’acompte où le premier paiement intervient après l’installation. Les conditions exactes dépendent du programme et de l’accord.",
        },
        {
          q: "Qu’est-ce que le financement PACE / Ygrene ?",
          a: "PACE (Property Assessed Clean Energy) finance les améliorations économes en énergie éligibles, remboursées dans la durée via votre taxe foncière. L’accord repose sur la valeur de votre bien et non sur le seul score de crédit.",
        },
        {
          q: "Le financement affectera-t-il mon assurance ou la vente de ma maison ?",
          a: "Les cotisations PACE sont généralement reprises par l’acquéreur lors de la vente. Nous vous expliquons les détails par écrit avant que vous ne signiez quoi que ce soit — aucune surprise à la signature.",
        },
        {
          q: "Comment savoir à quoi j’ai droit ?",
          a: "Commencez par une inspection gratuite et un devis écrit. Avec le montant exact en main, nous simulons avec vous les options de financement et vous donnons une réponse rapidement.",
        },
      ],
      legal: [],
    },
  },
  privacy: {
    en: {
      meta: {
        title: "Privacy Policy | Centurion Roofing",
        description:
          "Tile, shingle, metal and flat roofing in Miami-Dade & Broward. Free inspection, written quote, leak repair and storm tarping. 4.9★ on Google. Call (786) 372-4754.",
        ogTitle: "Privacy Policy | Centurion Roofing",
        ogDescription:
          "Tile, shingle, metal and flat roofing in Miami-Dade & Broward. Free inspection, written quote, leak repair and storm tarping. 4.9★ on Google. Call (786) 372-4754.",
      },
      text: [
        "Legal",
        "Privacy Policy",
        "Last updated: November 10, 2026",
        "Free Inspection",
        "(786) 372-4754",
        "Free inspection · Licensed & insured · FL CCC1331979",
      ],
      attributes: [],
      faq: [],
      legal: [
        {
          heading: "Who we are",
          paragraphs: [
            "Centurion Roofing (“we”, “us”) is a roofing contractor serving Miami-Dade and Broward counties. Our address is 3190 NW 38th St, Miami, FL 33142. You can reach us at centurionroofingllc@gmail.com or (786) 372-4754.",
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: [
            "When you request an inspection, quote or estimate, we collect your name, phone number, ZIP code, the type of project you need and, if you give it, your email address. With the price calculator we also receive the material, roof size and price range you were looking at. If you book an inspection, we receive the time slot you request.",
            "Like most websites, we also receive basic technical and usage information, such as your browser, device and the pages you visit, through analytics tools.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [
            "We use your information to respond to your request, schedule inspections, prepare quotes, and contact you about your project by phone, text message or email.",
            "We use analytics information to understand how the website is used and to improve it.",
          ],
        },
        {
          heading: "Calls and text messages",
          paragraphs: [
            "By checking the consent box and submitting a form, you give Centurion Roofing your express consent to call or text you at the number you provided about your request. Message and data rates may apply. Message frequency varies. Consent is not a condition of purchase.",
            "To stop text messages, reply STOP; for help, reply HELP. You can also ask us to stop calling you at any time.",
            "We keep a record of your consent: the date and time, and the wording you agreed to.",
          ],
        },
        {
          heading: "Cookies and analytics",
          paragraphs: [
            "We use analytics tools, such as Google Analytics and Vercel Analytics, which may use cookies or similar technologies. You can block or delete cookies in your browser settings; the site will keep working.",
          ],
        },
        {
          heading: "Sharing",
          paragraphs: [
            "We do not sell your personal information. We share it only with service providers that help us run our business (for example email, form processing, scheduling, analytics and hosting providers), and when required by law.",
          ],
        },
        {
          heading: "Retention and security",
          paragraphs: [
            "We keep your information as long as needed to handle your request and for our business and legal records. We use reasonable measures to protect it, but no method of transmission over the internet is completely secure.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "This site is not directed to children under 13 and we do not knowingly collect information from them.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can ask us to correct or delete your information, or to stop contacting you, by writing to centurionroofingllc@gmail.com.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "We may update this policy from time to time. The date at the top shows when it was last changed.",
          ],
        },
      ],
    },
    es: {
      meta: {
        title: "Política de privacidad | Centurion Roofing",
        description:
          "Techos de tejas, shingle, metal y planos en Miami-Dade y Broward. Inspección gratis, cotización por escrito y reparación de goteras. 4.9★ en Google. Llame al (786) 372-4754.",
        ogTitle: "Política de privacidad | Centurion Roofing",
        ogDescription:
          "Techos de tejas, shingle, metal y planos en Miami-Dade y Broward. Inspección gratis, cotización por escrito y reparación de goteras. 4.9★ en Google. Llame al (786) 372-4754.",
      },
      text: [
        "Legal",
        "Política de privacidad",
        "Última actualización: 10 de noviembre de 2026",
        "Inspección gratuita",
        "(786) 372-4754",
        "Inspección gratuita · Licencia y seguro · FL CCC1331979",
      ],
      attributes: [],
      faq: [],
      legal: [
        {
          heading: "Quiénes somos",
          paragraphs: [
            "Centurion Roofing («nosotros») es un contratista de techos que atiende los condados de Miami-Dade y Broward. Nuestra dirección es 3190 NW 38th St, Miami, FL 33142. Puede comunicarse con nosotros en centurionroofingllc@gmail.com o al (786) 372-4754.",
          ],
        },
        {
          heading: "Información que recopilamos",
          paragraphs: [
            "Cuando solicita una inspección, una cotización o un estimado, recopilamos su nombre, número de teléfono, código postal, tipo de proyecto y, si lo indica, su correo electrónico. En el calculador de precios también recibimos el material, el tamaño del techo y el rango de precio que estaba viendo. Si reserva una inspección, recibimos el horario que solicita.",
            "Como la mayoría de los sitios web, también recibimos información técnica y de uso básica, como su navegador, su dispositivo y las páginas que visita, mediante herramientas de analítica.",
          ],
        },
        {
          heading: "Cómo la usamos",
          paragraphs: [
            "Usamos su información para responder a su solicitud, programar inspecciones, preparar cotizaciones y comunicarnos con usted sobre su proyecto por teléfono, mensaje de texto o correo electrónico.",
            "Usamos la información de analítica para entender cómo se usa el sitio y mejorarlo.",
          ],
        },
        {
          heading: "Llamadas y mensajes de texto",
          paragraphs: [
            "Al marcar la casilla de consentimiento y enviar un formulario, usted autoriza expresamente a Centurion Roofing a llamarle o enviarle mensajes de texto al número que indicó, sobre su solicitud. Pueden aplicar tarifas de mensajes y datos. La frecuencia de los mensajes varía. El consentimiento no es condición de compra.",
            "Para dejar de recibir mensajes de texto, responda STOP; para pedir ayuda, responda HELP. También puede pedirnos que dejemos de llamarle en cualquier momento.",
            "Guardamos un registro de su consentimiento: la fecha y la hora, y el texto que aceptó.",
          ],
        },
        {
          heading: "Cookies y analítica",
          paragraphs: [
            "Usamos herramientas de analítica, como Google Analytics y Vercel Analytics, que pueden usar cookies o tecnologías similares. Puede bloquear o borrar las cookies en la configuración de su navegador; el sitio seguirá funcionando.",
          ],
        },
        {
          heading: "Con quién la compartimos",
          paragraphs: [
            "No vendemos su información personal. La compartimos solo con proveedores que nos ayudan a operar el negocio (por ejemplo, de correo electrónico, procesamiento de formularios, programación, analítica y alojamiento web), y cuando la ley lo exige.",
          ],
        },
        {
          heading: "Conservación y seguridad",
          paragraphs: [
            "Conservamos su información el tiempo necesario para atender su solicitud y para nuestros registros comerciales y legales. Usamos medidas razonables para protegerla, pero ningún método de transmisión por internet es completamente seguro.",
          ],
        },
        {
          heading: "Menores de edad",
          paragraphs: [
            "Este sitio no está dirigido a menores de 13 años y no recopilamos a sabiendas información de ellos.",
          ],
        },
        {
          heading: "Sus opciones",
          paragraphs: [
            "Puede pedirnos que corrijamos o eliminemos su información, o dejar de recibir comunicaciones, escribiendo a centurionroofingllc@gmail.com.",
          ],
        },
        {
          heading: "Cambios",
          paragraphs: [
            "Podemos actualizar esta política de vez en cuando. La fecha al inicio indica cuándo se modificó por última vez.",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Politique de confidentialité | Centurion Roofing",
        description:
          "Tuiles, bardeaux, métal et toits plats à Miami-Dade et Broward. Inspection gratuite, devis écrit, réparation de fuites. 4,9★ sur Google. Appelez le (786) 372-4754.",
        ogTitle: "Politique de confidentialité | Centurion Roofing",
        ogDescription:
          "Tuiles, bardeaux, métal et toits plats à Miami-Dade et Broward. Inspection gratuite, devis écrit, réparation de fuites. 4,9★ sur Google. Appelez le (786) 372-4754.",
      },
      text: [
        "Mentions légales",
        "Politique de confidentialité",
        "Dernière mise à jour: 10 novembre 2026",
        "Inspection gratuite",
        "(786) 372-4754",
        "Inspection gratuite · Agréé et assuré · FL CCC1331979",
      ],
      attributes: [],
      faq: [],
      legal: [
        {
          heading: "Qui sommes-nous",
          paragraphs: [
            "Centurion Roofing (« nous ») est une entreprise de couverture qui dessert les comtés de Miami-Dade et de Broward. Notre adresse est 3190 NW 38th St, Miami, FL 33142. Vous pouvez nous joindre à centurionroofingllc@gmail.com ou au (786) 372-4754.",
          ],
        },
        {
          heading: "Informations que nous collectons",
          paragraphs: [
            "Lorsque vous demandez une inspection, un devis ou une estimation, nous collectons votre nom, votre numéro de téléphone, votre code postal, le type de projet et, si vous l’indiquez, votre adresse e-mail. Avec le calculateur de prix, nous recevons aussi le matériau, la taille du toit et la fourchette de prix que vous consultiez. Si vous réservez une inspection, nous recevons le créneau demandé.",
            "Comme la plupart des sites, nous recevons également des informations techniques et d’utilisation de base, comme votre navigateur, votre appareil et les pages visitées, par le biais d’outils d’analyse.",
          ],
        },
        {
          heading: "Comment nous les utilisons",
          paragraphs: [
            "Nous utilisons vos informations pour répondre à votre demande, planifier des inspections, préparer des devis et vous contacter au sujet de votre projet par téléphone, SMS ou e-mail.",
            "Nous utilisons les données d’analyse pour comprendre comment le site est utilisé et l’améliorer.",
          ],
        },
        {
          heading: "Appels et SMS",
          paragraphs: [
            "En cochant la case de consentement et en envoyant un formulaire, vous autorisez expressément Centurion Roofing à vous appeler ou à vous envoyer des SMS au numéro indiqué, au sujet de votre demande. Des frais de messages et de données peuvent s’appliquer. La fréquence des messages varie. Le consentement n’est pas une condition d’achat.",
            "Pour ne plus recevoir de SMS, répondez STOP ; pour obtenir de l’aide, répondez HELP. Vous pouvez aussi nous demander à tout moment de cesser de vous appeler.",
            "Nous conservons une trace de votre consentement : la date et l’heure, ainsi que le texte que vous avez accepté.",
          ],
        },
        {
          heading: "Cookies et analyse",
          paragraphs: [
            "Nous utilisons des outils d’analyse, tels que Google Analytics et Vercel Analytics, qui peuvent recourir à des cookies ou à des technologies similaires. Vous pouvez bloquer ou supprimer les cookies dans les paramètres de votre navigateur ; le site continuera de fonctionner.",
          ],
        },
        {
          heading: "Partage",
          paragraphs: [
            "Nous ne vendons pas vos informations personnelles. Nous ne les partageons qu’avec des prestataires qui nous aident à faire fonctionner l’entreprise (par exemple pour l’e-mail, le traitement des formulaires, la planification, l’analyse et l’hébergement), et lorsque la loi l’exige.",
          ],
        },
        {
          heading: "Conservation et sécurité",
          paragraphs: [
            "Nous conservons vos informations aussi longtemps que nécessaire pour traiter votre demande et pour nos registres commerciaux et juridiques. Nous prenons des mesures raisonnables pour les protéger, mais aucune méthode de transmission par Internet n’est totalement sûre.",
          ],
        },
        {
          heading: "Mineurs",
          paragraphs: [
            "Ce site ne s’adresse pas aux enfants de moins de 13 ans et nous ne collectons pas sciemment d’informations les concernant.",
          ],
        },
        {
          heading: "Vos choix",
          paragraphs: [
            "Vous pouvez nous demander de corriger ou de supprimer vos informations, ou de ne plus être contacté, en écrivant à centurionroofingllc@gmail.com.",
          ],
        },
        {
          heading: "Modifications",
          paragraphs: [
            "Nous pouvons mettre à jour cette politique de temps à autre. La date en haut de page indique la dernière modification.",
          ],
        },
      ],
    },
  },
  terms: {
    en: {
      meta: {
        title: "Terms of Use | Centurion Roofing",
        description:
          "Tile, shingle, metal and flat roofing in Miami-Dade & Broward. Free inspection, written quote, leak repair and storm tarping. 4.9★ on Google. Call (786) 372-4754.",
        ogTitle: "Terms of Use | Centurion Roofing",
        ogDescription:
          "Tile, shingle, metal and flat roofing in Miami-Dade & Broward. Free inspection, written quote, leak repair and storm tarping. 4.9★ on Google. Call (786) 372-4754.",
      },
      text: [
        "Legal",
        "Terms of Use",
        "Last updated: November 10, 2026",
        "Free Inspection",
        "(786) 372-4754",
        "Free inspection · Licensed & insured · FL CCC1331979",
      ],
      attributes: [],
      faq: [],
      legal: [
        {
          heading: "Using this website",
          paragraphs: [
            "This website is operated by Centurion Roofing. By using it, you agree to these terms. If you do not agree, please do not use the site.",
          ],
        },
        {
          heading: "Information is general",
          paragraphs: [
            "Content on this site is general information about roofing and is not legal, insurance or engineering advice. Prices, timelines and product details shown here are examples. Your written quote is the only binding statement of price and scope.",
          ],
        },
        {
          heading: "Price calculator and bookings",
          paragraphs: [
            "The price calculator shows an approximate range, not a quote. An inspection request is only a request: the time is confirmed when our office confirms it with you.",
          ],
        },
        {
          heading: "Quotes and contracts",
          paragraphs: [
            "Submitting a form does not create a contract. Work begins only after you and Centurion Roofing sign a written agreement.",
          ],
        },
        {
          heading: "Phone and text communications",
          paragraphs: [
            "If you check the consent box, we may call or text you about your request, as described in our Privacy Policy. Consent is not a condition of purchase.",
          ],
        },
        {
          heading: "Financing",
          paragraphs: [
            "Financing is offered by third-party lenders and programs, subject to approval and their terms. Centurion Roofing is not a lender.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The text, images and design on this site belong to Centurion Roofing or its licensors. You may not copy or reuse them without permission.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "The site is provided “as is”. To the extent permitted by law, we are not liable for damages arising from your use of the site.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: ["These terms are governed by the laws of the State of Florida."],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions about these terms: centurionroofingllc@gmail.com or (786) 372-4754.",
          ],
        },
      ],
    },
    es: {
      meta: {
        title: "Términos de uso | Centurion Roofing",
        description:
          "Techos de tejas, shingle, metal y planos en Miami-Dade y Broward. Inspección gratis, cotización por escrito y reparación de goteras. 4.9★ en Google. Llame al (786) 372-4754.",
        ogTitle: "Términos de uso | Centurion Roofing",
        ogDescription:
          "Techos de tejas, shingle, metal y planos en Miami-Dade y Broward. Inspección gratis, cotización por escrito y reparación de goteras. 4.9★ en Google. Llame al (786) 372-4754.",
      },
      text: [
        "Legal",
        "Términos de uso",
        "Última actualización: 10 de noviembre de 2026",
        "Inspección gratuita",
        "(786) 372-4754",
        "Inspección gratuita · Licencia y seguro · FL CCC1331979",
      ],
      attributes: [],
      faq: [],
      legal: [
        {
          heading: "Uso de este sitio web",
          paragraphs: [
            "Este sitio web es operado por Centurion Roofing. Al usarlo, usted acepta estos términos. Si no está de acuerdo, por favor no use el sitio.",
          ],
        },
        {
          heading: "La información es general",
          paragraphs: [
            "El contenido de este sitio es información general sobre techos y no constituye asesoría legal, de seguros ni de ingeniería. Los precios, plazos y detalles de productos que aparecen aquí son ejemplos. Su cotización por escrito es la única declaración vinculante de precio y alcance.",
          ],
        },
        {
          heading: "Calculador de precios y reservas",
          paragraphs: [
            "El calculador de precios muestra un rango orientativo, no una cotización. Una solicitud de inspección es solo una solicitud: el horario queda confirmado cuando nuestra oficina se lo confirma.",
          ],
        },
        {
          heading: "Cotizaciones y contratos",
          paragraphs: [
            "Enviar un formulario no crea un contrato. El trabajo comienza solo después de que usted y Centurion Roofing firmen un acuerdo por escrito.",
          ],
        },
        {
          heading: "Comunicaciones por teléfono y texto",
          paragraphs: [
            "Si usted marca la casilla de consentimiento, podemos llamarle o enviarle mensajes de texto sobre su solicitud, según se describe en nuestra Política de privacidad. El consentimiento no es condición de compra.",
          ],
        },
        {
          heading: "Financiamiento",
          paragraphs: [
            "El financiamiento lo ofrecen prestamistas y programas de terceros, sujeto a aprobación y a sus condiciones. Centurion Roofing no es un prestamista.",
          ],
        },
        {
          heading: "Propiedad intelectual",
          paragraphs: [
            "El texto, las imágenes y el diseño de este sitio pertenecen a Centurion Roofing o a sus licenciantes. No puede copiarlos ni reutilizarlos sin permiso.",
          ],
        },
        {
          heading: "Responsabilidad",
          paragraphs: [
            "El sitio se ofrece «tal cual». En la medida permitida por la ley, no somos responsables de los daños derivados del uso del sitio.",
          ],
        },
        {
          heading: "Ley aplicable",
          paragraphs: ["Estos términos se rigen por las leyes del Estado de Florida."],
        },
        {
          heading: "Contacto",
          paragraphs: [
            "Preguntas sobre estos términos: centurionroofingllc@gmail.com o (786) 372-4754.",
          ],
        },
      ],
    },
    fr: {
      meta: {
        title: "Conditions d’utilisation | Centurion Roofing",
        description:
          "Tuiles, bardeaux, métal et toits plats à Miami-Dade et Broward. Inspection gratuite, devis écrit, réparation de fuites. 4,9★ sur Google. Appelez le (786) 372-4754.",
        ogTitle: "Conditions d’utilisation | Centurion Roofing",
        ogDescription:
          "Tuiles, bardeaux, métal et toits plats à Miami-Dade et Broward. Inspection gratuite, devis écrit, réparation de fuites. 4,9★ sur Google. Appelez le (786) 372-4754.",
      },
      text: [
        "Mentions légales",
        "Conditions d’utilisation",
        "Dernière mise à jour: 10 novembre 2026",
        "Inspection gratuite",
        "(786) 372-4754",
        "Inspection gratuite · Agréé et assuré · FL CCC1331979",
      ],
      attributes: [],
      faq: [],
      legal: [
        {
          heading: "Utilisation du site",
          paragraphs: [
            "Ce site est exploité par Centurion Roofing. En l’utilisant, vous acceptez ces conditions. Si vous n’êtes pas d’accord, veuillez ne pas utiliser le site.",
          ],
        },
        {
          heading: "Les informations sont générales",
          paragraphs: [
            "Le contenu de ce site est une information générale sur la toiture et ne constitue pas un conseil juridique, d’assurance ou d’ingénierie. Les prix, délais et détails de produits indiqués ici sont des exemples. Votre devis écrit est la seule indication contraignante de prix et de périmètre des travaux.",
          ],
        },
        {
          heading: "Calculateur de prix et réservations",
          paragraphs: [
            "Le calculateur de prix affiche une fourchette indicative, et non un devis. Une demande d’inspection n’est qu’une demande : le créneau est confirmé lorsque notre bureau vous le confirme.",
          ],
        },
        {
          heading: "Devis et contrats",
          paragraphs: [
            "L’envoi d’un formulaire ne crée pas de contrat. Les travaux ne commencent qu’après la signature d’un accord écrit entre vous et Centurion Roofing.",
          ],
        },
        {
          heading: "Communications par téléphone et SMS",
          paragraphs: [
            "Si vous cochez la case de consentement, nous pouvons vous appeler ou vous envoyer des SMS au sujet de votre demande, comme décrit dans notre Politique de confidentialité. Le consentement n’est pas une condition d’achat.",
          ],
        },
        {
          heading: "Financement",
          paragraphs: [
            "Le financement est proposé par des prêteurs et des programmes tiers, sous réserve d’approbation et de leurs conditions. Centurion Roofing n’est pas un prêteur.",
          ],
        },
        {
          heading: "Propriété intellectuelle",
          paragraphs: [
            "Les textes, images et la conception de ce site appartiennent à Centurion Roofing ou à ses concédants. Vous ne pouvez pas les copier ni les réutiliser sans autorisation.",
          ],
        },
        {
          heading: "Responsabilité",
          paragraphs: [
            "Le site est fourni « en l’état ». Dans la mesure permise par la loi, nous ne sommes pas responsables des dommages découlant de votre utilisation du site.",
          ],
        },
        {
          heading: "Droit applicable",
          paragraphs: ["Ces conditions sont régies par les lois de l’État de Floride."],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions sur ces conditions : centurionroofingllc@gmail.com ou (786) 372-4754.",
          ],
        },
      ],
    },
  },
};
