"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Palette, MousePointer, Layers, Check } from "lucide-react";
import type { DesignTokensContent } from "@/types/content";

interface DesignSystemContentProps {
  tokens: DesignTokensContent;
}

export default function DesignSystemContent({ tokens }: DesignSystemContentProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"mono" | "brand">("mono");
  const [sliderVal, setSliderVal] = useState<number>(45);
  const [toggleState, setToggleState] = useState<boolean>(true);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="space-y-8 select-text" data-component="DesignSystemContent">
      {/* Intro Header */}
      <div className="space-y-2 border-b border-neutral-100 pb-5">
        <div className="flex items-center gap-2 text-neutral-800">
          <Palette className="w-5 h-5 text-sky-500" />
          <h2 className="text-base font-bold tracking-tight">{tokens.heading}</h2>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed">{tokens.intro}</p>
      </div>

      {/* Color Tokens Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400">
            {tokens.labels.colors}
          </h3>
          <div className="flex p-0.5 bg-neutral-100 rounded-lg text-[10px] font-mono relative">
            {(["mono", "brand"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                id={`btn-tab-${tab}`}
                className={`relative px-3 py-1 cursor-pointer font-bold capitalize transition-colors duration-200 z-10 ${
                  activeTab === tab ? "text-neutral-800" : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {tab === "mono" ? tokens.labels.tabMono : tokens.labels.tabBrand}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeColorTab"
                    className="absolute inset-0 bg-white rounded-md shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tokens.palettes[activeTab].map((color) => (
            <motion.div
              key={color.hex}
              whileHover={{ scale: 1.015, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => copyToClipboard(color.hex)}
              className="p-3 bg-neutral-50 border border-neutral-200/60 rounded-xl cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  style={{ backgroundColor: color.hex }}
                  className="w-10 h-10 rounded-lg border border-neutral-200/40 flex-shrink-0 shadow-sm"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-neutral-800 truncate">{color.name}</span>
                  <span className="text-[10px] font-mono text-neutral-400 mt-0.5">{color.hex}</span>
                  <p className="text-[9px] text-neutral-500 truncate mt-1 leading-tight">{color.usage}</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedColor === color.hex ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="text-[8px] font-mono font-bold text-neutral-400">{tokens.labels.copyButton}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tactile Micro-widgets Section */}
      <div className="space-y-4 pt-4 border-t border-neutral-100">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-400 flex items-center gap-1.5">
          <MousePointer className="w-3.5 h-3.5" />
          {tokens.labels.widgets}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-50 border border-neutral-200/60 rounded-xl flex flex-col justify-between h-36">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-neutral-400">{tokens.widgets.typeA.label}</span>
              <h4 className="text-xs font-bold text-neutral-800">{tokens.widgets.typeA.heading}</h4>
            </div>

            <div className="flex p-1 bg-neutral-200/50 rounded-lg relative self-stretch">
              {tokens.widgets.typeA.tabs.map((state) => (
                <button
                  key={state}
                  onClick={() => {}}
                  className="flex-1 py-1.5 text-xs text-center font-mono font-bold text-neutral-600 relative cursor-pointer"
                >
                  <span className="relative z-10">{state}</span>
                  {state === tokens.widgets.typeA.tabs[0] && (
                    <motion.div
                      layoutId="tabStateDemo"
                      className="absolute inset-0 bg-white rounded-md shadow-md"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="text-[9px] text-neutral-400 font-mono">{tokens.widgets.typeA.caption}</p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-200/60 rounded-xl flex flex-col justify-between h-36">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-neutral-400">{tokens.widgets.typeB.label}</span>
              <h4 className="text-xs font-bold text-neutral-800">{tokens.widgets.typeB.heading}</h4>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>{tokens.widgets.typeB.slider}</span>
                  <span className="font-bold text-neutral-700">{sliderVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(parseInt(e.target.value))}
                  className="w-full accent-[#107ECF] h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer outline-none"
                />
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-[8px] font-mono text-neutral-400">{tokens.widgets.typeB.toggle}</span>
                <button
                  onClick={() => setToggleState(!toggleState)}
                  id="btn-toggle-switch"
                  className={`w-11 h-6 rounded-full flex items-center p-0.5 cursor-pointer transition-colors duration-300 ${
                    toggleState ? "bg-sky-500" : "bg-neutral-300"
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>
            </div>
            <p className="text-[9px] text-neutral-400 font-mono">{tokens.widgets.typeB.caption}</p>
          </div>
        </div>
      </div>

      {/* Spatially Stacked layers mockup */}
      <div className="p-4 bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-xl space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono">{tokens.layerIndex.heading}</h4>
          </div>
          <span className="text-[9px] font-mono text-emerald-500">{tokens.layerIndex.status}</span>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">{tokens.layerIndex.body}</p>
      </div>
    </div>
  );
}
