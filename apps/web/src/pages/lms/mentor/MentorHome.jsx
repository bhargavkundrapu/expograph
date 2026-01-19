import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, SkeletonCard } from "../../../Components/common/LoadingStates";
import BannerCarousel from "../../../Components/dashboard/BannerCarousel";
import StatCard from "../../../Components/dashboard/StatCard";
import ActivityFeed from "../../../Components/dashboard/ActivityFeed";
import AlertsCard from "../../../Components/dashboard/AlertsCard";
import {
  FiUsers,
  FiFileText,
  FiClock,
  FiTrendingUp,
  FiMessageSquare,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function MentorHome() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMentees: 0,
    pendingSubmissions: 0,
    pendingReviews: 0,
    avgResponseTime: "2.5h",
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [mentorAlerts, setMentorAlerts] = useState([]);

  // Fetch mentor dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;

      try {
        setLoading(true);
        
        // Fetch submissions queue to get pending count
        const submissionsRes = await apiFetch("/api/v1/mentor/submissions/queue", { token });
        const submissions = Array.isArray(submissionsRes) ? submissionsRes : (submissionsRes?.data || []);
        
        // Fetch deliverables queue
        const deliverablesRes = await apiFetch("/api/v1/mentor/internships/deliverables", { token });
        const deliverables = Array.isArray(deliverablesRes) ? deliverablesRes : (deliverablesRes?.data || []);
        
        // Calculate stats
        const pendingSubmissions = submissions.filter(s => s.status === 'submitted' || s.status === 'in_review').length;
        const pendingDeliverables = deliverables.filter(d => d.status === 'submitted' || d.status === 'reviewed').length;
        
        // Mock mentee count (would come from API in production)
        const menteeCount = 12; // This would be fetched from /api/v1/mentor/mentees
        
        setStats({
          totalMentees: menteeCount,
          pendingSubmissions: pendingSubmissions,
          pendingReviews: pendingDeliverables,
          avgResponseTime: "2.5h",
        });

        // Format recent activity from submissions and deliverables
        const activities = [
          ...submissions.slice(0, 3).map(s => ({
            id: s.id,
            type: "submission",
            title: `New submission from ${s.student_email || "Student"}`,
            description: s.task_title || "Practice task submission",
            timestamp: s.submitted_at,
            action: () => navigate(`/lms/mentor/submissions/${s.id}/review`),
          })),
          ...deliverables.slice(0, 2).map(d => ({
            id: d.id,
            type: "deliverable",
            title: `Deliverable submitted by ${d.student_name || "Student"}`,
            description: d.project_title || "Project deliverable",
            timestamp: d.submitted_at,
            action: () => navigate(`/lms/mentor/internships/deliverables/${d.id}/review`),
          })),
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);

        setRecentActivity(activities);

        // Create alerts for urgent items
        const alerts = [];
        if (pendingSubmissions > 5) {
          alerts.push({
            id: "high-submissions",
            type: "warning",
            title: "High Submission Queue",
            message: `${pendingSubmissions} submissions pending review`,
            action: () => navigate("/lms/mentor/submissions/queue"),
          });
        }
        if (pendingDeliverables > 3) {
          alerts.push({
            id: "high-deliverables",
            type: "info",
            title: "Deliverables Awaiting Review",
            message: `${pendingDeliverables} deliverables need your attention`,
            action: () => navigate("/lms/mentor/internships/deliverables"),
          });
        }
        setMentorAlerts(alerts);

      } catch (error) {
        console.error("Failed to fetch mentor dashboard data:", error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, navigate]);

  // Dynamic banner items for mentors
  const bannerItems = [
    {
      title: "Welcome to Your Mentor Portal",
      description: "Track your mentees' progress, review submissions, and provide valuable feedback to help them grow.",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      badge: "Active",
      action: {
        label: "View My Mentees",
        onClick: () => navigate("/lms/mentor/students"),
      },
    },
    {
      title: `${stats.pendingSubmissions > 0 ? stats.pendingSubmissions : "No"} Submissions Pending`,
      description: stats.pendingSubmissions > 0
        ? `You have ${stats.pendingSubmissions} submission${stats.pendingSubmissions > 1 ? 's' : ''} waiting for review. Help your mentees by providing timely feedback.`
        : "All caught up! Your submission queue is clear.",
      gradient: stats.pendingSubmissions > 0 ? "from-amber-500 via-orange-500 to-red-500" : "from-emerald-500 via-teal-500 to-cyan-500",
      badge: stats.pendingSubmissions > 0 ? "Action Required" : "All Clear",
      action: {
        label: stats.pendingSubmissions > 0 ? "Review Now" : "View Queue",
        onClick: () => navigate("/lms/mentor/submissions/queue"),
      },
    },
    {
      title: "Mentor Resources Available",
      description: "Access best practices, mentoring guides, and resources to enhance your mentoring effectiveness.",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      badge: "Resources",
      action: {
        label: "Explore Resources",
        onClick: () => navigate("/lms/mentor/resources"),
      },
    },
  ];

  // Format stats for display
  const statsData = [
    {
      title: "My Mentees",
      value: stats.totalMentees.toString(),
      change: "+2 this month",
      changeType: "positive",
      icon: FiUsers,
      gradient: "from-emerald-500 to-teal-600",
      action: () => navigate("/lms/mentor/students"),
    },
    {
      title: "Pending Submissions",
      value: stats.pendingSubmissions.toString(),
      change: stats.pendingSubmissions > 0 ? "Needs Review" : "All Clear",
      changeType: stats.pendingSubmissions > 0 ? "warning" : "neutral",
      icon: FiFileText,
      gradient: "from-amber-500 to-orange-600",
      action: () => navigate("/lms/mentor/submissions/queue"),
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews.toString(),
      change: "Deliverables",
      changeType: stats.pendingReviews > 0 ? "warning" : "neutral",
      icon: FiClock,
      gradient: "from-purple-500 to-pink-600",
      action: () => navigate("/lms/mentor/internships/deliverables"),
    },
    {
      title: "Avg Response Time",
      value: stats.avgResponseTime,
      change: "Excellent",
      changeType: "positive",
      icon: FiTrendingUp,
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Welcome, {user?.full_name || user?.name || "Mentor"} 👋
          </h1>
          <p className="text-slate-600 text-lg">
            Here's your mentoring overview and what needs your attention today.
          </p>
        </motion.div>

        {/* Hero Banner Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <BannerCarousel items={bannerItems} autoRotateInterval={6000} />
        </motion.div>

        {/* KPI Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={stat.action}
                className="cursor-pointer"
              >
                <StatCard
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeType={stat.changeType}
                  icon={stat.icon}
                  gradient={stat.gradient}
                  delay={0}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/lms/mentor/submissions/queue")}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                <FiFileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Review Submissions</h3>
                <p className="text-sm text-slate-600">{stats.pendingSubmissions} pending</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/lms/mentor/students")}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                <FiUsers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">My Mentees</h3>
                <p className="text-sm text-slate-600">{stats.totalMentees} active</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/lms/mentor/communications")}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <FiMessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Messages</h3>
                <p className="text-sm text-slate-600">Communicate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/lms/mentor/calendar")}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
                <FiCalendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Calendar</h3>
                <p className="text-sm text-slate-600">Schedule meetings</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section: Activity Feed & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <ActivityFeed activities={recentActivity} />
          </motion.div>

          {/* Mentor Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <AlertsCard alerts={mentorAlerts} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
