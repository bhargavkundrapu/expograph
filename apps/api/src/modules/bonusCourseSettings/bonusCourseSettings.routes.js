// apps/api/src/modules/bonusCourseSettings/bonusCourseSettings.routes.js
const express = require("express");
const ctrl = require("./bonusCourseSettings.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");

const router = express.Router();

router.use(requireAuth, requirePermission("featureflags:manage"));

router.get("/bonus-course", ctrl.get);
router.put("/bonus-course", ctrl.set);

module.exports = { router };
