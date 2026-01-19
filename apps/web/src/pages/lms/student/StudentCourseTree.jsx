import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import {
  FiBookOpen,
  FiPlay,
  FiLock,
  FiCheckCircle,
  FiClock,
  FiChevronRight,
  FiArrowLeft,
} from "react-icons/fi";

export default function StudentCourseTree() {
  const navigate = useNavigate();
  const { courseSlug } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (!token || !courseSlug) return;
    fetchCourseTree();
  }, [token, courseSlug]);

  const fetchCourseTree = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/v1/student/courses/${courseSlug}`, { token }).catch(() => ({ data: null }));
      
      if (res?.data?.course) {
        setCourse(res.data.course);
        setModules(res.data.course.modules || []);
      } else if (res?.course) {
        setCourse(res.course);
        setModules(res.course.modules || []);
      }
    } catch (error) {
      console.error("Failed to fetch course tree:", error);
    } finally {
      setLoading(false);
    }
  };

  const getModuleStatus = (module) => {
    const completedLessons = module.lessons?.filter((l) => l.completed).length || 0;
    const totalLessons = module.lessons?.length || 0;
    
    if (totalLessons === 0) return "locked";
    if (completedLessons === totalLessons) return "completed";
    if (completedLessons > 0) return "in_progress";
    return "locked";
  };

  const getDaysToComplete = (module) => {
    // Estimate: 1 lesson per day, or use module.days if available
    const lessonCount = module.lessons?.length || 0;
    return module.days || lessonCount || 7;
  };

  const handleModuleClick = (module) => {
    if (module.lessons && module.lessons.length > 0) {
      // Navigate to first lesson or module view
      const firstLesson = module.lessons.find((l) => !l.completed) || module.lessons[0];
      if (firstLesson) {
        navigate(`/lms/student/courses/${courseSlug}/modules/${module.slug}/lessons/${firstLesson.slug}`);
      }
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
            <FiBookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Course not found</h3>
            <button
              onClick={() => navigate("/lms/student/courses")}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/lms/student/courses")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Courses</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{course.title}</h1>
          <p className="text-slate-600">{course.description}</p>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {modules.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
              <FiBookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No modules available</h3>
              <p className="text-slate-600">This course doesn't have any modules yet</p>
            </div>
          ) : (
            modules.map((module, index) => {
              const status = getModuleStatus(module);
              const daysToComplete = getDaysToComplete(module);
              const completedLessons = module.lessons?.filter((l) => l.completed).length || 0;
              const totalLessons = module.lessons?.length || 0;
              const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

              return (
                <motion.div
                  key={module.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl border-2 transition-all ${
                    status === "completed"
                      ? "border-emerald-500 bg-emerald-50/30"
                      : status === "in_progress"
                      ? "border-blue-500 bg-blue-50/30"
                      : "border-slate-200 hover:border-slate-300"
                  } shadow-sm hover:shadow-md`}
                >
                  <div
                    onClick={() => status !== "locked" && handleModuleClick(module)}
                    className={`p-6 ${status !== "locked" ? "cursor-pointer" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              status === "completed"
                                ? "bg-emerald-500"
                                : status === "in_progress"
                                ? "bg-blue-500"
                                : "bg-slate-300"
                            } text-white`}
                          >
                            {status === "completed" ? (
                              <FiCheckCircle className="w-6 h-6" />
                            ) : status === "locked" ? (
                              <FiLock className="w-6 h-6" />
                            ) : (
                              <FiPlay className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{module.title}</h3>
                            <p className="text-sm text-slate-600">
                              {completedLessons} of {totalLessons} lessons completed
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {status !== "locked" && (
                          <div className="mb-4">
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className={`rounded-full h-2 transition-all duration-500 ${
                                  status === "completed" ? "bg-emerald-500" : "bg-blue-500"
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Module Info */}
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            {daysToComplete} day{daysToComplete !== 1 ? "s" : ""} to complete
                          </div>
                          {module.lessons && (
                            <div className="flex items-center gap-1">
                              <FiBookOpen className="w-4 h-4" />
                              {module.lessons.length} lesson{module.lessons.length !== 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </div>

                      {status !== "locked" && (
                        <FiChevronRight className="w-6 h-6 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Lessons Preview (Collapsible) */}
                  {module.lessons && module.lessons.length > 0 && (
                    <div className="border-t border-slate-200 p-4 bg-slate-50/50">
                      <div className="space-y-2">
                        {module.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id || lessonIndex}
                            className="flex items-center gap-3 text-sm"
                          >
                            {lesson.completed ? (
                              <FiCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                            )}
                            <span className={lesson.completed ? "text-slate-600 line-through" : "text-slate-900"}>
                              {lesson.title || `Lesson ${lessonIndex + 1}`}
                            </span>
                          </div>
                        ))}
                        {module.lessons.length > 3 && (
                          <p className="text-xs text-slate-500 pl-7">
                            +{module.lessons.length - 3} more lessons
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
