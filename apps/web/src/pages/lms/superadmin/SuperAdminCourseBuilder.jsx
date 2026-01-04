import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Course Builder</h1>
          <p className="text-sm text-white">
            Manage modules for this course (admin).
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadTree}
            className=" border-2 border-white px-3 py-2 text-sm hover:bg-white hover:text-black"
            type="button"
          >
            Refresh
          </button>
          <Link
            to="/lms/superadmin/content"
            className=" border-2 border-white px-3 py-2 text-sm hover:bg-white hover:text-black"
          >
            ← Back
          </Link>
        </div>
      </div>

      {err ? (
        <div className=" border border-2 border-white bg-black px-4 py-3 text-sm text-white">
          {err}{" "}
          <button
            onClick={loadTree}
            className="ml-2 underline underline-offset-2"
            type="button"
          >
            Retry
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="text-sm text-white">Loading course…</div>
      ) : (
        <>
          <div className=" border-2 border-white bg-black p-5">
            <div className="text-sm text-white opacity-80">Course</div>
            <div className="mt-1 text-xl font-semibold">
              {course?.title || "Untitled course"}
            </div>
            <div className="mt-1 text-xs text-white opacity-80">
              ID: {courseId} {course?.slug ? `• slug: ${course.slug}` : ""}
            </div>
          </div>

          <form
            onSubmit={createModule}
            className=" border-2 border-white bg-black p-5"
          >
            <div className="mb-3 font-semibold">Create Module</div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="text-sm text-white">Title</label>
                <input
                  className="mt-1 w-full  border-2 border-white bg-black px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="JSX + Components"
                />
              </div>
              <div>
                <label className="text-sm text-white">Position</label>
                <input
                  className="mt-1 w-full  border-2 border-white bg-black px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
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
                className=" border-2 border-white bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition-all disabled:opacity-60"
                type="submit"
              >
                {saving ? "Creating…" : "Create Module"}
              </button>
            </div>
          </form>

          <div className=" border-2 border-white bg-black">
            <div className="border-b-2 border-white px-5 py-3 font-semibold">
              Modules
            </div>

            {sortedModules.length === 0 ? (
              <div className="px-5 py-6 text-sm text-white">
                No modules yet. Create one above.
              </div>
            ) : (
              <div className="divide-y divide-y-2 divide-white">
                {sortedModules.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                  >
                    <div>
                      <div className="font-semibold">
                        {m.position}. {m.title}
                      </div>
                      <div className="mt-1 text-xs text-white opacity-80">
                        Module ID: {m.id} {m.slug ? `• slug: ${m.slug}` : ""}
                      </div>
                    </div>

                    <Link
                      to={`/lms/superadmin/content/${courseId}/modules/${m.id}`}
                      className=" border-2 border-white px-3 py-2 text-sm hover:bg-white hover:text-black"
                    >
                      Manage Lessons →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-xs text-white opacity-80">
            Note: This page loads from <code>/courses/:courseId/tree</code> (your backend standard),
            so refresh/back will never “lose” data again.
          </div>
        </>
      )}
    </div>
  );
}
