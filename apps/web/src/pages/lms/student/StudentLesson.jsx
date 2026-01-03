import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";

function LessonSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
        <Skeleton className="h-6 w-72" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
        <Skeleton className="h-56 w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export default function StudentLesson() {
  const { token } = useAuth();
  const { courseSlug, moduleSlug, lessonSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const [lesson, setLesson] = useState(null);
  const [resources, setResources] = useState([]);
  const [practice, setPractice] = useState([]);

  // submission text per task
  const [answers, setAnswers] = useState({});
  const [submittingId, setSubmittingId] = useState(null);

  async function load(signal) {
    setErr("");
    setInfo("");
    setLoading(true);
    try {
      // uses your backend: getPublishedLessonBySlugs()
      const json = await apiFetch(
        `/api/v1/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}`,
        { token, signal }
      );

      const data = unwrapData(json);
      // data likely: { lesson: row, resources: [], practice: [] }
      const l = data?.lesson ?? null;
      const resList = Array.isArray(data?.resources) ? data.resources : [];
      const pracList = Array.isArray(data?.practice) ? data.practice : [];

      // stable sort
      resList.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      pracList.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

      setLesson(l);
      setResources(resList);
      setPractice(pracList);

      // progress start (if endpoint exists; if not, it silently fails)
      if (l?.lesson_id) {
        apiFetch(`/api/v1/lms/lessons/${l.lesson_id}/start`, { method: "POST", token }).catch(() => {});
      }
    } catch (e) {
      if (signal?.aborted) return;
      setErr(e?.message || "Failed to load lesson.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  // ✅ no refetch loops
  useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
  }, [courseSlug, moduleSlug, lessonSlug, token]);

  async function markComplete() {
    if (!lesson?.lesson_id) return;
    setErr(""); setInfo("");
    try {
      await apiFetch(`/api/v1/lms/lessons/${lesson.lesson_id}/complete`, { method: "POST", token });
      setInfo("Marked complete ✅");
      setTimeout(() => setInfo(""), 1200);
    } catch (e) {
      setErr(e?.message || "Failed to mark complete.");
    }
  }

  async function submitPractice(taskId) {
    const content = (answers[taskId] || "").trim();
    if (!content) {
      setErr("Write your answer before submitting.");
      return;
    }

    setErr(""); setInfo("");
    setSubmittingId(taskId);
    try {
      await apiFetch(`/api/v1/lms/tasks/${taskId}/submissions`, {
        method: "POST",
        token,
        body: { content },
      });
      setInfo("Submitted ✅ (Mentor review later)");
      setTimeout(() => setInfo(""), 1200);
    } catch (e) {
      setErr(e?.message || "Submit failed.");
    } finally {
      setSubmittingId(null);
    }
  }

  if (loading) return <LessonSkeleton />;

  if (err) {
    return (
      <ErrorState
        title="Lesson load avvaledu"
        message={err}
        onRetry={() => {
          const ac = new AbortController();
          load(ac.signal);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{lesson?.lesson_title || "Lesson"}</h1>
          <p className="text-sm text-slate-300">
            Watch → read → practice. Daily small wins = exponential growth 📈
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/lms/student/courses/${courseSlug}`}
            className="rounded-xl border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
          >
            ← Back
          </Link>
          <button
            onClick={markComplete}
            type="button"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
          >
            Mark Complete
          </button>
        </div>
      </div>

      {info ? (
        <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/30 p-4 text-emerald-100">
          {info}
        </div>
      ) : null}

      {/* Video block (v1 placeholder) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
        <div className="text-sm text-slate-300">Video</div>
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/40 p-6">
          <div className="text-sm text-slate-300">
            Player v1 placeholder. Next: Cloudflare Stream secure playback.
          </div>
          <div className="mt-2 text-xs text-slate-500">
            provider: {lesson?.video_provider || "—"} | video_id: {lesson?.video_id || "—"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Resources */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="text-lg font-semibold">Resources</div>
          <div className="mt-3 space-y-2">
            {resources.length === 0 ? (
              <EmptyState title="No resources yet" message="Cheatsheets soon." />
            ) : (
              resources.map((r) => (
                <div key={r.id} className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                  <div className="text-sm font-medium">{r.title}</div>
                  {r.url ? (
                    <a
                      className="mt-1 block text-sm text-sky-300 hover:underline"
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open link →
                    </a>
                  ) : r.body ? (
                    <div className="mt-1 whitespace-pre-wrap text-sm text-slate-300">{r.body}</div>
                  ) : (
                    <div className="mt-1 text-sm text-slate-500">—</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Practice */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="text-lg font-semibold">Practice</div>
          <div className="mt-3 space-y-3">
            {practice.length === 0 ? (
              <EmptyState title="No practice yet" message="Tasks soon." />
            ) : (
              practice.map((p) => (
                <div key={p.id} className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-slate-400">{p.language || "—"}</div>
                  </div>

                  {p.prompt ? (
                    <div className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{p.prompt}</div>
                  ) : null}

                  <textarea
                    className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-slate-400"
                    rows={4}
                    placeholder="Write your attempt..."
                    value={answers[p.id] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [p.id]: e.target.value,
                      }))
                    }
                  />

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-slate-500">Submit attempt. Mentor reviews later.</div>
                    <button
                      type="button"
                      onClick={() => submitPractice(p.id)}
                      disabled={submittingId === p.id}
                      className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-60"
                    >
                      {submittingId === p.id ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}