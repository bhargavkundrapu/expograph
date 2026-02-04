import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiMinimize2, FiFileText } from "react-icons/fi";

/**
 * PDF Presentation Viewer - displays PDF pages side by side in a horizontal carousel
 * Uses PDF.js to render individual pages as images
 */
export default function PDFPresentationViewer({ pdfUrl }) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const pdfjsLibRef = useRef(null);

  // Load PDF.js dynamically
  useEffect(() => {
    const loadPDFJS = async () => {
      try {
        // Check if PDF.js is already loaded
        if (window.pdfjsLib) {
          pdfjsLibRef.current = window.pdfjsLib;
          if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          }
          loadPDF();
          return;
        }

        // Use CDN for PDF.js
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

        const loadingTask = pdfjsLibRef.current.getDocument({
          url: pdfUrl,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/",
          cMapPacked: true,
        });
        const pdf = await loadingTask.promise;
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

              return page.render({
                canvasContext: context,
                viewport: viewport,
              }).promise.then(() => ({
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
        console.error("Failed to load PDF:", err);
        setError(`Failed to load PDF: ${err.message || "Unknown error"}. Please try opening it in a new tab.`);
        setLoading(false);
      }
    };

    if (pdfUrl) {
      loadPDFJS();
    }
  }, [pdfUrl]);

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
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage, pages.length]);

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

  if (loading) {
    return (
      <div className="bg-white border border-slate-300 p-12 text-center shadow-sm">
        <div className="w-10 h-10 border-2 border-slate-400 border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 text-sm">Loading presentation…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-300 p-8 text-center shadow-sm">
        <p className="text-slate-800 font-medium mb-1">Error loading PDF</p>
        <p className="text-slate-500 text-sm mb-4">{error}</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-700 border border-slate-400 hover:bg-slate-50 transition-colors"
        >
          <FiFileText className="w-4 h-4" />
          Open PDF in new tab
        </a>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="bg-white border border-slate-300 p-12 text-center shadow-sm">
        <p className="text-slate-600 text-sm">No pages found in PDF</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border border-slate-300 overflow-hidden shadow-sm ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Header - classic bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-300 bg-slate-50">
        <span className="text-slate-700 text-sm">
          Page {currentPage + 1} of {pages.length}
        </span>
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <FiMinimize2 className="w-4 h-4" /> : <FiMaximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Slides area - one slide at a time, no horizontal scroll */}
      <div
        className={`bg-slate-200 overflow-hidden flex items-center justify-center ${
          isFullscreen ? "h-[calc(100vh-140px)]" : "h-[600px]"
        }`}
      >
        {pages.map((page, index) => {
          if (index !== currentPage) return null;
          const containerHeight = isFullscreen
            ? (typeof window !== "undefined" ? window.innerHeight - 140 : 600)
            : 600;
          return (
            <div
              key={index}
              ref={containerRef}
              className="h-full flex items-center justify-center px-6 py-6"
              style={{
                width: `${(page.width / page.height) * containerHeight}px`,
                maxWidth: "100%",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full bg-white border border-slate-400 overflow-hidden shadow-md"
              >
                <img
                  src={page.imageUrl}
                  alt={`Page ${page.pageNumber}`}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Navigation - classic toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-slate-300 bg-slate-50">
        <button
          type="button"
          onClick={prevPage}
          disabled={currentPage === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-700 border border-slate-400 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        >
          <FiChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-1.5 flex-1 justify-center overflow-x-auto py-1">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToPage(index)}
              className={`flex-shrink-0 transition-colors ${
                index === currentPage
                  ? "w-6 h-1.5 bg-slate-700"
                  : "w-1.5 h-1.5 bg-slate-400 hover:bg-slate-500"
              }`}
              title={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-700 border border-slate-400 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        >
          Next
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-slate-200 bg-white">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 text-xs hover:text-slate-800 flex items-center gap-1.5 w-fit"
        >
          <FiFileText className="w-3.5 h-3.5" />
          Open PDF in new tab
        </a>
      </div>
    </div>
  );
}
