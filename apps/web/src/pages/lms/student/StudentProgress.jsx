import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import {
  FiTrendingUp,
  FiBookOpen,
  FiCheckCircle,
  FiAward,
  FiTarget,
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiStar,
} from "react-icons/fi";

export default function StudentProgress() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({
    completed_courses: 0,
    total_courses: 0,
    completed_lessons: 0,
    total_lessons: 0,
    streak: 0,
    consistency: 0,
    achievements: [],
  });
  const [courses, setCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchProgress();
  }, [token]);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/student/progress", { token });
      setProgress(res?.data || progress);

      // Fetch courses for progress details
      const coursesRes = await apiFetch("/api/v1/student/courses", { token }).catch(() => ({ data: [] }));
      setCourses(coursesRes?.data || []);

      // Mock achievements for now
      setAchievements([
        { id: "1", title: "First Steps", description: "Complete your first lesson", icon: "🎯", unlocked: true },
        { id: "2", title: "Week Warrior", description: "Complete 7 days in a row", icon: "🔥", unlocked: true },
        { id: "3", title: "Course Master", description: "Complete 5 courses", icon: "🏆", unlocked: false },
        { id: "4", title: "Perfect Score", description: "Score 100% on 10 quizzes", icon: "⭐", unlocked: false },
      ]);
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const courseProgress = courses.length > 0
    ? courses.reduce(
        (acc, course) => {
          acc.completed += course.completed_lessons || 0;
          acc.total += course.total_lessons || 0;
          return acc;
        },
        { completed: 0, total: 0 }
      )
    : { completed: progress.completed_lessons || 0, total: progress.total_lessons || 0 };

  const overallProgress = courseProgress.total > 0
    ? Math.round((courseProgress.completed / courseProgress.total) * 100)
    : 0;

  if (loading) {
    return <GenericPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            My Journey
          </h1>
          <p className="text-slate-600 text-lg">Track your learning progress and achievements</p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md text-white">
                <FiBookOpen className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {overallProgress}%
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Overall Progress</h3>
            <p className="text-sm text-slate-600">
              {courseProgress.completed} of {courseProgress.total} lessons
            </p>
            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-emerald-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-md text-white">
                <FiCheckCircle className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {progress.completed_courses || 0}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Courses Completed</h3>
            <p className="text-sm text-slate-600">Out of {progress.total_courses || 0} enrolled</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-amber-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-md text-white">
                <FiTarget className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {progress.streak || 0}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Day Streak</h3>
            <p className="text-sm text-slate-600">Keep it going!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-purple-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md text-white">
                <FiBarChart2 className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {progress.consistency || 0}%
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Consistency</h3>
            <p className="text-sm text-slate-600">Learning activity</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 shadow-lg"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <FiBookOpen className="w-6 h-6" />
              Course Progress
            </h2>
            {courses.length === 0 ? (
              <div className="text-center py-8">
                <FiBookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No courses enrolled yet</p>
                <button
                  onClick={() => navigate("/lms/student/courses")}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map((course) => {
                  const courseProgressPercent =
                    course.total_lessons > 0
                      ? Math.round((course.completed_lessons / course.total_lessons) * 100)
                      : 0;
                  return (
                    <div
                      key={course.id}
                      onClick={() => navigate(`/lms/student/courses/${course.slug}`)}
                      className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800">{course.title}</h3>
                        <span className="text-sm font-bold text-cyan-600">{courseProgressPercent}%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${courseProgressPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-600">
                        {course.completed_lessons || 0} of {course.total_lessons || 0} lessons completed
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-purple-200/50 shadow-lg"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <FiAward className="w-6 h-6" />
              Achievements
            </h2>
            {achievements.length === 0 ? (
              <div className="text-center py-8">
                <FiAward className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No achievements yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-md border-2 transition-all ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
                        : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-slate-800 mb-1">{achievement.title}</h3>
                    <p className="text-xs text-slate-600">{achievement.description}</p>
                    {achievement.unlocked && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                        <FiStar className="w-3 h-3" />
                        <span>Unlocked</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
