import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Lessons Manager</h1>
          <p className="text-sm text-slate-300">
            Course → Module → Lessons (draft/publish).
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadTree}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
            type="button"
          >
            Refresh
          </button>
          <Link
            to={`/lms/superadmin/content/${courseId}`}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
          >
            ← Back to Modules
          </Link>
        </div>
      </div>

      {err ? (
        <div className="rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {err}{" "}
          <button onClick={loadTree} className="ml-2 underline underline-offset-2" type="button">
            Retry
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="text-sm text-slate-300">Loading…</div>
      ) : (
        <>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="text-sm text-slate-400">Course</div>
            <div className="mt-1 font-semibold">{course?.title || "Course"}</div>

            <div className="mt-4 text-sm text-slate-400">Module</div>
            <div className="mt-1 text-lg font-semibold">
              {module ? `${module.position}. ${module.title}` : "Module not found"}
            </div>
            <div className="mt-1 text-xs text-slate-500">Module ID: {moduleId}</div>
          </div>

          {/* Create lesson */}
          <form onSubmit={createLesson} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="mb-3 font-semibold">Create Lesson</div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="text-sm text-slate-300">Title</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Props + State"
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Position</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                disabled={saving}
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-60"
                type="submit"
              >
                {saving ? "Creating…" : "Create Lesson"}
              </button>
            </div>
          </form>

          {/* Lessons list */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20">
            <div className="border-b border-slate-800 px-5 py-3 font-semibold">
              Lessons
            </div>

            {sortedLessons.length === 0 ? (
              <div className="px-5 py-6 text-sm text-slate-300">
                No lessons yet. Create one above.
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {sortedLessons.map((l) => {
                  const busy = busyIds.has(l.id);
                  const isPublished = l.status === "published";

                  return (
                    <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                      <div>
                        <div className="font-semibold">
                          {l.position}. {l.title}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">Lesson ID: {l.id}</div>
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
                          {l.status}
                        </span>

                        <button
                          disabled={busy}
                          onClick={() => toggleLessonStatus(l)}
                          className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900 disabled:opacity-60"
                          type="button"
                        >
                          {busy ? "Saving…" : isPublished ? "Unpublish" : "Publish"}
                        </button>

                        {/* next step: resources & practice */}
                        <button   
                          className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900 disabled:opacity-60"
                          type="button"
                          title="Next step: resources + practice editor"
                        >
                            <Link
                            to={`/lms/superadmin/content/${courseId}/lessons/${l.id}`}
                           
                            >
                            Edit →
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
            Premium note: We always reload canonical data from <code>/courses/:courseId/tree</code> so refresh/back never loses state.
          </div>
        </>
      )}
    </div>
  );
}
