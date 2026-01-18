// apps/api/src/modules/users/users.repo.js
const { query } = require("../../db/query");

async function findUserByEmail(email) {
  const { rows } = await query(
    `SELECT id, email, phone, full_name, password_hash, is_active
     FROM users
     WHERE email = $1
     LIMIT 1`,
    [email]
  );
  return rows[0] ?? null;
}

async function createUser({ email, fullName, passwordHash }) {
  const { rows } = await query(
    `INSERT INTO users (email, full_name, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, email, full_name, is_active`,
    [email, fullName ?? null, passwordHash]
  );
  return rows[0];
}

async function findRoleIdForTenant({ tenantId, roleName }) {
  const { rows } = await query(
    `SELECT id FROM roles WHERE tenant_id = $1 AND name = $2 LIMIT 1`,
    [tenantId, roleName]
  );
  return rows[0]?.id ?? null;
}

async function upsertMembership({ tenantId, userId, roleId }) {
  const { rows } = await query(
    `INSERT INTO memberships (tenant_id, user_id, role_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (tenant_id, user_id)
     DO UPDATE SET role_id = EXCLUDED.role_id, updated_at = now()
     RETURNING id, tenant_id, user_id, role_id`,
    [tenantId, userId, roleId]
  );
  return rows[0];
}

async function getMembershipWithRole({ tenantId, userId }) {
  const { rows } = await query(
    `SELECT m.id AS membership_id, m.tenant_id, m.user_id, r.id AS role_id, r.name AS role_name
     FROM memberships m
     JOIN roles r ON r.id = m.role_id
     WHERE m.tenant_id = $1 AND m.user_id = $2
     LIMIT 1`,
    [tenantId, userId]
  );
  return rows[0] ?? null;
}

// Tenant Admin: List all users in tenant
async function listTenantUsers({ tenantId }) {
  const { rows } = await query(
    `SELECT 
       u.id,
       u.email,
       u.full_name,
       u.phone,
       u.is_active,
       u.created_at,
       m.id AS membership_id,
       r.id AS role_id,
       r.name AS role_name
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     ORDER BY u.created_at DESC`,
    [tenantId]
  );
  return rows;
}

// Tenant Admin: Get user details
async function getTenantUser({ tenantId, userId }) {
  const { rows } = await query(
    `SELECT 
       u.id,
       u.email,
       u.full_name,
       u.phone,
       u.is_active,
       u.created_at,
       m.id AS membership_id,
       r.id AS role_id,
       r.name AS role_name
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     WHERE u.id = $2
     LIMIT 1`,
    [tenantId, userId]
  );
  return rows[0] ?? null;
}

// Tenant Admin: Update user role
async function updateUserRole({ tenantId, userId, roleId }) {
  const { rows } = await query(
    `UPDATE memberships
     SET role_id = $3, updated_at = now()
     WHERE tenant_id = $1 AND user_id = $2
     RETURNING id, tenant_id, user_id, role_id`,
    [tenantId, userId, roleId]
  );
  return rows[0] ?? null;
}

// Tenant Admin: Update user status
async function updateUserStatus({ userId, isActive }) {
  const { rows } = await query(
    `UPDATE users
     SET is_active = $2, updated_at = now()
     WHERE id = $1
     RETURNING id, email, full_name, is_active`,
    [userId, isActive]
  );
  return rows[0] ?? null;
}

// Tenant Admin: Get all available roles for tenant
async function listTenantRoles({ tenantId }) {
  const { rows } = await query(
    `SELECT id, name, description
     FROM roles
     WHERE tenant_id = $1
     ORDER BY name`,
    [tenantId]
  );
  return rows;
}

// SuperAdmin: List all students with filters
async function listStudents({ tenantId, search, roleName = "Student" }) {
  let sql = `
    SELECT 
       u.id,
       u.email,
       u.full_name,
       u.phone,
       u.is_active,
       u.created_at,
       m.id AS membership_id,
       r.id AS role_id,
       r.name AS role_name
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     WHERE r.name = $2
  `;
  const params = [tenantId, roleName];
  
  if (search) {
    sql += ` AND (u.full_name ILIKE $3 OR u.email ILIKE $3 OR u.phone ILIKE $3)`;
    params.push(`%${search}%`);
  }
  
  sql += ` ORDER BY u.created_at DESC`;
  
  const { rows } = await query(sql, params);
  return rows;
}

// SuperAdmin: Get student with progress and stats
async function getStudentWithStats({ tenantId, userId }) {
  // Get basic user info
  const userRows = await query(
    `SELECT 
       u.id,
       u.email,
       u.full_name,
       u.phone,
       u.is_active,
       u.created_at,
       m.id AS membership_id,
       r.id AS role_id,
       r.name AS role_name
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     WHERE u.id = $2 AND r.name = 'Student'
     LIMIT 1`,
    [tenantId, userId]
  );
  
  if (!userRows.rows[0]) return null;
  
  const user = userRows.rows[0];
  
  // Get progress stats
  const progressRows = await query(
    `SELECT
        COUNT(*) FILTER (WHERE completed_at IS NOT NULL) AS completed_lessons,
        COUNT(*) FILTER (WHERE completed_at IS NULL AND started_at IS NOT NULL) AS in_progress_lessons,
        COALESCE(SUM(watch_seconds), 0) AS total_watch_seconds
     FROM lesson_progress
     WHERE tenant_id = $1 AND user_id = $2`,
    [tenantId, userId]
  );
  
  // Get project stats (client lab)
  const projectRows = await query(
    `SELECT COUNT(*)::int AS total_projects
     FROM project_members pm
     JOIN client_projects cp ON cp.id = pm.project_id
     WHERE pm.tenant_id = $1 AND pm.user_id = $2 AND pm.role = 'student'`,
    [tenantId, userId]
  );
  
  // Calculate streak (simplified - days with activity)
  const streakRows = await query(
    `SELECT COUNT(DISTINCT DATE(updated_at))::int AS streak_days
     FROM lesson_progress
     WHERE tenant_id = $1 AND user_id = $2
     AND updated_at >= NOW() - INTERVAL '30 days'`,
    [tenantId, userId]
  );
  
  return {
    ...user,
    progress: progressRows.rows[0] || { completed_lessons: 0, in_progress_lessons: 0, total_watch_seconds: 0 },
    total_projects: projectRows.rows[0]?.total_projects || 0,
    streak_days: streakRows.rows[0]?.streak_days || 0,
  };
}

// SuperAdmin: Update student details
async function updateStudentDetails({ userId, fullName, email, phone }) {
  const updates = [];
  const params = [];
  let paramIndex = 1;
  
  if (fullName !== undefined) {
    updates.push(`full_name = $${paramIndex++}`);
    params.push(fullName);
  }
  if (email !== undefined) {
    updates.push(`email = $${paramIndex++}`);
    params.push(email);
  }
  if (phone !== undefined) {
    updates.push(`phone = $${paramIndex++}`);
    params.push(phone);
  }
  
  if (updates.length === 0) {
    // Return current user if no updates
    const { rows } = await query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return rows[0];
  }
  
  updates.push(`updated_at = now()`);
  params.push(userId);
  
  const { rows } = await query(
    `UPDATE users
     SET ${updates.join(", ")}
     WHERE id = $${paramIndex}
     RETURNING id, email, full_name, phone, is_active, created_at`,
    params
  );
  
  return rows[0] || null;
}

// SuperAdmin: Create student
async function createStudent({ tenantId, email, fullName, phone, passwordHash }) {
  // Create user
  const userRows = await query(
    `INSERT INTO users (email, full_name, phone, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, full_name, phone, is_active, created_at`,
    [email, fullName, phone, passwordHash]
  );
  
  const user = userRows.rows[0];
  
  // Get Student role ID
  const roleRows = await query(
    `SELECT id FROM roles WHERE tenant_id = $1 AND name = 'Student' LIMIT 1`,
    [tenantId]
  );
  
  if (!roleRows.rows[0]) {
    throw new Error("Student role not found");
  }
  
  // Create membership
  await query(
    `INSERT INTO memberships (tenant_id, user_id, role_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (tenant_id, user_id) DO NOTHING`,
    [tenantId, user.id, roleRows.rows[0].id]
  );
  
  return user;
}

// SuperAdmin: Delete student (soft delete by setting inactive)
async function deleteStudent({ userId }) {
  const { rows } = await query(
    `UPDATE users
     SET is_active = false, updated_at = now()
     WHERE id = $1
     RETURNING id, email, full_name, is_active`,
    [userId]
  );
  return rows[0] || null;
}

// SuperAdmin: List all mentors with filters
async function listMentors({ tenantId, search, roleName = "Mentor" }) {
  let sql = `
    SELECT 
       u.id,
       u.email,
       u.full_name,
       u.phone,
       u.is_active,
       u.created_at,
       m.id AS membership_id,
       r.id AS role_id,
       r.name AS role_name
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     WHERE r.name = $2
  `;
  const params = [tenantId, roleName];
  
  if (search) {
    sql += ` AND (u.full_name ILIKE $3 OR u.email ILIKE $3 OR u.phone ILIKE $3)`;
    params.push(`%${search}%`);
  }
  
  sql += ` ORDER BY u.created_at DESC`;
  
  const { rows } = await query(sql, params);
  return rows;
}

// SuperAdmin: Get mentor with students (students assigned to this mentor)
async function getMentorWithStudents({ tenantId, mentorId }) {
  // Get basic mentor info
  const mentorRows = await query(
    `SELECT 
       u.id,
       u.email,
       u.full_name,
       u.phone,
       u.is_active,
       u.created_at,
       m.id AS membership_id,
       r.id AS role_id,
       r.name AS role_name
     FROM users u
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     WHERE u.id = $2 AND r.name = 'Mentor'
     LIMIT 1`,
    [tenantId, mentorId]
  );
  
  if (!mentorRows.rows[0]) return null;
  
  const mentor = mentorRows.rows[0];
  
  // Get students assigned to this mentor (from micro_assignments)
  const studentsRows = await query(
    `SELECT DISTINCT
       u.id,
       u.email,
       u.full_name,
       u.phone,
       u.is_active,
       u.created_at,
       COUNT(DISTINCT ma.id)::int AS assignment_count,
       MAX(ma.assigned_at) AS last_assigned_at
     FROM users u
     JOIN micro_assignments ma ON ma.user_id = u.id AND ma.tenant_id = $1
     JOIN memberships m ON m.user_id = u.id AND m.tenant_id = $1
     JOIN roles r ON r.id = m.role_id
     WHERE ma.mentor_id = $2 
       AND r.name = 'Student'
       AND ma.status NOT IN ('dropped', 'expired')
     GROUP BY u.id, u.email, u.full_name, u.phone, u.is_active, u.created_at
     ORDER BY last_assigned_at DESC`,
    [tenantId, mentorId]
  );
  
  mentor.students = studentsRows.rows || [];
  
  return mentor;
}

// SuperAdmin: Update mentor details
async function updateMentorDetails({ userId, fullName, email, phone }) {
  const updates = [];
  const params = [];
  let paramIndex = 1;
  
  if (fullName !== undefined) {
    updates.push(`full_name = $${paramIndex++}`);
    params.push(fullName);
  }
  if (email !== undefined) {
    updates.push(`email = $${paramIndex++}`);
    params.push(email);
  }
  if (phone !== undefined) {
    updates.push(`phone = $${paramIndex++}`);
    params.push(phone);
  }
  
  if (updates.length === 0) {
    // Return current user if no updates
    const { rows } = await query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return rows[0];
  }
  
  updates.push(`updated_at = now()`);
  params.push(userId);
  
  const { rows } = await query(
    `UPDATE users
     SET ${updates.join(", ")}
     WHERE id = $${paramIndex}
     RETURNING id, email, full_name, phone, is_active, created_at`,
    params
  );
  
  return rows[0] || null;
}

// SuperAdmin: Create mentor
async function createMentor({ tenantId, email, fullName, phone, passwordHash }) {
  // Create user
  const userRows = await query(
    `INSERT INTO users (email, full_name, phone, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, full_name, phone, is_active, created_at`,
    [email, fullName, phone, passwordHash]
  );
  
  const user = userRows.rows[0];
  
  // Get Mentor role ID
  const roleRows = await query(
    `SELECT id FROM roles WHERE tenant_id = $1 AND name = 'Mentor' LIMIT 1`,
    [tenantId]
  );
  
  if (!roleRows.rows[0]) {
    throw new Error("Mentor role not found");
  }
  
  // Create membership
  await query(
    `INSERT INTO memberships (tenant_id, user_id, role_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (tenant_id, user_id) DO NOTHING`,
    [tenantId, user.id, roleRows.rows[0].id]
  );
  
  return user;
}

// SuperAdmin: Delete mentor (soft delete by setting inactive)
async function deleteMentor({ userId }) {
  const { rows } = await query(
    `UPDATE users
     SET is_active = false, updated_at = now()
     WHERE id = $1
     RETURNING id, email, full_name, is_active`,
    [userId]
  );
  return rows[0] || null;
}

module.exports = {
  findUserByEmail,
  createUser,
  findRoleIdForTenant,
  upsertMembership,
  getMembershipWithRole,
  listTenantUsers,
  getTenantUser,
  updateUserRole,
  updateUserStatus,
  listTenantRoles,
  listStudents,
  getStudentWithStats,
  updateStudentDetails,
  createStudent,
  deleteStudent,
  listMentors,
  getMentorWithStudents,
  updateMentorDetails,
  createMentor,
  deleteMentor,
};
