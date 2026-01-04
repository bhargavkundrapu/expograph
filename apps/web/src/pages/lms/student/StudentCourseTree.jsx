import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";
import { FaBook, FaChartLine, FaArrowLeft, FaCheckCircle, FaCircle, FaArrowRight, FaPlay } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Card from "../../../components/ui/Card";

function TreeSkeleton() {
  return (
    <div className="space-y-4">
      <div className="border-2 border-white bg-black p-6">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border-2 border-white bg-black p-6">
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
  const [progress, setProgress] = useState({ total: 0, completed: 0, percent: 0, completedLessonIds: [] });
  
const completedSet = new Set(progress?.completedLessonIds || []);
const isCompleted = (lessonId) => completedSet.has(lessonId);
  async function load(signal) {
  setErr("");
  setLoading(true);
  try {
    const [treeJson, progJson] = await Promise.all([
      apiFetch(`/api/v1/courses/${courseSlug}`, { token, signal }),
      apiFetch(`/api/v1/lms/courses/${courseSlug}/progress`, { token, signal }),
    ]);

    const treeData = unwrapData(treeJson);
    const progData = unwrapData(progJson);

    const courseObj = treeData?.course ?? treeData;
    const mods = Array.isArray(courseObj?.modules) ? courseObj.modules : [];

    // stable sort modules + lessons
    mods.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    mods.forEach((m) => {
      if (Array.isArray(m.lessons)) m.lessons.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    });

    setCourse(courseObj);
    setModules(mods);
    setProgress(progData || { total: 0, completed: 0, percent: 0, completedLessonIds: [] });
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
  if (loading) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-white bg-black p-6">
        <div className="h-6 w-64 animate-pulse bg-white opacity-20" />
        <div className="mt-3 h-4 w-full animate-pulse bg-white opacity-20" />
        <div className="mt-2 h-4 w-5/6 animate-pulse bg-white opacity-20" />
      </div>
      <div className="border-2 border-white bg-black p-6">
        <div className="h-5 w-40 animate-pulse bg-white opacity-20" />
        <div className="mt-3 h-20 w-full animate-pulse bg-white opacity-20" />
      </div>
    </div>
  );
}
  return (
    <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
      <Card variant="gradient" className="p-6" style={{ marginBottom: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-center justify-between" style={{ marginBottom: '1rem' }}>
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <div className="text-xl font-bold section-title" style={{ margin: 0 }}>Your Progress</div>
              <div className="text-sm text-gray-400" style={{ marginTop: '0.25rem' }}>Track your learning journey</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{progress.percent}%</div>
            <div className="text-xs text-gray-400" style={{ margin: 0 }}>{progress.completed}/{progress.total} completed</div>
          </div>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800 border border-gray-700" style={{ marginTop: '1rem' }}>
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-cyan-500/50"
            style={{ width: `${progress.percent || 0}%`, height: '100%' }}
          />
        </div>

        <div className="layout-flex items-center gap-2 text-xs text-gray-400" style={{ marginTop: '1rem' }}>
          <HiSparkles className="text-cyan-400 animate-pulse-slow" />
          <span>Small daily progress = exponential growth 📈</span>
        </div>
      </Card>
      <div className="layout-flex flex-wrap items-center justify-between gap-lg" style={{ marginBottom: '1.5rem', width: '100%' }}>
        <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '0.75rem' }}>
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500">
              <FaBook className="text-white" />
            </div>
            <h1 className="section-hero text-4xl" style={{ margin: 0 }}>{course?.title || "Course"}</h1>
          </div>
          <p className="section-body text-gray-300 text-lg" style={{ maxWidth: '42rem', margin: 0 }}>
            Modules & lessons (published only). Complete lessons to track your progress.
          </p>
        </div>

        <Link
          to={backToCourses}
          className="layout-flex items-center gap-2 border-2 border-gray-700 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-300"
          style={{ flex: '0 0 auto' }}
        >
          <FaArrowLeft />
          Back to Courses
        </Link>
      </div>

      {err ? <ErrorState title="Course load avvaledu" message={err} onRetry={() => {
        const ac = new AbortController();
        load(ac.signal);
      }} /> : null}

      {loading ? (
        <TreeSkeleton />
      ) : (
        <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
       
  {modules.map((m) => {
    const modSlug = m.slug ?? m.module_slug ?? m.moduleSlug ?? "";

    return (
      <Card
        key={m.id}
        variant="elevated"
        className="p-6 group"
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
            <FaBook className="text-purple-400 text-xl" />
          </div>
          <div className="text-2xl font-bold section-title" style={{ margin: 0 }}>{m.title}</div>
        </div>

        <div className="layout-flex-col gap-sm" style={{ width: '100%' }}>
          {(m.lessons || []).map((l, lessonIdx) => {
            const lesSlug = l.slug ?? l.lesson_slug ?? l.lessonSlug ?? "";
            const completed = isCompleted(l.id);

            const to =
              modSlug && lesSlug
                ? `/lms/student/courses/${courseSlug}/modules/${modSlug}/lessons/${lesSlug}`
                : null;

            return (
              <div
                key={l.id}
                className={`layout-flex items-center justify-between rounded-lg border-2 px-5 py-4 transition-all duration-300 ${
                  completed
                    ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30"
                    : "bg-gray-900 border-gray-800 hover:border-cyan-400/50 hover:bg-gray-800"
                }`}
                style={{ animationDelay: `${lessonIdx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
              >
                <div className="layout-flex items-center gap-lg" style={{ flex: '1 1 auto' }}>
                  {completed ? (
                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
                      <FaCheckCircle className="text-white text-lg" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">
                      <FaCircle className="text-gray-500 text-sm" />
                    </div>
                  )}
                  <div>
                    <div className={`font-semibold flex items-center gap-2 ${completed ? 'text-emerald-300' : 'text-white'}`}>
                      {l.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {l.status || "published"}
                    </div>
                  </div>
                </div>

                {to ? (
                  <Link
                    to={to}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      completed
                        ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30"
                        : "bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30"
                    } hover:scale-105 active:scale-95`}
                  >
                    <FaPlay className="text-xs" />
                    Open
                    <FaArrowRight className="text-xs" />
                  </Link>
                ) : (
                  <span className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-500 text-xs">
                    Missing slug
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    );
  })}
</div>
      )}
    </div>
  );
}