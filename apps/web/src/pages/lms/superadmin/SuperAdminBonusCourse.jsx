import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import { FiSave, FiLock, FiUnlock, FiBook, FiInfo, FiCheckCircle } from "react-icons/fi";

const RULE_OPTIONS = [
  { value: "all_pack_only", label: "All Pack only", desc: "Unlock only when the user has a pack that includes the bonus course." },
  { value: "all_three_main", label: "All 3 main courses", desc: "Unlock when the user has all three: Vibe Coding, Prompt Engineering, Prompt to Profit." },
  { value: "all_pack_or_all_three", label: "All Pack OR all 3 main", desc: "Unlock when user has All Pack or all three main courses (recommended)." },
  { value: "any_two_main", label: "Any 2 main courses", desc: "Unlock when the user has any two of the three main courses." },
  { value: "any_one_main", label: "Any 1 main course", desc: "Unlock when the user has any one of the three main courses." },
  { value: "custom", label: "Custom (select courses)", desc: "Unlock when the user has all courses you select below." },
];

export default function SuperAdminBonusCourse() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    rule: "all_pack_or_all_three",
    requiredCourseSlugs: [],
    bonusCourseSlug: "ai-automations",
  });
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!token) return;
    load();
  }, [token]);

  const load = async () => {
    try {
      setLoading(true);
      const [configRes, coursesRes] = await Promise.all([
        apiFetch("/api/v1/admin/settings/bonus-course", { token }),
        apiFetch("/api/v1/admin/courses", { token }).catch(() => ({ ok: false, data: [] })),
      ]);
      if (configRes?.ok && configRes.data) {
        setConfig({
          rule: configRes.data.rule || "all_pack_or_all_three",
          requiredCourseSlugs: Array.isArray(configRes.data.requiredCourseSlugs) ? configRes.data.requiredCourseSlugs : [],
          bonusCourseSlug: configRes.data.bonusCourseSlug || "ai-automations",
        });
      }
      if (coursesRes?.ok && Array.isArray(coursesRes.data)) {
        setCourses(coursesRes.data.filter((c) => c.slug));
      }
    } catch (e) {
      console.error(e);
      setMessage({ type: "error", text: "Failed to load settings." });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      const res = await apiFetch("/api/v1/admin/settings/bonus-course", {
        method: "PUT",
        token,
        body: {
          rule: config.rule,
          requiredCourseSlugs: config.rule === "custom" ? (config.requiredCourseSlugs || []) : [],
          bonusCourseSlug: config.bonusCourseSlug || "ai-automations",
        },
      });
      if (res?.ok) {
        setMessage({ type: "success", text: "Bonus course unlock rule saved. Students will see the updated lock/unlock in their LMS." });
      } else {
        setMessage({ type: "error", text: res?.error?.message || "Failed to save." });
      }
    } catch (e) {
      setMessage({ type: "error", text: e?.message || "Failed to save." });
    } finally {
      setSaving(false);
    }
  };

  const toggleCustomSlug = (slug) => {
    const slugNorm = (slug || "").replace(/_/g, "-");
    const current = config.requiredCourseSlugs || [];
    const set = new Set(current.map((s) => (s || "").replace(/_/g, "-")));
    if (set.has(slugNorm)) {
      set.delete(slugNorm);
    } else {
      set.add(slugNorm);
    }
    setConfig({ ...config, requiredCourseSlugs: Array.from(set) });
  };

  if (loading) return <PageLoading message="Loading bonus course settings..." />;

  const mainCourses = courses.filter(
    (c) =>
      (c.slug || "").replace(/_/g, "-").includes("vibe-coding") ||
      (c.slug || "").replace(/_/g, "-").includes("prompt-engineering") ||
      (c.slug || "").replace(/_/g, "-").includes("prompt-to-profit")
  );
  const bonusCourseOptions = courses.length ? courses : [{ id: "ai-automations", title: "AI Automations", slug: "ai-automations" }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <FiLock className="w-8 h-8 text-amber-500" />
            Bonus Course Unlock Rules
          </h1>
          <p className="text-slate-600">
            Control who sees the bonus course as locked or unlocked in the Student LMS. Changes apply immediately.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 space-y-6"
        >
          {/* Bonus course (which course is the "bonus") */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Bonus course</label>
            <select
              value={(config.bonusCourseSlug || "ai-automations").replace(/_/g, "-")}
              onChange={(e) => setConfig({ ...config, bonusCourseSlug: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {bonusCourseOptions.map((c) => (
                <option key={c.id} value={(c.slug || "").replace(/_/g, "-")}>
                  {c.title || c.slug || c.id}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">The course that will be locked/unlocked by the rule below.</p>
          </div>

          {/* Unlock rule */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Unlock when</label>
            <select
              value={config.rule || "all_pack_or_all_three"}
              onChange={(e) => setConfig({ ...config, rule: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {RULE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2 flex items-start gap-1">
              <FiInfo className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              {RULE_OPTIONS.find((o) => o.value === (config.rule || "all_pack_or_all_three"))?.desc}
            </p>
          </div>

          {/* Custom: required courses */}
          {config.rule === "custom" && (
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Required courses (user must have all)</label>
              <p className="text-xs text-slate-500 mb-3">Select which courses the user must own to unlock the bonus course.</p>
              <div className="flex flex-wrap gap-2">
                {courses.map((c) => {
                  const slugNorm = (c.slug || "").replace(/_/g, "-");
                  const selected = (config.requiredCourseSlugs || []).some((s) => (s || "").replace(/_/g, "-") === slugNorm);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCustomSlug(c.slug)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        selected
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-slate-700 border-slate-300 hover:border-indigo-400"
                      }`}
                    >
                      {selected && <FiCheckCircle className="inline w-4 h-4 mr-1.5" />}
                      {c.title || c.slug}
                    </button>
                  );
                })}
              </div>
              {courses.length === 0 && (
                <p className="text-sm text-amber-600">No courses found. Create courses first, then select required ones.</p>
              )}
            </div>
          )}

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? <ButtonLoading size="sm" /> : <FiSave className="w-5 h-5" />}
              Save rule
            </button>
          </div>
        </motion.div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <strong>How it works:</strong> Students see the bonus course on the Bonus Courses page. If the rule is not met, the course appears locked and they cannot open lessons. As soon as they buy the required pack or courses, the bonus course unlocks automatically. You can change the rule anytime; the Student LMS reflects it on next load.
        </div>
      </div>
    </div>
  );
}
