import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      await apiFetch(`/api/v1/admin/lessons/${lessonId}`, {
        method: "PATCH",
        token,
        body: {
            title: t,
            position: Number(position) || 1,
            summary: summary.trim() || null,
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
    <div>
      <div>
        <div>
          <div>
          </div>
          <div>
            <h1>Lesson Editor</h1>
            <p>
              Edit lesson details + attach video key (Cloudflare)
            </p>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadLessonFromTree}
            disabled={loading}
          >
            Refresh
          </Button>
          <Link to={backUrl}>
            <Button variant="outline" size="sm">
              Back
            </Button>
          </Link>
        </div>
      </div>

      {err && (
        <ErrorState
          title="Failed to load lesson"
          message={err}
          onRetry={loadLessonFromTree}
          size="sm"
        />
      )}

      {info && (
        <div>
          <p>{info}</p>
        </div>
      )}

      {loading ? (
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <Card>
          <CardContent>
            <div>
              <div>
                <p>Lesson ID: {lessonId}</p>
                <div>
                  <span>Status:</span>
                  <span>
                    {lesson?.status === "published" ? (
                      <span>✓</span>
                    ) : (
                      <span>○</span>
                    )}
                    {lesson?.status || "draft"}
                  </span>
                </div>
              </div>

              <Button
                variant={lesson?.status === "published" ? "outline" : "primary"}
                size="sm"
                onClick={togglePublish}
              >
                {lesson?.status === "published" ? "Unpublish" : "Publish"}
              </Button>
            </div>

            <div>
              <div>
                <div>
                  <label>
                    Lesson Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Hooks Deep Dive"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label>
                    Position
                  </label>
                  <input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    type="number"
                    min="1"
                    disabled={saving}
                  />
                </div>
              </div>

              <div>
                <label>
                  Summary <span>(optional)</span>
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  placeholder="What students will learn in this lesson…"
                  disabled={saving}
                />
              </div>

              <div>
                <label>
                  Video ID (Cloudflare Stream UID)
                </label>
                <input
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder="e.g. 1a2b3c4d5e6f..."
                  disabled={saving}
                />
                <p>
                  We store provider = cloudflare_stream and this UID as video_id
                </p>
              </div>
            </div>

            <div>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={saveLesson}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>

              <Link to={`/lms/superadmin/content/${courseId}/lessons/${lessonId}/resources`}>
                <Button
                  variant="outline"
                  size="md"
                >
                  Resources + Practice
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
