// apps/api/src/modules/leads/leads.routes.admin.js
const express = require("express");
const ctrl = require("./leads.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");

const router = express.Router();
router.use(requireAuth, requirePermission("leads:manage"));

router.get("/leads", ctrl.listAdminLeads);
router.patch("/leads/:id", ctrl.updateAdminLead);

module.exports = { router };
