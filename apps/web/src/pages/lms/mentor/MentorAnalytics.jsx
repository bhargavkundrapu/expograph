import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import { useLocation } from "react-router-dom";
import {
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiBarChart2,
  FiRefreshCw,
  FiActivity,
  FiTarget,
  FiBriefcase,
} from "react-icons/fi";

export default function MentorAnalytics() {
  const { token } = useAuth();
  const location = useLocation();
  
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/mentees")) return "mentees";
    if (path.includes("/performance")) return "performance";
    if (path.includes("/engagement")) return "engagement";
    return "overview";
  };
  
  const view = getViewFromPath();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMentees: 0,
    activeAssignments: 0,
    avgCompletionRate: 0,
    avgResponseTime: "2.5h",
  });

  useEffect(() => {
    if (!token) return;
    fetchAnalytics();
  }, [token]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const deliverablesRes = await apiFetch("/api/v1/mentor/internships/deliverables", { token });
      const deliverables = Array.isArray(deliverablesRes) ? deliverablesRes : (deliverablesRes?.data || []);
      
      const uniqueMentees = new Set(deliverables.map(d => d.student_id));
      const activeAssignments = deliverables.filter(d => d.status === 'submitted' || d.status === 'reviewed').length;
      
      setStats({
        totalMentees: uniqueMentees.size,
        activeAssignments: activeAssignments,
        avgCompletionRate: 78,
        avgResponseTime: "2.5h",
      });
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

  if (loading) {
    return <PageLoading message="Loading analytics..." />;
  }

  const renderOverview = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Mentor Analytics</h1>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
        <p className="text-slate-600">Insights into your mentees' progress and performance</p>
      </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Mentees"
            value={stats.totalMentees}
            icon={FiUsers}
            color="from-emerald-500 to-emerald-600"
          />
          <MetricCard
            title="Active Assignments"
            value={stats.activeAssignments}
            icon={FiBriefcase}
            color="from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Avg Completion Rate"
            value={stats.avgCompletionRate}
            subtitle="%"
            icon={FiCheckCircle}
            color="from-purple-500 to-purple-600"
            trend={5.2}
          />
          <MetricCard
            title="Avg Response Time"
            value={stats.avgResponseTime}
            icon={FiClock}
            color="from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiActivity className="w-5 h-5 text-emerald-600" />
              Engagement Overview
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-700">High Engagement</span>
                  <span className="text-sm font-medium text-emerald-600">75%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-700">Medium Engagement</span>
                  <span className="text-sm font-medium text-blue-600">20%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-700">Low Engagement</span>
                  <span className="text-sm font-medium text-amber-600">5%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full" style={{ width: "5%" }} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiTarget className="w-5 h-5 text-purple-600" />
              Performance Metrics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">On-Time Submissions</span>
                <span className="text-2xl font-bold text-emerald-600">92%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">Quality Score</span>
                <span className="text-2xl font-bold text-blue-600">87</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">Feedback Response Rate</span>
                <span className="text-2xl font-bold text-purple-600">89%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );

  const renderMentees = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Mentees Analytics</h1>
        <p className="text-slate-600">Detailed insights for each mentee</p>
      </motion.div>
      <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
        <div className="text-center py-12">
          <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Mentees Analytics</h3>
          <p className="text-slate-600">Individual mentee performance tracking coming soon</p>
        </div>
      </div>
    </>
  );

  const renderPerformance = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Performance Analytics</h1>
        <p className="text-slate-600">Performance metrics and trends</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FiTarget className="w-5 h-5 text-purple-600" />
            Performance Metrics
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">On-Time Submissions</span>
              <span className="text-2xl font-bold text-emerald-600">92%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Quality Score</span>
              <span className="text-2xl font-bold text-blue-600">87</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Feedback Response Rate</span>
              <span className="text-2xl font-bold text-purple-600">89%</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">Performance Trends</h2>
          <div className="text-center py-12">
            <FiBarChart2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">Performance charts coming soon</p>
          </div>
        </motion.div>
      </div>
    </>
  );

  const renderEngagement = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Engagement Analytics</h1>
        <p className="text-slate-600">Mentee engagement metrics and insights</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-md p-6 border border-slate-200 shadow-lg"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FiActivity className="w-5 h-5 text-emerald-600" />
          Engagement Overview
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-slate-700">High Engagement</span>
              <span className="text-sm font-medium text-emerald-600">75%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full" style={{ width: "75%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-slate-700">Medium Engagement</span>
              <span className="text-sm font-medium text-blue-600">20%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{ width: "20%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-slate-700">Low Engagement</span>
              <span className="text-sm font-medium text-amber-600">5%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full" style={{ width: "5%" }} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {view === "overview" && renderOverview()}
        {view === "mentees" && renderMentees()}
        {view === "performance" && renderPerformance()}
        {view === "engagement" && renderEngagement()}
      </div>
    </div>
  );
}
