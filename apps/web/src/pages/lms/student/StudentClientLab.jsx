import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import {
  FiFolder,
  FiCode,
  FiCheckCircle,
  FiClock,
  FiArrowLeft,
  FiPlus,
} from "react-icons/fi";

export default function StudentClientLab() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetchProjects();
  }, [token]);

  useEffect(() => {
    if (projectId && projects.length > 0) {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        setSelectedProject(project);
      }
    }
  }, [projectId, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockProjects = [
        {
          id: "1",
          title: "E-commerce Website",
          description: "Full-stack e-commerce platform with React and Node.js",
          status: "in_progress",
          created_at: new Date(Date.now() - 2592000000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString(),
          tasks: [
            { id: "1", title: "Design homepage", status: "completed" },
            { id: "2", title: "Implement cart functionality", status: "in_progress" },
            { id: "3", title: "Add payment integration", status: "pending" },
          ],
        },
        {
          id: "2",
          title: "Task Management App",
          description: "Collaborative task management application",
          status: "completed",
          created_at: new Date(Date.now() - 5184000000).toISOString(),
          updated_at: new Date(Date.now() - 1728000000).toISOString(),
          tasks: [
            { id: "1", title: "User authentication", status: "completed" },
            { id: "2", title: "Task CRUD operations", status: "completed" },
            { id: "3", title: "Real-time updates", status: "completed" },
          ],
        },
      ];
      setProjects(mockProjects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  if (selectedProject) {
    const completedTasks = selectedProject.tasks.filter((t) => t.status === "completed").length;
    const totalTasks = selectedProject.tasks.length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setSelectedProject(null);
              navigate("/lms/student/projects");
            }}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-200/50 shadow-xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {selectedProject.title}
                </h1>
                <p className="text-slate-600">{selectedProject.description}</p>
              </div>
              <div
                className={`px-4 py-2 rounded-xl border-2 ${
                  selectedProject.status === "completed"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : selectedProject.status === "in_progress"
                    ? "bg-amber-50 border-amber-200 text-amber-600"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                <span className="font-semibold capitalize">{selectedProject.status.replace("_", " ")}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progress</span>
                <span className="text-sm font-bold text-cyan-600">{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 mt-2">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Tasks</h3>
              {selectedProject.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-xl border-2 border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {task.status === "completed" ? (
                      <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : task.status === "in_progress" ? (
                      <FiClock className="w-5 h-5 text-amber-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                    <span className="font-medium text-slate-800">{task.title}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      task.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : task.status === "in_progress"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              My Projects
            </h1>
            <p className="text-slate-600 text-lg">Manage your code snippets and projects</p>
          </motion.div>
          <button
            onClick={() => navigate("/lms/student/projects/create")}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border-2 border-cyan-200/50 text-center"
          >
            <FiFolder className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No projects yet</h3>
            <p className="text-slate-500 mb-6">Start a new project to showcase your work</p>
            <button
              onClick={() => navigate("/lms/student/projects/create")}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              Create Project
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const completedTasks = project.tasks.filter((t) => t.status === "completed").length;
              const totalTasks = project.tasks.length;
              const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedProject(project);
                    navigate(`/lms/student/projects/${project.id}`);
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-cyan-200/50 hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl text-white">
                      <FiFolder className="w-6 h-6" />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        project.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : project.status === "in_progress"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {project.status.replace("_", " ")}
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Progress</span>
                      <span className="text-xs font-bold text-cyan-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{completedTasks}/{totalTasks} tasks</span>
                    <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
