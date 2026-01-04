import { useEffect, useMemo, useState } from "react";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";
import { Link } from "react-router-dom";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Content Admin</h1>
          <p className="text-sm text-slate-300">
            Create courses, then publish them (published courses appear for students).
          </p>
        </div>

        <button
          onClick={loadCourses}
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
          type="button"
        >
          Refresh
        </button>
      </div>

      {err ? (
        <div className="rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {err}{" "}
          <button
            onClick={loadCourses}
            className="ml-2 underline underline-offset-2"
            type="button"
          >
            Retry
          </button>
        </div>
      ) : null}

      {/* Create Course */}
      <form
        onSubmit={createCourse}
        className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
      >
        <div className="mb-3 font-semibold">Create Course</div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-300">Title</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="React Basics"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Description</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Start from zero"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            disabled={saving}
            className="rounded-lg bg-yellow px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-60"
            type="submit"
          >
            {saving ? "Creating..." : "Create"}
          </button>
        </div>
      </form>

      {/* Courses List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/20">
        <div className="border-b border-slate-800 px-5 py-3 font-semibold">
          Courses
        </div>

        {loading ? (
          <div className="px-5 py-6 text-sm text-slate-300">Loading courses…</div>
        ) : sorted.length === 0 ? (
          <div className="px-5 py-6 text-sm text-slate-300">
            No courses yet. Create one above.
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {sorted.map((c) => {
              const busy = busyIds.has(c.id);
              const isPublished = c.status === "published";

              return (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                >
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="mt-1 text-xs text-slate-400">
                      id: {c.id} {c.slug ? `• slug: ${c.slug}` : ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={[
                        "rounded-full border px-2.5 py-1 text-xs",
                        isPublished
                          ? "border-green-900/60 bg-green-950/30 text-green-200"
                          : "border-slate-700 bg-slate-950/30 text-slate-300",
                      ].join(" ")}
                    >
                      {c.status}
                    </span>

                    <button
                      disabled={busy}
                      onClick={() => togglePublish(c)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-lg hover:bg-slate-900 disabled:opacity-60"
                      type="button"
                    >
                      {busy
                        ? "Saving..."
                        : isPublished
                        ? "Unpublish"
                        : "Publish"}
                    </button>
                    <button className="rounded-lg border border-slate-700 px-3 py-2 text-lg hover:bg-slate-900 disabled:opacity-60 ">
                    <Link
                    to={`/lms/superadmin/content/${c.id}`}
                    >
                    Manage
                    </Link>
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="text-xs text-slate-500">
        Note: If your backend returns different course fields, tell me the JSON shape and I’ll adapt instantly.
      </div>
    </div>
  );
}
