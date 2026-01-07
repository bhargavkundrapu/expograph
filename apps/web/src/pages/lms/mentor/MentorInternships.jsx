import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaBriefcase, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock,
  FaUser,
  FaCalendar,
  FaEdit,
  FaCodeBranch
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
    approved: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-300", label: "Approved" },
    changes_requested: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-300", label: "Changes Requested" },
  };
  return badges[status] || badges.submitted;
}

export default function MentorInternships() {
  const { token } = useAuth();
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    status: "approved",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const alive = useRef(true);

  // Check if internships feature is enabled
  const internshipsEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_INTERNSHIPS);

  // Only show disabled message if flags have loaded AND feature is explicitly disabled
  if (!flagsLoading && !internshipsEnabled) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-8">
          <CardTitle className="text-2xl mb-4">Feature Disabled</CardTitle>
          <CardDescription>Internship review feature is currently disabled by the administrator.</CardDescription>
        </Card>
      </div>
    );
  }

  async function loadDeliverables(signal) {
    try {
      // Note: This endpoint might need to be created
      // For now, we'll use the applications endpoint to get assignments
      const json = await apiFetch("/api/v1/mentor/internships/applications", { token, signal });
      const list = unwrapArray(json);
      
      // Filter for approved applications (which have deliverables)
      const approved = list.filter(app => app.status === "approved");
      
      // TODO: Fetch actual deliverables when endpoint is available
      // For now, show a message
      if (alive.current) {
        setDeliverables([]); // Empty until endpoint is ready
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load deliverables:", e);
      if (alive.current) setErr(e?.message || "Failed to load internship deliverables");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function submitReview(deliverableId) {
    if (!reviewForm.notes.trim() && reviewForm.status === "changes_requested") {
      alert("Please provide notes when requesting changes");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch(`/api/v1/mentor/internships/deliverables/${deliverableId}/review`, {
        method: "POST",
        token,
        body: {
          status: reviewForm.status,
          notes: reviewForm.notes,
        },
      });
      
      alert("Review submitted successfully!");
      setSelectedDeliverable(null);
      setReviewForm({ status: "approved", notes: "" });
      
      const ac = new AbortController();
      await loadDeliverables(ac.signal);
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
    loadDeliverables(ac.signal);
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
        title="Failed to Load Deliverables" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadDeliverables(ac.signal);
        }} 
      />
    );
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg shadow-indigo-500/30">
              <FaBriefcase className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Internship Reviews</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Review internship project deliverables</p>
            </div>
          </div>
          <div className="layout-flex gap-md">
            <div className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400">{deliverables.filter(d => d.status === "submitted").length}</div>
              <div className="text-sm text-gray-400">Pending Review</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-2xl font-bold text-emerald-400">{deliverables.filter(d => d.status === "approved").length}</div>
              <div className="text-sm text-gray-400">Approved</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-500/10 border border-gray-500/30">
              <div className="text-2xl font-bold text-gray-400">{deliverables.length}</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </div>
        </div>
      </div>

      {deliverables.length === 0 ? (
        <EmptyState
          title="No Deliverables to Review"
          message="There are currently no internship deliverables pending review. Deliverables will appear here when students submit their work."
        />
      ) : (
        <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
          {deliverables.map((deliverable, idx) => {
            const statusBadge = getStatusBadge(deliverable.status);
            return (
              <Card
                key={deliverable.id}
                variant="elevated"
                className="animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
              >
                <div className="layout-flex items-start justify-between gap-md">
                  <div style={{ flex: 1 }}>
                    <div className="layout-flex items-center gap-md mb-4">
                      <div className={`p-2 rounded-lg ${statusBadge.bg} border ${statusBadge.border}`}>
                        <FaBriefcase className={statusBadge.text} />
                      </div>
                      <div>
                        <CardTitle className="text-lg" style={{ margin: 0 }}>
                          {deliverable.project_title || "Internship Project"}
                        </CardTitle>
                        <div className="layout-flex items-center gap-4 text-xs text-gray-400 mt-1">
                          <div className="layout-flex items-center gap-1">
                            <FaUser className="text-xs" />
                            <span>Student: {deliverable.student_email || deliverable.user_email || "—"}</span>
                          </div>
                          <div className="layout-flex items-center gap-1">
                            <FaCalendar className="text-xs" />
                            <span>Submitted: {formatDate(deliverable.submitted_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {deliverable.repo_url && (
                      <div className="p-3 rounded-lg bg-gray-800 border border-gray-700 mb-2">
                        <div className="layout-flex items-center gap-2 text-sm">
                          <FaCodeBranch className="text-gray-400" />
                          <a href={deliverable.repo_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                            Repository
                          </a>
                        </div>
                      </div>
                    )}

                    {deliverable.deploy_url && (
                      <div className="p-3 rounded-lg bg-gray-800 border border-gray-700 mb-2">
                        <div className="layout-flex items-center gap-2 text-sm">
                          <FaCheckCircle className="text-gray-400" />
                          <a href={deliverable.deploy_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                            Deployed URL
                          </a>
                        </div>
                      </div>
                    )}

                    {deliverable.notes && (
                      <div className="p-3 rounded-lg bg-gray-800 border border-gray-700 mb-4">
                        <div className="text-sm font-semibold text-gray-300 mb-1">Student Notes:</div>
                        <div className="text-sm text-gray-400">{deliverable.notes}</div>
                      </div>
                    )}
                  </div>

                  <div className="layout-flex-col gap-md">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusBadge.bg} border ${statusBadge.border} ${statusBadge.text}`}>
                      {statusBadge.label}
                    </span>
                    {deliverable.status === "submitted" && (
                      <Button
                        variant="gradient"
                        size="sm"
                        icon={FaEdit}
                        onClick={() => setSelectedDeliverable(deliverable)}
                      >
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {selectedDeliverable && (
        <div className="position-fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedDeliverable(null)}>
          <Card
            variant="elevated"
            className="p-8 max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle className="text-2xl mb-4">Review Deliverable</CardTitle>
            <CardDescription className="mb-6">
              {selectedDeliverable.project_title || "Internship Project"}
            </CardDescription>

            <div className="layout-flex-col gap-md mb-6">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Status *</label>
                <select
                  value={reviewForm.status}
                  onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value })}
                  className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                >
                  <option value="approved">Approved</option>
                  <option value="changes_requested">Changes Requested</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Notes</label>
                <textarea
                  value={reviewForm.notes}
                  onChange={(e) => setReviewForm({ ...reviewForm, notes: e.target.value })}
                  className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                  rows={6}
                  placeholder="Provide feedback and notes..."
                />
              </div>
            </div>

            <div className="layout-flex gap-md">
              <Button
                variant="gradient"
                size="md"
                onClick={() => submitReview(selectedDeliverable.id)}
                disabled={submitting || (reviewForm.status === "changes_requested" && !reviewForm.notes.trim())}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedDeliverable(null);
                  setReviewForm({ status: "approved", notes: "" });
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

