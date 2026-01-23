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
} from "react-icons/fi";

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
    if (!searchQuery.trim()) {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.phone?.includes(searchQuery)
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

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
        token,
      });

      if (res?.ok) {
        await fetchStudents();
        if (view === "details" && selectedStudent?.id === studentId) {
          navigate("/lms/superadmin/students/list");
        }
      }
    } catch (error) {
      alert(error?.message || "Failed to delete student");
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

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Students Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-md p-6 border border-slate-200 animate-pulse">
                  <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
              <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No students found</h3>
              <p className="text-slate-600">
                {searchQuery ? "Try a different search term" : "Get started by adding your first student"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-md p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {student.full_name?.charAt(0)?.toUpperCase() || "S"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 truncate">
                        {student.full_name || "Unnamed Student"}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">{student.email}</p>
                      {student.phone && (
                        <p className="text-xs text-slate-500 mt-1">{student.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(student)}
                      className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDetails(student)}
                      className="flex-1 px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEye className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
