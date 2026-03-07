// apps/api/src/modules/feedback/feedback.controller.student.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const { query } = require("../../db/query");
const contentRepo = require("../content/content.repo");
const studentRepo = require("../student/student.repo");
const feedbackRepo = require("./feedback.repo");
const z = require("zod");

const FeedbackSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
});

/** Resolve course_id from courseSlug (published). */
async function resolveCourseId({ tenantId, courseSlug }) {
  const { rows } = await query(
    `SELECT id FROM courses
     WHERE tenant_id = $1 AND status = 'published'
     AND (slug = $2 OR REPLACE(slug, '_', '-') = $2)
     LIMIT 1`,
    [tenantId, courseSlug]
  );
  return rows[0]?.id ?? null;
}

/** Submit course-level feedback. */
const submitCourseFeedback = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { courseSlug } = req.params;
  const body = FeedbackSchema.parse(req.body || {});

  const courseId = await resolveCourseId({ tenantId, courseSlug });
  if (!courseId) throw new HttpError(404, "Course not found");

  const hasAccess = await studentRepo.hasCourseAccess({ tenantId, userId, courseId });
  if (!hasAccess) throw new HttpError(403, "You don't have access to this course.");

  const feedback = await feedbackRepo.upsertCourseFeedback({
    tenantId,
    userId,
    courseId,
    rating: body.rating,
    comment: body.comment,
  });

  res.status(201).json({ ok: true, data: feedback });
});

/** Submit lesson-level feedback. */
const submitLessonFeedback = asyncHandler(async (req, res) => {
  const { tenantId, userId } = req.auth;
  const { courseSlug, moduleSlug, lessonSlug } = req.params;
  const body = FeedbackSchema.parse(req.body || {});

  const lessonData = await contentRepo.getPublishedLessonBySlugs({
    tenantId,
    courseSlug,
    moduleSlug,
    lessonSlug,
  });
  if (!lessonData?.lesson) throw new HttpError(404, "Lesson not found");

  const courseId = lessonData.lesson.course_id || (await query(
    `SELECT c.id AS course_id FROM course_modules m
     JOIN courses c ON c.id = m.course_id
     WHERE c.tenant_id = $1 AND (c.slug = $2 OR REPLACE(c.slug, '_', '-') = $2)
       AND (m.slug = $3 OR REPLACE(m.slug, '_', '-') = $3) AND m.status = 'published'
     LIMIT 1`,
    [tenantId, courseSlug, moduleSlug]
  )).rows[0]?.course_id;

  if (!courseId) throw new HttpError(403, "Course not found.");
  const hasAccess = await studentRepo.hasCourseAccess({ tenantId, userId, courseId });
  if (!hasAccess) throw new HttpError(403, "You don't have access to this course.");

  const lessonId = lessonData.lesson.lesson_id ?? lessonData.lesson.id;
  if (!lessonId) throw new HttpError(400, "Lesson id missing");

  const feedback = await feedbackRepo.upsertLessonFeedback({
    tenantId,
    userId,
    courseId,
    lessonId,
    rating: body.rating,
    comment: body.comment,
  });

  res.status(201).json({ ok: true, data: feedback });
});

module.exports = {
  submitCourseFeedback,
  submitLessonFeedback,
};
