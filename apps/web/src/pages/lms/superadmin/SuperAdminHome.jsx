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
  FiActivity,
  FiUserCheck,
  FiServer,
} from "react-icons/fi";

export default function SuperAdminHome() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeUsers: 0,
    totalMentors: 0,
    systemHealth: "99.8%",
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const [statsRes, activityRes, alertsRes] = await Promise.all([
          apiFetch("/api/v1/admin/dashboard/stats", { token }),
          apiFetch("/api/v1/admin/dashboard/activity?limit=5", { token }),
          apiFetch("/api/v1/admin/dashboard/alerts", { token }),
        ]);

        if (statsRes?.ok) {
          setStats(statsRes.data);
        }

        if (activityRes?.ok) {
          setRecentActivity(activityRes.data || []);
        }

        if (alertsRes?.ok) {
          setSystemAlerts(alertsRes.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Dynamic banner items
  const bannerItems = [
    {
      title: "New Feature Rollout",
      description: "Introducing advanced analytics dashboard with real-time insights and customizable reports.",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      badge: "New",
      action: {
        label: "Explore Now",
        onClick: () => navigate("/lms/superadmin/analytics"),
      },
    },
    {
      title: "System Maintenance Scheduled",
      description: "Planned maintenance window on Sunday, 2:00 AM - 4:00 AM. Minimal service interruption expected.",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      badge: "Scheduled",
      action: {
        label: "View Details",
        onClick: () => console.log("View maintenance details"),
      },
    },
    {
      title: `Welcome ${stats.totalStudents > 0 ? stats.totalStudents.toLocaleString() : "Our"} Students`,
      description: stats.totalStudents > 0 
        ? `You have ${stats.totalStudents.toLocaleString()} active students. Review enrollment trends and optimize course offerings.`
        : "Start building your learning community. Review enrollment trends and optimize course offerings.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      badge: "Live",
      action: {
        label: "View Analytics",
        onClick: () => navigate("/lms/superadmin/analytics"),
      },
    },
  ];

  // Format stats for display
  const statsData = [
    {
      title: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      change: "+12.5%",
      changeType: "positive",
      icon: FiUsers,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: "+8.2%",
      changeType: "positive",
      icon: FiActivity,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Total Mentors",
      value: stats.totalMentors.toLocaleString(),
      change: "+5.3%",
      changeType: "positive",
      icon: FiUserCheck,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "System Health",
      value: stats.systemHealth,
      change: "Stable",
      changeType: "neutral",
      icon: FiServer,
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
            Welcome, {user?.full_name || user?.name || "Super Admin"} 👋
          </h1>
          <p className="text-slate-600 text-lg">
            Here's what's happening with your platform today.
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
              <div key={i} className="bg-white rounded-md p-6 border border-slate-200 animate-pulse">
                <div className="h-12 w-12 bg-slate-200 rounded-md mb-4"></div>
                <div className="h-8 w-24 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
              </div>
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
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                gradient={stat.gradient}
                delay={0.3 + index * 0.1}
              />
            ))}
          </motion.div>
        )}

        {/* Bottom Section: Activity Feed & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ActivityFeed activities={recentActivity} />
          </motion.div>

          {/* System Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AlertsCard alerts={systemAlerts} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
