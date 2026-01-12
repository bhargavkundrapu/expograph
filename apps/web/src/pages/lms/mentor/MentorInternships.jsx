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
    approved: { label: "Approved" },
    changes_requested: { label: "Changes Requested" },
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

  const internshipsEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_INTERNSHIPS);

  if (!flagsLoading && !internshipsEnabled) {
    return (
      <div>
        <Card variant="elevated">
          <CardTitle>Feature Disabled</CardTitle>
          <CardDescription>Internship review feature is currently disabled by the administrator.</CardDescription>
        </Card>
      </div>
    );
  }

  async function loadDeliverables(signal) {
    try {
      const json = await apiFetch("/api/v1/mentor/internships/deliverables", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setDeliverables(list);
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
      <div>
        <Skeleton />
        <Skeleton />
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
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Internship Reviews</h1>
              <p>Review internship project deliverables</p>
            </div>
          </div>
          <div>
            <div>
              <div>{deliverables.filter(d => d.status === "submitted").length}</div>
              <div>Pending Review</div>
            </div>
            <div>
              <div>{deliverables.filter(d => d.status === "approved").length}</div>
              <div>Approved</div>
            </div>
            <div>
              <div>{deliverables.length}</div>
              <div>Total</div>
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
        <div>
          {deliverables.map((deliverable, idx) => {
            const statusBadge = getStatusBadge(deliverable.status);
            return (
              <Card
                key={deliverable.id}
                variant="elevated"
              >
                <div>
                  <div>
                    <div>
                    </div>
                    <div>
                      <CardTitle>
                        {deliverable.project_title || "Internship Project"}
                      </CardTitle>
                      <div>
                        <div>
                          <span>Student: {deliverable.student_email || deliverable.student_name || "—"}</span>
                        </div>
                        <div>
                          <span>Submitted: {formatDate(deliverable.submitted_at)}</span>
                        </div>
                        {deliverable.version_no && (
                          <div>
                            <span>Version: {deliverable.version_no}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {deliverable.repo_url && (
                    <div>
                      <div>
                        <a href={deliverable.repo_url} target="_blank" rel="noopener noreferrer">
                          Repository
                        </a>
                      </div>
                    </div>
                  )}

                  {deliverable.deploy_url && (
                    <div>
                      <div>
                        <a href={deliverable.deploy_url} target="_blank" rel="noopener noreferrer">
                          Deployed URL
                        </a>
                      </div>
                    </div>
                  )}

                  {deliverable.demo_url && (
                    <div>
                      <div>
                        <a href={deliverable.demo_url} target="_blank" rel="noopener noreferrer">
                          Demo URL
                        </a>
                      </div>
                    </div>
                  )}

                  {deliverable.notes && (
                    <div>
                      <div>Student Notes:</div>
                      <div>{deliverable.notes}</div>
                    </div>
                  )}
                </div>

                <div>
                  <span>
                    {statusBadge.label}
                  </span>
                  {deliverable.status === "submitted" && (
                    <Button
                      variant="gradient"
                      size="sm"
                      onClick={() => setSelectedDeliverable(deliverable)}
                    >
                      Review
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {selectedDeliverable && (
        <div onClick={() => setSelectedDeliverable(null)}>
          <Card
            variant="elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle>Review Deliverable</CardTitle>
            
            <div>
              <div>
                <div>
                </div>
                <div>
                  <div>
                    {selectedDeliverable.project_title || "Internship Project"}
                  </div>
                  <div>
                    <div>
                      <span>Student: {selectedDeliverable.student_email || selectedDeliverable.student_name || "—"}</span>
                    </div>
                    <div>
                      <span>Submitted: {formatDate(selectedDeliverable.submitted_at)}</span>
                    </div>
                    {selectedDeliverable.version_no && (
                      <span>Version: {selectedDeliverable.version_no}</span>
                    )}
                    {selectedDeliverable.batch_name && (
                      <span>Batch: {selectedDeliverable.batch_name}</span>
                    )}
                  </div>
                </div>
              </div>

              {selectedDeliverable.repo_url && (
                <div>
                  <div>
                    <a href={selectedDeliverable.repo_url} target="_blank" rel="noopener noreferrer">
                      Repository: {selectedDeliverable.repo_url}
                    </a>
                  </div>
                </div>
              )}

              {selectedDeliverable.deploy_url && (
                <div>
                  <div>
                    <a href={selectedDeliverable.deploy_url} target="_blank" rel="noopener noreferrer">
                      Deployed URL: {selectedDeliverable.deploy_url}
                    </a>
                  </div>
                </div>
              )}

              {selectedDeliverable.demo_url && (
                <div>
                  <div>
                    <a href={selectedDeliverable.demo_url} target="_blank" rel="noopener noreferrer">
                      Demo URL: {selectedDeliverable.demo_url}
                    </a>
                  </div>
                </div>
              )}

              {selectedDeliverable.notes && (
                <div>
                  <div>Student Notes:</div>
                  <div>
                    {selectedDeliverable.notes}
                  </div>
                </div>
              )}
            </div>

            <div>
              <CardDescription>Provide Your Review</CardDescription>
            </div>

            <div>
              <div>
                <label>Status *</label>
                <select
                  value={reviewForm.status}
                  onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value })}
                >
                  <option value="approved">Approved</option>
                  <option value="changes_requested">Changes Requested</option>
                </select>
              </div>

              <div>
                <label>Notes</label>
                <textarea
                  value={reviewForm.notes}
                  onChange={(e) => setReviewForm({ ...reviewForm, notes: e.target.value })}
                  rows={6}
                  placeholder="Provide feedback and notes..."
                />
              </div>
            </div>

            <div>
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
