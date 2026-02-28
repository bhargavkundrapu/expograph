import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { StudentCoursesSkeleton } from "../../../Components/common/SkeletonLoaders";
import {
  FiCheck,
  FiGlobe,
  FiCode,
  FiBookOpen,
  FiX,
  FiChevronRight,
  FiChevronDown,
  FiClock,
  FiLock,
} from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { BuyNowModal } from "../../../Components/payments/BuyNowModal";

export default function StudentCourses() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyItem, setBuyItem] = useState(null);
  const openedFromUrlRef = useRef(false);

  // Check if we're on the bonus courses page
  const isBonusCoursesPage = location.pathname.includes("bonus-courses");

  useEffect(() => {
    if (!token) return;
    fetchCourses();
  }, [token]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search") || params.get("q") || "";
    if (q) setSearchQuery(q);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseSlug = params.get("course");
    if (courseSlug && courses.length > 0 && !openedFromUrlRef.current) {
      const c = courses.find((co) => co.slug === courseSlug);
      if (c) {
        openedFromUrlRef.current = true;
        if (c.enrolled) handleCourseClick(c);
        else openBuyModal(c);
      }
    }
  }, [location.search, courses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/student/courses", { token }).catch(() => ({ data: [] }));
      setCourses(res?.data || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async (courseSlug) => {
    try {
      setLoadingDetails(true);
      const res = await apiFetch(`/api/v1/student/courses/${courseSlug}`, { token }).catch(() => ({ data: null }));
      if (res?.data?.course) {
        setCourseDetails(res.data.course);
      } else if (res?.course) {
        setCourseDetails(res.course);
      }
    } catch (error) {
      console.error("Failed to fetch course details:", error);
      setCourseDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCourseClick = async (course) => {
    if (!course.enrolled) {
      openBuyModal(course);
      return;
    }
    setSelectedCourse(course);
    await fetchCourseDetails(course.slug);
  };

  const openBuyModal = (course) => {
    setBuyItem({ type: "course", id: course.id, title: course.title });
    setShowBuyModal(true);
  };

  const handleBuySuccess = () => {
    setShowBuyModal(false);
    setBuyItem(null);
    fetchCourses();
    setTimeout(() => fetchCourses(), 1500);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setCourseDetails(null);
    setExpandedTopics(new Set());
    openedFromUrlRef.current = false;
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

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  // Calculate overall progress (enrolled courses only)
  const enrolledCourses = courses.filter((c) => c.enrolled);
  const overallProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / enrolledCourses.length
        )
      : 0;

  // Calculate total duration (assuming each course has duration)
  const totalDuration = courses.reduce((sum, course) => {
    const duration = course.duration || course.estimated_duration || 0;
    return sum + (typeof duration === 'number' ? duration : 0);
  }, 0);

  if (loading) {
    return <StudentCoursesSkeleton />;
  }

  // Show "Coming Soon" for bonus courses
  if (isBonusCoursesPage) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">BONUS CONTENT</p>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  Bonus Courses
                </h1>
              </div>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiClock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Coming Soon</h2>
              <p className="text-slate-600 text-lg mb-6">
                We're working hard to bring you exciting bonus courses. Stay tuned for updates!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <FiClock className="w-4 h-4" />
                <span>Check back soon for new content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Circular Progress Component
  const CircularProgress = ({ percentage, size = 40 }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#06b6d4"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-slate-700">{percentage}%</span>
        </div>
      </div>
    );
  };

  // Get course icon based on course data
  const getCourseIcon = (course, index) => {
    if (course.progress === 100) {
      return <FiCheck className="w-6 h-6 text-green-500" />;
    }
    // You can customize icons based on course type or use default
    if (course.title?.toLowerCase().includes('website') || course.title?.toLowerCase().includes('web')) {
      return <FiGlobe className="w-6 h-6 text-blue-500" />;
    }
    if (course.title?.toLowerCase().includes('programming') || course.title?.toLowerCase().includes('code')) {
      return <FiCode className="w-6 h-6 text-blue-500" />;
    }
    return <FiBookOpen className="w-6 h-6 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
    <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">MY LEARNINGS</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {courses.length > 0 ? courses[0]?.learning_path_name || "My Learning Path" : "My Learnings"}
              </h1>
              {totalDuration > 0 && (
                <p className="text-sm text-slate-500">{totalDuration} days</p>
              )}
            </div>
            {courses.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-48 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <span className="text-sm text-slate-500 font-medium">{overallProgress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-lg p-12 border border-slate-200 text-center shadow-sm">
            <FiBookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-600">
              {searchQuery || filterLevel !== "all"
                ? "No courses match your filters"
                : "No courses available yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => {
              const progress = course.progress || 0;
              const isCompleted = progress === 100;
              const topicsCount = course.modules_count || course.topics_count || course.lessons_count || 0;
              const technologies = course.technologies || course.tags || [];
              const locked = !course.enrolled;
              const priceRupees = course.price_in_paise ? Math.round(course.price_in_paise / 100) : 0;
              const canBuy = priceRupees >= 1;

              return (
                <motion.div
                  key={course.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCourseClick(course)}
                  className={`bg-white rounded-lg border shadow-sm transition-all overflow-hidden relative ${
                    locked
                      ? "border-slate-300 cursor-pointer hover:shadow-md"
                      : "border-slate-200 hover:shadow-md cursor-pointer"
                  }`}
                >
                  {locked && (
                    <div className="absolute inset-0 bg-slate-50/80 z-10 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                      <div className="text-center">
                        <FiLock className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-700 mb-2">Locked</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openBuyModal(course);
                          }}
                          disabled={!canBuy}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                            canBuy
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-slate-300 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                          Get Course {canBuy && priceRupees > 0 ? `(₹${priceRupees})` : ""}
                        </button>
                      </div>
                    </div>
                  )}
                  <div className={`p-6 ${locked ? "opacity-75" : ""}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center">
                          {locked ? (
                            <FiLock className="w-6 h-6 text-slate-400" />
                          ) : (
                            getCourseIcon(course, index)
                          )}
                        </div>
                        {course.code && !locked && (
                          <span className="text-sm font-bold text-blue-600">{course.code}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {locked ? (
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            🔒 Locked
                          </span>
                        ) : isCompleted ? (
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <FiCheck className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <CircularProgress percentage={progress} size={40} />
                        )}
                      </div>
                    </div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">COURSE</p>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {index + 1}. {course.title || "Untitled Course"}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {course.description || "No description available"}
                    </p>
                    <p className="text-sm text-slate-500 mb-4">
                      {topicsCount} {topicsCount === 1 ? "Topic" : "Topics"}
                    </p>
                    {locked && canBuy && (
                      <div className="mb-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openBuyModal(course);
                          }}
                          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm"
                        >
                          Get Course — ₹{priceRupees}
                        </button>
                      </div>
                    )}
                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-700 font-medium"
                          >
                            {typeof tech === "string"
                              ? tech.toUpperCase()
                              : tech.name?.toUpperCase() || tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 relative">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <FiX className="w-5 h-5 text-slate-600" />
                  </button>

                  <div className="pr-12">
                    {selectedCourse.code && (
                      <p className="text-sm font-semibold text-blue-500 mb-1">{selectedCourse.code}</p>
                    )}
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">COURSE</p>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedCourse.title || "Untitled Course"}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {loadingDetails ? (
                    <div className="space-y-3 animate-pulse">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-slate-200 rounded w-16 mb-2"></div>
                              <div className="h-5 bg-slate-200 rounded w-48"></div>
                            </div>
                            <div className="w-5 h-5 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : courseDetails && courseDetails.modules ? (
                    <div className="space-y-3">
                      {courseDetails.modules.map((module, index) => {
                        const isExpanded = expandedTopics.has(module.id);
                        const isCompleted = isTopicCompleted(module);
                        const hasLessons = module.lessons && module.lessons.length > 0;

                        return (
                          <div
                            key={module.id || index}
                            className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden"
                          >
                            {/* Topic Header */}
                            <div
                              onClick={() => hasLessons && toggleTopic(module.id)}
                              className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                                hasLessons ? 'cursor-pointer' : ''
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
                                              handleCloseModal();
                                              navigate(`/lms/student/courses/${selectedCourse.slug}/modules/${module.slug}/lessons/${lesson.slug}`);
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
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-600">No topics available for this course</p>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BuyNowModal
        open={showBuyModal}
        onClose={() => { setShowBuyModal(false); setBuyItem(null); }}
        item={buyItem}
        onSuccess={handleBuySuccess}
        prefill={user ? { name: user.name || user.full_name, email: user.email, phone: user.phone } : undefined}
      />
    </div>
  );
}
