import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../services/api";
import { startLesson, updateLessonProgress, completeLesson } from "../../../features/progress/progressApi";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";

function progressKey(lessonId) {
  return `expograph_progress_${lessonId}`;
}

function saveLocalProgress(lessonId, lastPositionSeconds) {
  try {
    localStorage.setItem(progressKey(lessonId), JSON.stringify({
      lastPositionSeconds: Number(lastPositionSeconds) || 0,
      updatedAt: Date.now(),
    }));
  } catch {}
}

function readLocalProgress(lessonId) {
  try {
    const raw = localStorage.getItem(progressKey(lessonId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function unwrap(res) {
  if (res && typeof res === "object" && "ok" in res) return res.data;
  return res;
}

function SkeletonCard() {
  return (
    <Card variant="elevated">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Card>
  );
}

function Badge({ status }) {
  const map = {
    submitted: { label: "Submitted" },
    in_review: { label: "In Review" },
    approved: { label: "Approved" },
    changes_requested: { label: "Changes Requested" },
  };
  const x = map[status] || { label: status || "—" };
  return (
    <span>
      {x.label}
    </span>
  );
}

export default function StudentLesson(props) {
  const navigate = useNavigate();
  const { courseSlug, moduleSlug, lessonSlug } = useParams();

  const token = props?.token || localStorage.getItem("expograph_token") || "";

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [lessonPack, setLessonPack] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  const [submittingTaskId, setSubmittingTaskId] = useState(null);
  const [submitText, setSubmitText] = useState({});

  const [resumePosition, setResumePosition] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [progressData, setProgressData] = useState(null);
  const [videoToken, setVideoToken] = useState(null);
  const [videoTokenError, setVideoTokenError] = useState("");

  const aliveRef = useRef(true);

  const lesson = lessonPack?.lesson || null;
  const resources = Array.isArray(lessonPack?.resources) ? lessonPack.resources : [];
  const practice = Array.isArray(lessonPack?.practice) ? lessonPack.practice : [];

  const practiceSorted = useMemo(() => {
    return [...practice].sort((a, b) => {
      const ao = Number(a.sort_order ?? a.sortOrder ?? 0);
      const bo = Number(b.sort_order ?? b.sortOrder ?? 0);
      if (ao !== bo) return ao - bo;
      return String(a.id).localeCompare(String(b.id));
    });
  }, [practice]);

  async function loadEverything(signal) {
    setErr("");
    setLoading(true);

    try {
     const res1 = await apiFetch(
  `/api/v1/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}`,
  { token, signal }
);
      const pack = unwrap(res1);

      if (!pack?.lesson?.lesson_id && !pack?.lesson?.lesson_title && !pack?.lesson?.id) {
      }

      setLessonPack(pack);

      const lessonId =
        pack?.lesson?.lesson_id || pack?.lesson?.id || pack?.lesson?.lessonId;
      
      if (lessonId && pack?.lesson?.video_provider === "cloudflare_stream" && pack?.lesson?.video_id) {
        try {
          const tokenRes = await apiFetch("/api/v1/media/playback-token", {
            method: "POST",
            token,
            signal,
            body: { lessonId },
          });
          const tokenData = unwrap(tokenRes);
          if (tokenData?.iframeUrl) {
            setVideoToken(tokenData.iframeUrl);
          } else {
            setVideoTokenError("Failed to get video token");
          }
        } catch (e) {
          if (e?.status !== 403) {
          console.warn("Failed to fetch video token:", e);
          }
          if (e?.message?.includes("not attached") || e?.status === 409) {
            setVideoTokenError("Video needs to be linked in database. Contact admin.");
          } else if (e?.status !== 403) {
            setVideoTokenError(e?.message || "Failed to load video token");
          }
        }
      }
      
      if (lessonId) {
        try {
          const progressRow = await startLesson({ token, lessonId, signal });
          setProgressData(progressRow);
          
          const backendPos = progressRow?.last_position_seconds || 0;
          const local = readLocalProgress(lessonId);
          const localPos = local?.lastPositionSeconds || 0;
          const finalPos = backendPos > 0 ? backendPos : localPos;
          const resumePos = Math.max(0, finalPos);
          setResumePosition(resumePos);
        } catch {
          const local = readLocalProgress(lessonId);
          if (local?.lastPositionSeconds) {
            setResumePosition(Math.max(0, local.lastPositionSeconds));
          }
        }
      }
      if (lessonId) {
        try {
          const res2 = await apiFetch(
            `/api/v1/lms/lessons/${lessonId}/submissions/me`,
            { token, signal }
          );
          const rows = unwrap(res2) || [];
          const map = {};
          for (const r of rows) {
            map[r.task_id] = { status: r.status, submission_id: r.submission_id };
          }
          setStatusMap(map);
        } catch (e) {
          setStatusMap({});
        }
      } else {
        setStatusMap({});
      }
    } catch (e) {
      if (signal?.aborted) return;
      setErr(e?.message || "Failed to load lesson.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    aliveRef.current = true;
    const ac = new AbortController();
    loadEverything(ac.signal);
    return () => {
      aliveRef.current = false;
      ac.abort();
    };
  }, [courseSlug, moduleSlug, lessonSlug, token]);

  function getLessonTitle() {
    if (!lesson) return "";
    return (
      lesson.lesson_title ||
      lesson.title ||
      "Lesson"
    );
  }

  function getLessonSummary() {
    if (!lesson) return "";
    return lesson.summary || "";
  }

  async function submitTask(task) {
    const taskId = task.id;
    const already = statusMap?.[taskId]?.status;
    if (already) return;

    const text = (submitText[taskId] || "").trim();
    if (!text) {
      alert("Please paste your answer/code before submitting.");
      return;
    }

    setSubmittingTaskId(taskId);
    setErr("");

    try {
      await apiFetch(`/api/v1/lms/tasks/${taskId}/submissions`, {
        method: "POST",
        token,
        body: {
          contentType: "text",
          content: text,
        },
      });

      const lessonId = lesson?.lesson_id || lesson?.id || lesson?.lessonId;
      if (lessonId) {
        try {
          const res2 = await apiFetch(
            `/api/v1/lms/lessons/${lessonId}/submissions/me`,
            { token }
          );
          const rows = unwrap(res2) || [];
          const map = {};
          for (const r of rows) {
            map[r.task_id] = { status: r.status, submission_id: r.submission_id };
          }
          setStatusMap(map);
        } catch {
          setStatusMap((prev) => ({
            ...prev,
            [taskId]: { status: "submitted", submission_id: null },
          }));
        }
      } else {
        setStatusMap((prev) => ({
          ...prev,
          [taskId]: { status: "submitted", submission_id: null },
        }));
      }
    } catch (e) {
      setErr(e?.message || "Failed to submit.");
    } finally {
      setSubmittingTaskId(null);
    }
  }

  if (loading) {
    return (
      <div>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (err) {
    return (
      <div>
        <div>{err}</div>
        <button
          onClick={() => navigate(0)}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!lessonPack) {
    return (
      <div>
        Lesson not found.
      </div>
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
            <div>{getLessonTitle()}</div>
            </div>
          {getLessonSummary() ? (
            <p>{getLessonSummary()}</p>
          ) : null}
        </div>

        <div>
          <Link
            to={`/lms/student/courses/${courseSlug}`}
          >
            Back
          </Link>
          <Link
            to={`/lms/student/submissions`}
          >
            Submissions
          </Link>
          <Button
            variant="gradient"
            size="sm"
            onClick={async () => {
              const lessonId = lesson?.lesson_id || lesson?.id;
              if (!lessonId) return;
              try {
                await completeLesson({ token, lessonId });
                alert("Marked complete ✅");
              } catch (e) {
                alert(e?.message || "Failed to mark complete.");
              }
            }}
          >
            Mark Complete
          </Button>
        </div>
      </div>

      {lesson?.video_provider === "cloudflare_stream" && lesson?.video_id ? (
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <CardTitle>Video Lesson</CardTitle>
              <CardDescription>Watch and learn</CardDescription>
            </div>
          </div>

          {videoTokenError ? (
            <div>
              {videoTokenError}
            </div>
          ) : !videoToken ? (
            <div>
              <div>Loading video...</div>
            </div>
          ) : (
            <div>
              <iframe
                src={videoToken}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                onLoad={() => setVideoReady(true)}
                onError={(e) => {
                  console.error("Video iframe error:", e);
                  setVideoReady(false);
                  setVideoTokenError("Failed to load video player");
                }}
              />
            </div>
          )}

          {resumePosition > 0 && videoToken && (
            <div>
              <span>
                Resuming from {Math.floor(resumePosition / 60)}:{(resumePosition % 60).toFixed(0).padStart(2, "0")}
              </span>
            </div>
          )}
        </Card>
      ) : lesson?.video_id ? (
        <Card variant="elevated">
          <div>
            Video format not supported yet. (Provider: {lesson.video_provider || "unknown"})
          </div>
        </Card>
      ) : null}

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>Resources</CardTitle>
            <CardDescription>Cheatsheets / links / notes. (Later: upload PDFs to Cloudflare R2.)</CardDescription>
          </div>
        </div>

        <div>
          {resources.length === 0 ? (
            <div>
              <div>
              </div>
              <p>No resources yet.</p>
            </div>
          ) : (
            resources.map((r, idx) => (
              <Card
                key={r.id}
                variant="outlined"
              >
                <div>
                  <div>
                    <div>{r.title}</div>
                    <div>{r.type}</div>
                  </div>

                  <div>
                    {r.url ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open
                      </a>
                    ) : null}
                    {r.body ? (
                      <button
                        onClick={() => alert(r.body)}
                      >
                        View Text
                      </button>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>Practice</CardTitle>
            <CardDescription>Submit your work here — mentor will review.</CardDescription>
          </div>
        </div>

        <div>
          {practiceSorted.length === 0 ? (
            <div>
              <div>
              </div>
              <p>No practice tasks yet.</p>
            </div>
          ) : (
            practiceSorted.map((t, idx) => {
              const st = statusMap?.[t.id]?.status || null;
              const locked = Boolean(st);
              const isSubmitting = submittingTaskId === t.id;

              return (
                <Card
                  key={t.id}
                  variant={locked ? "outlined" : "elevated"}
                >
                  <div>
                    <div>
                      <div>
                        <div>
                        </div>
                        <div>{t.title}</div>
                        </div>
                      <div>
                        Language: <span>{t.language || "—"}</span>
                      </div>
                    </div>
                    <div>
                      {st ? <Badge status={st} /> : null}
                      {st ? (
                        <Link
                          to="/lms/student/submissions"
                        >
                          View
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    {t.prompt}
                  </div>

                  <textarea
                    placeholder={locked ? "Already submitted ✅ (v1 locks resubmission)" : "Paste your code / answer here..."}
                    value={submitText[t.id] || ""}
                    onChange={(e) =>
                      setSubmitText((prev) => ({ ...prev, [t.id]: e.target.value }))
                    }
                    disabled={locked || isSubmitting}
                  />

                  <div>
                    <div>
                      {locked ? (
                        <>
                          <span>Locked after submit (v1). Later we can allow versioned resubmissions.</span>
                        </>
                      ) : (
                        <>
                          <span>Tip: keep it clean + readable. Mentor loves that.</span>
                        </>
                      )}
                    </div>

                    <Button
                      variant={locked ? "outline" : "gradient"}
                      size="sm"
                      onClick={() => submitTask(t)}
                      disabled={locked || isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : locked ? "Submitted" : "Submit"}
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
