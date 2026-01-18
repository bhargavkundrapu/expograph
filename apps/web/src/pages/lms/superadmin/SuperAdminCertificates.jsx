import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiAward,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiUsers,
  FiCopy,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiDownload,
  FiLink,
} from "react-icons/fi";

export default function SuperAdminCertificates() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  // Determine view from route
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/details")) return "details";
    if (path.includes("/create") || path.includes("/issue")) return "add";
    if (path.includes("/list")) return "list";
    if (path.includes("/cards")) return "cards";
    if (params.id) return "details";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [addForm, setAddForm] = useState({
    userId: "",
    courseId: "",
    title: "",
  });
  const [saving, setSaving] = useState(false);

  // Fetch certificates
  useEffect(() => {
    if (!token) return;
    fetchCertificates();
    fetchStudents();
    fetchCourses();
  }, [token]);

  // Load certificate details when route has :id
  useEffect(() => {
    if (!token || !params.id || certificates.length === 0) return;
    
    const certificate = certificates.find((c) => String(c.id) === String(params.id));
    if (certificate && view === "details") {
      openDetails(certificate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, certificates.length, view, token]);

  // Filter certificates
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCertificates(certificates);
    } else {
      const filtered = certificates.filter(
        (cert) =>
          cert.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.verify_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.course_title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCertificates(filtered);
    }
  }, [searchQuery, certificates]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/certificates", { token });
      if (res?.ok) {
        setCertificates(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await apiFetch("/api/v1/admin/students", { token });
      if (res?.ok) {
        setStudents(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await apiFetch("/api/v1/admin/courses", { token });
      if (res?.ok) {
        setCourses(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleIssueCertificate = async () => {
    if (!addForm.userId || !addForm.title) {
      alert("Student and Title are required");
      return;
    }

    try {
      setSaving(true);
      const res = await apiFetch("/api/v1/admin/certificates/issue", {
        method: "POST",
        token,
        body: addForm,
      });

      if (res?.ok) {
        await fetchCertificates();
        navigate("/lms/superadmin/certificates/list");
        setAddForm({ userId: "", courseId: "", title: "" });
        alert("Certificate issued successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to issue certificate");
    } finally {
      setSaving(false);
    }
  };

  const openDetails = async (certificate) => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/v1/admin/certificates/${certificate.id}`, { token });
      if (res?.ok) {
        setSelectedCertificate(res.data);
        navigate(`/lms/superadmin/certificates/${certificate.id}/details`);
      }
    } catch (error) {
      alert("Failed to load certificate details");
    } finally {
      setLoading(false);
    }
  };

  const copyVerifyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Verification code copied to clipboard!");
  };

  const getVerifyUrl = (code) => {
    return `${window.location.origin}/verify/cert/${code}`;
  };

  // Cards View
  if (view === "cards") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
          >
            Certificates Management
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All Certificates Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/lms/superadmin/certificates/list")}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiAward className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {loading ? "..." : certificates.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Certificates</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">All Certificates</h3>
              <p className="text-slate-600">View and manage all issued certificates</p>
            </motion.div>

            {/* Issue Certificate Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setAddForm({ userId: "", courseId: "", title: "" });
                navigate("/lms/superadmin/certificates/create");
              }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FiPlus className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Issue Certificate</h3>
              <p className="text-slate-600">Create and issue a new certificate to a student</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  if (view === "list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate("/lms/superadmin/certificates/cards")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                All Certificates ({filteredCertificates.length})
              </h1>
            </div>
            <button
              onClick={() => {
                setAddForm({ userId: "", courseId: "", title: "" });
                navigate("/lms/superadmin/certificates/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Issue Certificate
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by student name, email, certificate title, or verification code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Certificates Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse">
                  <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredCertificates.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
              <FiAward className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No certificates found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "Get started by issuing your first certificate"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      <FiAward className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
                        {cert.title || "Untitled Certificate"}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">{cert.full_name || cert.email}</p>
                      {cert.course_title && (
                        <p className="text-xs text-slate-500 mt-1 truncate">Course: {cert.course_title}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FiClock className="w-3 h-3" />
                      <span>{new Date(cert.issued_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      <FiShield className="w-3 h-3" />
                      <span>{cert.verify_code?.slice(0, 8)}...</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openDetails(cert)}
                      className="flex-1 px-4 py-2 bg-amber-50 text-amber-600 font-medium rounded-lg hover:bg-amber-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEye className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete certificate "${cert.title}"? This action cannot be undone.`)) {
                          // Note: Backend may need DELETE endpoint for certificates
                          alert("Delete functionality - API endpoint needed");
                        }
                      }}
                      className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Issue Certificate View
  if (view === "add") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Issue New Certificate</h2>
              <button
                onClick={() => navigate("/lms/superadmin/certificates/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Student <span className="text-red-500">*</span>
                </label>
                <select
                  value={addForm.userId}
                  onChange={(e) => setAddForm({ ...addForm, userId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                >
                  <option value="">Select a student...</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.full_name || student.email} {student.email && `(${student.email})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Course (Optional)</label>
                <select
                  value={addForm.courseId}
                  onChange={(e) => setAddForm({ ...addForm, courseId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                >
                  <option value="">Select a course (optional)...</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Certificate Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  placeholder="e.g., React Foundations, Full Stack Developer, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleIssueCertificate}
                  disabled={saving || !addForm.userId || !addForm.title}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Issuing..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Issue Certificate
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/certificates/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Certificate Details View
  if (view === "details" && selectedCertificate) {
    const cert = selectedCertificate;
    const verifyUrl = getVerifyUrl(cert.verify_code);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold text-2xl">
                  <FiAward className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {cert.title || "Untitled Certificate"}
                  </h2>
                  <p className="text-slate-600">{cert.full_name || cert.email}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/superadmin/certificates/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Certificate Information */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Certificate Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Certificate ID</div>
                    <div className="text-sm font-medium text-slate-900">{cert.id}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Title</div>
                    <div className="text-sm font-medium text-slate-900">{cert.title}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Recipient</div>
                    <div className="text-sm font-medium text-slate-900">{cert.full_name || "N/A"}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Email</div>
                    <div className="text-sm font-medium text-slate-900">{cert.email}</div>
                  </div>
                  {cert.course_title && (
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Course</div>
                      <div className="text-sm font-medium text-slate-900">{cert.course_title}</div>
                    </div>
                  )}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Issued Date</div>
                    <div className="text-sm font-medium text-slate-900">
                      {new Date(cert.issued_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Code */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <FiShield className="w-5 h-5 text-amber-600" />
                  Verification Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-2">Verification Code</div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-4 py-3 bg-white border border-amber-200 rounded-lg text-sm font-mono text-amber-900">
                        {cert.verify_code}
                      </code>
                      <button
                        onClick={() => copyVerifyCode(cert.verify_code)}
                        className="px-4 py-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
                        title="Copy code"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-2">Verification URL</div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-4 py-3 bg-white border border-amber-200 rounded-lg text-sm text-slate-700 truncate">
                        {verifyUrl}
                      </code>
                      <button
                        onClick={() => copyVerifyCode(verifyUrl)}
                        className="px-4 py-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
                        title="Copy URL"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      <FiLink className="w-4 h-4" />
                      Open Verification Page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
