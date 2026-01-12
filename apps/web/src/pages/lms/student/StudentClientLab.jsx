import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
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

export default function StudentClientLab() {
  const { token, permissions, permissionsLoading } = useAuth();
  const { isEnabled, loading: flagsLoading, flags } = useFeatureFlags();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

  const permissionsArray = Array.isArray(permissions) ? permissions : [];
  const hasReadPermission = hasPermission(permissionsArray, "clientlab:read");

  async function loadProjects(signal) {
    const clientLabEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CLIENT_LAB);
    
    if (!flagsLoading && Object.keys(flags).length > 0 && !clientLabEnabled) {
      if (!signal?.aborted && alive.current) setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/lms/client-lab/projects", { token, signal });
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
          setErr(getPermissionErrorMessage("clientlab:read"));
        }
      } else {
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
    if (flagsLoading) return;
    
    if (permissionsLoading) {
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
      <div>
        <Skeleton />
        <Skeleton />
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
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Client Lab</h1>
              <p>Real-world projects with real clients</p>
            </div>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No Client Lab Projects"
          message="You're not currently assigned to any client lab projects. Check back later or contact your mentor."
        />
      ) : (
        <div>
          {projects.map((project, idx) => (
            <Card
              key={project.id}
              variant="elevated"
            >
              <div>
                <div>
                  <div>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                </div>
                {project.client_name && (
                  <div>
                    <span>Client: {project.client_name}</span>
                  </div>
                )}
                {project.status && (
                  <span>
                    {project.status}
                  </span>
                )}
              </div>

              {project.scope && (
                <CardDescription>
                  {project.scope}
                </CardDescription>
              )}

              <div>
                {project.start_date && (
                  <div>
                    <span>Started: {formatDate(project.start_date)}</span>
                  </div>
                )}
                {project.end_date && (
                  <div>
                    <span>Ends: {formatDate(project.end_date)}</span>
                  </div>
                )}
              </div>

              <Link
                to={`/lms/student/client-lab/${project.id}`}
              >
                <span>View Project Board</span>
              </Link>
            </Card>
          ))}
        </div>
      )}

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>About Client Lab</CardTitle>
            <CardDescription>
              Client Lab provides real-world project experience working with actual clients. You'll collaborate with mentors and other students to deliver real solutions. 
              Track your tasks, submit deliverables, and receive feedback from mentors.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
