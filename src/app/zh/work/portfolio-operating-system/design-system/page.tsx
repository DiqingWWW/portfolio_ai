import type { Metadata } from "next";
import SystemPage from "@/app/proto/design-system-directions/deethin-system-v2/SystemPage";

export const metadata: Metadata = {
  title: "Portfolio AI — 设计系统",
  description: "Portfolio AI 项目的设计系统候选规范。",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SystemPage projectHref="/zh/work/portfolio-operating-system" locale="zh" />;
}
