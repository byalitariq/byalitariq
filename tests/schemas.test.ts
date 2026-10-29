import { describe, expect, it } from "vitest";
import { leadRequestSchema, missingRequiredFields } from "@/lib/schemas";

const validContact = {
  source: "contact",
  name: "Sam",
  email: "sam@example.com",
  message: "Automate my lead follow-up",
};

describe("leadRequestSchema", () => {
  it("accepts a valid contact lead", () => {
    expect(leadRequestSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = leadRequestSchema.safeParse({ ...validContact, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown source", () => {
    const result = leadRequestSchema.safeParse({ ...validContact, source: "spam" });
    expect(result.success).toBe(false);
  });

  it("requires a website for audit requests", () => {
    const result = leadRequestSchema.safeParse({ ...validContact, source: "audit" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["website"]);
  });

  it("allows a newsletter signup with only an email", () => {
    const result = leadRequestSchema.safeParse({ source: "newsletter", email: "a@b.co" });
    expect(result.success).toBe(true);
  });

  it("rejects oversized payloads", () => {
    const result = leadRequestSchema.safeParse({
      source: "roi-calculator",
      email: "a@b.co",
      payload: { blob: "x".repeat(5000) },
    });
    expect(result.success).toBe(false);
  });

  it("rejects messages over 2000 characters", () => {
    const result = leadRequestSchema.safeParse({ ...validContact, message: "x".repeat(2001) });
    expect(result.success).toBe(false);
  });
});

describe("missingRequiredFields", () => {
  it("lists every missing field for the source", () => {
    const missing = missingRequiredFields("audit", { email: "a@b.co" }).map((issue) => issue.path);
    expect(missing).toEqual(["name", "website", "message"]);
  });

  it("returns nothing for sources without extra requirements", () => {
    expect(missingRequiredFields("newsletter", { email: "a@b.co" })).toEqual([]);
  });
});
