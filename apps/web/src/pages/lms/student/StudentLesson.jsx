import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { PageLoading, ButtonLoading } from "../../../Components/common/LoadingStates";
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
  FiMessageSquare,
  FiArrowLeft,
  FiX,
  FiLayers,
} from "react-icons/fi";
import SlideDeckViewer from "../../../Components/presentation/SlideDeckViewer";
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
  const videoRef = useRef(null);

  useEffect(() => {
    if (!token || !lessonSlug) return;
    fetchLessonData();
  }, [token, lessonSlug]);

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

  const fetchLessonData = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/v1/student/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}`, { token }).catch(() => ({ data: null }));
      
      if (res?.data) {
        setLesson(res.data.lesson || res.data);
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
    if (l.id === lesson?.id) return "current";
    if (l.locked) return "locked";
    return "open";
  };

  const currentMcq = mcqs[mcqCurrentIndex];

  if (loading) {
    return <PageLoading />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar - Lessons List */}
        <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <button
              onClick={() => navigate(`/lms/student/courses/${courseSlug}`)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Course</span>
            </button>
            <h2 className="text-lg font-bold text-slate-900">Lessons</h2>
          </div>
          <div className="p-4 space-y-2">
            {moduleLessons.map((l, index) => {
              const status = getLessonStatus(l);
              return (
                <button
                  key={l.id || index}
                  onClick={() => {
                    if (status !== "locked") {
                      navigate(`/lms/student/courses/${courseSlug}/modules/${moduleSlug}/lessons/${l.slug}`);
                    }
                  }}
                  disabled={status === "locked"}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    status === "current"
                      ? "bg-blue-50 border-2 border-blue-500"
                      : status === "completed"
                      ? "bg-emerald-50 border border-emerald-200"
                      : status === "locked"
                      ? "bg-slate-50 border border-slate-200 opacity-50 cursor-not-allowed"
                      : "bg-white border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {status === "completed" ? (
                      <FiCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : status === "locked" ? (
                      <FiLock className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        status === "current" ? "text-blue-900" : status === "completed" ? "text-emerald-900" : "text-slate-900"
                      }`}>
                        {l.title || `Lesson ${index + 1}`}
                      </p>
                      <p className="text-xs text-slate-500">{index + 1}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center - Video Player & Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8">
            {/* Lesson Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">{lesson.title}</h1>
              <p className="text-slate-600 text-lg">{lesson.summary}</p>
            </div>

            {/* Video Player */}
            {lesson.video_provider === "cloudflare_stream" && lesson.video_id ? (
              <div className="mb-8 rounded-md border-2 border-cyan-200/50 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden shadow-2xl shadow-cyan-500/20">
                <div className="aspect-video bg-black relative">
                  {videoTokenLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-white">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-white p-4">
                      <div className="text-center max-w-md">
                        <FiPlay className="w-16 h-16 mx-auto mb-4 text-cyan-400 opacity-50" />
                        <p className="text-lg font-semibold mb-2">Unable to load video</p>
                        <p className="text-sm text-gray-300 mb-6">{videoError}</p>
                        <button
                          onClick={() => lesson?.id && fetchVideoToken(lesson.id)}
                          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-white">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg font-medium">Preparing video...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : lesson.video_provider === "youtube" && lesson.video_id ? (
              <div className="mb-6 rounded-md border border-slate-200 bg-slate-900 overflow-hidden shadow-xl">
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
              <div className="mb-6 rounded-md border border-slate-200 bg-slate-900 overflow-hidden shadow-xl">
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
            ) : lesson.video_id && lesson.video_id.startsWith("http") ? (
              <div className="mb-6 rounded-md border border-slate-200 bg-slate-900 overflow-hidden shadow-xl">
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
            ) : (
              <div className="mb-6 rounded-md border border-slate-200 bg-slate-50 p-12 text-center">
                <FiPlay className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600">No video available for this lesson</p>
                {lesson.video_id && (
                  <p className="text-sm text-slate-500 mt-2">Video ID: {lesson.video_id}</p>
                )}
              </div>
            )}

            {/* Start Discussion Button */}
            <div className="mb-8">
              <button
                onClick={() => navigate("/lms/student/discussions")}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <FiMessageSquare className="w-5 h-5" />
                Start My Discussion
              </button>
            </div>

            {/* Slides Section */}
            {resources.filter((r) => r.type === "slides").length > 0 && (
              <div className="mb-6 bg-white rounded-md border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Slides</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSlidesExpanded(!slidesExpanded)}
                      className="p-2 rounded-lg hover:bg-slate-100"
                    >
                      {slidesExpanded ? <FiMinimize2 className="w-5 h-5" /> : <FiMaximize2 className="w-5 h-5" />}
                    </button>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={autoView}
                        onChange={(e) => setAutoView(e.target.checked)}
                        className="rounded"
                      />
                      Auto-view
                    </label>
                  </div>
                </div>
                <div className={`${slidesExpanded ? "h-96" : "h-48"} overflow-hidden rounded-lg bg-slate-100 border border-slate-200 relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-slate-600">Slide {currentSlide + 1}</p>
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <button
                      onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                      disabled={currentSlide === 0}
                      className="p-1 disabled:opacity-50"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium">
                      {currentSlide + 1} / {resources.filter((r) => r.type === "slides").length}
                    </span>
                    <button
                      onClick={() => setCurrentSlide(Math.min(resources.filter((r) => r.type === "slides").length - 1, currentSlide + 1))}
                      disabled={currentSlide >= resources.filter((r) => r.type === "slides").length - 1}
                      className="p-1 disabled:opacity-50"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson Tabs */}
            <div className="bg-white/80 backdrop-blur-sm rounded-md border-2 border-cyan-200/50 overflow-hidden shadow-lg">
              <div className="flex border-b border-cyan-100">
                {[
                  { id: "slides", label: "Slides", icon: FiLayers },
                  { id: "cheatsheet", label: "Cheatsheet", icon: FiFileText },
                  { id: "mcqs", label: "MCQs", icon: FiHelpCircle },
                  { id: "practice", label: "Practice", icon: FiCode },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                          : "text-slate-600 hover:bg-cyan-50/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                {/* Slides Tab */}
                {activeTab === "slides" && (
                  <div>
                    {/* Always show slides for now - can be made conditional later */}
                    {htmlBasicSlides && htmlBasicSlides.length > 0 ? (
                      <SlideDeckViewer slides={htmlBasicSlides} slideCount={htmlBasicSlideCount} />
                    ) : (
                      <div className="text-center py-12">
                        <FiLayers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600 text-lg mb-2">No slides available</p>
                        <p className="text-slate-500 text-sm">Slides data not loaded</p>
                        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm text-red-800">Debug Info:</p>
                          <p className="text-xs text-red-600">Slides array length: {htmlBasicSlides?.length || 0}</p>
                          <p className="text-xs text-red-600">Slide count: {htmlBasicSlideCount || "N/A"}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Cheatsheet Tab */}
                {activeTab === "cheatsheet" && (
                  <div>
                    {resources.filter((r) => r.type === "cheatsheet" || r.type === "link" || r.type === "text").length === 0 ? (
                      <p className="text-slate-600 text-center py-8">No cheatsheet resources available</p>
                    ) : (
                      <div className="space-y-4">
                        {resources
                          .filter((r) => r.type === "cheatsheet" || r.type === "link" || r.type === "text")
                          .map((resource, index) => (
                            <div
                              key={resource.id || index}
                              className="p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md border-2 border-cyan-200/50 hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer group"
                              onClick={() => {
                                if (resource.url) {
                                  window.open(resource.url, "_blank");
                                } else {
                                  setSelectedResource(resource);
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                                    <FiFileText className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-slate-800">{resource.title}</h4>
                                    {resource.url && (
                                      <p className="text-sm text-slate-600">{resource.url}</p>
                                    )}
                                  </div>
                                </div>
                                {resource.url && (
                                  <span className="text-xs font-medium text-cyan-600 group-hover:text-cyan-700">Open →</span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* MCQs Tab */}
                {activeTab === "mcqs" && (
                  <div>
                    {mcqs.length === 0 ? (
                      <p className="text-slate-600 text-center py-8">No MCQs available for this lesson</p>
                    ) : mcqSubmitted ? (
                      <div className="text-center py-8">
                        <div className="text-4xl font-bold text-blue-600 mb-4">
                          {mcqScore.correct} / {mcqScore.total}
                        </div>
                        <p className="text-lg text-slate-900 mb-6">Your Score</p>
                        {wrongAnswers.length > 0 && (
                          <div className="text-left mb-6">
                            <h4 className="font-bold text-slate-900 mb-4">Wrong Answers:</h4>
                            <div className="space-y-4">
                              {wrongAnswers.map((mcq, index) => (
                                <div key={mcq.id || index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                  <p className="font-semibold text-slate-900 mb-2">{mcq.question}</p>
                                  <p className="text-sm text-red-700">Your answer: {mcq.userAnswer}</p>
                                  <p className="text-sm text-emerald-700">Correct answer: {mcq.correct_answer}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <button
                          onClick={handleRetest}
                          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Retest
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-slate-600">
                              Question {mcqCurrentIndex + 1} of {mcqs.length}
                            </span>
                            <button
                              onClick={() => handleBookmarkMcq(currentMcq.id)}
                              className="p-2 hover:bg-slate-100 rounded-lg"
                              title="Bookmark"
                            >
                              <FiBookmark className="w-5 h-5 text-slate-600" />
                            </button>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-6">{currentMcq.question}</h3>
                          <div className="space-y-3">
                            {currentMcq.options?.map((option, optIndex) => (
                              <label
                                key={optIndex}
                                className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${
                                  mcqAnswers[currentMcq.id] === option
                                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md"
                                    : "border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50/50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`mcq-${currentMcq.id}`}
                                  value={option}
                                  checked={mcqAnswers[currentMcq.id] === option}
                                  onChange={(e) => handleMcqAnswer(currentMcq.id, e.target.value)}
                                  className="w-5 h-5 text-cyan-600"
                                />
                                <span className="flex-1 font-medium text-slate-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={handleMcqNext}
                          disabled={!mcqAnswers[currentMcq.id]}
                          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-md hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl"
                        >
                          {mcqCurrentIndex < mcqs.length - 1 ? "Next Question" : "Submit"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Practice Tab */}
                {activeTab === "practice" && (
                  <div>
                    {practiceTasks.length === 0 ? (
                      <p className="text-slate-600 text-center py-8">No practice tasks available for this lesson</p>
                    ) : (
                      <div className="space-y-6">
                        {practiceTasks.map((task, index) => (
                          <div key={task.id || index} className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-md border-2 border-teal-200/50 shadow-md hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                              <h4 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">{task.title || `Practice Task ${index + 1}`}</h4>
                              <button
                                onClick={() => handleBookmarkPractice(task.id)}
                                className="p-2 hover:bg-teal-100 rounded-lg transition-colors"
                                title="Bookmark"
                              >
                                <FiBookmark className="w-5 h-5 text-teal-600" />
                              </button>
                            </div>
                            <p className="text-slate-700 mb-4">{task.description}</p>
                            {task.desired_output && (
                              <div className="mb-4 p-4 bg-white/80 rounded-md border border-teal-200">
                                <p className="text-sm font-semibold text-teal-700 mb-2">Desired Output:</p>
                                <pre className="text-sm text-slate-700 whitespace-pre-wrap">{task.desired_output}</pre>
                              </div>
                            )}
                            {task.required_things && (
                              <div className="mb-4">
                                <p className="text-sm font-semibold text-teal-700 mb-2">Required:</p>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                  {task.required_things.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <button
                              onClick={() => navigate(`/lms/student/playground?task=${task.id}`)}
                              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-md hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
                            >
                              Start Practice
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Progress & Notes */}
        <div className="w-80 bg-white/80 backdrop-blur-sm border-l border-cyan-200/50 overflow-y-auto">
          <div className="p-6">
            <button
              onClick={handleMarkComplete}
              disabled={completed}
              className={`w-full px-6 py-4 font-semibold rounded-md transition-all mb-6 shadow-lg ${
                completed
                  ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white cursor-not-allowed shadow-emerald-500/30"
                  : "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 shadow-blue-500/30 hover:shadow-xl"
              }`}
            >
              {completed ? (
                <>
                  <FiCheckCircle className="w-5 h-5 inline mr-2" />
                  Completed
                </>
              ) : (
                "Mark as Complete"
              )}
            </button>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-md p-5 border-2 border-cyan-200/50">
                <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Lesson Progress</span>
                      <span className="text-sm font-bold text-cyan-600">{completed ? "100%" : "0%"}</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-3 shadow-inner">
                      <div
                        className={`rounded-full h-3 transition-all ${
                          completed 
                            ? "bg-gradient-to-r from-emerald-400 to-teal-400" 
                            : "bg-gradient-to-r from-cyan-400 to-blue-400"
                        }`}
                        style={{ width: completed ? "100%" : "0%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-md p-5 border-2 border-indigo-200/50">
                <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">Notes</h3>
                <textarea
                  placeholder="Add your notes here..."
                  className="w-full px-4 py-3 bg-white/80 border-2 border-indigo-200/50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 resize-none transition-all"
                  rows={6}
                />
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
