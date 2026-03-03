"use client";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./button";
import { CheckCircleIcon, BookOpen } from "lucide-react";
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
const PURPLE_STYLE = {
  border: "border-purple-500/25",
  borderHover: "hover:border-purple-400/50",
  bg: "from-purple-950/40 via-[#0e0e18] to-[#0a0a0a]",
  glow: "hover:shadow-[0_0_40px_-8px_rgba(124,58,237,0.2)]",
  badge: "from-purple-600 to-purple-700",
  badgeShadow: "shadow-purple-500/25",
  check: "text-purple-400",
  price: "from-purple-400 to-purple-500",
  btn: "from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-purple-500/20",
};

export function PricingWithChart() {
  const navigate = useNavigate();
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

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Heading + marketing */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Pricing that Scales with You
        </h1>
        <p className="mt-2 text-sm text-white/60">
          All starting at just <span className="text-emerald-400 font-semibold">₹99</span> — pick individual courses or go all-in with the All Pack for the best value.
        </p>
      </div>

      {/* Order: All Pack first, then Vibe Coding, Prompt Engineering, Prompt to Profit, AI Automations — aligned with third section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* All Pack card first */}
        <div key="all-pack" className="group flex flex-col">
              <div className="relative h-full flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center rounded-md bg-gradient-to-r from-amber-500/30 to-amber-400/20 text-amber-400 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider mb-3 border border-amber-500/30 shadow-[0_0_12px_rgba(251,191,36,0.3)]">
                      ★ Recommended
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {allPack?.title || "All Pack"}
                    </h3>
                    <span className="text-xl font-bold text-purple-400 mt-1 block">
                      {formatPrice(allPack?.price_in_paise)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-white/55 line-clamp-2 mb-4">
                  {allPack?.description || "Access all included courses"}
                </p>

                <ul className="text-white/60 space-y-1.5 text-sm mb-3">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span className="font-medium text-white/90">Vibe Coding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span className="font-medium text-white/90">Prompt Engineering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    <span className="font-medium text-white/90">Prompt to Profit</span>
                  </li>
                </ul>

                <div className="mb-3 pt-3 border-t border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 mb-2">Extra Features</p>
                  <ul className="text-white/70 space-y-1.5 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span className="font-medium text-amber-400/95">AI Automations (Bonus)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                      <span className="font-semibold text-purple-300">Real Client Lab</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                      <span className="font-medium text-white/90">Resume Builder</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                      <span className="font-medium text-white/90">MCA-recognised certificates</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/courses/explore/all-pack"
                  className="inline-flex w-full h-9 mb-2 items-center justify-center gap-2 rounded-lg border border-white/20 text-white/90 hover:bg-white/10 transition-colors text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  Explore Pack
                </Link>
                {allPack && (
                  <Button
                    onClick={() => handleGetCourse({ type: "pack", id: allPack.id, title: allPack.title })}
                    disabled={(allPack.price_in_paise ?? 0) < 100}
                    className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
                  >
                    Get Pack
                  </Button>
                )}
              </div>
            </div>

        {/* Courses: Vibe Coding, Prompt Engineering, Prompt to Profit, AI Automations */}
        {COURSE_ORDER.map((orderSlug) => {
            const c = courses.find((co) => (co.slug || "").toLowerCase().replace(/_/g, "-").includes(orderSlug) || matchCourse(co, orderSlug));
            const displayTitle = courseDisplayNames[orderSlug] ?? c?.title ?? orderSlug.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
            const isBonus = BONUS_SLUGS.some((b) => orderSlug.includes(b));
            const canBuy = !isBonus && !!c && (Number(c.price_in_paise) ?? 0) >= 100;

            return (
              <div key={c?.id || orderSlug} className="group flex flex-col">
                <div className="relative h-full flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <span className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider mb-2 ${isBonus ? "bg-amber-500/20 text-amber-400" : "bg-purple-500/20 text-purple-400"}`}>
                        {isBonus ? "Bonus" : "Individual"}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {displayTitle}
                      </h3>
                      {!isBonus && (
                        <span className="text-lg font-bold text-purple-400 mt-1 block">
                          {formatPrice(c?.price_in_paise)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-white/55 line-clamp-2 mb-4">
                    {c?.description || "Self-paced learning"}
                  </p>

                  <ul className="text-white/60 space-y-1.5 text-sm mb-3 flex-1">
                    {isBonus
                      ? ["Free when you buy All Pack", "12 modules • 62 lessons", "MCA-recognised certificate"].map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                            {f}
                          </li>
                        ))
                      : ["Self-paced learning", "MCA-recognised certificate on completion"].map(
                          (f, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                              {f}
                            </li>
                          )
                        )}
                  </ul>

                  {(COURSE_EXPLORE_DATA[orderSlug]?.tools?.length > 0) && (
                    <div className="mb-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-2">You&apos;ll work with</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(COURSE_EXPLORE_DATA[orderSlug].tools || []).slice(0, 5).map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-white/80">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/courses/explore/${orderSlug}`}
                    className="inline-flex w-full h-9 mb-2 items-center justify-center gap-2 rounded-lg border border-white/20 text-white/90 hover:bg-white/10 transition-colors text-sm"
                  >
                    <BookOpen className="h-4 w-4" />
                    Explore Course
                  </Link>
                  {isBonus ? (
                    <p className="text-center text-xs text-amber-400/90 py-1">
                      Buy All Pack to get this course free
                    </p>
                  ) : (
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (c) handleGetCourse({ type: "course", id: c.id, title: displayTitle });
                      }}
                      disabled={!canBuy}
                      className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Get Course
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
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
