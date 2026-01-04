// apps/api/src/modules/content/content.controller.js
const { getCache, setCache } = require("../../utils/cache");
const { delByPrefix } = require("../../utils/cache");

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
const UpdateCourseSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().optional(),        // optional, only if you want to allow editing slug
  description: z.string().optional(),
  level: z.string().optional(),
});

const CreateModuleSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  position: z.number().int().optional(),
});
const UpdateModuleSchema = z.object({
  title: z.string().min(2).optional(),
  position: z.number().int().optional(),
});

const CreateLessonSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  summary: z.string().optional(),
  position: z.number().int().optional(),
});
const UpdateLessonSchema = z.object({
  title: z.string().min(2).optional(),
  summary: z.string().optional(),
  position: z.number().int().optional(),

  video_provider: z.string().nullable().optional(),
  video_id: z.string().nullable().optional(),
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
const UpdateResourceSchema = z.object({
  title: z.string().min(1).optional(),
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
const UpdatePracticeSchema = z.object({
  title: z.string().min(1).optional(),
  prompt: z.string().min(1).optional(),
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
  delByPrefix(`pub:tenant:${req.tenant.id}:`);

  res.status(201).json({ ok: true, data: created });
});

const listCoursesAdmin = asyncHandler(async (req, res) => {
  const rows = await svc.listCoursesAdmin({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});
const updateCourse = asyncHandler(async (req, res) => {
  const parsed = UpdateCourseSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  // at least one field should be present
  if (
  parsed.data.title === undefined &&
  parsed.data.summary === undefined &&
  parsed.data.position === undefined &&
  parsed.data.video_provider === undefined &&
  parsed.data.video_id === undefined
) {
  throw new HttpError(400, "No fields to update");
}



  const updated = await svc.updateCourse({
    tenantId: req.tenant.id,
    courseId: req.params.courseId,
    patch: parsed.data,
    updatedBy: req.auth.userId,
  });

  if (!updated) throw new HttpError(404, "Course not found");
  res.json({ ok: true, data: updated });
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
  delByPrefix(`pub:tenant:${req.tenant.id}:`);

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
  delByPrefix(`pub:tenant:${req.tenant.id}:`);

  res.status(201).json({ ok: true, data: created });
});
const updateModule = asyncHandler(async (req, res) => {
  const parsed = UpdateModuleSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  if (parsed.data.title === undefined && parsed.data.position === undefined) {
    throw new HttpError(400, "No fields to update");
  }

  const updated = await svc.updateModule({
    tenantId: req.tenant.id,
    moduleId: req.params.moduleId,
    patch: parsed.data,
    updatedBy: req.auth.userId,
  });

  if (!updated) throw new HttpError(404, "Module not found");
  res.json({ ok: true, data: updated });
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
  delByPrefix(`pub:tenant:${req.tenant.id}:`);

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
  delByPrefix(`pub:tenant:${req.tenant.id}:`);

  res.status(201).json({ ok: true, data: created });
});
const updateLesson = asyncHandler(async (req, res) => {
  const parsed = UpdateLessonSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  if (parsed.data.title === undefined && parsed.data.summary === undefined && parsed.data.position === undefined) {
    throw new HttpError(400, "No fields to update");
  }

  const updated = await svc.updateLesson({
    tenantId: req.tenant.id,
    lessonId: req.params.lessonId,
    patch: parsed.data,
    updatedBy: req.auth.userId,
  });

  if (!updated) throw new HttpError(404, "Lesson not found");
  res.json({ ok: true, data: updated });
});
const listLessonResourcesAdmin = asyncHandler(async (req, res) => {
  const rows = await svc.listLessonResourcesAdmin({
    tenantId: req.tenant.id,
    lessonId: req.params.lessonId,
  });
  res.json({ ok: true, data: rows });
});

const listLessonPracticeAdmin = asyncHandler(async (req, res) => {
  const rows = await svc.listLessonPracticeAdmin({
    tenantId: req.tenant.id,
    lessonId: req.params.lessonId,
  });
  res.json({ ok: true, data: rows });
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
  delByPrefix(`pub:tenant:${req.tenant.id}:`);

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
  delByPrefix(`pub:tenant:${req.tenant.id}:`);

  res.status(201).json({ ok: true, data: created });
});
const updateResource = asyncHandler(async (req, res) => {
  const parsed = UpdateResourceSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const updated = await svc.updateResource({
    tenantId: req.tenant.id,
    resourceId: req.params.resourceId,
    patch: parsed.data,
    updatedBy: req.auth.userId,
  });

  if (!updated) throw new HttpError(404, "Resource not found");
  res.json({ ok: true, data: updated });
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
  delByPrefix(`pub:tenant:${req.tenant.id}:`);

  res.status(201).json({ ok: true, data: created });
});
const updatePractice = asyncHandler(async (req, res) => {
  const parsed = UpdatePracticeSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const updated = await svc.updatePractice({
    tenantId: req.tenant.id,
    practiceId: req.params.practiceId,
    patch: parsed.data,
    updatedBy: req.auth.userId,
  });

  if (!updated) throw new HttpError(404, "Practice not found");
  res.json({ ok: true, data: updated });
});

const courseTreeAdmin = asyncHandler(async (req, res) => {
  const tree = await svc.getCourseTreeAdmin({ tenantId: req.tenant.id, courseId: req.params.courseId });
  if (!tree) throw new HttpError(404, "Course not found");
  res.json({ ok: true, data: tree });
});

// ---------- Public ----------
const listCoursesPublic = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
const cacheKey = `pub:tenant:${tenantId}:courses:list`;

const cached = getCache(cacheKey);
if (cached) {
  return res.json({ ok: true, data: cached, cache: "HIT" });
}

const rows = await svc.listCoursesPublic({ tenantId });
setCache(cacheKey, rows, 120); // 2 minutes

return res.json({ ok: true, data: rows, cache: "MISS" });

});

const courseTreePublicBySlug = asyncHandler(async (req, res) => {
  
  const tree = await svc.getPublishedCourseTreeBySlug({ tenantId: req.tenant.id, courseSlug: req.params.courseSlug });
  
  const tenantId = req.tenant.id;
  const courseSlug = req.params.courseSlug;


  const cacheKey = `pub:tenant:${tenantId}:course:${courseSlug}:tree`;
  const cached = getCache(cacheKey);

  if (cached) {
    return res.json({ ok: true, data: cached, cache: "HIT" });
  }

  

  if (!tree) {
    return res.status(404).json({ ok: false, error: "Course not found" });
  }

  setCache(cacheKey, tree, 120); // 2 minutes
  return res.json({ ok: true, data: tree, cache: "MISS" });

  
  
 
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
   updateCourse,
  setCourseStatus,
  createModule,
  updateModule,
  setModuleStatus,
  createLesson,
  updateLesson,
  setLessonStatus,
  addResource,
  updateResource,
  addPractice,
  updatePractice,
  courseTreeAdmin,
  listLessonResourcesAdmin,
  listLessonPracticeAdmin,

   

  // public
  listCoursesPublic,
  courseTreePublicBySlug,
  lessonPublicBySlugs,
};
