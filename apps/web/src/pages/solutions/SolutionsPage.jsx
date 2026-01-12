import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiOutlineGlobeAlt,
  HiOutlineServer,
  HiOutlineCog,
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineCode,
  HiOutlineDatabase,
  HiOutlineCloud,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineBriefcase,
  HiOutlineSupport,
} from "react-icons/hi";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiVercel,
  SiMongodb,
} from "react-icons/si";

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
    boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.35)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

// Glowing Orbs Background
function GlowingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-emerald-500/15 rounded-full blur-[128px]"
      />
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      
      {/* Glowing Orbs */}
      <GlowingOrbs />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-6 mb-16 max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-sm font-medium text-cyan-300">
                <HiOutlineBriefcase className="w-4 h-4" />
                Enterprise Solutions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug"
            >
              <span className="text-white">ExpoGraph </span>
              <span className="gradient-text">IT Solutions</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto text-balance leading-relaxed"
            >
              We build web apps, internal tools, portals, and SaaS systems with clean engineering,
              speed, and long-term maintainability.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-8"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-cyan-500/25"
              >
                <span className="flex items-center gap-2">
                  Get a Quote
                  <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40 transition-colors"
              >
                View Services
              </motion.a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-8"
            >
              <div className="flex items-center gap-2 md:gap-3 text-gray-400">
                <HiOutlineShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm md:text-base">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-gray-400">
                <HiOutlineClock className="w-5 h-5 text-cyan-400" />
                <span className="text-sm md:text-base">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-gray-400">
                <HiOutlineStar className="w-5 h-5 text-yellow-400" />
                <span className="text-sm md:text-base">99.9% Uptime</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "50+", label: "Projects Delivered", icon: HiOutlineCode },
    { value: "30+", label: "Happy Clients", icon: HiOutlineUserGroup },
    { value: "99.9%", label: "Uptime SLA", icon: HiOutlineChartBar },
    { value: "24/7", label: "Support Available", icon: HiOutlineSupport },
  ];

  return (
    <section className="relative bg-[#0f0f1a] border-y border-white/5">
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center py-6"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-5 text-cyan-400" />
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-base leading-relaxed">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      title: "Web Applications",
      description: "Custom dashboards, admin panels, LMS platforms, and enterprise portals tailored to your business needs.",
      icon: HiOutlineGlobeAlt,
      color: "from-purple-500 to-pink-500",
      features: ["React/Next.js", "TypeScript", "REST & GraphQL APIs"],
    },
    {
      title: "SaaS Systems",
      description: "Multi-tenant architecture with role-based access control, subscription billing, and white-label options.",
      icon: HiOutlineCloud,
      color: "from-cyan-500 to-blue-500",
      features: ["Multi-tenancy", "RBAC", "Stripe Integration"],
    },
    {
      title: "Database Solutions",
      description: "Scalable database architecture, optimization, and migration services for high-performance applications.",
      icon: HiOutlineDatabase,
      color: "from-emerald-500 to-teal-500",
      features: ["PostgreSQL", "MongoDB", "Redis Caching"],
    },
    {
      title: "Cloud Infrastructure",
      description: "AWS, GCP, and Azure deployment with CI/CD pipelines, auto-scaling, and infrastructure as code.",
      icon: HiOutlineServer,
      color: "from-orange-500 to-amber-500",
      features: ["AWS/GCP/Azure", "Docker/K8s", "CI/CD"],
    },
    {
      title: "Maintenance & Scaling",
      description: "Ongoing monitoring, performance optimization, security hardening, and proactive maintenance.",
      icon: HiOutlineCog,
      color: "from-rose-500 to-pink-500",
      features: ["24/7 Monitoring", "Performance Tuning", "Security Audits"],
    },
    {
      title: "Technical Consulting",
      description: "Architecture review, technology selection, deployment strategy, and product roadmap guidance.",
      icon: HiOutlineLightBulb,
      color: "from-violet-500 to-purple-500",
      features: ["Architecture Review", "Tech Strategy", "Code Audits"],
    },
  ];

  return (
    <section id="services" className="relative bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
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
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium">
            Our Services
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">What We </span>
            <span className="gradient-text">Build</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            End-to-end software development services tailored for modern businesses
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              whileHover="hover"
              initial="initial"
              className="group"
            >
              <motion.div 
                variants={scaleGlow}
                className="glass-card rounded-2xl p-8 md:p-10 h-full cursor-pointer overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Content */}
                <div className="space-y-6 leading-relaxed">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-gray-400">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
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

// Tech Stack Section
function TechStackSection() {
  const technologies = [
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-300" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300" },
    { name: "AWS", icon: FaAws, color: "text-orange-400" },
    { name: "Docker", icon: FaDocker, color: "text-blue-400" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
    { name: "Vercel", icon: SiVercel, color: "text-white" },
    { name: "Figma", icon: FaFigma, color: "text-purple-400" },
  ];

  return (
    <section className="relative bg-[#0f0f1a]">
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16 max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium">
            Tech Stack
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">Technologies We </span>
            <span className="gradient-text">Use</span>
          </h2>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-5 lg:gap-6"
        >
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="glass-card rounded-xl p-6 flex flex-col items-center gap-3 cursor-default"
            >
              <tech.icon className={`w-10 h-10 ${tech.color}`} />
              <span className="text-sm text-gray-400">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We analyze your requirements, understand your business goals, and define the project scope.",
    },
    {
      number: "02",
      title: "Design",
      description: "Create wireframes, prototypes, and UI/UX designs that align with your brand and user needs.",
    },
    {
      number: "03",
      title: "Development",
      description: "Build your solution using modern technologies with clean, maintainable code.",
    },
    {
      number: "04",
      title: "Deploy & Support",
      description: "Launch your product with CI/CD pipelines and provide ongoing maintenance and support.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f]">
      <div className="absolute inset-0 bg-dots opacity-20" />
      
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16 max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
            Our Process
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">How We </span>
            <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover="hover"
              className="relative"
            >
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent" />
              )}
              
              <motion.div 
                variants={scaleGlow}
                className="glass-card rounded-2xl p-8 md:p-10 text-center h-full"
              >
                <div className="space-y-6 leading-relaxed">
                  <div className="text-4xl font-bold gradient-text">{step.number}</div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-base text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for MVPs and small projects",
      price: "₹2.5L",
      period: "starting from",
      features: [
        "Single web application",
        "Up to 10 pages/screens",
        "Basic authentication",
        "1 month support",
        "Source code delivery",
      ],
      popular: false,
    },
    {
      name: "Growth",
      description: "For growing businesses and teams",
      price: "₹8L",
      period: "starting from",
      features: [
        "Full-stack application",
        "Admin dashboard",
        "Multi-role authentication",
        "API integration",
        "3 months support",
        "CI/CD pipeline",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large-scale solutions",
      price: "Custom",
      period: "contact us",
      features: [
        "Multi-tenant SaaS",
        "Microservices architecture",
        "Advanced security",
        "Dedicated support team",
        "SLA guarantee",
        "Custom integrations",
      ],
      popular: false,
    },
  ];

  return (
    <section className="relative bg-[#0a0a0f]">
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16 max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium">
            Pricing
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">Transparent </span>
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Flexible engagement models tailored to your project requirements
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover="hover"
              className={`relative ${plan.popular ? "lg:-mt-6 lg:mb-6" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}
              
              <motion.div 
                variants={scaleGlow}
                className={`glass-card rounded-2xl p-8 md:p-10 h-full ${
                  plan.popular ? "border-cyan-500/30 bg-cyan-500/5" : ""
                }`}
              >
                <div className="space-y-6 leading-relaxed">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-base">{plan.description}</p>
                  
                  <div className="py-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-500 text-sm ml-2">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-300 text-base">
                        <HiOutlineCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block w-full py-4 rounded-xl font-semibold text-center transition-colors mt-8 ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-600 to-purple-500 text-white"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    Get Started
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Vikram Mehta",
      role: "CTO, TechStart Inc",
      content: "ExpoGraph delivered our entire platform in just 3 months. Their technical expertise and attention to detail exceeded our expectations.",
      avatar: "VM",
    },
    {
      name: "Priya Reddy",
      role: "Founder, EduLearn",
      content: "The LMS they built for us handles 50K+ students daily without any issues. Exceptional performance and clean code.",
      avatar: "PR",
    },
    {
      name: "Arjun Singh",
      role: "Product Manager, FinTech Co",
      content: "Their consulting helped us choose the right architecture. The system has scaled 10x without any major changes.",
      avatar: "AS",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
      <div className="space-y-12 py-20 md:space-y-16 lg:space-y-20 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16 max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium">
            Testimonials
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-snug">
            <span className="text-white">Client </span>
            <span className="gradient-text">Success Stories</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover="hover"
              className="group"
            >
              <motion.div 
                variants={scaleGlow}
                className="glass-card rounded-2xl p-8 md:p-10 h-full"
              >
                <div className="space-y-6 leading-relaxed">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <HiOutlineStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-base text-gray-300">"{testimonial.content}"</p>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-base">
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

// Contact CTA Section
function ContactCTASection() {
  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-[#0f0f1a] to-purple-900/30" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Glowing Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/30 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px]"
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
            <span className="text-white">Ready to Build Your </span>
            <span className="gradient-text">Next Project?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Let's discuss your requirements and create something amazing together.
            Get a free consultation and project estimate.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-8">
            <motion.a
              href="mailto:hello@expograph.in"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(6, 182, 212, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-cyan-500/25"
            >
              Contact Us
            </motion.a>
            <Link to="/academy">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40 transition-colors text-lg"
              >
                Explore Academy
              </motion.button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 pt-8">
            <a href="mailto:hello@expograph.in" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <HiOutlineSupport className="w-5 h-5" />
              hello@expograph.in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Solutions Page Component
export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <TechStackSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactCTASection />
    </div>
  );
}
