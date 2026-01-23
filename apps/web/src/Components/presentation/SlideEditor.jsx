import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiType,
  FiCode,
  FiImage,
  FiVideo,
  FiBarChart2,
  FiZap,
  FiLayout,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import VoiceOverEditor from "./VoiceOverEditor";

const slideTypes = [
  { id: "title", label: "Title", icon: FiType },
  { id: "content", label: "Content", icon: FiLayout },
  { id: "code", label: "Code", icon: FiCode },
  { id: "image", label: "Image", icon: FiImage },
  { id: "video", label: "Video", icon: FiVideo },
  { id: "chart", label: "Chart", icon: FiBarChart2 },
  { id: "math", label: "Math", icon: FiZap },
  { id: "mermaid", label: "Diagram", icon: FiLayout },
  { id: "quiz", label: "Quiz", icon: FiZap },
];

const transitions = [
  "none",
  "fade",
  "slide",
  "convex",
  "concave",
  "zoom",
];

const fragmentAnimations = [
  "fade-in",
  "fade-out",
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "grow",
  "shrink",
  "strike",
  "highlight-red",
  "highlight-green",
  "highlight-blue",
];

export default function SlideEditor({ slide, onUpdate, config }) {
  const [activeTab, setActiveTab] = useState("content");

  const handleContentChange = (field, value) => {
    onUpdate({
      content: {
        ...slide.content,
        [field]: value,
      },
    });
  };

  const handleBackgroundChange = (type, value) => {
    onUpdate({
      background: {
        type,
        value,
      },
    });
  };

  const handleAddFragment = () => {
    const newFragment = {
      id: `fragment-${Date.now()}`,
      content: "",
      animation: "fade-in",
    };
    onUpdate({
      fragments: [...(slide.fragments || []), newFragment],
    });
  };

  const handleUpdateFragment = (id, updates) => {
    onUpdate({
      fragments: slide.fragments.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    });
  };

  const handleDeleteFragment = (id) => {
    onUpdate({
      fragments: slide.fragments.filter((f) => f.id !== id),
    });
  };

  const renderContentEditor = () => {
    switch (slide.type) {
      case "title":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={slide.content?.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Slide Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={slide.content?.subtitle || ""}
                onChange={(e) => handleContentChange("subtitle", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subtitle"
              />
            </div>
          </div>
        );

      case "content":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={slide.content?.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content (Markdown supported)
              </label>
              <textarea
                value={slide.content?.content || ""}
                onChange={(e) => handleContentChange("content", e.target.value)}
                rows={10}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="Enter content here..."
              />
            </div>
          </div>
        );

      case "code":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={slide.content?.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Language
              </label>
              <select
                value={slide.content?.language || "javascript"}
                onChange={(e) => handleContentChange("language", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Code
              </label>
              <div className="border border-slate-300 rounded-md overflow-hidden">
                <CodeMirror
                  value={slide.content?.code || ""}
                  height="300px"
                  extensions={[
                    javascript(),
                    html(),
                    css(),
                    markdown(),
                  ]}
                  theme={oneDark}
                  onChange={(value) => handleContentChange("code", value)}
                />
              </div>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={slide.content?.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={slide.content?.imageUrl || ""}
                onChange={(e) => handleContentChange("imageUrl", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {slide.content?.imageUrl && (
              <div className="mt-4">
                <img
                  src={slide.content.imageUrl}
                  alt="Preview"
                  className="max-w-full h-auto rounded-md border border-slate-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Caption
              </label>
              <input
                type="text"
                value={slide.content?.caption || ""}
                onChange={(e) => handleContentChange("caption", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Image caption"
              />
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={slide.content?.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={slide.content?.videoUrl || ""}
                onChange={(e) => handleContentChange("videoUrl", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/video.mp4 or YouTube/Vimeo URL"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoplay"
                checked={slide.content?.autoplay || false}
                onChange={(e) => handleContentChange("autoplay", e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="autoplay" className="text-sm text-slate-700">
                Autoplay video
              </label>
            </div>
          </div>
        );

      case "chart":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={slide.content?.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Chart Type
              </label>
              <select
                value={slide.content?.chartType || "bar"}
                onChange={(e) => handleContentChange("chartType", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="doughnut">Doughnut Chart</option>
                <option value="radar">Radar Chart</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Chart Data (JSON)
              </label>
              <textarea
                value={JSON.stringify(slide.content?.data || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const data = JSON.parse(e.target.value);
                    handleContentChange("data", data);
                  } catch (err) {
                    // Invalid JSON, ignore
                  }
                }}
                rows={10}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder='{"labels": ["A", "B", "C"], "datasets": [...]}'
              />
            </div>
          </div>
        );

      case "math":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={slide.content?.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                LaTeX Equation
              </label>
              <textarea
                value={slide.content?.equation || ""}
                onChange={(e) => handleContentChange("equation", e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="E = mc^2 or \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"
              />
            </div>
            <div className="text-sm text-slate-500">
              Use LaTeX syntax for mathematical equations. Inline: $...$ or Block: $$...$$
            </div>
          </div>
        );

      default:
        return <div>Unknown slide type</div>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tabs */}
      <div className="border-b border-slate-200 flex">
        {["content", "background", "fragments", "voice", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm capitalize transition-colors ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "content" && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Slide Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {slideTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => onUpdate({ type: type.id, content: getDefaultContent(type.id) })}
                      className={`p-4 border-2 rounded-md flex flex-col items-center gap-2 transition-all ${
                        slide.type === type.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {renderContentEditor()}
          </div>
        )}

        {activeTab === "background" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Background Type
              </label>
              <select
                value={slide.background?.type || "color"}
                onChange={(e) => handleBackgroundChange(e.target.value, slide.background?.value || "")}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="color">Color</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            {slide.background?.type === "color" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={slide.background?.value || "#ffffff"}
                    onChange={(e) => handleBackgroundChange("color", e.target.value)}
                    className="w-16 h-10 border border-slate-300 rounded"
                  />
                  <input
                    type="text"
                    value={slide.background?.value || "#ffffff"}
                    onChange={(e) => handleBackgroundChange("color", e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {slide.background?.type === "image" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Background Image URL
                </label>
                <input
                  type="url"
                  value={slide.background?.value || ""}
                  onChange={(e) => handleBackgroundChange("image", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}

            {slide.background?.type === "video" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Background Video URL
                </label>
                <input
                  type="url"
                  value={slide.background?.value || ""}
                  onChange={(e) => handleBackgroundChange("video", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/video.mp4"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "fragments" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Fragments</h3>
              <button
                onClick={handleAddFragment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Add Fragment
              </button>
            </div>

            {slide.fragments && slide.fragments.length > 0 ? (
              <div className="space-y-3">
                {slide.fragments.map((fragment, index) => (
                  <div
                    key={fragment.id}
                    className="p-4 border border-slate-200 rounded-md bg-slate-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        Fragment {index + 1}
                      </span>
                      <button
                        onClick={() => handleDeleteFragment(fragment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <textarea
                        value={fragment.content || ""}
                        onChange={(e) =>
                          handleUpdateFragment(fragment.id, { content: e.target.value })
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Fragment content..."
                      />
                      <select
                        value={fragment.animation || "fade-in"}
                        onChange={(e) =>
                          handleUpdateFragment(fragment.id, { animation: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        {fragmentAnimations.map((anim) => (
                          <option key={anim} value={anim}>
                            {anim}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No fragments. Add fragments to reveal content step-by-step.
              </div>
            )}
          </div>
        )}

        {activeTab === "voice" && (
          <div>
            <VoiceOverEditor
              slide={slide}
              onUpdate={(updates) => onUpdate(updates)}
            />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Transition
              </label>
              <select
                value={slide.transition || "slide"}
                onChange={(e) => onUpdate({ transition: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {transitions.map((trans) => (
                  <option key={trans} value={trans}>
                    {trans}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
    case "mermaid":
      return {
        title: "Diagram",
        mermaid: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`,
      };
    case "quiz":
      return {
        title: "Quiz Question",
        question: "What is the answer?",
        quizType: "multiple-choice",
        options: ["*Correct Answer", "Wrong Answer 1", "Wrong Answer 2"],
        explanation: "This is the correct answer because...",
      };
    default:
      return { title: "New Slide", content: "" };
  }
}
