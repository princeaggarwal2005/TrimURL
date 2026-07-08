import "./loadEnv.js";
import Redis from "ioredis";

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in .env");
}

const redis = new Redis(process.env.REDIS_URL, {
  tls: {},
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});

export default redis;
