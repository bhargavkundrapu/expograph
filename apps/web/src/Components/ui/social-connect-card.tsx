import * as React from "react";
import {
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialLink {
  name: string;
  href: string;
  /** Lucide icon or react-icons component (accepts className) */
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  ariaLabel?: string;
}

export interface SocialConnectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main title (e.g. "Connect With Us") */
  title?: string;
  /** Short description */
  description?: string;
  /** Social links: icon + href */
  socialLinks?: SocialLink[];
  /** "View more" link (optional) */
  viewMoreHref?: string;
  /** "View more" label */
  viewMoreLabel?: string;
}

const defaultSocialLinks: SocialLink[] = [
  { name: "Instagram", href: "#", icon: Instagram, ariaLabel: "Instagram" },
  { name: "Twitter", href: "#", icon: Twitter, ariaLabel: "Twitter" },
  { name: "LinkedIn", href: "#", icon: Linkedin, ariaLabel: "LinkedIn" },
  { name: "YouTube", href: "#", icon: Youtube, ariaLabel: "YouTube" },
];

/**
 * Social connect card: gradient card with glass overlay, title, description,
 * and social icon buttons. Tailwind-only (no styled-components).
 * Place before footer for "Follow us" / social section.
 */
const SocialConnectCard = React.forwardRef<HTMLDivElement, SocialConnectCardProps>(
  (
    {
      title = "Connect With Us",
      description = "Follow ExpoGraph Academy for updates, tips, and community.",
      socialLinks = defaultSocialLinks,
      viewMoreHref,
      viewMoreLabel = "View more",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-[290px] sm:w-[320px] h-[300px] perspective-[1000px]", className)}
        {...props}
      >
        <div
          className={cn(
            "group/card h-full rounded-[50px] transition-all duration-500 ease-in-out relative overflow-hidden",
            "bg-gradient-to-br from-cyan-400 to-emerald-400",
            "shadow-[rgba(5,71,17,0)_40px_50px_25px_-40px,rgba(5,71,17,0.2)_0_25px_25px_-5px]",
            "hover:shadow-[rgba(5,71,17,0.3)_30px_50px_25px_-40px,rgba(5,71,17,0.1)_0_25px_30px_0]"
          )}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotate3d(1, 1, 0, 30deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
          }}
        >
          {/* Glass overlay */}
          <div
            className="absolute inset-2 rounded-[55px] border-t-[1px] border-r-[1px] border-b-[1px] border-l-[1px] border-white"
            style={{
              background: "linear-gradient(0deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.82) 100%)",
              transform: "translate3d(0,0,25px)",
              borderRadius: "55px 100% 55px 55px",
            }}
          />

          {/* Logo / circles area (top-right) */}
          <div
            className="absolute right-0 top-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span
              className="absolute block aspect-square rounded-full bg-cyan-300/30 backdrop-blur-sm shadow-lg"
              style={{ width: "170px", top: "8px", right: "8px", transform: "translate3d(0,0,20px)" }}
              aria-hidden
            />
            <span
              className="absolute block aspect-square rounded-full bg-cyan-300/20 backdrop-blur-sm"
              style={{ width: "140px", top: "10px", right: "10px", transform: "translate3d(0,0,40px)" }}
              aria-hidden
            />
            <span
              className="absolute block aspect-square rounded-full bg-cyan-300/25 backdrop-blur-sm"
              style={{ width: "110px", top: "17px", right: "17px", transform: "translate3d(0,0,60px)" }}
              aria-hidden
            />
            <span
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md"
              style={{ top: "30px", right: "30px", transform: "translate3d(0,0,100px)" }}
              aria-hidden
            >
              <span className="text-xl font-black text-emerald-600" style={{ fontFamily: "var(--font-google-sans, sans-serif)" }}>E</span>
            </span>
          </div>

          {/* Content */}
          <div
            className="relative z-10 px-6 pt-[100px] pr-14"
            style={{ transform: "translate3d(0,0,26px)" }}
          >
            <span className="block text-[#00894d] font-black text-xl">{title}</span>
            <span className="mt-4 block text-[15px] leading-snug text-[rgba(0,137,78,0.76)]">
              {description}
            </span>
          </div>

          {/* Bottom: social buttons + view more */}
          <div
            className="absolute bottom-5 left-5 right-5 flex items-center justify-between"
            style={{ transform: "translate3d(0,0,26px)" }}
          >
            <div className="flex gap-2.5">
              {socialLinks.slice(0, 4).map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel ?? link.name}
                    className={cn(
                      "grid h-8 w-8 flex-shrink-0 place-content-center rounded-full bg-white text-[#00894d] shadow-[rgba(5,71,17,0.5)_0_7px_5px_-5px]",
                      "transition-all duration-200 ease-out hover:bg-black hover:text-white hover:scale-110 hover:shadow-lg"
                    )}
                  >
                    <Icon className="h-[15px] w-[15px]" />
                  </a>
                );
              })}
            </div>
            {viewMoreHref && (
              <a
                href={viewMoreHref}
                className="flex items-center gap-0.5 text-[#00c37b] font-bold text-xs transition-transform duration-200 hover:translate-y-0.5"
              >
                {viewMoreLabel}
                <ChevronDown className="h-4 w-4 stroke-[3]" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
);

SocialConnectCard.displayName = "SocialConnectCard";

export { SocialConnectCard };
