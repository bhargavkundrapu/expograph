const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./submissions.controller.mentor");

const router = express.Router();

router.use(requireAuth);

// mentor permission
router.get("/submissions/queue", requirePermission("submissions:review"), ctrl.queue);
router.post("/submissions/:id/review", requirePermission("submissions:review"), ctrl.review);

module.exports = { router };
