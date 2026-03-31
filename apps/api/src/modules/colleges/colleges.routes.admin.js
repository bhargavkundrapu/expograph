/**
 * SuperAdmin colleges API - GET/POST /api/v1/admin/colleges, DELETE /api/v1/admin/colleges/:id
 * Must be mounted BEFORE adminContentRouter so /colleges is matched correctly.
 */
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const { asyncHandler } = require("../../utils/asyncHandler");
const ctrl = require("./colleges.controller");

const router = express.Router();

// All routes require SuperAdmin
router.use(requireAuth, requireRole(["SuperAdmin"]));

router.get("/", asyncHandler(ctrl.list));
router.post("/", asyncHandler(ctrl.add));
router.delete("/:id", asyncHandler(ctrl.remove));

module.exports = { router };
