import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../../services/api"; // adjust if your path differs
import { unwrapData } from "../../../services/apiShape"; // if you have, else I’ll give below
import { useAuth } from "../../../app/providers/AuthProvider";
import { Link } from "react-router-dom";
import React from "react";

function Badge({ status }) {
  const map = {
    submitted: "Submitted",
    in_review: "In Review",
    approved: "Approved",
    changes_requested: "Changes Requested",
  };
  const label = map[status] || status;
  return (
    <span className="rounded-full border border-slate-700 bg-slate-900/30 px-3 py-1 text-xs text-slate-200">
      {label}
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
      <div className="space-y-4">
        <div className="h-8 w-52 animate-pulse rounded bg-slate-800" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-900/30 border border-slate-800" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-900/30 border border-slate-800" />
      </div>
    );
  }

  if (err) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
        <div className="text-red-300">{err}</div>
        <button
          className="mt-3 rounded-xl border border-slate-700 px-4 py-2"
          onClick={() => load()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold">My Submissions</div>
          <div className="text-sm text-slate-400">
            Track mentor feedback & your proof of work.
          </div>
        </div>
        <div className="text-sm text-slate-400">{rows.length} items</div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-slate-300">
          No submissions yet. Start with a practice task and submit ✅
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => {
            const openUrl =
              r.course_slug && r.module_slug && r.lesson_slug
                ? `/lms/student/courses/${r.course_slug}/${r.module_slug}/${r.lesson_slug}`
                : null;

            return (
              <div
                key={r.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{r.task_title || "Task"}</div>
                    <div className="text-xs text-slate-400">
                      Attempt #{r.attempt_no} • {new Date(r.submitted_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge status={r.status} />
                   <Link
  to={`/lms/student/courses/${r.course_slug}/modules/${r.module_slug}/lessons/${r.lesson_slug}`}
  className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
>
  Open Lesson
</Link>
                  </div>
                </div>

                {r.review_feedback ? (
                  <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <div className="text-sm font-medium">Mentor Feedback</div>
                    <div className="mt-1 text-sm text-slate-300 whitespace-pre-wrap">
                      {r.review_feedback}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      {r.reviewed_at ? `Reviewed: ${new Date(r.reviewed_at).toLocaleString()}` : ""}
                      {typeof r.review_score === "number" ? ` • Score: ${r.review_score}` : ""}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-slate-400">
                    No mentor feedback yet.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}