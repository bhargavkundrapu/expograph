"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/utils";

export interface AccordionIndexedItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionIndexedProps {
  items?: AccordionIndexedItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  className?: string;
}

const defaultItems: AccordionIndexedItem[] = [
  {
    id: "strategy",
    title: "Strategy",
    content:
      "Every product starts with a question worth answering. We map user needs, business goals, and technical constraints into a focused direction before a single pixel is placed.",
  },
  {
    id: "design",
    title: "Design",
    content:
      "Interface decisions shaped by real usage patterns. Typography, spacing, and color are tuned until the experience feels inevitable rather than designed.",
  },
  {
    id: "engineering",
    title: "Engineering",
    content:
      "Components built for composition, not configuration. Server-first rendering, edge delivery, and zero-layout-shift interactions ship as defaults.",
  },
  {
    id: "motion",
    title: "Motion",
    content:
      "Animation as communication. Spring physics for direct manipulation, opacity curves for state transitions, and layout animations that preserve spatial context.",
  },
  {
    id: "systems",
    title: "Systems",
    content:
      "Tokens, primitives, and patterns that scale across surfaces. A single source of truth that keeps twenty screens consistent without slowing down any of them.",
  },
  {
    id: "delivery",
    title: "Delivery",
    content:
      "Incremental rollouts behind feature flags, performance budgets enforced in CI, and lighthouse scores that never regress. Production is the only environment that matters.",
  },
];

export default function AccordionIndexed({
  items = defaultItems,
  defaultValue = "engineering",
  value,
  onValueChange,
  collapsible = true,
  className,
}: AccordionIndexedProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible={collapsible}
      defaultValue={value ? undefined : defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      {items.map((item, index) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="border-b border-white/10"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                "group flex flex-1 items-center gap-4 py-5 text-left text-lg md:text-xl font-medium transition-all text-white",
                "hover:opacity-80 data-[state=open]:opacity-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              <span className="text-lg md:text-xl text-white/60 tabular-nums transition-opacity duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]:text-white/90">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.title}</span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className="overflow-hidden text-base md:text-lg text-white/80 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
          >
            <div className="pb-4 pt-0">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
