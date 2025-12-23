// apps/api/src/modules/content/content.controller.js
const { z } = require("zod");
const { asyncHandler } = require("../../utils/asyncHandler");
const svc = require("./content.service");
const { HttpError } = require("../../utils/httpError");

const CreateCourseSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional(),
  level: z.string().optional(),
});

const CreateModuleSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  position: z.number().int().optional(),
});

const CreateLessonSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  summary: z.string().optional(),
  position: z.number().int().optional(),
});

const StatusSchema = z.object({
  status: z.enum(["draft", "published"]),
});

const AddResourceSchema = z.object({
  type: z.enum(["cheatsheet", "link", "text"]),
  title: z.string().min(1),
  url: z.string().url().optional(),
  body: z.string().optional(),
  sortOrder: z.number().int().optional(),
});

const AddPracticeSchema = z.object({
  title: z.string().min(1),
  prompt: z.string().min(1),
  language: z.string().optional(),
  starterCode: z.string().optional(),
  expectedOutput: z.string().optional(),
  sortOrder: z.number().int().optional(),
});

// ---------- Admin ----------
const createCourse = asyncHandler(async (req, res) => {
  const parsed = CreateCourseSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const created = await svc.createCourseSmart({
    tenantId: req.tenant.id,
    title: parsed.data.title,
    slug: parsed.data.slug,
    description: parsed.data.description,
    level: parsed.data.level,
    createdBy: req.auth.userId,
  });

  res.status(201).json({ ok: true, data: created });
});

const listCoursesAdmin = asyncHandler(async (req, res) => {
  const rows = await svc.listCoursesAdmin({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

const setCourseStatus = asyncHandler(async (req, res) => {
  const parsed = StatusSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const updated = await svc.updateCourseStatus({
    tenantId: req.tenant.id,
    courseId: req.params.courseId,
    status: parsed.data.status,
  });

  if (!updated) throw new HttpError(404, "Course not found");
  res.json({ ok: true, data: updated });
});

const createModule = asyncHandler(async (req, res) => {
  const parsed = CreateModuleSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const created = await svc.createModuleSmart({
    tenantId: req.tenant.id,
    courseId: req.params.courseId,
    title: parsed.data.title,
    slug: parsed.data.slug,
    position: parsed.data.position ?? 0,
    createdBy: req.auth.userId,
  });

  res.status(201).json({ ok: true, data: created });
});

const setModuleStatus = asyncHandler(async (req, res) => {
  const parsed = StatusSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const updated = await svc.updateModuleStatus({
    tenantId: req.tenant.id,
    moduleId: req.params.moduleId,
    status: parsed.data.status,
  });

  if (!updated) throw new HttpError(404, "Module not found");
  res.json({ ok: true, data: updated });
});

const createLesson = asyncHandler(async (req, res) => {
  const parsed = CreateLessonSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const created = await svc.createLessonSmart({
    tenantId: req.tenant.id,
    moduleId: req.params.moduleId,
    title: parsed.data.title,
    slug: parsed.data.slug,
    summary: parsed.data.summary,
    position: parsed.data.position ?? 0,
    createdBy: req.auth.userId,
  });

  res.status(201).json({ ok: true, data: created });
});

const setLessonStatus = asyncHandler(async (req, res) => {
  const parsed = StatusSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const updated = await svc.updateLessonStatus({
    tenantId: req.tenant.id,
    lessonId: req.params.lessonId,
    status: parsed.data.status,
  });

  if (!updated) throw new HttpError(404, "Lesson not found");
  res.json({ ok: true, data: updated });
});

const addResource = asyncHandler(async (req, res) => {
  const parsed = AddResourceSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  if (parsed.data.type !== "text" && !parsed.data.url) {
    throw new HttpError(400, "url required for link/cheatsheet");
  }

  const created = await svc.addResource({
    tenantId: req.tenant.id,
    lessonId: req.params.lessonId,
    type: parsed.data.type,
    title: parsed.data.title,
    url: parsed.data.url,
    body: parsed.data.body,
    sortOrder: parsed.data.sortOrder ?? 0,
    createdBy: req.auth.userId,
  });

  res.status(201).json({ ok: true, data: created });
});

const addPractice = asyncHandler(async (req, res) => {
  const parsed = AddPracticeSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const created = await svc.addPractice({
    tenantId: req.tenant.id,
    lessonId: req.params.lessonId,
    title: parsed.data.title,
    prompt: parsed.data.prompt,
    language: parsed.data.language,
    starterCode: parsed.data.starterCode,
    expectedOutput: parsed.data.expectedOutput,
    sortOrder: parsed.data.sortOrder ?? 0,
    createdBy: req.auth.userId,
  });

  res.status(201).json({ ok: true, data: created });
});

const courseTreeAdmin = asyncHandler(async (req, res) => {
  const tree = await svc.getCourseTreeAdmin({ tenantId: req.tenant.id, courseId: req.params.courseId });
  if (!tree) throw new HttpError(404, "Course not found");
  res.json({ ok: true, data: tree });
});

// ---------- Public ----------
const listCoursesPublic = asyncHandler(async (req, res) => {
  const rows = await svc.listCoursesPublic({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

const courseTreePublicBySlug = asyncHandler(async (req, res) => {
  const tree = await svc.getPublishedCourseTreeBySlug({ tenantId: req.tenant.id, courseSlug: req.params.courseSlug });
  if (!tree) throw new HttpError(404, "Course not found");
  res.json({ ok: true, data: tree });
});

const lessonPublicBySlugs = asyncHandler(async (req, res) => {
  const data = await svc.getPublishedLessonBySlugs({
    tenantId: req.tenant.id,
    courseSlug: req.params.courseSlug,
    moduleSlug: req.params.moduleSlug,
    lessonSlug: req.params.lessonSlug,
  });
  if (!data) throw new HttpError(404, "Lesson not found");
  res.json({ ok: true, data });
});

module.exports = {
  // admin
  createCourse,
  listCoursesAdmin,
  setCourseStatus,
  createModule,
  setModuleStatus,
  createLesson,
  setLessonStatus,
  addResource,
  addPractice,
  courseTreeAdmin,
  // public
  listCoursesPublic,
  courseTreePublicBySlug,
  lessonPublicBySlugs,
};
