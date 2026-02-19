import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiFileText,
  FiEdit,
  FiTrash2,
  FiPlay,
  FiCopy,
  FiSearch,
  FiFilter,
  FiDownload,
  FiUpload,
  FiSettings,
  FiEye,
} from "react-icons/fi";
import { apiFetch } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";
import PresentationBuilder from "../../../Components/presentation/PresentationBuilder";
import PresentationViewer from "../../../Components/presentation/PresentationViewer";
import { vibeCodingPresentation } from "../../../data/presentations/vibeCodingPresentation";

export default function SuperAdminPresentation() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, draft, published
  const [viewMode, setViewMode] = useState("list"); // list, builder, viewer
  const [selectedPresentation, setSelectedPresentation] = useState(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  // Fetch presentations
  useEffect(() => {
    if (!token) return;
    fetchPresentations();
  }, [token]);

  const fetchPresentations = async () => {
    try {
      setLoading(true);
      const response = await apiFetch("/api/v1/presentations", { token });
      const data = response?.data ?? response ?? [];
      const list = Array.isArray(data) ? data : [];
      const demoPresentation = { ...vibeCodingPresentation };
      setPresentations(list.length > 0 ? [...list, demoPresentation] : [demoPresentation]);
    } catch (error) {
      // Use demo presentation when API is unavailable or returns error
      setPresentations([{ ...vibeCodingPresentation }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setSelectedPresentation(null);
    setShowBuilder(true);
    setViewMode("builder");
  };

  const handleEdit = (presentation) => {
    setSelectedPresentation(presentation);
    setShowBuilder(true);
    setViewMode("builder");
  };

  const handleView = (presentation) => {
    setSelectedPresentation(presentation);
    setShowViewer(true);
    setViewMode("viewer");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this presentation?")) return;

    try {
      await apiFetch(`/api/v1/presentations/${id}`, {
        method: "DELETE",
      });
      fetchPresentations();
    } catch (error) {
      console.error("Failed to delete presentation:", error);
      alert("Failed to delete presentation");
    }
  };

  const handleDuplicate = async (presentation) => {
    try {
      const newPresentation = {
        ...presentation,
        title: `${presentation.title} (Copy)`,
        id: undefined,
      };
      await apiFetch("/api/v1/presentations", {
        method: "POST",
        body: newPresentation,
      });
      fetchPresentations();
    } catch (error) {
      console.error("Failed to duplicate presentation:", error);
      alert("Failed to duplicate presentation");
    }
  };

  const handleSave = () => {
    fetchPresentations();
    setShowBuilder(false);
    setViewMode("list");
  };

  const handleCloseViewer = () => {
    setShowViewer(false);
    setViewMode("list");
  };

  const filteredPresentations = presentations.filter((pres) => {
    const matchesSearch = pres.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || pres.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Show builder
  if (showBuilder) {
    return (
      <PresentationBuilder
        presentation={selectedPresentation}
        onSave={handleSave}
        onCancel={() => {
          setShowBuilder(false);
          setViewMode("list");
        }}
      />
    );
  }

  // Show viewer
  if (showViewer && selectedPresentation) {
    return (
      <PresentationViewer
        presentation={selectedPresentation}
        onClose={handleCloseViewer}
      />
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Presentation Builder
              </h1>
              <p className="text-slate-600 text-lg">
                Create interactive, professional presentations with reveal.js
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const demo = { ...vibeCodingPresentation };
                  handleEdit(demo);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <FiEye className="w-5 h-5" />
                Load Demo: Vibe Coding
              </button>
              <button
                onClick={handleCreateNew}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Create New Presentation
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search presentations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <FiFilter className="w-5 h-5 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="all">All</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Presentations Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading presentations...</p>
          </div>
        ) : filteredPresentations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-md p-12 border border-slate-200 text-center shadow-sm"
          >
            <FiFileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No presentations found</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filter"
                : "Get started by creating your first presentation"}
            </p>
            {!searchQuery && filter === "all" && (
              <button
                onClick={handleCreateNew}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                Create Presentation
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPresentations.map((presentation, index) => (
              <motion.div
                key={presentation.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-md p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {presentation.title || "Untitled Presentation"}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {presentation.slideCount || 0} slides
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      presentation.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {presentation.status || "draft"}
                  </span>
                </div>

                {presentation.description && (
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {presentation.description}
                  </p>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleView(presentation)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm"
                    title="View/Present"
                  >
                    <FiPlay className="w-4 h-4" />
                    Present
                  </button>
                  <button
                    onClick={() => handleEdit(presentation)}
                    className="px-3 py-2 bg-slate-50 text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                    title="Edit"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDuplicate(presentation)}
                    className="px-3 py-2 bg-slate-50 text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                    title="Duplicate"
                  >
                    <FiCopy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(presentation.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                {presentation.updatedAt && (
                  <p className="text-xs text-slate-400 mt-3">
                    Updated {new Date(presentation.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
