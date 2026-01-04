const { z } = require("zod");
const { asyncHandler } = require("../../utils/asyncHandler");
const svc = require("./submissions.service");
const { HttpError } = require("../../utils/httpError");

const ReviewSchema = z.object({
  score: z.number().int().min(0).max(100).optional(),
  feedback: z.string().min(1),
  decision: z.enum(["in_review", "approved", "changes_requested"]).default("in_review"),
});

const queue = asyncHandler(async (req, res) => {
  const rows = await svc.listMentorQueue({ tenantId: req.tenant.id });
  res.json({ ok: true, data: rows });
});

const review = asyncHandler(async (req, res) => {
  const parsed = ReviewSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid input", parsed.error.flatten());

  const result = await svc.mentorReview({
    tenantId: req.tenant.id,
    submissionId: req.params.id,
    mentorId: req.auth.userId,
    score: parsed.data.score,
    feedback: parsed.data.feedback,
    decision: parsed.data.decision,
  });

  res.status(201).json({ ok: true, data: result });
});

module.exports = { queue, review };
