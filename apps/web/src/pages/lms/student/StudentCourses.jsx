import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import {
  FiBookOpen,
  FiPlay,
  FiSearch,
  FiTrendingUp,
  FiAward,
  FiClock,
  FiBarChart2,
} from "react-icons/fi";

export default function StudentCourses() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  useEffect(() => {
    if (!token) return;
    fetchCourses();
  }, [token]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/student/courses", { token }).catch(() => ({ data: [] }));
      setCourses(res?.data || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">My Courses</h1>
          <p className="text-slate-600 text-lg">Continue your learning journey</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-cyan-200/50 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all shadow-md"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-cyan-200/50 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 shadow-md"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
            <FiBookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-600">You haven't enrolled in any courses yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-md border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.level === "beginner" ? "bg-emerald-500 text-white" :
                      course.level === "intermediate" ? "bg-amber-500 text-white" :
                      "bg-red-500 text-white"
                    }`}>
                      {course.level || "Beginner"}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{course.title || "Untitled Course"}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {course.description || "No description available"}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-900">Progress</span>
                      <span className="text-sm text-slate-600">{course.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    {course.modules_count && (
                      <div className="flex items-center gap-1">
                        <FiBookOpen className="w-4 h-4" />
                        {course.modules_count} modules
                      </div>
                    )}
                    {course.duration && (
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        {course.duration}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => navigate(`/lms/student/courses/${course.slug}`)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FiPlay className="w-5 h-5" />
                    {course.progress > 0 ? "Continue Learning" : "Open Course"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
