"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code, Map, Globe, Send, Check, Compass, ArrowUpRight } from "lucide-react";
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative select-none" data-component="MacOSFolder">
      {/* Slow float container for the folder and its overlapping items */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Interactive Folder Node */}
        <motion.button
          type="button"
          onClick={onClick}
          whileHover="hover"
          whileFocus="hover"
          initial="idle"
          aria-label="Open selected projects"
          className="relative h-[240px] w-[340px] cursor-pointer text-left rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-workspace-accent"
          style={{ perspective: 1200 }}
        >
          {/* TILTED BADGE 1 (LEFT SIDE - 2026 EDITION) — hardcoded decorative */}
          <motion.div
            variants={{
              idle: { x: -35, y: 15, rotate: -12, scale: 0.95 },
              hover: { x: -45, y: 10, rotate: -16, scale: 1.02 },
            }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="absolute left-[-45px] top-[15px] w-48 bg-workspace-text text-white border border-neutral-800 rounded-xl p-3.5 shadow-2xl z-40 pointer-events-none flex flex-col justify-between h-20"
          >
            <div className="text-[10px] font-mono tracking-widest text-neutral-400 font-bold uppercase">
              2026 Edition
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/60">
              <span className="text-xs font-mono text-neutral-300">@Deethin</span>
              <div className="flex gap-1.5 text-neutral-400">
                <Globe className="w-3.5 h-3.5" />
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>

          {/* FOLDER BACK LAYER */}
          <div className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl rounded-tl-none overflow-hidden z-10 shadow-md">
            {/* Bright-blue back plate */}
            <div className="absolute inset-0 bg-workspace-accent" />
          </div>

          {/* FOLDER BACK TAB (Offset to matching layout) */}
          <div className="absolute top-[-20px] left-0 w-[140px] h-[24px] bg-workspace-accent rounded-t-xl z-10 pointer-events-none shadow-sm" />

          {/* DOCUMENT INSIDE PEEKING OUT */}
          <motion.div
            variants={{
              idle: { y: 12, rotate: 1, scale: 0.96 },
              hover: { y: -24, rotate: -2, scale: 0.99 },
            }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="absolute top-[-8px] left-[16px] right-[16px] h-[200px] bg-white rounded-xl p-4 shadow-sm pointer-events-none flex flex-col justify-between border border-workspace-border/50 z-20"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400">INDEX // DIQING_WU_WORK</span>
              <Compass className="w-3.5 h-3.5 text-workspace-accent" />
            </div>
            <div className="flex-1 py-3 flex flex-col justify-center gap-1.5">
              {peekCards.map((card, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-neutral-800">{card.label}</span>
                  {card.status && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      card.status === "SYSTEM.ACTIVE"
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-workspace-accent bg-sky-50"
                    }`}>
                      {card.status}
                    </span>
                  )}
                  {card.version && (
                    <span className="text-[9px] font-mono text-workspace-accent bg-sky-50 px-1.5 py-0.5 rounded">
                      {card.version}
                    </span>
                  )}
                </div>
              ))}
              {peekCards.length === 0 && (
                <span className="text-[11px] font-mono text-neutral-400">No selected projects configured</span>
              )}
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono text-neutral-400 pt-2 border-t border-neutral-50">
              <span>SYSTEM: READY</span>
              <span>{peekCards.length || 4} COMPOSITIONS</span>
            </div>
          </motion.div>

          {/* FOLDER FRONT COVER */}
          <motion.div
            variants={{
              idle: {
                rotateX: 0,
                y: 0,
                boxShadow: "0 12px 30px -8px rgba(0, 0, 0, 0.15)",
              },
              hover: {
                rotateX: -14,
                y: 4,
                boxShadow: "0 24px 45px -12px rgba(0, 0, 0, 0.22)",
              },
            }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
            className="absolute bottom-0 left-0 right-0 h-[190px] bg-gradient-to-b from-workspace-accent via-[#1E86D9] to-[#0F75C2] rounded-2xl border-t border-white/20 flex flex-col justify-between p-5 z-30 shadow-xl"
          >
            {/* Soft inner highlight */}
            <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none" />

            {/* Folder Label/Icon */}
            <div className="flex justify-between items-start">
              <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                <Map className="w-4 h-4 text-white" />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-widest text-sky-100 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {folderBadge}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold tracking-tight text-white font-sans">
                {folderTitle}
              </h3>
              <p className="text-[10px] text-sky-100/80 font-mono">
                {folderInstruction}
              </p>
            </div>
          </motion.div>

          {/* TILTED BADGE 2 (RIGHT SIDE - SKILLS SELECTOR CARD) — hardcoded decorative */}
          <motion.div
            variants={{
              idle: { x: 45, y: 35, rotate: 8, scale: 0.95 },
              hover: { x: 55, y: 30, rotate: 12, scale: 1.02 },
            }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="absolute right-[-50px] bottom-[25px] w-64 bg-workspace-text text-white border border-neutral-800 rounded-xl p-4 shadow-2xl z-40 pointer-events-none flex flex-col gap-2.5"
          >
            {/* Skill Item 1 - Active/Checked */}
            <div className="flex items-center justify-between text-xs font-sans tracking-wide">
              <span className="font-semibold text-neutral-100">&spades; System Design</span>
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-neutral-900 stroke-[3]" />
              </div>
            </div>

            {/* Skill Item 2 */}
            <div className="flex items-center justify-between text-xs font-sans tracking-wide text-neutral-400">
              <span>&spades; Smart Cockpit (HMI)</span>
              <div className="w-4 h-4 rounded-full border border-neutral-700" />
            </div>

            {/* Skill Item 3 */}
            <div className="flex items-center justify-between text-xs font-sans tracking-wide text-neutral-400">
              <span>&spades; Generative AI & Agents</span>
              <div className="w-4 h-4 rounded-full border border-neutral-700" />
            </div>
          </motion.div>
        </motion.button>

        {/* DRAGGABLE / FLOATING GITHUB PROFILE CARD */}
        <motion.a
          href={github.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${github.username} on GitHub in a new tab`}
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="absolute w-60 bg-white border border-workspace-border rounded-xl shadow-xl p-3 flex flex-col gap-2.5 cursor-pointer z-50 hover:border-neutral-300"
          style={{ right: "-90px", bottom: "-75px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card Top Titlebar */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <div className="flex items-center gap-1.5">
              <GithubIcon className="w-4 h-4 text-neutral-800" />
              <span className="text-[10px] font-mono font-bold text-neutral-800">{github.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-mono text-neutral-400">{github.statusLabel}</span>
            </div>
          </div>

          {/* User Bio Block */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full bg-neutral-100 border border-workspace-border flex items-center justify-center overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-workspace-accent opacity-80" />
              <Code className="w-4 h-4 text-white z-10" />
            </div>

            <div className="flex flex-col min-w-0">
              <h4 className="text-[11px] font-bold text-neutral-800 truncate leading-tight flex items-center gap-1">
                {github.displayName} <ArrowUpRight className="w-2.5 h-2.5 text-neutral-400" />
              </h4>
              <span className="text-[9px] text-neutral-400 font-mono leading-tight">{github.handle}</span>
            </div>
          </div>

          {/* Contributions list */}
          <div className="flex justify-between items-center text-[8px] text-neutral-400 font-mono mt-0.5">
            <span>{github.contributionsLabel}</span>
            <span className="text-emerald-600 font-bold">{github.commits}</span>
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}
