"use client";

import { useEffect, useState } from "react";
import type { NodesFile, DesignSpec } from "@/types";
import { Node } from "./Node";

interface CanvasProps {
  nodesData: NodesFile;
  designSpec: DesignSpec;
}

export function Canvas({ nodesData, designSpec }: CanvasProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function updateScale() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cw = nodesData.canvas.width;
      const ch = nodesData.canvas.height;
      const s = Math.min(vw / cw, vh / ch);
      setScale(s);
      setOffset({
        x: (vw - cw * s) / 2,
        y: (vh - ch * s) / 2,
      });
      setMounted(true);
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [nodesData.canvas]);

  return (
    <div
      className={designSpec.layout.gridVisible ? "canvas-grid" : undefined}
      style={{
        width: nodesData.canvas.width,
        height: nodesData.canvas.height,
        backgroundColor: nodesData.canvas.background,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        position: "fixed",
        left: offset.x,
        top: offset.y,
        opacity: mounted ? 1 : 0,
        transition: "opacity 300ms ease",
      }}
    >
      {nodesData.nodes.map((node) => (
        <Node key={node.id} data={node} designSpec={designSpec} />
      ))}

      {/* Scroll hint arrow */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.3,
        }}
      >
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
          <path
            d="M2 2L12 12L22 2"
            stroke="#373737"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
