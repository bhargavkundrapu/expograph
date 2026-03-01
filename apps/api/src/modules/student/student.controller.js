// apps/api/src/modules/student/student.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./student.repo");
const contentRepo = require("../content/content.repo");
const progressRepo = require("../progress/progress.repo");
const usersRepo = require("../users/users.repo");
const { query } = require("../../db/query");
const z = require("zod");

// Schemas
const CreateDiscussionSchema = z.object({
  discussion_name: z.string().min(3),
  problem: z.string().min(10),
});

const ReplySchema = z.object({
  message: z.string().min(1),
});

const BookmarkSchema = z.object({
  type: z.enum(["mcq", "practice", "lesson", "discussion"]),
  item_id: z.string().uuid(),
});

const UpdateProfileSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

// Dashboard & Home
const getSchedule = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const schedule = await repo.getSchedule({ tenantId, userId });
  res.json({ ok: true, data: schedule });
});

const getCurrentCourse = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const course = await repo.getCurrentCourse({ tenantId, userId });
  res.json({ ok: true, data: course });
});

const getProgress = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const progress = await repo.getProgress({ tenantId, userId });
  res.json({ ok: true, data: progress });
});

const getEvents = asyncHandler(async (req, res) => {
  const { tenantId } = req.auth;
  const events = await repo.getEvents({ tenantId });
  res.json({ ok: true, data: events });
});

// Courses
const listCourses = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const courses = await repo.listEnrolledCourses({ tenantId, userId });
  res.json({ ok: true, data: courses });
});

const search = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const q = (req.query.q || req.query.search || "").trim();
  const results = await repo.searchContent({ tenantId, userId, q });
  res.json({ ok: true, data: results });
});

const getCourseTree = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { courseSlug } = req.params;
  
  const courseData = await contentRepo.getPublishedCourseTreeBySlug({ tenantId, courseSlug });
  if (!courseData?.course) {
    throw new HttpError(404, "Course not found");
  }

  const courseId = courseData.course.id || courseData.course.course_id;
  if (!courseId) throw new HttpError(400, "Invalid course data");
  const hasAccess = await repo.hasCourseAccess({ tenantId, userId, courseId });
  if (!hasAccess) {
    throw new HttpError(403, "You don't have access to this course. Purchase it to unlock.");
  }

  // Enhance with progress data
  const enhancedCourse = await repo.enhanceCourseWithProgress({
    tenantId,
    userId,
    course: courseData.course,
  });

  res.json({ ok: true, data: { course: enhancedCourse } });
});

const getLesson = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { courseSlug, moduleSlug, lessonSlug } = req.params;

  const lessonData = await contentRepo.getPublishedLessonBySlugs({
    tenantId,
    courseSlug,
    moduleSlug,
    lessonSlug,
  });

  if (!lessonData?.lesson) {
    throw new HttpError(404, "Lesson not found");
  }

  // Get module lessons for sidebar - get all lessons in the module
  const moduleResult = await query(
    `SELECT m.id as module_id, c.id as course_id
     FROM course_modules m
     JOIN courses c ON c.id = m.course_id
     WHERE c.tenant_id = $1 AND c.slug = $2 AND m.slug = $3 AND m.status = 'published'
     LIMIT 1`,
    [tenantId, courseSlug, moduleSlug]
  );

  const courseId = moduleResult.rows[0]?.course_id;
  if (courseId) {
    const hasAccess = await repo.hasCourseAccess({ tenantId, userId, courseId });
    if (!hasAccess) {
      throw new HttpError(403, "You don't have access to this course. Purchase it to unlock.");
    }
  }
  
  let moduleLessons = [];
  if (moduleResult.rows.length > 0) {
    moduleLessons = await repo.getModuleLessons({
      tenantId,
      moduleId: moduleResult.rows[0].module_id,
    });
  }

  // Enhance with progress and resources
  const enhancedLesson = await repo.enhanceLessonWithData({
    tenantId,
    userId,
    lesson: lessonData,
    moduleLessons,
  });

  res.json({ ok: true, data: enhancedLesson });
});

const completeLesson = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { courseSlug, moduleSlug, lessonSlug } = req.params;

  const lessonData = await contentRepo.getPublishedLessonBySlugs({
    tenantId,
    courseSlug,
    moduleSlug,
    lessonSlug,
  });

  if (!lessonData?.lesson) {
    throw new HttpError(404, "Lesson not found");
  }

  const courseModuleRes = await query(
    `SELECT c.id as course_id FROM courses c
     JOIN course_modules m ON m.course_id = c.id
     WHERE c.tenant_id = $1 AND c.slug = $2 AND m.slug = $3 LIMIT 1`,
    [tenantId, courseSlug, moduleSlug]
  );
  const courseId = courseModuleRes.rows[0]?.course_id;
  if (courseId) {
    const hasAccess = await repo.hasCourseAccess({ tenantId, userId, courseId });
    if (!hasAccess) {
      throw new HttpError(403, "You don't have access to this course.");
    }
  }

  // content.repo returns raw row with lesson_id (not id)
  const lessonId = lessonData.lesson.lesson_id ?? lessonData.lesson.id;
  if (!lessonId) {
    throw new HttpError(400, "Lesson id missing");
  }

  await progressRepo.completeLesson({
    tenantId,
    userId,
    lessonId,
  });

  res.json({ ok: true });
});

// Discussions
const listDiscussions = asyncHandler(async (req, res) => {
  const { tenantId } = req.auth;
  const discussions = await repo.listDiscussions({ tenantId });
  res.json({ ok: true, data: discussions });
});

const createDiscussion = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const parsed = CreateDiscussionSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const discussion = await repo.createDiscussion({
    tenantId,
    userId,
    data: parsed.data,
  });

  res.json({ ok: true, data: discussion });
});

const getDiscussion = asyncHandler(async (req, res) => {
  const { tenantId } = req.auth;
  const { discussionId } = req.params;
  const discussion = await repo.getDiscussion({ tenantId, discussionId });
  if (!discussion) {
    throw new HttpError(404, "Discussion not found");
  }
  res.json({ ok: true, data: discussion });
});

const replyToDiscussion = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { discussionId } = req.params;
  const parsed = ReplySchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const reply = await repo.createReply({
    tenantId,
    userId,
    discussionId,
    message: parsed.data.message,
  });

  res.json({ ok: true, data: reply });
});

const upvoteDiscussion = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { discussionId } = req.params;
  await repo.upvoteDiscussion({ tenantId, userId, discussionId });
  res.json({ ok: true });
});

// Bookmarks
const listBookmarks = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const bookmarks = await repo.listBookmarks({ tenantId, userId });
  res.json({ ok: true, data: bookmarks });
});

const createBookmark = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const parsed = BookmarkSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const bookmark = await repo.createBookmark({
    tenantId,
    userId,
    data: parsed.data,
  });

  res.json({ ok: true, data: bookmark });
});

const deleteBookmark = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { bookmarkId } = req.params;
  await repo.deleteBookmark({ tenantId, userId, bookmarkId });
  res.json({ ok: true });
});

// Profile
const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const user = await usersRepo.findUserById(userId);
  if (!user) throw new HttpError(404, "User not found");

  let phone = user.phone || "";

  if (!phone && user.email) {
    try {
      const { rows } = await query(
        `SELECT customer_phone FROM payment_orders WHERE LOWER(customer_email) = LOWER($1) AND customer_phone IS NOT NULL ORDER BY created_at DESC LIMIT 1`,
        [user.email]
      );
      if (rows[0]?.customer_phone) {
        phone = rows[0].customer_phone;
        await query(`UPDATE users SET phone = $1 WHERE id = $2 AND phone IS NULL`, [phone, userId]).catch(() => {});
      }
    } catch (_) {}
  }

  res.json({
    ok: true,
    data: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      full_name: user.full_name,
      phone,
    },
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const parsed = UpdateProfileSchema.safeParse(req.body);
  
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }
  
  // Check email uniqueness if updating email
  if (parsed.data.email) {
    const existing = await usersRepo.findUserByEmail(parsed.data.email);
    if (existing && existing.id !== userId) {
      throw new HttpError(409, "Email already in use");
    }
  }
  
  const updated = await usersRepo.updateStudentDetails({
    userId,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
  });
  
  if (!updated) {
    throw new HttpError(404, "User not found");
  }
  
  // Return updated user data in the format expected by frontend
  res.json({
    ok: true,
    data: {
      id: updated.id,
      email: updated.email,
      fullName: updated.full_name, // Convert snake_case to camelCase
      full_name: updated.full_name, // Keep both for compatibility
      phone: updated.phone || null,
    },
  });
});

module.exports = {
  getSchedule,
  getCurrentCourse,
  getProgress,
  getEvents,
  listCourses,
  search,
  getCourseTree,
  getLesson,
  completeLesson,
  listDiscussions,
  createDiscussion,
  getDiscussion,
  replyToDiscussion,
  upvoteDiscussion,
  listBookmarks,
  createBookmark,
  deleteBookmark,
  getProfile,
  updateProfile,
};
