import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaUserTie, 
  FaClipboardList, 
  FaCheckCircle,
  FaLaptopCode,
  FaBriefcase
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

export default function MentorHome() {
  const { token } = useAuth();
  const { isEnabled } = useFeatureFlags();
  const [stats, setStats] = useState({ pending: 0, reviewed: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

  async function loadStats(signal) {
    try {
      const json = await apiFetch("/api/v1/mentor/submissions/queue", { token, signal });
      const list = unwrapArray(json);
      const pending = list.filter(s => s.status === "submitted" || s.status === "in_review").length;
      const reviewed = list.filter(s => s.status === "approved" || s.status === "changes_requested").length;
      if (alive.current) {
        setStats({ pending, reviewed, total: list.length });
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load stats:", e);
      if (alive.current) setErr(e?.message || "Failed to load statistics");
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

  // Build quick actions based on feature flags
  const quickActions = [];
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_SUBMISSIONS)) {
    quickActions.push({
      icon: FaClipboardList,
      title: "Submissions Queue",
      desc: "Review student submissions and provide feedback",
      to: "/lms/mentor/submissions",
      color: "from-emerald-400 to-teal-500",
    });
  }

  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_CLIENT_LAB)) {
    quickActions.push({
      icon: FaLaptopCode,
      title: "Client Lab Tasks",
      desc: "Review client lab project tasks",
      to: "/lms/mentor/client-lab",
      color: "from-pink-400 to-rose-500",
    });
  }

  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_INTERNSHIPS)) {
    quickActions.push({
      icon: FaBriefcase,
      title: "Internship Reviews",
      desc: "Review internship deliverables",
      to: "/lms/mentor/internships",
      color: "from-indigo-400 to-purple-500",
    });
  }

  if (loading) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
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
          loadStats(ac.signal);
        }} 
      />
    );
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
              <FaUserTie className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Mentor Portal</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Review and guide student work</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30">
              <FaClipboardList className="text-yellow-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{stats.pending}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Pending Review</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30">
              <FaCheckCircle className="text-emerald-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{stats.reviewed}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Reviewed</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
              <FaUserTie className="text-blue-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{stats.total}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Total Submissions</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className="layout-flex-col gap-md">
          <h2 className="section-title text-2xl text-white">Quick Actions</h2>
          <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link key={action.to} to={action.to}>
                  <Card
                    variant="elevated"
                    className="p-6 group hover:scale-105 transition-transform duration-300 animate-fadeIn"
                    style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                  >
                    <div className="layout-flex items-center gap-md">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white text-2xl" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <CardTitle className="text-xl mb-2">{action.title}</CardTitle>
                        <CardDescription>{action.desc}</CardDescription>
                      </div>
                      <FaCheckCircle className="text-gray-400 text-xl group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {quickActions.length === 0 && (
        <Card variant="elevated" className="p-8">
          <CardTitle className="text-xl mb-4">No Features Available</CardTitle>
          <CardDescription>All mentor features are currently disabled. Contact your administrator.</CardDescription>
        </Card>
      )}
    </div>
  );
}
