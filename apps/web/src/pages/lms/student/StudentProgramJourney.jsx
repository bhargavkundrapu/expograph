import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { apiFetch } from "../../../services/api";
import PageTransition from "../../../Components/common/PageTransition";
import { BuyNowModal } from "../../../Components/payments/BuyNowModal";
import { getStudentCourseLandingPath, getStudentLessonPath } from "../../../utils/studentCoursePaths";
import { COURSE_EXPLORE_DATA } from "../../../data/courseExploreData";
import { hasLaunchPadAccess } from "../../../utils/launchPadAccess";
import {
  readJourneyPrefs,
  markJourneyVisited,
  summarizeCertificates,
  findVibeCourse,
  findPromptEngineeringCourse,
  findPromptToProfitCourse,
  findBonusAiCourse,
  isMainTrilogyCourse,
  certStageScore,
} from "../../../utils/programJourney";
import {
  FiBookOpen,
  FiCheck,
  FiLock,
  FiChevronDown,
  FiAward,
  FiBriefcase,
  FiZap,
  FiFileText,
  FiTrendingUp,
  FiRefreshCw,
  FiClock,
} from "react-icons/fi";

const ELIGIBLE_URL = "/api/v1/certifications/eligible";
const MY_CERTIFICATES_URL = "/api/v1/lms/certificates/mine";

function resumeDraftKeyForUser(userId) {
  return `expograph_resume_draft_${userId || "anon"}`;
}

function hasResumeDraft(userId) {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(resumeDraftKeyForUser(userId));
    if (!raw || raw === "{}") return false;
    const o = JSON.parse(raw);
    if (!o || typeof o !== "object") return false;
    const str = (x) => typeof x === "string" && x.trim().length > 0;
    if (str(o.fullName) || str(o.professionalTitle) || str(o.summary) || str(o.email) || str(o.phone)) return true;
    if (Array.isArray(o.skills) && o.skills.some((s) => str(String(s)))) return true;
    if (Array.isArray(o.experience) && o.experience.length > 0) return true;
    if (Array.isArray(o.projects) && o.projects.length > 0) return true;
    if (Array.isArray(o.education) && o.education.length > 0) return true;
    return false;
  } catch {
    return false;
  }
}

function exploreSlugForCourse(course) {
  const slug = (course?.slug || "").toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
  if (slug.includes("vibe") && slug.includes("coad")) return "vibe-coding";
  if (slug.includes("vibe")) return "vibe-coding";
  if (slug.includes("prompt-engineering")) return "prompt-engineering";
  if (slug.includes("prompt-to-profit")) return "prompt-to-profit";
  if (slug.includes("ai-automation") || slug.includes("ai-automations")) return "ai-automations";
  return slug;
}

export default function StudentProgramJourney() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { isDark, accent } = useTheme();
  const accentColor = accent?.value || "#818cf8";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [me, setMe] = useState(null);
  const [eligibleCertRows, setEligibleCertRows] = useState([]);
  const [certificateByCourseId, setCertificateByCourseId] = useState({});
  const [prefs, setPrefs] = useState(() => readJourneyPrefs());
  const [prefsTick, setPrefsTick] = useState(0);
  const [expandedStage, setExpandedStage] = useState(null);
  const [buyItem, setBuyItem] = useState(null);
  const [showBuy, setShowBuy] = useState(false);

  const userId = user?.id ?? user?.userId ?? "";

  const refreshPrefs = useCallback(() => {
    setPrefs(readJourneyPrefs());
    setPrefsTick((x) => x + 1);
  }, []);

  const loadAll = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const [coursesRes, meRes, eligibleRes, mineRes] = await Promise.allSettled([
        apiFetch("/api/v1/student/courses", { token }),
        apiFetch("/api/v1/me", { token }).catch(() => null),
        apiFetch(ELIGIBLE_URL, { token }).catch(() => null),
        apiFetch(MY_CERTIFICATES_URL, { token }).catch(() => null),
      ]);

      const list =
        coursesRes.status === "fulfilled" && Array.isArray(coursesRes.value?.data)
          ? coursesRes.value.data
          : [];
      list.sort((a, b) => {
        const mainOrder = (c) => {
          if (isMainTrilogyCourse(c)) {
            if ((c.slug || "").toLowerCase().includes("vibe")) return 0;
            if ((c.title || "").toLowerCase().includes("prompt engineering")) return 1;
            if ((c.slug || "").toLowerCase().includes("prompt-to-profit")) return 2;
            return 1.5;
          }
          return 10;
        };
        return mainOrder(a) - mainOrder(b);
      });
      setCourses(list);

      if (meRes.status === "fulfilled" && meRes.value?.ok) setMe(meRes.value.data || null);
      else setMe(null);

      const elig = eligibleRes.status === "fulfilled" ? eligibleRes.value?.data : [];
      setEligibleCertRows(Array.isArray(elig) ? elig : []);

      const mine = mineRes.status === "fulfilled" ? mineRes.value?.data : [];
      const rows = Array.isArray(mine) ? mine : [];
      const by = {};
      rows.forEach((row) => {
        if (row?.course_id && !by[row.course_id]) by[row.course_id] = row;
      });
      setCertificateByCourseId(by);
    } catch (e) {
      setError(e?.message || "Could not load your program data.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    const onFocus = () => setPrefsTick((x) => x + 1);
    if (typeof window === "undefined") return undefined;
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const certSummary = useMemo(
    () => summarizeCertificates(eligibleCertRows, certificateByCourseId),
    [eligibleCertRows, certificateByCourseId]
  );

  const resumeFilled = useMemo(() => hasResumeDraft(userId), [userId, prefsTick]);

  const launchAccess = hasLaunchPadAccess(me || user);

  const handleBuySuccess = () => {
    setShowBuy(false);
    setBuyItem(null);
    loadAll();
  };

  const openPackFromMe = async () => {
    try {
      const res = await apiFetch("/api/v1/packs", { token }).catch(() => ({ data: [] }));
      const list = Array.isArray(res?.data) ? res.data : [];
      const ap =
        list.find((p) => (p.slug || "").toLowerCase().includes("all-pack")) ||
        list.find((p) => (p.slug || "").toLowerCase().includes("pack")) ||
        list[0];
      if (ap?.id) {
        setBuyItem({ type: "pack", id: ap.id, title: ap.title || "All Pack" });
        setShowBuy(true);
        return;
      }
    } catch {
      /* fall through */
    }
    navigate("/courses#pricing");
  };

  const runContinueForCourse = async (course) => {
    if (!course?.slug) return;
    try {
      const res = await apiFetch(`/api/v1/student/courses/${course.slug}/continue-target`, { token }).catch(() => null);
      const target = res?.data ?? null;
      if (target?.moduleSlug && target?.lessonSlug) {
        navigate(getStudentLessonPath(course.slug, target.moduleSlug, target.lessonSlug));
        return;
      }
      navigate(`${getStudentCourseLandingPath(course.slug)}?continue=1`);
    } catch {
      navigate(`${getStudentCourseLandingPath(course.slug)}?continue=1`);
    }
  };

  const stages = useMemo(() => {
    const vibes = findVibeCourse(courses);
    const pe = findPromptEngineeringCourse(courses);
    const ptp = findPromptToProfitCourse(courses);
    const bonus = findBonusAiCourse(courses);

    const courseStage = (key, step, title, outcome, course) => {
      const enrolled = !!course?.enrolled;
      const pct = enrolled ? Math.min(100, Number(course?.progress) || 0) : 0;
      const done = pct >= 100;
      const explore = course ? exploreSlugForCourse(course) : "";
      const curriculum = (COURSE_EXPLORE_DATA[explore]?.curriculum || []).slice(0, 6);
      return {
        key,
        step,
        title,
        outcome,
        pct,
        done,
        locked: !enrolled,
        course,
        curriculum,
        hours: course ? COURSE_EXPLORE_DATA[explore]?.durationHours : null,
      };
    };

    const certPct = certStageScore(certSummary);
    const certDone = certPct >= 95;

    return [
      courseStage("vibe", "01", "Vibe Coding", "Ship a real build with AI as your copilot.", vibes),
      courseStage("pe", "02", "Prompt Engineering", "Get precise outputs from AI for study, code, and work.", pe),
      courseStage("ptp", "03", "Prompt to Profit", "Package and sell AI-powered value with confidence.", ptp),
      {
        key: "bonus",
        step: "04",
        title: "AI Automations",
        outcome: "Scale workflows (bonus track — parallel after core skills).",
        pct: bonus?.enrolled ? Math.min(100, Number(bonus.progress) || 0) : 0,
        done: bonus?.enrolled && Number(bonus.progress) >= 100,
        locked: !bonus?.enrolled,
        kind: "bonus",
        course: bonus,
        curriculum: (COURSE_EXPLORE_DATA["ai-automations"]?.curriculum || []).slice(0, 6),
        hours: COURSE_EXPLORE_DATA["ai-automations"]?.durationHours,
      },
      {
        key: "certificates",
        step: "05",
        title: "Certification",
        outcome: "Turn completions into credentials you can show employers.",
        pct: certPct,
        done: certDone,
        locked: false,
        kind: "cert",
      },
      {
        key: "client_lab",
        step: "06",
        title: "Real Client Lab",
        outcome: "Practice client-style delivery before the real world.",
        pct: !launchAccess ? 8 : prefs.visited?.client_lab ? 100 : 48,
        done: launchAccess && !!prefs.visited?.client_lab,
        locked: !launchAccess,
        kind: "lab",
      },
      {
        key: "launchpad",
        step: "07",
        title: "Startup LaunchPad",
        outcome: "Structure your startup from clarity to next milestone.",
        pct: !launchAccess ? 8 : prefs.visited?.launchpad ? 100 : 48,
        done: launchAccess && !!prefs.visited?.launchpad,
        locked: !launchAccess,
        kind: "launch",
      },
      {
        key: "resume",
        step: "08",
        title: "Resume & proof",
        outcome: "Reflect new skills in a sharp, downloadable resume.",
        pct: resumeFilled ? 100 : prefs.visited?.resume_builder ? 72 : 28,
        done: resumeFilled,
        locked: false,
        kind: "resume",
      },
      {
        key: "jobs",
        step: "09",
        title: "Jobs Hub",
        outcome: "Put your proof to work in real opportunities.",
        pct: prefs.visited?.jobs_hub ? 100 : 30,
        done: !!prefs.visited?.jobs_hub,
        locked: false,
        kind: "jobs",
      },
    ];
  }, [courses, prefs, certSummary, launchAccess, resumeFilled]);

  const bgPage = isDark ? "bg-slate-950" : "bg-slate-50";
  const cardClass = `${isDark ? "bg-slate-900/90 border-slate-700/80" : "bg-white border-slate-200"} border rounded-2xl shadow-sm`;

  if (loading) {
    return (
      <PageTransition>
        <div className={`min-h-[100dvh] pb-28 md:pb-8 ${bgPage}`}>
          <div className="animate-pulse px-4 pt-6 max-w-lg md:max-w-3xl mx-auto space-y-3">
            <div className={`h-6 w-36 rounded mb-5 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`h-[72px] rounded-2xl ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
            ))}
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className={`min-h-[50vh] flex flex-col items-center justify-center px-4 pb-24 ${bgPage}`}>
          <p className={`text-sm mb-4 ${isDark ? "text-red-400" : "text-red-600"}`}>{error}</p>
          <button
            type="button"
            onClick={loadAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className={`min-h-[100dvh] pb-28 md:pb-10 ${bgPage}`}>
        <div className="px-4 pt-6 max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto space-y-6">
          <section>
            <h1 className={`text-xl sm:text-2xl font-bold mb-1 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              <FiBookOpen className="w-6 h-6 shrink-0" style={{ color: accentColor }} />
              Full roadmap
            </h1>
            <p className={`text-sm mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Your end-to-end path from core courses to certifications, Client Lab, LaunchPad, and job-ready milestones — tap a stage to jump in or see what’s inside.
            </p>
            <div className="space-y-3">
              {stages.map((s) => {
                const open = expandedStage === s.key;
                const isCourse = !!s.course || s.kind === "bonus";
                return (
                  <motion.div layout key={s.key} className={`${cardClass} overflow-hidden`}>
                    <button
                      type="button"
                      onClick={() => setExpandedStage(open ? null : s.key)}
                      className={`w-full flex items-center gap-3 p-4 text-left min-h-[56px] ${isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50"}`}
                      aria-expanded={open}
                    >
                      <div
                        className="relative shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2"
                        style={{
                          borderColor: s.done ? "#22c55e" : s.locked ? (isDark ? "#475569" : "#cbd5e1") : accentColor,
                          color: s.done ? "#22c55e" : s.locked ? (isDark ? "#64748b" : "#94a3b8") : accentColor,
                        }}
                      >
                        {s.done ? <FiCheck className="w-5 h-5" /> : s.locked ? <FiLock className="w-4 h-4" /> : s.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-bold text-sm sm:text-base leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>{s.title}</p>
                        <p className={`text-xs mt-0.5 line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{s.outcome}</p>
                        {s.hours != null && (
                          <p className={`text-[10px] mt-1 font-medium ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                            <FiClock className="inline w-3 h-3 mr-0.5 opacity-70" />
                            ~{s.hours}h estimated
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-bold tabular-nums ${isDark ? "text-slate-300" : "text-slate-600"}`}>{Math.round(s.pct)}%</span>
                        <FiChevronDown
                          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""} ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`px-4 pb-4 pt-0 space-y-3 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                            {isCourse && s.course && !s.locked && (
                              <div className="pt-3 flex flex-col sm:flex-row gap-2">
                                <button
                                  type="button"
                                  onClick={() => runContinueForCourse(s.course)}
                                  className="flex-1 min-h-[44px] rounded-xl bg-indigo-600 text-white text-sm font-bold"
                                >
                                  Continue course
                                </button>
                                <Link
                                  to={getStudentCourseLandingPath(s.course.slug)}
                                  className={`flex-1 min-h-[44px] flex items-center justify-center rounded-xl border text-sm font-semibold ${
                                    isDark ? "border-slate-600 text-slate-200" : "border-slate-300 text-slate-800"
                                  }`}
                                >
                                  Open overview
                                </Link>
                              </div>
                            )}

                            {isCourse && s.locked && s.course && (
                              <div className="pt-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setBuyItem({ type: "course", id: s.course.id, title: s.course.title });
                                    setShowBuy(true);
                                  }}
                                  className="w-full min-h-[44px] rounded-xl bg-violet-600 text-white text-sm font-bold"
                                >
                                  Enroll in {s.title}
                                </button>
                              </div>
                            )}

                            {s.kind === "bonus" && !s.course && (
                              <div className="pt-3 space-y-2">
                                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                  When AI Automations is on your account, it appears in Courses. You can take it in parallel after core skills.
                                </p>
                                <Link
                                  to="/lms/student/courses"
                                  className="flex w-full min-h-[44px] items-center justify-center rounded-xl bg-slate-700 text-white text-sm font-bold dark:bg-slate-600"
                                >
                                  Browse courses
                                </Link>
                              </div>
                            )}

                            {s.kind === "cert" && (
                              <div className="pt-3 flex flex-col sm:flex-row gap-2">
                                <Link
                                  to="/lms/student/certificates"
                                  onClick={() => {
                                    markJourneyVisited("certificates_hub");
                                    refreshPrefs();
                                  }}
                                  className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-cyan-600 text-white text-sm font-bold"
                                >
                                  <FiAward className="w-4 h-4" /> Certificates
                                </Link>
                                <Link
                                  to="/lms/student/courses"
                                  className={`flex-1 min-h-[44px] flex items-center justify-center rounded-xl border text-sm font-semibold ${
                                    isDark ? "border-slate-600 text-slate-200" : "border-slate-300 text-slate-800"
                                  }`}
                                >
                                  <FiBookOpen className="w-4 h-4 mr-1" /> All courses
                                </Link>
                              </div>
                            )}

                            {s.kind === "lab" && (
                              <div className="pt-3 flex flex-col sm:flex-row gap-2">
                                {launchAccess ? (
                                  <Link
                                    to="/lms/student/client-lab"
                                    onClick={() => {
                                      markJourneyVisited("client_lab");
                                      refreshPrefs();
                                    }}
                                    className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-sky-600 text-white text-sm font-bold"
                                  >
                                    <FiBriefcase className="w-4 h-4" /> Open lab
                                  </Link>
                                ) : (
                                  <button type="button" onClick={openPackFromMe} className="w-full min-h-[44px] rounded-xl bg-amber-600 text-white text-sm font-bold">
                                    Unlock with All Pack
                                  </button>
                                )}
                              </div>
                            )}

                            {s.kind === "launch" && (
                              <div className="pt-3">
                                {launchAccess ? (
                                  <Link
                                    to="/lms/startup-launchpad"
                                    onClick={() => {
                                      markJourneyVisited("launchpad");
                                      refreshPrefs();
                                    }}
                                    className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-violet-600 text-white text-sm font-bold"
                                  >
                                    <FiZap className="w-4 h-4" /> LaunchPad
                                  </Link>
                                ) : (
                                  <button type="button" onClick={openPackFromMe} className="w-full min-h-[44px] rounded-xl bg-amber-600 text-white text-sm font-bold">
                                    Unlock LaunchPad
                                  </button>
                                )}
                              </div>
                            )}

                            {s.kind === "resume" && (
                              <Link
                                to="/lms/student/resume-builder"
                                onClick={() => {
                                  markJourneyVisited("resume_builder");
                                  refreshPrefs();
                                }}
                                className={`mt-3 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border text-sm font-bold ${
                                  isDark ? "border-slate-600 text-slate-100" : "border-slate-300 text-slate-900"
                                }`}
                              >
                                <FiFileText className="w-4 h-4" /> Resume Builder
                              </Link>
                            )}

                            {s.kind === "jobs" && (
                              <Link
                                to="/lms/jobs"
                                onClick={() => {
                                  markJourneyVisited("jobs_hub");
                                  refreshPrefs();
                                }}
                                className="mt-3 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-emerald-700 text-white text-sm font-bold"
                              >
                                <FiTrendingUp className="w-4 h-4" /> Jobs Hub
                              </Link>
                            )}

                            {Array.isArray(s.curriculum) && s.curriculum.length > 0 && (
                              <div className="pt-1">
                                <p className={`text-[10px] font-bold uppercase tracking-wide mb-2 ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                  What&apos;s inside
                                </p>
                                <ul className="space-y-1.5">
                                  {s.curriculum.map((line) => (
                                    <li
                                      key={line}
                                      className={`text-xs flex items-start gap-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                                    >
                                      <FiCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" /> {line}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <BuyNowModal
        open={showBuy}
        onClose={() => {
          setShowBuy(false);
          setBuyItem(null);
        }}
        item={buyItem}
        onSuccess={handleBuySuccess}
        prefill={
          user ? { name: user.fullName || user.full_name || user.name || "", email: user.email, phone: user.phone, college: user.college || "" } : undefined
        }
        isLoggedIn={!!token}
      />
    </PageTransition>
  );
}
