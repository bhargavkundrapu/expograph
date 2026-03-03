import {
  FiTarget, FiBriefcase, FiHeart, FiZap, FiCheckCircle,
  FiBookOpen, FiAlertCircle, FiStar, FiArrowRight,
} from "react-icons/fi";

const BLOCK_STYLES = {
  hero: "bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 rounded-2xl p-8 md:p-10 text-white shadow-xl",
  intro: "bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-700",
  section: {
    blue: "border-l-4 border-l-blue-500 bg-blue-50/50 rounded-r-xl p-5",
    indigo: "border-l-4 border-l-indigo-500 bg-indigo-50/50 rounded-r-xl p-5",
    amber: "border-l-4 border-l-amber-500 bg-amber-50/50 rounded-r-xl p-5",
    emerald: "border-l-4 border-l-emerald-500 bg-emerald-50/50 rounded-r-xl p-5",
    violet: "border-l-4 border-l-violet-500 bg-violet-50/50 rounded-r-xl p-5",
    rose: "border-l-4 border-l-rose-500 bg-rose-50/50 rounded-r-xl p-5",
    teal: "border-l-4 border-l-teal-500 bg-teal-50/50 rounded-r-xl p-5",
    orange: "border-l-4 border-l-orange-500 bg-orange-50/50 rounded-r-xl p-5",
  },
  tip: "bg-amber-50 border-2 border-amber-200 rounded-xl p-5",
  flow: "bg-white border-2 border-indigo-200 rounded-xl p-6",
  closing: "bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-lg",
};

const ICONS = {
  target: FiTarget,
  briefcase: FiBriefcase,
  heart: FiHeart,
  zap: FiZap,
  check: FiCheckCircle,
  book: FiBookOpen,
  alert: FiAlertCircle,
  star: FiStar,
};

export default function StartLessonBlocks({ blocks, accent = "indigo" }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div id="start-lesson" className="scroll-mt-20 max-w-3xl space-y-5">
      {blocks.map((block, i) => {
        if (!block || typeof block !== "object") return null;
        const { type, title, text, color, icon, steps } = block;

        if (type === "hero") {
          return (
            <div key={i} className={BLOCK_STYLES.hero}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FiHeart className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-white/90">Welcome</span>
              </div>
              <p className="text-xl md:text-2xl font-bold leading-snug">{text}</p>
            </div>
          );
        }

        if (type === "intro") {
          return (
            <div key={i} className={BLOCK_STYLES.intro}>
              <p className="text-base leading-relaxed">{text}</p>
            </div>
          );
        }

        if (type === "section") {
          const style = BLOCK_STYLES.section[color] || BLOCK_STYLES.section.blue;
          const Icon = icon ? ICONS[icon] : FiBookOpen;
          return (
            <div key={i} className={style}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  {title && (
                    <h3 className="font-bold text-slate-900 mb-1.5">{title}</h3>
                  )}
                  <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
                </div>
              </div>
            </div>
          );
        }

        if (type === "tip") {
          return (
            <div key={i} className={BLOCK_STYLES.tip}>
              <div className="flex items-start gap-3">
                <FiStar className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed font-medium">{text}</p>
              </div>
            </div>
          );
        }

        if (type === "flow") {
          return (
            <div key={i} className={BLOCK_STYLES.flow}>
              <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <FiArrowRight className="w-4 h-4" />
                Your learning flow
              </h3>
              {steps && Array.isArray(steps) ? (
                <ol className="space-y-2">
                  {steps.map((s, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {j + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
              )}
            </div>
          );
        }

        if (type === "closing") {
          return (
            <div key={i} className={BLOCK_STYLES.closing}>
              <div className="flex items-center gap-3 mb-2">
                <FiCheckCircle className="w-6 h-6" />
                <span className="font-bold text-lg">You've got this</span>
              </div>
              <p className="text-white/95 text-base leading-relaxed">{text}</p>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
