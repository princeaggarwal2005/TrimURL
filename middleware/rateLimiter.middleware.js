import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "../config/redis.js";

// rate limit for creating short urls
export const createUrlLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:create_url:",
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 requests per hour
  message: "Too many URLs created from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
});
//rate limit for for auth routes
export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:auth:",
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: "Too many auth attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
});
// Rate limiter for analytics
export const analyticsLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix: "rl:analytics:",
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per hour
  message: "Too many analytics requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
});