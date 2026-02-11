// apps/api/src/modules/student/student.routes.js
const express = require("express");
const ctrl = require("./student.controller");
const { requireAuth } = require("../../middlewares/auth/requireAuth");
const { requirePermission } = require("../../middlewares/rbac/requirePermission");

const router = express.Router();

// All routes require authentication and student permission
router.use(requireAuth);
router.use(requirePermission("student:read"));

// Dashboard & Home
router.get("/schedule", ctrl.getSchedule);
router.get("/current-course", ctrl.getCurrentCourse);
router.get("/progress", ctrl.getProgress);
router.get("/events", ctrl.getEvents);

// Courses
router.get("/courses", ctrl.listCourses);
router.get("/search", ctrl.search);
router.get("/courses/:courseSlug", ctrl.getCourseTree);
router.get("/courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug", ctrl.getLesson);
router.post("/courses/:courseSlug/modules/:moduleSlug/lessons/:lessonSlug/complete", ctrl.completeLesson);

// Discussions
router.get("/discussions", ctrl.listDiscussions);
router.post("/discussions", requirePermission("student:write"), ctrl.createDiscussion);
router.get("/discussions/:discussionId", ctrl.getDiscussion);
router.post("/discussions/:discussionId/replies", requirePermission("student:write"), ctrl.replyToDiscussion);
router.post("/discussions/:discussionId/upvote", requirePermission("student:write"), ctrl.upvoteDiscussion);

// Bookmarks
router.get("/bookmarks", ctrl.listBookmarks);
router.post("/bookmarks", requirePermission("student:write"), ctrl.createBookmark);
router.delete("/bookmarks/:bookmarkId", requirePermission("student:write"), ctrl.deleteBookmark);

// Profile
router.patch("/profile", requirePermission("student:write"), ctrl.updateProfile);

module.exports = { router };
