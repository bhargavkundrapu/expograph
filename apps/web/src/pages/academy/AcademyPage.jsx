import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { Header } from "../../Components/ui/header-2";
import HeroSection from "../../Components/ui/hero-section-9";
import CallToAction1 from "../../Components/ui/call-to-action-1";
import { FiUsers as Users, FiBriefcase as Briefcase, FiLink as LinkIcon, FiChevronDown } from "react-icons/fi";

const InteractiveRobotSpline = lazy(() =>
  import("../../Components/ui/interactive-3d-robot").then((m) => ({ default: m.InteractiveRobotSpline }))
);
const AcademyMilestoneStepper = lazy(() =>
  import("../../Components/ui/academy-milestone-stepper").then((m) => ({ default: m.AcademyMilestoneStepper }))
);
const UiverseCard = lazy(() => import("../../Components/ui/uiverse-card"));
const TubesBackground = lazy(() =>
  import("../../Components/ui/neon-flow").then((m) => ({ default: m.TubesBackground }))
);
const AcademyFeaturesGrid = lazy(() =>
  import("../../Components/ui/academy-features-grid").then((m) => ({ default: m.AcademyFeaturesGrid }))
);

function SectionSkeleton({ height = "h-96" }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center`}>
      <div className="w-full max-w-4xl mx-auto px-4 space-y-4 animate-pulse">
        <div className="h-4 bg-white/[0.06] rounded-full w-1/4 mx-auto" />
        <div className="h-8 bg-white/[0.06] rounded-full w-2/3 mx-auto" />
        <div className="h-4 bg-white/[0.06] rounded-full w-1/2 mx-auto" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-32 bg-white/[0.04] rounded-2xl" />
          <div className="h-32 bg-white/[0.04] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center animate-pulse">
      <div className="w-full max-w-xl px-8 space-y-6">
        <div className="h-4 bg-white/[0.06] rounded-full w-2/3" />
        <div className="h-12 bg-white/[0.06] rounded-xl w-full" />
        <div className="h-12 bg-white/[0.06] rounded-xl w-3/4" />
        <div className="h-4 bg-white/[0.06] rounded-full w-full mt-6" />
        <div className="h-4 bg-white/[0.06] rounded-full w-4/5" />
        <div className="flex gap-4 mt-8">
          <div className="h-12 bg-white/[0.06] rounded-full w-36" />
          <div className="h-12 bg-white/[0.06] rounded-full w-28" />
        </div>
      </div>
    </div>
  );
}

function LazySection({ children, fallback, rootMargin = "200px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{visible ? children : fallback || <SectionSkeleton />}</div>;
}

const faqData = [
  { q: "What is ExpoGraph Academy?", a: "ExpoGraph Academy is a modern learning platform that teaches you real-world skills through structured lessons, smart prompts, and hands-on projects. You don't just watch — you build." },
  { q: "What are Smart Prompts?", a: "Smart Prompts are structured prompt boxes you can copy and use directly. They help you learn vibe coding — how to think, prompt, and build like a professional developer." },
  { q: "What is the Real Client Lab?", a: "The Real Client Lab connects you with actual clients and real-world projects. You build, deliver, and grow your portfolio with work that matters — not just tutorials." },
  { q: "Do I get a Resume Builder?", a: "Yes! Our built-in Resume Builder helps you create a professional resume using your completed courses, projects, and Real Client Lab work — ready for employers." },
  { q: "How much does it cost?", a: "Individual courses start at just ₹99 and our all-access course pack is only ₹199 — that's less than the price of a coffee for real-world skills, certificates, and career growth. We believe premium education shouldn't come with a premium price tag." },
  { q: "Do I get certificates?", a: "Absolutely. Every course you complete earns you a verifiable certificate with a unique ID — issued by ExpoGraph, a company recognised by MCA, Government of India." },
  { q: "Is there community support?", a: "Yes! Join our community on Instagram, YouTube, and LinkedIn. Connect with fellow learners, get tips, and stay updated on new courses and opportunities." },
  { q: "How is ExpoGraph different from other platforms?", a: "Unlike typical course platforms, ExpoGraph combines structured learning with real client projects, smart AI prompts, and a resume builder — everything you need to actually get hired, not just learn theory." },
];

function SimpleFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = useCallback((i) => setOpenIndex((prev) => (prev === i ? null : i)), []);

  return (
    <div className="space-y-0">
      {faqData.map((item, i) => (
        <div key={i} className="border-b border-white/10">
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center gap-4 py-5 text-left text-white hover:opacity-80 transition-opacity"
          >
            <span className="text-lg md:text-xl text-white/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 text-lg md:text-xl font-medium">{item.q}</span>
            <FiChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
          </button>
          {openIndex === i && (
            <div className="pb-5 pl-12 pr-4 text-base md:text-lg text-white/70 leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AcademyPage() {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen relative w-full"
      style={{
        fontFamily: "var(--font-dm)",
        backgroundColor: "black",
        color: "var(--text-secondary)",
      }}
    >
      <Header />

      <div className="overflow-x-hidden">
        {/* Hero Section — Interactive 3D Robot */}
      <section className="relative w-full min-h-[100dvh] sm:min-h-screen h-screen overflow-hidden bg-black" style={{ backgroundColor: "#000000", maxWidth: "100vw" }}>
        <Suspense fallback={<HeroSkeleton />}>
          <InteractiveRobotSpline
            scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
            className="absolute inset-0 z-0"
          />
        </Suspense>
        <div
          className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 flex items-center justify-center gap-2 min-w-[180px] min-h-[48px] px-6 py-3 bg-black backdrop-blur-sm border border-white/10 rounded-full text-white/70 text-sm font-medium pointer-events-none"
          aria-label="Built with ExpoGraph"
        >
          <span>ExpoGraph Academy</span>
        </div>
        {/* Dark scrim on mobile so text is readable over the 3D robot */}
        <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/70 via-black/40 to-black/70 md:from-transparent md:via-transparent md:to-transparent pointer-events-none" />

        <div className="absolute inset-0 z-10 flex flex-col items-center pt-28 sm:pt-32 md:items-start md:pt-28 lg:pt-32 xl:pt-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 pointer-events-none">
          <div className="text-center md:text-left text-white drop-shadow-lg w-full max-w-full sm:max-w-xl md:max-w-xl lg:max-w-2xl mx-auto md:mx-0 pr-0 md:pr-4">
            <p
              className="text-xs sm:text-sm md:text-base text-white/90 md:text-white/70 font-medium tracking-wide mb-2 sm:mb-2 md:mb-3 animate-[fadeInUp_0.5s_ease-out_both]"
              style={{ fontFamily: "var(--font-dm)", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
            >
              Prompt Smart. Vibe Code. Grow Your Career.
            </p>
            <h1
              className="text-[1.7rem] sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-[1.15] mb-0 md:mb-3 animate-[fadeInLeft_0.6s_ease-out_both]"
              style={{ fontFamily: '"Google Sans Flex", "Google Sans", sans-serif', textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
            >
              Don't Just Learn Code.
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text md:from-white/80 md:to-white/80">Vibe Code It.</span>
            </h1>
            <p
              className="text-sm sm:text-[15px] md:text-lg text-white md:text-white/60 max-w-xs sm:max-w-sm md:max-w-lg mt-12 sm:mt-14 md:mt-0 mb-0 md:mb-6 leading-relaxed mx-auto md:mx-0 animate-[fadeInUp_0.5s_0.1s_ease-out_both]"
              style={{ fontFamily: "var(--font-dm)", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              Master vibe coding with smart prompts, structured lessons, and build for real clients in our Real Client Lab — the fastest way to grow your career.
            </p>
            <div
              className="flex justify-center md:justify-start gap-3 sm:gap-4 md:gap-4 flex-wrap pointer-events-auto mt-14 sm:mt-16 md:mt-0 animate-[fadeInUp_0.6s_0.15s_ease-out_both]"
            >
              <button
                onClick={() => navigate("/courses")}
                className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-6 md:py-3 text-white rounded-full text-sm sm:text-sm md:text-base font-semibold cursor-pointer transition-all hover:brightness-110"
                style={{ fontFamily: "var(--font-dm)", background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
              >
                Start Vibing
              </button>
              <button
                onClick={() => document.getElementById("learn")?.scrollIntoView({ behavior: "smooth" })}
                className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-6 md:py-3 bg-white/10 text-white border border-white/20 rounded-full text-sm sm:text-sm md:text-base font-semibold cursor-pointer transition-all hover:bg-white/20"
                style={{ fontFamily: "var(--font-dm)" }}
              >
                Explore
              </button>
            </div>
            {/* Pricing hook */}
            <div
              className="mt-5 sm:mt-6 md:mt-4 animate-[fadeInUp_0.5s_0.25s_ease-out_both] pointer-events-auto"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
            >
              <button
                onClick={() => navigate("/courses")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/25 cursor-pointer hover:bg-emerald-500/25 transition-colors"
              >
                <span className="text-emerald-400 text-xs sm:text-sm font-bold">Starting at just ₹99</span>
                <span className="text-white/50 text-[10px] sm:text-xs">• Courses from ₹99 | Packs from ₹199</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learn & Get Knowledge Section (HeroSection) */}
      <section id="learn" style={{ backgroundColor: "#000000" }}>
        <HeroSection
          className="!bg-black"
          title={
            <>
              Where learning meets <br /> real-world doing
            </>
          }
          subtitle={
            <>
              At ExpoGraph, you get <strong className="text-white/90">smart prompts</strong>, <strong className="text-white/90">structured lessons</strong>, and a{" "}
              <strong className="text-white/90">Real Client Lab</strong> to build for actual clients — all starting at just{" "}
              <strong className="text-emerald-400">₹99</strong>. You don't just learn — you ship real work and grow your career.
            </>
          }
          actions={[
            {
              text: "Join the Family",
              onClick: () => {
                if (token) navigate("/lms/student/courses");
                else navigate("/login");
              },
              variant: "default",
            },
            {
              text: "Connect with us",
              onClick: () => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" }),
              variant: "outline",
            },
          ]}
          stats={[
            { value: "5K", label: "Active students", icon: <Users className="h-5 w-5 text-muted-foreground" /> },
            { value: "100+", label: "Tutors", icon: <Briefcase className="h-5 w-5 text-muted-foreground" /> },
            {
              value: "Resources",
              label: "",
              icon: <LinkIcon className="h-5 w-5 text-muted-foreground" />,
              onClick: () => document.getElementById("stepper")?.scrollIntoView({ behavior: "smooth" }),
            },
          ]}
          images={[
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop",
          ]}
        />
      </section>

      {/* Officially Recognised — MCA */}
      <section
        className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4 sm:gap-5">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Officially Recognised</h2>
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-10 sm:px-14 py-6 sm:py-8 w-full sm:w-auto">
            <div className="shrink-0 rounded-xl bg-white p-3 sm:p-4">
              <img
                src="https://res.cloudinary.com/da2wrgabu/image/upload/v1772184237/MCA_Logo_3_1_wdhccw.svg"
                alt="Ministry of Corporate Affairs - Government of India"
                className="h-14 sm:h-16 md:h-20 w-auto"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg md:text-xl font-semibold text-white">
                Recognised by{" "}
                <span className="text-amber-400">MCA</span>
              </p>
              <p className="text-sm sm:text-base text-white/60 mt-1">
                Ministry of Corporate Affairs &middot; Government of India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action — Join Academy */}
      <section
        id="cta"
        className="py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24"
        style={{ backgroundColor: "#000000" }}
      >
        <CallToAction1 />
      </section>

      {/* What Features Are There With Us */}
      <section
        id="features"
        className="py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 academy-section-gpu"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-violet-400 mb-3 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5">
            Built For You
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-transparent bg-clip-text">
              succeed
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Powerful tools and real-world experience, all in one place — starting at just <span className="text-emerald-400 font-semibold">₹99</span>
          </p>
        </div>
        <div className="mx-auto max-w-6xl">
          <LazySection fallback={<SectionSkeleton height="h-64" />} rootMargin="300px">
            <Suspense fallback={<SectionSkeleton height="h-64" />}>
              <AcademyFeaturesGrid />
            </Suspense>
          </LazySection>
        </div>
      </section>

      {/* Certification Section */}
      <section
        id="certification"
        className="py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 academy-section-gpu"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-400 mb-3 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5">
            Certified Learning
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Earn certificates that{" "}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-transparent bg-clip-text">
              matter
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Every course you complete comes with a verifiable certificate recognised by MCA — yours for just <span className="text-amber-400 font-semibold">₹99</span>
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 sm:mb-10">
            {/* Certificate card */}
            <div className="relative rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M7 8h10M7 12h6" />
                      <circle cx="17" cy="17" r="4" fill="currentColor" opacity="0.2" />
                      <path d="M15.5 17l1 1 2-2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Course Completion Certificate</h3>
                    <p className="text-xs text-white/60">Issued by ExpoGraph</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    <p className="text-sm text-white/60">Unique certificate ID for each student — verifiable and shareable</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    <p className="text-sm text-white/60">Add directly to your LinkedIn profile and resume</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    <p className="text-sm text-white/60">Issued after completing 100% of course lessons</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    <p className="text-sm text-white/60">Download as professional PDF — ready for employers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L6 6v3c0 5.25 2.55 10.15 6 12 3.45-1.85 6-6.75 6-12V6l-6-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1">Recognised by MCA</h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">ExpoGraph is recognised by the MCA (Ministry of Corporate Affairs), Government of India — your certificates carry weight.</p>
                </div>
              </div>

              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1">Backed by Real Projects</h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">Your certificate isn't just a paper — it's backed by hands-on projects and Real Client Lab work you actually built.</p>
                </div>
              </div>

              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M12 13l-3 9 3-2 3 2-3-9z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1">Industry Recognized Skills</h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">Our courses teach production-level tools and workflows — employers trust the skills you demonstrate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Advantage Banner */}
      <section
        className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 academy-section-gpu"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/5 via-black to-violet-500/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none" />
            <div className="relative px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-1 text-center md:text-left">
                <p className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-emerald-400 mb-3 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                  Why pay more?
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  Premium learning.{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                    Unbeatable price.
                  </span>
                </h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/60 max-w-lg mx-auto md:mx-0 leading-relaxed">
                  Other platforms charge ₹5,000–₹50,000 for the same content. At ExpoGraph, you get structured courses, smart prompts, a resume builder, certificates & real client projects — all for a price anyone can afford.
                </p>
              </div>
              <div className="flex flex-row md:flex-col items-center gap-4 sm:gap-5 shrink-0">
                <button
                  onClick={() => navigate("/courses")}
                  className="flex flex-col items-center justify-center w-32 sm:w-36 h-28 sm:h-32 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors cursor-pointer group"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 group-hover:scale-105 transition-transform">₹99</span>
                  <span className="text-[11px] sm:text-xs text-white/50 mt-1 uppercase tracking-wider">per course</span>
                </button>
                <button
                  onClick={() => navigate("/courses")}
                  className="flex flex-col items-center justify-center w-32 sm:w-36 h-28 sm:h-32 rounded-2xl border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 transition-colors cursor-pointer group"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 group-hover:scale-105 transition-transform">₹199</span>
                  <span className="text-[11px] sm:text-xs text-white/50 mt-1 uppercase tracking-wider">all-access pack</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Stepper Section */}
      <section
        id="stepper"
        className="py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 academy-section-gpu"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-blue-400 mb-3 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
            Your Path
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your journey to becoming{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 text-transparent bg-clip-text">
              career-ready
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            A clear 4-step journey from exploring to shipping real work — start for just <span className="text-blue-400 font-semibold">₹99</span>
          </p>
        </div>
        <div className="text-white/90">
          <Suspense fallback={<SectionSkeleton height="h-80" />}>
            <AcademyMilestoneStepper />
          </Suspense>
        </div>
      </section>

      {/* Community / Connect Section */}
      <section
        id="connect"
        className="py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 academy-section-gpu"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-emerald-400 mb-3 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
            Stay Connected
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Join the{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 text-transparent bg-clip-text">
              vibe
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            You're not just a student — you're part of a growing family of builders, creators, and future leaders
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-10 sm:mb-12">
            <div className="shrink-0">
              <LazySection fallback={<div className="w-64 h-80 rounded-2xl bg-white/[0.04] animate-pulse" />} rootMargin="200px">
                <Suspense fallback={<div className="w-64 h-80 rounded-2xl bg-white/[0.04] animate-pulse" />}>
                  <UiverseCard />
                </Suspense>
              </LazySection>
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {[
                  { value: "5K+", label: "Active Learners", color: "text-emerald-400" },
                  { value: "₹99", label: "Courses From", color: "text-green-400" },
                  { value: "Real", label: "Client Projects", color: "text-teal-400" },
                  { value: "24/7", label: "Community Access", color: "text-cyan-400" },
                ].map((s) => (
                  <div key={s.label} className="text-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-4 sm:py-5 px-3">
                    <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-[11px] sm:text-xs text-white/60 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Social cards — Instagram, YouTube, LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Instagram */}
                <a
                  href="#"
                  className="group relative rounded-2xl border border-fuchsia-500/20 p-5 sm:p-6 transition-all duration-300 hover:border-fuchsia-500/30 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, rgba(253,29,29,0.06) 0%, rgba(252,176,69,0.06) 30%, rgba(131,58,180,0.06) 100%)" }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-60 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(253,29,29,0.08) 0%, rgba(252,176,69,0.08) 30%, rgba(131,58,180,0.08) 100%)" }} />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border border-fuchsia-500/20" style={{ background: "linear-gradient(135deg, rgba(253,29,29,0.15) 0%, rgba(252,176,69,0.15) 30%, rgba(131,58,180,0.15) 100%)" }}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="url(#ig-grad)"><defs><linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#FCAF45" /><stop offset="50%" stopColor="#E1306C" /><stop offset="100%" stopColor="#833AB4" /></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Instagram</h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-3">Reels, tips & student wins on vibe coding.</p>
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium group-hover:gap-2.5 transition-all" style={{ color: "#E1306C" }}>
                      Follow
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  className="group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:scale-[1.02]"
                  style={{ borderColor: "rgba(255,0,0,0.15)", background: "rgba(255,0,0,0.04)" }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-60 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,0,0,0.08) 0%, transparent 60%)" }} />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.2)" }}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1">YouTube</h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-3">Tutorials, course previews & career talks.</p>
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium group-hover:gap-2.5 transition-all" style={{ color: "#FF0000" }}>
                      Subscribe
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  className="group relative rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 sm:p-6 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent rounded-2xl opacity-60 pointer-events-none" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1">LinkedIn</h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-3">Professional updates & career opportunities.</p>
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-400 font-medium group-hover:gap-2.5 transition-all">
                      Connect
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section
        id="faqs"
        className="py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 academy-section-gpu"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <p className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-400 mb-3 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5">
            Got Questions?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            We've got{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text">
              answers
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to know before you start vibing with us
          </p>
        </div>
        <div className="mx-auto max-w-3xl text-white/90">
          <SimpleFAQ />
        </div>
      </section>

      {/* Footer — ExpoGraph flow (TubesBackground) */}
      <footer className="w-full min-h-[560px] sm:min-h-[70vh] border-t border-black">
        <LazySection fallback={<SectionSkeleton height="min-h-[560px]" />} rootMargin="300px">
          <Suspense fallback={<SectionSkeleton height="min-h-[560px]" />}>
            <TubesBackground className="min-h-[560px] sm:min-h-[70vh] bg-[#0a0a0a]" enableClickInteraction={true}>
              <div className="flex flex-col items-center justify-center w-full min-h-[560px] sm:min-h-[70vh] gap-6 text-center px-4">
                <div className="space-y-2 pointer-events-auto cursor-default select-none">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
                    ExpoGraph flow
                  </h2>
                </div>
                <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-white/60 animate-pulse pointer-events-none">
                  <span className="text-xs uppercase tracking-widest">Move the cursor around to interact and Click to randomize.</span>
                  <span className="text-xs text-white/60">© 2024 ExpoGraph Academy</span>
                </div>
              </div>
            </TubesBackground>
          </Suspense>
        </LazySection>
      </footer>
      </div>
    </div>
  );
}
