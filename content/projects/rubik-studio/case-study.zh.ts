import selection from "./case-study.selection.json";

type SourceLinked = { sourceIds: readonly string[] };

export type RubikMedia = SourceLinked & {
  src: string;
  alt: string;
  caption: string;
  truthStatus: "现有设计材料" | "回顾性重构" | "生成概念视觉";
  width: number;
  height: number;
};

const approvedSourceIds = new Set(selection.units.map((unit) => unit.id));

function linked<T extends SourceLinked>(value: T): T {
  for (const sourceId of value.sourceIds) {
    if (!approvedSourceIds.has(sourceId)) {
      throw new Error(`Rubik Studio 中文网站内容引用了缺失的源单元：${sourceId}`);
    }
  }
  return value;
}

function media(value: RubikMedia): RubikMedia {
  return linked(value);
}

export const rubikStudioCaseStudy = {
  projectId: "rubik-studio",
  title: "让 AI 编程融入开发者工作流",
  eyebrow: "Rubik Studio · 汽车软件开发工具",
  status: "商业项目 · 现有设计材料与回顾分析",
  hero: linked({
    sourceIds: ["rs-overview", "rs-role"],
    summary:
      "Rubik Studio 是面向开发者的 AI 编程助手。我在既有产品框架下负责其全部模块的设计。本案例先展示编程助手的界面成果，再围绕任务入口、代码采用、会话管理和状态反馈，解释这套专业工具如何组织用户操作。",
    proposition: "我更关注用户如何表达任务、理解结果，并判断下一步可以做什么。对于 AI 工具，生成内容只是其中一个环节，围绕内容的操作关系同样决定体验质量。",
    meta: [
      { label: "职责", value: "编程助手全部模块设计" },
      { label: "工作环境", value: "IDE 内固定侧栏" },
      { label: "案例重点", value: "复杂任务、AI 结果与用户控制" },
    ],
    historicalSignals: linked({
      sourceIds: ["rs-overview", "rs-evidence-notes"],
      items: [
        { value: "70%+", label: "开发效率提升" },
        { value: "85%+", label: "设计效率提升" },
        { value: "1000亿+", label: "代码知识库" },
        { value: "15+", label: "全球研发中心" },
      ],
    }),
    media: [
      media({
        sourceIds: ["rs-overview"],
        src: "G01-hero-cockpit-concept.png",
        alt: "白色汽车座舱、方向盘、中央控制台和宽幅黑色 HMI 屏幕的三维概念视觉",
        caption: "根据历史长图构图生成，用于建立汽车软件语境；不是原项目资产或真实车型方案。",
        truthStatus: "生成概念视觉",
        width: 2048,
        height: 768,
      }),
    ] satisfies RubikMedia[],
  }),
  result: linked({
    sourceIds: ["rs-result"],
    title: "编程助手与代码工作区并置",
    summary:
      "助手在 IDE 侧栏中呈现任务输入、对话、代码结果、Add to editor 与复制入口。保留完整工作环境，可以先说明助手与代码之间的空间关系，再进入局部功能。",
    media: media({
      sourceIds: ["rs-result"],
      src: "A11.png",
      alt: "左侧为代码工作区，右侧为 Rubik Studio 助手面板的完整界面",
      caption: "现有设计材料：代码环境、生成结果与采用入口同时可见。",
      truthStatus: "现有设计材料",
      width: 1920,
      height: 1080,
    }),
  }),
  role: linked({
    sourceIds: ["rs-role"],
    title: "我的工作范围",
    rows: [
      { label: "设计职责", value: "负责 Rubik Studio 编程助手全部模块的设计工作" },
      { label: "接手基础", value: "许多产品逻辑和基础框架已被定义" },
      { label: "本案例展示", value: "现有界面材料，以及根据软件结构进行的回顾分析" },
      { label: "GeniusCanvas", value: "作为相关产品场景，用于延伸专业 AI 工具的分析范围" },
      { label: "结果呈现", value: "以界面成果、状态材料和设计判断为主要内容" },
    ],
  }),
  capabilityPath: linked({
    sourceIds: ["rs-capability-path"],
    title: "从需求理解到部署集成的产品能力版图",
    summary:
      "历史长图把 Rubik Studio 的产品能力概括为需求理解、智能生成、可视化编辑、调试优化和部署集成五个阶段。这组表达比单一聊天界面更接近汽车软件开发平台的叙事：AI 助手不是孤立入口，而是被放进从理解任务到交付结果的连续工作。",
    steps: [
      { id: "understand", label: "需求理解", description: "识别用户要解决的问题、任务类型和当前上下文。" },
      { id: "generate", label: "智能生成", description: "生成、解释或修正与开发任务相关的内容。" },
      { id: "edit", label: "可视化编辑", description: "通过界面化操作组织和调整开发内容。" },
      { id: "debug", label: "调试优化", description: "围绕运行问题完成定位、修正和优化。" },
      { id: "deploy", label: "部署集成", description: "把开发结果接入后续构建与交付流程。" },
    ],
  }),
  workspace: linked({
    sourceIds: ["rs-system"],
    title: "用一个工作面板承载不同层次的任务",
    summary:
      "这套界面同时处理环境层、会话层、任务层和结果层的问题。它们虽然集中在一个侧栏中，影响范围却不同：环境提示关乎当前使用条件，会话组织关乎工作线索，任务入口关乎如何发起工作，结果操作关乎某一条输出。区分作用范围，是理解复杂工具的一个切入点。",
    layers: [
      { id: "environment", label: "环境层", purpose: "说明当前环境是否适合使用助手，影响整个面板。", placement: "顶部持续可见" },
      { id: "session", label: "会话层", purpose: "区分、命名并找回不同任务的工作线索。", placement: "靠近面板顶部" },
      { id: "result", label: "结果层", purpose: "承载回答、代码以及围绕单条结果的操作。", placement: "面板主要阅读区域" },
      { id: "task", label: "任务层", purpose: "提供快捷任务、自由输入和继续追问。", placement: "底部稳定操作区" },
    ],
    media: media({
      sourceIds: ["rs-system"],
      src: "workspace-layer-breakdown.gif",
      alt: "Rubik Studio 完整界面逐步拆解为环境、会话、结果和任务四层",
      caption: "根据现有界面重绘的信息结构动画；表示界面归属，不表示后端架构。",
      truthStatus: "回顾性重构",
      width: 1280,
      height: 720,
    }),
  }),
  taskEntry: linked({
    sourceIds: ["rs-task-entry", "rs-code-explanation"],
    title: "让常见任务有入口，也保留自由表达",
    summary:
      "输入区上方提供 Unit Test、Code generation、Code Correction、Code notes 和 Code recommendations。快捷入口有助于把‘我要怎么向 AI 提问’转化为‘我现在要做哪类工作’，自由输入则允许用户补充具体要求。两者配合，能够照顾重复任务和非标准问题。",
    tradeoff:
      "这种组合并非 Rubik 独有，它的价值在于任务的可发现性。快捷入口越多，扫描成本也会增加；当前按钮分为两行，任务名称的抽象层级并不完全一致。若继续迭代，我会结合任务频率和上下文重新决定顺序与分组。",
    codeExplanation:
      "将代码解释与注释展开为选中代码、AI 分析理解、生成解释、生成注释、应用与同步五步，并继续列出函数文档生成、代码重构建议、多文件关联解释、注释规范管理和文档导出分享。这个展开方式说明，解释代码不是一次性回答，而是围绕代码对象、上下文、产物和后续使用形成的一组任务。",
    codeExplanationHighlights: [
      "选中代码、AI 分析理解、生成解释、生成注释、应用与同步",
      "函数文档生成、代码重构建议、多文件关联解释、注释规范管理和文档导出分享",
    ],
    media: [
      media({
        sourceIds: ["rs-task-entry"],
        src: "A07.png",
        alt: "助手输入区上方展示多种代码任务快捷入口",
        caption: "截图证明入口可见，不证明每个入口的执行结果。",
        truthStatus: "现有设计材料",
        width: 1920,
        height: 1080,
      }),
      media({
        sourceIds: ["rs-code-explanation"],
        src: "G03-code-explanation-five-step-strip.png",
        alt: "由选中代码、分析、解释、注释和采用组成的五张概念界面",
        caption: "对于选中代码进行针对性分析与解释，再生成注释并完成应用与同步，让理解、修改和采用形成连续流程。",
        truthStatus: "生成概念视觉",
        width: 2172,
        height: 724,
      }),
      media({
        sourceIds: ["rs-code-explanation"],
        src: "G04-extended-capabilities-five-card-strip.png",
        alt: "函数文档、代码重构、多文件关系、注释管理和文档导出的五张概念界面",
        caption: "进一步覆盖函数文档生成、代码重构建议、多文件关联解释、注释规范管理和文档导出分享，让代码理解产生可维护、可协作和可复用的后续产物。",
        truthStatus: "生成概念视觉",
        width: 2172,
        height: 724,
      }),
    ] satisfies RubikMedia[],
  }),
  adoption: linked({
    sourceIds: ["rs-adoption", "rs-adoption-flow"],
    title: "把生成结果与采用动作分开",
    summary:
      "结果可见与结果被采用，是两个不同的时刻。A11 在代码块下提供 Add to editor 和复制入口，让用户在采用前查看内容，也让‘AI 返回了一段代码’和‘代码进入工作区’在界面上有所区分。",
    analysis:
      "这是我对 AI 工具交互的重要理解：生成结果之后，仍需说明结果将作用于哪个文件、插入什么位置、修改多大范围。若继续迭代，我会进一步加入差异预览、撤销和恢复能力。",
    flowTitle: "从请求到采用入口",
    flow: [
      { from: "输入任务请求", to: "查看生成内容", evidence: "截图可见" },
      { from: "查看生成内容", to: "Add to editor", evidence: "截图可见" },
      { from: "查看生成内容", to: "复制", evidence: "截图可见" },
      { from: "采用入口", to: "实际写入、验证与恢复", evidence: "材料未覆盖" },
    ],
    boundary:
      "采用入口不能证明插入位置、覆盖规则、撤销、编译或测试行为。差异预览和恢复是后续改进方向。",
  }),
  sessions: linked({
    sourceIds: ["rs-session", "rs-session-sequence"],
    title: "把会话变成能够再次找到的工作线索",
    summary:
      "会话菜单提供新建、命名和删除入口；历史列表则用问题摘要、时间和分页呈现以往内容。新建会话服务于任务区分，命名帮助建立可识别的线索，历史列表帮助回到之前的问题。它们共同处理的是任务组织与检索，而不只是聊天窗口的数量。",
    tradeoff:
      "会话越多，命名和查找成本越明显。列表需要帮助用户定位具体项目，并清楚区分会话历史与模型长期记忆。",
    openQuestions: ["能否按项目定位会话", "历史内容能否继续提问", "删除如何影响历史与上下文"],
    media: [
      media({
        sourceIds: ["rs-session-sequence"],
        src: "session-management-flow.png",
        alt: "会话列表、命名当前任务和历史记录组成的三步流程",
        caption: "由现有界面状态整理成的流程图，不代表连续操作录屏。",
        truthStatus: "回顾性重构",
        width: 1500,
        height: 780,
      }),
      media({
        sourceIds: ["rs-session-sequence"],
        src: "A01.png",
        alt: "Rubik Studio 会话菜单",
        caption: "会话菜单包含新建和管理入口。",
        truthStatus: "现有设计材料",
        width: 1920,
        height: 1080,
      }),
      media({
        sourceIds: ["rs-session-sequence"],
        src: "A02.png",
        alt: "Rubik Studio 会话名称编辑状态",
        caption: "通过命名把一次对话转化为可识别的工作线索。",
        truthStatus: "现有设计材料",
        width: 1920,
        height: 1080,
      }),
      media({
        sourceIds: ["rs-session-sequence"],
        src: "A04.png",
        alt: "包含摘要、时间和分页的历史会话列表",
        caption: "历史列表支持通过问题摘要、时间与分页快速扫描并找回工作线索。",
        truthStatus: "现有设计材料",
        width: 1920,
        height: 1080,
      }),
    ] satisfies RubikMedia[],
  }),
  states: linked({
    sourceIds: ["rs-state", "rs-state-matrix"],
    title: "让问题出现在对应的作用范围",
    summary:
      "环境提示位于面板顶部，输入计数靠近输入框，生成异常出现在对话区域。位置差异表达了问题的作用范围：当前环境、当前请求或者本次生成。专业工具还需要让提示含义与操作是否可执行保持一致，并解释用户下一步可以做什么。",
    rows: [
      { state: "当前环境可用", placement: "面板顶部", unknown: "检测依据与数据去向", question: "提示是否足以解释可用范围" },
      { state: "当前处于外网环境", placement: "面板顶部", unknown: "是否阻断以及哪些数据受限", question: "风险与发送权限是否一致" },
      { state: "输入超过限制", placement: "输入框附近", unknown: "禁用、截断或报错规则", question: "用户如何在原地修正" },
      { state: "本次生成失败", placement: "对话结果区域", unknown: "错误分类、重试和输入保留", question: "怎样解释原因并支持恢复" },
    ],
    evidence: [
      media({ sourceIds: ["rs-state-matrix"], src: "A08.png", alt: "面板顶部显示外网环境风险提示", caption: "提示风险，但不能单独证明数据发送已经被阻断。", truthStatus: "现有设计材料", width: 1920, height: 1080 }),
      media({ sourceIds: ["rs-state-matrix"], src: "A09.png", alt: "输入区显示红色超限计数但发送图标仍高亮", caption: "用于讨论限制信息和操作状态是否一致。", truthStatus: "现有设计材料", width: 1920, height: 1080 }),
      media({ sourceIds: ["rs-state-matrix"], src: "A18.png", alt: "对话结果区域显示包含占位文字的异常提示", caption: "异常原因和恢复动作仍不完整。", truthStatus: "现有设计材料", width: 1920, height: 1080 }),
    ] satisfies RubikMedia[],
  }),
  feedback: linked({
    sourceIds: ["rs-feedback", "rs-feedback-sequence"],
    title: "从快速评价进入具体问题",
    summary:
      "界面把赞踩放在回答附近，进一步的反馈浮层允许补充建议或问题详情，以及期望的答案代码。这种层次将快速评价和详细说明分开，使用户可以从对某条回答的判断进入更具体的反馈。",
    enterpriseValue:
      "对于依赖企业知识与自有模型能力的产品，绑定到具体回答的反馈可为人工校正、知识维护和模型评估提供材料。现有界面没有证明这些材料已经进入自动训练闭环。",
    iteration:
      "填写成本也是设计取舍。让用户提供期望代码并不总是合适，尤其当用户本来就需要帮助。若继续迭代，我会先区分不相关、无法运行、解释不清等问题类型，再把详细描述和期望代码保持为可选。",
    media: media({
      sourceIds: ["rs-feedback-sequence"],
      src: "answer-feedback-flow.png",
      alt: "从评价当前回答到填写问题和期望答案的反馈流程",
      caption: "由三种界面状态整理；不证明提交、存储或后端处理流程。",
      truthStatus: "回顾性重构",
      width: 1500,
      height: 780,
    }),
  }),
  geniusCanvas: linked({
    sourceIds: ["rs-genius"],
    title: "场景延伸：从编程辅助到汽车 HMI 创作",
    summary:
      "2023 年公开发布报道将 Rubik GeniusCanvas 描述为基于 Rubik Studio 与 Kanzi 的相关产品应用，服务于概念创作、3D 元素、特效代码和场景搭建。",
    boundary:
      "GeniusCanvas 是相关产品背景，不计入我的个人设计交付。下面的产品关系来自公开材料，生成视觉只用于重建长图的展示清晰度。",
    relationship: [
      { from: "Rubik Studio", to: "Rubik GeniusCanvas" },
      { from: "Kanzi：HMI 设计软件与 3D 引擎", to: "Rubik GeniusCanvas" },
      { from: "Rubik GeniusCanvas", to: "概念、3D 元素、特效与场景创作" },
    ],
    directions: ["宽阔高效界面", "沉浸式代码体验", "智能对话面板", "可视化预览与调试", "组件化资源管理"],
    transferQuestion:
      "当生成对象从代码变成视觉或 3D 内容，用户仍需要知道修改作用于哪个对象、结果能否继续编辑，以及怎样检查和回退。这说明作用范围、工作线索、结果判断和出错恢复，是能够迁移到不同专业创作工具中的设计问题。",
    transferRows: [
      { question: "作用范围", studio: "代码块与 Add to editor 入口", hmi: "修改的是场景、对象还是属性？" },
      { question: "工作线索", studio: "会话名与历史摘要", hmi: "如何回到某个设计意图或版本？" },
      { question: "结果判断", studio: "内容预览与结果反馈", hmi: "怎样检查预览、可编辑性与约束？" },
      { question: "出错之后", studio: "生成异常提示", hmi: "能否保留原状态并恢复？" },
    ],
    media: [
      media({ sourceIds: ["rs-genius"], src: "G06-geniuscanvas-cockpit-scene.png", alt: "从后排视角观察的汽车座舱三维概念场景", caption: "用于 GeniusCanvas 主视觉的生成概念场景，不是真实产品截图。", truthStatus: "生成概念视觉", width: 1672, height: 941 }),
      media({ sourceIds: ["rs-genius"], src: "G08-geniuscanvas-five-highlight-strip.png", alt: "五张深色汽车 HMI 与三维创作工具概念界面", caption: "依据历史长图的五项界面方向生成，标题和说明由网页原生内容承载。", truthStatus: "生成概念视觉", width: 2172, height: 724 }),
    ] satisfies RubikMedia[],
  }),
  reflection: linked({
    sourceIds: ["rs-reflection"],
    title: "专业 AI 工具的体验延伸到结果之后",
    statement:
      "回看 Rubik Studio，我更看重生成前后的操作关系：任务如何表达，结果如何采用，工作如何回看，失败如何被理解。这些关系共同决定 AI 能力能否进入可持续的专业工作。",
    evidenceBoundary:
      "进一步证明实际成效仍需要交付状态、使用观察与验证记录，因此本案例以设计结果和判断深度作为主要证据。",
  }),
} as const;

export const rubikStudioCompositionBalance = {
  textUnits: 11,
  visualUnits: 17,
  visualShare: 17 / 28,
} as const;
