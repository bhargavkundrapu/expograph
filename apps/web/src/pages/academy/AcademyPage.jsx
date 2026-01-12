import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiOutlineAcademicCap,
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineGlobe,
  HiOutlinePlay,
  HiOutlineStar,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineChevronRight,
  HiOutlineSparkles,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import { 
  FaRobot,
  FaCloud,
  FaDatabase,
  FaMobile,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleGlow = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05, 
    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.35)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  }
};

// Skeleton Component for loading states
function Skeleton({ className = "" }) {
  return (
    <motion.div
      variants={shimmer}
      animate="animate"
      className={`bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] rounded-xl ${className}`}
    />
  );
}

// Premium Badge Component
function PremiumBadge({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-sm font-medium text-purple-300"
    >
      <HiOutlineSparkles className="w-4 h-4" />
      {children}
    </motion.span>
  );
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value.replace(/\D/g, ""));
      const incrementTime = (duration * 1000) / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, Math.max(incrementTime, 10));
      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Glowing Orb Background Component
function GlowingOrbs() {
  return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-[128px]"
      />
    </div>
  );
}

// Hero Section with Parallax
function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative' }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      
      {/* Glowing Orbs */}
      <GlowingOrbs />

      {/* Content with Parallax */}
      <motion.div 
        style={{ y, opacity, scale }} 
        className="relative z-10 w-full"
      >
        <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-6 mb-16 max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PremiumBadge>🚀 New: AI-Powered Learning Paths</PremiumBadge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug"
            >
              <span className="text-white">Transform Your </span>
              <span className="gradient-text">Career</span>
              <br />
              <span className="text-white">With </span>
              <span className="gradient-text">Expert-Led</span>
              <span className="text-white"> Courses</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto text-balance leading-relaxed"
            >
              Master in-demand skills with hands-on projects, real-world experience through 
              micro-internships, and mentorship from industry professionals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-8"
            >
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(124, 58, 237, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-purple-500/25 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                  Start Learning Free
                    <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <HiOutlinePlay className="w-5 h-5 ml-0.5" />
                </div>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 pt-8"
            >
              {/* Avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </motion.div>
                  ))}
                </div>
                <span className="ml-4 text-gray-400">
                  <strong className="text-white">20K+</strong> students enrolled
                </span>
              </div>

              <div className="h-8 w-px bg-white/20 hidden sm:block" />

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <HiOutlineStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-400">
                  <strong className="text-white">4.9/5</strong> rating
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-white/50"
          />
        </motion.div>
      </motion.div>
      </section>
  );
}

// Stats Section
function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    { value: "20K+", label: "Active Learners", icon: HiOutlineUserGroup },
    { value: "500+", label: "Hours of Content", icon: HiOutlineClock },
    { value: "95%", label: "Success Rate", icon: HiOutlineChartBar },
    { value: "50+", label: "Expert Mentors", icon: HiOutlineAcademicCap },
  ];

  return (
    <section className="relative bg-[#0a0a0f] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-30" />
      
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12"
        >
            {stats.map((stat, idx) => (
            <motion.div
                key={stat.label}
              variants={fadeInUp}
              whileHover="hover"
              initial="initial"
              className="group relative"
            >
              <motion.div 
                variants={scaleGlow}
                className="glass-card rounded-2xl p-8 md:p-10 text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-purple-400" />
                </div>
                
                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                  {inView ? <AnimatedCounter value={stat.value} suffix={stat.value.includes("+") ? "+" : stat.value.includes("%") ? "%" : ""} /> : "0"}
                </div>
                
                {/* Label */}
                <div className="text-base text-gray-400 font-medium leading-relaxed">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </section>
  );
}

// Categories Section
function CategoriesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = [
    {
      title: "AI & Machine Learning",
      description: "Master neural networks, deep learning, and AI applications",
      icon: FaRobot,
      color: "from-purple-500 to-pink-500",
      courses: 24,
    },
    {
      title: "Web Development",
      description: "Build modern web apps with React, Next.js, and more",
      icon: HiOutlineCode,
      color: "from-cyan-500 to-blue-500",
      courses: 38,
    },
    {
      title: "Cloud & DevOps",
      description: "Deploy and scale applications on AWS, GCP, Azure",
      icon: FaCloud,
      color: "from-green-500 to-emerald-500",
      courses: 18,
    },
    {
      title: "Data Science",
      description: "Analyze data, build models, and drive decisions",
      icon: FaDatabase,
      color: "from-orange-500 to-yellow-500",
      courses: 22,
    },
    {
      title: "Mobile Development",
      description: "Create iOS and Android apps with React Native, Flutter",
      icon: FaMobile,
      color: "from-pink-500 to-rose-500",
      courses: 16,
    },
    {
      title: "Cybersecurity",
      description: "Protect systems and data from digital threats",
      icon: FaShieldAlt,
      color: "from-red-500 to-orange-500",
      courses: 14,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial" />
      
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16 max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium">
            Explore Categories
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">Master Any </span>
            <span className="gradient-text">Technology</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Choose from our comprehensive library of courses across the most in-demand technologies
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              variants={fadeInUp}
              whileHover="hover"
              initial="initial"
              className="group relative"
            >
              <motion.div 
                variants={scaleGlow}
                className="glass-card rounded-2xl p-8 md:p-10 h-full cursor-pointer overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Content */}
                <div className="space-y-6 leading-relaxed">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-base text-gray-400">
                    {category.description}
                  </p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-gray-500">{category.courses} courses</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                      Explore
                      <HiOutlineChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Featured Courses Section
function FeaturedCoursesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const courses = [
    {
      title: "Full-Stack Web Development",
      instructor: "Sarah Chen",
      rating: 4.9,
      students: "12.5K",
      duration: "48 hours",
      level: "Intermediate",
      price: "₹4,999",
      originalPrice: "₹9,999",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500",
      tags: ["React", "Node.js"],
    },
    {
      title: "Machine Learning with Python",
      instructor: "Dr. Raj Kumar",
      rating: 4.8,
      students: "8.2K",
      duration: "36 hours",
      level: "Advanced",
      price: "₹5,999",
      originalPrice: "₹12,999",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500",
      tags: ["Python", "TensorFlow"],
    },
    {
      title: "AWS Cloud Practitioner",
      instructor: "Mike Johnson",
      rating: 4.9,
      students: "15.8K",
      duration: "24 hours",
      level: "Beginner",
      price: "₹3,499",
      originalPrice: "₹7,999",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
      tags: ["AWS", "Cloud"],
    },
  ];

  return (
    <section className="relative bg-[#0f0f1a]">
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div className="text-center md:text-left space-y-6 max-w-4xl">
            <span className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium">
              Featured Courses
              </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
              <span className="text-white">Popular </span>
              <span className="gradient-text">Learning Paths</span>
            </h2>
          </div>
          <Link
            to="/courses"
            className="mt-6 md:mt-0 flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            View all courses
            <HiOutlineArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
        >
          {courses.map((course, idx) => (
            <motion.div
              key={course.title}
              variants={fadeInUp}
              whileHover="hover"
              initial="initial"
              className="group"
            >
              <motion.div 
                variants={scaleGlow}
                className="glass-card rounded-2xl overflow-hidden h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-black/50 backdrop-blur text-xs font-medium text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex-1 flex flex-col space-y-6 leading-relaxed">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <HiOutlineStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-white">{course.rating}</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{course.students} students</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    by {course.instructor}
                  </p>

                  <div className="flex items-center gap-5 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <HiOutlineClock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HiOutlineChartBar className="w-4 h-4" />
                      {course.level}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2.5 rounded-lg bg-purple-500/20 text-purple-400 font-medium hover:bg-purple-500/30 transition-colors text-sm"
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience and proven track records.",
      icon: HiOutlineAcademicCap,
    },
    {
      title: "Hands-On Projects",
      description: "Build real-world projects that you can showcase in your portfolio.",
      icon: HiOutlineCode,
    },
    {
      title: "Verified Certificates",
      description: "Earn recognized certificates that validate your skills to employers.",
      icon: HiOutlineLightningBolt,
    },
    {
      title: "Community Support",
      description: "Join a vibrant community of learners and mentors who help each other grow.",
      icon: HiOutlineUserGroup,
    },
    {
      title: "Micro-Internships",
      description: "Gain real work experience through our curated micro-internship programs.",
      icon: HiOutlineBriefcase,
    },
    {
      title: "AI-Powered Learning",
      description: "Personalized recommendations to help you learn at your own pace.",
      icon: HiOutlineGlobe,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f]">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16 max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
            Why ExpoGraph
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">Everything You Need to </span>
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Our platform combines cutting-edge technology with proven learning methodologies
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
        >
            {features.map((feature, idx) => (
            <motion.div
                key={feature.title}
              variants={fadeInUp}
              whileHover="hover"
              initial="initial"
              className="group"
            >
              <motion.div 
                variants={scaleGlow}
                className="glass-card rounded-2xl p-8 md:p-10 h-full"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-purple-400" />
                </div>
                
                {/* Content */}
                <div className="space-y-6 leading-relaxed">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-400">
                  {feature.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      content: "ExpoGraph's courses helped me transition from a non-tech background to a software engineer role at Google. The hands-on projects were invaluable.",
      avatar: "PS",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Data Scientist at Microsoft",
      content: "The ML courses are exceptional. The curriculum is up-to-date with industry standards and the mentors are incredibly supportive.",
      avatar: "RV",
      rating: 5,
    },
    {
      name: "Ananya Patel",
      role: "Full-Stack Developer",
      content: "I landed my dream job after completing the full-stack bootcamp. The micro-internship experience made all the difference.",
      avatar: "AP",
      rating: 5,
    },
  ];

  return (
    <section className="relative bg-[#0a0a0f]">
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16 max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium">
            Success Stories
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">Loved by </span>
            <span className="gradient-text">20,000+ Students</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover="hover"
              className="group"
            >
              <motion.div 
                variants={scaleGlow}
                className="glass-card rounded-2xl p-8 md:p-10 h-full"
              >
                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiOutlineStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Content */}
                <div className="space-y-6 leading-relaxed">
                  <p className="text-base text-gray-300">"{testimonial.content}"</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-base">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-[#0f0f1a] to-cyan-900/50" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Glowing Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px]"
      />

      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">Ready to Start Your </span>
            <span className="gradient-text">Journey?</span>
            </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Join 20,000+ learners who are transforming their careers with ExpoGraph. 
              Start learning for free today.
            </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-8">
              <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(124, 58, 237, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-purple-500/25"
              >
                  Get Started Now
              </motion.button>
              </Link>
              <Link to="/solutions">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40 transition-colors text-lg"
              >
                  Explore Solutions
              </motion.button>
              </Link>
          </div>
        </motion.div>
        </div>
      </section>
  );
}

// Trusted By Section
function TrustedBySection() {
  const companies = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple"];

  return (
    <section className="relative bg-[#0a0a0f] border-t border-white/5">
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <p className="text-gray-500 text-sm">Trusted by learners from</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {companies.map((company, idx) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-xl md:text-2xl font-bold text-gray-600 hover:text-gray-400 transition-colors cursor-default"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </section>
  );
}

// Main Academy Page Component
export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <TrustedBySection />
    </div>
  );
}
