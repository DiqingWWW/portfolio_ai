import selection from "./case-study.selection.json";

export interface SourceLinked {
  sourceIds: string[];
}

export interface HondaMedia extends SourceLinked {
  src: string;
  alt: string;
  caption: string;
}

const approvedSourceIds = new Set(selection.units.map((unit) => unit.id));

function linked<T extends SourceLinked>(value: T): T {
  for (const sourceId of value.sourceIds) {
    if (!approvedSourceIds.has(sourceId)) {
      throw new Error(`Honda 中文网站内容引用了缺失的源单元：${sourceId}`);
    }
  }
  return value;
}

const systemMindmap = selection.mindmaps.find((mindmap) => mindmap.sourceUnit === "unit-031");
if (!systemMindmap) throw new Error("Honda 事实母版缺少已批准的系统思维导图");

export const hondaCaseStudy = {
  projectId: "honda-hmi-design-system",
  title: "构建 Honda 中国地区统一用户体验设计系统",
  status: "商业项目",
  meta: {
    role: "产品设计负责人",
    duration: "2024 年 1 月–6 月",
    tools: "Figma",
  },
  background: linked({
    sourceIds: ["unit-001", "unit-002", "unit-003", "unit-004", "unit-005"],
    promise: "这个项目并不只是简单的建立设计系统，而是把分散在不同产品、屏幕和团队中的 HMI 设计决策，转化为可复用、可扩展，并能持续演进的体验基础设施。",
    summary: "在六个月内，我们从 0 到 1 建立了这套系统：统一的设计语言、可复用资源、跨设备规则，以及支持中国地区协作的基础。",
    covers: [
      {
        sourceIds: ["unit-003"],
        src: "cover1-display.webp",
        alt: "融合驾驶、导航与媒体功能的最终 HMI 界面",
        caption: "通过统一的 HMI 视觉与组件语言组织三项高频任务。该素材为已批准的商业项目材料，不能单独证明已在量产产品中发布。",
      },
      {
        sourceIds: ["unit-004"],
        src: "cover2-display.webp",
        alt: "聚焦驾驶与导航的最终 HMI 界面",
        caption: "聚焦驾驶与导航的界面组合，同时作为封面和最终体验证据。该素材为已批准的商业项目材料。",
      },
    ] satisfies HondaMedia[],
    achievements: [
      { value: "6 个月", label: "系统从 0 到 1 建立", note: "来自项目记录；具体组织覆盖范围仍待核实。" },
      { value: "85%+", label: "组件复用率", note: "基于三个车载项目的人工抽样；估算误差约为 ±5–10%。" },
      { value: "45%+", label: "设计生产成本及相关工作量降低", note: "基于供应商报价与项目工作量的统一测算。" },
      { value: "全球总部内部分享", label: "2024 Honda Technical Forum", note: "项目成果通过 Honda 全球总部内部技术论坛进行分享。" },
    ],
  }),
  problem: linked({
    sourceIds: ["unit-006", "unit-008", "unit-012"],
    title: "问题浮现",
    summary:
      "随着本田全球数字化产品持续发展，各地区团队长期独立设计，逐渐形成不同的视觉规范与交互方式，导致用户体验不一致，设计资产无法复用，团队协作成本不断增加。这些问题不是模糊的感受。我们通过对 4 个已上线产品进行 UI Audit，抽样 200+ 个组件实例，发现不足 30% 的组件存在复用关系——换言之，超过 70% 的 UI 元素在每个项目中都被重复设计和实现。将所有问题逐一拆解后发现：表面上看是公司、团队、用户三类角色的不同抱怨，本质上是同四个问题在不同层面的投射。",
    emphasis: "同四个问题在不同层面的投射",
    impacts: [
      { stakeholder: "公司", points: ["成本上升", "品牌表达不一致", "战略响应变慢"] },
      { stakeholder: "团队", points: ["重复生产", "对齐与返工", "质量依赖个人"] },
      { stakeholder: "用户", points: ["学习成本更高", "行为体验割裂", "信心与信任降低"] },
    ],
    impactMatrix: [
      { dimension: "效率", company: "成本失控", team: "重复造轮子", user: "功能交付更慢" },
      { dimension: "一致性", company: "品牌表达碎片化", team: "设计产出不一致", user: "学习成本更高" },
      { dimension: "协作与质量", company: "战略响应更慢", team: "对齐与返工成本", user: "体验质量不稳定" },
      { dimension: "交互与情感", company: "留存与满意度风险", team: "设计价值难以衡量", user: "信心与信任降低" },
    ],
    dimensions: [
      { name: "一致性", purpose: "统一品牌与交互体验" },
      { name: "效率", purpose: "减少重复生产" },
      { name: "协作与质量", purpose: "用共同标准替代个人理解" },
      { name: "交互与情感", purpose: "降低理解成本并建立信任" },
    ],
  }),
  analysis: linked({
    sourceIds: ["unit-013", "unit-015", "unit-019"],
    title: "为什么是这样的设计系统？",
    summary: "我们研究了汽车系统，也研究了 Material Design、Ant Design 与跨设备适配方法。目标不是模仿成熟组件库，设计系统作为解决方案本身也并不新鲜，但关键问题是：从影响追溯到根因，推导可衡量维度，并明确什么样的系统能够因地制宜地、高效地解决不同阶段的问题。",
    emphasis: "但关键问题是：从影响追溯到根因，推导可衡量维度，并明确什么样的系统能够因地制宜地、高效地解决不同阶段的问题。",
    rootCauses: [
      "缺少统一的设计语言",
      "设计决策无法复用",
      "知识依赖个人经验",
      "界面行为缺少共同原则",
    ],
    metrics: ["一致性", "效率", "协作与质量", "交互与情感"],
    phases: [
      { name: "设计系统 1.0", focus: ["一致性", "效率", "易用性"], target: ["建立基础，解决当前痛点"] },
      { name: "设计系统 2.0", focus: ["协作与质量", "情感"] },
    ],
    phaseRationale: "基于当前项目的影响范围、问题紧迫性和可验证性，我们选择在 1.0 阶段优先大幅改善一致性、效率与易用性。其中，易用性属于交互与情感维度，并通过统一基础交互模式，帮助用户更容易理解和预测 HMI 行为。",
  }),
  researchFoundation: linked({
    sourceIds: ["unit-021", "unit-022", "unit-023"],
    title: "研究调研与设计决策基础",
    summary: "在确定系统的基本形态之前，我们先通过内部审计、外部参考、关键页面验证和场景覆盖分析，建立设计决策的依据。目标不是直接套用一套成熟系统，而是判断哪些方法可以借鉴、哪些结构需要针对 Honda HMI 场景重新设计。",
    studies: [
      {
        sourceIds: ["unit-021"],
        title: "1. 设计系统参考调研",
        text: "我们首先通过内部审计建立完整的组件清单，再研究汽车行业及其他跨平台设计系统。调研帮助我们明确了三点：第一，没有现成的设计系统能够直接适配 Honda 的 HMI 场景；第二，Token 架构和组件组织方式可以借鉴，但必须根据汽车场景进行裁剪；第三，市场上两层和三层 Token 架构各有支持者，因此需要通过实际测试决定哪一种更适合本项目。",
        keyTakeaways: [
          "没有现成系统可以直接适配 Honda HMI 场景。",
          "Token 架构和组件组织方式可以借鉴，但需要结合汽车场景裁剪。",
          "两层与三层 Token 架构需要通过实际测试后再做选择。",
        ],
      },
      {
        sourceIds: ["unit-022"],
        title: "2. Home 页面效果先行确认",
        text: "在开始批量搭建组件之前，我们先确认 Home 页面的最终视觉效果。Home 是用户接触频率最高的页面，也是设计系统视觉语言最集中的体现。如果 Home 页面的视觉效果能够通过内部评审并获得品牌方认可，就可以将它作为后续组件风格推导与验证的视觉基准。",
      },
      {
        sourceIds: ["unit-023"],
        title: "3. 组件选型方法论",
        text: "组件范围不是从现有组件库中直接复制，而是通过审计、场景覆盖与外部参考逐步确定，在覆盖核心 HMI 场景的同时控制系统规模与维护成本。",
        steps: [
          { step: "Step 1", title: "现有组件审计", description: "盘点当前产品与项目中的组件，识别重复、差异和缺口。" },
          { step: "Step 2", title: "场景覆盖分析", description: "根据高频任务、屏幕形态与车辆配置判断组件需要覆盖的实际场景。" },
          { step: "Step 3", title: "外部参考补充", description: "用行业和跨平台设计系统补充内部样本中尚未覆盖的模式，但不直接照搬。" },
        ],
      },
    ],
  }),
  solution: linked({
    sourceIds: ["unit-025", "unit-026", "unit-027", "unit-028", "unit-029", "unit-031", "unit-037", "unit-038", "unit-039", "unit-040", "unit-041", "unit-042", "unit-045"],
    title: "三个决策定义了系统的基本形态",
    summary: "关键选择包括：视觉语言是重新创造还是从品牌中提炼；增加第三层 Token 是否值得其治理成本；组件应该只服务固定屏幕，还是提前编码未来的适配能力。",
    decisions: [
      {
        sourceIds: ["unit-027", "unit-028", "unit-029"],
        title: "1. 从品牌中提炼视觉语言",
        text: "我们没有从零创造一种风格，而是从 Honda 0 Series 的方向中提炼出暮光紫、圆润与锐利几何的共存，以及光感。图标断点概念：假设 icon 是立体的，光照射下来产生阴影的地方就是断点。这个思路被内部团队认可后推广到整个系统的视觉设计中，成为连接品牌基因与系统表达的一条暗线。",
        media: [
          { sourceIds: ["unit-028"], src: "visual-language_CN-display.webp", alt: "品牌色彩与氛围探索", caption: "将品牌特质转化为可复用的视觉参数。" },
          { sourceIds: ["unit-029"], src: "logo-and-icons_CN-display.webp", alt: "标志与图标构建语言", caption: "以统一的构建逻辑连接几何与光感。" },
        ] satisfies HondaMedia[],
      },
      {
        sourceIds: ["unit-031", "unit-037", "unit-038", "unit-039"],
        title: "2. 构建稳固且灵活的设计系统架构",
        text: "该架构连接 HMI 交互框架、设计哲学和设计平台。在平台内部，Global → Style → Semantic 的 Token 层级负责管理基础值、主题、渐变和稳定的设计意图。额外层级增加了治理成本，但也使 Honda 大量使用渐变的视觉语言具备可维护性。",
        mindmap: systemMindmap.tree,
        media: [
          { sourceIds: ["unit-039"], src: "tokens-and-components_CN-display.webp", alt: "三层 Token 与组件系统", caption: "将 Global、Style 与 Semantic Token 连接至组件范围和使用文档。" },
        ] satisfies HondaMedia[],
      },
      {
        sourceIds: ["unit-040", "unit-041", "unit-042", "unit-045"],
        title: "3. 层层嵌套的Auto-layout增添适配的可能性",
        text: "嵌套 Auto Layout 与约束使组件能够响应横竖屏、不规则显示器、产品配置和不同语言。这在尚非刚需时增加了构建成本，但后来让同一套结构可以支持变化的容器与更广泛的移动出行场景。",
        media: [
          { sourceIds: ["unit-041"], src: "responsive-theme-adaptation.gif", alt: "组件在尺寸、布局和主题之间进行适配", caption: "展示尺寸、布局与主题适配的交互原型；并非量产软件证据。" },
          { sourceIds: ["unit-042"], src: "vehicle-language-adaptation.gif", alt: "组件在车型配置和语言之间进行适配", caption: "展示配置与语言适配的交互原型；不能证明每款车型均已搭载。" },
          { sourceIds: ["unit-045"], src: "design-to-code_CN-display.webp", alt: "设计到代码的协作方案", caption: "将 Token JSON、版本管理与使用检查组织成一条设计到开发的链路。" },
        ] satisfies HondaMedia[],
      },
    ],
  }),
  validation: linked({
    sourceIds: ["unit-017", "unit-046", "unit-047", "unit-048", "unit-049", "unit-050", "unit-058", "unit-059", "unit-060", "unit-061"],
    title: "验证与项目影响",
    summary: "每个根因都对应一项成功指标，再进一步展开为详细度量、方法、证据状态与改进方向。第一阶段保留了两项方向性 ROI 记录；其余维度仍需要持续审计与用户研究。团队的工作方式随之改变：从'重做'转向'组合'——设计师不再从空白画布开始，而是从已有的构建块组装体验。",
    metricFramework: [
      { metric: "一致性", definition:"衡量品牌与交互体验的一致性提升", method: "视觉审计 · 跨产品抽样 · 可用性研究", status: "方法已定义；完整数据待补充" },
      { metric: "效率", definition: "衡量设计与开发的生产效率是否提升", method: "组件实例 · 交付记录 · 工作量对比", status: "已有 85%+ 复用率与 45%+ 相关工作量估算" },
      { metric: "协作与质量", definition: "团队内部协作以及产出物质量", method: "采用记录 · 设计开发一致度 · 治理检查", status: "方法已定义；完整数据待补充" },
      { metric: "交互与情感", definition: "用户的整体体验", method: "任务测试 · CSAT/NPS · 错误与信任度量", status: "方法已定义；完整数据待补充" },
    ],
    results: [
      {
        value: "30%→85%+",
        label: "组件复用率",
        method: "从项目开始前的30%到每个项目抽样 15 个以上核心页面的85%+组件复用率；人工加权统计。",
        boundary: "人工估算误差约为 ±5–10%。",
      },
      {
        value: "45%+➚",
        label: "设计生产成本及相关工作量降低",
        method: "供应商报价与项目工作量对比：此前约 7–8 人日，之后约 3–4 人日。",
        boundary: "综合供应商报价与项目工作量进行测算。",
      },
    ],
    roadmap: [
      {
        phase: "1.0",
        status: "基础已交付",
        summary: "第一阶段聚焦一致性、效率与易用性——这些是在项目周期内可以验证的紧迫基础。",
        scope: "统一设计语言 · Design Token · 可复用组件与模式 · 基础交互模式 · 清晰的使用指南",
      },
      {
        phase: "2.0",
        status: "规划中",
        summary: "未来阶段将建设依赖长期组织采用与体验成熟度的能力。",
        scope: "设计治理 · 评审与反馈系统 · 品牌表达 · 动效系统 · 无障碍",
      },
    ],
    closing: "我将设计知识转化为系统化框架，构建了可扩展的 HMI 体验基础设施。它不是组件库，而是一套决策系统：1.0 建立秩序、用标准化换来效率，2.0 走向体验智能与组织能力——让团队在保持体验质量的同时更快地移动。",
  }),
} as const;

function countTextUnits() {
  return 2 + 1 + 1 + 2 + hondaCaseStudy.solution.decisions.length + 2;
}

function countVisualUnits() {
  return hondaCaseStudy.background.covers.length
    + 1
    + 1
    + 1
    + hondaCaseStudy.solution.decisions.reduce((total, decision) => total + (decision.media?.length ?? 0) + ("mindmap" in decision ? 1 : 0), 0)
    + 3;
}

export const hondaContentBalance = (() => {
  const textUnits = countTextUnits();
  const visualUnits = countVisualUnits();
  const visualShare = visualUnits / (visualUnits + textUnits);
  if (visualShare < 0.5) throw new Error("Honda 案例研究的视觉内容占比必须保持在至少 50%");
  return { textUnits, visualUnits, visualShare };
})();

export const caseStudyTitle = hondaCaseStudy.title;
