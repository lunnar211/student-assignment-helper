import { NextResponse } from "next/server";

/**
 * Simple in-memory per-IP rate limiter for the free /api/* routes.
 * No auth, no paywall — it only stops one abusive user burning the
 * shared free Pollinations quota for everyone else.
 * NOTE: a single server instance keeps its own counters; on Vercel's
 * multi-instance hosting this is a per-instance limit, which is still
 * enough to blunt abuse.
 */

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

/**
 * Returns a 429 response when the IP has exceeded `limit` requests in
 * the last `windowMs` milliseconds, otherwise null (allowed).
 */
export function rateLimit(
  req: Request,
  limit: number,
  windowMs: number,
): NextResponse | null {
  const ip = clientIp(req);
  const now = Date.now();
  const bucket = buckets.get(ip) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
  if (bucket.timestamps.length >= limit) {
    const retryAfter = Math.ceil((bucket.timestamps[0] + windowMs - now) / 1000);
    return NextResponse.json(
      {
        error: `Too many requests. Please wait ${retryAfter} second${retryAfter === 1 ? "" : "s"} and try again.`,
      },
      { status: 429, headers: { "Retry-After": String(Math.max(retryAfter, 1)) } },
    );
  }
  bucket.timestamps.push(now);
  buckets.set(ip, bucket);
  // Keep the map bounded.
  if (buckets.size > 10000) {
    for (const [key, b] of buckets) {
      if (b.timestamps.length === 0 || now - b.timestamps[b.timestamps.length - 1] > windowMs) {
        buckets.delete(key);
      }
    }
  }
  return null;
}

/** AI-backed routes (shared free quota): 20 requests per minute per IP. */
export const AI_RATE_LIMIT = { limit: 20, windowMs: 60_000 };
/** Cheap local routes (heuristic / word-overlap only): 60 per minute per IP. */
export const LOCAL_RATE_LIMIT = { limit: 60, windowMs: 60_000 };
