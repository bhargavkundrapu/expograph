import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
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
      <div>
        <Skeleton />
        <Skeleton />
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
    <div>
      <div>
        <div>
        </div>
        <div>
          <h1>Leads Management</h1>
          <p>Manage and track all leads</p>
        </div>
      </div>

      <div>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{statusCounts.all}</div>
              <div>Total Leads</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{statusCounts.new}</div>
              <div>New</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{statusCounts.contacted}</div>
              <div>Contacted</div>
            </div>
          </div>
        </Card>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{statusCounts.converted}</div>
              <div>Converted</div>
            </div>
          </div>
        </Card>
      </div>

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <span>Filter by Status:</span>
          {['all', 'new', 'contacted', 'converted', 'lost'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)} ({statusCounts[s] || 0})
            </button>
          ))}
        </div>
      </Card>

      {leads.length === 0 ? (
        <EmptyState
          title="No Leads Found"
          message={`No leads found with status "${statusFilter}".`}
        />
      ) : (
        <div>
          {leads.map((lead, idx) => (
            <Card
              key={lead.id}
              variant="elevated"
            >
              {editingLead === lead.id ? (
                <div>
                  <div>
                    <div>
                      <label>Status</label>
                      <select
                        value={status || lead.status || 'new'}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </div>
                    <div>
                      <label>Notes</label>
                      <textarea
                        value={notes || lead.notes || ''}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div>
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
                <div>
                  <div>
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>{lead.name || "Unnamed Lead"}</CardTitle>
                        <div>
                          Created: {formatDate(lead.created_at)}
                        </div>
                      </div>
                    </div>
                    <div>
                      {lead.email && (
                        <div>
                          <span>{lead.email}</span>
                        </div>
                      )}
                      {lead.phone && (
                        <div>
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      {lead.source && (
                        <div>
                          Source: {lead.source}
                        </div>
                      )}
                      {lead.notes && (
                        <div>
                          {lead.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <span>
                      {lead.status || 'new'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
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
