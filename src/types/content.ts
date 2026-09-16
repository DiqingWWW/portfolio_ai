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
  coverPosition?: 'center' | 'top';
  /** Optional looping cover film. When set, the Projects grid plays this instead of the still cover. */
  coverVideo?: string;
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
  detailHref?: string;
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
  brandingStatement: string;
  brandingDescription: string;
  nameDisplay: string;
  roleDisplay: string;
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
  footerLeft: string;
  footerCenterLeft: string;
  footerCenterRight: string;
  exploreCanvas: string;
  viewSelectedWork: string;
  exploreCapabilities: string;
  resetWindows: string;
  closeButton: string;
  folderHeading: string;
  folderDescription: string;
  folderBackButton: string;
  folderDesignTokensLabel: string;
  folderInstruction: string;
  folderBadge: string;
  experiments: {
    label: string;
    description: string;
    href: string;
  };
  landingFooter: {
    eyebrow: string;
    heading: string;
    navigationLabel: string;
    navigation: Array<{
      label: string;
      href: string;
    }>;
    socialLabel: string;
    socials: Array<{
      platform: string;
      label: string;
      href: string;
    }>;
    copyright: string;
  };
  peekCards: PeekCardContent[];
}

export interface ExperimentContent {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  assets: { cover: string; gallery: string[] };
}

// ---- Design Tokens ----
export interface DesignToken {
  name: string;
  hex: string;
  usage: string;
}

export interface KpiCard {
  value: string;
  label: string;
  color: string;
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
  kpiCards: KpiCard[];
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
  detailHref?: string;
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

// ---- Node Positions (canvas layout) ----
export interface NodePosition {
  x: string;
  y: string;
}

export interface NodePositions {
  designSystem: NodePosition;
  aboutMe: NodePosition;
  hmi: NodePosition;
  aiRelated: NodePosition;
  folder: NodePosition;
  brandingBlock: NodePosition;
  nameBlock: NodePosition;
  watermark: NodePosition;
}
