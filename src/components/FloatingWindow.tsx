"use client";

import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

interface FloatingWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
  defaultPosition: { x: number; y: number };
  width?: string;
  height?: string;
  children: React.ReactNode;
}

export default function FloatingWindow({
  id,
  title,
  isOpen,
  onClose,
  zIndex,
  onFocus,
  defaultPosition,
  width = "max-w-xl w-full",
  height = "max-h-[80vh]",
  children,
}: FloatingWindowProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: defaultPosition.y + 15, x: defaultPosition.x }}
      animate={{ scale: 1, opacity: 1, y: defaultPosition.y, x: defaultPosition.x }}
      exit={{ scale: 0.94, opacity: 0, y: defaultPosition.y + 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      style={{ zIndex }}
      onPointerDown={onFocus}
      drag
      dragMomentum={false}
      dragElastic={0.05}
      className={`absolute ${width} ${height} flex flex-col bg-white rounded-xl border border-workspace-border/80 shadow-2xl overflow-hidden focus:outline-none pointer-events-auto`}
      data-component="FloatingWindow"
    >
      {/* Title Bar styled like OS window chrome */}
      <div className="window-drag-handle flex items-center justify-between px-4 py-3 bg-workspace-bg border-b border-workspace-border/60 select-none cursor-grab active:cursor-grabbing">
        {/* Mock OS Window Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            id={`btn-close-${id}`}
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/90 flex items-center justify-center group transition-colors"
          >
            <X className="w-2 h-2 text-red-950 opacity-0 group-hover:opacity-80 transition-opacity" />
          </button>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center" />
        </div>

        {/* Title styled as slide deck metadata */}
        <div className="text-[10px] font-mono tracking-widest text-workspace-muted font-bold uppercase">
          WORKSPACE // {title.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ")}
        </div>

        {/* Small UI detail resembling a page tab */}
        <div className="text-[9px] font-mono text-workspace-muted/30 font-medium">
          PAGE.LOG
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 text-workspace-text select-text bg-white">
        {children}
      </div>
    </motion.div>
  );
}
