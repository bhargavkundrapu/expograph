// apps/api/src/modules/certifications/certifications.routes.js
// Student routes: GET /eligible, POST /request
// Mount at /api/v1/certifications
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");
const ctrl = require("./certifications.controller");

const router = express.Router();
router.use(requireAuth, requireRole(["Student"]));

router.get("/eligible", ctrl.getEligible);
router.post("/request", ctrl.postRequest);

module.exports = { router };
