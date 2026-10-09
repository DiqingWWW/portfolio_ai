import type { CSSProperties } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/dictionary";
import { aiTools, aiToolsCopy } from "@content/ai-tools";
import { portfolioTokens } from "@/design-system/portfolio/tokens";
import styles from "./ai-tools.module.css";

/** A site-level addition; the existing hero and historical prototype remain unchanged. */
export default function AIToolsSection({ locale }: { locale: Locale }) {
  return <section id="ai-tools" aria-label={aiToolsCopy[locale].title}
    className={styles.section} style={portfolioTokens as CSSProperties}>
    <ul className={styles.list}>
      {aiTools.map(tool => <li className={styles.tool} key={tool.id}>
        <Image className={styles.logo} src={tool.logo} alt="" width={32} height={32} unoptimized />
        <a className={styles.link} href={tool.href}>{tool.name}</a>
        <p className={styles.description}>{tool.description[locale]}</p>
      </li>)}
    </ul>
  </section>;
}
