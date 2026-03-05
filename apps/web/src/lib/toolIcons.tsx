import {
  MessageSquare,
  LayoutTemplate,
  Braces,
  Code2,
  Server,
  Database,
  Box,
  Palette,
  GitBranch,
  Cloud,
  Mail,
  Search,
  Megaphone,
  Video,
  Briefcase,
  MessageCircle,
  Image,
  Smartphone,
  Mic,
  FileText,
  Workflow,
  Key,
  Table,
  BookOpen,
  Award,
  Sparkles,
} from "lucide-react";

/** Maps tool/tech names (course-specific) to Lucide icons for "You'll work with" sections */
export function getToolIcon(toolName: string) {
  const t = toolName.toLowerCase();
  if (t.includes("chatgpt") || t.includes("claude") || t.includes("gemini") || t.includes("cursor") || t.includes("openai") || t.includes("mcp")) return MessageSquare;
  if (t.includes("gccf") || t.includes("crafted") || t.includes("framework") || t.includes("3r") || t.includes("structured")) return LayoutTemplate;
  if (t.includes("json")) return Braces;
  if (t.includes("react") || t.includes("vite") || t.includes("code")) return Code2;
  if (t.includes("node")) return Server;
  if (t.includes("postgresql") || t.includes("neon") || t.includes("database")) return Database;
  if (t.includes("prisma")) return Box;
  if (t.includes("tailwind") || t.includes("css")) return Palette;
  if (t.includes("git")) return GitBranch;
  if (t.includes("antigravity")) return Sparkles;
  if (t.includes("render")) return Server;
  if (t.includes("vercel") || t.includes("cloud")) return Cloud;
  if (t.includes("make") || t.includes("n8n") || t.includes("webhook")) return Workflow;
  if ((t.includes("api") && !t.includes("openai")) || t.includes("apis")) return Workflow;
  if (t.includes("sheets") || t.includes("table")) return Table;
  if (t.includes("slack") || t.includes("twitter")) return MessageCircle;
  if (t.includes("gmail") || t.includes("email") || t.includes("mail")) return Mail;
  if (t.includes("key") || (t.includes("api") && t.includes("open"))) return Key;
  if (t.includes("seo") || t.includes("search")) return Search;
  if (t.includes("landing") || t.includes("page")) return FileText;
  if (t.includes("facebook") || t.includes("ads") || t.includes("megaphone")) return Megaphone;
  if (t.includes("youtube") || t.includes("video")) return Video;
  if (t.includes("linkedin")) return Briefcase;
  if (t.includes("instagram") || t.includes("image")) return Image;
  if (t.includes("sms") || t.includes("smartphone")) return Smartphone;
  if (t.includes("podcast") || t.includes("mic")) return Mic;
  if (t.includes("certificate") || t.includes("resume") || t.includes("client lab")) return Award;
  if (t.includes("all course") || t.includes("tool")) return Sparkles;
  return BookOpen;
}

/** Tailwind text color class for each tool icon (brand/context-related) */
export function getToolIconColor(toolName: string): string {
  const t = toolName.toLowerCase();
  if (t.includes("chatgpt") || t.includes("openai")) return "text-emerald-400";
  if (t.includes("claude")) return "text-amber-400";
  if (t.includes("gemini")) return "text-blue-400";
  if (t.includes("cursor")) return "text-violet-400";
  if (t.includes("mcp") || t.includes("gccf") || t.includes("crafted") || t.includes("framework") || t.includes("3r") || t.includes("structured")) return "text-indigo-400";
  if (t.includes("json")) return "text-yellow-500";
  if (t.includes("react")) return "text-cyan-400";
  if (t.includes("vite")) return "text-violet-500";
  if (t.includes("node")) return "text-green-500";
  if (t.includes("postgresql") || t.includes("neon")) return "text-blue-400";
  if (t.includes("prisma")) return "text-slate-300";
  if (t.includes("tailwind")) return "text-sky-400";
  if (t.includes("css")) return "text-blue-400";
  if (t.includes("git")) return "text-orange-500";
  if (t.includes("antigravity")) return "text-violet-400";
  if (t.includes("render")) return "text-emerald-500";
  if (t.includes("vercel")) return "text-white";
  if (t.includes("cloud")) return "text-sky-400";
  if (t.includes("make")) return "text-orange-500";
  if (t.includes("n8n")) return "text-red-400";
  if (t.includes("webhook") || t.includes("api")) return "text-teal-400";
  if (t.includes("sheets") || t.includes("table")) return "text-green-500";
  if (t.includes("slack")) return "text-purple-400";
  if (t.includes("twitter")) return "text-sky-400";
  if (t.includes("gmail") || t.includes("mail")) return "text-red-400";
  if (t.includes("email")) return "text-amber-400";
  if (t.includes("seo") || t.includes("search")) return "text-blue-400";
  if (t.includes("landing") || t.includes("page")) return "text-slate-400";
  if (t.includes("facebook") || t.includes("ads")) return "text-blue-500";
  if (t.includes("youtube") || t.includes("video")) return "text-red-500";
  if (t.includes("linkedin")) return "text-blue-600";
  if (t.includes("instagram") || t.includes("image")) return "text-pink-500";
  if (t.includes("sms") || t.includes("smartphone")) return "text-emerald-500";
  if (t.includes("podcast") || t.includes("mic")) return "text-violet-400";
  if (t.includes("certificate") || t.includes("award")) return "text-amber-400";
  if (t.includes("resume") || t.includes("client lab")) return "text-teal-400";
  if (t.includes("megaphone")) return "text-orange-400";
  if (t.includes("all course") || t.includes("tool")) return "text-amber-400";
  return "text-slate-400";
}
