const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./clientLab.controller");

const router = express.Router();

router.use(requireAuth, requirePermission("clientlab:review"));

router.get("/projects/:projectId/review-queue", ctrl.reviewQueue);
router.post("/tasks/:taskId/feedback", ctrl.mentorFeedback);

module.exports = { router };
