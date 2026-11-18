/**
 * Lead/booking storage + owner email. Runs where the database keys exist (Lovable hosting).
 * A copy hosted elsewhere (e.g. Vercel) has no database keys, so it relays each submission
 * to the main site's /api/public/* endpoints, which save it and send the email.
 */
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { formatPhone, notifyOwner } from "./notify.server";
import type { BookingData, BookingResult, LeadData, LeadResult } from "./leads.schema";
import { phoneDigits } from "./leads.schema";

/** Main site that owns the database; override with LEADS_API_URL on another host. */
export const DEFAULT_LEADS_API_URL = "https://roofingcenturionmiami.lovable.app";

const SOURCE_LABEL: Record<string, string> = {
  form: "Inspection form",
  inspection: "Inspection form",
  estimate: "Price calculator",
};
const DETAIL_LABEL: Record<string, string> = {
  material: "Material",
  sqft: "Roof size (sq ft)",
  email: "Email",
};
const WINDOW_LABEL = { am: "7–10 AM", mid: "10 AM–1 PM", pm: "1–4 PM" } as const;
const usd = (n: unknown) => `$${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

/** Readable email rows for the extra form fields (calculator range, material, size…). */
function detailRows(d: Record<string, string | number | boolean> | undefined) {
  if (!d) return [] as [string, string | number | boolean][];
  const rows: [string, string | number | boolean][] = [];
  if (d["low"] !== undefined && d["high"] !== undefined)
    rows.push(["Price range", `${usd(d["low"])} – ${usd(d["high"])}`]);
  for (const [k, val] of Object.entries(d)) {
    if (k === "low" || k === "high") continue;
    rows.push([DETAIL_LABEL[k] ?? k, val]);
  }
  return rows;
}

/** True when this deployment can write to the database itself. */
export function hasLocalBackend() {
  return Boolean(process.env["SUPABASE_URL"] && process.env["SUPABASE_SERVICE_ROLE_KEY"]);
}

function relayBase() {
  return (process.env["LEADS_API_URL"] || DEFAULT_LEADS_API_URL).replace(/\/+$/, "");
}

/** Forwards to the main site; never throws. */
export async function relay<T>(path: string, init: RequestInit, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${relayBase()}/api/public/${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok && res.status !== 400 && res.status !== 409) {
      console.error(`relay ${path} failed [${res.status}]`);
      return fallback;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.error(`relay ${path} error`, e);
    return fallback;
  }
}

export async function saveLead(v: LeadData): Promise<LeadResult> {
  const { error } = await supabaseAdmin.from("leads").insert({
    name: v.name ?? "—",
    phone: phoneDigits(v.phone),
    zip: v.zip ?? null,
    project: v.project ?? null,
    locale: v.locale,
    source: v.source,
    page: v.page ?? null,
    details: v.details ?? null,
    consent: v.consent,
  });
  if (error) {
    console.error("saveLead", error.message);
    return { ok: false, error: "server" };
  }
  const label = SOURCE_LABEL[v.source] ?? v.source;
  await notifyOwner(`New lead (${label}): ${v.name ?? formatPhone(phoneDigits(v.phone))}`, [
    ["Form", label],
    ["Name", v.name],
    ["Phone", formatPhone(phoneDigits(v.phone))],
    ["ZIP", v.zip],
    ["Project", v.project],
    ["Language", v.locale.toUpperCase()],
    ["Page", v.page],
    ...detailRows(v.details),
    ["Consent to contact", v.consent ? "yes" : "no"],
  ]);
  return { ok: true };
}

/** Arrival windows already requested for a day (no personal data leaves the server). */
export async function takenWindows(date: string): Promise<string[]> {
  const { data: rows, error } = await supabaseAdmin
    .from("booking_requests")
    .select("time_window")
    .eq("visit_date", date)
    .neq("status", "cancelled");
  if (error) {
    console.error("takenWindows", error.message);
    return [];
  }
  return Array.from(new Set((rows ?? []).map((r) => r.time_window)));
}

export async function saveBooking(v: BookingData): Promise<BookingResult> {
  const { count } = await supabaseAdmin
    .from("booking_requests")
    .select("id", { count: "exact", head: true })
    .eq("visit_date", v.date)
    .eq("time_window", v.window)
    .neq("status", "cancelled");
  if ((count ?? 0) > 0) return { ok: false, error: "taken" };
  const { error } = await supabaseAdmin.from("booking_requests").insert({
    visit_date: v.date,
    time_window: v.window,
    name: v.name,
    phone: phoneDigits(v.phone),
    locale: v.locale,
    consent: v.consent,
  });
  if (error) {
    console.error("saveBooking", error.message);
    return { ok: false, error: "server" };
  }
  await notifyOwner(`New inspection booking: ${v.name}, ${v.date}`, [
    ["Form", "Chat booking"],
    ["Name", v.name],
    ["Phone", formatPhone(phoneDigits(v.phone))],
    ["Visit date", v.date],
    ["Arrival window", WINDOW_LABEL[v.window]],
    ["Language", v.locale.toUpperCase()],
  ]);
  return { ok: true };
}
