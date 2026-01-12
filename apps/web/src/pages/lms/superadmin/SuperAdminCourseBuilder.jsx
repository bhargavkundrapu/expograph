import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  const [lessons, setLessons] = useState([]);

  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(1);
  const [saving, setSaving] = useState(false);

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
      const res = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      const tree = res?.data ?? res;

      if (!aliveRef.current) return;

      setCourse(tree?.course ?? null);
      setModules((tree?.modules ?? []).map(normalizeModule));
      setLessons(tree?.lessons ?? []);

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
          setErr("Forbidden. You don't have content:write permission.");
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
    if (courseId) {
      loadTree();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, token]);

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
      await apiFetch(`/api/v1/admin/courses/${courseId}/modules`, {
        method: "POST",
        token,
        body: { title: t, position: Number(position) || 1 },
      });

      setTitle("");
      await loadTree();
    } catch (e2) {
      setErr(e2?.message || "Failed to create module.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div>
        <div>
          <div>
          </div>
          <h1>Course Builder</h1>
          <p>
            Manage modules and structure for this course
          </p>
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
          <Link to="/lms/superadmin/content">
            <Button variant="ghost" size="sm">
              Back
            </Button>
          </Link>
        </div>
      </div>

      {err ? (
        <ErrorState
          title="Error Loading Course"
          message={err}
          onRetry={loadTree}
          type="default"
          size="sm"
        />
      ) : null}

      {loading ? (
        <div>
          <Card variant="elevated">
            <CardContent>
              <div>
                <Skeleton variant="icon" />
                <div>
                  <Skeleton variant="title" />
                  <Skeleton variant="textShort" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent>
              <Skeleton variant="title" />
              <div>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </div>
              <Skeleton variant="button" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <Card variant="gradient">
            <CardContent>
              <div>
                <div>
                </div>
                <div>
                  <CardTitle>
                    {course?.title || "Untitled course"}
                  </CardTitle>
                  <CardDescription>
                    ID: {courseId} {course?.slug ? `• slug: ${course.slug}` : ""}
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent>
              <div>
                <div>
                </div>
                <CardTitle>Create New Module</CardTitle>
              </div>

              <form onSubmit={createModule}>
                <div>
                  <div>
                    <label>
                      Module Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., JSX + Components, React Hooks, State Management"
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
                    loading={saving}
                  >
                    {saving ? "Creating..." : "Create Module"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <div>
              <CardTitle>
                Modules ({sortedModules.length})
              </CardTitle>
            </div>

            <CardContent>
              {sortedModules.length === 0 ? (
                <div>
                  <div>
                  </div>
                  <p>No modules yet</p>
                  <p>Create your first module above to get started</p>
                </div>
              ) : (
                <div>
                  {sortedModules.map((m, idx) => (
                    <div
                      key={m.id}
                    >
                      <div>
                        <div>
                          <div>
                            {m.position}
                          </div>
                          <div>
                            <h3>
                              {m.title}
                            </h3>
                            <p>
                              ID: {m.id} {m.slug ? `• slug: ${m.slug}` : ""}
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/lms/superadmin/content/${courseId}/modules/${m.id}`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Manage Lessons
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div>
            <p>
              <span>Note:</span> This page loads from{" "}
              <code>
                /courses/:courseId/tree
              </code>{" "}
              endpoint, ensuring data consistency across refreshes.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
