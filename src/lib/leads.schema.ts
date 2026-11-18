/** Form validation shared by the server functions and the public relay endpoints. */
import { z } from "zod";

export const LOCALE = z.enum(["en", "es", "fr"]);
export const phoneDigits = (v: string) => v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
const phone = z
  .string()
  .trim()
  .max(40)
  .refine((v) => phoneDigits(v).length === 10, "phone");

export const leadSchema = z.object({
  /** Optional for quick forms (estimate send-to-phone); required by the inspection form UI. */
  name: z.string().trim().min(2).max(120).optional(),
  phone,
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/)
    .optional(),
  project: z.string().trim().max(40).optional(),
  locale: LOCALE,
  source: z.string().trim().max(40).default("form"),
  page: z.string().trim().max(200).optional(),
  details: z
    .record(z.string().max(40), z.union([z.string().max(200), z.number(), z.boolean()]))
    .refine((d) => Object.keys(d).length <= 20)
    .optional(),
  consent: z.boolean().default(false),
  /** Honeypot: bots fill it, people never see it. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export const WINDOW = z.enum(["am", "mid", "pm"]);
export const DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const bookingSchema = z.object({
  date: DATE,
  window: WINDOW,
  name: z.string().trim().min(2).max(120),
  phone,
  locale: LOCALE,
  consent: z.literal(true),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
export type LeadField = "name" | "phone" | "zip" | "project" | "consent";
export type LeadResult =
  { ok: true } | { ok: false; field?: LeadField; error: "invalid" | "server" };
export type BookingInput = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;
export type BookingResult =
  { ok: true } | { ok: false; error: "invalid" | "taken" | "server"; field?: string };

/** Validates a lead; honeypot hits come back as `bot` so callers can drop them silently. */
export function parseLead(
  input: unknown,
):
  | { ok: true; data: LeadData }
  | { ok: false; bot: true }
  | { ok: false; bot: false; result: LeadResult } {
  const parsed = leadSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };
  const field = parsed.error.issues[0]?.path[0];
  if (field === "website") return { ok: false, bot: true };
  return {
    ok: false,
    bot: false,
    result: { ok: false, error: "invalid", field: field as LeadField },
  };
}

export function parseBooking(
  input: unknown,
): { ok: true; data: BookingData } | { ok: false; result: BookingResult } {
  const parsed = bookingSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };
  return {
    ok: false,
    result: { ok: false, error: "invalid", field: String(parsed.error.issues[0]?.path[0] ?? "") },
  };
}
