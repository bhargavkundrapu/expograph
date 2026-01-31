import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiEye,
  FiDownload,
  FiFilter,
  FiSearch,
  FiCode,
  FiFile,
} from "react-icons/fi";

export default function StudentSubmissions() {
  const navigate = useNavigate();
  const { submissionId } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchSubmissions();
  }, [token]);

  useEffect(() => {
    if (submissionId && submissions.length > 0) {
      const submission = submissions.find((s) => s.id === submissionId);
      if (submission) {
        setSelectedSubmission(submission);
      }
    }
  }, [submissionId, submissions]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call when endpoint is available
      const mockSubmissions = [
        {
          id: "1",
          title: "React Component Assignment",
          type: "practice",
          course: "React Fundamentals",
          status: "pending",
          submitted_at: new Date().toISOString(),
          reviewed_at: null,
          reviewer: null,
          feedback: null,
          score: null,
        },
        {
          id: "2",
          title: "JavaScript Algorithms",
          type: "practice",
          course: "JavaScript Basics",
          status: "approved",
          submitted_at: new Date(Date.now() - 86400000).toISOString(),
          reviewed_at: new Date(Date.now() - 3600000).toISOString(),
          reviewer: "John Mentor",
          feedback: "Great work! Your solution is efficient and well-structured.",
          score: 95,
        },
        {
          id: "3",
          title: "Database Design Project",
          type: "project",
          course: "Database Management",
          status: "rejected",
          submitted_at: new Date(Date.now() - 172800000).toISOString(),
          reviewed_at: new Date(Date.now() - 86400000).toISOString(),
          reviewer: "Jane Mentor",
          feedback: "Please review the normalization rules and resubmit.",
          score: 65,
        },
      ];
      setSubmissions(mockSubmissions);
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return FiCheckCircle;
      case "rejected":
        return FiXCircle;
      case "pending":
        return FiClock;
      default:
        return FiAlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200";
      case "pending":
        return "text-amber-600 bg-amber-50 border-amber-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesFilter = filter === "all" || submission.status === filter;
    const matchesSearch =
      !searchQuery ||
      submission.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.course?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <GenericPageSkeleton />;
  }

  if (selectedSubmission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setSelectedSubmission(null);
              navigate("/lms/student/submissions");
            }}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            ← Back to Submissions
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-8 border-2 border-cyan-200/50 shadow-xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {selectedSubmission.title}
                </h1>
                <p className="text-slate-600">{selectedSubmission.course}</p>
              </div>
              <div className={`px-4 py-2 rounded-md border-2 flex items-center gap-2 ${getStatusColor(selectedSubmission.status)}`}>
                {(() => {
                  const Icon = getStatusIcon(selectedSubmission.status);
                  return <Icon className="w-5 h-5" />;
                })()}
                <span className="font-semibold capitalize">{selectedSubmission.status}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md border-2 border-cyan-200">
                  <p className="text-sm text-slate-600 mb-1">Submitted</p>
                  <p className="font-semibold text-slate-800">
                    {new Date(selectedSubmission.submitted_at).toLocaleString()}
                  </p>
                </div>
                {selectedSubmission.reviewed_at && (
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-md border-2 border-emerald-200">
                    <p className="text-sm text-slate-600 mb-1">Reviewed</p>
                    <p className="font-semibold text-slate-800">
                      {new Date(selectedSubmission.reviewed_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {selectedSubmission.score !== null && (
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-md border-2 border-indigo-200">
                  <p className="text-sm text-slate-600 mb-2">Score</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {selectedSubmission.score}%
                  </p>
                </div>
              )}

              {selectedSubmission.feedback && (
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-md border-2 border-amber-200">
                  <h3 className="font-semibold text-slate-800 mb-3">Feedback</h3>
                  <p className="text-slate-700">{selectedSubmission.feedback}</p>
                  {selectedSubmission.reviewer && (
                    <p className="text-sm text-slate-600 mt-4">— {selectedSubmission.reviewer}</p>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2">
                  <FiEye className="w-5 h-5" />
                  View Submission
                </button>
                <button className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-md hover:bg-slate-50 transition-all flex items-center gap-2">
                  <FiDownload className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            My Submissions
          </h1>
          <p className="text-slate-600 text-lg">Track your submitted work and reviews</p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-slate-700"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <FiFilter className="text-slate-600 w-5 h-5" />
              {["all", "pending", "approved", "rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    filter === status
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Submissions List */}
        {filteredSubmissions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-12 border-2 border-cyan-200/50 text-center"
          >
            <FiFileText className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No submissions found</h3>
            <p className="text-slate-500">Your submitted work will appear here</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((submission) => {
              const StatusIcon = getStatusIcon(submission.status);
              return (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedSubmission(submission);
                    navigate(`/lms/student/submissions/${submission.id}`);
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(submission.status)}`}>
                      {submission.type === "practice" ? (
                        <FiCode className="w-5 h-5" />
                      ) : (
                        <FiFile className="w-5 h-5" />
                      )}
                    </div>
                    <div className={`px-3 py-1 rounded-lg border flex items-center gap-2 ${getStatusColor(submission.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold capitalize">{submission.status}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">
                    {submission.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">{submission.course}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{new Date(submission.submitted_at).toLocaleDateString()}</span>
                    {submission.score !== null && (
                      <span className="font-semibold text-indigo-600">{submission.score}%</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
