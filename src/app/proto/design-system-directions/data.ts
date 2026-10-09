export const directions = [
  { slug: "the1", label: "The1", short: "Modern Swiss" },
  { slug: "gsap", label: "GSAP", short: "Motion stage" },
  { slug: "elevenlabs", label: "ElevenLabs", short: "Balanced AI" },
  { slug: "ramp", label: "Ramp", short: "Glass utility" },
  { slug: "deethin", label: "Deethin", short: "Portfolio OS" },
] as const;

export type DirectionSlug = (typeof directions)[number]["slug"];

type DirectionSpec = {
  sourceNote: string;
  colors: readonly { name: string; token: string; value: string; use: string; contrast: string }[];
  type: readonly { role: string; family: string; weight: string; size: string; line: string; tracking: string }[];
  spacing: readonly string[];
  layout: readonly { label: string; value: string }[];
  assets: readonly { label: string; rule: string }[];
  motion: readonly { label: string; value: string }[];
  componentMetrics: readonly { label: string; value: string }[];
};

export const directionCopy: Record<DirectionSlug, {
  eyebrow: string;
  title: string;
  description: string;
  principles: string[];
}> = {
  the1: {
    eyebrow: "01 / Modern Swiss",
    title: "Systems become visible when structure becomes the image.",
    description:
      "A typographic architecture for portfolio evidence: flat planes, hard rules, compressed type, and color used as wayfinding rather than decoration.",
    principles: ["Type as structure", "Color as place", "Zero decorative depth"],
  },
  gsap: {
    eyebrow: "02 / Motion stage",
    title: "Make complex systems feel alive, legible, and physical.",
    description:
      "A dark motion-first stage where warm type, chromatic taxonomy, and choreographed response explain how components relate and change.",
    principles: ["Motion explains state", "Color names disciplines", "One continuous stage"],
  },
  elevenlabs: {
    eyebrow: "03 / Balanced AI",
    title: "Quiet intelligence, shaped into a dependable product language.",
    description:
      "A calm editorial system that balances technical precision with generous space, soft surfaces, and small moments of generative color.",
    principles: ["Whispered hierarchy", "Warm neutral surfaces", "Accent inside evidence"],
  },
  ramp: {
    eyebrow: "04 / Glass utility",
    title: "A clear operating layer for evidence, decisions, and momentum.",
    description:
      "A high-clarity product system with editorial typography, chartreuse action signals, and restrained frosted layers over a warm canvas.",
    principles: ["One action color", "Utility-led motion", "Glass with structure"],
  },
  deethin: {
    eyebrow: "05 / Portfolio OS",
    title: "An authored workspace where evidence moves with intent.",
    description:
      "Derived from the current deethin.site homepage: warm paper, ink-black editorial type, file-tab navigation, spatial media, and motion that reveals system relationships.",
    principles: ["Evidence leads", "Motion explains relationships", "Workspace meets editorial"],
  },
};

export const systemSpecs: Record<DirectionSlug, DirectionSpec> = {
  the1: {
    sourceNote: "Proposed translation of The1’s Modern Swiss language; normalized values, not a source-code extraction.",
    colors: [
      { name: "Canvas", token: "canvas.default", value: "#D2D2D2", use: "Primary field", contrast: "Ink 9.49:1 · AAA" },
      { name: "Ink", token: "text.primary", value: "#2A2A2A", use: "Text + hard rules", contrast: "Canvas 9.49:1 · AAA" },
      { name: "Orange", token: "brand.primary", value: "#E68442", use: "Primary action", contrast: "Ink 5.29:1 · AA" },
      { name: "Red", token: "status.error", value: "#B42318", use: "Error only", contrast: "Canvas 4.35:1 · AA large" },
    ],
    type: [
      { role: "Display", family: "Arial Narrow → Inter fallback", weight: "600", size: "96–140", line: "0.78", tracking: "−0.075em" },
      { role: "H2", family: "Arial Narrow", weight: "600", size: "56–76", line: "0.88", tracking: "−0.05em" },
      { role: "Body", family: "Inter", weight: "400", size: "16–20", line: "1.55", tracking: "0" },
      { role: "Label", family: "JetBrains Mono", weight: "500", size: "11", line: "1.4", tracking: "+0.10em" },
    ],
    spacing: ["0", "4", "8", "12", "16", "24", "32", "48", "64", "96", "128"],
    layout: [{ label: "Grid", value: "12 columns" }, { label: "Gutter", value: "24px desktop / 16px mobile" }, { label: "Page padding", value: "64px → 18px" }, { label: "Max width", value: "1500px" }, { label: "Section gap", value: "128–168px" }],
    assets: [{ label: "Icons", rule: "1.5px outline, square optical box, no filled mix" }, { label: "Logo", rule: "Ink-only; preserve 1× cap-height clear space" }, { label: "Images", rule: "Full-bleed crops; no decorative radius" }, { label: "Illustration", rule: "Flat geometric planes; max three system colors" }],
    motion: [{ label: "Hover", value: "120ms · ease-out" }, { label: "Press", value: "scale .96 · 120ms" }, { label: "Enter", value: "No default page entrance" }, { label: "Reduced", value: "All transforms and fades disabled" }],
    componentMetrics: [{ label: "Control height", value: "46 / 52px" }, { label: "Control padding", value: "0 × 18px" }, { label: "Panel padding", value: "44px desktop / 24px mobile" }, { label: "Radius", value: "0px panel / pill control" }],
  },
  gsap: {
    sourceNote: "Proposed motion-first system inferred from GSAP’s visual language; motion values are newly authored because the source document is incomplete.",
    colors: [
      { name: "Stage", token: "canvas.default", value: "#202421", use: "Continuous backdrop", contrast: "Cream 15.17:1 · AAA" },
      { name: "Cream", token: "text.primary", value: "#FFFCE1", use: "Primary text", contrast: "Stage 15.17:1 · AAA" },
      { name: "Green", token: "brand.primary", value: "#78E448", use: "Action + success", contrast: "Stage 9.72:1 · AAA" },
      { name: "Pink", token: "status.attention", value: "#D88BD2", use: "Category signal", contrast: "Stage 6.40:1 · AA" },
    ],
    type: [
      { role: "Display", family: "Inter", weight: "650", size: "96–168", line: "0.88", tracking: "−0.06em" },
      { role: "H2", family: "Inter", weight: "600", size: "52–76", line: "0.95", tracking: "−0.045em" },
      { role: "Body", family: "Inter", weight: "400", size: "16–20", line: "1.55", tracking: "0" },
      { role: "Code label", family: "JetBrains Mono", weight: "500", size: "11", line: "1.4", tracking: "+0.10em" },
    ],
    spacing: ["0", "4", "8", "12", "16", "24", "32", "48", "64", "96", "128"],
    layout: [{ label: "Grid", value: "12 columns" }, { label: "Gutter", value: "16px" }, { label: "Page padding", value: "64px → 18px" }, { label: "Max width", value: "1440px" }, { label: "Section gap", value: "96–168px" }],
    assets: [{ label: "Icons", rule: "1.5px rounded outline; inherit taxonomy color" }, { label: "Logo", rule: "Cream or mono; no glow" }, { label: "Images", rule: "High-contrast crop with stage-colored overlay" }, { label: "Illustration", rule: "One continuous gradient field; avoid unrelated 3D styles" }],
    motion: [{ label: "Hover", value: "150ms · cubic-bezier(.32,.72,0,1)" }, { label: "Press", value: "scale .96 · 120ms" }, { label: "Enter", value: "700ms · 32px → 0 · staged 100ms" }, { label: "Reduced", value: "Static final frame; ambient loops removed" }],
    componentMetrics: [{ label: "Control height", value: "46 / 52px" }, { label: "Control padding", value: "0 × 18px" }, { label: "Panel padding", value: "44px desktop / 24px mobile" }, { label: "Radius", value: "12px panel / pill control" }],
  },
  elevenlabs: {
    sourceNote: "Proposed balanced AI system: editorial restraint plus small generative accents; not a reproduction of ElevenLabs components.",
    colors: [
      { name: "Canvas", token: "canvas.default", value: "#FEFDFC", use: "Quiet background", contrast: "Black 17.65:1 · AAA" },
      { name: "Black", token: "text.primary", value: "#171717", use: "Primary text", contrast: "Canvas 17.65:1 · AAA" },
      { name: "Violet", token: "brand.primary", value: "#5941D8", use: "Primary action", contrast: "White 6.62:1 · AA" },
      { name: "Red", token: "status.error", value: "#C0362C", use: "Validation", contrast: "White 5.52:1 · AA" },
    ],
    type: [
      { role: "Display", family: "Inter", weight: "300", size: "64–90", line: "1.02", tracking: "−0.045em" },
      { role: "H2", family: "Inter", weight: "350", size: "48–76", line: "1.02", tracking: "−0.04em" },
      { role: "Body", family: "Inter", weight: "400", size: "16–20", line: "1.60", tracking: "0" },
      { role: "Label", family: "JetBrains Mono", weight: "500", size: "11", line: "1.4", tracking: "+0.08em" },
    ],
    spacing: ["0", "4", "8", "12", "16", "24", "32", "48", "64", "96", "128"],
    layout: [{ label: "Grid", value: "12 columns" }, { label: "Gutter", value: "24px" }, { label: "Page padding", value: "64px → 18px" }, { label: "Max width", value: "1440px" }, { label: "Section gap", value: "112–168px" }],
    assets: [{ label: "Icons", rule: "1.5px neutral outline; accent only for active state" }, { label: "Logo", rule: "Black/white only with generous clear space" }, { label: "Images", rule: "Natural crops; generative color stays inside evidence" }, { label: "Illustration", rule: "Soft spectral fields; never compete with copy" }],
    motion: [{ label: "Hover", value: "150ms · ease-out" }, { label: "Press", value: "scale .97 · 120ms" }, { label: "Enter", value: "240ms · opacity + 8px" }, { label: "Reduced", value: "Immediate state changes" }],
    componentMetrics: [{ label: "Control height", value: "46 / 52px" }, { label: "Control padding", value: "0 × 18px" }, { label: "Panel padding", value: "44px desktop / 24px mobile" }, { label: "Radius", value: "20px panel / pill control" }],
  },
  ramp: {
    sourceNote: "Proposed glass-utility translation; glass is constrained to navigation and raised surfaces so content contrast remains stable.",
    colors: [
      { name: "Canvas", token: "canvas.default", value: "#F1EEE8", use: "Warm field", contrast: "Ink 14.03:1 · AAA" },
      { name: "Ink", token: "text.primary", value: "#22201D", use: "Text + structure", contrast: "Canvas 14.03:1 · AAA" },
      { name: "Lime", token: "brand.primary", value: "#C9F33B", use: "Primary action", contrast: "Ink 12.66:1 · AAA" },
      { name: "Red", token: "status.error", value: "#B9362B", use: "Validation", contrast: "White 5.79:1 · AA" },
    ],
    type: [
      { role: "Display", family: "Inter", weight: "450", size: "64–96", line: "0.98", tracking: "−0.05em" },
      { role: "H2", family: "Inter", weight: "450", size: "48–76", line: "1", tracking: "−0.045em" },
      { role: "Body", family: "Inter", weight: "400", size: "16–20", line: "1.55", tracking: "0" },
      { role: "Data label", family: "JetBrains Mono", weight: "500", size: "11", line: "1.4", tracking: "+0.08em" },
    ],
    spacing: ["0", "4", "8", "12", "16", "24", "32", "48", "64", "96", "128"],
    layout: [{ label: "Grid", value: "12 columns / 72px guide" }, { label: "Gutter", value: "16px" }, { label: "Page padding", value: "64px → 18px" }, { label: "Max width", value: "1440px" }, { label: "Section gap", value: "96–168px" }],
    assets: [{ label: "Icons", rule: "1.5px utility outline; 20px default box" }, { label: "Logo", rule: "Ink-only on light glass; white on dark" }, { label: "Images", rule: "Crisp product evidence; no blur over readable UI" }, { label: "Illustration", rule: "Diagrammatic, grid-aligned, one accent" }],
    motion: [{ label: "Hover", value: "150ms · ease-out" }, { label: "Press", value: "scale .97 · 120ms" }, { label: "Enter", value: "300–400ms · utility fade" }, { label: "Reduced", value: "Glass remains; movement removed" }],
    componentMetrics: [{ label: "Control height", value: "46 / 52px" }, { label: "Control padding", value: "0 × 18px" }, { label: "Panel padding", value: "44px desktop / 24px mobile" }, { label: "Radius", value: "16px panel / 7px control" }],
  },
  deethin: {
    sourceNote: "Proposed system extracted from the current deethin.site homepage implementation and its existing motion grammar.",
    colors: [
      { name: "Paper", token: "canvas.default", value: "#F4F3EE", use: "Portfolio canvas", contrast: "Ink 11.01:1 · AAA" },
      { name: "Ink", token: "text.primary", value: "#343630", use: "Editorial text", contrast: "Paper 11.01:1 · AAA" },
      { name: "Workspace blue", token: "brand.primary", value: "#398EC7", use: "Spatial signal", contrast: "Ink 3.42:1 · AA large" },
      { name: "Error", token: "status.error", value: "#B53A31", use: "Validation only", contrast: "White 5.81:1 · AA" },
    ],
    type: [
      { role: "Display", family: "Inter", weight: "600", size: "72–144", line: "0.92", tracking: "−0.065em" },
      { role: "H2", family: "Inter", weight: "600", size: "62–118", line: "0.92", tracking: "−0.06em" },
      { role: "Body", family: "Inter", weight: "400", size: "16–20", line: "1.55", tracking: "0" },
      { role: "System label", family: "JetBrains Mono", weight: "500", size: "11", line: "1.4", tracking: "+0.10em" },
    ],
    spacing: ["0", "4", "8", "12", "16", "20", "24", "32", "48", "64", "96", "128"],
    layout: [{ label: "Grid", value: "12 columns; editorial breaks allowed" }, { label: "Gutter", value: "16px" }, { label: "Page padding", value: "64px → 18px" }, { label: "Max width", value: "1440px" }, { label: "Section gap", value: "112–168px" }],
    assets: [{ label: "Icons", rule: "Lucide, 1.5px stroke, 16–20px optical box" }, { label: "Logo", rule: "DQ wordmark; one cap-height clear space" }, { label: "Images", rule: "Evidence-led, spatial crop, preserve UI legibility" }, { label: "Illustration", rule: "Blurred smoke field behind content, never over text" }],
    motion: [{ label: "Hover", value: "150–220ms · cubic-bezier(.32,.72,0,1)" }, { label: "Press", value: "scale .96 · 150ms" }, { label: "Hero reveal", value: "900ms · blur 14px + 28px" }, { label: "Reduced", value: "Static final frame; no blur/fade" }],
    componentMetrics: [{ label: "Control height", value: "46 / 52px" }, { label: "Control padding", value: "0 × 18px" }, { label: "Panel padding", value: "44px desktop / 24px mobile" }, { label: "Radius", value: "22px panel / 12px control" }],
  },
};

export const project = {
  title: "Honda HMI Design System",
  description:
    "A scalable HMI design system connecting brand language, interaction rules, reusable components, and adaptive delivery across mobile and in-vehicle products.",
  image: "/assets/images/honda-hmi-design-system/cover2-display.webp",
  tags: ["Design systems", "HMI", "Cross-platform"],
  stats: [
    ["Scope", "Mobile + HMI"],
    ["System", "3 token layers"],
    ["Library", "20+ components"],
  ],
} as const;
