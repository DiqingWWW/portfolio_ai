import type { Metadata } from "next";
import HondaCaseStudyPage from "@/components/case-study/HondaCaseStudyPage";
import { caseStudyTitle, hondaCaseStudy } from "@content/projects/honda-hmi-design-system/case-study.zh";

export const metadata: Metadata = {
  title: caseStudyTitle,
  description: hondaCaseStudy.background.promise,
  alternates: {
    canonical: "/zh/work/honda-hmi-design-system",
    languages: {
      en: "/work/honda-hmi-design-system",
      "zh-CN": "/zh/work/honda-hmi-design-system",
    },
  },
  openGraph: {
    title: caseStudyTitle,
    description: hondaCaseStudy.background.promise,
    locale: "zh_CN",
    url: "/zh/work/honda-hmi-design-system",
    images: [{ url: "/assets/images/honda-hmi-design-system/cover2-display.webp", alt: hondaCaseStudy.background.covers[1].alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: caseStudyTitle,
    description: hondaCaseStudy.background.promise,
    images: ["/assets/images/honda-hmi-design-system/cover2-display.webp"],
  },
};

export default function Page() {
  return <HondaCaseStudyPage project={hondaCaseStudy} locale="zh" />;
}
