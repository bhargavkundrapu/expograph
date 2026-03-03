import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../Components/ui/header-2";
import { TubesBackground } from "../../Components/ui/neon-flow";
import { COURSE_EXPLORE_DATA } from "../../data/courseExploreData";
import { FiCheck, FiArrowLeft, FiBookOpen, FiZap, FiTarget, FiTool, FiAward } from "react-icons/fi";
import { cn } from "../../lib/utils";

export default function CourseExplorePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = COURSE_EXPLORE_DATA[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-slate-400">Course not found</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 pt-24 sm:pt-28 pb-12 md:pb-24">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>

        {/* Price line — matches third section */}
        <div className="mb-10 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
          <p className="text-sm text-white/60">
            All starting at just <span className="text-emerald-400 font-semibold">₹99</span> — pick individual courses or go all-in with the All Pack for the best value.
          </p>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold",
                data.isPack && "bg-purple-500/15 text-purple-400 border border-purple-500/25",
                data.isBonus && !data.isPack && "bg-amber-500/15 text-amber-400 border border-amber-500/25"
              )}
            >
              {data.isPack ? "BEST VALUE" : data.isBonus ? "BONUS WITH ALL PACK" : "COURSE"}
            </span>
            {data.isPack && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(251,191,36,0.25)]">
                ★ RECOMMENDED
              </span>
            )}
          </div>
          <h1
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent",
              `bg-gradient-to-r ${data.gradient}`
            )}
          >
            {data.title}
          </h1>
          <p className="text-xl text-white/70 mb-2">{data.tagline}</p>
          <p className="text-base text-white/55 max-w-2xl">{data.description}</p>
        </div>

        {/* What is this course */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <FiBookOpen className="w-5 h-5 text-white/70" />
            What is this course?
          </h2>
          <p className="text-white/70 leading-relaxed">{data.whatIs}</p>
        </section>

        {/* Courses included (for pack) or Curriculum */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <FiTarget className="w-5 h-5 text-white/70" />
            {data.isPack ? "Courses Included" : "Curriculum"}
          </h2>
          <ul className="space-y-2">
            {(data.curriculum || data.courses || []).map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/70">
                <FiCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Extra Features (pack only): AI Automations + Real Client Lab highlighted */}
        {data.isPack && data.extraBenefits && (
          <section className="mb-12 p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-purple-300">
              <FiZap className="w-5 h-5 text-purple-400" />
              Extra Features
            </h2>
            <p className="text-sm text-white/60 mb-4">Beyond the core courses — exclusive add-ons included:</p>
            <ul className="space-y-3">
              {data.extraBenefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <FiCheck className="w-5 h-5 text-purple-400 shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Uses */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <FiZap className="w-5 h-5 text-white/70" />
            What you&apos;ll use it for
          </h2>
          <ul className="space-y-2">
            {data.uses.map((use, i) => (
              <li key={i} className="flex items-start gap-3 text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 shrink-0" />
                {use}
              </li>
            ))}
          </ul>
        </section>

        {/* Transformation */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <FiAward className="w-5 h-5 text-white/70" />
            Your transformation
          </h2>
          <p className="text-white/55 mb-4">
            By the end of this course, you&apos;ll move from:
          </p>
          <ul className="space-y-2">
            {data.transformation.map((t, i) => (
              <li key={i} className="flex items-center gap-3 text-white/70">
                <FiCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Why it matters */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            Why this course matters
          </h2>
          <p className="text-white/70 leading-relaxed">{data.importance}</p>
        </section>

        {/* Tools — highlighted */}
        <section className="mb-12 p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-2">
            <FiTool className="w-5 h-5 text-purple-400" />
            Tools & languages you&apos;ll work with
          </h2>
          <p className="text-sm text-white/50 mb-4">Hands-on experience with industry tools — highlighted for your learning:</p>
          <div className="flex flex-wrap gap-2">
            {data.tools.map((tool, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl border border-purple-500/25 bg-purple-500/10 text-sm font-medium text-purple-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 text-center">
          <p className="text-white/60 mb-4">
            {data.isPack
              ? "Get all courses + Real Client Lab + Resume Builder in one pack."
              : data.isBonus
                ? "Get the All Pack to unlock this course + Real Client Lab"
                : "Ready to start? Get this course or the All Pack for everything."}
          </p>
          <button
            onClick={() => navigate("/courses")}
            className={cn(
              "px-8 py-4 rounded-xl font-semibold text-white transition-all",
              `bg-gradient-to-r ${data.gradient}`,
              "hover:opacity-90 hover:scale-[1.02]"
            )}
          >
            View Pricing & Get Started
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 mt-12">
        <TubesBackground className="min-h-[280px] bg-[#0a0a0a]" enableClickInteraction={false}>
          <div className="flex flex-col items-center justify-center min-h-[280px] gap-4 text-center px-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
              ExpoGraph flow
            </h2>
            <span className="text-xs text-white/40">© 2024 ExpoGraph Academy</span>
          </div>
        </TubesBackground>
      </footer>
    </div>
  );
}
