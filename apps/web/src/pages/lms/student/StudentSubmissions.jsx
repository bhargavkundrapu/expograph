import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaFileAlt, FaCheckCircle, FaCode, FaClock, FaExternalLinkAlt, FaClipboardList } from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";

function Badge({ status }) {
  const map = {
    submitted: { label: "Submitted", icon: FaCheckCircle, cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
    in_review: { label: "In Review", icon: FaClock, cls: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300" },
    approved: { label: "Approved", icon: FaCheckCircle, cls: "border-emerald-500 bg-emerald-500 text-white" },
    changes_requested: { label: "Changes Requested", icon: FaCode, cls: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
  };
  const x = map[status] || { label: status, icon: null, cls: "border-gray-700 bg-gray-900 text-gray-400" };
  const Icon = x.icon;
  return (
    <span className={`inline-flex items-center gap-2 border-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${x.cls}`}>
      {Icon && <Icon className="text-xs" />}
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
      <div className="space-y-4 animate-fadeIn">
        <Skeleton className="h-10 w-64 mb-6" />
        <Card variant="elevated" className="p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
        <Card variant="elevated" className="p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      </div>
    );
  }

  if (err) {
    return (
      <Card variant="elevated" className="p-8">
        <div className="text-white mb-6 text-lg">{err}</div>
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
    <div className="space-y-8 animate-fadeIn">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-8 shadow-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30">
                <FaClipboardList className="text-white text-xl" />
              </div>
              <div>
                <h1 className="section-hero text-4xl mb-2">My Submissions</h1>
                <p className="section-body text-gray-300 text-lg">
                  Track mentor feedback & your proof of work.
                </p>
              </div>
            </div>
          </div>
          <div className="px-5 py-2.5 rounded-lg bg-gray-900 border border-gray-800">
            <div className="text-2xl font-bold text-white">{rows.length}</div>
            <div className="text-xs text-gray-500">items</div>
          </div>
        </div>
      </div>

      {rows.length === 0 ? (
        <Card variant="elevated" className="p-12 text-center">
          <div className="inline-block p-6 rounded-full bg-gray-900 border border-gray-800 mb-6">
            <FaFileAlt className="text-4xl text-gray-600" />
          </div>
          <CardTitle className="text-2xl mb-3">No Submissions Yet</CardTitle>
          <CardDescription className="text-lg">
            Start with a practice task and submit your work to get mentor feedback ✅
          </CardDescription>
        </Card>
      ) : (
        <div className="space-y-5">
          {rows.map((r, idx) => {
            const openUrl =
              r.course_slug && r.module_slug && r.lesson_slug
                ? `/lms/student/courses/${r.course_slug}/modules/${r.module_slug}/lessons/${r.lesson_slug}`
                : null;

            return (
              <Card
                key={r.id}
                variant="elevated"
                className="p-6 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
                        <FaFileAlt className="text-cyan-400" />
                      </div>
                      <CardTitle className="text-xl">{r.task_title || "Task"}</CardTitle>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 ml-11">
                      <span>Attempt #{r.attempt_no}</span>
                      <span>•</span>
                      <span>{new Date(r.submitted_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge status={r.status} />
                    {openUrl && (
                      <Link
                        to={openUrl}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        <FaExternalLinkAlt />
                        Open Lesson
                      </Link>
                    )}
                  </div>
                </div>

                {r.review_feedback ? (
                  <Card variant="outlined" className="p-5 bg-emerald-500/5 border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <FaCheckCircle className="text-emerald-400" />
                      <div className="text-sm font-bold text-emerald-300">Mentor Feedback</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {r.review_feedback}
                    </div>
                    <div className="mt-4 pt-4 border-t border-emerald-500/20 flex items-center gap-4 text-xs text-gray-500">
                      {r.reviewed_at && (
                        <span>Reviewed: {new Date(r.reviewed_at).toLocaleString()}</span>
                      )}
                      {typeof r.review_score === "number" && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold">
                          Score: {r.review_score}
                        </span>
                      )}
                    </div>
                  </Card>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-900 border border-gray-800 px-4 py-3 rounded-lg">
                    <FaClock className="text-cyan-400" />
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