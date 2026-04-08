import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
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

function LockedClientLabContent({ isDark, checklist, onRetry }) {
  const hasAccess = checklist?.hasAccess === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur rounded-2xl border-2 shadow-xl p-6 md:p-8 ${isDark ? "bg-slate-800/90 border-slate-700" : "bg-white/90 border-slate-200"}`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${isDark ? "bg-slate-700" : "bg-slate-100"}`}>
        <FiLock className="w-8 h-8 text-slate-500" />
      </div>
      <h1 className={`text-xl md:text-2xl font-bold mb-2 text-center ${isDark ? "text-white" : "text-slate-900"}`}>
        Real Client Lab is locked
      </h1>

      {!checklist && <p className="text-center text-slate-500 text-sm mb-4">Loading…</p>}

      {checklist && !hasAccess && (
        <>
          <p className={`text-center mb-6 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Get the All Pack or all three courses (Vibe Coding, Prompt Engineering, Prompt to Profit) to unlock Real Client Lab.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              to="/courses#pricing"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:brightness-110 transition"
            >
              View All Pack
            </Link>
          </div>
        </>
      )}

      {checklist && hasAccess && (
        <>
          <p className={`text-center mb-4 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Complete every course to 100% to unlock Real Client Lab and access tasks.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-600 mb-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className={`border-b ${isDark ? "border-slate-600 bg-slate-700/50" : "border-slate-200 bg-slate-50"}`}>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium w-28">Purchased</th>
                  <th className="px-4 py-3 font-medium w-28">Completed</th>
                </tr>
              </thead>
              <tbody>
                {checklist.courses.map((c) => (
                  <tr key={c.id} className={`border-b last:border-0 ${isDark ? "border-slate-600" : "border-slate-100"}`}>
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3">
                      {c.purchased ? (
                        <FiCheckCircle className="w-5 h-5 text-emerald-500 inline" aria-label="Purchased" />
                      ) : (
                        <span className={isDark ? "text-slate-400" : "text-slate-500"}>Not purchased</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {c.completedPercent === 100 ? (
                        <FiCheckCircle className="w-5 h-5 text-emerald-500 inline" aria-label="100%" />
                      ) : (
                        <span className={isDark ? "text-slate-400" : "text-slate-600"}>{c.completedPercent}%</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {checklist.eligible && (
            <p className="text-center text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-2">
              All set-Real Client Lab is unlocked. Refreshing…
            </p>
          )}
          {onRetry && (
            <p className="text-center mt-3">
              <button type="button" onClick={onRetry} className="text-sm underline text-slate-500 hover:text-slate-700">
                Refresh progress
              </button>
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}

export default function StudentClientLab() {
  const navigate = useNavigate();
  const { projectId, taskId } = useParams();
  const { token, user } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectDetail, setProjectDetail] = useState(null);
  const [taskDetail, setTaskDetail] = useState(null);
  const [submitForm, setSubmitForm] = useState({ pr_link: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const fetchMe = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/me", { token });
      if (res?.ok) setMe(res.data || null);
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

  const fetchVisibleProjects = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/client-lab/me/projects", { token });
      if (res?.ok) setVisibleProjects(res.data || []);
    } catch (e) {
      setVisibleProjects([]);
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
    if (!user) return;

    // AuthProvider already calls `/api/v1/me` and should include client-lab fields.
    // If present, avoid an extra `/api/v1/me` call for this route.
    const hasClientLabState =
      typeof user?.eligible_client_lab === "boolean" || user?.client_lab_checklist != null;
    if (hasClientLabState) setMe(user);
  }, [user]);

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    const hasClientLabState =
      typeof user?.eligible_client_lab === "boolean" || user?.client_lab_checklist != null;

    if (hasClientLabState) setMe(user);

    Promise.allSettled([
      hasClientLabState ? Promise.resolve() : fetchMe(),
      fetchVisibleProjects(),
      // Fetch assigned items in parallel with me/checklist to reduce overall wait time.
      fetchAssignedProjects(),
      fetchAssignedTasks(),
    ]).finally(() => setLoading(false));
  }, [token, user, fetchMe, fetchVisibleProjects, fetchAssignedProjects, fetchAssignedTasks]);

  /* Always fetch assigned projects/tasks (for students).
   * They return [] when not eligible, so we don't rely on me.eligible_client_lab for the request. */

  const eligible = !!me?.eligible_client_lab;
  const hasAssignments = projects.length > 0;
  const taskCountByProjectId = tasks.reduce((acc, task) => {
    if (!task?.project_id) return acc;
    acc[task.project_id] = (acc[task.project_id] || 0) + 1;
    return acc;
  }, {});
  const showLockedView = !eligible && !hasAssignments;
  // Checklist comes from /api/v1/me (client_lab_checklist); fallback so we never stick on "Loading your progress"
  const rawChecklist = me?.client_lab_checklist;
  const checklist =
    rawChecklist && typeof rawChecklist === "object" && Array.isArray(rawChecklist.courses)
      ? rawChecklist
      : showLockedView
        ? { courses: [], hasAccess: false, allPurchased: false, allCompleted: false, eligible: false }
        : null;

  useEffect(() => {
    if (projectId) fetchProjectDetail(projectId);
    else setProjectDetail(null);
  }, [projectId, fetchProjectDetail]);

  useEffect(() => {
    if (taskId) fetchTaskDetail(taskId);
    else setTaskDetail(null);
  }, [taskId, fetchTaskDetail]);

  useEffect(() => {
    if (checklist?.eligible) fetchMe();
  }, [checklist?.eligible, fetchMe]);

  const handleSubmitTask = async () => {
    if (!taskId || !token) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/me/tasks/${taskId}/submit`, {
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
      setSubmitError(e?.message || "Failed to submit");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <GenericPageSkeleton />;
  }

  // Not eligible and no assignments: full locked screen with checklist (from /api/v1/me)
  if (showLockedView) {
    return (
      <div className={`min-h-screen rounded-t-3xl md:rounded-none p-4 md:p-8 lg:rounded-tl-lg overflow-hidden transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
        <div className="max-w-xl mx-auto">
          <LockedClientLabContent
            isDark={isDark}
            checklist={checklist}
            onRetry={fetchMe}
          />
        </div>
      </div>
    );
  }

  // Task detail: submit form + review status (only if eligible; else show list with banner)
  if (taskId && taskDetail) {
    const latest = taskDetail.latest_submission;
    return (
      <div className={`min-h-screen rounded-t-3xl md:rounded-none p-4 md:p-8 lg:rounded-tl-lg overflow-hidden transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
        <div className="max-w-2xl mx-auto">
          {!eligible && (
            <div className={`mb-4 p-4 border rounded-2xl text-sm ${isDark ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
              Complete all required courses (purchased and 100% each) to submit work. You can view your assigned tasks below.
            </div>
          )}
          <button
            onClick={() => { navigate(projectId ? `/lms/student/client-lab/projects/${projectId}` : "/lms/student/client-lab"); }}
            className={`mb-6 flex items-center gap-2 rounded-lg px-2 py-1 transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}
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
                <p className="text-sm text-slate-500 py-2">Complete all required courses (purchased and 100% each) to unlock submissions.</p>
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
                  {submitError && <p className="text-xs text-red-500 mt-1">{submitError}</p>}
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
      <div className={`min-h-screen rounded-t-3xl md:rounded-none p-4 md:p-8 lg:rounded-tl-lg overflow-hidden transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
        <div className="max-w-2xl mx-auto">
          {!eligible && (
            <div className={`mb-4 p-4 border rounded-2xl text-sm ${isDark ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
              Complete all required courses (purchased and 100% each) to submit work.
            </div>
          )}
          <button
            onClick={() => navigate("/lms/student/client-lab")}
            className={`mb-6 flex items-center gap-2 rounded-lg px-2 py-1 ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}
          >
            <FiArrowLeft className="w-5 h-5" /> Back to Real Client Lab
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
    <div className={`min-h-screen rounded-t-3xl md:rounded-none p-4 md:p-8 lg:rounded-tl-lg overflow-hidden transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
      <div className="max-w-4xl mx-auto">
        {!eligible && hasAssignments && (
          <div className={`mb-6 p-4 border rounded-2xl text-sm flex items-start gap-2 ${isDark ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
            <FiLock className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Complete all required courses (purchased and 100% each) to submit work. Your assigned items are shown below.</span>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Real Client Lab</h1>
          <p className="text-slate-600">Your assigned real-world projects and tasks</p>
        </motion.div>

        {eligible && (
          <div className="mb-5 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-sm rounded-lg transition ${activeTab === "all" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              All Projects
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("yours")}
              className={`px-3 py-1.5 text-sm rounded-lg transition ${activeTab === "yours" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              Your Projects
            </button>
          </div>
        )}

        {(eligible ? (activeTab === "all" ? visibleProjects.length === 0 : projects.length === 0 && tasks.length === 0) : projects.length === 0 && tasks.length === 0) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center"
          >
            <FiFolder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No assignments yet</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Projects and tasks are assigned by your admin from the Real Client Lab. Once you have assignments, they will appear here.
            </p>
          </motion.div>
        ) : eligible && activeTab === "all" ? (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">All Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {visibleProjects.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -3 }}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 transition-all shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                    <FiFolder className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="min-h-[3.5rem]">
                    <h3 className="font-semibold text-slate-900 line-clamp-2">{p.title}</h3>
                    <p className="text-sm text-slate-500 capitalize mt-1">{p.status}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      Client Lab
                    </span>
                    <span className="text-sm font-medium text-slate-500">View in Your Projects</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ) : (
          <div className="space-y-8">
            {projects.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Your Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {projects.map((p) => (
                    <motion.div
                      key={p.id}
                      onClick={() => navigate(`/lms/student/client-lab/projects/${p.id}`)}
                      whileHover={{ y: -3 }}
                      className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 cursor-pointer transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                        <FiFolder className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="min-h-[3.5rem]">
                        <h3 className="font-semibold text-slate-900 line-clamp-2">{p.title}</h3>
                        <p className="text-sm text-slate-500 capitalize mt-1">{p.status}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {taskCountByProjectId[p.id] || 0} task{(taskCountByProjectId[p.id] || 0) === 1 ? "" : "s"}
                        </span>
                        <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">Open</span>
                      </div>
                    </motion.div>
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
