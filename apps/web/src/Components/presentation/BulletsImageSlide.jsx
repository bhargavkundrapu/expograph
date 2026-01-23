import React from "react";
import { FiCheck } from "react-icons/fi";
import SlideFrame from "./SlideFrame";

export default function BulletsImageSlide({ smallLabel, title, bullets, illustration }) {
  return (
    <SlideFrame showAccentBars={true} showBrand={true}>
      <div className="h-full flex flex-col px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          {smallLabel && (
            <p className="text-sm font-medium text-[#183B56] mb-2">{smallLabel}</p>
          )}
          <h2 className="text-4xl font-bold text-[#1565D8]">{title}</h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Bullets */}
          <div className="space-y-4">
            {bullets && bullets.length > 0 ? (
              <ul className="space-y-3">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#065F46] flex items-center justify-center">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-[#183B56] leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#183B56] text-lg">No bullets provided</p>
            )}
          </div>

          {/* Right Side - Illustration */}
          <div className="flex items-center justify-center">
            {illustration ? (
              <div className="w-full max-w-md">{illustration}</div>
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md border-2 border-blue-200 flex items-center justify-center">
                <p className="text-slate-400">Illustration Placeholder</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
