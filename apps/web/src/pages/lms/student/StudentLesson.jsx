import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { StudentLessonSkeleton } from "../../../Components/common/SkeletonLoaders";
import { ButtonLoading } from "../../../Components/common/LoadingStates";
import { Stream } from "@cloudflare/stream-react";
import {
  FiPlay,
  FiCheckCircle,
  FiLock,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiMinimize2,
  FiFileText,
  FiHelpCircle,
  FiCode,
  FiBookmark,
  FiArrowLeft,
  FiX,
  FiLayers,
  FiChevronDown,
  FiMenu,
  FiTarget,
  FiImage,
} from "react-icons/fi";
import SlideDeckViewer from "../../../Components/presentation/SlideDeckViewer";
import { CodeBlock } from "../../../Components/ui/code-block";
import { SLIDES as htmlBasicSlides, SLIDE_COUNT as htmlBasicSlideCount } from "../../../data/slides/htmlBasicElements.jsx";

export default function StudentLesson() {
  const navigate = useNavigate();
  const { courseSlug, moduleSlug, lessonSlug } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState(null);
  const [moduleLessons, setModuleLessons] = useState([]);
  const [activeTab, setActiveTab] = useState("slides"); // slides, cheatsheet, mcqs, practice
  const [completed, setCompleted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesExpanded, setSlidesExpanded] = useState(false);
  const [autoView, setAutoView] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqCurrentIndex, setMcqCurrentIndex] = useState(0);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqScore, setMcqScore] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [resources, setResources] = useState([]);
  const [mcqs, setMcqs] = useState([]);
  const [practiceTasks, setPracticeTasks] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [videoToken, setVideoToken] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [videoTokenLoading, setVideoTokenLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [allModules, setAllModules] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [courseExpanded, setCourseExpanded] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activePromptTab, setActivePromptTab] = useState(null); // 'prompts' | 'commands' | 'error_resolve'
  const videoRef = useRef(null);

  const setPromptTab = (key) => {
    setActivePromptTab((prev) => (prev === key ? null : key));
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (!token || !lessonSlug || !courseSlug) return;
    fetchLessonData();
    fetchCourseData();
  }, [token, lessonSlug, courseSlug]);

  // Fetch video token if needed for Cloudflare Stream
  useEffect(() => {
    if (lesson?.video_provider === "cloudflare_stream" && lesson?.video_id && lesson?.id && token) {
      fetchVideoToken(lesson.id);
    } else if (lesson?.video_provider === "cloudflare_stream" && lesson?.video_id) {
      // Reset token if lesson changes
      setVideoToken(null);
      setVideoError(null);
    }
  }, [lesson?.id, lesson?.video_provider, lesson?.video_id, token]);

  const fetchCourseData = async () => {
    try {
      const res = await apiFetch(`/api/v1/student/courses/${courseSlug}`, { token }).catch(() => ({ data: null }));
      if (res?.data?.course) {
        setCourse(res.data.course);
        setAllModules(res.data.course.modules || []);
      } else if (res?.course) {
        setCourse(res.course);
        setAllModules(res.course.modules || []);
      }
    } catch (error) {
      console.error("Failed to fetch course data:", error);
    }
  };

  const fetchLessonData = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/v1/student/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}`, { token }).catch(() => ({ data: null }));
      
      if (res?.data) {
        const lessonData = res.data.lesson || res.data;
        // Ensure prompts is parsed if it's a string
        if (lessonData?.prompts && typeof lessonData.prompts === 'string') {
          try {
            lessonData.prompts = JSON.parse(lessonData.prompts);
          } catch (e) {
            lessonData.prompts = null;
          }
        }
        setLesson(lessonData);
        setModuleLessons(res.data.moduleLessons || []);
        setResources(res.data.resources || []);
        setMcqs(res.data.mcqs || []);
        setPracticeTasks(res.data.practiceTasks || []);
        setCompleted(res.data.completed || false);
      }
    } catch (error) {
      console.error("Failed to fetch lesson data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoToken = async (lessonId) => {
    if (!lessonId || !token) {
      console.warn("Cannot fetch video token: missing lessonId or token", { lessonId, hasToken: !!token });
      return;
    }
    
    try {
      setVideoError(null);
      setVideoTokenLoading(true);
      
      // Fetch a playback token for Cloudflare Stream (required for private videos)
      const res = await apiFetch("/api/v1/media/playback-token", {
        method: "POST",
        token,
        body: { lessonId },
      });

      // Handle both response structures: res.data.iframeUrl or res.iframeUrl
      const iframeUrl = res?.data?.iframeUrl || res?.iframeUrl;
      const hlsUrl = res?.data?.hlsUrl || res?.hlsUrl;
      
      if (iframeUrl) {
        // If we get an iframe URL, use it
        setVideoToken({
          iframeUrl,
          hlsUrl,
          lessonId: res?.data?.lessonId || res?.lessonId,
          provider: res?.data?.provider || res?.provider,
          expiresInSeconds: res?.data?.expiresInSeconds || res?.expiresInSeconds,
        });
        setVideoError(null);
      } else {
        const errorMsg = res?.data?.message || res?.message || "Failed to get video access token. Please try again.";
        console.error("No iframeUrl in response:", res);
        setVideoError(errorMsg);
      }
    } catch (error) {
      console.error("Video token fetch failed:", error);
      const errorMsg = error?.message || error?.data?.message || "Failed to load video. Please refresh the page or contact support.";
      setVideoError(errorMsg);
    } finally {
      setVideoTokenLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      const res = await apiFetch(`/api/v1/student/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}/complete`, {
        method: "POST",
        token,
      });

      if (res?.ok) {
        setCompleted(true);
        alert("Lesson marked as complete!");
      }
    } catch (error) {
      alert(error?.message || "Failed to mark lesson as complete");
    }
  };

  const handleMcqAnswer = (questionId, answer) => {
    setMcqAnswers({ ...mcqAnswers, [questionId]: answer });
  };

  const handleMcqNext = () => {
    if (mcqCurrentIndex < mcqs.length - 1) {
      setMcqCurrentIndex(mcqCurrentIndex + 1);
    } else {
      handleMcqSubmit();
    }
  };

  const handleMcqSubmit = () => {
    let correct = 0;
    const wrong = [];

    mcqs.forEach((mcq, index) => {
      const userAnswer = mcqAnswers[mcq.id];
      if (userAnswer === mcq.correct_answer) {
        correct++;
      } else {
        wrong.push({ ...mcq, userAnswer, index });
      }
    });

    setMcqScore({ correct, total: mcqs.length });
    setWrongAnswers(wrong);
    setMcqSubmitted(true);
  };

  const handleRetest = () => {
    setMcqAnswers({});
    setMcqCurrentIndex(0);
    setMcqSubmitted(false);
    setMcqScore(null);
    setWrongAnswers([]);
  };

  const handleBookmarkMcq = async (questionId) => {
    try {
      await apiFetch("/api/v1/student/bookmarks", {
        method: "POST",
        token,
        body: { type: "mcq", item_id: questionId },
      });
      alert("Question bookmarked!");
    } catch (error) {
      console.error("Failed to bookmark:", error);
    }
  };

  const handleBookmarkPractice = async (taskId) => {
    try {
      await apiFetch("/api/v1/student/bookmarks", {
        method: "POST",
        token,
        body: { type: "practice", item_id: taskId },
      });
      alert("Practice question bookmarked!");
    } catch (error) {
      console.error("Failed to bookmark:", error);
    }
  };

  const getLessonStatus = (l) => {
    if (l.completed) return "completed";
    if (l.id === lesson?.id || l.slug === lessonSlug) return "current";
    if (l.locked) return "locked";
    return "open";
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0 mins";
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}, ${mins} min${mins !== 1 ? 's' : ''}`;
    }
    return `${mins} min${mins !== 1 ? 's' : ''}`;
  };

  const getTotalCourseDuration = () => {
    if (!allModules || allModules.length === 0) return "0 mins";
    let totalSeconds = 0;
    allModules.forEach(module => {
      if (module.lessons) {
        module.lessons.forEach(lesson => {
          totalSeconds += lesson.duration_seconds || 0;
        });
      }
    });
    return formatDuration(totalSeconds);
  };

  // Get all lessons from all modules
  const getAllLessons = () => {
    const lessons = [];
    allModules.forEach(module => {
      if (module.lessons) {
        module.lessons.forEach(lesson => {
          lessons.push({
            ...lesson,
            moduleSlug: module.slug,
            moduleTitle: module.title,
          });
        });
      }
    });
    return lessons;
  };

  const currentMcq = mcqs[mcqCurrentIndex];

  if (loading) {
    return <StudentLessonSkeleton />;
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-md p-12 border border-slate-200 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Lesson not found</h3>
            <button
              onClick={() => navigate(`/lms/student/courses/${courseSlug}`)}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allLessons = getAllLessons();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar - Course Contents (Collapsible) */}
        {sidebarVisible && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: sidebarCollapsed ? "56px" : "300px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-900 overflow-hidden flex flex-col flex-shrink-0"
          >
          {/* Sidebar Header */}
          <div className="h-14 px-3 border-b border-slate-700/50 flex items-center justify-between flex-shrink-0">
            {!sidebarCollapsed && (
              <button
                onClick={() => navigate(`/lms/student/courses/${courseSlug}`)}
                className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
                <span>Contents</span>
              </button>
            )}
            {sidebarCollapsed && (
              <button
                onClick={() => navigate(`/lms/student/courses/${courseSlug}`)}
                className="w-full flex items-center justify-center p-2 text-slate-300 hover:text-white hover:bg-slate-700/30 rounded-md transition-colors"
                title="Back to Course"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-md transition-colors"
                aria-label={sidebarCollapsed ? "Expand" : "Collapse"}
              >
                <FiMenu className={`w-5 h-5 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
              </button>
              <button
                onClick={() => setSidebarVisible(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-md transition-colors"
                aria-label="Close sidebar"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Course & Lessons */}
          {!sidebarCollapsed && course && (
            <div className="flex-1 overflow-y-auto border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => setCourseExpanded(!courseExpanded)}
                className="w-full px-4 py-3 text-left border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white truncate">{course.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{getTotalCourseDuration()}</p>
                </div>
                <FiChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${courseExpanded ? "" : "-rotate-90"}`} />
              </button>

              {courseExpanded && (
                <div className="py-2 px-2">
                  {allLessons.map((l, index) => {
                    const status = getLessonStatus(l);
                    const isCurrent = status === "current";
                    return (
                      <button
                        key={l.id || index}
                        type="button"
                        onClick={() => {
                          if (status !== "locked") {
                            navigate(`/lms/student/courses/${courseSlug}/modules/${l.moduleSlug}/lessons/${l.slug}`);
                          }
                        }}
                        disabled={status === "locked"}
                        className={`w-full text-left px-3 py-2.5 rounded-md flex items-start gap-3 transition-colors border-l-2 ${
                          isCurrent
                            ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-blue-500"
                            : status === "completed"
                            ? "text-slate-300 hover:text-white hover:bg-slate-700/30 border-transparent"
                            : status === "locked"
                            ? "text-slate-500 opacity-60 cursor-not-allowed border-transparent"
                            : "text-slate-300 hover:text-white hover:bg-slate-700/30 border-transparent"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {status === "completed" ? (
                            <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${isCurrent ? "border-white bg-white/20" : "border-slate-500"}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{l.title || `Lesson ${index + 1}`}</p>
                          {l.duration_seconds && (
                            <p className={`text-xs mt-0.5 ${isCurrent ? "text-slate-300" : "text-slate-500"}`}>
                              {formatDuration(l.duration_seconds)}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          </motion.div>
        )}

        {/* Toggle Sidebar Button - when closed */}
        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="fixed left-4 top-4 z-50 w-11 h-11 bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-900 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-slate-700/80 transition-colors"
            aria-label="Open contents"
          >
            <FiMenu className="w-5 h-5" />
          </button>
        )}

        {/* Center - Video Player & Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb Navigation */}
            {course && (
              <div className="px-8 pt-6 pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigate(`/lms/student/courses/${courseSlug}`)}>
                    {course.title}
                  </span>
                  <span>›</span>
                  <span className="text-slate-900 font-medium">{lesson?.title}</span>
                </div>
              </div>
            )}

            {/* Learning Goal - at top when present */}
            {lesson?.goal?.trim() && (
              <div className="px-8 pb-6">
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
                  <FiTarget className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-amber-900 mb-1">Learning goal</h3>
                    <p className="text-slate-700 whitespace-pre-wrap">{lesson.goal.trim()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Summary - when present */}
            {lesson?.summary?.trim() && (
              <div className="px-8 pb-6">
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">What you&apos;ll learn</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{lesson.summary.trim()}</p>
                </div>
              </div>
            )}

            {/* Video Player Section */}
            <div className="px-8 pb-8">

              {/* Cloudflare Stream Video Player */}
              {lesson.video_provider === "cloudflare_stream" && lesson.video_id ? (
                <div className="rounded-lg bg-black overflow-hidden shadow-xl relative">
                  <div className="aspect-video bg-black relative">
                    {videoTokenLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-lg font-medium">Loading video...</p>
                        </div>
                      </div>
                    ) : videoToken?.iframeUrl ? (
                      <iframe
                        src={videoToken.iframeUrl}
                        title={lesson.title}
                        className="w-full h-full"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : videoError ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black text-white p-4">
                        <div className="text-center max-w-md">
                          <FiPlay className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-semibold mb-2">Unable to load video</p>
                          <p className="text-sm text-gray-300 mb-6">{videoError}</p>
                          <button
                            onClick={() => lesson?.id && fetchVideoToken(lesson.id)}
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-lg font-medium">Preparing video...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : lesson.video_provider === "youtube" && lesson.video_id ? (
                <div className="rounded-lg bg-black overflow-hidden shadow-xl">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${lesson.video_id}`}
                      title={lesson.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : lesson.video_provider === "vimeo" && lesson.video_id ? (
                <div className="rounded-lg bg-black overflow-hidden shadow-xl">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={`https://player.vimeo.com/video/${lesson.video_id}`}
                      title={lesson.title}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : lesson.video_url ? (
                <div className="rounded-lg bg-black overflow-hidden shadow-xl">
                  <div className="aspect-video bg-black">
                    <video
                      ref={videoRef}
                      src={lesson.video_url}
                      controls
                      className="w-full h-full"
                      onPlay={() => setVideoReady(true)}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ) : lesson.video_id && lesson.video_id.startsWith("http") ? (
                <div className="rounded-lg bg-black overflow-hidden shadow-xl">
                  <div className="aspect-video bg-black">
                    <video
                      ref={videoRef}
                      src={lesson.video_id}
                      controls
                      className="w-full h-full"
                      onPlay={() => setVideoReady(true)}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ) : !lesson.video_url && !lesson.video_provider && !lesson.video_id ? (
                <div className="rounded-lg bg-slate-100 border border-slate-200 p-8 text-center">
                  <FiPlay className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">No video in this lesson</p>
                  <p className="text-sm text-slate-500 mt-1">Review the content below.</p>
                </div>
              ) : null}

              {/* Prompts, Commands, Error Resolve – horizontal tabs, terminal-style boxes below video */}
              {lesson?.prompts && typeof lesson.prompts === 'object' && (lesson.prompts.prompts || lesson.prompts.commands || lesson.prompts.error_resolve) && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <FiCode className="w-4 h-4 text-slate-500" />
                    Prompts &amp; code
                  </h3>
                  <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-0">
                    {lesson.prompts.prompts && (
                      <button
                        type="button"
                        onClick={() => setPromptTab('prompts')}
                        className={`px-4 py-3 flex items-center gap-2 rounded-t-lg border-b-2 transition-colors ${
                          activePromptTab === 'prompts'
                            ? 'bg-slate-800 text-white border-blue-500'
                            : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                        }`}
                      >
                        <FiCode className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Prompts</span>
                      </button>
                    )}
                    {lesson.prompts.commands && (
                      <button
                        type="button"
                        onClick={() => setPromptTab('commands')}
                        className={`px-4 py-3 flex items-center gap-2 rounded-t-lg border-b-2 transition-colors ${
                          activePromptTab === 'commands'
                            ? 'bg-slate-800 text-white border-purple-500'
                            : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                        }`}
                      >
                        <FiCode className="w-5 h-5 text-purple-500" />
                        <span className="font-medium">Commands</span>
                      </button>
                    )}
                    {lesson.prompts.error_resolve && (
                      <button
                        type="button"
                        onClick={() => setPromptTab('error_resolve')}
                        className={`px-4 py-3 flex items-center gap-2 rounded-t-lg border-b-2 transition-colors ${
                          activePromptTab === 'error_resolve'
                            ? 'bg-slate-800 text-white border-red-500'
                            : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                        }`}
                      >
                        <FiCode className="w-5 h-5 text-red-500" />
                        <span className="font-medium">Error handling</span>
                      </button>
                    )}
                  </div>
                  {activePromptTab && (
                    <CodeBlock
                      language={
                        activePromptTab === "prompts"
                          ? "Prompts"
                          : activePromptTab === "commands"
                            ? "Commands"
                            : "Error handling"
                      }
                      content={
                        activePromptTab === "prompts"
                          ? lesson.prompts.prompts
                          : activePromptTab === "commands"
                            ? lesson.prompts.commands
                            : lesson.prompts.error_resolve
                      }
                      promptPrefix={
                        activePromptTab === "prompts"
                          ? ">"
                          : activePromptTab === "commands"
                            ? "$"
                            : "!"
                      }
                      variant={
                        activePromptTab === "prompts"
                          ? "blue"
                          : activePromptTab === "commands"
                            ? "purple"
                            : "red"
                      }
                      onCopy={() =>
                        handleCopy(
                          activePromptTab === "prompts"
                            ? lesson.prompts.prompts
                            : activePromptTab === "commands"
                              ? lesson.prompts.commands
                              : lesson.prompts.error_resolve,
                          activePromptTab
                        )
                      }
                      copied={copiedIndex === activePromptTab}
                      className="max-w-full"
                    />
                  )}
                </div>
              )}

              {/* Success Image */}
              {lesson?.success_image_url && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FiCheckCircle className="w-5 h-5 text-green-600" />
                    Success Looks Like This
                  </h3>
                  <div className="rounded-lg overflow-hidden border border-slate-200 shadow-lg">
                    <img
                      src={lesson.success_image_url}
                      alt="Success example"
                      className="w-full h-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden bg-slate-100 p-8 text-center text-slate-500">
                      <p>Image failed to load</p>
                    </div>
                  </div>
                </div>
              )}

              {/* PDF Presentation */}
              {lesson?.pdf_url && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FiFileText className="w-5 h-5 text-blue-600" />
                    Presentation
                  </h3>
                  <div className="rounded-lg overflow-hidden border border-slate-200 shadow-lg bg-white">
                    <div className="w-full" style={{ height: '600px' }}>
                      <iframe
                        src={`${lesson.pdf_url}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full"
                        title="PDF Presentation"
                        style={{ border: 'none' }}
                      />
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-200">
                      <a
                        href={lesson.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                      >
                        <FiFileText className="w-4 h-4" />
                        Open PDF in new tab
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Resources (cheatsheets, links, text) */}
              {resources?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FiLayers className="w-5 h-5 text-slate-600" />
                    Resources
                  </h3>
                  <div className="space-y-3">
                    {resources.map((res) => (
                      <div
                        key={res.id}
                        className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden"
                      >
                        <div className="p-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                              {res.type === "link" ? (
                                <FiFileText className="w-5 h-5 text-blue-600" />
                              ) : res.type === "cheatsheet" ? (
                                <FiCode className="w-5 h-5 text-purple-600" />
                              ) : (
                                <FiFileText className="w-5 h-5 text-slate-600" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 truncate">{res.title}</p>
                              <p className="text-xs text-slate-500 capitalize">{res.type}</p>
                            </div>
                          </div>
                          {res.url ? (
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                            >
                              Open
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedResource(res)}
                              className="flex-shrink-0 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-200"
                            >
                              View
                            </button>
                          )}
                        </div>
                        {res.body && res.type === "text" && (
                          <div className="px-4 pb-4 pt-0">
                            <pre className="text-sm text-slate-600 whitespace-pre-wrap font-sans">{res.body}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mark as complete - visible at bottom */}
              <div className="mt-10 pt-8 border-t border-slate-200">
                {!completed ? (
                  <button
                    onClick={handleMarkComplete}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <FiCheckCircle className="w-5 h-5" />
                    Mark lesson complete
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <FiCheckCircle className="w-5 h-5" />
                    You completed this lesson
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Resource Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-md p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{selectedResource.title}</h2>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <FiX className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            {selectedResource.body && (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-slate-700">{selectedResource.body}</pre>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
