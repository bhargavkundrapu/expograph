const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const { resumePdfLimiter } = require("../../middlewares/rate-limit/rateLimiters");
const { asyncHandler } = require("../../utils/asyncHandler");
const ctrl = require("./resume.controller");

const router = express.Router();

router.post(
  "/pdf",
  requireAuth,
  requireRole(["Student"]),
  resumePdfLimiter,
  asyncHandler(ctrl.postPdf)
);

module.exports = { router };
