import { PricingWithChart } from "../../Components/ui/pricing-with-chart";
import { Header } from "../../Components/ui/header-2";
import { cn } from "../../lib/utils";

export default function CoursesPage() {
  return (
    <div
      className="min-h-screen relative w-full overflow-x-hidden"
      style={{
        fontFamily: "var(--font-dm)",
        backgroundColor: "#0a0a0a",
        color: "var(--text-secondary)",
      }}
    >
      <Header />

      <div
        className={cn(
          "relative flex min-h-screen w-full items-start justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24",
          "px-4 sm:px-6 lg:px-8",
          "bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.15),transparent_50%)]",
          "bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(88,28,135,0.06),transparent_70%)]"
        )}
      >
        <PricingWithChart />

        {/* Subtle grid overlay */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 size-full opacity-[0.03]",
            "bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]",
            "bg-[size:48px_48px]"
          )}
        />
      </div>
    </div>
  );
}
