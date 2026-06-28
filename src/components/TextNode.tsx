"use client";

import type { NodeData, DesignSpec } from "@/types";
import { HoverWrapper } from "./HoverWrapper";

interface TextNodeProps {
  data: NodeData;
  designSpec: DesignSpec;
}

function SparkleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ marginLeft: 4, display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M8 0L9.4 5.2L14.6 4L10.4 7.6L14 12L9 9.6L8 16L7 9.6L2 12L5.6 7.6L1.4 4L6.6 5.2L8 0Z"
        fill="#373737"
        fillOpacity={0.7}
      />
    </svg>
  );
}

export function TextNode({ data, designSpec }: TextNodeProps) {
  const typo = designSpec.typography.h2;

  return (
    <HoverWrapper
      scale={designSpec.motion.hoverScale.node}
      duration={designSpec.motion.hoverDuration}
      easing={designSpec.motion.hoverEasing}
    >
      <span
        style={{
          fontSize: typo.size,
          fontWeight: typo.weight,
          color: designSpec.typography.baseColor,
          whiteSpace: "nowrap",
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        {data.label}
        {data.icon === "sparkle" && <SparkleIcon />}
      </span>
    </HoverWrapper>
  );
}
