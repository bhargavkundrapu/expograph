
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../services/api";
import { startLesson, updateLessonProgress, completeLesson } from "../../../features/progress/progressApi";
// tiny helper: unwrap {ok,data}
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-3">
      <div className="h-6 w-64 animate-pulse rounded bg-slate-800" />
      <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-slate-800" />
    </div>
  );
}

function Badge({ status }) {
  const map = {
    submitted: { label: "Submitted ✅", cls: "border-slate-700 bg-slate-900/40" },
    in_review: { label: "In Review 🔍", cls: "border-blue-700/40 bg-blue-900/20" },
    approved: { label: "Approved ✅✅", cls: "border-emerald-700/40 bg-emerald-900/20" },
    changes_requested: { label: "Changes Requested ⚠️", cls: "border-amber-700/40 bg-amber-900/20" },
  };
  const x = map[status] || { label: status || "—", cls: "border-slate-700 bg-slate-900/40" };
  return (
    <span className={`rounded-full border px-3 py-1 text-xs text-slate-100 ${x.cls}`}>
      {x.label}
    </span>
  );
}

export default function StudentLesson(props) {
  const navigate = useNavigate();
  const { courseSlug, moduleSlug, lessonSlug } = useParams();

  // token from prop OR localStorage fallback (so refresh won’t break)
  const token = props?.token || localStorage.getItem("expograph_token") || "";

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [lessonPack, setLessonPack] = useState(null); // { lesson, resources, practice }
  const [statusMap, setStatusMap] = useState({}); // task_id -> {status, submission_id}

  const [submittingTaskId, setSubmittingTaskId] = useState(null);
  const [submitText, setSubmitText] = useState({}); // task_id -> text

  // Video player state
  const [resumePosition, setResumePosition] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [progressData, setProgressData] = useState(null); // Store progress from startLesson
  const [videoToken, setVideoToken] = useState(null); // Cloudflare signed token (iframeUrl)
  const [videoTokenError, setVideoTokenError] = useState("");

  const aliveRef = useRef(true);

  const lesson = lessonPack?.lesson || null;
  const resources = Array.isArray(lessonPack?.resources) ? lessonPack.resources : [];
  const practice = Array.isArray(lessonPack?.practice) ? lessonPack.practice : [];

  // sort stable: sort_order then created_at-ish fallback
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
      // 1) Get published lesson pack (lesson + resources + practice)
      // NOTE: this path must match your backend public content route.
      // If your backend uses a different URL, tell me the working one and I’ll adjust.
     const res1 = await apiFetch(
  `/api/v1/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}`,
  { token, signal }
);
      const pack = unwrap(res1);

      if (!pack?.lesson?.lesson_id && !pack?.lesson?.lesson_title && !pack?.lesson?.id) {
        // Accept multiple shapes
        // expected pack.lesson is the row from getPublishedLessonBySlugs
      }

      setLessonPack(pack);

      // 2) Fetch my submission status for tasks in this lesson (premium UX)
      const lessonId =
        pack?.lesson?.lesson_id || pack?.lesson?.id || pack?.lesson?.lessonId;
      
      // 2a) Fetch video playback token if lesson has video
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
          // Don't break the page if token fetch fails - video might still work without token
          console.warn("Failed to fetch video token:", e);
          // If it's "Video not attached", the video might not be in video_assets table
          // We'll show a message but don't set error state - let user see the lesson
          if (e?.message?.includes("not attached") || e?.status === 409) {
            setVideoTokenError("Video needs to be linked in database. Contact admin.");
          } else {
            setVideoTokenError(e?.message || "Failed to load video token");
          }
        }
      }
      
      // Start tracking lesson (only once per load) - this also returns progress data
      if (lessonId) {
        try {
          const progressRow = await startLesson({ token, lessonId, signal });
          setProgressData(progressRow);
          
          // Set resume position: backend progress > localStorage > 0
          const backendPos = progressRow?.last_position_seconds || 0;
          const local = readLocalProgress(lessonId);
          const localPos = local?.lastPositionSeconds || 0;
          const finalPos = backendPos > 0 ? backendPos : localPos;
          const resumePos = Math.max(0, finalPos);
          setResumePosition(resumePos);
          lastPositionRef.current = resumePos; // Initialize for delta calculation
        } catch {
          // ignore silently - progress should never break page
          // Fallback to localStorage
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
          // If endpoint not ready yet, don’t kill the page.
          // We’ll still allow submit and refresh map after submit.
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
    // IMPORTANT: only depend on slugs + token (avoid refetch loops)
  }, [courseSlug, moduleSlug, lessonSlug, token]);

  // Note: Progress tracking with iframe requires postMessage API
  // For now, we'll track progress when user manually marks complete or refreshes
  // TODO: Implement postMessage-based progress tracking for iframe player

  function getLessonTitle() {
    // your backend row from getPublishedLessonBySlugs uses aliases:
    // lesson_title, module_title, course_title
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
    if (already) return; // lock re-submit (v1)

    const text = (submitText[taskId] || "").trim();
    if (!text) {
      alert("Please paste your answer/code before submitting.");
      return;
    }

    setSubmittingTaskId(taskId);
    setErr("");

    try {
      // Submit
      await apiFetch(`/api/v1/lms/tasks/${taskId}/submissions`, {
        method: "POST",
        token,
        body: {
          contentType: "text",
          content: text,
        },
      });

      // After submit: reload status map quickly (no full reload)
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
          // fallback: at least mark as submitted locally
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
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (err) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
        <div className="text-red-300">{err}</div>
        <button
          className="mt-3 rounded-xl border border-slate-700 px-4 py-2"
          onClick={() => navigate(0)}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!lessonPack) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 text-slate-200">
        Lesson not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold">{getLessonTitle()}</div>
          {getLessonSummary() ? (
            <div className="mt-1 text-sm text-slate-400">{getLessonSummary()}</div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/lms/student/courses/${courseSlug}`}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
          >
            ← Back to Course
          </Link>
          <Link
            to={`/lms/student/submissions`}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
          >
            My Submissions
          </Link>
          <button
  className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-slate-500"
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
</button>
        </div>
      </div>

      {/* Video Player */}
      {lesson?.video_provider === "cloudflare_stream" && lesson?.video_id ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="text-lg font-semibold mb-3">Video Lesson</div>
          {videoTokenError ? (
            <div className="text-red-300 text-sm">
              {videoTokenError}
            </div>
          ) : !videoToken ? (
            <div className="text-slate-400 text-sm">Loading video...</div>
          ) : (
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={videoToken}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                className="w-full h-full rounded-xl border-0"
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
            <div className="mt-2 text-xs text-slate-400">
              Resuming from {Math.floor(resumePosition / 60)}:{(resumePosition % 60).toFixed(0).padStart(2, "0")}
            </div>
          )}
        </div>
      ) : lesson?.video_id ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="text-slate-400">
            Video format not supported yet. (Provider: {lesson.video_provider || "unknown"})
          </div>
        </div>
      ) : null}

      {/* Resources */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
        <div className="text-lg font-semibold">Resources</div>
        <div className="text-sm text-slate-400">
          Cheatsheets / links / notes. (Later: upload PDFs to Cloudflare R2.)
        </div>

        <div className="mt-4 space-y-3">
          {resources.length === 0 ? (
            <div className="text-slate-400">No resources yet.</div>
          ) : (
            resources.map((r) => (
              <div
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/30 p-4"
              >
                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-slate-500">{r.type}</div>
                </div>

                <div className="flex items-center gap-2">
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
                    >
                      Open
                    </a>
                  ) : null}
                  {r.body ? (
                    <button
                      className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
                      onClick={() => alert(r.body)}
                    >
                      View Text
                    </button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Practice */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
        <div className="text-lg font-semibold">Practice</div>
        <div className="text-sm text-slate-400">
          Submit your work here — mentor will review.
        </div>

        <div className="mt-4 space-y-4">
          {practiceSorted.length === 0 ? (
            <div className="text-slate-400">No practice tasks yet.</div>
          ) : (
            practiceSorted.map((t) => {
              const st = statusMap?.[t.id]?.status || null;
              const locked = Boolean(st);
              const isSubmitting = submittingTaskId === t.id;

              return (
                <div
                  key={t.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold">{t.title}</div>
                      <div className="text-xs text-slate-500">
                        Language: {t.language || "—"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {st ? <Badge status={st} /> : null}
                      {st ? (
                        <Link
                          to="/lms/student/submissions"
                          className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
                        >
                          View
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div className="text-sm text-slate-200 whitespace-pre-wrap">
                    {t.prompt}
                  </div>

                  <textarea
                    className="w-full min-h-[120px] rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm outline-none focus:border-slate-600"
                    placeholder={locked ? "Already submitted ✅ (v1 locks resubmission)" : "Paste your code / answer here..."}
                    value={submitText[t.id] || ""}
                    onChange={(e) =>
                      setSubmitText((prev) => ({ ...prev, [t.id]: e.target.value }))
                    }
                    disabled={locked || isSubmitting}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-slate-500">
                      {locked
                        ? "Locked after submit (v1). Later we can allow versioned resubmissions."
                        : "Tip: keep it clean + readable. Mentor loves that."}
                    </div>

                    <button
                      className={`rounded-xl px-4 py-2 text-sm border ${
                        locked
                          ? "border-slate-800 text-slate-500 cursor-not-allowed"
                          : "border-slate-700 hover:border-slate-500"
                      }`}
                      onClick={() => submitTask(t)}
                      disabled={locked || isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : locked ? "Submitted" : "Submit"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}