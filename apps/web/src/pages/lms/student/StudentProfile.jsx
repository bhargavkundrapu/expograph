import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { useGamification, LEVELS } from "../../../app/providers/GamificationProvider";
import { apiFetch } from "../../../services/api";
import { FiUser, FiMail, FiPhone, FiEdit, FiSave, FiX, FiHash, FiCopy } from "react-icons/fi";
import { AchievementGrid } from "../../../Components/student/gamification/AchievementBadges";
import WeeklyStreak from "../../../Components/student/gamification/WeeklyStreak";

export default function StudentProfile() {
  const { user, token, updateUser } = useAuth();
  const { isDark } = useTheme();
  const { totalXP, currentLevel, nextLevel, levelProgress, currentStreak, bestStreak, lessonsCompleted, coursesCompleted, weeklyXP, weeklyXPGoal } = useGamification();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const lastStudentIdRef = useRef("");
  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    studentId: user?.studentId || user?.student_id || "",
  });

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    apiFetch("/api/v1/student/profile", { token })
      .then((res) => {
        if (cancelled) return;
        const d = res?.data;
        if (d) {
          const phone = d.phone ?? d.customer_phone ?? "";
          const rawId = d.studentId ?? d.student_id ?? "";
          const studentId = rawId != null && rawId !== "" ? String(rawId).trim() : "";
          if (studentId) lastStudentIdRef.current = studentId;
          setFormData((prev) => ({
            fullName: d.fullName || d.full_name || prev.fullName,
            email: d.email || prev.email,
            phone: phone || prev.phone,
            studentId: studentId || prev.studentId || "",
          }));
          if (updateUser) {
            updateUser({
              ...user,
              fullName: d.fullName || d.full_name,
              email: d.email,
              phone,
              studentId: d.studentId ?? d.student_id,
              student_id: d.studentId ?? d.student_id,
            });
          }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setProfileLoaded(true); });
    return () => { cancelled = true; };
  }, [token]);

  useEffect(() => {
    if (profileLoaded) return;
    setFormData((prev) => ({
      fullName: user?.fullName || user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      studentId: user?.studentId ?? user?.student_id ?? prev.studentId ?? "",
    }));
  }, [user]);

  const handleSave = async () => {
    if (!token) return;
    try {
      setSaving(true);
      const response = await apiFetch("/api/v1/student/profile", {
        token,
        method: "PATCH",
        body: { fullName: formData.fullName, email: formData.email, phone: formData.phone || undefined },
      });
      if (response?.data) {
        if (updateUser) {
          updateUser({
            ...user,
            fullName: response.data.fullName || response.data.full_name,
            full_name: response.data.fullName || response.data.full_name,
            email: response.data.email,
            phone: response.data.phone,
            studentId: response.data.studentId ?? response.data.student_id,
            student_id: response.data.studentId ?? response.data.student_id,
          });
        }
        setIsEditing(false);
        setFormData({
          fullName: response.data.fullName || response.data.full_name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          studentId: response.data.studentId ?? response.data.student_id ?? formData.studentId,
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error?.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const userName = formData.fullName || user?.fullName || user?.full_name || user?.name || "Student";
  const userInitial = userName.charAt(0).toUpperCase();
  const displayUserId = (formData.studentId != null && formData.studentId !== "" ? String(formData.studentId).trim() : "") || lastStudentIdRef.current || "";

  const copyUserId = () => {
    const id = displayUserId || formData.studentId?.toString().trim();
    if (!id) return;
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-200 ${isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-slate-50"}`}>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl overflow-hidden border shadow-lg ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
        >
          {/* Banner — visible, premium color; matches indigo/violet theme */}
          <div
            className="h-24 sm:h-32 relative"
            style={
              isDark
                ? { background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)" }
                : { background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #ddd6fe 100%)" }
            }
          >
            <div className="absolute bottom-0 left-6 sm:left-8 translate-y-1/2">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg border-4 ${isDark ? "border-slate-800" : "border-white"}`}
                style={
                  isDark
                    ? { background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" }
                    : { background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)" }
                }
              >
                {userInitial}
              </div>
            </div>
          </div>

          <div className="pt-12 sm:pt-14 px-6 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{userName}</h1>
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{formData.email}</p>
                {displayUserId ? (
                  <button
                    type="button"
                    onClick={copyUserId}
                    className={`text-xs mt-1 flex items-center gap-1.5 font-mono rounded-lg px-2 py-1 -ml-1 transition-colors ${isDark ? "text-slate-400 hover:bg-slate-700/50" : "text-slate-500 hover:bg-slate-100"}`}
                    title="Copy User ID"
                  >
                    <FiHash className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>User ID:</span>
                    <span className={`font-semibold ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>{displayUserId}</span>
                    {copiedId ? <span className="text-emerald-500 text-[10px]">Copied!</span> : <FiCopy className="w-3 h-3 opacity-60" />}
                  </button>
                ) : (
                  <p className={`text-xs mt-1 flex items-center gap-1.5 font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    <FiHash className="w-3.5 h-3.5" />
                    <span>User ID:</span>
                    <span>{profileLoaded ? "—" : "…"}</span>
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}>
                    Lv.{currentLevel.level} {currentLevel.title}
                  </span>
                  <span className="text-xs text-slate-400">🔥 {currentStreak}d streak</span>
                  <span className="text-xs text-slate-400">⚡ {totalXP.toLocaleString()} XP</span>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all flex items-center gap-2 text-sm shadow-md"
                >
                  <FiEdit className="w-4 h-4" /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className={`px-4 py-2.5 border font-medium rounded-xl transition-all flex items-center gap-1.5 text-sm ${isDark ? "bg-slate-700 border-slate-600 text-slate-300" : "bg-white border-slate-200 text-slate-700"}`}>
                    <FiX className="w-4 h-4" /> Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl transition-all flex items-center gap-1.5 text-sm shadow-md disabled:opacity-50">
                    <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            {/* Level progress */}
            <div className={`p-3 rounded-xl ${isDark ? "bg-slate-700/30" : "bg-slate-50"}`}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={isDark ? "text-slate-400" : "text-slate-500"}>Level {currentLevel.level}: {currentLevel.title}</span>
                <span className={isDark ? "text-slate-400" : "text-slate-500"}>{nextLevel ? `${nextLevel.minXP - totalXP} XP to Level ${nextLevel.level}` : "Max Level!"}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {[
            { label: "Total XP", value: totalXP.toLocaleString(), icon: "⚡", color: isDark ? "text-indigo-400" : "text-indigo-600" },
            { label: "Level", value: currentLevel.title, icon: "🏅", color: isDark ? "text-amber-400" : "text-amber-600" },
            { label: "Current Streak", value: `${currentStreak} days`, icon: "🔥", color: isDark ? "text-orange-400" : "text-orange-600" },
            { label: "Best Streak", value: `${bestStreak} days`, icon: "🏆", color: isDark ? "text-yellow-400" : "text-yellow-600" },
            { label: "Lessons Done", value: lessonsCompleted.toString(), icon: "📚", color: isDark ? "text-green-400" : "text-green-600" },
            { label: "Weekly XP", value: `${weeklyXP}/${weeklyXPGoal}`, icon: "📊", color: isDark ? "text-blue-400" : "text-blue-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`rounded-xl p-4 text-center border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100 shadow-sm"}`}
            >
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <p className={`text-base sm:text-lg font-bold ${stat.color}`}>{stat.value}</p>
              <p className={`text-[10px] font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Details - Left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`lg:col-span-2 rounded-2xl p-5 sm:p-6 border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100 shadow-sm"}`}
          >
            <h2 className={`text-base font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-800"}`}>
              <FiUser className="w-4 h-4 text-indigo-500" /> Personal Details
            </h2>
            <div className={`mb-4 p-3 rounded-xl border ${formData.studentId ? "bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border-indigo-500/20" : isDark ? "bg-slate-700/30 border-slate-600" : "bg-slate-50 border-slate-200"}`}>
              <label className={`block text-xs font-semibold mb-1 flex items-center gap-1.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                <FiHash className="w-3.5 h-3.5 text-indigo-500" /> User ID (Student ID)
              </label>
              {displayUserId ? (
                <button
                  type="button"
                  onClick={copyUserId}
                  className={`w-full text-left font-mono text-lg font-bold tracking-wider rounded-lg py-1.5 px-2 -mx-1 transition-colors flex items-center justify-between gap-2 ${isDark ? "text-indigo-300 hover:bg-slate-700/50" : "text-indigo-700 hover:bg-indigo-50"}`}
                  title="Click to copy"
                >
                  <span>{displayUserId}</span>
                  {copiedId ? <span className="text-xs font-normal text-emerald-500">Copied!</span> : <FiCopy className="w-4 h-4 opacity-60 flex-shrink-0" />}
                </button>
              ) : (
                <p className={`font-mono text-lg ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  {profileLoaded ? "—" : "…"}
                </p>
              )}
              <p className={`text-[10px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {displayUserId ? "Click the ID or the copy icon to copy" : "Run migration: cd apps/api && npm run migrate"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", key: "fullName", icon: FiUser, type: "text" },
                { label: "Email", key: "email", icon: FiMail, type: "email" },
                { label: "Phone", key: "phone", icon: FiPhone, type: "tel" },
              ].map(field => {
                const Icon = field.icon;
                return (
                  <div key={field.key}>
                    <label className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      <Icon className="w-3.5 h-3.5" /> {field.label}
                    </label>
                    {isEditing ? (
                      <input
                        type={field.type}
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isDark ? "bg-slate-700/50 border-slate-600 text-white" : "bg-slate-50 border-slate-200"}`}
                      />
                    ) : (
                      <p className={`px-3.5 py-2.5 rounded-xl text-sm ${isDark ? "bg-slate-700/30 text-slate-200" : "bg-slate-50 text-slate-800"}`}>
                        {formData[field.key] || "Not set"}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Streak widget - Right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WeeklyStreak />
          </motion.div>
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <AchievementGrid maxShow={18} />
        </motion.div>
      </div>
    </div>
  );
}
