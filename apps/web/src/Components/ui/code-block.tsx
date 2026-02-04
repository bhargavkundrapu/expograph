import * as React from "react";
import { useState } from "react";
import { Copy, Check, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CodeBlockTheme = "light" | "dark";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Label shown in the title bar (e.g. "bash", "Prompts", "Commands") */
  language?: string;
  /** Raw code/content to display. If not set, use children. */
  content?: string;
  /** Prefix for the command line (e.g. "$", ">", "!"). Shown in green. */
  promptPrefix?: string;
  /** Callback when copy button is clicked. If not provided, copy button is hidden. */
  onCopy?: () => void;
  /** Whether content was just copied (show "Copied" state). */
  copied?: boolean;
  /** Optional border/accent color theme: "blue" | "purple" | "red" | "neutral" */
  variant?: "blue" | "purple" | "red" | "neutral";
  /** Initial theme: "light" | "dark". Default "dark". */
  defaultTheme?: CodeBlockTheme;
}

const variantStyles = {
  blue: {
    dark: "border-blue-400/60 shadow-blue-500/10",
    light: "border-blue-300 shadow-blue-500/5",
  },
  purple: {
    dark: "border-purple-400/60 shadow-purple-500/10",
    light: "border-purple-300 shadow-purple-500/5",
  },
  red: {
    dark: "border-red-400/60 shadow-red-500/10",
    light: "border-red-300 shadow-red-500/5",
  },
  neutral: {
    dark: "border-slate-600/60 shadow-slate-500/10",
    light: "border-slate-400 shadow-slate-500/5",
  },
};

/**
 * Terminal-style code block with window controls, optional copy, and light/dark theme toggle.
 */
const CodeBlock = React.forwardRef<HTMLElement, CodeBlockProps>(
  (
    {
      language = "bash",
      content,
      promptPrefix,
      onCopy,
      copied = false,
      variant = "neutral",
      defaultTheme = "dark",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [theme, setTheme] = useState<CodeBlockTheme>(defaultTheme);
    const isDark = theme === "dark";

    const text = content ?? (typeof children === "string" ? children : "");
    const displayContent = text || "";

    const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return (
      <aside
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          "p-0 rounded-lg w-full font-mono overflow-hidden border-2 shadow-lg transition-colors",
          isDark
            ? "bg-black text-white"
            : "bg-slate-50 text-slate-900",
          variantStyles[variant][theme],
          className
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {/* Title bar: window controls + language label + theme toggle + optional copy */}
        <div
          className={cn(
            "flex justify-between items-center px-4 py-2.5 border-b transition-colors",
            isDark ? "bg-[#161b22] border-slate-700/80" : "bg-slate-200/80 border-slate-300"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/90" aria-hidden />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90" aria-hidden />
              <div className="w-3 h-3 rounded-full bg-green-500/90" aria-hidden />
            </div>
            <p className={cn("text-sm ml-2", isDark ? "text-slate-400" : "text-slate-600")}>
              {language}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light mode" : "Dark mode"}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                isDark
                  ? "bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white"
                  : "bg-slate-300/80 hover:bg-slate-400 text-slate-600 hover:text-slate-900"
              )}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {onCopy != null && (
              <button
                type="button"
                onClick={onCopy}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono border transition-colors",
                  isDark
                    ? "bg-slate-700/80 hover:bg-slate-600 text-slate-200 border-slate-600"
                    : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
                )}
              >
                {copied ? (
                  <>
                    <Check className={cn("w-3.5 h-3.5", isDark ? "text-green-400" : "text-green-600")} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        {/* Content area: prompt prefix (green) + content */}
        <div className="p-4 min-h-[80px]">
          <pre
            className={cn(
              "text-sm whitespace-pre-wrap overflow-x-auto leading-relaxed transition-colors",
              isDark ? "text-slate-200" : "text-slate-800"
            )}
          >
            {promptPrefix != null && (
              <span className={isDark ? "text-green-400" : "text-green-600"}>{promptPrefix} </span>
            )}
            <span className={isDark ? "text-white" : "text-slate-900"}>{displayContent || " "}</span>
          </pre>
        </div>
      </aside>
    );
  }
);

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
