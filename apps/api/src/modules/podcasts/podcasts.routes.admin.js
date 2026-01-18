// apps/api/src/modules/podcasts/podcasts.routes.admin.js
const express = require("express");
const ctrl = require("./podcasts.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requireRole } = require("../../middlewares/rbac/requireRole");

const router = express.Router();
router.use(requireAuth, requireRole(["TenantAdmin", "SuperAdmin"]));

// Series routes
router.post("/podcasts/series", ctrl.createSeries);
router.get("/podcasts/series", ctrl.listSeries);
router.get("/podcasts/series/:id", ctrl.getSeries);
router.patch("/podcasts/series/:id", ctrl.updateSeries);
router.delete("/podcasts/series/:id", ctrl.deleteSeries);

// Episode routes
router.post("/podcasts/episodes", ctrl.createEpisode);
router.get("/podcasts/episodes", ctrl.listEpisodes);
router.get("/podcasts/episodes/:id", ctrl.getEpisode);
router.patch("/podcasts/episodes/:id", ctrl.updateEpisode);
router.delete("/podcasts/episodes/:id", ctrl.deleteEpisode);

module.exports = { router };
