import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
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
          certificates: 0,
          internships: 0,
          clientLab: 0,
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
      <div>
        <Skeleton />
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
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
    { label: "Courses", value: stats.courses },
    { label: "Workshops", value: stats.workshops },
    { label: "Leads", value: stats.leads },
    { label: "Certificates", value: stats.certificates },
    { label: "Internships", value: stats.internships },
    { label: "Feature Flags", value: stats.featureFlags },
  ];

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <h1>Analytics & Statistics</h1>
          <p>Platform overview and key metrics</p>
        </div>
      </div>

      <div>
        {statCards.map((stat, idx) => (
          <Card
            key={stat.label}
            variant="elevated"
          >
            <div>
              <div>
              </div>
              <div>
                <div>{stat.value}</div>
                <div>{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>
              View key metrics and statistics about your platform. This dashboard provides an overview of courses, workshops, 
              leads, certificates, internships, and feature flags. More detailed analytics can be added as needed.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
