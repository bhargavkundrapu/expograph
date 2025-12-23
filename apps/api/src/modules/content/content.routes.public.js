// apps/api/src/modules/content/content.routes.public.js
const express = require("express");
const ctrl = require("./content.controller");

const router = express.Router();

router.get("/courses", ctrl.listCoursesPublic);
router.get("/courses/:courseSlug", ctrl.courseTreePublicBySlug);
router.get(
  "/courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug",
  ctrl.lessonPublicBySlugs
);

module.exports = { router };
