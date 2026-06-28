"use client";

import type { NodeData, DesignSpec } from "@/types";
import { TextNode } from "./TextNode";
import { FolderNode } from "./FolderNode";
import { CardNode } from "./CardNode";
import { HeroNode } from "./HeroNode";

interface NodeProps {
  data: NodeData;
  designSpec: DesignSpec;
}

export function Node({ data, designSpec }: NodeProps) {
  let content: React.ReactNode;

  switch (data.type) {
    case "text":
      content = <TextNode data={data} designSpec={designSpec} />;
      break;
    case "folder":
      content = <FolderNode data={data} designSpec={designSpec} />;
      break;
    case "card":
      content = <CardNode data={data} designSpec={designSpec} />;
      break;
    case "hero":
      content = <HeroNode data={data} designSpec={designSpec} />;
      break;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: data.position.x,
        top: data.position.y,
        zIndex: data.zIndex ?? 1,
        transform: "translate(-50%, -50%)",
      }}
    >
      {content}
    </div>
  );
}
