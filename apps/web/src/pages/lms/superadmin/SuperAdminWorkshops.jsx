import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { 
  FaGraduationCap, 
  FaCalendar, 
  FaMapMarkerAlt,
  FaUsers,
  FaPlus,
  FaEdit,
  FaEye,
  FaCheckCircle,
  FaClock
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
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
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
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center justify-between gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="layout-flex items-center gap-md">
              <div className="p-4 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Workshops Management</h1>
                <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Create and manage workshops</p>
              </div>
            </div>
            <Button
              variant="gradient"
              size="lg"
              icon={FaPlus}
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
        </div>
      </div>

      {/* Create/Edit Form */}
      {(showCreateForm || editingWorkshop) && (
        <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
          <CardTitle className="text-2xl mb-6">
            {editingWorkshop ? "Edit Workshop" : "Create New Workshop"}
          </CardTitle>
          <div className="layout-grid-2 gap-md mb-6">
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
                placeholder="Workshop Title"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
                placeholder="workshop-slug (auto-generated if empty)"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Start Date & Time *</label>
              <input
                type="datetime-local"
                value={formData.startsAt}
                onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">End Date & Time</label>
              <input
                type="datetime-local"
                value={formData.endsAt}
                onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Capacity</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
                placeholder="Max participants"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
                placeholder="Physical location (if offline)"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Meet Link</label>
              <input
                type="url"
                value={formData.meetLink}
                onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
                placeholder="https://meet.google.com/..."
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-white mb-2 block">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
                rows={4}
                placeholder="Workshop description"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-teal-400"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="layout-flex gap-md">
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

      {/* Workshops List */}
      {workshops.length === 0 ? (
        <EmptyState
          title="No Workshops"
          message="Create your first workshop to get started!"
        />
      ) : (
        <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
          {workshops.map((workshop, idx) => (
            <Card
              key={workshop.id}
              variant="elevated"
              className="animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box' }}
            >
              <div className="layout-flex items-start justify-between gap-md mb-4">
                <div style={{ flex: 1 }}>
                  <div className="layout-flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-teal-400/20 to-cyan-500/20 border border-teal-400/30">
                      <FaGraduationCap className="text-teal-400" />
                    </div>
                    <CardTitle className="text-xl" style={{ margin: 0 }}>{workshop.title}</CardTitle>
                  </div>
                  {workshop.status && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                      workshop.status === 'published' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                      workshop.status === 'cancelled' ? 'bg-red-500/10 border border-red-500/30 text-red-300' :
                      'bg-gray-800 border border-gray-700 text-gray-400'
                    }`}>
                      {workshop.status}
                    </span>
                  )}
                </div>
              </div>

              {workshop.description && (
                <CardDescription className="text-gray-400 mb-4 line-clamp-3">
                  {workshop.description}
                </CardDescription>
              )}

              <div className="layout-flex-col gap-sm mb-4">
                {workshop.starts_at && (
                  <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                    <FaCalendar className="text-teal-400" />
                    <span>Starts: {formatDate(workshop.starts_at)}</span>
                  </div>
                )}
                {workshop.location && (
                  <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                    <FaMapMarkerAlt className="text-teal-400" />
                    <span>{workshop.location}</span>
                  </div>
                )}
                {workshop.capacity && (
                  <div className="layout-flex items-center gap-2 text-sm text-gray-400">
                    <FaUsers className="text-teal-400" />
                    <span>Capacity: {workshop.capacity}</span>
                  </div>
                )}
              </div>

              <div className="layout-flex gap-md">
                <Button
                  variant="outline"
                  size="sm"
                  icon={FaEdit}
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
                  icon={FaEye}
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

