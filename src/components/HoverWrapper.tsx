"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

function parseCubicBezier(
  css?: string
): [number, number, number, number] | undefined {
  if (!css) return undefined;
  const match = css.match(/cubic-bezier\(([^)]+)\)/);
  if (!match) return undefined;
  const values = match[1].split(",").map(Number);
  return values.length === 4
    ? (values as [number, number, number, number])
    : undefined;
}

interface HoverWrapperProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  easing?: string;
  className?: string;
  shadow?: boolean;
  lift?: number;
}

export function HoverWrapper({
  children,
  scale = 1.03,
  duration = 280,
  easing,
  className,
  shadow = false,
  lift = 0,
}: HoverWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1, y: 0 }}
      whileHover={{
        scale,
        y: lift ? -Math.abs(lift) : 0,
        boxShadow: shadow
          ? "0 8px 30px rgba(0,0,0,0.08)"
          : "0 0px 0px rgba(0,0,0,0)",
      }}
      transition={{
        duration: duration / 1000,
        ease: parseCubicBezier(easing),
      }}
      style={{ cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
}
