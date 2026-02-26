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
    video_captions: "",
    prompts: { prompts: "", commands: "", error_resolve: "" },
    success_image_urls: [],
    learn_setup_steps: [],
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
          video_captions: found.video_captions || "",
          prompts,
          success_image_urls: Array.isArray(found.success_image_urls)
            ? [...found.success_image_urls]
            : (found.success_image_url ? [found.success_image_url] : []),
          learn_setup_steps: Array.isArray(found.learn_setup_steps)
            ? [...found.learn_setup_steps]
            : (found.summary ? [found.summary] : []),
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
        ...(form.video_captions != null && { video_captions: form.video_captions.trim?.() ?? "" }),
        ...(promptsObj && { prompts: promptsObj }),
        success_image_urls: (Array.isArray(form.success_image_urls) ? form.success_image_urls : []).filter((u) => u && String(u).trim()),
        learn_setup_steps: (Array.isArray(form.learn_setup_steps) ? form.learn_setup_steps : []).filter((s) => s && String(s).trim()),
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
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Video Captions / Subtitles (optional)</label>
            <p className="text-xs text-slate-500 mb-2">Paste the .srt subtitle content here. Students can toggle captions on/off in the video player.</p>
            <textarea
              value={form.video_captions}
              onChange={(e) => setForm((f) => ({ ...f, video_captions: e.target.value }))}
              placeholder={"1\n00:00:00,000 --> 00:00:03,000\nHello, welcome to this lesson.\n\n2\n00:00:03,500 --> 00:00:07,000\nLet's get started."}
              rows={6}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none font-mono text-sm"
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
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
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
