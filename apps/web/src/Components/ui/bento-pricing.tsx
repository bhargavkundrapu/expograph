"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";
import { CheckIcon, SparklesIcon } from "lucide-react";
import { apiFetch } from "../../services/api";
import { BuyNowModal } from "../payments/BuyNowModal";

type PricingCardProps = {
  titleBadge: string;
  priceLabel: string;
  originalPrice?: string;
  features: string[];
  onGetCourse?: () => void;
  canBuy?: boolean;
  className?: string;
  coursesInPack?: { title?: string; slug?: string }[];
  displayTitle?: string;
};

function FilledCheck() {
  return (
    <div className="bg-primary text-primary-foreground rounded-full p-0.5">
      <CheckIcon className="size-3" strokeWidth={3} />
    </div>
  );
}

function PricingCard({
  titleBadge,
  priceLabel,
  originalPrice,
  features,
  onGetCourse,
  canBuy = true,
  className,
  coursesInPack,
  displayTitle,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "bg-background border-foreground/10 relative overflow-hidden rounded-md border",
        "supports-[backdrop-filter]:bg-background/10 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-3 p-4">
        <Badge variant="secondary">{titleBadge}</Badge>
        <div className="ml-auto">
          <Button
            onClick={onGetCourse}
            disabled={!canBuy}
            className={canBuy ? "bg-blue-600 hover:bg-blue-700 text-white border-0" : "opacity-60 cursor-not-allowed"}
          >
            Get Course
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-4 py-2">
        {displayTitle && (
          <h3 className="text-base font-semibold text-foreground">{displayTitle}</h3>
        )}
        {originalPrice && (
          <span className="text-muted-foreground text-sm line-through">
            {originalPrice}
          </span>
        )}
        <span className="font-mono text-5xl font-semibold tracking-tight">
          {priceLabel}
        </span>
      </div>

      <ul className="text-muted-foreground grid gap-4 p-4 text-sm">
        {coursesInPack?.length ? (
          <>
            <li className="flex items-center gap-3">
              <FilledCheck />
              <span>Includes {coursesInPack.length} course{coursesInPack.length !== 1 ? "s" : ""}</span>
            </li>
            {coursesInPack.slice(0, 3).map((c, i) => (
              <li key={i} className="flex items-center gap-3 pl-6">
                <FilledCheck />
                <span>{c.title}</span>
              </li>
            ))}
            {coursesInPack.length > 3 && (
              <li className="flex items-center gap-3 pl-6 text-muted-foreground/80">
                +{coursesInPack.length - 3} more
              </li>
            )}
          </>
        ) : (
          features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <FilledCheck />
              <span>{f}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function formatPrice(paise: number | null | undefined) {
  if (paise == null || paise === undefined) return "—";
  const rupees = Math.round(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

const DEFAULT_FEATURES = [
  "Self-paced learning",
  "Certificate on completion",
  "Lifetime access",
];

export function BentoPricing() {
  const [courses, setCourses] = useState<{ id: string; title: string; slug: string; price_in_paise?: number; description?: string }[]>([]);
  const [packs, setPacks] = useState<{ id: string; title: string; slug: string; price_in_paise?: number; description?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ type: "course" | "pack"; id: string; title: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, packsRes] = await Promise.allSettled([
          apiFetch("/api/v1/courses").catch(() => ({ data: [] })),
          apiFetch("/api/v1/packs").catch(() => ({ data: [] })),
        ]);
        const courseData = coursesRes.status === "fulfilled" ? coursesRes.value?.data : [];
        const packData = packsRes.status === "fulfilled" ? packsRes.value?.data : [];
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

  const courseDisplayNames = ["Vibe Coding", "Prompt Engineering", "AI Agents"];
  const featuredPack = packs.find((p) => p.slug === "all-pack" || p.slug?.includes("pack")) || packs[0];
  const otherItems = [
    ...packs.filter((p) => p.id !== featuredPack?.id).map((p) => ({ ...p, displayTitle: p.title })),
    ...courses.map((c, i) => ({ ...c, displayTitle: courseDisplayNames[i] ?? c.title })),
  ];

  const handleGetCourse = (item: { type: "course" | "pack"; id: string; title: string }) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-8">
      {featuredPack && (
        <div
          className={cn(
            "bg-background border-foreground/10 relative w-full overflow-hidden rounded-md border",
            "supports-[backdrop-filter]:bg-background/10 backdrop-blur",
            "lg:col-span-5",
          )}
        >
          <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="from-foreground/5 to-foreground/2 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 size-full mix-blend-overlay",
                  "bg-[linear-gradient(to_right,--theme(--color-foreground/.1)_1px,transparent_1px)]",
                  "bg-[size:24px]",
                )}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <Badge variant="secondary">ALL PACK</Badge>
            <Badge variant="outline" className="hidden lg:flex">
              <SparklesIcon className="me-1 size-3" /> Most Recommended
            </Badge>
            <div className="ml-auto">
              <Button
                onClick={() => handleGetCourse({ type: "pack", id: featuredPack.id, title: featuredPack.title })}
                disabled={(featuredPack.price_in_paise ?? 0) < 100}
                className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              >
                Get Course
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-4 lg:flex-row">
            <div className="pb-4 lg:w-[30%]">
              <span className="text-muted-foreground text-sm line-through">₹4,999</span>
              <span className="font-mono text-5xl font-semibold tracking-tight block">
                {formatPrice(featuredPack.price_in_paise)}
              </span>
            </div>
            <ul className="text-muted-foreground grid gap-4 text-sm lg:w-[70%]">
              {featuredPack.courses?.length ? (
                <>
                  <li className="flex items-center gap-3 font-medium text-foreground/90">
                    <FilledCheck />
                    <span>Includes {featuredPack.courses.length} course{featuredPack.courses.length !== 1 ? "s" : ""}:</span>
                  </li>
                  {featuredPack.courses.slice(0, 5).map((c: { title?: string; slug?: string }) => (
                    <li key={c.slug || c.title} className="flex items-center gap-3 pl-6">
                      <FilledCheck />
                      <span className="leading-relaxed">{c.title}</span>
                    </li>
                  ))}
                  {featuredPack.courses.length > 5 && (
                    <li className="flex items-center gap-3 pl-6 text-muted-foreground/80">
                      +{featuredPack.courses.length - 5} more
                    </li>
                  )}
                </>
              ) : (
                [
                  "Perfect for individual bloggers",
                  "freelancers and entrepreneurs",
                  "AI-Powered editing tools",
                  "Basic Analytics to track content performance",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <FilledCheck />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {loading ? (
        [1, 2, 3].map((i) => (
          <div key={i} className={cn("h-64 bg-background/10 rounded-md border border-foreground/10 animate-pulse", i === 1 && "lg:col-span-3")} />
        ))
      ) : (
        otherItems.map((item) => {
          const canBuy = (item.price_in_paise ?? 0) >= 100;
          const coursesInPack = item.type === "pack" && (item as { courses?: { title?: string; slug?: string }[] }).courses;
          return (
            <PricingCard
              key={`${item.type}-${item.id}`}
              titleBadge={item.type === "pack" ? "PACK" : "COURSE"}
              displayTitle={item.displayTitle ?? item.title}
              priceLabel={formatPrice(item.price_in_paise)}
              features={item.description ? [item.description.slice(0, 80) + (item.description.length > 80 ? "..." : ""), ...DEFAULT_FEATURES.slice(1)] : [...DEFAULT_FEATURES]}
              onGetCourse={() => handleGetCourse({ type: item.type, id: item.id, title: item.title })}
              canBuy={canBuy}
              className="lg:col-span-3"
              coursesInPack={coursesInPack}
            />
          );
        })
      )}

      {!loading && packs.length === 0 && courses.length === 0 && (
        <div className="lg:col-span-8 text-center py-12 text-muted-foreground text-sm">
          No courses or packs available yet.
        </div>
      )}

      <BuyNowModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        onSuccess={() => setModalOpen(false)}
      />
    </div>
  );
}
