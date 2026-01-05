const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const svc = require("./clientLab.service");
const v = require("./clientLab.validator");

// Admin
const createClient = asyncHandler(async (req, res) => {
  const parsed = v.CreateClientSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const data = await svc.createClient({
    tenantId: req.tenant.id,
    actorId: req.auth.userId,
    data: parsed.data,
  });

  res.status(201).json({ ok: true, data });
});

const createProject = asyncHandler(async (req, res) => {
  const parsed = v.CreateProjectSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const data = await svc.createProject({
    tenantId: req.tenant.id,
    actorId: req.auth.userId,
    data: parsed.data,
  });

  res.status(201).json({ ok: true, data });
});

const addMember = asyncHandler(async (req, res) => {
  const parsed = v.AddMemberSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const data = await svc.addMember({
    tenantId: req.tenant.id,
    actorId: req.auth.userId,
    projectId: req.params.projectId,
    userId: parsed.data.userId,
    role: parsed.data.role,
  });

  res.status(201).json({ ok: true, data });
});

const createTask = asyncHandler(async (req, res) => {
  const parsed = v.CreateTaskSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const data = await svc.createTask({
    tenantId: req.tenant.id,
    actorId: req.auth.userId,
    projectId: req.params.projectId,
    data: parsed.data,
  });

  res.status(201).json({ ok: true, data });
});

const assignTask = asyncHandler(async (req, res) => {
  const parsed = v.AddMemberSchema.pick({ userId: true }).safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const data = await svc.assignTask({
    tenantId: req.tenant.id,
    actorId: req.auth.userId,
    taskId: req.params.taskId,
    assigneeUserId: parsed.data.userId,
  });

  res.json({ ok: true, data });
});

// LMS
const myProjects = asyncHandler(async (req, res) => {
  const data = await svc.listMyProjects({ tenantId: req.tenant.id, userId: req.auth.userId });
  res.json({ ok: true, data });
});

const projectBoard = asyncHandler(async (req, res) => {
  const data = await svc.getBoard({
    tenantId: req.tenant.id,
    projectId: req.params.projectId,
    userId: req.auth.userId,
  });
  res.json({ ok: true, data });
});

const studentUpdateTask = asyncHandler(async (req, res) => {
  const parsed = v.StudentUpdateTaskSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const data = await svc.studentUpdateTask({
    tenantId: req.tenant.id,
    userId: req.auth.userId,
    taskId: req.params.taskId,
    data: parsed.data,
  });

  res.json({ ok: true, data });
});

// Mentor
const reviewQueue = asyncHandler(async (req, res) => {
  const data = await svc.reviewQueue({
    tenantId: req.tenant.id,
    projectId: req.params.projectId,
    userId: req.auth.userId,
  });
  res.json({ ok: true, data });
});

const mentorFeedback = asyncHandler(async (req, res) => {
  const parsed = v.MentorFeedbackSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const data = await svc.addMentorFeedback({
    tenantId: req.tenant.id,
    userId: req.auth.userId,
    taskId: req.params.taskId,
    data: parsed.data,
  });

  res.status(201).json({ ok: true, data });
});

// Admin: List all clients
const listAllClients = asyncHandler(async (req, res) => {
  const data = await svc.listAllClients({ tenantId: req.tenant.id });
  res.json({ ok: true, data });
});

// Admin: List all projects
const listAllProjects = asyncHandler(async (req, res) => {
  const data = await svc.listAllProjects({ tenantId: req.tenant.id });
  res.json({ ok: true, data });
});

module.exports = {
  createClient,
  createProject,
  addMember,
  createTask,
  assignTask,
  myProjects,
  projectBoard,
  studentUpdateTask,
  reviewQueue,
  mentorFeedback,
  listAllClients,
  listAllProjects,
};
