import type { Metadata } from "next";
import LincolnCaseStudyPage from "@/components/case-study/LincolnCaseStudyPage";
import { caseStudyTitle, lincolnCaseStudy } from "@content/projects/lincoln-text-expression/case-study.zh";

export const metadata: Metadata = {
  title: caseStudyTitle,
  description: lincolnCaseStudy.hero.proposition,
  alternates: {
    canonical: "/zh/work/lincoln-text-expression",
    languages: { en: "/work/lincoln-text-expression", "zh-CN": "/zh/work/lincoln-text-expression" },
  },
  openGraph: {
    title: caseStudyTitle,
    description: lincolnCaseStudy.hero.proposition,
    locale: "zh_CN",
    url: "/zh/work/lincoln-text-expression",
    images: [{ url: "/assets/images/lincoln-text-expression/cover-display.webp", alt: lincolnCaseStudy.hero.cover.alt }],
  },
};

export default function Page() {
  return <LincolnCaseStudyPage project={lincolnCaseStudy} locale="zh" />;
}
