"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Badge } from "./badge";
import { CheckIcon, SparklesIcon, BookOpen } from "lucide-react";
import { cn } from "../../lib/utils";
import { getToolIcon, getToolIconColor } from "../../lib/toolIcons";
import { apiFetch } from "../../services/api";
import { BuyNowModal } from "../payments/BuyNowModal";
import { CoursesPageSkeleton } from "../common/SkeletonLoaders";
import { COURSE_EXPLORE_DATA } from "../../data/courseExploreData";

function formatPrice(paise: number | null | undefined) {
  if (paise == null || paise === undefined) return "—";
  const rupees = Math.round(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

const courseDisplayNames: Record<string, string> = {
  "vibe-coding": "Vibe Coding",
  "prompt-engineering": "Prompt Engineering",
  "prompt-to-profit": "Prompt to Profit",
  "ai-automations": "AI Automations",
};
const BONUS_SLUGS = ["ai-automations"];
const COURSE_ORDER = ["vibe-coding", "prompt-engineering", "prompt-to-profit", "ai-automations"];

function matchCourse(co, orderSlug) {
  const s = (co.slug || "").toLowerCase().replace(/_/g, "-");
  const t = (co.title || "").toLowerCase().replace(/_/g, "-");
  const combined = `${s} ${t}`;
  const parts = orderSlug.split("-");
  return parts.every((p) => combined.includes(p));
}

function FilledCheck() {
  return (
    <div className="rounded-full bg-purple-500/20 p-0.5 text-purple-400">
      <CheckIcon className="size-3" strokeWidth={3} />
    </div>
  );
}

export function PricingWithChart() {
  const [courses, setCourses] = useState<
    { id: string; title: string; slug: string; price_in_paise?: number; description?: string }[]
  >([]);
  const [packs, setPacks] = useState<
    { id: string; title: string; slug: string; price_in_paise?: number; description?: string; courses?: { title?: string }[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: "course" | "pack";
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, packsRes] = await Promise.allSettled([
          apiFetch("/api/v1/courses").catch(() => ({ data: [] })),
          apiFetch("/api/v1/packs").catch(() => ({ data: [] })),
        ]);
        const courseData = coursesRes.status === "fulfilled" ? (coursesRes.value as { data?: unknown[] })?.data : [];
        const packData = packsRes.status === "fulfilled" ? (packsRes.value as { data?: unknown[] })?.data : [];
        setCourses(Array.isArray(courseData) ? courseData : []);
        setPacks(Array.isArray(packData) ? packData : []);
      } catch {
        setCourses([]);
        setPacks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleGetCourse = (item: {
    type: "course" | "pack";
    id: string;
    title: string;
  }) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  if (loading) {
    return <CoursesPageSkeleton />;
  }


  const allPack = packs.find((p) => (p.slug || "").includes("all-pack") || (p.slug || "").includes("pack")) || packs[0];

  // Bento grid: row1 [All Pack 5][Vibe 3], row2 [PE 4][PtP 4], row3 [AA 8]
  const vibeCourse = courses.find((co) => (co.slug || "").toLowerCase().replace(/_/g, "-").includes("vibe-coding") || matchCourse(co, "vibe-coding"));
  const peCourse = courses.find((co) => (co.slug || "").toLowerCase().replace(/_/g, "-").includes("prompt-engineering") || matchCourse(co, "prompt-engineering"));
  const ptpCourse = courses.find((co) => (co.slug || "").toLowerCase().replace(/_/g, "-").includes("prompt-to-profit") || matchCourse(co, "prompt-to-profit"));
  const aaCourse = courses.find((co) => (co.slug || "").toLowerCase().replace(/_/g, "-").includes("ai-automations") || matchCourse(co, "ai-automations"));

  function CourseBentoCard({
    orderSlug,
    course,
    displayTitle,
    isBonus,
    colSpan,
  }: {
    orderSlug: string;
    course: { id: string; title: string; slug: string; price_in_paise?: number; description?: string } | undefined;
    displayTitle: string;
    isBonus: boolean;
    colSpan: string;
  }) {
    const canBuy = !isBonus && !!course && (Number(course.price_in_paise) ?? 0) >= 100;
    const features = isBonus
      ? ["Free when you buy All Pack", "12 modules • 62 lessons", "MCA-recognised certificate"]
      : ["Self-paced learning", "MCA-recognised certificate on completion"];
    return (
      <div
        className={cn(
          "relative h-full flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]",
          colSpan
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <Badge variant={isBonus ? "outline" : "secondary"} className={isBonus ? "border-amber-500/30 text-amber-400 bg-amber-500/10" : "border-purple-500/30 text-purple-400 bg-purple-500/10"}>
            {isBonus ? "BONUS" : "INDIVIDUAL"}
          </Badge>
          <div className="ml-auto">
            <Link to={`/courses/explore/${orderSlug}`} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/20 px-3 text-sm text-white/90 hover:bg-white/10 transition-colors">
              <BookOpen className="h-4 w-4" />
              Explore
            </Link>
          </div>
        </div>
        <div className="flex items-end gap-2 mb-3">
          <span className="font-mono text-3xl font-semibold tracking-tight text-white">
            {isBonus ? "Free" : formatPrice(course?.price_in_paise)}
          </span>
          {!isBonus && course?.price_in_paise != null && <span className="text-white/50 text-sm">one-time</span>}
        </div>
        <h3 className="text-base font-bold text-white leading-tight mb-2">{displayTitle}</h3>
        <p className="text-sm text-white/55 line-clamp-2 mb-4">{course?.description || "Self-paced learning"}</p>
        <ul className="text-white/60 space-y-2 text-sm mb-4 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <FilledCheck />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        {COURSE_EXPLORE_DATA[orderSlug]?.tools?.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2">You&apos;ll work with</p>
            <div className="flex flex-wrap gap-2">
              {(COURSE_EXPLORE_DATA[orderSlug].tools || []).slice(0, 6).map((toolName, i) => {
                const Icon = getToolIcon(toolName);
                const iconColor = getToolIconColor(toolName);
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-white/85"
                  >
                    <Icon className={cn("size-3.5 shrink-0", iconColor)} aria-hidden />
                    <span>{toolName}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
        {isBonus ? (
          <p className="text-center text-xs text-amber-400/90 py-1">Buy All Pack to get this course free</p>
        ) : (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (course) handleGetCourse({ type: "course", id: course.id, title: displayTitle });
            }}
            disabled={!canBuy}
            className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Course
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Pricing that Scales with You
        </h1>
        <p className="mt-2 text-sm text-white/60">
          All starting at just <span className="text-emerald-400 font-semibold">₹99</span> — pick individual courses or go all-in with the All Pack for the best value.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-8">
        {/* All Pack — bento hero card (lg:col-span-5) */}
        <div
          key="all-pack"
          className={cn(
            "relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] flex flex-col",
            "lg:col-span-5"
          )}
        >
          <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="from-foreground/5 to-foreground/2 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 size-full mix-blend-overlay",
                  "bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px)]",
                  "bg-[size:24px]"
                )}
              />
            </div>
          </div>
          <div className="relative flex items-center gap-3 p-4">
            <Badge className="border-amber-500/30 bg-amber-500/20 text-amber-400">★ RECOMMENDED</Badge>
            <Badge variant="outline" className="hidden lg:flex border-purple-500/30 text-purple-300">
              <SparklesIcon className="me-1 size-3" /> Most Recommended
            </Badge>
            <div className="ml-auto">
              <Link
                to="/courses/explore/all-pack"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/20 px-3 text-sm text-white/90 hover:bg-white/10 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Explore
              </Link>
            </div>
          </div>
          <div className="relative flex flex-col flex-1 p-4 lg:flex-row lg:gap-6">
            <div className="pb-4 lg:w-[28%]">
              <h3 className="text-base font-bold text-white leading-tight mb-2">All Pack</h3>
              <span className="font-mono text-4xl font-semibold tracking-tight text-purple-400 block">
                {formatPrice(allPack?.price_in_paise)}
              </span>
              <span className="text-white/50 text-sm">one-time</span>
            </div>
            <ul className="text-white/70 grid gap-2 text-sm lg:w-[72%]">
              <li className="flex items-center gap-3">
                <FilledCheck />
                <span className="font-medium text-white/90">Vibe Coding</span>
              </li>
              <li className="flex items-center gap-3">
                <FilledCheck />
                <span className="font-medium text-white/90">Prompt Engineering</span>
              </li>
              <li className="flex items-center gap-3">
                <FilledCheck />
                <span className="font-medium text-white/90">Prompt to Profit</span>
              </li>
              <li className="flex items-center gap-3 pl-6 border-t border-white/10 pt-2 mt-1">
                <FilledCheck />
                <span className="text-amber-400/95 font-medium">AI Automations (Bonus)</span>
              </li>
              <li className="flex items-center gap-3 pl-6">
                <FilledCheck />
                <span className="font-medium text-purple-300">Real Client Lab</span>
              </li>
              <li className="flex items-center gap-3 pl-6">
                <FilledCheck />
                <span className="font-medium text-white/90">Resume Builder</span>
              </li>
              <li className="flex items-center gap-3 pl-6">
                <FilledCheck />
                <span className="font-medium text-white/90">MCA-recognised certificates</span>
              </li>
            </ul>
          </div>
          <div className="relative p-4 pt-0">
            {allPack && (
              <Button
                onClick={() => handleGetCourse({ type: "pack", id: allPack.id, title: allPack.title })}
                disabled={(allPack.price_in_paise ?? 0) < 100}
                className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg border-0"
              >
                Get Pack
              </Button>
            )}
          </div>
        </div>

        {/* Vibe Coding — lg:col-span-3 */}
        <CourseBentoCard
          orderSlug="vibe-coding"
          course={vibeCourse}
          displayTitle={courseDisplayNames["vibe-coding"]}
          isBonus={false}
          colSpan="lg:col-span-3"
        />

        {/* Prompt Engineering — lg:col-span-4 */}
        <CourseBentoCard
          orderSlug="prompt-engineering"
          course={peCourse}
          displayTitle={courseDisplayNames["prompt-engineering"]}
          isBonus={false}
          colSpan="lg:col-span-4"
        />

        {/* Prompt to Profit — lg:col-span-4 */}
        <CourseBentoCard
          orderSlug="prompt-to-profit"
          course={ptpCourse}
          displayTitle={courseDisplayNames["prompt-to-profit"]}
          isBonus={false}
          colSpan="lg:col-span-4"
        />

        {/* AI Automations — lg:col-span-8 */}
        <CourseBentoCard
          orderSlug="ai-automations"
          course={aaCourse}
          displayTitle={courseDisplayNames["ai-automations"]}
          isBonus={true}
          colSpan="lg:col-span-8"
        />
      </div>

      <BuyNowModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        onSuccess={() => {
          setModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}
