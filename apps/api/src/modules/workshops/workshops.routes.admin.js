// apps/api/src/modules/workshops/workshops.routes.admin.js
const express = require("express");
const ctrl = require("./workshops.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");

const router = express.Router();
router.use(requireAuth, requirePermission("workshops:manage"));

router.post("/workshops", ctrl.createAdmin);
router.get("/workshops", ctrl.listAdmin);
router.patch("/workshops/:id", ctrl.updateAdmin);
router.get("/workshops/:id/registrations", ctrl.registrationsAdmin);

module.exports = { router };
