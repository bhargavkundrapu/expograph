import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../app/providers/AuthProvider";
import {
  FiCode,
  FiPlay,
  FiSave,
  FiDownload,
  FiCopy,
  FiRefreshCw,
  FiFile,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";

export default function StudentPlayground() {
  const { user, token } = useAuth();
  const [code, setCode] = useState(`// Welcome to Code Playground!
// Write your code here and click Run to execute

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
console.log("Start coding!");`);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);
  const [savedSnippets, setSavedSnippets] = useState([]);
  const [snippetName, setSnippetName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const languages = [
    { id: "javascript", label: "JavaScript", icon: "📜" },
    { id: "python", label: "Python", icon: "🐍" },
    { id: "html", label: "HTML", icon: "🌐" },
    { id: "css", label: "CSS", icon: "🎨" },
    { id: "java", label: "Java", icon: "☕" },
    { id: "cpp", label: "C++", icon: "⚙️" },
  ];

  const templates = {
    javascript: `// JavaScript Template
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
    python: `# Python Template
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
    html: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
    css: `/* CSS Template */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`,
    java: `// Java Template
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    cpp: `// C++ Template
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  };

  useEffect(() => {
    loadSavedSnippets();
  }, []);

  const loadSavedSnippets = () => {
    // Load from localStorage
    const saved = localStorage.getItem("playground_snippets");
    if (saved) {
      try {
        setSavedSnippets(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load snippets:", e);
      }
    }
  };

  const saveSnippet = () => {
    if (!snippetName.trim()) return;

    const newSnippet = {
      id: Date.now().toString(),
      name: snippetName,
      code,
      language,
      createdAt: new Date().toISOString(),
    };

    const updated = [...savedSnippets, newSnippet];
    setSavedSnippets(updated);
    localStorage.setItem("playground_snippets", JSON.stringify(updated));
    setSnippetName("");
    setShowSaveModal(false);
  };

  const loadSnippet = (snippet) => {
    setCode(snippet.code);
    setLanguage(snippet.language);
  };

  const deleteSnippet = (id) => {
    const updated = savedSnippets.filter((s) => s.id !== id);
    setSavedSnippets(updated);
    localStorage.setItem("playground_snippets", JSON.stringify(updated));
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running...\n");

    try {
      // Mock execution - In production, this would call a backend API
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (language === "javascript") {
        // Simple JavaScript execution simulation
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        };

        try {
          // Use Function constructor instead of eval to avoid bundler warnings (no direct eval)
          const runCode = new Function("console", code);
          runCode(console);
          setOutput(logs.join("\n") || "Code executed successfully (no output)");
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          console.log = originalLog;
        }
      } else {
        setOutput(`Code execution for ${language} is simulated.\nIn production, this would execute in a secure sandbox environment.`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language === "javascript" ? "js" : language === "python" ? "py" : "txt"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetCode = () => {
    setCode(templates[language] || "");
    setOutput("");
  };

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    setCode(templates[newLang] || "");
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FiCode className="w-10 h-10 text-blue-400" />
            Code Playground
          </h1>
          <p className="text-slate-400">Write, run, and test your code in real-time</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50"
            >
              <div className="flex flex-wrap items-center gap-3">
                {/* Language Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Language:</span>
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="px-3 py-1.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.icon} {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1" />

                {/* Action Buttons */}
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <FiPlay className="w-4 h-4" />
                  Run
                </button>

                <button
                  onClick={() => setShowSaveModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FiSave className="w-4 h-4" />
                  Save
                </button>

                <button
                  onClick={copyCode}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                </button>

                <button
                  onClick={downloadCode}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FiDownload className="w-4 h-4" />
                </button>

                <button
                  onClick={resetCode}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <FiRefreshCw className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Code Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 rounded-md border border-slate-700/50 overflow-hidden"
            >
              <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiFile className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">main.{language === "javascript" ? "js" : language === "python" ? "py" : language}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{code.split("\n").length} lines</span>
                  <span>•</span>
                  <span>{code.length} characters</span>
                </div>
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 bg-slate-900 text-white font-mono text-sm resize-none focus:outline-none"
                style={{ fontFamily: "Monaco, 'Courier New', monospace" }}
                spellCheck={false}
              />
            </motion.div>

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 rounded-md border border-slate-700/50 overflow-hidden"
            >
              <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-700/50">
                <span className="text-sm font-medium text-slate-400">Output</span>
              </div>
              <pre className="p-4 text-sm text-slate-300 font-mono whitespace-pre-wrap min-h-32 max-h-64 overflow-y-auto">
                {output || "Output will appear here after running your code..."}
              </pre>
            </motion.div>
          </div>

          {/* Saved Snippets Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 rounded-md p-4 border border-slate-700/50"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiFile className="w-5 h-5 text-blue-400" />
              Saved Snippets
            </h3>

            {savedSnippets.length === 0 ? (
              <div className="text-center py-8">
                <FiFile className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">No saved snippets yet</p>
                <p className="text-slate-500 text-xs mt-1">Save your code to access it later</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                {savedSnippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 hover:border-slate-600 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{snippet.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(snippet.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteSnippet(snippet.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600/20 rounded transition-all"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <button
                      onClick={() => loadSnippet(snippet)}
                      className="w-full mt-2 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded text-xs font-medium transition-colors"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Save Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-md p-6 border border-slate-700 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Save Code Snippet</h3>
              <input
                type="text"
                placeholder="Enter snippet name..."
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && saveSnippet()}
                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={saveSnippet}
                  disabled={!snippetName.trim()}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowSaveModal(false);
                    setSnippetName("");
                  }}
                  className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
