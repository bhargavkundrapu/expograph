import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
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

function getStatusBadge(status) {
  const badges = {
    todo: { label: "To Do" },
    in_progress: { label: "In Progress" },
    review: { label: "Review" },
    completed: { label: "Completed" },
  };
  return badges[status] || badges.todo;
}

export default function MentorClientLab() {
  const { token } = useAuth();
  const { projectId } = useParams();
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    feedback: "",
    status: "review",
  });
  const [submitting, setSubmitting] = useState(false);
  const alive = useRef(true);

  const clientLabEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.MENTOR_CLIENT_LAB);

  if (!flagsLoading && !clientLabEnabled) {
    return (
      <div>
        <Card variant="elevated">
          <CardTitle>Feature Disabled</CardTitle>
          <CardDescription>Client lab review feature is currently disabled by the administrator.</CardDescription>
        </Card>
      </div>
    );
  }

  async function loadProjects(signal) {
    try {
      setLoading(true);
      setErr("");
      const json = await apiFetch("/api/v1/mentor/client-lab/projects", { token, signal });
      const list = unwrapArray(json);
      console.log("✅ Loaded projects for mentor:", list.length, list);
      if (alive.current) {
        setProjects(list);
        setLoading(false);
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error("❌ Failed to load projects:", e);
      if (alive.current) {
        setErr(e?.message || "Failed to load projects");
        setLoading(false);
      }
    }
  }

  async function loadReviewQueue(signal) {
    if (!projectId) {
      await loadProjects(signal);
      return;
    }

    try {
      setLoading(true);
      setErr("");
      const json = await apiFetch(`/api/v1/mentor/client-lab/projects/${projectId}/review-queue`, { token, signal });
      const data = unwrapData(json);
      if (alive.current) {
        setTasks(data.tasks || []);
        setProject(data.project || null);
        setLoading(false);
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load review queue:", e);
      if (alive.current) {
        setErr(e?.message || "Failed to load review queue");
        setLoading(false);
      }
    }
  }

  async function submitFeedback(taskId) {
    if (!feedbackForm.feedback.trim()) {
      alert("Please provide feedback");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch(`/api/v1/mentor/client-lab/tasks/${taskId}/feedback`, {
        method: "POST",
        token,
        body: {
          feedback: feedbackForm.feedback,
          status: feedbackForm.status,
        },
      });
      
      alert("Feedback submitted successfully!");
      setSelectedTask(null);
      setFeedbackForm({ feedback: "", status: "review" });
      
      const ac = new AbortController();
      await loadReviewQueue(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    setLoading(true);
    setErr("");
    loadReviewQueue(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token, projectId]);

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
        title="Failed to Load Review Queue" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadReviewQueue(ac.signal);
        }} 
      />
    );
  }

  if (!projectId) {
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
          title="Failed to Load Projects" 
          message={err} 
          onRetry={() => {
            const ac = new AbortController();
            loadProjects(ac.signal);
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
            <div>
              <div>
              </div>
              <div>
                <h1>Client Lab Review</h1>
                <p>Select a project to review tasks</p>
              </div>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          <Card variant="elevated">
            <EmptyState
              title="No Projects Available"
              message={
                <div>
                  <p>You are not assigned to any client lab projects yet.</p>
                  <div>
                    <p>How to get access:</p>
                    <ol>
                      <li>Contact your SuperAdmin or Tenant Admin</li>
                      <li>Ask them to add you to a client lab project</li>
                      <li>They need to: Go to Client Lab → Select a project → Click "Add Member" → Select your user → Choose "Mentor" role</li>
                      <li>Once added, you'll see the project here and can review tasks</li>
                    </ol>
                  </div>
                </div>
              }
            />
          </Card>
        ) : (
          <div>
            {projects.map((proj, idx) => (
              <Link key={proj.id} to={`/lms/mentor/client-lab/${proj.id}`}>
                <Card
                  variant="elevated"
                >
                  <div>
                    <div>
                    </div>
                    <div>
                      <CardTitle>{proj.name || proj.title || "Untitled Project"}</CardTitle>
                      {proj.client_name && (
                        <div>Client: {proj.client_name}</div>
                      )}
                    </div>
                    <div>
                    </div>
                  </div>
                  {proj.description && (
                    <CardDescription>{proj.description}</CardDescription>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const pendingTasks = tasks.filter(t => t.status === "review" || t.status === "in_progress");
  const completedTasks = tasks.filter(t => t.status === "completed");

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>Client Lab Review</h1>
              {project && (
                <p>Review tasks for: {project.name || project.title}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <div>{pendingTasks.length}</div>
              <div>Pending Review</div>
            </div>
            <div>
              <div>{completedTasks.length}</div>
              <div>Completed</div>
            </div>
            <div>
              <div>{tasks.length}</div>
              <div>Total Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {pendingTasks.length > 0 && (
        <div>
          <h2>Pending Review ({pendingTasks.length})</h2>
          <div>
            {pendingTasks.map((task, idx) => {
              const statusBadge = getStatusBadge(task.status);
              return (
                <Card
                  key={task.id}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>{task.title || "Untitled Task"}</CardTitle>
                        <div>
                          <div>
                            <span>Student: {task.student_email || task.user_email || "—"}</span>
                          </div>
                          {task.due_date && (
                            <div>
                              <span>Due: {formatDate(task.due_date)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {task.description && (
                      <div>
                        <div>Task Description:</div>
                        <div>{task.description}</div>
                      </div>
                    )}

                    {task.submission_content && (
                      <div>
                        <div>Student Submission:</div>
                        <div>{task.submission_content}</div>
                      </div>
                    )}

                    {task.mentor_feedback && (
                      <div>
                        <div>Previous Feedback:</div>
                        <div>{task.mentor_feedback}</div>
                      </div>
                    )}
                  </div>

                  <div>
                    <span>
                      {statusBadge.label}
                    </span>
                    <Button
                      variant="gradient"
                      size="sm"
                      onClick={() => setSelectedTask(task)}
                    >
                      Review
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2>Completed ({completedTasks.length})</h2>
          <div>
            {completedTasks.map((task, idx) => {
              const statusBadge = getStatusBadge(task.status);
              return (
                <Card
                  key={task.id}
                  variant="elevated"
                >
                  <div>
                    <div>
                      <div>
                      </div>
                      <div>
                        <CardTitle>{task.title || "Untitled Task"}</CardTitle>
                        <div>
                          Student: {task.student_email || task.user_email || "—"} | {formatDate(task.completed_at || task.updated_at)}
                        </div>
                      </div>
                      {task.mentor_feedback && (
                        <div>
                          Feedback: {task.mentor_feedback.substring(0, 100)}...
                        </div>
                      )}
                    </div>
                    <span>
                      {statusBadge.label}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <EmptyState
          title="No Tasks to Review"
          message="There are currently no tasks in the review queue for this project."
        />
      )}

      {selectedTask && (
        <div onClick={() => setSelectedTask(null)}>
          <Card
            variant="elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle>Provide Feedback</CardTitle>
            
            <div>
              <div>
                <div>
                </div>
                <div>
                  <div>
                    {selectedTask.title || "Untitled Task"}
                  </div>
                  <div>
                    <div>
                      <span>Student: {selectedTask.student_email || selectedTask.user_email || "—"}</span>
                    </div>
                    {selectedTask.due_date && (
                      <div>
                        <span>Due: {formatDate(selectedTask.due_date)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedTask.description && (
                <div>
                  <div>Task Description:</div>
                  <div>
                    {selectedTask.description}
                  </div>
                </div>
              )}

              {selectedTask.submission_content && (
                <div>
                  <div>Student Submission:</div>
                  <div>
                    {selectedTask.submission_content}
                  </div>
                </div>
              )}

              {selectedTask.mentor_feedback && (
                <div>
                  <div>Previous Feedback:</div>
                  <div>{selectedTask.mentor_feedback}</div>
                </div>
              )}
            </div>

            <div>
              <CardDescription>Provide Your Feedback</CardDescription>
            </div>

            <div>
              <div>
                <label>Feedback *</label>
                <textarea
                  value={feedbackForm.feedback}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback: e.target.value })}
                  rows={6}
                  placeholder="Provide detailed feedback..."
                  required
                />
              </div>

              <div>
                <label>Status *</label>
                <select
                  value={feedbackForm.status}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, status: e.target.value })}
                >
                  <option value="review">Needs Review</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <Button
                variant="gradient"
                size="md"
                onClick={() => submitFeedback(selectedTask.id)}
                disabled={submitting || !feedbackForm.feedback.trim()}
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedTask(null);
                  setFeedbackForm({ feedback: "", status: "review" });
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
