import selection from "./case-study.selection.json";

export interface PortfolioSourceLinked {
  sourceIds: string[];
}

export interface PortfolioMedia extends PortfolioSourceLinked {
  src: string;
  alt: string;
  caption: string;
  truthStatus: "作品集重构图" | "源证据" | "当前实现";
  width: number;
  height: number;
}

const approvedSourceIds = new Set(selection.units.map((unit) => unit.id));

function linked<T extends PortfolioSourceLinked>(value: T): T {
  for (const sourceId of value.sourceIds) {
    if (!approvedSourceIds.has(sourceId)) {
      throw new Error(`作品集网站内容引用了缺失的源单元：${sourceId}`);
    }
  }
  return value;
}

function media(value: PortfolioMedia): PortfolioMedia {
  return linked(value);
}

export const portfolioCaseStudy = {
  projectId: "portfolio-operating-system",
  title: "构建作品集，以及让它持续演进的系统",
  status: "持续进行中的独立项目",
  meta: {
    role: "独立产品设计师 / 设计工程师",
    duration: "2026 年 6 月至今",
    type: "独立项目",
  },
  hero: linked({
    sourceIds: ["pos-hero-01", "pos-hero-02"],
    summary: "项目最初只是一次低成本尝试：借助 AI 构建一个有辨识度、能够自行维护的作品集。最初我以为问题只是“哪个 AI 最会做网站”，工作流是线性的：视觉 AI 生成整页 → 整包交接 → 工程 AI 重新实现。真正的难题很快变成：如何让多个工具围绕同一个长期产品协作，同时不丢失视觉意图、工程上下文、内容关系和已经做出的决定。",
    tools: "Google AI Studio 用于探索视觉原型；Claude Code 与 Codex 负责代码理解、差异化整合、调试与维护；DeepSeek API 曾作为较低成本的模型选项，支持早期部分 Claude Code 工作流；GitHub 保存版本状态；Vercel 实现了可运行部署；Cloudflare 路径仍未解决。",
    outputs: [
      { label: "体验", value: "一个可运行的空间化作品集，并提供常规的精选项目浏览路径" },
      { label: "内容", value: "项目、标签、资产、案例研究与站点文案各自承担不同责任" },
      { label: "证据", value: "在 8 月 2 日系统快照中，三个真实项目拥有独立案例研究页面" },
      { label: "治理", value: "持久的产品边界、实现记录与共享 AI 工作规则" },
    ],
    boundary: "这是一个持续演进的独立项目，目前不声称已验证流量、求职转化、任务完成率或性能提升。",
    media: {
      sourceIds: ["pos-hero-01"],
      src: "cover-display.webp",
      alt: "笔记本电脑上展示的作品集 Workspace，下方为深色雕塑感底座",
      caption: "用于确立产品方向的当前作品集 Workspace 展示图。它不是实拍设备，也不是一个独立的历史版本。",
      truthStatus: "作品集重构图",
      width: 1448,
      height: 1086,
    } satisfies PortfolioMedia,
  }),
  actOne: linked({
    sourceIds: ["pos-iteration-01", "pos-iteration-02", "pos-iteration-03", "pos-iteration-04"],
    title: "第一幕·生成｜AI 生成了起点，但没有解决优先级",
    summary: "在 prompt 约束下，AI Studio 生成了有辨识度的 Workspace 概念：Folder、能力标签、身份卡片和 Canvas 隐喻都出现了。但生成结果更关注“元素是否丰富”，没有解决信息优先级——AI 生成了“看起来完整的界面”，但完整不等于正确。",
    draft: {
      title: "初稿：Prompt 生成了概念，但没有解决信息优先级",
      text: "桌面端 Folder、能力标签、身份信息和装饰卡片拥有接近的视觉权重；移动端只是把功能入口依次堆叠，没有重新组织浏览路径。",
      media: [
        media({
          sourceIds: ["pos-iteration-01"],
          src: "iteration-01-prompt-draft-desktop.jpg",
          alt: "Prompt 生成的初稿（桌面端）",
          caption: "2026 年 6 月的 prompt 驱动初稿（桌面端），来自真实 Git 提交 e10d73c。",
          truthStatus: "源证据",
          width: 1280,
          height: 720,
        }),
        media({
          sourceIds: ["pos-iteration-01"],
          src: "iteration-01-prompt-draft-mobile.jpg",
          alt: "Prompt 生成的初稿（移动端）",
          caption: "2026 年 6 月的 prompt 驱动初稿（移动端）：功能入口依次堆叠，没有重新组织浏览路径。",
          truthStatus: "源证据",
          width: 720,
          height: 1280,
        }),
      ] satisfies PortfolioMedia[],
    },
    critique: {
      title: "评审：把“感觉不对”变成可执行的问题清单",
      text: "我用 Impeccable 做了一次诊断层评审，把模糊的“感觉不对”转成可定位、可复现的问题。评审暴露：Folder、能力标签、身份信息和装饰卡片视觉权重接近，缺少明确的主入口与次入口关系；Explore canvas 太像环境装饰；移动端四张等权能力卡占据首屏，真实项目被推到 fold 以下。",
      note: "AI 产生了批评，我决定哪些建议值得采纳。我评估了 Impeccable 的发现，拒绝了会削弱 Workspace 概念的建议，并落地了改善层级、间距、排版、响应式与交互清晰度的改动——Impeccable 是诊断层，不是自动重设计。",
      media: [
        media({
          sourceIds: ["pos-iteration-02"],
          src: "iteration-02-critique-desktop.jpg",
          alt: "评审标注（桌面端）",
          caption: "桌面端评审标注：视觉权重接近、缺少主次入口、Explore canvas 太像装饰。标注覆盖在真实初稿之上，未修改底层页面。",
          truthStatus: "源证据",
          width: 1280,
          height: 720,
        }),
        media({
          sourceIds: ["pos-iteration-02"],
          src: "iteration-02-critique-mobile.jpg",
          alt: "评审标注（移动端）",
          caption: "移动端评审标注：四张等权能力卡占据首屏，项目 Folder 被推到 fold 以下。",
          truthStatus: "源证据",
          width: 720,
          height: 1280,
        }),
      ] satisfies PortfolioMedia[],
    },
    refined: {
      title: "改进：围绕项目发现路径重建层级",
      text: "Folder 成为首屏核心视觉对象，增加明确的 View selected work 入口，保留传统下滑项目列表作为第二条路径，能力标签退居辅助分类，背景大字与辅助卡片的对比度重新平衡。这组 Before / After 能证明四项设计判断：视觉层级、信息架构、响应式适配与认知负荷降低。",
      note: "叙事准则：不写“Impeccable redesigned the website”；准确写法是——An Impeccable-assisted critique exposed hierarchy and responsive-structure problems. I selected the relevant findings and rebuilt the project-discovery flow around a primary workspace entry, an explicit selected-work path, and a lower-density mobile navigation.",
      media: [
        media({
          sourceIds: ["pos-iteration-03"],
          src: "iteration-03-refined-desktop.jpg",
          alt: "改进后的版本（桌面端）",
          caption: "改进后的桌面端：Folder 保持首屏核心，新增 View selected work 入口，能力标签退居辅助。",
          truthStatus: "当前实现",
          width: 1280,
          height: 720,
        }),
        media({
          sourceIds: ["pos-iteration-03"],
          src: "iteration-03-refined-mobile.jpg",
          alt: "改进后的版本（移动端）",
          caption: "改进后的移动端：Folder 被提前到首屏，四张大型能力卡被移除，能力分类改为紧凑的横向 sticky navigation。",
          truthStatus: "当前实现",
          width: 720,
          height: 1280,
        }),
      ] satisfies PortfolioMedia[],
    },
    windows: {
      title: "统一：Window 视觉语言从不一致到一致",
      text: "早期点击 Tags 后展开的 windows 几乎没有统一的视觉语言：窗口比例、标题栏、关闭控件与层级各自为政。改进包括：恢复接近原版的窗口标题栏比例、删除意外出现的蓝色边框、统一红黄绿控件间距、手机端把 Window 提升为覆盖整个页面的 overlay、只允许通过关闭按钮或窗口外部指定区域关闭。",
      note: "装饰元素退后，功能内容获得优先权——对比度按内容优先级重新平衡，而不是简单“提高对比度”。",
      media: [
        media({
          sourceIds: ["pos-iteration-04"],
          src: "iteration-04-windows-before.png",
          alt: "早期 Tags 展开的 windows（视觉不统一）",
          caption: "早期点击 Tags 后展开的 windows：窗口比例、标题栏与关闭控件各自为政。",
          truthStatus: "源证据",
          width: 2582,
          height: 1734,
        }),
        media({
          sourceIds: ["pos-iteration-04"],
          src: "iteration-04-windows-after.png",
          alt: "当前统一的 windows 视觉",
          caption: "当前 windows 视觉：标题栏比例、控件间距、关闭交互与叠放模型已统一。",
          truthStatus: "当前实现",
          width: 2582,
          height: 1734,
        }),
      ] satisfies PortfolioMedia[],
    },
  }),
  actTwo: linked({
    sourceIds: ["pos-decision-01", "pos-decision-02", "pos-product-01"],
    title: "第二幕·维护｜网站不只是页面",
    summary: "当视觉成果要变成可维护的网站时，真正的难题出现了：最好的视觉工具不是最好的工程工具。我从整包交接转向有边界的差异同步，把可复用的标签与独立项目分开，并让工程现实反向影响设计判断。",
    diffSync: {
      title: "决策一：从整包交接转向有边界的 diff sync",
      text: "Google AI Studio 更快产生接近目标的视觉氛围，而工程工具更适合理解文件结构、修改组件和验证项目。整份代码包交接能保留视觉细节，但存在覆盖本地修改与放大版本比较成本的风险；纯 UI spec 能描述字体、颜色和间距，却容易丢失复杂组件、motion、图片关系与整体氛围。",
      decision: "我改变了交接单位：正在运行的 Next.js 项目继续作为当前状态；视觉工具的输出是候选变化；工程工具需要先识别差异、追踪依赖，再只同步确认需要改变的部分。",
      flows: [
        { name: "整包交接", steps: ["视觉输出", "重新解释整页", "覆盖风险"], status: "不再作为默认方式" },
        { name: "有边界同步", steps: ["当前系统 + 候选差异", "影响检查", "局部合并", "验证"], status: "当前工作方式" },
      ],
      boundary: "有边界的差异同步描述的是当前工作方法，而不是一个自动同步产品。",
    },
    contentModel: {
      title: "决策二：Tags are not Projects",
      text: "首次可运行版本已经出现空间化工作区、标签入口、中央项目文件夹和个人身份卡片。它证明了体验方向能够运行，但也暴露了一个结构问题：早期生成方案把 About Me、HMI、AI Related 和 Design System 等入口理解成文件夹或项目，形成完全树状的归类。",
      decision: "我把可复用的标签与独立项目分开。项目拥有稳定身份、公开名称、内容、资产和案例研究叙事，并且可以连接多个标签。标签支持按兴趣发现内容。Mac OS 文件夹则保留为浏览全部项目的无筛选入口。",
      media: {
        sourceIds: ["pos-decision-02"],
        src: "first-working-prototype-display.webp",
        alt: "包含标签启动器、中央文件夹与身份卡片的首个可运行作品集 Workspace",
        caption: "2026 年 6 月的首个可运行 Workspace 原型。其中的界面标签、数字和版本文案记录的是当时状态，并非当前项目主张。",
        truthStatus: "源证据",
        width: 2554,
        height: 1384,
      } satisfies PortfolioMedia,
    },
    product: {
      title: "网站成为一个产品：工程现实反向影响设计判断",
      text: "当原型进入 Next.js、GitHub 和真实部署环境后，“本地能够显示”不再等于“可以发布、维护和继续演进”。构建健康、内容可追溯性、平台兼容与回归风险，迫使设计循环从“页面好不好看”扩展为“这个体验能否被持续维护”。",
      versioning: "Portfolio 是一个 living product，小版本沿主线持续更新；只有真正替代现有体验的正式大版本，才值得通过 archive route 或独立入口保留。",
      deployment: "Vercel 已完成过可运行部署，但中国大陆网络访问不稳定；Cloudflare 经过实际尝试，截至当前仍未成功，被保留为真实未完成状态。",
    },
  }),
  actThree: linked({
    sourceIds: ["pos-os-01", "pos-results-01"],
    title: "第三幕·系统｜每次更新不必从 0 开始",
    summary: "使用的工具会继续变化，所以需要稳定的不是“设计交给 A、开发交给 B”的分工，而是职责边界和共享状态。新工具的加入没有触发又一次重做，而是促使我把散落在对话和代码里的判断分层保存。",
    operatingSystem: {
      title: "决策三：从工作流到 Portfolio Operating System",
      text: "体验层让网站本身证明空间组织、交互与视觉判断；内容层使项目、分类、素材和叙事可以独立演进；治理层保存长期边界、当前状态和临时变化，让下一个 AI 不必重新解释整个项目。",
      boundary: "Portfolio Operating System 不是一个独立软件产品，而是对当前作品集体验、内容与协作方式的系统化描述。",
      mindmap: selection.mindmaps.find((mindmap) => mindmap.sourceUnit === "pos-os-01")?.tree ?? null,
    },
    results: {
      title: "这个项目证明了什么，以及哪些问题仍然开放",
      summary: "成果不在于使用了多少 AI 工具，而在于能否定义内容实体、划分视觉与工程工作的边界、保护既有产品状态、区分证据与推断，并把临时决策转化为未来协作者可以遵循的系统。",
      rows: [
        { area: "体验", outcome: "空间化 Workspace 与常规项目浏览", status: "当前实现" },
        { area: "内容", outcome: "项目—标签关系、项目资产与独立案例研究", status: "当前实现" },
        { area: "协作", outcome: "围绕 Git 基线进行有边界的差异整合", status: "有限定；尚未自动化" },
        { area: "治理", outcome: "产品边界、当前状态记录、计划、审计与共享规则", status: "当前实现" },
        { area: "部署", outcome: "可运行的 Vercel 部署；Cloudflare 路径未解决", status: "有限定 / 未解决" },
      ],
      openQuestions: [
        "归档一个可验证的 AI Studio 到代码仓库差异，以及完整交接案例。",
        "依据当前结构化数据生成并验证最终的项目—标签关系图。",
        "在 Cloudflare 路径解决或放弃后，记录最终部署决策。",
        "只在获得稳定数据后，定义性能、阅读行为与招聘结果。",
        "只在真实重大体验被取代后，创建 V1/V2 历史。",
      ],
    },
  }),
} as const;

const textUnits = 3;
const visualUnits = 9;

export const portfolioContentBalance = (() => {
  const visualShare = visualUnits / (visualUnits + textUnits);
  if (visualShare < 0.5) {
    throw new Error("作品集案例研究的视觉内容占比必须保持在至少 50%");
  }
  return { textUnits, visualUnits, visualShare };
})();

const publishedSourceIds = selection.units
  .filter((unit) => unit.selection === "core" || unit.selection === "supporting" || unit.selection === "simplify")
  .map((unit) => unit.id);
const usedSourceIds = new Set([
  ...portfolioCaseStudy.hero.sourceIds,
  ...portfolioCaseStudy.actOne.sourceIds,
  ...portfolioCaseStudy.actTwo.sourceIds,
  ...portfolioCaseStudy.actThree.sourceIds,
]);

export const portfolioSourceCoverage = (() => {
  const missingSourceIds = publishedSourceIds.filter((sourceId) => !usedSourceIds.has(sourceId));
  if (missingSourceIds.length > 0) {
    throw new Error(`作品集网站遗漏了可发布的事实母版单元：${missingSourceIds.join(", ")}`);
  }
  return {
    usedUnits: usedSourceIds.size,
    publishableUnits: publishedSourceIds.length,
    unitCoverage: usedSourceIds.size / publishedSourceIds.length,
  };
})();

export const caseStudyTitle = portfolioCaseStudy.title;
