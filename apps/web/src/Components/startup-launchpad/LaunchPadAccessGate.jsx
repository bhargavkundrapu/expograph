import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import { useAuth } from "../../app/providers/AuthProvider";
import { useTheme } from "../../app/providers/ThemeProvider";
import { apiFetch } from "../../services/api";
import { hasLaunchPadAccess } from "../../utils/launchPadAccess";
import { LaunchPadLoadingSkeleton } from "../common/SkeletonLoaders";

export default function LaunchPadAccessGate({ children }) {
  const { token } = useAuth();
  const { isDark } = useTheme();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/v1/me", { token });
      if (res?.ok) setMe(res.data || null);
    } catch (e) {
      console.error(e);
      setMe(null);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchMe()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, fetchMe]);

  if (loading && !me) {
    return <LaunchPadLoadingSkeleton />;
  }

  const unlocked = hasLaunchPadAccess(me);

  if (!unlocked) {
    return (
      <div
        className={`min-h-screen rounded-t-3xl md:rounded-none p-4 md:p-8 lg:rounded-tl-lg overflow-hidden transition-colors duration-200 ${
          isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"
        }`}
      >
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`backdrop-blur rounded-2xl border-2 shadow-xl p-6 md:p-8 text-center ${
              isDark ? "bg-slate-800/90 border-slate-700" : "bg-white/90 border-slate-200"
            }`}
          >
            <div
              className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${
                isDark ? "bg-slate-700" : "bg-slate-100"
              }`}
            >
              <FiLock className="h-8 w-8 text-slate-500" aria-hidden />
            </div>
            <h1
              className={`mb-2 text-xl font-bold md:text-2xl ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Startup LaunchPad is locked
            </h1>
            <p className={`mb-6 text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Get the{" "}
              <span className={`font-semibold ${isDark ? "text-amber-400" : "text-amber-600"}`}>All Pack</span> or own
              all three main courses (Vibe Coding, Prompt Engineering, Prompt to Profit) to unlock Startup LaunchPad,
              Real Client Lab access, and the AI Automations bonus track.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                to="/courses#pricing"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:brightness-110 transition"
              >
                View All Pack
              </Link>
              <Link
                to="/lms/student/courses"
                className={`inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 px-5 text-sm font-semibold transition ${
                  isDark
                    ? "border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/50"
                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                My courses
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return children;
}
