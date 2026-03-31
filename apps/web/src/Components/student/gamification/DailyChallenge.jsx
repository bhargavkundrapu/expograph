import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamification } from "../../../app/providers/GamificationProvider";
import { useTheme } from "../../../app/providers/ThemeProvider";
import { FiZap, FiCheck, FiX } from "react-icons/fi";

export default function DailyChallenge() {
  const { isDark } = useTheme();
  const { dailyChallenge, dailyChallengeAnswered, dailyChallengeCorrect, answerDailyChallenge, xpRewards } = useGamification();
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(dailyChallengeAnswered);

  const handleAnswer = (idx) => {
    if (revealed) return;
    setSelected(idx);
    const correct = idx === dailyChallenge.answer;
    answerDailyChallenge(correct);
    setTimeout(() => setRevealed(true), 300);
  };

  return (
    <div className={`rounded-xl overflow-hidden border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
      <div className={`px-4 py-3 flex items-center justify-between ${isDark ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20" : "bg-gradient-to-r from-purple-50 to-blue-50"}`}>
        <div className="flex items-center gap-2">
          <FiZap className="w-4 h-4 text-purple-500" />
          <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Daily Challenge</h3>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isDark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
          +{xpRewards.dailyChallenge} XP
        </span>
      </div>

      <div className="p-4">
        {dailyChallengeAnswered && revealed ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="text-center py-1">
              <div className="text-3xl mb-2">{dailyChallengeCorrect ? "🎉" : "🤔"}</div>
              <p className={`text-sm font-semibold mb-1 ${isDark ? "text-white" : "text-slate-800"}`}>
                {dailyChallengeCorrect ? "Correct! Nice work!" : "Not quite-try tomorrow!"}
              </p>
              {dailyChallengeCorrect && (
                <p className="text-xs text-green-500 font-semibold">+{xpRewards.dailyChallenge} XP earned</p>
              )}
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-600">
              <p className={`text-xs font-semibold mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Correct answer:</p>
              <p className={`text-sm font-medium ${isDark ? "text-green-400" : "text-green-700"}`}>
                {String.fromCharCode(65 + dailyChallenge.answer)}. {dailyChallenge.options[dailyChallenge.answer]}
              </p>
            </div>
            <div className="space-y-2">
              <p className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>All options:</p>
              {dailyChallenge.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === dailyChallenge.answer;
                return (
                  <div
                    key={i}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border ${
                      isCorrect
                        ? "bg-green-50 border-green-300 text-green-700 dark:bg-green-500/10 dark:border-green-500/40 dark:text-green-400"
                        : isSelected && !isCorrect
                          ? "bg-red-50 border-red-300 text-red-700 dark:bg-red-500/10 dark:border-red-500/40 dark:text-red-400"
                          : isDark ? "bg-slate-700/30 border-slate-600 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="mr-2 opacity-70">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {isCorrect && <span className="ml-1.5 text-green-600 dark:text-green-400">✓</span>}
                  </div>
                );
              })}
            </div>
            <p className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>Topic: {dailyChallenge.topic}</p>
          </motion.div>
        ) : (
          <>
            <p className={`text-sm font-medium mb-3 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
              {dailyChallenge.q}
            </p>
            <div className="space-y-2">
              {dailyChallenge.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === dailyChallenge.answer;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border ${
                      revealed && isCorrect
                        ? "bg-green-50 border-green-300 text-green-700 dark:bg-green-500/10 dark:border-green-500/40 dark:text-green-400"
                        : revealed && isSelected && !isCorrect
                          ? "bg-red-50 border-red-300 text-red-700 dark:bg-red-500/10 dark:border-red-500/40 dark:text-red-400"
                          : isSelected
                            ? isDark ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" : "bg-indigo-50 border-indigo-300 text-indigo-700"
                            : isDark ? "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500" : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className="mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            <p className={`text-[10px] mt-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Topic: {dailyChallenge.topic}</p>
          </>
        )}
      </div>
    </div>
  );
}
