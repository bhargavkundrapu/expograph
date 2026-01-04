const { z } = require("zod");

const TaskStatus = z.enum(["todo", "doing", "review", "done"]);
const MemberRole = z.enum(["student", "mentor", "admin"]);

const CreateClientSchema = z.object({
  name: z.string().min(2),
  industry: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  ndaStatus: z.boolean().optional(),
  notes: z.string().optional(),
});

const CreateProjectSchema = z.object({
  clientId: z.string().uuid(),
  title: z.string().min(2),
  slug: z.string().optional(),
  scope: z.string().optional(),
  status: z.string().optional(), // active/paused/completed (text for MVP)
  startDate: z.string().optional(), // YYYY-MM-DD (simple)
  endDate: z.string().optional(),
});

const AddMemberSchema = z.object({
  userId: z.string().uuid(),
  role: MemberRole,
});

const CreateTaskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  status: TaskStatus.optional(),
  assigneeUserId: z.string().uuid().optional(),
  priority: z.number().int().min(1).max(3).optional(),
  dueAt: z.string().optional(), // YYYY-MM-DD
});

const StudentUpdateTaskSchema = z.object({
  status: TaskStatus.optional(),
  repoUrl: z.string().url().optional(),
  deployUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  submitNotes: z.string().optional(),
});

const MentorFeedbackSchema = z.object({
  message: z.string().min(2),
  rating: z.number().int().min(1).max(5).optional(),
  moveStatusTo: TaskStatus.optional(), // mentor can move status too (optional)
});

module.exports = {
  CreateClientSchema,
  CreateProjectSchema,
  AddMemberSchema,
  CreateTaskSchema,
  StudentUpdateTaskSchema,
  MentorFeedbackSchema,
};
