import { Router } from "express";
import { createShortUrl, getAnalytics } from "../controllers/url.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {
  createUrlLimiter,
  analyticsLimiter,
} from "../middleware/rateLimiter.middleware.js";

const router = Router();

/**
 * @swagger
 * /url:
 *   post:
 *     summary: Create a short URL
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/very/long/url
 *               customCode:
 *                 type: string
 *                 example: my-link
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortId:
 *                   type: string
 *                   example: abc12345
 *                 shortUrl:
 *                   type: string
 *                   example: http://localhost:5000/abc12345
 *                 originalUrl:
 *                   type: string
 *                   example: https://example.com/very/long/url
 *       400:
 *         description: URL is required
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Custom code already taken
 *       429:
 *         description: Too many requests
 */
router.post("/", createUrlLimiter, protect, createShortUrl);

/**
 * @swagger
 * /url/analytics/{shortId}:
 *   get:
 *     summary: Get analytics for a short URL
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *         example: abc12345
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortId:
 *                   type: string
 *                   example: abc12345
 *                 originalUrl:
 *                   type: string
 *                   example: https://example.com
 *                 totalClicks:
 *                   type: number
 *                   example: 42
 *                 createdAt:
 *                   type: string
 *                   example: 2024-01-15T10:30:00Z
 *       404:
 *         description: Short URL not found
 *       429:
 *         description: Too many requests
 */
router.get("/analytics/:shortId", analyticsLimiter, getAnalytics);

export default router;
