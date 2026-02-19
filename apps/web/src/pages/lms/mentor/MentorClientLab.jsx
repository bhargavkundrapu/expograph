import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiBriefcase,
  FiSearch,
  FiEye,
  FiX,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiMessageSquare,
  FiSave,
  FiAlertCircle,
} from "react-icons/fi";

export default function MentorClientLab() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/review")) return "review";
    if (path.includes("/tasks") && !path.includes("/review")) return "tasks";
    if (path.includes("/details") || params.projectId) return "details";
    if (path.includes("/list")) return "list";
    return "projects";
  };
  
  const view = getViewFromPath();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    message: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchProjects();
  }, [token]);

  useEffect(() => {
    if (!token || !params.projectId) return;
    if (view === "details") {
      loadProjectData();
    }
    if (view === "tasks" || (view === "review" && params.taskId)) {
      loadReviewQueue();
    }
  }, [params.projectId, params.taskId, view, token]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.scope?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Fetch projects where mentor is assigned
      const res = await apiFetch("/api/v1/mentor/client-lab/projects", { token });
      const projectsArray = Array.isArray(res) ? res : (res?.data || []);
      setProjects(projectsArray);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectData = async () => {
    // Check if we have the project in our list first to avoid unnecessary API call
    const projectFromList = projects.find(p => String(p.id) === String(params.projectId));
    if (projectFromList) {
      setSelectedProject(projectFromList);
      return; // Use local data, skip API call
    }

    try {
      const res = await apiFetch(`/api/v1/mentor/client-lab/projects/${params.projectId}`, { token });
      const project = res?.data || res;
      if (project) {
        setSelectedProject(project);
      }
    } catch (error) {
      // Silently handle 404 - we already checked local data above
      if (error?.status !== 404) {
        console.error("Failed to load project:", error);
      }
    }
  };

  const loadReviewQueue = async () => {
    try {
      const res = await apiFetch(`/api/v1/mentor/client-lab/projects/${params.projectId}/review-queue`, { token });
      const queue = Array.isArray(res) ? res : (res?.data || []);
      setReviewQueue(queue);
    } catch (error) {
      console.error("Failed to load review queue:", error);
      setReviewQueue([]);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackForm.message.trim()) {
      alert("Feedback message is required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch(`/api/v1/mentor/client-lab/projects/${params.projectId}/tasks/${params.taskId}/feedback`, {
        method: "POST",
        token,
        body: {
          rating: feedbackForm.rating,
          message: feedbackForm.message,
        },
      });

      if (res?.ok) {
        await loadReviewQueue();
        navigate(`/lms/mentor/client-lab/projects/${params.projectId}/details`);
        alert("Feedback submitted successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to submit feedback");
    } finally {
      setSaving(false);
    }
  };

  if (view === "projects" || view === "list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:rounded-tl-lg overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Client Lab Projects</h1>

          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse">
                  <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 w-64 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
              <FiBriefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-600">You don't have any client lab projects assigned yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/lms/mentor/client-lab/projects/${project.id}/details`)}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                      <FiBriefcase className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{project.title || "Untitled Project"}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{project.scope || "No description"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
                      <FiEye className="w-4 h-4" />
                      View Details
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

  if (view === "details" && selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:rounded-tl-lg overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedProject.title}</h2>
                <p className="text-slate-600">{selectedProject.scope || "No description"}</p>
              </div>
              <button
                onClick={() => navigate("/lms/mentor/client-lab/projects")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Review Queue</h3>
              <button
                onClick={() => navigate(`/lms/mentor/client-lab/projects/${params.projectId}/tasks`)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <FiEye className="w-5 h-5" />
                View Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "tasks" && params.projectId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:rounded-tl-lg overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate(`/lms/mentor/client-lab/projects/${params.projectId}/details`)}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Tasks Review Queue</h1>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg">
            <div className="space-y-4">
              {reviewQueue.length === 0 ? (
                <div className="text-center py-12">
                  <FiAlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No tasks found</h3>
                  <p className="text-slate-600">No tasks awaiting review for this project</p>
                </div>
              ) : (
                reviewQueue.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-50 rounded-lg p-6 border border-slate-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{task.title || "Task"}</h3>
                        <p className="text-sm text-slate-600 mb-3">{task.description || "No description"}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <FiUsers className="w-4 h-4" />
                            {task.student_name || "Unknown Student"}
                          </div>
                          <div className="flex items-center gap-2">
                            <FiClock className="w-4 h-4" />
                            {task.submitted_at ? new Date(task.submitted_at).toLocaleDateString() : "N/A"}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/lms/mentor/client-lab/projects/${params.projectId}/tasks/${task.id}/review`)}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <FiEye className="w-5 h-5" />
                        Review
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "review" && params.taskId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:rounded-tl-lg overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Task Review</h2>
              <button
                onClick={() => navigate(`/lms/mentor/client-lab/projects/${params.projectId}/tasks`)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={feedbackForm.rating}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                  rows={6}
                  placeholder="Provide feedback..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 mt-8 border-t border-slate-200">
              <button
                onClick={handleSubmitFeedback}
                disabled={saving || !feedbackForm.message.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <ButtonLoading text="Submitting..." size="sm" />
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Submit Feedback
                  </>
                )}
              </button>
              <button
                onClick={() => navigate(`/lms/mentor/client-lab/projects/${params.projectId}/tasks`)}
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
