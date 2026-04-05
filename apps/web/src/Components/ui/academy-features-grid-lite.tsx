"use client";

import { Copy, FileText, FlaskConical, LayoutDashboard, Layers, ArrowRight, TrendingUp, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React from "react";

const featureDataLite = [
  {
    slug: "smart-prompts",
    icon: <Copy className="h-4 w-4" />,
    title: "Smart Prompt Library",
    tag: "Learn 10x Faster",
    description: "One-click copy prompts, structured snippets & error-handling command boxes.",
    accent: {
      borderBottom: "border-b-2 border-b-violet-500/40",
      iconBg: "bg-violet-500/10 border-violet-500/30",
      iconColor: "text-violet-400",
      tagBg: "bg-violet-500/10 text-violet-400",
    },
  },
  {
    slug: "resume-builder",
    icon: <FileText className="h-4 w-4" />,
    title: "Resume Builder",
    tag: "Get Hired",
    description: "Build a standout resume in minutes with guided templates & instant PDF export.",
    accent: {
      borderBottom: "border-b-2 border-b-blue-500/40",
      iconBg: "bg-blue-500/10 border-blue-500/30",
      iconColor: "text-blue-400",
      tagBg: "bg-blue-500/10 text-blue-400",
    },
  },
  {
    slug: "real-client-lab",
    icon: <FlaskConical className="h-4 w-4" />,
    title: "Real Client Lab",
    tag: "Real Experience",
    description: "Work on real-world projects with actual clients and get mentor feedback.",
    accent: {
      borderBottom: "border-b-2 border-b-purple-500/40",
      iconBg: "bg-purple-500/10 border-purple-500/30",
      iconColor: "text-purple-400",
      tagBg: "bg-purple-500/10 text-purple-400",
    },
  },
  {
    slug: "learning-portal",
    icon: <LayoutDashboard className="h-4 w-4" />,
    title: "Learning Portal",
    tag: "Your Dashboard",
    description: "A learner-friendly LMS-track progress, manage courses & stay on track.",
    accent: {
      borderBottom: "border-b-2 border-b-fuchsia-500/40",
      iconBg: "bg-fuchsia-500/10 border-fuchsia-500/30",
      iconColor: "text-fuchsia-400",
      tagBg: "bg-fuchsia-500/10 text-fuchsia-400",
    },
  },
  {
    slug: "structured-lessons",
    icon: <Layers className="h-4 w-4" />,
    title: "Structured Lessons",
    tag: "Step by Step",
    description: "Clear path: Goals, video, hands-on setup & success checkpoints.",
    accent: {
      borderBottom: "border-b-2 border-b-indigo-500/40",
      iconBg: "bg-indigo-500/10 border-indigo-500/30",
      iconColor: "text-indigo-400",
      tagBg: "bg-indigo-500/10 text-indigo-400",
    },
  },
  {
    slug: "jobs-search-hub",
    icon: <TrendingUp className="h-4 w-4" />,
    title: "Jobs Search Hub",
    tag: "Careers",
    description: "India-first job search: role presets, smart keywords & redirects to top portals — in your LMS.",
    accent: {
      borderBottom: "border-b-2 border-b-emerald-500/40",
      iconBg: "bg-emerald-500/10 border-emerald-500/30",
      iconColor: "text-emerald-400",
      tagBg: "bg-emerald-500/10 text-emerald-400",
    },
  },
  {
    slug: "startup-launchpad",
    icon: <Rocket className="h-4 w-4" />,
    title: "Startup LaunchPad",
    tag: "Founder Path",
    description: "All Pack or all three main courses. Guided founder path in your LMS—readiness, tools, and legal timing (not a course flow).",
    accent: {
      borderBottom: "border-b-2 border-b-orange-500/40",
      iconBg: "bg-orange-500/10 border-orange-500/30",
      iconColor: "text-orange-400",
      tagBg: "bg-orange-500/10 text-orange-400",
    },
  },
];

export function AcademyFeaturesGridLite() {
  return (
    <ul className="grid grid-cols-1 gap-3">
      {featureDataLite.map((item) => (
        <li key={item.title} className="list-none">
          <Link to={`/features/${item.slug}`} className="block">
            <div className={cn("rounded-2xl border border-white/10 p-5 bg-black/70", item.accent.borderBottom)}>
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-fit rounded-lg border-[0.75px] p-2", item.accent.iconBg, item.accent.iconColor)}>
                  {item.icon}
                </div>
                <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full", item.accent.tagBg)}>
                  {item.tag}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-3">{item.description}</p>
              <div className="flex items-center gap-1.5 text-xs text-white/50">
                <span>Explore</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
