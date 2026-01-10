import { useEffect, useMemo, useState } from "react";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaBook, FaPlus, FaRedo, FaEye, FaEyeSlash, FaCog, FaCheckCircle, FaCircle, FaSpinner } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

function extractList(res) {
  // tries hard to support different backend response shapes
  const d = res?.data ?? res;
  if (!d) return [];
  if (Array.isArray(d)) return d;

  // common patterns: {items:[]}, {courses:[]}, {rows:[]}
  const candidates = [d.items, d.courses, d.rows, d.data, d.result];
  for (const c of candidates) {
    if (Array.isArray(c)) return c;
  }
  return [];
}

function normalizeCourse(c) {
  return {
    id: c.id || c.course_id || c._id,
    title: c.title || c.name || "Untitled",
    slug: c.slug || c.code || "",
    status: c.status || (c.published ? "published" : "draft") || "draft",
    createdAt: c.created_at || c.createdAt || null,
  };
}

export default function SuperAdminContent() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [courses, setCourses] = useState([]);

  // Create form (basic)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // per-course action loading
  const [busyIds, setBusyIds] = useState(() => new Set());

  const sorted = useMemo(() => {
    return [...courses].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }, [courses]);

  async function loadCourses() {
    setErr("");
    setLoading(true);
    try {
      const res = await apiFetch("/api/v1/admin/courses", { token });
      const list = extractList(res).map(normalizeCourse).filter((x) => x.id);
      setCourses(list);
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 403) setErr("Forbidden: You don’t have permission to view admin courses.");
        else if (e.status === 401) setErr("Unauthorized: Please login again.");
        else setErr(e.message || "Failed to load courses.");
      } else {
        setErr("Network error / server cold start. Hit Retry.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createCourse(e) {
    e.preventDefault();
    setErr("");

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setErr("Title is required.");
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch("/api/v1/admin/courses", {
        method: "POST",
        token,
        body: {
          title: cleanTitle,
          description: description.trim() || undefined,
        },
      });

      const createdRaw =
        res?.data?.course || res?.data || res?.course || res;
      const created = normalizeCourse(createdRaw);

      if (created.id) {
        setCourses((prev) => [created, ...prev]);
      } else {
        // fallback: reload list if response shape is unknown
        await loadCourses();
      }

      setTitle("");
      setDescription("");
    } catch (e2) {
      setErr(e2?.message || "Failed to create course.");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(course) {
    const id = course.id;
    if (!id) return;

    setErr("");
    setBusyIds((prev) => new Set(prev).add(id));

    const prevStatus = course.status;
    const nextStatus = prevStatus === "published" ? "draft" : "published";

    // optimistic update
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
    );

    try {
      await apiFetch(`/api/v1/admin/courses/${id}/status`, {
        method: "PATCH",
        token,
        body: { status: nextStatus },
      });
    } catch (e) {
      // rollback
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: prevStatus } : c))
      );
      setErr(
        e?.message ||
          "Failed to change status. (If API expects different body, tell me.)"
      );
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
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaBook className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Admin</h1>
            <p className="text-sm text-gray-600 mt-1">
              Create courses, then publish them (published courses appear for students)
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadCourses}
          icon={FaRedo}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Error State */}
      {err && (
        <ErrorState
          title="Failed to load courses"
          message={err}
          onRetry={loadCourses}
          size="sm"
        />
      )}

      {/* Create Course Form */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaPlus className="w-4 h-4 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Create Course</h2>
          </div>

          <form onSubmit={createCourse} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaBook className="inline w-3.5 h-3.5 mr-1.5 text-gray-500" />
                  Course Title
                </label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., React Basics"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaBook className="inline w-3.5 h-3.5 mr-1.5 text-gray-500" />
                  Description
                </label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Start from zero"
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
                {saving ? "Creating Course..." : "Create Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Courses List */}
      <Card>
        <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FaBook className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Courses
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
              {sorted.length} total
            </span>
          </div>
        </div>

        {loading ? (
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        ) : sorted.length === 0 ? (
          <CardContent className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 mb-4">
              <FaBook className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm">
              No courses yet. Create your first course above.
            </p>
          </CardContent>
        ) : (
          <div className="divide-y divide-gray-100">
            {sorted.map((c) => {
              const busy = busyIds.has(c.id);
              const isPublished = c.status === "published";

              return (
                <div
                  key={c.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    {isPublished ? (
                      <FaCheckCircle className="flex-shrink-0 w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <FaCircle className="flex-shrink-0 w-5 h-5 text-gray-300 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-lg">{c.title}</h3>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 space-x-2">
                        <span>ID: <span className="font-mono text-gray-600">{c.id}</span></span>
                        {c.slug && (
                          <>
                            <span>•</span>
                            <span>Slug: <span className="font-mono text-gray-600">{c.slug}</span></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={[
                        "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5",
                        isPublished
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm"
                          : "bg-gray-200 text-gray-700",
                      ].join(" ")}
                    >
                      {isPublished ? <FaEye className="w-3 h-3" /> : <FaEyeSlash className="w-3 h-3" />}
                      {c.status}
                    </span>

                    <Button
                      variant={isPublished ? "outline" : "primary"}
                      size="sm"
                      onClick={() => togglePublish(c)}
                      disabled={busy}
                      icon={busy ? FaSpinner : isPublished ? FaEyeSlash : FaEye}
                      className={busy ? "animate-pulse" : ""}
                    >
                      {busy ? "Saving..." : isPublished ? "Unpublish" : "Publish"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      as={Link}
                      to={`/lms/superadmin/content/${c.id}`}
                      icon={FaCog}
                    >
                      Manage
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
          <strong>Note:</strong> If your backend returns different course fields, let us know and we'll adapt instantly.
        </p>
      </div>
    </div>
  );
}
