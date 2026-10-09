import type { Metadata } from "next";
import { portfolioCaseStudyCandidateZh as content } from "@content/projects/portfolio-operating-system/case-study.candidate.zh";
import CandidatePage from "./CandidatePage";

export const metadata: Metadata = {
  title: "Portfolio AI — 中文设计评审",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CandidatePage content={content} />;
}
