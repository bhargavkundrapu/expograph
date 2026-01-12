import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import Button from "../../../Components/ui/Button";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function getStatusBadge(status) {
  const badges = {
    submitted: { label: "Submitted" },
    in_review: { label: "In Review" },
    approved: { label: "Approved" },
    changes_requested: { label: "Changes Requested" },
  };
  return badges[status] || badges.submitted;
}

export default function MentorSubmissions() {
  const { token } = useAuth();
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    score: "",
    feedback: "",
    decision: "in_review",
  });
  const [submitting, setSubmitting] = useState(false);
  const alive = useRef(true);

  const submissionsEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_SUBMISSIONS);

  if (!flagsLoading && !submissionsEnabled) {
    return (
      <div>
        <Card variant="elevated">
          <CardTitle>Feature Disabled</CardTitle>
          <CardDescription>Submissions review feature is currently disabled by the administrator.</CardDescription>
        </Card>
      </div>
    );
  }

  async function loadSubmissions(signal) {
    try {
      const json = await apiFetch("/api/v1/mentor/submissions/queue", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setSubmissions(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load submissions:", e);
      if (alive.current) setErr(e?.message || "Failed to load submissions");
    }
  }

  async function submitReview(submissionId) {
    if (!reviewForm.feedback.trim()) {
      alert("Please provide feedback");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch(`/api/v1/mentor/submissions/${submissionId}/review`, {
        method: "POST",
        token,
        body: {
          score: reviewForm.score ? parseInt(reviewForm.score) : undefined,
          feedback: reviewForm.feedback,
          decision: reviewForm.decision,
        },
      });
      
      alert("Review submitted successfully!");
      setSelectedSubmission(null);
      setReviewForm({ score: "", feedback: "", decision: "in_review" });
      
      const ac = new AbortController();
      await loadSubmissions(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    setLoading(true);
    loadSubmissions(ac.signal).finally(() => {
      if (!ac.signal?.aborted && alive.current) setLoading(false);
    });
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

  if (loading) {
    return (
      <div>
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Submissions" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadSubmissions(ac.signal);
        }} 
      />
    );
  }

  const pendingSubmissions = submissions.filter(s => s.status === "submitted" || s.status === "in_review");
  const reviewedSubmissions = submissions.filter(s => s.status === "approved" || s.status === "changes_requested");

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Submissions Queue</h1>
              <p>Review and provide feedback on student submissions</p>
            </div>
          </div>
          <div>
            <div>
              <div>{pendingSubmissions.length}</div>
              <div>Pending Review</div>
            </div>
            <div>
              <div>{reviewedSubmissions.length}</div>
              <div>Reviewed</div>
            </div>
            <div>
              <div>{submissions.length}</div>
              <div>Total</div>
            </div>
          </div>
        </div>
      </div>

      {pendingSubmissions.length > 0 && (
        <div>
          <h2>Pending Review ({pendingSubmissions.length})</h2>
          <div>
            {pendingSubmissions.map((submission, idx) => {
              const statusBadge = getStatusBadge(submission.status);
              return (
                <Card
                  key={submission.id}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>
                          {submission.lesson_title || submission.task_title || "Submission"}
                        </CardTitle>
                        <div>
                          <div>
                            <span>Student: {submission.student_email || submission.user_email || "—"}</span>
                          </div>
                          <div>
                            <span>Submitted: {formatDate(submission.submitted_at)}</span>
                          </div>
                          {submission.attempt_no && (
                            <span>Attempt #{submission.attempt_no}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {submission.content && (
                      <div>
                        <div>Submission Content:</div>
                        <div>{submission.content}</div>
                      </div>
                    )}

                    {submission.reviews && submission.reviews.length > 0 && (
                      <div>
                        <div>Previous Reviews:</div>
                        {submission.reviews.map((review, rIdx) => (
                          <div key={rIdx}>
                            <div>
                              <div>
                                {formatDate(review.created_at)}
                              </div>
                              {review.score !== null && (
                                <div>
                                  <span>{review.score}/100</span>
                                </div>
                              )}
                            </div>
                            <div>{review.feedback}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <span>
                      {statusBadge.label}
                    </span>
                    <Button
                      variant="gradient"
                      size="sm"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      Review
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {reviewedSubmissions.length > 0 && (
        <div>
          <h2>Reviewed ({reviewedSubmissions.length})</h2>
          <div>
            {reviewedSubmissions.map((submission, idx) => {
              const statusBadge = getStatusBadge(submission.status);
              return (
                <Card
                  key={submission.id}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>
                          {submission.lesson_title || submission.task_title || "Submission"}
                        </CardTitle>
                        <div>
                          Student: {submission.student_email || submission.user_email || "—"} | {formatDate(submission.submitted_at)}
                        </div>
                      </div>
                      {submission.reviews && submission.reviews.length > 0 && (
                        <div>
                          Latest feedback: {submission.reviews[submission.reviews.length - 1]?.feedback?.substring(0, 100)}...
                        </div>
                      )}
                    </div>
                    <span>
                      {statusBadge.label}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {submissions.length === 0 && (
        <EmptyState
          title="No Submissions"
          message="There are currently no submissions in the queue."
        />
      )}

      {selectedSubmission && (
        <div onClick={() => setSelectedSubmission(null)}>
          <Card
            variant="elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle>Review Submission</CardTitle>
            
            <div>
              <div>
                <div>
                </div>
                <div>
                  <div>
                    {selectedSubmission.lesson_title || selectedSubmission.task_title || "Submission"}
                  </div>
                  <div>
                    <div>
                      <span>Student: {selectedSubmission.student_email || selectedSubmission.user_email || "—"}</span>
                    </div>
                    <div>
                      <span>Submitted: {formatDate(selectedSubmission.submitted_at)}</span>
                    </div>
                    {selectedSubmission.attempt_no && (
                      <span>Attempt #{selectedSubmission.attempt_no}</span>
                    )}
                  </div>
                </div>
              </div>

              {selectedSubmission.content && (
                <div>
                  <div>Submission Content:</div>
                  <div>
                    {selectedSubmission.content}
                  </div>
                </div>
              )}

              {selectedSubmission.reviews && selectedSubmission.reviews.length > 0 && (
                <div>
                  <div>Previous Reviews:</div>
                  <div>
                    {selectedSubmission.reviews.map((review, rIdx) => (
                      <div key={rIdx}>
                        <div>
                          <div>
                            {formatDate(review.created_at)}
                          </div>
                          {review.score !== null && (
                            <div>
                              <span>{review.score}/100</span>
                            </div>
                          )}
                        </div>
                        <div>{review.feedback}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <CardDescription>Provide Your Review</CardDescription>
            </div>

            <div>
              <div>
                <label>Score (0-100, optional)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={reviewForm.score}
                  onChange={(e) => setReviewForm({ ...reviewForm, score: e.target.value })}
                  placeholder="Enter score (optional)"
                />
              </div>

              <div>
                <label>Feedback *</label>
                <textarea
                  value={reviewForm.feedback}
                  onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                  rows={6}
                  placeholder="Provide detailed feedback..."
                  required
                />
              </div>

              <div>
                <label>Decision *</label>
                <select
                  value={reviewForm.decision}
                  onChange={(e) => setReviewForm({ ...reviewForm, decision: e.target.value })}
                >
                  <option value="in_review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="changes_requested">Changes Requested</option>
                </select>
              </div>
            </div>

            <div>
              <Button
                variant="gradient"
                size="md"
                onClick={() => submitReview(selectedSubmission.id)}
                disabled={submitting || !reviewForm.feedback.trim()}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedSubmission(null);
                  setReviewForm({ score: "", feedback: "", decision: "in_review" });
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
