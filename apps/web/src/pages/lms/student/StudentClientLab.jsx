import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import {
  FiFolder,
  FiCheckCircle,
  FiClock,
  FiArrowLeft,
  FiLock,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";

export default function StudentClientLab() {
  const navigate = useNavigate();
  const { projectId, taskId } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectDetail, setProjectDetail] = useState(null);
  const [taskDetail, setTaskDetail] = useState(null);
  const [submitForm, setSubmitForm] = useState({ pr_link: "", notes: "" });
  const [saving, setSaving] = useState(false);

  const fetchMe = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/me", { token });
      if (res?.ok) setMe(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [token]);

  const fetchAssignedProjects = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/client-lab/me/assigned-projects", { token });
      if (res?.ok) setProjects(res.data || []);
    } catch (e) {
      setProjects([]);
    }
  }, [token]);

  const fetchAssignedTasks = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/client-lab/me/assigned-tasks", { token });
      if (res?.ok) setTasks(res.data || []);
    } catch (e) {
      setTasks([]);
    }
  }, [token]);

  const fetchProjectDetail = useCallback(
    async (id) => {
      if (!token || !id) return;
      try {
        const res = await apiFetch(`/api/v1/client-lab/me/projects/${id}`, { token });
        if (res?.ok) setProjectDetail(res.data);
      } catch (e) {
        setProjectDetail(null);
      }
    },
    [token]
  );

  const fetchTaskDetail = useCallback(
    async (id) => {
      if (!token || !id) return;
      try {
        const res = await apiFetch(`/api/v1/client-lab/me/tasks/${id}`, { token });
        if (res?.ok) setTaskDetail(res.data);
      } catch (e) {
        setTaskDetail(null);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchMe().finally(() => setLoading(false));
  }, [token, fetchMe]);

  /* Always fetch assigned projects/tasks when we have me (for students).
   * API returns [] when not eligible, so we don't rely on me.eligible_client_lab for the request.
   * This ensures projects show as soon as the user is eligible and has assignments. */
  useEffect(() => {
    if (!token || !me) return;
    fetchAssignedProjects();
    fetchAssignedTasks();
  }, [token, me, fetchAssignedProjects, fetchAssignedTasks]);

  useEffect(() => {
    if (projectId) fetchProjectDetail(projectId);
    else setProjectDetail(null);
  }, [projectId, fetchProjectDetail]);

  useEffect(() => {
    if (taskId) fetchTaskDetail(taskId);
    else setTaskDetail(null);
  }, [taskId, fetchTaskDetail]);

  const handleSubmitTask = async () => {
    if (!taskId || !token) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/tasks/${taskId}/submit`, {
        method: "POST",
        token,
        body: { pr_link: submitForm.pr_link || undefined, notes: submitForm.notes || undefined },
      });
      if (res?.ok) {
        setSubmitForm({ pr_link: "", notes: "" });
        await fetchTaskDetail(taskId);
        await fetchAssignedTasks();
      }
    } catch (e) {
      alert(e?.message || "Failed to submit");
    } finally {
      setSaving(false);
    }
  };

  const progressPercent = me?.overall_progress_percent ?? 0;
  const eligible = !!me?.eligible_client_lab;
  const hasAssignments = projects.length > 0 || tasks.length > 0;

  if (loading) {
    return <GenericPageSkeleton />;
  }

  // Not eligible and no assignments: full locked screen
  if (!eligible && !hasAssignments) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:rounded-tl-lg overflow-hidden">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur rounded-2xl border-2 border-slate-200 shadow-xl p-8"
          >
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <FiLock className="w-10 h-10 text-slate-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Client Lab is locked</h1>
            <p className="text-slate-600 mb-6">
              Complete at least 75% of your overall progress and finish all required courses to unlock Real-World Client Lab.
            </p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-slate-600 mb-1">
                <span>Your progress</span>
                <span className="font-semibold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-indigo-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Keep learning to unlock client projects and real-world tasks.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Task detail: submit form + review status (only if eligible; else show list with banner)
  if (taskId && taskDetail) {
    const latest = taskDetail.latest_submission;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:rounded-tl-lg overflow-hidden">
        <div className="max-w-2xl mx-auto">
          {!eligible && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm">
              Complete 75% overall progress and all required courses to submit work. You can view your assigned tasks below.
            </div>
          )}
          <button
            onClick={() => { navigate(projectId ? `/lms/student/client-lab/projects/${projectId}` : "/lms/student/client-lab"); }}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 rounded-lg px-2 py-1 hover:bg-slate-100 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" /> Back
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <h1 className="text-xl font-bold text-slate-900 mb-2">{taskDetail.title}</h1>
            {taskDetail.description && <p className="text-slate-600 mb-4">{taskDetail.description}</p>}
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-sm px-2 py-1 rounded-md ${taskDetail.status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                {taskDetail.status}
              </span>
              {latest && (
                <span className={`text-sm px-2 py-1 rounded-md ${
                  latest.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                  latest.status === "changes_requested" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                }`}>
                  Submission: {latest.status}
                </span>
              )}
            </div>
            {latest?.feedback && (
              <div className="mb-4 p-3 bg-slate-50 rounded-lg flex items-start gap-2">
                <FiMessageSquare className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-700">{latest.feedback}</p>
              </div>
            )}
            <div className="border-t border-slate-100 pt-4">
              <h3 className="font-medium text-slate-900 mb-2">Submit work</h3>
              {!eligible ? (
                <p className="text-sm text-slate-500 py-2">Complete 75% progress and all courses to unlock submissions.</p>
              ) : (
                <div className="space-y-3">
                  <input
                    type="url"
                    placeholder="PR or work link (optional)"
                    value={submitForm.pr_link}
                    onChange={(e) => setSubmitForm((f) => ({ ...f, pr_link: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <textarea
                    placeholder="Notes (optional)"
                    value={submitForm.notes}
                    onChange={(e) => setSubmitForm((f) => ({ ...f, notes: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    rows={3}
                  />
                  <button
                    onClick={handleSubmitTask}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <FiSend className="w-4 h-4" /> {saving ? "Submitting…" : "Submit"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Project detail: list tasks for this project
  if (projectId && projectDetail) {
    const projectTasks = projectDetail.tasks || [];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:rounded-tl-lg overflow-hidden">
        <div className="max-w-2xl mx-auto">
          {!eligible && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm">
              Complete 75% progress and all courses to submit work.
            </div>
          )}
          <button
            onClick={() => navigate("/lms/student/client-lab")}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 rounded-lg px-2 py-1 hover:bg-slate-100"
          >
            <FiArrowLeft className="w-5 h-5" /> Back to Client Lab
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6"
          >
            <h1 className="text-xl font-bold text-slate-900 mb-2">{projectDetail.title}</h1>
            {projectDetail.scope && <p className="text-slate-600 text-sm">{projectDetail.scope}</p>}
          </motion.div>
          <div className="space-y-2">
            {projectTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => navigate(`/lms/student/client-lab/projects/${projectId}/tasks/${t.id}`)}
                className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between hover:border-indigo-300 cursor-pointer transition-colors shadow-sm"
              >
                <span className="font-medium text-slate-900">{t.title}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-md ${t.status === "done" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {t.status}
                  </span>
                  {t.submission_status && (
                    <span className="text-xs text-slate-500">{t.submission_status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {projectTasks.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
              No tasks assigned in this project.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: list assigned projects and tasks (LMS portal style)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:rounded-tl-lg overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {!eligible && hasAssignments && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm flex items-start gap-2">
            <FiLock className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Complete 75% overall progress and all required courses to submit work. Your assigned items are shown below.</span>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Client Lab</h1>
          <p className="text-slate-600">Your assigned real-world projects and tasks</p>
        </motion.div>

        {projects.length === 0 && tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center"
          >
            <FiFolder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No assignments yet</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Projects and tasks are assigned by your admin from the Real-World Client Lab. Once you have assignments, they will appear here.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {projects.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Projects</h2>
                <div className="grid gap-3">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => navigate(`/lms/student/client-lab/projects/${p.id}`)}
                      className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between hover:border-indigo-300 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <FiFolder className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{p.title}</div>
                          <div className="text-sm text-slate-500">{p.status}</div>
                        </div>
                      </div>
                      <FiArrowLeft className="w-5 h-5 rotate-180 text-slate-400" />
                    </div>
                  ))}
                </div>
              </section>
            )}
            {tasks.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Assigned tasks</h2>
                <div className="grid gap-3">
                  {tasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => navigate(`/lms/student/client-lab/projects/${t.project_id}/tasks/${t.id}`)}
                      className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between hover:border-indigo-300 cursor-pointer transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        {t.status === "done" ? (
                          <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <FiClock className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                        <div>
                          <div className="font-medium text-slate-900">{t.title}</div>
                          <div className="text-sm text-slate-500">{t.project_title} · {t.status}</div>
                          {t.submission_status && (
                            <div className="text-xs text-slate-500 mt-1">Submission: {t.submission_status}</div>
                          )}
                        </div>
                      </div>
                      <FiArrowLeft className="w-5 h-5 rotate-180 text-slate-400" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
