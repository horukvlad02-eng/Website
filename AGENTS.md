
## Project rules

- Pages live under `src/routes/{-$locale}/` (EN at `/`, ES at `/es/`, FR at `/fr/`); all text comes from `src/content/*` per locale, never hard-coded in JSX — keeps the three languages in sync.
- Route `head()`/`beforeLoad` read only `src/content/meta.ts`, never the big content files — anything a head touches lands in the shared startup script for every page.
- Animations go through the single shared engine in `src/components/motion/` (`Reveal`, `Words`, `data-*` hooks); no per-component scroll listeners, polling or animation libraries, and animate only `transform`/`opacity` (no clip-path or blur animations) — these were the cause of the original site's lag.
- Real `backdrop-filter` blur only via `.glass-bar`, `.glass-panel`, `.glass-chip.on-photo` and hero glass (small, few on screen), never on section cards; each must have the `html.lite` solid fallback, and no ancestor of a frosted element may carry `view-transition-name`, opacity < 1 or a filter (that cuts off the blur).
- Images use `Img` with pre-sized webp variants; never ship full-size originals — keeps pages light.
- Leads and chat bookings are saved only through validated server functions in `src/lib/*.functions.ts` — the browser never writes to the database directly.
- After a lead/booking is saved, the server emails the owner via `notifyOwner` in `src/lib/notify.server.ts` (linked Gmail connector, recipient constant there); it never throws, so a mail failure can't lose a saved lead.
- Without database keys (any host other than Lovable), the lead/booking server functions relay to the main site's `/api/public/leads` and `/api/public/booking` (`LEADS_API_URL`), so forms keep working and emailing.
