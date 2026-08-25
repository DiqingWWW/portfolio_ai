"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface MindmapNode {
  label: string;
  children: MindmapNode[];
}

const labelTranslations: Record<string, string> = {
  "驾驶情境与有限注意力": "Driving context & limited attention",
  "硬件配置": "Hardware configurations",
  "分布式座舱": "Distributed cockpit",
  "中控单屏": "Single center display",
  "横屏": "Landscape",
  "竖屏": "Portrait",
  "仪表 + 中控 + 副驾屏": "Cluster + center + passenger displays",
  "中控 + 仪表": "Center display + cluster",
  "横竖屏组合": "Landscape / portrait combination",
  "联体式座舱": "Integrated cockpit",
  "三联屏": "Triple display",
  "三联屏 + 车控屏": "Triple display + vehicle controls",
  "二联屏": "Dual display",
  "中控 + 副驾连屏": "Center + passenger continuous display",
  "设计原则": "Design principles",
  "人机关系": "Human–machine relationship",
  "用户": "User",
  "目的": "Goal",
  "场景": "Context",
  "行为": "Behavior",
  "媒介": "Medium",
  "组件定义": "Component definition",
  "组件构成": "Component anatomy",
  "组件类型": "Component types",
  "组件状态": "Component states",
  "常用组合样式": "Common compositions",
  "使用建议": "Usage guidance",
  "尺寸与对齐关系": "Size & alignment",
  "组件框架": "Component framework",
  "风格调用规则": "Style reference rules",
  "组件动效规范": "Component motion guidance",
  "Token 命名规范": "Token naming rules",
  "响应式": "Responsive behavior",
  "自适应规则": "Adaptation rules",
  "组件": "Components",
  "组件模板": "Component templates",
  "页面模板": "Page templates",
  "屏幕倍数": "Screen scale factors",
  "PPI 适配": "PPI adaptation",
  "全球化语言与国家适配": "Language & market adaptation",
};

function displayLabel(label: string, locale: "en" | "zh") {
  return locale === "en" ? labelTranslations[label] ?? label : label;
}

function Branch({ node, path, locale, depth = 0 }: { node: MindmapNode; path: string; locale: "en" | "zh"; depth?: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children.length > 0;

  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-0 before:h-5 before:w-4 before:rounded-bl-lg before:border-b before:border-l before:border-neutral-300">
      {hasChildren ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${path}-children`}
          onClick={() => setExpanded((current) => !current)}
          className="group flex min-h-10 w-full items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-left text-sm font-medium text-neutral-700 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.5)] transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent"
        >
          <span>{displayLabel(node.label, locale)}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      ) : (
        <span className="block rounded-lg px-3 py-2 text-sm leading-5 text-neutral-600">
          {displayLabel(node.label, locale)}
        </span>
      )}

      {hasChildren && expanded && (
        <ul id={`${path}-children`} className="mt-2 space-y-2 border-l border-neutral-200 pl-3">
          {node.children.map((child, index) => (
            <Branch key={`${path}-${index}-${child.label}`} node={child} path={`${path}-${index}`} locale={locale} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function InteractiveMindmap({ tree, locale, instruction, emptyText }: { tree: MindmapNode; locale: "en" | "zh"; instruction: string; emptyText: string }) {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(() => {
    const designPlatformIndex = tree.children.findIndex((branch) => branch.label === "Design Platform");
    return designPlatformIndex >= 0 ? designPlatformIndex : null;
  });

  return (
    <section aria-labelledby="honda-system-map-title" className="aspect-square max-h-[44rem] overflow-hidden rounded-2xl bg-[#ece9e4] p-4 sm:aspect-[16/10] sm:p-6 lg:aspect-[16/9]">
      <div className="mx-auto max-w-3xl text-center">
        <h4 id="honda-system-map-title" className="text-xl font-semibold tracking-[-0.02em] text-neutral-800 sm:text-2xl">
          {displayLabel(tree.label, locale)}
        </h4>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          {instruction}
        </p>
      </div>

      <div className="mt-5 flex h-[calc(100%-5.5rem)] min-h-0 flex-col">
        <ul className="grid shrink-0 gap-2 sm:grid-cols-3">
          {tree.children.map((branch, index) => (
            <li key={branch.label}>
              <button
                type="button"
                aria-pressed={selectedBranch === index}
                onClick={() => setSelectedBranch((current) => current === index ? null : index)}
                className={`min-h-12 w-full rounded-xl px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent ${selectedBranch === index ? "bg-neutral-800 text-white" : "bg-white text-neutral-800 hover:bg-neutral-50"}`}
              >
                {displayLabel(branch.label, locale)}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto rounded-xl bg-white/55 p-3">
          {selectedBranch === null ? (
            <p className="flex h-full items-center justify-center px-6 text-center text-sm leading-6 text-neutral-500">
              {emptyText}
            </p>
          ) : (
            <ul className="space-y-2">
              {tree.children[selectedBranch].children.map((child, childIndex) => (
                <Branch key={`${selectedBranch}-${child.label}`} node={child} path={`branch-${selectedBranch}-${childIndex}`} locale={locale} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
