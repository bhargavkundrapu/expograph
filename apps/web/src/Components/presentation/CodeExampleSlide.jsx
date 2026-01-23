import React from "react";
import { FiCode } from "react-icons/fi";
import SlideFrame from "./SlideFrame";

export default function CodeExampleSlide({ smallLabel, title, code, output, explanation, fileName = "example.js" }) {
  return (
    <SlideFrame showAccentBars={true} showBrand={true}>
      <div className="h-full flex flex-col px-12 py-8">
        {/* Header */}
        <div className="mb-6">
          {smallLabel && (
            <p className="text-sm font-medium text-[#183B56] mb-2">{smallLabel}</p>
          )}
          <h2 className="text-4xl font-bold text-[#1565D8]">{title}</h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {/* Explanation */}
          {explanation && (
            <p className="text-lg text-[#183B56] leading-relaxed">{explanation}</p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Block */}
            {code && (
              <div className="relative">
                <div className="absolute top-0 right-0 bg-[#1565D8] text-white px-4 py-1.5 rounded-t-lg text-sm font-medium z-10">
                  {fileName}
                </div>
                <div className="bg-[#1e293b] rounded-md p-6 pt-12 border-2 border-slate-700 overflow-x-auto">
                  <pre className="text-slate-100 text-sm font-mono">
                    <code>{code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Output Block */}
            {output && (
              <div className="relative">
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1.5 rounded-t-lg text-sm font-medium z-10">
                  Terminal
                </div>
                <div className="bg-black rounded-md p-6 pt-12 border-2 border-slate-800 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono">
                    <code>{output}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
