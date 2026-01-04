// apps/api/src/modules/referrals/referrals.routes.js
const express = require("express");
const ctrl = require("./referrals.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");

const router = express.Router();

// student
router.get("/me/referral-code", requireAuth, ctrl.getMyCode);

// admin
router.get("/admin/referrals/events", requireAuth, requirePermission("referrals:manage"), ctrl.listAdminEvents);

module.exports = { router };
