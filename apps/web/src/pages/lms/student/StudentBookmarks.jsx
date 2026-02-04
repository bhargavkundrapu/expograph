import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import {
  FiBookmark,
  FiTrash2,
  FiFileText,
  FiHelpCircle,
  FiCode,
  FiMessageSquare,
  FiSearch,
  FiX,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";

export default function StudentBookmarks() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchBookmarks();
  }, [token]);

  // Refresh bookmarks when page becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && token) {
        fetchBookmarks();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
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

  const handleDelete = async (bookmarkId, e) => {
    e.stopPropagation();
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

  const handleBookmarkClick = (bookmark) => {
    if (bookmark.type === "lesson" && bookmark.course_slug && bookmark.module_slug && bookmark.lesson_slug) {
      navigate(`/lms/student/courses/${bookmark.course_slug}/modules/${bookmark.module_slug}/lessons/${bookmark.lesson_slug}`);
    } else if (bookmark.type === "discussion" && bookmark.item_id) {
      navigate(`/lms/student/discussions/${bookmark.item_id}`);
    }
    // For mcq and practice, you might want to navigate to the lesson they belong to
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
    const matchesSearch =
      !searchQuery ||
      bookmark.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.course_title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return <GenericPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Inspired by Courses page */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">MY CONTENT</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                My Bookmarks
              </h1>
              <p className="text-sm text-slate-500">{filteredBookmarks.length} {filteredBookmarks.length === 1 ? 'bookmark' : 'bookmarks'}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="max-w-md relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
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
        </div>

        {/* Bookmarks Grid - Inspired by Courses page */}
        {filteredBookmarks.length === 0 ? (
          <div className="bg-white rounded-lg p-12 border border-slate-200 text-center shadow-sm">
            <FiBookmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No bookmarks found</h3>
            <p className="text-slate-600">
              {searchQuery
                ? "Try adjusting your search query"
                : "Start bookmarking content to see it here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark, index) => {
              const Icon = getTypeIcon(bookmark.type);
              const colorGradient = getTypeColor(bookmark.type);
              const isClickable = bookmark.type === "lesson" && bookmark.course_slug && bookmark.module_slug && bookmark.lesson_slug;

              return (
                <motion.div
                  key={bookmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => isClickable && handleBookmarkClick(bookmark)}
                  className={`bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden ${
                    isClickable ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="p-6">
                    {/* Top Section */}
                    <div className="flex items-start justify-between mb-4">
                      {/* Left: Icon */}
                      <div className={`p-3 bg-gradient-to-br ${colorGradient} rounded-lg text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Right: Delete Button */}
                      <button
                        onClick={(e) => handleDelete(bookmark.id, e)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete bookmark"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="font-bold text-slate-900 mb-2 text-lg line-clamp-2">
                        {bookmark.title || "Untitled"}
                      </h3>
                      {bookmark.description && (
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{bookmark.description}</p>
                      )}
                      {bookmark.course_title && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <FiFileText className="w-3 h-3" />
                          <span className="truncate">{bookmark.course_title}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <FiClock className="w-3 h-3" />
                        <span>{new Date(bookmark.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {isClickable && (
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-sm font-semibold text-blue-600">View Lesson</span>
                        <FiChevronRight className="w-5 h-5 text-blue-600" />
                      </div>
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
