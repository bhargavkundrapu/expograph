import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";

function normalizeLesson(l) {
  return {
    id: l.id,
    moduleId: l.module_id || l.moduleId,
    title: l.title || "Untitled lesson",
    position: Number.isFinite(l.position) ? l.position : 0,
    status: l.status || "draft",
    // These keys may vary by your backend. We keep flexible.
    summary: l.summary || "",
    videoId: l.video_id || l.videoId || "",

  };
}

export default function SuperAdminLessonEditor() {
  const { token } = useAuth();
  const { courseId, lessonId } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [saving, setSaving] = useState(false);

  const [lesson, setLesson] = useState(null);

  // form fields
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(1);
  const [summary, setSummary] = useState("");
const [videoId, setVideoId] = useState("");


  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => (aliveRef.current = false);
  }, []);

  async function loadLessonFromTree() {
    setErr("");
    setInfo("");
    setLoading(true);
    try {
      // ✅ use canonical tree so we don't guess new endpoints
      const res = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      const tree = res?.data ?? res;

      const found = (tree?.lessons ?? []).find((x) => String(x.id) === String(lessonId));
      if (!found) throw new ApiError("Lesson not found in course tree.", 404, null);

      const n = normalizeLesson(found);
      if (!aliveRef.current) return;

      setLesson(n);
      setTitle(n.title);
      setPosition(n.position || 1);
      setSummary(n.summary || "");
      setVideoId(n.videoId || "");

    } catch (e) {
      if (!aliveRef.current) return;

      if (e instanceof ApiError) setErr(e.message);
      else setErr("Network/server issue. Retry.");
    } finally {
      if (aliveRef.current) setLoading(false);
    }
  }

  useEffect(() => {
    loadLessonFromTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, lessonId]);

  const backUrl = useMemo(() => {
    const mId = lesson?.moduleId;
    if (!mId) return `/lms/superadmin/content/${courseId}`;
    return `/lms/superadmin/content/${courseId}/modules/${mId}`;
  }, [courseId, lesson?.moduleId]);

  async function saveLesson() {
    setErr("");
    setInfo("");
    const t = title.trim();
    if (!t) return setErr("Title is required.");

    setSaving(true);
    try {
      // ✅ you said backend supports PATCH /api/v1/admin/lessons/:lessonId
      await apiFetch(`/api/v1/admin/lessons/${lessonId}`, {
        method: "PATCH",
        token,
        body: {
            title: t,
            position: Number(position) || 1,
            summary: summary.trim() || null,

            // Cloudflare: store it as provider + id (backend DB already has these columns)
            video_provider: "cloudflare_stream",
            video_id: (videoId.trim() || null),
            },

      });

      setInfo("Saved ✅");
      await loadLessonFromTree();
    } catch (e) {
      setErr(e?.message || "Failed to save lesson.");
    } finally {
      setSaving(false);
      setTimeout(() => {
        if (aliveRef.current) setInfo("");
      }, 1200);
    }
  }

  async function togglePublish() {
    if (!lesson) return;
    setErr("");
    setInfo("");

    const prev = lesson.status;
    const next = prev === "published" ? "draft" : "published";

    // optimistic
    setLesson((p) => ({ ...p, status: next }));

    try {
      await apiFetch(`/api/v1/admin/lessons/${lessonId}/status`, {
        method: "PATCH",
        token,
        body: { status: next },
      });
      setInfo(next === "published" ? "Published ✅" : "Unpublished ✅");
    } catch (e) {
      setLesson((p) => ({ ...p, status: prev }));
      setErr(e?.message || "Failed to change status.");
    } finally {
      setTimeout(() => {
        if (aliveRef.current) setInfo("");
      }, 1200);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Lesson Editor</h1>
          <p className="text-sm text-slate-300">
            Edit lesson details + attach video key (Cloudflare).
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={loadLessonFromTree}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
            type="button"
          >
            Refresh
          </button>

          <Link
            to={backUrl}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
          >
            ← Back
          </Link>
        </div>
      </div>

      {err ? (
        <div className="rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {err}{" "}
          <button
            onClick={loadLessonFromTree}
            className="ml-2 underline underline-offset-2"
            type="button"
          >
            Retry
          </button>
        </div>
      ) : null}

      {info ? (
        <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">
          {info}
        </div>
      ) : null}

      {loading ? (
        <div className="text-sm text-slate-300">Loading…</div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500">Lesson ID: {lessonId}</div>
              <div className="mt-1 font-semibold">
                Status:{" "}
                <span
                  className={[
                    "rounded-full border px-2 py-1 text-xs",
                    lesson?.status === "published"
                      ? "border-green-900/60 bg-green-950/30 text-green-200"
                      : "border-slate-700 bg-slate-950/30 text-slate-300",
                  ].join(" ")}
                >
                  {lesson?.status || "draft"}
                </span>
              </div>
            </div>

            <button
              onClick={togglePublish}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
              type="button"
            >
              {lesson?.status === "published" ? "Unpublish" : "Publish"}
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="text-sm text-slate-300">Title</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Hooks Deep Dive"
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

          <div>
  <label className="text-sm text-slate-300">Summary (optional)</label>
  <textarea
    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
    value={summary}
    onChange={(e) => setSummary(e.target.value)}
    rows={3}
    placeholder="What student will learn in this lesson…"
  />
</div>


         <div>
  <label className="text-sm text-slate-300">
    Video ID (Cloudflare Stream UID)
  </label>
  <input
    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500"
    value={videoId}
    onChange={(e) => setVideoId(e.target.value)}
    placeholder="e.g. 1a2b3c4d5e6f..."
  />
  <div className="mt-1 text-xs text-slate-500">
    We store provider = cloudflare_stream and this UID as video_id.
  </div>
</div>


          <div className="flex flex-wrap gap-2">
            <button
              onClick={saveLesson}
              disabled={saving}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-60"
              type="button"
            >
              {saving ? "Saving…" : "Save"}
            </button>

            <Link
              to={`/lms/superadmin/content/${courseId}/lessons/${lessonId}/resources`}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-900"
            >
              Next: Resources + Practice →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
