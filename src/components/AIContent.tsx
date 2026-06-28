"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Terminal, Cpu, RefreshCw, Music, CheckSquare } from "lucide-react";
import type { AIDemoContent } from "@/types/content";

type PromptType = "music" | "habit" | "calc";

interface AIContentProps {
  demo: AIDemoContent;
}

export default function AIContent({ demo }: AIContentProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptType>("music");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileStep, setCompileStep] = useState<number>(0);
  const [synthesizedWidget, setSynthesizedWidget] = useState<PromptType | null>("music");

  const handleSynthesize = () => {
    setIsCompiling(true);
    setCompileStep(0);
    setSynthesizedWidget(null);
  };

  useEffect(() => {
    if (!isCompiling) return;
    if (compileStep < demo.compileSteps.length) {
      const timer = setTimeout(() => setCompileStep((prev) => prev + 1), 700);
      return () => clearTimeout(timer);
    } else {
      setIsCompiling(false);
      setSynthesizedWidget(selectedPrompt);
    }
  }, [isCompiling, compileStep, selectedPrompt, demo.compileSteps.length]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(75);
  const [habits, setHabits] = useState(
    demo.habitWidget.dayLabels.map((day, i) => ({ day, checked: i < 2 }))
  );
  const toggleHabit = (index: number) => {
    setHabits((prev) => prev.map((h, i) => (i === index ? { ...h, checked: !h.checked } : h)));
  };
  const habitCompletion = Math.round((habits.filter((h) => h.checked).length / habits.length) * 100);
  const [calcSum, setCalcSum] = useState<number>(10);

  return (
    <div className="space-y-6 select-text" data-component="AIContent">
      <div className="space-y-1 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2 text-neutral-800">
          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          <h2 className="text-base font-bold tracking-tight">{demo.heading}</h2>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed">{demo.intro}</p>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-mono text-neutral-400">{demo.labels.prompts}</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {demo.prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => { if (!isCompiling) { setSelectedPrompt(p.id as PromptType); setSynthesizedWidget(p.id as PromptType); } }}
              className={`p-2.5 text-left rounded-xl border text-xs flex flex-col gap-1 cursor-pointer transition-all ${
                selectedPrompt === p.id ? "border-amber-500/50 bg-amber-50/30 text-neutral-800 shadow-sm" : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300"
              }`}
            >
              <span className="font-bold">{p.label}</span>
              <span className="text-[9px] text-neutral-400 leading-tight line-clamp-1">{p.promptText}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-neutral-400">{demo.labels.compiler}</span>
          <button onClick={handleSynthesize} disabled={isCompiling}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50">
            <RefreshCw className={`w-3 h-3 ${isCompiling ? "animate-spin" : ""}`} />
            {demo.compiler.buttonLabel}
          </button>
        </div>

        <div className="bg-neutral-950 rounded-xl p-4 font-mono text-[10px] text-neutral-300 border border-neutral-900 shadow-inner h-32 flex flex-col justify-between">
          <div className="space-y-1.5 overflow-y-auto max-h-[100px] scrollbar-none">
            <div className="flex items-center gap-1.5 text-neutral-500 border-b border-neutral-900 pb-1">
              <Terminal className="w-3.5 h-3.5" /><span>{demo.compiler.logsHeading}</span>
            </div>
            {isCompiling ? (
              demo.compileSteps.slice(0, compileStep).map((step, i) => (
                <div key={`compile-${i}-${step}`} className="text-amber-400 flex items-center gap-1.5">
                  <span className="text-neutral-600">&gt;&gt;</span><span>{step}</span>
                </div>
              ))
            ) : synthesizedWidget ? (
              <div className="text-emerald-400 flex items-center gap-1.5">
                <span className="text-neutral-600">&gt;&gt;</span><span>{demo.compiler.successMessage}</span>
              </div>
            ) : (
              <div className="text-neutral-500">{demo.compiler.placeholder}</div>
            )}
          </div>
          {isCompiling && (
            <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(compileStep / demo.compileSteps.length) * 100}%` }} className="bg-amber-400 h-full" transition={{ duration: 0.5 }} />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-mono text-neutral-400">{demo.labels.canvas}</span>
        <div className="border border-neutral-200/80 rounded-2xl p-6 bg-[#f9f9f9] min-h-[140px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {isCompiling ? (
              <motion.div key="compiling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2 text-neutral-400 font-mono text-[10px]">
                <Cpu className="w-5 h-5 text-amber-500 animate-spin" /><span>{demo.loadingHint}</span>
              </motion.div>
            ) : synthesizedWidget === "music" ? (
              <motion.div key="music-widget" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm p-4 bg-gradient-to-tr from-sky-400/10 via-white to-sky-500/10 border border-neutral-200 rounded-2xl shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                    <Music className={`w-5 h-5 ${isPlaying ? "animate-pulse" : ""}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-neutral-800">{demo.musicWidget.trackName}</span>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase mt-0.5">{demo.musicWidget.trackInfo}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white flex items-center justify-center text-xs cursor-pointer shadow-sm transition-all">
                    {isPlaying ? "❚❚" : "▶"}
                  </button>
                  <div className="flex flex-col gap-1 w-14">
                    <span className="text-[8px] font-mono text-neutral-400 self-end">{volume}%</span>
                    <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="w-full accent-sky-500 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer outline-none" />
                  </div>
                </div>
              </motion.div>
            ) : synthesizedWidget === "habit" ? (
              <motion.div key="habit-widget" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm p-4 bg-white border border-neutral-200 rounded-2xl shadow-md space-y-3.5">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-neutral-800">{demo.habitWidget.title}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{habitCompletion}% complete</span>
                </div>
                <div className="flex justify-between gap-1.5">
                  {habits.map((h, i) => (
                    <button key={h.day} onClick={() => toggleHabit(i)}
                      className={`flex-1 py-1.5 rounded-lg border flex flex-col items-center gap-1 transition-all cursor-pointer ${h.checked ? "border-emerald-500/40 bg-emerald-50/50 text-emerald-700 font-bold" : "border-neutral-200 bg-neutral-50 text-neutral-400 hover:border-neutral-300"}`}>
                      <span className="text-[9px] font-mono">{h.day}</span><span className="text-[10px]">{h.checked ? "●" : "○"}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : synthesizedWidget === "calc" ? (
              <motion.div key="calc-widget" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xs p-4 bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-2xl shadow-xl flex items-center justify-between">
                <div className="flex flex-col justify-center">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase">{demo.calcWidget.label}</span>
                  <div className="text-2xl font-mono font-bold text-amber-400 mt-1">{String(calcSum).padStart(3, "0")}</div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => setCalcSum((prev) => Math.max(0, prev - 1))} className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono font-bold text-sm cursor-pointer border border-neutral-700/60 transition-colors">-</button>
                  <button onClick={() => setCalcSum((prev) => Math.min(999, prev + 1))} className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono font-bold text-sm cursor-pointer border border-neutral-700/60 transition-colors">+</button>
                  <button onClick={() => setCalcSum(0)} className="px-2.5 h-8 rounded-lg bg-red-950 hover:bg-red-900 text-red-200 font-mono font-bold text-[9px] cursor-pointer border border-red-900/60 transition-colors">{demo.calcWidget.resetLabel}</button>
                </div>
              </motion.div>
            ) : (
              <div className="text-[11px] font-mono text-neutral-400">{demo.placeholder}</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
