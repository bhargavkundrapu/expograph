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
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SuperAdminInternships() {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [activeTab, setActiveTab] = useState("projects");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    track: "",
    difficulty: "",
    brief: "",
    skills: "",
    status: "draft",
  });
  const [batchFormData, setBatchFormData] = useState({
    batchName: "",
    startAt: "",
    endAt: "",
    maxSeats: "",
  });
  const alive = useRef(true);

  async function loadProjects(signal) {
    try {
      const json = await apiFetch("/api/v1/mentor/internships/projects", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setProjects(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load projects:", e);
    }
  }

  async function loadApplications(signal) {
    try {
      const json = await apiFetch("/api/v1/mentor/internships/applications", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setApplications(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load applications:", e);
    }
  }

  async function loadEverything(signal) {
    setErr("");
    setLoading(true);
    try {
      await Promise.all([
        loadProjects(signal),
        loadApplications(signal),
      ]);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load internships data");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function createProject() {
    try {
      const skills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
      await apiFetch("/api/v1/mentor/internships/projects", {
        method: "POST",
        token,
        body: {
          ...formData,
          skills,
        },
      });
      alert("Project created successfully! ✅");
      setShowProjectForm(false);
      setFormData({ title: "", slug: "", track: "", difficulty: "", brief: "", skills: "", status: "draft" });
      const ac = new AbortController();
      loadEverything(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to create project");
    }
  }

  async function createBatch() {
    if (!selectedProject) {
      alert("Please select a project first");
      return;
    }
    try {
      await apiFetch(`/api/v1/mentor/internships/projects/${selectedProject}/batches`, {
        method: "POST",
        token,
        body: batchFormData,
      });
      alert("Batch created successfully! ✅");
      setShowBatchForm(false);
      setBatchFormData({ batchName: "", startAt: "", endAt: "", maxSeats: "" });
      setSelectedProject(null);
    } catch (e) {
      alert(e?.message || "Failed to create batch");
    }
  }

  async function approveApplication(applicationId) {
    try {
      await apiFetch(`/api/v1/mentor/internships/applications/${applicationId}/approve`, {
        method: "POST",
        token,
        body: {},
      });
      const ac = new AbortController();
      loadApplications(ac.signal);
      alert("Application approved! ✅");
    } catch (e) {
      alert(e?.message || "Failed to approve application");
    }
  }

  async function rejectApplication(applicationId) {
    try {
      await apiFetch(`/api/v1/mentor/internships/applications/${applicationId}/reject`, {
        method: "POST",
        token,
        body: {},
      });
      const ac = new AbortController();
      loadApplications(ac.signal);
      alert("Application rejected");
    } catch (e) {
      alert(e?.message || "Failed to reject application");
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    loadEverything(ac.signal);
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
        title="Failed to Load Internships" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadEverything(ac.signal);
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
            <h1>Micro-Internships</h1>
            <p>Manage internship projects and applications</p>
          </div>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => {
              setShowProjectForm(true);
              setShowBatchForm(false);
            }}
          >
            Create Project
          </Button>
        </div>
      </div>

      <div>
        <button
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab("applications")}
        >
          Applications ({applications.length})
        </button>
      </div>

      {showProjectForm && (
        <Card variant="elevated">
          <CardTitle>Create Micro-Internship Project</CardTitle>
          <div>
            <div>
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
            <div>
              <label>Track</label>
              <input
                type="text"
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                placeholder="e.g., Web Development"
              />
            </div>
            <div>
              <label>Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="">Select difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label>Brief *</label>
              <textarea
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                rows={4}
                required
              />
            </div>
            <div>
              <label>Skills (comma-separated)</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, Node.js, MongoDB"
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
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div>
            <Button variant="gradient" size="md" onClick={createProject}>
              Create Project
            </Button>
            <Button variant="outline" size="md" onClick={() => setShowProjectForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {showBatchForm && (
        <Card variant="elevated">
          <CardTitle>Create Batch for Project</CardTitle>
          <div>
            <div>
              <label>Batch Name *</label>
              <input
                type="text"
                value={batchFormData.batchName}
                onChange={(e) => setBatchFormData({ ...batchFormData, batchName: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Start Date & Time *</label>
              <input
                type="datetime-local"
                value={batchFormData.startAt}
                onChange={(e) => setBatchFormData({ ...batchFormData, startAt: e.target.value })}
                required
              />
            </div>
            <div>
              <label>End Date & Time *</label>
              <input
                type="datetime-local"
                value={batchFormData.endAt}
                onChange={(e) => setBatchFormData({ ...batchFormData, endAt: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Max Seats</label>
              <input
                type="number"
                value={batchFormData.maxSeats}
                onChange={(e) => setBatchFormData({ ...batchFormData, maxSeats: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </div>
          <div>
            <Button variant="gradient" size="md" onClick={createBatch}>
              Create Batch
            </Button>
            <Button variant="outline" size="md" onClick={() => {
              setShowBatchForm(false);
              setSelectedProject(null);
            }}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {activeTab === "projects" && (
        <div>
          {projects.length === 0 ? (
            <EmptyState
              title="No Projects"
              message="Create your first micro-internship project to get started!"
            />
          ) : (
            <div>
              {projects.map((project, idx) => (
                <Card
                  key={`${project.project_id}-${project.batch_id || idx}`}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <CardTitle>{project.title || "Untitled Project"}</CardTitle>
                      {project.track && (
                        <div>
                          <span>{project.track}</span>
                        </div>
                      )}
                      {project.difficulty && (
                        <span>
                          {project.difficulty}
                        </span>
                      )}
                    </div>
                    <span>
                      {project.project_status || 'draft'}
                    </span>
                  </div>
                  <CardDescription>{project.brief || "No description"}</CardDescription>
                  {project.batch_id && (
                    <div>
                      <div>
                        <div>
                          <span>{project.batch_name}</span>
                        </div>
                        <span>
                          {project.batch_status || 'closed'}
                        </span>
                      </div>
                      <div>
                        {project.start_at && (
                          <div>
                            <span>Start: {formatDate(project.start_at)}</span>
                          </div>
                        )}
                        {project.end_at && (
                          <div>
                            <span>End: {formatDate(project.end_at)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        {project.max_seats && (
                          <span>Max Seats: {project.max_seats}</span>
                        )}
                        {project.applied_count !== undefined && (
                          <span>Applied: {project.applied_count}</span>
                        )}
                        {project.approved_count !== undefined && (
                          <span>Approved: {project.approved_count}</span>
                        )}
                        {project.assigned_count !== undefined && (
                          <span>Assigned: {project.assigned_count}</span>
                        )}
                      </div>
                    </div>
                  )}
                  {!project.batch_id && (
                    <div>
                      No batches created yet. Create a batch to make this project available to students.
                    </div>
                  )}
                  <div>
                    {!project.batch_id && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project.project_id);
                          setShowBatchForm(true);
                          setShowProjectForm(false);
                        }}
                      >
                        Create Batch
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormData({
                          title: project.title,
                          slug: project.slug,
                          track: project.track || "",
                          difficulty: project.difficulty || "",
                          brief: project.brief,
                          skills: Array.isArray(project.skills) ? project.skills.join(", ") : (project.skills || ""),
                          status: project.project_status || "draft",
                        });
                        setSelectedProject(project.project_id);
                        setShowProjectForm(true);
                        setShowBatchForm(false);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "applications" && (
        <div>
          {applications.length === 0 ? (
            <EmptyState
              title="No Applications"
              message="No internship applications pending review."
            />
          ) : (
            <div>
              {applications.map((app, idx) => (
                <Card
                  key={app.id}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <div>
                        {app.status === 'approved' ? (
                          <span>✓</span>
                        ) : app.status === 'rejected' ? (
                          <span>✗</span>
                        ) : (
                          <span>○</span>
                        )}
                      </div>
                      <div>
                        <CardTitle>{app.project_title || "Project"}</CardTitle>
                        <div>
                          Student: {app.student_email || "—"} | Applied: {formatDate(app.applied_at)}
                        </div>
                      </div>
                    </div>
                    {app.note && (
                      <div>
                        {app.note}
                      </div>
                    )}
                    <div>
                      <span>
                        {app.status || "pending"}
                      </span>
                      {app.status === 'applied' && (
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => approveApplication(app.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => rejectApplication(app.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
