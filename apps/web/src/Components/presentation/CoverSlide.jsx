import React from "react";
import SlideFrame from "./SlideFrame";

export default function CoverSlide({ title, subtitle, illustration }) {
  return (
    <SlideFrame showAccentBars={false} showBrand={true}>
      <div className="h-full flex flex-col items-center justify-center px-12 py-16 text-center">
        {subtitle && (
          <h3 className="text-2xl font-medium text-[#183B56] mb-4">{subtitle}</h3>
        )}
        <h1 className="text-5xl md:text-6xl font-bold text-[#1565D8] mb-12">{title}</h1>
        {illustration && (
          <div className="mt-8 max-w-md">{illustration}</div>
        )}
      </div>
    </SlideFrame>
  );
}
