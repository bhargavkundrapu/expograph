import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";
import {
  FiCheck,
  FiArrowRight,
  FiStar,
  FiClock,
  FiUsers,
  FiBook,
} from "react-icons/fi";
import "../../styles/academy-tokens.css";

export default function CoursesPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const courses = [
    {
      id: "fullstack",
      name: "Full Stack Development",
      description: "Master frontend and backend technologies. Build real-world applications from scratch with React, Node.js, and modern tools.",
      duration: "6 months",
      level: "Beginner to Advanced",
      students: "2,400+",
      badge: "Popular",
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      features: [
        "Complete React & Node.js curriculum",
        "10+ real-world projects",
        "1-on-1 mentorship",
        "Certificate of completion",
        "Job placement support",
        "Lifetime access",
      ],
      highlighted: true,
    },
    {
      id: "datascience",
      name: "Data Science & ML",
      description: "Learn data analysis, machine learning, and AI. Work on industry projects and build ML models from scratch.",
      duration: "8 months",
      level: "Intermediate",
      students: "1,850+",
      badge: "Trending",
      price: 399,
      originalPrice: 499,
      rating: 4.8,
      features: [
        "Python & ML fundamentals",
        "TensorFlow & PyTorch",
        "Data visualization",
        "Industry projects",
        "ML model deployment",
        "Career guidance",
      ],
      highlighted: false,
    },
    {
      id: "devops",
      name: "DevOps & Cloud",
      description: "Master cloud infrastructure, CI/CD, and deployment. Get AWS/GCP certified and deploy scalable applications.",
      duration: "4 months",
      level: "Intermediate",
      students: "1,200+",
      badge: "New",
      price: 349,
      originalPrice: 449,
      rating: 4.7,
      features: [
        "AWS & GCP certification prep",
        "Docker & Kubernetes",
        "CI/CD pipelines",
        "Infrastructure as Code",
        "Monitoring & logging",
        "Cloud security",
      ],
      highlighted: false,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "var(--font-dm)",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-secondary)",
      }}
    >
      {/* Responsive header for /courses */}
      <header
        className="sticky top-0 left-0 right-0 z-[1000] border-b border-white/10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-3 sm:py-4"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <Link
            to="/academy"
            className="flex items-center gap-1.5 sm:gap-2 no-underline shrink-0"
          >
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
            <span className="text-xs sm:text-sm md:text-base font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm)" }}>
              Academy
            </span>
          </Link>
          <Link
            to="/academy#courses-section"
            className="text-sm sm:text-base opacity-100 hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm)", textDecoration: "none" }}
          >
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm)" }}
          >
            Our Courses
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl max-w-[600px] mx-auto px-2"
            style={{ color: "rgba(255, 255, 255, 0.7)", fontFamily: "var(--font-dm)" }}
          >
            Choose from our comprehensive course catalog and start your coding journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 sm:p-8 md:p-10 rounded-lg sm:rounded-xl"
              style={{
                backgroundColor: "var(--bg-level-4)",
                boxShadow: "var(--shadow-sm)",
                border: course.highlighted ? "2px solid var(--bg-level-3)" : "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold"
                  style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm)" }}
                >
                  {course.name}
                </h3>
                {course.badge && (
                  <span
                    style={{
                      padding: "4px 12px",
                      backgroundColor: "var(--bg-level-3)",
                      color: "var(--text-secondary)",
                      borderRadius: "var(--radius-full)",
                      fontSize: "var(--font-size-xs)",
                      fontWeight: "600",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    {course.badge}
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: "24px",
                  lineHeight: "1.6",
                  fontFamily: "var(--font-dm)",
                }}
              >
                {course.description}
              </p>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-dm)" }}>
                    ${course.price}
                  </span>
                  <span className="text-base sm:text-lg text-white/50 line-through" style={{ fontFamily: "var(--font-dm)" }}>
                    ${course.originalPrice}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-white/60" style={{ fontFamily: "var(--font-dm)" }}>
                  <span className="flex items-center gap-1"><FiClock size={14} />{course.duration}</span>
                  <span className="flex items-center gap-1"><FiUsers size={14} />{course.students}</span>
                  <span className="flex items-center gap-1"><FiStar size={14} className="text-amber-400" />{course.rating}</span>
                </div>
              </div>
              <ul className="list-none p-0 my-6 sm:my-8" style={{ fontFamily: "var(--font-dm)" }}>
                {course.features.map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "16px",
                      fontSize: "var(--font-size-base)",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    <FiCheck
                      style={{
                        color: "var(--palette-green-200)",
                        fontSize: "20px",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <span style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.5" }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  if (token) {
                    navigate("/lms/student/courses");
                  } else {
                    navigate("/login");
                  }
                }}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: course.highlighted
                    ? "linear-gradient(135deg, var(--bg-level-3) 0%, var(--palette-blue-500) 100%)"
                    : "linear-gradient(135deg, var(--bg-level-5) 0%, var(--palette-mixed-700) 100%)",
                  color: "var(--text-secondary)",
                  border: "none",
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--font-size-base)",
                  fontFamily: "var(--font-dm)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = "1";
                }}
              >
                Enroll Now
                <FiArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
