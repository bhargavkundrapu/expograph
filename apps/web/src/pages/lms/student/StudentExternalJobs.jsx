import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import {
  FiExternalLink,
  FiSearch,
  FiFilter,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiBookmark,
  FiBookmark as FiBookmarkFilled,
  FiStar,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

export default function StudentExternalJobs() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobTypes = [
    { id: "all", label: "All Types" },
    { id: "fulltime", label: "Full Time" },
    { id: "parttime", label: "Part Time" },
    { id: "contract", label: "Contract" },
    { id: "internship", label: "Internship" },
    { id: "remote", label: "Remote" },
  ];

  const experienceLevels = [
    { id: "all", label: "All Levels" },
    { id: "entry", label: "Entry Level" },
    { id: "mid", label: "Mid Level" },
    { id: "senior", label: "Senior" },
  ];

  const locations = [
    { id: "all", label: "All Locations" },
    { id: "remote", label: "Remote" },
    { id: "bangalore", label: "Bangalore" },
    { id: "mumbai", label: "Mumbai" },
    { id: "delhi", label: "Delhi" },
    { id: "hyderabad", label: "Hyderabad" },
    { id: "pune", label: "Pune" },
  ];

  useEffect(() => {
    if (!token) return;
    fetchJobs();
    loadSavedJobs();
    loadAppliedJobs();
  }, [token]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchQuery, selectedLocation, selectedType, selectedExperience]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockJobs = [
        {
          id: "1",
          title: "Full Stack Developer",
          company: "TechCorp Inc.",
          location: "Bangalore",
          type: "fulltime",
          experience: "mid",
          salary: "₹8L - ₹15L",
          description:
            "We are looking for a skilled Full Stack Developer to join our team. You will be responsible for developing and maintaining web applications.",
          requirements: [
            "3+ years of experience",
            "Proficiency in React and Node.js",
            "Experience with databases",
            "Strong problem-solving skills",
          ],
          postedDate: "2024-01-15",
          applicationDeadline: "2024-02-15",
          applicationUrl: "https://techcorp.com/careers",
          logo: "https://via.placeholder.com/60",
          featured: true,
        },
        {
          id: "2",
          title: "React Developer",
          company: "StartupXYZ",
          location: "Remote",
          type: "fulltime",
          experience: "entry",
          salary: "₹5L - ₹10L",
          description:
            "Join our fast-growing startup as a React Developer. Work on cutting-edge projects and grow your career.",
          requirements: [
            "1+ years of React experience",
            "Knowledge of modern JavaScript",
            "Team player",
          ],
          postedDate: "2024-01-20",
          applicationDeadline: "2024-02-20",
          applicationUrl: "https://startupxyz.com/jobs",
          logo: "https://via.placeholder.com/60",
          featured: false,
        },
        {
          id: "3",
          title: "Backend Engineer",
          company: "CloudTech Solutions",
          location: "Mumbai",
          type: "fulltime",
          experience: "senior",
          salary: "₹15L - ₹25L",
          description:
            "Lead backend development for our cloud platform. Work with microservices and distributed systems.",
          requirements: [
            "5+ years of backend experience",
            "Expertise in Node.js or Python",
            "Experience with cloud platforms",
            "Leadership skills",
          ],
          postedDate: "2024-01-18",
          applicationDeadline: "2024-02-18",
          applicationUrl: "https://cloudtech.com/careers",
          logo: "https://via.placeholder.com/60",
          featured: true,
        },
        {
          id: "4",
          title: "Frontend Developer Intern",
          company: "DesignStudio",
          location: "Delhi",
          type: "internship",
          experience: "entry",
          salary: "₹20K - ₹30K",
          description:
            "Great opportunity for students to learn and work on real projects. Mentorship provided.",
          requirements: [
            "Currently pursuing degree",
            "Basic knowledge of HTML, CSS, JavaScript",
            "Eagerness to learn",
          ],
          postedDate: "2024-01-22",
          applicationDeadline: "2024-02-22",
          applicationUrl: "https://designstudio.com/internships",
          logo: "https://via.placeholder.com/60",
          featured: false,
        },
        {
          id: "5",
          title: "DevOps Engineer",
          company: "ScaleUp Technologies",
          location: "Hyderabad",
          type: "fulltime",
          experience: "mid",
          salary: "₹10L - ₹18L",
          description:
            "Manage infrastructure and deployment pipelines. Work with Kubernetes, Docker, and CI/CD tools.",
          requirements: [
            "3+ years of DevOps experience",
            "Kubernetes and Docker expertise",
            "CI/CD pipeline knowledge",
          ],
          postedDate: "2024-01-19",
          applicationDeadline: "2024-02-19",
          applicationUrl: "https://scaleup.com/jobs",
          logo: "https://via.placeholder.com/60",
          featured: false,
        },
        {
          id: "6",
          title: "Mobile App Developer",
          company: "AppVenture",
          location: "Pune",
          type: "contract",
          experience: "mid",
          salary: "₹12L - ₹20L",
          description:
            "Contract position for developing mobile applications. React Native or Flutter experience required.",
          requirements: [
            "2+ years of mobile development",
            "React Native or Flutter",
            "Portfolio of published apps",
          ],
          postedDate: "2024-01-21",
          applicationDeadline: "2024-02-21",
          applicationUrl: "https://appventure.com/contracts",
          logo: "https://via.placeholder.com/60",
          featured: false,
        },
      ];
      setJobs(mockJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedJobs = () => {
    const saved = localStorage.getItem("saved_jobs");
    if (saved) {
      try {
        setSavedJobs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved jobs:", e);
      }
    }
  };

  const loadAppliedJobs = () => {
    const applied = localStorage.getItem("applied_jobs");
    if (applied) {
      try {
        setAppliedJobs(JSON.parse(applied));
      } catch (e) {
        console.error("Failed to load applied jobs:", e);
      }
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter((job) => job.location.toLowerCase() === selectedLocation.toLowerCase());
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((job) => job.type === selectedType);
    }

    if (selectedExperience !== "all") {
      filtered = filtered.filter((job) => job.experience === selectedExperience);
    }

    setFilteredJobs(filtered);
  };

  const toggleSaveJob = (jobId) => {
    const isSaved = savedJobs.includes(jobId);
    let updated;

    if (isSaved) {
      updated = savedJobs.filter((id) => id !== jobId);
    } else {
      updated = [...savedJobs, jobId];
    }

    setSavedJobs(updated);
    localStorage.setItem("saved_jobs", JSON.stringify(updated));
  };

  const markAsApplied = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      const updated = [...appliedJobs, jobId];
      setAppliedJobs(updated);
      localStorage.setItem("applied_jobs", JSON.stringify(updated));
    }
  };

  const getJobTypeColor = (type) => {
    switch (type) {
      case "fulltime":
        return "from-blue-500 to-blue-600";
      case "parttime":
        return "from-purple-500 to-purple-600";
      case "contract":
        return "from-orange-500 to-orange-600";
      case "internship":
        return "from-green-500 to-green-600";
      case "remote":
        return "from-cyan-500 to-cyan-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FiExternalLink className="w-10 h-10 text-blue-400" />
            External Jobs
          </h1>
          <p className="text-slate-400">Discover job opportunities from top companies</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-md p-4 border border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Total Jobs</p>
                <p className="text-2xl font-bold text-white">{jobs.length}</p>
              </div>
              <FiBriefcase className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-md p-4 border border-emerald-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Saved Jobs</p>
                <p className="text-2xl font-bold text-white">{savedJobs.length}</p>
              </div>
              <FiBookmark className="w-8 h-8 text-emerald-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-md p-4 border border-amber-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Applied</p>
                <p className="text-2xl font-bold text-white">{appliedJobs.length}</p>
              </div>
              <FiCheckCircle className="w-8 h-8 text-amber-400" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 rounded-md p-6 mb-6 border border-slate-700/50"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {jobTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Experience Filter */}
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {experienceLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-800/50 rounded-md p-12 border border-slate-700/50 text-center"
            >
              <FiBriefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No jobs found matching your criteria</p>
              <p className="text-slate-500 text-sm mt-2">Try adjusting your filters</p>
            </motion.div>
          ) : (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-800/50 rounded-md p-6 border-2 transition-all cursor-pointer hover:border-blue-500/50 ${
                  job.featured ? "border-yellow-500/50" : "border-slate-700/50"
                }`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      {job.logo ? (
                        <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <FiBriefcase className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                        {job.featured && (
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium flex items-center gap-1">
                            <FiStar className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 mb-2">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <FiMapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className={`px-3 py-1 bg-gradient-to-r ${getJobTypeColor(job.type)} text-white rounded-lg text-xs font-medium capitalize`}>
                          {job.type === "fulltime" ? "Full Time" : job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiDollarSign className="w-4 h-4" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                      className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      {savedJobs.includes(job.id) ? (
                        <FiBookmarkFilled className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <FiBookmark className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    {appliedJobs.includes(job.id) && (
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs font-medium flex items-center gap-1">
                        <FiCheckCircle className="w-3 h-3" />
                        Applied
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 text-sm line-clamp-2">{job.description}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-md p-6 border border-slate-700 max-w-3xl w-full my-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
                  {selectedJob.featured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xl text-slate-400 mb-4">{selectedJob.company}</p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {selectedJob.location}
                  </span>
                  <span className={`px-3 py-1 bg-gradient-to-r ${getJobTypeColor(selectedJob.type)} text-white rounded-lg text-xs font-medium capitalize`}>
                    {selectedJob.type === "fulltime" ? "Full Time" : selectedJob.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiDollarSign className="w-4 h-4" />
                    {selectedJob.salary}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-white ml-4"
              >
                <FiExternalLink className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Job Description</h3>
                <p className="text-slate-300">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                  <p>Posted: {new Date(selectedJob.postedDate).toLocaleDateString()}</p>
                  <p>Deadline: {new Date(selectedJob.applicationDeadline).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      markAsApplied(selectedJob.id);
                      window.open(selectedJob.applicationUrl, "_blank");
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
