import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";

export default function SolutionsPage() {
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const solutions = [
    {
      id: 1,
      title: "Custom Software Development",
      description: "Build scalable, enterprise-grade applications tailored to your business needs. From web apps to mobile solutions, we deliver cutting-edge technology.",
      tags: ["Web Development", "Mobile Apps", "Enterprise"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      accent: "from-indigo-500 to-purple-600",
      icon: "💻",
      duration: "2-6 months",
      clients: "200+",
    },
    {
      id: 2,
      title: "Cloud Infrastructure & DevOps",
      description: "Modernize your infrastructure with cloud-native solutions. We help you migrate, optimize, and scale your systems for maximum efficiency.",
      tags: ["AWS", "Azure", "Kubernetes"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      accent: "from-cyan-500 to-blue-600",
      icon: "☁️",
      duration: "1-4 months",
      clients: "150+",
      badge: "24/7 Support",
    },
    {
      id: 3,
      title: "AI & Machine Learning Solutions",
      subtitle: "Intelligent Automation",
      description: "Leverage artificial intelligence to automate processes, gain insights, and drive innovation. From chatbots to predictive analytics, we build AI-powered solutions.",
      tags: ["ML Models", "NLP", "Computer Vision"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      accent: "from-emerald-500 to-teal-600",
      icon: "🤖",
      duration: "3-8 months",
      clients: "80+",
    },
  ];

  const services = [
    {
      title: "Full-Stack Development",
      description: "End-to-end development services covering frontend, backend, databases, and integrations with modern tech stacks.",
      icon: "⚡",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      title: "System Architecture",
      description: "Design scalable, maintainable systems that grow with your business. We architect solutions for performance and reliability.",
      icon: "🏗️",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Consulting & Strategy",
      description: "Expert guidance on technology decisions, digital transformation, and optimizing your development processes.",
      icon: "💡",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and maintenance to keep your systems running smoothly and securely.",
      icon: "🔧",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered", icon: "🚀" },
    { value: "98%", label: "Client Satisfaction", icon: "⭐" },
    { value: "50+", label: "Enterprise Clients", icon: "🏢" },
    { value: "15+", label: "Years Experience", icon: "📅" },
  ];

  const faqItems = [
    {
      title: "What technologies do you specialize in?",
      content: "We work with a wide range of modern technologies including React, Node.js, Python, Java, .NET, AWS, Azure, Docker, Kubernetes, and various AI/ML frameworks. Our team stays updated with the latest tools and best practices to deliver cutting-edge solutions.",
    },
    {
      title: "How long does a typical project take?",
      content: "Project timelines vary based on scope and complexity. Simple web applications can take 2-3 months, while enterprise solutions may take 6-12 months. We provide detailed timelines during the initial consultation and maintain transparent communication throughout the project.",
    },
    {
      title: "Do you provide ongoing support after project completion?",
      content: "Yes, we offer comprehensive maintenance and support packages. This includes bug fixes, security updates, performance optimization, feature enhancements, and 24/7 monitoring. We can customize support plans based on your specific needs.",
    },
    {
      title: "Can you work with our existing team?",
      content: "Absolutely! We excel at collaborating with in-house teams. We can augment your existing workforce, provide technical leadership, conduct code reviews, and help upskill your team through knowledge transfer sessions and documentation.",
    },
    {
      title: "What is your development process?",
      content: "We follow agile methodologies with iterative development cycles. Our process includes discovery and planning, design and prototyping, development sprints, regular demos and feedback sessions, testing and QA, deployment, and post-launch support. We maintain transparent communication throughout.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ExpoGraph™
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/academy"
                className="px-6 py-2.5 text-slate-700 font-semibold rounded-md hover:bg-slate-100 transition-all duration-300"
              >
                Academy
              </Link>
              {token ? (
                <Link
                  to={role === "Student" ? "/lms/student" : role === "SuperAdmin" ? "/lms/superadmin" : "/lms/admin"}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 rounded-full mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by 500+ Companies
              </span>
            </motion.div>

            {/* Main Heading with gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                Enterprise IT Solutions
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                That Drive Business Growth
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your business with cutting-edge technology solutions. Trusted by <span className="font-semibold text-indigo-600">500+ companies</span> worldwide
            </motion.p>

            {/* CTA Buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(99, 102, 241, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a Quote
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/academy")}
                className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-md shadow-md hover:shadow-lg border border-slate-200 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Explore Academy
              </motion.button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-white/50 backdrop-blur-sm rounded-md border border-slate-200/50 shadow-xl"
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
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Solutions Section */}
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
                Our Solutions
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive IT services tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, idx) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-md shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-500">
                  {/* Image with overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${solution.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {solution.badge && (
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          {solution.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 text-5xl">{solution.icon}</div>
                  </div>

                  <div className="p-8">
                    {solution.subtitle && (
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${solution.accent} text-white text-xs font-semibold rounded-full mb-4`}>
                        {solution.subtitle}
                      </span>
                    )}
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {solution.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {solution.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {solution.clients}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.tags.map((tag, idx) => (
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
                      className={`w-full py-3 bg-gradient-to-r ${solution.accent} text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
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

      {/* Services Section */}
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
                Our Services
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              End-to-end technology services for your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="h-full p-8 bg-white rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${service.gradient} rounded-md flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
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
              Everything you need to know about our services
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
                className="bg-white rounded-md shadow-md border border-slate-200 overflow-hidden"
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
            className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden shadow-2xl"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-blob"></div>
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Let's discuss how we can help you achieve your technology goals. Get a <span className="font-bold">free consultation</span> today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-indigo-600 font-bold rounded-md shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg"
                >
                  Schedule a Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/academy")}
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-md border-2 border-white hover:bg-white/20 transition-all duration-300 text-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Explore Our Academy
                </motion.button>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free consultation
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No commitment required
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
