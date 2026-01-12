import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import Card, { CardTitle, CardDescription } from "../../../Components/ui/Card";
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
      const [clientsRes, projectsRes] = await Promise.all([
        apiFetch("/api/v1/admin/client-lab/clients", { token, signal }).catch((err) => {
          return { ok: true, data: [] };
        }),
        apiFetch("/api/v1/admin/client-lab/projects", { token, signal }).catch((err) => {
          return { ok: true, data: [] };
        }),
      ]);
      
      if (alive.current) {
        const clientsList = unwrapArray(clientsRes);
        const projectsList = unwrapArray(projectsRes);
        setClients(clientsList);
        setProjects(projectsList);
      }
    } catch (e) {
      if (signal?.aborted) return;
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
      await apiFetch("/api/v1/admin/client-lab/clients", {
        method: "POST",
        token,
        body: clientFormData,
      });
      
      setClientFormData({
        name: "", industry: "", contactName: "", contactEmail: "", contactPhone: "",
        ndaStatus: false, notes: "",
      });
      
      try {
        const clientsRes = await apiFetch("/api/v1/admin/client-lab/clients", { token });
        const clientsList = unwrapArray(clientsRes);
        setClients(clientsList);
      } catch (reloadErr) {
      }
      
      setShowClientForm(false);
      alert("Client created successfully! ✅");
    } catch (e) {
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
      alert("Project created successfully! ✅\n\n⚠️ IMPORTANT: Students won't see this project until you add them as members.\n\nClick 'Add Student' on the project card to add students.");
      setShowProjectForm(false);
      setProjectFormData({
        clientId: "", title: "", slug: "", scope: "", status: "active",
        startDate: "", endDate: "",
      });
      const ac = new AbortController();
      await loadData(ac.signal);
      
      if (createdProject?.id) {
        setTimeout(() => {
          setShowAddMemberForm(createdProject.id);
          setMemberFormData({ userId: "", role: "student" });
        }, 500);
      }
    } catch (e) {
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
      await apiFetch(`/api/v1/admin/client-lab/projects/${projectId}/members`, {
        method: "POST",
        token,
        body: memberFormData,
      });
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
      alert(e?.message || "Failed to add member. Make sure the User ID is correct and the user exists.");
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadData(ac.signal);
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
    <div>
      <div>
        <div>
          <div>
          </div>
          <div>
            <h1>Client Lab Management</h1>
            <p>Manage clients and projects</p>
          </div>
          <div>
            <Button
              variant="gradient"
              size="lg"
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

      {showClientForm && (
        <Card variant="elevated">
          <CardTitle>Create New Client</CardTitle>
          <div>
            <div>
              <label>Client Name *</label>
              <input
                type="text"
                value={clientFormData.name}
                onChange={(e) => setClientFormData({ ...clientFormData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Industry</label>
              <input
                type="text"
                value={clientFormData.industry}
                onChange={(e) => setClientFormData({ ...clientFormData, industry: e.target.value })}
              />
            </div>
            <div>
              <label>Contact Name</label>
              <input
                type="text"
                value={clientFormData.contactName}
                onChange={(e) => setClientFormData({ ...clientFormData, contactName: e.target.value })}
              />
            </div>
            <div>
              <label>Contact Email</label>
              <input
                type="email"
                value={clientFormData.contactEmail}
                onChange={(e) => setClientFormData({ ...clientFormData, contactEmail: e.target.value })}
              />
            </div>
            <div>
              <label>Contact Phone</label>
              <input
                type="tel"
                value={clientFormData.contactPhone}
                onChange={(e) => setClientFormData({ ...clientFormData, contactPhone: e.target.value })}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="ndaStatus"
                checked={clientFormData.ndaStatus || false}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  setClientFormData({ ...clientFormData, ndaStatus: newValue });
                }}
              />
              <label htmlFor="ndaStatus">
                NDA Signed
              </label>
            </div>
            <div>
              <label>Notes</label>
              <textarea
                value={clientFormData.notes}
                onChange={(e) => setClientFormData({ ...clientFormData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div>
            <Button variant="gradient" size="md" onClick={createClient} disabled={creating}>
              {creating ? "Creating..." : "Create Client"}
            </Button>
            <Button variant="outline" size="md" onClick={() => setShowClientForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {showProjectForm && (
        <Card variant="elevated">
          <CardTitle>Create New Project</CardTitle>
          {clients.length === 0 && (
            <div>
              <p>
                ⚠️ No clients found. Please create a client first before creating a project.
              </p>
            </div>
          )}
          <div>
            <div>
              <label>
                Client * {clients.length > 0 && <span>({clients.length} available)</span>}
              </label>
              <select
                value={projectFormData.clientId}
                onChange={(e) => setProjectFormData({ ...projectFormData, clientId: e.target.value })}
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
              <label>Project Title *</label>
              <input
                type="text"
                value={projectFormData.title}
                onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Slug</label>
              <input
                type="text"
                value={projectFormData.slug}
                onChange={(e) => setProjectFormData({ ...projectFormData, slug: e.target.value })}
                placeholder="project-slug (auto-generated if empty)"
              />
            </div>
            <div>
              <label>Status</label>
              <select
                value={projectFormData.status}
                onChange={(e) => setProjectFormData({ ...projectFormData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label>Start Date</label>
              <input
                type="date"
                value={projectFormData.startDate}
                onChange={(e) => setProjectFormData({ ...projectFormData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                value={projectFormData.endDate}
                onChange={(e) => setProjectFormData({ ...projectFormData, endDate: e.target.value })}
              />
            </div>
            <div>
              <label>Scope</label>
              <textarea
                value={projectFormData.scope}
                onChange={(e) => setProjectFormData({ ...projectFormData, scope: e.target.value })}
                rows={4}
                placeholder="Project scope and description"
              />
            </div>
          </div>
          <div>
            <Button variant="gradient" size="md" onClick={createProject} disabled={creating}>
              {creating ? "Creating..." : "Create Project"}
            </Button>
            <Button variant="outline" size="md" onClick={() => setShowProjectForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div>
        <div>
          <div>
          </div>
          <h2>Clients ({clients.length})</h2>
        </div>

        {clients.length === 0 ? (
          <Card variant="elevated">
            <EmptyState
              title="No Clients"
              message="Create your first client to get started with client lab projects!"
            />
          </Card>
        ) : (
          <div>
            {clients.map((client, idx) => (
              <Card
                key={client.id}
                variant="elevated"
              >
                <div>
                  <div>
                    <div>
                    </div>
                    <CardTitle>{client.name}</CardTitle>
                  </div>
                  {client.industry && (
                    <div>Industry: {client.industry}</div>
                  )}
                  {client.contact_name && (
                    <div>
                      Contact: {client.contact_name}
                      {client.contact_email && ` (${client.contact_email})`}
                    </div>
                  )}
                  {client.nda_status && (
                    <span>
                      NDA Signed
                    </span>
                  )}
                  {client.notes && (
                    <CardDescription>
                      {client.notes}
                    </CardDescription>
                  )}
                  <div>
                    {client.created_at && (
                      <div>
                        <span>Created: {formatDate(client.created_at)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <div>
          <div>
          </div>
          <h2>Projects ({projects.length})</h2>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="No Projects"
            message="Create your first client lab project to get started!"
          />
        ) : (
          <div>
            {projects.map((project, idx) => (
              <Card
                key={project.id}
                variant="elevated"
              >
                <div>
                  <div>
                    <div>
                    </div>
                    <CardTitle>{project.title}</CardTitle>
                  </div>
                  {project.client_name && (
                    <div>Client: {project.client_name}</div>
                  )}
                  {project.status && (
                    <span>
                      {project.status}
                    </span>
                  )}
                  {project.scope && (
                    <CardDescription>
                      {project.scope}
                    </CardDescription>
                  )}
                  <div>
                    {project.start_date && (
                      <div>
                        <span>Start: {formatDate(project.start_date)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <p>⚠️ Action Required</p>
                    <p>
                      Add students as members so they can see this project in their Client Lab.
                    </p>
                  </div>
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => {
                      setShowAddMemberForm(project.id);
                      setMemberFormData({ userId: "", role: "student" });
                      loadUsers();
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

      {showAddMemberForm && (
        <Card variant="elevated">
          <div>
            <p>ℹ️ Important Information</p>
            <p>
              Users can only see projects they are members of. After adding a user here with the appropriate role (Student, Mentor, or Admin), they will see this project in their Client Lab section.
            </p>
            <p>
              💡 Tip: Select "Mentor" role to add mentors who can review tasks. Mentors will see projects in their Mentor Portal.
            </p>
          </div>
          <CardTitle>Add Member to Project</CardTitle>
          <div>
            <div>
              <label>
                Select User *
              </label>
              {loadingUsers ? (
                <div>
                  Loading users...
                </div>
              ) : users.length > 0 ? (
                <select
                  value={memberFormData.userId}
                  onChange={(e) => setMemberFormData({ ...memberFormData, userId: e.target.value })}
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
                <div>
                  <input
                    type="text"
                    value={memberFormData.userId}
                    onChange={(e) => setMemberFormData({ ...memberFormData, userId: e.target.value })}
                    placeholder="00000000-0000-0000-0000-000000000000"
                    required
                  />
                  <p>Enter the UUID of the user to add to this project</p>
                </div>
              )}
            </div>
            <div>
              <label>Role *</label>
              <select
                value={memberFormData.role}
                onChange={(e) => setMemberFormData({ ...memberFormData, role: e.target.value })}
              >
                <option value="student">Student - Can view and work on assigned tasks</option>
                <option value="mentor">Mentor - Can review tasks and provide feedback</option>
                <option value="admin">Admin - Can manage project, tasks, and members</option>
              </select>
              <p>
                {memberFormData.role === "mentor" && "Mentors will see this project in their Mentor Portal Client Lab section."}
                {memberFormData.role === "student" && "Students will see this project in their Student Portal Client Lab section."}
                {memberFormData.role === "admin" && "Admins have full control over the project."}
              </p>
            </div>
          </div>
          <div>
            <Button
              variant="gradient"
              size="md"
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

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <div>
            <CardTitle>About Client Lab</CardTitle>
            <CardDescription>
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
