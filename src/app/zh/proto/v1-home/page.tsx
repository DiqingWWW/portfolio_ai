import type { Metadata } from "next";
import { PortfolioHome } from "@/components/PortfolioHome";

// V1 主页的中文版，用于 review 与回滚期间保持可访问。
// 未接入正式导航，并已排除搜索引擎收录。
export const metadata: Metadata = {
  title: "V1 主页 — Diqing Wu",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PortfolioHome locale="zh" />;
}
