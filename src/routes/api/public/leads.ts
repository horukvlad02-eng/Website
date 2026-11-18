import { createFileRoute } from "@tanstack/react-router";

// Relay endpoint for copies of the site hosted elsewhere (e.g. Vercel): same validation and
// result shape as the submitLead server function; returns no stored data.
export const Route = createFileRoute("/api/public/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { parseLead } = await import("@/lib/leads.schema");
        const body = await readJson(request);
        const p = parseLead(body);
        if (!p.ok)
          return p.bot ? Response.json({ ok: true }) : Response.json(p.result, { status: 400 });
        const { saveLead } = await import("@/lib/leads.server");
        const result = await saveLead(p.data);
        return Response.json(result, { status: result.ok ? 200 : 500 });
      },
    },
  },
});

async function readJson(request: Request): Promise<unknown> {
  const text = await request.text();
  if (text.length > 10_000) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
