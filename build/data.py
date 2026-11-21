# -*- coding: utf-8 -*-
"""
Verified facts about EaDo Family Dental (Houston, TX).

Sources (checked 21 Nov 2026): the practice's own site eadofamilydental.com (home, /houston/, /northside/,
/services/, /contact/, /same-day-appointments-houston/, /teeth-whitening/), public Yelp and Birdeye listings.
Nothing here is invented: no awards, prices or credentials beyond what those pages state.
See research/eado/facts.md for the source of every line.
"""

SITE = {
    "name": "EaDo Family Dental",
    "short": "EaDo",
    "practice_line": "Family Dental",
    # Main office (EaDo). The Northside office is in LOCATIONS.
    "phone_display": "713-474-2334",
    "phone_tel": "+17134742334",
    "email": "office@eadofamilydental.com",
    "street": "2240 Navigation Blvd, Suite 300",
    "city": "Houston",
    "state": "TX",
    "zip": "77003",
    "area": "East Downtown Houston",
    "geo_lat": 29.7521,
    "geo_lng": -95.3437,
    "maps_url": "https://www.google.com/maps/dir/?api=1&destination=EaDo+Family+Dental,+2240+Navigation+Blvd+Suite+300,+Houston,+TX+77003",
    "founded_year": "",
    "rating": "5.0",
    "reviews_count": "900+",
    "reviews_source": "Google",
    "site_url": "https://eado-family-dental.vercel.app",
}

# index 0 = Sunday … 6 = Saturday. None = closed.  (EaDo office, per eadofamilydental.com/contact/)
HOURS = {
    1: ("08:00", "17:00"),
    2: ("08:00", "17:00"),
    3: ("08:00", "17:00"),
    4: ("08:00", "17:00"),
    5: ("08:00", "16:00"),
    6: None,
    0: None,
}

LOCATIONS = [
    {
        "key": "eado",
        "name": "EaDo",
        "name_long_en": "EaDo · East Downtown",
        "name_long_es": "EaDo · East Downtown",
        "street": "2240 Navigation Blvd, Suite 300",
        "zip": "77003",
        "phone_display": "713-474-2334",
        "phone_tel": "+17134742334",
        "email": "office@eadofamilydental.com",
        "maps_url": "https://www.google.com/maps/dir/?api=1&destination=EaDo+Family+Dental,+2240+Navigation+Blvd+Suite+300,+Houston,+TX+77003",
        "hours": {1: ("08:00", "17:00"), 2: ("08:00", "17:00"), 3: ("08:00", "17:00"), 4: ("08:00", "17:00"), 5: ("08:00", "16:00"), 6: None, 0: None},
        "note_en": "The original office, on Navigation Blvd east of downtown.",
        "note_es": "La oficina original, en Navigation Blvd al este del centro.",
    },
    {
        "key": "northside",
        "name": "Northside",
        "name_long_en": "Northside · Pinemont",
        "name_long_es": "Northside · Pinemont",
        "street": "1102 Pinemont Dr, Suite I",
        "zip": "77018",
        "phone_display": "346-348-2442",
        "phone_tel": "+13463482442",
        "email": "northside@eadofamilydental.com",
        "maps_url": "https://www.google.com/maps/dir/?api=1&destination=EaDo+Family+Dental+Northside,+1102+Pinemont+Dr+Suite+I,+Houston,+TX+77018",
        "hours": {1: ("08:00", "17:00"), 2: ("08:00", "17:00"), 3: ("08:00", "17:00"), 4: ("08:00", "17:00"), 5: None, 6: None, 0: None},
        "note_en": "The newer second office on Pinemont Dr, with the same team approach.",
        "note_es": "La segunda oficina, más nueva, en Pinemont Dr, con el mismo enfoque.",
    },
]

HOURS_LABEL = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"}

DOCTORS = [
    {
        "slug": "bianca-williams",
        "name": "Dr. Bianca Williams",
        "first": "Dr. Williams",
        "role_en": "Dentist · EaDo and Northside",
        "role_es": "Dentista · EaDo y Northside",
        "since": "NYU",
        "photo": "/assets/img/dr-williams.webp",
        "photo_sm": "/assets/img/dr-williams-sm.webp",
        "photo_w": 720,
        "photo_h": 960,
        "origin_en": "A former New Yorker from Queens and Long Island, Dr. Williams majored in Biology at Syracuse University and graduated in the top 10% of her class at NYU dental school.",
        "origin_es": "Neoyorquina de Queens y Long Island, la Dra. Williams estudió Biología en Syracuse University y se graduó en el 10% superior de su clase en la escuela de odontología de NYU.",
        "body_en": [
            "Her class rank made her an inductee of the OKU National Dental Honor Society.",
            "She practices alongside her husband, Dr. Ma, and describes private practice in Houston as a personally fulfilling journey.",
            "Patients mention her by name for gentle numbing and for explaining each step of an exam as it happens.",
        ],
        "body_es": [
            "Su promedio la llevó a ingresar en la sociedad de honor odontológica OKU.",
            "Ejerce junto a su esposo, el Dr. Ma, y describe la práctica privada en Houston como un camino muy satisfactorio.",
            "Los pacientes la mencionan por la anestesia suave y por explicar cada paso del examen mientras lo hace.",
        ],
        "edu": [
            ("Bachelor's degree, Biology", "Syracuse University", ""),
            ("Dental school, top 10% of class", "NYU College of Dentistry", ""),
        ],
        "memberships": ["OKU National Dental Honor Society"],
        "npi": "",
    },
    {
        "slug": "john-ma",
        "name": "Dr. John Ma",
        "first": "Dr. Ma",
        "role_en": "Dentist · EaDo and Northside",
        "role_es": "Dentista · EaDo y Northside",
        "since": "Age 4",
        "photo": "/assets/img/dr-ma.webp",
        "photo_sm": "/assets/img/dr-ma-sm.webp",
        "photo_w": 720,
        "photo_h": 960,
        "origin_en": "At his very first dental appointment, aged four, Dr. Ma grinned and announced that he wanted to be a dentist one day too.",
        "origin_es": "En su primera cita con el dentista, a los cuatro años, el Dr. Ma sonrió y anunció que él también quería ser dentista.",
        "body_en": [
            "He graduated from the University of Western Ontario with a focus on medical science and toxicology.",
            "He sees patients at both offices — reviews from the new Northside office mention meeting him there.",
            "Parents single him out for making their kids comfortable in the chair.",
        ],
        "body_es": [
            "Se graduó de la University of Western Ontario con enfoque en ciencias médicas y toxicología.",
            "Atiende en las dos oficinas: las reseñas de la nueva oficina Northside mencionan haberlo conocido allí.",
            "Los padres lo destacan por hacer que sus hijos se sientan cómodos en el sillón.",
        ],
        "edu": [
            ("Bachelor's degree, Medical Science & Toxicology", "University of Western Ontario", ""),
        ],
        "memberships": [],
        "npi": "",
    },
]

TEAM = []

SERVICES = [
    {
        "slug": "family-dentistry",
        "icon": "users",
        "kind": "preventive",
        "title_en": "Family & kids' dentistry",
        "title_es": "Odontología familiar e infantil",
        "lede_en": "Gentle cleanings, exams, sealants and gum care for every age — small changes caught before they become big, expensive ones.",
        "lede_es": "Limpiezas suaves, exámenes, selladores y cuidado de encías para todas las edades: cambios pequeños detectados antes de que se vuelvan grandes y caros.",
        "bullets_en": [
            ("Cleanings and exams", "Gentle cleanings and comprehensive exams, so small changes are treated early."),
            ("Kids' dentistry", "Sealants and kid-friendly visits. The EaDo office has a kids' room with a chalkboard wall."),
            ("Gum (periodontal) care", "Checking and treating the gums is part of looking after the whole mouth."),
            ("New patient visit", "A comprehensive cleaning, a thorough exam and essential digital X-rays."),
        ],
        "bullets_es": [
            ("Limpiezas y exámenes", "Limpiezas suaves y exámenes completos, para tratar a tiempo los cambios pequeños."),
            ("Odontología infantil", "Selladores y visitas pensadas para niños. La oficina EaDo tiene un cuarto infantil con pared de pizarrón."),
            ("Cuidado de encías", "Revisar y tratar las encías es parte de cuidar toda la boca."),
            ("Visita de paciente nuevo", "Limpieza completa, examen detallado y las radiografías digitales necesarias."),
        ],
        "faq": [
            ("Do you see children?", "¿Atienden a niños?",
             "Yes. Family and pediatric dentistry is one of the practice's core services, and parents in the reviews mention their kids feeling comfortable.",
             "Sí. La odontología familiar e infantil es uno de los servicios principales, y los padres en las reseñas cuentan que sus hijos se sienten cómodos."),
            ("What does a first visit include?", "¿Qué incluye la primera visita?",
             "The new patient visit listed by the practice includes a comprehensive cleaning, a thorough exam and essential digital X-rays. Ask the office about the current new patient offer when you book.",
             "La visita de paciente nuevo que anuncia la clínica incluye limpieza completa, examen detallado y radiografías digitales. Pregunte por la oferta vigente al agendar."),
            ("How often should we come in?", "¿Cada cuánto debemos venir?",
             "Most people are seen every six months for a cleaning and check-up. Your dentist sets the right interval for you.",
             "La mayoría viene cada seis meses para limpieza y revisión. Su dentista le indica el intervalo adecuado."),
        ],
    },
    {
        "slug": "cosmetic-dentistry",
        "icon": "spark",
        "kind": "cosmetic",
        "title_en": "Cosmetic dentistry",
        "title_es": "Odontología estética",
        "lede_en": "Whitening, porcelain veneers and bonding for stains, chips, gaps and teeth that have changed with time.",
        "lede_es": "Blanqueamiento, carillas de porcelana y bonding para manchas, despostilladuras, espacios y dientes que cambiaron con el tiempo.",
        "bullets_en": [
            ("Teeth whitening", "Both in-office and take-home whitening are offered."),
            ("Porcelain veneers", "For crooked, misshapen or gapped teeth — results in a few appointments."),
            ("Dental bonding", "Tooth-colored material to repair a chip or reshape an edge."),
            ("A plan, not a pitch", "Your dentist explains the options for your teeth before anything starts."),
        ],
        "bullets_es": [
            ("Blanqueamiento", "Se ofrece blanqueamiento en consultorio y para llevar a casa."),
            ("Carillas de porcelana", "Para dientes torcidos, con forma irregular o con espacios: resultados en pocas citas."),
            ("Bonding dental", "Material del color del diente para reparar una despostilladura o dar forma a un borde."),
            ("Un plan, no una venta", "Su dentista le explica las opciones para sus dientes antes de empezar."),
        ],
        "faq": [
            ("In-office or take-home whitening?", "¿Blanqueamiento en consultorio o en casa?",
             "Both are available. Your dentist will tell you which suits your teeth and your timeline.",
             "Se ofrecen los dos. Su dentista le dirá cuál conviene a sus dientes y a sus plazos."),
            ("How long do veneers take?", "¿Cuánto tardan las carillas?",
             "The practice describes veneer results in a few appointments. The exact plan comes after an exam.",
             "La clínica indica resultados en pocas citas. El plan exacto viene después de un examen."),
            ("Is cosmetic work covered by insurance?", "¿El seguro cubre lo estético?",
             "Often not, but every plan is different. Call the office with your plan details before you decide.",
             "Muchas veces no, pero cada plan es distinto. Llame a la oficina con los datos de su plan antes de decidir."),
        ],
    },
    {
        "slug": "invisalign",
        "icon": "smile",
        "kind": "cosmetic",
        "title_en": "Invisalign clear aligners",
        "title_es": "Alineadores Invisalign",
        "lede_en": "Straighter teeth with clear aligners, for adults and for kids — planned with 3D technology around your own bite.",
        "lede_es": "Dientes más derechos con alineadores transparentes, para adultos y niños, planificados con tecnología 3D según su mordida.",
        "bullets_en": [
            ("For you or your child", "Orthodontic correction with Invisalign is offered for adults and for children."),
            ("Planned in 3D", "Your dentist builds a customized treatment plan with 3D technology."),
            ("Clear and removable", "Aligners are clear plastic trays you take out to eat and brush."),
            ("Questions first", "Bring every question to the consultation — that is what it is for."),
        ],
        "bullets_es": [
            ("Para usted o su hijo", "La corrección con Invisalign se ofrece a adultos y niños."),
            ("Planificado en 3D", "Su dentista arma un plan a medida con tecnología 3D."),
            ("Transparente y removible", "Los alineadores son férulas transparentes que se retiran para comer y cepillarse."),
            ("Primero, las preguntas", "Traiga todas sus preguntas a la consulta: para eso está."),
        ],
        "faq": [
            ("Am I a candidate for Invisalign?", "¿Soy candidato a Invisalign?",
             "Only an exam can tell. Your dentist checks your teeth and bite and tells you honestly whether aligners fit your case.",
             "Solo un examen lo dice. Su dentista revisa sus dientes y su mordida y le dice con honestidad si los alineadores sirven en su caso."),
            ("Can kids use Invisalign?", "¿Los niños pueden usar Invisalign?",
             "The practice offers Invisalign for adults and children. Ask about your child at a consultation.",
             "La clínica ofrece Invisalign para adultos y niños. Pregunte por su hijo en una consulta."),
            ("How long does treatment take?", "¿Cuánto dura el tratamiento?",
             "It depends on the movement needed. Your plan will show the timeline before you commit.",
             "Depende del movimiento necesario. Su plan mostrará el tiempo antes de comprometerse."),
        ],
    },
    {
        "slug": "restorative-dentistry",
        "icon": "crown",
        "kind": "restorative",
        "title_en": "Fillings, crowns & implants",
        "title_es": "Empastes, coronas e implantes",
        "lede_en": "Fillings, crowns, bridges, root canals, implants and dentures — conservative repairs made to last and to look natural.",
        "lede_es": "Empastes, coronas, puentes, endodoncias, implantes y dentaduras: reparaciones conservadoras hechas para durar y verse naturales.",
        "bullets_en": [
            ("Fillings and crowns", "Custom fillings and crowns designed to last and to look natural."),
            ("Root canals", "Modern techniques aim to make a root canal feel much like a regular filling."),
            ("Implants and bridges", "Ways to replace a missing tooth, chosen after an exam."),
            ("Dentures and extractions", "Partial or full dentures, and extractions when a tooth cannot be saved."),
        ],
        "bullets_es": [
            ("Empastes y coronas", "Empastes y coronas a medida, hechos para durar y verse naturales."),
            ("Endodoncias", "Las técnicas modernas buscan que una endodoncia se sienta casi como un empaste."),
            ("Implantes y puentes", "Formas de reemplazar un diente perdido, elegidas después de un examen."),
            ("Dentaduras y extracciones", "Dentaduras parciales o completas, y extracciones cuando un diente no se puede salvar."),
        ],
        "faq": [
            ("Does a root canal hurt?", "¿Duele una endodoncia?",
             "The practice uses modern techniques so a root canal feels comparable to a regular filling. Tell your dentist if you are anxious.",
             "La clínica usa técnicas modernas para que una endodoncia se sienta parecida a un empaste. Avísele a su dentista si está nervioso."),
            ("Implant or bridge?", "¿Implante o puente?",
             "Both replace a missing tooth. Your dentist looks at the bone, the gums and the neighbouring teeth and explains the trade-offs.",
             "Los dos reemplazan un diente perdido. Su dentista revisa el hueso, las encías y los dientes vecinos y le explica las ventajas de cada uno."),
            ("Can I get several fillings in one visit?", "¿Puedo hacerme varios empastes en una visita?",
             "Often, yes — one patient wrote about getting four fillings in a single visit. Your dentist will plan what makes sense.",
             "Muchas veces sí: una paciente contó que se hizo cuatro empastes en una sola visita. Su dentista planificará lo que tenga sentido."),
        ],
    },
    {
        "slug": "same-day-dentistry",
        "icon": "alert",
        "kind": "emergency",
        "title_en": "Same-day & emergency visits",
        "title_es": "Citas el mismo día y urgencias",
        "lede_en": "Toothache, a broken tooth or just a free afternoon? Same-day appointments are accommodated, and walk-ins are welcome.",
        "lede_es": "¿Dolor de muela, un diente roto o simplemente una tarde libre? Hay citas el mismo día y se aceptan pacientes sin cita.",
        "bullets_en": [
            ("Same-day appointments", "If you are in pain, call — the practice accommodates same-day visits."),
            ("Walk-ins welcome", "Walk-ins are welcome; calling ahead helps the team get ready for you."),
            ("Two offices", "Call the office closest to you: EaDo or Northside."),
            ("Know when it is the ER", "Facial swelling with fever, or trouble breathing or swallowing, needs the emergency room."),
        ],
        "bullets_es": [
            ("Citas el mismo día", "Si tiene dolor, llame: la clínica atiende el mismo día."),
            ("Sin cita, bienvenidos", "Se aceptan pacientes sin cita; llamar antes ayuda al equipo a prepararse."),
            ("Dos oficinas", "Llame a la oficina más cercana: EaDo o Northside."),
            ("Cuándo ir a urgencias", "Hinchazón facial con fiebre, o dificultad para respirar o tragar, requiere la sala de emergencias."),
        ],
        "faq": [
            ("Can I just walk in?", "¿Puedo llegar sin cita?",
             "Yes — the practice says walk-ins are welcome. If you can, call ahead so the team can get ready for you.",
             "Sí: la clínica dice que se aceptan pacientes sin cita. Si puede, llame antes para que el equipo se prepare."),
            ("I have a toothache. What should I do?", "Tengo dolor de muela. ¿Qué hago?",
             "Call the office during business hours and describe what is happening. Same-day visits are accommodated.",
             "Llame a la oficina en horario de atención y cuente qué le pasa. Se atienden citas el mismo día."),
            ("When should I go to the emergency room instead?", "¿Cuándo debo ir a urgencias?",
             "Facial swelling with fever, or trouble breathing or swallowing, needs the ER right away.",
             "Hinchazón facial con fiebre, o dificultad para respirar o tragar, requiere urgencias de inmediato."),
        ],
    },
]

SERVICE_NAV = [(s["slug"], s["title_en"], s["title_es"]) for s in SERVICES]

# Canonical English reason values (sent to the lead endpoint whatever the page language).
REASON_KEYS = [
    "Cleaning & exam",
    "Toothache or pain",
    "Broken tooth",
    "Kids' visit",
    "Whitening or veneers",
    "Invisalign",
    "Something else",
]

# Nearby neighborhoods (geography, not separate offices). Third field: which office is closer.
AREAS = [
    ("East Downtown", "Around the EaDo office", "Junto a la oficina EaDo", "eado"),
    ("Second Ward", "East, along Navigation", "Al este, por Navigation", "eado"),
    ("Downtown", "Just west of EaDo", "Al oeste de EaDo", "eado"),
    ("Midtown", "Southwest of downtown", "Al suroeste del centro", "eado"),
    ("Third Ward", "South of EaDo", "Al sur de EaDo", "eado"),
    ("Oak Forest", "Around the Northside office", "Junto a la oficina Northside", "northside"),
    ("Garden Oaks", "East of Northside", "Al este de Northside", "northside"),
    ("Independence Heights", "East, toward I-45", "Al este, hacia la I-45", "northside"),
    ("Acres Homes", "North of Northside", "Al norte de Northside", "northside"),
    ("The Heights", "South of Northside", "Al sur de Northside", "northside"),
]

# Patient testimonials published on the practice's own homepage (eadofamilydental.com), first name +
# last initial as shown there. Long ones are cut and marked with an ellipsis. No dates are published.
# One public Yelp review (Leilani M., 8/25/2025) is added with its date.
_R = [
    ("Leilani M.", "Super impressed with the entire team here at EADO family dental, and I am super hard to impress! Hygienist and dentist were excellent.",
     "Me impresionó todo el equipo de EADO Family Dental, ¡y es difícil impresionarme! La higienista y el dentista fueron excelentes.", "yelp", "August 2025", "agosto de 2025"),
    ("Sasha M.", "Dr. Ma is by far the best dentist I have ever gone to. He's very patient, listens to what you…",
     "El Dr. Ma es, por mucho, el mejor dentista al que he ido. Es muy paciente, escucha lo que usted…", "site", "", ""),
    ("Maria C.", "I loved our visit today! We were in and out in less than 30 minutes! Scheduling was easy…",
     "¡Me encantó la visita de hoy! ¡Entramos y salimos en menos de 30 minutos! Agendar fue fácil…", "site", "", ""),
    ("Daji S.", "Laura was fantastic. I have very sensitive teeth and she made sure I was comfortable throughout…",
     "Laura fue fantástica. Tengo los dientes muy sensibles y se aseguró de que estuviera cómoda todo el tiempo…", "site", "", ""),
    ("Austin R.", "Dr. Ma is an excellent dentist, and he makes my kids feel comfortable.",
     "El Dr. Ma es un dentista excelente y hace que mis hijos se sientan cómodos.", "site", "", ""),
    ("Danielle W.", "I got 4 fillings at EaDo Family Dental today, and it went smoother than any other dentist…",
     "Hoy me hice 4 empastes en EaDo Family Dental y fue más fácil que con cualquier otro dentista…", "site", "", ""),
    ("Hamdi S.", "Wonderful experience every time I visit EADO Family Dental! The staff is extremely kind, welcoming…",
     "¡Una experiencia maravillosa cada vez que visito EADO Family Dental! El personal es muy amable, acogedor…", "site", "", ""),
    ("Whitney C.", "Visited this location for the first time today. I met with Dr. Ma, he was very kind…",
     "Hoy visité esta oficina por primera vez. Me atendió el Dr. Ma y fue muy amable…", "site", "", ""),
    ("Elizabeth M.", "My mom, husband and son have all had work done by Dr. Ma and we have been very pleased…",
     "Mi mamá, mi esposo y mi hijo se han atendido con el Dr. Ma y hemos quedado muy contentos…", "site", "", ""),
    ("Austin B.", "Had a great experience!! My hygienist was very gentle and gave me some great suggestions.",
     "¡¡Tuve una gran experiencia!! Mi higienista fue muy suave y me dio muy buenos consejos.", "site", "", ""),
    ("Lisa S.", "Wow! We had a wonderful experience with Dr. Ma today. We were greeted by the super-friendly staff…",
     "¡Guau! Hoy tuvimos una experiencia maravillosa con el Dr. Ma. Nos recibió un personal súper amable…", "site", "", ""),
    ("Travis W.", "Dr. Ma did was amazing. He was able to fix a bad spot on my front tooth that has been bothering me…",
     "El Dr. Ma estuvo increíble. Pudo arreglar una mancha en mi diente de enfrente que me molestaba…", "site", "", ""),
]
REVIEWS = []
for name, en, es, src, d_en, d_es in _R:
    if src == "yelp":
        when_en, when_es = f"Yelp review · {d_en}", f"Reseña de Yelp, traducida · {d_es}"
    else:
        when_en, when_es = "Published on the practice's website", "Publicada en el sitio de la clínica, traducida"
    REVIEWS.append({"quote_en": en, "quote_es": es, "name": name, "date_en": d_en, "date_es": d_es,
                    "source": "Yelp" if src == "yelp" else "Practice website", "when_en": when_en, "when_es": when_es})

DOCTOR_QUOTES = {
    "john-ma": {
        "en": "Dr. Ma is an excellent dentist, and he makes my kids feel comfortable.",
        "es": "El Dr. Ma es un dentista excelente y hace que mis hijos se sientan cómodos.",
        "cite_en": "Austin R., on the practice's website", "cite_es": "Austin R., en el sitio de la clínica (traducida)",
    },
    "bianca-williams": {
        "en": "I hate getting shots in my mouth but Dr. Williams literally made it painless!",
        "es": "Odio las inyecciones en la boca, ¡pero la Dra. Williams las hizo literalmente indoloras!",
        "cite_en": "Anna H., public review on Birdeye", "cite_es": "Anna H., reseña pública en Birdeye (traducida)",
    },
}

# Comfort amenities listed on the practice's homepage.
TECH = [
    ("coffee", "Hot coffee station", "Estación de café caliente"),
    ("tv", "A TV in every patient room", "Una TV en cada sala"),
    ("headphones", "Complimentary headphones", "Audífonos de cortesía"),
    ("heart", "Warm blankets", "Mantas tibias"),
    ("kids", "Kids' room with a chalkboard wall", "Cuarto infantil con pared de pizarrón"),
]
