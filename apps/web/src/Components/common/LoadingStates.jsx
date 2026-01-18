import { motion } from "framer-motion";
import { FiRefreshCw, FiLoader } from "react-icons/fi";

// Full page loading with animated gradient
export function PageLoading({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto"
          >
            <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600"
            ></motion.div>
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl"
          ></motion.div>
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-slate-600 font-medium"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}

// Skeleton card loader for list/grid views
export function SkeletonCard({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg"
        >
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

// Skeleton table row loader
export function SkeletonTableRow({ columns = 5 }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, idx) => (
        <td key={idx} className="px-6 py-4">
          <div className="h-4 bg-slate-200 rounded"></div>
        </td>
      ))}
    </tr>
  );
}

// Button loading state with spinner
export function ButtonLoading({ text = "Loading...", size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  return (
    <div className="flex items-center justify-center gap-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className={sizeClasses[size]}
      >
        <FiRefreshCw className={`${sizeClasses[size]} text-current`} />
      </motion.div>
      <span>{text}</span>
    </div>
  );
}

// Progress bar with animated fill
export function ProgressBar({ progress = 0, label = "", color = "from-blue-500 to-indigo-600" }) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-700 font-medium">{label}</span>
          <span className="text-slate-600">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
        />
      </div>
    </div>
  );
}

// Overlay loading for buttons/actions
export function ActionLoading({ message = "Processing..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4"
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto relative"
          >
            <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600"
            ></motion.div>
          </motion.div>
          <p className="text-slate-700 font-medium">{message}</p>
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 bg-indigo-600 rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Inline loading spinner for small spaces
export function InlineSpinner({ size = "md", color = "text-indigo-600" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} ${color}`}
    >
      <FiRefreshCw className={sizeClasses[size]} />
    </motion.div>
  );
}

// Skeleton form loader
export function SkeletonForm() {
  return (
    <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg space-y-6 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/3"></div>
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-10 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-10 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-24 bg-slate-200 rounded"></div>
      </div>
      <div className="flex gap-3 justify-end pt-4">
        <div className="h-10 bg-slate-200 rounded w-24"></div>
        <div className="h-10 bg-slate-200 rounded w-32"></div>
      </div>
    </div>
  );
}
