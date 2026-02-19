const { z } = require("zod");

const CreateProjectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().max(80).optional(),
  scope: z.string().optional(),
  status: z.enum(["active", "paused", "completed", "archived"]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const UpdateProjectSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  scope: z.string().optional(),
  status: z.enum(["active", "paused", "completed", "archived"]).optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  archivedAt: z.string().datetime().optional().nullable(),
});

const CreateTaskSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "review", "done"]).optional(),
  priority: z.number().int().min(1).max(3).optional(),
  dueAt: z.string().optional(),
});

const UpdateTaskSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "review", "done"]).optional(),
  priority: z.number().int().min(1).max(3).optional(),
  dueAt: z.string().optional().nullable(),
});

const AssignTaskSchema = z.object({
  student_id: z.string().uuid(),
});

const SubmitTaskSchema = z.object({
  pr_link: z.union([z.string().url(), z.literal("")]).optional(),
  notes: z.string().max(2000).optional(),
});

const ReviewSubmissionSchema = z.object({
  outcome: z.enum(["approve", "changes_requested"]),
  feedback: z.string().max(2000).optional(),
});

module.exports = {
  CreateProjectSchema,
  UpdateProjectSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  AssignTaskSchema,
  SubmitTaskSchema,
  ReviewSubmissionSchema,
};
