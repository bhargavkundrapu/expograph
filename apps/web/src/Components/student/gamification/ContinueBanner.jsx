import { motion } from "framer-motion";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiPlay, FiArrowRight, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getStudentLessonPath } from "../../../utils/studentCoursePaths";

export default function ContinueBanner({ currentCourse, schedule }) {
  const { isDark } = useTheme();
  const { daysSinceLastVisit, lastContinue } = useGamification();
  const navigate = useNavigate();

  const lesson = currentCourse || lastContinue || schedule?.[0];

  const courseName = lesson?.courseName || lesson?.courseSlug || "Your Course";
  const moduleName = lesson?.moduleName || lesson?.moduleSlug || "";
  const lessonTitle = lesson?.lessonTitle || lesson?.title || lesson?.name || lesson?.nextLessonSlug || "Continue Learning";

  const hasValidPath = lesson?.courseSlug && lesson?.moduleSlug && (lesson?.lessonSlug || lesson?.nextLessonSlug);
  const path = hasValidPath
    ? getStudentLessonPath(lesson.courseSlug, lesson.moduleSlug, lesson.lessonSlug || lesson.nextLessonSlug)
    : "/lms/student/courses";

  const progressPct = lesson?.progress || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`rounded-2xl overflow-hidden border cursor-pointer group transition-all hover:shadow-lg ${isDark ? "bg-gradient-to-r from-blue-600/15 to-cyan-600/15 border-blue-500/20 hover:border-blue-500/40" : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100 hover:border-blue-200"}`}
      onClick={() => navigate(path)}
    >
      <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${isDark ? "bg-blue-600/30" : "bg-blue-100"}`}>
          <FiPlay className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          {daysSinceLastVisit >= 3 && (
            <p className={`text-[10px] font-semibold mb-0.5 ${isDark ? "text-amber-400" : "text-amber-600"}`}>
              Welcome back! You were away for {daysSinceLastVisit} days 👋
            </p>
          )}
          <p className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            Continue Learning
          </p>
          <h3 className={`text-sm sm:text-base font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
            {lessonTitle}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <p className={`text-[11px] truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {courseName} {moduleName && `• ${moduleName}`}
            </p>
            {progressPct > 0 && (
              <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                <FiClock className="w-3 h-3" /> {progressPct}%
              </span>
            )}
          </div>
        </div>
        <FiArrowRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
      </div>
    </motion.div>
  );
}
