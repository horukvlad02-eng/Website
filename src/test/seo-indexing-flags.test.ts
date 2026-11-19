import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { META } from "@/content/meta";
import { LOCALES } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/lib/site";

/**
 * Demo guard rails (audit H-3, R-1, R-2).
 *
 * The site ships as a concept pitch: `SITE.demo` shows the disclaimer banner and every page must
 * stay `noindex`. `SITE.indexable` and `SITE.demo` are two switches in one file, so they can
 * silently disagree — e.g. flipping `indexable` while robots.txt still disallows everything
 * (uncrawlable) or opening robots.txt while `indexable` is still false (still noindex).
 * These assertions fail loudly if that happens.
 */

const robotsTxt = readFileSync("public/robots.txt", "utf8");

describe("Indexing flags", () => {
  it("keeps SITE.indexable and SITE.demo in agreement", () => {
    expect(SITE.indexable).toBe(!SITE.demo);
  });

  it("never emits an indexable robots directive while the site is a demo", () => {
    expect(SITE.demo).toBe(true);

    for (const locale of LOCALES) {
      const head = pageHead({
        locale,
        path: "/",
        ...META.home[locale],
      });
      const robots = head.meta.find((m) => m.name === "robots");
      expect(robots).toBeDefined();
      const directives = String(robots?.content)
        .split(",")
        .map((d) => d.trim());
      expect(directives).toContain("noindex");
      expect(directives).not.toContain("index");
    }
  });

  it("keeps robots.txt disallowing every crawler while the site is a demo", () => {
    expect(SITE.demo).toBe(true);

    const starBlock = robotsTxt
      .split(/\n\s*\n/)
      .find((block) => /^\s*User-agent:\s*\*\s*$/m.test(block));
    expect(starBlock).toBeDefined();
    expect(starBlock).toMatch(/^\s*Disallow:\s*\/\s*$/m);
  });
});
