import { nanoid } from "nanoid";
import Url from "../models/url.js";
import { getCachedUrl, setCachedUrl } from "../services/urlCache.service.js";

const createShortUrl = async (req, res) => {
  const { url, customCode } = req.body || {};

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let shortId;
  if (customCode) {
    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(customCode)) {
      return res.status(400).json({
        error:
          "Custom code must be 3-20 alphanumeric characters (-, _ allowed)",
      });
    }
    // Check if custom code already exists
    const existing = await Url.findOne({ shortId: customCode });
    if (existing) {
      return res
        .status(409)
        .json({ error: "This custom code is already taken" });
    }
    shortId = customCode;
  } else {
    // Generate random if no custom code provided
    shortId = nanoid(8);
  }
  const entry = await Url.create({
    shortId,
    originalUrl: url,
    createdBy: req.user._id,
  });

  // warm cache on create so first redirect is also fast
  await setCachedUrl(shortId, {
    originalUrl: entry.originalUrl,
    _id: entry._id.toString(),
  });

  const baseUrl =
    process.env.BASE_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    `http://localhost:${process.env.PORT || 5000}`;

  res.status(201).json({
    shortId: entry.shortId,
    shortUrl: `${baseUrl}/${entry.shortId}`,
    originalUrl: entry.originalUrl,
  });
};

const redirectToUrl = async (req, res) => {
  const { shortId } = req.params;

  // 1) try Redis first (fast in-memory lookup)
  const cached = await getCachedUrl(shortId);

  if (cached) {
    // cache HIT — skip MongoDB read, only increment clicks
    await Url.updateOne({ shortId }, { $inc: { clicks: 1 } });
    return res.redirect(cached.originalUrl);
  }

  // 2) cache MISS — fall back to MongoDB
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $inc: { clicks: 1 } },
    { returnDocument: "after" }
  );

  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }

  // 3) store in Redis for next request
  await setCachedUrl(shortId, {
    originalUrl: entry.originalUrl,
    _id: entry._id.toString(),
  });

  res.redirect(entry.originalUrl);
};

const getAnalytics = async (req, res) => {
  const { shortId } = req.params;
  const entry = await Url.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.status(200).json({
    shortId: entry.shortId,
    originalUrl: entry.originalUrl,
    totalClicks: entry.clicks,
    createdAt: entry.createdAt,
  });
};

export { createShortUrl, redirectToUrl, getAnalytics };
