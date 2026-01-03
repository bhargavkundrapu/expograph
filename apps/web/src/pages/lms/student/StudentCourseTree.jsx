import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";

function TreeSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-3 h-4 w-72" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      ))}
    </div>
  );
}

export default function StudentCourseTree() {
  const { token } = useAuth();
  const { courseSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);

  async function load(signal) {
    setErr("");
    setLoading(true);
    try {
      const json = await apiFetch(`/api/v1/courses/${courseSlug}`, { token, signal });
     const data = unwrapData(json);

// backend may return { course: {...} } OR directly course object
const courseObj = data?.course ?? data;

// modules might be at courseObj.modules (new) or data.modules (old)
const mods = Array.isArray(courseObj?.modules) ? courseObj.modules : [];

// stable order
mods.sort((a, b) =>
  (a.position ?? 0) - (b.position ?? 0) ||
  new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
);

// and each module lessons stable sort
mods.forEach((m) => {
  if (Array.isArray(m.lessons)) {
    m.lessons.sort((a, b) =>
      (a.position ?? 0) - (b.position ?? 0) ||
      new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
    );
  }
});

setCourse(courseObj);
setModules(mods);
     console.log("MODULE SAMPLE:", mods[0]);
console.log("LESSON SAMPLE:", mods[0]?.lessons?.[0]);
    } catch (e) {
      if (signal?.aborted) return;
      setErr(e?.message || "Failed to load course.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  // No refetch loops
  useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
  }, [courseSlug, token]);

  const backToCourses = useMemo(() => "/lms/student/courses", []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{course?.title || "Course"}</h1>
          <p className="text-sm text-slate-300">
            Modules & lessons (published only). Next we’ll wire lesson player + progress.
          </p>
        </div>

        <Link
          to={backToCourses}
          className="rounded-xl border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
        >
          ← Back to Courses
        </Link>
      </div>

      {err ? <ErrorState title="Course load avvaledu" message={err} onRetry={() => {
        const ac = new AbortController();
        load(ac.signal);
      }} /> : null}

      {loading ? (
        <TreeSkeleton />
      ) : (
        <div className="space-y-4">
       
  {modules.map((m) => {
    const modSlug = m.slug ?? m.module_slug ?? m.moduleSlug ?? "";

    return (
      <div
        key={m.id}
        className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
      >
        <div className="text-lg font-semibold">{m.title}</div>

        <div className="mt-3 space-y-2">
          {(m.lessons || []).map((l) => {
            const lesSlug = l.slug ?? l.lesson_slug ?? l.lessonSlug ?? "";

            const to =
              modSlug && lesSlug
                ? `/lms/student/courses/${courseSlug}/modules/${modSlug}/lessons/${lesSlug}`
                : null;

            return (
              <div
                key={l.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3"
              >
                <div>
                  <div className="font-medium">{l.title}</div>
                  <div className="text-xs text-slate-500">
                    {l.status || "published"}
                  </div>
                </div>

                {to ? (
                  <Link
                    to={to}
                    className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
                  >
                    Open →
                  </Link>
                ) : (
                  <span className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400">
                    Missing slug
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  })}
</div>
      )}
    </div>
  );
}