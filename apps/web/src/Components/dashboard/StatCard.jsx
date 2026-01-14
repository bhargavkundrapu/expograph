import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export default function StatCard({
  title,
  value,
  change,
  changeType = "positive", // "positive" | "negative" | "neutral"
  icon: Icon,
  gradient = "from-blue-500 to-indigo-600",
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
              changeType === "positive"
                ? "bg-emerald-50 text-emerald-600"
                : changeType === "negative"
                ? "bg-red-50 text-red-600"
                : "bg-slate-50 text-slate-600"
            }`}
          >
            {changeType === "positive" && <FiTrendingUp className="w-3 h-3" />}
            {changeType === "negative" && <FiTrendingDown className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-sm text-slate-600">{title}</p>
    </motion.div>
  );
}
