import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";
import Card, { CardTitle, CardDescription } from "../../../Components/ui/Card";

function CourseCardSkeleton() {
  return (
    <Card variant="elevated">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Card>
  );
}

export default function StudentCourses() {
  const { token } = useAuth();

  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [courses, setCourses] = useState([]);

  async function load(signal) {
    setErr("");
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/courses", { token, signal });
      const list = unwrapArray(json);

      list.sort((a, b) =>
        (a.position ?? a.sort_order ?? 0) - (b.position ?? b.sort_order ?? 0) ||
        new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
      );

      setCourses(list);
    } catch (e) {
      if (signal?.aborted) return;
      setErr(e?.message || "Failed to load courses.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
  }, [token]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return courses;
    return courses.filter((c) => {
      const title = (c.title || "").toLowerCase();
      const desc = (c.description || "").toLowerCase();
      const slug = (c.slug || "").toLowerCase();
      return title.includes(needle) || desc.includes(needle) || slug.includes(needle);
    });
  }, [courses, q]);

  return (
    <div>
      <div>
        <div>
          <div>
          </div>
          <h1>Courses</h1>
        </div>
        <p>
          Published courses only. Learn step-by-step. No confusion, only progress. 😤📈
        </p>
      </div>

      <div>
        <label>
          Search Courses
        </label>
        <div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="React, JS, SQL…"
          />
        </div>
      </div>

      {err ? (
        <ErrorState
          title="Courses load avvaledu"
          message={err}
          onRetry={() => {
            const ac = new AbortController();
            load(ac.signal);
          }}
        />
      ) : null}

      {loading ? (
        <div>
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No courses found"
          message="Try a different keyword. Or we'll publish more soon."
          ctaText="Go to Academy"
          ctaTo="/academy"
        />
      ) : (
        <div>
          {filtered.map((c, idx) => (
            <Card
              key={c.id}
              variant="elevated"
            >
              <div>
                <div>
                </div>
                <span>
                  {c.level || "Course"}
                </span>
              </div>
              <CardTitle>
                {c.title}
              </CardTitle>
              <CardDescription>
                {c.description || "No description yet."}
              </CardDescription>
              <Link
                to={`/lms/student/courses/${c.slug}`}
              >
                <span>Open Course</span>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
