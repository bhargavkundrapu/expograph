import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import { FiBriefcase, FiPlus, FiX, FiArrowLeft, FiSearch, FiTrash2, FiEdit3 } from "react-icons/fi";

const BASE = "/lms/superadmin/client-lab/real-world";
const emptyProjectForm = { title: "", slug: "", scope: "", status: "active", startDate: "", endDate: "" };

export default function SuperAdminClientLabRealWorld() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const view = params.id ? "project-detail" : "projects";

  const [projects, setProjects] = useState([]);
  const [projectDetail, setProjectDetail] = useState(null);
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiOffline, setApiOffline] = useState(false);
  const [includeArchived, setIncludeArchived] = useState(false);

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [createProjectForm, setCreateProjectForm] = useState(emptyProjectForm);
  const [editProjectForm, setEditProjectForm] = useState(emptyProjectForm);

  const [selectedProjectStudents, setSelectedProjectStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");

  const fetchProjects = useCallback(async () => {
    if (!token) return;
    try {
      setApiOffline(false);
      const res = await apiFetch(`/api/v1/client-lab/projects?includeArchived=${includeArchived ? "true" : "false"}`, { token });
      if (res?.ok) setProjects(res.data || []);
    } catch (e) {
      setProjects([]);
      if (e?.message?.includes("Cannot connect")) setApiOffline(true);
    }
  }, [token, includeArchived]);

  const fetchProjectDetail = useCallback(
    async (id) => {
      if (!token || !id) return;
      try {
        const res = await apiFetch(`/api/v1/client-lab/projects/${id}`, { token });
        if (res?.ok) {
          const detail = res.data;
          setProjectDetail(detail);
          setSelectedProjectStudents((detail?.project_assignments || []).map((a) => a.student_id));
          setEditProjectForm({
            title: detail?.title || "",
            slug: detail?.slug || "",
            scope: detail?.scope || "",
            status: detail?.status || "active",
            startDate: detail?.start_date ? String(detail.start_date).slice(0, 10) : "",
            endDate: detail?.end_date ? String(detail.end_date).slice(0, 10) : "",
          });
        }
      } catch (e) {
        setProjectDetail(null);
        if (e?.message?.includes("Cannot connect")) setApiOffline(true);
      }
    },
    [token]
  );

  const fetchEligibleStudents = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/client-lab/eligible-students", { token });
      if (res?.ok) setEligibleStudents(res.data || []);
    } catch (e) {
      setEligibleStudents([]);
      if (e?.message?.includes("Cannot connect")) setApiOffline(true);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([fetchProjects(), fetchEligibleStudents()]).finally(() => setLoading(false));
  }, [token, fetchProjects, fetchEligibleStudents]);

  useEffect(() => {
    if (params.id && view === "project-detail") fetchProjectDetail(params.id);
  }, [params.id, view, fetchProjectDetail]);

  const handleCreateProject = async () => {
    if (!createProjectForm.title?.trim()) return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/v1/client-lab/projects", {
        method: "POST",
        token,
        body: {
          title: createProjectForm.title.trim(),
          slug: createProjectForm.slug?.trim() || undefined,
          scope: createProjectForm.scope?.trim() || undefined,
          status: createProjectForm.status,
          startDate: createProjectForm.startDate || undefined,
          endDate: createProjectForm.endDate || undefined,
        },
      });
      if (res?.ok) {
        setShowCreateProject(false);
        setCreateProjectForm(emptyProjectForm);
        await fetchProjects();
      }
    } catch (e) {
      alert(e?.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!projectDetail?.id || !editProjectForm.title?.trim()) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/projects/${projectDetail.id}`, {
        method: "PATCH",
        token,
        body: {
          title: editProjectForm.title.trim(),
          scope: editProjectForm.scope?.trim() || "",
          status: editProjectForm.status,
          startDate: editProjectForm.startDate || null,
          endDate: editProjectForm.endDate || null,
        },
      });
      if (res?.ok) {
        setShowEditProject(false);
        await Promise.all([fetchProjectDetail(projectDetail.id), fetchProjects()]);
      }
    } catch (e) {
      alert(e?.message || "Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectDetail?.id) return;
    if (!window.confirm(`Delete project "${projectDetail.title}"? This action cannot be undone.`)) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/projects/${projectDetail.id}`, { method: "DELETE", token });
      if (res?.ok) {
        navigate(BASE);
        await fetchProjects();
      }
    } catch (e) {
      alert(e?.message || "Failed to delete project");
    } finally {
      setSaving(false);
    }
  };

  const handleArchiveToggle = async () => {
    if (!projectDetail?.id) return;
    const isArchived = !!projectDetail?.archived_at || projectDetail?.status === "archived";
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/projects/${projectDetail.id}`, {
        method: "PATCH",
        token,
        body: {
          status: isArchived ? "active" : "archived",
          archivedAt: isArchived ? null : new Date().toISOString(),
        },
      });
      if (res?.ok) await Promise.all([fetchProjectDetail(projectDetail.id), fetchProjects()]);
    } catch (e) {
      alert(e?.message || "Failed to update archive state");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProjectAssignments = async () => {
    if (!projectDetail) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/v1/client-lab/projects/${projectDetail.id}/assignments`, {
        method: "PUT",
        token,
        body: { student_ids: selectedProjectStudents },
      });
      if (res?.ok) await fetchProjectDetail(projectDetail.id);
    } catch (e) {
      alert(e?.message || "Failed to save project assignments");
    } finally {
      setSaving(false);
    }
  };

  const filteredStudents = useMemo(() => {
    const q = studentSearch.trim().toLowerCase();
    if (!q) return eligibleStudents;
    return eligibleStudents.filter((s) => `${s.full_name || ""} ${s.email || ""}`.toLowerCase().includes(q));
  }, [eligibleStudents, studentSearch]);

  if (loading) return <GenericPageSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 lg:rounded-tl-lg overflow-hidden">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {view === "project-detail" && (
              <button onClick={() => navigate(BASE)} className="p-2 rounded-xl hover:bg-slate-200 transition-colors">
                <FiArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {view === "projects" ? "Real Client Lab - Projects" : (projectDetail?.title || "Project Details")}
              </h1>
              <p className="text-sm text-slate-500">
                {view === "projects" ? "Create and manage client projects with assignment control." : "Manage project metadata and eligible student assignments."}
              </p>
            </div>
          </div>
          {view === "projects" && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIncludeArchived((v) => !v)}
                className={`px-3 py-2 rounded-lg border text-sm ${includeArchived ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300"}`}
              >
                {includeArchived ? "Showing Archived" : "Show Archived"}
              </button>
              <button
                onClick={() => setShowCreateProject(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                <FiPlus className="w-4 h-4" /> Create Project
              </button>
            </div>
          )}
        </div>

        {apiOffline && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            API server is not running. Start it with <code className="bg-amber-100 px-1 rounded">cd apps/api && npm run dev</code>
          </div>
        )}

        {view === "projects" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 col-span-full">
                No projects yet. Create one to get started.
              </div>
            ) : (
              projects.map((p) => (
                <motion.div
                  key={p.id}
                  onClick={() => navigate(`${BASE}/projects/${p.id}`)}
                  whileHover={{ y: -3 }}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 cursor-pointer transition-all shadow-sm hover:shadow-md"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                    <FiBriefcase className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 capitalize">{p.status}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${p.archived_at ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-indigo-50 text-indigo-700 border-indigo-100"}`}>
                      {p.archived_at ? "Archived" : "Active"}
                    </span>
                    <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">Open</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        ) : projectDetail ? (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 capitalize">{projectDetail.status}</span>
                    {projectDetail.archived_at && <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">Archived</span>}
                  </div>
                  <p className="text-sm text-slate-600">{projectDetail.scope || "No scope provided yet."}</p>
                  <div className="text-xs text-slate-500">
                    <span className="mr-4">Slug: {projectDetail.slug || "-"}</span>
                    <span className="mr-4">Start: {projectDetail.start_date ? String(projectDetail.start_date).slice(0, 10) : "-"}</span>
                    <span>End: {projectDetail.end_date ? String(projectDetail.end_date).slice(0, 10) : "-"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setShowEditProject(true)} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white hover:bg-slate-50">
                    <FiEdit3 className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={handleArchiveToggle} disabled={saving} className="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60">
                    {projectDetail.archived_at || projectDetail.status === "archived" ? "Unarchive" : "Archive"}
                  </button>
                  <button onClick={handleDeleteProject} disabled={saving} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 disabled:opacity-60">
                    <FiTrash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h3 className="font-semibold text-slate-900">Assign Eligible Students</h3>
                <button type="button" onClick={handleSaveProjectAssignments} disabled={saving} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
              <div className="mb-4 relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search eligible students by name or email"
                  className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm"
                />
              </div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => setSelectedProjectStudents(filteredStudents.map((s) => s.id))} className="text-xs px-2.5 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50">
                  Select All Filtered
                </button>
                <button type="button" onClick={() => setSelectedProjectStudents([])} className="text-xs px-2.5 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50">
                  Clear All
                </button>
                <span className="text-xs text-slate-500">{selectedProjectStudents.length} selected</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 max-h-[26rem] overflow-auto pr-1">
                {filteredStudents.map((s) => {
                  const checked = selectedProjectStudents.includes(s.id);
                  return (
                    <label key={s.id} className={`flex items-center justify-between gap-3 border rounded-lg px-3 py-2 text-sm transition ${checked ? "border-indigo-300 bg-indigo-50/40" : "border-slate-200"}`}>
                      <div className="min-w-0">
                        <div className="font-medium text-slate-800 truncate">{s.full_name || "Student"}</div>
                        <div className="text-xs text-slate-500 truncate">{s.email}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          setSelectedProjectStudents((prev) =>
                            e.target.checked ? [...new Set([...prev, s.id])] : prev.filter((id) => id !== s.id)
                          )
                        }
                      />
                    </label>
                  );
                })}
              </div>
              {filteredStudents.length === 0 && <p className="text-sm text-slate-500 py-4 text-center">No eligible students match your search.</p>}
            </div>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {showCreateProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateProject(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Create New Project</h3>
                <button onClick={() => setShowCreateProject(false)} className="p-1"><FiX className="w-5 h-5" /></button>
              </div>
              <ProjectForm form={createProjectForm} setForm={setCreateProjectForm} />
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setShowCreateProject(false)} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
                <button onClick={handleCreateProject} disabled={saving || !createProjectForm.title?.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50">
                  {saving ? "Creating..." : "Create Project"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditProject(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Project</h3>
                <button onClick={() => setShowEditProject(false)} className="p-1"><FiX className="w-5 h-5" /></button>
              </div>
              <ProjectForm form={editProjectForm} setForm={setEditProjectForm} disableSlug />
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setShowEditProject(false)} className="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
                <button onClick={handleUpdateProject} disabled={saving || !editProjectForm.title?.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectForm({ form, setForm, disableSlug = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Project Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
          placeholder="AI Career Readiness Pilot - Batch 2026"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Slug {disableSlug ? "(locked)" : "(optional)"}</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          disabled={disableSlug}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 disabled:bg-slate-50"
          placeholder="career-readiness-pilot-2026"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Scope / Brief</label>
        <textarea
          value={form.scope}
          onChange={(e) => setForm((f) => ({ ...f, scope: e.target.value }))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
          rows={4}
          placeholder="Define objective, delivery expectations, timeline, and success criteria."
        />
      </div>
    </div>
  );
}
