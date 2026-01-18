import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiCode,
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
  FiFile,
  FiFolder,
  FiCopy,
  FiExternalLink,
  FiGlobe,
  FiTerminal,
  FiLayers,
} from "react-icons/fi";

export default function SuperAdminPlayground() {
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
    if (path.includes("/templates")) return "list";
    if (path.includes("/categories")) return "categories";
    if (params.id) return "details";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    category: "web", // web, python, react, node, sql, etc.
    language: "javascript",
    tags: [],
    files: [{ name: "index.html", content: "", type: "html" }],
    isPublic: false,
    status: "published",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "web",
    language: "javascript",
    tags: [],
    files: [{ name: "index.html", content: "", type: "html" }],
    isPublic: false,
    status: "published",
  });
  const [tagInput, setTagInput] = useState("");
  const [editTagInput, setEditTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  // Load template details/edit when route has :id
  useEffect(() => {
    if (!token || !params.id) return;
    
    // Check if we already have the correct template loaded
    if (selectedTemplate && String(selectedTemplate.id) === String(params.id)) {
      return; // Already loaded, skip
    }
    
    const loadTemplateData = async () => {
      try {
        // Try to find in list first
        const template = templates.find((t) => String(t.id) === String(params.id));
        if (template) {
          if (view === "details") {
            setSelectedTemplate(template);
          } else if (view === "edit") {
            setSelectedTemplate(template);
            setEditForm({
              title: template.title || "",
              description: template.description || "",
              category: template.category || "web",
              language: template.language || "javascript",
              tags: template.tags || [],
              files: template.files || [{ name: "index.html", content: "", type: "html" }],
              isPublic: template.isPublic || false,
              status: template.status || "published",
            });
          }
        }
      } catch (error) {
        console.error("Failed to load template data from route:", error);
      }
    };

    loadTemplateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, view, token, templates.length]);

  // Initialize with sample templates (in a real app, these would come from API)
  useEffect(() => {
    if (!token) return;
    // For now, use mock data. In production, fetch from API
    const mockTemplates = [
      {
        id: "1",
        title: "HTML/CSS/JS Starter",
        description: "Basic web development starter template",
        category: "web",
        language: "javascript",
        tags: ["html", "css", "javascript", "beginner"],
        files: [],
        isPublic: true,
        status: "published",
        createdAt: new Date().toISOString(),
        usageCount: 1250,
      },
      {
        id: "2",
        title: "React Component Playground",
        description: "React with hooks and modern patterns",
        category: "react",
        language: "javascript",
        tags: ["react", "hooks", "jsx", "intermediate"],
        files: [],
        isPublic: true,
        status: "published",
        createdAt: new Date().toISOString(),
        usageCount: 890,
      },
      {
        id: "3",
        title: "Python Data Analysis",
        description: "Pandas, NumPy starter template",
        category: "python",
        language: "python",
        tags: ["python", "pandas", "numpy", "data-science"],
        files: [],
        isPublic: true,
        status: "published",
        createdAt: new Date().toISOString(),
        usageCount: 650,
      },
    ];
    setTemplates(mockTemplates);
    setLoading(false);
  }, [token]);

  // Filter templates
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTemplates(templates);
    } else {
      const filtered = templates.filter(
        (template) =>
          template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.language?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredTemplates(filtered);
    }
  }, [searchQuery, templates]);

  const handleAddTemplate = async () => {
    if (!addForm.title || !addForm.description) {
      alert("Title and Description are required");
      return;
    }

    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      // In production, this would be an API call:
      // const res = await apiFetch("/api/v1/admin/playground/templates", {
      //   method: "POST",
      //   token,
      //   body: addForm,
      // });

      // For now, just add to local state
      const newTemplate = {
        id: Date.now().toString(),
        ...addForm,
        createdAt: new Date().toISOString(),
        usageCount: 0,
      };
      setTemplates([...templates, newTemplate]);
      navigate("/lms/superadmin/playground/list");
      setAddForm({
        title: "",
        description: "",
        category: "web",
        language: "javascript",
        tags: [],
        files: [{ name: "index.html", content: "", type: "html" }],
        isPublic: false,
        status: "published",
      });
      setTagInput("");
      alert("Template created successfully!");
    } catch (error) {
      alert(error?.message || "Failed to create template");
    } finally {
      setSaving(false);
    }
  };

  const handleEditTemplate = async () => {
    if (!selectedTemplate) return;

    if (!editForm.title || !editForm.description) {
      alert("Title and Description are required");
      return;
    }

    try {
      setSaving(true);
      // In production: await apiFetch(`/api/v1/admin/playground/templates/${selectedTemplate.id}`, { method: "PATCH", token, body: editForm });
      setTemplates(templates.map((t) => (t.id === selectedTemplate.id ? { ...t, ...editForm } : t)));
      navigate("/lms/superadmin/playground/list");
      setSelectedTemplate(null);
      alert("Template updated successfully!");
    } catch (error) {
      alert(error?.message || "Failed to update template");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async (template) => {
    if (!confirm(`Delete template "${template.title}"?`)) return;

    try {
      // In production: await apiFetch(`/api/v1/admin/playground/templates/${template.id}`, { method: "DELETE", token });
      setTemplates(templates.filter((t) => t.id !== template.id));
      if (selectedTemplate?.id === template.id) {
        navigate("/lms/superadmin/playground/list");
      }
      alert("Template deleted successfully!");
    } catch (error) {
      alert(error?.message || "Failed to delete template");
    }
  };

  const openEdit = (template) => {
    setSelectedTemplate(template);
    setEditForm({
      title: template.title || "",
      description: template.description || "",
      category: template.category || "web",
      language: template.language || "javascript",
      tags: template.tags || [],
      files: template.files || [{ name: "index.html", content: "", type: "html" }],
      isPublic: template.isPublic || false,
      status: template.status || "published",
    });
    setEditTagInput("");
    navigate(`/lms/superadmin/playground/templates/${template.id}/edit`);
  };

  const addEditTag = () => {
    if (editTagInput.trim() && !editForm.tags.includes(editTagInput.trim().toLowerCase())) {
      setEditForm({ ...editForm, tags: [...editForm.tags, editTagInput.trim().toLowerCase()] });
      setEditTagInput("");
    }
  };

  const removeEditTag = (tag) => {
    setEditForm({ ...editForm, tags: editForm.tags.filter((t) => t !== tag) });
  };

  const addEditFile = () => {
    setEditForm({
      ...editForm,
      files: [...editForm.files, { name: `file${editForm.files.length + 1}.js`, content: "", type: "javascript" }],
    });
  };

  const updateEditFile = (index, field, value) => {
    const newFiles = [...editForm.files];
    newFiles[index] = { ...newFiles[index], [field]: value };
    setEditForm({ ...editForm, files: newFiles });
  };

  const removeEditFile = (index) => {
    setEditForm({ ...editForm, files: editForm.files.filter((_, i) => i !== index) });
  };

  const openDetails = async (template) => {
    try {
      setSelectedTemplate(template);
      navigate(`/lms/superadmin/playground/templates/${template.id}/details`);
    } catch (error) {
      alert("Failed to load template details");
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !addForm.tags.includes(tagInput.trim().toLowerCase())) {
      setAddForm({ ...addForm, tags: [...addForm.tags, tagInput.trim().toLowerCase()] });
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setAddForm({ ...addForm, tags: addForm.tags.filter((t) => t !== tag) });
  };

  const addFile = () => {
    setAddForm({
      ...addForm,
      files: [...addForm.files, { name: `file${addForm.files.length + 1}.js`, content: "", type: "javascript" }],
    });
  };

  const updateFile = (index, field, value) => {
    const newFiles = [...addForm.files];
    newFiles[index] = { ...newFiles[index], [field]: value };
    setAddForm({ ...addForm, files: newFiles });
  };

  const removeFile = (index) => {
    setAddForm({ ...addForm, files: addForm.files.filter((_, i) => i !== index) });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "react":
        return <FiLayers className="w-5 h-5" />;
      case "python":
        return <FiTerminal className="w-5 h-5" />;
      case "web":
        return <FiGlobe className="w-5 h-5" />;
      default:
        return <FiCode className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "react":
        return "from-blue-500 to-cyan-600";
      case "python":
        return "from-yellow-500 to-orange-600";
      case "web":
        return "from-purple-500 to-indigo-600";
      case "node":
        return "from-green-500 to-emerald-600";
      case "sql":
        return "from-red-500 to-pink-600";
      default:
        return "from-slate-500 to-gray-600";
    }
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
            Code Playground Management
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All Templates Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/superadmin/playground/list")}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiCode className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : templates.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Templates</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Templates</h3>
              <p className="text-slate-600">View and manage all code playground templates</p>
            </motion.div>

            {/* Create Template Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setAddForm({
                  title: "",
                  description: "",
                  category: "web",
                  language: "javascript",
                  tags: [],
                  files: [{ name: "index.html", content: "", type: "html" }],
                  isPublic: false,
                  status: "published",
                });
                setTagInput("");
                navigate("/lms/superadmin/playground/templates/create");
              }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiPlus className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Create Template</h3>
              <p className="text-slate-600">Create a new code playground template</p>
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
                onClick={() => navigate("/lms/superadmin/playground/cards")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                All Templates ({filteredTemplates.length})
              </h1>
            </div>
            <button
              onClick={() => {
                setAddForm({
                  title: "",
                  description: "",
                  category: "web",
                  language: "javascript",
                  tags: [],
                  files: [{ name: "index.html", content: "", type: "html" }],
                  isPublic: false,
                  status: "published",
                });
                setTagInput("");
                navigate("/lms/superadmin/playground/templates/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Create Template
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, description, category, language, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Templates Grid */}
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
          ) : filteredTemplates.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
              <FiCode className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No templates found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "Get started by creating your first template"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCategoryColor(
                        template.category
                      )} flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}
                    >
                      {getCategoryIcon(template.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
                        {template.title || "Untitled Template"}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-700 capitalize">
                          {template.category || "web"}
                        </span>
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 capitalize">
                          {template.language || "javascript"}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(template.status)}`}>
                          {template.status || "published"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {template.description && (
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">{template.description}</p>
                  )}
                  {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 rounded text-xs bg-indigo-50 text-indigo-600">
                          {tag}
                        </span>
                      ))}
                      {template.tags.length > 3 && (
                        <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">
                          +{template.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  {template.usageCount !== undefined && (
                    <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <FiUsers className="w-3 h-3" />
                        <span>{template.usageCount} uses</span>
                      </div>
                      {template.isPublic && (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <FiGlobe className="w-3 h-3" />
                          <span>Public</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(template)}
                      className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDetails(template)}
                      className="flex-1 px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEye className="w-4 h-4" />
                      Details
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template)}
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

  // Create Template View
  if (view === "add") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New Template</h2>
              <button
                onClick={() => navigate("/lms/superadmin/playground/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Template Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  placeholder="e.g., React Starter Template"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  placeholder="Describe what this template provides..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
                  <select
                    value={addForm.category}
                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="web">Web (HTML/CSS/JS)</option>
                    <option value="react">React</option>
                    <option value="python">Python</option>
                    <option value="node">Node.js</option>
                    <option value="sql">SQL</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Language</label>
                  <select
                    value={addForm.language}
                    onChange={(e) => setAddForm({ ...addForm, language: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="sql">SQL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                {addForm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {addForm.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-indigo-900">
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 mt-8">
                    <input
                      type="checkbox"
                      checked={addForm.isPublic}
                      onChange={(e) => setAddForm({ ...addForm, isPublic: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-semibold text-slate-900">Make template public</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-slate-900">Files</label>
                  <button
                    onClick={addFile}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-2 text-sm"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add File
                  </button>
                </div>
                <div className="space-y-3">
                  {addForm.files.map((file, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FiFile className="w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          value={file.name}
                          onChange={(e) => updateFile(index, "name", e.target.value)}
                          placeholder="filename.ext"
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={4}
                        value={file.content}
                        onChange={(e) => updateFile(index, "content", e.target.value)}
                        placeholder="File content..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleAddTemplate}
                  disabled={saving || !addForm.title || !addForm.description}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiSave className="w-5 h-5" />
                  {saving ? "Creating..." : "Create Template"}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/playground/list")}
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

  // Edit Template View
  if (view === "edit" && selectedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Template</h2>
              <button
                onClick={() => navigate("/lms/superadmin/playground/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Template Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="e.g., React Starter Template"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Describe what this template provides..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="web">Web (HTML/CSS/JS)</option>
                    <option value="react">React</option>
                    <option value="python">Python</option>
                    <option value="node">Node.js</option>
                    <option value="sql">SQL</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Language</label>
                  <select
                    value={editForm.language}
                    onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="sql">SQL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={editTagInput}
                    onChange={(e) => setEditTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEditTag())}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                  <button
                    onClick={addEditTag}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                {editForm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {editForm.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button onClick={() => removeEditTag(tag)} className="hover:text-indigo-900">
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 mt-8">
                    <input
                      type="checkbox"
                      checked={editForm.isPublic}
                      onChange={(e) => setEditForm({ ...editForm, isPublic: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-semibold text-slate-900">Make template public</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-slate-900">Files</label>
                  <button
                    onClick={addEditFile}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-2 text-sm"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add File
                  </button>
                </div>
                <div className="space-y-3">
                  {editForm.files.map((file, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FiFile className="w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          value={file.name}
                          onChange={(e) => updateEditFile(index, "name", e.target.value)}
                          placeholder="filename.ext"
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
                        />
                        <button
                          onClick={() => removeEditFile(index)}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={4}
                        value={file.content}
                        onChange={(e) => updateEditFile(index, "content", e.target.value)}
                        placeholder="File content..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleEditTemplate}
                  disabled={saving || !editForm.title || !editForm.description}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  onClick={() => navigate("/lms/superadmin/playground/list")}
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

  // Template Details View
  if (view === "details" && selectedTemplate) {
    const template = selectedTemplate;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${getCategoryColor(
                    template.category
                  )} flex items-center justify-center text-white font-bold text-2xl`}
                >
                  {getCategoryIcon(template.category)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{template.title || "Untitled Template"}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(template.status)}`}>
                      {template.status || "published"}
                    </span>
                    <span className="px-3 py-1 rounded text-sm bg-slate-100 text-slate-700 capitalize">
                      {template.category || "web"}
                    </span>
                    <span className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-700 capitalize">
                      {template.language || "javascript"}
                    </span>
                    {template.isPublic && (
                      <span className="px-3 py-1 rounded text-sm bg-emerald-100 text-emerald-700 flex items-center gap-1">
                        <FiGlobe className="w-3 h-3" />
                        Public
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/superadmin/playground/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Template Information */}
            <div className="space-y-6">
              {template.description && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{template.description}</p>
                </div>
              )}

              {template.tags && template.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {template.usageCount !== undefined && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Usage Count</div>
                    <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <FiUsers className="w-5 h-5" />
                      {template.usageCount}
                    </div>
                  </div>
                )}
                {template.files && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Files</div>
                    <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <FiFolder className="w-5 h-5" />
                      {template.files.length || 0}
                    </div>
                  </div>
                )}
                {template.createdAt && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Created</div>
                    <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      {new Date(template.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  This template can be used in the code playground environment. Students can fork and modify these
                  templates to create their own projects.
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
