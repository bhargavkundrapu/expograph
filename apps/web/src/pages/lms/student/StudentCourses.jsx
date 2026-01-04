import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import { apiFetch } from "../../../services/api";
import { unwrapArray } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";
import { FaBook, FaSearch, FaArrowRight, FaGraduationCap } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";

function CourseCardSkeleton() {
  return (
    <Card variant="elevated" className="p-6">
      <Skeleton className="h-5 w-40 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <Skeleton className="h-10 w-32 rounded-lg" />
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
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      <div className="layout-flex flex-wrap items-end justify-between gap-lg" style={{ marginBottom: '2rem' }}>
        <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1rem' }}>
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
              <FaBook className="text-white text-xl" />
            </div>
            <h1 className="section-hero text-4xl" style={{ margin: 0 }}>Courses</h1>
          </div>
          <p className="section-body text-gray-300 text-lg" style={{ maxWidth: '42rem', margin: 0 }}>
            Published courses only. Learn step-by-step. No confusion, only progress. 😤📈
          </p>
        </div>

        <div style={{ width: '100%', maxWidth: '320px', flex: '0 0 auto' }}>
          <label className="layout-flex items-center gap-2 text-sm font-semibold text-white" style={{ marginBottom: '0.75rem' }}>
            <FaSearch className="text-cyan-400" />
            Search Courses
          </label>
          <div className="position-relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="React, JS, SQL…"
              className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 pl-11 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              style={{ boxSizing: 'border-box' }}
            />
            <FaSearch className="position-absolute" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666' }} />
          </div>
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
        <div className="layout-grid-3 gap-lg" style={{ width: '100%' }}>
          {filtered.map((c, idx) => (
            <Card
              key={c.id}
              variant="elevated"
              className="group animate-fadeIn"
              style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
                  <FaGraduationCap className="text-cyan-400 text-lg" />
                </div>
                <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  {c.level || "Course"}
                </span>
              </div>
              <CardTitle className="text-xl mb-3 group-hover:text-cyan-400 transition-colors">
                {c.title}
              </CardTitle>
              <CardDescription className="text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                {c.description || "No description yet."}
              </CardDescription>
              <Link
                to={`/lms/student/courses/${c.slug}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300 group/link"
              >
                <span>Open Course</span>
                <FaArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}