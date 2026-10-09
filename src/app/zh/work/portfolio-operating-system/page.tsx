import type { Metadata } from "next";
import CandidatePage from "@/app/proto/portfolio-ai-case-study/CandidatePage";
import { portfolioCaseStudyCandidateZh as content } from "@content/projects/portfolio-operating-system/case-study.candidate.zh";

export const metadata: Metadata = {
  title: content.title,
  description: content.thesis,
  alternates: {
    canonical: "/zh/work/portfolio-operating-system",
    languages: { en: "/work/portfolio-operating-system", "zh-CN": "/zh/work/portfolio-operating-system" },
  },
};

export default function Page() {
  return <CandidatePage content={content} projectRoute />;
}
