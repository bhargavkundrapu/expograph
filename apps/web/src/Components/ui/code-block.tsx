import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

const variantStyles = {
  blue: "border-blue-400/60 shadow-blue-500/10",
  purple: "border-purple-400/60 shadow-purple-500/10",
  red: "border-red-400/60 shadow-red-500/10",
  neutral: "border-slate-600/60 shadow-slate-500/10",
};

/**
 * Terminal-style code block with window controls and optional copy.
 * Matches the design: window dots, language label, prompt prefix (green), content (white).
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
      className,
      children,
      ...props
    },
    ref
  ) => {
    const text = content ?? (typeof children === "string" ? children : "");
    const displayContent = text || "";

    return (
      <aside
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          "bg-black text-white p-0 rounded-lg w-full font-mono overflow-hidden",
          "border-2 shadow-lg",
          variantStyles[variant],
          className
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {/* Title bar: window controls + language label + optional copy */}
        <div className="flex justify-between items-center px-4 py-2.5 bg-[#161b22] border-b border-slate-700/80">
          <div className="flex items-center gap-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/90" aria-hidden />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90" aria-hidden />
              <div className="w-3 h-3 rounded-full bg-green-500/90" aria-hidden />
            </div>
            <p className="text-sm text-slate-400 ml-2">{language}</p>
          </div>
          {onCopy != null && (
            <button
              type="button"
              onClick={onCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs font-mono border border-slate-600 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
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
        {/* Content area: prompt prefix (green) + content (white) */}
        <div className="p-4 min-h-[80px]">
          <pre className="text-sm whitespace-pre-wrap overflow-x-auto text-slate-200 leading-relaxed">
            {promptPrefix != null && (
              <span className="text-green-400">{promptPrefix} </span>
            )}
            <span className="text-white">{displayContent || " "}</span>
          </pre>
        </div>
      </aside>
    );
  }
);

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
