# -*- coding: utf-8 -*-
"""HTML rendering for the EaDo Family Dental concept site.

Pure stdlib. Every page of every locale is produced here so that navigation,
metadata, hreflang and the demo notice can never drift apart.
"""
import io
import json
import os

from data import (AREAS, LOCATIONS, TECH, REASON_KEYS, DOCTOR_QUOTES, DOCTORS, HOURS, HOURS_LABEL, REVIEWS, SERVICES,
                  SERVICE_NAV, SITE, TEAM, TECH)

HERE = os.path.dirname(os.path.abspath(__file__))
PARTIALS = os.path.join(HERE, "partials")

# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #


def esc(s):
    return (str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace('"', "&quot;"))


def attr(s):
    return esc(s)


def partial(name):
    with io.open(os.path.join(PARTIALS, name), encoding="utf-8") as fh:
        return fh.read()


def url(locale, path=""):
    """Absolute site path for a page path (without leading slash)."""
    clean = path.strip("/")
    if locale == "es":
        return "/es/" + clean if clean else "/es/"
    return "/" + clean if clean else "/"


def other_url(locale, path=""):
    clean = path.strip("/")
    if locale == "es":
        return "/" + clean if clean else "/"
    return "/es/" + clean if clean else "/es/"


def join(*parts):
    return " ".join(p for p in parts if p)


# --------------------------------------------------------------------------- #
# icons
# --------------------------------------------------------------------------- #

SPRITE = """<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>
<symbol id="i-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></symbol>
<symbol id="i-tooth" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.5-1.2-3.2-2-5-1.7C4.6 4.2 3.5 6.4 3.8 9c.3 2.2 1.2 3.6 1.6 5.6.5 2.6.8 6.4 2.6 6.4 1.6 0 1.6-3.2 2.4-5 .4-.9 1-.9 1.6-.9s1.2 0 1.6.9c.8 1.8.8 5 2.4 5 1.8 0 2.1-3.8 2.6-6.4.4-2 1.3-3.4 1.6-5.6.3-2.6-.8-4.8-3.2-5.2-1.8-.3-3.5.5-5 1.7Z"/></symbol>
<symbol id="i-spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3l1.8 4.7 4.7 1.8-4.7 1.8L11 16l-1.8-4.7L4.5 9.5l4.7-1.8z"/><path d="M19 14l.8 2.2 2.2.8-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></symbol>
<symbol id="i-implant" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2.5h10v3.5H7z"/><path d="M9 6h6l-.6 12.5a2.4 2.4 0 0 1-4.8 0z"/><path d="M8.6 9.6l6.8-1M8.8 12.6l6.4-1M9 15.6l6-1"/></symbol>
<symbol id="i-crown" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.52.29L21.18 5.5a.5.5 0 0 1 .8.52l-2.83 10.25a1 1 0 0 1-.96.73H5.81a1 1 0 0 1-.96-.73L2.02 6.02a.5.5 0 0 1 .8-.52l4.27 3.66a1 1 0 0 0 1.52-.29z"/><path d="M5 21h14"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
<symbol id="i-smile" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></symbol>
<symbol id="i-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></symbol>
<symbol id="i-card" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="i-lr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 7-5 5 5 5M15 7l5 5-5 5"/></symbol>
<symbol id="i-quote" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 0-1 1.03V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></symbol>
<symbol id="i-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/></symbol>
<symbol id="i-gift" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></symbol>
<symbol id="i-coffee" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/></symbol>
<symbol id="i-tv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="m17 2-5 5-5-5"/></symbol>
<symbol id="i-headphones" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></symbol>
<symbol id="i-kids" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 20h10M12 16v4"/><path d="m7 12 2.5-3 2 2 2.5-3 2 4"/></symbol>
<symbol id="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
<symbol id="i-nav" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></symbol>
<symbol id="i-wind" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.8 19.6A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2M9.8 4.4A2 2 0 1 1 11 8H2"/></symbol>
<symbol id="i-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></symbol>
<symbol id="i-xray" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M12 9h5M12 14h3"/></symbol>
<symbol id="i-camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3.5"/></symbol>
<symbol id="i-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 15h6M9 11h3"/></symbol>
<symbol id="i-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M8 11h.01M8 15h.01M12 11h4M12 15h4"/></symbol>
<symbol id="i-exam" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></symbol>
<symbol id="i-plan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></symbol>
<symbol id="i-logo" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#22302a"/><rect x=".5" y=".5" width="39" height="39" rx="11.5" fill="none" stroke="#fff" stroke-opacity=".16"/><path d="M20 12.2c-2-1.6-4.2-2.6-6.6-2.2-3.2.5-4.7 3.4-4.3 6.9.4 2.9 1.6 4.8 2.1 7.4.7 3.4 1.1 8.4 3.4 8.4 2.1 0 2.1-4.2 3.2-6.6.5-1.2 1.3-1.2 2.2-1.2s1.7 0 2.2 1.2c1.1 2.4 1.1 6.6 3.2 6.6 2.3 0 2.7-5 3.4-8.4.5-2.6 1.7-4.5 2.1-7.4.4-3.5-1.1-6.4-4.3-6.9-2.4-.4-4.6.6-6.6 2.2Z" fill="none" stroke="#f2c6a3" stroke-width="2.2" stroke-linejoin="round"/><circle cx="29.5" cy="9.5" r="3" fill="#c8623f"/></symbol>
</defs></svg>"""


def icon(name, cls=""):
    c = f' class="{cls}"' if cls else ""
    return f'<svg{c} aria-hidden="true"><use href="#i-{name}" /></svg>'


# --------------------------------------------------------------------------- #
# shell
# --------------------------------------------------------------------------- #


def json_ld(obj):
    return ('<script type="application/ld+json">'
            + json.dumps(obj, ensure_ascii=False)
            + "</script>")


def head(C, locale, meta):
    title = meta["title"]
    desc = meta["desc"]
    path = meta.get("path", "")
    base = SITE["site_url"].rstrip("/")
    canon = base + url(locale, path)
    oglang = "es_US" if locale == "es" else "en_US"
    alt_en = base + url("en", path)
    alt_es = base + url("es", path)
    return f"""<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{esc(title)}</title>
    <meta name="description" content="{attr(desc)}" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="theme-color" content="#faf6f0" />
    <meta name="darkreader-lock" />
    <script>try{{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}}catch(e){{}}</script>
    <meta name="page-type" content="{attr(meta.get('type', 'service'))}" />
    <meta name="site-kind" content="other" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="{attr(SITE['name'])}" />
    <meta property="og:locale" content="{oglang}" />
    <meta property="og:title" content="{attr(title)}" />
    <meta property="og:description" content="{attr(desc)}" />
    <meta property="og:image" content="{attr(base)}/og.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="{attr(canon)}" />
    <link rel="canonical" href="{attr(canon)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="alternate" hreflang="en" href="{attr(alt_en)}" />
    <link rel="alternate" hreflang="es" href="{attr(alt_es)}" />
    <link rel="alternate" hreflang="x-default" href="{attr(alt_en)}" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" />
    <link rel="stylesheet" href="/assets/styles.css" />
    <link rel="stylesheet" href="/assets/classic.css" />
    <link rel="stylesheet" href="/assets/theme-dark.css" />
    <script>document.documentElement.classList.add("mv-js");</script>"""


DAY_NAMES = {
    "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "es": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
}


def day_name(locale, i):
    return DAY_NAMES[locale][i]


FOOTER_HOURS = {
    "en": """<li><b>EaDo</b> · Mon–Thu 8 am–5 pm</li>
              <li>Fri 8 am–4 pm</li>
              <li><b>Northside</b> · Mon–Thu 8 am–5 pm</li>
              <li class="muted-light">Northside closed Fri · both closed Sat–Sun</li>""",
    "es": """<li><b>EaDo</b> · Lun–Jue 8 am–5 pm</li>
              <li>Vie 8 am–4 pm</li>
              <li><b>Northside</b> · Lun–Jue 8 am–5 pm</li>
              <li class="muted-light">Northside cierra el viernes · ambas cerradas sáb–dom</li>""",
}


def demo_banner(C):
    return f"""<div class="demo-banner" data-demo hidden>
      {esc(C['ui']['demo_banner'])}
      <button type="button" aria-label="{attr(C['ui']['hide_notice'])}" data-demo-close>&times;</button>
    </div>"""


def topbar(C):
    return f"""<div class="topbar">
      <a href="tel:{SITE['phone_tel']}" data-track="topbar_call">
        <span class="pulse" aria-hidden="true"></span>
        <span><strong>{esc(C['ui']['topbar_title'])}</strong> <span class="hide-sm topbar-hours">{esc(C['ui']['topbar_hours'])}</span></span>
        <span class="num hide-sm">{esc(SITE['phone_display'])} →</span>
      </a>
    </div>"""


NAV_BLURB = {
    "family-dentistry": ("Cleanings, exams and kids' visits", "Limpiezas, exámenes y niños"),
    "cosmetic-dentistry": ("Whitening, veneers and bonding", "Blanqueamiento, carillas, bonding"),
    "invisalign": ("Clear aligners for adults and kids", "Alineadores para adultos y niños"),
    "restorative-dentistry": ("Fillings, crowns, root canals, implants", "Empastes, coronas, implantes"),
    "same-day-dentistry": ("Pain today? Walk-ins welcome", "¿Dolor hoy? Sin cita, bienvenidos"),
}


def nav_html(C, locale):
    items = []
    svc_by_slug = {x["slug"]: x for x in SERVICES}
    svc_items = "".join(
        f'<li><a class="nav-menu-item" href="{url(locale, "services/" + s[0] + "/")}">'
        f'<span class="nav-menu-ico">{icon(svc_by_slug[s[0]]["icon"])}</span>'
        f'<span class="nav-menu-txt"><b>{esc(s[1] if locale == "en" else s[2])}</b>'
        f'<small>{esc(NAV_BLURB[s[0]][0 if locale == "en" else 1])}</small></span></a></li>'
        for s in SERVICE_NAV
    )
    items.append(
        f'<li class="nav-item has-menu"><button type="button" class="nav-trigger" aria-expanded="false" data-services-toggle>'
        f'{esc(C["ui"]["nav"][0][0])} {icon("plus")}</button>'
        f'<div class="nav-menu" data-services-menu hidden><ul>{svc_items}'
        f'<li><a class="nav-menu-all" href="{url(locale, "services/")}">{esc(C["ui"]["cta_more"])} →</a></li>'
        f"</ul></div></li>"
    )
    for i, (label, path) in enumerate(C["ui"]["nav"][1:], start=1):
        items.append(f'<li><a href="{url(locale, path.strip("/") + "/")}">{esc(label)}</a></li>')
    nav_list = "".join(items)

    drawer_services = "".join(
        f'<li style="--i:{i}"><a class="mlink" href="{url(locale, "services/" + s[0] + "/")}">{esc(s[1] if locale == "en" else s[2])} {icon("arrow")}</a></li>'
        for i, s in enumerate(SERVICE_NAV)
    )
    drawer_items = "".join(
        f'<li style="--i:{i + 5}"><a class="mlink" href="{url(locale, path.strip("/") + "/")}">{esc(label)} {icon("arrow")}</a></li>'
        for i, (label, path) in enumerate(C["ui"]["nav"])
    )
    return f"""<header class="site-header" data-header>
      <div class="bar">
        <div class="wrap bar-inner">
          <a href="{url(locale)}" class="logo" aria-label="{attr(SITE['name'])} — {attr(C['ui']['breadcrumb_home'])}">
            <img class="logo-mark logo-badge" src="/assets/img/logo.png" width="46" height="46" alt="" />
            <span class="logo-word"><b>EaDo</b><small>Family Dental</small></span>
          </a>
          <nav class="nav" aria-label="Primary">
            <ul>{nav_list}</ul>
          </nav>
          <div class="header-actions">
            <button class="theme-toggle" type="button" aria-pressed="false" data-theme-toggle
              data-label-dark="{attr('Switch to dark theme' if locale == 'en' else 'Cambiar a tema oscuro')}"
              data-label-light="{attr('Switch to light theme' if locale == 'en' else 'Cambiar a tema claro')}"
              aria-label="{attr('Switch to dark theme' if locale == 'en' else 'Cambiar a tema oscuro')}">{icon("moon", "ic-moon")}{icon("sun", "ic-sun")}</button>
            <a class="lang-switch" href="{other_url(locale, meta_path)}" hreflang="{ 'es' if locale == 'en' else 'en'}" aria-label="{attr(C['ui']['lang_switch'])}">{esc(C['ui']['lang_switch'])}</a>
            <a class="header-call" href="tel:{SITE['phone_tel']}">{icon("phone")}{esc(SITE['phone_display'])}</a>
            <a class="btn btn-primary header-cta header-cta-sm" href="{url(locale, 'book/')}"><span class="cta-long">{esc(C['ui']['cta_book'])}</span><span class="cta-short">{esc(C['ui']['cta_book_short'])}</span></a>
            <button class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="{attr(C['ui']['menu_open'])}" data-menu-btn>
              <span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>
            </button>
          </div>
        </div>
        <div class="progress" aria-hidden="true"><i data-progress></i></div>
      </div>
      <div class="scrim" data-scrim></div>
      <div class="mnav" id="mnav" data-mnav>
        <div class="mnav-sheet">
          <p class="label-mono mnav-label">{esc(C['ui']['nav'][0][0])}</p>
          <ul class="mnav-sub">{drawer_services}</ul>
          <ul>{drawer_items}</ul>
          <div class="mnav-foot">
            <a class="btn btn-primary" href="{url(locale, 'book/')}">{esc(C['ui']['cta_book'])}</a>
            <a class="btn btn-outline-light" href="tel:{SITE['phone_tel']}">{icon("phone")}{esc(C['ui']['cta_call'])} {esc(SITE['phone_display'])}</a>
            <a class="lang-switch lang-switch-block" href="{other_url(locale, meta_path)}">{esc(C['ui']['lang_switch'])}</a>
            <button class="theme-toggle theme-toggle-block" type="button" aria-pressed="false" data-theme-toggle
              data-label-dark="{attr('Dark theme' if locale == 'en' else 'Tema oscuro')}"
              data-label-light="{attr('Light theme' if locale == 'en' else 'Tema claro')}">{icon("moon", "ic-moon")}{icon("sun", "ic-sun")}<span data-theme-label>{esc('Dark theme' if locale == 'en' else 'Tema oscuro')}</span></button>
          </div>
        </div>
      </div>
    </header>"""


# current page path, used for the language switcher
meta_path = ""


def set_meta_path(p):
    global meta_path
    meta_path = p


def footer(C, locale, with_cta=True):
    explore = "".join(
        f'<li><a href="{url(locale, "services/" + s[0] + "/")}">{esc(s[1] if locale == "en" else s[2])}</a></li>'
        for s in SERVICE_NAV
    )
    return f"""<footer class="footer">
      <div class="wrap">
        {f"""<div class="footer-cta">
          <h2>{esc(C['home']['footer_cta'])}</h2>
          <div class="btn-row">
            <a class="btn btn-primary" href="{url(locale, 'book/')}">{esc(C['ui']['cta_book'])}</a>
            <a class="btn btn-outline-light" href="tel:{SITE['phone_tel']}">{icon("phone")}{esc(SITE['phone_display'])}</a>
          </div>
        </div>""" if with_cta else ''}
        <div class="footer-grid">
          <div class="footer-about">
            <a href="{url(locale)}" class="logo"><img class="logo-mark logo-badge" src="/assets/img/logo.png" width="46" height="46" alt="" /><span class="logo-word"><b>EaDo</b><small>Family Dental</small></span></a>
            <p>{esc(C['ui']['footer_about'])}</p>
            <p class="footer-credit label-mono">{esc(C['ui']['credits_line'])}</p>
          </div>
          <div>
            <h4 class="label-mono">{esc(C['ui']['footer_visit'])}</h4>
            <ul>
              {''.join(f'<li><b>{esc(l["name"])}</b><br />{esc(l["street"])}<br />{esc(SITE["city"])}, {esc(SITE["state"])} {esc(l["zip"])}<br /><a href="tel:{l["phone_tel"]}">{esc(l["phone_display"])}</a> · <a href="{l["maps_url"]}" target="_blank" rel="noopener">{esc(C["ui"]["cta_directions"])}</a></li>' for l in LOCATIONS)}
            </ul>
          </div>
          <div>
            <h4 class="label-mono">{esc(C['ui']['footer_hours'])}</h4>
            <ul>
              {FOOTER_HOURS[locale]}
            </ul>
          </div>
          <div>
            <h4 class="label-mono">{esc(C['ui']['footer_explore'])}</h4>
            <ul>{explore}
              <li><a href="{url(locale, 'smile-check/')}">{esc(C['ui']['cta_quiz'])}</a></li>
              <li><a href="{url(locale, 'reviews/')}">{esc(C['ui']['cta_reviews'])}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span data-year>2026</span> {esc(C['ui']['copyright'])}</span>
          <span class="footer-legal">
            <a href="{url(locale, 'privacy/')}">{esc(C['ui']['privacy'])}</a> ·
            <a href="{url(locale, 'accessibility/')}">{esc(C['ui']['accessibility'])}</a> ·
            <a href="{url(locale, 'disclaimer/')}">{esc(C['ui']['disclaimer'])}</a> ·
            <a class="lang-switch" href="{other_url(locale, meta_path)}">{esc(C['ui']['lang_switch'])}</a>
            <span data-demo-foot hidden>· {esc(C['ui']['demo_foot'])}</span>
          </span>
        </div>
      </div>
    </footer>"""


def callbar(C, locale):
    return f"""<div class="callbar" data-callbar>
      <a class="btn btn-outline-light" href="tel:{SITE['phone_tel']}">{icon("phone")}{esc(C['ui']['cta_call'])}</a>
      <a class="btn btn-primary" href="{url(locale, 'book/')}">{esc(C['ui']['cta_book_short'])}</a>
    </div>"""


def shell(C, locale, meta, body, jsonld=""):
    set_meta_path(meta.get("path", ""))
    if jsonld and not jsonld.lstrip().startswith("<"):
        jsonld = '<script type="application/ld+json">' + jsonld + "</script>"
    return f"""<!doctype html>
<html lang="{locale}" data-type="{attr(meta.get('type', 'service'))}" data-site-kind="other">
<head>
    {head(C, locale, meta)}
    {jsonld}
  </head>
  <body>
    {SPRITE}
    <a class="skip-link" href="#main">{esc(C['ui']['skip'])}</a>
    {demo_banner(C)}
    {topbar(C)}
    {nav_html(C, locale)}
    <main id="main">
{body}
    </main>
    {footer(C, locale, with_cta='cta-band' not in body and 'id="book"' not in body)}
    {callbar(C, locale)}
    <script src="/assets/config.js"></script>
    <script src="/assets/i18n/{locale}.js"></script>
    <script src="/assets/app.js" defer></script>
  </body>
</html>
"""


# --------------------------------------------------------------------------- #
# shared sections
# --------------------------------------------------------------------------- #


def sec_values(C, locale):
    cards = "".join(
        f"""<li class="value">
                <span class="value-ico">{icon(v[0])}</span>
                <div><h3>{esc(v[1])}</h3><p>{esc(v[2])}</p></div>
              </li>"""
        for v in C["home"]["values"]
    )
    return f"""<section class="values" aria-label="{attr(C['home']['values_eyebrow'])}">
        <div class="wrap">
          <div class="card-soft values-card reveal">
            <div class="values-head">
              <p class="label-mono">{esc(C['home']['values_eyebrow'])}</p>
              <h2 class="values-title">{esc(C['home']['values_title'])}</h2>
            </div>
            <ul class="values-grid stagger">
              {cards}
            </ul>
          </div>
        </div>
      </section>"""


SVC_TAGS = {
    "family-dentistry": ("Kids to grandparents", "Niños hasta abuelos"),
    "cosmetic-dentistry": ("Whitening · veneers", "Blanqueamiento · carillas"),
    "invisalign": ("Adults and kids", "Adultos y niños"),
    "restorative-dentistry": ("Fillings to implants", "De empastes a implantes"),
    "same-day-dentistry": ("Walk-ins welcome", "Sin cita, bienvenidos"),
}


SVC_ART = ["family-dentistry", "cosmetic-dentistry", "invisalign",
           "restorative-dentistry", "same-day-dentistry"]


def svc_art(slug):
    return partial(f"svc-art-{SVC_ART.index(slug) + 1}.svg")


def sec_services(C, locale):
    arts = {s["slug"]: svc_art(s["slug"]) for s in SERVICES}
    cards = []
    for i, s in enumerate(SERVICES):
        title = s[f"title_{locale}"]
        lede = s[f"lede_{locale}"]
        tag = SVC_TAGS.get(s["slug"], ("", ""))[0 if locale == "en" else 1]
        art = arts.get(s["slug"], "")
        cards.append(f"""<article class="svc reveal" style="--rd: {i * 0.08:.2f}s">
              <div class="svc-art blueprint-grid">
                <span class="tag label-mono">{esc(tag)}</span>
                {art}
              </div>
              <div class="svc-body">
                <h3>{esc(title)}</h3>
                <p>{esc(lede)}</p>
                <ul>{''.join(f'<li>{esc(b[0])}</li>' for b in s[f"bullets_{locale}"][:3])}</ul>
                <a class="link-arrow" href="{url(locale, 'services/' + s['slug'] + '/')}">{esc(C['ui']['cta_learn'])} {icon('arrow')}</a>
              </div>
            </article>""")
    return f"""<section id="services" class="section" aria-labelledby="svc-h">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc(C['home']['services_eyebrow'])}</p>
            <h2 id="svc-h" class="h2 display-title" data-words>{esc(C['home']['services_title'])}</h2>
            <p class="lead">{esc(C['home']['services_lead'])}</p>
          </div>
          <div class="svc-grid">{''.join(cards)}</div>
        </div>
      </section>"""


def marquee(C, locale):
    names = "".join(f"<span>{esc(a[0])}</span>" for a in AREAS)
    return f"""<div class="marquee" aria-hidden="true">
        <div class="marquee-track label-mono">{names}{names}</div>
      </div>"""


def doc_portrait(d, cls="doc-portrait doc-photo"):
    if d["photo"]:
        return (f'<div class="{cls}"><img src="{d["photo"]}" srcset="{d["photo_sm"]} 420w, {d["photo"]} 720w" '
                f'sizes="(max-width: 700px) 100vw, 420px" width="{d["photo_w"]}" height="{d["photo_h"]}" alt="{attr(d["name"])}" '
                f'loading="lazy" decoding="async" /><span class="since label-mono">{esc(d["since"])}</span></div>')
    initials = "".join(w[0] for w in d["name"].replace("Dr. ", "").split()[:2])
    return (f'<div class="{cls} doc-mono" aria-hidden="true"><span class="mono-initials">{esc(initials)}</span>'
            f'<span class="mono-name">{esc(d["first"])}</span><span class="since label-mono">{esc(d["since"])}</span></div>')


def sec_doctors(C, locale):
    cards = []
    for i, d in enumerate(DOCTORS):
        role = d["role_en"] if locale == "en" else d["role_es"]
        origin = d[f"origin_{locale}"]
        body = d[f"body_{locale}"]
        dq = DOCTOR_QUOTES[d["slug"]]
        q = dq[locale]
        cite = dq["cite_" + locale]
        cards.append(f"""<article class="card-soft doc reveal" style="--rd: {i * 0.1:.1f}s">
              {doc_portrait(d)}
              <div class="doc-body">
                <p class="label-mono eyebrow">{esc(role)}</p>
                <h3>{esc(d['name'])}</h3>
                <p>{esc(origin)}</p>
                <blockquote>“{esc(q)}”<cite>— {esc(cite)}</cite></blockquote>
              </div>
            </article>""")
    stats = (
        f'<div class="card-soft"><b class="tabular">{esc(SITE["reviews_count"])}</b><span>'
        + ("Google reviews from patients" if locale == "en" else "Reseñas de pacientes en Google")
        + "</span></div>"
        f'<div class="card-soft"><b>{esc(SITE["rating"])} / 5</b><span>'
        + ("Average Google rating" if locale == "en" else "Calificación promedio en Google")
        + "</span></div>"
        '<div class="card-soft"><b class="tabular">2</b><span>'
        + ("Offices: EaDo and Northside" if locale == "en"
           else "Oficinas: EaDo y Northside")
        + "</span></div>"
    )
    return f"""<section id="doctors" class="section bg-surface blueprint-paper" aria-labelledby="doc-h">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc(C['home']['team_eyebrow'])}</p>
            <h2 id="doc-h" class="h2 display-title" data-words>{esc(C['home']['team_title'])}</h2>
            <p class="lead">{esc(C['home']['team_lead'])}</p>
          </div>
          <div class="docs">{''.join(cards)}</div>
          <div class="team-strip stagger reveal">{stats}</div>
          <div class="reveal" style="margin-top:2rem">
            <a class="link-arrow" href="{url(locale, 'dentists/')}">{esc(C['ui']['cta_team'])} {icon('arrow')}</a>
          </div>
        </div>
      </section>"""


def sec_anatomy(C, locale):
    layers = [
        ("1", "The crown", "La corona",
         "The part you see and chew with — shaped and shaded to match the teeth beside it.",
         "La parte que ve y con la que mastica: forma y color iguales a los dientes de al lado."),
        ("2", "The abutment", "El pilar",
         "A small connector that rises through the gum and holds the crown firmly on the post.",
         "Un conector pequeño que atraviesa la encía y sujeta la corona sobre el poste."),
        ("3", "The titanium post", "El poste de titanio",
         "Placed in the jaw where the root used to be. Over the following months, bone grows tight around it.",
         "Se coloca en la mandíbula donde estaba la raíz. En los meses siguientes, el hueso se integra alrededor."),
        ("4", "Healthy gum tissue", "Encía sana",
         "Seals around the abutment like it does around a natural tooth. Keeping it healthy is part of the plan.",
         "Sella alrededor del pilar como lo hace con un diente natural. Mantenerla sana es parte del plan."),
        ("5", "Your jawbone", "Su hueso mandibular",
         "The foundation. We check how much bone is there before recommending an implant.",
         "La base. Antes de recomendar un implante revisamos cuánta hueso hay."),
    ]
    items = "".join(
        f"""<li class="layer-item" data-layer="{l[0]}" tabindex="0"><span class="n">{l[0]}</span><div><h3>{esc(l[1] if locale == 'en' else l[2])}</h3><p>{esc(l[3] if locale == 'en' else l[4])}</p></div></li>"""
        for l in layers
    )
    svg = partial("anatomy.svg").replace(
        "<title id=\"imp-fig\">Cross-section of a dental implant: crown, abutment, titanium post, gum tissue and jawbone, between two natural teeth.</title>",
        "<title id=\"imp-fig\">"
        + ("Cross-section of a dental implant: crown, abutment, titanium post, gum tissue and jawbone, between two natural teeth."
           if locale == "en" else
           "Corte transversal de un implante dental: corona, pilar, poste de titanio, encía y hueso mandibular, entre dos dientes naturales.")
        + "</title>")
    cta = ("Ask about an implant consultation" if locale == "en" else "Consultar por un implante")
    note = ("Every mouth is different — the exam tells us whether an implant is the right fit for you."
            if locale == "en" else
            "Cada boca es distinta: el examen nos dice si un implante es la opción adecuada para usted.")
    return f"""<section id="implants" class="section" aria-labelledby="imp-h">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc('How a dental implant works' if locale == 'en' else 'Cómo funciona un implante dental')}</p>
            <h2 id="imp-h" class="h2 display-title" data-words>{esc('A new tooth is built from the bone up.' if locale == 'en' else 'Un diente nuevo se construye desde el hueso.')}</h2>
            <p class="lead">{esc('An implant replaces the whole tooth — root included. Each part has one job, and they go in the same order every time.' if locale == 'en' else 'Un implante reemplaza el diente completo, incluida la raíz. Cada parte tiene una función, y siempre entran en el mismo orden.')}</p>
          </div>
          <div class="anatomy">
            <figure class="glass glass-dark anatomy-figure reveal" data-fx="scale">
              <div class="corner-marks" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
              {svg}
              <div class="anatomy-pick" data-anatomy-pick aria-live="polite">
                <p class="anatomy-hint">{esc('Tap a number on the drawing to see what each part does.' if locale == 'en' else 'Toque un número en el dibujo para ver qué hace cada parte.')}</p>
              </div>
              <figcaption>{esc('Illustration of a single-tooth implant between two natural teeth.' if locale == 'en' else 'Ilustración de un implante de una sola pieza entre dos dientes naturales.')}</figcaption>
            </figure>
            <ol class="layers reveal stagger" data-fx="right">{items}</ol>
          </div>
          <div class="reveal" style="margin-top: 2.5rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center">
            <a class="btn btn-primary" href="{url(locale, 'book/')}?reason=Dental%20implants" data-preset="Dental implants">{esc(cta)} {icon('arrow')}</a>
            <span class="muted" style="font-size: 0.92rem">{esc(note)}</span>
          </div>
        </div>
      </section>"""


def sec_comfort(C, locale):
    amen = "".join(
        f"""<li class="amen reveal" style="--rd:{i * 0.06:.2f}s"><span class="ico">{icon(t[0])}</span><b>{esc(t[1] if locale == 'en' else t[2])}</b></li>"""
        for i, t in enumerate(TECH))
    np_items = "".join(f'<li><span class="check-ico">{icon("check")}</span>{esc(x)}</li>' for x in C["home"]["hero_card_items"])
    return f"""<section id="comfort" class="section bg-ink blueprint-grid comfort-eado" aria-labelledby="com-h">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc(C['payment']['eyebrow'])}</p>
            <h2 id="com-h" class="h2" data-words>{esc('Coffee, a TV and a warm blanket. Then the dentist.' if locale == 'en' else 'Café, una TV y una manta tibia. Después, el dentista.')}</h2>
            <p class="lead">{esc('The office is designed so a visit feels positive and warm — for kids, for nervous patients, for everyone.' if locale == 'en' else 'La oficina está pensada para que la visita se sienta positiva y cálida: para niños, para nerviosos, para todos.')}</p>
          </div>
          <ul class="amen-grid">{amen}</ul>
          <div class="pay-row">
            <div class="glass glass-dark pay-card np-dark reveal" data-glass>
              <p class="label-mono eyebrow">{esc(C['payment']['cherry_title'])}</p>
              <h3>{esc(C['home']['hero_card_h'])}</h3>
              <ul class="check-list">{np_items}</ul>
              <p class="muted-light" style="margin-top:1rem">{esc('Ask the office about the current new patient offer when you book.' if locale == 'en' else 'Pregunte por la oferta vigente para pacientes nuevos al agendar.')}</p>
              <div class="btn-row" style="margin-top: 1.5rem">
                <a class="btn btn-primary" href="{url(locale, 'book/')}">{esc(C['ui']['cta_book'])}</a>
                <a class="btn btn-outline-light" href="{url(locale, 'comfort-and-payment/')}">{esc(C['ui']['cta_insurance'])}</a>
              </div>
            </div>
            <div class="glass glass-dark pay-card reveal" style="--rd: 0.1s" data-glass>
              <p class="label-mono eyebrow">{esc('Dental insurance' if locale == 'en' else 'Seguro dental')}</p>
              <h3>{esc('Many plans reset on January 1.' if locale == 'en' else 'Muchos planes se renuevan el 1 de enero.')}</h3>
              <div class="clock">
                <b class="tabular" data-benefit-days>—</b>
                <span>{esc('days left in your' if locale == 'en' else 'días quedan en su plan')}<br />{esc('plan year ' if locale == 'en' else 'dental de ')}<span data-benefit-year>2026</span></span>
              </div>
              <div class="meter" aria-hidden="true"><i data-benefit-meter></i></div>
              <div class="meter-legend"><span>{esc('Jan 1' if locale == 'en' else '1 ene')}</span><span>{esc('Dec 31' if locale == 'en' else '31 dic')}</span></div>
              <p class="muted" style="font-size:.9rem;margin-top:.75rem">{esc(C['ui']['benefits_note'])}</p>
            </div>
          </div>
        </div>
      </section>"""


def office_strip(C, locale):
    rows = "".join(
        f'<a class="office-mini" href="tel:{l["phone_tel"]}"><span class="office-mini-name">{esc(l["name"])}</span>'
        f'<span class="chip office-status" data-loc-status="{l["key"]}"><span class="dot"></span>…</span>'
        f'<span class="office-mini-phone">{icon("phone")}{esc(l["phone_display"])}</span></a>'
        for l in LOCATIONS)
    return f'<div class="office-strip">{rows}</div>'


def office_cards(C, locale, compact=False):
    day_names = (["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] if locale == "en"
                 else ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"])
    full_days = (["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] if locale == "en"
                 else ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"])
    closed = "Closed" if locale == "en" else "Cerrado"

    def t12(hhmm):
        h, m = map(int, hhmm.split(":"))
        suf = "am" if h < 12 else "pm"
        h12 = h % 12 or 12
        return f"{h12}:{m:02d} {suf}" if m else f"{h12} {suf}"

    out = []
    for i, loc in enumerate(LOCATIONS):
        hrs = loc["hours"]
        if compact:
            # Mon–Thu line + Friday line
            fri = hrs.get(5)
            summary = (f'{day_names[1]}–{day_names[4]} {t12(hrs[1][0])}–{t12(hrs[1][1])} · '
                       + (f'{day_names[5]} {t12(fri[0])}–{t12(fri[1])}' if fri else f'{day_names[5]} {closed.lower()}'))
            hours_html = f'<p class="office-hours">{esc(summary)}</p>'
        else:
            rows = "".join(
                f'<tr data-d="{d}"{"" if hrs.get(d) else " class=\"closed\""}><td>{esc(full_days[d])}</td>'
                f'<td>{esc(t12(hrs[d][0]) + " – " + t12(hrs[d][1])) if hrs.get(d) else esc(closed)}</td></tr>'
                for d in [1, 2, 3, 4, 5, 6, 0])
            hours_html = f'<table class="office-table" data-hours>{rows}</table>'
        name_long = loc["name_long_" + locale]
        note = loc["note_" + locale]
        out.append(f"""<article class="office-card-eado reveal" style="--rd:{i * 0.1:.1f}s" data-office="{loc['key']}">
              <header>
                <span class="office-pin" aria-hidden="true">{icon('pin')}</span>
                <div><h3>{esc(name_long)}</h3><p class="office-addr">{esc(loc['street'])}, {esc(SITE['city'])}, {esc(SITE['state'])} {esc(loc['zip'])}</p></div>
                <span class="chip office-status" data-loc-status="{loc['key']}"><span class="dot"></span>…</span>
              </header>
              {'' if compact else f'<p class="office-note">{esc(note)}</p>'}
              {hours_html}
              <div class="office-actions">
                <a class="btn btn-primary btn-sm" href="tel:{loc['phone_tel']}">{icon('phone')}{esc(loc['phone_display'])}</a>
                <a class="btn btn-outline-dark btn-sm" href="{loc['maps_url']}" target="_blank" rel="noopener">{icon('nav')}{esc(C['ui']['cta_directions'])}</a>
              </div>
            </article>""")
    return f'<div class="office-cards{" office-cards-compact" if compact else ""}">{"".join(out)}</div>'


def map_svg(locale):
    svg = partial("map.svg")
    if locale == "es":
        svg = svg.replace(
            "Schematic map of central Houston showing the EaDo office east of downtown and the Northside office on Pinemont Dr",
            "Mapa esquemático del centro de Houston con la oficina EaDo al este del centro y la oficina Northside en Pinemont Dr")
        svg = svg.replace(">DOWNTOWN<", ">CENTRO<").replace(">Schematic, not to scale<", ">Esquema, sin escala<")
    return svg


def sec_areas(C, locale):
    svg = map_svg(locale)
    groups = []
    for loc in LOCATIONS:
        items = "".join(
            f'<li><button type="button" data-area="{attr(name)}"><span>{esc(name)}<small>{esc(sub_en if locale == "en" else sub_es)}</small></span></button></li>'
            for name, sub_en, sub_es, key in AREAS if key == loc["key"])
        groups.append(f'<div class="area-group"><p class="label-mono">{esc(("Near " if locale == "en" else "Cerca de ") + loc["name"])}</p><ul class="area-list" data-area-list>{items}</ul></div>')
    return f"""<section id="visit" class="section bg-surface" aria-labelledby="area-h">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc(C['home']['areas_eyebrow'])}</p>
            <h2 id="area-h" class="h2 display-title" data-words>{esc(C['home']['areas_title'])}</h2>
            <p class="lead">{esc(C['home']['areas_lead'])}</p>
          </div>
          <div class="areas areas-eado">
            <div class="reveal" data-fx="left">
              <div class="map-card map-card-light">
                {svg}
              </div>
              <div class="area-groups">{''.join(groups)}</div>
            </div>
            <div class="reveal" data-fx="right">
              {office_cards(C, locale, compact=False)}
            </div>
          </div>
        </div>
      </section>"""


def sec_reviews(C, locale):
    cards = []
    for i, r in enumerate(REVIEWS):
        quote = r[f"quote_{locale}"]
        cards.append(f"""<li class="card-soft review reveal" style="--rd: {i * 0.06:.2f}s">{icon('quote', 'q')}
              <div class="stars" role="img" aria-label="5 stars">{icon('star') * 5}</div>
              <blockquote>“{esc(quote)}”</blockquote>
              <footer><span class="av">{esc(r['name'][0])}</span><div><b>{esc(r['name'])}</b><small>{esc(r[f'when_{locale}'])}</small></div></footer>
            </li>""")
    score = f"""<div class="glass glass-light score reveal">
            <b class="tabular">{esc(SITE['rating'])}</b>
            <div>
              <div class="stars" role="img" aria-label="5 stars">{icon('star') * 5}</div>
              <p style="margin-top: 0.4rem">{esc('Based on 1,000+ Google reviews' if locale == 'en' else 'Sobre la base de más de 1,000 reseñas en Google')}</p>
              <small>{esc('Short excerpts from public Google reviews' if locale == 'en' else 'Fragmentos de reseñas públicas de Google (traducidas)')}</small>
            </div>
          </div>"""
    return f"""<section id="reviews" class="section" aria-labelledby="rev-h">
        <div class="wrap">
          <div class="reveal" style="max-width: 48rem">
            <p class="label-mono eyebrow">{esc(C['reviews']['eyebrow'])}</p>
            <h2 id="rev-h" class="h2 display-title" data-words>{esc(C['reviews']['title'])}</h2>
            <p class="lead">{esc(C['reviews']['lead'])}</p>
          </div>
          {score}
          <ul class="reviews">{''.join(cards)}</ul>
          <div class="reveal" style="margin-top:2rem">
            <a class="link-arrow" href="{url(locale, 'reviews/')}">{esc(C['ui']['cta_reviews'])} {icon('arrow')}</a>
          </div>
        </div>
      </section>"""


def sec_quiz(C, locale):
    return f"""<section id="check" class="section bg-surface blueprint-paper" aria-labelledby="chk-h">
        <div class="wrap wrap-sm">
          <div class="reveal">
            <p class="label-mono eyebrow">{esc(C['smile']['eyebrow'])}</p>
            <h2 id="chk-h" class="h2" data-words>{esc(C['smile']['title'])}</h2>
            <p class="lead">{esc(C['smile']['lead'])}</p>
          </div>
          <div class="reveal">
            <div class="glass glass-dark quiz" tabindex="-1" data-quiz aria-live="polite"></div>
          </div>
        </div>
      </section>"""


def sec_planner(C, locale):
    items = "".join(
        f'<li><span class="check-ico">{icon("check")}</span>{esc(i)}</li>' for i in C["home"]["planner_items"])
    return f"""<section class="section" aria-labelledby="plan-h">
        <div class="wrap planner">
          <div class="reveal" data-fx="left">
            <p class="label-mono eyebrow">{esc(C['home']['planner_eyebrow'])}</p>
            <h2 id="plan-h" class="h2" data-words>{esc(C['home']['planner_title'])}</h2>
            <p class="lead">{esc(C['home']['planner_lead'])}</p>
            <ul class="check-list on-light" style="margin-top: 2rem">{items}</ul>
          </div>
          <div class="reveal" data-fx="right">
            <div class="glass glass-dark planner-card" data-planner>
              <header>
                <span class="ico">{icon('cal')}</span>
                <div><h3>{esc(C['home']['planner_eyebrow'])}</h3><p>{esc('A rough guide — your dentist sets your schedule' if locale == 'en' else 'Una guía aproximada: su dentista fija su ritmo')}</p></div>
              </header>
              <div class="range-row">
                <label for="months">{esc('Months since your last cleaning' if locale == 'en' else 'Meses desde su última limpieza')}</label>
                <output for="months" data-months-out>4 <small>mo</small></output>
              </div>
              <input class="range" id="months" type="range" min="0" max="36" step="1" value="4" data-months />
              <div class="range-ticks"><span>{esc('Just had one' if locale == 'en' else 'Recién me hice una')}</span><span>1 yr</span><span>2 yrs</span><span>3+ yrs</span></div>
              <fieldset>
                <legend class="fs-legend">{esc('How often were you told to come in?' if locale == 'en' else '¿Cada cuánto le dijeron que venga?')}</legend>
                <div class="seg">
                  <label><input type="radio" name="every" value="6" checked />{esc('Every 6 mo' if locale == 'en' else 'Cada 6 meses')}</label>
                  <label><input type="radio" name="every" value="4" />{esc('Every 3–4 mo' if locale == 'en' else 'Cada 3–4 meses')}</label>
                  <label><input type="radio" name="every" value="6" />{esc('Not sure' if locale == 'en' else 'No estoy seguro')}</label>
                </div>
              </fieldset>
              <div class="result-box" aria-live="polite">
                <p class="label-mono result-label">{esc('Your next cleaning' if locale == 'en' else 'Su próxima limpieza')}</p>
                <p class="big" data-plan-big>—</p>
                <p data-plan-text>—</p>
              </div>
              <a class="btn btn-primary btn-block" style="margin-top: 1.25rem" href="{url(locale, 'book/')}?reason=Cleaning%20%26%20exam" data-preset="Cleaning &amp; exam">{esc('Book my cleaning' if locale == 'en' else 'Agendar mi limpieza')} {icon('arrow')}</a>
            </div>
          </div>
        </div>
      </section>"""


def sec_faq(C, locale, items, id_suffix="faq"):
    acc = "".join(
        f"""<div class="acc-item"><h3><button class="acc-btn" type="button" aria-expanded="false">{esc(q)}<span class="acc-icon">{icon('plus')}</span></button></h3><div class="acc-panel"><div class="acc-inner"><p>{esc(a)}</p></div></div></div>"""
        for q, a in items)
    return f"""<section id="{id_suffix}" class="section bg-surface" aria-labelledby="{id_suffix}-h">
        <div class="wrap wrap-sm">
          <div class="reveal">
            <p class="label-mono eyebrow">{esc(C['home']['faq_eyebrow'])}</p>
            <h2 id="{id_suffix}-h" class="h2 display-title" data-words>{esc(C['home']['faq_title'])}</h2>
          </div>
          <div class="faq reveal" data-faq>{acc}</div>
        </div>
      </section>"""


def sec_book(C, locale, show_intro=True):
    reasons = "".join(
        f'<label class="opt"><input type="radio" name="reason" value="{attr(REASON_KEYS[i])}" />{esc(r)}</label>'
        for i, r in enumerate(C["book"]["reasons"]))
    # Canonical values (Tue..Sat / Mornings..) so the backend stays language-neutral;
    # the visitor sees the label in their own language.
    CANON_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    CANON_TIMES = ["Mornings", "Afternoons", "Either"]
    day_labels = C["book"]["days"]
    time_labels = C["book"]["times"]
    days = "".join(
        f'<label class="opt"><input type="checkbox" name="days" value="{attr(v)}" />{esc(day_labels[i] if i < len(day_labels) else v)}</label>'
        for i, v in enumerate(CANON_DAYS))
    times = "".join(
        f'<label class="opt"><input type="radio" name="time" value="{attr(v)}"{" checked" if v == "Either" else ""} />{esc(time_labels[i] if i < len(time_labels) else v)}</label>'
        for i, v in enumerate(CANON_TIMES))
    fields = C["book"]["fields"]
    loc_opts = "".join(
        f'<label class="opt opt-loc"><input type="radio" name="location" value="{attr(l["name"])}"{" checked" if i == 0 else ""} /><span><b>{esc(l["name"])}</b><small>{esc(l["street"])}</small></span></label>'
        for i, l in enumerate(LOCATIONS))
    return f"""<section id="book" class="section bg-ink" aria-labelledby="book-h" style="overflow: hidden">
        <div class="aurora" aria-hidden="true"><i></i><i></i></div>
        <div class="wrap book">
          <div class="book-aside reveal" data-fx="left">
            {f'<p class="label-mono eyebrow">{esc(C["book"]["eyebrow"])}</p><h2 id="book-h" class="h2" data-words>{esc(C["book"]["title"])}</h2><p class="lead">{esc(C["book"]["lead"])}</p>' if show_intro else ''}
            <ul class="check-list">
              <li><span class="check-ico">{icon('check')}</span>{esc(C['book']['new_yes'] if False else C['home']['book_items'][0])}</li>
              <li><span class="check-ico">{icon('check')}</span>{esc(C['home']['book_items'][1])}</li>
              <li><span class="check-ico">{icon('check')}</span>{esc(C['home']['book_items'][2])} <a href="tel:{SITE['phone_tel']}" class="text-brand" style="font-weight:700;white-space:nowrap">{esc(SITE['phone_display'])}</a></li>
            </ul>
            <div class="glass glass-dark hours book-offices" data-glass>
              <h3><span>{esc(C['ui']['hours_title'])}</span></h3>
              {''.join(f'<div class="book-office"><div><b>{esc(l["name"])}</b><span>{esc(l["street"])}</span></div><span class="chip" data-loc-status="{l["key"]}"><span class="dot"></span>…</span><a href="tel:{l["phone_tel"]}">{esc(l["phone_display"])}</a></div>' for l in LOCATIONS)}
              <p class="hours-note">{esc('Mon–Thu 8 am–5 pm at both offices · Fri 8 am–4 pm at EaDo.' if locale == 'en' else 'Lun–Jue 8 am–5 pm en ambas oficinas · Vie 8 am–4 pm en EaDo.')} {esc(C['ui']['hours_note'])}</p>
            </div>
          </div>

          <div class="reveal" data-fx="right">
            <form class="form-card" data-form novalidate>
              <div class="form-head">
                <h3 data-form-title>{esc(C['book']['steps'][0])}</h3>
                <span class="label-mono muted" data-form-count>{esc(C['book']['step_count'].replace('{n}', '1'))}</span>
              </div>
              <div class="form-steps" aria-hidden="true"><i class="on"></i><i></i><i></i></div>

              <fieldset class="fstep" data-step="1">
                <legend class="sr-only">{esc(C['book']['steps'][0])}</legend>
                <div class="opts">{reasons}</div>
              </fieldset>

              <fieldset class="fstep" data-step="2" hidden>
                <legend class="q">{esc('Which office?' if locale == 'en' else '¿Qué oficina?')}</legend>
                <div class="opts opts-loc">{loc_opts}</div>
                <p class="q" style="margin-top: 1.5rem">{esc(C['book']['days_label'])}</p>
                <div class="opts days">{days}</div>
                <p class="q" style="margin-top: 1.5rem">{esc(C['book']['time_label'])}</p>
                <div class="opts three">{times}</div>
                <p class="q" style="margin-top: 1.5rem">{esc(C['book']['new_label'])}</p>
                <div class="opts">
                  <label class="opt"><input type="radio" name="newPatient" value="Yes" checked />{esc(C['book']['new_yes'])}</label>
                  <label class="opt"><input type="radio" name="newPatient" value="No" />{esc(C['book']['new_no'])}</label>
                </div>
              </fieldset>

              <fieldset class="fstep" data-step="3" hidden>
                <legend class="sr-only">{esc(C['book']['steps'][2])}</legend>
                <div class="row2">
                  <label class="field"><span>{esc(fields[0][0])}</span><input name="firstName" autocomplete="given-name" required /></label>
                  <label class="field"><span>{esc(fields[1][0])}</span><input name="lastName" autocomplete="family-name" required /></label>
                </div>
                <div class="row2">
                  <label class="field"><span>{esc(fields[2][0])}</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(713) 555-0123" required /></label>
                  <label class="field"><span>{esc(fields[3][0])}</span><input name="email" type="email" autocomplete="email" /></label>
                </div>
                <label class="field"><span>{esc(C['book']['note_label'])}</span><textarea name="note" rows="3" placeholder="{attr(C['book']['note_placeholder'])}"></textarea></label>
                <input type="text" name="company" tabindex="-1" autocomplete="off" style="position: absolute; left: -9999px" aria-hidden="true" />
                <label class="consent"><input type="checkbox" name="consent" required /><span>{esc(C['book']['consent'])} <a href="{url(locale, 'privacy/')}">{esc(C['ui']['privacy'])}</a>.</span></label>
                <p class="form-note">{esc(C['book']['privacy_note'])}</p>
              </fieldset>

              <p class="form-error" role="alert" data-form-error hidden></p>

              <div class="form-nav" data-form-nav>
                <button type="button" class="back" data-back hidden>← {esc(C['book']['back'])}</button>
                <span class="form-demo-note">{esc(C['ui']['demo_form_note'])}</span>
                <button type="button" class="btn btn-primary" data-next>{esc(C['book']['continue'])} {icon('arrow')}</button>
              </div>

              <div class="form-done step-in" data-done hidden>
                <span class="tick">{icon('check')}</span>
                <h3>{esc(C['book']['done_title'])}</h3>
                <p data-done-text>{esc(C['book']['done_body'])}</p>
                <button type="button" class="btn btn-outline-dark" style="margin-top: 1.5rem" data-reset>{esc(C['book']['again'])}</button>
              </div>
            </form>
          </div>
        </div>
      </section>"""


def sec_cta(C, locale, title=None, body=None):
    t = title or ("Ready when you are." if locale == "en" else "Cuando usted quiera.")
    b = body or ("Call the office and ask for a time that works — or send a request and let the team call you back."
                 if locale == "en" else
                 "Llame a la oficina y pida la hora que le sirva, o envíe una solicitud y el equipo le devuelve la llamada.")
    return f"""<section class="section cta-band" aria-label="{attr(C['ui']['cta_book'])}">
        <div class="wrap cta-inner">
          <div class="reveal" data-fx="left">
            <h2 class="h2">{esc(t)}</h2>
            <p class="lead">{esc(b)}</p>
          </div>
          <div class="btn-row reveal" data-fx="right">
            <a class="btn btn-primary" href="{url(locale, 'book/')}">{esc(C['ui']['cta_book'])}</a>
            <a class="btn btn-outline-dark" href="tel:{SITE['phone_tel']}">{icon('phone')}{esc(SITE['phone_display'])}</a>
          </div>
        </div>
      </section>"""


def page_hero(C, locale, eyebrow, title, lead, crumbs, path, art=""):
    crumb_html = "".join(
        f'<li><a href="{attr(h)}">{esc(label)}</a></li>' if h else f"<li>{esc(label)}</li>"
        for label, h in crumbs)
    hidden = ' aria-hidden="true"' if art.lstrip().startswith("<svg") else ""
    art_html = f'<div class="page-hero-art"{hidden}>{art}</div>' if art else ""
    return f"""<section class="page-hero{' has-art' if art else ''}">
        <div class="wrap page-hero-inner">
          <div class="page-hero-copy">
            <nav class="crumbs" aria-label="{attr('Breadcrumb' if locale == 'en' else 'Ruta de navegación')}"><ol>{crumb_html}</ol></nav>
            <p class="label-mono eyebrow">{esc(eyebrow)}</p>
            <h1 class="page-h1">{esc(title)}</h1>
            <p class="lead page-lead">{esc(lead)}</p>
          </div>
          {art_html}
        </div>
      </section>"""
