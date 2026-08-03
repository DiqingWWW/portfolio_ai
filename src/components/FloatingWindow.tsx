"use client";

import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

interface FloatingWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
  isActive: boolean;
  constraintsRef: React.RefObject<HTMLElement | null>;
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
  isActive,
  constraintsRef,
  defaultPosition,
  width = "max-w-xl w-full",
  height = "max-h-[80vh]",
  children,
}: FloatingWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) windowRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.92, opacity: 0, y: defaultPosition.y + 15, x: defaultPosition.x }}
      animate={{ scale: 1, opacity: 1, y: defaultPosition.y, x: defaultPosition.x }}
      exit={{ scale: 0.94, opacity: 0, y: defaultPosition.y + 10 }}
      transition={shouldReduceMotion ? { duration: 0.01 } : { type: "spring", damping: 25, stiffness: 300 }}
      style={{ zIndex }}
      onPointerDown={onFocus}
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0.05}
      role="dialog"
      aria-label={title}
      aria-modal="false"
      tabIndex={-1}
      className={`absolute ${width} ${height} flex flex-col overflow-hidden rounded-xl border border-workspace-border/80 bg-white shadow-2xl focus:outline-none pointer-events-auto`}
      data-component="FloatingWindow"
    >
      {/* Title Bar styled like OS window chrome */}
      <div className="window-drag-handle flex items-center justify-between px-4 py-3 bg-workspace-bg border-b border-workspace-border/60 select-none cursor-grab active:cursor-grabbing">
        {/* Mock OS Window Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            id={`btn-close-${id}`}
            aria-label={`Close ${title}`}
            className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56] after:absolute after:left-1/2 after:top-1/2 after:h-11 after:w-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-workspace-accent"
          >
            <X className="h-2 w-2 text-red-950 opacity-0 transition-opacity group-hover:opacity-80 group-focus-visible:opacity-80" aria-hidden="true" />
          </button>
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
        </div>

        {/* Title styled as slide deck metadata */}
        <div className={`text-[10px] font-mono tracking-widest font-bold uppercase ${isActive ? "text-workspace-muted" : "text-workspace-muted/60"}`}>
          {title.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ")}
        </div>

        {/* Small UI detail resembling a page tab */}
        <div className="w-11" aria-hidden="true" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 text-workspace-text select-text bg-white">
        {children}
      </div>
    </motion.div>
  );
}
