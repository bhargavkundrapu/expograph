import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";
import Card, { CardContent } from "../../../Components/ui/Card";
import Button from "../../../Components/ui/Button";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";

function unwrapData(json) {
  return json?.data ?? json;
}

function unwrapArray(json) {
  const d = unwrapData(json);
  return Array.isArray(d) ? d : [];
}

function normalizeUrl(url) {
  if (!url) return "";
  const u = url.trim();
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  return "https://" + u;
}

function toIntOrUndefined(v) {
  if (v === "" || v === null || v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function findLessonInTree(tree, lessonId) {
  const lessons = tree?.lessons || [];
  return lessons.find((l) => String(l.id) === String(lessonId)) || null;
}

export default function SuperAdminLessonResources() {
  const { token } = useAuth();
  const { courseId, lessonId } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  const [tree, setTree] = useState(null);
  const [lesson, setLesson] = useState(null);

  const [rType, setRType] = useState("cheatsheet");
  const [rTitle, setRTitle] = useState("");
  const [rUrl, setRUrl] = useState("");
  const [rBody, setRBody] = useState("");
  const [rSort, setRSort] = useState(0);
  const [savingResource, setSavingResource] = useState(false);

  const [pTitle, setPTitle] = useState("");
  const [pPrompt, setPPrompt] = useState("");
  const [pLang, setPLang] = useState("js");
  const [pStarter, setPStarter] = useState("");
  const [pExpected, setPExpected] = useState("");
  const [pSort, setPSort] = useState(0);
  const [savingPractice, setSavingPractice] = useState(false);

  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => (aliveRef.current = false);
  }, []);

  async function load() {
    setErr("");
    setInfo("");
    setLoading(true);

    try {
      const treeJson = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
      const treeData = unwrapData(treeJson);

      const l = findLessonInTree(treeData, lessonId);
      if (!l) throw new ApiError("Lesson not found in course tree.", 404, null);

      const resJson = await apiFetch(`/api/v1/admin/lessons/${lessonId}/resources`, { token });
      const resourcesList = unwrapArray(resJson);

      const pracJson = await apiFetch(`/api/v1/admin/lessons/${lessonId}/practice`, { token });
      const practiceList = unwrapArray(pracJson);

      resourcesList.sort((a, b) =>
        (a.sort_order ?? 0) - (b.sort_order ?? 0) ||
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      practiceList.sort((a, b) =>
        (a.sort_order ?? 0) - (b.sort_order ?? 0) ||
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      if (!aliveRef.current) return;

      setTree(treeData);
      setLesson({
        ...l,
        resources: resourcesList,
        practice: practiceList,
      });
      const nextResSort = (resourcesList.reduce((m, x) => Math.max(m, x.sort_order ?? 0), 0)) + 1;
      const nextPracSort = (practiceList.reduce((m, x) => Math.max(m, x.sort_order ?? 0), 0)) + 1;

      setRSort(nextResSort);
      setPSort(nextPracSort);
    } catch (e) {
      if (!aliveRef.current) return;
      setErr(e?.message || "Failed to load. Retry.");
    } finally {
      if (!aliveRef.current) return;
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, lessonId]);

  const backToLessonEditor = useMemo(
    () => `/lms/superadmin/content/${courseId}/lessons/${lessonId}`,
    [courseId, lessonId]
  );

  const resources = useMemo(() => lesson?.resources || [], [lesson]);
  const practices = useMemo(() => lesson?.practice || [], [lesson]);

  async function addResource() {
    setErr(""); setInfo("");

    const title = rTitle.trim();
    if (!title) return setErr("Resource title required.");

    const type = rType;
    const body = rBody.trim();

    const url = type === "text" ? "" : normalizeUrl(rUrl);

    if (type !== "text" && !url) return setErr("URL required for link/cheatsheet.");
    if (type === "text" && !body) return setErr("Body required for text resource.");

    const sortOrderNum = Number.isFinite(Number(rSort)) ? Number(rSort) : 0;

    setSavingResource(true);
    try {
      await apiFetch(`/api/v1/admin/lessons/${lessonId}/resources`, {
        method: "POST",
        token,
        body: {
          type,
          title,
          ...(type === "text" ? { body } : { url }),
          sortOrder: sortOrderNum,
        },
      });

      setInfo("Resource added ✅");
      setRTitle(""); setRUrl(""); setRBody(""); setRSort(0);
      await load();
    } catch (e) {
      setErr(e?.message || "Failed to add resource.");
    } finally {
      setSavingResource(false);
      setTimeout(() => aliveRef.current && setInfo(""), 1200);
    }
  }

  async function addPractice() {
    setErr(""); setInfo("");

    const title = pTitle.trim();
    const prompt = pPrompt.trim();
    if (!title) return setErr("Practice title required.");
    if (!prompt) return setErr("Practice prompt required.");

    setSavingPractice(true);
    try {
      await apiFetch(`/api/v1/admin/lessons/${lessonId}/practice`, {
        method: "POST",
        token,
        body: {
          title,
          prompt,
          language: pLang.trim() || "js",
          starterCode: pStarter || "",
          expectedOutput: pExpected || "",
          sortOrder: Number(pSort) || 0,
        },
      });

      setInfo("Practice added ✅");
      setPTitle(""); setPPrompt(""); setPStarter(""); setPExpected(""); setPSort(0);
      await load();
    } catch (e) {
      setErr(e?.message || "Failed to add practice.");
    } finally {
      setSavingPractice(false);
      setTimeout(() => aliveRef.current && setInfo(""), 1200);
    }
  }

  async function updateResource(resourceId, patch) {
    setErr(""); setInfo("");
    try {
      await apiFetch(`/api/v1/admin/resources/${resourceId}`, {
        method: "PATCH",
        token,
        body: patch,
      });
      setInfo("Resource updated ✅");
      await load();
    } catch (e) {
      setErr(e?.message || "Failed to update resource.");
    } finally {
      setTimeout(() => aliveRef.current && setInfo(""), 1200);
    }
  }

  async function updatePractice(practiceId, patch) {
    setErr(""); setInfo("");
    try {
      await apiFetch(`/api/v1/admin/practice/${practiceId}`, {
        method: "PATCH",
        token,
        body: patch,
      });
      setInfo("Practice updated ✅");
      await load();
    } catch (e) {
      setErr(e?.message || "Failed to update practice.");
    } finally {
      setTimeout(() => aliveRef.current && setInfo(""), 1200);
    }
  }

  return (
    <div>
      <div>
        <div>
          <div>
          </div>
          <div>
            <h1>Resources + Practice</h1>
            <p>
              Cheatsheets, links, text resources + practice tasks for this lesson
            </p>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={load}
            disabled={loading}
          >
            Refresh
          </Button>
          <Link to={backToLessonEditor}>
            <Button variant="outline" size="sm">
              Back to Lesson
            </Button>
          </Link>
        </div>
      </div>

      {err && (
        <ErrorState
          title="Failed to load resources"
          message={err}
          onRetry={load}
          size="sm"
        />
      )}

      {info && (
        <div>
          <p>{info}</p>
        </div>
      )}

      {loading ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <>
          <div>
            <div>Lesson</div>
            <div>{lesson?.title}</div>
            <div>
              Lesson ID: {lessonId}
            </div>
          </div>

          <div>
            <h2>Add Resource</h2>

            <div>
              <div>
                <label>Type</label>
                <select
                  value={rType}
                  onChange={(e) => setRType(e.target.value)}
                >
                  <option value="cheatsheet">Cheatsheet (PDF link)</option>
                  <option value="link">Link</option>
                  <option value="text">Text (notes)</option>
                </select>
              </div>

              <div>
                <label>Title</label>
                <input
                  value={rTitle}
                  onChange={(e) => setRTitle(e.target.value)}
                  placeholder="JSX Quick Cheatsheet"
                />
              </div>
            </div>

            {rType !== "text" ? (
              <div>
                <label>URL</label>
                <input
                  value={rUrl}
                  onChange={(e) => setRUrl(e.target.value)}
                  placeholder="https://..."
                />
                <div>
                  Phase-1: URL. Later we'll add file upload to Cloudflare R2.
                </div>
              </div>
            ) : (
              <div>
                <label>Body</label>
                <textarea
                  rows={4}
                  value={rBody}
                  onChange={(e) => setRBody(e.target.value)}
                  placeholder="Write notes / mini cheatsheet text…"
                />
              </div>
            )}

            <div>
              <div>
                <label>Sort</label>
                <input
                  type="number"
                  value={rSort}
                  onChange={(e) => setRSort(e.target.value)}
                />
              </div>

              <button
                onClick={addResource}
                disabled={savingResource}
                type="button"
              >
                {savingResource ? "Adding…" : "Add Resource"}
              </button>
            </div>
          </div>

          <div>
            <h2>Resources</h2>

            {resources.length === 0 ? (
              <div>No resources yet.</div>
            ) : (
              <div>
                {resources
                  .slice()
                  .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                  .map((r) => (
                    <div key={r.id}>
                      <div>
                        <div>
                          <div>{r.type}</div>
                          <div>{r.title}</div>
                          {r.url ? (
                            <a href={r.url} target="_blank" rel="noreferrer">
                              Open resource
                            </a>
                          ) : null}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            updateResource(r.id, { sortOrder: (r.sort_order ?? 0) + 1 })
                          }
                        >
                          +Sort
                        </button>
                      </div>

                      {r.body ? (
                        <pre>
                          {r.body}
                        </pre>
                      ) : null}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div>
            <h2>Add Practice</h2>

            <div>
              <div>
                <label>Title</label>
                <input
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  placeholder="Practice: Build a JSX Card"
                />
              </div>
              <div>
                <label>Language</label>
                <input
                  value={pLang}
                  onChange={(e) => setPLang(e.target.value)}
                  placeholder="js"
                />
              </div>
            </div>

            <div>
              <label>Prompt</label>
              <textarea
                rows={4}
                value={pPrompt}
                onChange={(e) => setPPrompt(e.target.value)}
                placeholder="Write a component that…"
              />
            </div>

            <div>
              <label>Starter Code (optional)</label>
              <textarea
                rows={4}
                value={pStarter}
                onChange={(e) => setPStarter(e.target.value)}
              />
            </div>

            <div>
              <label>Expected Output (optional)</label>
              <input
                value={pExpected}
                onChange={(e) => setPExpected(e.target.value)}
                placeholder="What should happen / output…"
              />
            </div>

            <div>
              <div>
                <label>Sort</label>
                <input
                  type="number"
                  value={pSort}
                  onChange={(e) => setPSort(e.target.value)}
                />
              </div>

              <button
                onClick={addPractice}
                disabled={savingPractice}
                type="button"
              >
                {savingPractice ? "Adding…" : "Add Practice"}
              </button>
            </div>
          </div>

          <div>
            <h2>Practice Tasks</h2>

            {practices.length === 0 ? (
              <div>No practice tasks yet.</div>
            ) : (
              <div>
                {practices
                  .slice()
                  .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                  .map((p) => (
                    <div key={p.id}>
                      <div>
                        <div>
                          <div>{p.language || "lang"}</div>
                          <div>{p.title}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            updatePractice(p.id, { sortOrder: (p.sort_order ?? 0) + 1 })
                          }
                        >
                          +Sort
                        </button>
                      </div>

                      <div>
                        {p.prompt}
                      </div>

                      {p.starter_code ? (
                        <pre>
                          {p.starter_code}
                        </pre>
                      ) : null}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
