/** Localized labels for the owner-approved blueprint; topology lives in the renderer. */
export const workflowDiagramCopy = {
  sourceIds: ["pos-narrative-2026-10-08"],
  zh: {
    title: "AI-native 工作流程", human: "Human / 人", ai: "AI / 执行",
    humanRole: "目标 · 审美 · 判断 · 最终批准", aiRole: "探索 · 生成 · 实现 · 重构 · 迭代",
    nodes: {
      goals: ["目标与意图", "Strategy · Taste"], context: ["读取共享依据", "事实 / 当前状态 / 适用规则"],
      plan: ["拆解与计划", "明确范围及检查条件"], scope: ["确认范围与权限", "扩大范围时重新确认"],
      route: ["进入相关工作区", "不必每次从头重做"], content: ["内容区", "整理事实"], design: ["设计区", "Figma / 视觉"], code: ["开发区", "可运行页面"],
      facts: ["批准公开事实", "内容任务的检查点"], check: ["检查可交回的结果", "来源 / 状态 / 响应式 / 运行"],
      review: ["最终评审与采用", "设计成为最后的守门员"], record: ["保存接受的结果与决定", "拒绝的候选不自动成为规则"],
      feedback: ["指出问题，调整方向", "事实 / 视觉 / 实现 → 对应工作区"], deliver: ["本地交付", "未授权发布时，本轮在此结束"],
      release: ["单独批准发布", "只有需要发布时"], publish: ["授权后发布", "不属于默认自动执行"],
    },
    edges: { confirm: "确认", approve: "批准", accept: "采用", return: "退回", replan: "按反馈重新计划", optional: "需组成网页时", next: "下轮读取", release: "需发布时" },
    legend: "实线：当前协作关系　虚线：条件步骤 / 下轮读取",
  },
  en: {
    title: "AI-native workflow", human: "Human", ai: "AI",
    humanRole: "Strategy · Taste · Judgement · Approval", aiRole: "Explore · Generate · Implement · Iterate",
    nodes: {
      goals: ["Goals and intent", "Strategy · Taste"], context: ["Read shared context", "Facts / Current state / Rules"],
      plan: ["Decompose and plan", "Define scope and checks"], scope: ["Agree scope and authority", "Confirm again if scope expands"],
      route: ["Enter the relevant workspace", "Do not restart the entire process"], content: ["Content", "Organize facts"], design: ["Design", "Figma / Visuals"], code: ["Development", "Runnable page"],
      facts: ["Approve public facts", "Content task checkpoint"], check: ["Check inspectable results", "Sources / States / Responsive / Runtime"],
      review: ["Final review and adoption", "Design is the final gatekeeper"], record: ["Record accepted results and decisions", "Rejected proposals do not become rules"],
      feedback: ["Identify issues; adjust direction", "Facts / Visuals / Code → Relevant workspace"], deliver: ["Local delivery", "End here without release authorization"],
      release: ["Authorize release separately", "Only when publishing is needed"], publish: ["Publish after authorization", "Not a default autonomous step"],
    },
    edges: { confirm: "Agree", approve: "Approve", accept: "Adopt", return: "Return", replan: "Replan from feedback", optional: "If a page is needed", next: "Next-task read", release: "If release is needed" },
    legend: "Solid: current relationships   Dashed: conditional / next-task paths",
  },
} as const;
