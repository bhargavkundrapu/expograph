import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { getProgressSummary } from "../../../features/progress/progressApi";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
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
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

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

  const quickLinks = [
    {
      icon: FaBook,
      title: "Browse Courses",
      desc: "Explore all available courses",
      to: "/lms/student/courses",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: FaChartLine,
      title: "View Progress",
      desc: "Track your learning journey",
      to: "/lms/student/progress",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: FaFileAlt,
      title: "My Submissions",
      desc: "Check mentor feedback",
      to: "/lms/student/submissions",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: FaCertificate,
      title: "Certificates",
      desc: "View and verify certificates",
      to: "/lms/student/certificates",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: FaBriefcase,
      title: "Internships",
      desc: "Browse micro-internship projects",
      to: "/lms/student/internships",
      color: "from-indigo-400 to-purple-500",
    },
    {
      icon: FaLaptopCode,
      title: "Client Lab",
      desc: "Real-world project experience",
      to: "/lms/student/client-lab",
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: FaGraduationCap,
      title: "Workshops",
      desc: "Register for workshops",
      to: "/lms/student/workshops",
      color: "from-teal-400 to-cyan-500",
    },
    {
      icon: FaGift,
      title: "Referrals",
      desc: "Share and earn rewards",
      to: "/lms/student/referrals",
      color: "from-yellow-400 to-amber-500",
    },
  ];

  if (loading) {
    return (
      <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <div className="layout-grid-3 gap-lg">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
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
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
              <FaRocket className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Student Portal</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Welcome to your learning dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {summary && (
        <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
          <Card variant="elevated" className="p-6 animate-fadeIn" style={{ animationDelay: '0.1s', width: '100%', boxSizing: 'border-box' }}>
            <div className="layout-flex items-center gap-md">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg">
                <FaCheckCircle className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{completed_lessons}</div>
                <div className="text-sm text-gray-400" style={{ margin: 0 }}>Completed Lessons</div>
              </div>
            </div>
          </Card>

          <Card variant="elevated" className="p-6 animate-fadeIn" style={{ animationDelay: '0.2s', width: '100%', boxSizing: 'border-box' }}>
            <div className="layout-flex items-center gap-md">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
                <FaPlayCircle className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{in_progress_lessons}</div>
                <div className="text-sm text-gray-400" style={{ margin: 0 }}>In Progress</div>
              </div>
            </div>
          </Card>

          <Card variant="elevated" className="p-6 animate-fadeIn" style={{ animationDelay: '0.3s', width: '100%', boxSizing: 'border-box' }}>
            <div className="layout-flex items-center gap-md">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg">
                <FaClock className="text-white text-xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{formatWatchTime(total_watch_seconds)}</div>
                <div className="text-sm text-gray-400" style={{ margin: 0 }}>Watch Time</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Overall Progress */}
      {summary && totalLessons > 0 && (
        <Card variant="gradient" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="layout-flex items-center justify-between" style={{ marginBottom: '1rem' }}>
            <div className="layout-flex items-center gap-md">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30">
                <FaChartLine className="text-white text-xl" />
              </div>
              <div>
                <div className="text-xl font-bold section-title" style={{ margin: 0 }}>Overall Progress</div>
                <div className="text-sm text-gray-400" style={{ marginTop: '0.25rem' }}>Your learning journey</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white" style={{ margin: 0 }}>{completionRate}%</div>
              <div className="text-xs text-gray-400" style={{ margin: 0 }}>{completed_lessons}/{totalLessons} completed</div>
            </div>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800 border border-gray-700">
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

      {/* Quick Actions Grid */}
      <div>
        <div className="layout-flex items-center gap-md mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
            <FaRocket className="text-blue-400 text-xl" />
          </div>
          <h2 className="section-title text-3xl" style={{ margin: 0 }}>Quick Actions</h2>
        </div>

        <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
          {quickLinks.map((link, idx) => (
            <Link key={link.title} to={link.to} style={{ width: '100%', display: 'block' }}>
              <Card 
                variant="elevated" 
                className="group animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s`, height: '100%', width: '100%', boxSizing: 'border-box' }}
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${link.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className="text-white text-2xl" />
                </div>
                <CardTitle className="text-xl" style={{ marginBottom: '0.5rem' }}>{link.title}</CardTitle>
                <CardDescription className="text-gray-400" style={{ margin: 0 }}>
                  {link.desc}
                </CardDescription>
                <div className="layout-flex items-center gap-2 mt-4 text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span>Explore</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
