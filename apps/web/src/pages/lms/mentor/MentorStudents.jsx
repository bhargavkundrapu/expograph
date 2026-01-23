import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import {
  FiUsers,
  FiSearch,
  FiEye,
  FiX,
  FiTrendingUp,
  FiBriefcase,
  FiMessageSquare,
  FiMail,
  FiPhone,
  FiCalendar,
  FiBarChart2,
} from "react-icons/fi";

export default function MentorStudents() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/progress")) return "progress";
    if (path.includes("/details") || params.id) return "details";
    if (path.includes("/list")) return "list";
    return "cards";
  };
  
  const view = getViewFromPath();
  const [mentees, setMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentee, setSelectedMentee] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetchMentees();
  }, [token]);

  useEffect(() => {
    if (!token || !params.id) return;
    if (selectedMentee && String(selectedMentee.id) === String(params.id)) return;
    
    const loadMenteeData = async () => {
      try {
        const res = await apiFetch(`/api/v1/admin/students/${params.id}`, { token });
        if (res?.ok) {
          setSelectedMentee(res.data);
        }
      } catch (error) {
        console.error("Failed to load mentee details:", error);
      }
    };
    loadMenteeData();
  }, [params.id, token]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMentees(mentees);
    } else {
      const filtered = mentees.filter(
        (mentee) =>
          mentee.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentee.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMentees(filtered);
    }
  }, [searchQuery, mentees]);

  const fetchMentees = async () => {
    try {
      setLoading(true);
      const deliverablesRes = await apiFetch("/api/v1/mentor/internships/deliverables", { token });
      const deliverables = Array.isArray(deliverablesRes) ? deliverablesRes : (deliverablesRes?.data || []);
      
      const uniqueMentees = new Map();
      deliverables.forEach(d => {
        if (!uniqueMentees.has(d.student_id)) {
          uniqueMentees.set(d.student_id, {
            id: d.student_id,
            full_name: d.student_name,
            email: d.student_email,
            project_title: d.project_title,
            assignment_count: 1,
          });
        } else {
          uniqueMentees.get(d.student_id).assignment_count++;
        }
      });
      
      setMentees(Array.from(uniqueMentees.values()));
    } catch (error) {
      console.error("Failed to fetch mentees:", error);
      setMentees([]);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (mentee) => {
    setSelectedMentee(mentee);
    navigate(`/lms/mentor/students/${mentee.id}/details`);
  };

  if (view === "cards") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
          >
            My Mentees
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/mentor/students/list")}
              className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiUsers className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : mentees.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Mentees</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Mentees</h3>
              <p className="text-slate-600">View and manage your assigned mentees</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate("/lms/mentor/students/cards")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                My Mentees ({filteredMentees.length})
              </h1>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-md p-6 border border-slate-200 animate-pulse">
                  <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredMentees.length === 0 ? (
            <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
              <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No mentees found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "You don't have any mentees assigned yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentees.map((mentee, index) => (
                <motion.div
                  key={mentee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-md p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {mentee.full_name?.charAt(0)?.toUpperCase() || "M"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate">
                        {mentee.full_name || "Unnamed Mentee"}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">{mentee.email}</p>
                      {mentee.assignment_count > 0 && (
                        <p className="text-xs text-slate-500 mt-1">
                          {mentee.assignment_count} assignment{mentee.assignment_count !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => openDetails(mentee)}
                    className="w-full px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiEye className="w-4 h-4" />
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === "details" && selectedMentee) {
    const mentee = selectedMentee;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl">
                  {mentee.full_name?.charAt(0)?.toUpperCase() || "M"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {mentee.full_name || "Unnamed Mentee"}
                  </h2>
                  <p className="text-slate-600">{mentee.email}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/mentor/students/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-md p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiBriefcase className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Assignments</h3>
                </div>
                <div className="text-3xl font-bold text-emerald-600">{mentee.assignment_count || 0}</div>
                <div className="text-xs text-slate-600 mt-1">Active assignments</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiTrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Progress</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600">85%</div>
                <div className="text-xs text-slate-600 mt-1">Overall completion</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-md p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiBarChart2 className="w-6 h-6 text-purple-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Engagement</h3>
                </div>
                <div className="text-3xl font-bold text-purple-600">92%</div>
                <div className="text-xs text-slate-600 mt-1">Active engagement</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Mentee Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Full Name</div>
                    <div className="text-sm font-medium text-slate-900">
                      {mentee.full_name || "Not provided"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Email</div>
                    <div className="text-sm font-medium text-slate-900">{mentee.email}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                <button
                  onClick={() => navigate("/lms/mentor/communications")}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <FiMessageSquare className="w-5 h-5" />
                  Send Message
                </button>
                <button
                  onClick={() => navigate(`/lms/mentor/students/${mentee.id}/progress`)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <FiBarChart2 className="w-5 h-5" />
                  View Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "progress" && selectedMentee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Progress Report</h2>
              <button
                onClick={() => navigate(`/lms/mentor/students/${selectedMentee.id}/details`)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            <div className="text-center py-12">
              <FiBarChart2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Progress tracking coming soon</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
