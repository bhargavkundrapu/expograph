import { motion } from "framer-motion";
import { Button, type ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import React from "react";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ActionProps {
  text: string;
  onClick: () => void;
  variant?: ButtonProps["variant"];
  className?: string;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  stats: StatProps[];
  images: string[];
  className?: string;
  titleClassName?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

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
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className={cn("text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground", titleClassName)}
            style={{ fontFamily: '"Google Sans Flex", "Google Sans", sans-serif' }}
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-4 sm:mt-6 max-w-md text-base sm:text-lg text-muted-foreground px-2 sm:px-0"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start"
            variants={itemVariants}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant}
                size="lg"
                className={cn("text-sm sm:text-base", action.className)}
              >
                {action.text}
              </Button>
            ))}
          </motion.div>
          <motion.div
            className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 lg:justify-start"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-muted shrink-0">
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-base sm:text-lg md:text-xl font-bold text-foreground truncate">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative h-[280px] w-full min-h-0 sm:h-[380px] md:h-[450px] lg:h-[500px] mt-6 lg:mt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute -top-2 left-1/4 h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full bg-blue-200/50 dark:bg-blue-800/30"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg bg-purple-200/50 dark:bg-purple-800/30"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "0.5s" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-2 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-green-200/50 dark:bg-green-800/30"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: "1s" }}
          />

          <motion.div
            className="absolute left-1/2 top-0 h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 xl:h-64 xl:w-64 -translate-x-1/2 rounded-md bg-muted p-1.5 sm:p-2 shadow-lg"
            style={{ transformOrigin: "bottom center" }}
            variants={imageVariants}
          >
            <img
              src={images[0]}
              alt="Student learning"
              className="h-full w-full rounded-[6px] object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute right-0 top-1/4 sm:top-1/3 h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-56 lg:w-56 rounded-md bg-muted p-1.5 sm:p-2 shadow-lg"
            style={{ transformOrigin: "left center" }}
            variants={imageVariants}
          >
            <img
              src={images[1]}
              alt="Tutor assisting"
              className="h-full w-full rounded-[6px] object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-48 lg:w-48 rounded-md bg-muted p-1.5 sm:p-2 shadow-lg"
            style={{ transformOrigin: "top right" }}
            variants={imageVariants}
          >
            <img
              src={images[2]}
              alt="Collaborative discussion"
              className="h-full w-full rounded-[6px] object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
