import { createServerFn } from "@tanstack/react-start";
import {
  DATE,
  parseBooking,
  parseLead,
  type BookingInput,
  type BookingResult,
  type LeadInput,
  type LeadResult,
} from "./leads.schema";

export type { BookingInput, BookingResult, LeadInput, LeadResult } from "./leads.schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: LeadInput) => input)
  .handler(async ({ data }): Promise<LeadResult> => {
    const p = parseLead(data);
    if (!p.ok) return p.bot ? { ok: true } : p.result; // bots are dropped silently
    const core = await import("./leads.server");
    if (core.hasLocalBackend()) return core.saveLead(p.data);
    return core.relay<LeadResult>(
      "leads",
      { method: "POST", body: JSON.stringify(p.data) },
      { ok: false, error: "server" },
    );
  });

/** Arrival windows already requested for a day (no personal data leaves the server). */
export const getTakenWindows = createServerFn({ method: "GET" })
  .inputValidator((input: { date: string }) => ({ date: DATE.parse(input.date) }))
  .handler(async ({ data }): Promise<string[]> => {
    const core = await import("./leads.server");
    if (core.hasLocalBackend()) return core.takenWindows(data.date);
    const r = await core.relay<{ taken?: string[] }>(
      `booking?date=${data.date}`,
      { method: "GET" },
      {},
    );
    return Array.isArray(r.taken) ? r.taken.filter((w) => typeof w === "string") : [];
  });

export const requestBooking = createServerFn({ method: "POST" })
  .inputValidator((input: BookingInput) => input)
  .handler(async ({ data }): Promise<BookingResult> => {
    const p = parseBooking(data);
    if (!p.ok) return p.result;
    const core = await import("./leads.server");
    if (core.hasLocalBackend()) return core.saveBooking(p.data);
    return core.relay<BookingResult>(
      "booking",
      { method: "POST", body: JSON.stringify(p.data) },
      { ok: false, error: "server" },
    );
  });
