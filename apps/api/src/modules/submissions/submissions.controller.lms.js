const { z } = require("zod");
const { asyncHandler } = require("../../utils/asyncHandler");
const svc = require("./submissions.service");
const { HttpError } = require("../../utils/httpError");

const SubmitSchema = z.object({
  contentType: z.enum(["text", "code", "link"]).default("text"),
  content: z.string().min(1),
});

const submit = asyncHandler(async (req, res) => {
  const parsed = SubmitSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const created = await svc.submitTask({
    tenantId: req.tenant.id,
    taskId: req.params.taskId,
    userId: req.auth.userId,
    contentType: parsed.data.contentType,
    content: parsed.data.content,
  });

  res.status(201).json({ ok: true, data: created });
});

const mine = asyncHandler(async (req, res) => {
  const rows = await svc.listMySubmissions({
    tenantId: req.tenant.id,
    userId: req.auth.userId,
  });
  res.json({ ok: true, data: rows });
});

module.exports = { submit, mine };
