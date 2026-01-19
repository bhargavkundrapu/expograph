import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
import {
  FiHelpCircle,
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiTrendingUp,
  FiBook,
  FiTarget,
  FiAward,
  FiChevronRight,
  FiRefreshCw,
} from "react-icons/fi";

export default function StudentQuestionBank() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    correct: 0,
    accuracy: 0,
  });

  const categories = [
    { id: "all", label: "All Categories", icon: FiBook },
    { id: "javascript", label: "JavaScript", icon: FiBook },
    { id: "react", label: "React", icon: FiBook },
    { id: "nodejs", label: "Node.js", icon: FiBook },
    { id: "python", label: "Python", icon: FiBook },
    { id: "datastructures", label: "Data Structures", icon: FiBook },
    { id: "algorithms", label: "Algorithms", icon: FiBook },
    { id: "sql", label: "SQL", icon: FiBook },
  ];

  const difficulties = [
    { id: "all", label: "All Levels" },
    { id: "easy", label: "Easy" },
    { id: "medium", label: "Medium" },
    { id: "hard", label: "Hard" },
  ];

  useEffect(() => {
    if (!token) return;
    fetchQuestions();
    fetchStats();
  }, [token]);

  useEffect(() => {
    filterQuestions();
  }, [questions, searchQuery, selectedCategory, selectedDifficulty]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockQuestions = [
        {
          id: "1",
          question: "What is the output of `console.log(typeof null)` in JavaScript?",
          options: ["null", "object", "undefined", "boolean"],
          correctAnswer: 1,
          explanation: "In JavaScript, `typeof null` returns 'object'. This is a known bug in JavaScript that has been kept for backward compatibility.",
          category: "javascript",
          difficulty: "easy",
          points: 10,
        },
        {
          id: "2",
          question: "What is the purpose of React hooks?",
          options: [
            "To replace class components",
            "To enable state and lifecycle features in functional components",
            "To improve performance",
            "To simplify JSX syntax",
          ],
          correctAnswer: 1,
          explanation: "React hooks allow you to use state and other React features in functional components without writing a class.",
          category: "react",
          difficulty: "medium",
          points: 15,
        },
        {
          id: "3",
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
          correctAnswer: 1,
          explanation: "Binary search has a time complexity of O(log n) because it eliminates half of the search space in each iteration.",
          category: "algorithms",
          difficulty: "medium",
          points: 15,
        },
        {
          id: "4",
          question: "Which SQL clause is used to filter rows?",
          options: ["SELECT", "WHERE", "FROM", "GROUP BY"],
          correctAnswer: 1,
          explanation: "The WHERE clause is used to filter rows based on specified conditions.",
          category: "sql",
          difficulty: "easy",
          points: 10,
        },
        {
          id: "5",
          question: "What is a closure in JavaScript?",
          options: [
            "A function that returns another function",
            "A function that has access to variables in its outer scope",
            "A way to close a function",
            "A method to prevent memory leaks",
          ],
          correctAnswer: 1,
          explanation: "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.",
          category: "javascript",
          difficulty: "hard",
          points: 20,
        },
        {
          id: "6",
          question: "What is the difference between `let` and `var` in JavaScript?",
          options: [
            "No difference",
            "`let` is block-scoped, `var` is function-scoped",
            "`var` is block-scoped, `let` is function-scoped",
            "`let` is only for arrays",
          ],
          correctAnswer: 1,
          explanation: "`let` is block-scoped (limited to the block in which it's declared), while `var` is function-scoped (accessible throughout the function).",
          category: "javascript",
          difficulty: "medium",
          points: 15,
        },
      ];
      setQuestions(mockQuestions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats - replace with actual API call
      const mockStats = {
        total: questions.length,
        completed: 3,
        correct: 2,
        accuracy: 66.67,
      };
      setStats(mockStats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const filterQuestions = () => {
    let filtered = [...questions];

    if (searchQuery) {
      filtered = filtered.filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    setFilteredQuestions(filtered);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const submitAnswers = () => {
    let correctCount = 0;
    let totalPoints = 0;

    filteredQuestions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
        correctCount++;
        totalPoints += question.points;
      }
    });

    setScore(totalPoints);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "from-green-500 to-emerald-500";
      case "medium":
        return "from-yellow-500 to-orange-500";
      case "hard":
        return "from-red-500 to-rose-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FiHelpCircle className="w-10 h-10 text-blue-400" />
            Question Bank
          </h1>
          <p className="text-slate-400">Practice questions to test your knowledge</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <FiBook className="w-6 h-6 text-blue-400" />
              <span className="text-2xl font-bold text-white">{stats.total}</span>
            </div>
            <p className="text-sm text-slate-400">Total Questions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-xl p-6 border border-emerald-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <FiCheckCircle className="w-6 h-6 text-emerald-400" />
              <span className="text-2xl font-bold text-white">{stats.completed}</span>
            </div>
            <p className="text-sm text-slate-400">Completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl p-6 border border-amber-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <FiTarget className="w-6 h-6 text-amber-400" />
              <span className="text-2xl font-bold text-white">{stats.correct}</span>
            </div>
            <p className="text-sm text-slate-400">Correct Answers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <FiTrendingUp className="w-6 h-6 text-purple-400" />
              <span className="text-2xl font-bold text-white">{stats.accuracy}%</span>
            </div>
            <p className="text-sm text-slate-400">Accuracy</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-700/50"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedDifficulty === diff.id
                      ? "bg-purple-600 text-white"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Questions List */}
        {showResults ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 text-center"
          >
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <FiAward className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
              <p className="text-slate-400 mb-4">
                You scored <span className="text-2xl font-bold text-green-400">{score}</span> points
              </p>
              <p className="text-slate-400">
                {filteredQuestions.filter(
                  (q) => userAnswers[q.id] === q.correctAnswer
                ).length}{" "}
                out of {filteredQuestions.length} questions correct
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <FiRefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-800/50 rounded-xl p-12 border border-slate-700/50 text-center"
              >
                <FiHelpCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No questions found matching your filters</p>
              </motion.div>
            ) : (
              filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium">
                          Question {index + 1}
                        </span>
                        <span
                          className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(
                            question.difficulty
                          )} text-white rounded-lg text-sm font-medium capitalize`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-sm font-medium">
                          {question.points} pts
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-4">{question.question}</h3>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = userAnswers[question.id] === optionIndex;
                      const isCorrect = optionIndex === question.correctAnswer;
                      const showAnswer = showResults;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => !showResults && handleAnswerSelect(question.id, optionIndex)}
                          disabled={showResults}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            showAnswer && isCorrect
                              ? "bg-green-600/20 border-green-500 text-green-400"
                              : showAnswer && isSelected && !isCorrect
                              ? "bg-red-600/20 border-red-500 text-red-400"
                              : isSelected
                              ? "bg-blue-600/20 border-blue-500 text-blue-400"
                              : "bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600"
                          } ${showResults ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? "bg-blue-600 border-blue-500"
                                  : "border-slate-600"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-3 h-3 bg-white rounded-full" />
                              )}
                            </div>
                            <span>{option}</span>
                            {showAnswer && isCorrect && (
                              <FiCheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                            )}
                            {showAnswer && isSelected && !isCorrect && (
                              <FiXCircle className="w-5 h-5 text-red-400 ml-auto" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                    >
                      <p className="text-sm font-medium text-slate-400 mb-1">Explanation:</p>
                      <p className="text-slate-300">{question.explanation}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Submit Button */}
        {!showResults && filteredQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={submitAnswers}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FiCheckCircle className="w-5 h-5" />
              Submit Answers ({Object.keys(userAnswers).length}/{filteredQuestions.length})
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
