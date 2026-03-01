import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiMinimize2,
  FiChevronDown,
  FiFileText,
  FiX,
} from "react-icons/fi";

/**
 * PDF Presentation Viewer - Clean design with features at bottom
 */
export default function PDFPresentationViewer({ pdfUrl }) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSlideDropdown, setShowSlideDropdown] = useState(false);
  const containerRef = useRef(null);
  const pdfjsLibRef = useRef(null);
  const dropdownRef = useRef(null);

  // Load PDF.js dynamically
  useEffect(() => {
    const loadPDFJS = async () => {
      try {
        if (window.pdfjsLib) {
          pdfjsLibRef.current = window.pdfjsLib;
          if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          }
          loadPDF();
          return;
        }

        if (!pdfjsLibRef.current) {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.async = true;

          script.onload = () => {
            if (window.pdfjsLib) {
              window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          pdfjsLibRef.current = window.pdfjsLib;
          loadPDF();
            } else {
              setError("PDF.js library failed to load");
              setLoading(false);
            }
          };

          script.onerror = () => {
            setError("Failed to load PDF viewer library. Please try opening the PDF in a new tab.");
            setLoading(false);
          };

          document.head.appendChild(script);
        } else {
          loadPDF();
        }
      } catch (err) {
        console.error("Failed to load PDF.js:", err);
        setError("Failed to load PDF viewer library");
        setLoading(false);
      }
    };

    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!pdfjsLibRef.current) {
          setError("PDF.js library not loaded");
          setLoading(false);
          return;
        }

        // Suppress console warnings for tracking prevention
        const originalWarn = console.warn;
        const originalError = console.error;
        console.warn = (...args) => {
          const message = args.join(' ');
          // Suppress tracking prevention warnings
          if (message.includes('Tracking Prevention') || message.includes('storage')) {
            return;
          }
          originalWarn.apply(console, args);
        };
        console.error = (...args) => {
          const message = args.join(' ');
          // Suppress tracking prevention errors
          if (message.includes('Tracking Prevention') || message.includes('storage')) {
            return;
          }
          originalError.apply(console, args);
        };

        const loadingTask = pdfjsLibRef.current.getDocument({
          url: pdfUrl,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
          cMapPacked: true,
          disableAutoFetch: true,
          disableStream: true,
          disableRange: false,
        });
        const pdf = await loadingTask.promise;
        
        // Restore original console methods
        console.warn = originalWarn;
        console.error = originalError;
        const numPages = pdf.numPages;

        const pagePromises = [];
        for (let i = 1; i <= numPages; i++) {
          pagePromises.push(
            pdf.getPage(i).then((page) => {
              const viewport = page.getViewport({ scale: 2.0 });
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              return page
                .render({
                  canvasContext: context,
                  viewport: viewport,
                })
                .promise.then(() => ({
                  imageUrl: canvas.toDataURL("image/png"),
                  pageNumber: i,
                  width: viewport.width,
                  height: viewport.height,
                }));
            })
          );
        }

        const renderedPages = await Promise.all(pagePromises);
        setPages(renderedPages);
        setLoading(false);
      } catch (err) {
        // Restore console methods in case of error
        if (console.warn && console.error) {
          // Already restored above, but ensure it's restored on error too
        }
        // Only show actual errors, not tracking prevention warnings
        const errorMessage = err?.message || "";
        if (!errorMessage.includes("Tracking Prevention") && !errorMessage.includes("storage")) {
          console.error("Failed to load PDF:", err);
          setError(`Failed to load PDF: ${errorMessage || "Unknown error"}. Please try opening it in a new tab.`);
        } else {
          // If it's just a tracking prevention warning, try to continue
          setError(null);
        }
        setLoading(false);
      }
    };

    if (pdfUrl) {
      loadPDFJS();
    }
  }, [pdfUrl]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSlideDropdown(false);
      }
    };
    if (showSlideDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSlideDropdown]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (index) => {
    if (index >= 0 && index < pages.length) {
      setCurrentPage(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPage();
      } else if (e.key === "Escape") {
        setIsFullscreen(false);
        setShowSlideDropdown(false);
      } else if (e.key === "f" || e.key === "F") {
        setIsFullscreen(!isFullscreen);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage, pages.length, isFullscreen]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading presentation…</p>
        <p className="text-sm text-slate-500 mt-2">Preparing slides for you</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiFileText className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-slate-900 font-semibold mb-2">Error loading presentation</p>
        <p className="text-slate-600 text-sm mb-4">{error}</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiFileText className="w-4 h-4" />
          Open in new tab
        </a>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center">
        <p className="text-slate-600">No slides found in presentation</p>
      </div>
    );
  }

  const currentPageData = pages[currentPage];
  const containerHeight = isFullscreen
    ? (typeof window !== "undefined" ? window.innerHeight - 120 : 450)
    : 450;

  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 shadow-lg ${
        isFullscreen 
          ? "fixed inset-0 z-50 rounded-none w-full h-full flex flex-col" 
          : "inline-block rounded-none w-auto mx-auto"
      }`}
    >
      {/* Minimal Top Bar - Only Maximize Button */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-4 py-2 flex items-center justify-end">
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <FiMinimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiMaximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className={`flex relative ${isFullscreen ? "h-full" : "overflow-visible"}`}>
        {/* Feature Buttons Sidebar - Left side in fullscreen */}

        {/* Slide Display Area */}
        <div className={`flex flex-col min-w-0 ${isFullscreen ? "flex-1" : ""}`}>
          {/* Slide Content */}
          <div
            className={`bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center ${
              isFullscreen 
                ? "h-[calc(100vh-120px)] overflow-auto" 
                : "overflow-visible"
            }`}
            ref={containerRef}
          >
            {currentPageData && (
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-center ${isFullscreen ? "w-full h-full" : ""}`}
              >
                <div className={`bg-white flex items-center justify-center ${isFullscreen ? "w-full h-full" : ""}`}>
                  <img
                    src={currentPageData.imageUrl}
                    alt={`Slide ${currentPageData.pageNumber}`}
                    className="object-contain"
                    style={{
                      maxWidth: isFullscreen ? "100%" : "100%",
                      maxHeight: isFullscreen 
                        ? `${containerHeight - 48}px` 
                        : "none",
                      width: isFullscreen ? "auto" : "auto",
                      height: isFullscreen ? "auto" : "auto",
                      objectFit: "contain",
                      display: "block"
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Navigation Bar with All Features */}
          <div className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 bg-white border-t border-slate-200">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Left: Previous Button */}
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white border-2 border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:bg-white transition-all"
              >
                <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                <span className="font-medium text-slate-700 text-xs sm:text-sm md:text-base hidden sm:inline">Previous</span>
              </button>

              {/* Center: Slide Dropdown and Indicators */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-1 justify-center">
                {/* Slide Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowSlideDropdown(!showSlideDropdown)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <span className="whitespace-nowrap">Slide {currentPage + 1} of {pages.length}</span>
                    <FiChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showSlideDropdown ? "rotate-180" : ""}`} />
                  </button>
                  {showSlideDropdown && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto min-w-[160px]">
                      {pages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            goToPage(index);
                            setShowSlideDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors ${
                            index === currentPage ? "bg-slate-100 font-medium text-slate-900" : "text-slate-700"
                          }`}
                        >
                          <span>Slide {index + 1}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Slide Indicators */}
                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto px-2 sm:px-4 max-w-[100px] sm:max-w-none">
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToPage(index)}
                      className={`rounded-full transition-all flex-shrink-0 ${
                        index === currentPage
                          ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-blue-500"
                          : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                      title={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Next Button */}
              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white border-2 border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:bg-white transition-all"
              >
                <span className="font-medium text-slate-700 text-xs sm:text-sm md:text-base hidden sm:inline">Next</span>
                <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
