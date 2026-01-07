const { query } = require("../../db/query");

// ---------- Student ----------
async function listStudentProjects({ tenantId }) {
  const { rows } = await query(
    `
    SELECT
      p.id as project_id, p.title, p.slug, p.track, p.difficulty, p.brief,
      b.id as batch_id, b.batch_name, b.start_at, b.end_at, b.max_seats, b.status as batch_status
    FROM micro_projects p
    JOIN micro_project_batches b ON b.project_id = p.id AND b.tenant_id = p.tenant_id
    WHERE p.tenant_id = $1
      AND p.status = 'published'
      AND b.status = 'open'
      AND now() BETWEEN b.start_at AND b.end_at
    ORDER BY b.start_at ASC, p.created_at DESC
    `,
    [tenantId]
  );
  return rows;
}

async function applyToBatch({ tenantId, projectId, batchId, userId, note }) {
  const { rows } = await query(
    `
    INSERT INTO micro_applications (tenant_id, project_id, batch_id, user_id, note, status)
    VALUES ($1,$2,$3,$4,$5,'applied')
    RETURNING *
    `,
    [tenantId, projectId, batchId, userId, note ?? null]
  );
  return rows[0];
}

async function listMyApplications({ tenantId, userId }) {
  const { rows } = await query(
    `
    SELECT a.*, p.title as project_title, b.batch_name, b.start_at, b.end_at
    FROM micro_applications a
    JOIN micro_projects p ON p.id=a.project_id
    JOIN micro_project_batches b ON b.id=a.batch_id
    WHERE a.tenant_id=$1 AND a.user_id=$2
    ORDER BY a.applied_at DESC
    `,
    [tenantId, userId]
  );
  return rows;
}

async function listMyAssignments({ tenantId, userId }) {
  const { rows } = await query(
    `
    SELECT ma.*, p.title as project_title, b.batch_name, b.end_at
    FROM micro_assignments ma
    JOIN micro_projects p ON p.id=ma.project_id
    JOIN micro_project_batches b ON b.id=ma.batch_id
    WHERE ma.tenant_id=$1 AND ma.user_id=$2
    ORDER BY ma.assigned_at DESC
    `,
    [tenantId, userId]
  );
  return rows;
}

async function submitDeliverable({ tenantId, assignmentId, userId, repoUrl, deployUrl, demoUrl, notes }) {
  // single-statement safe "version increment + insert"
  const { rows } = await query(
    `
    WITH a AS (
      SELECT id, due_at, status
      FROM micro_assignments
      WHERE tenant_id=$1 AND id=$2 AND user_id=$3
    ),
    v AS (
      SELECT COALESCE(MAX(version_no),0)+1 AS next_version
      FROM micro_deliverables d
      WHERE d.tenant_id=$1 AND d.assignment_id=$2
    ),
    ins AS (
      INSERT INTO micro_deliverables
        (tenant_id, assignment_id, version_no, repo_url, deploy_url, demo_url, notes, status)
      SELECT
        $1, a.id, v.next_version, $4,$5,$6,$7,'submitted'
      FROM a, v
      WHERE a.status IN ('assigned','in_progress','submitted','changes_requested')
        AND (a.due_at IS NULL OR now() <= a.due_at)
      RETURNING *
    ),
    updasg AS (
      UPDATE micro_assignments
      SET status='submitted', updated_at=now()
      WHERE tenant_id=$1 AND id=$2 AND EXISTS (SELECT 1 FROM ins)
      RETURNING id
    )
    SELECT row_to_json(ins) AS deliverable FROM ins;
    `,
    [tenantId, assignmentId, userId, repoUrl ?? null, deployUrl ?? null, demoUrl ?? null, notes ?? null]
  );

  return rows[0]?.deliverable ?? null;
}

async function dropAssignment({ tenantId, assignmentId, userId }) {
  const { rows } = await query(
    `
    UPDATE micro_assignments
    SET status='dropped', updated_at=now()
    WHERE tenant_id=$1 AND id=$2 AND user_id=$3
      AND status IN ('assigned','in_progress','submitted','changes_requested')
    RETURNING *;
    `,
    [tenantId, assignmentId, userId]
  );
  return rows[0] ?? null;
}

// ---------- Mentor/Admin ----------
async function listAllProjects({ tenantId }) {
  // List ALL projects with their batches (for SuperAdmin/Mentor view)
  // Returns projects in all statuses (draft, published, archived)
  const { rows } = await query(
    `
    SELECT
      p.id as project_id, p.title, p.slug, p.track, p.difficulty, p.brief, p.skills, p.status as project_status, p.created_at,
      b.id as batch_id, b.batch_name, b.start_at, b.end_at, b.max_seats, b.status as batch_status,
      COUNT(DISTINCT a.id) FILTER (WHERE a.status = 'applied') as applied_count,
      COUNT(DISTINCT a.id) FILTER (WHERE a.status = 'approved') as approved_count,
      COUNT(DISTINCT ma.id) FILTER (WHERE ma.status NOT IN ('dropped','expired')) as assigned_count
    FROM micro_projects p
    LEFT JOIN micro_project_batches b ON b.project_id = p.id AND b.tenant_id = p.tenant_id
    LEFT JOIN micro_applications a ON a.batch_id = b.id AND a.tenant_id = p.tenant_id
    LEFT JOIN micro_assignments ma ON ma.batch_id = b.id AND ma.tenant_id = p.tenant_id
    WHERE p.tenant_id = $1
    GROUP BY p.id, p.title, p.slug, p.track, p.difficulty, p.brief, p.skills, p.status, p.created_at,
             b.id, b.batch_name, b.start_at, b.end_at, b.max_seats, b.status
    ORDER BY p.created_at DESC, b.start_at ASC
    `,
    [tenantId]
  );
  return rows;
}

async function createProject({ tenantId, title, slug, track, difficulty, brief, skills, createdBy }) {
  const { rows } = await query(
    `
    INSERT INTO micro_projects (tenant_id,title,slug,track,difficulty,brief,skills,status,created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7,'draft',$8)
    RETURNING *;
    `,
    [tenantId, title, slug, track ?? null, difficulty ?? null, brief, skills ?? null, createdBy ?? null]
  );
  return rows[0];
}

async function setProjectStatus({ tenantId, projectId, status }) {
  const { rows } = await query(
    `UPDATE micro_projects SET status=$1, updated_at=now()
     WHERE tenant_id=$2 AND id=$3 RETURNING *`,
    [status, tenantId, projectId]
  );
  return rows[0] ?? null;
}

async function createBatch({ tenantId, projectId, batchName, startAt, endAt, maxSeats, createdBy }) {
  const { rows } = await query(
    `
    INSERT INTO micro_project_batches
      (tenant_id, project_id, batch_name, start_at, end_at, max_seats, status, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,'open',$7)
    RETURNING *;
    `,
    [tenantId, projectId, batchName, startAt, endAt, maxSeats ?? 50, createdBy ?? null]
  );
  return rows[0];
}

async function listApplications({ tenantId, batchId, status }) {
  const { rows } = await query(
    `
    SELECT a.*, p.title as project_title, b.batch_name, b.end_at
    FROM micro_applications a
    JOIN micro_projects p ON p.id=a.project_id
    JOIN micro_project_batches b ON b.id=a.batch_id
    WHERE a.tenant_id=$1
      AND ($2::uuid IS NULL OR a.batch_id=$2)
      AND ($3::text IS NULL OR a.status::text = $3)
    ORDER BY a.applied_at ASC;
    `,
    [tenantId, batchId ?? null, status ?? null]
  );
  return rows;
}

async function approveApplicationCreateAssignment({ tenantId, applicationId, mentorId }) {
  // Atomic: checks status applied, seat availability, then creates assignment, then updates application
  const { rows } = await query(
    `
    WITH target AS (
      SELECT a.id AS application_id, a.user_id, a.project_id, a.batch_id,
             b.end_at, b.max_seats
      FROM micro_applications a
      JOIN micro_project_batches b ON b.id=a.batch_id AND b.tenant_id=a.tenant_id
      WHERE a.tenant_id=$1 AND a.id=$2 AND a.status='applied'
    ),
    seats AS (
      SELECT COUNT(*)::int AS used
      FROM micro_assignments ma
      JOIN target t ON t.batch_id = ma.batch_id
      WHERE ma.tenant_id=$1
        AND ma.status NOT IN ('dropped','expired')
    ),
    ins AS (
      INSERT INTO micro_assignments
        (tenant_id, project_id, batch_id, user_id, mentor_id, status, assigned_at, due_at)
      SELECT
        $1, t.project_id, t.batch_id, t.user_id, $3, 'assigned', now(), t.end_at
      FROM target t, seats s
      WHERE s.used < t.max_seats
      RETURNING *
    ),
    upd AS (
      UPDATE micro_applications
      SET status='approved', updated_at=now()
      WHERE tenant_id=$1 AND id=$2
        AND EXISTS (SELECT 1 FROM ins)
      RETURNING *
    )
    SELECT
      (SELECT row_to_json(ins) FROM ins) AS assignment,
      (SELECT row_to_json(upd) FROM upd) AS application;
    `,
    [tenantId, applicationId, mentorId]
  );

  return rows[0] ?? { assignment: null, application: null };
}

async function rejectApplication({ tenantId, applicationId }) {
  const { rows } = await query(
    `
    UPDATE micro_applications
    SET status='rejected', updated_at=now()
    WHERE tenant_id=$1 AND id=$2 AND status='applied'
    RETURNING *;
    `,
    [tenantId, applicationId]
  );
  return rows[0] ?? null;
}

async function listMentorDeliverables({ tenantId, mentorId }) {
  // List all deliverables for assignments where mentor_id matches
  const { rows } = await query(
    `
    SELECT 
      d.id,
      d.assignment_id,
      d.version_no,
      d.repo_url,
      d.deploy_url,
      d.demo_url,
      d.notes,
      d.status,
      d.submitted_at,
      d.updated_at,
      ma.user_id as student_id,
      u.email as student_email,
      u.full_name as student_name,
      p.id as project_id,
      p.title as project_title,
      p.slug as project_slug,
      b.batch_name,
      ma.due_at,
      ma.status as assignment_status
    FROM micro_deliverables d
    JOIN micro_assignments ma ON ma.id = d.assignment_id AND ma.tenant_id = d.tenant_id
    JOIN users u ON u.id = ma.user_id
    JOIN micro_projects p ON p.id = ma.project_id AND p.tenant_id = ma.tenant_id
    LEFT JOIN micro_project_batches b ON b.id = ma.batch_id AND b.tenant_id = ma.tenant_id
    WHERE d.tenant_id = $1 AND ma.mentor_id = $2
    ORDER BY d.submitted_at DESC
    `,
    [tenantId, mentorId]
  );
  return rows;
}

async function reviewDeliverable({ tenantId, deliverableId, mentorId, status, notes }) {
  // status: approved | changes_requested
  const { rows } = await query(
    `
    UPDATE micro_deliverables
    SET status=$1, notes=COALESCE(notes,'') || E'\\n\\n[MENTOR] ' || $2, updated_at=now()
    WHERE tenant_id=$3 AND id=$4
      AND EXISTS (
        SELECT 1 FROM micro_assignments ma
        WHERE ma.id = micro_deliverables.assignment_id
          AND ma.mentor_id = $5
          AND ma.tenant_id = $3
      )
    RETURNING *;
    `,
    [status, notes ?? "", tenantId, deliverableId, mentorId]
  );
  return rows[0] ?? null;
}

module.exports = {
  // student
  listStudentProjects,
  applyToBatch,
  listMyApplications,
  listMyAssignments,
  submitDeliverable,
  dropAssignment,
  // mentor/admin
  listAllProjects,
  createProject,
  setProjectStatus,
  createBatch,
  listApplications,
  approveApplicationCreateAssignment,
  rejectApplication,
  listMentorDeliverables,
  reviewDeliverable,
};
