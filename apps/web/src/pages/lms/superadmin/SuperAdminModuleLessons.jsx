import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRedo, FaArrowLeft, FaPlus, FaBook, FaGraduationCap, FaListOl, FaSpinner, FaEdit, FaCheckCircle, FaCircle } from "react-icons/fa";
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
    position: Number.isFinite(m.position) ? m.position : 0,
    status: m.status || "draft",
  };
}

function normalizeLesson(l) {
  return {
    id: l.id,
    moduleId: l.module_id || l.moduleId,
    title: l.title || "Untitled lesson",
    position: Number.isFinite(l.position) ? l.position : 0,
    status: l.status || "draft",
    createdAt: l.created_at || null,
  };
}

export default function SuperAdminModuleLessons() {
  const { token } = useAuth();
  const { courseId, moduleId } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [course, setCourse] = useState(null);
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);

  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(1);
  const [saving, setSaving] = useState(false);
  const [busyIds, setBusyIds] = useState(() => new Set());

  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }, [lessons]);

  async function loadTree() {
    setErr("");
    setLoading(true);

    try {
      const res = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      const tree = res?.data ?? res;

      if (!aliveRef.current) return;

      setCourse(tree?.course ?? null);

      const allModules = (tree?.modules ?? []).map(normalizeModule);
      const foundModule = allModules.find((m) => String(m.id) === String(moduleId));
      setModule(foundModule || null);

      const allLessons = (tree?.lessons ?? []).map(normalizeLesson);
      const filtered = allLessons.filter((l) => String(l.moduleId) === String(moduleId));
      setLessons(filtered);

      const lastPos = filtered.map((x) => x.position || 0).reduce((a, b) => Math.max(a, b), 0);
      setPosition(lastPos + 1);
    } catch (e) {
      if (!aliveRef.current) return;

      if (e instanceof ApiError) {
        if (e.status === 404) setErr("Not found (404). Check course/module IDs.");
        else if (e.status === 401) setErr("Unauthorized. Please login again.");
        else if (e.status === 403) setErr("Forbidden. Missing permission.");
        else setErr(e.message || "Failed to load lessons.");
      } else {
        setErr("Network/server issue (cold start). Retry.");
      }
    } finally {
      if (aliveRef.current) setLoading(false);
    }
  }

  useEffect(() => {
    loadTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, moduleId]);

  async function createLesson(e) {
    e.preventDefault();
    setErr("");

    const t = title.trim();
    if (!t) {
      setErr("Lesson title required.");
      return;
    }

    setSaving(true);
    try {
      // ✅ backend pattern you mentioned: create lessons under module
      await apiFetch(`/api/v1/admin/modules/${moduleId}/lessons`, {
        method: "POST",
        token,
        body: {
          title: t,
          position: Number(position) || 1,
        },
      });

      setTitle("");
      await loadTree(); // canonical refresh
    } catch (e2) {
      setErr(e2?.message || "Failed to create lesson.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleLessonStatus(lesson) {
    const id = lesson.id;
    if (!id) return;

    setErr("");
    setBusyIds((prev) => new Set(prev).add(id));

    const prevStatus = lesson.status;
    const nextStatus = prevStatus === "published" ? "draft" : "published";

    // optimistic UI
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l))
    );

    try {
      await apiFetch(`/api/v1/admin/lessons/${id}/status`, {
        method: "PATCH",
        token,
        body: { status: nextStatus },
      });
    } catch (e) {
      // rollback
      setLessons((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: prevStatus } : l))
      );
      setErr(e?.message || "Failed to change lesson status.");
    } finally {
      setBusyIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaGraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lessons Manager</h1>
            <p className="text-sm text-gray-600 mt-1">
              Course → Module → Lessons (draft/publish)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={loadTree}
            icon={FaRedo}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            as={Link}
            to={`/lms/superadmin/content/${courseId}`}
            icon={FaArrowLeft}
          >
            Back to Modules
          </Button>
        </div>
      </div>

      {/* Error State */}
      {err && (
        <ErrorState
          title="Failed to load lessons"
          message={err}
          onRetry={loadTree}
          size="sm"
        />
      )}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <>
          {/* Course & Module Info */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <FaBook className="w-4 h-4" />
                    <span>Course</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {course?.title || "Course"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ID: {courseId}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <FaListOl className="w-4 h-4" />
                    <span>Module</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {module ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-white text-xs font-bold">
                          {module.position}
                        </span>
                        <span>{module.title}</span>
                      </div>
                    ) : (
                      "Module not found"
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Module ID: {moduleId}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Lesson Form */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaPlus className="w-4 h-4 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Create Lesson</h2>
              </div>

              <form onSubmit={createLesson} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaBook className="inline w-3.5 h-3.5 mr-1.5 text-gray-500" />
                      Lesson Title
                    </label>
                    <input
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Props + State Management"
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaListOl className="inline w-3.5 h-3.5 mr-1.5 text-gray-500" />
                      Position
                    </label>
                    <input
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      type="number"
                      min="1"
                      disabled={saving}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={saving ? FaSpinner : FaPlus}
                    disabled={saving}
                    className={saving ? "animate-pulse" : ""}
                  >
                    {saving ? "Creating Lesson..." : "Create Lesson"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Lessons List */}
          <Card>
            <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2">
                <FaGraduationCap className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Lessons ({sortedLessons.length})
                </h2>
              </div>
            </div>

            {sortedLessons.length === 0 ? (
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 mb-4">
                  <FaGraduationCap className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm">
                  No lessons yet. Create your first lesson above.
                </p>
              </CardContent>
            ) : (
              <div className="divide-y divide-gray-100">
                {sortedLessons.map((l) => {
                  const busy = busyIds.has(l.id);
                  const isPublished = l.status === "published";

                  return (
                    <div
                      key={l.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-sm font-bold shadow-sm">
                          {l.position}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">{l.title}</h3>
                            {isPublished ? (
                              <FaCheckCircle className="w-4 h-4 text-green-600" title="Published" />
                            ) : (
                              <FaCircle className="w-4 h-4 text-gray-300" title="Draft" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Lesson ID: {l.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={[
                            "px-3 py-1 rounded-full text-xs font-medium",
                            isPublished
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm"
                              : "bg-gray-200 text-gray-700",
                          ].join(" ")}
                        >
                          {l.status}
                        </span>

                        <Button
                          variant={isPublished ? "outline" : "primary"}
                          size="sm"
                          onClick={() => toggleLessonStatus(l)}
                          disabled={busy}
                          icon={busy ? FaSpinner : isPublished ? FaCircle : FaCheckCircle}
                          className={busy ? "animate-pulse" : ""}
                        >
                          {busy ? "Saving..." : isPublished ? "Unpublish" : "Publish"}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          as={Link}
                          to={`/lms/superadmin/content/${courseId}/lessons/${l.id}`}
                          icon={FaEdit}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Info Note */}
          <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Premium architecture:</strong> All data reloads from{" "}
              <code className="px-1.5 py-0.5 bg-blue-100 rounded text-blue-800">
                /courses/:courseId/tree
              </code>{" "}
              to ensure consistency.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
