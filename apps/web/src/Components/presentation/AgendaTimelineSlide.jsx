import React from "react";
import { FiArrowRight } from "react-icons/fi";
import SlideFrame from "./SlideFrame";

export default function AgendaTimelineSlide({ smallLabel, title, items }) {
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

        {/* Timeline */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <div key={index} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#1565D8] text-white px-6 py-3 rounded-lg font-semibold min-w-[150px] text-center">
                        {item.title}
                      </div>
                      {item.subtopics && item.subtopics.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {item.subtopics.map((subtopic, subIndex) => (
                            <div
                              key={subIndex}
                              className="text-sm text-[#183B56] text-center"
                            >
                              {subtopic}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {index < items.length - 1 && (
                      <FiArrowRight className="w-6 h-6 text-[#1565D8] mx-2 flex-shrink-0" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[#183B56]">No agenda items</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
