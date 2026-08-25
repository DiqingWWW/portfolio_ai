"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Sparkles, ArrowDown, RotateCcw, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import FloatingWindow from "@/components/FloatingWindow";
import MacOSFolder from "@/components/MacOSFolder";
import AboutMeContent from "@/components/AboutMeContent";
import RealProjectsContent from "@/components/RealProjectsContent";
import WorkSection from "@/components/WorkSection";
import LandingFooter from "@/components/LandingFooter";
import LoadingIntro from "@/components/LoadingIntro";
import FolderContent from "@/components/FolderContent";
import HoverImage from "@/components/Hover/HoverImage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  getProjectAssets,
  projects as baseProjects,
  nodes,
} from "@/lib/content";
import { getDictionary, getLocalizedSiteContent, type Locale } from "@/i18n/dictionary";
import type { FolderProject, ProjectData } from "@/types/content";

// Map ProjectData[] to FolderProject[] for the folder window
function toFolderProjects(projects: ProjectData[]): FolderProject[] {
  return projects.map((p, i) => ({
    id: p.id,
    num: String(i + 1).padStart(2, "0"),
    title: p.title,
    type: p.metadata.type,
    desc: p.descriptions.short,
    detail: p.descriptions.detail,
    tokens: p.tokens,
    specs: p.specs,
    detailHref: p.detailHref,
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

export function PortfolioHome({ locale = "en" }: { locale?: Locale }) {
  const pageRef = useRef<HTMLElement>(null);
  const workspaceRef = useRef<HTMLElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const openerRefs = useRef<Record<string, HTMLElement | null>>({});
  const dictionary = getDictionary(locale);
  const { profile, navigation, tags, projects } = getLocalizedSiteContent(locale, baseProjects);
  const tagIndex = tags.map((tag) => ({ tag, projects: projects.filter((project) => project.tags.includes(tag.id)) }));
  const dsTag = tagIndex.find((t) => t.tag.id === "design-system");
  const aboutTag = tagIndex.find((t) => t.tag.id === "about-me");
  const hmiTag = tagIndex.find((t) => t.tag.id === "hmi");
  const aiTag = tagIndex.find((t) => t.tag.id === "ai-related");

  const dsProjects = projects.filter((project) => project.tags.includes("design-system"));
  const hmiProjects = projects.filter((project) => project.tags.includes("hmi"));
  const aiProjects = projects.filter((project) => project.tags.includes("ai-related"));
  const folderProjects = toFolderProjects(projects);
  const capabilityCopy = locale === "zh" ? {
    ds: ["设计系统与交互规则", "关于可扩展基础、可复用组件、输入规则和跨平台一致性的专业项目。"],
    hmi: ["汽车 HMI", "座舱交互、多模态反馈、区域适配与车载系统设计的专业项目证据。"],
    ai: ["AI 辅助产品构建", "通过真实独立项目呈现视觉探索、跨工具交接、diff sync 与产品治理。"],
  } : {
    ds: ["Design systems and interaction rules", "Professional work on scalable foundations, reusable components, input rules, and cross-platform consistency."],
    hmi: ["Automotive HMI", "Professional evidence across cockpit interaction, multimodal feedback, regional adaptation, and vehicle-system design."],
    ai: ["AI-assisted product building", "A real independent project showing visual exploration, cross-tool handoffs, diff sync, and product governance."],
  };

  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    about: false, ds: false, hmi: false, ai: false, projects: false,
  });
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({
    about: 10, ds: 10, hmi: 10, ai: 10, projects: 10,
  });
  const [topZIndex, setTopZIndex] = useState<number>(10);
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const focusWindow = useCallback((id: string) => {
    setTopZIndex((currentTop) => {
      const nextZ = currentTop + 1;
      setWindowZIndices((prev) => ({ ...prev, [id]: nextZ }));
      return nextZ;
    });
  }, []);

  const openWindow = useCallback((id: string) => {
    openerRefs.current[id] = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setOpenWindows((prev) => isMobile
      ? Object.fromEntries(Object.keys(prev).map((key) => [key, key === id]))
      : { ...prev, [id]: true });
    focusWindow(id);
  }, [focusWindow]);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
    window.setTimeout(() => openerRefs.current[id]?.focus(), 0);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mobileQuery.matches);
    updateViewport();
    mobileQuery.addEventListener("change", updateViewport);
    return () => mobileQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const topWindow = Object.keys(openWindows)
        .filter((id) => openWindows[id])
        .sort((a, b) => windowZIndices[b] - windowZIndices[a])[0];
      if (topWindow) closeWindow(topWindow);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeWindow, openWindows, windowZIndices]);

  const resetWindows = () => {
    setLayoutVersion((version) => version + 1);
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
  const activeMobileWindowId = isMobileViewport
    ? Object.keys(openWindows).find((id) => openWindows[id]) ?? null
    : null;

  useEffect(() => {
    if (!activeMobileWindowId) return;
    const previousOverflow = document.body.style.overflow;
    const page = pageRef.current;
    const previousAriaHidden = page?.getAttribute("aria-hidden");
    document.body.style.overflow = "hidden";
    if (page) {
      page.inert = true;
      page.setAttribute("aria-hidden", "true");
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      if (page) {
        page.inert = false;
        if (previousAriaHidden == null) page.removeAttribute("aria-hidden");
        else page.setAttribute("aria-hidden", previousAriaHidden);
      }
    };
  }, [activeMobileWindowId]);

  const trapMobileDialogFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusableElements = mobileDialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusableElements?.length) return;
    const first = focusableElements[0]!;
    const last = focusableElements[focusableElements.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const getMobileWindowContent = (id: string) => {
    if (id === "about") return { title: aboutTag?.tag.windowTitle ?? "", content: <AboutMeContent profile={profile} /> };
    if (id === "ds") return { title: dsTag?.tag.windowTitle ?? "", content: <RealProjectsContent heading={capabilityCopy.ds[0]} intro={capabilityCopy.ds[1]} projects={dsProjects} labels={dictionary.shared} /> };
    if (id === "hmi") return { title: hmiTag?.tag.windowTitle ?? "", content: <RealProjectsContent heading={capabilityCopy.hmi[0]} intro={capabilityCopy.hmi[1]} projects={hmiProjects} labels={dictionary.shared} /> };
    if (id === "ai") return { title: aiTag?.tag.windowTitle ?? "", content: <RealProjectsContent heading={capabilityCopy.ai[0]} intro={capabilityCopy.ai[1]} projects={aiProjects} labels={dictionary.shared} /> };
    return {
      title: "diqing_wu_projects/",
      content: <FolderContent heading={navigation.folderHeading} description={navigation.folderDescription}
        backButton={navigation.folderBackButton} designTokensLabel={navigation.folderDesignTokensLabel}
        projects={folderProjects} experiments={navigation.experiments} labels={dictionary.shared} />,
    };
  };
  const activeMobileWindow = activeMobileWindowId ? getMobileWindowContent(activeMobileWindowId) : null;

  return (
    <main ref={pageRef} data-component="Page" className="relative min-h-screen w-full overflow-x-clip bg-workspace-bg text-workspace-text font-sans">
      <LoadingIntro locale={locale} />
      <section id="skills" ref={workspaceRef} className="relative w-full overflow-visible bg-workspace-bg md:h-screen md:overflow-hidden">
      {/* Figma-like Canvas Substrate Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-80 z-0" />

      {/* ---- HEADER BAR ---- */}
      <div className="absolute top-0 inset-x-0 flex h-11 items-center justify-between gap-3 overflow-hidden border-b border-workspace-border/50 bg-workspace-bg/95 px-5 text-[10px] font-mono uppercase tracking-widest text-workspace-muted backdrop-blur-sm z-30 select-none sm:px-10 sm:text-[11px] md:h-auto md:min-h-14 md:items-start md:gap-6 md:py-3 md:bg-workspace-bg/80">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden leading-4 md:max-w-[calc(100%-5rem)] md:items-start md:overflow-visible">
          <span className="h-2 w-2 shrink-0 rounded-full bg-workspace-accent animate-pulse md:mt-1" />
          <div className="mobile-header-marquee min-w-0 overflow-hidden md:overflow-visible">
            <div className="mobile-header-marquee-track flex w-max whitespace-nowrap md:block md:w-auto md:whitespace-normal">
              <span>{siteConfig.header.left}</span>
              <span className="pl-10 md:hidden" aria-hidden="true">{locale === "zh" ? "作品集工作台" : siteConfig.header.left}</span>
            </div>
          </div>
        </div>
        <div className="shrink-0 md:pt-0.5">{siteConfig.header.year}</div>
      </div>

      {/* ---- GIANT WATERMARK ---- */}
      <div className="absolute pointer-events-none select-none z-0 text-center w-full" style={{ top: nodes.watermark.y, left: "50%", transform: "translateX(-50%)" }}>
        <h1 className="workspace-watermark text-[12vw] font-sans uppercase leading-none">
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
          <div className="text-xs font-extrabold leading-snug tracking-tight text-workspace-text md:text-sm lg:text-base xl:text-lg font-sans">
            {profile.brandingStatement}
          </div>
          <div className="h-0.5 w-8 lg:w-12 bg-workspace-accent" />
          <p className="text-[10px] lg:text-xs text-workspace-muted font-mono leading-relaxed">
            {profile.brandingDescription}
          </p>
          <a href="#work" className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-workspace-text px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-workspace-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
            {navigation.viewSelectedWork}<ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Right-side Name Accent Block */}
        <div
          className="absolute text-right select-text z-20 pointer-events-auto block w-[35%] min-w-[180px]"
          style={{ top: nodes.nameBlock.y, right: "4%" }}
        >
          <div className="text-2xl font-extrabold tracking-tight leading-none text-workspace-text md:text-3xl xl:text-4xl font-sans whitespace-nowrap">
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
            {isHmiHovered && hmiTag?.tag.hoverSummary && (
              <motion.div
                key="hmi-stats-popup"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[11px] text-workspace-muted mt-3.5 tracking-wide flex flex-col gap-1.5 w-56 sm:w-64 md:w-72 lg:w-80 pointer-events-none whitespace-normal select-none bg-white/95 backdrop-blur-sm p-3.5 border border-workspace-border/80 rounded-xl shadow-md animate-fade-in z-30"
              >
                {hmiTag.tag.hoverSummary.map((line) => <div key={line}>- {line}</div>)}
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
              {isAiHovered && aiTag?.tag.hoverSummary && (
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
                  {(aiTag.tag.hoverSummary ?? []).map((line) => <div key={line}>- {line}</div>)}
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
            locale={locale}
          />
        </div>

        {/* DOWN ARROW */}
        <a href="#work" className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 rounded-lg px-4 py-2 text-workspace-muted transition-colors hover:text-workspace-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
          <span className="text-[10px] font-mono tracking-wider">{navigation.exploreCanvas}</span>
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </motion.div>
        </a>
      </div>

      {/* ---- FOOTER BAR ---- */}
      <div className="absolute bottom-0 inset-x-0 h-12 border-t border-workspace-border/50 hidden md:flex justify-between items-center px-10 text-[10px] font-mono tracking-wider text-workspace-muted bg-workspace-bg/80 backdrop-blur-sm z-30 select-none">
        <div>{navigation.footerLeft}</div>
        <div className="flex items-center gap-4">
          {Object.values(openWindows).some(Boolean) && (
            <button type="button" onClick={resetWindows} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-bold text-workspace-muted transition-colors hover:bg-white hover:text-workspace-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />{navigation.resetWindows}
            </button>
          )}
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
          <FloatingWindow key={`about-${layoutVersion}`} id="about" title={aboutTag?.tag.windowTitle ?? ""} isOpen={openWindows.about}
            onClose={() => closeWindow("about")} zIndex={windowZIndices.about} onFocus={() => focusWindow("about")}
            isActive={windowZIndices.about === topZIndex} constraintsRef={workspaceRef}
            defaultPosition={DEFAULT_POSITIONS.about}>
            <AboutMeContent profile={profile} />
          </FloatingWindow>
          <FloatingWindow key={`ds-${layoutVersion}`} id="ds" title={dsTag?.tag.windowTitle ?? ""} isOpen={openWindows.ds}
            onClose={() => closeWindow("ds")} zIndex={windowZIndices.ds} onFocus={() => focusWindow("ds")}
            isActive={windowZIndices.ds === topZIndex} constraintsRef={workspaceRef}
            defaultPosition={DEFAULT_POSITIONS.ds} width="max-w-2xl w-full">
            <RealProjectsContent heading={capabilityCopy.ds[0]} intro={capabilityCopy.ds[1]} projects={dsProjects} labels={dictionary.shared} />
          </FloatingWindow>
          <FloatingWindow key={`hmi-${layoutVersion}`} id="hmi" title={hmiTag?.tag.windowTitle ?? ""} isOpen={openWindows.hmi}
            onClose={() => closeWindow("hmi")} zIndex={windowZIndices.hmi} onFocus={() => focusWindow("hmi")}
            isActive={windowZIndices.hmi === topZIndex} constraintsRef={workspaceRef}
            defaultPosition={DEFAULT_POSITIONS.hmi}>
            <RealProjectsContent heading={capabilityCopy.hmi[0]} intro={capabilityCopy.hmi[1]} projects={hmiProjects} labels={dictionary.shared} />
          </FloatingWindow>
          <FloatingWindow key={`ai-${layoutVersion}`} id="ai" title={aiTag?.tag.windowTitle ?? ""} isOpen={openWindows.ai}
            onClose={() => closeWindow("ai")} zIndex={windowZIndices.ai} onFocus={() => focusWindow("ai")}
            isActive={windowZIndices.ai === topZIndex} constraintsRef={workspaceRef}
            defaultPosition={DEFAULT_POSITIONS.ai}>
            <RealProjectsContent heading={capabilityCopy.ai[0]} intro={capabilityCopy.ai[1]} projects={aiProjects} labels={dictionary.shared} />
          </FloatingWindow>
          <FloatingWindow key={`projects-${layoutVersion}`} id="projects" title="diqing_wu_projects/" isOpen={openWindows.projects}
            onClose={() => closeWindow("projects")} zIndex={windowZIndices.projects} onFocus={() => focusWindow("projects")}
            isActive={windowZIndices.projects === topZIndex} constraintsRef={workspaceRef}
            defaultPosition={DEFAULT_POSITIONS.projects}>
            <FolderContent
              heading={navigation.folderHeading}
              description={navigation.folderDescription}
              backButton={navigation.folderBackButton}
              designTokensLabel={navigation.folderDesignTokensLabel}
              projects={folderProjects}
              experiments={navigation.experiments}
              labels={dictionary.shared}
            />
          </FloatingWindow>
        </AnimatePresence>
      </div>

      {/* ------------------------------------ */}
      {/* MOBILE CANVAS & ADAPTIVE VIEW        */}
      {/* ------------------------------------ */}
      <div className="md:hidden relative z-10 flex flex-col overflow-visible px-6 pb-0 pt-14">
        <div className="mt-[60px] flex h-[290px] items-start justify-center">
          <div className="origin-top scale-90">
            <MacOSFolder onClick={() => openWindow("projects")}
              folderTitle={navigation.folderBadge === "WORKSPACE" ? "diqing_wu_projects" : navigation.folderHeading}
              folderInstruction={navigation.folderInstruction}
              folderBadge={navigation.folderBadge}
              peekCards={navigation.peekCards}
              github={profile.github}
              locale={locale}
            />
          </div>
        </div>
        <div className="mt-8 pb-7 select-text">
          <h1 className="page-heading-1 font-sans text-workspace-text">
            {profile.heroPrefix}<span className="font-bold">{profile.name.first}</span>
          </h1>
          <p className="mt-1 text-xl font-light text-workspace-muted">{profile.heroSubtitleMobile}</p>
          <p className="mt-2.5 text-[10px] font-mono text-workspace-muted">{navigation.tagline}</p>
          <a href="#work" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-workspace-text px-4 py-2.5 text-xs font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
            {navigation.viewSelectedWork}<ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
      </section>
      <nav aria-label={navigation.exploreCapabilities} className="sticky top-0 z-40 bg-workspace-bg/95 px-5 backdrop-blur-sm md:hidden">
        <div className="mx-auto flex max-w-full items-center gap-5 overflow-x-auto">
          {[
            { id: "about", label: aboutTag?.tag.label },
            { id: "ds", label: dsTag?.tag.label },
            { id: "hmi", label: hmiTag?.tag.label },
            { id: "ai", label: aiTag?.tag.label },
          ].map((item) => (
            <button key={item.id} type="button" onClick={() => { setSelectedCapability(item.id); openWindow(item.id); }}
              aria-pressed={selectedCapability === item.id}
              className={`relative min-h-11 shrink-0 px-0.5 text-sm font-normal whitespace-nowrap text-workspace-text transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-workspace-text after:transition-transform hover:text-workspace-accent focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-workspace-accent ${selectedCapability === item.id ? "after:scale-x-100" : "after:scale-x-0"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <WorkSection projects={projects} locale={locale} />
      <LandingFooter content={navigation.landingFooter} locale={locale} />
      <div className="fixed right-4 top-14 z-50 rounded-xl border border-workspace-border bg-workspace-bg/95 shadow-sm backdrop-blur-sm md:right-8 md:top-3">
        <LanguageSwitcher locale={locale} label={dictionary.shared.languageName} />
      </div>
      {isMobileViewport && createPortal(
        <AnimatePresence>
          {activeMobileWindowId && activeMobileWindow && (
              <motion.div key="mobile-window-overlay" className="fixed inset-0 z-[100] md:hidden"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button type="button" className="absolute inset-0 h-full w-full bg-neutral-950/20"
                  aria-label={`${navigation.closeButton} ${activeMobileWindow.title}`} onClick={() => closeWindow(activeMobileWindowId)} />
                <motion.div ref={mobileDialogRef} role="dialog" aria-modal="true" aria-label={activeMobileWindow.title}
                  initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                  transition={shouldReduceMotion ? { duration: 0.01 } : { type: "spring", damping: 28, stiffness: 260 }}
                  onKeyDown={trapMobileDialogFocus}
                  onClick={(event) => event.stopPropagation()}
                  className="fixed inset-x-0 bottom-0 flex h-[85dvh] flex-col overflow-hidden rounded-t-2xl border-t border-workspace-border bg-white shadow-2xl">
                  <div className="flex h-12 shrink-0 items-center justify-between border-b border-neutral-100 bg-neutral-50 px-4 rounded-t-2xl">
                    <span className="min-w-0 truncate pr-4 text-[10px] font-mono font-bold text-neutral-500">{activeMobileWindow.title}</span>
                    <button type="button" autoFocus onClick={() => closeWindow(activeMobileWindowId)} aria-label={`${navigation.closeButton} ${activeMobileWindow.title}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-workspace-accent">
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto overscroll-contain p-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]">{activeMobileWindow.content}</div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </main>
  );
}

export default function Home() {
  return <PortfolioHome locale="en" />;
}
