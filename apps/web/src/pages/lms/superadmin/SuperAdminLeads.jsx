import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { 
  FaUsers, 
  FaEnvelope, 
  FaPhone, 
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEdit,
  FaFilter
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import Button from "../../../Components/ui/Button";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function SuperAdminLeads() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingLead, setEditingLead] = useState(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const alive = useRef(true);

  async function loadLeads(signal) {
    setErr("");
    setLoading(true);
    try {
      const url = statusFilter !== "all" 
        ? `/api/v1/admin/leads?status=${statusFilter}`
        : `/api/v1/admin/leads`;
      const json = await apiFetch(url, { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setLeads(list);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load leads");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function updateLead(leadId, patch) {
    try {
      await apiFetch(`/api/v1/admin/leads/${leadId}`, {
        method: "PATCH",
        token,
        body: patch,
      });
      setEditingLead(null);
      const ac = new AbortController();
      loadLeads(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to update lead");
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadLeads(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token, statusFilter]);

  if (loading) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Leads" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadLeads(ac.signal);
        }} 
      />
    );
  }

  const statusCounts = {
    all: leads.length,
    new: leads.filter(l => !l.status || l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    lost: leads.filter(l => l.status === 'lost').length,
  };

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30">
              <FaUsers className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Leads Management</h1>
              <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Manage and track all leads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="layout-grid-4 gap-lg" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
              <FaUsers className="text-blue-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{statusCounts.all}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Total Leads</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
              <FaClock className="text-cyan-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{statusCounts.new}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>New</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
              <FaEnvelope className="text-purple-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{statusCounts.contacted}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Contacted</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated" className="p-6">
          <div className="layout-flex items-center gap-md">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30">
              <FaCheckCircle className="text-emerald-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white" style={{ margin: 0 }}>{statusCounts.converted}</div>
              <div className="text-sm text-gray-400" style={{ margin: 0 }}>Converted</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-center gap-md flex-wrap">
          <div className="layout-flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm font-semibold text-white">Filter by Status:</span>
          </div>
          {['all', 'new', 'contacted', 'converted', 'lost'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                statusFilter === s
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-800 border border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)} ({statusCounts[s] || 0})
            </button>
          ))}
        </div>
      </Card>

      {/* Leads List */}
      {leads.length === 0 ? (
        <EmptyState
          title="No Leads Found"
          message={`No leads found with status "${statusFilter}".`}
        />
      ) : (
        <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
          {leads.map((lead, idx) => (
            <Card
              key={lead.id}
              variant="elevated"
              className="animate-fadeIn"
              style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
            >
              {editingLead === lead.id ? (
                <div className="layout-flex-col gap-md">
                  <div className="layout-grid-2 gap-md">
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">Status</label>
                      <select
                        value={status || lead.status || 'new'}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white mb-2 block">Notes</label>
                      <textarea
                        value={notes || lead.notes || ''}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="layout-flex gap-md">
                    <Button
                      variant="gradient"
                      size="md"
                      onClick={() => updateLead(lead.id, { status: status || lead.status, notes: notes || lead.notes })}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setEditingLead(null);
                        setNotes("");
                        setStatus("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="layout-flex items-start justify-between gap-md">
                  <div style={{ flex: 1 }}>
                    <div className="layout-flex items-center gap-md mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400/20 to-cyan-500/20 border border-blue-400/30">
                        <FaUsers className="text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg" style={{ margin: 0 }}>{lead.name || "Unnamed Lead"}</CardTitle>
                        <div className="text-xs text-gray-500 mt-1">
                          Created: {formatDate(lead.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="layout-flex-col gap-sm ml-11">
                      {lead.email && (
                        <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                          <FaEnvelope className="text-blue-400" />
                          <span>{lead.email}</span>
                        </div>
                      )}
                      {lead.phone && (
                        <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                          <FaPhone className="text-blue-400" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      {lead.source && (
                        <div className="text-xs text-gray-500 mt-1">
                          Source: {lead.source}
                        </div>
                      )}
                      {lead.notes && (
                        <div className="text-sm text-gray-400 mt-2 p-3 rounded-lg bg-gray-800 border border-gray-700">
                          {lead.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="layout-flex-col gap-md items-end">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      lead.status === 'converted' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                      lead.status === 'contacted' ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300' :
                      lead.status === 'lost' ? 'bg-red-500/10 border border-red-500/30 text-red-300' :
                      'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300'
                    }`}>
                      {lead.status || 'new'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={FaEdit}
                      onClick={() => {
                        setEditingLead(lead.id);
                        setNotes(lead.notes || '');
                        setStatus(lead.status || 'new');
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

