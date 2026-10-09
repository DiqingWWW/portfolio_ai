import type { Metadata } from "next";
import AutonomousAgentResearchPage from "@/components/case-study/AutonomousAgentResearchPage";
import { autonomousAgentCaseStudy as project } from "@content/projects/autonomous-driving-to-agent/case-study.en";

export const metadata: Metadata = {
  title: project.title, description: project.dek,
  alternates: { canonical: "/work/autonomous-driving-to-agent", languages: { en: "/work/autonomous-driving-to-agent", "zh-CN": "/zh/work/autonomous-driving-to-agent" } },
  openGraph: { title: project.title, description: project.dek, locale: "en_US", url: "/work/autonomous-driving-to-agent", images: [{ url: "/assets/images/autonomous-driving-to-agent/autonomous-driving-agent-relationship.png", alt: project.agentLoop.media.alt }] },
};
export default function Page() { return <AutonomousAgentResearchPage locale="en" />; }
