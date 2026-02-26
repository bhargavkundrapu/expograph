import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import {
  FiBriefcase,
  FiPlus,
  FiX,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiList,
  FiMessageSquare,
  FiArrowLeft,
  FiSend,
} from "react-icons/fi";

const BASE = "/lms/superadmin/client-lab/real-world";

export default function SuperAdminClientLabRealWorld() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [projectDetail, setProjectDetail] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiOffline, setApiOffline] = useState(false);
  const view = location.pathname.includes("/submissions") ? "submissions" : params.id ? "project-detail" : "projects";
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [createProjectForm, setCreateProjectForm] = useState({ title: "", scope: "", status: "active" });
  const [createTaskForm, setCreateTaskForm] = useState({ title: "", description: "", status: "todo" });
  const [assignStudentId, setAssignStudentId] = useState("");
  const [reviewFeedback, setReviewFeedback] = useState({});

  const fetchProjects = useCallback(async () => {
    if (!token) return;
    try {
      setApiOffline(false);
      const res = await apiFetch("/api/v1/client-lab/projects", { token });
      if (res?.ok) setProjects(res.data || []);
    } catch (e) {
      setProjects([]);
      if (e?.message?.includes("Cannot connect")) setApiOffline(true);
    }
  }, [token]);

  const fetchProjectDetail = useCallback(
    async (id) => {
      if (!token || !id) return;
      try {
        const res = await apiFetch(`/api/v1/client-lab/projects/${id}`, { token });
        if (res?.ok) setProjectDetail(res.data);
    } catch (e) {
      setProjectDetail(null);
      if (e?.message?.includes("Cannot connect")) setApiOffline(true);
    }
    },
    [token]
  );

  const fetchSubmissions = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/client-lab/submissions", { token });
      if (res?.ok) setSubmissions(res.data || []);
    } catch (e) {
      setSubmissions([]);
      if (e?.message?.includes("Cannot connect")) setApiOffline(true);
    }
  }, [token]);

  const fetchEligibleStudents = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/client-lab/students-for-assign", { token });
      if (res?.ok) setEligibleStudents(res.data || []);
    } catch (e) {
      setEligibleStudents([]);
      if (e?.message?.includes("Cannot connect")) setApiOffline(true);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([fetchProjects(), fetchSubmissions(), fetchEligibleStudents()]).finally(() =>
      setLoading(false)
    );
  }, [token, fetchProjects, fetchSubmissions, fetchEligibleStudents]);

  useEffect(() => {
    if (params.id && view === "project-detail") {
      fetchProjectDetail(params.id);
    }
  }, [params.id, view, fetchProjectDetail]);

  const handleCreateProject = async () => {
    if (!createProjectForm.title?.trim()) return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/v1/client-lab/projects", {
        method: "POST",
        token,
        body: { title: createProjectForm.title.trim(), scope: createProjectForm.scope || undefined, status: createProjectForm.status },
      });
      if (res?.ok) {
        setShowCreateProject(false);
        setCreateProjectForm({ title: "", scope: "", status: "active" });
        await fetchProjects();
      }
    } catch (e) {
      alert(e?.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateTask = async () => {
    if (!projectDetail || !createTaskForm.title?.trim()) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/projects/${projectDetail.id}/tasks`, {
        method: "POST",
        token,
        body: {
          title: createTaskForm.title.trim(),
          description: createTaskForm.description || undefined,
          status: createTaskForm.status,
        },
      });
      if (res?.ok) {
        setShowCreateTask(false);
        setCreateTaskForm({ title: "", description: "", status: "todo" });
        await fetchProjectDetail(projectDetail.id);
      }
    } catch (e) {
      alert(e?.message || "Failed to create task");
    } finally {
      setSaving(false);
    }
  };

  const handleAssignTask = async (taskId, studentId) => {
    const sid = studentId ?? assignStudentId;
    if (!sid) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/tasks/${taskId}/assign`, {
        method: "POST",
        token,
        body: { student_id: sid },
      });
      if (res?.ok) {
        setAssignStudentId("");
        if (projectDetail) await fetchProjectDetail(projectDetail.id);
      }
    } catch (e) {
      alert(e?.message || "Failed to assign");
    } finally {
      setSaving(false);
    }
  };

  const handleUnassignTask = async (taskId) => {
    try {
      const res = await apiFetch(`/api/v1/client-lab/tasks/${taskId}/unassign`, { method: "POST", token });
      if (res?.ok && projectDetail) await fetchProjectDetail(projectDetail.id);
    } catch (e) {
      alert(e?.message || "Failed to unassign");
    }
  };

  const handleReviewSubmission = async (submissionId, outcome) => {
    const feedback = reviewFeedback[submissionId] ?? "";
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/submissions/${submissionId}/review`, {
        method: "POST",
        token,
        body: { outcome, feedback },
      });
      if (res?.ok) {
        setReviewFeedback((prev) => ({ ...prev, [submissionId]: "" }));
        await fetchSubmissions();
        if (projectDetail) await fetchProjectDetail(projectDetail.id);
      }
    } catch (e) {
      alert(e?.message || "Failed to submit review");
    } finally {
      setSaving(false);
    }
  };

  const openProject = (id) => {
    navigate(`${BASE}/projects/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center lg:rounded-tl-lg overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:rounded-tl-lg overflow-hidden">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {view === "project-detail" && (
              <button
                onClick={() => {
                  setProjectDetail(null);
                  navigate(BASE);
                }}
                className="p-2 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-slate-900">
              {view === "projects" && "Real-World Client Lab"}
              {view === "project-detail" && (projectDetail?.title || "Project")}
              {view === "submissions" && "Submissions Review"}
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(BASE)}
              className={`px-4 py-2 rounded-xl font-medium border border-slate-200 ${view === "projects" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700"}`}
            >
              Projects
            </button>
            <button
              onClick={() => navigate(`${BASE}/submissions`)}
              className={`px-4 py-2 rounded-xl font-medium border border-slate-200 ${view === "submissions" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700"}`}
            >
              Submissions
            </button>
          </div>
        </div>

        {apiOffline && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            API server is not running. Start it with <code className="bg-amber-100 px-1 rounded">cd apps/api && npm run dev</code>
          </div>
        )}

        <AnimatePresence mode="wait">
          {view === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setShowCreateProject(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <FiPlus className="w-4 h-4" /> New Project
                </button>
              </div>
              <div className="grid gap-4">
                {projects.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                    No projects yet. Create one to get started.
                  </div>
                ) : (
                  projects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => openProject(p.id)}
                      className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between hover:border-indigo-300 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <FiBriefcase className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{p.title}</div>
                          <div className="text-sm text-slate-500">{p.status}</div>
                        </div>
                      </div>
                      <FiArrowLeft className="w-5 h-5 rotate-180 text-slate-400" />
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {view === "project-detail" && projectDetail && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setShowCreateTask(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <FiPlus className="w-4 h-4" /> New Task
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-slate-200 font-medium text-slate-700">Tasks</div>
                <ul className="divide-y divide-slate-100">
                  {(projectDetail.tasks || []).map((t) => (
                    <li key={t.id} className="px-4 py-3 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900">{t.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-md ${t.status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                            {t.status}
                          </span>
                          {t.assignment && (
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <FiUser className="w-3 h-3" /> Assigned
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={t.assignment?.student_id ?? ""}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v) handleAssignTask(t.id, v);
                            else handleUnassignTask(t.id);
                          }}
                          className="text-sm border border-slate-300 rounded-lg px-2 py-1"
                        >
                          <option value="">— Assign —</option>
                          {eligibleStudents.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.full_name || s.email}{s.eligible_client_lab ? " ✓ Eligible" : ""}
                            </option>
                          ))}
                        </select>
                        {t.assignment && (
                          <button
                            onClick={() => handleUnassignTask(t.id)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Unassign
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {(!projectDetail.tasks || projectDetail.tasks.length === 0) && (
                  <div className="px-4 py-8 text-center text-slate-500">No tasks yet.</div>
                )}
              </div>
            </motion.div>
          )}

          {view === "submissions" && (
            <motion.div
              key="submissions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {submissions.filter((s) => s.status === "pending").length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                  No pending submissions.
                </div>
              ) : (
                submissions
                  .filter((s) => s.status === "pending")
                  .map((s) => (
                    <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-medium text-slate-900">{s.task_title} — {s.project_title}</div>
                          <div className="text-sm text-slate-500">{s.student_name || s.student_email}</div>
                          {s.pr_link && (
                            <a href={s.pr_link} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline mt-1 block">
                              PR: {s.pr_link}
                            </a>
                          )}
                          {s.notes && <p className="text-sm text-slate-600 mt-1">{s.notes}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder="Feedback (optional)"
                            value={reviewFeedback[s.id] ?? ""}
                            onChange={(e) => setReviewFeedback((prev) => ({ ...prev, [s.id]: e.target.value }))}
                            className="text-sm border border-slate-300 rounded-lg px-2 py-1 w-48"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReviewSubmission(s.id, "approve")}
                              disabled={saving}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                            >
                              <FiCheckCircle className="w-4 h-4" /> Approve
                            </button>
                            <button
                              onClick={() => handleReviewSubmission(s.id, "changes_requested")}
                              disabled={saving}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 disabled:opacity-50"
                            >
                              <FiMessageSquare className="w-4 h-4" /> Request changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Project Modal */}
      <AnimatePresence>
        {showCreateProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateProject(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">New Project</h3>
                <button onClick={() => setShowCreateProject(false)} className="p-1"><FiX className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  value={createProjectForm.title}
                  onChange={(e) => setCreateProjectForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Project title"
                />
                <label className="block text-sm font-medium text-slate-700">Scope (optional)</label>
                <textarea
                  value={createProjectForm.scope}
                  onChange={(e) => setCreateProjectForm((f) => ({ ...f, scope: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  rows={2}
                />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setShowCreateProject(false)} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
                <button onClick={handleCreateProject} disabled={saving || !createProjectForm.title?.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50">
                  {saving ? "Creating…" : "Create"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Task Modal */}
      <AnimatePresence>
        {showCreateTask && projectDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateTask(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">New Task</h3>
                <button onClick={() => setShowCreateTask(false)} className="p-1"><FiX className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  value={createTaskForm.title}
                  onChange={(e) => setCreateTaskForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  placeholder="Task title"
                />
                <label className="block text-sm font-medium text-slate-700">Description (optional)</label>
                <textarea
                  value={createTaskForm.description}
                  onChange={(e) => setCreateTaskForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  rows={2}
                />
                <label className="block text-sm font-medium text-slate-700">Status</label>
                <select
                  value={createTaskForm.status}
                  onChange={(e) => setCreateTaskForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                >
                  <option value="todo">To do</option>
                  <option value="doing">Doing</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setShowCreateTask(false)} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
                <button onClick={handleCreateTask} disabled={saving || !createTaskForm.title?.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50">
                  {saving ? "Creating…" : "Create"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
