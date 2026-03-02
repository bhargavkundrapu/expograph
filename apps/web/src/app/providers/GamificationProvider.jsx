import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

const STORAGE_KEY = "expograph-gamification";
const GamificationContext = createContext(null);

const LEVELS = [
  { level: 1, title: "Beginner", minXP: 0 },
  { level: 2, title: "Learner", minXP: 200 },
  { level: 3, title: "Explorer", minXP: 500 },
  { level: 4, title: "Achiever", minXP: 1000 },
  { level: 5, title: "Specialist", minXP: 2000 },
  { level: 6, title: "Advanced", minXP: 3500 },
  { level: 7, title: "Pro", minXP: 5500 },
  { level: 8, title: "Master", minXP: 8000 },
  { level: 9, title: "Guru", minXP: 12000 },
  { level: 10, title: "Expert", minXP: 18000 },
];

const XP_REWARDS = {
  lessonComplete: 50,
  quizComplete: 100,
  perfectQuiz: 200,
  dailyLogin: 10,
  streakBonus7: 50,
  streakBonus30: 200,
  streakBonus100: 500,
  dailyChallenge: 30,
  courseComplete: 500,
};

const ACHIEVEMENT_DEFS = [
  { id: "first_lesson", title: "First Steps", desc: "Complete your first lesson", icon: "🎯", rarity: "common", check: (s) => s.lessonsCompleted >= 1 },
  { id: "five_lessons", title: "Getting Started", desc: "Complete 5 lessons", icon: "📚", rarity: "common", check: (s) => s.lessonsCompleted >= 5 },
  { id: "ten_lessons", title: "Dedicated Learner", desc: "Complete 10 lessons", icon: "🏅", rarity: "rare", check: (s) => s.lessonsCompleted >= 10 },
  { id: "twenty_five_lessons", title: "Knowledge Seeker", desc: "Complete 25 lessons", icon: "🧠", rarity: "rare", check: (s) => s.lessonsCompleted >= 25 },
  { id: "fifty_lessons", title: "Lesson Master", desc: "Complete 50 lessons", icon: "👑", rarity: "epic", check: (s) => s.lessonsCompleted >= 50 },
  { id: "streak_7", title: "Week Warrior", desc: "7-day learning streak", icon: "🔥", rarity: "common", check: (s) => s.bestStreak >= 7 },
  { id: "streak_30", title: "Monthly Champion", desc: "30-day learning streak", icon: "💎", rarity: "epic", check: (s) => s.bestStreak >= 30 },
  { id: "streak_100", title: "Unstoppable", desc: "100-day learning streak", icon: "⚡", rarity: "legendary", check: (s) => s.bestStreak >= 100 },
  { id: "first_course", title: "Course Conqueror", desc: "Complete your first course", icon: "🏆", rarity: "rare", check: (s) => s.coursesCompleted >= 1 },
  { id: "perfect_quiz", title: "Perfectionist", desc: "Score 100% on a quiz", icon: "⭐", rarity: "rare", check: (s) => s.perfectQuizzes >= 1 },
  { id: "xp_1000", title: "XP Hunter", desc: "Earn 1,000 XP", icon: "💰", rarity: "common", check: (s) => s.totalXP >= 1000 },
  { id: "xp_5000", title: "XP Master", desc: "Earn 5,000 XP", icon: "💎", rarity: "epic", check: (s) => s.totalXP >= 5000 },
  { id: "early_bird", title: "Early Bird", desc: "Login before 8 AM", icon: "🌅", rarity: "common", check: (s) => s.earlyBirdLogins >= 1 },
  { id: "night_owl", title: "Night Owl", desc: "Study after 10 PM", icon: "🦉", rarity: "common", check: (s) => s.nightOwlSessions >= 1 },
  { id: "weekend_warrior", title: "Weekend Warrior", desc: "Study on a weekend", icon: "🗓️", rarity: "common", check: (s) => s.weekendSessions >= 1 },
  { id: "bookworm", title: "Bookworm", desc: "Bookmark 5 lessons", icon: "📖", rarity: "common", check: (s) => s.bookmarksCount >= 5 },
  { id: "daily_challenger", title: "Challenge Accepted", desc: "Answer 5 daily challenges", icon: "🎲", rarity: "rare", check: (s) => s.dailyChallengesCompleted >= 5 },
  { id: "note_taker", title: "Note Taker", desc: "Write 10 notes", icon: "📝", rarity: "common", check: (s) => s.notesCount >= 10 },
];

const DAILY_QUESTIONS = [
  { id: "dq1", q: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Integration", "Automatic Process Instruction", "Application Process Interface"], answer: 0, topic: "Web Development" },
  { id: "dq2", q: "Which HTML tag is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], answer: 2, topic: "HTML" },
  { id: "dq3", q: "What is the correct way to declare a variable in JavaScript?", options: ["variable x;", "let x;", "v x;", "declare x;"], answer: 1, topic: "JavaScript" },
  { id: "dq4", q: "CSS stands for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 1, topic: "CSS" },
  { id: "dq5", q: "Which symbol is used for single-line comments in JavaScript?", options: ["/* */", "#", "//", "--"], answer: 2, topic: "JavaScript" },
  { id: "dq6", q: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Online Notation", "Java Serialized Object Network"], answer: 0, topic: "Web Development" },
  { id: "dq7", q: "Which of these is a JavaScript framework?", options: ["Django", "Flask", "React", "Laravel"], answer: 2, topic: "JavaScript" },
  { id: "dq8", q: "What does 'npm' stand for?", options: ["Node Package Manager", "New Program Module", "Node Process Manager", "Network Package Manager"], answer: 0, topic: "Node.js" },
  { id: "dq9", q: "Which HTTP method is used to update data?", options: ["GET", "POST", "PUT", "DELETE"], answer: 2, topic: "APIs" },
  { id: "dq10", q: "What is the output of typeof null in JavaScript?", options: ["null", "undefined", "object", "boolean"], answer: 2, topic: "JavaScript" },
  { id: "dq11", q: "Which CSS property controls text size?", options: ["text-style", "font-size", "text-size", "font-style"], answer: 1, topic: "CSS" },
  { id: "dq12", q: "What does the 'this' keyword refer to in JavaScript?", options: ["The previous function", "The global object always", "The current object context", "The parent element"], answer: 2, topic: "JavaScript" },
  { id: "dq13", q: "Which tag is used to link an external CSS file?", options: ["<style>", "<css>", "<link>", "<script>"], answer: 2, topic: "HTML" },
  { id: "dq14", q: "What is a Promise in JavaScript?", options: ["A guarantee of performance", "An async operation placeholder", "A type of variable", "A CSS feature"], answer: 1, topic: "JavaScript" },
];

const MOTIVATIONAL_QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Any fool can write code that a computer can understand.", author: "Martin Fowler" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Don't worry if it doesn't work right. If everything did, you'd be out of a job.", author: "Mosher's Law" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Every great developer you know got there by solving problems they were unqualified to solve.", author: "Patrick McKenzie" },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getDefaults() {
  return {
    totalXP: 0,
    weeklyXP: 0,
    weeklyXPGoal: 300,
    weekStartDate: today(),
    currentStreak: 0,
    bestStreak: 0,
    streakFreezes: 1,
    lastActiveDate: null,
    activeDays: [],
    lessonsCompleted: 0,
    coursesCompleted: 0,
    perfectQuizzes: 0,
    earlyBirdLogins: 0,
    nightOwlSessions: 0,
    weekendSessions: 0,
    dailyChallengesCompleted: 0,
    unlockedAchievements: [],
    newAchievements: [],
    bookmarks: [],
    notes: {},
    dailyChallengeDate: null,
    dailyChallengeAnswered: false,
    dailyChallengeCorrect: false,
    lastVisit: null,
    lastContinue: null,
    milestoneCelebrated: {},
    xpHistory: [],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...getDefaults(), ...parsed };
    }
  } catch {}
  return getDefaults();
}

export function GamificationProvider({ children }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    setState(prev => {
      const updates = {};
      if (hour < 8) updates.earlyBirdLogins = (prev.earlyBirdLogins || 0) + (prev.lastActiveDate !== today() ? 1 : 0);
      if (hour >= 22) updates.nightOwlSessions = (prev.nightOwlSessions || 0) + (prev.lastActiveDate !== today() ? 1 : 0);
      if (day === 0 || day === 6) updates.weekendSessions = (prev.weekendSessions || 0) + (prev.lastActiveDate !== today() ? 1 : 0);

      if (prev.lastActiveDate !== today()) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        let streak = prev.currentStreak;
        if (prev.lastActiveDate === yesterdayStr) {
          streak += 1;
        } else if (prev.lastActiveDate && prev.lastActiveDate !== today()) {
          if (prev.streakFreezes > 0 && prev.lastActiveDate === new Date(now.getTime() - 2 * 86400000).toISOString().slice(0, 10)) {
            streak += 1;
            updates.streakFreezes = prev.streakFreezes - 1;
          } else {
            streak = 1;
          }
        } else if (!prev.lastActiveDate) {
          streak = 1;
        }
        updates.currentStreak = streak;
        updates.bestStreak = Math.max(streak, prev.bestStreak);
        updates.lastActiveDate = today();
        updates.totalXP = (prev.totalXP || 0) + XP_REWARDS.dailyLogin;
        updates.weeklyXP = (prev.weeklyXP || 0) + XP_REWARDS.dailyLogin;
        const days = [...(prev.activeDays || [])];
        if (!days.includes(today())) days.push(today());
        if (days.length > 90) days.splice(0, days.length - 90);
        updates.activeDays = days;
      }

      const weekStart = prev.weekStartDate || today();
      const daysSinceWeekStart = Math.floor((now.getTime() - new Date(weekStart).getTime()) / 86400000);
      if (daysSinceWeekStart >= 7) {
        updates.weeklyXP = 0;
        updates.weekStartDate = today();
      }

      if (Object.keys(updates).length === 0) return prev;
      return { ...prev, ...updates };
    });
  }, []);

  const addXP = useCallback((amount, reason) => {
    setState(prev => {
      const newTotal = (prev.totalXP || 0) + amount;
      const newWeekly = (prev.weeklyXP || 0) + amount;
      const history = [...(prev.xpHistory || []), { amount, reason, date: new Date().toISOString() }];
      if (history.length > 50) history.splice(0, history.length - 50);
      return { ...prev, totalXP: newTotal, weeklyXP: newWeekly, xpHistory: history };
    });
  }, []);

  const recordLessonComplete = useCallback(() => {
    setState(prev => {
      const count = (prev.lessonsCompleted || 0) + 1;
      return { ...prev, lessonsCompleted: count };
    });
    addXP(XP_REWARDS.lessonComplete, "Lesson completed");
  }, [addXP]);

  const recordCourseComplete = useCallback(() => {
    setState(prev => ({ ...prev, coursesCompleted: (prev.coursesCompleted || 0) + 1 }));
    addXP(XP_REWARDS.courseComplete, "Course completed");
  }, [addXP]);

  const recordPerfectQuiz = useCallback(() => {
    setState(prev => ({ ...prev, perfectQuizzes: (prev.perfectQuizzes || 0) + 1 }));
    addXP(XP_REWARDS.perfectQuiz, "Perfect quiz score");
  }, [addXP]);

  const recordQuizComplete = useCallback(() => {
    addXP(XP_REWARDS.quizComplete, "Quiz completed");
  }, [addXP]);

  const answerDailyChallenge = useCallback((correct) => {
    setState(prev => ({
      ...prev,
      dailyChallengeAnswered: true,
      dailyChallengeCorrect: correct,
      dailyChallengesCompleted: correct ? (prev.dailyChallengesCompleted || 0) + 1 : prev.dailyChallengesCompleted,
    }));
    if (correct) addXP(XP_REWARDS.dailyChallenge, "Daily challenge");
  }, [addXP]);

  const toggleBookmark = useCallback((lessonPath, lessonTitle) => {
    setState(prev => {
      const bm = prev.bookmarks || [];
      const exists = bm.find(b => b.path === lessonPath);
      if (exists) return { ...prev, bookmarks: bm.filter(b => b.path !== lessonPath) };
      return { ...prev, bookmarks: [...bm, { path: lessonPath, title: lessonTitle, date: new Date().toISOString() }] };
    });
  }, []);

  const isBookmarked = useCallback((lessonPath) => {
    return (state.bookmarks || []).some(b => b.path === lessonPath);
  }, [state.bookmarks]);

  const saveNote = useCallback((lessonPath, text) => {
    setState(prev => {
      const notes = { ...(prev.notes || {}) };
      if (text.trim()) notes[lessonPath] = { text, updated: new Date().toISOString() };
      else delete notes[lessonPath];
      return { ...prev, notes };
    });
  }, []);

  const getNote = useCallback((lessonPath) => {
    return (state.notes || {})[lessonPath]?.text || "";
  }, [state.notes]);

  const setLastContinue = useCallback((data) => {
    setState(prev => ({ ...prev, lastContinue: data }));
  }, []);

  const celebrateMilestone = useCallback((key) => {
    setState(prev => ({ ...prev, milestoneCelebrated: { ...prev.milestoneCelebrated, [key]: true } }));
  }, []);

  const clearNewAchievements = useCallback(() => {
    setState(prev => ({ ...prev, newAchievements: [] }));
  }, []);

  useEffect(() => {
    setState(prev => {
      const stats = {
        totalXP: prev.totalXP,
        lessonsCompleted: prev.lessonsCompleted,
        coursesCompleted: prev.coursesCompleted,
        bestStreak: prev.bestStreak,
        currentStreak: prev.currentStreak,
        perfectQuizzes: prev.perfectQuizzes,
        earlyBirdLogins: prev.earlyBirdLogins,
        nightOwlSessions: prev.nightOwlSessions,
        weekendSessions: prev.weekendSessions,
        bookmarksCount: (prev.bookmarks || []).length,
        dailyChallengesCompleted: prev.dailyChallengesCompleted,
        notesCount: Object.keys(prev.notes || {}).length,
      };
      const newlyUnlocked = [];
      for (const a of ACHIEVEMENT_DEFS) {
        if (!prev.unlockedAchievements.includes(a.id) && a.check(stats)) {
          newlyUnlocked.push(a.id);
        }
      }
      if (newlyUnlocked.length === 0) return prev;
      return {
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, ...newlyUnlocked],
        newAchievements: [...(prev.newAchievements || []), ...newlyUnlocked],
      };
    });
  }, [state.totalXP, state.lessonsCompleted, state.coursesCompleted, state.bestStreak, state.perfectQuizzes, state.earlyBirdLogins, state.nightOwlSessions, state.weekendSessions, state.bookmarks, state.dailyChallengesCompleted, state.notes]);

  const currentLevel = useMemo(() => {
    let lvl = LEVELS[0];
    for (const l of LEVELS) {
      if (state.totalXP >= l.minXP) lvl = l;
    }
    return lvl;
  }, [state.totalXP]);

  const nextLevel = useMemo(() => {
    const idx = LEVELS.findIndex(l => l.level === currentLevel.level);
    return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
  }, [currentLevel]);

  const levelProgress = useMemo(() => {
    if (!nextLevel) return 100;
    const range = nextLevel.minXP - currentLevel.minXP;
    const current = state.totalXP - currentLevel.minXP;
    return Math.min(100, Math.round((current / range) * 100));
  }, [state.totalXP, currentLevel, nextLevel]);

  const dailyChallenge = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86400000) % DAILY_QUESTIONS.length;
    return DAILY_QUESTIONS[dayIndex];
  }, []);

  const isDailyChallengeReady = state.dailyChallengeDate !== today();

  useEffect(() => {
    if (state.dailyChallengeDate !== today()) {
      setState(prev => ({ ...prev, dailyChallengeDate: today(), dailyChallengeAnswered: false, dailyChallengeCorrect: false }));
    }
  }, []);

  const todayQuote = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86400000) % MOTIVATIONAL_QUOTES.length;
    return MOTIVATIONAL_QUOTES[dayIndex];
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const daysSinceLastVisit = useMemo(() => {
    if (!state.lastVisit) return 0;
    return Math.floor((Date.now() - new Date(state.lastVisit).getTime()) / 86400000);
  }, [state.lastVisit]);

  useEffect(() => {
    setState(prev => ({ ...prev, lastVisit: new Date().toISOString() }));
  }, []);

  const weeklyStreakDays = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const str = d.toISOString().slice(0, 10);
      days.push({ date: str, active: (state.activeDays || []).includes(str), label: d.toLocaleDateString("en", { weekday: "short" }).charAt(0) });
    }
    return days;
  }, [state.activeDays]);

  const value = {
    ...state,
    currentLevel,
    nextLevel,
    levelProgress,
    dailyChallenge,
    isDailyChallengeReady,
    todayQuote,
    greeting,
    daysSinceLastVisit,
    weeklyStreakDays,
    xpRewards: XP_REWARDS,
    achievements: ACHIEVEMENT_DEFS,
    levels: LEVELS,
    addXP,
    recordLessonComplete,
    recordCourseComplete,
    recordPerfectQuiz,
    recordQuizComplete,
    answerDailyChallenge,
    toggleBookmark,
    isBookmarked,
    saveNote,
    getNote,
    setLastContinue,
    celebrateMilestone,
    clearNewAchievements,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
}

export { ACHIEVEMENT_DEFS, XP_REWARDS, LEVELS, DAILY_QUESTIONS, MOTIVATIONAL_QUOTES };
