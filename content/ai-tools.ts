/** Site-level tool list. Usage confirmed by the owner; descriptions identify products, not proficiency. */
export const aiToolsCopy = {
  en: { title: "AI & design tools I work with" },
  zh: { title: "我使用的 AI 与设计工具" },
} as const;

export const aiTools = [
  {
    id: "codex", name: "Codex (ChatGPT)", logo: "/assets/tool-logos/openai.svg",
    href: "https://openai.com/codex/",
    description: { en: "Coding agent", zh: "编程助手" },
  },
  {
    id: "claude-code", name: "Claude Code", logo: "/assets/tool-logos/claude.png",
    href: "https://claude.com/product/claude-code",
    description: { en: "Coding agent", zh: "编程助手" },
  },
  {
    id: "relume", name: "Relume", logo: "/assets/tool-logos/relume.png",
    href: "https://www.relume.ai/",
    description: { en: "Sitemaps & wireframes", zh: "网站结构与线框" },
  },
  {
    id: "refero", name: "Refero", logo: "/assets/tool-logos/refero.png",
    href: "https://refero.design/",
    description: { en: "Design references", zh: "设计参考" },
  },
  {
    // Harness usage is owner-provided. The link identifies the DeepSeek brand, not an inferred harness repository.
    id: "deepseek", name: "DeepSeek", logo: "/assets/tool-logos/deepseek.ico",
    href: "https://www.deepseek.com/",
    description: { en: "Agent harness", zh: "Agent Harness" },
  },
  {
    id: "workbuddy", name: "WorkBuddy", logo: "/assets/tool-logos/workbuddy.svg",
    href: "https://copilot.tencent.com/work/",
    description: { en: "AI workspace", zh: "AI 工作台" },
  },
] as const;
