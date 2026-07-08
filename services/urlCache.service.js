import redis from "../config/redis.js";

const TTL_SECONDS = 3600; // cache entries for 1 hour

const cacheKey = (shortId) => `url:${shortId}`;

// Read shortId → originalUrl from Redis (cache-aside READ)
export async function getCachedUrl(shortId) {
  const cached = await redis.get(cacheKey(shortId));
  if (!cached) return null;
  return JSON.parse(cached);
}

// Store mapping after create or after MongoDB miss
export async function setCachedUrl(shortId, data) {
  await redis.set(cacheKey(shortId), JSON.stringify(data), "EX", TTL_SECONDS);
}
