// apps/api/src/modules/featureFlags/featureFlags.routes.admin.js
const express = require("express");
const ctrl = require("./featureFlags.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");

const router = express.Router();

router.use(requireAuth, requirePermission("featureflags:manage"));

router.get("/feature-flags", ctrl.list);
router.patch("/feature-flags/:key", ctrl.setOne);

module.exports = { router };
