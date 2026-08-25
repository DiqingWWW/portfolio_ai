import type { Metadata } from "next";
import PortfolioOperatingSystemCaseStudyPage from "@/components/case-study/PortfolioOperatingSystemCaseStudyPage";
import { caseStudyTitle, portfolioCaseStudy } from "@content/projects/portfolio-operating-system/case-study.zh";

export const metadata: Metadata = {
  title: caseStudyTitle,
  description: portfolioCaseStudy.hero.summary,
  alternates: {
    canonical: "/zh/work/portfolio-operating-system",
    languages: { en: "/work/portfolio-operating-system", "zh-CN": "/zh/work/portfolio-operating-system" },
  },
};

export default function Page() {
  return <PortfolioOperatingSystemCaseStudyPage project={portfolioCaseStudy} locale="zh" />;
}
