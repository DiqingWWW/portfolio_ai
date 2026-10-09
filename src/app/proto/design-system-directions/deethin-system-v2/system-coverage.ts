/** Coverage records distinguish deployed source evidence from owner-approved specimens.
 * Source stylesheet retrieved from deethin.site on 2026-10-05; production is unchanged. */
export const systemCoverage = {
  title: "Homepage coverage & review extensions",
  intro: "规范页与 Figma 资产不是实时同步的。这里分别列出已有规范、线上首页源码与本轮待定项，避免把网页里出现的值自动算作批准。",
  homeTitle: "首页组合也要有规范",
  homeIntro: "已对照 www.deethin.site 的部署 CSS 与本地生产源码。首屏保留原有设计；正式首页首屏后的组合、项目卡片、Portfolio 审阅页与本目录现在使用同一个 token 入口。下方保留来源与待定状态，补充值不自动算作 Figma 批准。",
  homePatterns: [
    { name: "Evidence / inverse", source: "fabrica.module.css / .caseSection · .caseEvidence", values: "黑色章节 / 深灰卡片 / 4 → 2 → 1 列 / 18px 圆角", href: "/#work", role: "深色表面与证据内容组合；不等同于所有页面 dark mode" },
    { name: "Contact / inverse + light", source: "fabrica.module.css / .contactSection · .contactStory", values: "并置深浅表面 / 24px 面板 / 28px 内距 / 独立表单", href: "/", role: "完整 Contact 组合；控件复用规范现有 form 与 button" },
    { name: "Scroll / editorial reveal", source: "FabricaMotion.tsx + fabrica.module.css:699–717", values: "800/950ms · 40px 位移 · 7px 模糊 · 一次进入", href: "/#work", role: "滚动到每组内容时揭示；默认可见、减少动态直接显示" },
    { name: "Hero / interactive field", source: "HeroExperience.tsx / smoke-renderer.ts", values: "WebGL 光场 / 开场时序 / 静态 fallback", href: "/", role: "已有 Hero 拆解继续保留；fallback 不代表完整交互复刻" },
  ],
  bindingTitle: "当前 Figma 使用的是 Paint Style 链",
  binding: ["Inuse numeric COLOR primitive", "Semantic Paint Style", "Node Fill / Stroke", "Manual CSS mapping", "Representative page + states"],
  bindingNote: "来源：2026-10-04 绑定清单及 2026-09-27 foundation 审计。Light / Inverse 是使用环境，不是自动 mode。下方旧 Semantic-Colors / Component-colors variable manifest 是历史提案，不作为当前 Figma 资产。",
  legacy: "历史变量架构提案（不是当前 Inuse 的实施方式）",
  pendingTitle: "新增与待定项：状态不能混用",
  pendingNote: "浅蓝辅助表面已按业主最新反馈撤销，不再作为可用扩展。现有按钮、muted 与 focus 从规范复用；尚未确认的映射和组合独立列出。Figma 本轮因调用额度限制没有重新读取，不能据此声明缺少资产。",
  decisionTitle: "小型判断卡片与现有按钮",
  decision: "内容常驻可读，细指针 hover 显示既有 Overlay/Modal 阴影；这是本轮业主要求的用法，不新增阴影色值。",
  button: "查看规范组件",
  quiet: "Gallery control / quiet",
  viewHome: "查看首页组合",
  viewSourceTokens: "查看线上组合 token（Current source，不冒充 Figma 批准）",
  pendingHeaders: ["角色", "值", "状态与来源", "用途"],
} as const;
