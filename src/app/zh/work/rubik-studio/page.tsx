import type { Metadata } from "next";
import RubikStudioPage from "@/components/case-study/RubikStudioPage";

export const metadata: Metadata = {
  title: "Rubik Studio",
  alternates: {
    canonical: "/zh/work/rubik-studio",
    languages: { en: "/work/rubik-studio", "zh-CN": "/zh/work/rubik-studio" },
  },
  openGraph: {
    title: "Rubik Studio",
    locale: "zh_CN",
    url: "/zh/work/rubik-studio",
    images: [{ url: "/assets/images/rubik-studio/rubikstudio_CN-display.webp", alt: "Rubik Studio 项目长图" }],
  },
};

export default function Page() {
  return <RubikStudioPage locale="zh" />;
}
