"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Gauge, Sun, Eye, ShieldCheck } from "lucide-react";
import type { HMIDemoContent } from "@/types/content";

interface HMIContentProps {
  demo: HMIDemoContent;
}

export default function HMIContent({ demo }: HMIContentProps) {
  const [speed, setSpeed] = useState<number>(42);
  const [temp, setTemp] = useState<number>(68);
  const [isAdasActive, setIsAdasActive] = useState<boolean>(true);
  const [systemLog, setSystemLog] = useState<string>(demo.systemLog.idle);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const drift = Math.sin(Date.now() / 2000) * 1.5;
        return Math.max(20, Math.min(180, parseFloat((prev + drift).toFixed(1))));
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const triggerAccelerate = () => {
    setSpeed((prev) => Math.min(180, prev + 25));
    setSystemLog(demo.systemLog.burst);
    setTimeout(() => setSystemLog(demo.systemLog.idle), 2000);
  };

  const getTempColor = (t: number) => {
    if (t < 64) return "text-blue-500";
    if (t > 74) return "text-red-500";
    return "text-amber-500";
  };

  return (
    <div className="space-y-6 select-text" data-component="HMIContent">
      <div className="space-y-1 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2 text-neutral-800">
          <Gauge className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base font-bold tracking-tight">{demo.heading}</h2>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed">{demo.intro}</p>
      </div>

      <div className="p-4 bg-neutral-950 text-neutral-100 border border-neutral-900 rounded-2xl flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] grid-bg pointer-events-none" />
        <div className="relative w-44 h-44 flex flex-col items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1f2937" strokeWidth="6" />
            <motion.circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="6"
              strokeDasharray={251} strokeDashoffset={251 - (251 * (speed / 180))} strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" transition={{ type: "spring", stiffness: 60, damping: 15 }} />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">{demo.gauge.speedLabel}</span>
            <motion.span className="text-4xl font-sans font-black text-white leading-none tracking-tight">{Math.floor(speed)}</motion.span>
            <span className="text-[10px] font-mono text-indigo-400 mt-1">{demo.gauge.speedUnit}</span>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <button onClick={triggerAccelerate} id="btn-accelerate-hmi"
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all rounded-xl text-xs font-mono font-bold text-white shadow-lg shadow-indigo-600/20 cursor-pointer text-center">
            {demo.accelerateLabel}
          </button>
          <div className="px-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center font-mono text-[9px] text-emerald-400">{systemLog}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-neutral-50 border border-neutral-200/60 rounded-xl flex flex-col justify-between h-44">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <div className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-neutral-800">{demo.climate.heading}</h4>
            </div>
            <span className="text-[9px] font-mono text-neutral-400">{demo.climate.zone}</span>
          </div>
          <div className="flex items-center justify-between gap-3 my-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-neutral-400">{demo.climate.tempLabel}</span>
              <span className={`text-2xl font-black font-sans leading-none mt-1 ${getTempColor(temp)}`}>{temp}°F</span>
            </div>
            <div className="flex-1 pl-4">
              <input type="range" min="60" max="82" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer outline-none" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
            <span>{demo.climate.loopStatus}</span>
            <span className="text-indigo-600 font-bold">{demo.climate.activeLabel}</span>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 border border-neutral-200/60 rounded-xl flex flex-col justify-between h-44">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-500" />
              <h4 className="text-xs font-bold text-neutral-800">{demo.adas.heading}</h4>
            </div>
            <button onClick={() => setIsAdasActive(!isAdasActive)} id="btn-toggle-adas"
              className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold cursor-pointer transition-colors ${isAdasActive ? "bg-emerald-100 text-emerald-800" : "bg-neutral-200 text-neutral-600"}`}>
              {isAdasActive ? demo.adas.runningLabel : demo.adas.standbyLabel}
            </button>
          </div>
          <div className="h-16 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              <motion.line x1="20" y1="50" x2="45" y2="10" stroke={isAdasActive ? "#10b981" : "#4b5563"} strokeWidth="1.5" strokeDasharray="4 2"
                animate={isAdasActive ? { strokeDashoffset: [0, -10] } : {}} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              <motion.line x1="80" y1="50" x2="55" y2="10" stroke={isAdasActive ? "#10b981" : "#4b5563"} strokeWidth="1.5" strokeDasharray="4 2"
                animate={isAdasActive ? { strokeDashoffset: [0, -10] } : {}} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              {isAdasActive && (
                <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  <rect x="42" y="16" width="16" height="8" rx="2" fill="#6366f1" opacity="0.9" />
                  <line x1="42" y1="24" x2="58" y2="24" stroke="#ff5f56" strokeWidth="1" />
                  <text x="50" y="12" fill="#818cf8" fontSize="6" fontFamily="monospace" textAnchor="middle">{demo.adas.carLabel}</text>
                </motion.g>
              )}
            </svg>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />{demo.adas.sensorLock}</span>
            <span className="text-neutral-400">{demo.adas.fps}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
