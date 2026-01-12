import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { getProgressSummary } from "../../../features/progress/progressApi";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
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

export default function StudentHome() {
  const { token, user } = useAuth();
  const { isEnabled } = useFeatureFlags();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const alive = useRef(true);

  async function loadSummary(signal) {
    try {
      const data = await getProgressSummary({ token, signal });
      if (alive.current) setSummary(data);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load summary");
    }
  }

  async function loadEverything(signal) {
    setErr("");
    setLoading(true);
    try {
      await loadSummary(signal);
    } catch (e) {
      if (signal?.aborted) return;
      if (alive.current) setErr(e?.message || "Failed to load dashboard");
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

  const { completed_lessons = 0, in_progress_lessons = 0, total_watch_seconds = 0 } = summary || {};
  const totalLessons = completed_lessons + in_progress_lessons;
  const completionRate = totalLessons > 0 ? Math.round((completed_lessons / totalLessons) * 100) : 0;

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
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Dashboard" 
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
        <h1>
          Welcome {user?.full_name || user?.email?.split('@')[0] || 'Student'} 👏
        </h1>
        <p>Here's your learning dashboard</p>
      </div>

      <div>
        <Card variant="elevated">
          <CardContent>
            <div>
              <div>
                <CardDescription>Completed Lessons</CardDescription>
                <CardTitle>{completed_lessons || 0}</CardTitle>
              </div>
              <div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent>
            <div>
              <div>
                <CardDescription>In Progress</CardDescription>
                <CardTitle>{in_progress_lessons || 0}</CardTitle>
              </div>
              <div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent>
            <div>
              <div>
                <CardDescription>Watch Time</CardDescription>
                <CardTitle>{formatWatchTime(total_watch_seconds)}</CardTitle>
              </div>
              <div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card variant="elevated">
        <CardContent>
          <div>
            <CardTitle>Overall Progress</CardTitle>
            <span>{completionRate}%</span>
          </div>
          <div>
            <div
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <div>
        <CardTitle>Quick Actions</CardTitle>
        <div>
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_COURSES) && (
            <Link to="/lms/student/courses">
              <Card variant="outlined">
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>Browse Courses</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_PROGRESS) && (
            <Link to="/lms/student/progress">
              <Card variant="outlined">
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>View Progress</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_SUBMISSIONS) && (
            <Link to="/lms/student/submissions">
              <Card variant="outlined">
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>My Submissions</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CERTIFICATES) && (
            <Link to="/lms/student/certificates">
              <Card variant="outlined">
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>Certificates</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_INTERNSHIPS) && (
            <Link to="/lms/student/internships">
              <Card variant="outlined">
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>Internships</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_CLIENT_LAB) && (
            <Link to="/lms/student/client-lab">
              <Card variant="outlined">
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>Client Lab</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_WORKSHOPS) && (
            <Link to="/lms/student/workshops">
              <Card variant="outlined">
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>Workshops</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {checkFeatureFlag(isEnabled, FEATURE_FLAGS.STUDENT_REFERRALS) && (
            <Link to="/lms/student/referrals">
              <Card variant="outlined">
                <CardContent>
                  <div>
                  </div>
                  <CardTitle>Referrals</CardTitle>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
