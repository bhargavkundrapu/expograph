// apps/api/src/modules/progress/progress.routes.js
const express = require("express");
const ctrl = require("./progress.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const { createProgressRateLimiter } = require("./progress.ratelimit");

const router = express.Router();
const progressRateLimit = createProgressRateLimiter({ windowMs: 5000 });

// Student progress
router.post(
  "/lessons/:lessonId/start",
  requireAuth,
  requirePermission("progress:write"),
  ctrl.start
);

router.post(
  "/lessons/:lessonId/progress",
  requireAuth,
  requirePermission("progress:write"),
  progressRateLimit,
  ctrl.progress
);

router.post(
  "/lessons/:lessonId/complete",
  requireAuth,
  requirePermission("progress:write"),
  ctrl.complete
);

router.get(
  "/progress/summary",
  requireAuth,
  requirePermission("progress:read"),
  ctrl.summary
);

module.exports = { router };
