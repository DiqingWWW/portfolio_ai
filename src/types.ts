export type NodeType = "text" | "folder" | "card" | "hero";

export interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  position: { x: number; y: number };
  size: number;
  zIndex?: number;
  subtitle?: string;
  icon?: string;
}

export interface CanvasData {
  width: number;
  height: number;
  background: string;
}

export interface NodesFile {
  canvas: CanvasData;
  nodes: NodeData[];
}

export interface DesignSpec {
  typography: {
    fontFamily: string;
    baseColor: string;
    h1: { size: number; weight: number; lineHeight: number };
    h2: { size: number; weight: number };
    body: { size: number; weight: number };
    caption: { size: number; weight: number };
  };
  color: {
    background: string;
    text: string;
    grid: string;
    accent: string;
  };
  spacing: {
    base: number;
    scale: number[];
  };
  motion: {
    hoverDuration: number;
    hoverEasing: string;
    hoverScale: { node: number; folder: number };
  };
  layout: {
    gridVisible: boolean;
    gridOpacity: number;
    structure: string;
    density: string;
    visualRule: string;
  };
}
