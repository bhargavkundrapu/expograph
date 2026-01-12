import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";
import { Link } from "react-router-dom";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";

function Badge({ status }) {
  const map = {
    submitted: { label: "Submitted" },
    in_review: { label: "In Review" },
    approved: { label: "Approved" },
    changes_requested: { label: "Changes Requested" },
  };
  const x = map[status] || { label: status };
  return (
    <span>
      {x.label}
    </span>
  );
}

export default function StudentSubmissions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);
  const { token } = useAuth();

  async function load(signal) {
    setErr("");
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/lms/submissions/mine", { token, signal });
      const data = unwrapData(json) || [];
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      if (signal?.aborted) return;
      setErr(e?.message || "Failed to load submissions");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    load(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

  if (loading) {
    return (
      <div>
        <Skeleton />
        <Card variant="elevated">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Card>
        <Card variant="elevated">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Card>
      </div>
    );
  }

  if (err) {
    return (
      <Card variant="elevated">
        <div>{err}</div>
        <Button
          variant="gradient"
          size="md"
          onClick={() => load()}
        >
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>My Submissions</h1>
              <p>
                Track mentor feedback & your proof of work.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div>{rows.length}</div>
          <div>items</div>
        </div>
      </div>

      {rows.length === 0 ? (
        <Card variant="elevated">
          <div>
          </div>
          <CardTitle>No Submissions Yet</CardTitle>
          <CardDescription>
            Start with a practice task and submit your work to get mentor feedback ✅
          </CardDescription>
        </Card>
      ) : (
        <div>
          {rows.map((r, idx) => {
            const openUrl =
              r.course_slug && r.module_slug && r.lesson_slug
                ? `/lms/student/courses/${r.course_slug}/modules/${r.module_slug}/lessons/${r.lesson_slug}`
                : null;

            return (
              <Card
                key={r.id}
                variant="elevated"
              >
                <div>
                  <div>
                    <div>
                      <div>
                      </div>
                      <CardTitle>{r.task_title || "Task"}</CardTitle>
                      </div>
                    <div>
                      <span>Attempt #{r.attempt_no}</span>
                      <span>•</span>
                      <span>{new Date(r.submitted_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <Badge status={r.status} />
                    {openUrl && (
                      <Link
                        to={openUrl}
                      >
                        Open Lesson
                      </Link>
                    )}
                  </div>
                </div>

                {r.review_feedback ? (
                  <Card variant="outlined">
                    <div>
                      <div>
                      </div>
                      <div>Mentor Feedback</div>
                    </div>
                    <div>
                      {r.review_feedback}
                    </div>
                    <div>
                      {r.reviewed_at && (
                        <span>Reviewed: {new Date(r.reviewed_at).toLocaleString()}</span>
                      )}
                      {typeof r.review_score === "number" && (
                        <span>
                          Score: {r.review_score}
                        </span>
                      )}
                    </div>
                  </Card>
                ) : (
                  <div>
                    <span>No mentor feedback yet. Check back later.</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
