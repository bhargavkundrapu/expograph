import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { useDashboardPrefs } from "../../../app/providers/DashboardPrefsProvider";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { apiFetch } from "../../../services/api";
import { StudentHomeSkeleton } from "../../../Components/common/SkeletonLoaders";
import WorkshopCarousel from "../../../Components/dashboard/WorkshopCarousel";
import DashboardCustomizer from "../../../Components/student/DashboardCustomizer";
import PageTransition from "../../../Components/common/PageTransition";
import DailyMotivation from "../../../Components/student/gamification/DailyMotivation";
import DailyChallenge from "../../../Components/student/gamification/DailyChallenge";
import { AchievementToast } from "../../../Components/student/gamification/AchievementBadges";
import ContinueBanner from "../../../Components/student/gamification/ContinueBanner";
import { ConfettiBurst, MilestoneCelebration } from "../../../Components/student/gamification/Confetti";
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
  FiSliders,
} from "react-icons/fi";

function EventsWidget({ isDark, events, navigate }) {
  return (
    <div className={`rounded-lg shadow-sm p-4 sm:p-6 hover-lift transition-colors ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className={`text-lg sm:text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Events</h3>
        <button
          onClick={() => navigate("/lms/student/workshops")}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm"
        >
          View
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
      <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>Challenges, podcasts & a lot more activities!</p>
      {events.length === 0 ? (
        <p className={`text-xs sm:text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>No upcoming events</p>
      ) : (
        <div className="space-y-3">
          {events.slice(0, 3).map((ev) => (
            <button
              key={ev.id}
              onClick={() => navigate(`/lms/student/workshops/${ev.id}/details`)}
              className={`w-full text-left flex items-center justify-between gap-2 p-2 rounded-lg transition-colors group ${isDark ? "hover:bg-slate-700/50" : "hover:bg-slate-50"}`}
            >
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium truncate group-hover:text-purple-600 ${isDark ? "text-white" : "text-slate-900"}`}>
                  {ev.title}
                </p>
                <p className={`text-[10px] sm:text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{ev.date}</p>
              </div>
              {ev.isLive && (
                <span className="flex items-center gap-1 shrink-0 text-xs font-medium text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Live
                </span>
              )}
              <FiChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </button>
          ))}
          {events.length > 3 && (
            <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>+{events.length - 3} more</p>
          )}
        </div>
      )}
    </div>
  );
}

function ProgressWidget({ isDark, progress, schedule, accentColor, gamification }) {
  const ringColor = accentColor || "#f59e0b";
  const { currentStreak, totalXP, currentLevel, levelProgress, weeklyXP, weeklyXPGoal } = gamification;
  const weeklyPct = Math.min(100, Math.round((weeklyXP / weeklyXPGoal) * 100));

  return (
    <div className={`rounded-lg shadow-sm p-4 sm:p-6 hover-lift transition-colors ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <h3 className={`text-lg sm:text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Your Progress</h3>
        </div>
      </div>

      {/* Streak / XP / Level row */}
      <div className={`flex items-center gap-3 flex-wrap mb-4 pb-3 border-b ${isDark ? "border-slate-700/50" : "border-slate-100"}`}>
        <div className="flex items-center gap-1.5" title={`${currentStreak}-day streak`}>
          <span className="text-sm">🔥</span>
          <span className={`text-xs font-bold ${isDark ? "text-orange-400" : "text-orange-600"}`}>{currentStreak}d</span>
        </div>
        <div className="flex items-center gap-1.5" title={`${totalXP.toLocaleString()} XP — Level ${currentLevel.level}`}>
          <span className="text-sm">⚡</span>
          <span className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}>{totalXP.toLocaleString()} XP</span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isDark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}>
            Lv.{currentLevel.level}
          </span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto" title={`Weekly: ${weeklyXP}/${weeklyXPGoal} XP`}>
          <div className="relative w-5 h-5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="3" />
              <circle cx="12" cy="12" r="10" fill="none" stroke="#6366f1" strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 10}`}
                strokeDashoffset={`${2 * Math.PI * 10 * (1 - weeklyPct / 100)}`}
                strokeLinecap="round" />
            </svg>
          </div>
          <span className={`text-[10px] font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>{weeklyPct}% week</span>
        </div>
      </div>

      {/* Level progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className={isDark ? "text-slate-400" : "text-slate-500"}>Level {currentLevel.level} progress</span>
          <span className={`font-bold ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>{Math.round(levelProgress)}%</span>
        </div>
        <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700" style={{ width: `${levelProgress}%` }} />
        </div>
      </div>

      {/* Completion meter */}
      <div className="mb-4">
        <p className="text-xs sm:text-sm font-medium mb-2" style={{ color: ringColor }}>Completion Meter</p>
        <div className="flex items-center justify-between">
          <span className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{progress.completed ?? 0}%</span>
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0">
            <svg className="transform -rotate-90 w-full h-full">
              <circle cx="50%" cy="50%" r="42%" stroke={isDark ? "#334155" : "#e2e8f0"} strokeWidth="6" fill="none" />
              <circle cx="50%" cy="50%" r="42%" stroke={ringColor} strokeWidth="6" fill="none"
                strokeDasharray={`${2 * Math.PI * 0.42}`}
                strokeDashoffset={`${2 * Math.PI * 0.42 * (1 - ((progress.completed ?? 0) / 100))}`}
                strokeLinecap="round" style={{ transformOrigin: 'center' }} className="progress-bar-animated" />
            </svg>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("remaining-lessons")?.scrollIntoView({ behavior: "smooth" })}
        className={`w-full border rounded-lg p-3 sm:p-4 flex items-center justify-between text-left transition-colors btn-press ${isDark ? "bg-slate-700/50 hover:bg-slate-700 border-slate-600" : "bg-white hover:bg-slate-50 border-slate-200"}`}
      >
        <div className="flex-1 min-w-0">
          <p className={`text-xs sm:text-sm font-medium ${isDark ? "text-white" : "text-slate-900"}`}>
            Pending Units — {schedule.filter((item) => (item.progress || 0) < 100).length}
          </p>
          <p className={`text-[10px] sm:text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>View Remaining Lessons</p>
        </div>
        <FiChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ml-2 ${isDark ? "text-slate-400" : "text-slate-600"}`} />
      </button>
    </div>
  );
}

function ScheduleWidget({ isDark, schedule, currentCourse, navigate, animDelay: animationDelay = "200ms" }) {
  const remainingLessons = schedule.filter((item) => (item.progress || 0) < 100);

  const renderItem = (item, index, isLast) => {
    const prog = item.progress || 0;
    const isCompleted = prog === 100;
    const isInProgress = prog > 0 && prog < 100;
    const activityType = item.activityType || "LEARNING";
    const isPractice = activityType === "PRACTICE";

    return (
      <div key={item.id || index} className={`relative flex items-start gap-2 sm:gap-3 md:gap-4 group rounded-lg p-2 -m-2 transition-colors ${isDark ? "hover:bg-slate-700/50" : "hover:bg-slate-50"}`}>
        {!isLast && (
          <div className={`absolute left-[11px] sm:left-[13px] md:left-[15px] top-6 sm:top-7 md:top-8 w-0.5 ${isDark ? "bg-slate-600" : "bg-slate-200"}`} style={{ height: 'calc(100% + 1rem)' }}></div>
        )}
        <div className="relative z-10 flex-shrink-0 mt-0.5">
          {isCompleted ? (
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
            </div>
          ) : isInProgress ? (
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" stroke={isDark ? "#334155" : "#e5e7eb"} strokeWidth="3" fill={isDark ? "#1e293b" : "white"} />
                <circle cx="16" cy="16" r="14" stroke="#22c55e" strokeWidth="3" fill="none" strokeDasharray={`${2 * Math.PI * 14}`} strokeDashoffset={`${2 * Math.PI * 14 * (1 - prog / 100)}`} strokeLinecap="round" />
              </svg>
            </div>
          ) : (
            <div className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 border-2 rounded-full ${isDark ? "border-slate-500 bg-slate-700" : "border-slate-300 bg-white"}`}></div>
          )}
        </div>
        <div
          className="flex-1 pt-0.5 sm:pt-1 min-w-0 cursor-pointer"
          onClick={() => {
            if (item.courseSlug && item.moduleSlug && item.lessonSlug) {
              navigate(`/lms/student/courses/${item.courseSlug}/modules/${item.moduleSlug}/lessons/${item.lessonSlug}`);
            } else if (item.courseSlug) {
              navigate("/lms/student/courses");
            } else if (item.link) {
              navigate(item.link);
            }
          }}
        >
          <div className="flex items-start justify-between mb-1 sm:mb-2 gap-2">
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-sm sm:text-base mb-1 break-words hover:text-blue-600 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
                {item.title || item.name || "Lesson"}
                {isInProgress && item.total && (
                  <span className={`font-normal ${isDark ? "text-slate-400" : "text-slate-600"}`}> ({item.completed || Math.round(prog / 100 * item.total)}/{item.total})</span>
                )}
              </h3>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {activityType && (
                  <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium text-white ${isPractice ? "bg-orange-500" : "bg-teal-500"}`}>
                    {isPractice ? <><FiCheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{activityType}</> : <><FiBookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{activityType}</>}
                  </span>
                )}
                {item.duration && !/^0\s/i.test(String(item.duration).trim()) && (
                  <div className={`flex items-center gap-1 text-[10px] sm:text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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
  };

  return (
    <div className={`rounded-lg shadow-sm overflow-hidden hover-glow animate-fade-slide-up ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white"}`} id="remaining-lessons" style={{ animationDelay }}>
      <div className="relative overflow-hidden px-4 sm:px-6 py-4 sm:py-5" style={{ background: "#0b0f27" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 -top-16 w-48 h-48 bg-purple-500/60 rounded-full blur-3xl" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/50 rounded-full blur-2xl" />
        </div>
        <p className="relative z-10 text-white/80 text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1 uppercase tracking-wider">
          {currentCourse?.courseName ? currentCourse.courseName : schedule[0]?.courseName || "Your Schedule"}
        </p>
        <h2 className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-white">
          {currentCourse?.moduleName || schedule[0]?.moduleName || schedule[0]?.title || "Continue Learning"}
        </h2>
      </div>
      <div className="p-4 sm:p-6">
        {remainingLessons.length === 0 ? (
          <div className="text-center py-12">
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className={isDark ? "text-slate-400" : "text-slate-600"}>All caught up! No remaining lessons.</p>
          </div>
        ) : (
          <div className="relative pl-1 sm:pl-2">
            <p className={`text-xs mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Remaining lessons to complete ({remainingLessons.length})</p>
            <div className="space-y-4 sm:space-y-6 pr-2 overflow-y-auto overflow-x-hidden rounded-lg max-h-[min(55vh,420px)]">
              {remainingLessons.map((item, index) => renderItem(item, index, index === remainingLessons.length - 1))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudentHome() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { isDark, accent } = useTheme();
  const { widgets, sidebarWidgets } = useDashboardPrefs();
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [schedule, setSchedule] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [progress, setProgress] = useState({ completed: 0, streak: 0, consistency: 0 });
  const [events, setEvents] = useState([]);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const gamification = useGamification();
  const { setLastContinue, milestoneCelebrated, celebrateMilestone } = gamification;
  const [milestonePopup, setMilestonePopup] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const mainWidgetIds = widgets.filter(w => w.visible).map(w => w.id);
  const sideWidgetIds = sidebarWidgets.filter(w => w.visible && w.id !== "achievements" && w.id !== "leaderboard").map(w => w.id);

  useEffect(() => {
    if (!token) return;
    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [scheduleRes, courseRes, progressRes, eventsRes] = await Promise.all([
        apiFetch("/api/v1/student/schedule", { token }).catch(() => ({ data: [] })),
        apiFetch("/api/v1/student/current-course", { token }).catch(() => ({ data: null })),
        apiFetch("/api/v1/student/progress", { token }).catch(() => ({ data: { completed: 0, streak: 0, consistency: 0 } })),
        apiFetch("/api/v1/student/events", { token }).catch(() => ({ data: [] })),
      ]);
      const scheduleData = scheduleRes?.data || [];
      if (scheduleData.length === 0 && courseRes?.data) {
        const course = courseRes.data;
        setSchedule([{
          id: `schedule-1`,
          title: course.moduleName || "Continue Learning",
          courseSlug: course.courseSlug || course.slug,
          moduleSlug: course.moduleSlug,
          lessonSlug: course.lessonSlug || course.nextLessonSlug,
          progress: course.progress || 0,
          completed: course.completedLessons || 0,
          total: course.totalLessons || 0,
          activityType: "LEARNING",
          duration: course.duration || "30 Mins",
        }]);
      } else {
        setSchedule(scheduleData);
      }
      const courseData = courseRes?.data || null;
      const progressData = progressRes?.data || { completed: 0, streak: 0, consistency: 0 };
      setCurrentCourse(courseData);
      setProgress(progressData);
      setEvents(eventsRes?.data || []);
      if (courseData) setLastContinue(courseData);
      const pct = progressData.completed ?? 0;
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m && !milestoneCelebrated[`progress_${m}`]) {
          setMilestonePopup(m);
          setShowConfetti(true);
          celebrateMilestone(`progress_${m}`);
          break;
        }
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const workshopItems = [
    { logo: "make", title: "AI WORKFLOWS & AUTOMATION WORKSHOP USING MAKE.COM", description: "Build AI projects that boost your portfolio!", isLive: true, action: { label: "Join Now", onClick: () => navigate("/lms/student/workshops") } },
    { logo: "make", title: "ADVANCED REACT PATTERNS WORKSHOP", description: "Master React best practices and advanced techniques.", isLive: false, action: { label: "Join Now", onClick: () => navigate("/lms/student/workshops") } },
    { logo: "make", title: "FULL-STACK DEVELOPMENT BOOTCAMP", description: "Build complete web applications from scratch.", isLive: false, action: { label: "Join Now", onClick: () => navigate("/lms/student/workshops") } },
  ];

  if (loading) return <StudentHomeSkeleton />;

  const userName = user?.fullName || user?.full_name || user?.name || "Student";

  const renderMainWidget = (id, delay) => {
    switch (id) {
      case "schedule":
        return <ScheduleWidget key="schedule" isDark={isDark} schedule={schedule} currentCourse={currentCourse} navigate={navigate} animDelay={delay} />;
      default:
        return null;
    }
  };

  const renderSideWidget = (id) => {
    switch (id) {
      case "events": return <EventsWidget key="events" isDark={isDark} events={events} navigate={navigate} />;
      case "dailyChallenge": return <DailyChallenge key="dailyChallenge" />;
      case "progress": return <ProgressWidget key="progress" isDark={isDark} progress={progress} schedule={schedule} accentColor={accent.value} gamification={gamification} />;
      default: return null;
    }
  };

  return (
    <PageTransition>
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
      <ConfettiBurst active={showConfetti} onDone={() => setShowConfetti(false)} />
      <AchievementToast />
      {milestonePopup && (
        <MilestoneCelebration percent={milestonePopup} courseName={currentCourse?.courseName} onClose={() => setMilestonePopup(null)} />
      )}

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 px-4 sm:px-6 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 space-y-4 lg:space-y-5">
          {/* Carousel above greeting */}
          <WorkshopCarousel items={workshopItems} />

          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <DailyMotivation
                userName={userName}
                onGoToLesson={currentCourse?.courseSlug && currentCourse?.moduleSlug && currentCourse?.lessonSlug
                  ? () => navigate(`/lms/student/courses/${currentCourse.courseSlug}/modules/${currentCourse.moduleSlug}/lessons/${currentCourse.lessonSlug}`)
                  : schedule?.[0]?.courseSlug
                    ? () => navigate(`/lms/student/courses/${schedule[0].courseSlug}/modules/${schedule[0].moduleSlug}/lessons/${schedule[0].lessonSlug}`)
                    : () => navigate("/lms/student/courses")
                }
              />
            </div>
            <button
              onClick={() => setCustomizerOpen(true)}
              className={`flex-shrink-0 mt-2 p-2.5 rounded-xl border transition-all hover-lift btn-press ${isDark ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700" : "bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
              title="Customize dashboard"
            >
              <FiSliders className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <ContinueBanner currentCourse={currentCourse} schedule={schedule} />

          {/* Main widgets in order */}
          {mainWidgetIds.map((id, i) => renderMainWidget(id, `${(i + 1) * 80}ms`))}

          {/* Mobile: sidebar widgets stacked below */}
          <div className="lg:hidden space-y-4">
            {sideWidgetIds.map(id => renderSideWidget(id))}
          </div>
        </div>

        {/* Right Sidebar — desktop only */}
        <div className="hidden lg:block w-full lg:w-72 xl:w-80 2xl:w-96 flex-shrink-0 space-y-4 stagger-children">
          {sideWidgetIds.map(id => renderSideWidget(id))}
        </div>
      </div>

      <DashboardCustomizer open={customizerOpen} onClose={() => setCustomizerOpen(false)} />
    </div>
    </PageTransition>
  );
}
