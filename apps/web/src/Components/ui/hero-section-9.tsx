import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import React from "react";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface ActionProps {
  text: string;
  onClick: () => void;
  variant?: ButtonProps["variant"];
  className?: string;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  actions: ActionProps[];
  stats: StatProps[];
  images: string[];
  className?: string;
  titleClassName?: string;
}

const isMobileHero = typeof window !== "undefined" && window.innerWidth < 768;

const HeroSection = ({
  title,
  subtitle,
  actions,
  stats,
  images,
  className,
  titleClassName,
}: HeroSectionProps) => {
  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-8 lg:py-24 lg:px-12",
        className,
      )}
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1
            className={cn(
              "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground",
              titleClassName
            )}
            style={{ fontFamily: '"Google Sans Flex", "Google Sans", sans-serif' }}
          >
            {title}
          </h1>
          <p className="mt-4 sm:mt-6 max-w-md text-base sm:text-lg text-muted-foreground px-2 sm:px-0">
            {subtitle}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant}
                size="lg"
                className={cn("text-sm sm:text-base cursor-pointer", action.className)}
              >
                {action.text}
              </Button>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 lg:justify-start">
            {stats.map((stat, index) => {
              const Wrapper = stat.onClick ? "button" : "div";
              return (
                <Wrapper
                  key={index}
                  type={stat.onClick ? "button" : undefined}
                  onClick={stat.onClick}
                  className={cn(
                    "flex items-center gap-2 sm:gap-3 text-left",
                    stat.onClick && "cursor-pointer hover:opacity-80 transition-opacity"
                  )}
                >
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-muted shrink-0">
                    {stat.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-base sm:text-lg md:text-xl font-bold text-foreground truncate">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>

        {!isMobileHero && (
          <div className="relative h-[360px] w-full min-h-0 sm:h-[400px] md:h-[450px] lg:h-[500px] mt-6 lg:mt-0">
            <div
              className="absolute -top-2 left-1/4 h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full bg-blue-200/50 dark:bg-blue-800/30"
              style={{ animation: "heroFloat 3s ease-in-out infinite" }}
            />
            <div
              className="absolute bottom-0 right-1/4 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg bg-purple-200/50 dark:bg-purple-800/30"
              style={{ animation: "heroFloat 3s ease-in-out 0.5s infinite" }}
            />
            <div
              className="absolute bottom-1/4 left-2 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-green-200/50 dark:bg-green-800/30"
              style={{ animation: "heroFloat 3s ease-in-out 1s infinite" }}
            />

            <div
              className="absolute left-1/2 top-0 h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-52 lg:w-52 xl:h-64 xl:w-64 -translate-x-1/2 rounded-xl bg-muted p-1.5 sm:p-2 shadow-lg"
            >
              <img
                src={images[0]}
                alt="Student learning"
                className="h-full w-full rounded-lg object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div
              className="absolute right-0 top-[28%] sm:top-1/3 h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-56 lg:w-56 rounded-xl bg-muted p-1.5 sm:p-2 shadow-lg"
            >
              <img
                src={images[1]}
                alt="Tutor assisting"
                className="h-full w-full rounded-lg object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div
              className="absolute bottom-0 left-0 h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-xl bg-muted p-1.5 sm:p-2 shadow-lg"
            >
              <img
                src={images[2]}
                alt="Collaborative discussion"
                className="h-full w-full rounded-lg object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
