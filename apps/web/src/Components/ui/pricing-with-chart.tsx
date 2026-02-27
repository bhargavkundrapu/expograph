"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { CheckCircleIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { apiFetch } from "../../services/api";
import { BuyNowModal } from "../payments/BuyNowModal";
import { CoursesPageSkeleton } from "../common/SkeletonLoaders";

function formatPrice(paise: number | null | undefined) {
  if (paise == null || paise === undefined) return "—";
  const rupees = Math.round(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

const courseDisplayNames = ["Vibe Coding", "Prompt Engineering", "AI Agents"];

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

  const courseColors = [
    {
      border: "border-cyan-500/25",
      borderHover: "hover:border-cyan-500/50",
      bg: "from-cyan-950/40 via-[#0a1218] to-[#0a0a0a]",
      glow: "hover:shadow-[0_0_40px_-8px_rgba(6,182,212,0.2)]",
      badge: "from-cyan-600 to-cyan-700",
      badgeShadow: "shadow-cyan-500/25",
      check: "text-cyan-400",
      price: "from-cyan-400 to-cyan-500",
      btn: "from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 shadow-cyan-500/20",
    },
    {
      border: "border-amber-500/25",
      borderHover: "hover:border-amber-500/50",
      bg: "from-amber-950/40 via-[#14110a] to-[#0a0a0a]",
      glow: "hover:shadow-[0_0_40px_-8px_rgba(245,158,11,0.2)]",
      badge: "from-amber-600 to-amber-700",
      badgeShadow: "shadow-amber-500/25",
      check: "text-amber-400",
      price: "from-amber-400 to-amber-500",
      btn: "from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-amber-500/20",
    },
    {
      border: "border-emerald-500/25",
      borderHover: "hover:border-emerald-500/50",
      bg: "from-emerald-950/40 via-[#0a140e] to-[#0a0a0a]",
      glow: "hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.2)]",
      badge: "from-emerald-600 to-emerald-700",
      badgeShadow: "shadow-emerald-500/25",
      check: "text-emerald-400",
      price: "from-emerald-400 to-emerald-500",
      btn: "from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-emerald-500/20",
    },
    {
      border: "border-rose-500/25",
      borderHover: "hover:border-rose-500/50",
      bg: "from-rose-950/40 via-[#140a0e] to-[#0a0a0a]",
      glow: "hover:shadow-[0_0_40px_-8px_rgba(244,63,94,0.2)]",
      badge: "from-rose-600 to-rose-700",
      badgeShadow: "shadow-rose-500/25",
      check: "text-rose-400",
      price: "from-rose-400 to-rose-500",
      btn: "from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-rose-500/20",
    },
  ];

  const firstCourseSpan = packs.length === 1 ? "md:col-span-8" :
    packs.length === 2 ? "md:col-span-4" :
    packs.length >= 3 ? "md:col-span-3" : "md:col-span-8";

  const courseColSpans = [
    firstCourseSpan,
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-7",
    "md:col-span-5",
  ];

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Heading */}
      <div className="mx-auto mb-10 sm:mb-12 md:mb-14 max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white drop-shadow-sm">
          Pricing that Scales with You
        </h1>
        <p className="text-white/70 mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
          Choose the right plan to unlock powerful tools and insights.
          Transparent pricing built for modern teams.
        </p>
      </div>

      {/* ── All cards in one grid: packs first, then courses ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        {packs.map((pack, idx) => {
          const packSpans =
            packs.length === 1 ? ["md:col-span-4"] :
            packs.length === 2 ? ["md:col-span-4", "md:col-span-4"] :
            packs.length >= 3 ? ["md:col-span-3", "md:col-span-3", "md:col-span-3"] :
            ["md:col-span-4"];
          return (
            <div
              key={pack.id}
              className={`col-span-1 ${packSpans[idx] || "md:col-span-4"} group`}
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-950/40 via-[#0e0e18] to-[#0a0a0a] p-5 sm:p-6 flex flex-col transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_-8px_rgba(124,58,237,0.2)]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <span className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-purple-500/25 mb-3">
                      Recommended
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight truncate">
                      {pack.title}
                    </h3>
                    <p className="text-sm text-white/55 line-clamp-2 mt-1 leading-relaxed">
                      {pack.description || "Access all included courses"}
                    </p>
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap shrink-0">
                    {formatPrice(pack.price_in_paise)}
                  </span>
                </div>

                {pack.courses?.length ? (
                  <ul className="text-white/70 space-y-1.5 text-sm mb-5 flex-1">
                    {pack.courses.slice(0, 4).map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                        <span className="font-medium text-white/90 truncate">{c.title}</span>
                      </li>
                    ))}
                    {pack.courses.length > 4 && (
                      <li className="text-white/40 text-xs pl-5.5">+{pack.courses.length - 4} more</li>
                    )}
                  </ul>
                ) : (
                  <ul className="text-white/70 space-y-1.5 text-sm mb-5 flex-1">
                    {["Unlimited access", "Priority support", "Lifetime access"].map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <Button
                  onClick={() => handleGetCourse({ type: "pack", id: pack.id, title: pack.title })}
                  disabled={(pack.price_in_paise ?? 0) < 100}
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 border-0 shadow-lg shadow-purple-500/20 rounded-xl transition-all duration-200"
                >
                  Get Pack
                </Button>
              </div>
            </div>
          );
        })}

        {/* ── Courses: bento varied widths, each with unique color ── */}
        {courses.map((c, i) => {
            const displayTitle = courseDisplayNames[i] ?? c.title;
            const canBuy = (c.price_in_paise ?? 0) >= 100;
            const clr = courseColors[i % courseColors.length];
            const span = courseColSpans[i % courseColSpans.length];

            return (
              <div
                key={c.id}
                className={`col-span-1 ${span} group`}
              >
                <div className={`relative h-full overflow-hidden rounded-2xl border ${clr.border} bg-gradient-to-br ${clr.bg} p-5 sm:p-6 flex flex-col transition-all duration-300 ${clr.borderHover} ${clr.glow}`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <span className={`inline-block rounded-full bg-gradient-to-r ${clr.badge} px-3 py-1 text-[11px] font-semibold text-white shadow-lg ${clr.badgeShadow} mb-3`}>
                        Individual
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                        {displayTitle}
                      </h3>
                      <p className="text-sm text-white/50 line-clamp-2 mt-1 leading-relaxed">
                        {c.description || "Self-paced learning"}
                      </p>
                    </div>
                    <span className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${clr.price} bg-clip-text text-transparent whitespace-nowrap shrink-0`}>
                      {formatPrice(c.price_in_paise)}
                    </span>
                  </div>

                  <ul className="text-white/60 space-y-1.5 text-sm mb-5 flex-1">
                    {["Self-paced learning", "Certificate on completion", "Lifetime access"].map(
                      (f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircleIcon className={`h-3.5 w-3.5 ${clr.check} shrink-0`} />
                          {f}
                        </li>
                      )
                    )}
                  </ul>

                  <Button
                    onClick={() => handleGetCourse({ type: "course", id: c.id, title: displayTitle })}
                    disabled={!canBuy}
                    className={`w-full h-10 sm:h-11 bg-gradient-to-r ${clr.btn} text-white font-semibold border-0 shadow-lg rounded-xl transition-all duration-200`}
                  >
                    Get Course
                  </Button>
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
