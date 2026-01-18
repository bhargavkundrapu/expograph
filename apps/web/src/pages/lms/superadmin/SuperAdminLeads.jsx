import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading, InlineSpinner, ActionLoading, SkeletonCard } from "../../../Components/common/LoadingStates";
import {
  FiUsers,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiMail,
  FiPhone,
  FiUser,
  FiTrendingUp,
  FiCalendar,
  FiFilter,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

const LEAD_STATUSES = ["new", "contacted", "qualified", "proposal", "converted", "lost"];
const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-purple-100 text-purple-800",
  proposal: "bg-indigo-100 text-indigo-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

export default function SuperAdminLeads() {
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
    if (path.includes("/pipeline")) return "pipeline";
    if (params.id) return "details";
    return "pipeline"; // default
  };
  
  const view = getViewFromPath();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [editForm, setEditForm] = useState({ status: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
  });

  useEffect(() => {
    if (!token) return;
    fetchLeads();
  }, [token]);

  // Load lead details/edit when route has :id
  useEffect(() => {
    if (!token || !params.id || leads.length === 0) return;
    
    const lead = leads.find((l) => String(l.id) === String(params.id));
    if (lead) {
      if (view === "details") {
        openDetails(lead);
      } else if (view === "edit") {
        openEdit(lead);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, leads.length, view, token]);

  useEffect(() => {
    let filtered = leads;
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phone?.includes(searchQuery)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }
    setFilteredLeads(filtered);
    updateStats(filtered);
  }, [searchQuery, statusFilter, leads]);

  const updateStats = (leadList) => {
    setStats({
      total: leadList.length,
      new: leadList.filter((l) => l.status === "new").length,
      contacted: leadList.filter((l) => l.status === "contacted").length,
      qualified: leadList.filter((l) => l.status === "qualified").length,
      converted: leadList.filter((l) => l.status === "converted").length,
    });
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/leads", { token });
      if (res?.ok) {
        const leadData = res.data || [];
        setLeads(leadData);
        updateStats(leadData);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLead = async (leadId, updates) => {
    try {
      setSaving(true);
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));
      const res = await apiFetch(`/api/v1/admin/leads/${leadId}`, {
        method: "PATCH",
        token,
        body: updates,
      });
      if (res?.ok) {
        await fetchLeads();
        navigate("/lms/superadmin/leads/list");
        setSelectedLead(null);
      }
    } catch (error) {
      alert(error?.message || "Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (lead) => {
    setSelectedLead(lead);
    setEditForm({ status: lead.status || "new", notes: lead.notes || "" });
    navigate(`/lms/superadmin/leads/${lead.id}/edit`);
  };

  const openDetails = (lead) => {
    setSelectedLead(lead);
    navigate(`/lms/superadmin/leads/${lead.id}/details`);
  };

  const getLeadsByStatus = (status) => {
    return filteredLeads.filter((lead) => lead.status === status);
  };

  if (loading) {
    return <PageLoading message="Loading leads..." />;
  }

  return (
    <>
      {actionLoading && <ActionLoading message="Processing your request..." />}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Leads Management</h1>
          <p className="text-slate-600">Track, qualify, and convert leads</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats.total, color: "from-blue-500 to-blue-600" },
            { label: "New", value: stats.new, color: "from-yellow-500 to-yellow-600" },
            { label: "Contacted", value: stats.contacted, color: "from-purple-500 to-purple-600" },
            { label: "Qualified", value: stats.qualified, color: "from-indigo-500 to-indigo-600" },
            { label: "Converted", value: stats.converted, color: "from-green-500 to-green-600" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg"
            >
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* View Toggle & Search */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search leads by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none"
                >
                  <option value="">All Statuses</option>
                  {LEAD_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/lms/superadmin/leads/pipeline")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === "pipeline"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Pipeline
              </button>
              <button
                onClick={() => navigate("/lms/superadmin/leads/list")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === "list"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Pipeline View */}
        {view === "pipeline" && (
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-4">
              {LEAD_STATUSES.map((status) => (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-shrink-0 w-80"
                >
                  <div className="bg-white rounded-xl border border-slate-200 shadow-lg">
                    <div className={`p-4 border-b border-slate-200 rounded-t-xl ${STATUS_COLORS[status]}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold capitalize">{status}</h3>
                        <span className="text-sm font-medium">{getLeadsByStatus(status).length}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto premium-scrollbar">
                      {getLeadsByStatus(status).length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-4">No leads</p>
                      ) : (
                        getLeadsByStatus(status).map((lead) => (
                          <motion.div
                            key={lead.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-slate-50 rounded-lg p-4 border border-slate-200 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => openDetails(lead)}
                          >
                            <div className="font-semibold text-slate-900 mb-1">{lead.name || "Unnamed Lead"}</div>
                            {lead.email && (
                              <div className="text-sm text-slate-600 flex items-center gap-1 mb-1">
                                <FiMail className="w-3 h-3" />
                                {lead.email}
                              </div>
                            )}
                            {lead.phone && (
                              <div className="text-sm text-slate-600 flex items-center gap-1 mb-2">
                                <FiPhone className="w-3 h-3" />
                                {lead.phone}
                              </div>
                            )}
                            <div className="text-xs text-slate-500">
                              {lead.source && <span className="capitalize">{lead.source}</span>}
                              {lead.created_at && (
                                <span className="ml-2">
                                  {new Date(lead.created_at).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Source</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{lead.name || "Unnamed Lead"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">{lead.email || "-"}</div>
                          {lead.phone && <div className="text-xs text-slate-500">{lead.phone}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 capitalize">{lead.source || "Unknown"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}>
                            {lead.status || "new"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openDetails(lead)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEdit(lead)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit View */}
        {view === "edit" && selectedLead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg"
          >
            <div className="mb-6">
              <button
                onClick={() => navigate("/lms/superadmin/leads/list")}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
              >
                <FiArrowRight className="w-4 h-4 rotate-180" />
                Back to Leads
              </button>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Edit Lead</h2>
              <p className="text-slate-600">{selectedLead.name || "Unnamed Lead"}</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                >
                  {LEAD_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Notes</label>
                <textarea
                  rows={6}
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  placeholder="Add notes about this lead..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => navigate("/lms/superadmin/leads/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateLead(selectedLead.id, editForm)}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {saving ? (
                    <ButtonLoading text="Saving..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Details View */}
        {view === "details" && selectedLead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg"
          >
            <div className="mb-6">
              <button
                onClick={() => navigate("/lms/superadmin/leads/list")}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
              >
                <FiArrowRight className="w-4 h-4 rotate-180" />
                Back to Leads
              </button>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Lead Details</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Name</label>
                  <div className="text-slate-700">{selectedLead.name || "Unnamed Lead"}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Status</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[selectedLead.status] || STATUS_COLORS.new}`}>
                    {selectedLead.status || "new"}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                  <div className="text-slate-700">{selectedLead.email || "-"}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                  <div className="text-slate-700">{selectedLead.phone || "-"}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Source</label>
                  <div className="text-slate-700 capitalize">{selectedLead.source || "Unknown"}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Created At</label>
                  <div className="text-slate-700">
                    {selectedLead.created_at
                      ? new Date(selectedLead.created_at).toLocaleString()
                      : "-"}
                  </div>
                </div>
              </div>

              {selectedLead.notes && (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Notes</label>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 whitespace-pre-wrap">
                    {selectedLead.notes}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => openEdit(selectedLead)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit Lead
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
}
