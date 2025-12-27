const repo = require("./submissions.repo");
const { HttpError } = require("../../utils/httpError");
const { query } = require("../../db/query");

async function ensureTaskExists({ tenantId, taskId }) {
  const { rows } = await query(
    `SELECT id FROM practice_tasks WHERE tenant_id=$1 AND id=$2`,
    [tenantId, taskId]
  );
  if (!rows.length) throw new HttpError(404, "Task not found");
}

async function submitTask({ tenantId, taskId, userId, contentType, content }) {
  await ensureTaskExists({ tenantId, taskId });

  const attemptNo = await repo.getNextAttemptNo({ tenantId, taskId, userId });
  return repo.createSubmission({ tenantId, taskId, userId, attemptNo, contentType, content });
}

async function mentorReview({ tenantId, submissionId, mentorId, score, feedback, decision }) {
  const sub = await repo.getSubmissionById({ tenantId, submissionId });
  if (!sub) throw new HttpError(404, "Submission not found");

  // Create review entry
  const review = await repo.createReview({ tenantId, submissionId, mentorId, score, feedback });

  // Update status based on decision
  let newStatus = "in_review";
  if (decision === "approved") newStatus = "approved";
  if (decision === "changes_requested") newStatus = "changes_requested";

  const updated = await repo.setSubmissionStatus({ tenantId, submissionId, status: newStatus });

  return { review, submission: updated };
}

module.exports = {
  submitTask,
  mentorReview,
  ...repo,
};
