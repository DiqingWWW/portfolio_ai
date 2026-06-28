"use client";

import type { NodeData, DesignSpec } from "@/types";
import { HoverWrapper } from "./HoverWrapper";

interface CardNodeProps {
  data: NodeData;
  designSpec: DesignSpec;
}

export function CardNode({ data, designSpec }: CardNodeProps) {
  const w = data.size;

  return (
    <HoverWrapper
      scale={designSpec.motion.hoverScale.node}
      duration={designSpec.motion.hoverDuration}
      easing={designSpec.motion.hoverEasing}
      shadow
      lift={2}
    >
      <div
        style={{
          width: w,
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(55, 55, 55, 0.06)",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          overflow: "hidden",
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        {/* GitHub header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 12px",
            borderBottom: "1px solid rgba(55,55,55,0.06)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#373737">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#373737" }}>
            {data.label}
          </span>
        </div>

        {/* Banner */}
        <div
          style={{
            height: 50,
            background: "linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 100%)",
            position: "relative",
          }}
        />

        {/* Avatar + info */}
        <div style={{ padding: "0 12px 12px", position: "relative" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#C8C8C8",
              border: "2px solid #FFFFFF",
              marginTop: -20,
              marginBottom: 6,
            }}
          />
          <div style={{ fontSize: 14, fontWeight: 600, color: "#373737" }}>
            Doethin
          </div>
          <div style={{ fontSize: 11, color: "#373737", opacity: 0.45, marginBottom: 4 }}>
            @Doethin0201
          </div>
          <div
            style={{
              fontSize: 11,
              color: designSpec.typography.baseColor,
              opacity: 0.6,
              lineHeight: 1.3,
            }}
          >
            Product Designer+AI learner/builder
          </div>
        </div>
      </div>
    </HoverWrapper>
  );
}
