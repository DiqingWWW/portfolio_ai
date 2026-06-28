"use client";

import type { NodeData, DesignSpec } from "@/types";
import { HoverWrapper } from "./HoverWrapper";

interface HeroNodeProps {
  data: NodeData;
  designSpec: DesignSpec;
}

export function HeroNode({ data, designSpec }: HeroNodeProps) {
  const { h1, body } = designSpec.typography;

  return (
    <HoverWrapper
      scale={designSpec.motion.hoverScale.node}
      duration={designSpec.motion.hoverDuration}
      easing={designSpec.motion.hoverEasing}
    >
      <div style={{ userSelect: "none", cursor: "default" }}>
        <h1
          style={{
            fontSize: h1.size,
            fontWeight: h1.weight,
            lineHeight: h1.lineHeight,
            color: designSpec.typography.baseColor,
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {data.label}
        </h1>
        {data.subtitle && (
          <p
            style={{
              fontSize: body.size + 2,
              fontWeight: body.weight,
              color: designSpec.typography.baseColor,
              opacity: 0.7,
              margin: "6px 0 0",
              whiteSpace: "nowrap",
            }}
          >
            {data.subtitle}
          </p>
        )}
      </div>
    </HoverWrapper>
  );
}
