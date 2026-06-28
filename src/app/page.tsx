import nodesData from "../../nodes.json";
import designSpec from "../../design_spec.json";
import { Canvas } from "@/components/Canvas";
import type { NodesFile, DesignSpec } from "@/types";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas
        nodesData={nodesData as NodesFile}
        designSpec={designSpec as DesignSpec}
      />
    </main>
  );
}
