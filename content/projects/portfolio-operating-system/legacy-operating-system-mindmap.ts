export interface LegacyOperatingSystemMindmapNode {
  label: string;
  children: LegacyOperatingSystemMindmapNode[];
}

export const legacyOperatingSystemMindmap: LegacyOperatingSystemMindmapNode = {
  label: "Portfolio Operating System",
  children: [
    {
      label: "体验层",
      children: [
        { label: "空间化 Workspace", children: [] },
        { label: "窗口与动效", children: [] },
        { label: "常规项目路径", children: [] },
      ],
    },
    {
      label: "内容层",
      children: [
        { label: "Project", children: [] },
        { label: "Tag", children: [] },
        { label: "Asset", children: [] },
        { label: "Case Study", children: [] },
        { label: "全局内容", children: [] },
      ],
    },
    {
      label: "治理层",
      children: [
        { label: "Portfolio OS", children: [] },
        { label: "Current System", children: [] },
        { label: "迁移计划", children: [] },
        { label: "审计", children: [] },
        { label: "AI Working Agreement", children: [] },
      ],
    },
  ],
};
