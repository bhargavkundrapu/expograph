import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRedo, FaArrowLeft, FaPlus, FaBook, FaListOl, FaSpinner } from "react-icons/fa";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

function normalizeModule(m) {
  return {
    id: m.id,
    title: m.title || "Untitled module",
    slug: m.slug || "",
    position: Number.isFinite(m.position) ? m.position : 0,
    status: m.status || "draft",
    createdAt: m.created_at || null,
  };
}

export default function SuperAdminCourseBuilder() {
  const { token } = useAuth();
  const { courseId } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]); // not used yet, but useful later

  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(1);
  const [saving, setSaving] = useState(false);

  // Prevent state updates after unmount (premium edge-case fix)
  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const sortedModules = useMemo(() => {
    return [...modules].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }, [modules]);

  async function loadTree() {
    setErr("");
    setLoading(true);

    try {
      // ✅ Correct endpoint from your backend
      const res = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      const tree = res?.data ?? res;

      if (!aliveRef.current) return;

      setCourse(tree?.course ?? null);
      setModules((tree?.modules ?? []).map(normalizeModule));
      setLessons(tree?.lessons ?? []);

      // smart default position = last + 1
      const lastPos = (tree?.modules ?? [])
        .map((m) => m.position || 0)
        .reduce((a, b) => Math.max(a, b), 0);

      setPosition(lastPos + 1);
    } catch (e) {
      if (!aliveRef.current) return;

      if (e instanceof ApiError) {
        if (e.status === 404) {
          setErr("Course not found (404). Check courseId in URL.");
        } else if (e.status === 401) {
          setErr("Unauthorized. Please login again.");
        } else if (e.status === 403) {
          setErr("Forbidden. You don’t have content:write permission.");
        } else {
          setErr(e.message || "Failed to load course tree.");
        }
      } else {
        setErr("Network/server issue (maybe Render cold start). Retry.");
      }
    } finally {
      if (aliveRef.current) setLoading(false);
    }
  }

  useEffect(() => {
    loadTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  async function createModule(e) {
    e.preventDefault();
    setErr("");

    const t = title.trim();
    if (!t) {
      setErr("Module title required.");
      return;
    }

    setSaving(true);
    try {
      // ✅ Correct create endpoint from your backend
      await apiFetch(`/api/v1/admin/courses/${courseId}/modules`, {
        method: "POST",
        token,
        body: { title: t, position: Number(position) || 1 },
      });

      // Premium rule: after a write, reload canonical state from server
      // so UI never lies.
      setTitle("");
      await loadTree();
    } catch (e2) {
      setErr(e2?.message || "Failed to create module.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <FaBook className="w-6 h-6 text-white" />
            </div>
            Course Builder
          </h1>
          <p className="text-sm text-gray-600">
            Manage modules and structure for this course
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadTree}
            icon={FaRedo}
            disabled={loading}
          >
            Refresh
          </Button>
          <Link to="/lms/superadmin/content">
            <Button variant="ghost" size="sm" icon={FaArrowLeft}>
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Error State */}
      {err ? (
        <ErrorState
          title="Error Loading Course"
          message={err}
          onRetry={loadTree}
          type="default"
          size="sm"
        />
      ) : null}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-6">
          <Card variant="elevated">
            <CardContent>
              <div className="flex items-center gap-4">
                <Skeleton variant="icon" className="!w-12 !h-12" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="title" className="!w-48" />
                  <Skeleton variant="textShort" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="space-y-4">
              <Skeleton variant="title" className="!w-32" />
              <div className="grid gap-3 md:grid-cols-3">
                <Skeleton variant="text" className="md:col-span-2" />
                <Skeleton variant="text" />
              </div>
              <Skeleton variant="button" className="!w-40" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* Course Info Card */}
          <Card variant="gradient" className="border-emerald-200">
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex-shrink-0">
                  <FaBook className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl mb-1">
                    {course?.title || "Untitled course"}
                  </CardTitle>
                  <CardDescription className="text-xs font-mono text-gray-500 mt-2">
                    ID: {courseId} {course?.slug ? `• slug: ${course.slug}` : ""}
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Module Form */}
          <Card variant="elevated">
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-50">
                  <FaPlus className="w-4 h-4 text-emerald-600" />
                </div>
                <CardTitle className="mb-0">Create New Module</CardTitle>
              </div>

              <form onSubmit={createModule} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FaBook className="w-3.5 h-3.5 text-gray-400" />
                      Module Title
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 hover:border-gray-300"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., JSX + Components, React Hooks, State Management"
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FaListOl className="w-3.5 h-3.5 text-gray-400" />
                      Position
                    </label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 outline-none transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 hover:border-gray-300"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      type="number"
                      min="1"
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={saving ? FaSpinner : FaPlus}
                    disabled={saving}
                    loading={saving}
                    className="min-w-[160px]"
                  >
                    {saving ? "Creating..." : "Create Module"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Modules List */}
          <Card variant="elevated">
            <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="mb-0 flex items-center gap-2">
                <FaBook className="w-5 h-5 text-emerald-600" />
                Modules ({sortedModules.length})
              </CardTitle>
            </div>

            <CardContent className="p-0">
              {sortedModules.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <FaBook className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">No modules yet</p>
                  <p className="text-xs text-gray-500">Create your first module above to get started</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {sortedModules.map((m, idx) => (
                    <div
                      key={m.id}
                      className="px-6 py-5 hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200 flex items-center justify-center font-bold text-emerald-700 text-sm">
                            {m.position}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                              {m.title}
                            </h3>
                            <p className="text-xs font-mono text-gray-500">
                              ID: {m.id} {m.slug ? `• slug: ${m.slug}` : ""}
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/lms/superadmin/content/${courseId}/modules/${m.id}`}
                          className="flex-shrink-0"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="group-hover:border-emerald-400 group-hover:text-emerald-600 transition-all"
                          >
                            Manage Lessons
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              <span className="font-mono font-semibold">Note:</span> This page loads from{" "}
              <code className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-emerald-600 font-mono text-xs">
                /courses/:courseId/tree
              </code>{" "}
              endpoint, ensuring data consistency across refreshes.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
