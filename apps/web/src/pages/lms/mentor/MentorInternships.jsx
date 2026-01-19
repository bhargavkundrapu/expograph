import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiLayers,
  FiSearch,
  FiEye,
  FiX,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiSave,
  FiAlertCircle,
  FiLink,
  FiCode,
} from "react-icons/fi";

export default function MentorInternships() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/review")) return "review";
    if (path.includes("/deliverables")) return "deliverables";
    if (path.includes("/assignments")) return "assignments";
    return "deliverables";
  };
  
  const view = getViewFromPath();
  const [deliverables, setDeliverables] = useState([]);
  const [filteredDeliverables, setFilteredDeliverables] = useState([]);
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewForm, setReviewForm] = useState({
    status: "reviewed",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchDeliverables();
  }, [token]);

  useEffect(() => {
    if (!token || !params.deliverableId) return;
    if (view === "review") {
      loadDeliverableData();
    }
  }, [params.deliverableId, view, token]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDeliverables(deliverables);
    } else {
      const filtered = deliverables.filter(
        (del) =>
          del.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          del.project_title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDeliverables(filtered);
    }
  }, [searchQuery, deliverables]);

  const fetchDeliverables = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/mentor/internships/deliverables", { token });
      const deliverablesArray = Array.isArray(res) ? res : (res?.data || []);
      setDeliverables(deliverablesArray);
    } catch (error) {
      console.error("Failed to fetch deliverables:", error);
      setDeliverables([]);
    } finally {
      setLoading(false);
    }
  };

  const loadDeliverableData = async () => {
    // Check if we have the deliverable in our list first to avoid unnecessary API call
    const deliverableFromList = deliverables.find(d => String(d.id) === String(params.deliverableId));
    if (deliverableFromList) {
      setSelectedDeliverable(deliverableFromList);
      if (deliverableFromList.review) {
        setReviewForm({
          status: deliverableFromList.review.status || "reviewed",
          notes: deliverableFromList.review.notes || "",
        });
      }
      return; // Use local data, skip API call
    }

    try {
      const res = await apiFetch(`/api/v1/mentor/internships/deliverables/${params.deliverableId}`, { token });
      const deliverable = res?.data || res;
      if (deliverable) {
        setSelectedDeliverable(deliverable);
        if (deliverable.review) {
          setReviewForm({
            status: deliverable.review.status || "reviewed",
            notes: deliverable.review.notes || "",
          });
        }
      }
    } catch (error) {
      // Silently handle 404 - we already checked local data above
      if (error?.status !== 404) {
        console.error("Failed to load deliverable:", error);
      }
    }
  };

  const handleReview = async () => {
    if (!reviewForm.notes.trim()) {
      alert("Review notes are required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch(`/api/v1/mentor/internships/deliverables/${params.deliverableId}/review`, {
        method: "POST",
        token,
        body: {
          status: reviewForm.status,
          notes: reviewForm.notes,
        },
      });

      if (res?.ok) {
        await fetchDeliverables();
        navigate("/lms/mentor/internships/deliverables");
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
      case "reviewed":
        return "bg-blue-100 text-blue-700";
      case "submitted":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (view === "deliverables" || view === "assignments") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Internship Deliverables ({filteredDeliverables.length})
          </h1>

          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student or project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse">
                  <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 w-64 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredDeliverables.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
              <FiLayers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No deliverables found</h3>
              <p className="text-slate-600">No internship deliverables awaiting review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeliverables.map((deliverable, index) => (
                <motion.div
                  key={deliverable.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{deliverable.project_title || "Project"}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deliverable.status)}`}>
                          {deliverable.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-2">
                          <FiUsers className="w-4 h-4" />
                          {deliverable.student_name || "Unknown Student"}
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock className="w-4 h-4" />
                          {deliverable.submitted_at ? new Date(deliverable.submitted_at).toLocaleDateString() : "N/A"}
                        </div>
                        {deliverable.batch_name && (
                          <div className="flex items-center gap-2">
                            <FiLayers className="w-4 h-4" />
                            {deliverable.batch_name}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        {deliverable.repo_url && (
                          <a
                            href={deliverable.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                          >
                            <FiCode className="w-4 h-4" />
                            Repository
                          </a>
                        )}
                        {deliverable.deploy_url && (
                          <a
                            href={deliverable.deploy_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <FiLink className="w-4 h-4" />
                            Deploy
                          </a>
                        )}
                        {deliverable.demo_url && (
                          <a
                            href={deliverable.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 flex items-center gap-1"
                          >
                            <FiLink className="w-4 h-4" />
                            Demo
                          </a>
                        )}
                      </div>
                      {deliverable.notes && (
                        <p className="text-sm text-slate-600 mt-3">{deliverable.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => navigate(`/lms/mentor/internships/deliverables/${deliverable.id}/review`)}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
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

  if (view === "review" && selectedDeliverable) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedDeliverable.project_title || "Review Deliverable"}
                </h2>
                <p className="text-slate-600">Student: {selectedDeliverable.student_name}</p>
              </div>
              <button
                onClick={() => navigate("/lms/mentor/internships/deliverables")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Deliverable Details</h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDeliverable.status)}`}>
                      {selectedDeliverable.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Version</span>
                    <span className="text-sm font-medium text-slate-900">v{selectedDeliverable.version_no || 1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Submitted</span>
                    <span className="text-sm font-medium text-slate-900">
                      {selectedDeliverable.submitted_at ? new Date(selectedDeliverable.submitted_at).toLocaleString() : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedDeliverable.repo_url && (
                      <a
                        href={selectedDeliverable.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 flex items-center gap-1"
                      >
                        <FiCode className="w-4 h-4" />
                        Repository
                      </a>
                    )}
                    {selectedDeliverable.deploy_url && (
                      <a
                        href={selectedDeliverable.deploy_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 flex items-center gap-1"
                      >
                        <FiLink className="w-4 h-4" />
                        Deploy
                      </a>
                    )}
                    {selectedDeliverable.demo_url && (
                      <a
                        href={selectedDeliverable.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 flex items-center gap-1"
                      >
                        <FiLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                  </div>
                  {selectedDeliverable.notes && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-sm text-slate-700">{selectedDeliverable.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                    <select
                      value={reviewForm.status}
                      onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                    >
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                      <option value="changes_requested">Changes Requested</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Review Notes <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={reviewForm.notes}
                      onChange={(e) => setReviewForm({ ...reviewForm, notes: e.target.value })}
                      rows={6}
                      placeholder="Provide detailed review feedback..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleReview}
                disabled={saving || !reviewForm.notes.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                onClick={() => navigate("/lms/mentor/internships/deliverables")}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
