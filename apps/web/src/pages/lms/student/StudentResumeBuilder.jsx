import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import {
  FiFileText,
  FiDownload,
  FiSave,
  FiEdit3,
  FiPlus,
  FiTrash2,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiAward,
  FiBook,
  FiCode,
  FiLink,
} from "react-icons/fi";
// PDF generation will be implemented with backend API

export default function StudentResumeBuilder() {
  const { user, token } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: user?.full_name || user?.name || "",
      email: user?.email || "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  });
  const [editingSection, setEditingSection] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);

  const templates = [
    { id: "modern", name: "Modern", preview: "🎨" },
    { id: "classic", name: "Classic", preview: "📄" },
    { id: "creative", name: "Creative", preview: "✨" },
  ];

  useEffect(() => {
    loadSavedResumes();
  }, []);

  const loadSavedResumes = () => {
    const saved = localStorage.getItem("resumes");
    if (saved) {
      try {
        setSavedResumes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load resumes:", e);
      }
    }
  };

  const saveResume = () => {
    const newResume = {
      id: Date.now().toString(),
      name: `Resume ${new Date().toLocaleDateString()}`,
      template: selectedTemplate,
      data: resumeData,
      createdAt: new Date().toISOString(),
    };

    const updated = [...savedResumes, newResume];
    setSavedResumes(updated);
    localStorage.setItem("resumes", JSON.stringify(updated));
    alert("Resume saved successfully!");
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const addItem = (section) => {
    const templates = {
      experience: { company: "", position: "", startDate: "", endDate: "", description: "" },
      education: { institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" },
      skills: { name: "", level: "intermediate" },
      projects: { name: "", description: "", technologies: "", link: "" },
      certifications: { name: "", issuer: "", date: "", credentialId: "" },
    };

    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], templates[section]],
    }));
  };

  const updateItem = (section, index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const downloadPDF = () => {
    // Create a printable version
    const printWindow = window.open("", "_blank");
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - ${resumeData.personalInfo.fullName}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #1e293b; margin-bottom: 10px; }
          h2 { color: #334155; border-bottom: 2px solid #334155; padding-bottom: 5px; margin-top: 20px; }
          .contact { color: #64748b; margin-bottom: 20px; }
          .section { margin-bottom: 20px; }
          .item { margin-bottom: 15px; }
          .skills { display: flex; flex-wrap: wrap; gap: 8px; }
          .skill { background: #f1f5f9; padding: 4px 12px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>${resumeData.personalInfo.fullName || "Your Name"}</h1>
        <div class="contact">
          ${resumeData.personalInfo.email ? `<div>${resumeData.personalInfo.email}</div>` : ""}
          ${resumeData.personalInfo.phone ? `<div>${resumeData.personalInfo.phone}</div>` : ""}
          ${resumeData.personalInfo.location ? `<div>${resumeData.personalInfo.location}</div>` : ""}
        </div>
        ${resumeData.summary ? `<div class="section"><h2>Summary</h2><p>${resumeData.summary}</p></div>` : ""}
        ${resumeData.experience.length > 0 ? `
          <div class="section">
            <h2>Experience</h2>
            ${resumeData.experience.map(exp => `
              <div class="item">
                <strong>${exp.position}${exp.company ? ` at ${exp.company}` : ""}</strong><br>
                <em>${exp.startDate} - ${exp.endDate}</em>
                ${exp.description ? `<p>${exp.description}</p>` : ""}
              </div>
            `).join("")}
          </div>
        ` : ""}
        ${resumeData.education.length > 0 ? `
          <div class="section">
            <h2>Education</h2>
            ${resumeData.education.map(edu => `
              <div class="item">
                <strong>${edu.degree}${edu.field ? ` in ${edu.field}` : ""}</strong><br>
                ${edu.institution}<br>
                <em>${edu.startDate} - ${edu.endDate}${edu.gpa ? ` • GPA: ${edu.gpa}` : ""}</em>
              </div>
            `).join("")}
          </div>
        ` : ""}
        ${resumeData.skills.length > 0 ? `
          <div class="section">
            <h2>Skills</h2>
            <div class="skills">
              ${resumeData.skills.map(skill => `<span class="skill">${skill.name}</span>`).join("")}
            </div>
          </div>
        ` : ""}
      </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FiFileText className="w-10 h-10 text-blue-400" />
            Resume Builder
          </h1>
          <p className="text-slate-400">Create professional resumes with customizable templates</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Template Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400">Template:</span>
                <div className="flex gap-2">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedTemplate === tpl.id
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <span className="mr-2">{tpl.preview}</span>
                      {tpl.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveResume}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={downloadPDF}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FiDownload className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </motion.div>

            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 rounded-md p-6 border border-slate-700/50"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FiUser className="w-5 h-5 text-blue-400" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">GitHub</label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.github}
                    onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 rounded-md p-6 border border-slate-700/50"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Professional Summary</h2>
              <textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                placeholder="Write a brief summary of your professional background..."
                rows={4}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              />
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 rounded-md p-6 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FiBriefcase className="w-5 h-5 text-blue-400" />
                  Experience
                </h2>
                <button
                  onClick={() => addItem("experience")}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => updateItem("experience", index, "position", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateItem("experience", index, "company", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Start Date (e.g., Jan 2020)"
                        value={exp.startDate}
                        onChange={(e) => updateItem("experience", index, "startDate", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="text"
                        placeholder="End Date (e.g., Present)"
                        value={exp.endDate}
                        onChange={(e) => updateItem("experience", index, "endDate", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <textarea
                      placeholder="Description of your role and achievements..."
                      value={exp.description}
                      onChange={(e) => updateItem("experience", index, "description", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none mb-2"
                    />
                    <button
                      onClick={() => removeItem("experience", index)}
                      className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 rounded-md p-6 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FiBook className="w-5 h-5 text-blue-400" />
                  Education
                </h2>
                <button
                  onClick={() => addItem("education")}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateItem("education", index, "degree", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => updateItem("education", index, "field", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateItem("education", index, "institution", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="text"
                        placeholder="GPA (optional)"
                        value={edu.gpa}
                        onChange={(e) => updateItem("education", index, "gpa", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Start Date"
                        value={edu.startDate}
                        onChange={(e) => updateItem("education", index, "startDate", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <input
                        type="text"
                        placeholder="End Date"
                        value={edu.endDate}
                        onChange={(e) => updateItem("education", index, "endDate", e.target.value)}
                        className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <button
                      onClick={() => removeItem("education", index)}
                      className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-800/50 rounded-md p-6 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FiCode className="w-5 h-5 text-blue-400" />
                  Skills
                </h2>
                <button
                  onClick={() => addItem("skills")}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <FiPlus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Skill name"
                      value={skill.name}
                      onChange={(e) => updateItem("skills", index, "name", e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <select
                      value={skill.level}
                      onChange={(e) => updateItem("skills", index, "level", e.target.value)}
                      className="px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <button
                      onClick={() => removeItem("skills", index)}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-md p-8 shadow-2xl"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {resumeData.personalInfo.fullName || "Your Name"}
              </h3>
              <div className="text-sm text-slate-600 space-y-1">
                {resumeData.personalInfo.email && <div>{resumeData.personalInfo.email}</div>}
                {resumeData.personalInfo.phone && <div>{resumeData.personalInfo.phone}</div>}
                {resumeData.personalInfo.location && <div>{resumeData.personalInfo.location}</div>}
              </div>
            </div>

            {resumeData.summary && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-2 border-b-2 border-slate-900 pb-1">
                  Summary
                </h4>
                <p className="text-sm text-slate-700">{resumeData.summary}</p>
              </div>
            )}

            {resumeData.experience.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-2 border-b-2 border-slate-900 pb-1">
                  Experience
                </h4>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="font-semibold text-slate-900">
                      {exp.position} {exp.company && `at ${exp.company}`}
                    </div>
                    <div className="text-xs text-slate-600 mb-1">
                      {exp.startDate} - {exp.endDate}
                    </div>
                    {exp.description && <div className="text-sm text-slate-700">{exp.description}</div>}
                  </div>
                ))}
              </div>
            )}

            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-2 border-b-2 border-slate-900 pb-1">
                  Education
                </h4>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="font-semibold text-slate-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </div>
                    <div className="text-sm text-slate-700">{edu.institution}</div>
                    <div className="text-xs text-slate-600">
                      {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {resumeData.skills.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2 border-b-2 border-slate-900 pb-1">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-800 rounded text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
