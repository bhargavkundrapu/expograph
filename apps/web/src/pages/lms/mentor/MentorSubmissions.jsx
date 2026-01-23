import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiFileText,
  FiSearch,
  FiEye,
  FiX,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiClock,
  FiUser,
  FiSave,
  FiAlertCircle,
} from "react-icons/fi";

export default function MentorSubmissions() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/review")) return "review";
    if (path.includes("/list")) return "list";
    return "queue";
  };
  
  const view = getViewFromPath();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    score: "",
    feedback: "",
    decision: "in_review",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchSubmissions();
  }, [token]);

  useEffect(() => {
    if (!token || !params.submissionId || view !== "review") return;
    loadSubmissionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.submissionId, view, token]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSubmissions(submissions);
    } else {
      const filtered = submissions.filter(
        (sub) =>
          sub.student_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.task_title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    }
  }, [searchQuery, submissions]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/mentor/submissions/queue", { token });
      const submissionsArray = Array.isArray(res) ? res : (res?.data || []);
      setSubmissions(submissionsArray);
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissionData = async () => {
    // Check if we have the submission in our list first to avoid unnecessary API call
    const submissionFromQueue = submissions.find(s => String(s.id) === String(params.submissionId));
    if (submissionFromQueue) {
      setSelectedSubmission(submissionFromQueue);
      if (submissionFromQueue.review) {
        setReviewForm({
          score: submissionFromQueue.review.score || "",
          feedback: submissionFromQueue.review.feedback || "",
          decision: submissionFromQueue.review.decision || "in_review",
        });
      }
      return; // Use local data, skip API call
    }

    try {
      const res = await apiFetch(`/api/v1/mentor/submissions/${params.submissionId}`, { token });
      const submission = res?.data || res;
      if (submission) {
        setSelectedSubmission(submission);
        if (submission.review) {
          setReviewForm({
            score: submission.review.score || "",
            feedback: submission.review.feedback || "",
            decision: submission.review.decision || "in_review",
          });
        }
      }
    } catch (error) {
      // Silently handle 404 - we already checked local data above
      if (error?.status !== 404) {
        console.error("Failed to load submission:", error);
      }
    }
  };

  const handleReview = async () => {
    if (!reviewForm.feedback.trim()) {
      alert("Feedback is required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch(`/api/v1/mentor/submissions/${params.submissionId}`, {
        method: "POST",
        token,
        body: {
          score: reviewForm.score ? parseInt(reviewForm.score) : undefined,
          feedback: reviewForm.feedback,
          decision: reviewForm.decision,
        },
      });

      if (res?.ok) {
        await fetchSubmissions();
        navigate("/lms/mentor/submissions/queue");
        alert("Review submitted successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to submit review");
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700";
      case "changes_requested":
        return "bg-amber-100 text-amber-700";
      case "in_review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (view === "queue" || view === "list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Submissions Queue ({filteredSubmissions.length})
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/lms/mentor/submissions/list")}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                List View
              </button>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student or task..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-md p-6 border border-slate-200 animate-pulse">
                  <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 w-64 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
              <FiFileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No submissions found</h3>
              <p className="text-slate-600">All caught up! No submissions pending review.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-md p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{submission.task_title || "Practice Task"}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-2">
                          <FiUser className="w-4 h-4" />
                          {submission.student_email || "Unknown Student"}
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock className="w-4 h-4" />
                          {submission.submitted_at ? new Date(submission.submitted_at).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                      {submission.code_url && (
                        <a
                          href={submission.code_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-600 hover:text-emerald-700"
                        >
                          View Submission →
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => navigate(`/lms/mentor/submissions/${submission.id}/review`)}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <FiEye className="w-5 h-5" />
                      Review
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === "review" && selectedSubmission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedSubmission.task_title || "Review Submission"}
                </h2>
                <p className="text-slate-600">Student: {selectedSubmission.student_email}</p>
              </div>
              <button
                onClick={() => navigate("/lms/mentor/submissions/queue")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Submission Details</h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSubmission.status)}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Submitted</span>
                    <span className="text-sm font-medium text-slate-900">
                      {selectedSubmission.submitted_at ? new Date(selectedSubmission.submitted_at).toLocaleString() : "N/A"}
                    </span>
                  </div>
                  {selectedSubmission.code_url && (
                    <div>
                      <a
                        href={selectedSubmission.code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        View Code →
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Score (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={reviewForm.score}
                      onChange={(e) => setReviewForm({ ...reviewForm, score: e.target.value })}
                      placeholder="Optional"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Feedback <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={reviewForm.feedback}
                      onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                      rows={6}
                      placeholder="Provide detailed feedback..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Decision</label>
                    <select
                      value={reviewForm.decision}
                      onChange={(e) => setReviewForm({ ...reviewForm, decision: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                    >
                      <option value="in_review">In Review</option>
                      <option value="approved">Approved</option>
                      <option value="changes_requested">Changes Requested</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleReview}
                disabled={saving || !reviewForm.feedback.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <ButtonLoading text="Submitting..." size="sm" />
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Submit Review
                  </>
                )}
              </button>
              <button
                onClick={() => navigate("/lms/mentor/submissions/queue")}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "review" && !selectedSubmission) {
    return <PageLoading message="Loading submission..." />;
  }

  return null;
}
