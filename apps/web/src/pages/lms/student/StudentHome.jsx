import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { getProgressSummary } from "../../../features/progress/progressApi";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaBook, 
  FaChartLine, 
  FaFileAlt, 
  FaCertificate,
  FaBriefcase,
  FaLaptopCode,
  FaGift,
  FaGraduationCap,
  FaCheckCircle,
  FaPlayCircle,
  FaClock,
  FaSpinner
} from "react-icons/fa";
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
  const { token, user } = useAuth();
  const { isEnabled } = useFeatureFlags();
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
    }
  }

  async function loadEverything(signal) {
    setErr("");
    setLoading(true);
    try {
      await loadSummary(signal);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load dashboard");
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

  // Calculate stats
  const { completed_lessons = 0, in_progress_lessons = 0, total_watch_seconds = 0 } = summary || {};
  const totalLessons = completed_lessons + in_progress_lessons;
  const completionRate = totalLessons > 0 ? Math.round((completed_lessons / totalLessons) * 100) : 0;

  // Loading State
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-24" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  // Error State
  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Dashboard" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadEverything(ac.signal);
        }} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome {user?.full_name || user?.email?.split('@')[0] || 'Student'} 👏
        </h1>
        <p className="text-gray-600">Here's your learning dashboard</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="elevated">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <CardDescription>Completed Lessons</CardDescription>
                <CardTitle className="text-3xl mt-2">{completed_lessons || 0}</CardTitle>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-3xl mt-2">{in_progress_lessons || 0}</CardTitle>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <FaPlayCircle className="text-blue-600 text-2xl" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <CardDescription>Watch Time</CardDescription>
                <CardTitle className="text-2xl mt-2">{formatWatchTime(total_watch_seconds)}</CardTitle>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <FaClock className="text-purple-600 text-2xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card variant="elevated">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Overall Progress</CardTitle>
            <span className="text-2xl font-bold text-green-600">{completionRate}%</span>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <CardTitle className="mb-4">Quick Actions</CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_COURSES) && (
            <Link to="/lms/student/courses">
              <Card variant="outlined" className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="text-center py-6">
                  <FaBook className="text-green-600 text-3xl mx-auto mb-3" />
                  <CardTitle className="text-base">Browse Courses</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_PROGRESS) && (
            <Link to="/lms/student/progress">
              <Card variant="outlined" className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="text-center py-6">
                  <FaChartLine className="text-blue-600 text-3xl mx-auto mb-3" />
                  <CardTitle className="text-base">View Progress</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_SUBMISSIONS) && (
            <Link to="/lms/student/submissions">
              <Card variant="outlined" className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="text-center py-6">
                  <FaFileAlt className="text-purple-600 text-3xl mx-auto mb-3" />
                  <CardTitle className="text-base">My Submissions</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CERTIFICATES) && (
            <Link to="/lms/student/certificates">
              <Card variant="outlined" className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="text-center py-6">
                  <FaCertificate className="text-yellow-600 text-3xl mx-auto mb-3" />
                  <CardTitle className="text-base">Certificates</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_INTERNSHIPS) && (
            <Link to="/lms/student/internships">
              <Card variant="outlined" className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="text-center py-6">
                  <FaBriefcase className="text-indigo-600 text-3xl mx-auto mb-3" />
                  <CardTitle className="text-base">Internships</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CLIENT_LAB) && (
            <Link to="/lms/student/client-lab">
              <Card variant="outlined" className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="text-center py-6">
                  <FaLaptopCode className="text-cyan-600 text-3xl mx-auto mb-3" />
                  <CardTitle className="text-base">Client Lab</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_WORKSHOPS) && (
            <Link to="/lms/student/workshops">
              <Card variant="outlined" className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="text-center py-6">
                  <FaGraduationCap className="text-pink-600 text-3xl mx-auto mb-3" />
                  <CardTitle className="text-base">Workshops</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_REFERRALS) && (
            <Link to="/lms/student/referrals">
              <Card variant="outlined" className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="text-center py-6">
                  <FaGift className="text-red-600 text-3xl mx-auto mb-3" />
                  <CardTitle className="text-base">Referrals</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}