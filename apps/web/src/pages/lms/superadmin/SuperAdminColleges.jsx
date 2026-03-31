import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { FiPlus, FiTrash2, FiBook, FiLoader, FiAlertCircle, FiCheck } from "react-icons/fi";

const OTHER_LABEL = "Others (Working Professional / Not Listed)";

export default function SuperAdminColleges() {
  const { token } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchColleges = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/v1/admin/colleges", { token });
      setColleges(Array.isArray(res?.data) ? res.data : []);
    } catch (e) {
      setError(e?.message || "Failed to load colleges");
      setColleges([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchColleges();
  }, [token, fetchColleges]);

  const clearFeedback = () => {
    setError(null);
    setSuccess(null);
  };

  const handleAdd = async (e) => {
    e?.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setAdding(true);
    setError(null);
    setSuccess(null);
    try {
      await apiFetch("/api/v1/admin/colleges", {
        method: "POST",
        token,
        body: { name },
      });
      setNewName("");
      setSuccess(`"${name}" added.`);
      await fetchColleges();
      setTimeout(clearFeedback, 3000);
    } catch (e) {
      setError(e?.message || "Failed to add college");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this college from the dropdown? Existing student data will keep the value.")) return;
    setDeletingId(id);
    setError(null);
    setSuccess(null);
    try {
      await apiFetch(`/api/v1/admin/colleges/${id}`, {
        method: "DELETE",
        token,
      });
      const name = colleges.find((c) => c.id === id)?.name;
      setSuccess(`"${name || "Item"}" removed.`);
      await fetchColleges();
      setTimeout(clearFeedback, 3000);
    } catch (e) {
      setError(e?.message || "Failed to remove");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600">
              <FiBook className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">College / Others</h1>
              <p className="text-sm text-slate-500">
                Manage options for the purchase form dropdown.
              </p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {(error || success) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-xl ${
                error ? "bg-red-50 text-red-800 border border-red-200" : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              {error ? <FiAlertCircle className="w-5 h-5 shrink-0" /> : <FiCheck className="w-5 h-5 shrink-0" />}
              <span className="text-sm font-medium">{error || success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onSubmit={handleAdd}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onFocus={clearFeedback}
            placeholder="e.g. IIT Delhi, BITS Pilani"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
            disabled={adding}
            maxLength={200}
          />
          <button
            type="submit"
            disabled={adding || !newName.trim()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {adding ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiPlus className="w-4 h-4" />}
            Add
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">Dropdown options ({colleges.length})</h2>
            <p className="text-xs text-slate-500 mt-1">
              "{OTHER_LABEL}" is always shown in the purchase form-no need to add it.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FiLoader className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
          ) : colleges.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-slate-500 mb-1">No colleges added yet.</p>
              <p className="text-sm text-slate-400">Add options above-they will appear in the purchase form dropdown.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {colleges.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-medium text-slate-800">{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingId === c.id}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    title="Remove"
                  >
                    {deletingId === c.id ? (
                      <FiLoader className="w-4 h-4 animate-spin" />
                    ) : (
                      <FiTrash2 className="w-4 h-4" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}
