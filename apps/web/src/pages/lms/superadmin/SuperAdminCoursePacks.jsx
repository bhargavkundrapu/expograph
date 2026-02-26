import { useState, useEffect } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiPackage,
  FiEdit2,
  FiSave,
  FiX,
  FiCheck,
  FiChevronDown,
  FiDollarSign,
  FiBook,
} from "react-icons/fi";

function formatPrice(paise) {
  if (paise == null || paise === undefined) return "—";
  const rupees = Math.round(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

export default function SuperAdminCoursePacks() {
  const { token } = useAuth();
  const [packs, setPacks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPack, setEditingPack] = useState(null);
  const [packEditForm, setPackEditForm] = useState({
    title: "",
    slug: "",
    description: "",
    priceRupees: "",
    status: "published",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCoursePicker, setShowCoursePicker] = useState(false);
  const [packCourseIds, setPackCourseIds] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchPacks();
    fetchCourses();
  }, [token]);

  const fetchPacks = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/admin/packs", { token });
      setPacks(Array.isArray(res?.data) ? res.data : []);
    } catch (e) {
      console.error("Failed to fetch packs:", e);
      setPacks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await apiFetch("/api/v1/admin/courses", { token });
      setCourses(Array.isArray(res?.data) ? res.data : []);
    } catch (e) {
      setCourses([]);
    }
  };

  const openEditPack = async (pack) => {
    setEditingPack(pack);
    const pricePaise = pack.price_in_paise ?? 0;
    setPackEditForm({
      title: pack.title || "",
      slug: pack.slug || "",
      description: pack.description || "",
      priceRupees: pricePaise > 0 ? String(Math.round(pricePaise / 100)) : "",
      status: pack.status || "published",
    });
    setShowEditModal(true);
    try {
      const res = await apiFetch(`/api/v1/admin/packs/${pack.id}/courses`, { token });
      const ids = res?.data?.course_ids || [];
      setPackCourseIds(ids);
    } catch {
      setPackCourseIds([]);
    }
  };

  const handleUpdatePack = async () => {
    if (!editingPack) return;
    setSaving(true);
    try {
      const pricePaise =
        packEditForm.priceRupees && !isNaN(Number(packEditForm.priceRupees))
          ? Math.round(Number(packEditForm.priceRupees) * 100)
          : undefined;
      await apiFetch(`/api/v1/admin/packs/${editingPack.id}`, {
        method: "PATCH",
        token,
        body: {
          title: packEditForm.title.trim() || undefined,
          slug: packEditForm.slug.trim() || undefined,
          description: packEditForm.description?.trim() || undefined,
          ...(pricePaise !== undefined && { price_in_paise: Math.max(0, pricePaise) }),
          status: packEditForm.status,
        },
      });
      await apiFetch(`/api/v1/admin/packs/${editingPack.id}/courses`, {
        method: "PUT",
        token,
        body: { course_ids: packCourseIds },
      });
      setShowEditModal(false);
      setEditingPack(null);
      fetchPacks();
    } catch (e) {
      console.error("Failed to update pack:", e);
    } finally {
      setSaving(false);
    }
  };

  const toggleCourseInPack = (courseId) => {
    setPackCourseIds((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const selectAllCourses = () => {
    setPackCourseIds(courses.map((c) => c.id));
  };

  const clearCourses = () => {
    setPackCourseIds([]);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-700/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Course Packs</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage pack prices and which courses are included in each pack
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {packs.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-12 text-center">
            <FiPackage className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No course packs found.</p>
            <p className="text-slate-500 text-sm mt-1">
              Create packs in the database (e.g. seed 005_seed_course_pack.sql)
            </p>
          </div>
        ) : (
          packs.map((pack) => (
            <div
              key={pack.id}
              className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <FiPackage className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white truncate">{pack.title}</h2>
                    <p className="text-slate-500 text-sm">{pack.slug}</p>
                  </div>
                </div>
                {pack.description && (
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">{pack.description}</p>
                )}
                <div className="flex items-center gap-4 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-700/50 text-slate-300 text-sm font-mono">
                    <FiDollarSign className="w-4 h-4" />
                    {formatPrice(pack.price_in_paise)}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm ${
                      pack.status === "published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-600/50 text-slate-400"
                    }`}
                  >
                    {pack.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => openEditPack(pack)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Edit Pack Modal */}
      {showEditModal && editingPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          />
          <div className="relative bg-slate-800 rounded-2xl shadow-xl border border-slate-700 max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Edit Pack</h3>
              <p className="text-slate-400 text-sm mt-1">{editingPack.slug}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={packEditForm.title}
                  onChange={(e) => setPackEditForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Pack title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={packEditForm.priceRupees}
                  onChange={(e) => setPackEditForm((f) => ({ ...f, priceRupees: e.target.value }))}
                  placeholder="e.g. 199"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-slate-500 text-xs mt-1">Minimum ₹1 for paid packs</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  value={packEditForm.status}
                  onChange={(e) => setPackEditForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Courses in this pack ({packCourseIds.length})
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllCourses}
                      className="text-xs px-2 py-1 rounded bg-slate-600/50 text-slate-300 hover:bg-slate-600"
                    >
                      Select all
                    </button>
                    <button
                      onClick={clearCourses}
                      className="text-xs px-2 py-1 rounded bg-slate-600/50 text-slate-300 hover:bg-slate-600"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="border border-slate-600 rounded-lg max-h-48 overflow-y-auto bg-slate-900/30">
                  {courses.length === 0 ? (
                    <p className="p-4 text-slate-500 text-sm">No courses available</p>
                  ) : (
                    <div className="divide-y divide-slate-700/50">
                      {courses.map((c) => (
                        <label
                          key={c.id}
                          className="flex items-center gap-3 p-3 hover:bg-slate-700/20 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={packCourseIds.includes(c.id)}
                            onChange={() => toggleCourseInPack(c.id)}
                            className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
                          />
                          <FiBook className="w-4 h-4 text-slate-500 shrink-0" />
                          <span className="text-slate-200 truncate">{c.title}</span>
                          {c.status && (
                            <span
                              className={`ml-auto text-xs px-2 py-0.5 rounded ${
                                c.status === "published" ? "bg-green-500/20 text-green-400" : "bg-slate-600/50"
                              }`}
                            >
                              {c.status}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Students who buy this pack get access to all selected courses
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePack}
                disabled={saving || !packEditForm.title.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
              >
                {saving ? <ButtonLoading text="Saving..." size="sm" /> : <><FiSave className="w-4 h-4" /> Save</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
