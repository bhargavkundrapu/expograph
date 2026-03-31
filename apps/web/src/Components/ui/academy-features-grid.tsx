"use client";

import { Copy, FileText, FlaskConical, LayoutDashboard, Layers, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React from "react";

export const featureData = [
  {
    slug: "smart-prompts",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <Copy className="h-4 w-4" />,
    title: "Smart Prompt Library",
    tag: "Learn 10x Faster",
    description: (
      <>
        <strong className="text-violet-400">One-click copy</strong> prompts, structured snippets &{" "}
        <strong className="text-violet-400">error-handling</strong> command boxes-no more Googling for fixes.
      </>
    ),
    bullets: ["Copy-ready code prompts", "Error-fix snippets", "Command reference boxes"],
    accent: {
      borderBottom: "border-b-2 border-b-violet-500/40",
      iconBg: "bg-violet-500/10 border-violet-500/30",
      iconColor: "text-violet-400",
      tagBg: "bg-violet-500/10 text-violet-400",
    },
  },
  {
    slug: "resume-builder",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/6]",
    icon: <FileText className="h-4 w-4" />,
    title: "Resume Builder",
    tag: "Get Hired",
    description: (
      <>
        Build a <strong className="text-blue-400">standout resume</strong> in minutes. Guided{" "}
        <strong className="text-blue-400">templates</strong>, industry tips & instant PDF export.
      </>
    ),
    bullets: ["4-step guided wizard", "Professional templates", "Instant PDF download"],
    accent: {
      borderBottom: "border-b-2 border-b-blue-500/40",
      iconBg: "bg-blue-500/10 border-blue-500/30",
      iconColor: "text-blue-400",
      tagBg: "bg-blue-500/10 text-blue-400",
    },
  },
  {
    slug: "real-client-lab",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/2/9]",
    icon: <FlaskConical className="h-4 w-4" />,
    title: "Real Client Lab",
    tag: "Real Experience",
    description: (
      <>
        Work on <strong className="text-purple-400">real-world projects</strong> with actual clients. Get{" "}
        <strong className="text-purple-400">mentor feedback</strong> before you land your dream role.
      </>
    ),
    bullets: ["Live client projects", "Mentor-reviewed submissions", "Portfolio-ready work"],
    accent: {
      borderBottom: "border-b-2 border-b-purple-500/40",
      iconBg: "bg-purple-500/10 border-purple-500/30",
      iconColor: "text-purple-400",
      tagBg: "bg-purple-500/10 text-purple-400",
    },
  },
  {
    slug: "learning-portal",
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/9/2/13]",
    icon: <LayoutDashboard className="h-4 w-4" />,
    title: "Learning Portal",
    tag: "Your Dashboard",
    description: (
      <>
        A <strong className="text-fuchsia-400">learner-friendly LMS</strong> built for you.{" "}
        <strong className="text-fuchsia-400">Track progress</strong>, manage courses & stay on track.
      </>
    ),
    bullets: ["Visual progress tracking", "Smart course navigation", "Personalized dashboard"],
    accent: {
      borderBottom: "border-b-2 border-b-fuchsia-500/40",
      iconBg: "bg-fuchsia-500/10 border-fuchsia-500/30",
      iconColor: "text-fuchsia-400",
      tagBg: "bg-fuchsia-500/10 text-fuchsia-400",
    },
  },
  {
    slug: "structured-lessons",
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/6/3/13]",
    icon: <Layers className="h-4 w-4" />,
    title: "Structured Lessons",
    tag: "Step by Step",
    description: (
      <>
        Every lesson follows a clear path: <strong className="text-indigo-400">Goals</strong>, video,{" "}
        <strong className="text-indigo-400">hands-on setup</strong> &{" "}
        <strong className="text-indigo-400">success checkpoints</strong>.
      </>
    ),
    bullets: ["Goal-driven learning", "Video + hands-on setup", "Success checkpoints"],
    accent: {
      borderBottom: "border-b-2 border-b-indigo-500/40",
      iconBg: "bg-indigo-500/10 border-indigo-500/30",
      iconColor: "text-indigo-400",
      tagBg: "bg-indigo-500/10 text-indigo-400",
    },
  },
];

export function AcademyFeaturesGrid() {
  return (
    <ul className="grid grid-cols-1 auto-rows-auto gap-3 sm:gap-4 md:grid-cols-12 lg:gap-4">
      {featureData.map((item) => (
        <li key={item.title} className={cn("list-none", item.area)}>
          <Link to={`/features/${item.slug}`} className="block h-full">
            <div
              className={cn(
                "h-full rounded-[1.25rem] border border-white/10 p-2 md:rounded-[1.5rem] md:p-3",
                item.accent.borderBottom
              )}
            >
              <div
                className={cn(
                  "flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-black/70 p-5 sm:p-6",
                  "border-b-0"
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className={cn("w-fit rounded-lg border-[0.75px] p-2.5", item.accent.iconBg, item.accent.iconColor)}>
                      {item.icon}
                    </div>
                    <span className={cn("text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full", item.accent.tagBg)}>
                      {item.tag}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl leading-snug font-semibold font-sans tracking-[-0.03em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm leading-[1.4] md:text-[15px] md:leading-[1.5] text-white/55">
                      {item.description}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5 pt-1">
                    {item.bullets.map((b) => (
                      <li key={b} className="text-[11px] sm:text-xs text-white/40 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-white/50">
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
