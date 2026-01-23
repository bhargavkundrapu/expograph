import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading } from "../../../Components/common/LoadingStates";
import {
  FiBookmark,
  FiTrash2,
  FiFileText,
  FiHelpCircle,
  FiCode,
  FiMessageSquare,
  FiFilter,
  FiSearch,
  FiX,
} from "react-icons/fi";

export default function StudentBookmarks() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [filter, setFilter] = useState("all"); // all, mcq, practice, lesson, discussion
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchBookmarks();
  }, [token]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/student/bookmarks", { token });
      setBookmarks(res?.data || []);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookmarkId) => {
    if (!confirm("Are you sure you want to remove this bookmark?")) return;

    try {
      await apiFetch(`/api/v1/student/bookmarks/${bookmarkId}`, {
        method: "DELETE",
        token,
      });
      setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
    } catch (error) {
      alert("Failed to delete bookmark");
      console.error("Failed to delete bookmark:", error);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "mcq":
        return FiHelpCircle;
      case "practice":
        return FiCode;
      case "lesson":
        return FiFileText;
      case "discussion":
        return FiMessageSquare;
      default:
        return FiBookmark;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "mcq":
        return "from-purple-500 to-pink-500";
      case "practice":
        return "from-cyan-500 to-blue-500";
      case "lesson":
        return "from-emerald-500 to-teal-500";
      case "discussion":
        return "from-indigo-500 to-purple-500";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesFilter = filter === "all" || bookmark.type === filter;
    const matchesSearch =
      !searchQuery ||
      bookmark.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const groupedBookmarks = filteredBookmarks.reduce((acc, bookmark) => {
    if (!acc[bookmark.type]) {
      acc[bookmark.type] = [];
    }
    acc[bookmark.type].push(bookmark);
    return acc;
  }, {});

  if (loading) {
    return <PageLoading />;
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
            My Bookmarks
          </h1>
          <p className="text-slate-600 text-lg">Save and organize your favorite content</p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-slate-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <FiFilter className="text-slate-600 w-5 h-5" />
              {["all", "mcq", "practice", "lesson", "discussion"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    filter === type
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bookmarks List */}
        {filteredBookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-12 border-2 border-cyan-200/50 text-center"
          >
            <FiBookmark className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No bookmarks found</h3>
            <p className="text-slate-500">
              {searchQuery || filter !== "all"
                ? "Try adjusting your filters or search query"
                : "Start bookmarking content to see it here"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedBookmarks).map(([type, items]) => {
              const Icon = getTypeIcon(type);
              const colorGradient = getTypeColor(type);

              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-md border-2 border-cyan-200/50 shadow-lg overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${colorGradient} p-4 flex items-center gap-3`}>
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white capitalize">
                      {type === "mcq" ? "MCQs" : type.charAt(0).toUpperCase() + type.slice(1)} ({items.length})
                    </h2>
                  </div>

                  <div className="p-6 space-y-4">
                    {items.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-md border-2 border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all group"
                      >
                        <div className={`p-3 bg-gradient-to-br ${colorGradient} rounded-lg text-white flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 mb-1">{bookmark.title || "Untitled"}</h3>
                          {bookmark.description && (
                            <p className="text-sm text-slate-600 mb-2 line-clamp-2">{bookmark.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>Bookmarked {new Date(bookmark.created_at).toLocaleDateString()}</span>
                            {bookmark.course_title && <span>• {bookmark.course_title}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              // Navigate based on type
                              if (bookmark.type === "lesson" && bookmark.item_id) {
                                navigate(`/lms/student/courses/${bookmark.course_slug || ""}`);
                              } else if (bookmark.type === "discussion" && bookmark.item_id) {
                                navigate(`/lms/student/discussions/${bookmark.item_id}`);
                              }
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all opacity-0 group-hover:opacity-100"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(bookmark.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete bookmark"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
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
