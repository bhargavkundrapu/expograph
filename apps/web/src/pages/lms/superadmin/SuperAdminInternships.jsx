import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiLayers,
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
  FiTag,
  FiTarget,
} from "react-icons/fi";

export default function SuperAdminInternships() {
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
    if (path.includes("/batches")) return "batches";
    if (path.includes("/applications")) return "applications";
    if (params.id) return "details";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [batches, setBatches] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [addForm, setAddForm] = useState({
    title: "",
    slug: "",
    track: "",
    difficulty: "",
    brief: "",
    skills: [],
    status: "draft",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    track: "",
    difficulty: "",
    brief: "",
    skills: [],
    status: "draft",
  });
  const [editSkillInput, setEditSkillInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [batchForm, setBatchForm] = useState({
    batchName: "",
    startAt: "",
    endAt: "",
    maxSeats: 0,
  });
  const [saving, setSaving] = useState(false);

  // Fetch projects
  useEffect(() => {
    if (!token) return;
    fetchProjects();
  }, [token]);

  // Load project details/edit when route has :id
  useEffect(() => {
    if (!token || !params.id || projects.length === 0) return;
    
    const project = projects.find((p) => String(p.id) === String(params.id));
    if (project) {
      if (view === "details") {
        openDetails(project);
      } else if (view === "edit") {
        openEdit(project);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, projects.length, view, token]);

  // Filter projects
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.track?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.difficulty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.status?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/mentor/internships/projects", { token });
      if (res?.ok) {
        setProjects(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (batchId) => {
    try {
      const res = await apiFetch(`/api/v1/mentor/internships/applications?batchId=${batchId}`, { token });
      if (res?.ok) {
        return res.data || [];
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
    return [];
  };

  const handleEditProject = async () => {
    if (!selectedProject) return;

    if (!editForm.title || !editForm.brief) {
      alert("Title and Brief are required");
      return;
    }

    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const body = {
        ...editForm,
        slug: editForm.slug || undefined,
        track: editForm.track || undefined,
        difficulty: editForm.difficulty || undefined,
        skills: editForm.skills || [],
      };
      const res = await apiFetch(`/api/v1/mentor/internships/projects/${selectedProject.id}`, {
        method: "PATCH",
        token,
        body,
      });

      if (res?.ok) {
        await fetchProjects();
        navigate("/lms/superadmin/internships/list");
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
      const res = await apiFetch(`/api/v1/mentor/internships/projects/${project.id}`, {
        method: "DELETE",
        token,
      });

      if (res?.ok) {
        await fetchProjects();
        if (selectedProject?.id === project.id) {
          navigate("/lms/superadmin/internships/list");
        }
        alert("Project deleted successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to delete project");
    }
  };

  const handleAddProject = async () => {
    if (!addForm.title || !addForm.brief) {
      alert("Title and Brief are required");
      return;
    }

    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const body = {
        ...addForm,
        slug: addForm.slug || undefined,
        track: addForm.track || undefined,
        difficulty: addForm.difficulty || undefined,
        skills: addForm.skills || [],
      };
      const res = await apiFetch("/api/v1/mentor/internships/projects", {
        method: "POST",
        token,
        body,
      });

      if (res?.ok) {
        await fetchProjects();
        navigate("/lms/superadmin/internships/list");
        setAddForm({
          title: "",
          slug: "",
          track: "",
          difficulty: "",
          brief: "",
          skills: [],
          status: "draft",
        });
        setSkillInput("");
        alert("Project created successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  const handleAddBatch = async (projectId) => {
    if (!batchForm.batchName || !batchForm.startAt || !batchForm.endAt) {
      alert("Batch name, start date, and end date are required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch(`/api/v1/mentor/internships/projects/${projectId}/batches`, {
        method: "POST",
        token,
        body: batchForm,
      });

      if (res?.ok) {
        await openDetails(selectedProject);
        setBatchForm({
          batchName: "",
          startAt: "",
          endAt: "",
          maxSeats: 0,
        });
        alert("Batch created successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to create batch");
    } finally {
      setSaving(false);
    }
  };

  const handleApproveApplication = async (applicationId, mentorId) => {
    try {
      const res = await apiFetch(`/api/v1/mentor/internships/applications/${applicationId}/approve`, {
        method: "POST",
        token,
        body: { mentorId: mentorId || undefined },
      });

      if (res?.ok) {
        await fetchApplications(selectedBatch.id);
        alert("Application approved!");
      }
    } catch (error) {
      alert(error?.message || "Failed to approve application");
    }
  };

  const handleRejectApplication = async (applicationId, reason) => {
    try {
      const res = await apiFetch(`/api/v1/mentor/internships/applications/${applicationId}/reject`, {
        method: "POST",
        token,
        body: { reason: reason || undefined },
      });

      if (res?.ok) {
        await fetchApplications(selectedBatch.id);
        alert("Application rejected");
      }
    } catch (error) {
      alert(error?.message || "Failed to reject application");
    }
  };

  const openEdit = (project) => {
    setSelectedProject(project);
    setEditForm({
      title: project.title || "",
      slug: project.slug || "",
      track: project.track || "",
      difficulty: project.difficulty || "",
      brief: project.brief || "",
      skills: project.skills || [],
      status: project.status || "draft",
    });
    setEditSkillInput("");
    navigate(`/lms/superadmin/internships/projects/${project.id}/edit`);
  };

  const addEditSkill = () => {
    if (editSkillInput.trim() && !editForm.skills.includes(editSkillInput.trim())) {
      setEditForm({ ...editForm, skills: [...editForm.skills, editSkillInput.trim()] });
      setEditSkillInput("");
    }
  };

  const removeEditSkill = (skill) => {
    setEditForm({ ...editForm, skills: editForm.skills.filter((s) => s !== skill) });
  };

  const openDetails = async (project) => {
    try {
      setLoading(true);
      setSelectedProject(project);
      // Note: Batches might be nested in project response or need separate fetch
      // For now, we'll show project details
      navigate(`/lms/superadmin/internships/projects/${project.id}/details`);
    } catch (error) {
      alert("Failed to load project details");
    } finally {
      setLoading(false);
    }
  };

  const openBatchDetails = async (batch) => {
    setSelectedBatch(batch);
    const apps = await fetchApplications(batch.id);
    setApplications(apps);
  };

  const addSkill = () => {
    if (skillInput.trim() && !addForm.skills.includes(skillInput.trim())) {
      setAddForm({ ...addForm, skills: [...addForm.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setAddForm({ ...addForm, skills: addForm.skills.filter((s) => s !== skill) });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-emerald-100 text-emerald-700";
      case "draft":
        return "bg-slate-100 text-slate-700";
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
            Internships Management
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All Projects Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/superadmin/internships/list")}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiLayers className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : projects.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Projects</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Projects</h3>
              <p className="text-slate-600">View and manage all internship projects</p>
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
                  track: "",
                  difficulty: "",
                  brief: "",
                  skills: [],
                  status: "draft",
                });
                setSkillInput("");
                navigate("/lms/superadmin/internships/projects/create");
              }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiPlus className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Create Project</h3>
              <p className="text-slate-600">Create a new internship project</p>
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
                onClick={() => navigate("/lms/superadmin/internships/cards")}
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
                  track: "",
                  difficulty: "",
                  brief: "",
                  skills: [],
                  status: "draft",
                });
                setSkillInput("");
                navigate("/lms/superadmin/internships/projects/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
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
                placeholder="Search by title, track, difficulty, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse">
                  <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
              <FiLayers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
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
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      <FiLayers className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
                        {project.title || "Untitled Project"}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        {project.track && (
                          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                            {project.track}
                          </span>
                        )}
                        {project.difficulty && (
                          <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-700">
                            {project.difficulty}
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status || "draft"}
                      </span>
                    </div>
                  </div>
                  {project.brief && (
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">{project.brief}</p>
                  )}
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 3 && (
                        <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">
                          +{project.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(project)}
                      className="flex-1 px-4 py-2 bg-green-50 text-green-600 font-medium rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
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
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New Project</h2>
              <button
                onClick={() => navigate("/lms/superadmin/internships/list")}
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
                  placeholder="e.g., Full Stack Developer Internship"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Slug (Optional)</label>
                <input
                  type="text"
                  value={addForm.slug}
                  onChange={(e) => setAddForm({ ...addForm, slug: e.target.value })}
                  placeholder="auto-generated from title if not provided"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Track (Optional)</label>
                  <input
                    type="text"
                    value={addForm.track}
                    onChange={(e) => setAddForm({ ...addForm, track: e.target.value })}
                    placeholder="e.g., Web Development, Data Science"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Difficulty (Optional)</label>
                  <select
                    value={addForm.difficulty}
                    onChange={(e) => setAddForm({ ...addForm, difficulty: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  >
                    <option value="">Select difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Brief/Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={addForm.brief}
                  onChange={(e) => setAddForm({ ...addForm, brief: e.target.value })}
                  placeholder="Project brief, requirements, what students will learn..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="Add a skill and press Enter"
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                {addForm.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {addForm.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-green-900">
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                <select
                  value={addForm.status}
                  onChange={(e) => setAddForm({ ...addForm, status: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleAddProject}
                  disabled={saving || !addForm.title || !addForm.brief}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiSave className="w-5 h-5" />
                  {saving ? "Creating..." : "Create Project"}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/internships/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
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
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Project</h2>
              <button
                onClick={() => navigate("/lms/superadmin/internships/list")}
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
                  placeholder="e.g., Full Stack Developer Internship"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Slug (Optional)</label>
                <input
                  type="text"
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  placeholder="auto-generated from title if not provided"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Track (Optional)</label>
                  <input
                    type="text"
                    value={editForm.track}
                    onChange={(e) => setEditForm({ ...editForm, track: e.target.value })}
                    placeholder="e.g., Web Development, Data Science"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Difficulty (Optional)</label>
                  <select
                    value={editForm.difficulty}
                    onChange={(e) => setEditForm({ ...editForm, difficulty: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  >
                    <option value="">Select difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Brief/Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={editForm.brief}
                  onChange={(e) => setEditForm({ ...editForm, brief: e.target.value })}
                  placeholder="Project brief, requirements, what students will learn..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={editSkillInput}
                    onChange={(e) => setEditSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEditSkill())}
                    placeholder="Add a skill and press Enter"
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  />
                  <button
                    onClick={addEditSkill}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                {editForm.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {editForm.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button onClick={() => removeEditSkill(skill)} className="hover:text-green-900">
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleEditProject}
                  disabled={saving || !editForm.title || !editForm.brief}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  onClick={() => navigate("/lms/superadmin/internships/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
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
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                  <FiLayers className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{project.title || "Untitled Project"}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status || "draft"}
                    </span>
                    {project.track && (
                      <span className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700">{project.track}</span>
                    )}
                    {project.difficulty && (
                      <span className="px-3 py-1 rounded text-sm bg-purple-100 text-purple-700">
                        {project.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/superadmin/internships/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Project Information */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Project ID</div>
                    <div className="text-sm font-medium text-slate-900">{project.id}</div>
                  </div>
                  {project.slug && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Slug</div>
                      <div className="text-sm font-medium text-slate-900">{project.slug}</div>
                    </div>
                  )}
                </div>
              </div>

              {project.brief && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Brief/Description</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 whitespace-pre-wrap">{project.brief}</p>
                  </div>
                </div>
              )}

              {project.skills && project.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Batches and applications can be managed after creating batches for this project. Use the API
                  endpoints to create batches and manage applications.
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
