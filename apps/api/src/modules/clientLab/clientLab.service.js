const repo = require("./clientLab.repo");
const { HttpError } = require("../../utils/httpError");

// simple slugify (safe)
function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

async function mustBeProjectMember({ tenantId, projectId, userId }) {
  const role = await repo.getMemberRole({ tenantId, projectId, userId });
  if (!role) throw new HttpError(403, "You are not a member of this project");
  return role; // student/mentor/admin
}

async function createClient({ tenantId, actorId, data }) {
  return repo.createClient({ tenantId, createdBy: actorId, ...data });
}

async function createProject({ tenantId, actorId, data }) {
  const slug = data.slug ? slugify(data.slug) : slugify(data.title);
  if (!slug) throw new HttpError(400, "Invalid project title/slug");

  const project = await repo.createProject({
    tenantId,
    clientId: data.clientId,
    title: data.title,
    slug,
    scope: data.scope,
    status: data.status ?? "active",
    startDate: data.startDate,
    endDate: data.endDate,
    createdBy: actorId,
  });

  // Auto-add creator as admin member (so no lockout)
  await repo.addProjectMember({ tenantId, projectId: project.id, userId: actorId, role: "admin" });

  return project;
}

async function addMember({ tenantId, actorId, projectId, userId, role }) {
  // ensure actor is a member (admin/mentor can manage; but permission already checked in route)
  const actorRole = await mustBeProjectMember({ tenantId, projectId, userId: actorId });
  if (actorRole !== "admin") throw new HttpError(403, "Only project admin can add members");

  return repo.addProjectMember({ tenantId, projectId, userId, role });
}

async function createTask({ tenantId, actorId, projectId, data }) {
  const actorRole = await mustBeProjectMember({ tenantId, projectId, userId: actorId });
  if (actorRole !== "admin" && actorRole !== "mentor") {
    throw new HttpError(403, "Only admin/mentor can create tasks");
  }

  return repo.createTask({
    tenantId,
    projectId,
    title: data.title,
    description: data.description,
    status: data.status ?? "todo",
    assigneeUserId: data.assigneeUserId ?? null,
    priority: data.priority ?? 2,
    dueAt: data.dueAt ?? null,
    createdBy: actorId,
  });
}

async function assignTask({ tenantId, actorId, taskId, assigneeUserId }) {
  const task = await repo.getTaskById({ tenantId, taskId });
  if (!task) throw new HttpError(404, "Task not found");

  const actorRole = await mustBeProjectMember({ tenantId, projectId: task.project_id, userId: actorId });
  if (actorRole !== "admin" && actorRole !== "mentor") {
    throw new HttpError(403, "Only admin/mentor can assign tasks");
  }

  return repo.assignTask({ tenantId, taskId, assigneeUserId, actorId });
}

async function listMyProjects({ tenantId, userId }) {
  return repo.listMyProjects({ tenantId, userId });
}

async function getBoard({ tenantId, projectId, userId }) {
  await mustBeProjectMember({ tenantId, projectId, userId });
  const tasks = await repo.listProjectTasks({ tenantId, projectId });

  // group by status (kanban)
  const board = { todo: [], doing: [], review: [], done: [] };
  for (const t of tasks) board[t.status]?.push(t);

  return board;
}

async function studentUpdateTask({ tenantId, userId, taskId, data }) {
  const task = await repo.getTaskById({ tenantId, taskId });
  if (!task) throw new HttpError(404, "Task not found");

  const memberRole = await mustBeProjectMember({ tenantId, projectId: task.project_id, userId });

  // Student restrictions
  if (memberRole === "student") {
    // Only assignee can update
    if (task.assignee_user_id && task.assignee_user_id !== userId) {
      throw new HttpError(403, "You can update only your assigned tasks");
    }
  }

  return repo.updateTaskStudentFields({
    tenantId,
    taskId,
    status: data.status,
    repoUrl: data.repoUrl,
    deployUrl: data.deployUrl,
    demoUrl: data.demoUrl,
    submitNotes: data.submitNotes,
    actorId: userId,
  });
}

async function reviewQueue({ tenantId, projectId, userId }) {
  const role = await mustBeProjectMember({ tenantId, projectId, userId });
  if (role !== "mentor" && role !== "admin") throw new HttpError(403, "Only mentor/admin can review");

  const tasks = await repo.listReviewQueue({ tenantId, projectId });
  const project = await repo.getProjectById({ tenantId, projectId });
  
  return {
    project: project || null,
    tasks: tasks || [],
  };
}

async function addMentorFeedback({ tenantId, userId, taskId, data }) {
  const task = await repo.getTaskById({ tenantId, taskId });
  if (!task) throw new HttpError(404, "Task not found");

  const role = await mustBeProjectMember({ tenantId, projectId: task.project_id, userId });
  if (role !== "mentor" && role !== "admin") throw new HttpError(403, "Only mentor/admin can add feedback");

  // optional: mentor can move status
  if (data.moveStatusTo) {
    await repo.updateTaskStudentFields({
      tenantId,
      taskId,
      status: data.moveStatusTo,
      repoUrl: null,
      deployUrl: null,
      demoUrl: null,
      submitNotes: null,
      actorId: userId,
    });
  }

  return repo.addFeedback({
    tenantId,
    projectId: task.project_id,
    taskId: task.id,
    authorUserId: userId,
    authorRole: role,
    rating: data.rating,
    message: data.message,
  });
}

async function listAllClients({ tenantId }) {
  return repo.listAllClients({ tenantId });
}

async function listAllProjects({ tenantId }) {
  return repo.listAllProjects({ tenantId });
}

module.exports = {
  createClient,
  createProject,
  addMember,
  createTask,
  assignTask,
  listMyProjects,
  getBoard,
  studentUpdateTask,
  reviewQueue,
  addMentorFeedback,
  listAllClients,
  listAllProjects,
};
