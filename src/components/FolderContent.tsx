"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Folder, ArrowRight, ChevronLeft } from "lucide-react";
import type { FolderProject } from "@/types/content";

interface FolderContentProps {
  heading: string;
  description: string;
  backButton: string;
  designTokensLabel: string;
  projects: FolderProject[];
}

export default function FolderContent({
  heading,
  description,
  backButton,
  designTokensLabel,
  projects,
}: FolderContentProps) {
  const [selectedProject, setSelectedProject] = useState<FolderProject | null>(null);

  return (
    <div className="select-text h-full flex flex-col justify-between" data-component="FolderContent">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="space-y-1 border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2 text-neutral-800">
                <Folder className="w-5 h-5 text-sky-500" />
                <h2 className="text-base font-bold tracking-tight">{heading}</h2>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
            </div>
            <div className="space-y-3.5">
              {projects.map((proj) => (
                <motion.div key={proj.id} whileHover={{ scale: 1.015, x: 4 }}
                  onClick={() => setSelectedProject(proj)} id={`btn-project-${proj.id}`}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100/50 border border-neutral-200/60 hover:border-neutral-300 rounded-xl cursor-pointer flex justify-between items-center group transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-sky-500 font-bold">{proj.num}</span>
                      <h3 className="text-sm font-bold text-neutral-800 leading-tight">{proj.title}</h3>
                    </div>
                    <span className="block text-[10px] font-mono text-neutral-400 uppercase">{proj.type}</span>
                    <p className="text-xs text-neutral-600 line-clamp-1 mt-1 leading-normal max-w-md">{proj.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:text-neutral-800 group-hover:border-neutral-300 transition-colors shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5">
            <button onClick={() => setSelectedProject(null)} id="btn-back-to-projects"
              className="px-2.5 py-1.5 border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-600 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all">
              <ChevronLeft className="w-3.5 h-3.5" />{backButton}
            </button>
            <div className="space-y-1.5 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-500 font-bold">PROJECT_{selectedProject.num}</span>
                <h2 className="text-lg font-black text-neutral-800">{selectedProject.title}</h2>
              </div>
              <p className="text-xs font-mono text-neutral-400 uppercase">{selectedProject.type}</p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">{selectedProject.detail}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedProject.specs.map((s, idx) => (
                <div key={idx} className="p-3 bg-neutral-50 border border-neutral-200/60 rounded-xl space-y-1">
                  <span className="block text-[8px] font-mono text-neutral-400 uppercase leading-none">{s.label}</span>
                  <span className="block text-[11px] font-bold text-neutral-700 font-mono truncate">{s.val}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-400">{designTokensLabel}</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tokens.map((tok) => (
                  <span key={tok} className="px-2 py-1 bg-sky-50 text-sky-700 border border-sky-100 rounded-md font-mono text-[9px]">{tok}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
