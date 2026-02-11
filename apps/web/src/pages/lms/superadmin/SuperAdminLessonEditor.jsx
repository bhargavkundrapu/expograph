import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiArrowLeft,
  FiSave,
  FiX,
  FiBook,
  FiFileText,
} from "react-icons/fi";

export default function SuperAdminLessonEditor() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, lessonId } = useParams();
  
  const basePath = "/lms/superadmin/content";
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    title: "",
    summary: "",
    goal: "",
    video_url: "",
    prompts: {
      prompts: "",
      commands: "",
      error_resolve: "",
    },
    success_image_urls: [],
    learn_setup_steps: [],
  });

  useEffect(() => {
    if (!token || !courseId || !lessonId) return;
    fetchCourseAndLesson();
  }, [token, courseId, lessonId]);

  const fetchCourseAndLesson = async () => {
    try {
      setLoading(true);
      // Fetch course tree to get course details
      const treeRes = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      if (treeRes?.ok && treeRes?.data) {
        const courseData = treeRes.data.course || treeRes.data;
        if (courseData) {
          setCourse({
            id: courseData.id,
            title: courseData.title || courseData.name,
          });
        }
      }
      
      // Fetch lesson details - get from course tree
      let lessonData = null;
      if (treeRes?.data?.modules) {
        for (const module of treeRes.data.modules) {
          if (module.lessons) {
            const foundLesson = module.lessons.find(l => String(l.id) === String(lessonId));
            if (foundLesson) {
              lessonData = foundLesson;
              break;
            }
          }
        }
      }
      
      if (lessonData) {
        setLesson(lessonData);
        
        // Parse prompts if it's a string
        let prompts = { prompts: "", commands: "", error_resolve: "" };
        if (lessonData.prompts) {
          if (typeof lessonData.prompts === 'string') {
            try {
              prompts = JSON.parse(lessonData.prompts);
            } catch (e) {
              prompts = { prompts: "", commands: "", error_resolve: "" };
            }
          } else {
            prompts = lessonData.prompts;
          }
        }
        
        setLessonForm({
          title: lessonData.title || "",
          summary: lessonData.summary || "",
          goal: lessonData.goal || "",
          video_url: lessonData.video_url || "",
          prompts: prompts,
          success_image_urls: Array.isArray(lessonData.success_image_urls)
            ? [...lessonData.success_image_urls]
            : (lessonData.success_image_url ? [lessonData.success_image_url] : []),
          learn_setup_steps: Array.isArray(lessonData.learn_setup_steps)
            ? [...lessonData.learn_setup_steps]
            : (lessonData.summary ? [lessonData.summary] : []),
        });
      }
    } catch (error) {
      console.error("Failed to fetch course/lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLesson = async () => {
    if (!lessonForm.title || !lessonId) {
      alert("Lesson title is required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch(`/api/v1/admin/lessons/${lessonId}`, {
        method: "PATCH",
        token,
        body: {
          title: lessonForm.title,
          summary: lessonForm.summary || undefined,
          goal: lessonForm.goal || undefined,
          video_url: lessonForm.video_url || undefined,
          prompts: (lessonForm.prompts.prompts || lessonForm.prompts.commands || lessonForm.prompts.error_resolve) 
            ? {
                prompts: lessonForm.prompts.prompts || undefined,
                commands: lessonForm.prompts.commands || undefined,
                error_resolve: lessonForm.prompts.error_resolve || undefined,
              }
            : undefined,
          success_image_urls: (Array.isArray(lessonForm.success_image_urls) ? lessonForm.success_image_urls : []).filter((u) => u && String(u).trim()),
          learn_setup_steps: (Array.isArray(lessonForm.learn_setup_steps) ? lessonForm.learn_setup_steps : []).filter((s) => s && String(s).trim()),
        },
      });

      if (res?.ok && res?.data) {
        // Navigate back to module view
        navigate(`${basePath}/${courseId}`);
      } else {
        throw new Error("Failed to update lesson");
      }
    } catch (error) {
      console.error("Failed to update lesson:", error);
      alert(error?.message || "Failed to update lesson. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (courseId) {
      navigate(`${basePath}/${courseId}`);
    } else {
      navigate("/lms/superadmin/content");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title="Go back"
          >
            <FiArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
              {course && (
                <>
                  <FiBook className="w-4 h-4" />
                  <span>{course.title}</span>
                  {lesson && (
                    <>
                      <span>/</span>
                      <FiFileText className="w-4 h-4" />
                      <span>{lesson.title}</span>
                    </>
                  )}
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Edit Lesson</h1>
          </div>
        </div>

        {/* Edit Lesson Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Lesson Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                placeholder="Enter lesson title (e.g., Introduction to React)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Summary (Optional)
              </label>
              <textarea
                value={lessonForm.summary}
                onChange={(e) => setLessonForm({ ...lessonForm, summary: e.target.value })}
                placeholder="Enter a brief summary of what this lesson covers..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Goal (Optional)
              </label>
              <textarea
                value={lessonForm.goal}
                onChange={(e) => setLessonForm({ ...lessonForm, goal: e.target.value })}
                placeholder="Enter the learning goal for this lesson (will appear at top of lesson page)"
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Video URL (Optional)
              </label>
              <input
                type="url"
                value={lessonForm.video_url}
                onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })}
                placeholder="https://example.com/video.mp4"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Prompts & Commands (Optional)</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prompts
                </label>
                <textarea
                  value={lessonForm.prompts.prompts}
                  onChange={(e) => setLessonForm({ 
                    ...lessonForm, 
                    prompts: { ...lessonForm.prompts, prompts: e.target.value } 
                  })}
                  placeholder="Enter prompts to show in codebox..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Commands
                </label>
                <textarea
                  value={lessonForm.prompts.commands}
                  onChange={(e) => setLessonForm({ 
                    ...lessonForm, 
                    prompts: { ...lessonForm.prompts, commands: e.target.value } 
                  })}
                  placeholder="Enter commands to show in codebox..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Error Resolve Prompts
                </label>
                <textarea
                  value={lessonForm.prompts.error_resolve}
                  onChange={(e) => setLessonForm({ 
                    ...lessonForm, 
                    prompts: { ...lessonForm.prompts, error_resolve: e.target.value } 
                  })}
                  placeholder="Enter error resolve prompts to show in codebox..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Learn and Setup steps (Optional)
              </label>
              <p className="text-xs text-slate-500 mb-2">Add multiple steps for the "Learn and Setup" section. Students will see Step 0, Step 1, etc.</p>
              <div className="space-y-3">
                {(lessonForm.learn_setup_steps || []).map((step, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-md p-3 bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-600">Step {idx}</span>
                      <button
                        type="button"
                        onClick={() => setLessonForm((f) => ({
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
                      onChange={(e) => setLessonForm((f) => {
                        const steps = [...(f.learn_setup_steps || [])];
                        steps[idx] = e.target.value;
                        return { ...f, learn_setup_steps: steps };
                      })}
                      placeholder={`Step ${idx} content...`}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none text-sm"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setLessonForm((f) => ({ ...f, learn_setup_steps: [...(f.learn_setup_steps || []), ""] }))}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  + Add step
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Success images (Optional)
              </label>
              <p className="text-xs text-slate-500 mb-2">Add multiple image URLs for the "Success looks like" section</p>
              <div className="space-y-2">
                {(lessonForm.success_image_urls || []).map((url, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setLessonForm((f) => {
                        const urls = [...(f.success_image_urls || [])];
                        urls[idx] = e.target.value;
                        return { ...f, success_image_urls: urls };
                      })}
                      placeholder="https://example.com/success-image.png"
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setLessonForm((f) => ({
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
                  onClick={() => setLessonForm((f) => ({ ...f, success_image_urls: [...(f.success_image_urls || []), ""] }))}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  + Add image URL
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={handleUpdateLesson}
                disabled={saving || !lessonForm.title.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <ButtonLoading text="Saving..." size="sm" />
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <FiX className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
