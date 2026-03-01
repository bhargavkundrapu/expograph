import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiUsers,
  FiUserPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiMail,
  FiPhone,
  FiUser,
  FiTrendingUp,
  FiBriefcase,
  FiCalendar,
  FiKey,
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiLock,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiBook,
} from "react-icons/fi";

const PAGE_SIZES = [10, 25, 50, 100];

export default function SuperAdminStudents() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  // Determine view from route
  const getViewFromPath = () => {
    const path = location.pathname;
    if (path.includes("/edit")) return "edit";
    if (path.includes("/details") || (params.id && !path.includes("/edit") && !path.includes("/enrollments") && !path.includes("/progress"))) return "details";
    if (path.includes("/create") || path.includes("/add")) return "add";
    if (path.includes("/list")) return "list";
    if (path.includes("/cards")) return "cards";
    if (path.includes("/enrollments")) return "enrollments";
    if (path.includes("/progress")) return "progress";
    if (params.id) return "details";
    return "cards"; // default
  };
  
  const view = getViewFromPath();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: "", email: "", phone: "" });
  const [addForm, setAddForm] = useState({ fullName: "", email: "", phone: "", password: "", generatePassword: true });
  const [saving, setSaving] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [studentCredentials, setStudentCredentials] = useState(null);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    dateFrom: "",
    dateTo: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const activeFilterCount = Object.values(filters).filter((v) => v.trim()).length + (searchQuery.trim() ? 1 : 0);

  const clearFilters = () => {
    setFilters({ name: "", email: "", phone: "", college: "", dateFrom: "", dateTo: "" });
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Fetch students
  useEffect(() => {
    if (!token) return;
    fetchStudents();
  }, [token]);

  // Load student details/edit when route has :id - fetch directly from API
  useEffect(() => {
    if (!token || !params.id) return;
    
    // Check if we already have the correct student loaded
    if (selectedStudent && String(selectedStudent.id) === String(params.id)) {
      return; // Already loaded, skip
    }
    
    const loadStudentData = async () => {
      try {
        if (view === "details") {
          // Fetch full details from API
          const res = await apiFetch(`/api/v1/admin/students/${params.id}`, { token });
          if (res?.ok) {
            setSelectedStudent(res.data);
          } else {
            console.error("Failed to load student details from API");
          }
        } else if (view === "edit") {
          // For edit, try list first, then API if needed
          const student = students.find((s) => String(s.id) === String(params.id));
          if (student) {
            setSelectedStudent(student);
            setEditForm({
              fullName: student.full_name || "",
              email: student.email || "",
              phone: student.phone || "",
            });
          } else {
            // Fallback: fetch from API
            const res = await apiFetch(`/api/v1/admin/students/${params.id}`, { token });
            if (res?.ok) {
              const studentData = res.data;
              setSelectedStudent(studentData);
              setEditForm({
                fullName: studentData.full_name || "",
                email: studentData.email || "",
                phone: studentData.phone || "",
              });
            }
          }
        }
      } catch (error) {
        console.error("Failed to load student data from route:", error);
      }
    };

    loadStudentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, view, token]);

  // Filter students
  useEffect(() => {
    let result = students;

    // Global search
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (s) =>
          s.full_name?.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q) ||
          s.phone?.includes(q) ||
          s.college?.toLowerCase().includes(q)
      );
    }

    // Individual filters
    const fn = filters.name.trim().toLowerCase();
    if (fn) result = result.filter((s) => s.full_name?.toLowerCase().includes(fn));

    const fe = filters.email.trim().toLowerCase();
    if (fe) result = result.filter((s) => s.email?.toLowerCase().includes(fe));

    const fp = filters.phone.trim();
    if (fp) result = result.filter((s) => s.phone?.includes(fp));

    const fc = filters.college.trim().toLowerCase();
    if (fc) result = result.filter((s) => s.college?.toLowerCase().includes(fc));

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      from.setHours(0, 0, 0, 0);
      result = result.filter((s) => new Date(s.created_at) >= from);
    }
    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter((s) => new Date(s.created_at) <= to);
    }

    setFilteredStudents(result);
    setCurrentPage(1);
  }, [searchQuery, students, filters]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/students", { token });
      if (res?.ok) {
        setStudents(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate secure random password
  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    // Ensure at least one uppercase, one lowercase, one number, one special char
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    password += "0123456789"[Math.floor(Math.random() * 10)];
    password += "!@#$%^&*"[Math.floor(Math.random() * 8)];
    for (let i = password.length; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    // Shuffle the password
    return password.split("").sort(() => Math.random() - 0.5).join("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleAddStudent = async () => {
    if (!addForm.email || !addForm.fullName) {
      alert("Email and Name are required");
      return;
    }

    try {
      setSaving(true);
      
      // Generate password if auto-generate is enabled
      const password = addForm.generatePassword ? generatePassword() : addForm.password;
      
      const res = await apiFetch("/api/v1/admin/students", {
        method: "POST",
        token,
        body: {
          ...addForm,
          password: password || undefined, // Send password only if provided
        },
      });

      if (res?.ok) {
        // Show credentials modal
        setStudentCredentials({
          email: addForm.email,
          password: password,
          name: addForm.fullName,
          isReset: false,
        });
        setShowCredentialsModal(true);
        
        await fetchStudents();
        setAddForm({ fullName: "", email: "", phone: "", password: "", generatePassword: true });
      }
    } catch (error) {
      alert(error?.message || "Failed to add student");
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async (studentId, email) => {
    if (!confirm(`Reset password for ${email}? A new password will be generated.`)) return;

    try {
      setResettingPassword(true);
      const newPassword = generatePassword();
      
      // Update student with new password
      const res = await apiFetch(`/api/v1/admin/students/${studentId}`, {
        method: "PATCH",
        token,
        body: { password: newPassword },
      });

      if (res?.ok) {
        setStudentCredentials({
          email: email,
          password: newPassword,
          name: selectedStudent?.full_name || email,
          isReset: true,
        });
        setShowCredentialsModal(true);
        setResettingPassword(false);
      }
    } catch (error) {
      alert(error?.message || "Failed to reset password");
    } finally {
      setResettingPassword(false);
    }
  };

  const handleEditStudent = async () => {
    if (!selectedStudent) return;

    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const res = await apiFetch(`/api/v1/admin/students/${selectedStudent.id}`, {
        method: "PATCH",
        token,
        body: editForm,
      });

      if (res?.ok) {
        await fetchStudents();
        navigate("/lms/superadmin/students/list");
        setSelectedStudent(null);
      }
    } catch (error) {
      alert(error?.message || "Failed to update student");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!confirm("Are you sure you want to remove this student?")) return;

    try {
      const res = await apiFetch(`/api/v1/admin/students/${studentId}`, {
        method: "DELETE",
        token: token ?? localStorage.getItem("token"),
      });

      if (res?.ok) {
        const wasViewingDeleted = selectedStudent?.id === studentId;
        if (wasViewingDeleted) {
          setSelectedStudent(null);
          if (view === "details") {
            navigate("/lms/superadmin/students/list");
          }
        }
        await fetchStudents();
      }
    } catch (error) {
      alert(error?.message || "Failed to delete student. Ensure the API server is running.");
    }
  };

  const openEdit = (student) => {
    setSelectedStudent(student);
    setEditForm({
      fullName: student.full_name || "",
      email: student.email || "",
      phone: student.phone || "",
    });
    navigate(`/lms/superadmin/students/${student.id}/edit`);
  };

  const openDetails = async (student) => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/v1/admin/students/${student.id}`, { token });
      if (res?.ok) {
        setSelectedStudent(res.data);
        navigate(`/lms/superadmin/students/${student.id}/details`);
      }
    } catch (error) {
      alert("Failed to load student details");
    } finally {
      setLoading(false);
    }
  };

  // Credentials Modal Component
  const CredentialsModal = () => {
    if (!showCredentialsModal || !studentCredentials) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-md p-8 border border-slate-200 shadow-2xl max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <FiCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {studentCredentials.isReset ? "Password Reset Successfully!" : "Student Created Successfully!"}
            </h2>
            <p className="text-slate-600">Save these credentials securely</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 rounded-md p-4 border-2 border-slate-200">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Student Name</label>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-slate-900">{studentCredentials.name}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-md p-4 border-2 border-blue-200">
              <label className="block text-xs font-semibold text-blue-600 mb-1">Email</label>
              <div className="flex items-center justify-between">
                <p className="text-lg font-mono font-bold text-blue-900">{studentCredentials.email}</p>
                <button
                  onClick={() => copyToClipboard(studentCredentials.email)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Copy email"
                >
                  <FiCopy className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>

            <div className="bg-amber-50 rounded-md p-4 border-2 border-amber-200">
              <label className="block text-xs font-semibold text-amber-600 mb-1">Password</label>
              <div className="flex items-center justify-between">
                <p className="text-lg font-mono font-bold text-amber-900">{studentCredentials.password}</p>
                <button
                  onClick={() => copyToClipboard(studentCredentials.password)}
                  className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
                  title="Copy password"
                >
                  <FiCopy className="w-4 h-4 text-amber-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
            <p className="text-sm text-yellow-800 flex items-start gap-2">
              <FiLock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Important:</strong> This password will not be shown again. Please copy it now and share it securely with the student.
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowCredentialsModal(false);
                setStudentCredentials(null);
                if (!studentCredentials.isReset) {
                  navigate("/lms/superadmin/students/list");
                }
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Done
            </button>
            <button
              onClick={() => {
                const credentials = `Student Login Credentials\n\nName: ${studentCredentials.name}\nEmail: ${studentCredentials.email}\nPassword: ${studentCredentials.password}\n\nPlease keep this information secure.`;
                copyToClipboard(credentials);
              }}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <FiCopy className="w-4 h-4" />
              Copy All
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  // Cards View
  if (view === "cards") {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
            >
              Students Management
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* All Students Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => navigate("/lms/superadmin/students/list")}
                className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <FiUsers className="w-8 h-8" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">
                      {loading ? "..." : students.length}
                    </div>
                    <div className="text-sm text-slate-600">Total Students</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">All Students</h3>
                <p className="text-slate-600">View and manage all registered students</p>
              </motion.div>

              {/* Add Student Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => {
                  setAddForm({ fullName: "", email: "", phone: "", password: "", generatePassword: true });
                  navigate("/lms/superadmin/students/create");
                }}
                className="bg-white rounded-md p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <FiUserPlus className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Add Student</h3>
                <p className="text-slate-600">Register a new student to the platform</p>
              </motion.div>
            </div>
          </div>
        </div>
        <CredentialsModal />
      </>
    );
  }

  // List View
  if (view === "list") {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate("/lms/superadmin/students/cards")}
                className="text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-2"
              >
                <FiX className="w-4 h-4 rotate-45" />
                <span>Back</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                All Students ({filteredStudents.length})
              </h1>
            </div>
            <button
              onClick={() => {
                setAddForm({ fullName: "", email: "", phone: "", password: "", generatePassword: true });
                navigate("/lms/superadmin/students/create");
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FiUserPlus className="w-5 h-5" />
              Add Student
            </button>
          </div>

          {/* Search + Filter Toggle */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Quick search by name, email, phone, college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters((p) => !p)}
                className={`flex items-center gap-2 px-5 py-3 rounded-md border font-medium transition-all whitespace-nowrap ${
                  showFilters || activeFilterCount > 0
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <FiFilter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
                {showFilters ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-slate-900">Advanced Filters</h3>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          <FiX className="w-3 h-3" />
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Name</label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Filter by name"
                            value={filters.name}
                            onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Filter by email"
                            value={filters.email}
                            onChange={(e) => setFilters((f) => ({ ...f, email: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Phone</label>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            placeholder="Filter by phone"
                            value={filters.phone}
                            onChange={(e) => setFilters((f) => ({ ...f, phone: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      {/* College */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">College</label>
                        <div className="relative">
                          <FiBook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Filter by college"
                            value={filters.college}
                            onChange={(e) => setFilters((f) => ({ ...f, college: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      {/* Date From */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Joined From</label>
                        <div className="relative">
                          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      {/* Date To */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">Joined To</label>
                        <div className="relative">
                          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Students Grid */}
          {(() => {
            const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
            const safePage = Math.min(currentPage, totalPages);
            const paginatedStudents = filteredStudents.slice((safePage - 1) * pageSize, safePage * pageSize);
            const startIdx = (safePage - 1) * pageSize + 1;
            const endIdx = Math.min(safePage * pageSize, filteredStudents.length);

            const getPageNumbers = () => {
              const pages = [];
              const maxVisible = 5;
              let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
              let end = Math.min(totalPages, start + maxVisible - 1);
              if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
              for (let i = start; i <= end; i++) pages.push(i);
              return pages;
            };

            return loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse flex items-center gap-4">
                    <div className="h-10 w-10 bg-slate-200 rounded-full shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-4 w-40 bg-slate-200 rounded mb-2"></div>
                      <div className="h-3 w-56 bg-slate-200 rounded"></div>
                    </div>
                    <div className="h-9 w-20 bg-slate-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
                <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No students found</h3>
                <p className="text-slate-600">
                  {searchQuery || activeFilterCount > 0 ? "Try different filters" : "Get started by adding your first student"}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {paginatedStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {student.full_name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-slate-900 font-medium truncate">{student.full_name || "Unnamed Student"}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              student.is_active ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"
                            }`}>
                              {student.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <FiMail className="w-4 h-4 shrink-0" />
                              <span className="truncate">{student.email}</span>
                            </span>
                            {student.phone && (
                              <span className="flex items-center gap-1.5">
                                <FiPhone className="w-4 h-4 shrink-0" />
                                {student.phone}
                              </span>
                            )}
                            {student.college && (
                              <span className="text-slate-400 truncate">{student.college}</span>
                            )}
                          </div>
                          <p className="text-slate-400 text-xs">
                            Joined {new Date(student.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openDetails(student)}
                          className="px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2 text-sm"
                        >
                          <FiEye className="w-4 h-4" />
                          Details
                        </button>
                        <button
                          onClick={() => openEdit(student)}
                          className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm"
                        >
                          <FiEdit2 className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {filteredStudents.length > PAGE_SIZES[0] && (
                  <div className="mt-8 bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span>Showing <strong>{startIdx}–{endIdx}</strong> of <strong>{filteredStudents.length}</strong></span>
                      <span className="text-slate-300">|</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500">Per page</span>
                        <select
                          value={pageSize}
                          onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                          className="border border-slate-200 rounded-md px-2 py-1 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        >
                          {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setCurrentPage(1)} disabled={safePage <= 1}
                        className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="First">
                        <FiChevronsLeft className="w-4 h-4 text-slate-600" />
                      </button>
                      <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={safePage <= 1}
                        className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Previous">
                        <FiChevronLeft className="w-4 h-4 text-slate-600" />
                      </button>
                      {getPageNumbers().map((p) => (
                        <button key={p} onClick={() => setCurrentPage(p)}
                          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                            p === safePage ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >{p}</button>
                      ))}
                      <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}
                        className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Next">
                        <FiChevronRight className="w-4 h-4 text-slate-600" />
                      </button>
                      <button onClick={() => setCurrentPage(totalPages)} disabled={safePage >= totalPages}
                        className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Last">
                        <FiChevronsRight className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
        </div>
        <CredentialsModal />
      </>
    );
  }

  // Add Student View
  if (view === "add") {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Add New Student</h2>
              <button
                onClick={() => navigate("/lms/superadmin/students/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={addForm.fullName}
                    onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                    placeholder="Enter student name"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={addForm.phone}
                    onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Password
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addForm.generatePassword}
                      onChange={(e) => setAddForm({ ...addForm, generatePassword: e.target.checked, password: "" })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600">Auto-generate secure password</span>
                  </label>
                </div>
                {!addForm.generatePassword ? (
                  <div className="relative">
                    <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      value={addForm.password}
                      onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                      placeholder="Enter custom password (min 8 characters)"
                      minLength={8}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-700 flex items-center gap-2">
                      <FiLock className="w-4 h-4" />
                      A secure password will be automatically generated
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleAddStudent}
                  disabled={saving || !addForm.email || !addForm.fullName}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Adding..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Add Student
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/students/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        <CredentialsModal />
      </>
    );
  }

  // Edit Student View
  if (view === "edit") {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Student</h2>
              <button
                onClick={() => navigate("/lms/superadmin/students/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    placeholder="Enter student name"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleEditStudent}
                  disabled={saving || !editForm.email || !editForm.fullName}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoading text="Saving..." size="sm" />
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate("/lms/superadmin/students/list")}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        <CredentialsModal />
      </>
    );
  }

  // Student Details View
  if (view === "details" && selectedStudent) {
    const student = selectedStudent;
    const progress = student.progress || {};
    const streakDays = student.streak_days || 0;
    const totalProjects = student.total_projects || 0;

    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-md p-8 border border-slate-200 shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                  {student.full_name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {student.full_name || "Unnamed Student"}
                  </h2>
                  <p className="text-slate-600">{student.email}</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/lms/superadmin/students/list")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiTrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Streak</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600">{streakDays}</div>
                <div className="text-xs text-slate-600 mt-1">Days active</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-md p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiTrendingUp className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Progress</h3>
                </div>
                <div className="text-3xl font-bold text-emerald-600">
                  {progress.completed_lessons || 0}
                </div>
                <div className="text-xs text-slate-600 mt-1">Lessons completed</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-md p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <FiBriefcase className="w-6 h-6 text-purple-600" />
                  <h3 className="text-sm font-semibold text-slate-700">Projects</h3>
                </div>
                <div className="text-3xl font-bold text-purple-600">{totalProjects}</div>
                <div className="text-xs text-slate-600 mt-1">Active projects</div>
              </div>
              </div>

              {/* Student Information */}
              <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Student ID</div>
                    <div className="text-sm font-medium text-slate-900">{student.id}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Full Name</div>
                    <div className="text-sm font-medium text-slate-900">
                      {student.full_name || "Not provided"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Email</div>
                    <div className="text-sm font-medium text-slate-900">{student.email}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Phone Number</div>
                    <div className="text-sm font-medium text-slate-900">
                      {student.phone || "Not provided"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">College</div>
                    <div className="text-sm font-medium text-slate-900">
                      {student.college || "Not provided"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Status</div>
                    <div className="text-sm font-medium">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          student.is_active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Joined Date</div>
                    <div className="text-sm font-medium text-slate-900">
                      {new Date(student.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Details */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Learning Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Completed Lessons</div>
                    <div className="text-2xl font-bold text-slate-900">
                      {progress.completed_lessons || 0}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">In Progress</div>
                    <div className="text-2xl font-bold text-slate-900">
                      {progress.in_progress_lessons || 0}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Watch Time</div>
                    <div className="text-2xl font-bold text-slate-900">
                      {Math.floor((progress.total_watch_seconds || 0) / 60)} min
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                <button
                  onClick={() => openEdit(selectedStudent)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <FiEdit2 className="w-5 h-5" />
                  Edit Student
                </button>
                <button
                  onClick={() => handleResetPassword(student.id, student.email)}
                  disabled={resettingPassword}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                >
                  {resettingPassword ? (
                    <ButtonLoading text="Resetting..." size="sm" />
                  ) : (
                    <>
                      <FiRefreshCw className="w-5 h-5" />
                      Reset Password
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDeleteStudent(selectedStudent.id)}
                  className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-md hover:bg-red-100 transition-colors flex items-center gap-2"
                >
                  <FiTrash2 className="w-5 h-5" />
                  Remove Student
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
        <CredentialsModal />
      </>
    );
  }

  return null;
}
