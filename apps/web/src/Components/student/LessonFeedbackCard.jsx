import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiSend, FiHeart } from "react-icons/fi";
import { useTheme } from "../../app/providers/ThemeProvider";
import { apiFetch } from "../../services/api";

const STARS = [1, 2, 3, 4, 5];

/**
 * Premium lesson feedback card - "How was this lesson?" with stars + optional comment.
 * Renders at bottom of lesson; submits to POST .../lessons/:lessonSlug/feedback.
 */
export default function LessonFeedbackCard({
  courseSlug,
  moduleSlug,
  lessonSlug,
  lessonTitle,
  token,
  onSubmitted,
}) {
  const { isDark } = useTheme();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || !token) return;
    setLoading(true);
    setError("");
    try {
      await apiFetch(
        `/api/v1/student/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}/feedback`,
        {
          method: "POST",
          token,
          body: { rating, comment: (comment || "").trim() || undefined },
        }
      );
      setSubmitted(true);
      onSubmitted?.();
    } catch (err) {
      setError(err?.message || "Could not send feedback. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-6 rounded-xl border p-5 text-center ${
          isDark ? "border-emerald-500/30 bg-emerald-500/10" : "border-emerald-200 bg-emerald-50"
        }`}
      >
        <div className="flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-300">
          <FiHeart className="w-5 h-5" />
          <span className="font-medium">Thank you! Your feedback helps us improve.</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 rounded-xl border p-5 ${
        isDark ? "border-slate-600 bg-slate-800/50" : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className={`text-sm font-medium mb-3 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
        How was this lesson?
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-1">
          {STARS.map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              className="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <FiStar
                className={`w-8 h-8 transition-colors ${
                  value <= (hover || rating)
                    ? "fill-amber-400 text-amber-400"
                    : isDark
                      ? "text-slate-500"
                      : "text-slate-300"
                }`}
              />
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="lesson-feedback-comment" className="sr-only">
            Optional comment
          </label>
          <textarea
            id="lesson-feedback-comment"
            placeholder="Anything we could do better? (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            rows={2}
            className={`w-full rounded-lg border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 ${
              isDark
                ? "border-slate-600 bg-slate-700 text-white placeholder-slate-400"
                : "border-slate-300 bg-white text-slate-900 placeholder-slate-500"
            }`}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={rating < 1 || loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiSend className="w-4 h-4" />
          )}
          Send feedback
        </button>
      </form>
    </motion.div>
  );
}
