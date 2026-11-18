import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_LEADS_API_URL, hasLocalBackend, relay } from "@/lib/leads.server";
import { parseLead } from "@/lib/leads.schema";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("leads on a copy hosted elsewhere (Vercel)", () => {
  it("without database keys the copy relays instead of writing itself", () => {
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    expect(hasLocalBackend()).toBe(false);
  });
  it("relays to the main Lovable site by default", async () => {
    vi.stubEnv("LEADS_API_URL", "");
    const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) =>
      Response.json({ ok: true }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const r = await relay("leads", { method: "POST", body: "{}" }, { ok: false });
    expect(r).toEqual({ ok: true });
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      "https://roofingcenturionmiami.lovable.app/api/public/leads",
    );
    expect(DEFAULT_LEADS_API_URL).toBe("https://roofingcenturionmiami.lovable.app");
  });
  it("a relay outage returns the fallback instead of crashing the form", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("down", { status: 503 })),
    );
    expect(await relay("leads", { method: "POST" }, { ok: false, error: "server" })).toEqual({
      ok: false,
      error: "server",
    });
  });
  it("silently drops honeypot (bot) submissions", () => {
    expect(parseLead({ phone: "7863724754", locale: "en", website: "spam" })).toEqual({
      ok: false,
      bot: true,
    });
  });
});
