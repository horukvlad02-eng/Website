import { describe, expect, it } from "vitest";
import { LEAD_EMAIL_TO, buildRawEmail, formatPhone } from "@/lib/notify.server";

const decode = (raw: string) => {
  const b = atob(raw.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(b, (c) => c.charCodeAt(0)));
};

describe("lead notifications", () => {
  it("go to horukvlad02@gmail.com", () => {
    expect(LEAD_EMAIL_TO).toBe("horukvlad02@gmail.com");
    expect(decode(buildRawEmail(LEAD_EMAIL_TO, "New lead", "x"))).toContain(
      "To: horukvlad02@gmail.com\r\n",
    );
  });
  it("cannot get extra headers injected through the subject", () => {
    const msg = decode(buildRawEmail(LEAD_EMAIL_TO, "Hi\r\nBcc: evil@example.com", "x"));
    expect(msg).not.toMatch(/\r\nBcc:/);
  });
  it("formats US phone numbers", () => {
    expect(formatPhone("7863724754")).toBe("(786) 372-4754");
  });
});
