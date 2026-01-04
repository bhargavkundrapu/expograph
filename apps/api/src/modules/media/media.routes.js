
const { mediaTokenLimiter } = require("../../middlewares/rate-limit/rateLimiters");


// apps/api/src/modules/media/media.routes.js

const attachDevice = require("../../middlewares/device/attachDevice");
// /mnt/e/ExpoGraph/apps/api/src/modules/media/media.routes.js

const express = require("express");
const controller = require("./media.controller");

// requireAuth can be exported in different styles; handle both
const authMod = require("../../middlewares/auth/requireAuth");
const requireAuth = typeof authMod === "function" ? authMod : authMod.requireAuth;

// requirePermission can be either:
// A) factory: (permKey) => (req,res,next)
// B) middleware: (req,res,next) using req.requiredPermission
const permMod = require("../../middlewares/rbac/requirePermission");
const baseRequirePermission =
  typeof permMod === "function" ? permMod : permMod.requirePermission;

// wrapper that works for both patterns
function requirePermission(permKey) {
  // If it looks like middleware (req,res,next)
  if (typeof baseRequirePermission === "function" && baseRequirePermission.length >= 3) {
    return (req, res, next) => {
      req.requiredPermission = permKey;
      return baseRequirePermission(req, res, next);
    };
  }
  // If it looks like factory (permKey) => middleware
  return baseRequirePermission(permKey);
}
const ipLimit = rateLimitMemory({
  windowMs: 10 * 60 * 1000,
  max: 60,
  keyFn: (req) => `ip:${req.ip}`,
});

// Simple in-memory rate limiter
function rateLimitMemory({ windowMs, max, keyFn }) {
  const hits = new Map();

  return (req, res, next) => {
    const key = keyFn(req);
    const now = Date.now();

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    entry.count += 1;
    if (entry.count > max) {
      const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfterSec));
      return res.status(429).json({ message: "Too many requests. Please wait." });
    }
    return next();
  };
}


const router = express.Router();

router.post(
  "/playback-token",
  requireAuth,
  mediaTokenLimiter,
  attachDevice,
  // TEMP: use content:read if you haven't seeded media:token yet
  requirePermission("content:read"),
  rateLimitMemory({
    windowMs: 10 * 60 * 1000,
    max: 30,
    keyFn: (req) => `u:${req.user?.id || "anon"}`,
  }),
  ipLimit,
  controller.playbackToken
);

module.exports = router;
