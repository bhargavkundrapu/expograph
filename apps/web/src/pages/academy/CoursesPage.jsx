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
      style={{
        fontFamily: "var(--font-dm)",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-secondary)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            style={{
              fontSize: "var(--font-size-4xl)",
              fontWeight: "700",
              color: "var(--text-secondary)",
              marginBottom: "24px",
              fontFamily: "var(--font-dm)",
            }}
          >
            Our Courses
          </h1>
          <p
            style={{
              fontSize: "var(--font-size-xl)",
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "600px",
              margin: "0 auto",
              fontFamily: "var(--font-dm)",
            }}
          >
            Choose from our comprehensive course catalog and start your coding journey today.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                backgroundColor: "var(--bg-level-4)",
                borderRadius: "var(--radius-md)",
                padding: "40px",
                boxShadow: "var(--shadow-sm)",
                border: course.highlighted ? "2px solid var(--bg-level-3)" : "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3
                  style={{
                    fontSize: "var(--font-size-2xl)",
                    fontWeight: "700",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-dm)",
                  }}
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
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                  <span
                    style={{
                      fontSize: "var(--font-size-3xl)",
                      fontWeight: "700",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    ${course.price}
                  </span>
                  <span
                    style={{
                      fontSize: "var(--font-size-lg)",
                      color: "rgba(255, 255, 255, 0.5)",
                      textDecoration: "line-through",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    ${course.originalPrice}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "var(--font-size-sm)", color: "rgba(255, 255, 255, 0.6)", fontFamily: "var(--font-dm)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <FiClock size={14} />
                    {course.duration}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <FiUsers size={14} />
                    {course.students}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <FiStar size={14} style={{ color: "#F59E0B" }} />
                    {course.rating}
                  </span>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "32px 0" }}>
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
