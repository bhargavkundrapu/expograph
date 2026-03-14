import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getStudentCourseLandingPath, getStudentLessonPath } from "../../../utils/studentCoursePaths";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { useDashboardPrefs } from "../../../app/providers/DashboardPrefsProvider";
import { apiFetch } from "../../../services/api";
import { StudentCoursesSkeleton } from "../../../Components/common/SkeletonLoaders";
import PageTransition from "../../../Components/common/PageTransition";
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
import { COURSE_EXPLORE_DATA, COURSE_DURATION_HOURS } from "../../../data/courseExploreData";

// Display order on student LMS courses route: Vibe Coding → Prompt Engineering → Prompt to Profit → others
// Include "vibe coading" (common typo in DB/seeds) so it still sorts first
const COURSE_DISPLAY_ORDER = ["vibe-coding", "vibe-coading", "prompt-engineering", "prompt-to-profit", "ai-automations"];
const COURSE_TITLE_ORDER = ["vibe coding", "vibe coading", "prompt engineering", "prompt to profit", "ai automations"];

function getCourseDurationHours(course) {
  if (!course) return null;
  // Normalize: lower case, underscores and spaces to hyphens (so "vibe coding" / "vibe_coding" → "vibe-coding")
  const slug = (course.slug || "").toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-").trim();
  const title = (course.title || "").toLowerCase();
  if (COURSE_DURATION_HOURS[slug] != null) return COURSE_DURATION_HOURS[slug];
  if (slug.includes("vibe") && (slug.includes("cod") || slug.includes("coading"))) return 12;
  if (slug.includes("prompt-engineering") || title.includes("prompt engineering")) return 30;
  if (slug.includes("prompt-to-profit") || title.includes("prompt to profit")) return 30;
  if (slug.includes("ai-automation") || title.includes("ai automation")) return 30;
  return null;
}

function courseOrderIndex(course) {
  const slug = (course?.slug || "").toLowerCase().replace(/_/g, "-").trim();
  const title = (course?.title || "").toLowerCase().trim();
  let idx = COURSE_DISPLAY_ORDER.indexOf(slug);
  if (idx === -1 && title) {
    idx = COURSE_TITLE_ORDER.findIndex((t) => title.includes(t) || t.includes(title));
  }
  // Normalize: "vibe coading" (typo) and "vibe coding" both sort first
  if (idx === 1) idx = 0; // vibe-coading → same as vibe-coding
  return idx === -1 ? 999 : idx;
}

export default function StudentCourses() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useAuth();
  const { isDark } = useTheme();
  const { isPinned, togglePinCourse } = useDashboardPrefs();
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
  const [fetchError, setFetchError] = useState("");

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
      setFetchError("");
      const res = await apiFetch("/api/v1/student/courses", { token }).catch(() => ({ data: [] }));
      const list = Array.isArray(res?.data) ? res.data : [];
      list.sort((a, b) => courseOrderIndex(a) - courseOrderIndex(b));
      setCourses(list);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setFetchError(error?.message || "Failed to load courses. Please refresh the page.");
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

  const isBonusCourse = (course) => {
    const slug = (course.slug || "").toLowerCase().replace(/_/g, "-");
    const title = (course.title || "").toLowerCase();
    return slug.includes("ai-automations") || slug.includes("ai-automation") || slug.includes("ai-automat") || title.includes("ai automation");
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

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = filterLevel === "all" || course.level === filterLevel;
      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      const aPinned = isPinned(a.slug) ? 1 : 0;
      const bPinned = isPinned(b.slug) ? 1 : 0;
      if (bPinned !== aPinned) return bPinned - aPinned;
      return courseOrderIndex(a) - courseOrderIndex(b);
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

  if (fetchError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-3">{fetchError}</p>
        <button onClick={fetchCourses} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  // Bonus courses page — Coming Soon (AI Automations lives in main Courses only)
  if (isBonusCoursesPage) {
    return (
      <PageTransition>
        <div className={`min-h-screen p-4 md:p-8 transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>BONUS CONTENT</p>
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                Bonus Courses
              </h1>
              <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Free extra courses — coming soon.
              </p>
            </div>
            <div className={`rounded-xl border p-12 text-center ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-600"}`}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>Coming Soon</h3>
              <p className={`text-sm max-w-md mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                We're preparing bonus courses for you. In the meantime, explore your main courses.
              </p>
              <button
                onClick={() => navigate("/lms/student/courses")}
                className="mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl"
              >
                Go to My Courses
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
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
    <PageTransition>
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-4 md:mb-8 animate-fade-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>MY LEARNINGS</p>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                {courses.length > 0 ? courses[0]?.learning_path_name || "My Learning Path" : "My Learnings"}
              </h1>
              {totalDuration > 0 && (
                <p className="text-sm text-slate-500">{totalDuration} days</p>
              )}
            </div>
            {courses.length > 0 && (
              <div className="flex items-center gap-3" data-tour="courses-search-filter">
                <div className={`w-32 sm:w-48 rounded-full h-2 ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
                  <div
                    className="bg-blue-500 rounded-full h-2 progress-bar-animated"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>{overallProgress}%</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredCourses.map((course, index) => {
              const progress = course.progress || 0;
              const isCompleted = progress === 100;
              const topicsCount = course.modules_count || course.topics_count || course.lessons_count || 0;
              const technologies = course.technologies || course.tags || [];
              // AI Automations (bonus) is always accessible — never show as locked
              const locked = !course.enrolled && !isBonusCourse(course);
              const priceRupees = course.price_in_paise ? Math.round(course.price_in_paise / 100) : 0;
              const canBuy = priceRupees >= 1;
              const durationHours = getCourseDurationHours(course);

              return (
                <motion.div
                  key={course.id || index}
                  data-tour="course-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => locked ? navigate(getStudentCourseLandingPath(course.slug)) : handleCourseClick(course)}
                  className={`rounded-lg border shadow-sm transition-all overflow-hidden relative hover-lift ${
                    isDark
                      ? locked ? "bg-slate-800 border-slate-700 cursor-pointer" : "bg-slate-800 border-slate-700 cursor-pointer"
                      : locked ? "bg-white border-slate-300 cursor-pointer hover:shadow-md" : "bg-white border-slate-200 hover:shadow-md cursor-pointer"
                  } ${isPinned(course.slug) ? "ring-2 ring-amber-400/60" : ""}`}
                >
                  
                  <div className="p-4 md:p-6">
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
                          <span className={`text-xs font-medium px-2 py-1 rounded ${isBonusCourse(course) ? "text-amber-600 bg-amber-100 dark:bg-amber-500/15 dark:text-amber-400" : "text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-400"}`}>
                            {isBonusCourse(course) ? "🎁 Bonus" : "🔒 Locked"}
                          </span>
                        ) : isCompleted ? (
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <FiCheck className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div data-tour="course-progress-label"><CircularProgress percentage={progress} size={40} /></div>
                        )}
                      </div>
                    </div>
                    <p className={`text-xs uppercase tracking-wider mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>COURSE</p>
                    {!locked && (
                      <div className="flex items-center justify-between mb-2">
                        <div />
                        <button
                          onClick={(e) => { e.stopPropagation(); togglePinCourse(course.slug); }}
                          className={`p-1.5 rounded-lg transition-all ${isPinned(course.slug) ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10" : isDark ? "text-slate-600 hover:text-slate-400 hover:bg-slate-700" : "text-slate-300 hover:text-slate-500 hover:bg-slate-100"}`}
                          title={isPinned(course.slug) ? "Unpin course" : "Pin to top"}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isPinned(course.slug) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                      {index + 1}. {course.title || "Untitled Course"}
                    </h3>
                    {durationHours != null && (
                      <p className={`flex items-center gap-1.5 text-xs mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{durationHours} hrs to complete</span>
                      </p>
                    )}
                    {locked ? (
                      <>
                        <p className={`text-sm mb-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                          {isBonusCourse(course)
                            ? "To unlock this bonus course, buy the All Pack or all three courses (Vibe Coding, Prompt Engineering, Prompt to Profit)."
                            : "Unlock this course to access all lessons and content."}
                        </p>
                        <div className="flex flex-col gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(getStudentCourseLandingPath(course.slug));
                          }}
                          className={`w-full py-2.5 px-4 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 border ${
                            isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <FiBookOpen className="w-4 h-4" />
                          Explore Course
                        </button>
                          {isBonusCourse(course) ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/courses");
                              }}
                              data-tour="pack-upsell-banner"
                              className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-sm transition-colors"
                            >
                              Get All Pack or All 3 Courses to Unlock
                            </button>
                          ) : canBuy ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openBuyModal(course);
                              }}
                              data-tour="course-cta-continue"
                              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
                            >
                              Get Course — ₹{priceRupees}
                            </button>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className={`text-sm mb-3 line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {course.description || "No description available"}
                        </p>
                        <p className={`text-sm mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {topicsCount} {topicsCount === 1 ? "Topic" : "Topics"}
                        </p>
                        {technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {technologies.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-700"}`}
                              >
                                {typeof tech === "string"
                                  ? tech.toUpperCase()
                                  : tech.name?.toUpperCase() || tech}
                              </span>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(getStudentCourseLandingPath(course.slug));
                          }}
                          className="w-full mt-1 py-2.5 px-4 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 mb-2"
                        >
                          <FiBookOpen className="w-4 h-4" />
                          Explore Course
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`${getStudentCourseLandingPath(course.slug)}?continue=1`);
                          }}
                          className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                        >
                          Continue Learning
                        </button>
                      </>
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
              <div className={`rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white"}`}>
                <div className={`p-6 border-b relative ${isDark ? "border-slate-700" : "border-slate-200"}`}>
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
                                              navigate(getStudentLessonPath(selectedCourse.slug, module.slug, lesson.slug));
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
        prefill={user ? { name: user.fullName || user.full_name || user.name || "", email: user.email, phone: user.phone, college: user.college || "" } : undefined}
        isLoggedIn={!!token}
      />
    </div>
    </PageTransition>
  );
}
