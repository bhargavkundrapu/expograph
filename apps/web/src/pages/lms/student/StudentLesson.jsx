
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../services/api";
import { startLesson, updateLessonProgress, completeLesson } from "../../../features/progress/progressApi";
import { FaPlay, FaArrowLeft, FaFileAlt, FaCheckCircle, FaExternalLinkAlt, FaCode, FaPaperPlane, FaVideo, FaBook, FaClipboardList, FaCrown, FaStar } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";
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
    <Card variant="elevated" className="p-6 space-y-4">
      <Skeleton className="h-8 w-64 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </Card>
  );
}

function Badge({ status }) {
  const map = {
    submitted: { label: "Submitted", icon: FaCheckCircle, cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
    in_review: { label: "In Review", icon: FaCode, cls: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300" },
    approved: { label: "Approved", icon: FaCheckCircle, cls: "border-emerald-500 bg-emerald-500 text-white" },
    changes_requested: { label: "Changes Requested", icon: FaCode, cls: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
  };
  const x = map[status] || { label: status || "—", icon: null, cls: "border-gray-700 bg-gray-900 text-gray-400" };
  const Icon = x.icon;
  return (
    <span className={`inline-flex items-center gap-2 border-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${x.cls}`}>
      {Icon && <Icon className="text-xs" />}
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
      <div className="border-2 border-white bg-black p-6">
        <div className="text-white mb-4">{err}</div>
        <button
          className="border-2 border-white bg-white text-black px-4 py-2 font-semibold hover:bg-black hover:text-white transition-all"
          onClick={() => navigate(0)}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!lessonPack) {
    return (
      <div className="border-2 border-white bg-black p-6 text-white">
        Lesson not found.
      </div>
    );
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-8 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex flex-wrap items-start justify-between gap-lg" style={{ marginBottom: '1.5rem' }}>
            <div style={{ flex: '1 1 300px', minWidth: '280px' }}>
              <div className="layout-flex items-center gap-md" style={{ marginBottom: '1rem' }}>
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
                  <FaBook className="text-white text-xl" />
                </div>
                <div className="section-hero text-4xl" style={{ margin: 0 }}>{getLessonTitle()}</div>
              </div>
              {getLessonSummary() ? (
                <p className="section-body text-lg text-gray-300 leading-relaxed" style={{ maxWidth: '48rem', margin: 0 }}>{getLessonSummary()}</p>
              ) : null}
            </div>

            <div className="layout-flex flex-wrap items-center gap-md" style={{ flex: '0 0 auto' }}>
              <Link
                to={`/lms/student/courses/${courseSlug}`}
                className="inline-flex items-center gap-2 border-2 border-gray-700 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <FaArrowLeft />
                Back
              </Link>
              <Link
                to={`/lms/student/submissions`}
                className="inline-flex items-center gap-2 border-2 border-gray-700 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <FaClipboardList />
                Submissions
              </Link>
              <Button
                variant="gradient"
                size="sm"
                icon={FaCheckCircle}
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
        </div>
      </div>

      {/* Video Player - Premium */}
      {lesson?.video_provider === "cloudflare_stream" && lesson?.video_id ? (
        <Card 
          variant="elevated" 
          className="p-6 md:p-8 relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          style={{ 
            width: '100%', 
            boxSizing: 'border-box',
            boxShadow: '0 10px 40px rgba(251, 146, 60, 0.2), 0 0 20px rgba(236, 72, 153, 0.1)'
          }}
        >
          {/* Premium Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-900 text-xs font-bold shadow-lg shadow-amber-500/50 animate-pulse-slow">
              <FaCrown className="text-[10px]" />
              <span>PREMIUM</span>
            </div>
          </div>

          {/* Header */}
          <div className="layout-flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 shadow-lg shadow-amber-500/40 transform hover:scale-105 transition-transform">
              <FaVideo className="text-gray-900 text-2xl" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl md:text-3xl mb-1 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                Premium Video Lesson
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm">
                High-quality video content with advanced features
              </CardDescription>
            </div>
          </div>

          {/* Error State */}
          {videoTokenError ? (
            <div className="p-4 rounded-lg bg-red-500/10 border-2 border-red-500/30 text-red-300 text-sm mb-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <FaStar className="text-red-400" />
                <span>{videoTokenError}</span>
              </div>
            </div>
          ) : !videoToken ? (
            <div className="flex items-center justify-center p-16">
              <div className="text-center">
                <div className="inline-block p-6 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-2 border-amber-500/30 mb-4 animate-pulse-slow">
                  <FaPlay className="text-amber-400 text-3xl" />
                </div>
                <p className="text-gray-400 font-medium">Loading premium video...</p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-6xl mx-auto">
              {/* Video Container - Centered and Responsive */}
              <div 
                className="relative w-full mx-auto rounded-2xl overflow-hidden border-4 border-amber-500/50 shadow-2xl"
                style={{ 
                  aspectRatio: "16/9",
                  background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(236, 72, 153, 0.1))',
                  boxShadow: '0 20px 60px rgba(251, 146, 60, 0.3), 0 0 40px rgba(236, 72, 153, 0.2)'
                }}
              >
                <iframe
                  src={videoToken}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  className="w-full h-full border-0 rounded-xl"
                  style={{ borderRadius: '0.75rem' }}
                  onLoad={() => setVideoReady(true)}
                  onError={(e) => {
                    console.error("Video iframe error:", e);
                    setVideoReady(false);
                    setVideoTokenError("Failed to load video player");
                  }}
                />
                {/* Premium Overlay Glow Effect */}
                {videoReady && (
                  <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
                    background: 'radial-gradient(circle at center, transparent 0%, transparent 70%, rgba(251, 146, 60, 0.05) 100%)',
                    boxShadow: 'inset 0 0 60px rgba(251, 146, 60, 0.1)'
                  }} />
                )}
              </div>
            </div>
          )}

          {/* Resume Indicator */}
          {resumePosition > 0 && videoToken && (
            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-500/20 backdrop-blur-sm">
                <FaPlay className="text-xs text-cyan-400" />
                <span className="font-semibold">
                  Resuming from {Math.floor(resumePosition / 60)}:{(resumePosition % 60).toFixed(0).padStart(2, "0")}
                </span>
              </div>
            </div>
          )}
        </Card>
      ) : lesson?.video_id ? (
        <Card variant="elevated" className="p-6">
          <div className="text-gray-400">
            Video format not supported yet. (Provider: {lesson.video_provider || "unknown"})
          </div>
        </Card>
      ) : null}

      {/* Resources */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30">
            <FaFileAlt className="text-white text-xl" />
          </div>
          <div>
            <CardTitle className="text-2xl" style={{ marginBottom: '0.25rem' }}>Resources</CardTitle>
            <CardDescription style={{ margin: 0 }}>Cheatsheets / links / notes. (Later: upload PDFs to Cloudflare R2.)</CardDescription>
          </div>
        </div>

        <div className="layout-flex-col gap-sm">
          {resources.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaFileAlt className="text-4xl mx-auto mb-4 opacity-50" />
              <p>No resources yet.</p>
            </div>
          ) : (
            resources.map((r, idx) => (
              <Card
                key={r.id}
                variant="outlined"
                className="p-5 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-white text-lg mb-1">{r.title}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{r.type}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    {r.url ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border-2 border-white bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300"
                      >
                        <FaExternalLinkAlt />
                        Open
                      </a>
                    ) : null}
                    {r.body ? (
                      <button
                        className="inline-flex items-center gap-2 border-2 border-gray-700 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                        onClick={() => alert(r.body)}
                      >
                        <FaFileAlt />
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

      {/* Practice */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
            <FaCode className="text-white text-xl" />
          </div>
          <div>
            <CardTitle className="text-2xl" style={{ marginBottom: '0.25rem' }}>Practice</CardTitle>
            <CardDescription style={{ margin: 0 }}>Submit your work here — mentor will review.</CardDescription>
          </div>
        </div>

        <div className="layout-flex-col gap-lg">
          {practiceSorted.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaCode className="text-4xl mx-auto mb-4 opacity-50" />
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
                  className="p-6 space-y-5 animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${locked ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-cyan-500/20 border border-cyan-500/30'}`}>
                          <FaCode className={locked ? 'text-emerald-400' : 'text-cyan-400'} />
                        </div>
                        <div className="text-xl font-bold text-white">{t.title}</div>
                      </div>
                      <div className="text-xs text-gray-500 ml-11">
                        Language: <span className="text-cyan-400 font-semibold">{t.language || "—"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {st ? <Badge status={st} /> : null}
                      {st ? (
                        <Link
                          to="/lms/student/submissions"
                          className="inline-flex items-center gap-2 border-2 border-gray-700 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                          <FaClipboardList />
                          View
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-800 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {t.prompt}
                  </div>

                  <textarea
                    className="w-full min-h-[150px] border-2 border-gray-700 bg-gray-900 text-white p-4 text-sm rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all font-mono"
                    placeholder={locked ? "Already submitted ✅ (v1 locks resubmission)" : "Paste your code / answer here..."}
                    value={submitText[t.id] || ""}
                    onChange={(e) =>
                      setSubmitText((prev) => ({ ...prev, [t.id]: e.target.value }))
                    }
                    disabled={locked || isSubmitting}
                  />

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-800">
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      {locked ? (
                        <>
                          <FaCheckCircle className="text-emerald-400" />
                          <span>Locked after submit (v1). Later we can allow versioned resubmissions.</span>
                        </>
                      ) : (
                        <>
                          <FaCode className="text-cyan-400" />
                          <span>Tip: keep it clean + readable. Mentor loves that.</span>
                        </>
                      )}
                    </div>

                    <Button
                      variant={locked ? "outline" : "gradient"}
                      size="sm"
                      icon={locked ? FaCheckCircle : FaPaperPlane}
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