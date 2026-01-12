import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import { apiFetch } from "../../../services/api";
import { unwrapData } from "../../../services/apiShape";
import { useAuth } from "../../../app/providers/AuthProvider";
import Card from "../../../Components/ui/Card";

function TreeSkeleton() {
  return (
    <div>
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ))}
    </div>
  );
}

export default function StudentCourseTree() {
  const { token } = useAuth();
  const { courseSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState({ total: 0, completed: 0, percent: 0, completedLessonIds: [] });
  
  const completedSet = new Set(progress?.completedLessonIds || []);
  const isCompleted = (lessonId) => completedSet.has(lessonId);
  
  async function load(signal) {
    setErr("");
    setLoading(true);
    try {
      const [treeJson, progJson] = await Promise.all([
        apiFetch(`/api/v1/courses/${courseSlug}`, { token, signal }),
        apiFetch(`/api/v1/lms/courses/${courseSlug}/progress`, { token, signal }),
      ]);

      const treeData = unwrapData(treeJson);
      const progData = unwrapData(progJson);

      const courseObj = treeData?.course ?? treeData;
      const mods = Array.isArray(courseObj?.modules) ? courseObj.modules : [];

      mods.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      mods.forEach((m) => {
        if (Array.isArray(m.lessons)) m.lessons.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      });

      setCourse(courseObj);
      setModules(mods);
      setProgress(progData || { total: 0, completed: 0, percent: 0, completedLessonIds: [] });
    } catch (e) {
      if (signal?.aborted) return;
      setErr(e?.message || "Failed to load course.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);
    return () => ac.abort();
  }, [courseSlug, token]);

  const backToCourses = useMemo(() => "/lms/student/courses", []);
  
  if (loading) {
    return (
      <div>
        <div>
          <div />
          <div />
          <div />
        </div>
        <div>
          <div />
          <div />
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Card variant="gradient">
        <div>
          <div>
            <div>
            </div>
            <div>
              <div>Your Progress</div>
              <div>Track your learning journey</div>
            </div>
          </div>
          <div>
            <div>{progress.percent}%</div>
            <div>{progress.completed}/{progress.total} completed</div>
          </div>
        </div>

        <div>
          <div
            style={{ width: `${progress.percent || 0}%` }}
          />
        </div>

        <div>
          <span>Small daily progress = exponential growth 📈</span>
        </div>
      </Card>
      
      <div>
        <div>
          <div>
          </div>
          <h1>{course?.title || "Course"}</h1>
        </div>
        <p>
          Modules & lessons (published only). Complete lessons to track your progress.
        </p>
        <Link
          to={backToCourses}
        >
          Back to Courses
        </Link>
      </div>

      {err ? <ErrorState title="Course load avvaledu" message={err} onRetry={() => {
        const ac = new AbortController();
        load(ac.signal);
      }} /> : null}

      {loading ? (
        <TreeSkeleton />
      ) : (
        <div>
          {modules.map((m) => {
            const modSlug = m.slug ?? m.module_slug ?? m.moduleSlug ?? "";

            return (
              <Card
                key={m.id}
                variant="elevated"
              >
                <div>
                  <div>
                  </div>
                  <div>{m.title}</div>
                </div>

                <div>
                  {(m.lessons || []).map((l, lessonIdx) => {
                    const lesSlug = l.slug ?? l.lesson_slug ?? l.lessonSlug ?? "";
                    const completed = isCompleted(l.id);

                    const to =
                      modSlug && lesSlug
                        ? `/lms/student/courses/${courseSlug}/modules/${modSlug}/lessons/${lesSlug}`
                        : null;

                    return (
                      <div
                        key={l.id}
                      >
                        <div>
                          {completed ? (
                            <div>
                            </div>
                          ) : (
                            <div>
                            </div>
                          )}
                          <div>
                            <div>
                              {l.title}
                            </div>
                            <div>
                              {l.status || "published"}
                            </div>
                          </div>
                        </div>

                        {to ? (
                          <Link
                            to={to}
                          >
                            Open
                          </Link>
                        ) : (
                          <span>
                            Missing slug
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
