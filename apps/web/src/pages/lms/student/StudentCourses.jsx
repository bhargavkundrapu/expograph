import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";

function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
      <Skeleton className="mt-5 h-9 w-28" />
    </div>
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

      // Stable ordering (if backend gives position/sort_order)
      list.sort((a, b) =>
        (a.position ?? a.sort_order ?? 0) - (b.position ?? b.sort_order ?? 0) ||
        new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
      );

      setCourses(list);
    } catch (e) {
      // if aborted, ignore
      if (signal?.aborted) return;
      setErr(e?.message || "Failed to load courses.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  // ✅ No refetch loops pattern
  useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
    // token changes -> refetch once (correct)
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-sm text-slate-300">
            Published courses only. Learn step-by-step. No confusion, only progress. 😤📈
          </p>
        </div>

        <div className="w-full sm:w-80">
          <label className="text-sm text-slate-300">Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="React, JS, SQL…"
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No courses found"
          message="Try a different keyword. Or we’ll publish more soon."
          ctaText="Go to Academy"
          ctaTo="/academy"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="group rounded-2xl border border-slate-800 bg-slate-900/30 p-5 hover:bg-slate-900/50 transition"
            >
              <div className="text-xs text-slate-400">
                {c.level ? `Level: ${c.level}` : "Course"}
              </div>
              <div className="mt-1 text-lg font-semibold">{c.title}</div>
              <div className="mt-2 text-sm text-slate-300 line-clamp-3">
                {c.description || "No description yet."}
              </div>

              <div className="mt-5">
                <Link
                  to={`/lms/student/courses/${c.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
                >
                  Open Course →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}