import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import {
  FiStar,
  FiMessageSquare,
  FiUser,
  FiBook,
  FiLayers,
  FiLoader,
  FiFilter,
  FiChevronDown,
  FiHeart,
  FiCalendar,
} from "react-icons/fi";
import { formatDateTime } from "../../../utils/format";

const RATING_LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very good", 5: "Excellent" };

export default function SuperAdminFeedback() {
  const { token } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [total, setTotal] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState(""); // '' | 'course' | 'lesson'
  const [courseFilter, setCourseFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const limit = 50;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!token) return;
    const fetchCourses = async () => {
      try {
        const res = await apiFetch("/api/v1/admin/courses", { token });
        setCourses(Array.isArray(res?.data) ? res.data : []);
      } catch {
        setCourses([]);
      }
    };
    fetchCourses();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit, offset });
        if (typeFilter) params.set("type", typeFilter);
        if (courseFilter) params.set("courseId", courseFilter);
        const res = await apiFetch(`/api/v1/admin/feedback?${params}`, { token });
        setFeedback(Array.isArray(res?.data) ? res.data : []);
        setTotal(res?.total ?? 0);
      } catch {
        setFeedback([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [token, typeFilter, courseFilter, offset]);

  const hasFilters = typeFilter || courseFilter;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-slate-400 mb-1">
          <FiHeart className="w-4 h-4" />
          <span className="text-sm font-medium">Student feedback</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Feedback
        </h1>
        <p className="text-slate-400 mt-1">
          Course and lesson feedback from students-who said what and how they rated.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowFilters((s) => !s)}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            showFilters || hasFilters
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
              : "bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700"
          }`}
        >
          <FiFilter className="w-4 h-4" />
          Filters
          {hasFilters && <span className="w-2 h-2 rounded-full bg-sky-400" />}
          <FiChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-wrap items-center gap-3"
          >
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setOffset(0); }}
              className="rounded-lg border border-slate-600 bg-slate-800 text-white text-sm px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="">All types</option>
              <option value="course">Course feedback</option>
              <option value="lesson">Lesson feedback</option>
            </select>
            <select
              value={courseFilter}
              onChange={(e) => { setCourseFilter(e.target.value); setOffset(0); }}
              className="rounded-lg border border-slate-600 bg-slate-800 text-white text-sm px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none min-w-[180px]"
            >
              <option value="">All courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title || c.slug}</option>
              ))}
            </select>
            {hasFilters && (
              <button
                type="button"
                onClick={() => { setTypeFilter(""); setCourseFilter(""); setOffset(0); }}
                className="text-sm text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <FiLoader className="w-8 h-8 text-sky-400 animate-spin" />
        </div>
      ) : feedback.length === 0 ? (
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-12 text-center">
          <FiMessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400">No feedback yet.</p>
          <p className="text-slate-500 text-sm mt-1">Student feedback will appear here once they submit it from courses and lessons.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedback.map((row, i) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 md:p-5 hover:border-slate-600 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <FiStar
                        key={r}
                        className={`w-4 h-4 ${
                          r <= (row.rating || 0)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <span className="text-amber-400 font-medium">
                      {RATING_LABELS[row.rating] ?? row.rating}
                    </span>
                    <span className="text-slate-500 mx-2">·</span>
                    <span className="text-slate-400 text-sm">
                      {row.feedback_type === "course" ? "Course" : "Lesson"}
                    </span>
                  </div>
                </div>
                <div className="text-slate-500 text-sm flex items-center gap-1 flex-shrink-0">
                  <FiCalendar className="w-3.5 h-3.5" />
                  {row.created_at ? formatDateTime(row.created_at) : "-"}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <FiBook className="w-4 h-4 text-slate-500" />
                  <span>{row.course_title || row.course_slug || "Course"}</span>
                </div>
                {row.lesson_title && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiLayers className="w-4 h-4 text-slate-500" />
                    <span>{row.lesson_title}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                <FiUser className="w-4 h-4 text-slate-500" />
                <span>{row.user_name || "Student"}</span>
                {row.user_email && (
                  <>
                    <span className="text-slate-600">·</span>
                    <a
                      href={`mailto:${row.user_email}`}
                      className="text-sky-400 hover:text-sky-300 truncate"
                    >
                      {row.user_email}
                    </a>
                  </>
                )}
              </div>
              {row.comment && (
                <div className="mt-3 pl-6 border-l-2 border-slate-600">
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{row.comment}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {total > limit && (
        <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
          <span>Showing {feedback.length} of {total}</span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={offset === 0}
              onClick={() => setOffset((o) => Math.max(0, o - limit))}
              className="px-3 py-1.5 rounded-lg bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={offset + limit >= total}
              onClick={() => setOffset((o) => o + limit)}
              className="px-3 py-1.5 rounded-lg bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
