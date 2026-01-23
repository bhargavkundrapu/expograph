import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiX,
  FiArrowLeft,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";

export default function StudentInternships() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [appliedInternships, setAppliedInternships] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchInternships();
  }, [token]);

  useEffect(() => {
    if (id && internships.length > 0) {
      const internship = internships.find((i) => i.id === id);
      if (internship) {
        setSelectedInternship(internship);
      }
    }
  }, [id, internships]);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockInternships = [
        {
          id: "1",
          title: "Frontend Developer Intern",
          company: "Tech Corp",
          location: "Remote",
          duration: "3 months",
          stipend: "$500/month",
          description: "Work on React and Next.js projects",
          requirements: ["React", "JavaScript", "HTML/CSS"],
          posted_date: new Date().toISOString(),
          deadline: new Date(Date.now() + 2592000000).toISOString(),
        },
        {
          id: "2",
          title: "Backend Developer Intern",
          company: "Data Systems",
          location: "Hybrid",
          duration: "6 months",
          stipend: "$800/month",
          description: "Build scalable APIs and databases",
          requirements: ["Node.js", "PostgreSQL", "REST APIs"],
          posted_date: new Date(Date.now() - 86400000).toISOString(),
          deadline: new Date(Date.now() + 1728000000).toISOString(),
        },
      ];
      setInternships(mockInternships);
    } catch (error) {
      console.error("Failed to fetch internships:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (internshipId) => {
    if (!confirm("Are you sure you want to apply for this internship?")) return;
    try {
      // Mock apply - replace with actual API call
      setAppliedInternships([...appliedInternships, internshipId]);
      alert("Application submitted successfully!");
    } catch (error) {
      alert("Failed to submit application");
      console.error("Failed to apply:", error);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  if (selectedInternship) {
    const isApplied = appliedInternships.includes(selectedInternship.id);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setSelectedInternship(null);
              navigate("/lms/student/internships");
            }}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Internships
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-8 border-2 border-cyan-200/50 shadow-xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {selectedInternship.title}
                </h1>
                <p className="text-xl text-slate-700">{selectedInternship.company}</p>
              </div>
              {isApplied && (
                <div className="px-4 py-2 bg-emerald-50 border-2 border-emerald-200 rounded-md flex items-center gap-2 text-emerald-600">
                  <FiCheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Applied</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md border-2 border-cyan-200">
                <FiMapPin className="w-5 h-5 text-cyan-600 mb-2" />
                <p className="text-sm text-slate-600 mb-1">Location</p>
                <p className="font-semibold text-slate-800">{selectedInternship.location}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-md border-2 border-emerald-200">
                <FiClock className="w-5 h-5 text-emerald-600 mb-2" />
                <p className="text-sm text-slate-600 mb-1">Duration</p>
                <p className="font-semibold text-slate-800">{selectedInternship.duration}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-md border-2 border-amber-200">
                <FiDollarSign className="w-5 h-5 text-amber-600 mb-2" />
                <p className="text-sm text-slate-600 mb-1">Stipend</p>
                <p className="font-semibold text-slate-800">{selectedInternship.stipend}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-md border-2 border-purple-200">
                <FiCalendar className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-sm text-slate-600 mb-1">Deadline</p>
                <p className="font-semibold text-slate-800">
                  {new Date(selectedInternship.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Description</h3>
                <p className="text-slate-700">{selectedInternship.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInternship.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-md text-sm font-semibold text-cyan-700"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {!isApplied && (
                <button
                  onClick={() => handleApply(selectedInternship.id)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
                >
                  Apply Now
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Internships
          </h1>
          <p className="text-slate-600 text-lg">Explore internship opportunities</p>
        </motion.div>

        {internships.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-12 border-2 border-cyan-200/50 text-center"
          >
            <FiBriefcase className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No internships available</h3>
            <p className="text-slate-500">Check back later for new opportunities</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => {
              const isApplied = appliedInternships.includes(internship.id);
              return (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedInternship(internship);
                    navigate(`/lms/student/internships/${internship.id}`);
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md text-white">
                      <FiBriefcase className="w-6 h-6" />
                    </div>
                    {isApplied && (
                      <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-xs font-semibold">
                        Applied
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-800 mb-2">{internship.title}</h3>
                  <p className="text-slate-600 mb-4">{internship.company}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiMapPin className="w-4 h-4" />
                      {internship.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiClock className="w-4 h-4" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FiDollarSign className="w-4 h-4" />
                      {internship.stipend}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInternship(internship);
                      navigate(`/lms/student/internships/${internship.id}`);
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all"
                  >
                    {isApplied ? "View Details" : "Apply Now"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
