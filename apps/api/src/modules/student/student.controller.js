// apps/api/src/modules/student/student.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./student.repo");
const contentRepo = require("../content/content.repo");
const progressRepo = require("../progress/progress.repo");
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

const getCourseTree = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { courseSlug } = req.params;
  
  const courseData = await contentRepo.getPublishedCourseTreeBySlug({ tenantId, courseSlug });
  if (!courseData?.course) {
    throw new HttpError(404, "Course not found");
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
    `SELECT m.id as module_id
     FROM course_modules m
     JOIN courses c ON c.id = m.course_id
     WHERE c.tenant_id = $1 AND c.slug = $2 AND m.slug = $3 AND m.status = 'published'
     LIMIT 1`,
    [tenantId, courseSlug, moduleSlug]
  );
  
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

  await progressRepo.completeLesson({
    tenantId,
    userId,
    lessonId: lessonData.lesson.id,
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

module.exports = {
  getSchedule,
  getCurrentCourse,
  getProgress,
  getEvents,
  listCourses,
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
};
