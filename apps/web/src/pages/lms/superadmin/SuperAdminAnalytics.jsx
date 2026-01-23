import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading, InlineSpinner } from "../../../Components/common/LoadingStates";
import {
  FiTrendingUp,
  FiUsers,
  FiBook,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiBarChart2,
  FiRefreshCw,
  FiDownload,
  FiFilter,
  FiActivity,
  FiTarget,
} from "react-icons/fi";

export default function SuperAdminAnalytics() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d"); // "7d" | "30d" | "90d" | "1y" | "all"
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeUsers: 0,
    totalMentors: 0,
  });
  
  // Metrics from research
  const [metrics, setMetrics] = useState({
    enrollmentRate: 0,
    completionRate: 0,
    averageTimeToComplete: 0,
    engagementScore: 0,
    dropOffRate: 0,
  });

  // Mock chart data (in production, fetch from analytics API)
  const [enrollmentTrend, setEnrollmentTrend] = useState([]);
  const [completionTrend, setCompletionTrend] = useState([]);
  const [topCourses, setTopCourses] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchAnalytics();
  }, [token, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Fetch dashboard stats (existing API)
      const statsRes = await apiFetch("/api/v1/admin/dashboard/stats", { token });
      if (statsRes?.ok) {
        setStats(statsRes.data || {});
      }

      // TODO: In production, fetch from dedicated analytics endpoints:
      // const metricsRes = await apiFetch(`/api/v1/admin/analytics/metrics?range=${timeRange}`, { token });
      // const trendRes = await apiFetch(`/api/v1/admin/analytics/enrollment-trend?range=${timeRange}`, { token });
      
      // For now, use calculated/mock data
      const totalStudents = statsRes?.data?.totalStudents || 0;
      setMetrics({
        enrollmentRate: 85, // Percentage
        completionRate: 72, // Percentage
        averageTimeToComplete: 4.2, // Weeks
        engagementScore: 68, // Percentage
        dropOffRate: 28, // Percentage
      });

      // Mock trend data
      setEnrollmentTrend([
        { date: "2024-01", value: 120 },
        { date: "2024-02", value: 145 },
        { date: "2024-03", value: 168 },
        { date: "2024-04", value: 192 },
      ]);
      setCompletionTrend([
        { date: "2024-01", value: 85 },
        { date: "2024-02", value: 92 },
        { date: "2024-03", value: 105 },
        { date: "2024-04", value: 118 },
      ]);
      setTopCourses([
        { name: "Introduction to React", enrollments: 245, completions: 189, completionRate: 77 },
        { name: "Advanced JavaScript", enrollments: 198, completions: 156, completionRate: 79 },
        { name: "Full Stack Development", enrollments: 167, completions: 124, completionRate: 74 },
      ]);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <div className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
        {typeof value === "number" ? (value % 1 === 0 ? value : value.toFixed(1)) : value}
        {subtitle && <span className="text-lg text-slate-600 ml-1">{subtitle}</span>}
      </div>
      <div className="text-sm text-slate-600">{title}</div>
    </motion.div>
  );

  const SimpleBarChart = ({ data, label, color = "from-blue-500 to-indigo-600", height = 200 }) => {
    const maxValue = Math.max(...data.map((d) => d.value));
    return (
      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-700">{item.date || item.name}</span>
              <span className="text-sm text-slate-600">{item.value}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`h-full bg-gradient-to-r ${color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <PageLoading message="Loading analytics..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Analytics Dashboard</h1>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
                <option value="all">All time</option>
              </select>
              <button
                onClick={fetchAnalytics}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <FiRefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
          <p className="text-slate-600">Comprehensive insights into learning metrics and performance</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <MetricCard
            title="Total Students"
            value={stats.totalStudents}
            icon={FiUsers}
            color="from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Enrollment Rate"
            value={metrics.enrollmentRate}
            subtitle="%"
            icon={FiTrendingUp}
            color="from-green-500 to-green-600"
            trend={5.2}
          />
          <MetricCard
            title="Completion Rate"
            value={metrics.completionRate}
            subtitle="%"
            icon={FiCheckCircle}
            color="from-purple-500 to-purple-600"
            trend={3.1}
          />
          <MetricCard
            title="Avg. Time to Complete"
            value={metrics.averageTimeToComplete}
            subtitle="weeks"
            icon={FiClock}
            color="from-orange-500 to-orange-600"
          />
          <MetricCard
            title="Engagement Score"
            value={metrics.engagementScore}
            subtitle="%"
            icon={FiActivity}
            color="from-indigo-500 to-indigo-600"
            trend={2.3}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enrollment Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiBarChart2 className="w-5 h-5 text-indigo-600" />
              Enrollment Trends
            </h2>
            <SimpleBarChart data={enrollmentTrend} color="from-blue-500 to-indigo-600" />
          </motion.div>

          {/* Completion Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiTarget className="w-5 h-5 text-green-600" />
              Completion Trends
            </h2>
            <SimpleBarChart data={completionTrend} color="from-green-500 to-emerald-600" />
          </motion.div>
        </div>

        {/* Top Courses Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-md p-6 border border-slate-200 shadow-lg mb-8"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FiBook className="w-5 h-5 text-indigo-600" />
            Top Performing Courses
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Course</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Enrollments</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Completions</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Completion Rate</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {topCourses.map((course, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{course.name}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{course.enrollments}</td>
                    <td className="px-6 py-4 text-slate-700">{course.completions}</td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-green-600">{course.completionRate}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                          style={{ width: `${course.completionRate}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Additional Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Drop-off Rate</h3>
            <div className="text-4xl font-bold text-red-600 mb-2">{metrics.dropOffRate}%</div>
            <p className="text-sm text-slate-600">Learners who abandon courses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Active Users</h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.activeUsers}</div>
            <p className="text-sm text-slate-600">Users active in the last 30 days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Total Mentors</h3>
            <div className="text-4xl font-bold text-purple-600 mb-2">{stats.totalMentors}</div>
            <p className="text-sm text-slate-600">Active mentors in the system</p>
          </motion.div>
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md"
        >
          <div className="flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Enhanced Analytics Available</p>
              <p>
                This dashboard uses available data. For advanced analytics including detailed enrollment trends,
                drop-off points, learner progress reports, and certification tracking, additional analytics endpoints
                need to be implemented in the backend.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
