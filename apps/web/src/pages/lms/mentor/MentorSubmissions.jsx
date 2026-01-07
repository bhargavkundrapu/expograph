import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaClipboardList, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock,
  FaStar,
  FaUser,
  FaBook,
  FaCalendar,
  FaEdit
} from "react-icons/fa";
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
    submitted: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-300", label: "Submitted" },
    in_review: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-300", label: "In Review" },
    approved: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-300", label: "Approved" },
    changes_requested: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-300", label: "Changes Requested" },
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

  // Check if submissions feature is enabled
  const submissionsEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_SUBMISSIONS);

  // Only redirect if flags have loaded AND feature is explicitly disabled
  if (!flagsLoading && !submissionsEnabled) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-8">
          <CardTitle className="text-2xl mb-4">Feature Disabled</CardTitle>
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
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
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
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
              <FaClipboardList className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Submissions Queue</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Review and provide feedback on student submissions</p>
            </div>
          </div>
          <div className="layout-flex gap-md">
            <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-2xl font-bold text-emerald-400">{pendingSubmissions.length}</div>
              <div className="text-sm text-gray-400">Pending Review</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{reviewedSubmissions.length}</div>
              <div className="text-sm text-gray-400">Reviewed</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-500/10 border border-gray-500/30">
              <div className="text-2xl font-bold text-gray-400">{submissions.length}</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Submissions */}
      {pendingSubmissions.length > 0 && (
        <div className="layout-flex-col gap-md">
          <h2 className="section-title text-2xl text-white">Pending Review ({pendingSubmissions.length})</h2>
          <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
            {pendingSubmissions.map((submission, idx) => {
              const statusBadge = getStatusBadge(submission.status);
              return (
                <Card
                  key={submission.id}
                  variant="elevated"
                  className="animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
                >
                  <div className="layout-flex items-start justify-between gap-md">
                    <div style={{ flex: 1 }}>
                      <div className="layout-flex items-center gap-md mb-4">
                        <div className={`p-2 rounded-lg ${statusBadge.bg} border ${statusBadge.border}`}>
                          <FaClock className={statusBadge.text} />
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ margin: 0 }}>
                            {submission.lesson_title || submission.task_title || "Submission"}
                          </CardTitle>
                          <div className="layout-flex items-center gap-4 text-xs text-gray-400 mt-1">
                            <div className="layout-flex items-center gap-1">
                              <FaUser className="text-xs" />
                              <span>Student: {submission.student_email || submission.user_email || "—"}</span>
                            </div>
                            <div className="layout-flex items-center gap-1">
                              <FaCalendar className="text-xs" />
                              <span>Submitted: {formatDate(submission.submitted_at)}</span>
                            </div>
                            {submission.attempt_no && (
                              <span>Attempt #{submission.attempt_no}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {submission.content && (
                        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 mb-4">
                          <div className="text-sm font-semibold text-gray-300 mb-2">Submission Content:</div>
                          <div className="text-sm text-gray-400 whitespace-pre-wrap">{submission.content}</div>
                        </div>
                      )}

                      {submission.reviews && submission.reviews.length > 0 && (
                        <div className="layout-flex-col gap-2 mb-4">
                          <div className="text-sm font-semibold text-gray-300">Previous Reviews:</div>
                          {submission.reviews.map((review, rIdx) => (
                            <div key={rIdx} className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                              <div className="layout-flex items-center justify-between mb-2">
                                <div className="text-xs text-gray-400">
                                  {formatDate(review.created_at)}
                                </div>
                                {review.score !== null && (
                                  <div className="layout-flex items-center gap-1">
                                    <FaStar className="text-yellow-400 text-xs" />
                                    <span className="text-xs text-yellow-400">{review.score}/100</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-sm text-gray-300">{review.feedback}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="layout-flex-col gap-md">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusBadge.bg} border ${statusBadge.border} ${statusBadge.text}`}>
                        {statusBadge.label}
                      </span>
                      <Button
                        variant="gradient"
                        size="sm"
                        icon={FaEdit}
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviewed Submissions */}
      {reviewedSubmissions.length > 0 && (
        <div className="layout-flex-col gap-md">
          <h2 className="section-title text-2xl text-white">Reviewed ({reviewedSubmissions.length})</h2>
          <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
            {reviewedSubmissions.map((submission, idx) => {
              const statusBadge = getStatusBadge(submission.status);
              return (
                <Card
                  key={submission.id}
                  variant="elevated"
                  className="animate-fadeIn opacity-75"
                  style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
                >
                  <div className="layout-flex items-start justify-between gap-md">
                    <div style={{ flex: 1 }}>
                      <div className="layout-flex items-center gap-md mb-2">
                        <div className={`p-2 rounded-lg ${statusBadge.bg} border ${statusBadge.border}`}>
                          {submission.status === "approved" ? (
                            <FaCheckCircle className={statusBadge.text} />
                          ) : (
                            <FaTimesCircle className={statusBadge.text} />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ margin: 0 }}>
                            {submission.lesson_title || submission.task_title || "Submission"}
                          </CardTitle>
                          <div className="text-xs text-gray-400 mt-1">
                            Student: {submission.student_email || submission.user_email || "—"} | {formatDate(submission.submitted_at)}
                          </div>
                        </div>
                      </div>
                      {submission.reviews && submission.reviews.length > 0 && (
                        <div className="text-sm text-gray-400 ml-11">
                          Latest feedback: {submission.reviews[submission.reviews.length - 1]?.feedback?.substring(0, 100)}...
                        </div>
                      )}
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusBadge.bg} border ${statusBadge.border} ${statusBadge.text}`}>
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

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="position-fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedSubmission(null)}>
          <Card
            variant="elevated"
            className="p-8 max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle className="text-2xl mb-4">Review Submission</CardTitle>
            
            {/* Submission Details Section */}
            <div className="mb-6 p-6 rounded-lg bg-gray-800 border border-gray-700">
              <div className="layout-flex items-center gap-md mb-4">
                <div className={`p-2 rounded-lg ${getStatusBadge(selectedSubmission.status).bg} border ${getStatusBadge(selectedSubmission.status).border}`}>
                  <FaClock className={getStatusBadge(selectedSubmission.status).text} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="text-lg font-bold text-white mb-2">
                    {selectedSubmission.lesson_title || selectedSubmission.task_title || "Submission"}
                  </div>
                  <div className="layout-flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="layout-flex items-center gap-1">
                      <FaUser className="text-xs" />
                      <span>Student: {selectedSubmission.student_email || selectedSubmission.user_email || "—"}</span>
                    </div>
                    <div className="layout-flex items-center gap-1">
                      <FaCalendar className="text-xs" />
                      <span>Submitted: {formatDate(selectedSubmission.submitted_at)}</span>
                    </div>
                    {selectedSubmission.attempt_no && (
                      <span>Attempt #{selectedSubmission.attempt_no}</span>
                    )}
                  </div>
                </div>
              </div>

              {selectedSubmission.content && (
                <div className="mt-4 p-4 rounded-lg bg-gray-900 border border-gray-800">
                  <div className="text-sm font-semibold text-gray-300 mb-2">Submission Content:</div>
                  <div className="text-sm text-gray-400 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {selectedSubmission.content}
                  </div>
                </div>
              )}

              {selectedSubmission.reviews && selectedSubmission.reviews.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-300 mb-2">Previous Reviews:</div>
                  <div className="layout-flex-col gap-2 max-h-48 overflow-y-auto">
                    {selectedSubmission.reviews.map((review, rIdx) => (
                      <div key={rIdx} className="p-3 rounded-lg bg-gray-900 border border-gray-800">
                        <div className="layout-flex items-center justify-between mb-2">
                          <div className="text-xs text-gray-400">
                            {formatDate(review.created_at)}
                          </div>
                          {review.score !== null && (
                            <div className="layout-flex items-center gap-1">
                              <FaStar className="text-yellow-400 text-xs" />
                              <span className="text-xs text-yellow-400">{review.score}/100</span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-300">{review.feedback}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-700 pt-6 mb-6">
              <CardDescription className="mb-4 text-lg font-semibold">Provide Your Review</CardDescription>
            </div>

            <div className="layout-flex-col gap-md mb-6">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Score (0-100, optional)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={reviewForm.score}
                  onChange={(e) => setReviewForm({ ...reviewForm, score: e.target.value })}
                  className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-400"
                  placeholder="Enter score (optional)"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Feedback *</label>
                <textarea
                  value={reviewForm.feedback}
                  onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                  className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-400"
                  rows={6}
                  placeholder="Provide detailed feedback..."
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Decision *</label>
                <select
                  value={reviewForm.decision}
                  onChange={(e) => setReviewForm({ ...reviewForm, decision: e.target.value })}
                  className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-400"
                >
                  <option value="in_review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="changes_requested">Changes Requested</option>
                </select>
              </div>
            </div>

            <div className="layout-flex flex-col sm:flex-row gap-3 sm:gap-md items-stretch sm:items-center">
              <Button
                variant="gradient"
                size="md"
                onClick={() => submitReview(selectedSubmission.id)}
                disabled={submitting || !reviewForm.feedback.trim()}
                fullWidth
                className="sm:w-auto"
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
                fullWidth
                className="sm:w-auto"
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

