import { useEffect, useState, useRef, useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { hasPermission, getPermissionErrorMessage } from "../../../utils/permissions";
import { 
  FaBriefcase, 
  FaCalendar, 
  FaUsers, 
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaTag,
  FaRocket
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

export default function StudentInternships() {
  const { token, permissions, permissionsLoading } = useAuth();
  const { isEnabled, loading: flagsLoading, flags } = useFeatureFlags();
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [activeTab, setActiveTab] = useState("projects"); // projects, applications, assignments
  const alive = useRef(true);

  // Check if internships feature is enabled using fail-open approach (memoized to prevent infinite loops)
  const internshipsEnabled = useMemo(() => {
    return checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_INTERNSHIPS, "internships", "micro_internship");
  }, [isEnabled, flags]);

  // Check permissions - ensure permissions is an array
  const permissionsArray = Array.isArray(permissions) ? permissions : [];
  const hasReadPermission = hasPermission(permissionsArray, "internships:read");
  const hasApplyPermission = hasPermission(permissionsArray, "internships:apply");

  // Only redirect if flags have loaded AND feature is explicitly disabled
  // If flags are still loading or failed to load, allow access (default to enabled)
  if (!flagsLoading && Object.keys(flags).length > 0 && !internshipsEnabled) {
    return <Navigate to="/lms/student" replace />;
  }

  async function loadProjects(signal) {
    // Only skip API call if feature is explicitly disabled (not when loading)
    if (!flagsLoading && Object.keys(flags).length > 0 && !internshipsEnabled) {
      return;
    }
    
    // Always try the API call - the server is the source of truth for permissions
    // The server will return 403 if permissions are missing, which we handle gracefully
    
    try {
      const json = await apiFetch("/api/v1/lms/internships/projects", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) {
        setProjects(list);
        setErr(""); // Clear any previous errors on success
      }
    } catch (e) {
      if (signal?.aborted) return;
      // Handle 403 errors - user needs internships:read permission
      if (e?.status === 403) {
        if (alive.current) {
          // Only show error if permissions have finished loading
          // If still loading, wait a bit and retry (permissions might be updating)
          if (permissionsLoading) {
            // Permissions are still loading, wait and retry once
            setTimeout(() => {
              if (alive.current && !permissionsLoading) {
                const retryAc = new AbortController();
                loadProjects(retryAc.signal);
              }
            }, 1000);
            return;
          }
          setErr(getPermissionErrorMessage("internships:read"));
        }
      } else {
        // Only log non-403 errors to console
        if (import.meta.env.DEV) {
          console.error("Failed to load projects:", e);
        }
        if (alive.current) setErr(e?.message || "Failed to load projects");
      }
    }
  }

  async function loadApplications(signal) {
    // Only skip API call if feature is explicitly disabled (not when loading)
    if (!flagsLoading && Object.keys(flags).length > 0 && !internshipsEnabled) {
      return;
    }
    
    // Check permission before making API call
    if (!hasApplyPermission) {
      // Don't set error here, just return empty array
      if (alive.current) setApplications([]);
      return;
    }
    
    try {
      const json = await apiFetch("/api/v1/lms/internships/my/applications", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setApplications(list);
    } catch (e) {
      if (signal?.aborted) return;
      // Handle 403 errors silently (permission issue)
      if (e?.status !== 403 && import.meta.env.DEV) {
        console.error("Failed to load applications:", e);
      }
      // Set empty array on error
      if (alive.current) setApplications([]);
    }
  }

  async function loadAssignments(signal) {
    // Only skip API call if feature is explicitly disabled (not when loading)
    if (!flagsLoading && Object.keys(flags).length > 0 && !internshipsEnabled) {
      return;
    }
    
    // Check permission before making API call
    if (!hasApplyPermission) {
      // Don't set error here, just return empty array
      if (alive.current) setAssignments([]);
      return;
    }
    
    try {
      const json = await apiFetch("/api/v1/lms/internships/my/assignments", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setAssignments(list);
    } catch (e) {
      if (signal?.aborted) return;
      // Handle 403 errors silently (permission issue)
      if (e?.status !== 403 && import.meta.env.DEV) {
        console.error("Failed to load assignments:", e);
      }
      // Set empty array on error
      if (alive.current) setAssignments([]);
    }
  }

  async function loadEverything(signal) {
    setLoading(true);
    // Don't clear error here - let loadProjects set it if needed
    try {
      // Load projects first to check for permission errors
      await loadProjects(signal);
      // If we have read permission, load the rest
      if (hasReadPermission && hasApplyPermission) {
        await Promise.all([
          loadApplications(signal),
          loadAssignments(signal),
        ]);
      }
    } catch (e) {
      if (signal?.aborted) return;
      // Only set error if it's not a 403 (403 errors are handled in loadProjects)
      if (alive.current && e?.status !== 403) {
        setErr(e?.message || "Failed to load internships data");
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
          loadEverything(ac.signal);
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
    
    alive.current = true;
    const ac = new AbortController();
    loadEverything(ac.signal);
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
        title="Failed to Load Internships" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadEverything(ac.signal);
        }} 
      />
    );
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg shadow-indigo-500/30">
              <FaBriefcase className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Micro-Internships</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Real-world projects to build your portfolio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="layout-flex gap-2 border-b border-gray-800" style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "projects"
              ? "border-indigo-400 text-indigo-400"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Available Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "applications"
              ? "border-indigo-400 text-indigo-400"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          My Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab("assignments")}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "assignments"
              ? "border-indigo-400 text-indigo-400"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          My Assignments ({assignments.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "projects" && (
        <div>
          {projects.length === 0 ? (
            <EmptyState
              title="No Projects Available"
              message="There are currently no micro-internship projects available. Check back later!"
            />
          ) : (
            <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
              {projects.map((project, idx) => (
                <Card
                  key={project.project_id}
                  variant="elevated"
                  className="animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box' }}
                >
                  <div className="layout-flex items-start justify-between gap-md mb-4">
                    <div style={{ flex: 1 }}>
                      <div className="layout-flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-500/20 border border-indigo-400/30">
                          <FaBriefcase className="text-indigo-400" />
                        </div>
                        <CardTitle className="text-xl" style={{ margin: 0 }}>{project.title}</CardTitle>
                      </div>
                      {project.track && (
                        <div className="layout-flex items-center gap-2 mb-2">
                          <FaTag className="text-gray-500 text-xs" />
                          <span className="text-xs text-gray-400">{project.track}</span>
                        </div>
                      )}
                      {project.difficulty && (
                        <span className="inline-block px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-400 mb-3">
                          {project.difficulty}
                        </span>
                      )}
                    </div>
                  </div>

                  <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                    {project.brief || "No description available."}
                  </CardDescription>

                  <div className="layout-flex-col gap-sm mb-4">
                    {project.batch_name && (
                      <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                        <FaUsers className="text-indigo-400" />
                        <span>Batch: {project.batch_name}</span>
                      </div>
                    )}
                    {project.start_at && (
                      <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                        <FaCalendar className="text-indigo-400" />
                        <span>Starts: {formatDate(project.start_at)}</span>
                      </div>
                    )}
                    {project.end_at && (
                      <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                        <FaCalendar className="text-indigo-400" />
                        <span>Ends: {formatDate(project.end_at)}</span>
                      </div>
                    )}
                    {project.max_seats && (
                      <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                        <FaUsers className="text-indigo-400" />
                        <span>Max Seats: {project.max_seats}</span>
                      </div>
                    )}
                  </div>

                  <button className="layout-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-500 text-white hover:from-indigo-500 hover:to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-semibold">
                    <span>Apply Now</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "applications" && (
        <div>
          {applications.length === 0 ? (
            <EmptyState
              title="No Applications"
              message="You haven't applied to any micro-internship projects yet."
              ctaText="Browse Projects"
              ctaTo="/lms/student/internships"
            />
          ) : (
            <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
              {applications.map((app, idx) => (
                <Card
                  key={app.id}
                  variant="elevated"
                  className="animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
                >
                  <div className="layout-flex items-center justify-between gap-md">
                    <div style={{ flex: 1 }}>
                      <div className="layout-flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          app.status === 'approved' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                          app.status === 'rejected' ? 'bg-red-500/20 border border-red-500/30' :
                          'bg-cyan-500/20 border border-cyan-500/30'
                        }`}>
                          {app.status === 'approved' ? (
                            <FaCheckCircle className="text-emerald-400" />
                          ) : app.status === 'rejected' ? (
                            <FaClock className="text-red-400" />
                          ) : (
                            <FaClock className="text-cyan-400" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ margin: 0 }}>{app.project_title || "Project"}</CardTitle>
                          <div className="text-xs text-gray-500 mt-1">
                            Applied: {formatDate(app.applied_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      app.status === 'approved' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                      app.status === 'rejected' ? 'bg-red-500/10 border border-red-500/30 text-red-300' :
                      'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300'
                    }`}>
                      {app.status || "pending"}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "assignments" && (
        <div>
          {assignments.length === 0 ? (
            <EmptyState
              title="No Assignments"
              message="You don't have any active assignments yet. Apply to projects to get assigned!"
              ctaText="Browse Projects"
              ctaTo="/lms/student/internships"
            />
          ) : (
            <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
              {assignments.map((assignment, idx) => (
                <Card
                  key={assignment.id}
                  variant="elevated"
                  className="animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
                >
                  <div className="layout-flex items-start justify-between gap-md">
                    <div style={{ flex: 1 }}>
                      <div className="layout-flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-500/20 border border-indigo-400/30">
                          <FaRocket className="text-indigo-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ margin: 0 }}>{assignment.project_title || "Assignment"}</CardTitle>
                          <div className="text-xs text-gray-500 mt-1">
                            Assigned: {formatDate(assignment.assigned_at)}
                          </div>
                        </div>
                      </div>
                      {assignment.batch_name && (
                        <div className="text-sm text-gray-400 ml-11">Batch: {assignment.batch_name}</div>
                      )}
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-500 text-white hover:from-indigo-500 hover:to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 text-sm font-semibold">
                      View Details
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

