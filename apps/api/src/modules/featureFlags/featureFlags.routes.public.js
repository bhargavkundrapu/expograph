// apps/api/src/modules/featureFlags/featureFlags.routes.public.js
const express = require("express");
const ctrl = require("./featureFlags.controller");
const { resolveTenant } = require("../../middlewares/tenant/resolveTenant");

const router = express.Router();

// Public read-only endpoint for feature flags (no auth required, but tenant is resolved)
router.use(resolveTenant);
router.get("/feature-flags", ctrl.listPublic);

module.exports = { router };

