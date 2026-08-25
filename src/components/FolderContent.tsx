"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Folder, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { FolderProject } from "@/types/content";

interface FolderContentProps {
  heading: string;
  description: string;
  backButton: string;
  designTokensLabel: string;
  projects: FolderProject[];
  experiments: {
    label: string;
    description: string;
    href: string;
  };
  labels: { separateCollection: string; projectPrefix: string; viewProject: string };
}

export default function FolderContent({
  heading,
  description,
  backButton,
  designTokensLabel,
  projects,
  experiments,
  labels,
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
                <motion.button type="button" key={proj.id} whileHover={{ scale: 1.015, x: 4 }}
                  onClick={() => setSelectedProject(proj)} id={`btn-project-${proj.id}`}
                  className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-neutral-200/60 bg-neutral-50 p-4 text-left transition-colors hover:border-neutral-300 hover:bg-neutral-100/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-sky-500 font-bold">{proj.num}</span>
                      <h3 className="text-sm font-bold text-neutral-800 leading-tight">{proj.title}</h3>
                    </div>
                    {proj.type && <span className="block text-[10px] font-mono text-neutral-400 uppercase">{proj.type}</span>}
                    {proj.desc && <p className="text-xs text-neutral-600 line-clamp-1 mt-1 leading-normal max-w-md">{proj.desc}</p>}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:text-neutral-800 group-hover:border-neutral-300 transition-colors shadow-sm">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </motion.button>
              ))}
            </div>
            <Link
              href={experiments.href}
              className="group flex items-center justify-between rounded-xl border border-dashed border-amber-300 bg-amber-50/50 p-4 transition-colors hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-700">{labels.separateCollection}</span>
                <h3 className="mt-1 text-sm font-bold text-neutral-800">{experiments.label}</h3>
                <p className="mt-1 max-w-md text-xs leading-5 text-neutral-500">{experiments.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-amber-700 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-5">
            <button onClick={() => setSelectedProject(null)} id="btn-back-to-projects"
              className="px-2.5 py-1.5 border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-600 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all">
              <ChevronLeft className="w-3.5 h-3.5" />{backButton}
            </button>
            <div className="space-y-1.5 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-500 font-bold">{labels.projectPrefix}_{selectedProject.num}</span>
                <h2 className="text-lg font-black text-neutral-800">{selectedProject.title}</h2>
              </div>
              {selectedProject.type && <p className="text-xs font-mono text-neutral-400 uppercase">{selectedProject.type}</p>}
            </div>
            {selectedProject.detail && <p className="text-xs text-neutral-600 leading-relaxed">{selectedProject.detail}</p>}
            {selectedProject.specs.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedProject.specs.map((s, idx) => (
                <div key={idx} className="p-3 bg-neutral-50 border border-neutral-200/60 rounded-xl space-y-1">
                  <span className="block text-[8px] font-mono text-neutral-400 uppercase leading-none">{s.label}</span>
                  <span className="block text-[11px] font-bold text-neutral-700 font-mono truncate">{s.val}</span>
                </div>
              ))}
            </div>}
            {selectedProject.tokens.length > 0 && <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-400">{designTokensLabel}</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tokens.map((tok) => (
                  <span key={tok} className="px-2 py-1 bg-sky-50 text-sky-700 border border-sky-100 rounded-md font-mono text-[9px]">{tok}</span>
                ))}
              </div>
            </div>}
            {selectedProject.detailHref && (
              <Link
                href={selectedProject.detailHref}
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                {labels.viewProject} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
