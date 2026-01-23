import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiSave,
  FiX,
  FiPlus,
  FiTrash2,
  FiEye,
  FiSettings,
  FiCode,
  FiImage,
  FiVideo,
  FiType,
  FiLayout,
  FiZap,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
  FiMove,
} from "react-icons/fi";
import { apiFetch } from "../../services/api";
import PresentationConfigPanel from "./PresentationConfigPanel";
import SlideEditor from "./SlideEditor";

export default function PresentationBuilder({ presentation, onSave, onCancel }) {
  const [title, setTitle] = useState(presentation?.title || "Untitled Presentation");
  const [description, setDescription] = useState(presentation?.description || "");
  const [slides, setSlides] = useState(
    presentation?.slides || [
      {
        id: "slide-1",
        type: "title",
        content: {
          title: "Welcome",
          subtitle: "Start your presentation",
        },
        background: { type: "color", value: "#1a1a1a" },
        transition: "slide",
        fragments: [],
      },
    ]
  );
  const [selectedSlideId, setSelectedSlideId] = useState(slides[0]?.id || null);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState(
    presentation?.config || {
      // Reveal.js Configuration
      width: 1920,
      height: 1080,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,
      controls: true,
      progress: true,
      slideNumber: true,
      hash: true,
      keyboard: true,
      overview: true,
      center: true,
      touch: true,
      loop: false,
      rtl: false,
      fragments: true,
      autoAnimate: true,
      transition: "slide",
      transitionSpeed: "default",
      backgroundTransition: "fade",
      autoSlide: 0,
      // Plugin Configuration
      plugins: {
        markdown: true,
        highlight: true,
        math: true,
        notes: true,
        search: true,
        zoom: true,
        chart: true,
        menu: true,
        chalkboard: false,
      },
      // Theme
      theme: "black",
    }
  );
  const [saving, setSaving] = useState(false);

  const selectedSlide = slides.find((s) => s.id === selectedSlideId);

  const handleAddSlide = (type = "content", afterId = null) => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      background: { type: "color", value: "#ffffff" },
      transition: "slide",
      fragments: [],
      verticalSlides: [],
    };

    if (afterId) {
      const index = slides.findIndex((s) => s.id === afterId);
      const newSlides = [...slides];
      newSlides.splice(index + 1, 0, newSlide);
      setSlides(newSlides);
    } else {
      setSlides([...slides, newSlide]);
    }
    setSelectedSlideId(newSlide.id);
  };

  const handleDeleteSlide = (id) => {
    if (slides.length <= 1) {
      alert("You must have at least one slide");
      return;
    }
    const newSlides = slides.filter((s) => s.id !== id);
    setSlides(newSlides);
    if (selectedSlideId === id) {
      setSelectedSlideId(newSlides[0]?.id || null);
    }
  };

  const handleDuplicateSlide = (id) => {
    const slide = slides.find((s) => s.id === id);
    if (!slide) return;
    const newSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
    };
    const index = slides.findIndex((s) => s.id === id);
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, newSlide);
    setSlides(newSlides);
    setSelectedSlideId(newSlide.id);
  };

  const handleMoveSlide = (id, direction) => {
    const index = slides.findIndex((s) => s.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === slides.length - 1) return;

    const newSlides = [...slides];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    setSlides(newSlides);
  };

  const handleUpdateSlide = (id, updates) => {
    setSlides(
      slides.map((slide) => (slide.id === id ? { ...slide, ...updates } : slide))
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const presentationData = {
        title,
        description,
        slides,
        config,
        slideCount: slides.length,
        status: "draft",
        updatedAt: new Date().toISOString(),
      };

      if (presentation?.id) {
        await apiFetch(`/api/v1/presentations/${presentation.id}`, {
          method: "PUT",
          body: presentationData,
        });
      } else {
        await apiFetch("/api/v1/presentations", {
          method: "POST",
          body: presentationData,
        });
      }

      onSave();
    } catch (error) {
      console.error("Failed to save presentation:", error);
      alert("Failed to save presentation. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0 flex-1"
            placeholder="Presentation Title"
          />
          <span className="text-sm text-slate-500">
            {slides.length} {slides.length === 1 ? "slide" : "slides"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <FiSettings className="w-4 h-4" />
            Config
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Slide List */}
        <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-4 border-b border-slate-200">
            <button
              onClick={() => handleAddSlide("content")}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Slide
            </button>
          </div>

          <div className="p-2 space-y-2">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`group relative p-3 rounded-md border-2 cursor-pointer transition-all ${
                  selectedSlideId === slide.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
                onClick={() => setSelectedSlideId(slide.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Slide {index + 1}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveSlide(slide.id, "up");
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                      title="Move up"
                    >
                      <FiChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveSlide(slide.id, "down");
                      }}
                      disabled={index === slides.length - 1}
                      className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                      title="Move down"
                    >
                      <FiChevronDown className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateSlide(slide.id);
                      }}
                      className="p-1 hover:bg-slate-100 rounded"
                      title="Duplicate"
                    >
                      <FiCopy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSlide(slide.id);
                      }}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                      title="Delete"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-900 mb-1">
                  {slide.content?.title || slide.type || "Untitled"}
                </div>
                <div className="text-xs text-slate-500 capitalize">{slide.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedSlide ? (
            <SlideEditor
              slide={selectedSlide}
              onUpdate={(updates) => handleUpdateSlide(selectedSlide.id, updates)}
              config={config}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              Select a slide to edit
            </div>
          )}
        </div>

        {/* Config Panel */}
        {showConfig && (
          <PresentationConfigPanel
            config={config}
            onUpdate={setConfig}
            onClose={() => setShowConfig(false)}
          />
        )}
      </div>
    </div>
  );
}

function getDefaultContent(type) {
  switch (type) {
    case "title":
      return { title: "Title", subtitle: "Subtitle" };
    case "content":
      return { title: "Slide Title", content: "Slide content goes here..." };
    case "code":
      return { title: "Code Example", code: "console.log('Hello World');", language: "javascript" };
    case "image":
      return { title: "Image Slide", imageUrl: "", caption: "" };
    case "video":
      return { title: "Video Slide", videoUrl: "", autoplay: false };
    case "chart":
      return { title: "Chart", chartType: "bar", data: {} };
    case "math":
      return { title: "Math Equation", equation: "E = mc^2" };
    default:
      return { title: "New Slide", content: "" };
  }
}
