import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapData, unwrapArray } from "../../../services/apiShape";
import { getProgressSummary } from "../../../features/progress/progressApi";
import { 
  FaChartLine, 
  FaCheckCircle, 
  FaPlayCircle, 
  FaClock, 
  FaBook, 
  FaArrowRight,
  FaTrophy,
  FaFire,
  FaGraduationCap,
  FaSpinner
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

function formatWatchTime(seconds) {
  if (!seconds || seconds === 0) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ProgressCard({ icon: Icon, title, value, subtitle, color, delay = 0 }) {
  return (
    <Card 
      variant="elevated" 
      className="animate-fadeIn"
      style={{ animationDelay: `${delay}s`, width: '100%', boxSizing: 'border-box' }}
    >
      <div className="layout-flex items-center gap-md" style={{ marginBottom: '1rem' }}>
        <div className={`p-4 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
          <Icon className="text-white text-2xl" />
        </div>
        <div style={{ flex: 1 }}>
          <CardTitle className="text-lg" style={{ marginBottom: '0.25rem' }}>{title}</CardTitle>
          <div className="text-3xl font-bold text-white" style={{ margin: 0 }}>{value}</div>
          {subtitle && (
            <div className="text-sm text-gray-400 mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </Card>
  );
}

function CourseProgressCard({ course, progress, delay = 0 }) {
  const { total, completed, percent } = progress || { total: 0, completed: 0, percent: 0 };
  
  return (
    <Card 
      variant="elevated" 
      className="group animate-fadeIn"
      style={{ animationDelay: `${delay}s`, width: '100%', boxSizing: 'border-box' }}
    >
      <div className="layout-flex items-start justify-between gap-md" style={{ marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div className="layout-flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
              <FaBook className="text-blue-400" />
            </div>
            <CardTitle className="text-xl" style={{ margin: 0 }}>{course.title}</CardTitle>
          </div>
          {course.description && (
            <CardDescription className="text-clamp-2" style={{ marginTop: '0.5rem' }}>
              {course.description}
            </CardDescription>
          )}
        </div>
      </div>

      <div className="layout-flex items-center justify-between gap-md mb-4">
        <div className="text-sm text-gray-400">
          <span className="text-white font-semibold">{completed}</span> of <span className="text-white font-semibold">{total}</span> lessons completed
        </div>
        <div className="text-lg font-bold text-cyan-400">{percent}%</div>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800 border border-gray-700">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-cyan-500/50"
          style={{ width: `${percent || 0}%`, height: '100%' }}
        />
      </div>

      <Link
        to={`/lms/student/courses/${course.slug}`}
        className="layout-flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white hover:border-cyan-400 hover:bg-gray-800 transition-all duration-300 text-sm font-semibold"
      >
        <span>View Course</span>
        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
      </Link>
    </Card>
  );
}

export default function StudentProgress() {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseProgresses, setCourseProgresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

  async function loadSummary(signal) {
    try {
      const data = await getProgressSummary({ token, signal });
      if (alive.current) setSummary(data);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load progress summary");
    }
  }

  async function loadCourses(signal) {
    try {
      const json = await apiFetch("/api/v1/courses", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setCourses(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load courses:", e);
    }
  }

  async function loadCourseProgress(courseSlug, signal) {
    try {
      const json = await apiFetch(`/api/v1/lms/courses/${courseSlug}/progress`, { token, signal });
      const data = unwrapData(json);
      if (alive.current && data) {
        setCourseProgresses(prev => ({ ...prev, [courseSlug]: data }));
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error(`Failed to load progress for ${courseSlug}:`, e);
    }
  }

  async function loadEverything(signal) {
    setErr("");
    setLoading(true);
    
    try {
      await Promise.all([
        loadSummary(signal),
        loadCourses(signal),
      ]);
      
      // Load progress for each course
      const json = await apiFetch("/api/v1/courses", { token, signal });
      const courseList = unwrapArray(json);
      if (courseList && courseList.length > 0) {
        await Promise.all(
          courseList.map(course => loadCourseProgress(course.slug, signal))
        );
      }
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load progress data");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadEverything(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

  if (loading) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <div className="layout-grid-3 gap-lg">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Progress" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadEverything(ac.signal);
        }} 
      />
    );
  }

  const { completed_lessons = 0, in_progress_lessons = 0, total_watch_seconds = 0 } = summary || {};
  const totalLessons = completed_lessons + in_progress_lessons;
  const completionRate = totalLessons > 0 ? Math.round((completed_lessons / totalLessons) * 100) : 0;

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
              <FaChartLine className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>My Progress</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Track your learning journey and achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
        <ProgressCard
          icon={FaCheckCircle}
          title="Completed Lessons"
          value={completed_lessons}
          subtitle={`${completionRate}% completion rate`}
          color="from-emerald-400 to-teal-500"
          delay={0.1}
        />
        <ProgressCard
          icon={FaPlayCircle}
          title="In Progress"
          value={in_progress_lessons}
          subtitle="Lessons started"
          color="from-cyan-400 to-blue-500"
          delay={0.2}
        />
        <ProgressCard
          icon={FaClock}
          title="Watch Time"
          value={formatWatchTime(total_watch_seconds)}
          subtitle="Total learning time"
          color="from-purple-400 to-pink-500"
          delay={0.3}
        />
      </div>

      {/* Overall Progress Bar */}
      {totalLessons > 0 && (
        <Card variant="gradient" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="layout-flex items-center justify-between" style={{ marginBottom: '1rem' }}>
            <div className="layout-flex items-center gap-md">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
                <FaTrophy className="text-white text-xl" />
              </div>
              <div>
                <div className="text-xl font-bold section-title" style={{ margin: 0 }}>Overall Progress</div>
                <div className="text-sm text-gray-400" style={{ marginTop: '0.25rem' }}>Your learning journey overview</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white" style={{ margin: 0 }}>{completionRate}%</div>
              <div className="text-xs text-gray-400" style={{ margin: 0 }}>{completed_lessons}/{totalLessons} completed</div>
            </div>
          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800 border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-amber-500/50"
              style={{ width: `${completionRate || 0}%`, height: '100%' }}
            />
          </div>

          <div className="layout-flex items-center gap-2 text-xs text-gray-400" style={{ marginTop: '1rem' }}>
            <HiSparkles className="text-amber-400 animate-pulse-slow" />
            <span>Keep going! Every lesson completed brings you closer to mastery 🚀</span>
          </div>
        </Card>
      )}

      {/* Course Progress Breakdown */}
      <div>
        <div className="layout-flex items-center gap-md mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
            <FaGraduationCap className="text-blue-400 text-xl" />
          </div>
          <div>
            <h2 className="section-title text-3xl" style={{ margin: 0 }}>Course Progress</h2>
            <p className="text-gray-400 text-lg" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
              Track your progress across all courses
            </p>
          </div>
        </div>

        {courses.length === 0 ? (
          <Card variant="elevated" className="p-12 text-center">
            <div className="inline-block p-6 rounded-full bg-gray-900 border border-gray-800 mb-6">
              <FaBook className="text-4xl text-gray-600" />
            </div>
            <CardTitle className="text-2xl mb-3">No Courses Yet</CardTitle>
            <CardDescription className="text-lg mb-6">
              Start your learning journey by enrolling in a course
            </CardDescription>
            <Link
              to="/lms/student/courses"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Browse Courses
              <FaArrowRight />
            </Link>
          </Card>
        ) : (
          <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
            {courses.map((course, idx) => (
              <CourseProgressCard
                key={course.id}
                course={course}
                progress={courseProgresses[course.slug]}
                delay={idx * 0.1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-center gap-md mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30">
            <FaFire className="text-emerald-400 text-xl" />
          </div>
          <CardTitle className="text-2xl" style={{ margin: 0 }}>Quick Actions</CardTitle>
        </div>

        <div className="layout-grid-3 gap-md">
          <Link
            to="/lms/student/courses"
            className="layout-flex items-center gap-3 p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-cyan-400 hover:bg-gray-800 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
              <FaBook className="text-cyan-400" />
            </div>
            <div>
              <div className="font-semibold text-white">Browse Courses</div>
              <div className="text-xs text-gray-500">Explore all courses</div>
            </div>
            <FaArrowRight className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all ml-auto" />
          </Link>

          <Link
            to="/lms/student/submissions"
            className="layout-flex items-center gap-3 p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-purple-400 hover:bg-gray-800 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
              <FaCheckCircle className="text-purple-400" />
            </div>
            <div>
              <div className="font-semibold text-white">My Submissions</div>
              <div className="text-xs text-gray-500">View mentor feedback</div>
            </div>
            <FaArrowRight className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all ml-auto" />
          </Link>

          <Link
            to="/lms/student"
            className="layout-flex items-center gap-3 p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-emerald-400 hover:bg-gray-800 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30">
              <FaChartLine className="text-emerald-400" />
            </div>
            <div>
              <div className="font-semibold text-white">Dashboard</div>
              <div className="text-xs text-gray-500">Back to home</div>
            </div>
            <FaArrowRight className="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all ml-auto" />
          </Link>
        </div>
      </Card>
    </div>
  );
}

