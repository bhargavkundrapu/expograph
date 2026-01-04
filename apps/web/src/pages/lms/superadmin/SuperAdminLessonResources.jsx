import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch, ApiError } from "../../../services/api";
import { useAuth } from "../../../app/providers/AuthProvider";

function unwrapData(json) {
  // apiFetch returns { ok:true, data: ... }
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
  return "https://" + u; // auto-fix
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

  // ----- Add Resource form -----
  const [rType, setRType] = useState("cheatsheet");
  const [rTitle, setRTitle] = useState("");
  const [rUrl, setRUrl] = useState("");
  const [rBody, setRBody] = useState("");
  const [rSort, setRSort] = useState(0);
  const [savingResource, setSavingResource] = useState(false);

  // ----- Add Practice form -----
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
    // 1) Course tree (for lesson title/meta)
    const treeJson = await apiFetch(`/api/v1/admin/courses/${courseId}/tree`, { token });
    const treeData = unwrapData(treeJson);

    const l = findLessonInTree(treeData, lessonId);
    if (!l) throw new ApiError("Lesson not found in course tree.", 404, null);

    // 2) Resources (real source)
    const resJson = await apiFetch(`/api/v1/admin/lessons/${lessonId}/resources`, { token });
    const resourcesList = unwrapArray(resJson);

    // 3) Practice (real source)
    const pracJson = await apiFetch(`/api/v1/admin/lessons/${lessonId}/practice`, { token });
    const practiceList = unwrapArray(pracJson);

    // Sort stable: sort_order then created_at
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
    // auto next sort defaults (optional)
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

  // ---- inline update helpers (simple + premium) ----
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Lesson Resources + Practice</h1>
          <p className="text-sm text-slate-300">
            Cheatsheets / links / text resources + practice tasks for this lesson.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={load}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
            type="button"
          >
            Refresh
          </button>

          <Link
            to={backToLessonEditor}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
          >
            ← Back to Lesson
          </Link>
        </div>
      </div>

      {err ? (
        <div className="rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {err}{" "}
          <button onClick={load} className="ml-2 underline underline-offset-2" type="button">
            Retry
          </button>
        </div>
      ) : null}

      {info ? (
        <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">
          {info}
        </div>
      ) : null}

      {loading ? (
        <div className="text-sm text-slate-300">Loading…</div>
      ) : (
        <>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="text-sm text-slate-400">Lesson</div>
            <div className="mt-1 text-lg font-semibold">{lesson?.title}</div>
            <div className="mt-1 text-xs text-slate-500">
              Lesson ID: {lessonId}
            </div>
          </div>

          {/* ADD RESOURCE */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-3">
            <h2 className="text-lg font-semibold">Add Resource</h2>

            <div className="grid gap-3 md:grid-cols-4">
              <div>
                <label className="text-sm text-slate-300">Type</label>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                  value={rType}
                  onChange={(e) => setRType(e.target.value)}
                >
                  <option value="cheatsheet">Cheatsheet (PDF link)</option>
                  <option value="link">Link</option>
                  <option value="text">Text (notes)</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="text-sm text-slate-300">Title</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                  value={rTitle}
                  onChange={(e) => setRTitle(e.target.value)}
                  placeholder="JSX Quick Cheatsheet"
                />
              </div>
            </div>

            {rType !== "text" ? (
              <div>
                <label className="text-sm text-slate-300">URL</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                  value={rUrl}
                  onChange={(e) => setRUrl(e.target.value)}
                  placeholder="https://..."
                />
                <div className="mt-1 text-xs text-slate-500">
                  Phase-1: URL. Later we’ll add file upload to Cloudflare R2.
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm text-slate-300">Body</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                  rows={4}
                  value={rBody}
                  onChange={(e) => setRBody(e.target.value)}
                  placeholder="Write notes / mini cheatsheet text…"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <div className="w-32">
                <label className="text-sm text-slate-300">Sort</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                  type="number"
                  value={rSort}
                  onChange={(e) => setRSort(e.target.value)}
                />
              </div>

              <button
                onClick={addResource}
                disabled={savingResource}
                className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-60"
                type="button"
              >
                {savingResource ? "Adding…" : "Add Resource"}
              </button>
            </div>
          </div>

          {/* RESOURCE LIST */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-3">
            <h2 className="text-lg font-semibold">Resources</h2>

            {resources.length === 0 ? (
              <div className="text-sm text-slate-400">No resources yet.</div>
            ) : (
              <div className="space-y-2">
                {resources
                  .slice()
                  .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                  .map((r) => (
                    <div key={r.id} className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="text-xs text-slate-500">{r.type}</div>
                          <div className="font-semibold">{r.title}</div>
                          {r.url ? (
                            <a className="text-sm text-slate-300 underline" href={r.url} target="_blank" rel="noreferrer">
                              Open resource
                            </a>
                          ) : null}
                        </div>

                        <button
                          className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
                          type="button"
                          onClick={() =>
                            updateResource(r.id, { sortOrder: (r.sort_order ?? 0) + 1 })
                          }
                        >
                          +Sort
                        </button>
                      </div>

                      {r.body ? (
                        <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-300">
                          {r.body}
                        </pre>
                      ) : null}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* ADD PRACTICE */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-3">
            <h2 className="text-lg font-semibold">Add Practice</h2>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="text-sm text-slate-300">Title</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  placeholder="Practice: Build a JSX Card"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Language</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                  value={pLang}
                  onChange={(e) => setPLang(e.target.value)}
                  placeholder="js"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300">Prompt</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                rows={4}
                value={pPrompt}
                onChange={(e) => setPPrompt(e.target.value)}
                placeholder="Write a component that…"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Starter Code (optional)</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono"
                rows={4}
                value={pStarter}
                onChange={(e) => setPStarter(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Expected Output (optional)</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                value={pExpected}
                onChange={(e) => setPExpected(e.target.value)}
                placeholder="What should happen / output…"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="w-32">
                <label className="text-sm text-slate-300">Sort</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                  type="number"
                  value={pSort}
                  onChange={(e) => setPSort(e.target.value)}
                />
              </div>

              <button
                onClick={addPractice}
                disabled={savingPractice}
                className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 disabled:opacity-60"
                type="button"
              >
                {savingPractice ? "Adding…" : "Add Practice"}
              </button>
            </div>
          </div>

          {/* PRACTICE LIST */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-3">
            <h2 className="text-lg font-semibold">Practice Tasks</h2>

            {practices.length === 0 ? (
              <div className="text-sm text-slate-400">No practice tasks yet.</div>
            ) : (
              <div className="space-y-2">
                {practices
                  .slice()
                  .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                  .map((p) => (
                    <div key={p.id} className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="text-xs text-slate-500">{p.language || "lang"}</div>
                          <div className="font-semibold">{p.title}</div>
                        </div>

                        <button
                          className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-900"
                          type="button"
                          onClick={() =>
                            updatePractice(p.id, { sortOrder: (p.sort_order ?? 0) + 1 })
                          }
                        >
                          +Sort
                        </button>
                      </div>

                      <div className="mt-2 text-sm text-slate-300 whitespace-pre-wrap">
                        {p.prompt}
                      </div>

                      {p.starter_code ? (
                        <pre className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300 overflow-auto">
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
