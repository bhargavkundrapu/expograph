import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiBook,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiChevronRight,
  FiChevronDown,
  FiVideo,
  FiFileText,
  FiCode,
  FiHelpCircle,
  FiImage,
  FiPlay,
  FiCheck,
  FiArrowLeft,
} from "react-icons/fi";

export default function SuperAdminCourses() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  // Determine view from route
  const getViewFromPath = () => {
    const path = location.pathname;
    const { courseId, moduleId, lessonId } = params;
    
    if (lessonId) {
      if (path.includes("/edit")) return "lesson-edit";
      return "lesson";
    }
    if (moduleId) return "module";
    if (courseId) return "course";
    if (path.includes("/create")) return "create";
    if (path.includes("/list")) return "list";
    if (path.includes("/cards")) return "cards";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [saving, setSaving] = useState(false);

  // Form states
  const [courseForm, setCourseForm] = useState({ title: "", description: "", level: "" });
  const [moduleForm, setModuleForm] = useState({ title: "" });
  const [lessonForm, setLessonForm] = useState({ title: "", summary: "" });
  const [lessonDetails, setLessonDetails] = useState({
    videoProvider: "",
    videoId: "",
    videoUrl: "",
    lessonContent: "",
    cheatsheets: [],
    practices: [],
    mcqs: [],
    slides: [],
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/courses", { token });
      
      // Handle both response formats: { ok: true, data: [...] } or direct array
      if (res?.ok && res?.data) {
        setCourses(Array.isArray(res.data) ? res.data : []);
      } else if (Array.isArray(res)) {
        setCourses(res);
      } else {
        setCourses([]);
      }
    } catch (error) {
      // Don't show alert for permission errors, just log
      if (error?.status !== 403) {
        console.error("Failed to fetch courses:", error);
      }
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses
  useEffect(() => {
    if (!token) return;
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Filter courses
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  // Load course/module/lesson data when route params change
  useEffect(() => {
    if (!token || !params.courseId || courses.length === 0) return;

    const loadCourseData = async () => {
      const course = courses.find((c) => String(c.id) === String(params.courseId));
      if (!course) return;

      if (params.moduleId) {
        // Loading module view
        const tree = await fetchCourseTree(course.id);
        if (tree) {
          const module = tree.modules?.find((m) => String(m.id) === String(params.moduleId));
          if (module) {
            const moduleLessons = tree.lessons?.filter((l) => String(l.module_id) === String(params.moduleId)) || [];
            setSelectedCourse({ ...course, modules: tree.modules || [], lessons: tree.lessons || [] });
            setSelectedModule({ ...module, lessons: moduleLessons });
            
            if (params.lessonId) {
              // Loading lesson view
              const lesson = moduleLessons.find((l) => String(l.id) === String(params.lessonId));
              if (lesson) {
                await openLesson(lesson);
              }
            }
          }
        }
      } else if (view === "course" || view === "create") {
        // Just course view - load course tree
        const tree = await fetchCourseTree(course.id);
        if (tree) {
          setSelectedCourse({ ...course, modules: tree.modules || [], lessons: tree.lessons || [] });
        }
      }
    };

    loadCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.courseId, params.moduleId, params.lessonId, courses.length, view, token]);

  const fetchCourseTree = async (courseId) => {
    try {
      const res = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      if (res?.ok) {
        return res.data;
      }
    } catch (error) {
      console.error("Failed to fetch course tree:", error);
    }
    return null;
  };

  const handleCreateCourse = async () => {
    if (!courseForm.title) {
      alert("Course title is required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch("/api/v1/admin/courses", {
        method: "POST",
        token,
        body: courseForm,
      });

      if (res?.ok) {
        await fetchCourses();
        navigate("/lms/superadmin/courses/list");
        setCourseForm({ title: "", description: "", level: "" });
      }
    } catch (error) {
      alert(error?.message || "Failed to create course");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateModule = async () => {
    if (!moduleForm.title || !selectedCourse) {
      alert("Module title is required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch(`/api/v1/admin/courses/${selectedCourse.id}/modules`, {
        method: "POST",
        token,
        body: moduleForm,
      });

      if (res?.ok) {
        const tree = await fetchCourseTree(selectedCourse.id);
        if (tree) {
          setSelectedCourse({ ...selectedCourse, modules: tree.modules, lessons: tree.lessons });
        }
        setModuleForm({ title: "" });
      }
    } catch (error) {
      alert(error?.message || "Failed to create module");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateLesson = async () => {
    if (!lessonForm.title || !selectedModule) {
      alert("Lesson title is required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch(`/api/v1/admin/modules/${selectedModule.id}/lessons`, {
        method: "POST",
        token,
        body: lessonForm,
      });

      if (res?.ok) {
        const tree = await fetchCourseTree(selectedCourse.id);
        if (tree) {
          setSelectedCourse({ ...selectedCourse, modules: tree.modules, lessons: tree.lessons });
        }
        setLessonForm({ title: "", summary: "" });
        navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${module.id}`);
      }
    } catch (error) {
      alert(error?.message || "Failed to create lesson");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLessonDetails = async () => {
    if (!selectedLesson) return;

    try {
      setSaving(true);
      // Update lesson basic info
      await apiFetch(`/api/v1/admin/lessons/${selectedLesson.id}`, {
        method: "PATCH",
        token,
        body: {
          title: lessonForm.title,
          summary: lessonForm.summary,
          video_provider: lessonDetails.videoProvider || null,
          video_id: lessonDetails.videoId || null,
        },
      });

      alert("Lesson details saved successfully!");
    } catch (error) {
      alert(error?.message || "Failed to save lesson details");
    } finally {
      setSaving(false);
    }
  };

  const openCourse = async (course) => {
    const tree = await fetchCourseTree(course.id);
    if (tree) {
      setSelectedCourse({ ...course, modules: tree.modules || [], lessons: tree.lessons || [] });
      navigate(`/lms/superadmin/courses/${course.id}`);
    }
  };

  const openModule = (module) => {
    const moduleLessons = selectedCourse?.lessons?.filter((l) => l.module_id === module.id) || [];
    setSelectedModule({ ...module, lessons: moduleLessons });
    navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${module.id}`);
  };

  const openLesson = async (lesson) => {
    try {
      setLoading(true);
      // Ensure we have the module context - if not, find it from the course
      if (!selectedModule && selectedCourse) {
        const module = selectedCourse.modules?.find(m => m.id === lesson.module_id);
        if (module) {
          const moduleLessons = selectedCourse?.lessons?.filter((l) => l.module_id === module.id) || [];
          setSelectedModule({ ...module, lessons: moduleLessons });
        }
      }

      // Fetch lesson details including resources, practice, mcqs, slides
      // Gracefully handle errors (e.g., if tables don't exist yet)
      const [resourcesRes, practiceRes, mcqsRes, slidesRes] = await Promise.all([
        apiFetch(`/api/v1/admin/lessons/${lesson.id}/resources`, { token }).catch(() => {
          return { ok: false, data: [] };
        }),
        apiFetch(`/api/v1/admin/lessons/${lesson.id}/practice`, { token }).catch(() => {
          return { ok: false, data: [] };
        }),
        apiFetch(`/api/v1/admin/lessons/${lesson.id}/mcqs`, { token }).catch(() => {
          return { ok: false, data: [] };
        }),
        apiFetch(`/api/v1/admin/lessons/${lesson.id}/slides`, { token }).catch(() => {
          return { ok: false, data: [] };
        }),
      ]);

      setSelectedLesson(lesson);
      setLessonForm({ title: lesson.title || "", summary: lesson.summary || "" });
      setLessonDetails({
        videoProvider: lesson.video_provider || "",
        videoId: lesson.video_id || "",
        videoUrl: "",
        lessonContent: lesson.summary || "",
        cheatsheets: resourcesRes?.ok ? resourcesRes.data.filter((r) => r.type === "cheatsheet") : [],
        practices: practiceRes?.ok ? practiceRes.data : [],
        mcqs: mcqsRes?.ok ? mcqsRes.data : [],
        slides: slidesRes?.ok ? slidesRes.data : [],
      });
      navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${selectedModule?.id || lesson.module_id}/lessons/${lesson.id}`);
    } catch (error) {
      // Silently handle errors - they're already caught in Promise.all
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleDeleteCourse = async (courseId, e) => {
    e?.stopPropagation();
    if (!confirm("Are you sure you want to delete this course? This will also delete all modules and lessons.")) {
      return;
    }

    try {
      await apiFetch(`/api/v1/admin/courses/${courseId}`, { method: "DELETE", token });
      await fetchCourses();
      if (selectedCourse?.id === courseId) {
        navigate("/lms/superadmin/courses/list");
        setSelectedCourse(null);
      }
    } catch (error) {
      alert(error?.message || "Failed to delete course");
    }
  };

  const handleDeleteModule = async (moduleId, e) => {
    e?.stopPropagation();
    if (!confirm("Are you sure you want to delete this module? This will also delete all lessons in this module.")) {
      return;
    }

    try {
      await apiFetch(`/api/v1/admin/modules/${moduleId}`, { method: "DELETE", token });
      const tree = await fetchCourseTree(selectedCourse.id);
      if (tree) {
        setSelectedCourse({ ...selectedCourse, modules: tree.modules || [], lessons: tree.lessons || [] });
      }
      if (selectedModule?.id === moduleId) {
        navigate(`/lms/superadmin/courses/${selectedCourse.id}`);
        setSelectedModule(null);
      }
    } catch (error) {
      alert(error?.message || "Failed to delete module");
    }
  };

  const handleDeleteLesson = async (lessonId, e) => {
    e?.stopPropagation();
    if (!confirm("Are you sure you want to delete this lesson? This will also delete all resources, practice tasks, MCQs, and slides.")) {
      return;
    }

    try {
      await apiFetch(`/api/v1/admin/lessons/${lessonId}`, { method: "DELETE", token });
      const tree = await fetchCourseTree(selectedCourse.id);
      if (tree) {
        setSelectedCourse({ ...selectedCourse, modules: tree.modules || [], lessons: tree.lessons || [] });
        const moduleLessons = tree.lessons?.filter((l) => l.module_id === selectedModule.id) || [];
        setSelectedModule({ ...selectedModule, lessons: moduleLessons });
      }
      if (selectedLesson?.id === lessonId) {
        navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${module.id}`);
        setSelectedLesson(null);
      }
    } catch (error) {
      alert(error?.message || "Failed to delete lesson");
    }
  };

  // Cards View
  if (view === "cards") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
          >
            Courses Management
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All Courses Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/superadmin/courses/list")}
              className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiBook className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : courses.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Courses</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Courses</h3>
              <p className="text-slate-600">View and manage all courses, modules, and lessons</p>
            </motion.div>

            {/* Create Course Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setCourseForm({ title: "", description: "", level: "" });
                navigate("/lms/superadmin/courses/create");
              }}
              className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiPlus className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Create Course</h3>
              <p className="text-slate-600">Create a new course and start building your curriculum</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  if (view === "list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate("/lms/superadmin/courses")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                All Courses ({filteredCourses.length})
              </h1>
            </div>
            <button
              onClick={() => {
                setCourseForm({ title: "", description: "", level: "" });
                navigate("/lms/superadmin/courses/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Create Course
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-md p-6 border border-slate-200 animate-pulse">
                  <div className="h-12 w-12 bg-slate-200 rounded-md mb-4"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
              <FiBook className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "Get started by creating your first course"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => openCourse(course)}
                  className="bg-white rounded-md p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      <FiBook className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate">{course.title}</h3>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{course.description || "No description"}</p>
                      {course.level && (
                        <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded">
                          {course.level}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        course.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {course.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleDeleteCourse(course.id, e)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete course"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                      <FiChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Create Course View
  if (view === "create") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New Course</h2>
              <button
                onClick={() => navigate("/lms/superadmin/courses/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="Enter course title"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Enter course description"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Level</label>
                <select
                  value={courseForm.level}
                  onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleCreateCourse}
                  disabled={saving || !courseForm.title}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Creating..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Create Course
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/courses/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Course View (shows modules)
  if (view === "course" && selectedCourse) {
    const modules = selectedCourse.modules || [];
    const lessons = selectedCourse.lessons || [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/lms/superadmin/courses/list")}
              className="text-slate-600 hover:text-slate-900 mb-4 flex items-center gap-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Courses</span>
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{selectedCourse.title}</h1>
                <p className="text-slate-600 mt-2">{selectedCourse.description || "No description"}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDeleteCourse(selectedCourse.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-md hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete Course
                </button>
                <button
                  onClick={() => {
                    setModuleForm({ title: "" });
                    navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/create`);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <FiPlus className="w-5 h-5" />
                  Add Module
                </button>
              </div>
            </div>
          </div>

          {/* Modules List */}
          {modules.length === 0 ? (
            <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
              <FiBook className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No modules yet</h3>
              <p className="text-slate-600 mb-4">Create your first module to start building the course</p>
              <button
                onClick={() => {
                  setModuleForm({ title: "" });
                    navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/create`);
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md"
              >
                Create Module
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map((module) => {
                const moduleLessons = lessons.filter((l) => l.module_id === module.id);
                const isExpanded = expandedModules.has(module.id);

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden"
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {isExpanded ? (
                            <FiChevronDown className="w-5 h-5 text-slate-400" />
                          ) : (
                            <FiChevronRight className="w-5 h-5 text-slate-400" />
                          )}
                          <h3 className="text-lg font-bold text-slate-900">{module.title}</h3>
                          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded">
                            {moduleLessons.length} lessons
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModule(module);
                            }}
                            className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                          >
                            <FiEye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteModule(module.id, e);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete module"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 border-t border-slate-100">
                            {moduleLessons.length === 0 ? (
                              <div className="py-8 text-center text-slate-500">
                                No lessons in this module
                              </div>
                            ) : (
                              <div className="space-y-2 pt-4">
                                {moduleLessons.map((lesson) => (
                                  <div
                                    key={lesson.id}
                                    onClick={() => openLesson(lesson)}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <FiPlay className="w-4 h-4 text-slate-400" />
                                      <span className="text-sm font-medium text-slate-900">{lesson.title}</span>
                                    </div>
                                    <FiChevronRight className="w-4 h-4 text-slate-400" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Create Module View
  if (view === "create-module" && selectedCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <button
                  onClick={() => navigate(`/lms/superadmin/courses/${selectedCourse.id}`)}
                  className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <h2 className="text-2xl font-bold text-slate-900">Create Module</h2>
                <p className="text-slate-600 mt-1">Course: {selectedCourse.title}</p>
              </div>
              <button
                onClick={() => navigate(`/lms/superadmin/courses/${selectedCourse.id}`)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Module Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                  placeholder="Enter module title"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleCreateModule}
                  disabled={saving || !moduleForm.title}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Creating..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Create Module
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate(`/lms/superadmin/courses/${selectedCourse.id}`)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Module View (shows lessons)
  if (view === "module" && selectedModule && selectedCourse) {
    const moduleLessons = selectedModule.lessons || [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(`/lms/superadmin/courses/${selectedCourse.id}`)}
              className="text-slate-600 hover:text-slate-900 mb-4 flex items-center gap-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Course</span>
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{selectedModule.title}</h1>
                <p className="text-slate-600 mt-2">Course: {selectedCourse.title}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDeleteModule(selectedModule.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-md hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete Module
                </button>
                <button
                  onClick={() => {
                    setLessonForm({ title: "", summary: "" });
                    navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${selectedModule.id}/lessons/create`);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <FiPlus className="w-5 h-5" />
                  Add Lesson
                </button>
              </div>
            </div>
          </div>

          {/* Lessons List */}
          {moduleLessons.length === 0 ? (
            <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
              <FiPlay className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No lessons yet</h3>
              <p className="text-slate-600 mb-4">Create your first lesson for this module</p>
              <button
                onClick={() => {
                  setLessonForm({ title: "", summary: "" });
                  navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${selectedModule.id}/lessons/create`);
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md"
              >
                Create Lesson
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moduleLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => openLesson(lesson)}
                  className="bg-white rounded-md p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white flex-shrink-0">
                      <FiPlay className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate">{lesson.title}</h3>
                      {lesson.summary && (
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{lesson.summary}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        lesson.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {lesson.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleDeleteLesson(lesson.id, e)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete lesson"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                      <FiChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Create Lesson View
  if (view === "create-lesson" && selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <button
                  onClick={() => navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${selectedModule.id}`)}
                  className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <h2 className="text-2xl font-bold text-slate-900">Create Lesson</h2>
                <p className="text-slate-600 mt-1">Module: {selectedModule.title}</p>
              </div>
              <button
                onClick={() => navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${selectedModule.id}`)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Lesson Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  placeholder="Enter lesson title"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Summary</label>
                <textarea
                  value={lessonForm.summary}
                  onChange={(e) => setLessonForm({ ...lessonForm, summary: e.target.value })}
                  placeholder="Enter lesson summary"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleCreateLesson}
                  disabled={saving || !lessonForm.title}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Creating..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Create Lesson
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${selectedModule.id}`)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Lesson Editor View (comprehensive)
  if (view === "lesson" && selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={async () => {
                if (selectedModule && selectedCourse) {
                  // Refresh the course tree to get latest data
                  const tree = await fetchCourseTree(selectedCourse.id);
                  if (tree) {
                    const updatedCourse = { ...selectedCourse, modules: tree.modules || [], lessons: tree.lessons || [] };
                    setSelectedCourse(updatedCourse);
                    
                    // Find the module and restore it with lessons
                    const module = tree.modules?.find(m => m.id === selectedModule.id);
                    if (module) {
                      const moduleLessons = tree.lessons?.filter((l) => l.module_id === module.id) || [];
                      setSelectedModule({ ...module, lessons: moduleLessons });
                    }
                  }
                  navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${module.id}`);
                } else if (selectedCourse && selectedLesson) {
                  // If module context is lost, find it from the lesson's module_id
                  const tree = await fetchCourseTree(selectedCourse.id);
                  if (tree) {
                    const module = tree.modules?.find(m => m.id === selectedLesson.module_id);
                    if (module) {
                      const moduleLessons = tree.lessons?.filter((l) => l.module_id === module.id) || [];
                      setSelectedModule({ ...module, lessons: moduleLessons });
                      setSelectedCourse({ ...selectedCourse, modules: tree.modules || [], lessons: tree.lessons || [] });
                      navigate(`/lms/superadmin/courses/${selectedCourse.id}/modules/${module.id}`);
                    } else {
                      navigate(`/lms/superadmin/courses/${selectedCourse.id}`);
                    }
                  } else {
                    navigate(`/lms/superadmin/courses/${selectedCourse.id}`);
                  }
                } else {
                  navigate(`/lms/superadmin/courses/${selectedCourse.id}`);
                }
              }}
              className="text-slate-600 hover:text-slate-900 mb-4 flex items-center gap-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Module</span>
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{selectedLesson.title}</h1>
                <p className="text-slate-600 mt-2">{selectedLesson.summary || "No summary"}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDeleteLesson(selectedLesson.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-md hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete Lesson
                </button>
                <button
                  onClick={handleSaveLessonDetails}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Saving..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Save All Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Details Tabs */}
          <div className="bg-white rounded-md border border-slate-200 shadow-lg overflow-hidden">
            {/* Basic Info */}
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiFileText className="w-5 h-5" />
                Lesson Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Title</label>
                  <input
                    type="text"
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Summary</label>
                  <input
                    type="text"
                    value={lessonForm.summary}
                    onChange={(e) => setLessonForm({ ...lessonForm, summary: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Video Details */}
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiVideo className="w-5 h-5" />
                Video Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Video Provider</label>
                  <input
                    type="text"
                    value={lessonDetails.videoProvider}
                    onChange={(e) =>
                      setLessonDetails({ ...lessonDetails, videoProvider: e.target.value })
                    }
                    placeholder="e.g., cloudflare_stream"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Video ID</label>
                  <input
                    type="text"
                    value={lessonDetails.videoId}
                    onChange={(e) => setLessonDetails({ ...lessonDetails, videoId: e.target.value })}
                    placeholder="Video identifier"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Video URL</label>
                  <input
                    type="url"
                    value={lessonDetails.videoUrl}
                    onChange={(e) => setLessonDetails({ ...lessonDetails, videoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Cheatsheets */}
            <CheatsheetsSection
              lessonId={selectedLesson.id}
              cheatsheets={lessonDetails.cheatsheets}
              token={token}
              onUpdate={async () => {
                const res = await apiFetch(`/api/v1/admin/lessons/${selectedLesson.id}/resources`, { token });
                if (res?.ok) {
                  setLessonDetails({
                    ...lessonDetails,
                    cheatsheets: res.data.filter((r) => r.type === "cheatsheet"),
                  });
                }
              }}
            />

            {/* Practice Tasks */}
            <PracticeSection
              lessonId={selectedLesson.id}
              practices={lessonDetails.practices}
              token={token}
              onUpdate={async () => {
                const res = await apiFetch(`/api/v1/admin/lessons/${selectedLesson.id}/practice`, { token });
                if (res?.ok) {
                  setLessonDetails({ ...lessonDetails, practices: res.data });
                }
              }}
            />

            {/* MCQs */}
            <McqsSection
              lessonId={selectedLesson.id}
              mcqs={lessonDetails.mcqs}
              token={token}
              onUpdate={async () => {
                const res = await apiFetch(`/api/v1/admin/lessons/${selectedLesson.id}/mcqs`, { token });
                if (res?.ok) {
                  setLessonDetails({ ...lessonDetails, mcqs: res.data });
                }
              }}
            />

            {/* Slides */}
            <SlidesSection
              lessonId={selectedLesson.id}
              slides={lessonDetails.slides}
              token={token}
              onUpdate={async () => {
                const res = await apiFetch(`/api/v1/admin/lessons/${selectedLesson.id}/slides`, { token });
                if (res?.ok) {
                  setLessonDetails({ ...lessonDetails, slides: res.data });
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Cheatsheets Component
function CheatsheetsSection({ lessonId, cheatsheets, token, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", url: "" });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!form.title || !form.url) {
      alert("Title and URL are required");
      return;
    }

    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/lessons/${lessonId}/resources`, {
        method: "POST",
        token,
        body: { type: "cheatsheet", title: form.title, url: form.url },
      });
      setForm({ title: "", url: "" });
      onUpdate();
    } catch (error) {
      alert("Failed to add cheatsheet");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/resources/${id}`, {
        method: "PATCH",
        token,
        body: form,
      });
      setEditingId(null);
      setForm({ title: "", url: "" });
      onUpdate();
    } catch (error) {
      alert("Failed to update cheatsheet");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this cheatsheet?")) return;
    try {
      await apiFetch(`/api/v1/admin/resources/${id}`, { method: "DELETE", token });
      onUpdate();
    } catch (error) {
      alert("Failed to delete cheatsheet");
    }
  };

  return (
    <div className="p-6 border-b border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FiFileText className="w-5 h-5" />
          Cheatsheets ({cheatsheets.length})
        </h2>
        <button
          onClick={() => {
            setForm({ title: "", url: "" });
            setEditingId("new");
          }}
          className="px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add
        </button>
      </div>

      {editingId === "new" && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Cheatsheet title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2 border border-slate-200 rounded-lg"
            />
            <input
              type="url"
              placeholder="URL"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="px-4 py-2 border border-slate-200 rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2 bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {cheatsheets.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            {editingId === item.id ? (
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="px-3 py-1 border rounded"
                />
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="px-3 py-1 border rounded"
                />
              </div>
            ) : (
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-slate-600">{item.url}</div>
              </div>
            )}
            <div className="flex gap-2">
              {editingId === item.id ? (
                <>
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded"
                  >
                    <FiCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setForm({ title: "", url: "" });
                    }}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setForm({ title: item.title, url: item.url });
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Practice Section Component
function PracticeSection({ lessonId, practices, token, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", prompt: "", language: "", starterCode: "", expectedOutput: "" });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!form.title || !form.prompt) {
      alert("Title and prompt are required");
      return;
    }

    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/lessons/${lessonId}/practice`, {
        method: "POST",
        token,
        body: form,
      });
      setForm({ title: "", prompt: "", language: "", starterCode: "", expectedOutput: "" });
      onUpdate();
    } catch (error) {
      alert("Failed to add practice");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/practice/${id}`, {
        method: "PATCH",
        token,
        body: form,
      });
      setEditingId(null);
      setForm({ title: "", prompt: "", language: "", starterCode: "", expectedOutput: "" });
      onUpdate();
    } catch (error) {
      alert("Failed to update practice");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this practice task?")) return;
    try {
      await apiFetch(`/api/v1/admin/practice/${id}`, { method: "DELETE", token });
      onUpdate();
    } catch (error) {
      alert("Failed to delete practice");
    }
  };

  return (
    <div className="p-6 border-b border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FiCode className="w-5 h-5" />
          Practice Tasks ({practices.length})
        </h2>
        <button
          onClick={() => {
            setForm({ title: "", prompt: "", language: "", starterCode: "", expectedOutput: "" });
            setEditingId("new");
          }}
          className="px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add
        </button>
      </div>

      {editingId === "new" && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg space-y-4">
          <input
            type="text"
            placeholder="Practice title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
          />
          <textarea
            placeholder="Prompt/Description"
            value={form.prompt}
            onChange={(e) => setForm({ ...form, prompt: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Language (e.g., javascript)"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="px-4 py-2 border border-slate-200 rounded-lg"
            />
            <input
              type="text"
              placeholder="Expected output"
              value={form.expectedOutput}
              onChange={(e) => setForm({ ...form, expectedOutput: e.target.value })}
              className="px-4 py-2 border border-slate-200 rounded-lg"
            />
          </div>
          <textarea
            placeholder="Starter code"
            value={form.starterCode}
            onChange={(e) => setForm({ ...form, starterCode: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg font-mono text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2 bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {practices.map((item) => (
          <div key={item.id} className="p-4 bg-slate-50 rounded-lg">
            {editingId === item.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <textarea
                  value={form.prompt}
                  onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setForm({ title: "", prompt: "", language: "", starterCode: "", expectedOutput: "" });
                    }}
                    className="px-4 py-2 bg-slate-200 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{item.prompt}</div>
                  {item.language && (
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                      {item.language}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setForm({
                        title: item.title,
                        prompt: item.prompt,
                        language: item.language,
                        starterCode: item.starter_code,
                        expectedOutput: item.expected_output,
                      });
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// MCQs Section Component
function McqsSection({ lessonId, mcqs, token, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ question: "", options: [{ text: "", isCorrect: false }], explanation: "" });
  const [saving, setSaving] = useState(false);

  const handleAddOption = () => {
    setForm({
      ...form,
      options: [...form.options, { text: "", isCorrect: false }],
    });
  };

  const handleUpdateOption = (index, field, value) => {
    const newOptions = [...form.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setForm({ ...form, options: newOptions });
  };

  const handleRemoveOption = (index) => {
    const newOptions = form.options.filter((_, i) => i !== index);
    setForm({ ...form, options: newOptions });
  };

  const handleAdd = async () => {
    if (!form.question || form.options.length < 2) {
      alert("Question and at least 2 options are required");
      return;
    }

    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/lessons/${lessonId}/mcqs`, {
        method: "POST",
        token,
        body: form,
      });
      setForm({ question: "", options: [{ text: "", isCorrect: false }], explanation: "" });
      setEditingId(null);
      onUpdate();
    } catch (error) {
      alert("Failed to add MCQ");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/mcqs/${id}`, {
        method: "PATCH",
        token,
        body: form,
      });
      setEditingId(null);
      setForm({ question: "", options: [{ text: "", isCorrect: false }], explanation: "" });
      onUpdate();
    } catch (error) {
      alert("Failed to update MCQ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this MCQ?")) return;
    try {
      await apiFetch(`/api/v1/admin/mcqs/${id}`, { method: "DELETE", token });
      onUpdate();
    } catch (error) {
      alert("Failed to delete MCQ");
    }
  };

  return (
    <div className="p-6 border-b border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FiHelpCircle className="w-5 h-5" />
          MCQs ({mcqs.length})
        </h2>
        <button
          onClick={() => {
            setForm({ question: "", options: [{ text: "", isCorrect: false }], explanation: "" });
            setEditingId("new");
          }}
          className="px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add
        </button>
      </div>

      {editingId === "new" && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg space-y-4">
          <textarea
            placeholder="Question"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Options</label>
              <button
                onClick={handleAddOption}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Add Option
              </button>
            </div>
            {form.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => handleUpdateOption(index, "text", e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleUpdateOption(index, "isCorrect", e.target.checked)}
                  />
                  <span className="text-sm">Correct</span>
                </label>
                {form.options.length > 1 && (
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <textarea
            placeholder="Explanation (optional)"
            value={form.explanation}
            onChange={(e) => setForm({ ...form, explanation: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ question: "", options: [{ text: "", isCorrect: false }], explanation: "" });
              }}
              className="px-4 py-2 bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {mcqs.map((item) => {
          const options = typeof item.options === "string" ? JSON.parse(item.options) : item.options;
          return (
            <div key={item.id} className="p-4 bg-slate-50 rounded-lg">
              {editingId === item.id ? (
                <div className="space-y-4">
                  <textarea
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border rounded"
                  />
                  <div className="space-y-2">
                    {form.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleUpdateOption(index, "text", e.target.value)}
                          className="flex-1 px-3 py-2 border rounded"
                        />
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={(e) => handleUpdateOption(index, "isCorrect", e.target.checked)}
                          />
                          <span className="text-sm">Correct</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setForm({ question: "", options: [{ text: "", isCorrect: false }], explanation: "" });
                      }}
                      className="px-4 py-2 bg-slate-200 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium mb-2">{item.question}</div>
                    <div className="space-y-1">
                      {options.map((opt, idx) => (
                        <div
                          key={idx}
                          className={`text-sm p-2 rounded ${
                            opt.isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-slate-100"
                          }`}
                        >
                          {opt.text} {opt.isCorrect && <FiCheck className="inline w-4 h-4 ml-2" />}
                        </div>
                      ))}
                    </div>
                    {item.explanation && (
                      <div className="text-sm text-slate-600 mt-2 italic">{item.explanation}</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setForm({
                          question: item.question,
                          options: options,
                          explanation: item.explanation || "",
                        });
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Slides Section Component
function SlidesSection({ lessonId, slides, token, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", slideNumber: 0, imageUrl: "" });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!form.title) {
      alert("Title is required");
      return;
    }

    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/lessons/${lessonId}/slides`, {
        method: "POST",
        token,
        body: form,
      });
      setForm({ title: "", content: "", slideNumber: slides.length, imageUrl: "" });
      setEditingId(null);
      onUpdate();
    } catch (error) {
      alert("Failed to add slide");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      setSaving(true);
      await apiFetch(`/api/v1/admin/slides/${id}`, {
        method: "PATCH",
        token,
        body: form,
      });
      setEditingId(null);
      setForm({ title: "", content: "", slideNumber: 0, imageUrl: "" });
      onUpdate();
    } catch (error) {
      alert("Failed to update slide");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this slide?")) return;
    try {
      await apiFetch(`/api/v1/admin/slides/${id}`, { method: "DELETE", token });
      onUpdate();
    } catch (error) {
      alert("Failed to delete slide");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FiImage className="w-5 h-5" />
          Slides ({slides.length})
        </h2>
        <button
          onClick={() => {
            setForm({ title: "", content: "", slideNumber: slides.length, imageUrl: "" });
            setEditingId("new");
          }}
          className="px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add
        </button>
      </div>

      {editingId === "new" && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Slide title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2 border border-slate-200 rounded-lg"
            />
            <input
              type="number"
              placeholder="Slide number"
              value={form.slideNumber}
              onChange={(e) => setForm({ ...form, slideNumber: parseInt(e.target.value) || 0 })}
              className="px-4 py-2 border border-slate-200 rounded-lg"
            />
          </div>
          <input
            type="url"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg"
          />
          <textarea
            placeholder="Slide content (Markdown/HTML)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg font-mono text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", content: "", slideNumber: 0, imageUrl: "" });
              }}
              className="px-4 py-2 bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((item) => (
          <div key={item.id} className="p-4 bg-slate-50 rounded-lg">
            {editingId === item.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setForm({ title: "", content: "", slideNumber: 0, imageUrl: "" });
                    }}
                    className="px-4 py-2 bg-slate-200 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-slate-500">Slide #{item.slide_number}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setForm({
                          title: item.title,
                          content: item.content,
                          slideNumber: item.slide_number,
                          imageUrl: item.image_url,
                        });
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mt-2"
                  />
                )}
                {item.content && (
                  <div className="text-sm text-slate-600 mt-2 line-clamp-3">{item.content}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
