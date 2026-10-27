/**
 * Very small in-memory throttle, shared by the public form endpoints.
 *
 * CAVEAT: serverless instances are ephemeral and not shared, so this only
 * slows a naive flood hitting one warm instance — it is not a real rate
 * limiter. If these endpoints start attracting spam, move to a durable store
 * (Vercel KV / Upstash) or put a CAPTCHA in front.
 */

const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, maxPerWindow = 5): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > maxPerWindow;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
