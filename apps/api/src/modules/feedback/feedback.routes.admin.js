// apps/api/src/modules/feedback/feedback.routes.admin.js
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const controller = require("./feedback.controller.admin");

const router = express.Router();
router.use(requireAuth, requireRole(["SuperAdmin"]));

router.get("/", controller.listFeedback);

module.exports = { router };
