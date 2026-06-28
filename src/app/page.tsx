"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowDown, User, Layers, Gauge, Cpu, Info } from "lucide-react";

import FloatingWindow from "@/components/FloatingWindow";
import MacOSFolder from "@/components/MacOSFolder";
import AboutMeContent from "@/components/AboutMeContent";
import DesignSystemContent from "@/components/DesignSystemContent";
import HMIContent from "@/components/HMIContent";
import AIContent from "@/components/AIContent";
import FolderContent from "@/components/FolderContent";
import HoverImage from "@/components/Hover/HoverImage";
import {
  tagDefinitions,
  buildTagIndex,
  getProjectsForTag,
  getAllProjects,
  profile,
  navigation,
  designTokens,
  aiDemo,
  hmiDemo,
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
  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-neutral-200/50 shadow-md">
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-neutral-800">
      <path d="M21.1 11.2a4.4 4.4 0 0 0-1.8-3.5 4.3 4.3 0 0 0-4.7-.2c-.3-.2-.8-.3-1.2-.4a4.4 4.4 0 0 0-7.8 2.2 4.3 4.3 0 0 0-1.8 3.5 4.4 4.4 0 0 0 4.1 4.3c.3.2.8.3 1.2.4a4.4 4.4 0 0 0 7.8-2.2c.7-.1 1.3-.4 1.8-.8a4.4 4.4 0 0 0 2.4-3.3zm-8.3 6.3a3 3 0 0 1-2 .7 3 3 0 0 1-3-3v-4l3.5 2a1.5 1.5 0 0 0 2.2-1.3V8l3.5 2v4a3 3 0 0 1-3 3.1c-.4.1-.8 0-1.2-.1zm-4-5l-3.5-2a3 3 0 0 1 1-3.6 3 3 0 0 1 3.9.6l3.5 2v4a1.5 1.5 0 0 0-2.2 1.3l-2.7-1.5v-.8zM7 11a1.5 1.5 0 0 0 1.5-1.5V7l3.5 2v4c0 .8-.7 1.5-1.5 1.5H9c-.8 0-1.5-.7-1.5-1.5V11zm9.3 2.5l-3.5-2V7.5a1.5 1.5 0 0 0-2.2-1.3l2.7 1.5v.8l3.5 2a3 3 0 0 1-1 3.6 3 3 0 0 1-3.9-.6zm1.2-4l-3.5-2v-4a3 3 0 0 1 2-.7 3 3 0 0 1 3 3v4l-1.5-1.1c-.7-.5-1.5-.5-2.2.3l-2.2 2.2V9.5zm2 5l-3.5-2v-4a1.5 1.5 0 0 0-2.2-1.3l2.7 1.5v.8l3.5 2a3 3 0 0 1-1 3.6 3 3 0 0 1-3.9-.6z" />
    </svg>
  </div>
);

const GeminiIcon = () => (
  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl border border-neutral-200/50 shadow-md">
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
  <div className="w-10 h-10 flex items-center justify-center bg-[#cc785c] rounded-xl border border-neutral-200/20 shadow-md">
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

  // Thumbnail image helpers — use project cover assets
  const dsThumb = dsProjects[0]?.assets.cover ?? "";
  const hmiImages = hmiProjects.slice(0, 3).map((p) => p.assets.cover);
  const aiImages = aiProjects.slice(0, 2).map((p) => p.assets.cover);
  // Reuse first HMI project cover for AI center card (matches original visual)
  const aiCenterImg = hmiProjects[0]?.assets.cover ?? aiProjects[2]?.assets.cover ?? "";

  return (
    <div data-component="Page" className="relative h-screen w-full overflow-hidden bg-[#f5f5f5] text-[#373737] font-sans">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-85 z-0" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 hidden md:block text-[10px] font-mono text-neutral-400 text-center">
        {navigation.tagline}
      </div>

      {/* DESKTOP CANVAS VIEW */}
      <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">

        {/* DESIGN SYSTEM NODE */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center z-20"
          onMouseEnter={() => setIsDsHovered(true)} onMouseLeave={() => setIsDsHovered(false)}>
          <div className="relative">
            <motion.button onClick={() => openWindow("ds")} whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer font-['Helvetica',_sans-serif] font-normal text-[#373737] hover:text-blue-600 hover:underline underline-offset-4 decoration-2 decoration-blue-600 select-none text-2xl tracking-wide transition-all">
              {dsTag?.tag.label}
            </motion.button>
            {dsTag?.tag.hoverLayout === "single-thumbnail" && (
              <AnimatePresence>
                {isDsHovered && dsThumb && (
                  <motion.div initial={{ opacity: 0, scale: 0.85, x: 15, rotate: 0 }} animate={{ opacity: 1, scale: 1, x: 0, rotate: 3 }}
                    exit={{ opacity: 0, scale: 0.85, x: 15, rotate: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-[calc(100%+24px)] top-1/2 -translate-y-1/2 pointer-events-none w-[200px] rounded-xl overflow-hidden shadow-lg border border-neutral-200/50 bg-white">
                    <HoverImage asset={dsThumb} alt="Design System Thumbnail" />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
          <AnimatePresence>
            {isDsHovered && dsTag?.tag.hoverSummary && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[12px] text-neutral-400 mt-3.5 tracking-wide flex flex-col gap-1.5 max-w-[420px] pointer-events-none whitespace-nowrap select-none">
                {dsTag.tag.hoverSummary.map((b, i) => <div key={i}>- {b}</div>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ABOUT ME NODE */}
        <div className="absolute top-[28%] left-[12%] pointer-events-auto flex flex-col items-start z-20"
          onMouseEnter={() => setIsAboutHovered(true)} onMouseLeave={() => setIsAboutHovered(false)}>
          <motion.button onClick={() => openWindow("about")} whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="cursor-pointer font-['Helvetica',_sans-serif] font-normal text-[#373737] hover:text-blue-600 hover:underline underline-offset-4 decoration-2 decoration-blue-600 select-none text-2xl transition-all">
            {aboutTag?.tag.label}
          </motion.button>
          <AnimatePresence>
            {isAboutHovered && aboutTag?.tag.hoverSummary && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[12px] text-neutral-400 mt-3.5 tracking-wide flex flex-col gap-1.5 max-w-[420px] pointer-events-none whitespace-nowrap select-none">
                {aboutTag.tag.hoverSummary.map((b, i) => <div key={i}>- {b}</div>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* HMI NODE */}
        <div className="absolute top-[32%] right-[18%] pointer-events-auto flex flex-col items-center z-20"
          onMouseEnter={() => setIsHmiHovered(true)} onMouseLeave={() => setIsHmiHovered(false)}>
          <div className="relative">
            {hmiTag?.tag.hoverLayout === "fan-three" && (
              <AnimatePresence>
                {isHmiHovered && (
                  <motion.div initial={{ opacity: 0, scale: 0.8, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 15 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-[calc(100%+24px)] left-1/2 -translate-x-1/2 pointer-events-none flex items-center justify-center h-[130px] w-[260px]">
                    {hmiImages[0] && (
                      <motion.div initial={{ x: 0, rotate: 0, scale: 0.9 }} animate={{ x: -50, rotate: -12, scale: 1 }}
                        exit={{ x: 0, rotate: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[120px] rounded-xl overflow-hidden shadow-md border border-neutral-200/50 bg-white origin-bottom z-10">
                        <HoverImage asset={hmiImages[0]} alt="HMI" />
                      </motion.div>
                    )}
                    {hmiImages[1] && (
                      <motion.div initial={{ x: 0, rotate: 0, scale: 0.9 }} animate={{ x: 50, rotate: 12, scale: 1 }}
                        exit={{ x: 0, rotate: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[120px] rounded-xl overflow-hidden shadow-md border border-neutral-200/50 bg-white origin-bottom z-10">
                        <HoverImage asset={hmiImages[1]} alt="HMI" />
                      </motion.div>
                    )}
                    {hmiImages[2] && (
                      <motion.div initial={{ y: 5, rotate: 0, scale: 0.95 }} animate={{ y: -8, rotate: 0, scale: 1.05 }}
                        exit={{ y: 5, rotate: 0, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[125px] rounded-xl overflow-hidden shadow-lg border border-neutral-300/60 bg-white z-20">
                        <HoverImage asset={hmiImages[2]} alt="HMI" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <motion.button onClick={() => openWindow("hmi")} whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer font-['Helvetica',_sans-serif] font-normal text-[#373737] hover:text-blue-600 hover:underline underline-offset-4 decoration-2 decoration-blue-600 select-none text-2xl transition-all">
              {hmiTag?.tag.label}
            </motion.button>
          </div>
        </div>

        {/* HERO TITLE */}
        <div className="absolute top-[48%] left-[16%] flex flex-col justify-center select-text z-30 pointer-events-auto">
          <h1 className="text-6xl font-sans tracking-tight text-neutral-800 leading-tight">
            {profile.heroPrefix}<span className="font-bold">{profile.name.first}</span>
          </h1>
          <p className="text-2xl font-sans font-light text-neutral-500 mt-1 tracking-wide">
            {profile.heroSubtitle}
          </p>
        </div>

        {/* AI RELATED NODE */}
        <div className="absolute top-[72%] left-[28%] translate-x-[10px] translate-y-[30px] pointer-events-auto flex flex-col items-start z-20"
          onMouseEnter={() => setIsAiHovered(true)} onMouseLeave={() => setIsAiHovered(false)}>
          <div className="relative">
            {aiTag?.tag.hoverLayout === "fan-three-with-icons" && (
              <AnimatePresence>
                {isAiHovered && (
                  <motion.div initial={{ opacity: 0, scale: 0.8, x: -20, y: 15 }} animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20, y: 15 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-[calc(100%+20px)] right-[20px] pointer-events-none flex items-center justify-center h-[120px] w-[240px]">
                    {aiImages[0] && (
                      <motion.div initial={{ x: 0, rotate: 0, scale: 0.9 }} animate={{ x: -45, y: 6, rotate: -18, scale: 1 }}
                        exit={{ x: 0, rotate: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[90px] rounded-xl overflow-hidden shadow-md border border-neutral-200/50 bg-white origin-bottom-right z-10">
                        <HoverImage asset={aiImages[0]} alt="AI" />
                      </motion.div>
                    )}
                    {aiImages[1] && (
                      <motion.div initial={{ x: 0, rotate: 0, scale: 0.9 }} animate={{ x: 45, y: 4, rotate: 12, scale: 1 }}
                        exit={{ x: 0, rotate: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[90px] rounded-xl overflow-hidden shadow-md border border-neutral-200/50 bg-white origin-bottom-left z-10">
                        <HoverImage asset={aiImages[1]} alt="AI" />
                      </motion.div>
                    )}
                    {aiCenterImg && (
                      <motion.div initial={{ y: 5, rotate: 0, scale: 0.95 }} animate={{ y: -6, rotate: -3, scale: 1.05 }}
                        exit={{ y: 5, rotate: 0, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[95px] rounded-xl overflow-hidden shadow-lg border border-neutral-300/60 bg-white z-20">
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
            <motion.button onClick={() => openWindow("ai")} whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer font-['Helvetica',_sans-serif] font-normal text-[#373737] hover:text-blue-600 hover:underline underline-offset-4 decoration-2 decoration-blue-600 select-none text-2xl flex items-center gap-1 transition-all">
              <span>{aiTag?.tag.label}</span>
              {aiTag?.tag.hasSparkle && <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />}
            </motion.button>
          </div>
        </div>

        {/* MAC OS FOLDER */}
        <div className="absolute top-[42%] right-[22%] pointer-events-auto">
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[9px] font-mono tracking-widest text-neutral-400">{navigation.exploreCanvas}</span>
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="w-4 h-4 text-neutral-400" />
          </motion.div>
        </div>
      </div>

      {/* DRAGGABLE OS WINDOWS LAYER */}
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

      {/* MOBILE VIEW */}
      <div className="md:hidden flex flex-col h-full overflow-y-auto p-6 z-10 relative">
        <div className="pt-8 pb-6 border-b border-neutral-200/60 select-text">
          <h1 className="text-5xl font-sans tracking-tight text-neutral-800 leading-tight">
            {profile.heroPrefix}<span className="font-bold">{profile.name.first}</span>
          </h1>
          <p className="text-xl font-sans font-light text-neutral-500 mt-1">{profile.heroSubtitleMobile}</p>
          <p className="text-[10px] font-mono text-neutral-400 mt-2.5">{navigation.tagline}</p>
        </div>
        <div className="my-4 p-3 bg-neutral-100 rounded-lg flex items-center gap-2 text-[10px] font-mono text-neutral-500">
          <Info className="w-3.5 h-3.5 text-sky-500" />
          <span>{navigation.mobileTip}</span>
        </div>
        <div className="grid grid-cols-2 gap-3.5 py-4">
          <button onClick={() => openWindow("about")} className="p-4 bg-white border border-neutral-200 rounded-xl flex flex-col justify-between h-28 text-left hover:border-sky-500/40 transition-colors">
            <User className="w-5 h-5 text-sky-500" /><span className="text-xs font-bold text-neutral-800">{aboutTag?.tag.label}</span></button>
          <button onClick={() => openWindow("ds")} className="p-4 bg-white border border-neutral-200 rounded-xl flex flex-col justify-between h-28 text-left hover:border-sky-500/40 transition-colors">
            <Layers className="w-5 h-5 text-indigo-500" /><span className="text-xs font-bold text-neutral-800">{dsTag?.tag.label}</span></button>
          <button onClick={() => openWindow("hmi")} className="p-4 bg-white border border-neutral-200 rounded-xl flex flex-col justify-between h-28 text-left hover:border-sky-500/40 transition-colors">
            <Gauge className="w-5 h-5 text-emerald-500" /><span className="text-xs font-bold text-neutral-800">{hmiTag?.tag.label}</span></button>
          <button onClick={() => openWindow("ai")} className="p-4 bg-white border border-neutral-200 rounded-xl flex flex-col justify-between h-28 text-left hover:border-sky-500/40 transition-colors">
            <Cpu className="w-5 h-5 text-amber-500 animate-pulse" /><span className="text-xs font-bold text-neutral-800">{aiTag?.tag.label}</span></button>
        </div>
        <div className="py-8 flex flex-col items-center justify-center border-t border-neutral-200/60 mt-4 gap-4">
          <MacOSFolder onClick={() => openWindow("projects")}
            folderTitle={navigation.folderBadge === "WORKSPACE" ? "diqing_wu_projects" : navigation.folderHeading}
            folderInstruction={navigation.folderInstruction}
            folderBadge={navigation.folderBadge}
            peekCards={navigation.peekCards}
            github={profile.github}
          />
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-12">{navigation.workspaceGallery}</span>
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
                className="fixed inset-x-0 bottom-0 h-[85vh] bg-white rounded-t-2xl border-t border-neutral-300 shadow-2xl z-50 flex flex-col">
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
