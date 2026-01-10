import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRedo, FaArrowLeft, FaSave, FaVideo, FaBook, FaListOl, FaCheckCircle, FaCircle, FaSpinner, FaArrowRight, FaFileAlt } from "react-icons/fa";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";
import Card, { CardContent, CardTitle } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaFileAlt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lesson Editor</h1>
            <p className="text-sm text-gray-600 mt-1">
              Edit lesson details + attach video key (Cloudflare)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={loadLessonFromTree}
            icon={FaRedo}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            as={Link}
            to={backUrl}
            icon={FaArrowLeft}
          >
            Back
          </Button>
        </div>
      </div>

      {/* Error State */}
      {err && (
        <ErrorState
          title="Failed to load lesson"
          message={err}
          onRetry={loadLessonFromTree}
          size="sm"
        />
      )}

      {/* Success Message */}
      {info && (
        <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 font-medium">{info}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Lesson Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-2">Lesson ID: {lessonId}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <span
                    className={[
                      "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5",
                      lesson?.status === "published"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm"
                        : "bg-gray-200 text-gray-700",
                    ].join(" ")}
                  >
                    {lesson?.status === "published" ? (
                      <FaCheckCircle className="w-3 h-3" />
                    ) : (
                      <FaCircle className="w-3 h-3" />
                    )}
                    {lesson?.status || "draft"}
                  </span>
                </div>
              </div>

              <Button
                variant={lesson?.status === "published" ? "outline" : "primary"}
                size="sm"
                onClick={togglePublish}
                icon={lesson?.status === "published" ? FaCircle : FaCheckCircle}
              >
                {lesson?.status === "published" ? "Unpublish" : "Publish"}
              </Button>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
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
                    placeholder="e.g., Hooks Deep Dive"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaFileAlt className="inline w-3.5 h-3.5 mr-1.5 text-gray-500" />
                  Summary <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder-gray-400 resize-none"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  placeholder="What students will learn in this lesson…"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaVideo className="inline w-3.5 h-3.5 mr-1.5 text-gray-500" />
                  Video ID (Cloudflare Stream UID)
                </label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder="e.g. 1a2b3c4d5e6f..."
                  disabled={saving}
                />
                <p className="mt-2 text-xs text-gray-500">
                  We store provider = cloudflare_stream and this UID as video_id
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={saveLesson}
                disabled={saving}
                icon={saving ? FaSpinner : FaSave}
                className={saving ? "animate-pulse" : ""}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                variant="outline"
                size="md"
                as={Link}
                to={`/lms/superadmin/content/${courseId}/lessons/${lessonId}/resources`}
                icon={FaArrowRight}
              >
                Resources + Practice
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
