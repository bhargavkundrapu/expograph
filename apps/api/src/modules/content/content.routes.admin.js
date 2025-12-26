// apps/api/src/modules/content/content.routes.admin.js
const express = require("express");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");
const ctrl = require("./content.controller");

const router = express.Router();

// All admin content routes require auth + permission
router.use(requireAuth, requirePermission("content:write"));

router.post("/courses", ctrl.createCourse);
router.get("/courses", ctrl.listCoursesAdmin);
router.patch("/courses/:courseId", ctrl.updateCourse);
router.patch("/courses/:courseId/status", ctrl.setCourseStatus);

router.post("/courses/:courseId/modules", ctrl.createModule);
router.patch("/modules/:moduleId", ctrl.updateModule);
router.patch("/modules/:moduleId/status", ctrl.setModuleStatus);

router.post("/modules/:moduleId/lessons", ctrl.createLesson);
router.patch("/lessons/:lessonId", ctrl.updateLesson);

router.patch("/lessons/:lessonId/status", ctrl.setLessonStatus);

router.post("/lessons/:lessonId/resources", ctrl.addResource);
router.patch("/resources/:resourceId", ctrl.updateResource);

router.post("/lessons/:lessonId/practice", ctrl.addPractice);
router.patch("/practice/:practiceId", ctrl.updatePractice);


router.get("/courses/:courseId/tree", ctrl.courseTreeAdmin);

module.exports = { router };
