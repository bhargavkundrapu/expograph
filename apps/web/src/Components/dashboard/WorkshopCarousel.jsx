import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";

export default function WorkshopCarousel({ items = [], autoRotateInterval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    if (!isAutoRotating || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [isAutoRotating, items.length, autoRotateInterval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full px-4 sm:px-6 md:px-8">
      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 sm:left-2 md:left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-slate-700/80 hover:bg-slate-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-30 shadow-lg"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 sm:right-2 md:right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-slate-700/80 hover:bg-slate-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-30 shadow-lg"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
          </button>
        </>
      )}

      <div key={currentIndex} className="relative">
          {/* Main Carousel Card - Fixed heights per breakpoint */}
          <div
            className="relative w-full rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden shadow-xl h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px]"
            style={{
              background: "#0b0f27",
            }}
          >
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden" style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}>
              {/* Swirling purple/blue shapes on the left - Scale with carousel */}
              <div className="absolute left-0 top-0 w-full sm:w-[400px] md:w-[500px] h-full" style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}>
                <div 
                  className="absolute left-[-60px] sm:left-[-70px] md:left-[-80px] top-[-50px] sm:top-[-55px] md:top-[-60px] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] bg-purple-500 rounded-full opacity-70"
                  style={{ 
                    filter: 'blur(100px)',
                    WebkitFilter: 'blur(100px)',
                    WebkitTransform: 'translateZ(0)',
                    transform: 'translateZ(0)',
                  }}
                ></div>
                <div 
                  className="absolute left-[60px] sm:left-[70px] md:left-[80px] top-[60px] sm:top-[70px] md:top-[80px] w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] bg-blue-500 rounded-full opacity-60"
                  style={{ 
                    filter: 'blur(80px)',
                    WebkitFilter: 'blur(80px)',
                    WebkitTransform: 'translateZ(0)',
                    transform: 'translateZ(0)',
                  }}
                ></div>
                <div 
                  className="absolute left-[-30px] sm:left-[-35px] md:left-[-40px] bottom-[-30px] sm:bottom-[-35px] md:bottom-[-40px] w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] bg-indigo-500 rounded-full opacity-65"
                  style={{ 
                    filter: 'blur(90px)',
                    WebkitFilter: 'blur(90px)',
                    WebkitTransform: 'translateZ(0)',
                    transform: 'translateZ(0)',
                  }}
                ></div>
              </div>
            </div>

            {/* Content Container - Responsive padding and sizing */}
            <div 
              className="relative z-10 h-full p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12"
              style={{
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                isolation: 'isolate',
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {/* Make Logo - Far Left - Scale with carousel */}
              {currentItem.logo && (
                <div 
                  className="flex-shrink-0 relative z-20" 
                  style={{ 
                    WebkitTransform: 'translateZ(0)',
                    transform: 'translateZ(0)',
                    flexShrink: 0,
                    maxWidth: 'fit-content',
                  }}
                >
                  <div 
                    className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                    style={{
                      whiteSpace: 'nowrap',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeLegibility',
                    }}
                  >
                    {currentItem.logo}
                  </div>
                </div>
              )}

              {/* Text Content - Center - Scale with carousel */}
              <div 
                className="flex-1 relative z-20" 
                style={{ 
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                  minWidth: 0,
                  maxWidth: '100%',
                  overflow: 'hidden',
                  flex: '1 1 0%',
                }}
              >
                <h2 
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white mb-1 sm:mb-1.5 md:mb-2 leading-tight"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                    width: '100%',
                  }}
                >
                  {currentItem.title}
                </h2>
                {currentItem.description && (
                  <p 
                    className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-word',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeLegibility',
                      maxWidth: '100%',
                    }}
                  >
                    {currentItem.description}
                  </p>
                )}
              </div>

              {/* Right Section - CTA Button and Live Indicator - Scale with carousel */}
              <div 
                className="flex-shrink-0 flex flex-col items-end gap-2 sm:gap-2.5 md:gap-3 relative z-20" 
                style={{ 
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                  flexShrink: 0,
                  maxWidth: 'fit-content',
                }}
              >
                {currentItem.action && (
                  <button
                    onClick={currentItem.action.onClick}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold rounded-[8px] sm:rounded-[10px] md:rounded-[12px] transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base"
                    style={{ 
                      WebkitAppearance: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                    }}
                  >
                    <span>{currentItem.action.label}</span>
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  </button>
                )}
                {currentItem.isLive && (
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                    <span 
                      className="text-white text-xs sm:text-sm font-medium"
                      style={{
                        whiteSpace: 'nowrap',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                      }}
                    >
                      Live
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* Pagination Dots - Scale with carousel */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 md:mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentIndex
                  ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#8b5cf6]"
                  : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
