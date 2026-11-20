// Vercel serverless function: receives appointment requests from the site and forwards them.
// Configure at least one channel in Vercel → Settings → Environment Variables, then Redeploy:
//   Telegram: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
//   Email (Resend): RESEND_API_KEY + LEAD_TO_EMAIL (+ optional LEAD_FROM_EMAIL)
//   Any webhook (Make, Zapier, n8n, Google Apps Script): LEAD_WEBHOOK_URL
// With none configured the function answers 503 and the live site asks the visitor to call.

const REASONS = new Set([
  "Cleaning & exam",
  "Toothache or pain",
  "Broken tooth",
  "Trouble with a filling",
  "Cosmetic dentistry",
  "Orthodontics",
  "Dental implants",
  "Something else",
]);

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const clip = (s, n) => String(s ?? "").trim().slice(0, n);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  // Honeypot: bots fill the hidden "company" field. Pretend it worked.
  if (body.company) return res.status(200).json({ ok: true });

  const lead = {
    reason: REASONS.has(body.reason) ? body.reason : "Something else",
    days: Array.isArray(body.days) ? body.days.filter((d) => ["Tue", "Wed", "Thu", "Fri", "Sat"].includes(d)) : [],
    time: ["Mornings", "Afternoons", "Either"].includes(body.time) ? body.time : "Either",
    newPatient: body.newPatient === "No" ? "No" : "Yes",
    firstName: clip(body.firstName, 60),
    lastName: clip(body.lastName, 60),
    phone: clip(body.phone, 30),
    email: clip(body.email, 120),
    note: clip(body.note, 600),
    page: clip(body.page, 300),
  };
  if (!lead.firstName || !lead.lastName || lead.phone.replace(/\D/g, "").length < 10) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const lines = [
    ["Request", lead.reason],
    ["Name", `${lead.firstName} ${lead.lastName}`],
    ["Phone", lead.phone],
    ["Email", lead.email || "—"],
    ["New patient", lead.newPatient],
    ["Days", lead.days.join(", ") || "Any"],
    ["Time", lead.time],
    ["Note", lead.note || "—"],
  ];
  const subject = `New appointment request: ${lead.firstName} ${lead.lastName} (${lead.reason})`;
  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:sans-serif">${esc(subject)}</h2><table style="font-family:sans-serif;font-size:15px">${lines
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#667">${esc(k)}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`)
    .join("")}</table>`;

  const jobs = [];
  const env = process.env;
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    jobs.push(
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          parse_mode: "HTML",
          text: `🦷 <b>${esc(subject)}</b>\n\n${lines.map(([k, v]) => `<b>${esc(k)}:</b> ${esc(v)}`).join("\n")}`,
        }),
      }),
    );
  }
  if (env.RESEND_API_KEY && env.LEAD_TO_EMAIL) {
    jobs.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL || "Website <onboarding@resend.dev>",
          to: env.LEAD_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: lead.email || undefined,
          subject,
          text,
          html,
        }),
      }),
    );
  }
  if (env.LEAD_WEBHOOK_URL) {
    jobs.push(
      fetch(env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      }),
    );
  }
  if (!jobs.length) return res.status(503).json({ ok: false, error: "not_configured" });

  const results = await Promise.allSettled(jobs);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) console.error("lead delivery failed", results.map((r) => (r.status === "fulfilled" ? r.value.status : String(r.reason))));
  return res.status(delivered ? 200 : 502).json({ ok: delivered });
}
