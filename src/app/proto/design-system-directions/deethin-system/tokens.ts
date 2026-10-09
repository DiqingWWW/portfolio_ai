/** Isolated, Proposed tokens. No production consumer. Source values are not approval. */
export const colors = [
  { id: "canvas", value: "#f4f4f2", name: "Canvas", use: "页面底色", source: "Deethin source", against: "#101010" },
  { id: "surface", value: "#ffffff", name: "Surface", use: "项目、输入、对话框", source: "Deethin source", against: "#101010" },
  { id: "ink", value: "#101010", name: "Ink / brand", use: "正文、主按钮、品牌签名", source: "Deethin source", against: "#ffffff" },
  { id: "muted", value: "#686866", name: "Secondary", use: "说明、placeholder；不降低透明度", source: "Deethin source", against: "#f4f4f2" },
  { id: "inverse", value: "#f4f4f2", name: "Inverse text", use: "深色章节文字", source: "Proposed alias", against: "#101010" },
  { id: "control-line", value: "#858581", name: "Control boundary", use: "输入与次级按钮边界，不作正文", source: "Proposed", against: "#ffffff" },
  { id: "focus", value: "#185bc1", name: "Focus", use: "3px 焦点环；不是装饰色", source: "Proposed", against: "#f4f4f2" },
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
  "line": "rgb(16 16 16 / 16%)", "shadow-overlay": "0 8px 24px rgb(16 16 16 / 10%), 0 32px 80px rgb(16 16 16 / 16%)",
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

export const tokenVariables: Record<string, string | number> = Object.fromEntries([
  ...colors.map(t => [`--ds-${t.id}`, t.value]),
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

export const exportedSystem = { name: "Deethin / editorial system 06", status: "Proposed", version: "0.1.0", date: "2026-09-23", owner: "Diqing Wu", scope: "direction06 only", format: "Resolved application registry; not a DTCG alias graph", figmaNodeId: null, productionReplacement: null, colors, dimensions, typography: typeScale, cssVariables: tokenVariables };
