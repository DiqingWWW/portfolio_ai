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
      className={`absolute ${width} ${height} flex flex-col bg-white/95 backdrop-blur-md rounded-xl border border-neutral-200 shadow-2xl overflow-hidden focus:outline-none pointer-events-auto`}
      data-component="FloatingWindow"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/80 border-b border-neutral-200 select-none cursor-grab active:cursor-grabbing">
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

        {/* Title */}
        <div className="text-xs font-mono tracking-wider text-neutral-500 font-medium">
          {title}
        </div>

        {/* Small UI detail */}
        <div className="w-6 h-1 bg-neutral-200 rounded-full" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 text-[#373737] select-text">
        {children}
      </div>
    </motion.div>
  );
}
