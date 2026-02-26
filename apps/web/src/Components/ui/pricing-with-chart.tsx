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

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Heading */}
      <div className="mx-auto mb-12 sm:mb-14 md:mb-16 max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white drop-shadow-sm">
          Pricing that Scales with You
        </h1>
        <p className="text-white/70 mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
          Choose the right plan to unlock powerful tools and insights.
          Transparent pricing built for modern teams.
        </p>
      </div>

      {/* Packs - all highlighted as Recommended */}
      {packs.length > 0 && (
        <div className="mb-14 sm:mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-5 sm:mb-6">
            Course Packs
          </h2>
          <div className="grid gap-5 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {packs.map((pack) => (
              <Card
                key={pack.id}
                className={`
                  relative overflow-hidden aspect-[4/3] min-h-[260px] sm:min-h-[280px] flex flex-col
                  border border-white/10 bg-white/[0.03] backdrop-blur-sm
                  shadow-[0_0_0_1px_rgba(124,58,237,0.2),0_20px_50px_-12px_rgba(0,0,0,0.5)]
                  hover:border-purple-500/40 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.35),0_25px_60px_-12px_rgba(0,0,0,0.6)]
                  transition-all duration-300 ease-out rounded-2xl
                `}
              >
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                  <span className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-purple-500/25">
                    Recommended
                  </span>
                </div>
                <CardHeader className="pb-3 pt-6 sm:pt-7 px-6 sm:px-7">
                  <CardTitle className="text-lg sm:text-xl pr-24 font-bold text-white">
                    {pack.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-white/65 line-clamp-2 leading-relaxed">
                    {pack.description || "Access all included courses"}
                  </CardDescription>
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    {formatPrice(pack.price_in_paise)}
                  </span>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 min-h-0 px-6 sm:px-7 pb-6 sm:pb-7 pt-0">
                  <div className="flex-1 min-w-0 space-y-4 flex flex-col">
                    {pack.courses?.length ? (
                      <ul className="text-white/70 space-y-2 text-sm">
                        {pack.courses.slice(0, 4).map((c, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <CheckCircleIcon className="h-4 w-4 text-purple-400 shrink-0" />
                            <span className="font-semibold text-white">{c.title}</span>
                          </li>
                        ))}
                        {pack.courses.length > 4 && (
                          <li className="text-white/50 text-xs pl-6">
                            +{pack.courses.length - 4} more courses
                          </li>
                        )}
                      </ul>
                    ) : (
                      <ul className="text-white/70 space-y-2 text-sm">
                        {["Unlimited access", "Priority support", "Lifetime access"].map((f, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <CheckCircleIcon className="h-4 w-4 text-purple-400 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Button
                      onClick={() =>
                        handleGetCourse({
                          type: "pack",
                          id: pack.id,
                          title: pack.title,
                        })
                      }
                      disabled={(pack.price_in_paise ?? 0) < 100}
                      className="w-full h-11 sm:h-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 border-0 shadow-lg shadow-purple-500/20 rounded-xl transition-all duration-200"
                    >
                      Get Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Individual Courses - highlighted cards, normal Get Course button */}
      {courses.length > 0 && (
        <div id="courses" className="mt-14 sm:mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-5 sm:mb-6">
            Individual Courses
          </h2>
          <div className="grid gap-5 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {courses.map((c, i) => {
              const displayTitle = courseDisplayNames[i] ?? c.title;
              const canBuy = (c.price_in_paise ?? 0) >= 100;
              return (
                <Card
                  key={c.id}
                  className={`
                    relative overflow-hidden aspect-[4/3] min-h-[260px] sm:min-h-[280px] flex flex-col
                    border border-white/10 bg-white/[0.02] backdrop-blur-sm
                    shadow-[0_0_0_1px_rgba(124,58,237,0.12),0_20px_50px_-12px_rgba(0,0,0,0.5)]
                    hover:border-purple-500/30 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.25),0_25px_60px_-12px_rgba(0,0,0,0.6)]
                    transition-all duration-300 ease-out rounded-2xl
                  `}
                >
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                    <span className="rounded-full bg-purple-600/90 px-3 py-1.5 text-xs font-semibold text-white">
                      Individual Plan
                    </span>
                  </div>
                  <CardHeader className="pb-3 pt-6 sm:pt-7 px-6 sm:px-7">
                    <CardTitle className="text-lg sm:text-xl pr-24 font-bold text-white">
                      {displayTitle}
                    </CardTitle>
                    <CardDescription className="text-sm text-white/65 line-clamp-2 leading-relaxed">
                      {c.description || "Self-paced learning"}
                    </CardDescription>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(c.price_in_paise)}
                    </span>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0 flex flex-col flex-1 min-h-0 px-6 sm:px-7 pb-6 sm:pb-7">
                    <div className="flex-1 min-w-0 flex flex-col">
                      <ul className="text-white/70 space-y-2 text-sm mb-4">
                        {["Self-paced learning", "Certificate on completion", "Lifetime access"].map(
                          (f, idx) => (
                            <li key={idx} className="flex items-center gap-2.5">
                              <CheckCircleIcon className="h-4 w-4 text-purple-400 shrink-0" />
                              {f}
                            </li>
                          )
                        )}
                      </ul>
                      <Button
                        onClick={() =>
                          handleGetCourse({
                            type: "course",
                            id: c.id,
                            title: displayTitle,
                          })
                        }
                        disabled={!canBuy}
                        variant="outline"
                        className="w-full h-11 sm:h-12 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 rounded-xl font-medium transition-all duration-200"
                      >
                        Get Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

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
