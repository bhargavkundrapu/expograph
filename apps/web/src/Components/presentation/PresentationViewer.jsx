import { useEffect, useRef, useState } from "react";
import { FiX, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { sanitizeHtml } from "../../utils/sanitize";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";
import Search from "reveal.js/plugin/search/search.esm.js";
import Zoom from "reveal.js/plugin/zoom/zoom.esm.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";

// Dynamic library loader for advanced features
const loadLibrary = (name, url) => {
  return new Promise((resolve, reject) => {
    if (window[name]) {
      resolve(window[name]);
      return;
    }
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => resolve(window[name]);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Voice-over playback function
const playVoiceOver = (voiceOver) => {
  if (!voiceOver) return;

  // Stop any currently playing audio/TTS
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  if (voiceOver.mode === "tts" && voiceOver.ttsText) {
    const utterance = new SpeechSynthesisUtterance(voiceOver.ttsText);
    if (voiceOver.voice) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === voiceOver.voice);
      if (selectedVoice) utterance.voice = selectedVoice;
    }
    utterance.rate = voiceOver.speed || 1.0;
    utterance.pitch = voiceOver.pitch || 1.0;
    utterance.volume = voiceOver.volume || 1.0;
    window.speechSynthesis.speak(utterance);
  } else if (voiceOver.mode === "upload" || voiceOver.mode === "record") {
    if (voiceOver.audioUrl) {
      const audio = new Audio(voiceOver.audioUrl);
      audio.volume = voiceOver.volume || 1.0;
      audio.play().catch(err => console.warn("Audio playback failed:", err));
    }
  }
};

export default function PresentationViewer({ presentation, onClose }) {
  const revealRef = useRef(null);
  const revealInstanceRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [librariesLoaded, setLibrariesLoaded] = useState(false);

  useEffect(() => {
    if (!revealRef.current || !presentation) return;

    const initializePresentation = async () => {
      // Load additional libraries based on config
      const plugins = [];
      
      if (presentation.config?.plugins?.markdown) {
        plugins.push(Markdown);
      }
      if (presentation.config?.plugins?.highlight) {
        plugins.push(Highlight);
      }
      if (presentation.config?.plugins?.notes) {
        plugins.push(Notes);
      }
      if (presentation.config?.plugins?.search) {
        plugins.push(Search);
      }
      if (presentation.config?.plugins?.zoom) {
        plugins.push(Zoom);
      }

      // Load Chart.js if needed
      if (presentation.slides?.some(s => s.type === "chart")) {
        try {
          await loadLibrary("Chart", "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js");
        } catch (err) {
          console.warn("Failed to load Chart.js:", err);
        }
      }

      // Load Math libraries if needed
      if (presentation.slides?.some(s => s.type === "math") || presentation.config?.plugins?.math) {
        try {
          await loadLibrary("katex", "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js");
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
          document.head.appendChild(link);
        } catch (err) {
          console.warn("Failed to load KaTeX:", err);
        }
      }

      // Load Mermaid if needed
      if (presentation.slides?.some(s => s.type === "mermaid" || s.content?.mermaid)) {
        try {
          await loadLibrary("mermaid", "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js");
          if (window.mermaid) {
            window.mermaid.initialize({ 
              startOnLoad: true,
              theme: "dark",
              securityLevel: "loose",
            });
            // Render all mermaid diagrams after a short delay
            setTimeout(() => {
              const mermaidElements = document.querySelectorAll(".mermaid:not([data-processed])");
              mermaidElements.forEach((el) => {
                try {
                  window.mermaid.run({
                    nodes: [el],
                  });
                  el.dataset.processed = "true";
                } catch (err) {
                  console.warn("Mermaid rendering error:", err);
                }
              });
            }, 1500);
          }
        } catch (err) {
          console.warn("Failed to load Mermaid:", err);
        }
      }

      setLibrariesLoaded(true);

      // Initialize Reveal.js
      const revealConfig = {
        ...presentation.config,
        plugins,
        embedded: false,
        hash: presentation.config?.hash !== false,
        keyboard: presentation.config?.keyboard !== false,
        touch: presentation.config?.touch !== false,
        controls: presentation.config?.controls !== false,
        progress: presentation.config?.progress !== false,
        slideNumber: presentation.config?.slideNumber ? "c/t" : false,
        center: presentation.config?.center !== false,
        overview: presentation.config?.overview !== false,
        fragments: presentation.config?.fragments !== false,
        autoAnimate: presentation.config?.autoAnimate || false,
        transition: presentation.config?.transition || "slide",
        transitionSpeed: presentation.config?.transitionSpeed || "default",
        backgroundTransition: presentation.config?.backgroundTransition || "fade",
        autoSlide: presentation.config?.autoSlide || 0,
        loop: presentation.config?.loop || false,
        rtl: presentation.config?.rtl || false,
        width: presentation.config?.width || 1920,
        height: presentation.config?.height || 1080,
        margin: presentation.config?.margin || 0.04,
        minScale: presentation.config?.minScale || 0.2,
        maxScale: presentation.config?.maxScale || 2.0,
      };

      const reveal = new Reveal(revealRef.current, revealConfig);

      reveal.initialize().then(() => {
        revealInstanceRef.current = reveal;
        
        reveal.on("slidechanged", () => {});
        
        // Initialize charts after reveal is ready
        if (window.Chart) {
          presentation.slides?.forEach((slide, index) => {
            if (slide.type === "chart" && slide.content?.data) {
              setTimeout(() => {
                const chartElement = document.querySelector(`#chart-${slide.id}`);
                if (chartElement && !chartElement.chartInstance) {
                  try {
                    const ctx = chartElement.getContext("2d");
                    if (!ctx) {
                      console.warn("Could not get 2D context for chart");
                      return;
                    }
                    const chartData = slide.content.data;
                    chartElement.chartInstance = new window.Chart(ctx, {
                      type: slide.content.chartType || "bar",
                      data: chartData,
                      options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                          duration: 1000,
                        },
                      },
                    });
                  } catch (err) {
                    console.warn("Failed to create chart:", err);
                  }
                }
              }, 1000);
            }
          });
        }
      });
    };

    initializePresentation();

    return () => {
      if (revealInstanceRef.current) {
        revealInstanceRef.current.destroy();
      }
    };
  }, [presentation]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      revealRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const renderSlide = (slide, index) => {
    const slideStyle = {};
    if (slide.background?.type === "color") {
      slideStyle.backgroundColor = slide.background.value;
    } else if (slide.background?.type === "image") {
      slideStyle.backgroundImage = `url(${slide.background.value})`;
      slideStyle.backgroundSize = "cover";
      slideStyle.backgroundPosition = "center";
      slideStyle.backgroundRepeat = "no-repeat";
    } else if (slide.background?.type === "gradient") {
      slideStyle.background = slide.background.value;
    }

    const dataAttributes = {
      "data-transition": slide.transition || presentation.config?.transition || "slide",
    };

    if (slide.background?.type === "video") {
      dataAttributes["data-background-video"] = slide.background.value;
      dataAttributes["data-background-video-loop"] = "true";
      dataAttributes["data-background-video-muted"] = "true";
    }

    return (
      <section
        key={slide.id}
        {...dataAttributes}
        style={slideStyle}
      >
        {slide.type === "title" && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2em" }}>
            <h1 style={{ fontSize: "4em", marginBottom: "0.5em", fontWeight: "bold" }}>
              {slide.content?.title || "Title"}
            </h1>
            {slide.content?.subtitle && (
              <h2 style={{ fontSize: "2em", color: "#888", fontWeight: "normal" }}>
                {slide.content.subtitle}
              </h2>
            )}
          </div>
        )}

        {slide.type === "content" && (
          <div style={{ padding: "2em", height: "100%", display: "flex", flexDirection: "column" }}>
            {slide.content?.title && (
              <h2 style={{ fontSize: "2.5em", marginBottom: "0.5em", fontWeight: "bold" }}>
                {slide.content.title}
              </h2>
            )}
            {slide.content?.content && (
              <div
                className="reveal-markdown"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(slide.content.content
                    .split("\n\n")
                    .map((para) => {
                      if (para.trim().startsWith("#")) {
                        return `<h1>${para.replace(/^#+\s*/, "")}</h1>`;
                      }
                      return `<p>${para}</p>`;
                    })
                    .join("")),
                }}
                style={{ fontSize: "1.5em", lineHeight: "1.6", flex: 1 }}
              />
            )}
            {slide.fragments?.map((fragment, fragIndex) => (
              <div
                key={fragment.id}
                className={`fragment ${fragment.animation || "fade-in"}`}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(fragment.content) }}
                style={{ fontSize: "1.5em", marginTop: "1em" }}
              />
            ))}
          </div>
        )}

        {slide.type === "code" && (
          <div style={{ padding: "2em", height: "100%" }}>
            {slide.content?.title && (
              <h2 style={{ fontSize: "2em", marginBottom: "0.5em" }}>{slide.content.title}</h2>
            )}
            {slide.content?.code && (
              <pre style={{ fontSize: "0.9em", maxHeight: "70%", overflow: "auto" }}>
                <code
                  data-trim
                  data-noescape
                  className={`language-${slide.content.language || "javascript"}`}
                  data-highlighted="false"
                >
                  {slide.content.code}
                </code>
              </pre>
            )}
          </div>
        )}

        {slide.type === "image" && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2em" }}>
            {slide.content?.title && (
              <h2 style={{ fontSize: "2em", marginBottom: "1em", fontWeight: "bold" }}>
                {slide.content.title}
              </h2>
            )}
            {slide.content?.imageUrl && (
              <img
                src={slide.content.imageUrl}
                alt={slide.content.caption || ""}
                style={{ maxWidth: "80%", maxHeight: "60%", objectFit: "contain", borderRadius: "8px" }}
              />
            )}
            {slide.content?.caption && (
              <p style={{ marginTop: "1em", fontSize: "1.2em", color: "#888", fontStyle: "italic" }}>
                {slide.content.caption}
              </p>
            )}
          </div>
        )}

        {slide.type === "video" && (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2em" }}>
            {slide.content?.title && (
              <h2 style={{ fontSize: "2em", marginBottom: "1em", fontWeight: "bold" }}>
                {slide.content.title}
              </h2>
            )}
            {slide.content?.videoUrl && (
              <div style={{ width: "80%", height: "60%", position: "relative" }}>
                {slide.content.videoUrl.includes("youtube.com") || slide.content.videoUrl.includes("youtu.be") ? (
                  <iframe
                    src={slide.content.videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={slide.content.videoUrl}
                    controls
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {slide.type === "chart" && (
          <div style={{ padding: "2em", height: "100%", display: "flex", flexDirection: "column" }}>
            {slide.content?.title && (
              <h2 style={{ fontSize: "2em", marginBottom: "1em", fontWeight: "bold" }}>
                {slide.content.title}
              </h2>
            )}
            <div
              id={`chart-${slide.id}`}
              style={{ width: "100%", height: "70%", position: "relative" }}
              data-chart-type={slide.content?.chartType || "bar"}
              data-chart-data={JSON.stringify(slide.content?.data || {})}
            >
              {!librariesLoaded && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#888" }}>
                  Loading chart...
                </div>
              )}
            </div>
          </div>
        )}

        {slide.type === "math" && (
          <div style={{ padding: "2em", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {slide.content?.title && (
              <h2 style={{ fontSize: "2em", marginBottom: "1em", fontWeight: "bold" }}>
                {slide.content.title}
              </h2>
            )}
            {slide.content?.equation && (
              <div
                className="math"
                style={{ fontSize: "2.5em", textAlign: "center" }}
                dangerouslySetInnerHTML={{
                  __html: window.katex
                    ? window.katex.renderToString(
                        slide.content.equation.includes("$$")
                          ? slide.content.equation.replace(/\$\$/g, "")
                          : slide.content.equation,
                        { displayMode: true }
                      )
                    : slide.content.equation,
                }}
              />
            )}
          </div>
        )}

        {slide.type === "mermaid" && slide.content?.mermaid && (
          <div style={{ padding: "2em", height: "100%", display: "flex", flexDirection: "column" }}>
            {slide.content?.title && (
              <h2 style={{ fontSize: "2em", marginBottom: "1em", fontWeight: "bold" }}>
                {slide.content.title}
              </h2>
            )}
            <div className="mermaid" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {slide.content.mermaid}
            </div>
          </div>
        )}

        {slide.type === "quiz" && (
          <div style={{ padding: "2em", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ fontSize: "2.5em", marginBottom: "1em", fontWeight: "bold" }}>
              {slide.content?.question || "Quiz Question"}
            </h2>
            {slide.content?.quizType === "multiple-choice" && slide.content?.options && (
              <div style={{ fontSize: "1.5em", lineHeight: "2" }}>
                {slide.content.options.map((option, idx) => {
                  const isCorrect = option.startsWith("*");
                  const text = isCorrect ? option.substring(1).trim() : option.trim();
                  return (
                    <div
                      key={idx}
                      className="fragment"
                      style={{
                        padding: "0.5em 1em",
                        margin: "0.5em 0",
                        backgroundColor: "#333",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      {String.fromCharCode(65 + idx)}. {text}
                      {isCorrect && <span style={{ color: "#4ade80", marginLeft: "0.5em" }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            )}
            {slide.content?.quizType === "true-false" && (
              <div style={{ fontSize: "1.5em", display: "flex", gap: "1em", justifyContent: "center" }}>
                <button className="fragment" style={{ padding: "1em 2em", fontSize: "1.2em", backgroundColor: "#333", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                  True
                </button>
                <button className="fragment" style={{ padding: "1em 2em", fontSize: "1.2em", backgroundColor: "#333", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                  False
                </button>
              </div>
            )}
            {slide.content?.explanation && (
              <div className="fragment" style={{ marginTop: "2em", padding: "1em", backgroundColor: "#1a1a1a", borderRadius: "8px", fontSize: "1.2em", color: "#888" }}>
                <strong>Explanation:</strong> {slide.content.explanation}
              </div>
            )}
          </div>
        )}
      </section>
    );
  };

  if (!presentation) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-xl">No presentation selected</div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>
    );
  }

  const theme = presentation.config?.theme || "black";
  const themeClass = `reveal-theme-${theme}`;

  return (
    <div className={`fixed inset-0 bg-black z-50 ${themeClass}`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors backdrop-blur-sm"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <FiMinimize2 className="w-5 h-5" />
          ) : (
            <FiMaximize2 className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors backdrop-blur-sm"
          title="Close (ESC)"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Reveal.js Container */}
      <div
        ref={revealRef}
        className="reveal"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="slides">
          {presentation.slides?.map((slide, index) => renderSlide(slide, index))}
        </div>
      </div>

      {/* Load theme CSS dynamically */}
      <style>{`
        .reveal-theme-black { --reveal-theme: black; }
        .reveal-theme-white { --reveal-theme: white; }
        .reveal-theme-league { --reveal-theme: league; }
        .reveal-theme-beige { --reveal-theme: beige; }
        .reveal-theme-sky { --reveal-theme: sky; }
        .reveal-theme-night { --reveal-theme: night; }
        .reveal-theme-simple { --reveal-theme: simple; }
        .reveal-theme-solarized { --reveal-theme: solarized; }
      `}</style>
    </div>
  );
}
