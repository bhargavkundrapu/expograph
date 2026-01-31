import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";
import { FiMenu, FiX, FiLogIn } from "react-icons/fi";
import "../../styles/academy-tokens.css";
import { InteractiveRobotSpline } from "../../Components/ui/interactive-3d-robot";
import HeroSection from "../../Components/ui/hero-section-9";
import UiverseCard from "../../Components/ui/uiverse-card";
import { TubesBackground } from "../../Components/ui/neon-flow";
import { FiUsers as Users, FiBriefcase as Briefcase, FiLink as LinkIcon } from "react-icons/fi";

export default function AcademyPage() {
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getHomePath = () => {
    if (!token) return "/login";
    if (role === "SuperAdmin") return "/lms/superadmin";
    if (role === "Mentor") return "/lms/mentor";
    if (role === "Student") return "/lms/student";
    return "/login";
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden w-full"
      style={{
        fontFamily: "var(--font-dm)",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-secondary)",
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 left-0 right-0 w-full border-b border-white/10 z-[1000]"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 no-underline shrink-0">
            <div
              className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm md:text-base"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-dm)",
              }}
            >
              EXPOGRAPH
            </div>
            <span
              className="text-xs sm:text-sm md:text-base font-semibold"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm)" }}
            >
              Academy
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" style={{ fontFamily: "var(--font-dm)" }}>
            {token ? (
              <Link to={getHomePath()} className="text-sm xl:text-base text-inherit no-underline opacity-100 hover:opacity-70 transition-opacity" style={{ color: "var(--text-secondary)" }}>Dashboard</Link>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-4 py-2 sm:px-5 sm:py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors border border-white/20"
                style={{
                  backgroundColor: "var(--bg-level-4)",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-dm)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-level-5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-level-4)"; }}
              >
                <FiLogIn className="inline mr-1.5 sm:mr-2" size={14} /> Login
              </button>
            )}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg border border-white/20 flex items-center justify-center"
            style={{ color: "var(--text-secondary)", backgroundColor: "var(--bg-level-4)" }}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 top-[57px] sm:top-[60px] z-[999] bg-black/80 backdrop-blur-sm"
            aria-hidden
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <div
          className={`
            lg:hidden fixed top-[57px] sm:top-[60px] right-0 bottom-0 w-full max-w-[280px] sm:max-w-[320px] z-[1000]
            flex flex-col gap-1 p-4 overflow-y-auto border-l border-white/10
            transition-transform duration-200 ease-out
            ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
          style={{ background: "var(--bg-primary)" }}
        >
          {token ? (
            <Link to={getHomePath()} onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 rounded-lg text-base font-medium hover:bg-white/10 transition-colors" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm)" }}>Dashboard</Link>
          ) : (
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}
              className="mt-2 py-3 px-4 rounded-full text-base font-semibold w-full flex items-center justify-center gap-2 border border-white/20"
              style={{ backgroundColor: "var(--bg-level-4)", color: "var(--text-secondary)", fontFamily: "var(--font-dm)" }}
            >
              <FiLogIn size={18} /> Login
            </button>
          )}
        </div>
      </header>

      {/* Hero Section — Interactive 3D Robot */}
      <section className="relative w-full min-h-[100dvh] sm:min-h-screen h-screen overflow-hidden bg-black" style={{ backgroundColor: "#000000", maxWidth: "100vw" }}>
        <InteractiveRobotSpline
          scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 z-10 flex items-start pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 pointer-events-none">
          <div className="text-left text-white drop-shadow-lg w-full max-w-full sm:max-w-xl md:max-w-xl lg:max-w-2xl pr-2 sm:pr-4">
            <motion.h1
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight mb-4 sm:mb-6"
              style={{ fontFamily: '"Google Sans Flex", "Google Sans", sans-serif' }}
            >
              Transform Your Career with ExpoGraph Academy
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap pointer-events-auto"
            >
              <button
                onClick={() => document.getElementById("learn")?.scrollIntoView({ behavior: "smooth" })}
                className="px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-white/10 text-white border border-white/20 rounded-full text-sm sm:text-base font-semibold cursor-pointer transition-all hover:bg-white/20"
                style={{ fontFamily: "var(--font-dm)" }}
              >
                Learn More
              </button>
              <button
                onClick={() => {
                  if (token) navigate("/lms/student/courses");
                  else navigate("/login");
                }}
                className="px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-white/20 text-white border-none rounded-full text-sm sm:text-base font-semibold cursor-pointer transition-all hover:opacity-90"
                style={{ fontFamily: "var(--font-dm)" }}
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learn & Get Knowledge Section (HeroSection) */}
      <section id="learn" style={{ backgroundColor: "#000000" }}>
        <HeroSection
          className="!bg-black"
          title={
            <>
              A new way to learn <br /> & get knowledge
            </>
          }
          subtitle="ExpoGraph Academy is here for you with various courses & materials from skilled tutors all around the world."
          actions={[
            {
              text: "Join the Class",
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
            { value: "15,2K", label: "Active students", icon: <Users className="h-5 w-5 text-muted-foreground" /> },
            { value: "4,5K", label: "Tutors", icon: <Briefcase className="h-5 w-5 text-muted-foreground" /> },
            { value: "Resources", label: "", icon: <LinkIcon className="h-5 w-5 text-muted-foreground" /> },
          ]}
          images={[
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop",
          ]}
        />
      </section>

      {/* Social / Connect — 3D card (UIVERSE) */}
      <section
        id="connect"
        className="min-h-[100dvh] sm:min-h-screen"
        style={{
          backgroundColor: "#000000",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <UiverseCard />
      </section>

      {/* Footer — ExpoGraph flow (TubesBackground) */}
      <footer className="w-full min-h-[400px] sm:min-h-[50vh] border-t border-black">
        <TubesBackground className="min-h-[400px] sm:min-h-[50vh] bg-[#0a0a0a]" enableClickInteraction={true}>
          <div className="flex flex-col items-center justify-center w-full min-h-[400px] sm:min-h-[50vh] gap-6 text-center px-4">
            <div className="space-y-2 pointer-events-auto cursor-default select-none">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
                ExpoGraph flow
              </h2>
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-white/50 animate-pulse pointer-events-none">
              <span className="text-xs uppercase tracking-widest">Move the cursor around to interact and Click to randomize.</span>
              <span className="text-xs text-white/40">© 2024 ExpoGraph Academy</span>
            </div>
          </div>
        </TubesBackground>
      </footer>
    </div>
  );
}
