const { query } = require("../../db/query");

async function createClient({ tenantId, name, industry, contactName, contactEmail, contactPhone, ndaStatus, notes, createdBy }) {
  const { rows } = await query(
    `INSERT INTO clients
      (tenant_id, name, industry, contact_name, contact_email, contact_phone, nda_status, notes, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [tenantId, name, industry ?? null, contactName ?? null, contactEmail ?? null, contactPhone ?? null, !!ndaStatus, notes ?? null, createdBy ?? null]
  );
  return rows[0];
}

async function createProject({ tenantId, clientId, title, slug, scope, status, startDate, endDate, createdBy }) {
  const { rows } = await query(
    `INSERT INTO client_projects
      (tenant_id, client_id, title, slug, scope, status, start_date, end_date, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [tenantId, clientId, title, slug, scope ?? null, status ?? "active", startDate ?? null, endDate ?? null, createdBy ?? null]
  );
  return rows[0];
}

async function addProjectMember({ tenantId, projectId, userId, role }) {
  const { rows } = await query(
    `INSERT INTO project_members (tenant_id, project_id, user_id, role)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (tenant_id, project_id, user_id) DO UPDATE SET role = EXCLUDED.role
     RETURNING *`,
    [tenantId, projectId, userId, role]
  );
  return rows[0];
}

async function listProjectMembers({ tenantId, projectId }) {
  const { rows } = await query(
    `SELECT user_id, role FROM project_members
     WHERE tenant_id=$1 AND project_id=$2`,
    [tenantId, projectId]
  );
  return rows;
}

async function getMemberRole({ tenantId, projectId, userId }) {
  const { rows } = await query(
    `SELECT role FROM project_members
     WHERE tenant_id=$1 AND project_id=$2 AND user_id=$3
     LIMIT 1`,
    [tenantId, projectId, userId]
  );
  return rows[0]?.role ?? null;
}

async function createTask({ tenantId, projectId, title, description, status, assigneeUserId, priority, dueAt, createdBy }) {
  const { rows } = await query(
    `INSERT INTO client_tasks
      (tenant_id, project_id, title, description, status, assignee_user_id, priority, due_at, created_by, updated_by, last_moved_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, now())
     RETURNING *`,
    [tenantId, projectId, title, description ?? null, status ?? "todo", assigneeUserId ?? null, priority ?? 2, dueAt ?? null, createdBy ?? null, createdBy ?? null]
  );
  return rows[0];
}

async function assignTask({ tenantId, taskId, assigneeUserId, actorId }) {
  const { rows } = await query(
    `UPDATE client_tasks
     SET assignee_user_id=$1, updated_by=$2, updated_at=now()
     WHERE tenant_id=$3 AND id=$4
     RETURNING *`,
    [assigneeUserId ?? null, actorId ?? null, tenantId, taskId]
  );
  return rows[0] ?? null;
}

async function getTaskById({ tenantId, taskId }) {
  const { rows } = await query(
    `SELECT * FROM client_tasks
     WHERE tenant_id=$1 AND id=$2
     LIMIT 1`,
    [tenantId, taskId]
  );
  return rows[0] ?? null;
}

async function listMyProjects({ tenantId, userId }) {
  const { rows } = await query(
    `SELECT p.*
     FROM client_projects p
     JOIN project_members pm ON pm.project_id = p.id AND pm.tenant_id = p.tenant_id
     WHERE p.tenant_id=$1 AND pm.user_id=$2
     ORDER BY p.created_at DESC`,
    [tenantId, userId]
  );
  return rows;
}

async function listProjectTasks({ tenantId, projectId }) {
  const { rows } = await query(
    `SELECT * FROM client_tasks
     WHERE tenant_id=$1 AND project_id=$2
     ORDER BY updated_at DESC`,
    [tenantId, projectId]
  );
  return rows;
}

async function updateTaskStudentFields({ tenantId, taskId, status, repoUrl, deployUrl, demoUrl, submitNotes, actorId }) {
  const { rows } = await query(
    `UPDATE client_tasks
     SET status = COALESCE($1, status),
         repo_url = COALESCE($2, repo_url),
         deploy_url = COALESCE($3, deploy_url),
         demo_url = COALESCE($4, demo_url),
         submit_notes = COALESCE($5, submit_notes),
         last_moved_at = CASE WHEN $1 IS NULL THEN last_moved_at ELSE now() END,
         updated_by = $6,
         updated_at = now()
     WHERE tenant_id=$7 AND id=$8
     RETURNING *`,
    [status ?? null, repoUrl ?? null, deployUrl ?? null, demoUrl ?? null, submitNotes ?? null, actorId ?? null, tenantId, taskId]
  );
  return rows[0] ?? null;
}

async function listReviewQueue({ tenantId, projectId }) {
  const { rows } = await query(
    `SELECT * FROM client_tasks
     WHERE tenant_id=$1 AND project_id=$2 AND status='review'
     ORDER BY updated_at ASC`,
    [tenantId, projectId]
  );
  return rows;
}

async function addFeedback({ tenantId, projectId, taskId, authorUserId, authorRole, rating, message }) {
  const { rows } = await query(
    `INSERT INTO client_feedback
      (tenant_id, project_id, task_id, author_user_id, author_role, rating, message)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [tenantId, projectId, taskId ?? null, authorUserId ?? null, authorRole ?? "mentor", rating ?? null, message]
  );
  return rows[0];
}

async function listAllClients({ tenantId }) {
  const { rows } = await query(
    `SELECT * FROM clients
     WHERE tenant_id=$1
     ORDER BY created_at DESC`,
    [tenantId]
  );
  return rows;
}

async function listAllProjects({ tenantId }) {
  const { rows } = await query(
    `SELECT p.*, c.name AS client_name
     FROM client_projects p
     LEFT JOIN clients c ON c.id = p.client_id AND c.tenant_id = p.tenant_id
     WHERE p.tenant_id=$1
     ORDER BY p.created_at DESC`,
    [tenantId]
  );
  return rows;
}

module.exports = {
  createClient,
  createProject,
  addProjectMember,
  listProjectMembers,
  getMemberRole,
  createTask,
  assignTask,
  getTaskById,
  listMyProjects,
  listProjectTasks,
  updateTaskStudentFields,
  listReviewQueue,
  addFeedback,
  listAllClients,
  listAllProjects,
};
