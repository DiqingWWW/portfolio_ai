"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import content from "@content/prototypes/fabrica-study.json";
import navigation from "@content/navigation.json";
import { getLocalizedSiteContent, type Locale } from "@/i18n/dictionary";
import { portfolioTokens } from "./tokens";
import styles from "@/app/proto/curated-home-v2/homepage.module.css";

export default function SiteFooter({ locale: initialLocale = "en", specimen = false }: { locale?: Locale; specimen?: boolean }) {
  const pathname = usePathname();
  const locale = specimen ? initialLocale : pathname ? pathname.startsWith("/zh") ? "zh" : "en" : initialLocale;
  const copy = content[locale];
  const { profile } = getLocalizedSiteContent(locale, []);
  const prefix = locale === "zh" ? "/zh" : "/";
  const contactHref = navigation.landingFooter.navigation.find(link => link.href.startsWith("mailto:"))!.href;
  const links = [{ label: copy.homeLabel, href: `${prefix}#top` },
    { label: copy.projects, href: `${prefix}#work` }, { label: copy.whyLabel, href: `${prefix}#studies` },
    { label: copy.explore, href: `${prefix}#study-experiments` }];
  return <footer className={`${styles.study} ${styles.footer}`} style={portfolioTokens as CSSProperties} data-site-footer={specimen ? "specimen" : "site"} lang={locale === "zh" ? "zh-CN" : "en"}>
    <div className={styles.footerStatement}><p>{copy.footerStatement}</p><span>{profile.name.full}</span></div>
    <div className={styles.footerColumns}>
      <div><h3>{copy.navigation}</h3>{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
      <div><h3>{copy.social}</h3>{navigation.landingFooter.socials.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}</div>
      <a className={styles.footerEmail} href={contactHref}>{contactHref.replace("mailto:", "")}</a>
    </div>
    <div className={styles.footerMark}><span>{profile.name.first.toLowerCase()}</span><span>{profile.title}</span></div>
    <div className={styles.footerLegal}><span>© 2026 {navigation.landingFooter.copyright}</span><a href={`${prefix}#top`}>{copy.back}<ArrowUpRight aria-hidden="true" /></a></div>
  </footer>;
}
