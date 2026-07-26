type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Simple in-memory, fixed-window rate limiter.
 *
 * NOTE: state lives in process memory, so it does not share state across
 * multiple server instances or serverless invocations. This is fine for
 * a single-instance deployment; for multi-instance production traffic,
 * swap the implementation for a shared store (e.g. Upstash Redis) — the
 * call sites (`checkRateLimit`) will not need to change.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
