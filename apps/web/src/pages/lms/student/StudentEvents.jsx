import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import PageTransition from "../../../Components/common/PageTransition";
import {
  FiCalendar,
  FiClock,
  FiChevronRight,
  FiArrowLeft,
  FiRadio,
} from "react-icons/fi";

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function EventCard({ event, isDark, onClick }) {
  const startTime = formatTime(event.starts_at);
  const endTime = formatTime(event.ends_at);
  const timeRange = [startTime, endTime].filter(Boolean).join(" – ") || event.date;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 p-4 sm:p-5 transition-all hover:shadow-lg ${
        isDark
          ? "bg-slate-800/80 border-slate-700 hover:border-slate-600"
          : "bg-white border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className={`font-bold text-base sm:text-lg truncate ${isDark ? "text-white" : "text-slate-900"}`}>
              {event.title}
            </h3>
            {event.isLive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shrink-0">
                <FiRadio className="w-3 h-3" aria-hidden />
                Live
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className={`flex items-center gap-1.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              <FiCalendar className="w-4 h-4 shrink-0" />
              {event.date}
            </span>
            {(event.starts_at || event.ends_at) && (
              <span className={`flex items-center gap-1.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                <FiClock className="w-4 h-4 shrink-0" />
                {timeRange}
              </span>
            )}
          </div>
        </div>
        <FiChevronRight className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
      </div>
    </motion.button>
  );
}

function EventDetail({ event, isDark, onBack }) {
  const startTime = formatTime(event.starts_at);
  const endTime = formatTime(event.ends_at);
  const timeRange = [startTime, endTime].filter(Boolean).join(" – ") || "-";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border-2 p-6 sm:p-8 ${isDark ? "bg-slate-800/90 border-slate-700" : "bg-white border-slate-200"}`}
    >
      <button
        type="button"
        onClick={onBack}
        className={`flex items-center gap-2 text-sm font-medium mb-6 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Events
      </button>
      <div className="flex items-center gap-2 mb-4">
        <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          {event.title}
        </h1>
        {event.isLive && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
            <FiRadio className="w-3.5 h-3.5" />
            Live now
          </span>
        )}
      </div>
      <dl className="space-y-3">
        <div className="flex items-center gap-3">
          <FiCalendar className={`w-5 h-5 shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
          <div>
            <dt className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-500"}`}>Date</dt>
            <dd className={isDark ? "text-slate-200" : "text-slate-800"}>{event.date}</dd>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FiClock className={`w-5 h-5 shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
          <div>
            <dt className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-500"}`}>Time</dt>
            <dd className={isDark ? "text-slate-200" : "text-slate-800"}>{timeRange}</dd>
          </div>
        </div>
      </dl>
    </motion.div>
  );
}

function EmptyState({ isDark, onGoHome }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border-2 p-8 sm:p-12 text-center ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"}`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-slate-700" : "bg-white"}`}>
        <FiCalendar className={`w-8 h-8 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
      </div>
      <h2 className={`text-lg sm:text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
        No upcoming events
      </h2>
      <p className={`text-sm mb-6 max-w-sm mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
        Workshops, challenges, and live sessions will appear here when they’re scheduled. Check back later or continue learning.
      </p>
      <button
        type="button"
        onClick={onGoHome}
        className="px-4 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 text-white text-sm transition-colors"
      >
        Back to Home
      </button>
    </motion.div>
  );
}

export default function StudentEvents() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiFetch("/api/v1/student/events", { token });
        if (cancelled) return;
        const data = res?.data ?? [];
        setEvents(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to load events");
          setEvents([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  const selectedEvent = id && events.length > 0 ? events.find((e) => e.id === id) : null;

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen p-4 sm:p-6">
          <GenericPageSkeleton />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className={`min-h-screen transition-colors ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {!id && (
            <div className="mb-6 sm:mb-8">
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Events
              </h1>
              <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Workshops, challenges, podcasts & live sessions
              </p>
            </div>
          )}

          {selectedEvent ? (
            <EventDetail
              event={selectedEvent}
              isDark={isDark}
              onBack={() => navigate("/lms/student/events")}
            />
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-xl border p-6 text-center ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
            >
              <p className={isDark ? "text-slate-300" : "text-slate-600"}>{error}</p>
              <button
                type="button"
                onClick={() => navigate("/lms/student")}
                className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                Back to Home
              </button>
            </motion.div>
          ) : events.length === 0 ? (
            <EmptyState isDark={isDark} onGoHome={() => navigate("/lms/student")} />
          ) : (
            <div className="space-y-3">
              {events.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  isDark={isDark}
                  onClick={() => navigate(`/lms/student/events/${ev.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
