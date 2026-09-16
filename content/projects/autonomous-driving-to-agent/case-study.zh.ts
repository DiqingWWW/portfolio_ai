import selection from "./case-study.selection.json";

export const autonomousAgentCaseStudy = {
  title: "自动驾驶：人机共驾视角下的 Agent 设计范式",
  dek: "当 AI 从回答问题走向执行任务，设计的核心问题也从能力扩展为控制权、协作关系与责任边界。",
  boundary: "这是一项设计研究与结构类比，不是自动驾驶安全性的量化评估，也不代表相关概念界面已经实现或经过用户验证。",
  thesis: {
    sourceIds: ["adr-thesis-01"],
    title: "当机器拥有行动权",
    paragraphs: [
      "过去几年，大众对 AI 的主要认知来自生成式模型：写文案、回答问题、生成图片、辅助编程。这类系统的核心价值主要在于提升信息处理效率，因此讨论常聚焦于模型是否更聪明、更准确、更像人。",
      "当 AI 从生成内容进一步走向执行任务，问题的性质开始变化。一个能够自主订票、发邮件、调用软件、管理日程或控制设备的 Agent，不再只是提供建议，而会直接介入现实结果。",
    ],
    questions: ["它在什么情况下可以自主行动？", "做错事后如何停止、修正或回滚？", "用户如何理解它正在做什么？", "系统判断与人的判断冲突时，谁最终决定？"],
    proposition: "Agent 的挑战正在从单纯的能力问题，扩展为控制权、协作关系与责任边界的问题。",
    drivingReference: "自动驾驶为这组问题提供了一个具有现实意义的参照。它具备感知、决策、执行与反馈的自主闭环，同时必须在人类监督、安全约束、法律责任与复杂环境中运行。本研究将“自动驾驶是目前较成熟、较完整落地的高风险 Agent 参照范式”作为研究观点，而不是已经被行业统一验证的结论。",
  },
  agentLoop: {
    sourceIds: ["adr-agent-loop-01"],
    title: "为什么自动驾驶接近 Agent",
    paragraphs: [
      "在 AI 与 Robotics 的经典描述中，Agent 能够持续感知环境、做出决策、执行动作，并根据反馈动态调整行为。其基本闭环可以概括为：",
      "自动驾驶系统几乎完整对应这一闭环。它处理的不是静态文本或单次 API 调用，而是持续变化的物理环境：道路状态、行人行为、天气光照、其他驾驶者及临时交通规则都会改变下一步行动。系统必须在有限时间内形成判断并把判断转化为现实动作。",
    ],
    agentFlow: ["Perception", "Planning", "Action", "Feedback"],
    drivingFlow: [
      "多模态传感器（Camera / Radar / LiDAR）",
      "环境理解（Perception）",
      "决策与路径规划（Planning）",
      "车辆控制（Control）",
      "车辆动作（Steering / Braking / Acceleration）",
      "环境反馈并持续修正",
    ],
    media: { src: "autonomous-driving-agent-relationship.png", alt: "自动驾驶与 Agent 的结构关系图", width: 2098, height: 749 },
  },
  riskReference: {
    sourceIds: ["adr-risk-reference-01"],
    title: "为什么说自动驾驶是目前最成熟的高风险 Agent 范式？",
    summary: "这里的“成熟”不是问题已被解决，而是自动驾驶比多数数字 Agent 更早、更完整地暴露了自主系统必须共同面对的约束。",
    closing: "高风险约束使自动驾驶必须讨论冗余、fail-safe、fallback、人类接管和极端情况保护。它因此不是未来通用 Agent 的答案，而是一个已经把关键问题带入现实的设计实验场。",
    rows: [
      ["环境", "文字、结构化数据、软件接口等抽象信息", "动态物理世界与持续 world model"],
      ["决策时限", "许多生成式 AI 可以思考几秒钟再回答", "需要实时、稳定的判断与动作"],
      ["行动风险", "做错事通常只是效率损失或内容错误", "可能影响财产与人身安全"],
      ["人机关系", "容易被理解为单点自动化或被动执行者", "辅助、监督、接管与自主之间切换"],
      ["责任治理", "多数法律与责任问题仍处于讨论阶段", "监管、日志、误用与责任归属已进入现实"],
      ["长期信任", "短期准确率容易掩盖系统波动", "依赖稳定、可预测和异常可管理"],
    ],
  },
  control: {
    sourceIds: ["adr-control-continuum-01"],
    title: "从智能驾驶到自动驾驶：控制权如何迁移",
    intro: "从设计视角看，L1–L5 不只是技术能力等级，也可以理解为控制主体与用户角色持续变化的过程。",
    summary: "自动化程度越高，设计问题越集中于：谁在什么条件下拥有最终决定权。L3 尤其值得研究，因为系统能够自主运行一段时间，却仍需要人在异常时接管。提醒过早会造成干扰，过晚则可能失去有效接管窗口；用户也容易因为系统大部分时间表现良好而高估其能力。",
    analogy: "这种结构与今天许多 LLM Agent 相似：它们能够执行任务，却仍需要人类审核；系统能力、用户期待与实际责任并不总是同步。",
    levels: [
      { level: "L1", control: "人类主导", role: "驾驶者", experience: "AI 被动执行，用户保持完全控制" },
      { level: "L2", control: "人类主导 + AI 辅助", role: "持续监督者", experience: "辅助决策是否清晰、稳定、不过度承诺" },
      { level: "L3", control: "AI 条件主导", role: "随时接管者", experience: "注意力、接管时机、风险理解与责任边界" },
      { level: "L4", control: "AI 在限定条件内主导", role: "乘客", experience: "系统边界是否明确，异常时如何进入 fallback" },
      { level: "L5", control: "AI 完全主导", role: "被服务对象", experience: "完全自主条件下的治理、责任与信任" },
    ],
  },
  dimensionsIntro: {
    sourceIds: ["adr-five-dimensions-01"],
    title: "高风险 Agent 的五大设计维度",
    bridge: "前面的闭环、风险约束与控制权迁移共同说明：只讨论 Agent 能否完成任务还不够。设计还必须同时约束它追求什么目标、允许采取什么行为、如何被理解和撤回、拥有哪些权力，以及如何从反馈中学习。由此形成五个相互关联的设计维度。",
    summary: "五个维度共同决定系统的安全性、可用性与可信赖程度。它们不是线性步骤，而是围绕行动权同时发生的约束。图片呈现完整概念界面，旁边的 HTML 原型让关键行为可以被真实操作。",
    media: { src: "high-risk-agent-five-dimensions.png", alt: "高风险 Agent 的五大设计维度关系图", width: 2098, height: 749 },
  },
  dimensions: [
    { id: "goal", title: "目标与协作设计", english: "Goal & Collaboration", summary: "自动驾驶并不是自由行动者，它的目标被交通规则、运行条件和从 A 到 B 的任务严格约束。面向更复杂的 Agent，系统还需要把模糊目标清晰化，处理长期目标与短期目标的冲突，在执行过程中确认偏好，并允许人与 Agent 共同修订目标。多 Agent 场景还需要协调计划与解决冲突。", image: "concept-goal-collaboration.png", alt: "目标与协作设计的未来 Agent 概念界面", caption: "概念界面：Agent 将模糊意图转化为共同目标、成功标准、约束与里程碑，并在执行前等待用户确认。该画面用于展示交互原则，不代表已经实现或验证的产品。", interactionTitle: "共同目标确认器" },
    { id: "behavior", title: "行为设计", english: "Behavior Design", summary: "模型负责形成候选判断，行为设计决定系统是否可以行动、如何行动、行动到哪一步。它包括四个部分：行为约束、触发条件、失败路径与回滚机制。复杂任务中，可回退的自动化往往与自动化能力本身同等重要。", image: "concept-behavior-design.png", alt: "行为设计的未来 Agent 概念界面", caption: "概念界面：系统把行动拆分为可自动执行、需要确认与禁止执行三种权限状态，并提供执行检查点、暂停和回滚。该画面用于展示交互原则，不代表已经实现或验证的产品。", interactionTitle: "行动权限检查点" },
    { id: "trust", title: "信任与体验设计", english: "Trust & Experience", summary: "信任不只来自平均准确率，也来自可预测性、可理解性与可回退性。用户需要知道系统看到了什么、正在做什么、为什么这样做，以及下一步可能做什么。当自动化突然产生用户未预期的行为时，即使系统总体表现良好，也可能造成 Automation Surprise。解释性因此不仅服务于事后理解，也服务于事前预期管理。", image: "concept-trust-experience.png", alt: "信任与体验设计的未来 Agent 概念界面", caption: "概念界面：Agent 在修改日程前展示观察、理由、不确定性与下一步，并暂停预期外变更供用户预览。该画面用于展示交互原则，不代表已经实现或验证的产品。", interactionTitle: "变更解释与预览" },
    { id: "power", title: "权力与伦理边界", english: "Power & Ethical Boundaries", summary: "自动驾驶拥有行动权、感知权与数据权；未来 Agent 还可能拥有经济权、社交权和信息排序带来的认知影响。设计必须明确最终决策权、数据收集边界、过度依赖风险，以及哪些高风险操作必须由人确认，同时保存可审计的责任链。", image: "concept-power-ethics.png", alt: "权力与伦理边界的未来 Agent 概念界面", caption: "概念界面：权限地图将行动权、感知权、数据权、经济权与社交权分开授权，并把人类确认、数据边界和责任链放在同一决策界面中。该画面用于展示交互原则，不代表已经实现或验证的产品。", interactionTitle: "权限与责任关口" },
    { id: "learning", title: "自适应与学习设计", english: "Adaptation & Learning", summary: "Agent 可以根据环境与反馈调整风险偏好、主动程度与协作节奏，但学习也可能强化错误、积累偏见或奖励激进策略。因此自适应需要可见、可控、可纠正，并允许用户理解和重置已经形成的偏好。", image: "concept-adaptation-learning.png", alt: "自适应与学习设计的未来 Agent 概念界面", caption: "概念界面：用户可以查看偏好的学习来源、比较行为变化、识别策略漂移，并纠正假设或重置学习。该画面用于展示交互原则，不代表已经实现或验证的产品。", interactionTitle: "可控学习面板" },
  ],
  principles: {
    sourceIds: ["adr-principles-01"],
    title: "从自动驾驶迁移到 Agent 的设计原则",
    groups: [
      ["用户控制与授权", "关键决策保留控制权；系统可暂停、取消、修正与回滚；采用渐进式自动化。"],
      ["透明与解释", "显示状态、原因、依据与下一步；明确源数据、可靠性与不确定性。"],
      ["协作与期望对齐", "执行前明确目标与成功条件；分阶段反馈，并允许持续校正。"],
      ["权限、伦理与责任", "定义不可跨越的边界；记录审计轨迹；高风险行为设置人类确认。"],
      ["可学习与可控自适应", "让主动程度与策略可调节、可解释、可纠正、可重置。"],
    ],
  },
  conclusion: {
    sourceIds: ["adr-conclusion-01"],
    title: "结论：Agent 设计的核心是可治理的行动权",
    paragraphs: [
      "自动驾驶提供的最大启发，不是把所有 Agent 都设计成汽车界面，而是把自主系统看作一套持续分配控制权的关系：系统何时建议、何时行动、何时等待、何时让渡，以及每次行动如何被理解、监督和追溯。",
      "当 Agent 从回答问题走向执行任务，能力仍然重要，但能力必须嵌入可预测、可理解、可暂停、可回退和可审计的行为边界中。",
    ],
    quote: "一个值得信任的 Agent，不只是更聪明的模型，而是一个其行动权可以被人类理解和治理的系统。",
    open: ["本研究是基于自动驾驶与 Agent 结构相似性的设计类比，不是自动驾驶安全性的量化评估。", "文中没有提供事故率、反应时间、监管覆盖或用户研究数据，因此不据此声称自动驾驶已实现普遍安全或完全成熟。", "L1–L5 在本研究中用于观察控制权迁移；具体工程与法规定义需在后续研究中引用权威标准核对。", "Automation Surprise、责任分配和长期信任值得在后续版本中补充原始研究、标准与案例证据。", "设计原则仍需通过具体 Agent 场景、原型测试和真实用户反馈验证。"],
  },
} as const;

const publishedSourceIds = selection.units.filter((unit) => unit.selection !== "appendix").map((unit) => unit.id);
const usedSourceIds = new Set<string>([
  ...autonomousAgentCaseStudy.thesis.sourceIds,
  ...autonomousAgentCaseStudy.agentLoop.sourceIds,
  ...autonomousAgentCaseStudy.riskReference.sourceIds,
  ...autonomousAgentCaseStudy.control.sourceIds,
  ...autonomousAgentCaseStudy.dimensionsIntro.sourceIds,
  ...autonomousAgentCaseStudy.principles.sourceIds,
  ...autonomousAgentCaseStudy.conclusion.sourceIds,
]);

export const autonomousAgentSourceCoverage = (() => {
  const missing = publishedSourceIds.filter((id) => !usedSourceIds.has(id));
  if (missing.length) throw new Error(`自动驾驶到 Agent 页面遗漏事实母版单元：${missing.join(", ")}`);
  return { usedUnits: usedSourceIds.size, publishableUnits: publishedSourceIds.length };
})();
