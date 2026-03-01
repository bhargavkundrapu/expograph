import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { FiUser, FiMail, FiPhone, FiEdit, FiSave, FiX } from "react-icons/fi";

export default function StudentProfile() {
  const { user, token, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
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
          setFormData((prev) => ({
            fullName: d.fullName || d.full_name || prev.fullName,
            email: d.email || prev.email,
            phone: phone || prev.phone,
            bio: prev.bio,
          }));
          if (updateUser) {
            updateUser({ ...user, fullName: d.fullName || d.full_name, email: d.email, phone });
          }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setProfileLoaded(true); });
    return () => { cancelled = true; };
  }, [token]);

  useEffect(() => {
    if (profileLoaded) return;
    setFormData({
      fullName: user?.fullName || user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
    });
  }, [user]);

  const handleSave = async () => {
    if (!token) return;
    
    try {
      setSaving(true);
      const response = await apiFetch("/api/v1/student/profile", {
        token,
        method: "PATCH",
        body: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || undefined,
        },
      });
      
      if (response?.data) {
        // Update user in AuthProvider
        if (updateUser) {
          updateUser({
            ...user,
            fullName: response.data.fullName || response.data.full_name,
            full_name: response.data.fullName || response.data.full_name,
            email: response.data.email,
            phone: response.data.phone,
          });
        }
        setIsEditing(false);
        // Update formData to reflect saved changes
        setFormData({
          fullName: response.data.fullName || response.data.full_name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          bio: formData.bio, // Keep bio as is since it's not updated
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error?.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 md:p-8 border border-indigo-100 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all flex items-center gap-2 shadow-md"
              >
                <FiEdit className="w-5 h-5" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-white border border-indigo-200 text-slate-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2"
                >
                  <FiX className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSave className="w-5 h-5" />
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold flex-shrink-0 shadow-lg">
                {(user?.fullName || user?.full_name || user?.name || "U")?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-slate-800 break-words">{user?.fullName || user?.full_name || user?.name || "Student"}</h2>
                <p className="text-slate-600">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-md text-slate-800">{formData.fullName || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-md text-slate-800">{formData.email || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-md text-slate-800">{formData.phone || "Not set"}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-md text-slate-800 min-h-[100px]">
                  {formData.bio || "No bio added yet"}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
