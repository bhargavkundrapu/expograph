const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./submissions.controller.lms");

const router = express.Router();

router.use(requireAuth);

// student permission
router.post("/tasks/:taskId/submissions", requirePermission("practice:submit"), ctrl.submit);
router.get("/submissions/mine", requirePermission("submissions:read"), ctrl.mine);

module.exports = { router };
