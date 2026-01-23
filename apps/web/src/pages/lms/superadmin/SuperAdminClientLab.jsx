import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiBriefcase,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
} from "react-icons/fi";

export default function SuperAdminClientLab() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  // Determine view from route
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/edit")) return "edit";
    if (path.includes("/details") || (params.id && !path.includes("/edit"))) return "details";
    if (path.includes("/create")) return "add";
    if (path.includes("/list")) return "list";
    if (path.includes("/cards")) return "cards";
    if (path.includes("/projects")) return "list";
    if (path.includes("/clients")) return "clients";
    if (path.includes("/tasks")) return "tasks";
    if (params.id) return "details";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [addForm, setAddForm] = useState({
    title: "",
    slug: "",
    scope: "",
    clientId: "",
    status: "active",
    startDate: "",
    endDate: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    scope: "",
    clientId: "",
    status: "active",
    startDate: "",
    endDate: "",
  });
  const [saving, setSaving] = useState(false);

  // Fetch projects
  useEffect(() => {
    if (!token) return;
    fetchProjects();
  }, [token]);

  // Load project details/edit when route has :id - fetch directly from API if needed
  useEffect(() => {
    if (!token || !params.id) return;
    
    const loadProjectData = async () => {
      try {
        if (view === "details" && !selectedProject) {
          // Try list first, then API if needed
          const project = projects.find((p) => String(p.id) === String(params.id));
          if (project) {
            setSelectedProject(project);
          } else {
            // Fallback: fetch from API
            const res = await apiFetch(`/api/v1/admin/client-lab/projects/${params.id}`, { token });
            if (res?.ok) {
              setSelectedProject(res.data);
            }
          }
        } else if (view === "edit" && !selectedProject) {
          // For edit, try list first, then API if needed
          const project = projects.find((p) => String(p.id) === String(params.id));
          if (project) {
            openEdit(project);
          } else {
            // Fallback: fetch from API
            const res = await apiFetch(`/api/v1/admin/client-lab/projects/${params.id}`, { token });
            if (res?.ok) {
              openEdit(res.data);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load project data from route:", error);
      }
    };

    loadProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, view, token]);

  // Filter projects
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.scope?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.status?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/client-lab/projects", { token });
      if (res?.ok) {
        setProjects(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    if (!addForm.title) {
      alert("Title is required");
      return;
    }

    try {
      setSaving(true);
      const body = {
        ...addForm,
        slug: addForm.slug || undefined,
        clientId: addForm.clientId || undefined,
        startDate: addForm.startDate || undefined,
        endDate: addForm.endDate || undefined,
      };
      const res = await apiFetch("/api/v1/admin/client-lab/projects", {
        method: "POST",
        token,
        body,
      });

      if (res?.ok) {
        await fetchProjects();
        navigate("/lms/superadmin/client-lab/list");
        setAddForm({
          title: "",
          slug: "",
          scope: "",
          clientId: "",
          status: "active",
          startDate: "",
          endDate: "",
        });
        alert("Project created successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  const handleEditProject = async () => {
    if (!selectedProject) return;

    if (!editForm.title) {
      alert("Title is required");
      return;
    }

    try {
      setSaving(true);
      const body = {
        ...editForm,
        slug: editForm.slug || undefined,
        clientId: editForm.clientId || undefined,
        startDate: editForm.startDate || undefined,
        endDate: editForm.endDate || undefined,
      };
      const res = await apiFetch(`/api/v1/admin/client-lab/projects/${selectedProject.id}`, {
        method: "PATCH",
        token,
        body,
      });

      if (res?.ok) {
        await fetchProjects();
        navigate("/lms/superadmin/client-lab/list");
        setSelectedProject(null);
        alert("Project updated successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (project) => {
    if (!confirm(`Delete project "${project.title}"?`)) return;

    try {
      // Note: Backend may need DELETE endpoint
      const res = await apiFetch(`/api/v1/admin/client-lab/projects/${project.id}`, {
        method: "DELETE",
        token,
      });

      if (res?.ok || res?.status === 404) {
        await fetchProjects();
        if (selectedProject?.id === project.id) {
          navigate("/lms/superadmin/client-lab/list");
        }
        alert("Project deleted successfully!");
      }
    } catch (error) {
      // If DELETE endpoint doesn't exist, just remove from list for now
      console.warn("Delete endpoint may not be implemented:", error);
    }
  };

  const openEdit = (project) => {
    setSelectedProject(project);
    setEditForm({
      title: project.title || "",
      slug: project.slug || "",
      scope: project.scope || "",
      clientId: project.client_id || "",
      status: project.status || "active",
      startDate: project.start_date ? new Date(project.start_date).toISOString().slice(0, 10) : "",
      endDate: project.end_date ? new Date(project.end_date).toISOString().slice(0, 10) : "",
    });
    navigate(`/lms/superadmin/client-lab/projects/${project.id}/edit`);
  };

  const openDetails = async (project) => {
    try {
      setLoading(true);
      setSelectedProject(project);
      navigate(`/lms/superadmin/client-lab/projects/${project.id}/details`);
    } catch (error) {
      alert("Failed to load project details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Cards View
  if (view === "cards") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
          >
            Client Lab Management
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All Projects Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/superadmin/client-lab/list")}
              className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiBriefcase className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : projects.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Projects</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Projects</h3>
              <p className="text-slate-600">View and manage all client lab projects</p>
            </motion.div>

            {/* Create Project Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setAddForm({
                  title: "",
                  slug: "",
                  scope: "",
                  clientId: "",
                  status: "active",
                  startDate: "",
                  endDate: "",
                });
                navigate("/lms/superadmin/client-lab/projects/create");
              }}
              className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiPlus className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Create Project</h3>
              <p className="text-slate-600">Start a new client lab project</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  if (view === "list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate("/lms/superadmin/client-lab/cards")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                All Projects ({filteredProjects.length})
              </h1>
            </div>
            <button
              onClick={() => {
                setAddForm({
                  title: "",
                  slug: "",
                  scope: "",
                  clientId: "",
                  status: "active",
                  startDate: "",
                  endDate: "",
                });
                navigate("/lms/superadmin/client-lab/projects/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Create Project
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, scope, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-md p-6 border border-slate-200 animate-pulse">
                  <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
              <FiBriefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "Get started by creating your first project"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-md p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      <FiBriefcase className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
                        {project.title || "Untitled Project"}
                      </h3>
                      {project.scope && (
                        <p className="text-sm text-slate-600 line-clamp-2 mb-2">{project.scope}</p>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status || "active"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {(project.start_date || project.end_date) && (
                    <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                      {project.start_date && (
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          <span>{new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.end_date && (
                        <div className="flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          <span>{new Date(project.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(project)}
                      className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDetails(project)}
                      className="flex-1 px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEye className="w-4 h-4" />
                      Details
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project)}
                      className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
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

  // Create Project View
  if (view === "add") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New Project</h2>
              <button
                onClick={() => navigate("/lms/superadmin/client-lab/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  placeholder="e.g., E-commerce Platform, CRM System, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Slug (Optional)</label>
                <input
                  type="text"
                  value={addForm.slug}
                  onChange={(e) => setAddForm({ ...addForm, slug: e.target.value })}
                  placeholder="auto-generated from title if not provided"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Scope/Description</label>
                <textarea
                  rows={6}
                  value={addForm.scope}
                  onChange={(e) => setAddForm({ ...addForm, scope: e.target.value })}
                  placeholder="Project scope, requirements, deliverables..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Start Date (Optional)</label>
                  <input
                    type="date"
                    value={addForm.startDate}
                    onChange={(e) => setAddForm({ ...addForm, startDate: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">End Date (Optional)</label>
                  <input
                    type="date"
                    value={addForm.endDate}
                    onChange={(e) => setAddForm({ ...addForm, endDate: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                <select
                  value={addForm.status}
                  onChange={(e) => setAddForm({ ...addForm, status: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleAddProject}
                  disabled={saving || !addForm.title}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiSave className="w-5 h-5" />
                  {saving ? "Creating..." : "Create Project"}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/client-lab/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Project View
  if (view === "edit" && selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Project</h2>
              <button
                onClick={() => navigate("/lms/superadmin/client-lab/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="e.g., E-commerce Platform, CRM System, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Slug (Optional)</label>
                <input
                  type="text"
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  placeholder="auto-generated from title if not provided"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Scope/Description</label>
                <textarea
                  rows={6}
                  value={editForm.scope}
                  onChange={(e) => setEditForm({ ...editForm, scope: e.target.value })}
                  placeholder="Project scope, requirements, deliverables..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Start Date (Optional)</label>
                  <input
                    type="date"
                    value={editForm.startDate}
                    onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">End Date (Optional)</label>
                  <input
                    type="date"
                    value={editForm.endDate}
                    onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleEditProject}
                  disabled={saving || !editForm.title}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Saving..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/client-lab/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Project Details View
  if (view === "details" && selectedProject) {
    const project = selectedProject;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-2xl">
                  <FiBriefcase className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{project.title || "Untitled Project"}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status || "active"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/superadmin/client-lab/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Project Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Project ID</div>
                    <div className="text-sm font-medium text-slate-900">{project.id}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Slug</div>
                    <div className="text-sm font-medium text-slate-900">{project.slug || "N/A"}</div>
                  </div>
                  {project.start_date && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Start Date</div>
                      <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(project.start_date).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  {project.end_date && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">End Date</div>
                      <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        {new Date(project.end_date).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {project.scope && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Scope/Description</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 whitespace-pre-wrap">{project.scope}</p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <p className="text-sm text-slate-600">
                  Tasks and members can be managed from the project view or via API endpoints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
