// apps/api/src/modules/users/users.controller.js
const { asyncHandler } = require("../../utils/asyncHandler");
const { HttpError } = require("../../utils/httpError");
const repo = require("./users.repo");
const { audit } = require("../audit/audit.service");
const z = require("zod");

const UpdateUserRoleSchema = z.object({
  roleId: z.string().uuid(),
});

const UpdateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

const CreateStudentSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  phone: z.string().optional(),
  password: z.string().min(8).optional(),
});

const UpdateStudentSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(8).optional(),
});

const CreateMentorSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  phone: z.string().optional(),
  password: z.string().min(8).optional(),
});

const UpdateMentorSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

// Tenant Admin: List all users in tenant
const listTenantUsers = asyncHandler(async (req, res) => {
  const rows = await repo.listTenantUsers({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

// Tenant Admin: Get user details
const getTenantUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await repo.getTenantUser({ tenantId: req.tenant.id, userId });
  if (!user) throw new HttpError(404, "User not found");
  res.json({ ok: true, data: user });
});

// Tenant Admin: Update user role
const updateUserRole = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const parsed = UpdateUserRoleSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  // Verify user exists in tenant
  const user = await repo.getTenantUser({ tenantId: req.tenant.id, userId });
  if (!user) throw new HttpError(404, "User not found");

  // Verify role exists in tenant
  const roles = await repo.listTenantRoles({ tenantId: req.tenant.id });
  const roleExists = roles.some(r => r.id === parsed.data.roleId);
  if (!roleExists) throw new HttpError(400, "Role not found in tenant");

  const updated = await repo.updateUserRole({
    tenantId: req.tenant.id,
    userId,
    roleId: parsed.data.roleId,
  });

  await audit(req, {
    action: "user.role.update",
    entityType: "user",
    entityId: userId,
    payload: { roleId: parsed.data.roleId },
  });

  res.json({ ok: true, data: updated });
});

// Tenant Admin: Update user status (active/inactive)
const updateUserStatus = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const parsed = UpdateUserStatusSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  // Verify user exists in tenant
  const user = await repo.getTenantUser({ tenantId: req.tenant.id, userId });
  if (!user) throw new HttpError(404, "User not found");

  const updated = await repo.updateUserStatus({
    userId,
    isActive: parsed.data.isActive,
  });

  await audit(req, {
    action: "user.status.update",
    entityType: "user",
    entityId: userId,
    payload: { isActive: parsed.data.isActive },
  });

  res.json({ ok: true, data: updated });
});

// Tenant Admin: List available roles
const listTenantRoles = asyncHandler(async (req, res) => {
  const rows = await repo.listTenantRoles({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

// SuperAdmin: List all students
const listStudents = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const search = req.query.search || "";
  
  const students = await repo.listStudents({ tenantId, search });
  res.json({ ok: true, data: students });
});

// SuperAdmin: Get student with stats
const getStudentWithStats = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const userId = req.params.userId;
  
  const student = await repo.getStudentWithStats({ tenantId, userId });
  if (!student) throw new HttpError(404, "Student not found");
  
  res.json({ ok: true, data: student });
});

// SuperAdmin: Create student
const createStudent = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const parsed = CreateStudentSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  
  // Check if email exists
  const existing = await repo.findUserByEmail(parsed.data.email);
  if (existing) throw new HttpError(409, "Email already registered");
  
  // Hash password (default password if not provided)
  const bcrypt = require("bcrypt");
  const password = parsed.data.password || "Student@123"; // Default password
  const passwordHash = await bcrypt.hash(password, 12);
  
  const student = await repo.createStudent({
    tenantId,
    email: parsed.data.email.trim().toLowerCase(),
    fullName: parsed.data.fullName,
    phone: parsed.data.phone || null,
    passwordHash,
  });
  
  await audit(req, {
    action: "student.create",
    entityType: "user",
    entityId: student.id,
    payload: { email: student.email },
  });
  
  res.status(201).json({ ok: true, data: student });
});

// SuperAdmin: Update student details
const updateStudent = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const userId = req.params.userId;
  const parsed = UpdateStudentSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  
  // Verify student exists
  const student = await repo.getTenantUser({ tenantId, userId });
  if (!student || student.role_name !== "Student") {
    throw new HttpError(404, "Student not found");
  }
  
  // Check email uniqueness if updating email
  if (parsed.data.email) {
    const existing = await repo.findUserByEmail(parsed.data.email);
    if (existing && existing.id !== userId) {
      throw new HttpError(409, "Email already in use");
    }
  }
  
  // Hash password if updating password
  let passwordHash = undefined;
  if (parsed.data.password) {
    const bcrypt = require("bcrypt");
    passwordHash = await bcrypt.hash(parsed.data.password, 12);
  }
  
  const updated = await repo.updateStudentDetails({
    userId,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    passwordHash,
  });
  
  await audit(req, {
    action: "student.update",
    entityType: "user",
    entityId: userId,
    payload: parsed.data,
  });
  
  res.json({ ok: true, data: updated });
});

// SuperAdmin: Delete student (soft delete)
const deleteStudent = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const userId = req.params.userId;
  
  // Verify student exists
  const student = await repo.getTenantUser({ tenantId, userId });
  if (!student || student.role_name !== "Student") {
    throw new HttpError(404, "Student not found");
  }
  
  const deleted = await repo.deleteStudent({ userId });
  
  await audit(req, {
    action: "student.delete",
    entityType: "user",
    entityId: userId,
    payload: { email: student.email },
  });
  
  res.json({ ok: true, data: deleted });
});

// SuperAdmin: List all mentors
const listMentors = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const search = req.query.search || "";
  
  const mentors = await repo.listMentors({ tenantId, search });
  res.json({ ok: true, data: mentors });
});

// SuperAdmin: Get mentor with students
const getMentorWithStudents = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const mentorId = req.params.mentorId;
  
  const mentor = await repo.getMentorWithStudents({ tenantId, mentorId });
  if (!mentor) throw new HttpError(404, "Mentor not found");
  
  res.json({ ok: true, data: mentor });
});

// SuperAdmin: Create mentor
const createMentor = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const parsed = CreateMentorSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  
  // Check if email exists
  const existing = await repo.findUserByEmail(parsed.data.email);
  if (existing) throw new HttpError(409, "Email already registered");
  
  // Hash password (default password if not provided)
  const bcrypt = require("bcrypt");
  const password = parsed.data.password || "Mentor@123"; // Default password
  const passwordHash = await bcrypt.hash(password, 12);
  
  const mentor = await repo.createMentor({
    tenantId,
    email: parsed.data.email.trim().toLowerCase(),
    fullName: parsed.data.fullName,
    phone: parsed.data.phone || null,
    passwordHash,
  });
  
  await audit(req, {
    action: "mentor.create",
    entityType: "user",
    entityId: mentor.id,
    payload: { email: mentor.email },
  });
  
  res.status(201).json({ ok: true, data: mentor });
});

// SuperAdmin: Update mentor details
const updateMentor = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const userId = req.params.mentorId;
  const parsed = UpdateMentorSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());
  
  // Verify mentor exists
  const mentor = await repo.getTenantUser({ tenantId, userId });
  if (!mentor || mentor.role_name !== "Mentor") {
    throw new HttpError(404, "Mentor not found");
  }
  
  // Check email uniqueness if updating email
  if (parsed.data.email) {
    const existing = await repo.findUserByEmail(parsed.data.email);
    if (existing && existing.id !== userId) {
      throw new HttpError(409, "Email already in use");
    }
  }
  
  const updated = await repo.updateMentorDetails({
    userId,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
  });
  
  await audit(req, {
    action: "mentor.update",
    entityType: "user",
    entityId: userId,
    payload: parsed.data,
  });
  
  res.json({ ok: true, data: updated });
});

// SuperAdmin: Delete mentor (soft delete)
const deleteMentor = asyncHandler(async (req, res) => {
  const tenantId = req.tenant.id;
  const userId = req.params.mentorId;
  
  // Verify mentor exists
  const mentor = await repo.getTenantUser({ tenantId, userId });
  if (!mentor || mentor.role_name !== "Mentor") {
    throw new HttpError(404, "Mentor not found");
  }
  
  const deleted = await repo.deleteMentor({ userId });
  
  await audit(req, {
    action: "mentor.delete",
    entityType: "user",
    entityId: userId,
    payload: { email: mentor.email },
  });
  
  res.json({ ok: true, data: deleted });
});

module.exports = {
  listTenantUsers,
  getTenantUser,
  updateUserRole,
  updateUserStatus,
  listTenantRoles,
  listStudents,
  getStudentWithStats,
  createStudent,
  updateStudent,
  deleteStudent,
  listMentors,
  getMentorWithStudents,
  createMentor,
  updateMentor,
  deleteMentor,
};

