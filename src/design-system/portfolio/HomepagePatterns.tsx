import type { CSSProperties } from "react";
import AIToolsSection from "@/app/proto/curated-home-v2/AIToolsSection";
import { ServiceAccordion } from "@/app/proto/curated-home-v2/HomepageMotion";
import honda from "@content/projects/honda-hmi-design-system/project.json";
import lincoln from "@content/projects/lincoln-text-expression/project.json";
import portfolio from "@content/projects/portfolio-operating-system/project.json";
import { getLocalizedSiteContent } from "@/i18n/dictionary";
import { resolveAsset } from "@/lib/content";
import type { ProjectData } from "@/types/content";
import { portfolioTokens, homepagePatterns } from "./tokens";
import SiteFooter from "./SiteFooter";
import home from "@/app/proto/curated-home-v2/homepage.module.css";
import styles from "@/app/proto/design-system-directions/deethin-system-v2/system.module.css";
import { homepageCatalogueCopy as baseCopy } from "@/app/proto/design-system-directions/deethin-system-v2/homepage-content";
import { useCatalogue } from "@/app/proto/design-system-directions/deethin-system-v2/CatalogueLocale";

export default function HomepagePatterns({ reduced = false }: { reduced?: boolean }) {
  const { locale, localize } = useCatalogue();
  const copy = localize(baseCopy);
  const patterns = localize(homepagePatterns);
  const { profile, projects } = getLocalizedSiteContent(locale, [lincoln, honda, honda, portfolio] as ProjectData[]);
  const items = profile.skills.slice(0, 4).map((skill, index) => ({ title: skill.name,
    body: projects[index].descriptions.short, tags: projects[index].tokens,
    images: [projects[index].assets.cover, projects[index].assets.hover].map(asset => resolveAsset(projects[index].id, asset)) }));
  return <div style={portfolioTokens as CSSProperties}>
    <p>{copy.intro}</p>
    <dl className={styles.rules}>{patterns.map(pattern => <div key={pattern.name}><dt>{pattern.name}</dt><dd><strong>{pattern.state}</strong><p>{pattern.rule}</p></dd></div>)}</dl>
    <h3>{copy.tools}</h3><AIToolsSection locale={locale} />
    <h3>{copy.capabilities}</h3>
    <div className={`${home.study} ${home.servicesSection}`}><ServiceAccordion items={items} reduced={reduced} /></div>
    <h3>{copy.footer}</h3><SiteFooter locale={locale} specimen />
    <details><summary>{copy.tokens}</summary><dl className={styles.rules}>{Object.entries(portfolioTokens).filter(([name]) => name.startsWith("--home-") || name.startsWith("--project-")).map(([name, value]) => <div key={name}><dt><code>{name}</code></dt><dd><code>{String(value)}</code></dd></div>)}</dl></details>
  </div>;
}
