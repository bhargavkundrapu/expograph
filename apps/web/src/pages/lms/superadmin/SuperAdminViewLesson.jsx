import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiTarget,
  FiPlay,
  FiImage,
  FiCode,
  FiCheck,
  FiCopy,
  FiMoreVertical,
} from "react-icons/fi";

export default function SuperAdminViewLesson() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { courseId, moduleId, lessonId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState(null);
  const [module, setModule] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    if (!token || !courseId || !moduleId || !lessonId) return;
    fetchLessonData();
  }, [token, courseId, moduleId, lessonId]);

  const fetchLessonData = async () => {
    try {
      setLoading(true);
      const treeRes = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      if (treeRes?.data) {
        setCourse(treeRes.data.course || treeRes.data);
        const foundModule = treeRes.data.modules?.find(m => String(m.id) === String(moduleId));
        setModule(foundModule);
        const foundLesson = foundModule?.lessons?.find(l => String(l.id) === String(lessonId));
        if (foundLesson) {
          // Parse prompts if it's a string
          if (foundLesson.prompts && typeof foundLesson.prompts === 'string') {
            try {
              foundLesson.prompts = JSON.parse(foundLesson.prompts);
            } catch (e) {
              foundLesson.prompts = null;
            }
          }
          setLesson(foundLesson);
        }
      }
    } catch (error) {
      console.error("Failed to fetch lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/lessons/${lessonId}`, { method: "DELETE", token });
      navigate(`/lms/superadmin/courses/${courseId}/modules/${moduleId}`);
    } catch (error) {
      console.error("Failed to delete lesson:", error);
      alert(error?.message || "Failed to delete lesson");
    } finally {
      setSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/lessons/${lessonId}/status`, {
        method: "PATCH",
        token,
        body: { status },
      });
      fetchLessonData();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert(error?.message || "Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      published: "bg-green-100 text-green-700",
      unpublished: "bg-yellow-100 text-yellow-700",
      draft: "bg-slate-100 text-slate-700",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || statusColors.draft}`}>
        {status?.toUpperCase() || "DRAFT"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-12 border border-slate-200 text-center shadow-sm">
            <FiFileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Lesson not found</h3>
            <button
              onClick={() => navigate(`/lms/superadmin/courses/${courseId}/modules/${moduleId}`)}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/lms/superadmin/courses/${courseId}/modules/${moduleId}`)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Lessons</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-xs uppercase tracking-wider text-slate-500">LESSON VIEW</p>
                {getStatusBadge(lesson.status)}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{lesson.title || "Untitled Lesson"}</h1>
              {course && module && (
                <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                  <span>{course.title}</span>
                  <span>›</span>
                  <span>{module.title}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 flex items-center gap-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    const menu = document.getElementById('status-menu');
                    if (menu) menu.classList.toggle('hidden');
                  }}
                  className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-md hover:bg-slate-700 flex items-center gap-2"
                >
                  <FiMoreVertical className="w-4 h-4" />
                  Status
                </button>
                <div id="status-menu" className="hidden absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-[180px]">
                  {lesson.status === "published" ? (
                    <button
                      onClick={() => {
                        handleStatusChange("unpublished");
                        document.getElementById('status-menu')?.classList.add('hidden');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <FiEyeOff className="w-4 h-4" />
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleStatusChange("published");
                        document.getElementById('status-menu')?.classList.add('hidden');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <FiEye className="w-4 h-4" />
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleStatusChange("draft");
                      document.getElementById('status-menu')?.classList.add('hidden');
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <FiFileText className="w-4 h-4" />
                    Set as Draft
                  </button>
                </div>
              </div>
              <button
                onClick={() => navigate(`/lms/superadmin/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/edit`)}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Goal Section - Appears at top if provided */}
        {lesson.goal && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <FiTarget className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Learning Goal</h3>
                  <p className="text-slate-700 leading-relaxed">{lesson.goal}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Player Section */}
        {lesson.video_url && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FiPlay className="w-5 h-5 text-blue-600" />
              Video Content
            </h3>
            <div className="rounded-lg bg-black overflow-hidden shadow-xl">
              <div className="aspect-video bg-black">
                <video
                  src={lesson.video_url}
                  controls
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}

        {/* Prompts & Commands Codeboxes */}
        {lesson.prompts && (typeof lesson.prompts === 'object' || typeof lesson.prompts === 'string') && (
          <div className="mb-8 space-y-6">
            {(() => {
              let promptsObj = lesson.prompts;
              if (typeof promptsObj === 'string') {
                try {
                  promptsObj = JSON.parse(promptsObj);
                } catch (e) {
                  promptsObj = null;
                }
              }
              if (!promptsObj) return null;
              
              return (
                <>
                  {promptsObj.prompts && (
                    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <FiCode className="w-5 h-5 text-blue-400" />
                          <span className="text-sm font-semibold text-white">Prompts</span>
                        </div>
                        <button
                          onClick={() => handleCopy(promptsObj.prompts, 'prompts')}
                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-sm text-slate-200 transition-colors"
                        >
                          {copiedIndex === 'prompts' ? (
                            <>
                              <FiCheck className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <FiCopy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4">
                        <pre className="text-sm text-slate-200 font-mono whitespace-pre-wrap overflow-x-auto">
                          {promptsObj.prompts}
                        </pre>
                      </div>
                    </div>
                  )}

                  {promptsObj.commands && (
                    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <FiCode className="w-5 h-5 text-purple-400" />
                          <span className="text-sm font-semibold text-white">Commands</span>
                        </div>
                        <button
                          onClick={() => handleCopy(promptsObj.commands, 'commands')}
                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-sm text-slate-200 transition-colors"
                        >
                          {copiedIndex === 'commands' ? (
                            <>
                              <FiCheck className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <FiCopy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4">
                        <pre className="text-sm text-slate-200 font-mono whitespace-pre-wrap overflow-x-auto">
                          {promptsObj.commands}
                        </pre>
                      </div>
                    </div>
                  )}

                  {promptsObj.error_resolve && (
                    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <FiCode className="w-5 h-5 text-red-400" />
                          <span className="text-sm font-semibold text-white">Error Resolve Prompts</span>
                        </div>
                        <button
                          onClick={() => handleCopy(promptsObj.error_resolve, 'error_resolve')}
                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-sm text-slate-200 transition-colors"
                        >
                          {copiedIndex === 'error_resolve' ? (
                            <>
                              <FiCheck className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <FiCopy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4">
                        <pre className="text-sm text-slate-200 font-mono whitespace-pre-wrap overflow-x-auto">
                          {promptsObj.error_resolve}
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Success Image */}
        {lesson.success_image_url && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FiCheck className="w-5 h-5 text-green-600" />
              Success Looks Like This
            </h3>
            <div className="rounded-lg overflow-hidden border border-slate-200 shadow-lg">
              <img
                src={lesson.success_image_url}
                alt="Success example"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'block';
                  }
                }}
              />
              <div className="hidden bg-slate-100 p-8 text-center text-slate-500">
                <p>Image failed to load</p>
              </div>
            </div>
          </div>
        )}

        {/* PDF Presentation */}
        {lesson.pdf_url && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FiFileText className="w-5 h-5 text-blue-600" />
              Presentation
            </h3>
            <div className="rounded-lg overflow-hidden border border-slate-200 shadow-lg bg-white">
              <div className="w-full" style={{ height: '600px' }}>
                <iframe
                  src={`${lesson.pdf_url}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full"
                  title="PDF Presentation"
                  style={{ border: 'none' }}
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <a
                  href={lesson.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                >
                  <FiFileText className="w-4 h-4" />
                  Open PDF in new tab
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {lesson.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Summary</h3>
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <p className="text-slate-700 leading-relaxed">{lesson.summary}</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Delete Lesson</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-700 mb-4">
                Are you sure you want to delete "{lesson.title}"? This action cannot be undone.
              </p>
            </div>
            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? <ButtonLoading text="Deleting..." size="sm" /> : "Delete Lesson"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
