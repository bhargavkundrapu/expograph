import { useEffect, useMemo, useState } from "react";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";
import { Link } from "react-router-dom";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

function extractList(res) {
  const d = res?.data ?? res;
  if (!d) return [];
  if (Array.isArray(d)) return d;

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        if (e.status === 403) setErr("Forbidden: You don't have permission to view admin courses.");
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
    <div>
      <div>
        <div>
          <div>
          </div>
          <div>
            <h1>Content Admin</h1>
            <p>
              Create courses, then publish them (published courses appear for students)
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadCourses}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {err && (
        <ErrorState
          title="Failed to load courses"
          message={err}
          onRetry={loadCourses}
          size="sm"
        />
      )}

      <Card>
        <CardContent>
          <div>
            <h2>Create Course</h2>
          </div>

          <form onSubmit={createCourse}>
            <div>
              <div>
                <label>
                  Course Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., React Basics"
                  disabled={saving}
                />
              </div>

              <div>
                <label>
                  Description
                </label>
                <input
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
                disabled={saving}
              >
                {saving ? "Creating Course..." : "Create Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <div>
          <div>
            <div>
              <h2>
                Courses
              </h2>
            </div>
            <span>
              {sorted.length} total
            </span>
          </div>
        </div>

        {loading ? (
          <CardContent>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </CardContent>
        ) : sorted.length === 0 ? (
          <CardContent>
            <div>
            </div>
            <p>
              No courses yet. Create your first course above.
            </p>
          </CardContent>
        ) : (
          <div>
            {sorted.map((c) => {
              const busy = busyIds.has(c.id);
              const isPublished = c.status === "published";

              return (
                <div
                  key={c.id}
                >
                  <div>
                    {isPublished ? (
                      <span>✓</span>
                    ) : (
                      <span>○</span>
                    )}
                    <div>
                      <div>
                        <h3>{c.title}</h3>
                      </div>
                      <div>
                        <span>ID: <span>{c.id}</span></span>
                        {c.slug && (
                          <>
                            <span>•</span>
                            <span>Slug: <span>{c.slug}</span></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span>
                      {isPublished ? "✓" : "○"}
                      {c.status}
                    </span>

                    <Button
                      variant={isPublished ? "outline" : "primary"}
                      size="sm"
                      onClick={() => togglePublish(c)}
                      disabled={busy}
                    >
                      {busy ? "Saving..." : isPublished ? "Unpublish" : "Publish"}
                    </Button>

                    <Link to={`/lms/superadmin/content/${c.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Manage
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
          <strong>Note:</strong> If your backend returns different course fields, let us know and we'll adapt instantly.
        </p>
      </div>
    </div>
  );
}
