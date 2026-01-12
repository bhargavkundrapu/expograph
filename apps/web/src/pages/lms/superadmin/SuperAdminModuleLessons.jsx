import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      await apiFetch(`/api/v1/admin/modules/${moduleId}/lessons`, {
        method: "POST",
        token,
        body: {
          title: t,
          position: Number(position) || 1,
        },
      });

      setTitle("");
      await loadTree();
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
    <div>
      <div>
        <div>
          <div>
          </div>
          <div>
            <h1>Lessons Manager</h1>
            <p>
              Course → Module → Lessons (draft/publish)
            </p>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadTree}
            disabled={loading}
          >
            Refresh
          </Button>
          <Link to={`/lms/superadmin/content/${courseId}`}>
            <Button variant="outline" size="sm">
              Back to Modules
            </Button>
          </Link>
        </div>
      </div>

      {err && (
        <ErrorState
          title="Failed to load lessons"
          message={err}
          onRetry={loadTree}
          size="sm"
        />
      )}

      {loading ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <>
          <Card>
            <CardContent>
              <div>
                <div>
                  <div>
                    <span>Course</span>
                  </div>
                  <div>
                    {course?.title || "Course"}
                  </div>
                  <div>
                    ID: {courseId}
                  </div>
                </div>

                <div>
                  <div>
                    <span>Module</span>
                  </div>
                  <div>
                    {module ? (
                      <div>
                        <span>
                          {module.position}
                        </span>
                        <span>{module.title}</span>
                      </div>
                    ) : (
                      "Module not found"
                    )}
                  </div>
                  <div>
                    Module ID: {moduleId}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div>
                <h2>Create Lesson</h2>
              </div>

              <form onSubmit={createLesson}>
                <div>
                  <div>
                    <label>
                      Lesson Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Props + State Management"
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
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={saving}
                  >
                    {saving ? "Creating Lesson..." : "Create Lesson"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <div>
              <div>
                <h2>
                  Lessons ({sortedLessons.length})
                </h2>
              </div>
            </div>

            {sortedLessons.length === 0 ? (
              <CardContent>
                <div>
                </div>
                <p>
                  No lessons yet. Create your first lesson above.
                </p>
              </CardContent>
            ) : (
              <div>
                {sortedLessons.map((l) => {
                  const busy = busyIds.has(l.id);
                  const isPublished = l.status === "published";

                  return (
                    <div
                      key={l.id}
                    >
                      <div>
                        <span>
                          {l.position}
                        </span>
                        <div>
                          <div>
                            <h3>{l.title}</h3>
                            {isPublished ? (
                              <span>✓</span>
                            ) : (
                              <span>○</span>
                            )}
                          </div>
                          <p>
                            Lesson ID: {l.id}
                          </p>
                        </div>
                      </div>

                      <div>
                        <span>
                          {l.status}
                        </span>

                        <Button
                          variant={isPublished ? "outline" : "primary"}
                          size="sm"
                          onClick={() => toggleLessonStatus(l)}
                          disabled={busy}
                        >
                          {busy ? "Saving..." : isPublished ? "Unpublish" : "Publish"}
                        </Button>

                        <Link to={`/lms/superadmin/content/${courseId}/lessons/${l.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          <div>
            <p>
              <strong>Premium architecture:</strong> All data reloads from{" "}
              <code>
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
