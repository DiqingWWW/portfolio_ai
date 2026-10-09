import { tokenVariables } from "./tokens";

/** Web composition registry: approved V2 + captured Inuse bindings.
 * Extensions are review candidates, never a claim of live Figma synchronization. */
export const reviewExtensions = [
  { role: "primary-cta", value: "var(--ds-ink)", status: "Existing component reused", source: "V2 / .button", use: "恢复黑色 pill 主按钮；不再使用自造蓝色大面板" },
  { role: "muted-text", value: "var(--ds-muted)", status: "Existing web token / Figma mapping pending", source: "V2 tokens.ts / muted", use: "网页已有角色；实时 Figma Paint Style 尚未核对" },
  { role: "focus", value: "var(--ds-focus)", status: "Existing web token / Figma mapping pending", source: "V2 tokens.ts / focus；Figma 另有 propose/System/Focus/Light", use: "复用规范焦点环，不把不同数值当成一致" },
  { role: "mono-strong", value: "700", status: "Pending / not used", source: "Previous candidate", use: "页面改回 Data/Label 500；700 保留待定，不使用" },
  { role: "closing-24", value: "var(--ds-type-h3)", status: "Existing size / role pending", source: "V2 / H3 24px", use: "尺寸已有，收尾文字角色仍待确认" },
  { role: "responsive-type", value: "var(--ds-type-h1) / var(--ds-type-h2)", status: "Existing interpolation", source: "V2 / typeScale", use: "中英取消 ch 限宽；中文按规范恢复 1.25 行高" },
  { role: "breakpoints", value: "900 / 640 / 400px", status: "Pending", source: "Previous candidate", use: "从本 registry 生成媒体规则" },
  { role: "gallery-width", value: "min(85%, 48rem)", status: "Pending", source: "Owner requested galleries", use: "两轮 gallery 同一宽度，不限制文字行数" },
  { role: "bottom-blur", value: "112px / 4,8,16px", status: "Pending", source: "Previous candidate", use: "底部模糊保持隔离，不作为已批准 Figma Effect Style" },
  { role: "scroll-choreography", value: "800ms / 950ms / 40px / 7px", status: "Production-source pattern / Pending adoption", source: "FabricaMotion.tsx / fabrica.module.css:699", use: "逐组进入；reduced motion 与键盘定位即时显示" },
] as const;
export const caseStudyBreakpoints = { table: "900px", compact: "640px", narrow: "400px" } as const;
export const caseStudyMotion = { viewportMargin: "0px 0px -10% 0px", threshold: 0.08, initialVisibleRatio: 0.92 } as const;
export const caseStudyImageSizes = `(max-width: ${caseStudyBreakpoints.compact}) 90vw, 70vw`;
export const workspaceImageSizes = `(max-width: ${caseStudyBreakpoints.table}) ${caseStudyBreakpoints.table}, 90vw`;
/** Intrinsic cover.png measurements. These register media, not visual style exceptions. */
export const laptopAssetGeometry = { width: 1448, height: 1086, crop: { x: 84, y: 80, width: 1280, height: 894 }, cardCrop: { x: 84, y: 80, width: 1280, height: 960 }, screen: { x: 353, y: 263, width: 754, height: 494 } } as const;
export const caseStudyTokens = {
  ...tokenVariables,
  "--color-surface-canvas": "var(--ds-canvas)", "--color-surface-canvas-inverse": "var(--ds-ink)",
  "--color-surface-card": "var(--ds-surface)", "--color-surface-card-inverse": "var(--ds-surface-dark)",
  "--color-text-primary": "var(--ds-ink)", "--color-text-primary-inverse": "var(--ds-surface)",
  "--color-text-muted": "var(--ds-muted)", "--color-text-accent": "var(--ds-accent-ink)", "--color-text-accent-inverse": "var(--ds-accent)",
  "--color-border-subtle": "var(--ds-border-subtle)", "--color-focus": "var(--ds-focus)",
  "--font-family-sans": "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
  "--font-family-mono": 'var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace',
  "--font-size-caption": "var(--ds-type-caption)", "--font-size-label": "var(--ds-type-caption)",
  "--font-size-ui": "var(--ds-type-label)", "--font-size-body": "var(--ds-type-body)",
  "--font-size-project-title": "18px", // captured Project/Title S:0022b533…
  "--font-size-closing": "var(--ds-type-h3)", "--font-weight-regular": "var(--ds-weight-body)",
  "--font-weight-semibold": "var(--ds-weight-h3)", "--font-weight-mono": "500", // captured Data/Label
  "--line-height-body": "var(--ds-leading-body)", "--line-height-label": "var(--ds-leading-caption)",
  "--line-height-project-title": "1.25", "--line-height-zh": "1.8", "--tracking-label": ".04em",
  "--tracking-project-title": "-.035em", "--type-subheading": "var(--ds-type-h3)",
  "--layout-gutter": "var(--ds-page-gutter)", "--layout-section-gap": "var(--ds-section-gap)",
  "--layout-card-padding": "var(--ds-card-padding)", "--content-max": "var(--ds-content-max)",
  ...Object.fromEntries([0,1,2,3,4,5,6,8,12,16,24,32].map(n => [`--space-${n}`, `var(--ds-space-${n})`])),
  "--space-10": "40px", "--space-20": "80px", // incumbent homepage travel / evidence spacing
  "--radius-card": "var(--ds-radius-card)", "--radius-chapter": "var(--ds-radius-panel)",
  "--radius-control": "var(--ds-radius-control)",
  "--control-min-height": "var(--ds-control-height)", "--stroke-1": "1px", "--focus-width": "2px",
  "--ratio-landscape": "4 / 3", "--icon-size": "18px", "--icon-stroke": "1.5",
  "--motion-fast": "var(--ds-motion-fast)", "--motion-enter": "var(--ds-motion-enter)", "--motion-editorial": "var(--ds-motion-editorial)", "--ease-out": "var(--ds-ease-out)",
  "--motion-media": "950ms", "--motion-travel": "40px", "--motion-blur": "7px", "--motion-stagger": "70ms",
  "--gallery-width": "min(85%, 48rem)", "--preview-height": "28rem",
  "--blur-height": "112px", "--blur-small": "4px", "--blur-medium": "8px", "--blur-large": "16px",
  "--blur-mask": "linear-gradient(to bottom, transparent, black)",
  "--layer-sticky": "20", "--layer-blur": "19", "--layer-skip": "50",
  "--grid-two": "repeat(2, minmax(0, 1fr))", "--grid-three": "repeat(3, minmax(0, 1fr))",
  "--grid-four": "repeat(4, minmax(0, 1fr))", "--grid-five": "repeat(5, minmax(0, 1fr))",
  "--grid-single": "minmax(0, 1fr)", "--grid-key-value": "minmax(0, 1fr) minmax(0, 2fr)",
  "--grid-gallery-media": "minmax(0, 3fr) minmax(0, 1fr)",
  "--case-title-size": "clamp(var(--ds-type-h3), 7cqi, var(--ds-type-h1))",
  "--flow-turn": "90deg",
  "--flow-min-width": caseStudyBreakpoints.table,
} as const;
