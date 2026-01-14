import { motion } from "framer-motion";

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "Just now";
  if (typeof timestamp === "string") {
    // If it's already formatted, return as is
    return timestamp;
  }
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

export default function ActivityFeed({ activities = [], maxItems = 5 }) {
  const displayActivities = activities.slice(0, maxItems);

  if (displayActivities.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <p className="text-slate-500 text-sm">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {displayActivities.map((activity, index) => (
          <motion.div
            key={activity.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
          >
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
              activity.type === "success" ? "bg-emerald-500" :
              activity.type === "warning" ? "bg-amber-500" :
              activity.type === "error" ? "bg-red-500" :
              "bg-blue-500"
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900 font-medium">{activity.action}</p>
              <p className="text-xs text-slate-500 mt-1">
                {activity.user} • {formatTimeAgo(activity.timestamp)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
