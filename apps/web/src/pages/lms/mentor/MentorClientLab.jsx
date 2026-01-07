import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaLaptopCode, 
  FaTasks, 
  FaCheckCircle, 
  FaClock,
  FaUser,
  FaCalendar,
  FaEdit,
  FaArrowLeft
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import Button from "../../../Components/ui/Button";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getStatusBadge(status) {
  const badges = {
    todo: { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-300", label: "To Do" },
    in_progress: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-300", label: "In Progress" },
    review: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-300", label: "Review" },
    completed: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-300", label: "Completed" },
  };
  return badges[status] || badges.todo;
}

export default function MentorClientLab() {
  const { token } = useAuth();
  const { projectId } = useParams();
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    feedback: "",
    status: "review",
  });
  const [submitting, setSubmitting] = useState(false);
  const alive = useRef(true);

  // Check if client lab feature is enabled
  const clientLabEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_CLIENT_LAB);

  // Only show disabled message if flags have loaded AND feature is explicitly disabled
  if (!flagsLoading && !clientLabEnabled) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-8">
          <CardTitle className="text-2xl mb-4">Feature Disabled</CardTitle>
          <CardDescription>Client lab review feature is currently disabled by the administrator.</CardDescription>
        </Card>
      </div>
    );
  }

  async function loadProjects(signal) {
    try {
      // Use LMS endpoint to get projects where mentor is a member
      const json = await apiFetch("/api/v1/lms/client-lab/projects", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setProjects(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load projects:", e);
      if (alive.current) setErr(e?.message || "Failed to load projects");
    }
  }

  async function loadReviewQueue(signal) {
    if (!projectId) {
      // Load projects list instead
      await loadProjects(signal);
      return;
    }

    try {
      const json = await apiFetch(`/api/v1/mentor/client-lab/projects/${projectId}/review-queue`, { token, signal });
      const data = unwrapData(json);
      if (alive.current) {
        setTasks(data.tasks || []);
        setProject(data.project || null);
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load review queue:", e);
      if (alive.current) setErr(e?.message || "Failed to load review queue");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function submitFeedback(taskId) {
    if (!feedbackForm.feedback.trim()) {
      alert("Please provide feedback");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch(`/api/v1/mentor/client-lab/tasks/${taskId}/feedback`, {
        method: "POST",
        token,
        body: {
          feedback: feedbackForm.feedback,
          status: feedbackForm.status,
        },
      });
      
      alert("Feedback submitted successfully!");
      setSelectedTask(null);
      setFeedbackForm({ feedback: "", status: "review" });
      
      const ac = new AbortController();
      await loadReviewQueue(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    setLoading(true);
    loadReviewQueue(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token, projectId]);

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
        title="Failed to Load Review Queue" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadReviewQueue(ac.signal);
        }} 
      />
    );
  }

  if (!projectId) {
    // Show project list
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
          title="Failed to Load Projects" 
          message={err} 
          onRetry={() => {
            const ac = new AbortController();
            loadProjects(ac.signal);
          }} 
        />
      );
    }

    return (
      <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
        <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
          <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
          <div className="position-relative" style={{ zIndex: 10 }}>
            <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg shadow-pink-500/30">
                <FaLaptopCode className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Client Lab Review</h1>
                <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Select a project to review tasks</p>
              </div>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="No Projects Available"
            message="You are not assigned to any client lab projects yet. Contact your administrator to be added to a project."
          />
        ) : (
          <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
            {projects.map((proj, idx) => (
              <Link key={proj.id} to={`/lms/mentor/client-lab/${proj.id}`}>
                <Card
                  variant="elevated"
                  className="p-6 group hover:scale-105 transition-transform duration-300 animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                >
                  <div className="layout-flex items-center gap-md mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-pink-400/20 to-rose-500/20 border border-pink-400/30">
                      <FaLaptopCode className="text-pink-400 text-xl" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <CardTitle className="text-xl mb-2">{proj.name || proj.title || "Untitled Project"}</CardTitle>
                      {proj.client_name && (
                        <div className="text-sm text-gray-400">Client: {proj.client_name}</div>
                      )}
                    </div>
                    <FaArrowLeft className="text-gray-400 text-xl group-hover:text-white group-hover:-translate-x-2 transition-all duration-300 rotate-180" />
                  </div>
                  {proj.description && (
                    <CardDescription className="line-clamp-2">{proj.description}</CardDescription>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const pendingTasks = tasks.filter(t => t.status === "review" || t.status === "in_progress");
  const completedTasks = tasks.filter(t => t.status === "completed");

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg shadow-pink-500/30">
              <FaLaptopCode className="text-white text-2xl" />
            </div>
            <div style={{ flex: 1 }}>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Client Lab Review</h1>
              {project && (
                <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Review tasks for: {project.name || project.title}</p>
              )}
            </div>
          </div>
          <div className="layout-flex gap-md">
            <div className="px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{pendingTasks.length}</div>
              <div className="text-sm text-gray-400">Pending Review</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-2xl font-bold text-emerald-400">{completedTasks.length}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-500/10 border border-gray-500/30">
              <div className="text-2xl font-bold text-gray-400">{tasks.length}</div>
              <div className="text-sm text-gray-400">Total Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="layout-flex-col gap-md">
          <h2 className="section-title text-2xl text-white">Pending Review ({pendingTasks.length})</h2>
          <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
            {pendingTasks.map((task, idx) => {
              const statusBadge = getStatusBadge(task.status);
              return (
                <Card
                  key={task.id}
                  variant="elevated"
                  className="animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
                >
                  <div className="layout-flex items-start justify-between gap-md">
                    <div style={{ flex: 1 }}>
                      <div className="layout-flex items-center gap-md mb-4">
                        <div className={`p-2 rounded-lg ${statusBadge.bg} border ${statusBadge.border}`}>
                          <FaTasks className={statusBadge.text} />
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ margin: 0 }}>{task.title || "Untitled Task"}</CardTitle>
                          <div className="layout-flex items-center gap-4 text-xs text-gray-400 mt-1">
                            <div className="layout-flex items-center gap-1">
                              <FaUser className="text-xs" />
                              <span>Student: {task.student_email || task.user_email || "—"}</span>
                            </div>
                            {task.due_date && (
                              <div className="layout-flex items-center gap-1">
                                <FaCalendar className="text-xs" />
                                <span>Due: {formatDate(task.due_date)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {task.description && (
                        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 mb-4">
                          <div className="text-sm font-semibold text-gray-300 mb-2">Task Description:</div>
                          <div className="text-sm text-gray-400 whitespace-pre-wrap">{task.description}</div>
                        </div>
                      )}

                      {task.submission_content && (
                        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 mb-4">
                          <div className="text-sm font-semibold text-gray-300 mb-2">Student Submission:</div>
                          <div className="text-sm text-gray-400 whitespace-pre-wrap">{task.submission_content}</div>
                        </div>
                      )}

                      {task.mentor_feedback && (
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-4">
                          <div className="text-xs text-blue-300 mb-1">Previous Feedback:</div>
                          <div className="text-sm text-gray-300">{task.mentor_feedback}</div>
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
                        onClick={() => setSelectedTask(task)}
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

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="layout-flex-col gap-md">
          <h2 className="section-title text-2xl text-white">Completed ({completedTasks.length})</h2>
          <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
            {completedTasks.map((task, idx) => {
              const statusBadge = getStatusBadge(task.status);
              return (
                <Card
                  key={task.id}
                  variant="elevated"
                  className="animate-fadeIn opacity-75"
                  style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
                >
                  <div className="layout-flex items-start justify-between gap-md">
                    <div style={{ flex: 1 }}>
                      <div className="layout-flex items-center gap-md mb-2">
                        <div className={`p-2 rounded-lg ${statusBadge.bg} border ${statusBadge.border}`}>
                          <FaCheckCircle className={statusBadge.text} />
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ margin: 0 }}>{task.title || "Untitled Task"}</CardTitle>
                          <div className="text-xs text-gray-400 mt-1">
                            Student: {task.student_email || task.user_email || "—"} | {formatDate(task.completed_at || task.updated_at)}
                          </div>
                        </div>
                      </div>
                      {task.mentor_feedback && (
                        <div className="text-sm text-gray-400 ml-11">
                          Feedback: {task.mentor_feedback.substring(0, 100)}...
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

      {tasks.length === 0 && (
        <EmptyState
          title="No Tasks to Review"
          message="There are currently no tasks in the review queue for this project."
        />
      )}

      {/* Feedback Modal */}
      {selectedTask && (
        <div className="position-fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTask(null)}>
          <Card
            variant="elevated"
            className="p-8 max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle className="text-2xl mb-4">Provide Feedback</CardTitle>
            <CardDescription className="mb-6">
              {selectedTask.title || "Task"}
            </CardDescription>

            <div className="layout-flex-col gap-md mb-6">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Feedback *</label>
                <textarea
                  value={feedbackForm.feedback}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback: e.target.value })}
                  className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-pink-400"
                  rows={6}
                  placeholder="Provide detailed feedback..."
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Status *</label>
                <select
                  value={feedbackForm.status}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, status: e.target.value })}
                  className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-pink-400"
                >
                  <option value="review">Needs Review</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="layout-flex flex-col sm:flex-row gap-3 sm:gap-md items-stretch sm:items-center">
              <Button
                variant="gradient"
                size="md"
                onClick={() => submitFeedback(selectedTask.id)}
                disabled={submitting || !feedbackForm.feedback.trim()}
                fullWidth
                className="sm:w-auto"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedTask(null);
                  setFeedbackForm({ feedback: "", status: "review" });
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

