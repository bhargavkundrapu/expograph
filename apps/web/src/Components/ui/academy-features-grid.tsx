"use client";

import { Copy, FileText, FlaskConical, LayoutDashboard, Layers } from "lucide-react";
import { GlowingEffect } from "@/Components/ui/glowing-effect";
import { cn } from "@/lib/utils";

const features = [
  {
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <Copy className="h-4 w-4" />,
    title: "Smart Prompt Library",
    description:
      "Copy-ready prompts, error-fix snippets & command boxes. One-click copy, structured prompts, and error-handling examples so you learn faster.",
  },
  {
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: <FileText className="h-4 w-4" />,
    title: "Resume Builder",
    description:
      "Build a standout resume that gets you hired. Craft your professional story with guided templates and industry tips.",
  },
  {
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: <FlaskConical className="h-4 w-4" />,
    title: "Real Client Lab",
    description:
      "Practice with real-world projects and clients. Get hands-on experience before you land your dream role.",
  },
  {
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: <LayoutDashboard className="h-4 w-4" />,
    title: "Learning Portal",
    description:
      "A simple, learner-friendly LMS designed for you. Easy navigation, clear progress, and everything in one place.",
  },
  {
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    icon: <Layers className="h-4 w-4" />,
    title: "Structured Lessons",
    description:
      "Clear path from start to finish: Goals, videos, hands-on setup, presentations & success checkpoints. Know exactly where you stand.",
  },
];

export function AcademyFeaturesGrid() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {features.map((item) => (
        <li key={item.title} className={cn("min-h-[14rem] list-none", item.area)}>
          <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-black/40 p-6 shadow-sm backdrop-blur-sm md:p-6">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="w-fit rounded-lg border-[0.75px] border-white/20 bg-white/5 p-2 text-white">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-white/70">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
