import { createFileRoute } from "@tanstack/react-router";

// Relay endpoint for copies of the site hosted elsewhere (e.g. Vercel). GET returns only which
// arrival windows of a day are taken (no personal data); POST books a visit with full validation.
export const Route = createFileRoute("/api/public/booking")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { DATE } = await import("@/lib/leads.schema");
        const date = DATE.safeParse(new URL(request.url).searchParams.get("date"));
        if (!date.success) return Response.json({ taken: [] }, { status: 400 });
        const { takenWindows } = await import("@/lib/leads.server");
        return Response.json({ taken: await takenWindows(date.data) });
      },
      POST: async ({ request }) => {
        const { parseBooking } = await import("@/lib/leads.schema");
        const text = await request.text();
        let body: unknown = null;
        try {
          body = text.length > 10_000 ? null : JSON.parse(text);
        } catch {
          body = null;
        }
        const p = parseBooking(body);
        if (!p.ok) return Response.json(p.result, { status: 400 });
        const { saveBooking } = await import("@/lib/leads.server");
        const result = await saveBooking(p.data);
        const status = result.ok ? 200 : result.error === "taken" ? 409 : 500;
        return Response.json(result, { status });
      },
    },
  },
});
