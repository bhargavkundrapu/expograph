import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import PageTransition from "../../../Components/common/PageTransition";
import { BuyNowModal } from "../../../Components/payments/BuyNowModal";
import {
  FiPlay,
  FiClock,
  FiBookOpen,
  FiCheckCircle,
  FiChevronRight,
  FiArrowLeft,
  FiTarget,
  FiLayers,
  FiStar,
  FiZap,
  FiAward,
  FiTrendingUp,
  FiLock,
  FiTool,
} from "react-icons/fi";
import LearningPath from "../../../Components/student/gamification/LearningPath";

const COURSE_HIGHLIGHTS = [
  { icon: "🛠️", title: "Real-World Projects", desc: "Build portfolio-worthy projects with hands-on guidance" },
  { icon: "🧠", title: "Deep Understanding", desc: "Go beyond tutorials — master the concepts that matter" },
  { icon: "🎯", title: "Industry-Ready Skills", desc: "Learn what top companies actually look for" },
  { icon: "🚀", title: "Career Growth", desc: "Skills that open doors to new opportunities" },
];

const TESTIMONIALS = [
  { name: "Arjun K.", role: "Full Stack Developer", text: "The structured approach helped me build real skills fast. Highly recommended!", rating: 5, avatar: "A" },
  { name: "Priya S.", role: "Frontend Engineer", text: "Best learning experience I've had. The projects were incredibly practical.", rating: 5, avatar: "P" },
  { name: "Rohit M.", role: "Software Engineer", text: "I went from beginner to confidently building apps. ExpoGraph is different.", rating: 5, avatar: "R" },
];

const TOOL_ICONS = {
  react: "⚛️", javascript: "🟨", typescript: "🔷", python: "🐍", "node.js": "🟢",
  html: "🌐", css: "🎨", git: "📦", github: "🐙", docker: "🐳", mongodb: "🍃",
  postgresql: "🐘", firebase: "🔥", aws: "☁️", figma: "🎨", "next.js": "▲",
  "tailwind css": "💨", redux: "💜", graphql: "◈", vscode: "💻", linux: "🐧",
  express: "🟢", vercel: "▲", render: "🌐", vite: "⚡", prisma: "💎",
  jwt: "🔐", stripe: "💳", "socket.io": "🔌", redis: "🔴", playwright: "🎭",
  sentry: "🐛", "neon postgresql": "🐘", bcrypt: "🔒", zod: "✅",
  multer: "📁", sendgrid: "📧", resend: "📨", bullmq: "📋", sharp: "🖼️",
  eslint: "🧹", prettier: "✨", postman: "📮", "ci/cd": "🔄", https: "🔒",
  chatgpt: "🤖", "gpt-4": "🤖", claude: "🤖", gemini: "🤖",
  "ai": "🤖", "prompt engineering": "🤖", "cursor ai": "🤖",
  "problem solving": "🧩", "critical thinking": "💡", "api integration": "🔗",
  default: "🔧",
};

function getToolIcon(name) {
  const key = name.toLowerCase().trim();
  if (TOOL_ICONS[key]) return TOOL_ICONS[key];
  for (const [k, v] of Object.entries(TOOL_ICONS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return TOOL_ICONS.default;
}

const COURSE_TOOLS = {
  "prompt-engineering": [
    "ChatGPT", "GPT-4", "Claude", "Gemini", "Prompt Engineering",
    "AI Image Generation", "AI Video Scripts", "AI Coding",
    "JSON & Data Extraction", "Resume Building with AI",
    "Interview Prep with AI", "Critical Thinking", "Problem Solving",
  ],
  "vibe-coding": [
    "React", "Node.js", "Express", "Neon PostgreSQL", "Vite",
    "Git", "GitHub", "Vercel", "Render", "Tailwind CSS",
    "Prisma", "JWT", "Stripe", "Socket.io", "Docker",
    "Redis", "BullMQ", "Playwright", "Sentry", "ESLint",
    "Prettier", "Postman", "CI/CD", "HTTPS",
  ],
  "ai-automat": [
    "Make.com", "n8n", "APIs", "Webhooks", "ChatGPT",
    "AI Automations", "MCP", "System Prompts", "Google Sheets",
    "Slack", "Gmail", "CRM", "Zapier", "OpenAI API",
    "JSON", "OAuth", "Error Handling", "Freelancing",
  ],
  "profit": [
    "ChatGPT", "Business Copy", "Email Marketing", "Funnel Strategy",
    "Landing Pages", "SEO", "Facebook Ads", "YouTube", "LinkedIn",
    "Twitter", "Instagram", "Copywriting", "Customer Service",
    "SMS Marketing", "Podcast", "GCCF", "3R Loop", "CRAFTED",
  ],
};

function getToolsForCourse(courseSlug, course, modules) {
  const explicit = course?.tools || course?.technologies || course?.tags || course?.skills || [];
  const explicitList = (Array.isArray(explicit) ? explicit : []).map(t => typeof t === "string" ? t : t?.name || "").filter(Boolean);
  if (explicitList.length > 0) return explicitList;

  const slug = (courseSlug || "").toLowerCase();
  for (const [key, tools] of Object.entries(COURSE_TOOLS)) {
    if (slug.includes(key)) return tools;
  }

  const courseTitle = (course?.title || course?.name || "").toLowerCase();
  if (courseTitle.includes("profit") || courseTitle.includes("chatgpt business")) return COURSE_TOOLS["profit"];
  if (courseTitle.includes("automat") || courseTitle.includes("agent")) return COURSE_TOOLS["ai-automat"];
  if (courseTitle.includes("prompt") || courseTitle.includes("ai")) return COURSE_TOOLS["prompt-engineering"];
  if (courseTitle.includes("vibe") || courseTitle.includes("coding") || courseTitle.includes("full")) return COURSE_TOOLS["vibe-coding"];

  const fromModules = new Set();
  (modules || []).forEach(m => {
    const text = ((m.title || "") + " " + (m.description || "")).toLowerCase();
    Object.keys(TOOL_ICONS).forEach(kw => {
      if (kw !== "default" && kw.length > 2 && text.includes(kw)) {
        fromModules.add(kw.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "));
      }
    });
  });
  if (fromModules.size > 0) return Array.from(fromModules);

  return ["Problem Solving", "Practical Application", "Industry Knowledge", "Portfolio Projects"];
}

const BONUS_COURSE_SLUG = "ai-automations";

function isBonusCourseSlug(slug) {
  if (!slug) return false;
  const s = String(slug).toLowerCase().replace(/_/g, "-");
  return s === BONUS_COURSE_SLUG || s.includes("ai-automation");
}

export default function StudentCourseLanding() {
  const { courseSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { token, user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (!token || !courseSlug) return;
    fetchCourseData();
  }, [token, courseSlug]);

  // Redirect to lesson page when ?continue=1 (e.g. from Courses list "Continue Learning" button)
  useEffect(() => {
    if (loading || !isEnrolled || !course || !modules.length) return;
    if (searchParams.get("continue") !== "1") return;
    const continueLesson = modules.flatMap(m => m.lessons || []).find(l => !l.completed) || modules[0]?.lessons?.[0];
    if (!continueLesson?.slug) return;
    const mod = modules.find(m => m.lessons?.some(l => l.id === continueLesson.id || l.slug === continueLesson.slug));
    if (mod?.slug) {
      setSearchParams({}, { replace: true });
      navigate(`/lms/student/courses/${courseSlug}/modules/${mod.slug}/lessons/${continueLesson.slug}`, { replace: true });
    }
  }, [loading, isEnrolled, course, modules, courseSlug, searchParams, setSearchParams, navigate]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);

      const coursesListRes = await apiFetch("/api/v1/student/courses", { token }).catch(() => ({ data: [] }));
      const coursesList = coursesListRes?.data || [];
      const slugAliases = { "ai-agents": "ai-automations", "vibe-coading": "vibe-coding" };
      const apiSlug = slugAliases[courseSlug] || courseSlug;
      const courseFromList = coursesList.find(
        c => c.slug === courseSlug || c.slug === apiSlug || courseSlug.startsWith(c.slug) || c.slug.startsWith(courseSlug)
      );
      const enrolled = courseFromList?.enrolled === true;
      setIsEnrolled(enrolled);

      let cData = null;
      let mods = [];

      if (enrolled) {
        const slugForApi = courseFromList?.slug || apiSlug;
        const courseRes = await apiFetch(`/api/v1/student/courses/${slugForApi}`, { token }).catch(() => null);
        cData = courseRes?.data?.course || courseRes?.data || null;
        mods = cData?.modules || [];
      }

      if (!cData && courseFromList) {
        cData = { ...courseFromList };
      }
      if (!cData) {
        cData = { title: courseSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), slug: courseSlug };
      }

      setCourse(cData);
      setModules(mods);
    } catch (e) {
      console.error("Failed to fetch course data:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <GenericPageSkeleton />;

  const isLocked = !isEnrolled;
  const courseTitle = course?.title || course?.name || courseSlug;
  const totalLessons = isLocked
    ? (course?.total_lessons || 0)
    : modules.reduce((sum, m) => sum + (m.lessons?.length || m.totalLessons || 0), 0);
  const completedLessons = modules.reduce((sum, m) => sum + (m.lessons?.filter(l => l.completed)?.length || m.completedLessons || 0), 0);
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : (course?.progress || 0);
  const modulesCount = isLocked ? (course?.modules_count || 0) : modules.length;
  const estimatedHours = Math.max(1, Math.round(((totalLessons || 10) * 15) / 60));

  const toolsList = getToolsForCourse(courseSlug, course, modules);

  const continueLesson = modules.flatMap(m => m.lessons || []).find(l => !l.completed) || modules[0]?.lessons?.[0];

  const isBonusLocked = isLocked && isBonusCourseSlug(courseSlug);

  const goToLesson = (mod, lesson) => {
    if (isLocked) {
      if (isBonusLocked) {
        navigate("/courses");
        return;
      }
      setShowBuyModal(true);
      return;
    }
    if (mod?.slug && lesson?.slug) {
      navigate(`/lms/student/courses/${courseSlug}/modules/${mod.slug}/lessons/${lesson.slug}`);
    }
  };

  const priceRupees = course?.price_in_paise ? Math.round(course.price_in_paise / 100) : 0;

  return (
    <PageTransition>
      <div className={`min-h-screen transition-colors ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-blue-900/40" : "bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100"}`} />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <button
              onClick={() => navigate(isBonusLocked ? "/lms/student/bonus-courses" : "/lms/student/courses")}
              className={`flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              <FiArrowLeft className="w-4 h-4" /> {isBonusLocked ? "Back to Bonus Courses" : "Back to Courses"}
            </button>

            <div className="max-w-5xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${isDark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}>
                  {isBonusLocked ? "Bonus Course" : "Course"}
                </span>
                {isLocked && (
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${isDark ? "bg-amber-500/20 text-amber-300" : "bg-amber-100 text-amber-700"}`}>
                    <FiLock className="w-3 h-3" /> {isBonusLocked ? "Locked" : "Preview"}
                  </span>
                )}
                {!isLocked && progressPct > 0 && (
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isDark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-700"}`}>
                    {progressPct}% Complete
                  </span>
                )}
              </div>

              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                {courseTitle}
              </h1>
              <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mb-6 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {course?.description || "Master the concepts and build real-world skills with hands-on projects and expert guidance from ExpoGraph."}
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
                {totalLessons > 0 && (
                  <div className={`flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    <FiBookOpen className="w-4 h-4 text-indigo-500" /> {totalLessons} Lessons
                  </div>
                )}
                {modulesCount > 0 && (
                  <div className={`flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    <FiLayers className="w-4 h-4 text-purple-500" /> {modulesCount} Modules
                  </div>
                )}
                <div className={`flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  <FiClock className="w-4 h-4 text-amber-500" /> ~{estimatedHours}h
                </div>
                <div className={`flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  <FiAward className="w-4 h-4 text-emerald-500" /> Certificate
                </div>
              </div>

              {isLocked ? (
                isBonusLocked ? (
                  <div className="space-y-3">
                    <p className={`text-sm max-w-xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      This bonus course unlocks when you buy the <strong>All Pack</strong> or all three courses: Vibe Coding, Prompt Engineering, and Prompt to Profit. It is not sold separately.
                    </p>
                    <button
                      onClick={() => navigate("/courses")}
                      className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl transition-all text-base shadow-lg hover:shadow-xl flex items-center gap-2.5"
                    >
                      <FiLock className="w-5 h-5" />
                      Get All Pack or All 3 Courses to Unlock
                    </button>
                    <button
                      onClick={() => navigate("/lms/student/bonus-courses")}
                      className="block text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      ← Back to Bonus Courses
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowBuyModal(true)}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all text-base shadow-lg hover:shadow-xl flex items-center gap-2.5"
                  >
                    <FiLock className="w-5 h-5" />
                    Enroll Now {priceRupees > 0 && `— ₹${priceRupees}`}
                  </button>
                )
              ) : (
                <button
                  onClick={() => {
                    if (continueLesson) {
                      const mod = modules.find(m => m.lessons?.some(l => l.id === continueLesson.id || l.slug === continueLesson.slug));
                      goToLesson(mod, continueLesson);
                    }
                  }}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all text-base shadow-lg hover:shadow-xl flex items-center gap-2.5"
                >
                  <FiPlay className="w-5 h-5" />
                  {progressPct > 0 ? "Continue Learning" : "Start Course"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar (enrolled only) */}
        {!isLocked && progressPct > 0 && (
          <div className={`px-4 sm:px-6 lg:px-8 py-4 ${isDark ? "bg-slate-800/50" : "bg-white/60"}`}>
            <div className="max-w-5xl flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full bg-green-500"
                />
              </div>
              <span className={`text-xs font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>{progressPct}%</span>
            </div>
          </div>
        )}

        {/* Tools & Technologies You'll Learn */}
        <div className={`px-4 sm:px-6 lg:px-8 py-10 sm:py-12 ${isDark ? "bg-slate-800/30" : "bg-white"}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              <FiTool className="w-5 h-5 text-indigo-500" /> What You'll Learn & Master
            </h2>
            <p className={`text-sm mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Tools, languages, and skills covered in this course
            </p>
            <div className="flex flex-wrap gap-3">
              {toolsList.map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all hover:shadow-md ${
                    isDark ? "bg-slate-800 border-slate-700 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <span className="text-lg">{getToolIcon(tool)}</span>
                  <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>{tool}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* What You'll Gain */}
        <div className={`px-4 sm:px-6 lg:px-8 py-10 sm:py-12 ${isDark ? "" : "bg-slate-50"}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              <FiZap className="w-5 h-5 text-amber-500" /> What You'll Gain
            </h2>
            <p className={`text-sm mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              This course is designed to take you from concept to creation
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COURSE_HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-xl p-5 border transition-all hover:shadow-md ${isDark ? "bg-slate-800 border-slate-700 hover:border-slate-600" : "bg-white border-slate-200 hover:border-indigo-200"}`}
                >
                  <span className="text-2xl mb-3 block">{h.icon}</span>
                  <h3 className={`text-sm font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>{h.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Reviews */}
        <div className={`px-4 sm:px-6 lg:px-8 py-10 sm:py-12 ${isDark ? "bg-slate-800/30" : "bg-white"}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              <FiStar className="w-5 h-5 text-amber-500" /> What Students Say
            </h2>
            <p className={`text-sm mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Hear from learners who transformed their skills with ExpoGraph
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`rounded-xl p-5 border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }, (_, j) => (
                      <FiStar key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className={`text-xs leading-relaxed mb-4 italic ${isDark ? "text-slate-300" : "text-slate-600"}`}>"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[11px] font-bold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${isDark ? "text-white" : "text-slate-800"}`}>{t.name}</p>
                      <p className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Module Roadmap — only for enrolled users */}
        {!isLocked && modules.length > 0 && (
          <div className={`px-4 sm:px-6 lg:px-8 py-10 sm:py-12 ${isDark ? "" : "bg-slate-50"}`}>
            <div className="max-w-5xl mx-auto">
              <h2 className={`text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                <FiTarget className="w-5 h-5 text-purple-500" /> Course Roadmap
              </h2>
              <p className={`text-sm mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Your learning journey — module by module
              </p>

              <div className="max-w-3xl space-y-3">
                {modules.map((mod, mi) => {
                  const modLessons = mod.lessons || [];
                  const completed = modLessons.filter(l => l.completed).length;
                  const total = modLessons.length || mod.totalLessons || 0;
                  const modProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
                  const isComplete = modProgress === 100;

                  return (
                    <motion.div
                      key={mod.id || mi}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: mi * 0.06 }}
                      className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}
                    >
                      <div className="flex items-center gap-3 p-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                          isComplete
                            ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                            : modProgress > 0
                              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400"
                              : isDark ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"
                        }`}>
                          {isComplete ? <FiCheckCircle className="w-5 h-5" /> : mi + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-slate-800"}`}>
                            {mod.title || mod.name || `Module ${mi + 1}`}
                          </p>
                          <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            {total} lesson{total !== 1 ? "s" : ""} {modProgress > 0 && `• ${completed}/${total} done`}
                          </p>
                        </div>
                        {modProgress > 0 && modProgress < 100 && (
                          <div className="w-16">
                            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
                              <div className="h-full rounded-full bg-indigo-500" style={{ width: `${modProgress}%` }} />
                            </div>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            const nextLesson = modLessons.find(l => !l.completed) || modLessons[0];
                            if (nextLesson) goToLesson(mod, nextLesson);
                          }}
                          className={`p-2 rounded-lg flex-shrink-0 transition-colors ${isDark ? "text-slate-400 hover:text-white hover:bg-slate-700" : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"}`}
                        >
                          <FiChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-10">
                <LearningPath
                  modules={modules}
                  courseSlug={courseSlug}
                  onNavigate={(cs, ms, ls) => navigate(`/lms/student/courses/${cs}/modules/${ms}/lessons/${ls}`)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Locked course: show module count teaser */}
        {isLocked && (course?.modules_count > 0 || course?.total_lessons > 0) && (
          <div className={`px-4 sm:px-6 lg:px-8 py-10 sm:py-12 ${isDark ? "" : "bg-slate-50"}`}>
            <div className="max-w-5xl mx-auto text-center">
              <FiTarget className={`w-8 h-8 mx-auto mb-3 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
              <h2 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                {course.modules_count || 10} Modules • {course.total_lessons || totalLessons} Lessons
              </h2>
              <p className={`text-sm mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Enroll to unlock the full course roadmap with detailed lesson progress
              </p>
              <button
                onClick={() => setShowBuyModal(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all inline-flex items-center gap-2"
              >
                <FiLock className="w-4 h-4" />
                Unlock Course {priceRupees > 0 && `— ₹${priceRupees}`}
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={`px-4 sm:px-6 lg:px-8 py-10 text-center ${isDark ? "bg-slate-800/50" : "bg-white"}`}>
          <div className="max-w-lg mx-auto">
            <FiTrendingUp className={`w-10 h-10 mx-auto mb-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
            <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              {isLocked ? "Ready to start learning?" : "Ready to level up your skills?"}
            </h3>
            <p className={`text-sm mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {isLocked
                ? (isBonusLocked ? "Unlock with the All Pack or all three main courses." : "Get full access to all lessons, projects, and earn your certificate.")
                : "Every lesson brings you closer to mastery. Start learning now."}
            </p>
            {isLocked ? (
              isBonusLocked ? (
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => navigate("/courses")}
                    className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl transition-all shadow-lg inline-flex items-center gap-2"
                  >
                    <FiLock className="w-5 h-5" />
                    Get All Pack or All 3 Courses to Unlock
                  </button>
                  <button onClick={() => navigate("/lms/student/bonus-courses")} className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                    ← Back to Bonus Courses
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowBuyModal(true)}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <FiLock className="w-5 h-5" />
                  Enroll Now {priceRupees > 0 && `— ₹${priceRupees}`}
                </button>
              )
            ) : (
              <button
                onClick={() => {
                  if (continueLesson) {
                    const mod = modules.find(m => m.lessons?.some(l => l.id === continueLesson.id || l.slug === continueLesson.slug));
                    goToLesson(mod, continueLesson);
                  }
                }}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg inline-flex items-center gap-2"
              >
                <FiPlay className="w-5 h-5" />
                {progressPct > 0 ? "Continue Learning" : "Start Course"}
              </button>
            )}
          </div>
        </div>
      </div>

      <BuyNowModal
        open={showBuyModal && !isBonusLocked}
        onClose={() => setShowBuyModal(false)}
        item={!isBonusLocked && course?.id ? { type: "course", id: course.id, title: courseTitle } : undefined}
        onSuccess={() => {
          setShowBuyModal(false);
          fetchCourseData();
        }}
        prefill={user ? { name: user.fullName || user.full_name || user.name || "", email: user.email, phone: user.phone, college: user.college || "" } : undefined}
        isLoggedIn={!!token}
      />
    </PageTransition>
  );
}
