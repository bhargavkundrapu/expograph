import { useEffect, useMemo, useState } from "react";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaBook, FaPlus, FaSync, FaEye, FaEyeSlash, FaCog, FaCheckCircle, FaCircle } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

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
    <div className="space-y-8 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-8 shadow-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30">
                <FaBook className="text-white text-xl" />
              </div>
              <div>
                <h1 className="section-hero text-4xl mb-2">Content Admin</h1>
                <p className="section-body text-gray-300 text-lg">
                  Create courses, then publish them (published courses appear for students).
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            icon={FaSync}
            onClick={loadCourses}
            type="button"
          >
            Refresh
          </Button>
        </div>
      </div>

      {err ? (
        <Card variant="elevated" className="p-6 border-red-500/30 bg-red-500/5">
          <div className="text-red-300 mb-4">{err}</div>
          <Button
            variant="gradient"
            size="sm"
            icon={FaSync}
            onClick={loadCourses}
            type="button"
          >
            Retry
          </Button>
        </Card>
      ) : null}

      {/* Create Course */}
      <Card variant="elevated" className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
            <FaPlus className="text-white text-xl" />
          </div>
          <CardTitle className="text-2xl">Create Course</CardTitle>
        </div>

        <form onSubmit={createCourse} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                <FaBook className="text-cyan-400" />
                Title
              </label>
              <input
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="React Basics"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                <FaBook className="text-cyan-400" />
                Description
              </label>
              <input
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Start from zero"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <Button
              variant="gradient"
              size="lg"
              icon={FaPlus}
              disabled={saving}
              type="submit"
            >
              {saving ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Courses List */}
      <Card variant="elevated" className="p-0 overflow-hidden">
        <div className="border-b border-gray-800 px-8 py-6 bg-gradient-to-r from-gray-900 to-black">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
              <FaBook className="text-blue-400" />
            </div>
            <CardTitle className="text-2xl">Courses</CardTitle>
            <span className="ml-auto px-4 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-400">
              {sorted.length} total
            </span>
          </div>
        </div>

        {loading ? (
          <div className="px-8 py-12 text-center text-gray-500">
            <div className="inline-block p-4 rounded-full bg-gray-900 border border-gray-800 mb-4 animate-pulse-slow">
              <FaBook className="text-2xl text-gray-600" />
            </div>
            <p>Loading courses…</p>
          </div>
        ) : sorted.length === 0 ? (
          <div className="px-8 py-12 text-center text-gray-500">
            <div className="inline-block p-4 rounded-full bg-gray-900 border border-gray-800 mb-4">
              <FaBook className="text-2xl text-gray-600" />
            </div>
            <p>No courses yet. Create one above.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {sorted.map((c, idx) => {
              const busy = busyIds.has(c.id);
              const isPublished = c.status === "published";

              return (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 hover:bg-gray-900/50 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isPublished ? (
                        <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30">
                          <FaCheckCircle className="text-emerald-400" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">
                          <FaCircle className="text-gray-600 text-xs" />
                        </div>
                      )}
                      <div className="font-bold text-white text-lg">{c.title}</div>
                    </div>
                    <div className="text-xs text-gray-500 ml-11">
                      id: <span className="text-gray-400 font-mono">{c.id}</span>
                      {c.slug && (
                        <>
                          <span className="mx-2">•</span>
                          slug: <span className="text-gray-400 font-mono">{c.slug}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-2 border-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        isPublished
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                          : "border-gray-700 bg-gray-900 text-gray-400"
                      }`}
                    >
                      {isPublished ? <FaEye /> : <FaEyeSlash />}
                      {c.status}
                    </span>

                    <Button
                      variant={isPublished ? "outline" : "gradient"}
                      size="sm"
                      icon={isPublished ? FaEyeSlash : FaEye}
                      disabled={busy}
                      onClick={() => togglePublish(c)}
                      type="button"
                    >
                      {busy
                        ? "Saving..."
                        : isPublished
                        ? "Unpublish"
                        : "Publish"}
                    </Button>
                    <Link
                      to={`/lms/superadmin/content/${c.id}`}
                      className="inline-flex items-center gap-2 border-2 border-gray-700 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <FaCog />
                      Manage
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <div className="text-xs text-white opacity-80">
        Note: If your backend returns different course fields, tell me the JSON shape and I'll adapt instantly.
      </div>
    </div>
  );
}
