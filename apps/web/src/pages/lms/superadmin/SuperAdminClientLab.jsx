import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { 
  FaLaptopCode, 
  FaPlus,
  FaUser,
  FaBriefcase,
  FaCalendar,
  FaUsers,
  FaEdit,
  FaCheckCircle
} from "react-icons/fa";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SuperAdminClientLab() {
  const { token } = useAuth();
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [showClientForm, setShowClientForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState(null);
  const [clientFormData, setClientFormData] = useState({
    name: "",
    industry: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    ndaStatus: false,
    notes: "",
  });
  const [projectFormData, setProjectFormData] = useState({
    clientId: "",
    title: "",
    slug: "",
    scope: "",
    status: "active",
    startDate: "",
    endDate: "",
  });
  const [memberFormData, setMemberFormData] = useState({
    userId: "",
    role: "student",
  });
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [creating, setCreating] = useState(false);
  const alive = useRef(true);

  async function loadData(signal) {
    setErr("");
    setLoading(true);
    try {
      console.log("🔍 Loading clients and projects...");
      const [clientsRes, projectsRes] = await Promise.all([
        apiFetch("/api/v1/admin/client-lab/clients", { token, signal }).catch((err) => {
          console.error("❌ Failed to load clients:", err);
          return { ok: true, data: [] };
        }),
        apiFetch("/api/v1/admin/client-lab/projects", { token, signal }).catch((err) => {
          console.error("❌ Failed to load projects:", err);
          return { ok: true, data: [] };
        }),
      ]);
      
      console.log("📦 Raw clients response:", clientsRes);
      console.log("📦 Raw projects response:", projectsRes);
      
      if (alive.current) {
        const clientsList = unwrapArray(clientsRes);
        const projectsList = unwrapArray(projectsRes);
        console.log("✅ Loaded clients:", clientsList.length, clientsList);
        console.log("✅ Loaded projects:", projectsList.length);
        
        if (clientsList.length === 0) {
          console.warn("⚠️ No clients found in response. Response was:", clientsRes);
        } else {
          console.log("✅ Successfully loaded", clientsList.length, "clients. They should be visible in the Clients List section.");
        }
        
        setClients(clientsList);
        setProjects(projectsList);
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error("❌ Error loading data:", e);
      if (alive.current) setErr(e?.message || "Failed to load data");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function createClient() {
    if (!clientFormData.name) {
      alert("Client name is required");
      return;
    }
    setCreating(true);
    try {
      const result = await apiFetch("/api/v1/admin/client-lab/clients", {
        method: "POST",
        token,
        body: clientFormData,
      });
      console.log("Client created:", result);
      
      // Reset form
      setClientFormData({
        name: "", industry: "", contactName: "", contactEmail: "", contactPhone: "",
        ndaStatus: false, notes: "",
      });
      
      // Reload clients immediately without showing loading state
      try {
        console.log("🔄 Reloading clients after creation...");
        const clientsRes = await apiFetch("/api/v1/admin/client-lab/clients", { token });
        console.log("📦 Reload clients response:", clientsRes);
        const clientsList = unwrapArray(clientsRes);
        console.log("✅ Reloaded clients after creation:", clientsList.length, clientsList);
        
        if (clientsList.length === 0) {
          console.warn("⚠️ No clients found after reload. Response was:", clientsRes);
        }
        
        setClients(clientsList);
        console.log("✅ Clients state updated. Current clients:", clientsList);
      } catch (reloadErr) {
        console.error("❌ Failed to reload clients:", reloadErr);
        // Still show success, but reload might have failed
      }
      
      setShowClientForm(false);
      alert("Client created successfully! ✅");
      
      // If project form was waiting, ensure it sees the new clients
      if (showProjectForm) {
        // The clients state is already updated above, so the form should see it
        console.log("Project form is open, clients should be available now");
      }
    } catch (e) {
      console.error("Error creating client:", e);
      alert(e?.message || "Failed to create client");
    } finally {
      setCreating(false);
    }
  }

  async function createProject() {
    if (!projectFormData.clientId || !projectFormData.title) {
      alert("Client and Project Title are required");
      return;
    }
    setCreating(true);
    try {
      const result = await apiFetch("/api/v1/admin/client-lab/projects", {
        method: "POST",
        token,
        body: projectFormData,
      });
      const createdProject = unwrapData(result);
      console.log("Project created:", createdProject);
      alert("Project created successfully! ✅\n\n⚠️ IMPORTANT: Students won't see this project until you add them as members.\n\nClick 'Add Student' on the project card to add students.");
      setShowProjectForm(false);
      setProjectFormData({
        clientId: "", title: "", slug: "", scope: "", status: "active",
        startDate: "", endDate: "",
      });
      const ac = new AbortController();
      await loadData(ac.signal);
      
      // Optionally auto-open add member form for the newly created project
      if (createdProject?.id) {
        setTimeout(() => {
          setShowAddMemberForm(createdProject.id);
          setMemberFormData({ userId: "", role: "student" });
        }, 500);
      }
    } catch (e) {
      console.error("Error creating project:", e);
      alert(e?.message || "Failed to create project");
    } finally {
      setCreating(false);
    }
  }

  async function loadUsers() {
    setLoadingUsers(true);
    try {
      const json = await apiFetch("/api/v1/admin/users", { token });
      const usersList = unwrapArray(json);
      setUsers(usersList);
    } catch (e) {
      console.error("Failed to load users:", e);
      // Don't show alert, just fall back to manual UUID input
    } finally {
      setLoadingUsers(false);
    }
  }

  async function addMember(projectId) {
    if (!memberFormData.userId) {
      alert("Please select a user");
      return;
    }
    setCreating(true);
    try {
      const result = await apiFetch(`/api/v1/admin/client-lab/projects/${projectId}/members`, {
        method: "POST",
        token,
        body: memberFormData,
      });
      console.log("Member added:", result);
      const roleMessage = memberFormData.role === "mentor" 
        ? "The mentor can now see this project in their Mentor Portal Client Lab section."
        : memberFormData.role === "admin"
        ? "The admin now has full control over this project."
        : "The student can now see this project in their Student Portal Client Lab section.";
      alert(`✅ Member added successfully!\n\n${roleMessage}`);
      setShowAddMemberForm(null);
      setMemberFormData({ userId: "", role: "student" });
      const ac = new AbortController();
      await loadData(ac.signal);
    } catch (e) {
      console.error("Error adding member:", e);
      alert(e?.message || "Failed to add member. Make sure the User ID is correct and the user exists.");
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    console.log("🚀 Component mounted, loading data...");
    loadData(ac.signal);
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
        title="Failed to Load Client Lab" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadData(ac.signal);
        }} 
      />
    );
  }

  return (
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-xl sm:rounded-2xl bg-green-50 border border-green-200 p-6 sm:p-10 shadow-soft" style={{ marginBottom: '1rem sm:2rem' }}>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-md" style={{ marginBottom: '1rem sm:1.5rem' }}>
            <div className="layout-flex items-center gap-3 sm:gap-md">
              <div className="p-3 sm:p-4 rounded-xl bg-green-600 shadow-medium">
                <FaLaptopCode className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h1 className="section-hero text-2xl sm:text-4xl text-gray-900" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Client Lab Management</h1>
                <p className="text-gray-600 text-base sm:text-lg" style={{ margin: 0 }}>Manage clients and projects</p>
              </div>
            </div>
            <div className="layout-flex gap-md">
              <Button
                variant="gradient"
                size="lg"
                icon={FaPlus}
                onClick={() => {
                  setShowClientForm(true);
                  setShowProjectForm(false);
                }}
              >
                Add Client
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={FaBriefcase}
                onClick={() => {
                  setShowProjectForm(true);
                  setShowClientForm(false);
                }}
              >
                Create Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Client Form */}
      {showClientForm && (
        <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
          <CardTitle className="text-2xl mb-6">Create New Client</CardTitle>
          <div className="layout-grid-2 gap-md mb-6">
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Client Name *</label>
              <input
                type="text"
                value={clientFormData.name}
                onChange={(e) => setClientFormData({ ...clientFormData, name: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-pink-400"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Industry</label>
              <input
                type="text"
                value={clientFormData.industry}
                onChange={(e) => setClientFormData({ ...clientFormData, industry: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Contact Name</label>
              <input
                type="text"
                value={clientFormData.contactName}
                onChange={(e) => setClientFormData({ ...clientFormData, contactName: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Contact Email</label>
              <input
                type="email"
                value={clientFormData.contactEmail}
                onChange={(e) => setClientFormData({ ...clientFormData, contactEmail: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Contact Phone</label>
              <input
                type="tel"
                value={clientFormData.contactPhone}
                onChange={(e) => setClientFormData({ ...clientFormData, contactPhone: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-pink-400"
              />
            </div>
            <div className="layout-flex items-center gap-2">
              <input
                type="checkbox"
                id="ndaStatus"
                checked={clientFormData.ndaStatus || false}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  setClientFormData({ ...clientFormData, ndaStatus: newValue });
                }}
                className="w-5 h-5 cursor-pointer accent-pink-500"
              />
              <label htmlFor="ndaStatus" className="text-sm font-semibold text-white cursor-pointer">
                NDA Signed
              </label>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-white mb-2 block">Notes</label>
              <textarea
                value={clientFormData.notes}
                onChange={(e) => setClientFormData({ ...clientFormData, notes: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-pink-400"
                rows={3}
              />
            </div>
          </div>
          <div className="layout-flex gap-md">
            <Button variant="gradient" size="md" onClick={createClient} disabled={creating}>
              {creating ? "Creating..." : "Create Client"}
            </Button>
            <Button variant="outline" size="md" onClick={() => setShowClientForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Create Project Form */}
      {showProjectForm && (
        <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
          <CardTitle className="text-2xl mb-6 text-gray-900">Create New Project</CardTitle>
          {clients.length === 0 && (
            <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-700">
                ⚠️ No clients found. Please create a client first before creating a project.
              </p>
            </div>
          )}
          <div className="layout-grid-2 gap-md mb-6">
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Client * {clients.length > 0 && <span className="text-gray-500">({clients.length} available)</span>}
              </label>
              <select
                value={projectFormData.clientId}
                onChange={(e) => setProjectFormData({ ...projectFormData, clientId: e.target.value })}
                className="w-full border-2 border-green-200 bg-white text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                required
                disabled={clients.length === 0}
              >
                <option value="">
                  {clients.length === 0 ? "No clients available - Create one first" : "Select a client"}
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} {client.industry ? `(${client.industry})` : ''}
                  </option>
                ))}
              </select>
              {clients.length === 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setShowProjectForm(false);
                    setShowClientForm(true);
                  }}
                >
                  Create Client First
                </Button>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">Project Title *</label>
              <input
                type="text"
                value={projectFormData.title}
                onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                className="w-full border-2 border-green-200 bg-white text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">Slug</label>
              <input
                type="text"
                value={projectFormData.slug}
                onChange={(e) => setProjectFormData({ ...projectFormData, slug: e.target.value })}
                className="w-full border-2 border-green-200 bg-white text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="project-slug (auto-generated if empty)"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">Status</label>
              <select
                value={projectFormData.status}
                onChange={(e) => setProjectFormData({ ...projectFormData, status: e.target.value })}
                className="w-full border-2 border-green-200 bg-white text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">Start Date</label>
              <input
                type="date"
                value={projectFormData.startDate}
                onChange={(e) => setProjectFormData({ ...projectFormData, startDate: e.target.value })}
                className="w-full border-2 border-green-200 bg-white text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">End Date</label>
              <input
                type="date"
                value={projectFormData.endDate}
                onChange={(e) => setProjectFormData({ ...projectFormData, endDate: e.target.value })}
                className="w-full border-2 border-green-200 bg-white text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-gray-900 mb-2 block">Scope</label>
              <textarea
                value={projectFormData.scope}
                onChange={(e) => setProjectFormData({ ...projectFormData, scope: e.target.value })}
                className="w-full border-2 border-green-200 bg-white text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                rows={4}
                placeholder="Project scope and description"
              />
            </div>
          </div>
          <div className="layout-flex gap-md">
            <Button variant="gradient" size="md" onClick={createProject} disabled={creating}>
              {creating ? "Creating..." : "Create Project"}
            </Button>
            <Button variant="outline" size="md" onClick={() => setShowProjectForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Clients List - Always visible */}
      <div style={{ width: '100%', marginBottom: '2rem' }}>
        <div className="layout-flex items-center gap-md mb-6">
          <div className="p-3 rounded-xl bg-green-50 border border-green-200">
            <FaUser className="text-green-600 text-xl" />
          </div>
          <h2 className="section-title text-3xl text-gray-900" style={{ margin: 0 }}>Clients ({clients.length})</h2>
        </div>

        {clients.length === 0 ? (
          <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
            <EmptyState
              title="No Clients"
              message="Create your first client to get started with client lab projects!"
            />
          </Card>
        ) : (
          <div className="layout-grid-2 gap-lg mb-8" style={{ width: '100%' }}>
            {clients.map((client, idx) => (
              <Card
                key={client.id}
                variant="elevated"
                className="animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box' }}
              >
                <div className="layout-flex items-start justify-between gap-md mb-4">
                  <div style={{ flex: 1 }}>
                    <div className="layout-flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                        <FaUser className="text-green-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-900" style={{ margin: 0 }}>{client.name}</CardTitle>
                    </div>
                    {client.industry && (
                      <div className="text-sm text-gray-600 mb-2">Industry: {client.industry}</div>
                    )}
                    {client.contact_name && (
                      <div className="text-sm text-gray-600 mb-1">
                        Contact: {client.contact_name}
                        {client.contact_email && ` (${client.contact_email})`}
                      </div>
                    )}
                    {client.nda_status && (
                      <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold mt-2 bg-green-100 border border-green-200 text-green-700">
                        NDA Signed
                      </span>
                    )}
                    {client.notes && (
                      <CardDescription className="text-gray-600 mt-3 line-clamp-2">
                        {client.notes}
                      </CardDescription>
                    )}
                    <div className="layout-flex items-center gap-4 mt-3 text-xs text-gray-500">
                      {client.created_at && (
                        <div className="layout-flex items-center gap-1">
                          <FaCalendar className="text-green-600" />
                          <span>Created: {formatDate(client.created_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Projects List */}
      <div>
        <div className="layout-flex items-center gap-md mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-400/20 to-rose-500/20 border border-pink-400/30">
            <FaBriefcase className="text-pink-400 text-xl" />
          </div>
          <h2 className="section-title text-3xl" style={{ margin: 0 }}>Projects ({projects.length})</h2>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="No Projects"
            message="Create your first client lab project to get started!"
          />
        ) : (
          <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
            {projects.map((project, idx) => (
              <Card
                key={project.id}
                variant="elevated"
                className="animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s`, width: '100%', boxSizing: 'border-box' }}
              >
                <div className="layout-flex items-start justify-between gap-md mb-4">
                  <div style={{ flex: 1 }}>
                    <div className="layout-flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-pink-400/20 to-rose-500/20 border border-pink-400/30">
                        <FaBriefcase className="text-pink-400" />
                      </div>
                      <CardTitle className="text-xl" style={{ margin: 0 }}>{project.title}</CardTitle>
                    </div>
                    {project.client_name && (
                      <div className="text-sm text-gray-400 mb-2">Client: {project.client_name}</div>
                    )}
                    {project.status && (
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold mb-3 ${
                        project.status === 'active' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                        project.status === 'completed' ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300' :
                        'bg-gray-800 border border-gray-700 text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                    )}
                    {project.scope && (
                      <CardDescription className="text-gray-400 mt-3 line-clamp-2">
                        {project.scope}
                      </CardDescription>
                    )}
                    <div className="layout-flex items-center gap-4 mt-3 text-xs text-gray-500">
                      {project.start_date && (
                        <div className="layout-flex items-center gap-1">
                          <FaCalendar className="text-pink-400" />
                          <span>Start: {formatDate(project.start_date)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="layout-flex-col gap-md">
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <p className="text-xs text-amber-300 font-semibold mb-1">⚠️ Action Required</p>
                    <p className="text-xs text-gray-400">
                      Add students as members so they can see this project in their Client Lab.
                    </p>
                  </div>
                  <Button
                    variant="gradient"
                    size="sm"
                    icon={FaUsers}
                    onClick={() => {
                      setShowAddMemberForm(project.id);
                      setMemberFormData({ userId: "", role: "student" });
                      loadUsers(); // Load users when form opens
                    }}
                  >
                    Add Member to Project
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Member Form */}
      {showAddMemberForm && (
        <Card variant="elevated" className="p-8 border-pink-500/30" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-blue-300 font-semibold mb-1">ℹ️ Important Information</p>
            <p className="text-xs text-gray-400">
              Users can only see projects they are members of. After adding a user here with the appropriate role (Student, Mentor, or Admin), they will see this project in their Client Lab section.
            </p>
            <p className="text-xs text-amber-300 mt-2 font-semibold">
              💡 Tip: Select "Mentor" role to add mentors who can review tasks. Mentors will see projects in their Mentor Portal.
            </p>
          </div>
          <CardTitle className="text-2xl mb-6">Add Member to Project</CardTitle>
          <div className="layout-flex-col gap-md mb-6">
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">
                <FaUser className="inline mr-2 text-pink-400" />
                Select User *
              </label>
              {loadingUsers ? (
                <div className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg">
                  Loading users...
                </div>
              ) : users.length > 0 ? (
                <select
                  value={memberFormData.userId}
                  onChange={(e) => setMemberFormData({ ...memberFormData, userId: e.target.value })}
                  className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-pink-400"
                  required
                >
                  <option value="">Select a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name || user.email} {user.role_name && `(${user.role_name})`} {!user.is_active && "(Inactive)"}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="layout-flex-col gap-2">
                  <input
                    type="text"
                    value={memberFormData.userId}
                    onChange={(e) => setMemberFormData({ ...memberFormData, userId: e.target.value })}
                    className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-pink-400 font-mono text-sm"
                    placeholder="00000000-0000-0000-0000-000000000000"
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the UUID of the user to add to this project</p>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Role *</label>
              <select
                value={memberFormData.role}
                onChange={(e) => setMemberFormData({ ...memberFormData, role: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-pink-400"
              >
                <option value="student">Student - Can view and work on assigned tasks</option>
                <option value="mentor">Mentor - Can review tasks and provide feedback</option>
                <option value="admin">Admin - Can manage project, tasks, and members</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {memberFormData.role === "mentor" && "Mentors will see this project in their Mentor Portal Client Lab section."}
                {memberFormData.role === "student" && "Students will see this project in their Student Portal Client Lab section."}
                {memberFormData.role === "admin" && "Admins have full control over the project."}
              </p>
            </div>
          </div>
          <div className="layout-flex gap-md">
            <Button
              variant="gradient"
              size="md"
              icon={FaCheckCircle}
              onClick={() => addMember(showAddMemberForm)}
              disabled={creating || !memberFormData.userId}
            >
              {creating ? "Adding..." : "Add Member"}
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setShowAddMemberForm(null);
                setMemberFormData({ userId: "", role: "student" });
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Info Card */}
      <Card variant="elevated" className="p-6" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="layout-flex items-start gap-md">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-400/20 to-rose-500/20 border border-pink-400/30">
            <FaLaptopCode className="text-pink-400 text-xl" />
          </div>
          <div>
            <CardTitle className="text-xl mb-2">About Client Lab</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              Client Lab allows you to manage real-world projects with actual clients. Create clients, set up projects, 
              and add students as members. Once a student is added to a project, they will see it in their Client Lab section.
              Students can then work on tasks assigned to them.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
