"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface MilestoneData {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
}

type MilestoneState = "completed" | "current" | "upcoming";

interface MilestoneStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  milestones: MilestoneData[];
  currentMilestone?: number;
  variant?: "default" | "compact" | "detailed";
  lineStyle?: "solid" | "dashed";
  onMilestoneClick?: (index: number) => void;
  /** Renders content directly below the selected step (e.g. for mobile layout) */
  renderBelowSelectedStep?: (index: number) => React.ReactNode;
}

function MilestoneStepper({
  milestones,
  currentMilestone = 0,
  variant = "default",
  lineStyle = "solid",
  onMilestoneClick,
  renderBelowSelectedStep,
  className,
  ...props
}: MilestoneStepperProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {milestones.map((milestone, index) => {
        const state: MilestoneState =
          index < currentMilestone
            ? "completed"
            : index === currentMilestone
              ? "current"
              : "upcoming";
        const isLast = index === milestones.length - 1;
        const showCompletedTick = state === "completed" || (state === "current" && isLast);

        return (
          <div key={milestone.id} className="flex flex-col gap-4">
          <div
            className={cn(
              "flex gap-4 overflow-hidden rounded-[12px] border border-transparent transition-colors",
              onMilestoneClick && "cursor-pointer select-none hover:bg-white/5 hover:border-white/10"
            )}
            tabIndex={onMilestoneClick ? 0 : undefined}
            onClick={() => onMilestoneClick?.(index)}
            onKeyDown={(e) =>
              onMilestoneClick && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onMilestoneClick(index))
            }
            {...(onMilestoneClick && { "aria-label": `Select ${milestone.title}` })}
          >
            {/* Indicator column */}
            <div className="flex flex-col items-center py-2 pl-1">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  showCompletedTick &&
                    "border-primary bg-primary text-primary-foreground",
                  state === "current" &&
                    !isLast &&
                    "border-primary bg-background text-primary",
                  state === "upcoming" &&
                    "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {showCompletedTick ? (
                  <Check className="size-4" strokeWidth={2.5} />
                ) : milestone.icon ? (
                  milestone.icon
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mt-1 w-0.5 flex-1 min-h-[32px]",
                    lineStyle === "dashed" ? "border-l-2 border-dashed border-muted-foreground/30" : "",
                    lineStyle === "solid" && (index < currentMilestone ? "bg-primary" : "bg-border")
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 py-4 pr-4">
              <p
                className={cn(
                  "font-medium",
                  state === "completed" && "text-muted-foreground",
                  state === "current" && "text-foreground",
                  state === "upcoming" && "text-muted-foreground"
                )}
              >
                {milestone.title}
              </p>
              {milestone.description && variant !== "compact" && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {milestone.description}
                </p>
              )}
              {milestone.date && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {milestone.date}
                </p>
              )}
            </div>
          </div>
          {renderBelowSelectedStep && index === currentMilestone && renderBelowSelectedStep(index)}
          </div>
        );
      })}
    </div>
  );
}

export { MilestoneStepper };
