import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#14b8a6", "#f97316"];
const PARTICLE_COUNT = 60;
const SHAPES = ["circle", "square", "star"];

function randomBetween(a, b) { return a + Math.random() * (b - a); }

export function ConfettiBurst({ active, onDone }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) { setParticles([]); return; }
    const p = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: randomBetween(15, 85),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: randomBetween(5, 12),
      delay: randomBetween(0, 0.4),
      dx: randomBetween(-250, 250),
      dy: randomBetween(-500, -150),
      rotate: randomBetween(0, 1080),
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }));
    setParticles(p);
    const timer = setTimeout(() => { setParticles([]); onDone?.(); }, 2500);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: `${p.x}vw`, y: "50vh", opacity: 1, scale: 1, rotate: 0 }}
              animate={{ x: `calc(${p.x}vw + ${p.dx}px)`, y: `calc(50vh + ${p.dy}px)`, opacity: 0, scale: 0.3, rotate: p.rotate }}
              transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: p.shape === "circle" ? "50%" : p.shape === "star" ? "2px" : "2px",
                backgroundColor: p.color,
                transform: p.shape === "star" ? "rotate(45deg)" : undefined,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

export function XPFloat({ amount, show }) {
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1, y: 0, scale: 0.8 }}
        animate={{ opacity: 0, y: -80, scale: 1.4 }}
        transition={{ duration: 2 }}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 z-[301] pointer-events-none"
      >
        <div className="text-center">
          <span className="text-3xl sm:text-4xl font-black text-amber-400 drop-shadow-lg block">
            +{amount} XP
          </span>
          <span className="text-sm font-bold text-white drop-shadow-md">
            Great work! ⚡
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function LessonCompleteMessage({ show, lessonsLeft, moduleName, onShare, onNext }) {
  if (!show) return null;

  const messages = [
    "Awesome progress! You're building real skills.",
    "Knowledge unlocked! Keep the momentum going.",
    "One step closer to mastery. Well done!",
    "Your dedication is paying off. Keep it up!",
    "Another lesson conquered. You're on fire!",
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 border border-green-200 dark:border-green-500/20"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">✅</span>
        <p className="text-sm font-bold text-green-700 dark:text-green-400">Lesson Complete!</p>
      </div>
      <p className="text-xs text-green-600 dark:text-green-400/80 mb-2">{msg}</p>
      {lessonsLeft !== undefined && (
        <p className="text-[10px] text-green-500 dark:text-green-400/60">
          {lessonsLeft > 0 ? `${lessonsLeft} more lesson${lessonsLeft === 1 ? "" : "s"} in ${moduleName || "this module"}` : "Module complete! 🎉"}
        </p>
      )}
      {onShare && (
        <button
          onClick={onShare}
          className="mt-2 text-[11px] font-semibold text-green-700 dark:text-green-400 hover:underline"
        >
          📤 Share your progress
        </button>
      )}
    </motion.div>
  );
}

export function MilestoneCelebration({ percent, courseName, onClose }) {
  if (!percent) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[250] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.3, opacity: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          onClick={e => e.stopPropagation()}
          className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 sm:p-10 text-center max-w-sm shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-6xl sm:text-7xl mb-4"
          >
            {percent === 100 ? "🏆" : percent === 75 ? "🚀" : percent === 50 ? "⭐" : "🎉"}
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            {percent === 100 ? "Course Complete!" : `${percent}% Milestone!`}
          </h2>
          <p className="text-sm text-white/80 mb-3">{courseName || "Your course"}</p>
          <p className="text-white/60 text-xs leading-relaxed">
            {percent === 100
              ? "Incredible! You've mastered this course. Time to celebrate and start the next adventure."
              : percent === 75
                ? "The finish line is in sight! Just a little more to achieve greatness."
                : percent === 50
                  ? "Halfway through! You've built serious momentum. Don't stop now."
                  : "Great start! Every expert was once a beginner. Keep learning!"}
          </p>
          <div className="flex gap-2 mt-6 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Keep Going! →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
