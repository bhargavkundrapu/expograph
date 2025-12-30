// /mnt/e/ExpoGraph/apps/api/src/middlewares/rateLimiters.js
const rateLimit = require("express-rate-limit");

// 1) AUTH LIMITER (login/register/otp)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,                  // 30 requests per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many auth attempts. Try again later." },
});

// 2) MEDIA TOKEN LIMITER (video token abuse protection)
const mediaTokenLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,             // 20 token calls per minute per user/ip
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many token requests. Slow down." },
  keyGenerator: (req) => req.auth?.userId || req.ip,
});

// 3) PROGRESS LIMITER (progress spam protection)
const progressLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,             // 60 progress updates per minute per user/ip
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many progress updates. Slow down." },
  keyGenerator: (req) => req.auth?.userId || req.ip,
});

module.exports = { authLimiter, mediaTokenLimiter, progressLimiter };
