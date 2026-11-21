# -*- coding: utf-8 -*-
"""Page builders. Every function returns (path, html)."""
import json

import render as R
from data import (AREAS, DOCTORS, REVIEWS, SERVICES, SERVICE_NAV, SITE, TEAM,
                  TECH)
from render import attr, esc, icon, json_ld, page_hero, sec_areas, sec_anatomy, \
    sec_book, sec_comfort, sec_cta, sec_doctors, sec_faq, sec_planner, \
    sec_quiz, sec_reviews, sec_services, sec_values, shell, url

DEMO_LINK = "https://www.acadiandental.com"


def dentist_ld():
    return json_ld({
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": SITE["name"],
        "telephone": "+1-" + SITE["phone_display"],
        "url": DEMO_LINK,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": SITE["street"],
            "addressLocality": SITE["city"],
            "addressRegion": SITE["state"],
            "postalCode": SITE["zip"],
            "addressCountry": "US",
        },
        "geo": {"@type": "GeoCoordinates",
                "latitude": SITE["geo_lat"], "longitude": SITE["geo_lng"]},
        "aggregateRating": {"@type": "AggregateRating",
                             "ratingValue": SITE["rating"], "reviewCount": "1000"},
        "openingHoursSpecification": [
            {"@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday",
             "opens": "12:00", "closes": "19:00"},
            {"@type": "OpeningHoursSpecification",
             "dayOfWeek": ["Wednesday", "Thursday"], "opens": "08:00", "closes": "17:00"},
            {"@type": "OpeningHoursSpecification", "dayOfWeek": "Friday",
             "opens": "08:00", "closes": "16:30"},
            {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday",
             "opens": "08:00", "closes": "15:00"},
        ],
    })


def breadcrumb_ld(items):
    return json_ld({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": name, "item": item}
            for i, (name, item) in enumerate(items)
        ],
    })


def faq_ld(items):
    return json_ld({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in items
        ],
    })


# --------------------------------------------------------------------------- #


def home(locale, C):
    path = ""
    hero_drawing = R.partial("hero-drawing.svg")
    ba = R.partial("before-after.html")
    if locale == "es":
        ba = (ba.replace(">CHIPPED EDGE<", ">BORDE QUEBRADO<").replace(">STAINS<", ">MANCHAS<")
                .replace(">SHADE B1<", ">TONO B1<"))
    if locale == "es":
        ba = ba.replace("Before and after comparison position", "Posición de la comparación antes y después")
        ba = ba.replace('<span class="ba-label l label-mono">Before</span>',
                        '<span class="ba-label l label-mono">Antes</span>')
        ba = ba.replace('<span class="ba-label r label-mono">After</span>',
                        '<span class="ba-label r label-mono">Después</span>')
        ba = ba.replace(
            "<p class=\"ba-note\">Illustration, not a patient photo. Ask us to see before-and-after photos of real cases.</p>",
            "<p class=\"ba-note\">Ilustración, no es una foto de un paciente. Pídanos ver fotos de antes y después de casos reales.</p>")
    faq_items = [
        ("¿Atienden a niños?" if locale == "es" else "Do you see children?",
         "Yes. Acadian is a family practice — many patients bring the whole family, and plenty have been coming for 20 years or more. Book everyone back-to-back to save a trip."
         if locale == "en" else
         "Sí. Acadian es una clínica familiar: muchos pacientes traen a toda la familia y hay quienes vienen desde hace 20 años o más. Agende a todos uno tras otro y ahorre un viaje."),
        ("Are you open evenings or on Saturdays?"
         if locale == "en" else "¿Abren por la tarde o los sábados?",
         "Tuesday 12–7 pm, Wednesday and Thursday 8 am–5 pm, Friday 8 am–4:30 pm and Saturday 8 am–3 pm. We are closed Sunday and Monday."
         if locale == "en" else
         "Martes de 12 a 7 pm, miércoles y jueves de 8 am a 5 pm, viernes de 8 am a 4:30 pm y sábado de 8 am a 3 pm. Cerramos domingo y lunes."),
        ("I have a toothache. How soon can you see me?"
         if locale == "en" else "Tengo dolor de diente. ¿Qué tan pronto pueden atenderme?",
         "Call 713-766-5804 during office hours and tell us what is going on. We will find the earliest opening we have. If you have facial swelling with fever, or trouble breathing or swallowing, go to the emergency room."
         if locale == "en" else
         "Llame al 713-766-5804 en horario de oficina y cuéntenos qué le pasa. Buscaremos el espacio disponible más cercano. Si tiene hinchazón facial con fiebre, o dificultad para respirar o tragar, vaya a la sala de emergencias."),
        ("Do you place dental implants?"
         if locale == "en" else "¿Colocan implantes dentales?",
         "Yes. We offer dental implants along with crowns and bridges. It starts with an exam and X-rays to check the bone and gums, so we can tell you honestly whether an implant is your best option."
         if locale == "en" else
         "Sí. Ofrecemos implantes dentales junto con coronas y puentes. Empieza con un examen y radiografías para revisar hueso y encías, así le diremos con honestidad si un implante es su mejor opción."),
        ("I get really nervous. What can you do?"
         if locale == "en" else "Me pongo muy nervioso. ¿Qué pueden hacer?",
         "Tell us when you book. We explain each step before we start and go at your pace, and options such as nitrous oxide are available if you want them."
         if locale == "en" else
         "Díganos al agendar. Explicamos cada paso antes de empezar y vamos a su ritmo, y hay opciones como el óxido nitroso si las quiere."),
        ("Do you offer payment plans?"
         if locale == "en" else "¿Ofrecen planes de pago?",
         "Yes — monthly payment plans are available through Cherry, and the practice also offers a CDG membership plan for families that come regularly for cleanings and check-ups."
         if locale == "en" else
         "Sí — hay planes de pago mensuales con Cherry, y la clínica ofrece además un plan de membresía CDG para familias que vienen seguido por limpiezas y revisiones."),
        ("Which areas do you serve?"
         if locale == "en" else "¿Qué zonas atienden?",
         "Patients come from Jersey Village, Cypress, Fairbanks/Northwest Crossing, Greater Inwood, Spring Branch, Oak Forest, Garden Oaks, Independence Heights, the Heights and Timbergrove Manor — and some drive an hour to keep seeing us."
         if locale == "en" else
         "Los pacientes vienen de Jersey Village, Cypress, Fairbanks/Northwest Crossing, Greater Inwood, Spring Branch, Oak Forest, Garden Oaks, Independence Heights, Houston Heights y Timbergrove Manor — y algunos manejan una hora para seguir viéndonos."),
    ]
    hero_alt = ('The Acadian Family Dental team with Dr. Perkins and Dr. Driver' if locale == 'en'
                else 'El equipo de Acadian Family Dental con el Dr. Perkins y el Dr. Driver')
    body = f"""<section id="top" class="hero hero-classic">
        <div class="wrap hero-inner">
          <div class="hero-copy">
            <div class="rise">
              <a href="{url(locale, 'reviews/')}" class="rating-chip">
                <span class="stars-pill" aria-hidden="true">{icon('star') * 5}</span>
                <span>{esc(C['home']['hero_rating'])}</span>
              </a>
              <div class="status-row" data-status></div>
            </div>
            <h1 class="rise" style="--d: 0.1s">{esc(C['home']['hero_h1'])} <em>{esc(C['home']['hero_h1_em'])}</em></h1>
            <p class="hero-sub rise" style="--d: 0.2s">{esc(C['home']['hero_sub'])}</p>
            <div class="btn-row rise" style="--d: 0.3s">
              <a class="btn btn-primary" href="{url(locale, 'book/')}" data-track="hero_book">{esc(C['ui']['cta_book'])} {icon('arrow')}</a>
              <a class="btn btn-outline-dark hero-btn-call" href="tel:{SITE['phone_tel']}" data-track="hero_call">{icon('phone')}{esc(C['ui']['cta_call'])} {esc(SITE['phone_display'])}</a>
            </div>
            <dl class="hero-stats rise" style="--d: 0.4s">
              {''.join(f'<div><dt class="label-mono">{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in C['home']['stats'])}
            </dl>
          </div>
          <figure class="hero-figure rise" style="--d: 0.25s">
            <div class="hero-photo">
              <img src="/assets/img/hero-team.webp" srcset="/assets/img/hero-team-sm.webp 560w, /assets/img/hero-team.webp 945w" sizes="(max-width: 1023px) 100vw, 560px" width="945" height="733" alt="{attr(hero_alt)}" fetchpriority="high" decoding="async" />
              <figcaption class="hero-photo-cap">{esc('Photo: Keith Hall Photo' if locale == 'en' else 'Foto: Keith Hall Photo')}</figcaption>
            </div>
            <div class="hero-card">
              <p class="label-mono eyebrow">{esc(C['home']['hero_card_eyebrow'])}</p>
              <h2>{esc(C['home']['hero_card_h'])}</h2>
              <ul class="check-list">
                {''.join(f'<li><span class="check-ico">{icon("check")}</span>{esc(i)}</li>' for i in C['home']['hero_card_items'])}
              </ul>
              <a class="link-arrow" href="{url(locale, 'book/')}">{esc(C['home']['hero_card_cta'])} {icon('arrow')}</a>
            </div>
          </figure>
        </div>
      </section>

      {sec_values(C, locale)}
      {sec_services(C, locale)}
      {R.marquee(C, locale)}

      <section id="smile" class="section bg-ink" aria-labelledby="ba-h" style="overflow: hidden">
        <div class="glow-soft" style="left: 50%; top: 0; width: 900px; height: 380px; translate: -50% 0" aria-hidden="true"></div>
        <div class="wrap ba-layout">
          <div class="reveal" data-fx="left">
            <p class="label-mono eyebrow">{esc('What cosmetic dentistry can do' if locale == 'en' else 'Lo que puede hacer la odontología estética')}</p>
            <h2 id="ba-h" class="h2" data-words>{esc('Stains, a chip, a gap — and what they become.' if locale == 'en' else 'Manchas, una mella, un hueco: y en qué se convierten.')}</h2>
            <p class="lead">{esc('An illustration of a typical smile makeover: whitening for stains, bonding for a chipped edge, and closing a small gap. Drag the handle to compare.' if locale == 'en' else 'Ilustración de un cambio de sonrisa típico: blanqueamiento para manchas, bonding para un borde quebrado y cierre de un espacio pequeño. Mueva el tirador para comparar.')}</p>
            <dl class="ba-stats">
              <div><dt class="sr-only">Rating</dt><dd><b>4.9★</b><span>{esc('1,000+ Google reviews' if locale == 'en' else 'Más de 1,000 reseñas en Google')}</span></dd></div>
              <div><dt class="sr-only">Experience</dt><dd><b>{'50+ yrs' if locale == 'en' else '50+ años'}</b><span>{esc('Combined clinical experience' if locale == 'en' else 'Experiencia clínica combinada')}</span></dd></div>
              <div><dt class="sr-only">Hours</dt><dd><b>{'Tue–Sat' if locale == 'en' else 'Mar–Sáb'}</b><span>{esc('Including Saturdays' if locale == 'en' else 'Incluyendo sábados')}</span></dd></div>
            </dl>
          </div>
          <div class="reveal" data-fx="right">{ba}</div>
        </div>
      </section>

      {sec_doctors(C, locale)}
      {sec_anatomy(C, locale)}
      {sec_comfort(C, locale)}
      {sec_areas(C, locale)}
      {sec_reviews(C, locale)}
      {sec_quiz(C, locale)}
      {sec_planner(C, locale)}
      {sec_faq(C, locale, faq_items)}
      {sec_book(C, locale)}"""

    meta = {"title": C["home"]["meta_title"], "desc": C["home"]["meta_desc"],
            "path": "", "type": "service"}
    html = shell(C, locale, meta, body, jsonld=json.dumps(
        [{"@context": "https://schema.org", "@type": "Dentist",
          "name": SITE["name"], "telephone": "+1-" + SITE["phone_display"],
          "address": {"@type": "PostalAddress", "streetAddress": SITE["street"],
                      "addressLocality": SITE["city"], "addressRegion": SITE["state"],
                      "postalCode": SITE["zip"], "addressCountry": "US"},
          "geo": {"@type": "GeoCoordinates", "latitude": SITE["geo_lat"],
                  "longitude": SITE["geo_lng"]},
          "aggregateRating": {"@type": "AggregateRating", "ratingValue": SITE["rating"],
                               "reviewCount": "1000"},
          "openingHoursSpecification": [
              {"@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "12:00", "closes": "19:00"},
              {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Wednesday", "Thursday"], "opens": "08:00", "closes": "17:00"},
              {"@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "08:00", "closes": "16:30"},
              {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "15:00"}],
          }, {"@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": [{"@type": "Question", "name": q,
                           "acceptedAnswer": {"@type": "Answer", "text": a}}
                          for q, a in faq_items]}],
        ensure_ascii=False).replace("<", "\\u003c"))
    return "index.html", html


def services_index(locale, C):
    path = "services/"
    cards = []
    for i, s in enumerate(SERVICES):
        cards.append(f"""<a class="service-row reveal" href="{url(locale, 'services/' + s['slug'] + '/')}" style="--rd: {i * 0.06:.2f}s">
              <span class="service-row-ico">{icon(s['icon'])}</span>
              <span class="service-row-body">
                <span class="service-row-title">{esc(s[f'title_{locale}'])}</span>
                <span class="service-row-lede">{esc(s[f'lede_{locale}'])}</span>
              </span>
              <span class="service-row-go">{icon('arrow')}</span>
            </a>""")
    steps = "".join(
        f"""<li class="how-step reveal" style="--rd: {i * 0.08:.2f}s">
              <span class="how-ico">{icon(s[0])}</span>
              <h3>{esc(s[1])}</h3>
              <p>{esc(s[2])}</p>
            </li>"""
        for i, s in enumerate(C["services"]["how"]))
    not_items = "".join(
        f'<li><span class="check-ico">{icon("check")}</span>{esc(x)}</li>'
        for x in C["services"]["not_items"])
    body = f"""{page_hero(C, locale, C['services']['eyebrow'], C['services']['title'], C['services']['lead'],
        [(C['ui']['breadcrumb_home'], url(locale)), (C['services']['eyebrow'], None)], path)}
      <section class="section">
        <div class="wrap">
          <div class="service-rows">{''.join(cards)}</div>
        </div>
      </section>
      <section class="section bg-surface">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc(C['services']['how_eyebrow'])}</p>
            <h2 class="h2" data-words>{esc(C['services']['how_title'])}</h2>
          </div>
          <ol class="how-list">{steps}</ol>
        </div>
      </section>
      <section class="section">
        <div class="wrap wrap-sm">
          <div class="card-soft not-card reveal">
            <h2 class="h3">{esc(C['services']['not_title'])}</h2>
            <ul class="check-list on-light">{not_items}</ul>
            <a class="btn btn-primary" href="{url(locale, 'book/')}" style="margin-top:1.75rem">{esc(C['ui']['cta_book'])} {icon('arrow')}</a>
          </div>
        </div>
      </section>
      {sec_cta(C, locale)}"""
    meta = {"title": C["services"]["meta_title"], "desc": C["services"]["meta_desc"],
            "path": path, "type": "service"}
    html = shell(C, locale, meta, body, jsonld=json.dumps({
        "@context": "https://schema.org", "@type": "CollectionPage",
        "name": C["services"]["title"], "inLanguage": locale,
    }, ensure_ascii=False))
    return path + "index.html", html


def service_page(locale, C, slug):
    s = next(x for x in SERVICES if x["slug"] == slug)
    path = f"services/{slug}/"
    title = s[f"title_{locale}"]
    lede = s[f"lede_{locale}"]
    bullets = "".join(
        f"""<li class="reveal"><span class="value-ico">{icon('check')}</span>
              <div><h3>{esc(b[0])}</h3><p>{esc(b[1])}</p></div></li>"""
        for b in s[f"bullets_{locale}"])
    faq_items = []
    for q_en, q_es, a_en, a_es in s["faq"]:
        faq_items.append((q_en if locale == "en" else q_es,
                          a_en if locale == "en" else a_es))
    related = [x for x in SERVICES if x["slug"] != slug][:4]
    related_html = "".join(
        f"""<a class="service-row reveal" href="{url(locale, 'services/' + x['slug'] + '/')}">
              <span class="service-row-ico">{icon(x['icon'])}</span>
              <span class="service-row-body"><span class="service-row-title">{esc(x[f'title_{locale}'])}</span></span>
              <span class="service-row-go">{icon('arrow')}</span>
            </a>"""
        for x in related)
    steps = "".join(
        f"""<li class="how-step reveal" style="--rd: {i * 0.08:.2f}s">
              <span class="how-ico">{icon(st[0])}</span>
              <div><h3>{esc(st[1])}</h3>
              <p>{esc(st[2])}</p></div>
            </li>"""
        for i, st in enumerate(C["services"]["how"]))
    office_alt = ("The Acadian Family Dental office on W. Tidwell Rd" if locale == "en"
                  else "La oficina de Acadian Family Dental en W. Tidwell Rd")
    body = f"""{page_hero(C, locale, C['services']['eyebrow'], title, lede,
        [(C['ui']['breadcrumb_home'], url(locale)), (C['services']['eyebrow'], url(locale, 'services/')), (title, None)], path,
        art=R.svc_art(slug))}
      <section class="section">
        <div class="wrap">
          <ul class="detail-list detail-list-2 stagger">{bullets}</ul>
          <div class="btn-row reveal" style="margin-top:2rem">
            <a class="btn btn-primary" href="{url(locale, 'book/')}">{esc(C['ui']['cta_book'])} {icon('arrow')}</a>
            <a class="btn btn-outline-dark" href="tel:{SITE['phone_tel']}">{icon('phone')}{esc(SITE['phone_display'])}</a>
          </div>
        </div>
      </section>
      {sec_anatomy(C, locale) if slug == 'dental-implants' else ''}
      <section class="section bg-surface">
        <div class="wrap visit-band">
          <figure class="visit-photo reveal" data-fx="left">
            <img src="/assets/img/office.webp" srcset="/assets/img/office-sm.webp 480w, /assets/img/office.webp 800w" sizes="(max-width: 900px) 100vw, 520px" width="800" height="833" alt="{attr(office_alt)}" loading="lazy" decoding="async" />
            <figcaption class="label-mono">7490 W. Tidwell Rd · Houston</figcaption>
          </figure>
          <div class="reveal" data-fx="right">
            <p class="label-mono eyebrow">{esc(C['services']['how_eyebrow'])}</p>
            <h2 class="h2" data-words>{esc(C['services']['how_title'])}</h2>
            <ol class="how-list how-list-v">{steps}</ol>
          </div>
        </div>
      </section>
      {sec_faq(C, locale, faq_items, 'faq')}
      <section class="section bg-surface">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc(C['ui']['cta_more'])}</p>
            <h2 class="h2">{esc('Other services at Acadian' if locale == 'en' else 'Otros servicios en Acadian')}</h2>
          </div>
          <div class="service-rows" style="margin-top:2rem">{related_html}</div>
        </div>
      </section>
      {sec_cta(C, locale)}"""
    meta = {"title": f"{title} {'in Northwest Houston' if locale == 'en' else 'en el noroeste de Houston'} | {SITE['name']}",
            "desc": lede, "path": path, "type": "service"}
    html = shell(C, locale, meta, body, jsonld=json.dumps({
        "@context": "https://schema.org", "@type": "MedicalWebPage",
        "name": title, "inLanguage": locale,
        "about": {"@type": "MedicalBusiness", "name": SITE["name"]},
    }, ensure_ascii=False))
    return path + "index.html", html


def dentists_page(locale, C):
    path = "dentists/"
    blocks = []
    for i, d in enumerate(DOCTORS):
        role = d["role_en"] if locale == "en" else d["role_es"]
        body_paras = "".join(f"<p>{esc(p)}</p>" for p in d[f"body_{locale}"])
        edu = "".join(
            f"""<li>{f'<span class="label-mono">{esc(y)}</span>' if y else ''}<b>{esc(DEGREES_ES.get(deg, deg) if locale == 'es' else deg)}</b><span>{esc(inst)}</span></li>"""
            for deg, inst, y in d["edu"])
        memberships = ("".join(f'<li><span class="check-ico">{icon("check")}</span>{esc(m)}</li>'
                               for m in d["memberships"]) if d["memberships"] else "")
        blocks.append(f"""<article class="doc-block reveal" id="{attr_slug(d['slug'])}">
          <div class="doc-block-photo">
            <img src="{d['photo']}" srcset="{d['photo_sm']} 420w, {d['photo']} 720w" sizes="(max-width: 800px) 100vw, 460px" width="{d['photo_w']}" height="{d['photo_h']}" alt="{attr(d['name'])}" loading="lazy" decoding="async" />
          </div>
          <div class="doc-block-body">
            <p class="label-mono eyebrow">{esc(role)}</p>
            <h2>{esc(d['name'])}</h2>
            <p class="lead">{esc(d[f'origin_{locale}'])}</p>
            {body_paras}
            <div class="doc-facts">
              <div>
                <h3 class="label-mono">{esc('Education' if locale == 'en' else 'Formación')}</h3>
                <ul class="fact-list">{edu}</ul>
              </div>
              {('<div><h3 class="label-mono">' + esc('Memberships' if locale == 'en' else 'Membresías') + '</h3><ul class="check-list on-light">' + memberships + '</ul></div>') if memberships else ''}
            </div>
            <div class="btn-row">
              <a class="btn btn-primary" href="{url(locale, 'book/')}">{esc(C['dentists']['cta'])} {icon('arrow')}</a>
              <a class="btn btn-outline-dark" href="tel:{SITE['phone_tel']}">{icon('phone')}{esc(SITE['phone_display'])}</a>
            </div>
          </div>
        </article>""")
    team_cards = "".join(
        f"""<article class="team-card reveal">
            {('<div class="team-photo"><img src="' + t['photo'] + '" srcset="' + t['photo_sm'] + ' 360w, ' + t['photo'] + ' 550w" sizes="(max-width: 700px) 45vw, 220px" width="550" height="800" alt="' + esc(t['name']) + '" loading="lazy" decoding="async" /></div>') if t['photo'] else ('<div class="team-photo team-photo-mono blueprint-grid" aria-hidden="true"><span class="team-mono">' + esc(t['name'][0]) + '</span><span class="team-since label-mono">' + esc('Since 1993' if locale == 'en' else 'Desde 1993') + '</span></div>')}
            <h3>{esc(t['name'])}</h3>
            <p class="label-mono">{esc(t['role_en'] if locale == 'en' else t['role_es'])}</p>
            <p>{esc(t[f'bio_{locale}'])}</p>
          </article>"""
        for t in TEAM)
    tech_cards = "".join(
        f"""<li class="tech-card reveal"><span class="tech-ico">{icon(ico)}</span>
              <b>{esc(name_en if locale == 'en' else name_es)}</b></li>"""
        for ico, name_en, name_es in TECH)
    body = f"""{page_hero(C, locale, C['dentists']['eyebrow'], C['dentists']['title'], C['dentists']['lead'],
        [(C['ui']['breadcrumb_home'], url(locale)), (C['dentists']['eyebrow'], None)], path)}
      <section class="section">
        <div class="wrap">
          {''.join(blocks)}
        </div>
      </section>
      <section class="section bg-surface blueprint-paper">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc(C['dentists']['tech_eyebrow'])}</p>
            <h2 class="h2" data-words>{esc(C['dentists']['tech_title'])}</h2>
            <p class="lead">{esc(C['dentists']['tech_lead'])}</p>
          </div>
          <ul class="tech-grid stagger">{tech_cards}</ul>
          <div class="card-soft comfort-note reveal" style="margin-top:2rem">
            <h3>{esc(C['dentists']['comfort_title'])}</h3>
            <p>{esc(C['dentists']['comfort_body'])}</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc('Hygiene · assisting · front desk' if locale == 'en' else 'Higiene · asistencia · recepción')}</p>
            <h2 class="h2">{esc(C['dentists']['team_title'])}</h2>
            <p class="lead">{esc(C['dentists']['team_lead'])}</p>
          </div>
          <figure class="team-photo-wide reveal">
            <img src="/assets/img/team.webp" srcset="/assets/img/team-sm.webp 600w, /assets/img/team.webp 1100w" sizes="(max-width: 1200px) 100vw, 1150px" width="1100" height="733" alt="{attr('The Acadian Family Dental team with Dr. Perkins and Dr. Driver' if locale == 'en' else 'El equipo de Acadian Family Dental con el Dr. Perkins y el Dr. Driver')}" loading="lazy" decoding="async" />
            <figcaption class="label-mono">{esc('The Acadian team · Photo: Keith Hall Photo' if locale == 'en' else 'El equipo de Acadian · Foto: Keith Hall Photo')}</figcaption>
          </figure>
          <div class="team-grid stagger">{team_cards}</div>
        </div>
      </section>
      {sec_cta(C, locale)}"""
    meta = {"title": C["dentists"]["meta_title"], "desc": C["dentists"]["meta_desc"],
            "path": path, "type": "service"}
    html = shell(C, locale, meta, body)
    return path + "index.html", html


def attr_slug(s):
    return s


def payment_page(locale, C):
    path = "comfort-and-payment/"
    ins_items = "".join(
        f'<li><span class="check-ico">{icon("check")}</span>{esc(x)}</li>'
        for x in C["payment"]["insurance_items"])
    faq_items = [(q, a) for q, a in C["payment"]["faq"]]
    pay_cards = f"""<div class="pay-cards stagger">
            <article class="card-soft pay-detail reveal">
              <span class="pay-ico">{icon('card')}</span>
              <h3>{esc(C['payment']['insurance_title'])}</h3>
              <p>{esc(C['payment']['insurance_body'])}</p>
              <ul class="check-list on-light">{ins_items}</ul>
            </article>
            <article class="card-soft pay-detail reveal" style="--rd:.08s">
              <span class="pay-ico">{icon('gift')}</span>
              <h3>{esc(C['payment']['cherry_title'])}</h3>
              <p>{esc(C['payment']['cherry_body'])}</p>
              <a class="link-arrow" href="tel:{SITE['phone_tel']}">{esc('Ask the front desk about Cherry' if locale == 'en' else 'Pregunte en recepción por Cherry')} {icon('arrow')}</a>
            </article>
            <article class="card-soft pay-detail reveal" style="--rd:.16s">
              <span class="pay-ico">{icon('heart')}</span>
              <h3>{esc(C['payment']['cdg_title'])}</h3>
              <p>{esc(C['payment']['cdg_body'])}</p>
            </article>
          </div>"""
    COMFORT_TILES = {
        "en": [("01", "Say it when you book", "The team plans the visit around it."),
               ("02", "Blankets and pillows", "Ask for them at any point."),
               ("03", "Each step explained", "Before it starts, not after."),
               ("04", "Nitrous oxide or guided sedation", "Used when a patient needs it.")],
        "es": [("01", "Dígalo al agendar", "El equipo planea la cita con eso en cuenta."),
               ("02", "Mantas y almohadas", "Pídalas en cualquier momento."),
               ("03", "Cada paso explicado", "Antes de empezar, no después."),
               ("04", "Óxido nitroso o sedación guiada", "Cuando el paciente lo necesita.")],
    }
    comfort_tiles = "".join(
        f'<li class="comfort-tile"><span class="mono">{n}</span><b>{esc(t)}</b><small>{esc(d)}</small></li>'
        for n, t, d in COMFORT_TILES[locale])
    body = f"""{page_hero(C, locale, C['payment']['eyebrow'], C['payment']['title'], C['payment']['lead'],
        [(C['ui']['breadcrumb_home'], url(locale)), (C['payment']['eyebrow'], None)], path)}
      <section class="section">
        <div class="wrap">{pay_cards}</div>
      </section>
      <section class="section bg-ink blueprint-grid">
        <div class="wrap">
          <div class="glass glass-dark comfort-wide reveal" data-glass>
            <div class="comfort-wide-txt">
              <span class="ico">{icon('wind')}</span>
              <h2>{esc(C['payment']['comfort_title'])}</h2>
              <p>{esc(C['payment']['comfort_body'])}</p>
              <div class="btn-row">
                <a class="btn btn-primary" href="{url(locale, 'book/')}">{esc(C['ui']['cta_book'])}</a>
                <a class="btn btn-outline-light" href="tel:{SITE['phone_tel']}">{icon('phone')}{esc(SITE['phone_display'])}</a>
              </div>
            </div>
            <ul class="comfort-tiles">{comfort_tiles}</ul>
          </div>
        </div>
      </section>
      {sec_faq(C, locale, faq_items, 'faq')}
      {sec_cta(C, locale, title=C['payment']['cta'])}"""
    meta = {"title": C["payment"]["meta_title"], "desc": C["payment"]["meta_desc"],
            "path": path, "type": "service"}
    html = shell(C, locale, meta, body, jsonld=json.dumps({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [{"@type": "Question", "name": q,
                        "acceptedAnswer": {"@type": "Answer", "text": a}}
                       for q, a in faq_items]}, ensure_ascii=False))
    return path + "index.html", html


def smile_page(locale, C):
    path = "smile-check/"
    body = f"""{page_hero(C, locale, C['smile']['eyebrow'], C['smile']['title'], C['smile']['lead'],
        [(C['ui']['breadcrumb_home'], url(locale)), (C['smile']['eyebrow'], None)], path)}
      <section class="section">
        <div class="wrap wrap-sm">
          <div class="reveal">
            <div class="glass glass-dark quiz" tabindex="-1" data-quiz aria-live="polite"></div>
            <p class="muted" style="margin-top:1.25rem;font-size:.92rem">{esc(C['smile']['disclaimer'])}</p>
          </div>
        </div>
      </section>
      {sec_cta(C, locale)}"""
    meta = {"title": C["smile"]["meta_title"], "desc": C["smile"]["meta_desc"],
            "path": path, "type": "service"}
    html = shell(C, locale, meta, body)
    return path + "index.html", html


def reviews_page(locale, C):
    path = "reviews/"
    cards = []
    for i, r in enumerate(REVIEWS):
        cards.append(f"""<li class="card-soft review reveal" style="--rd: {i * 0.05:.2f}s">{icon('quote', 'q')}
              <div class="stars" role="img" aria-label="5 stars">{icon('star') * 5}</div>
              <blockquote>“{esc(r[f'quote_{locale}'])}”</blockquote>
              <footer><span class="av">{esc(r['name'][0])}</span><div><b>{esc(r['name'])}</b><small>{esc(r[f'when_{locale}'])}</small></div></footer>
            </li>""")
    body = f"""{page_hero(C, locale, C['reviews']['eyebrow'], C['reviews']['title'], C['reviews']['lead'],
        [(C['ui']['breadcrumb_home'], url(locale)), (C['reviews']['eyebrow'], None)], path)}
      <section class="section">
        <div class="wrap">
          <div class="glass glass-light score reveal">
            <b class="tabular">{esc(SITE['rating'])}</b>
            <div>
              <div class="stars" role="img" aria-label="5 stars">{icon('star') * 5}</div>
              <p style="margin-top: 0.4rem">{esc('Based on 1,000+ Google reviews' if locale == 'en' else 'Sobre la base de más de 1,000 reseñas en Google')}</p>
              <small>{esc('Verified November 2026' if locale == 'en' else 'Verificado en noviembre de 2026')}</small>
            </div>
          </div>
          <ul class="reviews">{''.join(cards)}</ul>
          <div class="card-soft not-card reveal" style="margin-top:2.5rem">
            <h3>{esc('About these quotes' if locale == 'en' else 'Sobre estas citas')}</h3>
            <p>{esc(C['reviews']['note'])}</p>
          </div>
        </div>
      </section>
      {sec_cta(C, locale)}"""
    meta = {"title": C["reviews"]["meta_title"], "desc": C["reviews"]["meta_desc"],
            "path": path, "type": "service"}
    html = shell(C, locale, meta, body)
    return path + "index.html", html


def areas_page(locale, C):
    path = "areas/"
    faq_items = [(q, a) for q, a in C["areas"]["faq"]]
    body = f"""{page_hero(C, locale, C['areas']['eyebrow'], C['areas']['title'], C['areas']['lead'],
        [(C['ui']['breadcrumb_home'], url(locale)), (C['areas']['eyebrow'], None)], path)}
      {sec_areas(C, locale)}
      {sec_faq(C, locale, faq_items, 'faq')}
      {sec_cta(C, locale, title=C['areas']['cta'])}"""
    meta = {"title": C["areas"]["meta_title"], "desc": C["areas"]["meta_desc"],
            "path": path, "type": "service"}
    html = shell(C, locale, meta, body, jsonld=json.dumps({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [{"@type": "Question", "name": q,
                        "acceptedAnswer": {"@type": "Answer", "text": a}}
                       for q, a in faq_items]}, ensure_ascii=False))
    return path + "index.html", html


def visit_page(locale, C):
    path = "visit/"
    dir_items = "".join(
        f'<li><span class="check-ico">{icon("pin")}</span>{esc(x)}</li>'
        for x in C["visit"]["dir_items"])
    bring_items = "".join(
        f'<li><span class="check-ico">{icon("check")}</span>{esc(x)}</li>'
        for x in C["visit"]["bring_items"])
    faq_items = [(q, a) for q, a in C["visit"]["faq"]]
    office_alt = ("The Acadian Family Dental office on W. Tidwell Rd" if locale == "en"
                  else "La oficina de Acadian Family Dental en W. Tidwell Rd")
    office_img = (f'<img class="page-hero-photo" src="/assets/img/office.webp" srcset="/assets/img/office-sm.webp 480w, /assets/img/office.webp 800w" '
                  f'sizes="(max-width: 900px) 100vw, 460px" width="800" height="833" alt="{attr(office_alt)}" decoding="async" />')
    body = f"""{page_hero(C, locale, C['visit']['eyebrow'], C['visit']['title'], C['visit']['lead'],
        [(C['ui']['breadcrumb_home'], url(locale)), (C['visit']['eyebrow'], None)], path, art=office_img)}
      <section class="section">
        <div class="wrap">
          <div class="visit-grid">
            <div class="glass glass-dark map-card reveal" data-fx="left">
              {R.map_svg(locale)}
              <div class="map-legend"><span class="chip"><span class="dot is-on"></span>{esc('Our office · 7490 W Tidwell Rd' if locale == 'en' else 'Nuestra oficina · 7490 W Tidwell Rd')}</span></div>
              <div class="btn-row" style="margin-top:1.25rem">
                <a class="btn btn-primary" href="{SITE['maps_url']}" target="_blank" rel="noopener">{icon('nav')}{esc(C['ui']['cta_directions'])}</a>
                <a class="btn btn-outline-light" href="tel:{SITE['phone_tel']}">{icon('phone')}{esc(SITE['phone_display'])}</a>
              </div>
            </div>
            <div class="reveal" data-fx="right">
              <div class="glass glass-dark hours" data-glass>
                <h3><span>{esc(C['ui']['hours_title'])}</span><span class="chip" data-hours-chip><span class="dot"></span>…</span></h3>
                <table data-hours>
                  <tr data-d="2"><td>{esc('Tuesday' if locale == 'en' else 'Martes')}</td><td>12:00 – 7:00 pm</td></tr>
                  <tr data-d="3"><td>{esc('Wednesday' if locale == 'en' else 'Miércoles')}</td><td>8:00 am – 5:00 pm</td></tr>
                  <tr data-d="4"><td>{esc('Thursday' if locale == 'en' else 'Jueves')}</td><td>8:00 am – 5:00 pm</td></tr>
                  <tr data-d="5"><td>{esc('Friday' if locale == 'en' else 'Viernes')}</td><td>8:00 am – 4:30 pm</td></tr>
                  <tr data-d="6"><td>{esc('Saturday' if locale == 'en' else 'Sábado')}</td><td>8:00 am – 3:00 pm</td></tr>
                  <tr data-d="0" class="closed"><td>{esc('Sunday' if locale == 'en' else 'Domingo')}</td><td>{esc('Closed' if locale == 'en' else 'Cerrado')}</td></tr>
                  <tr data-d="1" class="closed"><td>{esc('Monday' if locale == 'en' else 'Lunes')}</td><td>{esc('Closed' if locale == 'en' else 'Cerrado')}</td></tr>
                </table>
                <p class="hours-note">{esc(C['ui']['hours_note'])}</p>
              </div>
              <div class="info-col">
                <div class="info-block reveal">
                  <h3>{esc(C['visit']['dir_title'])}</h3>
                  <ul class="check-list">{dir_items}</ul>
                </div>
                <div class="info-block reveal">
                  <h3>{esc(C['visit']['bring_title'])}</h3>
                  <ul class="check-list on-light">{bring_items}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {sec_faq(C, locale, faq_items, 'faq')}
      {sec_cta(C, locale, title=C['visit']['cta'])}"""
    meta = {"title": C["visit"]["meta_title"], "desc": C["visit"]["meta_desc"],
            "path": path, "type": "service"}
    html = shell(C, locale, meta, body, jsonld=json.dumps({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [{"@type": "Question", "name": q,
                        "acceptedAnswer": {"@type": "Answer", "text": a}}
                       for q, a in faq_items]}, ensure_ascii=False))
    return path + "index.html", html


def book_page(locale, C):
    path = "book/"
    body = f"""{page_hero(C, locale, C['book']['eyebrow'], C['book']['title'], C['book']['lead'],
        [(C['ui']['breadcrumb_home'], url(locale)), (C['book']['eyebrow'], None)], path)}
      {sec_book(C, locale, show_intro=False)}
      <section class="section bg-surface">
        <div class="wrap wrap-sm">
          <div class="card-soft not-card reveal">
            <h3>{esc('Why we ask for so little' if locale == 'en' else 'Por qué pedimos tan pocos datos')}</h3>
            <p>{esc(C['book']['privacy_note'])}</p>
            <p class="muted">{esc('The practice keeps your medical record in its own system. This form only tells the front desk how to reach you.' if locale == 'en' else 'La clínica guarda su expediente médico en su propio sistema. Este formulario solo le dice a recepción cómo contactarle.')}</p>
          </div>
        </div>
      </section>"""
    meta = {"title": C["book"]["meta_title"], "desc": C["book"]["meta_desc"],
            "path": path, "type": "service"}
    html = shell(C, locale, meta, body)
    return path + "index.html", html


def legal_page(locale, C, kind, path, title, paragraphs):
    crumbs = [(C["ui"]["breadcrumb_home"], url(locale)), (title, None)]
    paras = "".join(f"<p>{esc(p)}</p>" for p in paragraphs)
    body = f"""{page_hero(C, locale, C['ui']['footer_legal'], title,
        C['legal'][kind + '_note'] if kind + '_note' in C['legal'] else '', crumbs, path)}
      <section class="section">
        <div class="wrap wrap-sm">
          <div class="legal-prose reveal">{paras}</div>
        </div>
      </section>"""
    meta = {"title": f"{title} | {SITE['name']}",
            "desc": C["legal"].get(kind + "_note", ""), "path": path, "type": "service"}
    html = shell(C, locale, meta, body)
    return path + "index.html", html


LEGAL_EXTRA = {
    "en": {
        "privacy": [
            "This concept site keeps nothing about you in the browser beyond small conveniences, such as remembering that you closed the demo notice. If you submit an appointment request, the details you type (name, phone, optional email, the kind of visit and the days you picked) are sent to the developer of this concept so that a real request can be demonstrated.",
            "No health information is requested, and none should be entered: the optional note is for scheduling context only. Your medical history is discussed with your dentist at the appointment.",
            "The practice's own website is acadiandental.com. Its privacy policy, not this page, applies to the practice.",
        ],
        "accessibility": [
            "The site is built to work from 320 pixels wide and up, to be usable with a keyboard alone, to respect your device's reduced-motion setting, and to give every form field a visible label. Colors were chosen to meet WCAG AA contrast.",
            "If something does not work for you, call the practice at 713-766-5804 — a phone call is faster than a form.",
        ],
        "disclaimer": [
            "Practice information (name, address, telephone number, opening hours, the names and training of the dentists, services, insurance and payment options) was taken from the practice's own public website and public listings in November 2026.",
            "The practice's real website is acadiandental.com. If anything here differs from what the practice tells you, the practice is right.",
        ],
    },
    "es": {
        "privacy": [
            "Este sitio conceptual no guarda nada sobre usted en el navegador, salvo pequeñas comodidades, como recordar que cerró el aviso de demostración. Si envía una solicitud de cita, los datos que escribe (nombre, teléfono, correo opcional, el tipo de visita y los días elegidos) llegan al desarrollador de este concepto para demostrar cómo funciona una solicitud real.",
            "No se piden datos de salud y no debe escribirlos: la nota opcional es solo para detalles de agenda. Su historial médico se habla con su dentista en la cita.",
            "El sitio propio de la clínica es acadiandental.com. A la clínica se le aplica su propia política de privacidad, no esta página.",
        ],
        "accessibility": [
            "El sitio está hecho para funcionar desde 320 píxeles de ancho, para usarse solo con el teclado, para respetar la opción de movimiento reducido de su dispositivo y para que cada campo del formulario tenga una etiqueta visible. Los colores se eligieron para cumplir el contraste WCAG AA.",
            "Si algo no le funciona, llame a la clínica al 713-766-5804: una llamada es más rápida que un formulario.",
        ],
        "disclaimer": [
            "La información de la clínica (nombre, dirección, teléfono, horario, nombres y formación de los dentistas, servicios, seguros y formas de pago) se tomó del sitio web público de la clínica y de listados públicos en noviembre de 2026.",
            "El sitio real de la clínica es acadiandental.com. Si algo aquí no coincide con lo que le diga la clínica, la clínica tiene la razón.",
        ],
    },
}


DEGREES_ES = {
    "Bachelor of Science, Biochemistry": "Licenciatura en Bioquímica (B.S.)",
    "Bachelor's degree": "Licenciatura",
    "Doctor of Dental Surgery": "Doctor en Cirugía Dental (DDS)",
}


def legal_pages(locale, C):
    X = LEGAL_EXTRA[locale]
    return [
        legal_page(locale, C, "privacy", "privacy/", C["legal"]["privacy_title"],
                   [C["legal"]["privacy_note"], *X["privacy"], C["legal"]["privacy_updated"]]),
        legal_page(locale, C, "accessibility", "accessibility/", C["legal"]["accessibility_title"],
                   [C["legal"]["accessibility_note"], *X["accessibility"]]),
        legal_page(locale, C, "disclaimer", "disclaimer/", C["legal"]["disclaimer_title"],
                   [C["legal"]["disclaimer_note"], *X["disclaimer"]]),
    ]


def not_found(locale, C):
    path = "404.html"
    body = f"""<section class="page-hero page-hero-404">
        <div class="wrap">
          <p class="label-mono eyebrow">404</p>
          <h1 class="page-h1">{esc('This page does not exist.' if locale == 'en' else 'Esta página no existe.')}</h1>
          <p class="lead page-lead">{esc('The link may be old. Here is where you can go instead.' if locale == 'en' else 'Puede que el enlace esté viejo. Esto es lo que puede consultar.')}</p>
          <div class="btn-row" style="margin-top:1.5rem">
            <a class="btn btn-primary" href="{url(locale)}">{esc(C['ui']['back_home'])}</a>
            <a class="btn btn-outline-dark" href="tel:{SITE['phone_tel']}">{icon('phone')}{esc(SITE['phone_display'])}</a>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="wrap">
          <div class="service-rows">
            <a class="service-row" href="{url(locale, 'services/')}"><span class="service-row-ico">{icon('spark')}</span><span class="service-row-body"><span class="service-row-title">{esc(C['services']['eyebrow'])}</span></span><span class="service-row-go">{icon('arrow')}</span></a>
            <a class="service-row" href="{url(locale, 'dentists/')}"><span class="service-row-ico">{icon('users')}</span><span class="service-row-body"><span class="service-row-title">{esc(C['dentists']['eyebrow'])}</span></span><span class="service-row-go">{icon('arrow')}</span></a>
            <a class="service-row" href="{url(locale, 'visit/')}"><span class="service-row-ico">{icon('pin')}</span><span class="service-row-body"><span class="service-row-title">{esc(C['visit']['eyebrow'])}</span></span><span class="service-row-go">{icon('arrow')}</span></a>
          </div>
        </div>
      </section>"""
    meta = {"title": "404 | " + SITE["name"], "desc": "Page not found." if locale == "en" else "Página no encontrada.",
            "path": "404.html", "type": "service"}
    html = shell(C, locale, meta, body)
    return "404.html", html


def build_all(locale, C):
    pages = [home(locale, C), services_index(locale, C)]
    for s in SERVICES:
        pages.append(service_page(locale, C, s["slug"]))
    pages += [
        dentists_page(locale, C),
        payment_page(locale, C),
        smile_page(locale, C),
        reviews_page(locale, C),
        areas_page(locale, C),
        visit_page(locale, C),
        book_page(locale, C),
    ]
    pages += legal_pages(locale, C)
    pages.append(not_found(locale, C))
    return pages
