const { z } = require("zod");
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const svc = require("./internships.service");

// ---- Schemas ----
const ApplySchema = z.object({
  projectId: z.string().uuid(),
  note: z.string().optional(),
});

const CreateProjectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  track: z.string().optional(),
  difficulty: z.string().optional(),
  brief: z.string().min(10),
  skills: z.array(z.string()).optional(),
});

const ProjectStatusSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
});

const CreateBatchSchema = z.object({
  batchName: z.string().min(3),
  startAt: z.string(), // ISO
  endAt: z.string(),   // ISO
  maxSeats: z.number().int().min(1).max(500).optional(),
});

const ApproveSchema = z.object({
  mentorId: z.string().uuid().optional(), // if not provided -> current user becomes mentor
});

const RejectSchema = z.object({
  reason: z.string().optional(),
});

const DeliverableSchema = z.object({
  repoUrl: z.string().url().optional(),
  deployUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  notes: z.string().optional(),
});

const ReviewDeliverableSchema = z.object({
  status: z.enum(["approved", "changes_requested"]),
  notes: z.string().optional(),
});

// ---- Student ----
const listProjects = asyncHandler(async (req, res) => {
  const rows = await svc.listStudentProjects({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

const apply = asyncHandler(async (req, res) => {
  const parsed = ApplySchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const created = await svc.applyToBatch({
    tenantId: req.tenant.id,
    projectId: parsed.data.projectId,
    batchId: req.params.batchId,
    userId: req.auth.userId,
    note: parsed.data.note,
  });

  res.status(201).json({ ok: true, data: created });
});

const myApplications = asyncHandler(async (req, res) => {
  const rows = await svc.listMyApplications({ tenantId: req.tenant.id, userId: req.auth.userId });
  res.json({ ok: true, data: rows });
});

const myAssignments = asyncHandler(async (req, res) => {
  const rows = await svc.listMyAssignments({ tenantId: req.tenant.id, userId: req.auth.userId });
  res.json({ ok: true, data: rows });
});

const submitDeliverable = asyncHandler(async (req, res) => {
  const parsed = DeliverableSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const deliverable = await svc.submitDeliverable({
    tenantId: req.tenant.id,
    assignmentId: req.params.assignmentId,
    userId: req.auth.userId,
    repoUrl: parsed.data.repoUrl,
    deployUrl: parsed.data.deployUrl,
    demoUrl: parsed.data.demoUrl,
    notes: parsed.data.notes,
  });

  if (!deliverable) throw new HttpError(409, "Cannot submit (deadline passed or invalid status)");
  res.status(201).json({ ok: true, data: deliverable });
});

const drop = asyncHandler(async (req, res) => {
  const updated = await svc.dropAssignment({
    tenantId: req.tenant.id,
    assignmentId: req.params.assignmentId,
    userId: req.auth.userId,
  });
  if (!updated) throw new HttpError(409, "Cannot drop (not found or not active)");
  res.json({ ok: true, data: updated });
});

// ---- Mentor/Admin ----
const listAllProjects = asyncHandler(async (req, res) => {
  const rows = await svc.listAllProjects({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

const createProject = asyncHandler(async (req, res) => {
  const parsed = CreateProjectSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const created = await svc.createProjectDraft({
    tenantId: req.tenant.id,
    title: parsed.data.title,
    slug: parsed.data.slug,
    track: parsed.data.track,
    difficulty: parsed.data.difficulty,
    brief: parsed.data.brief,
    skills: parsed.data.skills,
    createdBy: req.auth.userId,
  });

  res.status(201).json({ ok: true, data: created });
});

const setProjectStatus = asyncHandler(async (req, res) => {
  const parsed = ProjectStatusSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const updated = await svc.setProjectStatus({
    tenantId: req.tenant.id,
    projectId: req.params.projectId,
    status: parsed.data.status,
  });
  if (!updated) throw new HttpError(404, "Project not found");
  res.json({ ok: true, data: updated });
});

const createBatch = asyncHandler(async (req, res) => {
  const parsed = CreateBatchSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const created = await svc.createBatch({
    tenantId: req.tenant.id,
    projectId: req.params.projectId,
    batchName: parsed.data.batchName,
    startAt: parsed.data.startAt,
    endAt: parsed.data.endAt,
    maxSeats: parsed.data.maxSeats,
    createdBy: req.auth.userId,
  });

  res.status(201).json({ ok: true, data: created });
});

const listApplications = asyncHandler(async (req, res) => {
  const batchId = req.query.batchId || null;
  const status = req.query.status || null;
  const rows = await svc.listApplications({ tenantId: req.tenant.id, batchId, status });
  res.json({ ok: true, data: rows });
});

const approve = asyncHandler(async (req, res) => {
  const parsed = ApproveSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const mentorId = parsed.data.mentorId || req.auth.userId; // mentor mandatory ✅
  const result = await svc.approveApplication({ tenantId: req.tenant.id, applicationId: req.params.applicationId, mentorId });

  res.json({ ok: true, data: result });
});

const reject = asyncHandler(async (req, res) => {
  const updated = await svc.rejectApplication({ tenantId: req.tenant.id, applicationId: req.params.applicationId });
  if (!updated) throw new HttpError(404, "Application not found or not in applied state");
  res.json({ ok: true, data: updated });
});

const reviewDeliverable = asyncHandler(async (req, res) => {
  const parsed = ReviewDeliverableSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const updated = await svc.reviewDeliverable({
    tenantId: req.tenant.id,
    deliverableId: req.params.deliverableId,
    mentorId: req.auth.userId,
    status: parsed.data.status,
    notes: parsed.data.notes,
  });

  if (!updated) throw new HttpError(404, "Deliverable not found");
  res.json({ ok: true, data: updated });
});

module.exports = {
  // student
  listProjects,
  apply,
  myApplications,
  myAssignments,
  submitDeliverable,
  drop,
  // mentor/admin
  listAllProjects,
  createProject,
  setProjectStatus,
  createBatch,
  listApplications,
  approve,
  reject,
  reviewDeliverable,
};