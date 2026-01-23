import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiMinimize2,
  FiPlay,
  FiCode,
  FiImage,
} from "react-icons/fi";

export default function SlidePresentation({ slides = [], autoPlay = false, autoPlayInterval = 5000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (isPlaying && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length, autoPlayInterval]);

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
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
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

  const slide = slides[currentSlide];

  return (
    <div className={`bg-white rounded-md border-2 border-slate-200 shadow-lg overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}>
      {/* Slide Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-white font-semibold">{slide?.title || "Presentation"}</h3>
          <span className="text-white/80 text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            <FiPlay className={`w-5 h-5 ${isPlaying ? "opacity-50" : ""}`} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <FiMinimize2 className="w-5 h-5" /> : <FiMaximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className={`bg-gradient-to-br from-slate-50 to-white ${isFullscreen ? "h-[calc(100vh-120px)]" : "h-[600px]"} overflow-y-auto`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full flex items-center justify-center p-8"
          >
            <div className="max-w-4xl w-full">
              {/* Slide Title */}
              {slide.title && (
                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">{slide.title}</h2>
              )}

              {/* Slide Subtitle */}
              {slide.subtitle && (
                <h3 className="text-xl font-semibold text-blue-600 mb-6 text-center">{slide.subtitle}</h3>
              )}

              {/* Slide Content */}
              <div className="space-y-6">
                {/* Text Content */}
                {slide.content && (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-slate-700 text-lg leading-relaxed">{slide.content}</p>
                  </div>
                )}

                {/* Code Example */}
                {slide.code && (
                  <div className="bg-slate-900 rounded-md p-6 border-2 border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <FiCode className="w-5 h-5 text-cyan-400" />
                      <span className="text-cyan-400 font-semibold text-sm">Example Code</span>
                    </div>
                    <pre className="text-slate-100 text-sm overflow-x-auto">
                      <code>{slide.code}</code>
                    </pre>
                  </div>
                )}

                {/* Output Preview */}
                {slide.output && (
                  <div className="bg-white rounded-md p-6 border-2 border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <FiPlay className="w-5 h-5 text-emerald-500" />
                      <span className="text-emerald-600 font-semibold text-sm">Output</span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div dangerouslySetInnerHTML={{ __html: slide.output }} />
                    </div>
                  </div>
                )}

                {/* Real World Example */}
                {slide.realWorldExample && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md p-6 border-2 border-blue-200">
                    <h4 className="text-lg font-bold text-blue-900 mb-3">Real World Example</h4>
                    <p className="text-slate-700 mb-4">{slide.realWorldExample.description}</p>
                    {slide.realWorldExample.image && (
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <img
                          src={slide.realWorldExample.image}
                          alt={slide.realWorldExample.description}
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}
                    {slide.realWorldExample.example && (
                      <div className="mt-4 bg-white rounded-lg p-4 border border-blue-200">
                        <div dangerouslySetInnerHTML={{ __html: slide.realWorldExample.example }} />
                      </div>
                    )}
                  </div>
                )}

                {/* Image */}
                {slide.image && (
                  <div className="flex justify-center">
                    <div className="bg-white rounded-md p-4 border-2 border-slate-200 shadow-sm">
                      <img src={slide.image} alt={slide.title} className="max-w-full h-auto rounded-lg" />
                    </div>
                  </div>
                )}

                {/* Bullet Points */}
                {slide.bullets && slide.bullets.length > 0 && (
                  <div className="bg-white rounded-md p-6 border-2 border-slate-200">
                    <ul className="space-y-3">
                      {slide.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span className="text-slate-700 text-lg">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nested Subtopic */}
                {slide.subtopic && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-md p-6 border-2 border-purple-200">
                    <h4 className="text-lg font-bold text-purple-900 mb-3">{slide.subtopic.title}</h4>
                    <p className="text-slate-700 mb-4">{slide.subtopic.explanation}</p>
                    {slide.subtopic.example && (
                      <div className="bg-white rounded-lg p-4 border border-purple-200">
                        <div dangerouslySetInnerHTML={{ __html: slide.subtopic.example }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation */}
      <div className="bg-slate-100 px-6 py-4 flex items-center justify-between border-t border-slate-200">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="w-5 h-5" />
          <span className="font-medium">Previous</span>
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 flex-1 justify-center px-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-medium">Next</span>
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
