// apps/api/src/modules/progress/progress.ratelimit.js

/**
 * In-memory rate limit (works for single Render instance).
 * Key: tenant:user:lesson
 * Window: 5 seconds
 *
 * Later scaling -> move to Redis (Upstash) version.
 */
function createProgressRateLimiter({ windowMs = 5000 } = {}) {
  const lastHit = new Map();

  // tiny cleanup to avoid unlimited growth
  setInterval(() => {
    const now = Date.now();
    for (const [k, t] of lastHit.entries()) {
      if (now - t > windowMs * 10) lastHit.delete(k);
    }
  }, windowMs * 10).unref?.();

  return function progressRateLimit(req, res, next) {
    try {
      const tenantId = req.tenant?.id;
      const userId = req.auth?.userId;
      const lessonId = req.params?.lessonId;

      if (!tenantId || !userId || !lessonId) return next();

      const key = `${tenantId}:${userId}:${lessonId}`;
      const now = Date.now();
      const prev = lastHit.get(key);

      if (prev && now - prev < windowMs) {
        return res.status(429).json({
          ok: false,
          error: "Too many progress updates. Please wait a few seconds.",
        });
      }

      lastHit.set(key, now);
      return next();
    } catch (e) {
      return next();
    }
  };
}

module.exports = { createProgressRateLimiter };
