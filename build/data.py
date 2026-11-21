# -*- coding: utf-8 -*-
"""
Verified facts about Acadian Family Dental.

Every value here is traceable to a public source URL (see research/acadian/facts.md).
Nothing in this file is invented: no awards, no review counts, no prices, no credentials.
"""

SITE = {
    "name": "Acadian Family Dental",
    "short": "Acadian",
    "practice_line": "Family Dental",
    "phone_display": "713-766-5804",
    "phone_tel": "+17137665804",
    "phone_alt_display": "(713) 681-7855",
    "email": "front@acadiandental.com",
    "street": "7490 W. Tidwell Rd",
    "city": "Houston",
    "state": "TX",
    "zip": "77040",
    "area": "Northwest Houston",
    "geo_lat": 29.8522935,
    "geo_lng": -95.5029771,
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Acadian+Family+Dental,+7490+W+Tidwell+Rd,+Houston,+TX+77040",
    "founded_year": 1993,
    "rating": "4.9",
    "reviews_count": "1,000+",
    "reviews_source": "Google",
    # Where this build is deployed. Change to the practice's domain at launch.
    "site_url": "https://acadian-family-dental.vercel.app",
}

# index 0 = Monday. None = closed.
HOURS = {
    1: None,
    2: ("12:00", "19:00"),   # Tuesday
    3: ("08:00", "17:00"),   # Wednesday
    4: ("08:00", "17:00"),   # Thursday
    5: ("08:00", "16:30"),   # Friday
    6: ("08:00", "15:00"),   # Saturday
    0: None,                 # Sunday
}

HOURS_LABEL = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

DOCTORS = [
    {
        "slug": "eric-perkins",
        "name": "Dr. Eric Perkins, DDS",
        "first": "Dr. Perkins",
        "role_en": "Owner and Managing Dentist",
        "role_es": "Propietario y dentista director",
        "since": "1993",
        "photo": "/assets/img/dr-perkins.webp",
        "photo_sm": "/assets/img/dr-perkins-sm.webp",
        "photo_w": 720,
        "photo_h": 480,
        "origin_en": "A native of Lake Charles, Louisiana, he earned a bachelor's degree in Biochemistry from Louisiana State University in 1984 and his Doctor of Dental Surgery from LSU School of Dentistry in New Orleans in 1988.",
        "origin_es": "Nativo de Lake Charles, Luisiana, obtuvo su licenciatura en Bioquímica en Louisiana State University en 1984 y su Doctor of Dental Surgery en la Escuela de Odontología de LSU en Nueva Orleans en 1988.",
        "body_en": [
            "Dr. Perkins has practiced in Houston since 1993 and moved into the practice's current Tidwell Road office in July 2000.",
            "During dental school he researched cosmetic dentistry and received a Student Research Award, which placed him among a small group of dental professionals asked to speak at national and international events.",
            "His clinical focus is general dentistry: helping patients understand their oral health and the options for maintaining or restoring a smile. Recommendations always follow an examination.",
        ],
        "body_es": [
            "El Dr. Perkins atiende en Houston desde 1993 y se trasladó a la oficina actual de Tidwell Road en julio de 2000.",
            "Durante la carrera investigó odontología estética y recibió el Student Research Award, lo que lo colocó entre un pequeño grupo de profesionales invitados a hablar en eventos nacionales e internacionales.",
            "Su enfoque clínico es la odontología general: ayudar al paciente a entender su salud oral y las opciones para mantener o restaurar una sonrisa. Las recomendaciones siempre siguen a un examen.",
        ],
        "edu": [
            ("Bachelor of Science, Biochemistry", "Louisiana State University", "1984"),
            ("Doctor of Dental Surgery", "LSU School of Dentistry, New Orleans", "1988"),
        ],
        "memberships": [
            "American Dental Association",
            "Academy of General Dentistry",
            "Greater Houston Dental Society",
            "International Congress of Oral Implantologists",
            "Academy of Student Research Clinicians",
            "Academy of Facial Aesthetics",
        ],
        "npi": "1013088467",
    },
    {
        "slug": "scott-driver",
        "name": "Dr. Scott Driver, DDS",
        "first": "Dr. Driver",
        "role_en": "Associate General Dentist",
        "role_es": "Dentista general asociado",
        "since": "2011",
        "photo": "/assets/img/dr-driver.webp",
        "photo_sm": "/assets/img/dr-driver-sm.webp",
        "photo_w": 720,
        "photo_h": 480,
        "origin_en": "Born and raised in rural Kansas, he earned his bachelor's degree from Baker University and his Doctor of Dental Surgery from the University of Missouri-Kansas City.",
        "origin_es": "Nacido y criado en la Kansas rural, obtuvo su licenciatura en Baker University y su Doctor of Dental Surgery en la University of Missouri-Kansas City.",
        "body_en": [
            "Dr. Driver has been with the Acadian Family Dental practice since 2011, working alongside Dr. Perkins and the hygiene and assisting team.",
            "He practices general dentistry with a focus on preventive care and on helping patients feel at ease during an appointment.",
            "Patients who want a specific dentist can say so when scheduling — just mention it when you request an appointment.",
        ],
        "body_es": [
            "El Dr. Driver forma parte de Acadian Family Dental desde 2011, trabajando junto al Dr. Perkins y al equipo de higiene y asistencia.",
            "Ejerce la odontología general con enfoque en la prevención y en que el paciente se sienta tranquilo durante la cita.",
            "Si prefiere un dentista en particular, dígalo al agendar: menciónelo cuando solicite su cita.",
        ],
        "edu": [
            ("Bachelor's degree", "Baker University, Kansas", ""),
            ("Doctor of Dental Surgery", "University of Missouri-Kansas City", ""),
        ],
        "memberships": [],
        "npi": "",
    },
]

TEAM = [
    {
        "name": "Lynda",
        "role_en": "Registered Dental Hygienist",
        "role_es": "Higienista dental registrada",
        "photo": "/assets/img/lynda.webp",
        "photo_sm": "/assets/img/lynda-sm.webp",
        "photo_w": 550,
        "photo_h": 800,
        "bio_en": "Graduated from the University of Texas Dental School–Hygiene in 2000 and has worked with Acadian Family Dental throughout her career.",
        "bio_es": "Graduada de la Escuela de Higiene Dental de la University of Texas en 2000, ha trabajado con Acadian Family Dental toda su carrera.",
    },
    {
        "name": "Rhiannon",
        "role_en": "Head Dental Assistant",
        "role_es": "Asistente dental titular",
        "photo": "/assets/img/rhiannon.webp",
        "photo_sm": "/assets/img/rhiannon-sm.webp",
        "photo_w": 550,
        "photo_h": 800,
        "bio_en": "Completed her training in 2005 and has been with the practice since 2006.",
        "bio_es": "Completó su entrenamiento en 2005 y forma parte de la clínica desde 2006.",
    },
    {
        "name": "Robyn",
        "role_en": "Front Office Administrator",
        "role_es": "Administradora de recepción",
        "photo": "/assets/img/robyn.webp",
        "photo_sm": "/assets/img/robyn-sm.webp",
        "photo_w": 550,
        "photo_h": 800,
        "bio_en": "Manages the front office since 2013 and graduated from the University of Houston in 2001 with a bachelor's degree in finance.",
        "bio_es": "Administra la recepción desde 2013; se graduó de la University of Houston en 2001 con licenciatura en finanzas.",
    },
    {
        "name": "Amber",
        "role_en": "Registered Dental Assistant",
        "role_es": "Asistente dental registrada",
        "photo": "/assets/img/amber.webp",
        "photo_sm": "/assets/img/amber-sm.webp",
        "photo_w": 550,
        "photo_h": 800,
        "bio_en": "Working as a certified dental assistant since 2010, joined the office in 2015.",
        "bio_es": "Trabaja como asistente dental certificada desde 2010; se unió a la oficina en 2015.",
    },
    {
        "name": "Adelina",
        "role_en": "Registered Dental Assistant",
        "role_es": "Asistente dental registrada",
        "photo": "/assets/img/adelina.webp",
        "photo_sm": "/assets/img/adelina-sm.webp",
        "photo_w": 550,
        "photo_h": 800,
        "bio_en": "A dental assistant for 37 years, joined the team in 2024.",
        "bio_es": "Asistente dental durante 37 años, se unió al equipo en 2024.",
    },
    {
        "name": "Shari",
        "role_en": "Office Manager",
        "role_es": "Gerente de oficina",
        "photo": "/assets/img/shari.webp",
        "photo_sm": "/assets/img/shari.webp",
        "photo_w": 360,
        "photo_h": 524,
        "bio_en": "Worked with Dr. Perkins since the Houston practice opened in 1993. She helps patients understand insurance policies and plan changes.",
        "bio_es": "Trabaja con el Dr. Perkins desde que se abrió la clínica en Houston en 1993. Ayuda a los pacientes a entender su póliza de seguro y los cambios del plan.",
    },
]

SERVICES = [
    {
        "slug": "family-dentistry",
        "icon": "users",
        "kind": "preventive",
        "title_en": "Family dentistry",
        "title_es": "Odontología familiar",
        "lede_en": "Exams, cleanings and preventive care for toddlers to grandparents — one family, one office, one plan.",
        "lede_es": "Exámenes, limpiezas y cuidado preventivo desde el niño pequeño hasta los abuelos: una familia, una oficina, un plan.",
        "bullets_en": [
            ("Dental exams and cleanings", "Routine check-ups and professional cleanings twice a year are the baseline the practice works from."),
            ("Children's dentistry", "Fluoride treatments and sealants for young patients, plus techniques that keep a first visit calm."),
            ("Your first visit here", "An exam and the X-rays your dentist needs, then a plain-language plan of what needs attention now and what can wait."),
            ("One family plan", "Tell us you are booking together and the team coordinates appointment times so you make one trip."),
        ],
        "bullets_es": [
            ("Exámenes y limpiezas", "Las consultas de control y las limpiezas profesionales dos veces al año son la base de la clínica."),
            ("Odontología infantil", "Aplicación de flúor y selladores para los pacientes pequeños, además de técnicas para que la primera visita sea tranquila."),
            ("Su primera visita aquí", "Un examen y las radiografías que su dentista necesita, y después un plan explicado en palabras simples: qué urge y qué puede esperar."),
            ("Un plan familiar", "Díganos si vienen juntos y el equipo coordina los horarios para que haga un solo viaje."),
        ],
        "faq": [
            (
                "Do you treat children?",
                "¿Atienden a niños?",
                "Yes. The practice is a family practice: patients from toddlers to grandparents are welcome, and preventive services for children include fluoride treatments and sealants.",
                "Sí. La clínica es familiar: reciben pacientes desde el niño pequeño hasta los abuelos, y la prevención infantil incluye flúor y selladores.",
            ),
            (
                "How often should we come in?",
                "¿Cada cuánto debemos venir?",
                "Most people are seen twice a year for an exam and a cleaning. Your dentist sets the interval for each patient based on what they find.",
                "La mayoría de los pacientes viene dos veces al año para examen y limpieza. Su dentista fija el intervalo según lo que encuentra.",
            ),
            (
                "What if my child is nervous?",
                "¿Y si mi hijo está nervioso?",
                "Tell us when you schedule. The team is trained in gentle, kid-friendly techniques, and comfort options such as nitrous oxide and guided sedation are available when needed.",
                "Avísenos al agendar. El equipo tiene técnicas amables para niños, y se ofrecen opciones de comodidad como óxido nitroso y sedación guiada cuando se necesitan.",
            ),
        ],
    },
    {
        "slug": "cosmetic-dentistry",
        "icon": "spark",
        "kind": "cosmetic",
        "title_en": "Cosmetic dentistry",
        "title_es": "Odontología estética",
        "lede_en": "Whitening, veneers, bonding and tooth-colored fillings — planned around your face, not a template.",
        "lede_es": "Blanqueamiento, carillas, bonding y empastes del color del diente: planificados para su rostro, no para una plantilla.",
        "bullets_en": [
            ("Teeth whitening", "Professional whitening, typically lasting 6–12 months depending on habits and enamel."),
            ("Porcelain veneers", "Thin porcelain shells that change color, shape and spacing. Usually around 10–15 years with proper care."),
            ("Tooth-colored fillings", "Composite fillings that blend with the tooth instead of standing out from it."),
            ("Bonding and shaping", "Composite bonding fixes chips, closes small gaps and evens uneven edges."),
        ],
        "bullets_es": [
            ("Blanqueamiento", "Blanqueamiento profesional, con duración habitual de 6 a 12 meses según hábitos y esmalte."),
            ("Carillas de porcelana", "Carillas finas que cambian color, forma y espaciado. Suelen durar alrededor de 10 a 15 años con buen cuidado."),
            ("Empastes del color del diente", "Empastes de composite que se funden con el diente en vez de resaltar."),
            ("Bonding y forma", "El bonding en composite repara bordes, cierra espacios pequeños e iguala bordes desiguales."),
        ],
        "faq": [
            (
                "What is cosmetic dentistry?",
                "¿Qué es la odontología estética?",
                "Cosmetic dentistry improves how teeth, gums and smile look — whitening, veneers, bonding, reshaping and gum contouring. General dentistry is about oral health and prevention. Many treatments do both.",
                "La odontología estética mejora la apariencia de dientes, encías y sonrisa: blanqueamiento, carillas, bonding, recontorno de encías. La odontología general se ocupa de la salud oral y la prevención. Muchos tratamientos hacen ambas cosas.",
            ),
            (
                "How long do results last?",
                "¿Cuánto duran los resultados?",
                "According to the practice: whitening results usually last 6–12 months, porcelain veneers around 10–15 years, and composite bonding around 5–7 years.",
                "Según la clínica: el blanqueamiento dura de 6 a 12 meses, las carillas de porcelana alrededor de 10 a 15 años y el bonding de composite unos 5 a 7 años.",
            ),
            (
                "Does insurance cover it?",
                "¿Lo cubre el seguro?",
                "Cosmetic treatment is generally considered elective, so whitening and veneers are usually not covered. Some restorative work may be partially covered when the dentist determines it is medically necessary. Ask the front desk about your plan.",
                "Lo estético suele considerarse electivo, así que el blanqueamiento y las carillas normalmente no están cubiertos. Parte del trabajo restaurador puede estarlo cuando el dentista lo considera necesario. Pregunte en recepción sobre su plan.",
            ),
        ],
    },
    {
        "slug": "dental-implants",
        "icon": "implant",
        "kind": "surgical",
        "title_en": "Dental implants",
        "title_es": "Implantes dentales",
        "lede_en": "Replacing a missing tooth is a long-term decision. It starts with an exam, X-rays and an honest conversation about whether an implant is right for you.",
        "lede_es": "Reemplazar un diente perdido es una decisión a largo plazo. Empieza con un examen, radiografías y una conversación honesta sobre si un implante es lo correcto para usted.",
        "bullets_en": [
            ("Start with an exam", "Implants need a full picture first: X-rays and an examination of bone and gums."),
            ("What they replace", "A single missing tooth, several missing teeth, or a full arch of teeth that no longer stay in place."),
            ("Done in-house", "Implant services are provided at the Tidwell Road office, alongside crowns and bridges."),
            ("Dr. Perkins is a member of the International Congress of Oral Implantologists", "A professional membership listed on the practice's own site."),
        ],
        "bullets_es": [
            ("Empiece con un examen", "Los implantes requieren un panorama completo: radiografías y examen de hueso y encías."),
            ("Lo que reemplazan", "Un solo diente perdido, varios, o una arcada completa que ya no se mantiene en su lugar."),
            ("Realizado en la oficina", "Los servicios de implantes se ofrecen en la oficina de Tidwell Road, junto con coronas y puentes."),
            ("El Dr. Perkins es miembro del International Congress of Oral Implantologists", "Membresía profesional que figura en el sitio de la clínica."),
        ],
        "faq": [
            (
                "Am I a candidate?",
                "¿Soy candidato?",
                "Only an examination can tell. The dentist looks at bone and gum condition, the health of the neighbouring teeth and your overall health before recommending anything.",
                "Solo un examen puede decirlo. El dentista revisa el hueso y las encías, la salud de los dientes vecinos y su salud general antes de recomendar nada.",
            ),
            (
                "How long do implants last?",
                "¿Cuánto duran los implantes?",
                "The practice describes implants as often a lifelong solution with proper maintenance and regular check-ups, but longevity depends on your own health and hygiene.",
                "La clínica describe los implantes como una solución que a menudo dura toda la vida con buen mantenimiento y revisiones, aunque la durabilidad depende de su salud y de su higiene.",
            ),
            (
                "Can I get a bridge instead?",
                "¿Puedo optar por un puente?",
                "Yes. Bridges are one of the restorative options offered in the office. Your dentist compares the options for your mouth after the exam.",
                "Sí. Los puentes son una de las opciones restauradoras que se ofrecen en la oficina. Su dentista compara las opciones para su boca después del examen.",
            ),
        ],
    },
    {
        "slug": "restorative-dentistry",
        "icon": "crown",
        "kind": "restorative",
        "title_en": "Restorative dentistry",
        "title_es": "Odontología restauradora",
        "lede_en": "Fillings, crowns, bridges, root canals and gum treatment — the work of repairing and protecting what is already there.",
        "lede_es": "Empastes, coronas, puentes, endodoncias y tratamiento de encías: reparar y proteger lo que ya existe.",
        "bullets_en": [
            ("Tooth-colored fillings", "Composite restorations for decay and small damage."),
            ("Crowns and bridges", "Crowns protect the tooth underneath so you keep your natural teeth as long as possible; a bridge is fixed in place and includes two or more crowns."),
            ("Root canal therapy", "For a tooth that hurts or is damaged, with the goal of keeping it."),
            ("Gum and jaw treatment", "Periodontal treatment for gum disease, and care for bruxism and TMJ problems."),
        ],
        "bullets_es": [
            ("Empastes del color del diente", "Restauraciones de composite para caries y daños menores."),
            ("Coronas y puentes", "Las coronas protegen el diente de debajo para conservar el diente natural el mayor tiempo posible; un puente es fijo e incluye dos o más coronas."),
            ("Endodoncia", "Para un diente que duele o está dañado, con el objetivo de conservarlo."),
            ("Encías y ATM", "Tratamiento periodontal para la enfermedad de las encías, y atención para el bruxismo y los problemas de la ATM."),
        ],
        "faq": [
            (
                "What is restorative dentistry?",
                "¿Qué es la odontología restauradora?",
                "It is the repair or replacement of damaged, decayed or missing teeth to bring back normal chewing and appearance: fillings, crowns, bridges, implants, root canal therapy and dentures.",
                "Es la reparación o el reemplazo de dientes dañados, cariados o ausentes para recuperar la masticación y la apariencia normales: empastes, coronas, puentes, implantes, endodoncias y dentaduras.",
            ),
            (
                "Which treatments are offered in the office?",
                "¿Qué tratamientos se hacen en la oficina?",
                "Tooth-colored fillings, crowns and bridges, implants, full or partial dentures, and root canal therapy — all in-house, alongside periodontal care and TMJ treatment.",
                "Empastes del color del diente, coronas y puentes, implantes, dentaduras completas o parciales y endodoncias, todo en la misma oficina, además de cuidado periodontal y tratamiento de ATM.",
            ),
            (
                "How long do crowns and bridges last?",
                "¿Cuánto duran las coronas y los puentes?",
                "With proper hygiene and regular check-ups, the practice notes that crowns and bridges can last 10–15 years or more.",
                "Con buena higiene y revisiones regulares, la clínica señala que coronas y puentes pueden durar de 10 a 15 años o más.",
            ),
        ],
    },
    {
        "slug": "emergency-dentistry",
        "icon": "alert",
        "kind": "urgent",
        "title_en": "Dental emergencies",
        "title_es": "Urgencias dentales",
        "lede_en": "Pain does not wait for a form. When something hurts or breaks, call the office — that is the fastest way in.",
        "lede_es": "El dolor no espera a un formulario. Cuando algo duele o se rompe, llame a la oficina: es la vía más rápida.",
        "bullets_en": [
            ("Call, do not fill in a form", "713-766-5804 during office hours. The team finds the earliest opening that fits what is happening."),
            ("Hours that include evenings and Saturdays", "Tuesday until 7 pm, Saturday 8 am–3 pm — useful when you cannot leave work in the middle of the week."),
            ("Broken tooth or lost filling", "Call as early as you can. The sooner the practice sees it, the more of the tooth can be saved."),
            ("Swelling with fever, or trouble breathing or swallowing", "Go to the emergency room. This is not a situation to wait for a dental appointment."),
        ],
        "bullets_es": [
            ("Llame, no llene un formulario", "713-766-5804 durante el horario. El equipo busca el espacio disponible más cercano."),
            ("Horario con tardes y sábados", "Martes hasta las 7 pm y sábado de 8 am a 3 pm: útil cuando no puede salir del trabajo entre semana."),
            ("Diente roto o empaste caído", "Llame lo antes posible. Entre más pronto lo vea la clínica, más se puede salvar del diente."),
            ("Hinchazón con fiebre, o dificultad para respirar o tragar", "Vaya a la sala de emergencias. Esta no es una situación para esperar una cita dental."),
        ],
        "faq": [
            (
                "What counts as an emergency?",
                "¿Qué se considera una urgencia?",
                "Pain that is keeping you awake or up from work, a broken tooth with a sharp edge, a lost filling or crown, or swelling that is spreading. Call and describe it — the team decides how quickly you need to be seen.",
                "Dolor que no le deja dormir o ir al trabajo, un diente roto con borde filoso, un empaste o corona caídos, o hinchazón que se extiende. Llame y descríbalo: el equipo decide la urgencia.",
            ),
            (
                "Do you take walk-ins?",
                "¿Atienden sin cita?",
                "The practice books by appointment, and same-day openings are sometimes available. Calling is what gets you seen fastest.",
                "La clínica trabaja con citas, y a veces hay espacio el mismo día. Llamar es la forma más rápida de que le atiendan.",
            ),
        ],
    },
]

SERVICE_NAV = [
    ("family-dentistry", "Family dentistry", "Odontología familiar"),
    ("cosmetic-dentistry", "Cosmetic dentistry", "Odontología estética"),
    ("dental-implants", "Dental implants", "Implantes dentales"),
    ("restorative-dentistry", "Restorative dentistry", "Odontología restauradora"),
    ("emergency-dentistry", "Dental emergencies", "Urgencias dentales"),
]

# Canonical (English) values of the "What do you need?" options. The form shows each locale's
# label (copy_*.py "book"/"reasons", same order) but always sends these values, so the
# lead function and the front desk get one language.
REASON_KEYS = [
    "Cleaning & exam",
    "Toothache or pain",
    "Broken tooth",
    "Trouble with a filling",
    "Cosmetic dentistry",
    "Dental implants",
    "Something else",
]

# Areas listed on the practice's own service-areas pages.
AREAS = [
    ("Jersey Village", "Northwest, along US-290", "Al noroeste, por la US-290"),
    ("Cypress", "Further out on US-290", "Más lejos por la US-290"),
    ("Fairbanks / Northwest Crossing", "Right around the office", "Junto a la oficina"),
    ("Greater Inwood", "North of Tidwell", "Al norte de Tidwell"),
    ("Spring Branch", "South, toward I-10", "Al sur, hacia la I-10"),
    ("Oak Forest", "East, toward US-290 and 610", "Al este"),
    ("Garden Oaks", "East", "Al este"),
    ("Independence Heights", "East, near I-45", "Al este, cerca de la I-45"),
    ("Houston Heights", "Southeast", "Al sureste"),
    ("Timbergrove Manor", "Southeast", "Al sureste"),
]

# Real public Google reviews, quoted verbatim (excerpts). Source: the Trustindex widget that mirrors
# the practice's Google profile — https://cdn.trustindex.io/widgets/8a/8a69fdc44bc73925eb86d99db95/content.html
# (checked 2026-11-21: 4.9 from 1,021 Google reviews). Names shown as first name + last initial.
# Spanish pages show a translation and say so.
REVIEWS = [
    {
        "quote_en": "My husband and I have been patients for years at Acadian Family Dental. The staff is extremely friendly and nice.",
        "quote_es": "Mi esposo y yo somos pacientes de Acadian Family Dental desde hace años. El personal es sumamente amable y agradable.",
        "name": "Monica Y.",
        "date_en": "November 2026", "date_es": "noviembre de 2026",
    },
    {
        "quote_en": "I’ve been with this group for over 20 yrs. [T]hey are the best team.",
        "quote_es": "Llevo más de 20 años con este grupo. Son el mejor equipo.",
        "name": "Esther G.",
        "date_en": "November 2026", "date_es": "noviembre de 2026",
    },
    {
        "quote_en": "High quality service. The Acadian group of dental service providers are true professionals providing great care",
        "quote_es": "Servicio de alta calidad. El equipo de Acadian son verdaderos profesionales que brindan una gran atención.",
        "name": "Jim M.",
        "date_en": "October 2026", "date_es": "octubre de 2026",
    },
    {
        "quote_en": "The staff is amazing from the time you walk in to the time you walk out. Dr. Perkins had been my Dentist for over a decade",
        "quote_es": "El personal es increíble desde que uno entra hasta que sale. El Dr. Perkins ha sido mi dentista por más de una década.",
        "name": "Angel J.",
        "date_en": "October 2026", "date_es": "octubre de 2026",
    },
    {
        "quote_en": "Wonderful dental office- I’ve been going there for years. Dr. Perkins is great",
        "quote_es": "Un consultorio dental maravilloso; voy desde hace años. El Dr. Perkins es excelente.",
        "name": "Dorothy F.",
        "date_en": "September 2026", "date_es": "septiembre de 2026",
    },
    {
        "quote_en": "The two Dentists and staff are always polite, prompt and punctual!",
        "quote_es": "¡Los dos dentistas y el personal siempre son amables, rápidos y puntuales!",
        "name": "Bob T.",
        "date_en": "September 2026", "date_es": "septiembre de 2026",
    },
]
for _r in REVIEWS:
    _r["source"] = "Google"
    _r["when_en"] = f"Google review · {_r['date_en']}"
    _r["when_es"] = f"Reseña de Google, traducida · {_r['date_es']}"

# Quotes shown on the doctors' cards (verbatim excerpts).
DOCTOR_QUOTES = {
    "eric-perkins": {
        "en": "The staff is amazing from the time you walk in to the time you walk out. Dr. Perkins had been my Dentist for over a decade",
        "es": "El personal es increíble desde que uno entra hasta que sale. El Dr. Perkins ha sido mi dentista por más de una década.",
        "cite_en": "Angel J., Google review", "cite_es": "Angel J., reseña de Google (traducida)",
    },
    "scott-driver": {
        "en": "I've been a patient of Dr. Driver's for the last 5 or so years. I've never felt so comfortable in a dentist's care!",
        "es": "Soy paciente del Dr. Driver desde hace unos 5 años. ¡Nunca me había sentido tan cómodo con un dentista!",
        "cite_en": "Yelp review", "cite_es": "Reseña de Yelp (traducida)",
    },
}

TECH = [
    ("xray", "Digital X-rays", "Radiografías digitales"),
    ("camera", "Intraoral camera", "Cámara intraoral"),
    ("file", "Electronic health records", "Expedientes electrónicos"),
    ("heart", "Blankets and pillows on request", "Mantas y almohadas a petición"),
]
