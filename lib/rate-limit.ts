// In-memory sliding-window limiter. Resets per server instance, so it only slows
// casual abuse. Swap for Upstash Redis before launch (docs/08-tech-architecture.md).
export type RateLimiter = (key: string, now?: number) => boolean;

export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const hits = new Map<string, number[]>();

  return (key, now = Date.now()) => {
    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    hits.set(key, [...recent, now]);
    return true;
  };
}
