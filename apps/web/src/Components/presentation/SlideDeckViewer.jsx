import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import SlideFrame from "./SlideFrame";
import CoverSlide from "./CoverSlide";
import BulletsImageSlide from "./BulletsImageSlide";
import CodeExampleSlide from "./CodeExampleSlide";
import AgendaTimelineSlide from "./AgendaTimelineSlide";
import SummarySlide from "./SummarySlide";

export default function SlideDeckViewer({ slides = [], slideCount }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("SlideDeckViewer mounted:", {
      slidesLength: slides.length,
      slideCount,
      currentSlide,
      firstSlide: slides[0],
    });
  }, []);

  // Runtime validation
  if (slides.length !== slideCount) {
    console.error(
      `Slide count mismatch! Expected ${slideCount} slides, but got ${slides.length}`
    );
    // Don't throw, just show error message
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-md p-8 text-center">
        <p className="text-red-800 font-semibold mb-2">Slide Count Error</p>
        <p className="text-red-600 text-sm">
          Expected {slideCount} slides, but got {slides.length}
        </p>
      </div>
    );
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide]);

  if (!slides || slides.length === 0) {
    return (
      <div className="bg-white rounded-md border border-slate-200 p-12 text-center">
        <p className="text-slate-600">No slides available</p>
      </div>
    );
  }

  if (!slides[currentSlide]) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-md p-8 text-center">
        <p className="text-yellow-800 font-semibold mb-2">Slide Not Found</p>
        <p className="text-yellow-600 text-sm">
          Current slide index: {currentSlide} (Total: {slides.length})
        </p>
      </div>
    );
  }

  const slide = slides[currentSlide];

  const renderSlide = () => {
    try {
      switch (slide.type) {
      case "cover":
        return (
          <CoverSlide
            title={slide.title}
            subtitle={slide.subtitle}
            illustration={slide.illustration}
          />
        );
      case "bullets-image":
        return (
          <BulletsImageSlide
            smallLabel={slide.smallLabel}
            title={slide.title}
            bullets={slide.bullets}
            illustration={slide.illustration}
          />
        );
      case "code-example":
        return (
          <CodeExampleSlide
            smallLabel={slide.smallLabel}
            title={slide.title}
            code={slide.code}
            output={slide.output}
            explanation={slide.explanation}
            fileName={slide.fileName}
          />
        );
      case "agenda":
        return (
          <AgendaTimelineSlide
            smallLabel={slide.smallLabel}
            title={slide.title}
            items={slide.items}
          />
        );
      case "summary":
        return (
          <SummarySlide
            title={slide.title}
            bullets={slide.bullets}
            conclusion={slide.conclusion}
          />
        );
      default:
        return (
          <SlideFrame>
            <div className="h-full flex items-center justify-center p-8">
              <p className="text-slate-600">Unknown slide type: {slide.type}</p>
            </div>
          </SlideFrame>
        );
      }
    } catch (error) {
      console.error("Error rendering slide:", error, slide);
      return (
        <SlideFrame>
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-2">Error rendering slide</p>
              <p className="text-slate-600 text-sm">{error.message}</p>
            </div>
          </div>
        </SlideFrame>
      );
    }
  };

  return (
    <div
      className={`bg-white rounded-md border-2 border-slate-200 shadow-lg overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
    >
      {/* Slide Header/Controls */}
      <div className="bg-gradient-to-r from-[#1565D8] to-[#0d47a1] px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white text-xs font-medium">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <FiMinimize2 className="w-4 h-4" />
            ) : (
              <FiMaximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className={`bg-[#F9FBFE] ${isFullscreen ? "h-[calc(100vh-100px)]" : "h-[450px]"} overflow-hidden relative`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="bg-slate-100 px-3 py-2 flex items-center justify-between border-t border-slate-200">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-slate-300 hover:border-[#1565D8] hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Previous</span>
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5 flex-1 justify-center px-2 overflow-x-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all flex-shrink-0 ${
                index === currentSlide
                  ? "w-6 bg-[#1565D8]"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-slate-300 hover:border-[#1565D8] hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm font-medium">Next</span>
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
