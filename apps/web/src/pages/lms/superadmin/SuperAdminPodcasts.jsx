import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiRadio,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiPlay,
  FiClock,
  FiFileText,
  FiHeadphones,
  FiCalendar,
  FiCopy,
} from "react-icons/fi";

const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function SuperAdminPodcasts() {
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
    if (path.includes("/episodes")) return "list";
    if (path.includes("/series")) return "series";
    if (params.id) return "details";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    showNotes: "",
    seriesId: "",
    audioUrl: "",
    audioDurationSeconds: 0,
    coverImageUrl: "",
    episodeNumber: null,
    publishedAt: "",
    status: "draft",
    transcriptUrl: "",
    transcriptText: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    showNotes: "",
    seriesId: "",
    audioUrl: "",
    audioDurationSeconds: 0,
    coverImageUrl: "",
    episodeNumber: null,
    publishedAt: "",
    status: "draft",
    transcriptUrl: "",
    transcriptText: "",
  });
  const [saving, setSaving] = useState(false);

  // Fetch episodes
  useEffect(() => {
    if (!token) return;
    fetchEpisodes();
    fetchSeries();
  }, [token]);

  // Load episode details/edit when route has :id - fetch directly from API
  useEffect(() => {
    if (!token || !params.id) return;
    
    const loadEpisodeData = async () => {
      try {
        if (view === "details" && !selectedEpisode) {
          // Fetch full details from API - API returns { ok: true, data: {...} }
          const response = await apiFetch(`/api/v1/admin/podcasts/episodes/${params.id}`, { token });
          const episode = response?.data || response;
          setSelectedEpisode(episode);
        } else if (view === "edit" && !selectedEpisode) {
          // For edit, try list first, then API if needed
          const episode = episodes.find((e) => String(e.id) === String(params.id));
          if (episode) {
            openEdit(episode);
          } else {
            // Fallback: fetch from API - API returns { ok: true, data: {...} }
            const response = await apiFetch(`/api/v1/admin/podcasts/episodes/${params.id}`, { token });
            const episodeData = response?.data || response;
            openEdit(episodeData);
          }
        }
      } catch (error) {
        // Silently handle missing table errors - these are expected if tables don't exist yet
        const isMissingTableError = error?.isMissingTableError || 
          (error?.status === 500 && 
           (error?.message?.includes("does not exist") || 
            error?.message?.includes("relation") ||
            error?.payload?.error?.message?.includes("does not exist")));
        
        // Only log if it's NOT a missing table error
        if (!isMissingTableError) {
          console.error("Failed to load episode data from route:", error);
        }
      }
    };

    loadEpisodeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, view, token]);

  // Filter episodes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEpisodes(episodes);
    } else {
      const filtered = episodes.filter(
        (ep) =>
          ep.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ep.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ep.status?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }
  }, [searchQuery, episodes]);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      // apiFetch returns JSON response - API returns { ok: true, data: [...] }
      const response = await apiFetch("/api/v1/admin/podcasts/episodes", { token });
      // Extract array from response - handle { ok: true, data: [...] } or direct array
      const episodesArray = Array.isArray(response) 
        ? response 
        : (Array.isArray(response?.data) ? response.data : []);
      setEpisodes(episodesArray);
    } catch (error) {
      // Silently handle missing table errors - these are expected if tables don't exist yet
      // Check both the error flag and message to be safe
      const isMissingTableError = error?.isMissingTableError || 
        (error?.status === 500 && 
         (error?.message?.includes("does not exist") || 
          error?.message?.includes("relation") ||
          error?.payload?.error?.message?.includes("does not exist")));
      
      // Only log if it's NOT a missing table error
      if (!isMissingTableError) {
        console.error("Failed to fetch episodes:", error);
      }
      // Set empty array if fetch fails (tables might not exist yet)
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeries = async () => {
    try {
      // apiFetch returns JSON response - API returns { ok: true, data: [...] }
      const response = await apiFetch("/api/v1/admin/podcasts/series", { token });
      // Extract array from response - handle { ok: true, data: [...] } or direct array
      const seriesArray = Array.isArray(response) 
        ? response 
        : (Array.isArray(response?.data) ? response.data : []);
      setSeries(seriesArray);
    } catch (error) {
      // Silently handle missing table errors - these are expected if tables don't exist yet
      // Check both the error flag and message to be safe
      const isMissingTableError = error?.isMissingTableError || 
        (error?.status === 500 && 
         (error?.message?.includes("does not exist") || 
          error?.message?.includes("relation") ||
          error?.payload?.error?.message?.includes("does not exist")));
      
      // Only log if it's NOT a missing table error
      if (!isMissingTableError) {
        console.error("Failed to fetch series:", error);
      }
      // Set empty array if fetch fails (tables might not exist yet)
      setSeries([]);
    }
  };

  const handleAddEpisode = async () => {
    if (!addForm.title || !addForm.audioUrl) {
      alert("Title and Audio URL are required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch("/api/v1/admin/podcasts/episodes", {
        method: "POST",
        token,
        body: {
          ...addForm,
          audioDurationSeconds: addForm.audioDurationSeconds || 0,
          episodeNumber: addForm.episodeNumber || null,
          seriesId: addForm.seriesId || null,
          publishedAt: addForm.publishedAt || null,
        },
      });

      if (res?.ok) {
        await fetchEpisodes();
        navigate("/lms/superadmin/podcasts/list");
        setAddForm({
          title: "",
          description: "",
          showNotes: "",
          seriesId: "",
          audioUrl: "",
          audioDurationSeconds: 0,
          coverImageUrl: "",
          episodeNumber: null,
          publishedAt: "",
          status: "draft",
          transcriptUrl: "",
          transcriptText: "",
        });
        alert("Episode created successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to create episode");
    } finally {
      setSaving(false);
    }
  };

  const handleEditEpisode = async () => {
    if (!selectedEpisode) return;

    if (!editForm.title || !editForm.audioUrl) {
      alert("Title and Audio URL are required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch(`/api/v1/admin/podcasts/episodes/${selectedEpisode.id}`, {
        method: "PATCH",
        token,
        body: {
          ...editForm,
          audioDurationSeconds: editForm.audioDurationSeconds || 0,
          episodeNumber: editForm.episodeNumber || null,
          seriesId: editForm.seriesId || null,
          publishedAt: editForm.publishedAt || null,
        },
      });

      if (res?.ok) {
        await fetchEpisodes();
        navigate("/lms/superadmin/podcasts/list");
        setSelectedEpisode(null);
        alert("Episode updated successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to update episode");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEpisode = async (episode) => {
    if (!confirm(`Delete episode "${episode.title}"?`)) return;

    try {
      const res = await apiFetch(`/api/v1/admin/podcasts/episodes/${episode.id}`, {
        method: "DELETE",
        token,
      });

      if (res?.ok) {
        await fetchEpisodes();
        if (selectedEpisode?.id === episode.id) {
          navigate("/lms/superadmin/podcasts/list");
        }
        alert("Episode deleted successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to delete episode");
    }
  };

  const openEdit = (episode) => {
    setSelectedEpisode(episode);
    setEditForm({
      title: episode.title || "",
      description: episode.description || "",
      showNotes: episode.show_notes || "",
      seriesId: episode.series_id || "",
      audioUrl: episode.audio_url || "",
      audioDurationSeconds: episode.audio_duration_seconds || 0,
      coverImageUrl: episode.cover_image_url || "",
      episodeNumber: episode.episode_number || null,
      publishedAt: episode.published_at ? new Date(episode.published_at).toISOString().slice(0, 16) : "",
      status: episode.status || "draft",
      transcriptUrl: episode.transcript_url || "",
      transcriptText: episode.transcript_text || "",
    });
    navigate(`/lms/superadmin/podcasts/episodes/${episode.id}/edit`);
  };

  const openDetails = async (episode) => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/v1/admin/podcasts/episodes/${episode.id}`, { token });
      if (res?.ok) {
        setSelectedEpisode(res.data);
        navigate(`/lms/superadmin/podcasts/episodes/${episode.id}/details`);
      }
    } catch (error) {
      alert("Failed to load episode details");
    } finally {
      setLoading(false);
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
            Podcast Episodes Management
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All Episodes Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/superadmin/podcasts/list")}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiRadio className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : episodes.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Episodes</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Episodes</h3>
              <p className="text-slate-600">View and manage all podcast episodes</p>
            </motion.div>

            {/* Create Episode Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setAddForm({
                  title: "",
                  description: "",
                  showNotes: "",
                  seriesId: "",
                  audioUrl: "",
                  audioDurationSeconds: 0,
                  coverImageUrl: "",
                  episodeNumber: null,
                  publishedAt: "",
                  status: "draft",
                  transcriptUrl: "",
                  transcriptText: "",
                });
                navigate("/lms/superadmin/podcasts/episodes/create");
              }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiPlus className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Create Episode</h3>
              <p className="text-slate-600">Create a new podcast episode</p>
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
                onClick={() => navigate("/lms/superadmin/podcasts/cards")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                All Episodes ({filteredEpisodes.length})
              </h1>
            </div>
            <button
              onClick={() => {
                setAddForm({
                  title: "",
                  description: "",
                  showNotes: "",
                  seriesId: "",
                  audioUrl: "",
                  audioDurationSeconds: 0,
                  coverImageUrl: "",
                  episodeNumber: null,
                  publishedAt: "",
                  status: "draft",
                  transcriptUrl: "",
                  transcriptText: "",
                });
                navigate("/lms/superadmin/podcasts/episodes/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Create Episode
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, description, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Episodes Grid */}
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
          ) : filteredEpisodes.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
              <FiRadio className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No episodes found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "Get started by creating your first episode"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEpisodes.map((ep, index) => (
                <motion.div
                  key={ep.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      <FiRadio className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
                        {ep.title || "Untitled Episode"}
                      </h3>
                      {ep.episode_number && (
                        <p className="text-xs text-slate-500 mb-1">Episode #{ep.episode_number}</p>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ep.status)}`}>
                          {ep.status || "draft"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {ep.description && (
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">{ep.description}</p>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    {ep.audio_duration_seconds && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <FiClock className="w-3 h-3" />
                        <span>{formatDuration(ep.audio_duration_seconds)}</span>
                      </div>
                    )}
                    {ep.published_at && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <FiCalendar className="w-3 h-3" />
                        <span>{new Date(ep.published_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(ep)}
                      className="flex-1 px-4 py-2 bg-purple-50 text-purple-600 font-medium rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDetails(ep)}
                      className="flex-1 px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEye className="w-4 h-4" />
                      Details
                    </button>
                    <button
                      onClick={() => handleDeleteEpisode(ep)}
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

  // Create Episode View
  if (view === "add") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New Episode</h2>
              <button
                onClick={() => navigate("/lms/superadmin/podcasts/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  placeholder="e.g., Introduction to React Hooks"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Series (Optional)</label>
                <select
                  value={addForm.seriesId}
                  onChange={(e) => setAddForm({ ...addForm, seriesId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                >
                  <option value="">No series</option>
                  {series.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  placeholder="Episode description..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Audio URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={addForm.audioUrl}
                    onChange={(e) => setAddForm({ ...addForm, audioUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Duration (seconds)</label>
                  <input
                    type="number"
                    value={addForm.audioDurationSeconds}
                    onChange={(e) => setAddForm({ ...addForm, audioDurationSeconds: parseInt(e.target.value) || 0 })}
                    min="0"
                    placeholder="3600"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Episode Number</label>
                  <input
                    type="number"
                    value={addForm.episodeNumber || ""}
                    onChange={(e) => setAddForm({ ...addForm, episodeNumber: parseInt(e.target.value) || null })}
                    min="1"
                    placeholder="1"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Published Date (Optional)</label>
                <input
                  type="datetime-local"
                  value={addForm.publishedAt}
                  onChange={(e) => setAddForm({ ...addForm, publishedAt: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Cover Image URL</label>
                <input
                  type="url"
                  value={addForm.coverImageUrl}
                  onChange={(e) => setAddForm({ ...addForm, coverImageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Show Notes (Markdown)</label>
                <textarea
                  rows={6}
                  value={addForm.showNotes}
                  onChange={(e) => setAddForm({ ...addForm, showNotes: e.target.value })}
                  placeholder="Markdown supported..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Transcript Text</label>
                <textarea
                  rows={10}
                  value={addForm.transcriptText}
                  onChange={(e) => setAddForm({ ...addForm, transcriptText: e.target.value })}
                  placeholder="Full transcript text (searchable)..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Transcript URL (Optional)</label>
                <input
                  type="url"
                  value={addForm.transcriptUrl}
                  onChange={(e) => setAddForm({ ...addForm, transcriptUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleAddEpisode}
                  disabled={saving || !addForm.title || !addForm.audioUrl}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiSave className="w-5 h-5" />
                  {saving ? "Creating..." : "Create Episode"}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/podcasts/list")}
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

  // Edit Episode View
  if (view === "edit" && selectedEpisode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Episode</h2>
              <button
                onClick={() => navigate("/lms/superadmin/podcasts/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="e.g., Introduction to React Hooks"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Series (Optional)</label>
                <select
                  value={editForm.seriesId}
                  onChange={(e) => setEditForm({ ...editForm, seriesId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                >
                  <option value="">No series</option>
                  {series.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Episode description..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Audio URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={editForm.audioUrl}
                    onChange={(e) => setEditForm({ ...editForm, audioUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Duration (seconds)</label>
                  <input
                    type="number"
                    value={editForm.audioDurationSeconds}
                    onChange={(e) => setEditForm({ ...editForm, audioDurationSeconds: parseInt(e.target.value) || 0 })}
                    min="0"
                    placeholder="3600"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Episode Number</label>
                  <input
                    type="number"
                    value={editForm.episodeNumber || ""}
                    onChange={(e) => setEditForm({ ...editForm, episodeNumber: parseInt(e.target.value) || null })}
                    min="1"
                    placeholder="1"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Published Date (Optional)</label>
                <input
                  type="datetime-local"
                  value={editForm.publishedAt}
                  onChange={(e) => setEditForm({ ...editForm, publishedAt: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Cover Image URL</label>
                <input
                  type="url"
                  value={editForm.coverImageUrl}
                  onChange={(e) => setEditForm({ ...editForm, coverImageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Show Notes (Markdown)</label>
                <textarea
                  rows={6}
                  value={editForm.showNotes}
                  onChange={(e) => setEditForm({ ...editForm, showNotes: e.target.value })}
                  placeholder="Markdown supported..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Transcript Text</label>
                <textarea
                  rows={10}
                  value={editForm.transcriptText}
                  onChange={(e) => setEditForm({ ...editForm, transcriptText: e.target.value })}
                  placeholder="Full transcript text (searchable)..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Transcript URL (Optional)</label>
                <input
                  type="url"
                  value={editForm.transcriptUrl}
                  onChange={(e) => setEditForm({ ...editForm, transcriptUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleEditEpisode}
                  disabled={saving || !editForm.title || !editForm.audioUrl}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  onClick={() => navigate("/lms/superadmin/podcasts/list")}
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

  // Episode Details View
  if (view === "details" && selectedEpisode) {
    const ep = selectedEpisode;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                  <FiRadio className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{ep.title || "Untitled Episode"}</h2>
                  {ep.episode_number && (
                    <p className="text-slate-600">Episode #{ep.episode_number}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/superadmin/podcasts/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Episode Information */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Episode Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Status</div>
                    <div>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(ep.status)}`}>
                        {ep.status || "draft"}
                      </span>
                    </div>
                  </div>
                  {ep.episode_number && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Episode Number</div>
                      <div className="text-sm font-medium text-slate-900">#{ep.episode_number}</div>
                    </div>
                  )}
                  {ep.audio_duration_seconds && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Duration</div>
                      <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        {formatDuration(ep.audio_duration_seconds)}
                      </div>
                    </div>
                  )}
                  {ep.published_at && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Published</div>
                      <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(ep.published_at).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {ep.description && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{ep.description}</p>
                </div>
              )}

              {ep.audio_url && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <FiHeadphones className="w-5 h-5" />
                    Audio
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <audio controls className="w-full">
                      <source src={ep.audio_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <a
                      href={ep.audio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                    >
                      <FiLink className="w-4 h-4" />
                      Open audio file
                    </a>
                  </div>
                </div>
              )}

              {ep.show_notes && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <FiFileText className="w-5 h-5" />
                    Show Notes
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 whitespace-pre-wrap">{ep.show_notes}</p>
                  </div>
                </div>
              )}

              {ep.transcript_text && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <FiFileText className="w-5 h-5" />
                    Transcript
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <p className="text-slate-700 whitespace-pre-wrap text-sm">{ep.transcript_text}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
