import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { hasPermission, getPermissionErrorMessage } from "../../../utils/permissions";
import { 
  FaLaptopCode, 
  FaTasks, 
  FaCheckCircle, 
  FaClock,
  FaArrowRight,
  FaUser,
  FaCalendar,
  FaCodeBranch
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function StudentClientLab() {
  const { token, permissions, permissionsLoading } = useAuth();
  const { isEnabled, loading: flagsLoading, flags } = useFeatureFlags();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

  // Check permissions - ensure permissions is an array
  // Wait for permissions to finish loading before checking
  const permissionsArray = Array.isArray(permissions) ? permissions : [];
  const hasReadPermission = !permissionsLoading && hasPermission(permissionsArray, "clientlab:read");

  async function loadProjects(signal) {
    const clientLabEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CLIENT_LAB);
    
    // Only skip API call if feature is explicitly disabled (not when loading)
    if (!flagsLoading && Object.keys(flags).length > 0 && !clientLabEnabled) {
      if (!signal?.aborted && alive.current) setLoading(false);
      return;
    }
    
    // Wait for permissions to finish loading before checking
    // If permissions are still loading, try the API call anyway (server will tell us)
    // Only block if permissions have loaded and are explicitly missing
    if (!permissionsLoading && !hasReadPermission) {
      if (alive.current) {
        setErr(getPermissionErrorMessage("clientlab:read"));
        setLoading(false);
      }
      return;
    }
    
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/lms/client-lab/projects", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) {
        setProjects(list);
        setErr(""); // Clear any previous errors on success
      }
    } catch (e) {
      if (signal?.aborted) return;
      // Handle 403 errors - user needs clientlab:read permission
      if (e?.status === 403) {
        if (alive.current) {
          setErr(getPermissionErrorMessage("clientlab:read"));
        }
      } else {
        // Only log non-403 errors to console in dev mode
        if (import.meta.env.DEV) {
          console.error("Failed to load client lab projects:", e);
        }
        if (alive.current) setErr(e?.message || "Failed to load client lab projects");
      }
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  useEffect(() => {
    // Only load when flags finish loading (to avoid multiple loads)
    if (flagsLoading) return;
    
    // Wait a bit for permissions to load, but don't wait forever
    // If permissions are still loading after a short delay, try the API call anyway
    // The server will tell us if permissions are missing
    if (permissionsLoading) {
      // Wait up to 2 seconds for permissions to load
      const timeout = setTimeout(() => {
        if (alive.current) {
          const ac = new AbortController();
          loadProjects(ac.signal);
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
    
    alive.current = true;
    const ac = new AbortController();
    loadProjects(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token, flagsLoading, flags, permissions, permissionsLoading]);

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
        title="Failed to Load Client Lab" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadProjects(ac.signal);
        }} 
      />
    );
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg shadow-pink-500/30">
              <FaLaptopCode className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Client Lab</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Real-world projects with real clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <EmptyState
          title="No Client Lab Projects"
          message="You're not currently assigned to any client lab projects. Check back later or contact your mentor."
        />
      ) : (
        <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
          {projects.map((project, idx) => (
            <Card
              key={project.id}
              variant="elevated"
              className="animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box' }}
            >
              <div className="layout-flex items-start justify-between gap-md mb-4">
                <div style={{ flex: 1 }}>
                  <div className="layout-flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-400/20 to-rose-500/20 border border-pink-400/30">
                      <FaLaptopCode className="text-pink-400" />
                    </div>
                    <CardTitle className="text-xl" style={{ margin: 0 }}>{project.title}</CardTitle>
                  </div>
                  {project.client_name && (
                    <div className="layout-flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <FaUser className="text-pink-400" />
                      <span>Client: {project.client_name}</span>
                    </div>
                  )}
                  {project.status && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'active' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                      project.status === 'completed' ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300' :
                      'bg-gray-800 border border-gray-700 text-gray-400'
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>
              </div>

              {project.scope && (
                <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                  {project.scope}
                </CardDescription>
              )}

              <div className="layout-flex-col gap-sm mb-4">
                {project.start_date && (
                  <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                    <FaCalendar className="text-pink-400" />
                    <span>Started: {formatDate(project.start_date)}</span>
                  </div>
                )}
                {project.end_date && (
                  <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                    <FaCalendar className="text-pink-400" />
                    <span>Ends: {formatDate(project.end_date)}</span>
                  </div>
                )}
              </div>

              <Link
                to={`/lms/student/client-lab/${project.id}`}
                className="layout-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-pink-400 to-rose-500 text-white hover:from-pink-500 hover:to-rose-600 hover:shadow-lg hover:shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-semibold"
              >
                <span>View Project Board</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </Card>
          ))}
        </div>
      )}

      {/* Info Card */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-start gap-md">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-400/20 to-rose-500/20 border border-pink-400/30">
            <FaCodeBranch className="text-pink-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-xl mb-2">About Client Lab</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              Client Lab provides real-world project experience working with actual clients. You'll collaborate with mentors and other students to deliver real solutions. 
              Track your tasks, submit deliverables, and receive feedback from mentors.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}

