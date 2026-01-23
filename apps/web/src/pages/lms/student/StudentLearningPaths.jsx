import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import {
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiBook,
  FiTarget,
  FiArrowRight,
  FiLock,
  FiPlay,
} from "react-icons/fi";

export default function StudentLearningPaths() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [learningPaths, setLearningPaths] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    fetchLearningPaths();
  }, []);

  const fetchLearningPaths = async () => {
    // Mock data - replace with actual API call
    const mockPaths = [
      {
        id: "1",
        title: "Full Stack Web Development",
        description: "Master frontend and backend development with React, Node.js, and databases",
        duration: "6 months",
        level: "Beginner to Advanced",
        courses: 12,
        lessons: 150,
        progress: 35,
        enrolled: true,
        image: "https://via.placeholder.com/400x200",
        modules: [
          { id: "1", title: "HTML & CSS Fundamentals", completed: true, lessons: 15 },
          { id: "2", title: "JavaScript Basics", completed: true, lessons: 20 },
          { id: "3", title: "React Development", completed: false, lessons: 25 },
          { id: "4", title: "Node.js & Express", completed: false, lessons: 30 },
          { id: "5", title: "Database Management", completed: false, lessons: 20 },
          { id: "6", title: "Deployment & DevOps", completed: false, lessons: 15 },
        ],
      },
      {
        id: "2",
        title: "Data Science & Machine Learning",
        description: "Learn Python, data analysis, and machine learning algorithms",
        duration: "8 months",
        level: "Intermediate to Advanced",
        courses: 15,
        lessons: 200,
        progress: 0,
        enrolled: false,
        image: "https://via.placeholder.com/400x200",
        modules: [
          { id: "1", title: "Python Fundamentals", completed: false, lessons: 20 },
          { id: "2", title: "Data Analysis with Pandas", completed: false, lessons: 25 },
          { id: "3", title: "Machine Learning Basics", completed: false, lessons: 30 },
        ],
      },
      {
        id: "3",
        title: "Mobile App Development",
        description: "Build iOS and Android apps with React Native and Flutter",
        duration: "5 months",
        level: "Beginner to Intermediate",
        courses: 10,
        lessons: 120,
        progress: 0,
        enrolled: false,
        image: "https://via.placeholder.com/400x200",
        modules: [
          { id: "1", title: "React Native Basics", completed: false, lessons: 18 },
          { id: "2", title: "Flutter Development", completed: false, lessons: 22 },
        ],
      },
    ];
    setLearningPaths(mockPaths);
  };

  const enrollInPath = (pathId) => {
    setLearningPaths((prev) =>
      prev.map((path) => (path.id === pathId ? { ...path, enrolled: true } : path))
    );
    alert("Successfully enrolled in learning path!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FiTrendingUp className="w-10 h-10 text-blue-400" />
            Learning Paths
          </h1>
          <p className="text-slate-400">Structured learning journeys to master new skills</p>
        </motion.div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 rounded-md overflow-hidden border-2 border-slate-700/50 hover:border-blue-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedPath(path)}
            >
              <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                {path.image ? (
                  <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
                ) : (
                  <FiBook className="w-16 h-16 text-slate-600" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{path.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{path.description}</p>
                  </div>
                  {path.enrolled && (
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-lg text-xs font-medium">
                      Enrolled
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {path.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiBook className="w-4 h-4" />
                    {path.courses} courses
                  </span>
                  <span className="flex items-center gap-1">
                    <FiTarget className="w-4 h-4" />
                    {path.level}
                  </span>
                </div>

                {path.enrolled && path.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white font-medium">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {path.enrolled ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/lms/student/courses`);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FiPlay className="w-4 h-4" />
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        enrollInPath(path.id);
                      }}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Path Detail Modal */}
      {selectedPath && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-md p-6 border border-slate-700 max-w-3xl w-full my-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedPath.title}</h2>
                <p className="text-slate-400">{selectedPath.description}</p>
              </div>
              <button
                onClick={() => setSelectedPath(null)}
                className="text-slate-400 hover:text-white"
              >
                <FiArrowRight className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <FiClock className="w-4 h-4" />
                  Duration: {selectedPath.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FiBook className="w-4 h-4" />
                  {selectedPath.courses} Courses
                </span>
                <span className="flex items-center gap-1">
                  <FiTarget className="w-4 h-4" />
                  {selectedPath.level}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Curriculum</h3>
                <div className="space-y-2">
                  {selectedPath.modules.map((module, idx) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center gap-3">
                        {module.completed ? (
                          <FiCheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                        )}
                        <div>
                          <p className="text-white font-medium">{module.title}</p>
                          <p className="text-xs text-slate-400">{module.lessons} lessons</p>
                        </div>
                      </div>
                      {!selectedPath.enrolled && (
                        <FiLock className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-700">
              {selectedPath.enrolled ? (
                <button
                  onClick={() => {
                    setSelectedPath(null);
                    navigate(`/lms/student/courses`);
                  }}
                  className="flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <FiPlay className="w-4 h-4" />
                  Continue Learning
                </button>
              ) : (
                <button
                  onClick={() => {
                    enrollInPath(selectedPath.id);
                    setSelectedPath(null);
                  }}
                  className="flex-1 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all"
                >
                  Enroll in Path
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
