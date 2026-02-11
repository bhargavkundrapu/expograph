import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { ButtonLoading } from "../../../Components/common/LoadingStates";
import { FiArrowLeft, FiSave, FiX, FiBook, FiFileText } from "react-icons/fi";

const MODULE_LESSONS_PATH = "/lms/superadmin/courses";

/**
 * Create Lesson page – Super Admin LMS.
 * Route: /lms/superadmin/courses/:courseId/modules/:moduleId/lessons/create
 * On success, navigates to /lms/superadmin/courses/:courseId/modules/:moduleId
 */
export default function SuperAdminCreateLesson() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState(null);
  const [module, setModule] = useState(null);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    goal: "",
    video_url: "",
    prompts: { prompts: "", commands: "", error_resolve: "" },
    success_image_urls: [],
    learn_setup_steps: [],
    pdf_url: "",
  });

  const backUrl = `${MODULE_LESSONS_PATH}/${courseId}/modules/${moduleId}`;

  useEffect(() => {
    if (!token || !courseId || !moduleId) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
        if (cancelled || !res) return;
        const tree = res.data || res;
        const courseData = tree.course || tree;
        const modules = tree.modules || [];
        if (courseData) {
          setCourse({ id: courseData.id, title: courseData.title || courseData.name });
        }
        const mod = modules.find((m) => String(m.id) === String(moduleId));
        if (mod) setModule({ id: mod.id, title: mod.title || mod.name });
      } catch (e) {
        if (!cancelled) console.error("Failed to load course/module:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [token, courseId, moduleId]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!form.title?.trim()) {
      alert("Lesson title is required.");
      return;
    }
    if (!token) {
      alert("You must be logged in to create a lesson.");
      return;
    }
    if (!moduleId) {
      alert("Module is missing.");
      return;
    }

    setSaving(true);
    try {
      const body = {
        title: form.title.trim(),
        ...(form.summary?.trim() && { summary: form.summary.trim() }),
        ...(form.goal?.trim() && { goal: form.goal.trim() }),
        ...(form.video_url?.trim() && { video_url: form.video_url.trim() }),
        ...(Array.isArray(form.success_image_urls) && form.success_image_urls.filter((u) => u && String(u).trim()).length > 0 && {
          success_image_urls: form.success_image_urls.filter((u) => u && String(u).trim()),
        }),
        ...(Array.isArray(form.learn_setup_steps) && form.learn_setup_steps.filter((s) => s && String(s).trim()).length > 0 && {
          learn_setup_steps: form.learn_setup_steps.filter((s) => s && String(s).trim()),
        }),
        ...(form.pdf_url?.trim() && { pdf_url: form.pdf_url.trim() }),
      };
      const hasPrompts =
        form.prompts?.prompts?.trim() ||
        form.prompts?.commands?.trim() ||
        form.prompts?.error_resolve?.trim();
      if (hasPrompts) {
        body.prompts = {
          prompts: form.prompts.prompts?.trim() || undefined,
          commands: form.prompts.commands?.trim() || undefined,
          error_resolve: form.prompts.error_resolve?.trim() || undefined,
        };
      }

      const json = await apiFetch(`/api/v1/admin/modules/${moduleId}/lessons`, {
        method: "POST",
        token,
        body,
      });

      // Explicit success: API returns { ok: true, data: { id, ... } }
      if (json && json.ok === true && json.data && typeof json.data.id === "string") {
        navigate(backUrl);
        return;
      }

      const errMsg = json?.error || (typeof json?.message === "string" ? json.message : "Create lesson failed.");
      alert(errMsg);
    } catch (err) {
      const msg = err?.message || "Request failed.";
      const payload = err?.payload;
      const userMsg =
        payload?.error ||
        (payload?.details?.fieldErrors?.title?.[0]) ||
        msg;
      alert(userMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(backUrl);
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
          <button
            type="button"
            onClick={handleCancel}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title="Back"
          >
            <FiArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
              {course && <><FiBook className="w-4 h-4" /><span>{course.title}</span></>}
              {module && <><span>/</span><FiFileText className="w-4 h-4" /><span>{module.title}</span></>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Create New Lesson</h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Lesson Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Introduction to React"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Summary (optional)</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              placeholder="Brief summary of the lesson"
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Goal (optional)</label>
            <textarea
              value={form.goal}
              onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
              placeholder="Learning goal"
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Video URL (optional)</label>
            <input
              type="url"
              value={form.video_url}
              onChange={(e) => setForm((f) => ({ ...f, video_url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Prompts (optional)</h3>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Prompts</label>
              <textarea
                value={form.prompts.prompts}
                onChange={(e) => setForm((f) => ({ ...f, prompts: { ...f.prompts, prompts: e.target.value } }))}
                placeholder="Prompts for codebox"
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Commands</label>
              <textarea
                value={form.prompts.commands}
                onChange={(e) => setForm((f) => ({ ...f, prompts: { ...f.prompts, commands: e.target.value } }))}
                placeholder="Commands for codebox"
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Error resolve</label>
              <textarea
                value={form.prompts.error_resolve}
                onChange={(e) => setForm((f) => ({ ...f, prompts: { ...f.prompts, error_resolve: e.target.value } }))}
                placeholder="Error resolve prompts"
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Learn and Setup steps (optional)</label>
            <p className="text-xs text-slate-500 mb-2">Add multiple steps for the "Learn and Setup" section. Students will see Step 0, Step 1, etc.</p>
            <div className="space-y-3">
              {(form.learn_setup_steps || []).map((step, idx) => (
                <div key={idx} className="border border-slate-200 rounded-md p-3 bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-600">Step {idx}</span>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({
                        ...f,
                        learn_setup_steps: (f.learn_setup_steps || []).filter((_, i) => i !== idx),
                      }))}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Remove step"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={step}
                    onChange={(e) => setForm((f) => {
                      const steps = [...(f.learn_setup_steps || [])];
                      steps[idx] = e.target.value;
                      return { ...f, learn_setup_steps: steps };
                    })}
                    placeholder={`Step ${idx} content...`}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none text-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, learn_setup_steps: [...(f.learn_setup_steps || []), ""] }))}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                + Add step
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Success images (optional)</label>
            <p className="text-xs text-slate-500 mb-2">Add multiple image URLs for the "Success looks like" section</p>
            <div className="space-y-2">
              {(form.success_image_urls || []).map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setForm((f) => {
                      const urls = [...(f.success_image_urls || [])];
                      urls[idx] = e.target.value;
                      return { ...f, success_image_urls: urls };
                    })}
                    placeholder="https://..."
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({
                      ...f,
                      success_image_urls: (f.success_image_urls || []).filter((_, i) => i !== idx),
                    }))}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    title="Remove"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, success_image_urls: [...(f.success_image_urls || []), ""] }))}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                + Add image URL
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">PDF URL (optional)</label>
            <input
              type="url"
              value={form.pdf_url}
              onChange={(e) => setForm((f) => ({ ...f, pdf_url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={saving || !form.title.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? <ButtonLoading text="Creating..." size="sm" /> : <><FiSave className="w-5 h-5" /> Create Lesson</>}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 flex items-center gap-2"
            >
              <FiX className="w-5 h-5" /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
