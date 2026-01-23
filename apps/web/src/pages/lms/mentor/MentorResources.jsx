import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  FiBookOpen,
  FiFileText,
  FiLink,
  FiDownload,
  FiSearch,
  FiFilter,
  FiFile,
  FiVideo,
  FiImage,
} from "react-icons/fi";

export default function MentorResources() {
  const location = useLocation();
  
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/guides")) return "guides";
    if (path.includes("/best-practices")) return "best-practices";
    return "materials";
  };
  
  const view = getViewFromPath();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Mock resources - in production, fetch from API
    setResources([
      {
        id: 1,
        title: "Mentoring Best Practices Guide",
        type: "pdf",
        category: "guides",
        url: "#",
        description: "A comprehensive guide to effective mentoring",
      },
      {
        id: 2,
        title: "Feedback Templates",
        type: "doc",
        category: "materials",
        url: "#",
        description: "Ready-to-use feedback templates",
      },
      {
        id: 3,
        title: "Student Assessment Rubric",
        type: "pdf",
        category: "materials",
        url: "#",
        description: "Standard assessment criteria",
      },
    ]);
  }, []);

  const filteredResources = view === "materials"
    ? resources.filter(r => r.category === "materials")
    : view === "guides"
    ? resources.filter(r => r.category === "guides")
    : resources;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
        >
          Mentor Resources
        </motion.h1>

        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-md p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                  {resource.type === "pdf" ? (
                    <FiFileText className="w-6 h-6" />
                  ) : resource.type === "video" ? (
                    <FiVideo className="w-6 h-6" />
                  ) : (
                    <FiFile className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">{resource.title}</h3>
                  <p className="text-sm text-slate-600">{resource.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={resource.url}
                  className="flex-1 px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FiDownload className="w-4 h-4" />
                  Download
                </a>
                <button 
                  onClick={() => {
                    if (resource.url && resource.url !== "#") {
                      navigator.clipboard.writeText(resource.url);
                      alert("Link copied to clipboard!");
                    } else {
                      alert("No link available");
                    }
                  }}
                  className="px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                  title="Copy link"
                >
                  <FiLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
