// apps/api/src/modules/student/student.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./student.repo");
const contentRepo = require("../content/content.repo");
const progressRepo = require("../progress/progress.repo");
const usersRepo = require("../users/users.repo");
const { query } = require("../../db/query");
const { ensureStudentIdSchema } = require("./ensureStudentIdSchema");
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

const LessonPathSchema = z.object({
  lessonPath: z.string().min(1),
});

const LessonBookmarkSchema = z.object({
  lessonPath: z.string().min(1),
  title: z.string().optional(),
});

const LessonNoteSchema = z.object({
  lessonPath: z.string().min(1),
  text: z.string().optional(),
});

function isTransientDbError(err) {
  const msg = String(err?.message || "").toLowerCase();
  const code = String(err?.code || "").toLowerCase();
  return (
    msg.includes("connection terminated unexpectedly") ||
    msg.includes("connection terminated") ||
    msg.includes("ecconnreset") ||
    msg.includes("econnreset") ||
    msg.includes("timeout") ||
    code === "57p01" || // admin shutdown
    code === "08006" || // connection failure
    code === "08000" || // connection exception
    code === "53300" // too many connections
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

// Streak (current + best + weekly calendar) for profile cards
const getStreak = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const streak = await repo.getStreak({ tenantId, userId });
  res.json({ ok: true, data: streak });
});

const getEvents = asyncHandler(async (req, res) => {
  const { tenantId } = req.auth;
  const events = await repo.getEvents({ tenantId });
  res.json({ ok: true, data: events });
});

// Courses - no-store so bonus course unlock settings (saved in SuperAdmin) apply immediately
const listCourses = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const courses = await repo.listEnrolledCourses({ tenantId, userId });
  res.setHeader("Cache-Control", "no-store, max-age=0");
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

  const courseId = lessonData.lesson.course_id || (await query(
    `SELECT c.id as course_id FROM course_modules m
     JOIN courses c ON c.id = m.course_id
     WHERE c.tenant_id = $1 AND (c.slug = $2 OR REPLACE(c.slug, '_', '-') = $2) AND m.slug = $3 AND m.status = 'published'
     LIMIT 1`,
    [tenantId, courseSlug, moduleSlug]
  )).rows[0]?.course_id;

  if (!courseId) {
    throw new HttpError(403, "You don't have access to this course. Purchase it to unlock.");
  }
  const hasAccess = await repo.hasCourseAccess({ tenantId, userId, courseId });
  if (!hasAccess) {
    throw new HttpError(403, "You don't have access to this course. Purchase it to unlock.");
  }

  const moduleResult = await query(
    `SELECT m.id as module_id FROM course_modules m
     JOIN courses c ON c.id = m.course_id
     WHERE c.tenant_id = $1 AND c.id = $2 AND m.slug = $3 AND m.status = 'published'
     LIMIT 1`,
    [tenantId, courseId, moduleSlug]
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

  const courseId = lessonData.lesson.course_id || (await query(
    `SELECT c.id as course_id FROM courses c
     JOIN course_modules m ON m.course_id = c.id
     WHERE c.tenant_id = $1 AND (c.slug = $2 OR REPLACE(c.slug, '_', '-') = $2) AND m.slug = $3 LIMIT 1`,
    [tenantId, courseSlug, moduleSlug]
  )).rows[0]?.course_id;

  if (!courseId) {
    throw new HttpError(403, "You don't have access to this course.");
  }
  const hasAccess = await repo.hasCourseAccess({ tenantId, userId, courseId });
  if (!hasAccess) {
    throw new HttpError(403, "You don't have access to this course.");
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

const getLearningState = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const data = await repo.getLearningState({ tenantId, userId });
  res.json({ ok: true, data });
});

const upsertLessonBookmark = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const parsed = LessonBookmarkSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  await repo.upsertLessonBookmark({
    tenantId,
    userId,
    lessonPath: parsed.data.lessonPath,
    title: parsed.data.title,
  });
  res.json({ ok: true });
});

const deleteLessonBookmark = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const parsed = LessonPathSchema.safeParse({ lessonPath: req.query.lessonPath });
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  await repo.deleteLessonBookmark({ tenantId, userId, lessonPath: parsed.data.lessonPath });
  res.json({ ok: true });
});

const upsertLessonNote = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const parsed = LessonNoteSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  const text = String(parsed.data.text || "");
  if (!text.trim()) {
    await repo.deleteLessonNote({ tenantId, userId, lessonPath: parsed.data.lessonPath });
  } else {
    await repo.upsertLessonNote({ tenantId, userId, lessonPath: parsed.data.lessonPath, noteText: text });
  }
  res.json({ ok: true });
});

const deleteLessonNote = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const parsed = LessonPathSchema.safeParse({ lessonPath: req.query.lessonPath });
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  await repo.deleteLessonNote({ tenantId, userId, lessonPath: parsed.data.lessonPath });
  res.json({ ok: true });
});

// Profile
const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  let user = await usersRepo.findUserById(userId);
  if (!user) throw new HttpError(404, "User not found");

  // Lazy backfill: on localhost the column/sequence may not exist (migrations not run). Ensure schema then assign.
  const hasStudentId = user.student_id != null && String(user.student_id).trim() !== "";
  if (!hasStudentId) {
    try {
      const updated = await query(
        `UPDATE users SET student_id = LPAD(nextval('student_id_seq')::text, 7, '0') WHERE id = $1 RETURNING student_id`,
        [userId]
      );
      if (updated?.rows?.[0]?.student_id) {
        user = { ...user, student_id: updated.rows[0].student_id };
      } else {
        user = await usersRepo.findUserById(userId) || user;
      }
    } catch (err) {
      const needSchema = /student_id|student_id_seq|does not exist|relation/.test(String(err.message || ""));
      if (needSchema) {
        await ensureStudentIdSchema();
        const refetched = await usersRepo.findUserById(userId);
        if (refetched?.student_id) user = refetched;
        else {
          const { rows } = await query(
            `UPDATE users SET student_id = LPAD(nextval('student_id_seq')::text, 7, '0') WHERE id = $1 RETURNING student_id`,
            [userId]
          ).catch(() => ({ rows: [] }));
          if (rows?.[0]?.student_id) user = { ...user, student_id: rows[0].student_id };
          else user = await usersRepo.findUserById(userId) || user;
        }
      } else {
        user = await usersRepo.findUserById(userId) || user;
      }
    }
  }

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

  let studentId = user.student_id != null ? String(user.student_id).trim() : null;
  if (!studentId) {
    try {
      const { rows } = await query(`SELECT student_id FROM users WHERE id = $1 LIMIT 1`, [userId]);
      if (rows[0]?.student_id) studentId = String(rows[0].student_id).trim();
    } catch (_) {}
  }
  if (!studentId) {
    await ensureStudentIdSchema();
    try {
      const { rows } = await query(`SELECT student_id FROM users WHERE id = $1 LIMIT 1`, [userId]);
      if (rows[0]?.student_id) studentId = String(rows[0].student_id).trim();
    } catch (_) {}
  }

  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.json({
    ok: true,
    data: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      full_name: user.full_name,
      phone,
      studentId: studentId ?? null,
      student_id: studentId ?? null,
    },
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const parsed = UpdateProfileSchema.safeParse(req.body);
  
  if (!parsed.success) {
    throw new HttpError(400, "Invalid input", parsed.error.flatten());
  }

  const normalizedFullName =
    parsed.data.fullName === undefined ? undefined : String(parsed.data.fullName).trim();
  const normalizedEmail =
    parsed.data.email === undefined ? undefined : String(parsed.data.email).trim().toLowerCase();
  const normalizedPhoneRaw =
    parsed.data.phone === undefined ? undefined : String(parsed.data.phone).trim();
  const normalizedPhone = normalizedPhoneRaw === "" ? null : normalizedPhoneRaw;

  // Ensure local DB (dev) has the student_id column/sequence.
  // getProfile already bootstraps this, but updateProfile uses `RETURNING student_id`
  // inside usersRepo.updateStudentDetails, which otherwise can throw 500.
  let updated = null;
  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const studentIdOk = await ensureStudentIdSchema();
      if (!studentIdOk) {
        throw new HttpError(
          500,
          "Student profile update is not available yet. Please run migrations to initialize student_id in the users table."
        );
      }

      // Check email uniqueness if updating email
      if (normalizedEmail) {
        const existing = await usersRepo.findUserByEmail(normalizedEmail);
        if (existing && existing.id !== userId) {
          throw new HttpError(409, "Email already in use");
        }
      }

      // Check phone uniqueness if updating phone to non-empty value.
      if (normalizedPhone !== undefined && normalizedPhone !== null) {
        const { rows } = await query(
          `SELECT id FROM users WHERE phone = $1 LIMIT 1`,
          [normalizedPhone]
        );
        if (rows[0] && rows[0].id !== userId) {
          throw new HttpError(409, "Phone number already in use");
        }
      }

      updated = await usersRepo.updateStudentDetails({
        userId,
        fullName: normalizedFullName,
        email: normalizedEmail,
        phone: normalizedPhone,
      });
      break;
    } catch (err) {
      if (err && err.code === "23505") {
        const msg = String(err.message || "");
        if (err.constraint === "users_phone_key" || msg.includes("users_phone_key")) {
          throw new HttpError(409, "Phone number already in use");
        }
        if (err.constraint === "users_email_key" || msg.includes("users_email_key")) {
          throw new HttpError(409, "Email already in use");
        }
      }
      const transient = isTransientDbError(err);
      const isLast = attempt === maxAttempts;
      if (!transient || isLast) throw err;
      // Small backoff then retry once for transient DB/network hiccups.
      await wait(120);
    }
  }
  
  if (!updated) {
    throw new HttpError(404, "User not found");
  }
  
  // Return updated user data in the format expected by frontend
  res.json({
    ok: true,
    data: {
      id: updated.id,
      studentId: updated.student_id,
      student_id: updated.student_id,
      email: updated.email,
      fullName: updated.full_name,
      full_name: updated.full_name,
      phone: updated.phone || null,
    },
  });
});

module.exports = {
  getSchedule,
  getCurrentCourse,
  getProgress,
  getStreak,
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
  getLearningState,
  upsertLessonBookmark,
  deleteLessonBookmark,
  upsertLessonNote,
  deleteLessonNote,
  getProfile,
  updateProfile,
};
