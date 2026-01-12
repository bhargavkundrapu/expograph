import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapData, unwrapArray } from "../../../services/apiShape";
import { getProgressSummary } from "../../../features/progress/progressApi";
import Card, { CardContent, CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

function formatWatchTime(seconds) {
  if (!seconds || seconds === 0) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ProgressCard({ title, value, subtitle }) {
  return (
    <Card 
      variant="elevated"
    >
      <div>
        <div>
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <div>{value}</div>
          {subtitle && (
            <div>{subtitle}</div>
          )}
        </div>
      </div>
    </Card>
  );
}

function CourseProgressCard({ course, progress }) {
  const { total, completed, percent } = progress || { total: 0, completed: 0, percent: 0 };
  
  return (
    <Card 
      variant="elevated"
    >
      <div>
        <div>
          <div>
            <div>
            </div>
            <CardTitle>{course.title}</CardTitle>
            </div>
          {course.description && (
            <CardDescription>
              {course.description}
            </CardDescription>
          )}
        </div>
      </div>

      <div>
        <div>
          <span>{completed}</span> of <span>{total}</span> lessons completed
        </div>
        <div>{percent}%</div>
      </div>

      <div>
        <div
          style={{ width: `${percent || 0}%` }}
        />
      </div>

      <Link
        to={`/lms/student/courses/${course.slug}`}
      >
        <span>View Course</span>
      </Link>
    </Card>
  );
}

export default function StudentProgress() {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseProgresses, setCourseProgresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

  async function loadSummary(signal) {
    try {
      const data = await getProgressSummary({ token, signal });
      if (alive.current) setSummary(data);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load progress summary");
    }
  }

  async function loadCourses(signal) {
    try {
      const json = await apiFetch("/api/v1/courses", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setCourses(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load courses:", e);
    }
  }

  async function loadCourseProgress(courseSlug, signal) {
    try {
      const json = await apiFetch(`/api/v1/lms/courses/${courseSlug}/progress`, { token, signal });
      const data = unwrapData(json);
      if (alive.current && data) {
        setCourseProgresses(prev => ({ ...prev, [courseSlug]: data }));
      }
    } catch (e) {
      if (signal?.aborted) return;
      console.error(`Failed to load progress for ${courseSlug}:`, e);
    }
  }

  async function loadEverything(signal) {
    setErr("");
    setLoading(true);
    
    try {
      await Promise.all([
        loadSummary(signal),
        loadCourses(signal),
      ]);
      
      const json = await apiFetch("/api/v1/courses", { token, signal });
      const courseList = unwrapArray(json);
      if (courseList && courseList.length > 0) {
        await Promise.all(
          courseList.map(course => loadCourseProgress(course.slug, signal))
        );
      }
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load progress data");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
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
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        <Skeleton />
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Progress" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadEverything(ac.signal);
        }} 
      />
    );
  }

  const { completed_lessons = 0, in_progress_lessons = 0, total_watch_seconds = 0 } = summary || {};
  const totalLessons = completed_lessons + in_progress_lessons;
  const completionRate = totalLessons > 0 ? Math.round((completed_lessons / totalLessons) * 100) : 0;

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <h1>My Progress</h1>
          <p>Track your learning journey and achievements</p>
        </div>
      </div>

      <div>
        <ProgressCard
          title="Completed Lessons"
          value={completed_lessons}
          subtitle={`${completionRate}% completion rate`}
        />
        <ProgressCard
          title="In Progress"
          value={in_progress_lessons}
          subtitle="Lessons started"
        />
        <ProgressCard
          title="Watch Time"
          value={formatWatchTime(total_watch_seconds)}
          subtitle="Total learning time"
        />
      </div>

      {totalLessons > 0 && (
        <Card variant="gradient">
          <div>
            <div>
              <div>
              </div>
              <div>
                <div>Overall Progress</div>
                <div>Your learning journey overview</div>
              </div>
            </div>
            <div>
              <div>{completionRate}%</div>
              <div>{completed_lessons}/{totalLessons} completed</div>
            </div>
          </div>

          <div>
            <div
              style={{ width: `${completionRate || 0}%` }}
            />
          </div>

          <div>
            <span>Keep going! Every lesson completed brings you closer to mastery 🚀</span>
          </div>
        </Card>
      )}

      <div>
        <div>
          <div>
          </div>
          <div>
            <h2>Course Progress</h2>
            <p>
              Track your progress across all courses
            </p>
          </div>
        </div>

        {courses.length === 0 ? (
          <Card variant="elevated">
            <div>
            </div>
            <CardTitle>No Courses Yet</CardTitle>
            <CardDescription>
              Start your learning journey by enrolling in a course
            </CardDescription>
            <Link
              to="/lms/student/courses"
            >
              Browse Courses
            </Link>
          </Card>
        ) : (
          <div>
            {courses.map((course, idx) => (
              <CourseProgressCard
                key={course.id}
                course={course}
                progress={courseProgresses[course.slug]}
              />
            ))}
          </div>
        )}
      </div>

      <Card variant="elevated">
        <div>
          <div>
          </div>
          <CardTitle>Quick Actions</CardTitle>
        </div>

        <div>
          <Link
            to="/lms/student/courses"
          >
            <div>
            </div>
            <div>
              <div>Browse Courses</div>
              <div>Explore all courses</div>
            </div>
          </Link>

          <Link
            to="/lms/student/submissions"
          >
            <div>
            </div>
            <div>
              <div>My Submissions</div>
              <div>View mentor feedback</div>
            </div>
          </Link>

          <Link
            to="/lms/student"
          >
            <div>
            </div>
            <div>
              <div>Dashboard</div>
              <div>Back to home</div>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  );
}
