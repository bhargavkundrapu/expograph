import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useAuth } from "../../../app/providers/AuthProvider";
import { FiX, FiCopy, FiCheck, FiImage, FiEdit3 } from "react-icons/fi";

const TEMPLATES = [
  {
    id: "lesson",
    label: "Lesson Win",
    emoji: "🎓",
    getText: (name, lesson, course, xp, streak) =>
      `🎓 Just completed "${lesson}" in the ${course} course on @ExpoGraph!\n\n💡 Building real skills, one lesson at a time.\n🔥 ${streak}-day learning streak | ⚡ ${xp.toLocaleString()} XP\n\nStart your learning journey 👉 expograph.in\n\n#ExpoGraph #LearnWithExpoGraph #${course.replace(/\s+/g, "")} #TechLearning #CodingJourney`,
  },
  {
    id: "streak",
    label: "Streak Flex",
    emoji: "🔥",
    getText: (name, lesson, course, xp, streak) =>
      `🔥 ${streak} days of consistent learning on @ExpoGraph!\n\nEvery day I show up, I grow. Today I worked on ${course}.\n\n⚡ ${xp.toLocaleString()} XP earned so far\n📚 The journey to becoming a pro never stops.\n\nJoin me 👉 expograph.in\n\n#ExpoGraph #LearningStreak #${streak}DayStreak #NeverStopLearning #ExpoGraphCommunity`,
  },
  {
    id: "milestone",
    label: "Milestone",
    emoji: "🏆",
    getText: (name, lesson, course, xp, streak) =>
      `🏆 Milestone unlocked on @ExpoGraph!\n\nI've been leveling up my skills in ${course} and the progress feels amazing.\n\n🎯 ${xp.toLocaleString()} XP | 🔥 ${streak}-day streak\n💪 Consistency beats talent every time.\n\nDiscover world-class courses 👉 expograph.in\n\n#ExpoGraph #MilestoneAchieved #TechSkills #ExpoGraphLearner #SkillUp`,
  },
];

function buildLinkedInUrl(text) {
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
}

function buildTwitterUrl(text) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

const PLATFORMS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bg: "bg-[#0A66C2]",
    hover: "hover:bg-[#094ea2]",
    getUrl: (text) => buildLinkedInUrl(text),
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    bg: "bg-[#E1306C]",
    hover: "hover:bg-[#c9285f]",
    getUrl: () => "https://www.instagram.com/create/story",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    bg: "bg-[#1a1a1a]",
    hover: "hover:bg-[#333]",
    getUrl: (text) => buildTwitterUrl(text),
  },
];

export default function ShareProgressModal({ open, onClose, lessonTitle, courseName }) {
  const { isDark } = useTheme();
  const { totalXP, currentStreak } = useGamification();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copied, setCopied] = useState(false);
  const [customCaption, setCustomCaption] = useState("");
  const [editingCaption, setEditingCaption] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  if (!open) return null;

  const userName = user?.fullName || user?.full_name || user?.name || "Student";
  const template = TEMPLATES[selectedTemplate];
  const generatedText = template.getText(userName, lessonTitle || "a lesson", courseName || "ExpoGraph", totalXP, currentStreak);
  const finalText = customCaption.trim() || generatedText;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleShare = (platform) => {
    navigator.clipboard.writeText(finalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    const url = platform.getUrl(finalText);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className={`relative w-full max-w-md max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col ${isDark ? "bg-slate-800" : "bg-white"}`}
        >
          <div className={`px-5 py-4 flex items-center justify-between border-b ${isDark ? "border-slate-700" : "border-slate-100"}`}>
            <div>
              <h2 className={`text-base font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Share Your Progress</h2>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Caption is auto-copied when you share</p>
            </div>
            <button onClick={onClose} className={`p-1.5 rounded-lg transition-colors ${isDark ? "hover:bg-slate-700 text-slate-400" : "hover:bg-slate-100 text-slate-400"}`}>
              <FiX className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            <div className="flex gap-1.5">
              {TEMPLATES.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTemplate(i); setCustomCaption(""); setEditingCaption(false); }}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                    selectedTemplate === i
                      ? isDark ? "bg-slate-700 text-white" : "bg-slate-900 text-white"
                      : isDark ? "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>

            <div className={`rounded-xl border overflow-hidden ${isDark ? "border-slate-700" : "border-slate-200"}`}>
              <div className={`p-4 ${isDark ? "" : "bg-slate-50"}`}>
                {editingCaption ? (
                  <textarea
                    value={customCaption || generatedText}
                    onChange={e => setCustomCaption(e.target.value)}
                    onKeyDown={e => e.stopPropagation()}
                    rows={6}
                    className={`w-full text-xs leading-relaxed bg-transparent border-none outline-none resize-none ${isDark ? "text-slate-200" : "text-slate-700"}`}
                    placeholder="Write your own caption..."
                    autoFocus
                  />
                ) : (
                  <p className={`text-xs leading-relaxed whitespace-pre-wrap ${isDark ? "text-slate-300" : "text-slate-600"}`}>{finalText}</p>
                )}
              </div>

              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Selected" className="w-full max-h-40 object-cover" />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-colors border-t ${
                    isDark ? "border-slate-700 text-slate-500 hover:text-slate-300 hover:bg-slate-700/30" : "border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FiImage className="w-3.5 h-3.5" />
                  Attach a photo or screenshot
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImagePick} className="hidden" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  copied
                    ? "bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-400"
                    : isDark ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {copied ? <><FiCheck className="w-3.5 h-3.5" /> Copied</> : <><FiCopy className="w-3.5 h-3.5" /> Copy</>}
              </button>
              <button
                onClick={() => { setEditingCaption(!editingCaption); if (!editingCaption && !customCaption) setCustomCaption(generatedText); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  editingCaption
                    ? isDark ? "bg-slate-600 text-white" : "bg-slate-900 text-white"
                    : isDark ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <FiEdit3 className="w-3.5 h-3.5" />
                {editingCaption ? "Done" : "Edit caption"}
              </button>
            </div>

            <div className="flex gap-2">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleShare(p)}
                  className={`${p.bg} ${p.hover} text-white flex-1 py-2.5 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.98]`}
                >
                  {p.icon}
                  {p.name}
                </button>
              ))}
            </div>

            <p className={`text-[10px] text-center ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              Caption is auto-copied to clipboard when you click any platform
            </p>

            <div className={`text-center py-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              <p className="text-[10px] font-medium">Tag <strong>@ExpoGraph</strong> to get featured</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
