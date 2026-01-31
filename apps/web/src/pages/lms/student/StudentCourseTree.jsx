import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { StudentCourseTreeSkeleton } from "../../../Components/common/SkeletonLoaders";
import {
  FiCheck,
  FiBookOpen,
  FiX,
  FiChevronRight,
  FiChevronDown,
  FiArrowLeft,
} from "react-icons/fi";

export default function StudentCourseTree() {
  const navigate = useNavigate();
  const { courseSlug } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState(new Set());

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

  const toggleTopic = (topicId) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0 Mins";
    const mins = Math.round(seconds / 60);
    return `${mins} Mins`;
  };

  const isTopicCompleted = (module) => {
    if (!module.lessons || module.lessons.length === 0) return false;
    return module.lessons.every((lesson) => lesson.completed);
  };

  if (loading) {
    return <StudentCourseTreeSkeleton />;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-12 border border-slate-200 text-center shadow-sm">
            <FiBookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Course not found</h3>
            <button
              onClick={() => navigate("/lms/student/courses")}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/lms/student/courses")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Courses</span>
          </button>
          <div className="flex items-start justify-between mb-4">
            <div>
              {course.code && (
                <p className="text-sm font-semibold text-blue-500 mb-1">{course.code}</p>
              )}
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">COURSE</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {course.title}
              </h1>
              {course.description && (
                <p className="text-sm text-slate-500">{course.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Topics List */}
        {modules.length === 0 ? (
          <div className="bg-white rounded-lg p-12 border border-slate-200 text-center shadow-sm">
            <FiBookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No topics available</h3>
            <p className="text-slate-600">This course doesn't have any topics yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {modules.map((module, index) => {
              const isExpanded = expandedTopics.has(module.id);
              const isCompleted = isTopicCompleted(module);
              const hasLessons = module.lessons && module.lessons.length > 0;

              return (
                <motion.div
                  key={module.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Topic Header */}
                  <div
                    onClick={() => hasLessons && toggleTopic(module.id)}
                    className={`p-4 flex items-center gap-4 ${
                      hasLessons ? 'cursor-pointer hover:bg-slate-50 transition-colors' : ''
                    }`}
                  >
                    {/* Completion Indicator */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>
                      )}
                    </div>

                    {/* Topic Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">TOPIC</p>
                      <h3 className="text-base font-bold text-slate-900">
                        {module.title || `Topic ${index + 1}`}
                      </h3>
                    </div>

                    {/* Chevron */}
                    {hasLessons && (
                      <div className="flex-shrink-0">
                        {isExpanded ? (
                          <FiChevronDown className="w-5 h-5 text-slate-600" />
                        ) : (
                          <FiChevronRight className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expanded Lessons */}
                  {isExpanded && hasLessons && (
                    <div className="border-t border-slate-200 bg-slate-50">
                      <div className="pl-12 pr-4 py-3">
                        <div className="space-y-3">
                          {module.lessons.map((lesson, lessonIndex) => {
                            const isLessonCompleted = lesson.completed;
                            return (
                              <div
                                key={lesson.id || lessonIndex}
                                className="flex items-start gap-3 relative"
                              >
                                {/* Connecting Line */}
                                {lessonIndex < module.lessons.length - 1 && (
                                  <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-slate-300"></div>
                                )}

                                {/* Lesson Completion Indicator */}
                                <div className="flex-shrink-0 mt-1">
                                  {isLessonCompleted ? (
                                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                      <FiCheck className="w-2.5 h-2.5 text-white" />
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                  )}
                                </div>

                                {/* Book Icon */}
                                <div className="flex-shrink-0 mt-1">
                                  <FiBookOpen className="w-4 h-4 text-slate-500" />
                                </div>

                                {/* Lesson Info */}
                                <div 
                                  className="flex-1 min-w-0 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/lms/student/courses/${courseSlug}/modules/${module.slug}/lessons/${lesson.slug}`);
                                  }}
                                >
                                  <h4 className="text-sm font-semibold text-slate-900 mb-1 hover:text-blue-600 transition-colors">
                                    {lesson.title || `Lesson ${lessonIndex + 1}`}
                                  </h4>
                                  <div className="flex items-center gap-3 text-xs text-slate-500">
                                    {lesson.duration_seconds && (
                                      <span>{formatDuration(lesson.duration_seconds)}</span>
                                    )}
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                                      Learning
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
