import { useEffect, useState, useRef, useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { hasPermission, getPermissionErrorMessage } from "../../../utils/permissions";
import Card, { CardTitle, CardDescription } from "../../../Components/ui/Card";
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
  const [activeTab, setActiveTab] = useState("projects");
  const alive = useRef(true);

  const internshipsEnabled = useMemo(() => {
    return checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_INTERNSHIPS, "internships", "micro_internship");
  }, [isEnabled, flags]);

  const permissionsArray = Array.isArray(permissions) ? permissions : [];
  const hasReadPermission = hasPermission(permissionsArray, "internships:read");
  const hasApplyPermission = hasPermission(permissionsArray, "internships:apply");

  if (!flagsLoading && Object.keys(flags).length > 0 && !internshipsEnabled) {
    return <Navigate to="/lms/student" replace />;
  }

  async function loadProjects(signal) {
    if (!flagsLoading && Object.keys(flags).length > 0 && !internshipsEnabled) {
      return;
    }
    
    try {
      const json = await apiFetch("/api/v1/lms/internships/projects", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) {
        setProjects(list);
        setErr("");
      }
    } catch (e) {
      if (signal?.aborted) return;
      if (e?.status === 403) {
        if (alive.current) {
          if (permissionsLoading) {
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
        if (import.meta.env.DEV) {
          console.error("Failed to load projects:", e);
        }
        if (alive.current) setErr(e?.message || "Failed to load projects");
      }
    }
  }

  async function loadApplications(signal) {
    if (!flagsLoading && Object.keys(flags).length > 0 && !internshipsEnabled) {
      return;
    }
    
    if (!hasApplyPermission) {
      if (alive.current) setApplications([]);
      return;
    }
    
    try {
      const json = await apiFetch("/api/v1/lms/internships/my/applications", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setApplications(list);
    } catch (e) {
      if (signal?.aborted) return;
      if (e?.status !== 403 && import.meta.env.DEV) {
        console.error("Failed to load applications:", e);
      }
      if (alive.current) setApplications([]);
    }
  }

  async function loadAssignments(signal) {
    if (!flagsLoading && Object.keys(flags).length > 0 && !internshipsEnabled) {
      return;
    }
    
    if (!hasApplyPermission) {
      if (alive.current) setAssignments([]);
      return;
    }
    
    try {
      const json = await apiFetch("/api/v1/lms/internships/my/assignments", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setAssignments(list);
    } catch (e) {
      if (signal?.aborted) return;
      if (e?.status !== 403 && import.meta.env.DEV) {
        console.error("Failed to load assignments:", e);
      }
      if (alive.current) setAssignments([]);
    }
  }

  async function loadEverything(signal) {
    setLoading(true);
    try {
      await loadProjects(signal);
      if (hasReadPermission && hasApplyPermission) {
        await Promise.all([
          loadApplications(signal),
          loadAssignments(signal),
        ]);
      }
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current && e?.status !== 403) {
        setErr(e?.message || "Failed to load internships data");
      }
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  useEffect(() => {
    if (flagsLoading) return;
    
    if (permissionsLoading) {
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
      <div>
        <Skeleton />
        <Skeleton />
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
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Micro-Internships</h1>
              <p>Real-world projects to build your portfolio</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => setActiveTab("projects")}
        >
          Available Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("applications")}
        >
          My Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab("assignments")}
        >
          My Assignments ({assignments.length})
        </button>
      </div>

      {activeTab === "projects" && (
        <div>
          {projects.length === 0 ? (
            <EmptyState
              title="No Projects Available"
              message="There are currently no micro-internship projects available. Check back later!"
            />
          ) : (
            <div>
              {projects.map((project, idx) => (
                <Card
                  key={project.project_id}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <div>
                      </div>
                      <CardTitle>{project.title}</CardTitle>
                    </div>
                    {project.track && (
                      <div>
                        <span>{project.track}</span>
                      </div>
                    )}
                    {project.difficulty && (
                      <span>
                        {project.difficulty}
                      </span>
                    )}
                  </div>

                  <CardDescription>
                    {project.brief || "No description available."}
                  </CardDescription>

                  <div>
                    {project.batch_name && (
                      <div>
                        <span>Batch: {project.batch_name}</span>
                      </div>
                    )}
                    {project.start_at && (
                      <div>
                        <span>Starts: {formatDate(project.start_at)}</span>
                      </div>
                    )}
                    {project.end_at && (
                      <div>
                        <span>Ends: {formatDate(project.end_at)}</span>
                      </div>
                    )}
                    {project.max_seats && (
                      <div>
                        <span>Max Seats: {project.max_seats}</span>
                      </div>
                    )}
                  </div>

                  <button>
                    <span>Apply Now</span>
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
            <div>
              {applications.map((app, idx) => (
                <Card
                  key={app.id}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>{app.project_title || "Project"}</CardTitle>
                        <div>
                          Applied: {formatDate(app.applied_at)}
                        </div>
                      </div>
                    </div>
                    <span>
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
            <div>
              {assignments.map((assignment, idx) => (
                <Card
                  key={assignment.id}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>{assignment.project_title || "Assignment"}</CardTitle>
                        <div>
                          Assigned: {formatDate(assignment.assigned_at)}
                        </div>
                      </div>
                      {assignment.batch_name && (
                        <div>Batch: {assignment.batch_name}</div>
                      )}
                    </div>
                    <button>
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
