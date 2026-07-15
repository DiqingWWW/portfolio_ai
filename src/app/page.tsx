"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowDown, User, Layers, Gauge, Cpu, Info } from "lucide-react";

import { siteConfig } from "@/config/site";
import FloatingWindow from "@/components/FloatingWindow";
import MacOSFolder from "@/components/MacOSFolder";
import AboutMeContent from "@/components/AboutMeContent";
import DesignSystemContent from "@/components/DesignSystemContent";
import HMIContent from "@/components/HMIContent";
import AIContent from "@/components/AIContent";
import FolderContent from "@/components/FolderContent";
import HoverImage from "@/components/Hover/HoverImage";
import {
  buildTagIndex,
  getProjectsForTag,
  getAllProjects,
  getProjectAssets,
  profile,
  navigation,
  designTokens,
  aiDemo,
  hmiDemo,
  nodes,
} from "@/lib/content";
import type { FolderProject } from "@/types/content";

// Map ProjectData[] to FolderProject[] for the folder window
function toFolderProjects(): FolderProject[] {
  return getAllProjects().map((p, i) => ({
    id: p.id,
    num: String(i + 1).padStart(2, "0"),
    title: p.title,
    type: p.metadata.type,
    desc: p.descriptions.short,
    detail: p.descriptions.detail,
    tokens: p.tokens,
    specs: p.specs,
  }));
}

// Vector Icons
const OpenAIIcon = () => (
  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-workspace-border shadow-md">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-workspace-text">
      <path d="M21.1 11.2a4.4 4.4 0 0 0-1.8-3.5 4.3 4.3 0 0 0-4.7-.2c-.3-.2-.8-.3-1.2-.4a4.4 4.4 0 0 0-7.8 2.2 4.3 4.3 0 0 0-1.8 3.5 4.4 4.4 0 0 0 4.1 4.3c.3.2.8.3 1.2.4a4.4 4.4 0 0 0 7.8-2.2c.7-.1 1.3-.4 1.8-.8a4.4 4.4 0 0 0 2.4-3.3zm-8.3 6.3a3 3 0 0 1-2 .7 3 3 0 0 1-3-3v-4l3.5 2a1.5 1.5 0 0 0 2.2-1.3V8l3.5 2v4a3 3 0 0 1-3 3.1c-.4.1-.8 0-1.2-.1zm-4-5l-3.5-2a3 3 0 0 1 1-3.6 3 3 0 0 1 3.9.6l3.5 2v4a1.5 1.5 0 0 0-2.2 1.3l-2.7-1.5v-.8zM7 11a1.5 1.5 0 0 0 1.5-1.5V7l3.5 2v4c0 .8-.7 1.5-1.5 1.5H9c-.8 0-1.5-.7-1.5-1.5V11zm9.3 2.5l-3.5-2V7.5a1.5 1.5 0 0 0-2.2-1.3l2.7 1.5v.8l3.5 2a3 3 0 0 1-1 3.6 3 3 0 0 1-3.9-.6zm1.2-4l-3.5-2v-4a3 3 0 0 1 2-.7 3 3 0 0 1 3 3v4l-1.5-1.1c-.7-.5-1.5-.5-2.2.3l-2.2 2.2V9.5zm2 5l-3.5-2v-4a1.5 1.5 0 0 0-2.2-1.3l2.7 1.5v.8l3.5 2a3 3 0 0 1-1 3.6 3 3 0 0 1-3.9-.6z" />
    </svg>
  </div>
);

const GeminiIcon = () => (
  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-workspace-border shadow-md">
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <defs>
        <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4b4b" /><stop offset="35%" stopColor="#ff8540" />
          <stop offset="65%" stopColor="#1c75ff" /><stop offset="100%" stopColor="#3cd070" />
        </linearGradient>
      </defs>
      <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="url(#geminiGradient)" />
    </svg>
  </div>
);

const ClaudeIcon = () => (
  <div className="w-10 h-10 flex items-center justify-center bg-[#cc785c] rounded-xl border border-transparent shadow-md">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white stroke-[2.2]" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19M8 3.5l8 17M16 3.5l-8 17M3.5 8l17 8M3.5 16l17-8" />
    </svg>
  </div>
);

const DEFAULT_POSITIONS = {
  about: { x: 100, y: 160 },
  ds: { x: 380, y: 60 },
  hmi: { x: 680, y: 120 },
  ai: { x: 180, y: 380 },
  projects: { x: 580, y: 340 },
};

export default function Home() {
  const tagIndex = buildTagIndex();
  const dsTag = tagIndex.find((t) => t.tag.id === "design-system");
  const aboutTag = tagIndex.find((t) => t.tag.id === "about-me");
  const hmiTag = tagIndex.find((t) => t.tag.id === "hmi");
  const aiTag = tagIndex.find((t) => t.tag.id === "ai-related");

  const dsProjects = getProjectsForTag("design-system");
  const hmiProjects = getProjectsForTag("hmi");
  const aiProjects = getProjectsForTag("ai-related");
  const folderProjects = toFolderProjects();

  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    about: false, ds: false, hmi: false, ai: false, projects: false,
  });
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({
    about: 10, ds: 10, hmi: 10, ai: 10, projects: 10,
  });
  const [topZIndex, setTopZIndex] = useState<number>(10);

  const focusWindow = (id: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setWindowZIndices((prev) => ({ ...prev, [id]: nextZ }));
  };
  const openWindow = (id: string) => {
    setOpenWindows((prev) => ({ ...prev, [id]: true }));
    focusWindow(id);
  };
  const closeWindow = (id: string) => {
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
  };

  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isDsHovered, setIsDsHovered] = useState(false);
  const [isHmiHovered, setIsHmiHovered] = useState(false);
  const [isAiHovered, setIsAiHovered] = useState(false);

  // Thumbnail image helpers — resolve relative paths to public URLs
  const dsAssets = dsProjects[0] ? getProjectAssets(dsProjects[0]) : { cover: "", hover: "", gallery: [] as string[] };
  const hmiAssets = hmiProjects.slice(0, 3).map((p) => getProjectAssets(p));
  const aiAssets = aiProjects.slice(0, 2).map((p) => getProjectAssets(p));
  const aiCenterAssets = hmiProjects[0]
    ? getProjectAssets(hmiProjects[0])
    : aiProjects[2] ? getProjectAssets(aiProjects[2]) : { cover: "", hover: "", gallery: [] as string[] };

  const dsThumb = dsAssets.cover;
  const hmiImages = hmiAssets.map((a) => a.cover);
  const aiImages = aiAssets.map((a) => a.cover);
  const aiCenterImg = hmiAssets[0]?.cover ?? aiCenterAssets.cover;

  return (
    <div data-component="Page" className="relative h-screen w-full overflow-hidden bg-workspace-bg text-workspace-text font-sans">
      {/* Figma-like Canvas Substrate Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-80 z-0" />

      {/* ---- HEADER BAR ---- */}
      <div className="absolute top-0 inset-x-0 h-14 border-b border-workspace-border/50 flex justify-between items-center px-10 text-[11px] font-mono tracking-widest text-workspace-muted uppercase z-30 select-none bg-workspace-bg/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-workspace-accent animate-pulse" />
          <span>{siteConfig.header.left}</span>
        </div>
        <div className="hidden md:block font-bold absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
          {siteConfig.header.center}
        </div>
        <div>{siteConfig.header.year}</div>
      </div>

      {/* ---- GIANT WATERMARK ---- */}
      <div className="absolute pointer-events-none select-none z-0 text-center w-full" style={{ top: nodes.watermark.y, left: "50%", transform: "translateX(-50%)" }}>
        <h1 className="text-[12vw] font-sans font-black tracking-[-0.05em] text-workspace-text/10 uppercase leading-none">
          {siteConfig.watermark}
        </h1>
      </div>

      {/* ------------------------------------ */}
      {/* DESKTOP CANVAS VIEW (>= 768px)       */}
      {/* ------------------------------------ */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">

        {/* Left-side Branding Statement Block */}
        <div
          className="absolute select-text z-20 w-[26%] min-w-[160px] max-w-[280px] pointer-events-auto flex flex-col gap-2 lg:gap-3"
          style={{ top: nodes.brandingBlock.y, left: nodes.brandingBlock.x }}
        >
          <div className="text-xs md:text-sm lg:text-base xl:text-lg font-black tracking-tight leading-snug text-workspace-text uppercase font-sans">
            {profile.brandingStatement}
          </div>
          <div className="h-0.5 w-8 lg:w-12 bg-workspace-accent" />
          <p className="text-[10px] lg:text-xs text-workspace-muted font-mono leading-relaxed">
            {profile.brandingDescription}
          </p>
        </div>

        {/* Right-side Name Accent Block */}
        <div
          className="absolute text-right select-text z-20 pointer-events-auto block w-[35%] min-w-[180px]"
          style={{ top: nodes.nameBlock.y, right: "4%" }}
        >
          <div className="text-2xl md:text-3xl xl:text-4xl font-black tracking-tight leading-none text-workspace-text font-sans whitespace-nowrap">
            {profile.nameDisplay}
          </div>
          <div className="text-[10px] lg:text-xs text-workspace-muted font-mono leading-relaxed mt-2 lg:mt-3 whitespace-nowrap">
            {profile.roleDisplay}
          </div>
        </div>

        {/* DESIGN SYSTEM NODE */}
        <div
          className={`absolute pointer-events-auto flex flex-col items-center transition-all duration-200 ${isDsHovered ? "z-30" : "z-20"}`}
          style={{ top: nodes.designSystem.y, left: nodes.designSystem.x, transform: "translateX(-50%)" }}
          onMouseEnter={() => setIsDsHovered(true)}
          onMouseLeave={() => setIsDsHovered(false)}
        >
          <div className="relative">
            <motion.button
              id="node-design-system"
              onClick={() => openWindow("ds")}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer bg-white border border-workspace-border/80 px-4 py-2 rounded-xl text-[11px] font-mono font-bold tracking-wider text-workspace-text uppercase flex items-center gap-2 hover:border-workspace-accent hover:text-workspace-accent transition-all shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-workspace-accent" />
              <span>{dsTag?.tag.label}</span>
            </motion.button>

            {/* Thumbnail Pop Up on the Right */}
            {dsTag?.tag.hoverLayout === "single-thumbnail" && (
              <AnimatePresence>
                {isDsHovered && dsThumb && (
                  <motion.div
                    key="ds-thumbnail-popup"
                    initial={{ opacity: 0, scale: 0.85, x: 15, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, x: 0, rotate: 3 }}
                    exit={{ opacity: 0, scale: 0.85, x: 15, rotate: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-[calc(100%+24px)] top-1/2 -translate-y-1/2 pointer-events-none w-[200px] rounded-xl overflow-hidden shadow-lg border border-workspace-border/50 bg-white"
                  >
                    <HoverImage asset={dsThumb} alt="Design System Thumbnail" />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          <AnimatePresence>
            {isDsHovered && dsTag?.tag.hoverSummary && (
              <motion.div
                key="ds-stats-popup"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[11px] text-workspace-muted mt-3.5 tracking-wide flex flex-col gap-1.5 w-56 sm:w-64 md:w-72 lg:w-80 pointer-events-none whitespace-normal select-none bg-white/95 backdrop-blur-sm p-3.5 border border-workspace-border/80 rounded-xl shadow-md animate-fade-in z-30"
              >
                {dsTag.tag.hoverSummary.map((b, i) => <div key={i}>- {b}</div>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ABOUT ME NODE */}
        <div
          className={`absolute pointer-events-auto flex flex-col items-start transition-all duration-200 ${isAboutHovered ? "z-30" : "z-20"}`}
          style={{ top: nodes.aboutMe.y, left: nodes.aboutMe.x }}
          onMouseEnter={() => setIsAboutHovered(true)}
          onMouseLeave={() => setIsAboutHovered(false)}
        >
          <motion.button
            id="node-about-me"
            onClick={() => openWindow("about")}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="cursor-pointer bg-white border border-workspace-border/80 px-4 py-2 rounded-xl text-[11px] font-mono font-bold tracking-wider text-workspace-text uppercase flex items-center gap-2 hover:border-workspace-accent hover:text-workspace-accent transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-workspace-accent" />
            <span>{aboutTag?.tag.label}</span>
          </motion.button>
          <AnimatePresence>
            {isAboutHovered && aboutTag?.tag.hoverSummary && (
              <motion.div
                key="about-stats-popup"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[11px] text-workspace-muted mt-3.5 tracking-wide flex flex-col gap-1.5 w-56 sm:w-64 md:w-72 lg:w-80 pointer-events-none whitespace-normal select-none bg-white/95 backdrop-blur-sm p-3.5 border border-workspace-border/80 rounded-xl shadow-md animate-fade-in z-30"
              >
                {aboutTag.tag.hoverSummary.map((b, i) => <div key={i}>- {b}</div>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* HMI NODE */}
        <div
          className={`absolute pointer-events-auto flex flex-col items-center transition-all duration-200 ${isHmiHovered ? "z-30" : "z-20"}`}
          style={{ top: nodes.hmi.y, left: nodes.hmi.x, transform: "translateX(-50%)" }}
          onMouseEnter={() => setIsHmiHovered(true)}
          onMouseLeave={() => setIsHmiHovered(false)}
        >
          <div className="relative">
            {hmiTag?.tag.hoverLayout === "fan-three" && (
              <AnimatePresence>
                {isHmiHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-[calc(100%+24px)] left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center h-[130px] w-[260px]"
                  >
                    {hmiImages[0] && (
                      <motion.div initial={{ x: 0, rotate: 0, scale: 0.9 }} animate={{ x: -50, rotate: -12, scale: 1 }}
                        exit={{ x: 0, rotate: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[120px] rounded-xl overflow-hidden shadow-md border border-workspace-border/50 bg-white origin-bottom z-10">
                        <HoverImage asset={hmiImages[0]} alt="HMI" />
                      </motion.div>
                    )}
                    {hmiImages[1] && (
                      <motion.div initial={{ x: 0, rotate: 0, scale: 0.9 }} animate={{ x: 50, rotate: 12, scale: 1 }}
                        exit={{ x: 0, rotate: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[120px] rounded-xl overflow-hidden shadow-md border border-workspace-border/50 bg-white origin-bottom z-10">
                        <HoverImage asset={hmiImages[1]} alt="HMI" />
                      </motion.div>
                    )}
                    {hmiImages[2] && (
                      <motion.div initial={{ y: 5, rotate: 0, scale: 0.95 }} animate={{ y: -8, rotate: 0, scale: 1.05 }}
                        exit={{ y: 5, rotate: 0, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[125px] rounded-xl overflow-hidden shadow-lg border border-workspace-border/60 bg-white z-20">
                        <HoverImage asset={hmiImages[2]} alt="HMI" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <motion.button
              id="node-hmi"
              onClick={() => openWindow("hmi")}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer bg-white border border-workspace-border/80 px-4 py-2 rounded-xl text-[11px] font-mono font-bold tracking-wider text-workspace-text uppercase flex items-center gap-2 hover:border-workspace-accent hover:text-workspace-accent transition-all shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-workspace-accent" />
              <span>{hmiTag?.tag.label}</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {isHmiHovered && hmiTag?.tag.hoverLayout === "fan-three" && (
              <motion.div
                key="hmi-stats-popup"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[11px] text-workspace-muted mt-3.5 tracking-wide flex flex-col gap-1.5 w-56 sm:w-64 md:w-72 lg:w-80 pointer-events-none whitespace-normal select-none bg-white/95 backdrop-blur-sm p-3.5 border border-workspace-border/80 rounded-xl shadow-md animate-fade-in z-30"
              >
                <div>- Prototyping in-vehicle telemetry & cockpit HUDs</div>
                <div>- Real-time speedometer simulation with thermal matrices</div>
                <div>- Spatial Lane Assist and ADAS tracking dashboard</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI RELATED NODE */}
        <div
          className={`absolute pointer-events-auto flex flex-col items-center transition-all duration-200 ${isAiHovered ? "z-30" : "z-20"}`}
          style={{ top: nodes.aiRelated.y, left: nodes.aiRelated.x }}
          onMouseEnter={() => setIsAiHovered(true)}
          onMouseLeave={() => setIsAiHovered(false)}
        >
          <div className="relative">
            {aiTag?.tag.hoverLayout === "fan-three-with-icons" && (
              <AnimatePresence>
                {isAiHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -20, y: 15 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20, y: 15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-[calc(100%+20px)] right-[20px] pointer-events-none flex items-center justify-center h-[120px] w-[240px]"
                  >
                    {aiImages[0] && (
                      <motion.div initial={{ x: 0, rotate: 0, scale: 0.9 }} animate={{ x: -45, y: 6, rotate: -18, scale: 1 }}
                        exit={{ x: 0, rotate: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[90px] rounded-xl overflow-hidden shadow-md border border-workspace-border/50 bg-white origin-bottom-right z-10">
                        <HoverImage asset={aiImages[0]} alt="AI" />
                      </motion.div>
                    )}
                    {aiImages[1] && (
                      <motion.div initial={{ x: 0, rotate: 0, scale: 0.9 }} animate={{ x: 45, y: 4, rotate: 12, scale: 1 }}
                        exit={{ x: 0, rotate: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[90px] rounded-xl overflow-hidden shadow-md border border-workspace-border/50 bg-white origin-bottom-left z-10">
                        <HoverImage asset={aiImages[1]} alt="AI" />
                      </motion.div>
                    )}
                    {aiCenterImg && (
                      <motion.div initial={{ y: 5, rotate: 0, scale: 0.95 }} animate={{ y: -6, rotate: -3, scale: 1.05 }}
                        exit={{ y: 5, rotate: 0, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[95px] rounded-xl overflow-hidden shadow-lg border border-workspace-border/60 bg-white z-20">
                        <HoverImage asset={aiCenterImg} alt="AI" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            {/* AI Icons Row */}
            <AnimatePresence>
              {isAiHovered && aiTag?.tag.hoverLayout === "fan-three-with-icons" && (
                <motion.div initial={{ opacity: 0, scale: 0.8, x: 20, y: -10 }} animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20, y: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className="absolute top-[calc(100%+14px)] left-[40px] pointer-events-none flex items-center gap-3 pl-4">
                  <motion.div initial={{ scale: 0, y: -8, rotate: -12 }} animate={{ scale: 0.9, y: 0, rotate: -6 }}
                    exit={{ scale: 0, y: -8, rotate: -12 }} transition={{ duration: 0.3, ease: "easeOut", delay: 0.08 }}><OpenAIIcon /></motion.div>
                  <motion.div initial={{ scale: 0, y: -8, rotate: 0 }} animate={{ scale: 1.0, y: -3, rotate: 0 }}
                    exit={{ scale: 0, y: -8, rotate: 0 }} transition={{ duration: 0.3, ease: "easeOut", delay: 0.12 }}><GeminiIcon /></motion.div>
                  <motion.div initial={{ scale: 0, y: -8, rotate: 12 }} animate={{ scale: 0.9, y: 2, rotate: 6 }}
                    exit={{ scale: 0, y: -8, rotate: 12 }} transition={{ duration: 0.3, ease: "easeOut", delay: 0.16 }}><ClaudeIcon /></motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              id="node-ai-related"
              onClick={() => openWindow("ai")}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer bg-white border border-workspace-border/80 px-4 py-2 rounded-xl text-[11px] font-mono font-bold tracking-wider text-workspace-text uppercase flex items-center gap-2 hover:border-workspace-accent hover:text-workspace-accent transition-all shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-workspace-accent" />
              <span>{aiTag?.tag.label}</span>
              {aiTag?.tag.hasSparkle && <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />}
            </motion.button>

            {/* Stats list hover text pop up for AI Cognitive */}
            <AnimatePresence>
              {isAiHovered && aiTag?.tag.hoverLayout === "fan-three-with-icons" && (
                <motion.div
                  key="ai-stats-popup"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[calc(100%+16px)] top-[calc(100%+48px)] md:top-[-30px] font-mono text-[11px] text-workspace-muted tracking-wide flex flex-col gap-1.5 w-56 sm:w-64 md:w-72 lg:w-80 pointer-events-none whitespace-normal select-none bg-white/95 backdrop-blur-sm p-3.5 border border-workspace-border/80 rounded-xl shadow-md animate-fade-in z-30"
                >
                  <div>- AI-native spec & generative interface architectures</div>
                  <div>- Real-time prompt-to-widget compilation sandboxes</div>
                  <div>- Tactile interaction controllers with active outputs</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MAC OS FOLDER */}
        <div
          className="absolute pointer-events-auto"
          style={{ top: nodes.folder.y, left: nodes.folder.x, transform: "translate(-50%, -50%)" }}
        >
          <MacOSFolder
            onClick={() => openWindow("projects")}
            folderTitle={navigation.folderBadge === "WORKSPACE" ? "diqing_wu_projects" : navigation.folderHeading}
            folderInstruction={navigation.folderInstruction}
            folderBadge={navigation.folderBadge}
            peekCards={navigation.peekCards}
            github={profile.github}
          />
        </div>

        {/* DOWN ARROW */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[9px] font-mono tracking-widest text-workspace-muted">{navigation.exploreCanvas}</span>
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="w-4 h-4 text-workspace-muted" />
          </motion.div>
        </div>
      </div>

      {/* ---- FOOTER BAR ---- */}
      <div className="absolute bottom-0 inset-x-0 h-12 border-t border-workspace-border/50 hidden md:flex justify-between items-center px-10 text-[10px] font-mono tracking-wider text-workspace-muted bg-workspace-bg/80 backdrop-blur-sm z-30 select-none">
        <div>{navigation.footerLeft}</div>
        <div className="flex items-center gap-4">
          <span>{navigation.footerCenterLeft}</span>
          <span>{"•"}</span>
          <span>{navigation.footerCenterRight}</span>
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* DRAGGABLE OS WINDOWS LAYER           */}
      {/* ------------------------------------ */}
      <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          <FloatingWindow id="about" title={aboutTag?.tag.windowTitle ?? ""} isOpen={openWindows.about}
            onClose={() => closeWindow("about")} zIndex={windowZIndices.about} onFocus={() => focusWindow("about")}
            defaultPosition={DEFAULT_POSITIONS.about}>
            <AboutMeContent profile={profile} />
          </FloatingWindow>
          <FloatingWindow id="ds" title={dsTag?.tag.windowTitle ?? ""} isOpen={openWindows.ds}
            onClose={() => closeWindow("ds")} zIndex={windowZIndices.ds} onFocus={() => focusWindow("ds")}
            defaultPosition={DEFAULT_POSITIONS.ds} width="max-w-2xl w-full">
            <DesignSystemContent tokens={designTokens} />
          </FloatingWindow>
          <FloatingWindow id="hmi" title={hmiTag?.tag.windowTitle ?? ""} isOpen={openWindows.hmi}
            onClose={() => closeWindow("hmi")} zIndex={windowZIndices.hmi} onFocus={() => focusWindow("hmi")}
            defaultPosition={DEFAULT_POSITIONS.hmi}>
            <HMIContent demo={hmiDemo} />
          </FloatingWindow>
          <FloatingWindow id="ai" title={aiTag?.tag.windowTitle ?? ""} isOpen={openWindows.ai}
            onClose={() => closeWindow("ai")} zIndex={windowZIndices.ai} onFocus={() => focusWindow("ai")}
            defaultPosition={DEFAULT_POSITIONS.ai}>
            <AIContent demo={aiDemo} />
          </FloatingWindow>
          <FloatingWindow id="projects" title="diqing_wu_projects/" isOpen={openWindows.projects}
            onClose={() => closeWindow("projects")} zIndex={windowZIndices.projects} onFocus={() => focusWindow("projects")}
            defaultPosition={DEFAULT_POSITIONS.projects}>
            <FolderContent
              heading={navigation.folderHeading}
              description={navigation.folderDescription}
              backButton={navigation.folderBackButton}
              designTokensLabel={navigation.folderDesignTokensLabel}
              projects={folderProjects}
            />
          </FloatingWindow>
        </AnimatePresence>
      </div>

      {/* ------------------------------------ */}
      {/* MOBILE CANVAS & ADAPTIVE VIEW        */}
      {/* ------------------------------------ */}
      <div className="md:hidden flex flex-col h-full overflow-y-auto p-6 z-10 relative">
        <div className="pt-8 pb-6 border-b border-workspace-border select-text">
          <h1 className="text-5xl font-sans tracking-tight text-workspace-text leading-tight">
            {profile.heroPrefix}<span className="font-bold">{profile.name.first}</span>
          </h1>
          <p className="text-xl font-sans font-light text-workspace-muted mt-1">{profile.heroSubtitleMobile}</p>
          <p className="text-[10px] font-mono text-workspace-muted mt-2.5">{navigation.tagline}</p>
        </div>
        <div className="my-4 p-3 bg-neutral-100 rounded-lg flex items-center gap-2 text-[10px] font-mono text-workspace-muted">
          <Info className="w-3.5 h-3.5 text-sky-500" />
          <span>{navigation.mobileTip}</span>
        </div>
        <div className="grid grid-cols-2 gap-3.5 py-4">
          <button onClick={() => openWindow("about")} className="p-4 bg-white border border-workspace-border rounded-xl flex flex-col justify-between h-28 text-left hover:border-workspace-accent/40 transition-colors">
            <User className="w-5 h-5 text-sky-500" /><span className="text-xs font-bold text-workspace-text">{aboutTag?.tag.label}</span></button>
          <button onClick={() => openWindow("ds")} className="p-4 bg-white border border-workspace-border rounded-xl flex flex-col justify-between h-28 text-left hover:border-workspace-accent/40 transition-colors">
            <Layers className="w-5 h-5 text-indigo-500" /><span className="text-xs font-bold text-workspace-text">{dsTag?.tag.label}</span></button>
          <button onClick={() => openWindow("hmi")} className="p-4 bg-white border border-workspace-border rounded-xl flex flex-col justify-between h-28 text-left hover:border-workspace-accent/40 transition-colors">
            <Gauge className="w-5 h-5 text-emerald-500" /><span className="text-xs font-bold text-workspace-text">{hmiTag?.tag.label}</span></button>
          <button onClick={() => openWindow("ai")} className="p-4 bg-white border border-workspace-border rounded-xl flex flex-col justify-between h-28 text-left hover:border-workspace-accent/40 transition-colors">
            <Cpu className="w-5 h-5 text-amber-500 animate-pulse" /><span className="text-xs font-bold text-workspace-text">{aiTag?.tag.label}</span></button>
        </div>
        <div className="py-8 flex flex-col items-center justify-center border-t border-workspace-border mt-4 gap-4">
          <MacOSFolder onClick={() => openWindow("projects")}
            folderTitle={navigation.folderBadge === "WORKSPACE" ? "diqing_wu_projects" : navigation.folderHeading}
            folderInstruction={navigation.folderInstruction}
            folderBadge={navigation.folderBadge}
            peekCards={navigation.peekCards}
            github={profile.github}
          />
          <span className="text-[10px] font-mono text-workspace-muted uppercase tracking-widest mt-12">{navigation.workspaceGallery}</span>
        </div>
        <AnimatePresence>
          {Object.entries(openWindows).filter(([, isOpen]) => isOpen).map(([id]) => {
            let title = "";
            let content: React.ReactNode = null;
            if (id === "about") { title = aboutTag?.tag.windowTitle ?? ""; content = <AboutMeContent profile={profile} />; }
            else if (id === "ds") { title = dsTag?.tag.windowTitle ?? ""; content = <DesignSystemContent tokens={designTokens} />; }
            else if (id === "hmi") { title = hmiTag?.tag.windowTitle ?? ""; content = <HMIContent demo={hmiDemo} />; }
            else if (id === "ai") { title = aiTag?.tag.windowTitle ?? ""; content = <AIContent demo={aiDemo} />; }
            else if (id === "projects") { title = "diqing_wu_projects/"; content = (
              <FolderContent heading={navigation.folderHeading} description={navigation.folderDescription}
                backButton={navigation.folderBackButton} designTokensLabel={navigation.folderDesignTokensLabel}
                projects={folderProjects} />
            ); }
            return (
              <motion.div key={`mobile-sheet-${id}`} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed inset-x-0 bottom-0 h-[85vh] bg-white rounded-t-2xl border-t border-workspace-border shadow-2xl z-50 flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50 rounded-t-2xl">
                  <span className="text-[10px] font-mono text-neutral-500 font-bold">{title}</span>
                  <button onClick={() => closeWindow(id)}
                    className="px-3 py-1 bg-neutral-200 text-neutral-700 text-[10px] font-mono font-bold rounded-lg cursor-pointer">
                    {navigation.closeButton}
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 pb-10">{content}</div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
