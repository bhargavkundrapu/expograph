"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, Rocket, Trophy } from "lucide-react";
import { MilestoneStepper, MilestoneData } from "./milestone-stepper";
import { useBreakpoint } from "../../hooks/useMediaQuery";

const milestones: MilestoneData[] = [
  {
    id: 1,
    title: "Explore",
    description: "Browse courses and find your path",
    date: "Step 1",
    icon: <BookOpen className="size-4" />,
  },
  {
    id: 2,
    title: "Enroll",
    description: "Join the class and get access",
    date: "Step 2",
    icon: <GraduationCap className="size-4" />,
  },
  {
    id: 3,
    title: "Learn",
    description: "Complete lessons and practice",
    date: "Step 3",
    icon: <Rocket className="size-4" />,
  },
  {
    id: 4,
    title: "Succeed",
    description: "Earn certificates and grow your career",
    icon: <Trophy className="size-4" />,
  },
];

const contentBlocks = [
  {
    title: "Explore",
    body: "Discover courses across tech, design, and business. Filter by skill level, duration, and topic to find the perfect fit for your goals.",
    cta: "Browse courses",
  },
  {
    title: "Enroll",
    body: "Join the class with one click. Get instant access to all lessons, resources, and the community. Start learning at your own pace.",
    cta: "Get started",
  },
  {
    title: "Learn",
    body: "Work through video lessons, hands-on exercises, and quizzes. Track your progress and revisit any lesson whenever you need.",
    cta: "View my courses",
  },
  {
    title: "Succeed",
    body: "Earn certificates to showcase your skills. Apply what you learned in real projects and level up your career.",
    cta: "View certificates",
  },
];

function ContentCard({
  block,
  onCta,
}: {
  block: (typeof contentBlocks)[number];
  onCta: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm transition-all">
      <h3 className="text-xl font-semibold text-white mb-3">{block.title}</h3>
      <p className="text-white/80 text-base leading-relaxed mb-6">{block.body}</p>
      <button
        type="button"
        onClick={onCta}
        className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        {block.cta}
      </button>
    </div>
  );
}

export function AcademyMilestoneStepper() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const isLg = useBreakpoint("lg");
  const block = contentBlocks[selectedIndex];

  const handleCta = () => {
    if (selectedIndex === 0 || selectedIndex === 1) {
      navigate("/lms/student/courses");
    } else if (selectedIndex === 2) {
      navigate("/lms/student/courses");
    } else {
      navigate("/lms/student/certificates");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Stepper */}
        <div className="lg:w-72 shrink-0">
          <MilestoneStepper
            milestones={milestones}
            currentMilestone={selectedIndex}
            variant="detailed"
            onMilestoneClick={setSelectedIndex}
            renderBelowSelectedStep={!isLg ? (i) => <ContentCard block={contentBlocks[i]} onCta={handleCta} /> : undefined}
          />
        </div>

        {/* Right: Related content block (lg and up only) */}
        {isLg && (
          <div className="flex-1 min-w-0">
            <ContentCard block={block} onCta={handleCta} />
          </div>
        )}
      </div>
    </div>
  );
}
