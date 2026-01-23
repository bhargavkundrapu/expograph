import React from "react";

// SVG Halftone Pattern Component
const HalftonePattern = ({ position = "top-left" }) => {
  const positions = {
    "top-left": {
      x: 0,
      y: 0,
      gradientX: "0%",
      gradientY: "0%",
    },
    "bottom-right": {
      x: "100%",
      y: "100%",
      gradientX: "100%",
      gradientY: "100%",
    },
  };

  const pos = positions[position] || positions["top-left"];

  return (
    <div
      className={`absolute ${position === "top-left" ? "top-0 left-0" : "bottom-0 right-0"} w-64 h-64 pointer-events-none`}
      style={{
        background: `radial-gradient(circle at ${pos.gradientX} ${pos.gradientY}, rgba(21, 101, 216, 0.1) 1px, transparent 1px)`,
        backgroundSize: "12px 12px",
        maskImage: `radial-gradient(ellipse 200px 200px at ${pos.gradientX} ${pos.gradientY}, black 40%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(ellipse 200px 200px at ${pos.gradientX} ${pos.gradientY}, black 40%, transparent 70%)`,
      }}
    />
  );
};

export default function SlideFrame({ children, showAccentBars = false, showBrand = true }) {
  return (
    <div className="relative w-full h-full bg-[#F9FBFE] flex flex-col">
      {/* Halftone Patterns */}
      <HalftonePattern position="top-left" />
      <HalftonePattern position="bottom-right" />

      {/* Left-edge Accent Bars */}
      {showAccentBars && (
        <div className="absolute left-0 top-0 z-10 flex flex-col gap-1">
          <div className="w-1 h-20 bg-[#1565D8]"></div>
          <div className="w-1 h-16 bg-[#1565D8] opacity-80"></div>
        </div>
      )}

      {/* Slide Content */}
      <div className="flex-1 relative z-0">{children}</div>

      {/* Bottom Blue Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1565D8] z-10" />

      {/* Bottom-right Brand Mark */}
      {showBrand && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="text-[#1565D8] font-bold text-xs tracking-tight">
            <div className="leading-tight">EXPO</div>
            <div className="leading-tight">GRAPH</div>
          </div>
        </div>
      )}
    </div>
  );
}
