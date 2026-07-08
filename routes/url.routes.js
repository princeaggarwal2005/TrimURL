import { Router } from "express";
import { createShortUrl, getAnalytics } from "../controllers/url.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {
  createUrlLimiter,
  analyticsLimiter,
} from "../middleware/rateLimiter.middleware.js";
const router = Router();

router.post("/", createUrlLimiter, protect, createShortUrl);
router.get("/analytics/:shortId", analyticsLimiter, getAnalytics);

export default router;
