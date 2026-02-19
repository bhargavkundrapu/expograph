const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const svc = require("./clientLabRealWorld.service");
const v = require("./clientLabRealWorld.validator");

// --- SuperAdmin
const createProject = asyncHandler(async (req, res) => {
  const parsed = v.CreateProjectSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  const data = await svc.createProject(req, parsed.data);
  res.status(201).json({ ok: true, data });
});

const updateProject = asyncHandler(async (req, res) => {
  const parsed = v.UpdateProjectSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  const data = await svc.updateProject(req, req.params.id, parsed.data);
  res.json({ ok: true, data });
});

const listProjects = asyncHandler(async (req, res) => {
  const includeArchived = req.query.includeArchived === "true";
  const data = await svc.listProjects(req, includeArchived);
  res.json({ ok: true, data });
});

const getProjectWithTasks = asyncHandler(async (req, res) => {
  const data = await svc.getProjectWithTasks(req, req.params.id);
  res.json({ ok: true, data });
});

const createTask = asyncHandler(async (req, res) => {
  const parsed = v.CreateTaskSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  const data = await svc.createTask(req, req.params.id, parsed.data);
  res.status(201).json({ ok: true, data });
});

const updateTask = asyncHandler(async (req, res) => {
  const parsed = v.UpdateTaskSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  const data = await svc.updateTask(req, req.params.id, parsed.data);
  res.json({ ok: true, data });
});

const assignTask = asyncHandler(async (req, res) => {
  const parsed = v.AssignTaskSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  const data = await svc.assignTask(req, req.params.id, parsed.data.student_id);
  res.json({ ok: true, data });
});

const unassignTask = asyncHandler(async (req, res) => {
  await svc.unassignTask(req, req.params.id);
  res.json({ ok: true, data: { ok: true } });
});

const listSubmissions = asyncHandler(async (req, res) => {
  const filters = {
    projectId: req.query.projectId,
    taskId: req.query.taskId,
    studentId: req.query.studentId,
    status: req.query.status,
  };
  const data = await svc.listSubmissions(req, filters);
  res.json({ ok: true, data });
});

const reviewSubmission = asyncHandler(async (req, res) => {
  const parsed = v.ReviewSubmissionSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  const data = await svc.reviewSubmission(req, req.params.id, parsed.data.outcome, parsed.data.feedback);
  res.json({ ok: true, data });
});

const listEligibleStudents = asyncHandler(async (req, res) => {
  const data = await svc.listEligibleStudents(req);
  res.json({ ok: true, data });
});

const listAllStudentsForAssign = asyncHandler(async (req, res) => {
  const data = await svc.listAllStudentsForAssign(req);
  res.json({ ok: true, data });
});

// --- Student
const myAssignedProjects = asyncHandler(async (req, res) => {
  const data = await svc.listAssignedProjects(req);
  res.json({ ok: true, data });
});

const myAssignedTasks = asyncHandler(async (req, res) => {
  const data = await svc.listAssignedTasks(req);
  res.json({ ok: true, data });
});

const getMyProjectWithTasks = asyncHandler(async (req, res) => {
  const data = await svc.getProjectWithTasksForStudent(req, req.params.id);
  res.json({ ok: true, data });
});

const getMyTask = asyncHandler(async (req, res) => {
  const data = await svc.getTaskByIdForStudent(req, req.params.id);
  res.json({ ok: true, data });
});

const submitTask = asyncHandler(async (req, res) => {
  const parsed = v.SubmitTaskSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  const data = await svc.submitTask(req, req.params.id, parsed.data.pr_link || null, parsed.data.notes);
  res.status(201).json({ ok: true, data });
});

module.exports = {
  createProject,
  updateProject,
  listProjects,
  getProjectWithTasks,
  createTask,
  updateTask,
  assignTask,
  unassignTask,
  listSubmissions,
  reviewSubmission,
  listEligibleStudents,
  listAllStudentsForAssign,
  myAssignedProjects,
  myAssignedTasks,
  getMyProjectWithTasks,
  getMyTask,
  submitTask,
};
