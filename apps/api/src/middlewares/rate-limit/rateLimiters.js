// /mnt/e/ExpoGraph/apps/api/src/middlewares/rateLimiters.js
// /mnt/e/ExpoGraph/apps/api/src/middlewares/rate-limit/rateLimiters.js
const erl = require("express-rate-limit");
const rateLimit = erl.rateLimit || erl;   // works if package exports {rateLimit} or default
const { ipKeyGenerator } = erl;


// 1) AUTH LIMITER (login/register/otp)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,                  // 30 requests per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many auth attempts. Try again later." },
});

const mediaTokenLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many token requests. Slow down." },
  keyGenerator: (req) =>
    req.auth?.userId ? `u:${req.auth.userId}` : ipKeyGenerator(req.ip, 64),
});

const progressLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many progress updates. Slow down." },
  keyGenerator: (req) =>
    req.auth?.userId ? `u:${req.auth.userId}` : ipKeyGenerator(req.ip, 64),
});


module.exports = { authLimiter, mediaTokenLimiter, progressLimiter };
