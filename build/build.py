# -*- coding: utf-8 -*-
"""Build the whole static site.

    python3 build/build.py [--out DIR]

Output layout (the folder that gets deployed to Vercel):

    index.html
    es/index.html
    services/.../index.html
    assets/styles.css, assets/app.js, assets/config.js, assets/i18n/*.js
    api/lead.js
"""
import argparse
import io
import json
import os
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import copy_en  # noqa: E402
import copy_es  # noqa: E402
import pages  # noqa: E402
from data import SITE  # noqa: E402
from strings import STRINGS  # noqa: E402

LOCALES = {"en": copy_en.COPY, "es": copy_es.COPY}


def write(path, text):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with io.open(full, "w", encoding="utf-8") as fh:
        fh.write(text)
    return full


def build(out_dir):
    written = []
    sitemap = []

    for locale, C in LOCALES.items():
        for path, html in pages.build_all(locale, C):
            clean = path
            if locale == "es":
                clean = "es/" + path
                if clean.endswith("404.html"):
                    clean = "es/404.html"
            written.append(write(os.path.join(out_dir, clean), html))
            if locale == "en" and not path.endswith("404.html"):
                sitemap.append(path.replace("index.html", ""))

    # ---------------------------------------------------------------- assets
    js = {}
    for locale, C in LOCALES.items():
        js[locale] = {
            "strings": STRINGS[locale],
            "quiz": {
                "questions": [list(q) for q in C["smile"]["questions"]],
                "results": {k: list(v) for k, v in
                            zip(("low", "mid", "high"), C["smile"]["results"])},
            },
            "form": {
                "titles": C["book"]["steps"],
                "reasonLabel": C["book"]["steps"][0],
                "daysLabel": C["book"]["days_label"],
                "timeLabel": C["book"]["time_label"],
                "newLabel": C["book"]["new_label"],
            },
        }
        write(os.path.join(out_dir, "assets/i18n", locale + ".js"),
              "window.I18N = " + json.dumps(js[locale], ensure_ascii=False, indent=2) + ";\n")

    def _hours():
        raw = __import__("data").HOURS
        out = {}
        for k, v in raw.items():
            if not v:
                out[str(k)] = None
                continue
            def num(t):
                hh, mm = t.split(":")
                return int(hh) + (int(mm) / 60 if mm else 0)
            out[str(k)] = [num(v[0]), num(v[1])]
        return out

    config = {
        "name": SITE["name"],
        "phone": SITE["phone_display"],
        "phoneTel": SITE["phone_tel"],
        "hours": _hours(),
        "leadsUrl": "/api/lead",
        "demo": True,
        "locale": "en",
        "timezone": "America/Chicago",
    }
    write(os.path.join(out_dir, "assets/config.js"),
          "window.SITE = " + json.dumps(config, ensure_ascii=False, indent=2) + ";\n")

    # --------------------------------------------------------------- sitemap
    urls = []
    base = SITE["site_url"].rstrip("/")
    for p in sitemap:
        p = p.rstrip("/")  # match canonical URLs (vercel.json: trailingSlash false)
        en_url = f"{base}/{p}" if p else f"{base}/"
        es_url = f"{base}/es/{p}" if p else f"{base}/es/"
        for loc in (en_url, es_url):
            urls.append(f"""  <url>
    <loc>{loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{en_url}"/>
    <xhtml:link rel="alternate" hreflang="es" href="{es_url}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="{en_url}"/>
  </url>""")
    sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
{chr(10).join(urls)}
</urlset>
"""
    write(os.path.join(out_dir, "sitemap.xml"), sitemap_xml)

    # ------------------------------------------------- cache-busting (?v=hash)
    # Browsers keep /assets/* for a while; a content hash in the URL makes every
    # change to CSS/JS show up on the next page load.
    import hashlib, re
    def ver(rel):
        with open(os.path.join(out_dir, rel), "rb") as fh:
            return hashlib.sha1(fh.read()).hexdigest()[:10]
    assets = ["assets/styles.css", "assets/app.js", "assets/config.js",
              "assets/i18n/en.js", "assets/i18n/es.js"]
    stamps = {a: ver(a) for a in assets}
    for f in written:
        if not f.endswith(".html"):
            continue
        with open(f, encoding="utf-8") as fh:
            html = fh.read()
        for a, v in stamps.items():
            html = re.sub(r'(["\'])/' + re.escape(a) + r'(?:\?v=[0-9a-f]+)?\1', r'\1/' + a + "?v=" + v + r'\1', html)
        with open(f, "w", encoding="utf-8") as fh:
            fh.write(html)
    return written


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="", help="subfolder to write into (default: site root)")
    args = ap.parse_args()
    out = args.out
    files = build(out)
    print(f"Built {len(files)} pages.")
    for f in sorted(files):
        print(" ", os.path.relpath(f, ROOT))


if __name__ == "__main__":
    main()
