import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/work";

const SERVICE_SLUGS = ["automation", "ai-agents", "ai-marketing", "websites", "care-plan"];

describe("services content", () => {
  it("matches the five service routes in docs/02-sitemap-and-pages.md", () => {
    expect(SERVICES.map((service) => service.slug)).toEqual(SERVICE_SLUGS);
  });

  it("gives every service packages, problems and an FAQ", () => {
    for (const service of SERVICES) {
      expect(service.packages.length).toBeGreaterThan(0);
      expect(service.problems.length).toBeGreaterThan(0);
      expect(service.faq.length).toBeGreaterThan(0);
    }
  });
});

describe("case studies", () => {
  it("has a matching MDX file for every entry", () => {
    for (const study of CASE_STUDIES) {
      expect(existsSync(join(process.cwd(), "content/work", `${study.slug}.mdx`))).toBe(true);
    }
  });

  it("only references known services", () => {
    for (const study of CASE_STUDIES) {
      for (const service of study.services) expect(SERVICE_SLUGS).toContain(service);
    }
  });

  it("uses unique slugs", () => {
    const slugs = CASE_STUDIES.map((study) => study.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
