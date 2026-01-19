import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiMessageSquare,
  FiPlus,
  FiThumbsUp,
  FiSend,
  FiX,
  FiSearch,
  FiUser,
  FiClock,
  FiBookmark,
  FiZap,
} from "react-icons/fi";

export default function StudentDiscussions() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newDiscussion, setNewDiscussion] = useState({
    discussion_name: "",
    problem: "",
  });
  const [newReply, setNewReply] = useState("");
  const [creating, setCreating] = useState(false);
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchDiscussions();
  }, [token]);

  useEffect(() => {
    if (selectedDiscussion) {
      fetchDiscussionDetails();
    }
  }, [selectedDiscussion]);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/v1/student/discussions", { token }).catch(() => ({ data: [] }));
      setDiscussions(res?.data || []);
    } catch (error) {
      console.error("Failed to fetch discussions:", error);
      setDiscussions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiscussionDetails = async () => {
    if (!selectedDiscussion) return;
    try {
      const res = await apiFetch(`/api/v1/student/discussions/${selectedDiscussion.id}`, { token }).catch(() => ({ data: null }));
      if (res?.data) {
        setSelectedDiscussion(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch discussion details:", error);
    }
  };

  const handleCreateDiscussion = async () => {
    if (!newDiscussion.discussion_name.trim() || !newDiscussion.problem.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setCreating(true);
      const res = await apiFetch("/api/v1/student/discussions", {
        method: "POST",
        token,
        body: newDiscussion,
      });

      if (res?.ok || res?.id) {
        await fetchDiscussions();
        setShowCreateModal(false);
        setNewDiscussion({ discussion_name: "", problem: "" });
        alert("Discussion created successfully!");
      }
    } catch (error) {
      alert(error?.message || "Failed to create discussion");
    } finally {
      setCreating(false);
    }
  };

  const handleReply = async () => {
    if (!newReply.trim() || !selectedDiscussion) return;

    try {
      setReplying(true);
      const res = await apiFetch(`/api/v1/student/discussions/${selectedDiscussion.id}/replies`, {
        method: "POST",
        token,
        body: { message: newReply },
      });

      if (res?.ok || res?.id) {
        setNewReply("");
        await fetchDiscussionDetails();
      }
    } catch (error) {
      alert(error?.message || "Failed to post reply");
    } finally {
      setReplying(false);
    }
  };

  const handleUpvote = async (discussionId) => {
    try {
      await apiFetch(`/api/v1/student/discussions/${discussionId}/upvote`, {
        method: "POST",
        token,
      });
      await fetchDiscussions();
      if (selectedDiscussion?.id === discussionId) {
        await fetchDiscussionDetails();
      }
    } catch (error) {
      console.error("Failed to upvote:", error);
    }
  };

  const filteredDiscussions = discussions.filter((disc) =>
    disc.discussion_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disc.problem?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <PageLoading />;
  }

  // Discussion Detail View
  if (selectedDiscussion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedDiscussion(null)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <FiX className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-2xl font-bold text-slate-900">{selectedDiscussion.discussion_name}</h1>
              <div></div>
            </div>

            {/* Original Post */}
            <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {selectedDiscussion.author_name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-slate-900">{selectedDiscussion.author_name || "User"}</span>
                    <span className="text-xs text-slate-500">
                      <FiClock className="w-3 h-3 inline mr-1" />
                      {selectedDiscussion.created_at ? new Date(selectedDiscussion.created_at).toLocaleDateString() : "Recently"}
                    </span>
                  </div>
                  <p className="text-slate-700 whitespace-pre-wrap">{selectedDiscussion.problem}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => handleUpvote(selectedDiscussion.id)}
                      className="flex items-center gap-2 text-slate-600 hover:text-blue-600"
                    >
                      <FiThumbsUp className="w-4 h-4" />
                      <span>{selectedDiscussion.upvotes || 0}</span>
                    </button>
                    <span className="text-sm text-slate-500">
                      {selectedDiscussion.replies_count || 0} replies
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Clarify Doubt Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <FiZap className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-slate-900">AI Clarify Doubt</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Ask AI to clarify any doubts about this discussion</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                  Ask AI
                </button>
              </div>
            </div>

            {/* Replies */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-bold text-slate-900">Replies ({selectedDiscussion.replies?.length || 0})</h3>
              {selectedDiscussion.replies && selectedDiscussion.replies.length > 0 ? (
                selectedDiscussion.replies.map((reply, index) => (
                  <div key={reply.id || index} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                        {reply.author_name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900 text-sm">{reply.author_name || "User"}</span>
                          <span className="text-xs text-slate-500">
                            {reply.created_at ? new Date(reply.created_at).toLocaleDateString() : "Recently"}
                          </span>
                        </div>
                        <p className="text-slate-700 text-sm">{reply.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">No replies yet. Be the first to reply!</p>
              )}
            </div>

            {/* Reply Input */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write your reply..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <button
                    onClick={handleReply}
                    disabled={replying || !newReply.trim()}
                    className="mt-3 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {replying ? (
                      <ButtonLoading text="Posting..." size="sm" />
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        Post Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Discussion List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My Discussions</h1>
            <p className="text-slate-600">Ask questions, share knowledge, and learn together</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Create Discussion
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Discussions List */}
        {filteredDiscussions.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
            <FiMessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No discussions found</h3>
            <p className="text-slate-600 mb-6">Be the first to start a discussion!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Create Discussion
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedDiscussion(discussion)}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{discussion.discussion_name}</h3>
                    <p className="text-slate-600 line-clamp-2 mb-4">{discussion.problem}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <FiUser className="w-4 h-4" />
                        {discussion.author_name || "Anonymous"}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiMessageSquare className="w-4 h-4" />
                        {discussion.replies_count || 0} replies
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        {discussion.created_at ? new Date(discussion.created_at).toLocaleDateString() : "Recently"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpvote(discussion.id);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      <FiThumbsUp className="w-4 h-4" />
                      <span>{discussion.upvotes || 0}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement bookmark
                      }}
                      className="p-2 bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-600 rounded-lg transition-colors"
                      title="Bookmark"
                    >
                      <FiBookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Create Discussion Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Create Discussion</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-100"
                >
                  <FiX className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Discussion Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newDiscussion.discussion_name}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, discussion_name: e.target.value })}
                    placeholder="Enter discussion title..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    What's your problem? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newDiscussion.problem}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, problem: e.target.value })}
                    placeholder="Describe your question or problem..."
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={handleCreateDiscussion}
                  disabled={creating || !newDiscussion.discussion_name.trim() || !newDiscussion.problem.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <ButtonLoading text="Creating..." size="sm" />
                  ) : (
                    <>
                      <FiPlus className="w-5 h-5" />
                      Post Discussion
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
