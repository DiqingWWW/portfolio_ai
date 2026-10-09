import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";
import { resolveAsset } from "@/lib/content";
import { getLocalizedSiteContent, type Locale } from "@/i18n/dictionary";
import type { ProjectData } from "@/types/content";
import autonomousAgentStudy from "@content/projects/autonomous-driving-to-agent/project.json";
import content from "@content/prototypes/fabrica-study.json";
import navigation from "@content/navigation.json";
import { ContactComposer, FabricaMotionController, ServiceAccordion, type ServiceItem } from "./HomepageMotion";
import styles from "./homepage.module.css";
import AIToolsSection from "./AIToolsSection";
import ProjectCard from "@/design-system/portfolio/ProjectCard";
import { portfolioTokens, homepageMotion } from "@/design-system/portfolio/tokens";
import LiveLaptopPreview from "@/app/proto/portfolio-ai-case-study/LiveLaptopPreview";
import { resultFirstCuration } from "@content/projects/portfolio-operating-system/case-study.curation";

const revealStyle = (index = 0) => ({ "--reveal-delay": `${index * homepageMotion.staggerMs}ms` }) as CSSProperties;

function SectionHeading({
  label,
  title,
  suffix,
  dark = false,
}: {
  label?: string;
  title: string;
  suffix?: string;
  dark?: boolean;
}) {
  return <div className={styles.sectionHeading} data-fabrica-reveal style={revealStyle()}>
    {label && <span className={styles.kicker}><Plus aria-hidden="true" />{label}</span>}
    <div className={styles.displayRow}>
      <h2 className={dark ? styles.lightDisplay : undefined}><span>{title}</span></h2>
      {suffix && <span className={styles.headingSuffix}>{suffix}</span>}
    </div>
  </div>;
}

// Cover films are authored at their exact loop length, so `loop` alone repeats them.
const VIDEO_EXTENSIONS = [".mp4", ".webm"];

function ProjectImage({ project, asset, alt }: { project: ProjectData; asset: string; alt: string }) {
  const src = resolveAsset(project.id, asset);
  const className = project.assets.coverPosition === "top" ? styles.imageTop : undefined;
  if (VIDEO_EXTENSIONS.some(extension => src.endsWith(extension))) {
    return <video className={className} src={src} poster={resolveAsset(project.id, project.assets.cover)}
      autoPlay muted loop playsInline preload="metadata" aria-label={alt || undefined} />;
  }
  return <ResponsiveProjectImage
    src={src}
    alt={alt}
    className={className}
  />;
}

function Reveal({ children, className, index = 0 }: { children: ReactNode; className?: string; index?: number }) {
  return <div className={className} data-fabrica-reveal style={revealStyle(index)}>{children}</div>;
}

/**
 * Isolated Fabrica reference study. The accepted hero above this component is deliberately
 * untouched; this file owns only the post-hero experience and can be removed as one rollback.
 */
export default function HomepageSections({ projects, locale }: { projects: ProjectData[]; locale: Locale }) {
  const copy = content[locale];
  const { profile } = getLocalizedSiteContent(locale, projects);
  const studyProjects = getLocalizedSiteContent(locale, [autonomousAgentStudy as ProjectData]).projects;
  const contactHref = navigation.landingFooter.navigation.find(link => link.href.startsWith("mailto:"))!.href;
  const recipient = contactHref.replace("mailto:", "");
  const featured = projects.find(project => project.id === "portfolio-operating-system") ?? projects[0];
  const evidenceProjectIds = [
    "lincoln-text-expression",
    "honda-hmi-design-system",
    "honda-hmi-design-system",
    "portfolio-operating-system",
  ];
  const services: ServiceItem[] = profile.skills.slice(0, 4).map((skill, index) => {
    const project = projects.find(item => item.id === evidenceProjectIds[index]) ?? projects[index % projects.length];
    return {
      title: skill.name,
      body: project.descriptions.short || skill.level,
      tags: project.tokens.length ? project.tokens : [skill.level],
      images: [project.assets.cover, project.assets.hover, ...project.assets.gallery]
        .slice(0, 3)
        .map(asset => resolveAsset(project.id, asset)),
    };
  });

  return <div className={styles.study} data-fabrica-study style={portfolioTokens as CSSProperties}>
    <FabricaMotionController />

    <AIToolsSection locale={locale} />

    <section id="work" className={`${styles.section} ${styles.projectsSection}`}>
      <div className={styles.projectsHeader}>
        <SectionHeading title={copy.projects} />
        <Reveal className={styles.projectIntro}><p>{copy.projectIntro}</p></Reveal>
      </div>
      <div className={styles.projectGrid}>
        {projects.map((project, index) => <Reveal key={project.id} index={index % 2}><ProjectCard project={project}
          media={project.id === "portfolio-operating-system" ? <LiveLaptopPreview variant="card" src={resultFirstCuration[locale].screenSrc} title={resultFirstCuration[locale].screenTitle} /> : undefined} /></Reveal>)}
      </div>
    </section>

    <section id="studies" className={`${styles.section} ${styles.whySection}`}>
      <Reveal className={styles.studiesHeader}>
        <h2>{copy.whyLabel}</h2>
        <p>{copy.whyTitle}</p>
      </Reveal>
      <div className={styles.studiesGrid}>
        {studyProjects.map((project, index) => <Reveal key={project.id} className={styles.studyCard} index={index % 2}>
          <Link href={project.detailHref ?? "#work"}>
            <div className={styles.studyCardTop}>
              <span className={styles.itemTag}>{copy.studyTag}</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className={styles.studyCardBody}>
              <div className={styles.studyThumb}>
                <ProjectImage project={project} asset={project.assets.hover || project.assets.cover} alt="" />
              </div>
              <div><h3>{project.title}</h3><p>{project.descriptions.short}</p></div>
            </div>
          </Link>
        </Reveal>)}
      </div>
    </section>

    <section className={`${styles.section} ${styles.servicesSection}`}>
      <SectionHeading label={copy.servicesLabel} title={copy.services} dark />
      <ServiceAccordion items={services} categories={copy.categories} />
      <Reveal className={styles.serviceAction}><a className={styles.pillActionInverse} href={contactHref}>{copy.contact}<ArrowUpRight /></a></Reveal>
    </section>

    <section className={`${styles.section} ${styles.caseSection}`}>
      <Reveal className={styles.caseMeta}><span>{copy.caseLabel}</span><span>{featured.metadata.role ?? featured.metadata.type}</span></Reveal>
      <Reveal className={styles.caseHero}>
        <div data-fabrica-parallax><ProjectImage project={featured} asset={featured.assets.cover} alt={featured.title} /></div>
        <span className={styles.caseWordmark}>{profile.name.full}</span>
      </Reveal>
      <Reveal className={styles.caseIntro}>
        <Link href={featured.detailHref ?? "#work"}>{copy.caseCta}<ArrowUpRight /></Link>
        <h2>{copy.caseTitle}</h2>
      </Reveal>
      <div className={styles.caseEvidence}>
        {featured.specs.slice(0, 3).map((spec, index) => <Reveal key={spec.label} index={index}><span>{spec.label}</span><strong>{spec.val}</strong></Reveal>)}
        <Reveal><p>{copy.caseEvidence}</p></Reveal>
      </div>
    </section>

    <section id="study-experiments" className={`${styles.section} ${styles.insightsSection}`}>
      <Reveal className={styles.insightsHeader}>
        <h2>{copy.insightsTitle}</h2>
        <div><p>{copy.insightsIntro}</p><Link className={styles.pillAction} href="/experiments">{copy.explore}<ArrowUpRight /></Link></div>
      </Reveal>
    </section>

    <section className={`${styles.section} ${styles.contactSection}`}>
      <Reveal className={styles.contactPanel}>
        <span className={styles.wordmark}>{profile.name.full}</span>
        <h3>{copy.formTitle}</h3>
        <ContactComposer recipient={recipient} labels={{ name: copy.name, email: copy.email, message: copy.message, send: copy.send, note: copy.productionFormNote }} />
      </Reveal>
      <div className={styles.contactStory}>
        <Reveal><h2>{copy.contactTitle}</h2><p>{copy.contactIntro}</p></Reveal>
        <Reveal className={styles.contactNotes}><div><strong>{copy.quick}</strong><p>{copy.quickBody}</p></div><div><strong>{copy.steps}</strong><p>{copy.stepsBody}</p></div></Reveal>
        <Reveal><a className={styles.directLink} href={contactHref}>{profile.name.full}<span>{copy.contact}</span><ArrowUpRight /></a></Reveal>
      </div>
    </section>

  </div>;
}
