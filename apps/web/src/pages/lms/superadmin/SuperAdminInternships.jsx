import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { 
  FaBriefcase, 
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUsers,
  FaCalendar,
  FaTag,
  FaEdit
} from "react-icons/fa";
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
      // Note: This endpoint might need to be created or use a different approach
      // For now, we'll show the form to create projects
      if (alive.current) setProjects([]);
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
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
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
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 p-10 shadow-glow" style={{ marginBottom: '2rem' }}>
        <div className="position-absolute" style={{ top: 0, right: 0, width: '24rem', height: '24rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', filter: 'blur(3rem)', zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex items-center justify-between gap-md" style={{ marginBottom: '1.5rem' }}>
            <div className="layout-flex items-center gap-md">
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg shadow-indigo-500/30">
                <FaBriefcase className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="section-hero text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>Micro-Internships</h1>
                <p className="text-gray-300 text-lg" style={{ margin: 0 }}>Manage internship projects and applications</p>
              </div>
            </div>
            <Button
              variant="gradient"
              size="lg"
              icon={FaPlus}
              onClick={() => {
                setShowProjectForm(true);
                setShowBatchForm(false);
              }}
            >
              Create Project
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="layout-flex gap-2 border-b border-gray-800" style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "projects"
              ? "border-indigo-400 text-indigo-400"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "applications"
              ? "border-indigo-400 text-indigo-400"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Applications ({applications.length})
        </button>
      </div>

      {/* Create Project Form */}
      {showProjectForm && (
        <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
          <CardTitle className="text-2xl mb-6">Create Micro-Internship Project</CardTitle>
          <div className="layout-grid-2 gap-md mb-6">
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Track</label>
              <input
                type="text"
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                placeholder="e.g., Web Development"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
              >
                <option value="">Select difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-white mb-2 block">Brief *</label>
              <textarea
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                rows={4}
                required
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-semibold text-white mb-2 block">Skills (comma-separated)</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="layout-flex gap-md">
            <Button variant="gradient" size="md" onClick={createProject}>
              Create Project
            </Button>
            <Button variant="outline" size="md" onClick={() => setShowProjectForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Create Batch Form */}
      {showBatchForm && (
        <Card variant="elevated" className="p-8" style={{ width: '100%', boxSizing: 'border-box' }}>
          <CardTitle className="text-2xl mb-6">Create Batch for Project</CardTitle>
          <div className="layout-grid-2 gap-md mb-6">
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Batch Name *</label>
              <input
                type="text"
                value={batchFormData.batchName}
                onChange={(e) => setBatchFormData({ ...batchFormData, batchName: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Start Date & Time *</label>
              <input
                type="datetime-local"
                value={batchFormData.startAt}
                onChange={(e) => setBatchFormData({ ...batchFormData, startAt: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">End Date & Time *</label>
              <input
                type="datetime-local"
                value={batchFormData.endAt}
                onChange={(e) => setBatchFormData({ ...batchFormData, endAt: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Max Seats</label>
              <input
                type="number"
                value={batchFormData.maxSeats}
                onChange={(e) => setBatchFormData({ ...batchFormData, maxSeats: e.target.value })}
                className="w-full border-2 border-gray-700 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-400"
                placeholder="Optional"
              />
            </div>
          </div>
          <div className="layout-flex gap-md">
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

      {/* Content */}
      {activeTab === "projects" && (
        <div>
          {projects.length === 0 ? (
            <EmptyState
              title="No Projects"
              message="Create your first micro-internship project to get started!"
            />
          ) : (
            <div className="layout-grid-2 gap-lg" style={{ width: '100%' }}>
              {projects.map((project, idx) => (
                <Card key={project.id} variant="elevated" className="animate-fadeIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.brief}</CardDescription>
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
            <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
              {applications.map((app, idx) => (
                <Card
                  key={app.id}
                  variant="elevated"
                  className="animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
                >
                  <div className="layout-flex items-center justify-between gap-md">
                    <div style={{ flex: 1 }}>
                      <div className="layout-flex items-center gap-md mb-2">
                        <div className={`p-2 rounded-lg ${
                          app.status === 'approved' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                          app.status === 'rejected' ? 'bg-red-500/20 border border-red-500/30' :
                          'bg-cyan-500/20 border border-cyan-500/30'
                        }`}>
                          {app.status === 'approved' ? (
                            <FaCheckCircle className="text-emerald-400" />
                          ) : app.status === 'rejected' ? (
                            <FaTimesCircle className="text-red-400" />
                          ) : (
                            <FaClock className="text-cyan-400" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ margin: 0 }}>{app.project_title || "Project"}</CardTitle>
                          <div className="text-xs text-gray-500 mt-1">
                            Student: {app.student_email || "—"} | Applied: {formatDate(app.applied_at)}
                          </div>
                        </div>
                      </div>
                      {app.note && (
                        <div className="text-sm text-gray-400 ml-11 mt-2 p-3 rounded-lg bg-gray-800 border border-gray-700">
                          {app.note}
                        </div>
                      )}
                    </div>
                    <div className="layout-flex-col gap-md">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        app.status === 'approved' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                        app.status === 'rejected' ? 'bg-red-500/10 border border-red-500/30 text-red-300' :
                        'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300'
                      }`}>
                        {app.status || "pending"}
                      </span>
                      {app.status === 'applied' && (
                        <div className="layout-flex gap-md">
                          <Button
                            variant="outline"
                            size="sm"
                            icon={FaCheckCircle}
                            onClick={() => approveApplication(app.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={FaTimesCircle}
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

