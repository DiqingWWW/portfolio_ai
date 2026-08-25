import baseNavigation from "@content/navigation.json";
import baseProfile from "@content/profile.json";
import baseTags from "@content/tags.json";
import type { NavigationContent, ProfileContent, ProjectData, TagDefinition } from "@/types/content";

export type Locale = "en" | "zh";

const sharedLabels = {
  en: {
    languageName: "中文",
    workspace: "Workspace",
    caseStudy: "Case study",
    role: "Role",
    duration: "Duration",
    tools: "Tools",
    viewProject: "View project",
    selectedRealWork: "Selected real work",
    separateCollection: "Separate collection",
    projectPrefix: "PROJECT",
    enlarge: "Enlarge",
    closeExpanded: "Close expanded",
    openingNewTab: "opens in a new tab",
  },
  zh: {
    languageName: "EN",
    workspace: "工作台",
    caseStudy: "项目案例",
    role: "我的职责",
    duration: "项目周期",
    tools: "工具",
    viewProject: "查看项目",
    selectedRealWork: "精选真实项目",
    separateCollection: "独立合集",
    projectPrefix: "项目",
    enlarge: "放大查看",
    closeExpanded: "关闭放大视图",
    openingNewTab: "在新标签页中打开",
  },
} as const;

const hondaLabels = {
  en: {
    problemTableLabel: "four dimensions projected across company, team, and user impact",
    problemColumns: ["Dimension", "Company", "Team", "User"],
    metricTableLabel: "Success Metrics, definitions, measurement methods, and evidence status",
    metricColumns: ["Success Metric", "Definition", "Measurement method", "Current status"],
    strategy: {
      open: "Open the impact-to-stage strategy map at full size",
      caption: "Complete structure shown at a glance. Select the diagram to inspect the full-size version.",
      dialog: "Expanded impact-to-stage strategy map",
      close: "Close expanded strategy map",
      title: "Impact to root cause, Success Metric, and stage plan",
      description: "Three stakeholder impacts lead to four root causes, four corresponding Success Metrics, and two design-system stages.",
      columns: [
        ["Impact", "3 stakeholder levels"],
        ["Root cause", "4 causes"],
        ["Success Metric", "1:1 with root cause"],
        ["Stage plan", "Design System 1.0 → 2.0"],
      ],
    },
    mindmapInstruction: "Select one of the three system layers to inspect it.",
    mindmapEmpty: "The default view keeps the architecture compact. Details appear here only after a layer is selected.",
    platformNote: "Design Platform is open by default so its resources, guidelines, and adaptation rules are immediately visible. Readers can switch to either of the other system layers.",
  },
  zh: {
    problemTableLabel: "从维度到公司、团队与用户影响的关系表",
    problemColumns: ["维度", "公司", "团队", "用户"],
    metricTableLabel: "成功指标、定义、测量方法与当前证据状态",
    metricColumns: ["成功指标", "定义", "测量方法", "当前状态"],
    strategy: {
      open: "以全尺寸打开影响—阶段策略图",
      caption: "图中展示了完整结构，点击可查看全尺寸版本。",
      dialog: "放大的影响—阶段策略图",
      close: "关闭策略图",
      title: "从影响、根因、成功指标到阶段规划",
      description: "三个利益相关方层面的影响导向四个根因、四个对应的成功指标和两个设计系统阶段。",
      columns: [
        ["影响", "3 个利益相关方层级"],
        ["根因", "4 个根因"],
        ["成功指标", "与根因一一对应"],
        ["阶段规划", "设计系统 1.0 → 2.0"],
      ],
    },
    mindmapInstruction: "选择三个系统层级中的任意一个查看详细结构。",
    mindmapEmpty: "默认视图保持架构紧凑；选择一个层级后，这里会显示详细内容。",
    platformNote: "默认展开 Design Platform，便于直接查看资源、规范与适配规则；也可以切换至另外两个系统层级。",
  },
} as const;

const zhNavigation: NavigationContent = {
  ...baseNavigation,
  tagline: "产品设计师与 AI 构建者",
  footerLeft: "Diqing Wu — 交互式工作台",
  footerCenterLeft: "打开能力或项目合集",
  footerCenterRight: "工作台环境 v2.8",
  exploreCanvas: "查看精选项目",
  viewSelectedWork: "查看精选项目",
  exploreCapabilities: "按能力浏览",
  resetWindows: "重置窗口",
  closeButton: "关闭",
  folderHeading: "diqing_wu_项目/",
  folderDescription: "设计系统、汽车交互、内容设计与 AI 辅助构建方向的精选项目。",
  folderBackButton: "返回项目列表",
  folderDesignTokensLabel: "项目重点",
  folderInstruction: "打开精选项目",
  folderBadge: "工作台",
  experiments: {
    ...baseNavigation.experiments,
    label: "实验 / 概念项目",
    description: "生成式概念与交互研究，与专业项目证据分开呈现。",
  },
  landingFooter: {
    ...baseNavigation.landingFooter,
    eyebrow: "让复杂技术变得自然易懂。",
    heading: "产品设计、交互实践与 AI 辅助构建。",
    navigationLabel: "导航",
    navigation: [
      { label: "联系我", href: "mailto:wudiching@126.com" },
      { label: "项目", href: "#work" },
      { label: "能力", href: "#skills" },
    ],
    socialLabel: "其他平台",
    copyright: "Diqing Wu，用心设计与构建。",
  },
  peekCards: [
    { label: "01 / HONDA_设计系统", version: "0→1" },
    { label: "02 / 作品集_AI", status: "持续进行", textLine: "Prompt → 产品" },
  ],
};

const zhProfile: ProfileContent = {
  ...baseProfile,
  title: "产品设计师与 AI 构建者",
  brandingStatement: "连接技术与使用技术的人",
  brandingDescription: "设计自然的交互，让陌生技术变得易于理解——尤其是在 AI 正在重塑既有行为的当下。",
  roleDisplay: "产品设计师与 AI 构建者",
  heroPrefix: "你好，我是 ",
  heroSubtitle: "产品设计师 + AI 构建者",
  heroSubtitleMobile: "产品设计师 + AI 构建者",
  bio: "我是一名产品与交互设计师，专注于汽车 HMI、设计系统、多模态体验和 AI 辅助产品。我把复杂技术转化为更易理解、学习成本更低的交互。",
  philosophy: { heading: "我的设计理念", body: "技术应当适应人，而不是要求人学习它的内部逻辑。我通过清晰的信息结构、情境反馈和自然交互模式缩小两者之间的距离。" },
  aiThinking: { heading: "AI 混合思维", body: "我使用 AI 进行视觉探索、Prompt-to-UI 原型、跨工具交接和迭代构建，同时保留由人负责的产品判断、内容真实性与最终决策。" },
  competenciesHeading: "核心能力",
  chronologyHeading: "经历",
  skills: [
    { name: "交互设计", level: "多模态 / 情境化" },
    { name: "设计系统", level: "0→1 / 跨平台" },
    { name: "汽车 HMI", level: "座舱 / 语音 / ADAS" },
    { name: "AI 辅助构建", level: "Prompt-to-UI / 工具交接" },
    { name: "原型设计", level: "高保真 / React" },
  ],
  experience: [
    { year: "2025.08 – 至今", role: "兼职交互设计师", company: "AI 教育", description: "设计 AI 学习流程与反馈机制，同时探索 AI 原生产品的快速验证方法。" },
    { year: "2023.10 – 2025.07", role: "高级交互设计师", company: "汽车 HMI 与设计系统", description: "参与多模态座舱体验、语音交互、ADAS 反馈、区域 HMI 适配与跨平台设计系统。" },
    { year: "2020.12 – 2023.09", role: "交互设计师", company: "汽车交互咨询", description: "参与汽车 HMI、多模态交互、AI 工具概念、空间计算指南与用户研究项目。" },
  ],
  github: { ...baseProfile.github, bio: "产品设计师 + AI 学习者/构建者", commits: "查看动态", contributionsLabel: "过去一年的贡献", statusLabel: "活跃" },
  footer: { updated: "更新于 2026 年 8 月", cv: "联系我获取简历" },
};

const tagOverrides: Record<string, Partial<TagDefinition>> = {
  "design-system": { label: "设计系统", windowTitle: "精选设计系统项目", hoverSummary: ["六个月从 0→1 搭建跨平台系统", "组件复用率 85%+", "在 Honda 内部技术论坛分享", "建立持续协作机制"] },
  "about-me": { label: "关于我", windowTitle: "diqing_wu_简介.md", hoverSummary: ["加州艺术学院艺术硕士", "5 年以上产品设计经验", "保持好奇，主动推进"] },
  hmi: { label: "汽车 HMI", windowTitle: "精选汽车 HMI 项目", hoverSummary: ["座舱、语音与 ADAS 多模态交互经验", "跨平台 HMI 基础与区域适配", "Honda 设计系统专业项目证据"] },
  "ai-related": { label: "AI 相关", windowTitle: "精选 AI 辅助构建项目", hoverSummary: ["视觉探索与 Prompt-to-UI 原型", "跨工具交接与 diff-sync 集成", "AI 辅助产品治理与迭代"] },
};

const projectOverrides: Record<string, Partial<ProjectData>> = {
  "honda-hmi-design-system": {
    title: "Honda HMI 设计系统",
    metadata: { type: "专业项目", year: "2024", role: "主导产品设计师" },
    descriptions: { short: "连接品牌语言、交互规则、可复用组件与自适应交付的 HMI 设计系统。", detail: "六个月从 0→1 搭建设计系统，覆盖基础规范、三层 Token 架构、20+ 组件、适配规则、文档与设计到开发协作。" },
    specs: [{ label: "范围", val: "移动端 + 车载 HMI" }, { label: "贡献", val: "0→1 系统搭建" }, { label: "状态", val: "已交付专业项目" }],
    tokens: ["设计系统", "HMI", "跨平台", "设计到开发"],
    assets: { cover: "./cover2-display.webp", hover: "./visual-language_CN-display.webp", gallery: ["./logo-and-icons_CN-display.webp", "./tokens-and-components_CN-display.webp", "./design-to-code_CN-display.webp", "./responsive-theme-adaptation.gif", "./vehicle-language-adaptation.gif"] },
    detailHref: "/zh/work/honda-hmi-design-system",
  },
  "lincoln-text-expression": { title: "移动端文本输入与信息表达", metadata: { type: "专业项目 · Lincoln", role: "UX 设计师" }, descriptions: { short: "根据每类内容承担的任务定义移动端文本输入规则。", detail: "将姓名、昵称、VIN、帖子正文和话题组织为受控短文本、结构化唯一标识与开放长文本，并定义计数、校验和恢复规则。" }, specs: [{ label: "范围", val: "个人资料、VIN、社区" }, { label: "重点", val: "输入规则 + 反馈" }, { label: "状态", val: "已交付专业项目" }], tokens: ["交互设计", "内容设计", "校验", "汽车"] },
  "portfolio-operating-system": { title: "构建作品集，以及让它持续演进的系统", metadata: { type: "独立项目", year: "2026 年 6 月至今", role: "独立产品设计师 / Designer–Builder" }, descriptions: { short: "一个持续演进且不丢失设计意图的作品集、内容系统与多 AI 工作流。", detail: "从 AI 生成界面演进为空间化 Next.js 作品集、项目—标签内容架构、受约束的 diff-sync 工作流与 Portfolio Operating System。" }, specs: [{ label: "成果", val: "可运行的作品集系统" }, { label: "架构", val: "项目 × 标签 × 素材" }, { label: "工作流", val: "多 AI diff sync" }], tokens: ["AI 辅助构建", "系统思维", "Next.js", "产品治理"], detailHref: "/zh/work/portfolio-operating-system" },
  "iris-hud-dashboard": { title: "Iris HUD 仪表盘", metadata: { type: "汽车 HUD 与仪表 HMI", year: "2024" }, descriptions: { short: "面向智能电动车的增强现实抬头显示概念。", detail: "Iris HUD 将驾驶向量、导航、限速与雷达障碍物直接投射到挡风玻璃视野中，减少视线切换与驾驶分心。" }, specs: [{ label: "HMI 响应", val: "180ms 遥测更新" }, { label: "ADAS 精度", val: "99.4% 雷达追踪" }, { label: "亮度指标", val: "15,000 尼特" }], tokens: ["HMI 控制", "遥测弧线", "ADAS 车道辅助", "矢量 HUD"] },
  "monolith-design-system": { title: "Monolith 设计系统", metadata: { type: "严格的 Token 驱动设计语言", year: "2024" }, descriptions: { short: "面向大型企业应用的灵活、极简灰阶与色彩 Token 架构。", detail: "Monolith 通过灰阶基础、强调色和统一触控尺寸维持像素对齐、视觉节奏与空间对比。" }, specs: [{ label: "基础网格", val: "8px 间距系统" }, { label: "字体", val: "系统 Helvetica 常规 / 粗体" }, { label: "过渡", val: "300ms 弹簧阻尼" }], tokens: ["Token JSON", "灰阶基础", "强调色", "流体切换"] },
  "muse-ai-canvas": { title: "Muse AI 画布", metadata: { type: "生成式 UI 智能体系统", year: "2025" }, descriptions: { short: "把自然语言意图转化为可运行的定制 Web 界面。", detail: "Muse 读取对话目标，在沙盒视口中生成完整交互元素，并将结构编译为响应式 CSS 工具类。" }, specs: [{ label: "编译速度", val: "2.8 秒动态合成" }, { label: "Token 解析", val: "Tailwind CSS v4" }, { label: "交互", val: "计算器、音乐、习惯" }], tokens: ["生成式 UI", "流式编译", "原子组件", "交互画布"] },
  "orbit-spatial-os": { title: "Orbit 空间操作系统", metadata: { type: "空间操作系统概念", version: "v1.4.2", year: "2025" }, descriptions: { short: "用于人机协作工作流的无限数字画布。", detail: "文件、提示词与工具结果作为可交互节点存在于无边界画布中，并具有视口约束、动量吸附和布局保持状态。" }, specs: [{ label: "认知栈", val: "LLM 编排" }, { label: "目标平台", val: "桌面 / AR 画布" }, { label: "运动曲线", val: "cubic-bezier(0.16, 1, 0.3, 1)" }], tokens: ["Z 轴深度", "物理吸附", "Framer Motion", "可拖动画布"] },
  "rubik-studio": { title: "Rubik Studio", assets: { cover: "./rubikstudio_CN-display.webp", coverPosition: "top", hover: "./rubikstudio_CN-display.webp", gallery: [] } },
};

export const dictionaries = {
  en: { shared: sharedLabels.en, honda: hondaLabels.en },
  zh: { shared: sharedLabels.zh, honda: hondaLabels.zh },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getLocalizedSiteContent(locale: Locale, projects: ProjectData[]) {
  if (locale === "en") {
    return {
      profile: baseProfile as ProfileContent,
      navigation: baseNavigation as NavigationContent,
      tags: baseTags as TagDefinition[],
      projects,
    };
  }

  return {
    profile: zhProfile,
    navigation: zhNavigation,
    tags: (baseTags as TagDefinition[]).map((tag) => ({ ...tag, ...tagOverrides[tag.id] })),
    projects: projects.map((project) => {
      const override = projectOverrides[project.id];
      return override ? { ...project, ...override } as ProjectData : project;
    }),
  };
}
