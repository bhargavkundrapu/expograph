import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { FiUser, FiMail, FiPhone, FiEdit, FiSave, FiX } from "react-icons/fi";

export default function StudentProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  const handleSave = async () => {
    // Mock save - replace with actual API call
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-200/50 shadow-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
              >
                <FiEdit className="w-5 h-5" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <FiX className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
                >
                  <FiSave className="w-5 h-5" />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.full_name?.charAt(0) || user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{user?.full_name || user?.name || "Student"}</h2>
                <p className="text-slate-600">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-800">{formData.full_name || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-800">{formData.email || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-800">{formData.phone || "Not set"}</p>
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
                  className="w-full px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-800 min-h-[100px]">
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
