// ============================================================
// Content-driven architecture — TypeScript interfaces
// All portfolio content flows through these types from JSON files.
// ============================================================

// ---- Tag ----
export interface TagDefinition {
  id: string;
  label: string;
  icon: string;
  color: string;
  sortOrder: number;
  windowTitle: string;
  hoverLayout: 'single-thumbnail' | 'fan-three' | 'fan-three-with-icons' | 'text-only';
  hoverSummary?: string[];
  hasSparkle?: boolean;
}

// ---- Project ----
export interface ProjectSpec {
  label: string;
  val: string;
}

export interface ProjectAssets {
  cover: string;
  hover: string;
  gallery: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  tags: string[];
  metadata: {
    type: string;
    version?: string;
    year?: string;
    role?: string;
  };
  descriptions: {
    short: string;
    detail: string;
  };
  specs: ProjectSpec[];
  tokens: string[];
  assets: ProjectAssets;
}

// ---- Runtime index ----
export interface TagIndex {
  tag: TagDefinition;
  projects: ProjectData[];
}

// ---- Profile ----
export interface Skill {
  name: string;
  level: string;
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface GitHubProfile {
  username: string;
  displayName: string;
  handle: string;
  bio: string;
  commits: string;
  url: string;
  contributionsLabel: string;
  statusLabel: string;
}

export interface ProfileContent {
  name: { first: string; full: string };
  title: string;
  heroPrefix: string;
  heroSubtitle: string;
  heroSubtitleMobile: string;
  bio: string;
  philosophy: { heading: string; body: string };
  aiThinking: { heading: string; body: string };
  competenciesHeading: string;
  chronologyHeading: string;
  skills: Skill[];
  experience: Experience[];
  github: GitHubProfile;
  footer: { updated: string; cv: string };
}

// ---- Navigation ----
export interface PeekCardContent {
  label: string;
  version?: string;
  status?: string;
  textLine?: string;
}

export interface NavigationContent {
  tagline: string;
  exploreCanvas: string;
  workspaceGallery: string;
  mobileTip: string;
  closeButton: string;
  folderHeading: string;
  folderDescription: string;
  folderBackButton: string;
  folderDesignTokensLabel: string;
  folderInstruction: string;
  folderBadge: string;
  peekCards: PeekCardContent[];
}

// ---- Design Tokens ----
export interface DesignToken {
  name: string;
  hex: string;
  usage: string;
}

export interface DesignTokensContent {
  heading: string;
  intro: string;
  palettes: {
    mono: DesignToken[];
    brand: DesignToken[];
  };
  labels: {
    colors: string;
    widgets: string;
    layers: string;
    tabMono: string;
    tabBrand: string;
    copyButton: string;
  };
  widgets: {
    typeA: {
      label: string;
      heading: string;
      tabs: string[];
      caption: string;
    };
    typeB: {
      label: string;
      heading: string;
      slider: string;
      toggle: string;
      caption: string;
    };
  };
  layerIndex: {
    heading: string;
    status: string;
    body: string;
  };
}

// ---- AI Demo ----
export interface AIPrompt {
  id: string;
  label: string;
  promptText: string;
}

export interface AIDemoContent {
  heading: string;
  intro: string;
  labels: {
    prompts: string;
    compiler: string;
    canvas: string;
  };
  prompts: AIPrompt[];
  compileSteps: string[];
  compiler: {
    buttonLabel: string;
    logsHeading: string;
    successMessage: string;
    placeholder: string;
  };
  loadingHint: string;
  placeholder: string;
  musicWidget: { trackName: string; trackInfo: string };
  habitWidget: { title: string; dayLabels: string[] };
  calcWidget: { label: string; resetLabel: string };
}

// ---- HMI Demo ----
export interface HMIDemoContent {
  heading: string;
  intro: string;
  gauge: { speedLabel: string; speedUnit: string };
  accelerateLabel: string;
  systemLog: { idle: string; burst: string };
  climate: {
    heading: string;
    zone: string;
    tempLabel: string;
    loopStatus: string;
    activeLabel: string;
  };
  adas: {
    heading: string;
    runningLabel: string;
    standbyLabel: string;
    carLabel: string;
    sensorLock: string;
    fps: string;
  };
}

// ---- Folder Project (flattened view for FolderContent) ----
export interface FolderProject {
  id: string;
  num: string;
  title: string;
  type: string;
  desc: string;
  detail: string;
  tokens: string[];
  specs: ProjectSpec[];
}

// ---- Folder Decoration (MacOSFolder) ----
export interface FolderDecoration {
  floatLabel: string;
  folderTitle: string;
  folderInstruction: string;
  peekCards: {
    label: string;
    version?: string;
    status?: string;
    textLine?: string;
  }[];
}
