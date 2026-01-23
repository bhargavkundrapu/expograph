import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import BannerCarousel from "../../../Components/dashboard/BannerCarousel";
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
  const [monthlyTracker, setMonthlyTracker] = useState([]);

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

      setSchedule(scheduleRes?.data || []);
      setCurrentCourse(courseRes?.data || null);
      setProgress(progressRes?.data || { completed: 0, streak: 0, consistency: 0 });
      setEvents(eventsRes?.data || []);

      // Generate monthly tracker (mock for now)
      const tracker = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        completed: Math.random() > 0.5,
      }));
      setMonthlyTracker(tracker);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Banner carousel items
  const bannerItems = [
    {
      title: "New Workshop: Advanced React Patterns",
      description: "Join us this Saturday for an interactive workshop on React best practices.",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      badge: "Workshop",
      action: {
        label: "Register Now",
        onClick: () => navigate("/lms/student/workshops"),
      },
    },
    {
      title: "New Podcast Episode Available",
      description: "Listen to industry experts discuss career growth and tech trends.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      badge: "Podcast",
      action: {
        label: "Listen Now",
        onClick: () => console.log("Open podcast"),
      },
    },
    {
      title: "Parent Meet Scheduled",
      description: "Join us for a parent-student meetup this weekend.",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      badge: "Event",
      action: {
        label: "View Details",
        onClick: () => console.log("View parent meet"),
      },
    },
    {
      title: "New Feature: AI Coach",
      description: "Get instant help with your coding questions using our AI-powered coach.",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      badge: "New",
      action: {
        label: "Try Now",
        onClick: () => navigate("/lms/student/discussions"),
      },
    },
    {
      title: "New Internship Opportunities",
      description: "Check out the latest internship openings from top companies.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      badge: "Internships",
      action: {
        label: "Explore",
        onClick: () => navigate("/lms/student/internships"),
      },
    },
  ];

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Welcome, {user?.full_name || user?.name || "Student"} 👋
          </h1>
          <p className="text-slate-600 text-lg">Continue your learning journey today</p>
        </motion.div>

        {/* Banner Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <BannerCarousel items={bannerItems} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Schedule Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border-2 border-cyan-200/50 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg text-white">
                    <FiCalendar className="w-5 h-5" />
                  </div>
                  Your Schedule
                </h2>
                <select
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(Number(e.target.value))}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-sm font-semibold text-cyan-700"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
                    <option key={week} value={week}>
                      Week {week}
                    </option>
                  ))}
                </select>
              </div>

              {schedule.length === 0 ? (
                <div className="text-center py-12">
                  <FiCalendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No scheduled items for this week</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md border-2 border-cyan-200/50 hover:border-cyan-400 hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-md bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                        <FiBookOpen className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.module} • {item.lesson}</p>
                      </div>
                      <div className="text-sm font-medium text-cyan-600">
                        <FiClock className="w-4 h-4 inline mr-1" />
                        {item.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Continue Learning Card */}
            {currentCourse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-lg p-8 text-white shadow-2xl shadow-blue-500/30"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Continue Learning</h2>
                    <p className="text-cyan-100">Pick up where you left off</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-md backdrop-blur-sm">
                    <FiPlay className="w-8 h-8" />
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-1">{currentCourse.courseName}</h3>
                  <p className="text-cyan-100">{currentCourse.moduleName}</p>
                  <div className="mt-4 w-full bg-white/30 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-white rounded-full h-3 transition-all duration-500 shadow-md"
                      style={{ width: `${currentCourse.progress || 0}%` }}
                    />
                  </div>
                  <p className="text-sm text-cyan-100 mt-2 font-medium">{currentCourse.progress || 0}% Complete</p>
                </div>
                <button
                  onClick={() => navigate(`/lms/student/courses/${currentCourse.courseSlug}/modules/${currentCourse.moduleSlug}/lessons/${currentCourse.lessonSlug}`)}
                  className="w-full px-6 py-4 bg-white text-cyan-600 font-bold rounded-md hover:bg-cyan-50 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
                >
                  <FiPlay className="w-5 h-5" />
                  Resume Learning
                </button>
              </motion.div>
            )}
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            {/* Events Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-indigo-200/50 shadow-lg"
            >
              <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg text-white">
                  <FiCalendar className="w-4 h-4" />
                </div>
                Upcoming Events
              </h3>
              {events.length === 0 ? (
                <p className="text-sm text-slate-600">No upcoming events</p>
              ) : (
                <div className="space-y-3">
                  {events.slice(0, 3).map((event, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200/50 hover:shadow-md transition-all">
                      <p className="font-semibold text-slate-800 text-sm">{event.title}</p>
                      <p className="text-xs text-indigo-600 mt-1 font-medium">{event.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Learning Consistency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-md p-6 border-2 border-emerald-200/50 shadow-lg"
            >
              <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg text-white">
                  <FiTrendingUp className="w-4 h-4" />
                </div>
                Learning Consistency
              </h3>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">{progress.consistency || 85}%</div>
                <p className="text-sm text-slate-600 font-medium">This month</p>
              </div>
            </motion.div>

            {/* Monthly Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FiBarChart2 className="w-5 h-5 text-purple-600" />
                Monthly Tracker
              </h3>
              <div className="grid grid-cols-7 gap-1">
                {monthlyTracker.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded ${
                      day.completed ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                    title={`Day ${day.day}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Your Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-md p-6 text-white shadow-xl"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FiTarget className="w-4 h-4" />
                </div>
                Your Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-purple-100 font-medium">Completed</span>
                    <span className="text-xl font-bold">{progress.completed || 0}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-white rounded-full h-3 transition-all duration-500 shadow-md"
                      style={{ width: `${progress.completed || 0}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/30">
                  <div className="flex items-center gap-2">
                    <FiZap className="w-4 h-4" />
                    <span className="text-sm font-medium">Streak</span>
                  </div>
                  <span className="text-2xl font-bold">{progress.streak || 0} days</span>
                </div>
              </div>
            </motion.div>

            {/* Coach Chat Quick Launcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 shadow-lg"
            >
              <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg text-white">
                  <FiMessageSquare className="w-4 h-4" />
                </div>
                AI Coach
              </h3>
              <p className="text-sm text-slate-600 mb-4">Get instant help with your questions</p>
              <button
                onClick={() => navigate("/lms/student/discussions")}
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <FiMessageSquare className="w-4 h-4" />
                Chat with Coach
              </button>
            </motion.div>

            {/* Product Tour CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-md p-6 text-white shadow-xl"
            >
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FiVideo className="w-4 h-4" />
                </div>
                Product Tour
              </h3>
              <p className="text-sm text-amber-100 mb-4">Learn how to make the most of your learning platform</p>
              <button
                onClick={() => console.log("Start product tour")}
                className="w-full px-4 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all shadow-md hover:shadow-lg"
              >
                Watch Tour
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
