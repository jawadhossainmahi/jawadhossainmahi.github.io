import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const LIMIT = 5
const WINDOW_MS = 3 * 60 * 60 * 1000 // 3 hours

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  /** Epoch ms when the limit resets for this IP. */
  resetAt: number
}

let upstashLimiter: Ratelimit | null = null

function getUpstashLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  if (!upstashLimiter) {
    upstashLimiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(LIMIT, '3 h'),
      prefix: 'portfolio-chat',
    })
  }
  return upstashLimiter
}

// Fallback used when Upstash isn't configured (e.g. local dev). Resets on process
// restart / serverless cold start — fine for local testing, not a hard guarantee in
// production. Configure UPSTASH_REDIS_REST_URL / TOKEN for a persistent limit.
const memoryStore = new Map<string, number[]>()

function checkInMemory(ip: string): RateLimitResult {
  const now = Date.now()
  const windowStart = now - WINDOW_MS
  const timestamps = (memoryStore.get(ip) ?? []).filter((t) => t > windowStart)

  if (timestamps.length >= LIMIT) {
    return { allowed: false, remaining: 0, resetAt: timestamps[0] + WINDOW_MS }
  }

  timestamps.push(now)
  memoryStore.set(ip, timestamps)
  return { allowed: true, remaining: LIMIT - timestamps.length, resetAt: now + WINDOW_MS }
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const limiter = getUpstashLimiter()
  if (!limiter) return checkInMemory(ip)

  const result = await limiter.limit(ip)
  return {
    allowed: result.success,
    remaining: result.remaining,
    resetAt: result.reset,
  }
}
