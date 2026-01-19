import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

export default function StudentResumeBuilder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border-2 border-cyan-200/50 text-center"
        >
          <FiFileText className="w-20 h-20 text-slate-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Resume Builder
          </h1>
          <p className="text-slate-600 text-lg mb-6">Create professional resumes coming soon</p>
          <p className="text-slate-500">This feature is under development</p>
        </motion.div>
      </div>
    </div>
  );
}
