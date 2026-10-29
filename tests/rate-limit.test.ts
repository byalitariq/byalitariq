import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("allows requests up to the limit within the window", () => {
    const allow = createRateLimiter(2, 1000);
    expect(allow("ip", 0)).toBe(true);
    expect(allow("ip", 10)).toBe(true);
    expect(allow("ip", 20)).toBe(false);
  });

  it("allows requests again once the window has passed", () => {
    const allow = createRateLimiter(1, 1000);
    expect(allow("ip", 0)).toBe(true);
    expect(allow("ip", 500)).toBe(false);
    expect(allow("ip", 1001)).toBe(true);
  });

  it("tracks each key separately", () => {
    const allow = createRateLimiter(1, 1000);
    expect(allow("a", 0)).toBe(true);
    expect(allow("b", 0)).toBe(true);
    expect(allow("a", 1)).toBe(false);
  });
});
