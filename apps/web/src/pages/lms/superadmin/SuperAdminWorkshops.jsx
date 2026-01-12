import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import Card, { CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import Button from "../../../Components/ui/Button";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function SuperAdminWorkshops() {
  const { token } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    startsAt: "",
    endsAt: "",
    mode: "online",
    location: "",
    meetLink: "",
    capacity: "",
    status: "draft",
  });
  const alive = useRef(true);

  async function loadWorkshops(signal) {
    setErr("");
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/admin/workshops", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setWorkshops(list);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load workshops");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function createWorkshop() {
    try {
      await apiFetch("/api/v1/admin/workshops", {
        method: "POST",
        token,
        body: formData,
      });
      setShowCreateForm(false);
      setFormData({
        title: "", slug: "", description: "", startsAt: "", endsAt: "",
        mode: "online", location: "", meetLink: "", capacity: "", status: "draft",
      });
      const ac = new AbortController();
      loadWorkshops(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to create workshop");
    }
  }

  async function updateWorkshop(id) {
    try {
      await apiFetch(`/api/v1/admin/workshops/${id}`, {
        method: "PATCH",
        token,
        body: formData,
      });
      setEditingWorkshop(null);
      setFormData({
        title: "", slug: "", description: "", startsAt: "", endsAt: "",
        mode: "online", location: "", meetLink: "", capacity: "", status: "draft",
      });
      const ac = new AbortController();
      loadWorkshops(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to update workshop");
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadWorkshops(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

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
        title="Failed to Load Workshops" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadWorkshops(ac.signal);
        }} 
      />
    );
  }

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <h1>Workshops Management</h1>
          <p>Create and manage workshops</p>
        </div>
        <Button
          variant="gradient"
          size="lg"
          onClick={() => {
            setShowCreateForm(true);
            setEditingWorkshop(null);
            setFormData({
              title: "", slug: "", description: "", startsAt: "", endsAt: "",
              mode: "online", location: "", meetLink: "", capacity: "", status: "draft",
            });
          }}
        >
          Create Workshop
        </Button>
      </div>

      {(showCreateForm || editingWorkshop) && (
        <Card variant="elevated">
          <CardTitle>
            {editingWorkshop ? "Edit Workshop" : "Create New Workshop"}
          </CardTitle>
          <div>
            <div>
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Workshop Title"
              />
            </div>
            <div>
              <label>Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="workshop-slug (auto-generated if empty)"
              />
            </div>
            <div>
              <label>Start Date & Time *</label>
              <input
                type="datetime-local"
                value={formData.startsAt}
                onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })}
              />
            </div>
            <div>
              <label>End Date & Time</label>
              <input
                type="datetime-local"
                value={formData.endsAt}
                onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
              />
            </div>
            <div>
              <label>Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label>Capacity</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="Max participants"
              />
            </div>
            <div>
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Physical location (if offline)"
              />
            </div>
            <div>
              <label>Meet Link</label>
              <input
                type="url"
                value={formData.meetLink}
                onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                placeholder="https://meet.google.com/..."
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Workshop description"
              />
            </div>
            <div>
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div>
            <Button
              variant="gradient"
              size="md"
              onClick={() => editingWorkshop ? updateWorkshop(editingWorkshop) : createWorkshop()}
            >
              {editingWorkshop ? "Update Workshop" : "Create Workshop"}
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setShowCreateForm(false);
                setEditingWorkshop(null);
                setFormData({
                  title: "", slug: "", description: "", startsAt: "", endsAt: "",
                  mode: "online", location: "", meetLink: "", capacity: "", status: "draft",
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {workshops.length === 0 ? (
        <EmptyState
          title="No Workshops"
          message="Create your first workshop to get started!"
        />
      ) : (
        <div>
          {workshops.map((workshop, idx) => (
            <Card
              key={workshop.id}
              variant="elevated"
            >
              <div>
                <div>
                  <div>
                  </div>
                  <CardTitle>{workshop.title}</CardTitle>
                </div>
                {workshop.status && (
                  <span>
                    {workshop.status}
                  </span>
                )}
              </div>

              {workshop.description && (
                <CardDescription>
                  {workshop.description}
                </CardDescription>
              )}

              <div>
                {workshop.starts_at && (
                  <div>
                    <span>Starts: {formatDate(workshop.starts_at)}</span>
                  </div>
                )}
                {workshop.location && (
                  <div>
                    <span>{workshop.location}</span>
                  </div>
                )}
                {workshop.capacity && (
                  <div>
                    <span>Capacity: {workshop.capacity}</span>
                  </div>
                )}
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingWorkshop(workshop.id);
                    setShowCreateForm(false);
                    setFormData({
                      title: workshop.title || "",
                      slug: workshop.slug || "",
                      description: workshop.description || "",
                      startsAt: workshop.starts_at ? new Date(workshop.starts_at).toISOString().slice(0, 16) : "",
                      endsAt: workshop.ends_at ? new Date(workshop.ends_at).toISOString().slice(0, 16) : "",
                      mode: workshop.mode || "online",
                      location: workshop.location || "",
                      meetLink: workshop.meet_link || "",
                      capacity: workshop.capacity?.toString() || "",
                      status: workshop.status || "draft",
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    try {
                      const json = await apiFetch(`/api/v1/admin/workshops/${workshop.id}/registrations`, { token });
                      const registrations = unwrapArray(json);
                      alert(`Total Registrations: ${registrations.length}`);
                    } catch (e) {
                      alert(e?.message || "Failed to load registrations");
                    }
                  }}
                >
                  View Registrations
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
