import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiCalendar,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiMapPin,
  FiVideo,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiLink,
  FiAlertCircle,
} from "react-icons/fi";

export default function SuperAdminWorkshops() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  // Determine view from route
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/edit")) return "edit";
    if (path.includes("/details") || (params.id && !path.includes("/edit") && !path.includes("/registrations"))) return "details";
    if (path.includes("/create") || path.includes("/new")) return "add";
    if (path.includes("/list")) return "list";
    if (path.includes("/cards")) return "cards";
    if (params.id) return "details";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [workshops, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    startsAt: "",
    endsAt: "",
    mode: "offline",
    location: "",
    meetLink: "",
    capacity: 0,
    status: "published",
  });
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    startsAt: "",
    endsAt: "",
    mode: "offline",
    location: "",
    meetLink: "",
    capacity: 0,
    status: "published",
  });
  const [saving, setSaving] = useState(false);

  // Fetch workshops
  useEffect(() => {
    if (!token) return;
    fetchWorkshops();
  }, [token]);

  // Load workshop details/edit when route has :id
  useEffect(() => {
    if (!token || !params.id || workshops.length === 0) return;
    
    const workshop = workshops.find((w) => String(w.id) === String(params.id));
    if (workshop) {
      if (view === "details") {
        openDetails(workshop);
      } else if (view === "edit") {
        openEdit(workshop);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, workshops.length, view, token]);

  // Filter workshops
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredWorkshops(workshops);
    } else {
      const filtered = workshops.filter(
        (workshop) =>
          workshop.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workshop.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          workshop.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredWorkshops(filtered);
    }
  }, [searchQuery, workshops]);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/workshops", { token });
      if (res?.ok) {
        setWorkshops(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async (workshopId) => {
    try {
      const res = await apiFetch(`/api/v1/admin/workshops/${workshopId}/registrations`, { token });
      if (res?.ok) {
        return res.data || [];
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
    }
    return [];
  };

  const handleAddWorkshop = async () => {
    if (!addForm.title || !addForm.startsAt) {
      alert("Title and Start Date are required");
      return;
    }

    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const res = await apiFetch("/api/v1/admin/workshops", {
        method: "POST",
        token,
        body: addForm,
      });

      if (res?.ok) {
        await fetchWorkshops();
        navigate("/lms/superadmin/workshops/list");
        setAddForm({
          title: "",
          description: "",
          startsAt: "",
          endsAt: "",
          mode: "offline",
          location: "",
          meetLink: "",
          capacity: 0,
          status: "published",
        });
      }
    } catch (error) {
      alert(error?.message || "Failed to add workshop");
    } finally {
      setSaving(false);
    }
  };

  const handleEditWorkshop = async () => {
    if (!selectedWorkshop) return;

    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const res = await apiFetch(`/api/v1/admin/workshops/${selectedWorkshop.id}`, {
        method: "PATCH",
        token,
        body: editForm,
      });

      if (res?.ok) {
        await fetchWorkshops();
        navigate("/lms/superadmin/workshops/list");
        setSelectedWorkshop(null);
      }
    } catch (error) {
      alert(error?.message || "Failed to update workshop");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteWorkshop = async (workshopId) => {
    if (!confirm("Are you sure you want to delete this workshop?")) return;

    try {
      const res = await apiFetch(`/api/v1/admin/workshops/${workshopId}`, {
        method: "DELETE",
        token,
      });

      if (res?.ok) {
        await fetchWorkshops();
        if (params.id === workshopId) {
          navigate("/lms/superadmin/workshops/list");
        }
      }
    } catch (error) {
      alert(error?.message || "Failed to delete workshop");
    }
  };

  const openEdit = (workshop) => {
    setSelectedWorkshop(workshop);
    setEditForm({
      title: workshop.title || "",
      description: workshop.description || "",
      startsAt: workshop.starts_at ? new Date(workshop.starts_at).toISOString().slice(0, 16) : "",
      endsAt: workshop.ends_at ? new Date(workshop.ends_at).toISOString().slice(0, 16) : "",
      mode: workshop.mode || "offline",
      location: workshop.location || "",
      meetLink: workshop.meet_link || "",
      capacity: workshop.capacity || 0,
      status: workshop.status || "published",
    });
    navigate(`/lms/superadmin/workshops/${workshop.id}/edit`);
  };

  const openDetails = async (workshop) => {
    try {
      setLoading(true);
      const [detailsRes, regsRes] = await Promise.all([
        apiFetch(`/api/v1/admin/workshops/${workshop.id}`, { token }),
        fetchRegistrations(workshop.id),
      ]);
      
      if (detailsRes?.ok) {
        setSelectedWorkshop(detailsRes.data);
        setRegistrations(regsRes);
        navigate(`/lms/superadmin/workshops/${workshop.id}/details`);
      }
    } catch (error) {
      alert("Failed to load workshop details");
    } finally {
      setLoading(false);
    }
  };

  const updateRegistrationStatus = async (workshopId, registrationId, status) => {
    try {
      const res = await apiFetch(`/api/v1/admin/workshops/${workshopId}/registrations/${registrationId}/status`, {
        method: "PATCH",
        token,
        body: { status },
      });

      if (res?.ok) {
        await openDetails(selectedWorkshop);
      }
    } catch (error) {
      alert(error?.message || "Failed to update registration status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-emerald-100 text-emerald-700";
      case "draft":
        return "bg-slate-100 text-slate-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case "online":
        return <FiVideo className="w-4 h-4" />;
      case "hybrid":
        return <FiLink className="w-4 h-4" />;
      default:
        return <FiMapPin className="w-4 h-4" />;
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
            Events & Workshops Management
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All Workshops Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/superadmin/workshops/list")}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiCalendar className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : workshops.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Workshops</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Workshops</h3>
              <p className="text-slate-600">View and manage all events and workshops</p>
            </motion.div>

            {/* Add Workshop Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setAddForm({
                  title: "",
                  description: "",
                  startsAt: "",
                  endsAt: "",
                  mode: "offline",
                  location: "",
                  meetLink: "",
                  capacity: 0,
                  status: "published",
                });
                navigate("/lms/superadmin/workshops/create");
              }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiPlus className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Create Workshop</h3>
              <p className="text-slate-600">Schedule a new event or workshop</p>
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
                onClick={() => navigate("/lms/superadmin/workshops/cards")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                All Workshops ({filteredWorkshops.length})
              </h1>
            </div>
            <button
              onClick={() => {
                setAddForm({
                  title: "",
                  description: "",
                  startsAt: "",
                  endsAt: "",
                  mode: "offline",
                  location: "",
                  meetLink: "",
                  capacity: 0,
                  status: "published",
                });
                navigate("/lms/superadmin/workshops/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Create Workshop
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, description, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Workshops Grid */}
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
          ) : filteredWorkshops.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
              <FiCalendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No workshops found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "Get started by creating your first workshop"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkshops.map((workshop, index) => {
                const startsAt = workshop.starts_at ? new Date(workshop.starts_at) : null;
                const isUpcoming = startsAt && startsAt > new Date();
                const isPast = startsAt && startsAt < new Date();
                
                return (
                  <motion.div
                    key={workshop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        {workshop.title?.charAt(0)?.toUpperCase() || "W"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
                          {workshop.title || "Untitled Workshop"}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          {getModeIcon(workshop.mode)}
                          <span className="capitalize">{workshop.mode}</span>
                          {workshop.location && (
                            <>
                              <span>•</span>
                              <span className="truncate">{workshop.location}</span>
                            </>
                          )}
                        </div>
                        {startsAt && (
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <FiClock className="w-3 h-3" />
                            <span>{startsAt.toLocaleDateString()} {startsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(workshop.status)}`}>
                        {workshop.status}
                      </span>
                      {workshop.capacity > 0 && (
                        <span className="text-xs text-slate-500">Capacity: {workshop.capacity}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(workshop)}
                        className="flex-1 px-4 py-2 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => openDetails(workshop)}
                        className="flex-1 px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiEye className="w-4 h-4" />
                        Details
                      </button>
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

  // Add Workshop View (continuing in next response due to length)
  if (view === "add") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Create New Workshop</h2>
              <button
                onClick={() => navigate("/lms/superadmin/workshops/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Workshop Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  placeholder="Enter workshop title"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  placeholder="Enter workshop description"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Start Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={addForm.startsAt}
                    onChange={(e) => setAddForm({ ...addForm, startsAt: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">End Date & Time</label>
                  <input
                    type="datetime-local"
                    value={addForm.endsAt}
                    onChange={(e) => setAddForm({ ...addForm, endsAt: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Mode <span className="text-red-500">*</span></label>
                  <select
                    value={addForm.mode}
                    onChange={(e) => setAddForm({ ...addForm, mode: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {addForm.mode !== "online" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={addForm.location}
                      onChange={(e) => setAddForm({ ...addForm, location: e.target.value })}
                      placeholder="Enter physical location"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {addForm.mode !== "offline" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Meeting Link</label>
                  <div className="relative">
                    <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="url"
                      value={addForm.meetLink}
                      onChange={(e) => setAddForm({ ...addForm, meetLink: e.target.value })}
                      placeholder="Enter meeting URL (Zoom, Google Meet, etc.)"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Capacity (0 = unlimited)</label>
                <input
                  type="number"
                  value={addForm.capacity}
                  onChange={(e) => setAddForm({ ...addForm, capacity: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleAddWorkshop}
                  disabled={saving || !addForm.title || !addForm.startsAt}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Creating..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Create Workshop
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/workshops/list")}
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

  // Edit Workshop View (similar to Add but with editForm)
  if (view === "edit") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Workshop</h2>
              <button
                onClick={() => navigate("/lms/superadmin/workshops/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Workshop Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Enter workshop title"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Enter workshop description"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Start Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={editForm.startsAt}
                    onChange={(e) => setEditForm({ ...editForm, startsAt: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">End Date & Time</label>
                  <input
                    type="datetime-local"
                    value={editForm.endsAt}
                    onChange={(e) => setEditForm({ ...editForm, endsAt: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Mode <span className="text-red-500">*</span></label>
                  <select
                    value={editForm.mode}
                    onChange={(e) => setEditForm({ ...editForm, mode: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {editForm.mode !== "online" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="Enter physical location"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {editForm.mode !== "offline" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Meeting Link</label>
                  <div className="relative">
                    <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="url"
                      value={editForm.meetLink}
                      onChange={(e) => setEditForm({ ...editForm, meetLink: e.target.value })}
                      placeholder="Enter meeting URL (Zoom, Google Meet, etc.)"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Capacity (0 = unlimited)</label>
                <input
                  type="number"
                  value={editForm.capacity}
                  onChange={(e) => setEditForm({ ...editForm, capacity: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleEditWorkshop}
                  disabled={saving || !editForm.title || !editForm.startsAt}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  onClick={() => navigate("/lms/superadmin/workshops/list")}
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

  // Workshop Details View with Registrations (continuing in next part due to length)
  if (view === "details" && selectedWorkshop) {
    const workshop = selectedWorkshop;
    const stats = workshop.stats || {};
    const startsAt = workshop.starts_at ? new Date(workshop.starts_at) : null;
    const endsAt = workshop.ends_at ? new Date(workshop.ends_at) : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-2xl">
                  {workshop.title?.charAt(0)?.toUpperCase() || "W"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {workshop.title || "Untitled Workshop"}
                  </h2>
                  <p className="text-slate-600 flex items-center gap-2 mt-1">
                    {getModeIcon(workshop.mode)}
                    <span className="capitalize">{workshop.mode}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/superadmin/workshops/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiUsers className="w-6 h-6 text-orange-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Total Registrations</h3>
                </div>
                <div className="text-3xl font-bold text-orange-600">{stats.total_registrations || 0}</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiCheckCircle className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Attended</h3>
                </div>
                <div className="text-3xl font-bold text-emerald-600">{stats.attended_count || 0}</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiUsers className="w-6 h-6 text-blue-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Registered</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600">{stats.registered_count || 0}</div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiAlertCircle className="w-6 h-6 text-red-600" />
                  <h3 className="text-sm font-semibold text-slate-700">No Show</h3>
                </div>
                <div className="text-3xl font-bold text-red-600">{stats.no_show_count || 0}</div>
              </div>
            </div>

            {/* Workshop Information */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Workshop Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Title</div>
                    <div className="text-sm font-medium text-slate-900">{workshop.title}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Status</div>
                    <div className="text-sm font-medium">
                      <span className={`px-2 py-1 rounded-full ${getStatusColor(workshop.status)}`}>
                        {workshop.status}
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Start Time</div>
                    <div className="text-sm font-medium text-slate-900">
                      {startsAt ? startsAt.toLocaleString() : "Not set"}
                    </div>
                  </div>
                  {endsAt && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">End Time</div>
                      <div className="text-sm font-medium text-slate-900">{endsAt.toLocaleString()}</div>
                    </div>
                  )}
                  {workshop.location && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Location</div>
                      <div className="text-sm font-medium text-slate-900 flex items-center gap-1">
                        <FiMapPin className="w-4 h-4" />
                        {workshop.location}
                      </div>
                    </div>
                  )}
                  {workshop.meet_link && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Meeting Link</div>
                      <a href={workshop.meet_link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                        <FiLink className="w-4 h-4" />
                        Join Meeting
                      </a>
                    </div>
                  )}
                  {workshop.capacity > 0 && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Capacity</div>
                      <div className="text-sm font-medium text-slate-900">{workshop.capacity} seats</div>
                    </div>
                  )}
                </div>
                {workshop.description && (
                  <div className="mt-4 bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-2">Description</div>
                    <div className="text-sm text-slate-700 whitespace-pre-wrap">{workshop.description}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Registrations List */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Registrations ({registrations.length})
              </h3>
              {registrations.length === 0 ? (
                <div className="bg-slate-50 rounded-xl p-12 border border-slate-200 text-center">
                  <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">No registrations yet</h4>
                  <p className="text-slate-600">No one has registered for this workshop yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Phone</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">College</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr key={reg.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm text-slate-900">{reg.name}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">{reg.email || "-"}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">{reg.phone || "-"}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">{reg.college || "-"}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(reg.status)}`}>
                              {reg.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={reg.status}
                              onChange={(e) => updateRegistrationStatus(workshop.id, reg.id, e.target.value)}
                              className="text-xs px-2 py-1 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            >
                              <option value="registered">Registered</option>
                              <option value="attended">Attended</option>
                              <option value="no_show">No Show</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 mt-8 border-t border-slate-200">
              <button
                onClick={() => openEdit(selectedWorkshop)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <FiEdit2 className="w-5 h-5" />
                Edit Workshop
              </button>
              <button
                onClick={() => handleDeleteWorkshop(selectedWorkshop.id)}
                className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <FiTrash2 className="w-5 h-5" />
                Delete Workshop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
