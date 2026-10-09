/** Localized presentation labels; factual narrative and source IDs remain in the candidate modules. */
export const reviewPresentation = {
  en: {
    stages: { before: "Before / Early page draft", during: "During / System construction", after: "After / Current V2 review" },
    draftPanels: ["Foundations & typography", "Component states & specifications"],
    motionTitle: "During / Interaction specification still missing",
    motionParts: ["Trigger", "Entry", "Stable state", "Exit", "Touch alternative", "Reduced motion"],
    systemHref: "/work/portfolio-operating-system/design-system",
    overview: { src: "/assets/images/portfolio-operating-system/design-system-preview_EN.png", fullSrc: "/assets/images/portfolio-operating-system/design-system-overview_EN.png", width: 1440, height: 1600, alt: "English Design System V2 webpage preview, including its header and section navigation", caption: "English webpage preview with navigation. Open the image for the complete page; use the link below to inspect working components. This is a local webpage capture, not a Figma acceptance image." },
    currentNote: "The current local system brings tokens, component states and composition examples together for review. Figma-to-CSS mapping remains manual.",
  },
  zh: {
    stages: { before: "Before / 早期页面草稿", during: "During / 系统搭建过程", after: "After / 当前 V2 审阅版" },
    draftPanels: ["基础变量与排版", "组件状态与规格"],
    motionTitle: "During / 尚未写清的交互规范",
    motionParts: ["触发条件", "进入", "稳定状态", "退出", "触屏替代", "减少动态效果"],
    systemHref: "/zh/work/portfolio-operating-system/design-system",
    overview: { src: "/assets/images/portfolio-operating-system/design-system-preview_CN.png", fullSrc: "/assets/images/portfolio-operating-system/design-system-overview_CN.png", width: 1440, height: 1600, alt: "Design System V2 中文网页预览，包含页头与章节导航", caption: "带导航的中文网页预览。点击打开完整长图；下方链接可检查实际组件。这是本地网页截图，不是 Figma 验收图。" },
    currentNote: "当前本地规范把 token、组件状态与组合样例放在一起审阅。Figma 到 CSS 仍是手工映射。",
  },
} as const;

/** Crops register two views of the original evidence image; no source bitmap is altered. */
export const draftEvidenceCrops = [
  { x: 30, y: 20, width: 1018, height: 500 },
  { x: 30, y: 550, width: 1018, height: 830 },
] as const;
