// apps/api/src/modules/content/content.routes.public.js
const express = require("express");
const { publicApiLimiter } = require("../../middlewares/rate-limit/rateLimiters");
const ctrl = require("./content.controller");

const router = express.Router();
router.use(publicApiLimiter);

router.get("/courses", ctrl.listCoursesPublic);
router.get("/courses/:courseSlug", ctrl.courseTreePublicBySlug);
router.get("/packs", ctrl.listPacksPublic);
router.get("/packs/:packSlug", ctrl.packPublicBySlug);
router.get(
  "/courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug",
  ctrl.lessonPublicBySlugs
);

module.exports = { router };
