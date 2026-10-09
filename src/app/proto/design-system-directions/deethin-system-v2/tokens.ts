/** Isolated, Proposed tokens. No production consumer. Source values are not approval. */
import { architecture } from "./architecture";
export const colors = [
  { id: "canvas", value: "#f4f4f2", name: "Canvas", use: "页面底色", source: "Deethin source", against: "#101010" },
  { id: "surface", value: "#ffffff", name: "Surface", use: "项目、输入、对话框", source: "Deethin source", against: "#101010" },
  { id: "ink", value: "#101010", name: "Ink / contrast", use: "正文、主按钮、深色章节；构图上的 Secondary", source: "Deethin source / owner direction", against: "#ffffff" },
  { id: "muted", value: "#686866", name: "Text / muted", use: "中性说明与 placeholder；不是品牌 Secondary", source: "Deethin source", against: "#f4f4f2" },
  { id: "accent", value: "#73d1f8", name: "Accent / identity", use: "Logo 主色、少量点睛、黑底 data label；不作白底小字", source: "Owner direction", against: "#101010" },
  { id: "accent-ink", value: "#0087fb", name: "Accent / on light", use: "浅底 MONO data label；不替换 Logo 的 #73D1F8", source: "Owner direction", against: "#ffffff" },
  { id: "surface-dark", value: "#1d1d1d", name: "Surface / on dark", use: "黑色章节内的深灰证据卡片，不用白卡制造过强反差", source: "Deethin .caseEvidence", against: "#ffffff" },
  { id: "inverse", value: "#f4f4f2", name: "Inverse text", use: "深色章节文字", source: "Proposed alias", against: "#101010" },
  { id: "control-line", value: "#858581", name: "Control boundary", use: "输入与次级按钮边界，不作正文", source: "Proposed", against: "#ffffff" },
  { id: "focus", value: "#185bc1", name: "Focus", use: "2px 键盘焦点环；后续与 Figma 已有定义核对", source: "Temporary existing value", against: "#f4f4f2" },
  { id: "error", value: "#b42318", name: "Error", use: "错误图标＋信息＋边框", source: "Proposed", against: "#ffffff" },
  { id: "success", value: "#17663b", name: "Success", use: "完成状态＋文字", source: "Proposed", against: "#ffffff" },
  { id: "warning", value: "#825300", name: "Warning", use: "待确认提示＋文字", source: "Proposed", against: "#ffffff" },
  { id: "disabled-bg", value: "#e4e4df", name: "Disabled", use: "不可用控件底色", source: "Proposed", against: "#686866" },
] as const;

export const dimensions = {
  "space-0": "0px", "space-1": "4px", "space-2": "8px", "space-3": "12px", "space-4": "16px", "space-5": "20px", "space-6": "24px", "space-8": "32px", "space-12": "48px", "space-16": "64px", "space-24": "96px", "space-32": "128px",
  "radius-control": "8px", "radius-card": "18px", "radius-panel": "28px", "radius-pill": "999px",
  "control-height": "48px", "control-padding": "20px", "control-gap": "8px", "card-padding": "24px",
  "page-gutter": "clamp(16px, 3vw, 40px)", "section-gap": "clamp(64px, 8vw, 128px)", "content-max": "1440px",
  "line": "var(--ds-border-subtle)", "shadow-overlay": "0 8px 24px var(--ds-shadow-soft), 0 32px 80px var(--ds-border-subtle)",
  "motion-fast": "150ms", "motion-enter": "240ms", "motion-exit": "180ms", "motion-editorial": "800ms", "ease-out": "cubic-bezier(.22, 1, .36, 1)",
} as const;

export const typeScale = [
  { id: "display", label: "Display", size: "clamp(3rem, 7.5vw, 7rem)", weight: 600, leading: 0.96, tracking: "-.055em", use: "只用于短英文展陈标题；不用于正文" },
  { id: "h1", label: "H1", size: "clamp(2.5rem, 5vw, 4.5rem)", weight: 600, leading: 1.04, tracking: "-.04em", use: "页面标题，每页一个语义 h1" },
  { id: "h2", label: "H2", size: "clamp(2rem, 3.8vw, 3.5rem)", weight: 600, leading: 1.1, tracking: "-.035em", use: "章节标题" },
  { id: "h3", label: "H3", size: "1.5rem", weight: 600, leading: 1.25, tracking: "-.02em", use: "组件和项目标题；允许换行" },
  { id: "h4", label: "H4", size: "1.25rem", weight: 600, leading: 1.35, tracking: "-.01em", use: "小节标题" },
  { id: "h5", label: "H5", size: "1rem", weight: 600, leading: 1.5, tracking: "0", use: "组内标题" },
  { id: "h6", label: "H6", size: ".875rem", weight: 600, leading: 1.5, tracking: "0", use: "细分标题，避免深层嵌套" },
  { id: "body", label: "Body", size: "1rem", weight: 400, leading: 1.7, tracking: "0", use: "中英说明；最长 65ch；中文行高 1.8" },
  { id: "label", label: "Label", size: ".875rem", weight: 500, leading: 1.4, tracking: "0", use: "按钮与表单标签；不全大写" },
  { id: "caption", label: "Caption / code", size: ".75rem", weight: 400, leading: 1.6, tracking: "0", use: "注解；数值用 JetBrains Mono，不承担核心说明" },
] as const;

// Three real binding levels for colors; no component paint consumes a literal hex.
const primitiveNames: Record<string, string> = { canvas: "neutral-paper", surface: "neutral-white", ink: "neutral-ink", muted: "neutral-muted", inverse: "neutral-paper", accent: "sky-300", "accent-ink": "blue-500", "surface-dark": "neutral-900", "control-line": "neutral-boundary", focus: "blue-focus", error: "red-error", success: "green-success", warning: "amber-warning", "disabled-bg": "neutral-disabled" };
export const primitiveColors = { ...Object.fromEntries(colors.map(t => [primitiveNames[t.id], t.value])), "ink-alpha-16": "rgb(16 16 16 / 16%)", "ink-alpha-10": "rgb(16 16 16 / 10%)", "ink-alpha-45": "rgb(16 16 16 / 45%)" };
export const semanticAliases = { ...Object.fromEntries(colors.map(t => [t.id, primitiveNames[t.id]])), "border-subtle": "ink-alpha-16", "shadow-soft": "ink-alpha-10", backdrop: "ink-alpha-45" };
export const componentAliases = { "button-bg": "ink", "button-text": "inverse", "card-bg": "surface", "label-text": "accent-ink", "tag-bg": "surface", "tag-text": "ink" };
export const showcaseColors = ["surface", "ink", "accent", "canvas", "surface-dark", "accent-ink"].flatMap(id => colors.filter(t => t.id === id));
export const gradientStops = [
  { name: "Ink", value: "oklch(.18 .02 255)" }, { name: "Blue", value: "oklch(.53 .2 263)" },
  { name: "Sky", value: "oklch(.81 .108 234)" }, { name: "Mist", value: "oklch(.955 .022 226)" },
  { name: "Light", value: "oklch(.985 .008 235)" },
] as const;
export const heroGradient = "linear-gradient(165deg, oklch(.21 .035 260), oklch(.61 .19 260) 48%, oklch(.81 .108 234) 62%, oklch(.21 .035 260))";
export const tokenVariables: Record<string, string | number> = Object.fromEntries([
  ...Object.entries(primitiveColors).map(([key, value]) => [`--primitive-${key}`, value]),
  ...Object.entries(semanticAliases).map(([key, target]) => [`--ds-${key}`, `var(--primitive-${target})`]),
  ...Object.entries(componentAliases).map(([key, target]) => [`--component-${key}`, `var(--ds-${target})`]),
  ["--ds-hero-gradient", heroGradient],
  ...Object.entries(dimensions).map(([key, value]) => [`--ds-${key}`, value]),
  ...typeScale.flatMap(t => [[`--ds-type-${t.id}`, t.size], [`--ds-leading-${t.id}`, t.leading], [`--ds-weight-${t.id}`, t.weight], [`--ds-tracking-${t.id}`, t.tracking]]),
]);

export function contrast(a: string, b: string) {
  const luminance = (hex: string) => {
    const c = hex.slice(1).match(/.{2}/g)!.map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
  };
  const x = luminance(a), y = luminance(b);
  return ((Math.max(x, y) + .05) / (Math.min(x, y) + .05)).toFixed(2);
}

type FigmaColor = { r: number; g: number; b: number; a: number };
type FigmaAlias = { type: "VARIABLE_ALIAS"; collection: string; name: string };
type FigmaValue = string | number | boolean | FigmaColor | FigmaAlias;
type FigmaVariable = {
  name: string;
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  scopes: readonly string[];
  codeSyntax: { WEB: string };
  values: Record<string, FigmaValue>;
  description?: string;
};
type FigmaCollection = { name: string; modes: readonly string[]; variables: readonly FigmaVariable[] };

function rgba(hex: string, alpha = 1): FigmaColor {
  const normalized = hex.replace("#", "");
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16) / 255,
    g: Number.parseInt(normalized.slice(2, 4), 16) / 255,
    b: Number.parseInt(normalized.slice(4, 6), 16) / 255,
    a: alpha,
  };
}
function alias(collection: string, name: string): FigmaAlias { return { type: "VARIABLE_ALIAS", collection, name }; }
function webSyntax(name: string, prefix = "ds") { return `var(--${prefix}-${name.replaceAll("/", "-")})`; }

const primitiveFigmaColors = [
  ["neutral/white", rgba("#ffffff")], ["neutral/ink", rgba("#101010")], ["neutral/paper", rgba("#f4f4f2")],
  ["neutral/muted", rgba("#686866")], ["neutral/inverse-muted", rgba("#aaaaaa")], ["neutral/900", rgba("#1d1d1d")],
  ["neutral/boundary", rgba("#858581")], ["neutral/disabled", rgba("#e4e4df")], ["sky/300", rgba("#73d1f8")],
  ["blue/500", rgba("#0087fb")], ["blue/focus", rgba("#185bc1")], ["red/error", rgba("#b42318")],
  ["green/success", rgba("#17663b")], ["amber/warning", rgba("#825300")],
  ["neutral/ink-alpha-10", rgba("#101010", .10)], ["neutral/ink-alpha-16", rgba("#101010", .16)],
  ["neutral/ink-alpha-45", rgba("#101010", .45)], ["neutral/white-alpha-16", rgba("#ffffff", .16)],
] as const;

const primitiveCollection: FigmaCollection = {
  name: "Primitive-colors", modes: ["Value"],
  variables: primitiveFigmaColors.map(([name, value]) => ({
    name, resolvedType: "COLOR", scopes: [], codeSyntax: { WEB: webSyntax(name, "primitive") }, values: { Value: value },
  })),
};

const semanticRows = [
  ["color/surface/canvas", "neutral/paper", "neutral/ink", ["FRAME_FILL", "SHAPE_FILL"]],
  ["color/surface/card", "neutral/white", "neutral/900", ["FRAME_FILL", "SHAPE_FILL"]],
  ["color/text/primary", "neutral/ink", "neutral/white", ["TEXT_FILL"]],
  ["color/text/muted", "neutral/muted", "neutral/inverse-muted", ["TEXT_FILL"]],
  ["color/text/accent", "blue/500", "sky/300", ["TEXT_FILL"]],
  ["color/action/primary/background", "neutral/ink", "neutral/white", ["FRAME_FILL", "SHAPE_FILL"]],
  ["color/action/primary/text", "neutral/white", "neutral/ink", ["TEXT_FILL"]],
  ["color/border/subtle", "neutral/ink-alpha-16", "neutral/white-alpha-16", ["STROKE_COLOR"]],
  ["color/border/control", "neutral/boundary", "neutral/inverse-muted", ["STROKE_COLOR"]],
  ["color/focus/ring", "blue/focus", "blue/500", ["STROKE_COLOR"]],
  ["color/feedback/error", "red/error", "red/error", ["TEXT_FILL", "STROKE_COLOR"]],
  ["color/feedback/success", "green/success", "green/success", ["TEXT_FILL", "STROKE_COLOR"]],
  ["color/feedback/warning", "amber/warning", "amber/warning", ["TEXT_FILL", "STROKE_COLOR"]],
  ["color/effect/shadow", "neutral/ink-alpha-10", "neutral/ink-alpha-45", ["EFFECT_COLOR"]],
] as const;
const semanticCollection: FigmaCollection = {
  name: "Semantic-Colors", modes: ["Light", "Inverse"],
  variables: semanticRows.map(([name, light, inverse, scopes]) => ({
    name, resolvedType: "COLOR", scopes, codeSyntax: { WEB: webSyntax(name) },
    values: { Light: alias("Primitive-colors", light), Inverse: alias("Primitive-colors", inverse) },
  })),
};

const foundationRows = [
  ...[0, 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128].map(value => [`spacing/${value}`, value, ["GAP"]] as const),
  ["radius/control", 8, ["CORNER_RADIUS"]], ["radius/card", 18, ["CORNER_RADIUS"]],
  ["radius/chapter", 28, ["CORNER_RADIUS"]], ["radius/full", 999, ["CORNER_RADIUS"]],
  ["size/control/min-height", 48, ["WIDTH_HEIGHT"]], ["size/control/padding-inline", 20, ["GAP"]],
  ["size/control/gap", 8, ["GAP"]], ["size/card/padding", 24, ["GAP"]],
  ["duration/feedback", 150, []], ["duration/enter", 240, []], ["duration/exit", 180, []], ["duration/editorial", 800, []],
] as const;
const foundationCollection: FigmaCollection = {
  name: "Foundation", modes: ["Value"],
  variables: foundationRows.map(([name, value, scopes]) => ({
    name, resolvedType: "FLOAT", scopes, codeSyntax: { WEB: webSyntax(name) }, values: { Value: value },
    description: name.startsWith("duration/") ? "Milliseconds" : "Pixels",
  })),
};

const typographyCollection: FigmaCollection = {
  name: "Typography", modes: ["Compact-390", "Wide-1440"],
  variables: [
    { name: "font/family/sans", resolvedType: "STRING", scopes: ["FONT_FAMILY"], codeSyntax: { WEB: "var(--font-inter)" }, values: { "Compact-390": "Inter", "Wide-1440": "Inter" } },
    { name: "font/family/mono", resolvedType: "STRING", scopes: ["FONT_FAMILY"], codeSyntax: { WEB: "var(--font-jetbrains-mono)" }, values: { "Compact-390": "JetBrains Mono", "Wide-1440": "JetBrains Mono" } },
    { name: "font/weight/regular", resolvedType: "FLOAT", scopes: ["FONT_WEIGHT"], codeSyntax: { WEB: "400" }, values: { "Compact-390": 400, "Wide-1440": 400 } },
    { name: "font/weight/medium", resolvedType: "FLOAT", scopes: ["FONT_WEIGHT"], codeSyntax: { WEB: "500" }, values: { "Compact-390": 500, "Wide-1440": 500 } },
    { name: "font/weight/semibold", resolvedType: "FLOAT", scopes: ["FONT_WEIGHT"], codeSyntax: { WEB: "600" }, values: { "Compact-390": 600, "Wide-1440": 600 } },
    { name: "typography/hero/font-size", resolvedType: "FLOAT", scopes: ["FONT_SIZE"], codeSyntax: { WEB: "var(--homepage-hero-font-size)" }, values: { "Compact-390": 66, "Wide-1440": 200.16 } },
    { name: "typography/hero/line-height", resolvedType: "FLOAT", scopes: ["LINE_HEIGHT"], codeSyntax: { WEB: "var(--homepage-hero-line-height)" }, values: { "Compact-390": 62.7, "Wide-1440": 170.136 } },
    { name: "typography/hero/letter-spacing", resolvedType: "FLOAT", scopes: ["LETTER_SPACING"], codeSyntax: { WEB: "var(--homepage-hero-letter-spacing)" }, values: { "Compact-390": -2.64, "Wide-1440": -8.0064 } },
    { name: "typography/section/font-size", resolvedType: "FLOAT", scopes: ["FONT_SIZE"], codeSyntax: { WEB: "var(--homepage-section-font-size)" }, values: { "Compact-390": 74.1, "Wide-1440": 144 } },
    { name: "typography/section/line-height", resolvedType: "FLOAT", scopes: ["LINE_HEIGHT"], codeSyntax: { WEB: "var(--homepage-section-line-height)" }, values: { "Compact-390": 68.172, "Wide-1440": 132.48 } },
    { name: "typography/section/letter-spacing", resolvedType: "FLOAT", scopes: ["LETTER_SPACING"], codeSyntax: { WEB: "var(--homepage-section-letter-spacing)" }, values: { "Compact-390": -4.0755, "Wide-1440": -7.92 } },
    { name: "typography/project/font-size", resolvedType: "FLOAT", scopes: ["FONT_SIZE"], codeSyntax: { WEB: "var(--project-title-font-size)" }, values: { "Compact-390": 18, "Wide-1440": 18 } },
    { name: "typography/data-label/font-size", resolvedType: "FLOAT", scopes: ["FONT_SIZE"], codeSyntax: { WEB: "var(--data-label-font-size)" }, values: { "Compact-390": 12, "Wide-1440": 12 } },
  ],
};

const componentRows = [
  ["button/primary/background", "color/action/primary/background", ["FRAME_FILL", "SHAPE_FILL"]],
  ["button/primary/text", "color/action/primary/text", ["TEXT_FILL"]],
  ["project-card/background", "color/surface/card", ["FRAME_FILL", "SHAPE_FILL"]],
  ["data-label/text", "color/text/accent", ["TEXT_FILL"]],
  ["tag/background", "color/surface/card", ["FRAME_FILL", "SHAPE_FILL"]],
  ["tag/text", "color/text/primary", ["TEXT_FILL"]],
] as const;
const componentCollection: FigmaCollection = {
  name: "Component-colors", modes: ["Light", "Inverse"],
  variables: componentRows.map(([name, target, scopes]) => ({
    name, resolvedType: "COLOR", scopes, codeSyntax: { WEB: webSyntax(name, "component") },
    values: { Light: alias("Semantic-Colors", target), Inverse: alias("Semantic-Colors", target) },
  })),
};

const figmaCollections = [primitiveCollection, semanticCollection, foundationCollection, typographyCollection, componentCollection] as const;
const figmaNamePattern = /^[a-z0-9]+(?:[a-z0-9-]*)(?:\/[a-z0-9]+(?:[a-z0-9-]*))*$/;
const collectionNames = new Set<string>(figmaCollections.map(collection => collection.name));
const variableKeys = new Set(figmaCollections.flatMap(collection => collection.variables.map(variable => `${collection.name}:${variable.name}`)));
const figmaExportErrors = figmaCollections.flatMap(collection => {
  const modeNames = new Set<string>(collection.modes);
  const seen = new Set<string>();
  return collection.variables.flatMap(variable => {
    const errors: string[] = [];
    if (!figmaNamePattern.test(variable.name)) errors.push(`Invalid variable name: ${collection.name}/${variable.name}`);
    if (seen.has(variable.name)) errors.push(`Duplicate variable name: ${collection.name}/${variable.name}`);
    seen.add(variable.name);
    for (const [mode, value] of Object.entries(variable.values)) {
      if (!modeNames.has(mode)) errors.push(`Unknown mode: ${collection.name}/${variable.name}/${mode}`);
      if (typeof value === "object" && value !== null && "type" in value && value.type === "VARIABLE_ALIAS") {
        if (!collectionNames.has(value.collection) || !variableKeys.has(`${value.collection}:${value.name}`)) errors.push(`Broken alias: ${collection.name}/${variable.name} → ${value.collection}/${value.name}`);
      }
    }
    for (const mode of collection.modes) if (!(mode in variable.values)) errors.push(`Missing mode value: ${collection.name}/${variable.name}/${mode}`);
    return errors;
  });
});

export const figmaVariableManifest = {
  schemaVersion: "1.0.0",
  format: "figma-variable-manifest",
  status: "Proposed",
  generatedFor: "Figma Plugin API / MCP variable creation",
  naming: "lowercase slash-separated paths; CSS custom properties live only in codeSyntax.WEB",
  collections: figmaCollections,
  audit: {
    valid: figmaExportErrors.length === 0,
    errors: figmaExportErrors,
    collectionCount: figmaCollections.length,
    variableCount: figmaCollections.reduce((count, collection) => count + collection.variables.length, 0),
  },
} as const;

export const exportedSystem = { name: "Deethin / editorial system 06 / V2", status: "Proposed", version: "0.2.2", date: "2026-09-26", owner: "Diqing Wu", scope: "deethin-system-v2 only", format: "Local CSS registry; figmaVariableManifest requires a matching MCP/Plugin adapter", figmaNodeId: null, productionReplacement: null, primitiveColors, semanticAliases, componentAliases, colors, dimensions, typography: typeScale, gradientStops, heroGradient, architecture, cssVariables: tokenVariables };
