import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
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

  const quickActions = [];
  
  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_SUBMISSIONS)) {
    quickActions.push({
      title: "Submissions Queue",
      desc: "Review student submissions and provide feedback",
      to: "/lms/mentor/submissions",
    });
  }

  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_CLIENT_LAB)) {
    quickActions.push({
      title: "Client Lab Tasks",
      desc: "Review client lab project tasks",
      to: "/lms/mentor/client-lab",
    });
  }

  if (checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_INTERNSHIPS)) {
    quickActions.push({
      title: "Internship Reviews",
      desc: "Review internship deliverables",
      to: "/lms/mentor/internships",
    });
  }

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
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Mentor Portal</h1>
              <p>Review and guide student work</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{stats.pending}</div>
              <div>Pending Review</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{stats.reviewed}</div>
              <div>Reviewed</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{stats.total}</div>
              <div>Total Submissions</div>
            </div>
          </div>
        </Card>
      </div>

      {quickActions.length > 0 && (
        <div>
          <h2>Quick Actions</h2>
          <div>
            {quickActions.map((action, idx) => {
              return (
                <Link key={action.to} to={action.to}>
                  <Card
                    variant="elevated"
                  >
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>{action.title}</CardTitle>
                        <CardDescription>{action.desc}</CardDescription>
                      </div>
                      <div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {quickActions.length === 0 && (
        <Card variant="elevated">
          <CardTitle>No Features Available</CardTitle>
          <CardDescription>All mentor features are currently disabled. Contact your administrator.</CardDescription>
        </Card>
      )}
    </div>
  );
}
