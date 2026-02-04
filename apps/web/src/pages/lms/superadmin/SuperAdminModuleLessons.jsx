import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { ButtonLoading } from "../../../Components/common/LoadingStates";
import { FiArrowLeft, FiSave, FiX, FiBook, FiFileText } from "react-icons/fi";

const BASE_PATH = "/lms/superadmin/courses";

/**
 * Edit Lesson page – Super Admin LMS.
 * Route: /lms/superadmin/courses/:courseId/modules/:moduleId/lessons/:lessonId/edit
 * Create is handled by SuperAdminCreateLesson.
 */
export default function SuperAdminModuleLessons() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, moduleId, lessonId } = useParams();

  const basePath = location.pathname.includes("/content/") ? "/lms/superadmin/content" : BASE_PATH;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState(null);
  const [module, setModule] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    goal: "",
    video_url: "",
    prompts: { prompts: "", commands: "", error_resolve: "" },
    success_image_url: "",
    pdf_url: "",
  });

  useEffect(() => {
    if (!lessonId || !courseId || !moduleId || !token) {
      if (!lessonId && courseId && moduleId) navigate(`${basePath}/${courseId}/modules/${moduleId}`);
      return;
    }
    fetchCourseAndModule();
  }, [token, courseId, moduleId, lessonId]);

  useEffect(() => {
    if (!lessonId || !token || !courseId || !moduleId) return;
    fetchLesson();
  }, [lessonId, token, courseId, moduleId]);

  const fetchCourseAndModule = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      const tree = res?.data || res || {};
      const courseData = tree.course || tree;
      const modules = tree.modules || [];
      if (courseData) setCourse({ id: courseData.id, title: courseData.title || courseData.name });
      const mod = modules.find((m) => String(m.id) === String(moduleId));
      if (mod) setModule({ id: mod.id, title: mod.title || mod.name });
      if (!lessonId) setLoading(false);
    } catch (e) {
      console.error("Failed to fetch course/module:", e);
      if (!lessonId) setLoading(false);
    }
  };

  const fetchLesson = async () => {
    try {
      if (lessonId) setLoading(true);
      const res = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      const modules = res?.data?.modules || res?.modules || [];
      for (const mod of modules) {
        if (String(mod.id) !== String(moduleId) || !mod.lessons) continue;
        const found = mod.lessons.find((l) => String(l.id) === String(lessonId));
        if (!found) continue;
        setLesson(found);
        let prompts = { prompts: "", commands: "", error_resolve: "" };
        if (found.prompts) {
          try {
            prompts = typeof found.prompts === "string" ? JSON.parse(found.prompts) : found.prompts;
          } catch (_) {}
        }
        setForm({
          title: found.title || "",
          summary: found.summary || "",
          goal: found.goal || "",
          video_url: found.video_url || "",
          prompts,
          success_image_url: found.success_image_url || "",
          pdf_url: found.pdf_url || "",
        });
        break;
      }
    } catch (e) {
      console.error("Failed to fetch lesson:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title?.trim() || !lessonId || !token) {
      alert("Lesson title is required.");
      return;
    }
    setSaving(true);
    try {
      const promptsObj =
        form.prompts?.prompts?.trim() || form.prompts?.commands?.trim() || form.prompts?.error_resolve?.trim()
          ? {
              prompts: form.prompts.prompts?.trim() || undefined,
              commands: form.prompts.commands?.trim() || undefined,
              error_resolve: form.prompts.error_resolve?.trim() || undefined,
            }
          : undefined;
      const body = {
        title: form.title.trim(),
        ...(form.summary != null && { summary: form.summary.trim?.() ?? "" }),
        ...(form.goal != null && { goal: form.goal.trim?.() ?? "" }),
        ...(form.video_url != null && { video_url: form.video_url.trim?.() ?? "" }),
        ...(promptsObj && { prompts: promptsObj }),
        ...(form.success_image_url != null && { success_image_url: form.success_image_url.trim?.() ?? "" }),
        ...(form.pdf_url != null && { pdf_url: form.pdf_url.trim?.() ?? "" }),
      };

      const json = await apiFetch(`/api/v1/admin/lessons/${lessonId}`, { method: "PATCH", token, body });

      if (json && (json.ok === true || json.data?.id)) {
        navigate(`${basePath}/${courseId}/modules/${moduleId}`);
        return;
      }
      alert(json?.error || "Update failed.");
    } catch (err) {
      const payload = err?.payload;
      alert(payload?.error || payload?.details?.fieldErrors?.title?.[0] || err?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(courseId && moduleId ? `${basePath}/${courseId}/modules/${moduleId}` : "/lms/superadmin/courses");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <span className="ml-3 text-slate-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button type="button" onClick={handleCancel} className="p-2 rounded-lg hover:bg-slate-100" title="Back">
            <FiArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
              {course && <><FiBook className="w-4 h-4" /><span>{course.title}</span></>}
              {module && <><span>/</span><FiFileText className="w-4 h-4" /><span>{module.title}</span></>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Edit Lesson</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Lesson Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Lesson title"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Summary (optional)</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              placeholder="Brief summary"
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Goal (optional)</label>
            <textarea
              value={form.goal}
              onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
              placeholder="Learning goal"
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Video URL (optional)</label>
            <input
              type="url"
              value={form.video_url}
              onChange={(e) => setForm((f) => ({ ...f, video_url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Prompts (optional)</h3>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Prompts</label>
              <textarea
                value={form.prompts.prompts}
                onChange={(e) => setForm((f) => ({ ...f, prompts: { ...f.prompts, prompts: e.target.value } }))}
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Commands</label>
              <textarea
                value={form.prompts.commands}
                onChange={(e) => setForm((f) => ({ ...f, prompts: { ...f.prompts, commands: e.target.value } }))}
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Error resolve</label>
              <textarea
                value={form.prompts.error_resolve}
                onChange={(e) => setForm((f) => ({ ...f, prompts: { ...f.prompts, error_resolve: e.target.value } }))}
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm resize-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Success image URL (optional)</label>
            <input
              type="url"
              value={form.success_image_url}
              onChange={(e) => setForm((f) => ({ ...f, success_image_url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">PDF URL (optional)</label>
            <input
              type="url"
              value={form.pdf_url}
              onChange={(e) => setForm((f) => ({ ...f, pdf_url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? <ButtonLoading text="Updating..." size="sm" /> : <><FiSave className="w-5 h-5" /> Update Lesson</>}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 flex items-center gap-2"
            >
              <FiX className="w-5 h-5" /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
