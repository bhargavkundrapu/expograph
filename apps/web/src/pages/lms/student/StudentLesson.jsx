import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { StudentLessonSkeleton, LessonContentSkeleton } from "../../../Components/common/SkeletonLoaders";
import { ButtonLoading } from "../../../Components/common/LoadingStates";
import { Stream } from "@cloudflare/stream-react";
import {
  FiPlay,
  FiCheckCircle,
  FiLock,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiMaximize2,
  FiMinimize2,
  FiFileText,
  FiHelpCircle,
  FiCode,
  FiBookmark,
  FiArrowLeft,
  FiLayers,
  FiTarget,
  FiImage,
  FiX,
  FiHome,
  FiUser,
} from "react-icons/fi";
import { PanelLeftOpen } from "lucide-react";
import CourseContentsSidebar from "../../../Components/ui/CourseContentsSidebar";
import SlideDeckViewer from "../../../Components/presentation/SlideDeckViewer";
import PDFPresentationViewer from "../../../Components/presentation/PDFPresentationViewer";
import { CodeBlock } from "../../../Components/ui/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../Components/ui/tabs";
import { SLIDES as htmlBasicSlides, SLIDE_COUNT as htmlBasicSlideCount } from "../../../data/slides/htmlBasicElements.jsx";

export default function StudentLesson() {
  const navigate = useNavigate();
  const { courseSlug, moduleSlug, lessonSlug } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
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
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [markCompleteLoading, setMarkCompleteLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activePromptTab, setActivePromptTab] = useState("prompts");
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const videoRef = useRef(null);
  const courseDataLoadedRef = useRef(false);
  const isManualNavigationRef = useRef(false);

  // Set default prompt tab when lesson loads
  useEffect(() => {
    if (lesson?.prompts && typeof lesson.prompts === "object") {
      if (lesson.prompts.prompts != null) {
        setActivePromptTab("prompts");
      } else if (lesson.prompts.commands != null) {
        setActivePromptTab("commands");
      } else if (lesson.prompts.error_resolve != null) {
        setActivePromptTab("error_resolve");
      }
    }
  }, [lesson?.prompts]);

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Initial load: fetch course and lesson data only once
  useEffect(() => {
    if (!token || !lessonSlug || !courseSlug || !moduleSlug) return;
    
    // Skip if this is a manual navigation (handled by onLessonSelect)
    if (isManualNavigationRef.current) {
      isManualNavigationRef.current = false;
      return;
    }
    
    if (!courseDataLoadedRef.current) {
      fetchCourseData();
    }
    fetchLessonData(courseSlug, moduleSlug, lessonSlug, courseDataLoadedRef.current);
    fetchBookmarks();
  }, [token, courseSlug, moduleSlug, lessonSlug]);

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
    // Only fetch course data once (prevents sidebar reload on lesson changes)
    if (courseDataLoadedRef.current) return;
    
    try {
      const res = await apiFetch(`/api/v1/student/courses/${courseSlug}`, { token }).catch(() => ({ data: null }));
      if (res?.data?.course) {
        setCourse(res.data.course);
        setAllModules(res.data.course.modules || []);
        courseDataLoadedRef.current = true;
      } else if (res?.course) {
        setCourse(res.course);
        setAllModules(res.course.modules || []);
        courseDataLoadedRef.current = true;
      }
    } catch (error) {
      console.error("Failed to fetch course data:", error);
    }
  };

  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await apiFetch("/api/v1/student/bookmarks", { token }).catch(() => ({ data: [] }));
      const bookmarkList = res?.data || [];
      setBookmarks(bookmarkList);
      console.log("Bookmarks fetched:", bookmarkList.length);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      setBookmarks([]);
    }
  }, [token]);

  const toggleLessonBookmark = useCallback(async (lessonId, currentlyBookmarked) => {
    if (bookmarkLoading) {
      console.log("Bookmark operation already in progress");
      return;
    }
    
    console.log("Toggle bookmark called:", { lessonId, currentlyBookmarked, currentBookmarks: bookmarks.length });
    
    try {
      setBookmarkLoading(true);
      
      if (currentlyBookmarked) {
        // Find and delete the bookmark
        const bookmark = bookmarks.find(
          (b) => b.type === "lesson" && String(b.item_id) === String(lessonId)
        );
        console.log("Found bookmark to delete:", bookmark);
        if (bookmark?.id) {
          await apiFetch(`/api/v1/student/bookmarks/${bookmark.id}`, {
            method: "DELETE",
            token,
          });
          // Update bookmarks state immediately
          setBookmarks((prev) => prev.filter((b) => b.id !== bookmark.id));
          console.log("Bookmark deleted successfully");
        } else {
          console.warn("Bookmark not found for deletion");
          // Refresh to sync state
          await fetchBookmarks();
        }
      } else {
        // Create new bookmark
        console.log("Creating bookmark for lesson:", lessonId);
        const res = await apiFetch("/api/v1/student/bookmarks", {
          method: "POST",
          token,
          body: {
            type: "lesson",
            item_id: String(lessonId),
          },
        });
        console.log("Bookmark created:", res?.data);
        // Refresh bookmarks to get enriched data
        await fetchBookmarks();
        console.log("Bookmarks refreshed after creation");
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      // Refresh bookmarks on error to sync state
      await fetchBookmarks();
    } finally {
      setBookmarkLoading(false);
    }
  }, [bookmarks, bookmarkLoading, token, fetchBookmarks]);

  const fetchLessonData = async (courseSlugParam, moduleSlugParam, lessonSlugParam, isContentUpdate = false) => {
    try {
      if (isContentUpdate) {
        setContentLoading(true);
      } else {
        setLoading(true);
      }
      
      const res = await apiFetch(`/api/v1/student/courses/${courseSlugParam}/modules/${moduleSlugParam}/lessons/${lessonSlugParam}`, { token }).catch(() => ({ data: null }));
      
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
        
        // Reset prompt tab to first available
        if (lessonData?.prompts && typeof lessonData.prompts === "object") {
          if (lessonData.prompts.prompts != null) {
            setActivePromptTab("prompts");
          } else if (lessonData.prompts.commands != null) {
            setActivePromptTab("commands");
          } else if (lessonData.prompts.error_resolve != null) {
            setActivePromptTab("error_resolve");
          }
        }
        
        // Reset video state
        setVideoToken(null);
        setVideoError(null);
        setVideoReady(false);
      }
    } catch (error) {
      console.error("Failed to fetch lesson data:", error);
    } finally {
      if (isContentUpdate) {
        setContentLoading(false);
      } else {
        setLoading(false);
      }
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
    if (markCompleteLoading || completed) return;
    try {
      setMarkCompleteLoading(true);
      const res = await apiFetch(`/api/v1/student/courses/${courseSlug}/modules/${moduleSlug}/lessons/${lessonSlug}/complete`, {
        method: "POST",
        token,
      });

      if (res?.ok) {
        setCompleted(true);
        // Update sidebar immediately: allModules so CourseContentsSidebar shows green check
        setAllModules((prev) =>
          prev.map((mod) => ({
            ...mod,
            lessons: (mod.lessons || []).map((l) =>
              l.id === lesson?.id ? { ...l, completed: true } : l
            ),
          }))
        );
        setModuleLessons((prev) =>
          prev.map((l) => (l.id === lesson?.id ? { ...l, completed: true } : l))
        );
        // Refetch course from server so progress/sidebar stay in sync with DB
        fetchCourseData();
      }
    } catch (error) {
      const msg = error?.message || "Failed to mark lesson as complete. Please try again.";
      alert(msg);
    } finally {
      setMarkCompleteLoading(false);
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

  // Calculate these before early returns to maintain hook order
  const allLessons = useMemo(() => getAllLessons(), [allModules]);
  
  // Find current module title
  const currentModule = useMemo(() => 
    allModules.find((mod) => mod.slug === moduleSlug),
    [allModules, moduleSlug]
  );
  const moduleTitle = currentModule?.title || "";

  const sidebarLessons = useMemo(() => {
    return allLessons.map((l) => {
      const status = getLessonStatus(l);
      const isBookmarked = bookmarks.some(
        (b) => b.type === "lesson" && String(b.item_id) === String(l.id)
      );
      return {
        id: String(l.id),
        title: l.title || "Lesson",
        minutes: l.duration_seconds ? Math.round(l.duration_seconds / 60) : 0,
        completed: status === "completed",
        active: status === "current",
        bookmarked: isBookmarked,
        locked: status === "locked",
      };
    });
  }, [allLessons, bookmarks]);

  // Bookmark toggle handler - must be defined before JSX to maintain hook order
  const handleBookmarkToggle = useCallback((lessonId, bookmarked) => {
    console.log("onBookmarkToggle called:", { lessonId, bookmarked });
    toggleLessonBookmark(lessonId, bookmarked).catch((err) => {
      console.error("Error in toggleLessonBookmark:", err);
    });
  }, [toggleLessonBookmark]);

  if (loading) {
    return <StudentLessonSkeleton />;
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-12 border border-slate-200 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Lesson not found</h3>
            <button
              onClick={() => navigate("/lms/student/courses")}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <main className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <nav className="flex-shrink-0 bg-white border-b border-slate-200 shadow-sm px-6 py-7">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-slate-900 text-white rounded-md font-bold text-base">
                EXPOGRAPH
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate("/lms/student")}
                className="text-slate-700 hover:text-slate-900 text-base font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/lms/student/bookmarks")}
                className="text-slate-700 hover:text-slate-900 text-base font-medium transition-colors"
              >
                Bookmark
              </button>
              <button
                onClick={() => navigate("/lms/student/profile")}
                className="text-slate-700 hover:text-slate-900 text-base font-medium transition-colors"
              >
                Profile
              </button>
            </div>
          </div>
        </nav>

        {/* Content area with sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          {sidebarVisible ? (
            <CourseContentsSidebar
              courseTitle={course?.title || "Course"}
              moduleTitle={moduleTitle}
              totalDuration={getTotalCourseDuration() || "0 mins"}
              lessons={sidebarLessons}
              onBack={() => navigate("/lms/student/courses")}
              onClose={() => setSidebarVisible(false)}
              onLessonSelect={async (item) => {
                const full = allLessons.find((l) => String(l.id) === item.id);
                if (full && !full.locked) {
                  // Mark as manual navigation to prevent useEffect from triggering
                  isManualNavigationRef.current = true;
                  // Update URL first (for bookmarking/sharing)
                  navigate(`/lms/student/courses/${courseSlug}/modules/${full.moduleSlug}/lessons/${full.slug}`, { replace: true });
                  // Fetch new lesson data (only content area updates)
                  await fetchLessonData(courseSlug, full.moduleSlug, full.slug, true);
                }
              }}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ) : null}

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-w-0 relative">
            {/* Open contents button */}
            {!sidebarVisible && (
              <button
                type="button"
                onClick={() => setSidebarVisible(true)}
                className="absolute left-0 top-0 z-50 w-12 h-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-b border-slate-900 text-white flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 transition-colors"
                aria-label="Open course contents"
              >
                <PanelLeftOpen className="w-6 h-6" strokeWidth={2} aria-hidden />
              </button>
            )}

        {/* Main content - scrollable */}
        <div className="flex-1 overflow-y-auto bg-white relative">
          {/* Fixed Navbar - Module Name > Lesson Name */}
          {(moduleTitle || lesson?.title) && (
            <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
              <div className="max-w-6xl mx-auto px-8 py-3">
                <nav className="flex items-center gap-2 text-sm">
                  {moduleTitle && (
                    <>
                      <span className="text-slate-600 font-medium">{moduleTitle}</span>
                      <span className="text-slate-400">/</span>
                    </>
                  )}
                  {lesson?.title && (
                    <span className="text-slate-900 font-semibold">{lesson.title}</span>
                  )}
                </nav>
              </div>
            </div>
          )}
          {contentLoading ? (
            <LessonContentSkeleton />
          ) : (
            <div className="max-w-6xl mx-auto">
            {/* Goal Section - below navbar */}
            {lesson?.goal?.trim() && (
              <div className="px-8 pt-6 pb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Goal</h3>
                  <div className="bg-slate-50 border-l-4 border-blue-500 pl-4 py-3">
                    <p className="text-slate-800 font-medium whitespace-pre-wrap">{lesson.goal.trim()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Video Player Section - only show if video exists */}
            {(lesson.video_provider === "cloudflare_stream" && lesson.video_id) ||
            (lesson.video_provider === "youtube" && lesson.video_id) ||
            (lesson.video_provider === "vimeo" && lesson.video_id) ||
            lesson.video_url ||
            (lesson.video_id && lesson.video_id.startsWith("http")) ? (
              <div className="px-8 pb-8">
                <div className="max-w-3xl mx-auto">
                {/* Cloudflare Stream Video Player */}
                {lesson.video_provider === "cloudflare_stream" && lesson.video_id ? (
                  <div className="bg-black overflow-hidden shadow-xl relative">
                    <div className="aspect-video bg-black relative" style={{ maxHeight: "450px" }}>
                      {videoTokenLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                          <div className="text-center">
                            <div className="w-16 h-16 border-4 border-white border-t-transparent animate-spin mx-auto mb-4" style={{ borderRadius: 0 }}></div>
                            <p className="text-lg font-medium">Loading video...</p>
                          </div>
                        </div>
                      ) : videoToken?.iframeUrl ? (
                        <iframe
                          src={videoToken.iframeUrl}
                          title={lesson.title}
                          className="w-full h-full"
                          allow="accelerometer; gyroscope; autoplay; encrypted-media"
                          allowFullScreen
                          disablePictureInPicture
                        />
                      ) : videoError ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black text-white p-4">
                          <div className="text-center max-w-md">
                            <FiPlay className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-semibold mb-2">Unable to load video</p>
                            <p className="text-sm text-gray-300 mb-6">{videoError}</p>
                            <button
                              onClick={() => lesson?.id && fetchVideoToken(lesson.id)}
                              className="px-6 py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all"
                            >
                              Retry
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                          <div className="text-center">
                            <div className="w-16 h-16 border-4 border-white border-t-transparent animate-spin mx-auto mb-4" style={{ borderRadius: 0 }}></div>
                            <p className="text-lg font-medium">Preparing video...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : lesson.video_provider === "youtube" && lesson.video_id ? (
                  <div className="bg-black overflow-hidden shadow-xl">
                    <div className="aspect-video bg-black" style={{ maxHeight: "450px" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${lesson.video_id}?cc_load_policy=1&modestbranding=1`}
                        title={lesson.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowFullScreen
                        disablePictureInPicture
                      />
                    </div>
                  </div>
                ) : lesson.video_provider === "vimeo" && lesson.video_id ? (
                  <div className="bg-black overflow-hidden shadow-xl">
                    <div className="aspect-video bg-black" style={{ maxHeight: "450px" }}>
                      <iframe
                        src={`https://player.vimeo.com/video/${lesson.video_id}`}
                        title={lesson.title}
                        className="w-full h-full"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        disablePictureInPicture
                      />
                    </div>
                  </div>
                ) : lesson.video_url ? (
                  <div className="bg-black overflow-hidden shadow-xl">
                    <div className="aspect-video bg-black" style={{ maxHeight: "450px" }}>
                      <video
                        ref={videoRef}
                        src={lesson.video_url}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        className="w-full h-full"
                        onPlay={() => setVideoReady(true)}
                      >
                        {lesson.video_captions_url && (
                          <track
                            kind="captions"
                            srcLang="en"
                            src={lesson.video_captions_url}
                            label="English"
                            default
                          />
                        )}
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                ) : lesson.video_id && lesson.video_id.startsWith("http") ? (
                  <div className="bg-black overflow-hidden shadow-xl">
                    <div className="aspect-video bg-black" style={{ maxHeight: "450px" }}>
                      <video
                        ref={videoRef}
                        src={lesson.video_id}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        className="w-full h-full"
                        onPlay={() => setVideoReady(true)}
                      >
                        {lesson.video_captions_url && (
                          <track
                            kind="captions"
                            srcLang="en"
                            src={lesson.video_captions_url}
                            label="English"
                            default
                          />
                        )}
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                ) : null}
                </div>
              </div>
              ) : null}

            {/* Summary - after video (dropdown) */}
            {lesson?.summary?.trim() && (
              <div className="px-8 pb-6">
                <div className="bg-slate-50 border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSummaryExpanded(!summaryExpanded)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                    aria-expanded={summaryExpanded}
                  >
                    <h3 className="text-sm font-semibold text-slate-900">What you&apos;ll learn</h3>
                    {summaryExpanded ? (
                      <FiChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    )}
                  </button>
                  {summaryExpanded && (
                    <div className="px-4 pb-4">
                      <p className="text-slate-700 whitespace-pre-wrap">{lesson.summary.trim()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

              {/* Presentation (PDF) - after video */}
              {lesson?.pdf_url && (
                <div className="px-8 pb-8">
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">Slides (PDF)</h3>
                    <PDFPresentationViewer pdfUrl={lesson.pdf_url} />
                  </div>
                </div>
              )}

              {/* Prompts - classic tabs design - only show if at least one prompt exists */}
              {lesson?.prompts && typeof lesson.prompts === "object" && 
              (lesson.prompts.prompts != null || lesson.prompts.commands != null || lesson.prompts.error_resolve != null) && (
                <div className="px-8 pb-8">
                  <div className="mt-8">
                  <Tabs
                    value={activePromptTab}
                    onValueChange={setActivePromptTab}
                    className="w-full border border-slate-300 bg-white rounded-none"
                  >
                    <TabsList className="w-full justify-start h-auto p-0 bg-slate-50 border-b border-slate-300 rounded-none gap-0">
                      {lesson.prompts.prompts != null && (
                        <TabsTrigger
                          value="prompts"
                          className="px-5 py-3 text-sm font-normal text-slate-600 border-b-2 border-transparent rounded-none data-[state=active]:text-slate-900 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent data-[state=active]:font-medium hover:text-slate-800 transition-colors"
                        >
                          Prompts
                        </TabsTrigger>
                      )}
                      {lesson.prompts.commands != null && (
                        <TabsTrigger
                          value="commands"
                          className="px-5 py-3 text-sm font-normal text-slate-600 border-b-2 border-transparent rounded-none data-[state=active]:text-slate-900 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent data-[state=active]:font-medium hover:text-slate-800 transition-colors"
                        >
                          Commands
                        </TabsTrigger>
                      )}
                      {lesson.prompts.error_resolve != null && (
                        <TabsTrigger
                          value="error_resolve"
                          className="px-5 py-3 text-sm font-normal text-slate-600 border-b-2 border-transparent rounded-none data-[state=active]:text-slate-900 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent data-[state=active]:font-medium hover:text-slate-800 transition-colors"
                        >
                          Error handling
                        </TabsTrigger>
                      )}
                    </TabsList>
                    {lesson.prompts.prompts != null && (
                      <TabsContent value="prompts" className="p-0 mt-0">
                        <div className="p-4">
                          <CodeBlock
                            language="Prompts"
                            content={lesson.prompts.prompts}
                            promptPrefix=">"
                            variant="blue"
                            defaultTheme="light"
                            onCopy={() => handleCopy(lesson.prompts.prompts, "prompts")}
                            copied={copiedIndex === "prompts"}
                            className="max-w-full"
                          />
                        </div>
                      </TabsContent>
                    )}
                    {lesson.prompts.commands != null && (
                      <TabsContent value="commands" className="p-0 mt-0">
                        <div className="p-4">
                          <CodeBlock
                            language="Commands"
                            content={lesson.prompts.commands}
                            promptPrefix="$"
                            variant="purple"
                            defaultTheme="light"
                            onCopy={() => handleCopy(lesson.prompts.commands, "commands")}
                            copied={copiedIndex === "commands"}
                            className="max-w-full"
                          />
                        </div>
                      </TabsContent>
                    )}
                    {lesson.prompts.error_resolve != null && (
                      <TabsContent value="error_resolve" className="p-0 mt-0">
                        <div className="p-4">
                          <CodeBlock
                            language="Error handling"
                            content={lesson.prompts.error_resolve}
                            promptPrefix="!"
                            variant="red"
                            defaultTheme="light"
                            onCopy={() => handleCopy(lesson.prompts.error_resolve, "error_resolve")}
                            copied={copiedIndex === "error_resolve"}
                            className="max-w-full"
                          />
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                  </div>
                </div>
              )}

              {/* Success view - after prompts */}
              {lesson?.success_image_url && (
                <div className="px-8 pb-8">
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">Success looks like</h3>
                    <div className="overflow-hidden border border-slate-200 shadow-lg">
                      <img
                        src={lesson.success_image_url}
                        alt="Success example"
                        className="w-full h-auto"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                      <div className="hidden bg-slate-100 p-8 text-center text-slate-500">
                        <p>Image failed to load</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resources (cheatsheets, links, text) */}
              {resources?.length > 0 && (
                <div className="px-8 pb-8">
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <FiLayers className="w-5 h-5 text-slate-600" />
                      Resources
                    </h3>
                    <div className="space-y-3">
                      {resources.map((res) => (
                        <div
                          key={res.id}
                          className="border border-slate-200 bg-white shadow-sm overflow-hidden"
                        >
                          <div className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0">
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
                                className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                              >
                                Open
                              </a>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setSelectedResource(res)}
                                className="flex-shrink-0 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200"
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
                </div>
              )}

              {/* Mark as complete - visible at bottom */}
              <div className="px-8 pb-8">
                <div className="mt-10 pt-8 border-t border-slate-200">
                  {!completed ? (
                    <button
                      type="button"
                      onClick={handleMarkComplete}
                      disabled={markCompleteLoading}
                      className="px-6 py-3 bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                      aria-label={markCompleteLoading ? "Marking as complete…" : "Mark lesson complete"}
                    >
                      {markCompleteLoading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden />
                          Marking…
                        </>
                      ) : (
                        <>
                          <FiCheckCircle className="w-5 h-5" />
                          Mark lesson complete
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-700 font-medium" role="status" aria-label="Lesson completed">
                      <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
                      You completed this lesson
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
        </div>
      </main>

      {/* Resource Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{selectedResource.title}</h2>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-2 hover:bg-slate-100"
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
