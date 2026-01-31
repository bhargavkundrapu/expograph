import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { GenericPageSkeleton } from "../../../Components/common/SkeletonLoaders";
import {
  FiUsers,
  FiShare2,
  FiCopy,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiArrowLeft,
  FiMail,
  FiLink,
} from "react-icons/fi";

export default function StudentReferrals() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);
  const [referralLink, setReferralLink] = useState("");
  const [stats, setStats] = useState({
    total_referrals: 0,
    successful_referrals: 0,
    pending_referrals: 0,
    rewards_earned: 0,
  });

  useEffect(() => {
    if (!token) return;
    fetchReferrals();
    generateReferralLink();
  }, [token]);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockReferrals = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          status: "successful",
          referred_at: new Date(Date.now() - 2592000000).toISOString(),
          enrolled_at: new Date(Date.now() - 1728000000).toISOString(),
          reward: "$50",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          status: "pending",
          referred_at: new Date(Date.now() - 86400000).toISOString(),
          enrolled_at: null,
          reward: null,
        },
      ];
      setReferrals(mockReferrals);
      setStats({
        total_referrals: mockReferrals.length,
        successful_referrals: mockReferrals.filter((r) => r.status === "successful").length,
        pending_referrals: mockReferrals.filter((r) => r.status === "pending").length,
        rewards_earned: 50,
      });
    } catch (error) {
      console.error("Failed to fetch referrals:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateReferralLink = () => {
    // Generate referral link - replace with actual API call
    const link = `${window.location.origin}/signup?ref=${user?.id || "student123"}`;
    setReferralLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on ExpoGraph!",
          text: "Check out this amazing learning platform",
          url: referralLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      handleCopyLink();
    }
  };

  if (loading) {
    return <GenericPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Referrals
          </h1>
          <p className="text-slate-600 text-lg">Invite friends and earn rewards</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md text-white">
                <FiUsers className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {stats.total_referrals}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Total Referrals</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-emerald-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-md text-white">
                <FiCheckCircle className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {stats.successful_referrals}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Successful</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-amber-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-md text-white">
                <FiClock className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {stats.pending_referrals}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Pending</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-purple-200/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md text-white">
                <FiCheckCircle className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${stats.rewards_earned}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Rewards Earned</h3>
          </motion.div>
        </div>

        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 shadow-lg mb-8"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Your Referral Link</h2>
          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-md flex items-center gap-3">
              <FiLink className="w-5 h-5 text-cyan-600" />
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-slate-700 font-mono text-sm"
              />
            </div>
            <button
              onClick={handleCopyLink}
              className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
            >
              <FiCopy className="w-5 h-5" />
              Copy
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-md hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <FiShare2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </motion.div>

        {/* Referrals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-md p-6 border-2 border-cyan-200/50 shadow-lg"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6">Referral History</h2>
          {referrals.length === 0 ? (
            <div className="text-center py-12">
              <FiUsers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No referrals yet</h3>
              <p className="text-slate-500">Share your referral link to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="p-4 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-md border-2 border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md text-white">
                      <FiUsers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{referral.name}</h3>
                      <p className="text-sm text-slate-600">{referral.email}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Referred {new Date(referral.referred_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`px-4 py-2 rounded-md border-2 ${
                        referral.status === "successful"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                          : "bg-amber-50 border-amber-200 text-amber-600"
                      }`}
                    >
                      <span className="font-semibold capitalize">{referral.status}</span>
                    </div>
                    {referral.reward && (
                      <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-md">
                        <span className="font-bold text-purple-600">{referral.reward}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
