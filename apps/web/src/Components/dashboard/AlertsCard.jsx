import { motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";

const alertIcons = {
  error: FiXCircle,
  warning: FiAlertCircle,
  info: FiInfo,
  success: FiCheckCircle,
};

const alertStyles = {
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
    text: "text-red-900",
    badge: "bg-red-100 text-red-700",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-600",
    text: "text-amber-900",
    badge: "bg-amber-100 text-amber-700",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    text: "text-blue-900",
    badge: "bg-blue-100 text-blue-700",
  },
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "text-emerald-600",
    text: "text-emerald-900",
    badge: "bg-emerald-100 text-emerald-700",
  },
};

export default function AlertsCard({ alerts = [] }) {
  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">System Alerts</h3>
        <p className="text-slate-500 text-sm">All systems operational</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">System Alerts</h3>
        {alerts.length > 0 && (
          <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
            {alerts.length}
          </span>
        )}
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alertIcons[alert.severity] || FiAlertCircle;
          const styles = alertStyles[alert.severity] || alertStyles.info;

          return (
            <motion.div
              key={alert.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${styles.bg} ${styles.border} border rounded-lg p-4 flex items-start gap-3`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.icon}`} />
              <div 
                className={`flex-1 min-w-0 ${alert.action ? 'cursor-pointer' : ''}`}
                onClick={typeof alert.action === 'function' ? alert.action : undefined}
              >
                <div className="flex items-center gap-2 mb-1">
                  <p className={`text-sm font-semibold ${styles.text}`}>{alert.title}</p>
                  {alert.count && (
                    <span className={`px-2 py-0.5 ${styles.badge} text-xs font-semibold rounded`}>
                      {alert.count}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">{alert.message}</p>
                {alert.timestamp && (
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
