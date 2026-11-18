/** Owner notifications: every lead and chat booking is emailed through the linked Gmail account. */
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
export const LEAD_EMAIL_TO = "horukvlad02@gmail.com";

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[ -~]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);

/** Strip CR/LF so user input can never inject extra mail headers. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

export function buildRawEmail(to: string, subject: string, body: string) {
  const msg = [
    `To: ${to}`,
    `Subject: ${header(oneLine(subject))}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    b64(body),
  ].join("\r\n");
  return b64(msg).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function formatPhone(digits: string) {
  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    : digits;
}

/** Sends one notification; never throws — a mail hiccup must not lose the saved lead. */
export async function notifyOwner(
  subject: string,
  rows: [string, string | number | boolean | null | undefined][],
) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
  if (!lovableKey || !gmailKey) {
    console.error("notifyOwner: Gmail connection is not configured");
    return false;
  }
  const body =
    rows
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${k}: ${oneLine(String(v))}`)
      .join("\n") + `\n\nSent ${new Date().toISOString()} by centurion website`;
  try {
    const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
      },
      body: JSON.stringify({ raw: buildRawEmail(LEAD_EMAIL_TO, subject, body) }),
    });
    if (!res.ok) {
      console.error(`notifyOwner failed [${res.status}]: ${await res.text()}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error("notifyOwner error", e);
    return false;
  }
}
