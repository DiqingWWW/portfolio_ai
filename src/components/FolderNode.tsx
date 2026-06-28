"use client";

import { useState } from "react";
import type { NodeData, DesignSpec } from "@/types";
import { HoverWrapper } from "./HoverWrapper";

interface FolderNodeProps {
  data: NodeData;
  designSpec: DesignSpec;
}

export function FolderNode({ data, designSpec }: FolderNodeProps) {
  const [, setExpanded] = useState(false);
  const w = data.size;
  const h = data.size * 0.82;

  return (
    <HoverWrapper
      scale={designSpec.motion.hoverScale.folder}
      duration={designSpec.motion.hoverDuration}
      easing={designSpec.motion.hoverEasing}
      shadow
      lift={6}
    >
      <div
        onClick={() => setExpanded((prev) => !prev)}
        style={{ width: w, height: h, position: "relative", userSelect: "none", cursor: "pointer" }}
      >
        <svg
          width={w}
          height={h}
          viewBox="0 0 260 213"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.10))" }}
        >
          <defs>
            <linearGradient id="folderBack" x1="130" y1="0" x2="130" y2="213" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8BC4F6" />
              <stop offset="1" stopColor="#5BA3E6" />
            </linearGradient>
            <linearGradient id="folderFront" x1="130" y1="50" x2="130" y2="213" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#6DC2F7" />
              <stop offset="1" stopColor="#4A9DE8" />
            </linearGradient>
            <linearGradient id="folderTab" x1="80" y1="0" x2="80" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#9DD0F9" />
              <stop offset="1" stopColor="#7FBEF2" />
            </linearGradient>
          </defs>

          {/* Back panel */}
          <rect x="15" y="30" width="230" height="183" rx="16" fill="url(#folderBack)" />

          {/* Tab */}
          <path
            d="M30 30V18C30 8.059 38.059 0 48 0H100C106 0 111.5 3 115 8L128 28C129 29.5 130 30 132 30H30Z"
            fill="url(#folderTab)"
          />

          {/* Front panel */}
          <rect x="0" y="55" width="260" height="158" rx="16" fill="url(#folderFront)" />

          {/* Highlight line on front panel */}
          <rect x="20" y="65" width="220" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
        </svg>
      </div>
    </HoverWrapper>
  );
}
