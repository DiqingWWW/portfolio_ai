"use client";

import React from "react";
import { motion } from "motion/react";
import { Code, Sparkles, Map } from "lucide-react";
import type { ProfileContent, NavigationContent } from "@/types/content";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

interface MacOSFolderProps {
  onClick: () => void;
  folderTitle: string;
  folderInstruction: string;
  folderBadge: string;
  peekCards: NavigationContent["peekCards"];
  github: ProfileContent["github"];
}

export default function MacOSFolder({
  onClick,
  folderTitle,
  folderInstruction,
  folderBadge,
  peekCards,
  github,
}: MacOSFolderProps) {
  return (
    <div className="relative select-none" data-component="MacOSFolder">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center justify-center">
        <motion.div onClick={onClick} whileHover="hover" initial="idle"
          className="relative w-64 h-48 cursor-pointer group" style={{ perspective: 1000, top: "-30px" }}>
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <svg viewBox="0 0 256 192" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="folderBackGrad" x1="128" y1="8" x2="128" y2="188" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2ca0f5" /><stop offset="100%" stopColor="#0b72c4" />
                </linearGradient>
              </defs>
              <path d="M 16 8 L 90 8 C 100 8 112 32 122 32 L 240 32 Q 252 32 252 44 L 252 176 Q 252 188 240 188 L 16 188 Q 4 188 4 176 L 4 20 Q 4 8 16 8 Z" fill="url(#folderBackGrad)" />
            </svg>
          </div>

          {/* Peek Card 1 */}
          {peekCards[0] && (
            <motion.div variants={{ idle: { y: 0, rotate: -2, scale: 0.95 }, hover: { y: -38, rotate: -8, scale: 1.02 } }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute top-4 left-6 w-52 h-36 bg-blue-950/95 border border-blue-800/80 rounded-lg p-3 shadow-sm pointer-events-none flex flex-col justify-between text-blue-100">
              <div className="flex items-center justify-between border-b border-blue-800/80 pb-1.5">
                <span className="text-[9px] font-mono tracking-wider text-blue-300">{peekCards[0].label}</span>
                <Code className="w-3 h-3 text-blue-400" />
              </div>
              <div className="flex-1 py-1 flex flex-col justify-center gap-1">
                <div className="h-1.5 w-3/4 bg-blue-800 rounded-full" />
                <div className="h-1.5 w-1/2 bg-blue-900 rounded-full" />
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                </div>
              </div>
              <span className="text-[8px] font-mono text-blue-300 self-end">{peekCards[0].version}</span>
            </motion.div>
          )}

          {/* Peek Card 2 */}
          {peekCards[1] && (
            <motion.div variants={{ idle: { y: 0, rotate: 1, scale: 0.95 }, hover: { y: -48, rotate: 6, scale: 1.02 } }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="absolute top-4 left-8 w-52 h-36 bg-neutral-900 border border-neutral-800 rounded-lg p-3 shadow-md pointer-events-none flex flex-col justify-between text-neutral-200">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                <span className="text-[9px] font-mono tracking-wider text-neutral-500">{peekCards[1].label}</span>
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-1">
                <div className="text-[9px] font-mono text-emerald-400">{peekCards[1].textLine}</div>
                <div className="flex items-center gap-1">
                  <div className="h-1 w-8 bg-neutral-700 rounded-full" />
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  <div className="h-1 w-12 bg-neutral-700 rounded-full" />
                </div>
              </div>
              <span className="text-[8px] font-mono text-neutral-500">{peekCards[1].status}</span>
            </motion.div>
          )}

          {/* Folder Front Cover */}
          <motion.div
            variants={{ idle: { rotateX: 0, y: 0, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" },
              hover: { rotateX: -16, y: 2, boxShadow: "0 25px 35px -10px rgba(0,0,0,0.15), 0 15px 15px -10px rgba(0,0,0,0.12)" } }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
            className="absolute bottom-[4px] left-[4px] w-[248px] h-[156px] bg-gradient-to-b from-[#56bffa] via-[#2096eb] to-[#0a72c4] rounded-2xl border-t border-[#b3e3ff]/50 flex flex-col justify-between p-4 shadow-xl select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
            <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                <Map className="w-4 h-4 text-white/95" />
              </div>
              <span className="text-[10px] font-mono font-medium tracking-widest text-sky-100/90 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">{folderBadge}</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold tracking-tight text-white/95 font-sans">{folderTitle}</h3>
              <p className="text-[10px] text-sky-100/70 font-mono">{folderInstruction}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating GitHub Card */}
        <motion.div whileHover={{ scale: 1.04, y: -4, x: 2 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="absolute w-64 bg-white/95 backdrop-blur-sm border rounded-xl shadow-xl p-3 flex flex-col gap-2.5 cursor-pointer z-20 hover:border-neutral-300"
          style={{ right: "-100px", bottom: "-50px", borderColor: "#FFFFFF" }}
          onClick={(e) => { e.stopPropagation(); window.open(github.url, "_blank"); }}>
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <div className="flex items-center gap-1.5">
              <GithubIcon className="w-4 h-4 text-neutral-800" />
              <span className="text-[11px] font-mono font-bold text-neutral-800">{github.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[9px] font-mono text-neutral-400">{github.statusLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-500 opacity-80" />
              <Code className="w-5 h-5 text-white z-10" />
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="text-[12px] font-bold text-neutral-800 truncate leading-tight">{github.displayName}</h4>
              <span className="text-[10px] text-neutral-400 font-mono leading-tight">{github.handle}</span>
              <p className="text-[9px] text-neutral-600 truncate mt-0.5 leading-tight">{github.bio}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[8px] text-neutral-400 font-mono">
              <span>{github.contributionsLabel}</span>
              <span className="text-emerald-600">{github.commits}</span>
            </div>
            <div className="grid grid-cols-12 gap-[2px]">
              {Array.from({ length: 24 }).map((_, i) => {
                const intensities = ["bg-neutral-100", "bg-emerald-100", "bg-emerald-300", "bg-emerald-500"];
                const c = intensities[Math.floor(Math.sin(i * 1.5) * 2) + 2] || intensities[0];
                return <div key={i} className={`h-2 rounded-[1px] ${c}`} />;
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
