import React from "react";
import { FiCheck } from "react-icons/fi";
import SlideFrame from "./SlideFrame";

export default function SummarySlide({ title, bullets, conclusion }) {
  return (
    <SlideFrame showAccentBars={false} showBrand={true}>
      <div className="h-full flex flex-col items-center justify-center px-12 py-16 text-center">
        <h2 className="text-4xl font-bold text-[#1565D8] mb-12">{title}</h2>
        
        {bullets && bullets.length > 0 && (
          <div className="max-w-3xl w-full space-y-4 mb-8">
            {bullets.map((bullet, index) => (
              <div key={index} className="flex items-start gap-4 justify-center">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#065F46] flex items-center justify-center">
                  <FiCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-[#183B56] text-left flex-1">{bullet}</span>
              </div>
            ))}
          </div>
        )}

        {conclusion && (
          <p className="text-xl text-[#183B56] mt-8 max-w-2xl">{conclusion}</p>
        )}
      </div>
    </SlideFrame>
  );
}
