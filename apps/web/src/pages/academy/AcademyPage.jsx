import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";

export default function AcademyPage() {
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const programs = [
    {
      id: 1,
      title: "ExpoGraph Academy",
      description: "Comprehensive learning path designed for students and early professionals. Master fundamentals and build real-world projects with industry mentors.",
      tags: ["Post 12th", "Intermediate", "1st-3rd Year"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      accent: "from-blue-500 to-indigo-600",
      icon: "🎓",
      duration: "6-12 months",
      students: "2,400+",
    },
    {
      id: 2,
      title: "ExpoGraph Intensive",
      description: "Deep-dive bootcamp for graduates and final-year students. Accelerate your career with intensive, hands-on training and guaranteed placement support.",
      tags: ["Graduates", "Final Year", "Any Branch"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      accent: "from-emerald-500 to-teal-600",
      icon: "⚡",
      duration: "3-6 months",
      students: "1,850+",
      badge: "Online / Offline",
    },
    {
      id: 3,
      title: "NIAT",
      subtitle: "Innovation in Advanced Technologies",
      description: "Industry-ready upskilling program for students pursuing PCM. Learn cutting-edge technologies at your own pace with personalized mentorship.",
      tags: ["Post 12th (PCM)", "ICSE/CBSE"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      accent: "from-amber-500 to-orange-600",
      icon: "🚀",
      duration: "4-8 months",
      students: "1,200+",
    },
  ];

  const features = [
    {
      title: "Industry-Relevant Curriculum",
      description: "Courses designed by industry experts and updated regularly to match current market demands and emerging technologies.",
      icon: "📚",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      title: "Hands-On Projects",
      description: "Build real-world projects that showcase your skills and enhance your portfolio with live deployments.",
      icon: "💼",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Expert Mentorship",
      description: "Learn from experienced professionals who guide you through your learning journey with 1-on-1 sessions.",
      icon: "👥",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Career Support",
      description: "Get assistance with resume building, interview preparation, and job placement with our hiring partners.",
      icon: "🎯",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  const stats = [
    { value: "5,500+", label: "Students Enrolled", icon: "👨‍🎓" },
    { value: "92%", label: "Placement Rate", icon: "📈" },
    { value: "150+", label: "Hiring Partners", icon: "🤝" },
    { value: "4.9/5", label: "Average Rating", icon: "⭐" },
  ];

  const faqItems = [
    {
      title: "What are the prerequisites for joining ExpoGraph Academy?",
      content: "No prior programming experience is required for our beginner courses. We start from the fundamentals and build up. For advanced programs, basic knowledge of programming concepts is recommended. Our team will assess your profile and recommend the best learning path for you.",
    },
    {
      title: "Are the courses self-paced or instructor-led?",
      content: "We offer both options. Most courses are self-paced with recorded lectures available 24/7, but we also provide live sessions twice a week and dedicated mentorship support. Intensive programs include more structured, instructor-led components with daily standups and code reviews.",
    },
    {
      title: "What kind of certificate will I receive?",
      content: "Upon completion, you'll receive a verified industry-recognized certificate that you can add to your LinkedIn profile and resume. Our certificates are recognized by 150+ hiring partners and include blockchain verification for authenticity.",
    },
    {
      title: "Is there a refund policy?",
      content: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with the course content. No questions asked. Contact our support team via email or chat for immediate assistance with refund processing.",
    },
    {
      title: "How do I get started?",
      content: "Simply click the 'Get Started' button, create your account in under 2 minutes, and browse our course catalog. You can start learning immediately after enrollment. Our onboarding team will guide you through the platform and help you set up your learning goals.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ExpoGraph™
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/solutions"
                className="px-6 py-2.5 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300"
              >
                Solutions
              </Link>
              {token ? (
                <Link
                  to={role === "Student" ? "/lms/student" : role === "SuperAdmin" ? "/lms/superadmin" : "/lms/admin"}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center max-w-5xl mx-auto relative z-10"
          >
            {/* Badge with shine effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                New: OpenAI Academy Partnership
              </span>
            </motion.div>

            {/* Main Heading with gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                Transform Into a
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skilled Software Professional
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join <span className="font-semibold text-blue-600">5,500+ students</span> who have accelerated their careers with our comprehensive, industry-aligned programs
            </motion.p>

            {/* CTA Buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/solutions")}
                className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl shadow-md hover:shadow-lg border border-slate-200 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Explore Solutions
              </motion.button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Programs Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Choose Your Learning Path
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three distinct programs designed for different stages of your journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-500">
                  {/* Image with overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {program.badge && (
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          {program.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 text-5xl">{program.icon}</div>
                  </div>

                  <div className="p-8">
                    {program.subtitle && (
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${program.accent} text-white text-xs font-semibold rounded-full mb-4`}>
                        {program.subtitle}
                      </span>
                    )}
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {program.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {program.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {program.students}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {program.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 bg-gradient-to-r ${program.accent} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Learn More
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Why Choose ExpoGraph
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to succeed in your tech career
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="h-full p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about our programs
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 pr-8">
                    {item.title}
                  </span>
                  <svg
                    className={`w-6 h-6 text-slate-400 transition-transform flex-shrink-0 ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === idx ? "auto" : 0,
                    opacity: expandedFaq === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden shadow-2xl"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-blob"></div>
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join <span className="font-bold">5,500+ students</span> building their future in technology. Start learning today with a <span className="font-bold">7-day free trial</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/solutions")}
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white hover:bg-white/20 transition-all duration-300 text-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Explore Solutions
                </motion.button>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes blob {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          25% { 
            transform: translate(20px, -50px) scale(1.1); 
          }
          50% { 
            transform: translate(-20px, 20px) scale(0.9); 
          }
          75% { 
            transform: translate(50px, 50px) scale(1.05); 
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}