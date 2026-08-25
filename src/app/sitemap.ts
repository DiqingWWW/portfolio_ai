import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/work/honda-hmi-design-system`,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${siteUrl}/work/honda-hmi-design-system`, "zh-CN": `${siteUrl}/zh/work/honda-hmi-design-system` } },
    },
    {
      url: `${siteUrl}/zh/work/honda-hmi-design-system`,
      lastModified: new Date("2026-08-22"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${siteUrl}/work/honda-hmi-design-system`, "zh-CN": `${siteUrl}/zh/work/honda-hmi-design-system` } },
    },
    {
      url: `${siteUrl}/work/lincoln-text-expression`,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${siteUrl}/work/lincoln-text-expression`, "zh-CN": `${siteUrl}/zh/work/lincoln-text-expression` } },
    },
    {
      url: `${siteUrl}/zh/work/lincoln-text-expression`,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${siteUrl}/work/lincoln-text-expression`, "zh-CN": `${siteUrl}/zh/work/lincoln-text-expression` } },
    },
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: siteUrl, "zh-CN": `${siteUrl}/zh` } },
    },
    {
      url: `${siteUrl}/zh`,
      lastModified: new Date("2026-08-22"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: siteUrl, "zh-CN": `${siteUrl}/zh` } },
    },
    {
      url: `${siteUrl}/experiments`,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/work/portfolio-operating-system`,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/work/portfolio-operating-system`, "zh-CN": `${siteUrl}/zh/work/portfolio-operating-system` } },
    },
    {
      url: `${siteUrl}/zh/work/portfolio-operating-system`,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/work/portfolio-operating-system`, "zh-CN": `${siteUrl}/zh/work/portfolio-operating-system` } },
    },
    {
      url: `${siteUrl}/work/rubik-studio`,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/work/rubik-studio`, "zh-CN": `${siteUrl}/zh/work/rubik-studio` } },
    },
    {
      url: `${siteUrl}/zh/work/rubik-studio`,
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { en: `${siteUrl}/work/rubik-studio`, "zh-CN": `${siteUrl}/zh/work/rubik-studio` } },
    },
  ];
}
