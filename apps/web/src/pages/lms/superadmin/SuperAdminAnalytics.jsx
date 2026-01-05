import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
import { 
  FaChartLine, 
  FaUsers, 
  FaBook,
  FaGraduationCap,
  FaBriefcase,
  FaCertificate,
  FaFlag,
  FaEnvelope
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

export default function SuperAdminAnalytics() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    courses: 0,
    workshops: 0,
    leads: 0,
    certificates: 0,
    internships: 0,
    clientLab: 0,
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

  async function loadStats(signal) {
    setErr("");
    setLoading(true);
    try {
      const [courses, workshops, leads, featureFlags] = await Promise.all([
        apiFetch("/api/v1/admin/courses", { token, signal }).catch(() => ({ ok: true, data: [] })),
        apiFetch("/api/v1/admin/workshops", { token, signal }).catch(() => ({ ok: true, data: [] })),
        apiFetch("/api/v1/admin/leads", { token, signal }).catch(() => ({ ok: true, data: [] })),
        apiFetch("/api/v1/admin/feature-flags", { token, signal }).catch(() => ({ ok: true, data: [] })),
      ]);

      if (alive.current) {
        setStats({
          courses: unwrapArray(courses).length,
          workshops: unwrapArray(workshops).length,
          leads: unwrapArray(leads).length,
          certificates: 0, // Would need a list endpoint
          internships: 0, // Would need a list endpoint
          clientLab: 0, // Would need a list endpoint
          featureFlags: unwrapArray(featureFlags).length,
        });
      }
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load analytics");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadStats(ac.signal);
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
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Analytics" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadStats(ac.signal);
        }} 
      />
    );
  }

  const statCards = [
    { icon: FaBook, label: "Courses", value: stats.courses, color: "from-blue-400 to-cyan-500" },
    { icon: FaGraduationCap, label: "Workshops", value: stats.workshops, color: "from-teal-400 to-cyan-500" },
    { icon: FaEnvelope, label: "Leads", value: stats.leads, color: "from-purple-400 to-pink-500" },
    { icon: FaCertificate, label: "Certificates", value: stats.certificates, color: "from-amber-400 to-orange-500" },
    { icon: FaBriefcase, label: "Internships", value: stats.internships, color: "from-indigo-400 to-purple-500" },
    { icon: FaFlag, label: "Feature Flags", value: stats.featureFlags, color: "from-pink-400 to-rose-500" },
  ];

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30">
              <FaChartLine className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Analytics & Statistics</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Platform overview and key metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
        {statCards.map((stat, idx) => (
          <Card
            key={stat.label}
            variant="elevated"
            className="animate-fadeIn"
            style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box' }}
          >
            <div className="layout-flex items-center gap-md">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="text-white text-2xl" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white" style={{ margin: 0 }}>{stat.value}</div>
                <div className="text-sm text-gray-400" style={{ margin: 0 }}>{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-start gap-md">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
            <FaChartLine className="text-blue-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-xl mb-2">Platform Analytics</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              View key metrics and statistics about your platform. This dashboard provides an overview of courses, workshops, 
              leads, certificates, internships, and feature flags. More detailed analytics can be added as needed.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}

