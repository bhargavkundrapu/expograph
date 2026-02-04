import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { StudentHomeSkeleton } from "../../../Components/common/SkeletonLoaders";
import WorkshopCarousel from "../../../Components/dashboard/WorkshopCarousel";
import {
  FiPlay,
  FiCalendar,
  FiTrendingUp,
  FiBookOpen,
  FiMessageSquare,
  FiVideo,
  FiCheckCircle,
  FiClock,
  FiBarChart2,
  FiTarget,
  FiZap,
  FiChevronRight,
  FiInfo,
  FiLock,
} from "react-icons/fi";

export default function StudentHome() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [schedule, setSchedule] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [progress, setProgress] = useState({
    completed: 0,
    streak: 0,
    consistency: 0,
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch student dashboard data
      const [scheduleRes, courseRes, progressRes, eventsRes] = await Promise.all([
        apiFetch("/api/v1/student/schedule", { token }).catch(() => ({ data: [] })),
        apiFetch("/api/v1/student/current-course", { token }).catch(() => ({ data: null })),
        apiFetch("/api/v1/student/progress", { token }).catch(() => ({ data: { completed: 0, streak: 0, consistency: 0 } })),
        apiFetch("/api/v1/student/events", { token }).catch(() => ({ data: [] })),
      ]);
      
      // Use real schedule data from API, or fallback to mock data for demonstration
      const scheduleData = scheduleRes?.data || [];
      
      // If no schedule data, create mock schedule from current course
      if (scheduleData.length === 0 && courseRes?.data) {
        const course = courseRes.data;
        const mockSchedule = [
          {
            id: `schedule-1`,
            title: course.moduleName || "Continue Learning",
            courseSlug: course.courseSlug || course.slug,
            moduleSlug: course.moduleSlug || course.moduleSlug,
            lessonSlug: course.lessonSlug || course.nextLessonSlug,
            progress: course.progress || 0,
            completed: course.completedLessons || 0,
            total: course.totalLessons || 0,
            activityType: "LEARNING",
            duration: course.duration || "30 Mins",
          },
        ];
        setSchedule(mockSchedule);
      } else {
        setSchedule(scheduleData);
      }
      
      setCurrentCourse(courseRes?.data || null);
      setProgress(progressRes?.data || { completed: 0, streak: 0, consistency: 0 });
      setEvents(eventsRes?.data || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Workshop carousel items
  const workshopItems = [
    {
      logo: "make",
      title: "AI WORKFLOWS & AUTOMATION WORKSHOP USING MAKE.COM",
      description: "Build AI projects that boost your portfolio!",
      isLive: true,
      action: {
        label: "Join Now",
        onClick: () => navigate("/lms/student/workshops"),
      },
    },
    {
      logo: "make",
      title: "ADVANCED REACT PATTERNS WORKSHOP",
      description: "Master React best practices and advanced techniques.",
      isLive: false,
      action: {
        label: "Join Now",
        onClick: () => navigate("/lms/student/workshops"),
      },
    },
    {
      logo: "make",
      title: "FULL-STACK DEVELOPMENT BOOTCAMP",
      description: "Build complete web applications from scratch.",
      isLive: false,
      action: {
        label: "Join Now",
        onClick: () => navigate("/lms/student/workshops"),
      },
    },
  ];

  if (loading) {
    return <StudentHomeSkeleton />;
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Main Content Area - Left Side */}
        <div className="flex-1 min-w-0 space-y-6 lg:space-y-8">
          {/* Welcome Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 sm:mb-3">
              Welcome {user?.fullName || user?.full_name || user?.name || "Student"} 👋
            </h1>
          </div>

          {/* Workshop Carousel */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <WorkshopCarousel items={workshopItems} />
          </div>

          {/* Your Schedule Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 px-4 sm:px-6 py-4 sm:py-5">
              <p className="text-white/90 text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1">
                {currentCourse?.courseName ? currentCourse.courseName.toUpperCase() : schedule[0]?.courseName?.toUpperCase() || "YOUR SCHEDULE"}
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {currentCourse?.moduleName || schedule[0]?.moduleName || schedule[0]?.title || "Continue Learning"}
              </h2>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6">
                {schedule.length === 0 ? (
                  <div className="text-center py-12">
                    <FiCalendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">No scheduled items for this week</p>
                  </div>
                ) : (
                  <div className="relative pl-1 sm:pl-2">
                    {/* Schedule Items */}
                    <div className="space-y-4 sm:space-y-6">
                      {schedule.map((item, index) => {
                        const isLast = index === schedule.length - 1;
                        const progress = item.progress || 0;
                        const isCompleted = progress === 100;
                        const isInProgress = progress > 0 && progress < 100;
                        const activityType = item.activityType || "LEARNING";
                        const isPractice = activityType === "PRACTICE";
                        
                        return (
                          <div key={item.id || index} className="relative flex items-start gap-2 sm:gap-3 md:gap-4 group hover:bg-slate-50 rounded-lg p-2 -m-2 transition-colors">
                            {/* Timeline Line - connects circles */}
                            {!isLast && (
                              <div className="absolute left-[11px] sm:left-[13px] md:left-[15px] top-6 sm:top-7 md:top-8 w-0.5 bg-slate-200" style={{ height: 'calc(100% + 1rem)' }}></div>
                            )}
                            
                            {/* Progress Circle */}
                            <div className="relative z-10 flex-shrink-0 mt-0.5">
                              {isCompleted ? (
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center">
                                  <FiCheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                                </div>
                              ) : isInProgress ? (
                                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative">
                                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                                    <circle
                                      cx="16"
                                      cy="16"
                                      r="14"
                                      stroke="#e5e7eb"
                                      strokeWidth="3"
                                      fill="white"
                                    />
                                    <circle
                                      cx="16"
                                      cy="16"
                                      r="14"
                                      stroke="#22c55e"
                                      strokeWidth="3"
                                      fill="none"
                                      strokeDasharray={`${2 * Math.PI * 14}`}
                                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 border-2 border-slate-300 rounded-full bg-white"></div>
                              )}
                            </div>

                            {/* Content */}
                            <div 
                              className="flex-1 pt-0.5 sm:pt-1 min-w-0 cursor-pointer"
                              onClick={() => {
                                // Navigate to lesson if available
                                if (item.courseSlug && item.moduleSlug && item.lessonSlug) {
                                  navigate(`/lms/student/courses/${item.courseSlug}/modules/${item.moduleSlug}/lessons/${item.lessonSlug}`);
                                } else if (item.courseSlug) {
                                  // Navigate to course list if lesson not available (course tree route removed)
                                  navigate("/lms/student/courses");
                                } else if (item.link) {
                                  // Use custom link if provided
                                  navigate(item.link);
                                }
                              }}
                            >
                              <div className="flex items-start justify-between mb-1 sm:mb-2 gap-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-1 break-words hover:text-blue-600 transition-colors">
                                    {item.title || item.name || "Schedule Item"}
                                    {isInProgress && item.total && (
                                      <span className="text-slate-600 font-normal"> ({item.completed || Math.round(progress / 100 * item.total)}/{item.total})</span>
                                    )}
                                  </h3>
                                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                    {activityType && (
                                      <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium text-white ${
                                        isPractice ? "bg-orange-500" : "bg-teal-500"
                                      }`}>
                                        {isPractice ? (
                                          <>
                                            <FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                            {activityType}
                                          </>
                                        ) : (
                                          <>
                                            <FiBookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                            {activityType}
                                          </>
                                        )}
                                      </span>
                                    )}
                                    {item.duration && (
                                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                                        <FiClock className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                        <span>{item.duration}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0 mt-0.5 sm:mt-1 group-hover:text-blue-600 transition-colors" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
          </div>

        </div>

        {/* Right Sidebar - Widgets */}
        <div className="w-full lg:w-72 xl:w-80 2xl:w-96 flex-shrink-0 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Events Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Events</h3>
                <button
                  onClick={() => navigate("/lms/student/events")}
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  View
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">Challenges, podcasts & a lot more activities!</p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FiZap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-900">1 Live Event</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm font-medium text-green-600">Live Now</span>
              </div>
            </div>
          </div>


          {/* Your Progress Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Your Progress</h3>
                <FiInfo className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-medium text-blue-600 mb-2">Completion Meter</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">{progress.completed || 44}%</span>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0">
                  <svg className="transform -rotate-90 w-full h-full">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="42%"
                      stroke="#e2e8f0"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="42%"
                      stroke="#f59e0b"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 0.42}`}
                      strokeDashoffset={`${2 * Math.PI * 0.42 * (1 - (progress.completed || 44) / 100)}`}
                      strokeLinecap="round"
                      style={{ transformOrigin: 'center' }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-900">Pending Units - 141</p>
                <p className="text-[10px] sm:text-xs text-slate-600 mt-1">View Pending Units</p>
              </div>
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
