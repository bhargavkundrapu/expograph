import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";
import { homePathForRole } from "../../app/roles";

const RESEND_COOLDOWN_SEC = 60;

const LOGO_URL = "https://res.cloudinary.com/da2wrgabu/image/upload/v1772253658/Graph_2_pbetc4.png";

const testimonials = [
  { name: "Arjun S.", role: "Vibe Coding Student", text: "Vibe Coding taught me to build full apps with smart prompts. I shipped my first SaaS in 2 weeks flat." },
  { name: "Priya M.", role: "AI Agents Student", text: "The AI Agents course is next level. I automated my workflow and landed a freelance gig through Real Client Lab." },
  { name: "Rahul K.", role: "CS Student, 3rd Year", text: "Vibe Coding + Prompt Engineering at ₹99 each? I've paid ₹10K+ elsewhere for worse content. Absolute steal." },
  { name: "Sneha D.", role: "Prompt Engineering Student", text: "Prompt Engineering taught me to think like a 10x developer. The resume builder + certificate helped me crack 3 interviews." },
  { name: "Vikram T.", role: "Freelancer", text: "AI Agents + Real Client Lab gave me actual portfolio pieces. No other platform does that at this price point." },
  { name: "Ananya R.", role: "BCA Student", text: "Started with Prompt Engineering, then Vibe Coding — went from zero to building full apps in 8 weeks. Brilliant." },
];

export default function LoginPage() {
  const { requestOtp, login, adminLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [mode, setMode] = useState("student"); // "student" | "admin"

  // Student OTP state
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [emailFocused, setEmailFocused] = useState(false);
  const otpInputRefs = useRef([]);

  // Admin state
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Shared state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
  }, [emailParam]);

  const startResendCooldown = () => {
    setResendSeconds(RESEND_COOLDOWN_SEC);
  };

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const t = setInterval(() => setResendSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendSeconds]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccessMsg("");
    setLoading(false);
  };

  // ─── Student OTP handlers ─────────────────────────────────────
  const handleRequestOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      await requestOtp(email);
      setSuccessMsg("Check your inbox! We've sent you a 6-digit code.");
      setStep(2);
      startResendCooldown();
      setOtp(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    } catch (err) {
      setError(err?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e, codeOverride) => {
    e?.preventDefault?.();
    const code = codeOverride ?? otp.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const data = await login({ email, otp: code });
      navigate(homePathForRole(data.role), { replace: true });
    } catch (err) {
      setError(err?.message || "Invalid code. Please try again or request a new one.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError("");

    if (val && idx < 5) otpInputRefs.current[idx + 1]?.focus();
    if (next.every((d) => d)) {
      const fullCode = next.join("");
      setTimeout(() => handleVerifyOtp(null, fullCode), 0);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const digits = pasted.split("");
    const next = [...otp];
    digits.forEach((d, i) => { next[i] = d; });
    setOtp(next);
    setError("");
    const focusIdx = Math.min(digits.length, 5);
    otpInputRefs.current[focusIdx]?.focus();
    if (digits.length === 6) {
      setTimeout(() => handleVerifyOtp(null, pasted), 0);
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpInputRefs.current[idx - 1]?.focus();
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccessMsg("");
  };

  // ─── Admin password handler ───────────────────────────────────
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await adminLogin({ email: adminEmail, password: adminPassword });
      setAdminEmail("");
      setAdminPassword("");
      navigate(homePathForRole(data.role), { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ fontFamily: "var(--font-dm)", backgroundColor: "#000000" }}
    >
      {/* Ambient background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(168,85,247,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_10%_60%,rgba(88,28,135,0.12),transparent_50%)]" />
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* ═══════ LEFT PANEL — Social Proof (hidden on mobile, visible lg+) ═══════ */}
        <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] flex-col justify-center px-10 xl:px-16 py-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link to="/" className="inline-block mb-8">
              <img src={LOGO_URL} alt="ExpoGraph" className="h-12 w-auto" />
            </Link>

            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-3">
              Where users become{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-transparent bg-clip-text">
                builders
              </span>
            </h2>
            <p className="text-base text-white/50 leading-relaxed mb-8 max-w-md">
              Join 2,000+ users mastering Vibe Coding, Prompt Engineering & AI Agents — with smart prompts and real-world projects, all starting at just ₹99.
            </p>

            {/* Stats row */}
            <div className="flex gap-6 mb-10">
              {[
                { value: "2K+", label: "Active Users" },
                { value: "₹99", label: "Courses From" },
                { value: "100%", label: "Real Projects" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Scrolling testimonials */}
            <div className="space-y-3 overflow-hidden max-h-[320px] relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
              <motion.div
                animate={{ y: [0, -(testimonials.length * 100)] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="space-y-3"
              >
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, s) => (
                        <svg key={s} className="w-3 h-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mb-2">"{t.text}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold text-white">
                        {t.name[0]}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-white/80">{t.name}</span>
                        <span className="text-xs text-white/30 ml-1.5">{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* MCA badge */}
            <div className="mt-8 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L6 6v3c0 5.25 2.55 10.15 6 12 3.45-1.85 6-6.75 6-12V6l-6-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-xs text-white/30">Recognised by MCA, Government of India</span>
            </div>
          </motion.div>
        </div>

        {/* ═══════ RIGHT PANEL — Login Form ═══════ */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Mobile-only: logo + social proof summary */}
            <div className="lg:hidden text-center mb-6">
              <Link to="/" className="inline-block mb-4">
                <img src={LOGO_URL} alt="ExpoGraph" className="h-10 w-auto mx-auto" />
              </Link>
              <div className="flex justify-center gap-5 mb-4">
                {[
                  { value: "2K+", label: "Users" },
                  { value: "₹99", label: "From" },
                  { value: "4.9★", label: "Rating" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-lg font-bold text-white">{s.value}</div>
                    <div className="text-[10px] text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Single review card on mobile */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 mx-auto max-w-xs mb-2">
                <div className="flex items-center gap-1 mb-1.5 justify-center">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-2.5 h-2.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-white/50 leading-relaxed">"Vibe Coding taught me to build full apps with smart prompts. I shipped my first SaaS in 2 weeks flat."</p>
                <span className="text-[10px] text-white/30 mt-1 block">— Arjun S., Vibe Coding Student</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-7 sm:p-8 md:p-10 shadow-[0_0_60px_-12px_rgba(124,58,237,0.15)]">
              {/* Desktop: logo inside card */}
              <div className="text-center mb-6">
                <div className="hidden lg:block mb-4">
                  <Link to="/" className="inline-block">
                    <img src={LOGO_URL} alt="ExpoGraph" className="h-9 w-auto mx-auto" />
                  </Link>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  Welcome Back
                </h1>
                <p className="text-sm text-white/40">
                  Prompt Smart. Vibe Code. Grow Your Career.
                </p>
              </div>

              {/* ── Mode switcher ── */}
              <div className="flex rounded-xl bg-white/[0.04] border border-white/[0.06] p-1 mb-6">
                <button
                  type="button"
                  onClick={() => switchMode("student")}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    mode === "student"
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/20 shadow-sm"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  User Login
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("admin")}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    mode === "admin"
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/20 shadow-sm"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  Admin Login
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {successMsg}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {/* ════════════════ USER OTP LOGIN ════════════════ */}
                {mode === "student" && step === 1 && (
                  <motion.form
                    key="student-step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleRequestOtp}
                    className="space-y-6"
                  >
                    <p className="text-white/40 text-sm text-center -mt-2 mb-2">
                      Sign in with a one-time code sent to your email
                    </p>

                    <div className="flex justify-center gap-2">
                      <div className="h-1.5 w-8 rounded-full bg-violet-500 transition-all duration-300" />
                      <div className="h-1.5 w-2 rounded-full bg-white/10 transition-all duration-300" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            className={`w-5 h-5 transition-colors ${emailFocused ? "text-violet-400" : "text-white/25"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setEmailFocused(true)}
                          onBlur={() => setEmailFocused(false)}
                          required
                          autoComplete="email"
                          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:border-violet-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-white placeholder-white/25"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending code...
                          </>
                        ) : (
                          <>
                            Send verification code
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    {/* Pricing hook below CTA */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/15">
                        <span className="text-emerald-400 text-xs font-semibold">Courses from ₹99</span>
                        <span className="text-white/30 text-[10px]">| Packs from ₹199</span>
                      </span>
                    </div>
                  </motion.form>
                )}

                {mode === "student" && step === 2 && (
                  <motion.form
                    key="student-step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleVerifyOtp}
                    className="space-y-6"
                  >
                    <div className="flex justify-center gap-2 -mt-2">
                      <div className="h-1.5 w-8 rounded-full bg-violet-500 transition-all duration-300" />
                      <div className="h-1.5 w-8 rounded-full bg-violet-500 transition-all duration-300" />
                    </div>

                    <div>
                      <p className="text-sm text-white/50 mb-4">
                        Enter the 6-digit code sent to{" "}
                        <span className="font-semibold text-white/90">{email}</span>
                      </p>
                      <div className="flex justify-center gap-2 sm:gap-3">
                        {[0, 1, 2, 3, 4, 5].map((idx) => (
                          <input
                            key={idx}
                            ref={(el) => (otpInputRefs.current[idx] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={otp[idx]}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            onPaste={handleOtpPaste}
                            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold border border-white/[0.08] rounded-xl focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all bg-white/[0.04] focus:bg-white/[0.06] text-white"
                          />
                        ))}
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading || otp.join("").length !== 6}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Verifying...
                          </>
                        ) : (
                          <>
                            Sign in
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={resendSeconds > 0 || loading}
                        className="text-sm font-medium text-violet-400 hover:text-violet-300 disabled:text-white/20 disabled:cursor-not-allowed transition-colors"
                      >
                        {resendSeconds > 0 ? `Resend code in ${resendSeconds}s` : "Resend code"}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="w-full text-sm text-white/40 hover:text-white/70 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Use a different email
                    </button>
                  </motion.form>
                )}

                {/* ════════════════ ADMIN PASSWORD LOGIN ════════════════ */}
                {mode === "admin" && (
                  <motion.form
                    key="admin-login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleAdminLogin}
                    autoComplete="off"
                    className="space-y-5"
                  >
                    <p className="text-white/40 text-sm text-center -mt-2 mb-2">
                      Sign in with your administrator credentials
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          required
                          autoComplete="off"
                          name="admin-email-nofill"
                          className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:border-violet-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-white placeholder-white/25"
                          placeholder="admin@expograph.in"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                          name="admin-pass-nofill"
                          className="w-full pl-12 pr-12 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:border-violet-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-white placeholder-white/25"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/25 hover:text-white/50 transition-colors"
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-white/10 to-white/5 text-white font-semibold rounded-xl border border-white/[0.08] shadow-lg hover:bg-white/[0.08] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Signing in...
                          </>
                        ) : (
                          <>
                            Sign in as Admin
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.06] to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="mt-8 text-center">
                <Link
                  to="/academy"
                  className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Academy
                </Link>
              </div>
            </div>

            {/* Mobile MCA badge */}
            <div className="lg:hidden mt-5 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]">
                <svg className="w-3.5 h-3.5 text-amber-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L6 6v3c0 5.25 2.55 10.15 6 12 3.45-1.85 6-6.75 6-12V6l-6-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span className="text-[11px] text-white/30">Recognised by MCA, Government of India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
