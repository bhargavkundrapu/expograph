import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineExclamationCircle,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi";

function routeForRole(role) {
  if (role === "SuperAdmin") return "/lms/superadmin";
  if (role === "TenantAdmin") return "/lms/admin";
  if (role === "Mentor") return "/lms/mentor";
  return "/lms/student";
}

// Enhanced Floating Orbs with more colors and movement
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Purple Orb */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"
      />
      {/* Cyan Orb */}
      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 100, -40, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cyan-500/25 rounded-full blur-[110px]"
      />
      {/* Pink Orb */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px]"
      />
      {/* Emerald Orb */}
      <motion.div
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 70, -20, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-emerald-500/15 rounded-full blur-[90px]"
      />
    </div>
  );
}

// Animated Particles Background
function AnimatedParticles() {
  // Pre-generate random values to avoid re-renders
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endY: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          initial={{
            x: `${particle.startX}%`,
            y: `${particle.startY}%`,
            opacity: 0,
          }}
          animate={{
            y: `${particle.endY}%`,
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Shimmer animation for loading states
const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
  }
};

// Enhanced scale glow animation for cards
const scaleGlow = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02, 
    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

// Input focus animation
const inputFocus = {
  initial: { scale: 1 },
  focus: { 
    scale: 1.01,
    transition: { duration: 0.2 }
  }
};

export default function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      nav(routeForRole(data.role), { replace: true });
    } catch (e2) {
      setErr(e2?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-mesh" />
      <FloatingOrbs />
      <AnimatedParticles />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8">
          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md mx-auto"
          >
            {/* Enhanced Card with premium glow */}
            <motion.div
              whileHover="hover"
              initial="initial"
              variants={scaleGlow}
              className="relative glass-card rounded-3xl p-8 md:p-10 lg:p-12 backdrop-blur-xl border border-white/10"
            >
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              {/* Enhanced Logo & Header */}
              <motion.div 
                className="text-center space-y-6 mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/" className="inline-flex items-center gap-3 md:gap-4 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-purple-500/30"
                  >
                    {/* Animated glow around logo */}
                    <motion.div
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/50 to-cyan-500/50 blur-md -z-10"
                    />
                    <HiOutlineAcademicCap className="w-9 h-9 md:w-10 md:h-10 text-white relative z-10" />
                  </motion.div>
                  <div className="flex flex-col items-start">
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-cyan-300 group-hover:to-purple-300 transition-all">
                      ExpoGraph
                    </span>
                    <span className="text-xs text-gray-500 -mt-1">Learning Platform</span>
                  </div>
                </Link>
                
                <div className="space-y-4 pt-4">
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Welcome Back
                  </motion.h1>
                  <motion.p 
                    className="text-gray-400 text-lg md:text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Sign in to continue your learning journey
                  </motion.p>
                </div>
              </motion.div>

              {/* Login Form */}
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Enhanced Email Field */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm md:text-base font-semibold text-gray-300 flex items-center gap-2">
                    <HiOutlineMail className="w-4 h-4" />
                    Email Address
                  </label>
                  <motion.div 
                    className="relative"
                    variants={inputFocus}
                    animate={emailFocused ? "focus" : "initial"}
                  >
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <motion.div
                        animate={emailFocused ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={emailFocused ? "text-purple-500" : "text-gray-500"}
                      >
                        <HiOutlineMail className="w-5 h-5" />
                      </motion.div>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="you@expograph.in"
                      autoComplete="email"
                      required
                      className="w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/30 focus:bg-white/8 transition-all text-base backdrop-blur-sm"
                    />
                    {/* Focus indicator line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: emailFocused ? "100%" : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>

                {/* Enhanced Password Field */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm md:text-base font-semibold text-gray-300 flex items-center gap-2">
                    <HiOutlineLockClosed className="w-4 h-4" />
                    Password
                  </label>
                  <motion.div 
                    className="relative"
                    variants={inputFocus}
                    animate={passwordFocused ? "focus" : "initial"}
                  >
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <motion.div
                        animate={passwordFocused ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={passwordFocused ? "text-purple-500" : "text-gray-500"}
                      >
                        <HiOutlineLockClosed className="w-5 h-5" />
                      </motion.div>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                      className="w-full pl-14 pr-14 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/30 focus:bg-white/8 transition-all text-base backdrop-blur-sm"
                    />
                    {/* Focus indicator line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: passwordFocused ? "100%" : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? (
                        <HiOutlineEyeOff className="w-5 h-5" />
                      ) : (
                        <HiOutlineEye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Enhanced Error Message */}
                <AnimatePresence>
                  {err && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, y: -10, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 text-red-400 text-sm md:text-base backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <HiOutlineExclamationCircle className="w-5 h-5 flex-shrink-0" />
                      </motion.div>
                      <span>{err}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Submit Button with shimmer effect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={loading ? {} : { 
                      scale: 1.02, 
                      boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
                    }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                    className={`relative w-full py-5 rounded-xl font-semibold text-white text-lg flex items-center justify-center gap-3 transition-all mt-8 overflow-hidden group ${
                      loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 shadow-xl shadow-purple-500/30"
                    }`}
                  >
                    {/* Shimmer effect on button */}
                    {!loading && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    )}
                    
                    {/* Progress fill animation */}
                    {loading && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="absolute inset-y-0 left-0 bg-purple-500/40"
                      />
                    )}
                    
                    <span className="relative z-10 flex items-center gap-3">
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <HiOutlineArrowRight className="w-5 h-5" />
                          </motion.div>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </form>

              {/* Enhanced Divider */}
              <motion.div 
                className="my-10 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="text-gray-500 text-sm font-medium px-2">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>

              {/* Enhanced Demo Accounts Info */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-center text-gray-500 text-base font-medium">Demo accounts available</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-center cursor-pointer hover:border-purple-500/30 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-transparent transition-all backdrop-blur-sm"
                    onClick={() => setEmail("admin@expograph.in")}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <HiOutlineUser className="w-5 h-5 text-purple-400" />
                        <div className="text-purple-400 font-bold text-base">SuperAdmin</div>
                      </div>
                      <div className="text-gray-500 text-sm font-mono">admin@expograph.in</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-center cursor-pointer hover:border-cyan-500/30 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-transparent transition-all backdrop-blur-sm"
                    onClick={() => setEmail("student@expograph.in")}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <HiOutlineUser className="w-5 h-5 text-cyan-400" />
                        <div className="text-cyan-400 font-bold text-base">Student</div>
                      </div>
                      <div className="text-gray-500 text-sm font-mono">student@expograph.in</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Footer */}
              <motion.div 
                className="mt-12 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <HiOutlineShieldCheck className="w-4 h-4 text-emerald-400" />
                  </motion.div>
                  <span>Secure authentication powered by <span className="text-purple-400 font-semibold">ExpoGraph</span></span>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Back to Academy Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-center mt-10"
            >
              <Link
                to="/academy"
                className="group inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-base"
              >
                <motion.div
                  animate={{ x: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HiOutlineArrowRight className="w-4 h-4 rotate-180" />
                </motion.div>
                <span className="group-hover:underline">Back to Academy</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
