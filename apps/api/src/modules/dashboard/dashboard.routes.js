// apps/api/src/modules/dashboard/dashboard.routes.js
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const ctrl = require("./dashboard.controller");

const router = express.Router();

// SuperAdmin only routes
router.use(requireAuth, requireRole(["SuperAdmin"]));

router.get("/stats", ctrl.getDashboardStats);
router.get("/activity", ctrl.getRecentActivity);
router.get("/alerts", ctrl.getSystemAlerts);

module.exports = { router };
