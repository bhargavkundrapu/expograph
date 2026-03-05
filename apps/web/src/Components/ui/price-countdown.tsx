"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

/** Get end of current day in local time (midnight tonight). */
export function getEndOfToday(): Date {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return end;
}

/** Get a date N hours from now (e.g. for demo: 24h from first visit). */
export function getHoursFromNow(hours: number): Date {
  const d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  return d;
}

const OFFER_ENDS_AT_KEY = "course_offer_ends_at";

/** 24h from first visit: same end time for the session (persisted in sessionStorage). */
export function getOfferEndsAt24h(): Date {
  if (typeof sessionStorage === "undefined") {
    return getHoursFromNow(24);
  }
  const stored = sessionStorage.getItem(OFFER_ENDS_AT_KEY);
  const now = Date.now();
  if (stored) {
    const ts = Number(stored);
    if (!Number.isNaN(ts) && ts > now) return new Date(ts);
  }
  const end = getHoursFromNow(24);
  sessionStorage.setItem(OFFER_ENDS_AT_KEY, String(end.getTime()));
  return end;
}

export type UrgencyLevel = "calm" | "soon" | "urgent";

export interface PriceCountdownProps {
  /** When the "at this price" offer ends. */
  endsAt: Date;
  /** Optional class for the wrapper. */
  className?: string;
  /** Prefix text, e.g. "Offer ends: " (default: none, we show "X hours left at this price"). */
  prefix?: string;
}

function getRemainingMs(endsAt: Date): number {
  return Math.max(0, endsAt.getTime() - Date.now());
}

function formatRemaining(ms: number): { text: string; level: UrgencyLevel } {
  if (ms <= 0) {
    return { text: "Offer ended", level: "urgent" };
  }
  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const h = totalHours % 24;
  const m = totalMinutes % 60;
  const s = totalSeconds % 60;

  if (days >= 1) {
    return {
      text: `${days} day${days !== 1 ? "s" : ""} ${h}h ${m}m ${s}s left at this price`,
      level: "calm",
    };
  }
  if (totalHours >= 1) {
    return {
      text: `${totalHours} hour${totalHours !== 1 ? "s" : ""} ${m}m ${s}s left at this price`,
      level: totalHours < 24 ? "soon" : "calm",
    };
  }
  if (totalMinutes >= 1) {
    return {
      text: `${totalMinutes} minute${totalMinutes !== 1 ? "s" : ""} ${s}s left at this price`,
      level: "urgent",
    };
  }
  return {
    text: `${s} second${s !== 1 ? "s" : ""} left at this price`,
    level: "urgent",
  };
}

const urgencyClasses: Record<UrgencyLevel, string> = {
  calm: "text-red-400/95",
  soon: "text-red-500/95",
  urgent: "text-red-500",
};

/**
 * Live countdown text: "X hours left at this price" with color by urgency.
 * - Calm (green): > 24h
 * - Soon (amber): 1h–24h
 * - Urgent (red): < 1h
 */
export function PriceCountdown({ endsAt, className, prefix = "" }: PriceCountdownProps) {
  const [remainingMs, setRemainingMs] = useState(() => getRemainingMs(endsAt));

  useEffect(() => {
    const update = () => setRemainingMs(getRemainingMs(endsAt));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const { text, level } = formatRemaining(remainingMs);

  if (remainingMs <= 0) {
    return (
      <p className={cn("text-sm font-medium", urgencyClasses.urgent, className)} aria-live="polite">
        {prefix}Offer ended
      </p>
    );
  }

  return (
    <p
      className={cn("text-sm font-medium tabular-nums", urgencyClasses[level], className)}
      aria-live="polite"
      aria-atomic="true"
    >
      {prefix}{text}
    </p>
  );
}
