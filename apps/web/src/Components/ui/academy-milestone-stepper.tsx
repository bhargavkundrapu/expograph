"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Zap, Code2, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import { MilestoneStepper, MilestoneData } from "./milestone-stepper";
import { useBreakpoint } from "../../hooks/useMediaQuery";
import React from "react";

const milestones: MilestoneData[] = [
  {
    id: 1,
    title: "Explore & Pick Your Course",
    description: "Find the perfect course for your goals",
    date: "Step 1",
    icon: <Search className="size-4" />,
  },
  {
    id: 2,
    title: "Enroll & Start Vibing",
    description: "One click and you're in",
    date: "Step 2",
    icon: <Zap className="size-4" />,
  },
  {
    id: 3,
    title: "Learn, Build & Ship",
    description: "Smart prompts, structured lessons & Real Client Lab",
    date: "Step 3",
    icon: <Code2 className="size-4" />,
  },
  {
    id: 4,
    title: "Grow Your Career",
    description: "Portfolio, resume & real-world proof",
    icon: <Trophy className="size-4" />,
  },
];

interface ContentBlock {
  title: string;
  body: React.ReactNode;
  highlights: string[];
  cta: string;
  accent: {
    border: string;
    bg: string;
    text: string;
    glow: string;
    btnBg: string;
    btnHover: string;
  };
}

const contentBlocks: ContentBlock[] = [
  {
    title: "Explore & Pick Your Course",
    body: (
      <>
        Browse courses in <strong className="text-blue-300">web development</strong>,{" "}
        <strong className="text-blue-300">vibe coding</strong>, and more. Each course shows what you'll learn, the tech stack, and how long it takes. Pick the one that matches your goals.
      </>
    ),
    highlights: ["Vibe Coding", "Web Dev", "Full Stack", "UI/UX"],
    cta: "Browse Courses",
    accent: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/5",
      text: "text-blue-400",
      glow: "from-blue-600/10 via-transparent to-transparent",
      btnBg: "bg-blue-600",
      btnHover: "hover:bg-blue-700",
    },
  },
  {
    title: "Enroll & Start Vibing",
    body: (
      <>
        Enroll instantly and get full access to <strong className="text-violet-300">all lessons</strong>,{" "}
        <strong className="text-violet-300">smart prompts</strong>, setup guides, and resources. No waiting — start learning the moment you join.
      </>
    ),
    highlights: ["Instant Access", "Smart Prompts", "Setup Guides", "Resources"],
    cta: "Get Started",
    accent: {
      border: "border-violet-500/20",
      bg: "bg-violet-500/5",
      text: "text-violet-400",
      glow: "from-violet-600/10 via-transparent to-transparent",
      btnBg: "bg-violet-600",
      btnHover: "hover:bg-violet-700",
    },
  },
  {
    title: "Learn, Build & Ship",
    body: (
      <>
        Every lesson follows a clear structure: <strong className="text-purple-300">Goal → Video → Setup → Prompts → Success Check</strong>.
        Copy code with one click, build hands-on projects, and work on <strong className="text-purple-300">real client projects</strong> in the Client Lab with mentor feedback.
      </>
    ),
    highlights: ["Structured Lessons", "One-Click Copy", "Real Client Lab", "Mentor Feedback"],
    cta: "View Courses",
    accent: {
      border: "border-purple-500/20",
      bg: "bg-purple-500/5",
      text: "text-purple-400",
      glow: "from-purple-600/10 via-transparent to-transparent",
      btnBg: "bg-purple-600",
      btnHover: "hover:bg-purple-700",
    },
  },
  {
    title: "Grow Your Career",
    body: (
      <>
        Walk away with a <strong className="text-fuchsia-300">portfolio of real work</strong>, a{" "}
        <strong className="text-fuchsia-300">professional resume</strong> built with our Resume Builder, and certificates that prove your skills. You're not just a learner — you're job-ready.
      </>
    ),
    highlights: ["Portfolio Ready", "Resume Builder", "Certificates", "Job Ready"],
    cta: "Start Your Journey",
    accent: {
      border: "border-fuchsia-500/20",
      bg: "bg-fuchsia-500/5",
      text: "text-fuchsia-400",
      glow: "from-fuchsia-600/10 via-transparent to-transparent",
      btnBg: "bg-fuchsia-600",
      btnHover: "hover:bg-fuchsia-700",
    },
  },
];

function ContentCard({
  block,
  onCta,
}: {
  block: ContentBlock;
  onCta: () => void;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border ${block.accent.border} ${block.accent.bg} p-6 sm:p-8 backdrop-blur-sm transition-all`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${block.accent.glow} opacity-60 pointer-events-none`} />
      <div className="relative">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{block.title}</h3>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5">{block.body}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {block.highlights.map((h) => (
            <span key={h} className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${block.accent.border} ${block.accent.bg} ${block.accent.text}`}>
              <CheckCircle2 className="h-3 w-3" />
              {h}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={onCta}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition-all ${block.accent.btnBg} ${block.accent.btnHover}`}
        >
          {block.cta}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function AcademyMilestoneStepper() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const isLg = useBreakpoint("lg");
  const block = contentBlocks[selectedIndex];

  const handleCta = () => {
    navigate("/courses");
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8 px-2 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="lg:w-80 shrink-0">
          <MilestoneStepper
            milestones={milestones}
            currentMilestone={selectedIndex}
            variant="detailed"
            onMilestoneClick={setSelectedIndex}
            renderBelowSelectedStep={!isLg ? (i) => <ContentCard block={contentBlocks[i]} onCta={handleCta} /> : undefined}
          />
        </div>

        {isLg && (
          <div className="flex-1 min-w-0">
            <ContentCard block={block} onCta={handleCta} />
          </div>
        )}
      </div>
    </div>
  );
}
