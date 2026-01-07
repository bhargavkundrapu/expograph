import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { getProgressSummary } from "../../../features/progress/progressApi";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaBook, 
  FaChartLine, 
  FaFileAlt, 
  FaRocket,
  FaCertificate,
  FaBriefcase,
  FaLaptopCode,
  FaGift,
  FaGraduationCap,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaPlayCircle,
  FaClock
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

export default function StudentHome() {
  const { token } = useAuth();
  const { isEnabled, flags, loading: flagsLoading } = useFeatureFlags();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

  // Debug: Log feature flags
  useEffect(() => {
    if (!flagsLoading) {
      console.log("🔍 Feature Flags:", flags);
      console.log("🔍 micro_internships enabled:", isEnabled("micro_internships"));
      console.log("🔍 internships enabled:", isEnabled("internships"));
    }
  }, [flags, flagsLoading, isEnabled]);

  async function loadSummary(signal) {
    try {
      const data = await getProgressSummary({ token, signal });
      if (alive.current) setSummary(data);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load summary");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadSummary(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

  // Build quick links - all controlled by feature flags
  const quickLinks = [];
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_COURSES)) {
    quickLinks.push({
      icon: FaBook,
      title: "Browse Courses",
      desc: "Explore all available courses",
      to: "/lms/student/courses",
      color: "bg-green-600",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_PROGRESS)) {
    quickLinks.push({
      icon: FaChartLine,
      title: "View Progress",
      desc: "Track your learning journey",
      to: "/lms/student/progress",
      color: "bg-green-600",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_SUBMISSIONS)) {
    quickLinks.push({
      icon: FaFileAlt,
      title: "My Submissions",
      desc: "Check mentor feedback",
      to: "/lms/student/submissions",
      color: "bg-green-600",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CERTIFICATES)) {
    quickLinks.push({
      icon: FaCertificate,
      title: "Certificates",
      desc: "View and verify certificates",
      to: "/lms/student/certificates",
      color: "bg-green-600",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_INTERNSHIPS, "micro_internships", "internships", "micro_internship")) {
    quickLinks.push({
      icon: FaBriefcase,
      title: "Internships",
      desc: "Browse micro-internship projects",
      to: "/lms/student/internships",
      color: "bg-green-600",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CLIENT_LAB)) {
    quickLinks.push({
      icon: FaLaptopCode,
      title: "Client Lab",
      desc: "Real-world project experience",
      to: "/lms/student/client-lab",
      color: "bg-green-600",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_WORKSHOPS)) {
    quickLinks.push({
      icon: FaGraduationCap,
      title: "Workshops",
      desc: "Register for workshops",
      to: "/lms/student/workshops",
      color: "bg-green-600",
    });
  }
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_REFERRALS)) {
    quickLinks.push({
      icon: FaGift,
      title: "Referrals",
      desc: "Share and earn rewards",
      to: "/lms/student/referrals",
      color: "bg-green-600",
    });
  }

  if (loading) {
    return (
      <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-24 sm:h-32 w-full mb-4 sm:mb-6" />
        <div className="layout-grid-3 gap-4 sm:gap-lg">
          <Skeleton className="h-40 sm:h-48" />
          <Skeleton className="h-40 sm:h-48" />
          <Skeleton className="h-40 sm:h-48" />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Dashboard" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadSummary(ac.signal);
        }} 
      />
    );
  }

  const { completed_lessons = 0, in_progress_lessons = 0, total_watch_seconds = 0 } = summary || {};
  const totalLessons = completed_lessons + in_progress_lessons;
  const completionRate = totalLessons > 0 ? Math.round((completed_lessons / totalLessons) * 100) : 0;

  return (
    <div className="layout-flex-col gap-6 sm:gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-xl sm:rounded-2xl bg-green-50 border border-green-200 p-6 sm:p-10 shadow-soft" style={{ marginBottom: '1rem sm:2rem' }}>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-md" style={{ marginBottom: '1rem sm:1.5rem' }}>
            <div className="p-3 sm:p-4 rounded-xl bg-green-600 shadow-medium">
              <FaRocket className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-2xl sm:text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Student Portal</h1>
              <p className="text-gray-600 text-base sm:text-lg" style={{ margin: 0 }}>Welcome to your learning dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {summary && (
        <div className="layout-grid-3 gap-4 sm:gap-lg" style={{ width: '100%' }}>
          <Card variant="elevated" className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s', width: '100%', boxSizing: 'border-box' }}>
            <div className="layout-flex items-center gap-3 sm:gap-md">
              <div className="p-2 sm:p-3 rounded-xl bg-green-600 shadow-medium">
                <FaCheckCircle className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900" style={{ margin: 0 }}>{completed_lessons}</div>
                <div className="text-xs sm:text-sm text-gray-600" style={{ margin: 0 }}>Completed Lessons</div>
              </div>
            </div>
          </Card>

          <Card variant="elevated" className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s', width: '100%', boxSizing: 'border-box' }}>
            <div className="layout-flex items-center gap-3 sm:gap-md">
              <div className="p-2 sm:p-3 rounded-xl bg-green-600 shadow-medium">
                <FaPlayCircle className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900" style={{ margin: 0 }}>{in_progress_lessons}</div>
                <div className="text-xs sm:text-sm text-gray-600" style={{ margin: 0 }}>In Progress</div>
              </div>
            </div>
          </Card>

          <Card variant="elevated" className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s', width: '100%', boxSizing: 'border-box' }}>
            <div className="layout-flex items-center gap-3 sm:gap-md">
              <div className="p-2 sm:p-3 rounded-xl bg-green-600 shadow-medium">
                <FaClock className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900" style={{ margin: 0 }}>{formatWatchTime(total_watch_seconds)}</div>
                <div className="text-xs sm:text-sm text-gray-600" style={{ margin: 0 }}>Watch Time</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Overall Progress */}
      {summary && totalLessons > 0 && (
        <Card variant="gradient" className="p-4 sm:p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="layout-flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0" style={{ marginBottom: '1rem' }}>
            <div className="layout-flex items-center gap-3 sm:gap-md">
              <div className="p-2 sm:p-3 rounded-xl bg-green-600 shadow-medium">
                <FaChartLine className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold section-title" style={{ margin: 0 }}>Overall Progress</div>
                <div className="text-xs sm:text-sm text-gray-600" style={{ marginTop: '0.25rem' }}>Your learning journey</div>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-green-700" style={{ margin: 0 }}>{completionRate}%</div>
              <div className="text-xs text-gray-600" style={{ margin: 0 }}>{completed_lessons}/{totalLessons} completed</div>
            </div>
          </div>

          <div className="h-2 sm:h-3 w-full overflow-hidden rounded-full bg-green-100 border border-green-200">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-1000 ease-out shadow-medium"
              style={{ width: `${completionRate || 0}%`, height: '100%' }}
            />
          </div>

          <div className="layout-flex items-center gap-2 text-xs text-gray-600" style={{ marginTop: '0.75rem sm:1rem' }}>
            <HiSparkles className="text-green-600" />
            <span>Keep going! Every lesson completed brings you closer to mastery 🚀</span>
          </div>
        </Card>
      )}

      {/* Quick Actions Grid */}
      <div>
        <div className="layout-flex items-center gap-3 sm:gap-md mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 rounded-xl bg-green-50 border border-green-200">
            <FaRocket className="text-green-600 text-lg sm:text-xl" />
          </div>
          <h2 className="section-title text-2xl sm:text-3xl" style={{ margin: 0 }}>Quick Actions</h2>
        </div>

        <div className="layout-grid-3 gap-4 sm:gap-lg" style={{ width: '100%' }}>
          {quickLinks.map((link, idx) => (
            <Link key={link.title} to={link.to} style={{ width: '100%', display: 'block' }}>
              <Card 
                variant="elevated" 
                className="animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s`, height: '100%', width: '100%', boxSizing: 'border-box' }}
              >
                <div className={`p-3 sm:p-4 rounded-xl ${link.color} w-fit mb-3 sm:mb-4 shadow-medium`}>
                  <link.icon className="text-white text-xl sm:text-2xl" />
                </div>
                <CardTitle className="text-lg sm:text-xl" style={{ marginBottom: '0.5rem' }}>{link.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base" style={{ margin: 0 }}>
                  {link.desc}
                </CardDescription>
                <div className="layout-flex items-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm text-green-600">
                  <span>Explore</span>
                  <FaArrowRight className="text-xs" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
