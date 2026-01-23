import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiUsers,
  FiUserPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiMail,
  FiPhone,
  FiUser,
  FiUserCheck,
  FiBriefcase,
} from "react-icons/fi";

export default function SuperAdminMentors() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  // Determine view from route
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/edit")) return "edit";
    if (path.includes("/details") || (params.id && !path.includes("/edit") && !path.includes("/students") && !path.includes("/assignments"))) return "details";
    if (path.includes("/create") || path.includes("/add")) return "add";
    if (path.includes("/list")) return "list";
    if (path.includes("/cards")) return "cards";
    if (path.includes("/students")) return "students";
    if (path.includes("/assignments")) return "assignments";
    if (params.id) return "details";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: "", email: "", phone: "" });
  const [addForm, setAddForm] = useState({ fullName: "", email: "", phone: "" });
  const [saving, setSaving] = useState(false);

  // Fetch mentors
  useEffect(() => {
    if (!token) return;
    fetchMentors();
  }, [token]);

  // Load mentor details/edit when route has :id - fetch directly from API
  useEffect(() => {
    if (!token || !params.id) return;
    
    // Check if we already have the correct mentor loaded
    if (selectedMentor && String(selectedMentor.id) === String(params.id)) {
      return; // Already loaded, skip
    }
    
    const loadMentorData = async () => {
      try {
        if (view === "details") {
          // Fetch full details from API
          const res = await apiFetch(`/api/v1/admin/mentors/${params.id}`, { token });
          if (res?.ok) {
            setSelectedMentor(res.data);
          } else {
            console.error("Failed to load mentor details from API");
          }
        } else if (view === "edit") {
          // For edit, try list first, then API if needed
          const mentor = mentors.find((m) => String(m.id) === String(params.id));
          if (mentor) {
            setSelectedMentor(mentor);
            setEditForm({
              fullName: mentor.full_name || "",
              email: mentor.email || "",
              phone: mentor.phone || "",
            });
          } else {
            // Fallback: fetch from API
            const res = await apiFetch(`/api/v1/admin/mentors/${params.id}`, { token });
            if (res?.ok) {
              const mentorData = res.data;
              setSelectedMentor(mentorData);
              setEditForm({
                fullName: mentorData.full_name || "",
                email: mentorData.email || "",
                phone: mentorData.phone || "",
              });
            }
          }
        }
      } catch (error) {
        console.error("Failed to load mentor data from route:", error);
      }
    };

    loadMentorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, view, token]);

  // Filter mentors
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMentors(mentors);
    } else {
      const filtered = mentors.filter(
        (mentor) =>
          mentor.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.phone?.includes(searchQuery)
      );
      setFilteredMentors(filtered);
    }
  }, [searchQuery, mentors]);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/mentors", { token });
      if (res?.ok) {
        setMentors(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMentor = async () => {
    if (!addForm.email || !addForm.fullName) {
      alert("Email and Name are required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch("/api/v1/admin/mentors", {
        method: "POST",
        token,
        body: addForm,
      });

      if (res?.ok) {
        await fetchMentors();
        navigate("/lms/superadmin/mentors/list");
        setAddForm({ fullName: "", email: "", phone: "" });
      }
    } catch (error) {
      alert(error?.message || "Failed to add mentor");
    } finally {
      setSaving(false);
    }
  };

  const handleEditMentor = async () => {
    if (!selectedMentor) return;

    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const res = await apiFetch(`/api/v1/admin/mentors/${selectedMentor.id}`, {
        method: "PATCH",
        token,
        body: editForm,
      });

      if (res?.ok) {
        await fetchMentors();
        navigate("/lms/superadmin/mentors/list");
        setSelectedMentor(null);
      }
    } catch (error) {
      alert(error?.message || "Failed to update mentor");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMentor = async (mentorId) => {
    if (!confirm("Are you sure you want to remove this mentor?")) return;

    try {
      const res = await apiFetch(`/api/v1/admin/mentors/${mentorId}`, {
        method: "DELETE",
        token,
      });

      if (res?.ok) {
        await fetchMentors();
        if (view === "details" && selectedMentor?.id === mentorId) {
          navigate("/lms/superadmin/mentors/list");
        }
      }
    } catch (error) {
      alert(error?.message || "Failed to delete mentor");
    }
  };

  const openEdit = (mentor) => {
    setSelectedMentor(mentor);
    setEditForm({
      fullName: mentor.full_name || "",
      email: mentor.email || "",
      phone: mentor.phone || "",
    });
    navigate(`/lms/superadmin/mentors/${mentor.id}/edit`);
  };

  const openDetails = async (mentor) => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/v1/admin/mentors/${mentor.id}`, { token });
      if (res?.ok) {
        setSelectedMentor(res.data);
        navigate(`/lms/superadmin/mentors/${mentor.id}/details`);
      }
    } catch (error) {
      alert("Failed to load mentor details");
    } finally {
      setLoading(false);
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
            Mentors Management
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All Mentors Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/superadmin/mentors/list")}
              className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiUserCheck className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : mentors.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Mentors</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Mentors</h3>
              <p className="text-slate-600">View and manage all registered mentors</p>
            </motion.div>

            {/* Add Mentor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setAddForm({ fullName: "", email: "", phone: "" });
                navigate("/lms/superadmin/mentors/create");
              }}
              className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiUserPlus className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Add Mentor</h3>
              <p className="text-slate-600">Register a new mentor to the platform</p>
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
                onClick={() => navigate("/lms/superadmin/mentors/cards")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                All Mentors ({filteredMentors.length})
              </h1>
            </div>
            <button
              onClick={() => {
                setAddForm({ fullName: "", email: "", phone: "" });
                navigate("/lms/superadmin/mentors/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FiUserPlus className="w-5 h-5" />
              Add Mentor
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
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
          ) : filteredMentors.length === 0 ? (
            <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
              <FiUserCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No mentors found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "Get started by adding your first mentor"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-md p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {mentor.full_name?.charAt(0)?.toUpperCase() || "M"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate">
                        {mentor.full_name || "Unnamed Mentor"}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">{mentor.email}</p>
                      {mentor.phone && (
                        <p className="text-xs text-slate-500 mt-1">{mentor.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(mentor)}
                      className="flex-1 px-4 py-2 bg-purple-50 text-purple-600 font-medium rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDetails(mentor)}
                      className="flex-1 px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEye className="w-4 h-4" />
                      Details
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

  // Add Mentor View
  if (view === "add") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Add New Mentor</h2>
              <button
                onClick={() => navigate("/lms/superadmin/mentors/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Mentor Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={addForm.fullName}
                    onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                    placeholder="Enter mentor name"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={addForm.phone}
                    onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleAddMentor}
                  disabled={saving || !addForm.email || !addForm.fullName}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Adding..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Add Mentor
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/mentors/list")}
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

  // Edit Mentor View
  if (view === "edit") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Mentor</h2>
              <button
                onClick={() => navigate("/lms/superadmin/mentors/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Mentor Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    placeholder="Enter mentor name"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleEditMentor}
                  disabled={saving || !editForm.email || !editForm.fullName}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  onClick={() => navigate("/lms/superadmin/mentors/list")}
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

  // Mentor Details View with Students
  if (view === "details" && selectedMentor) {
    const mentor = selectedMentor;
    const students = mentor.students || [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-2xl">
                  {mentor.full_name?.charAt(0)?.toUpperCase() || "M"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {mentor.full_name || "Unnamed Mentor"}
                  </h2>
                  <p className="text-slate-600">{mentor.email}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/superadmin/mentors/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-md p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiUsers className="w-6 h-6 text-purple-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Students</h3>
                </div>
                <div className="text-3xl font-bold text-purple-600">{students.length}</div>
                <div className="text-xs text-slate-600 mt-1">Under mentorship</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiBriefcase className="w-6 h-6 text-blue-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Assignments</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {students.reduce((sum, s) => sum + (s.assignment_count || 0), 0)}
                </div>
                <div className="text-xs text-slate-600 mt-1">Total assigned</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-md p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiUserCheck className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Status</h3>
                </div>
                <div className="text-sm font-bold">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      mentor.is_active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {mentor.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Mentor Information */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Mentor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Mentor ID</div>
                    <div className="text-sm font-medium text-slate-900">{mentor.id}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Full Name</div>
                    <div className="text-sm font-medium text-slate-900">
                      {mentor.full_name || "Not provided"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Email</div>
                    <div className="text-sm font-medium text-slate-900">{mentor.email}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Phone Number</div>
                    <div className="text-sm font-medium text-slate-900">
                      {mentor.phone || "Not provided"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Joined Date</div>
                    <div className="text-sm font-medium text-slate-900">
                      {new Date(mentor.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Students Under This Mentor */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Students Under Mentorship ({students.length})
              </h3>
              {students.length === 0 ? (
                <div className="bg-slate-50 rounded-md p-12 border border-slate-200 text-center">
                  <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">No students assigned</h4>
                  <p className="text-slate-600">This mentor doesn't have any students assigned yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map((student) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-50 rounded-md p-4 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        // Navigate to student details - you can implement this later
                        window.location.href = `/lms/superadmin/students?studentId=${student.id}`;
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0 group-hover:scale-110 transition-transform">
                          {student.full_name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">
                            {student.full_name || "Unnamed Student"}
                          </h4>
                          <p className="text-sm text-slate-600 truncate">{student.email}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-500">
                              {student.assignment_count || 0} assignment{student.assignment_count !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <FiEye className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 mt-8 border-t border-slate-200">
              <button
                onClick={() => openEdit(selectedMentor)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <FiEdit2 className="w-5 h-5" />
                Edit Mentor
              </button>
              <button
                onClick={() => handleDeleteMentor(selectedMentor.id)}
                className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-md hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <FiTrash2 className="w-5 h-5" />
                Remove Mentor
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
