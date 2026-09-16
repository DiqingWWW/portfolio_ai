import type { Metadata } from "next";
import CuratedHomepage from "@/app/proto/curated-home-v2/CuratedHomepage";

export const metadata: Metadata = {
  title: "Diqing Wu — 产品设计师与 AI 构建者",
  description: "Diqing Wu 的产品设计作品集，涵盖汽车 HMI、设计系统、多模态交互与 AI 辅助产品构建。",
  alternates: {
    canonical: "/zh",
    languages: { en: "/", "zh-CN": "/zh" },
  },
  openGraph: {
    title: "Diqing Wu — 产品设计师与 AI 构建者",
    description: "汽车 HMI、设计系统、内容交互与 AI 辅助产品构建精选项目。",
    locale: "zh_CN",
    url: "/zh",
    images: [{ url: "/assets/images/honda-hmi-design-system/cover2-display.webp", alt: "Diqing Wu 作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diqing Wu — 产品设计师与 AI 构建者",
    description: "汽车 HMI、设计系统与 AI 辅助产品构建作品集。",
    images: ["/assets/images/honda-hmi-design-system/cover2-display.webp"],
  },
};

export default function Page() {
  return <CuratedHomepage referenceStudy production locale="zh" />;
}
