import type { Metadata } from "next";
import Link from "next/link";
import WorkSection from "@/components/WorkSection";
import { profile, projects } from "@/lib/content";
import { getLocalizedSiteContent, type Locale } from "@/i18n/dictionary";
import content from "@content/prototypes/curated-home.json";
import HeroParticleField from "./HeroParticleField";
import HeroExperience from "./HeroExperience";
import BookmarkNavigation from "./BookmarkNavigation";
import ScrollEntrances from "./ScrollEntrances";
import FabricaSections from "./FabricaSections";
import FabricaHeroStage from "./FabricaHeroStage";
import fabricaContent from "@content/prototypes/fabrica-study.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Curated homepage study",
  description: "An isolated homepage direction for review.",
  robots: { index: false, follow: false },
};

const ArrowUpRight = () => (
  <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M6 22 22 6M8 6h14v14" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const ArrowDown = () => (
  <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 4v19m-7-7 7 7 7-7" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export default function CuratedHomepageV2({ previous = false, locale = "en", referenceStudy = false, production = false }: { previous?: boolean; locale?: Locale; referenceStudy?: boolean; production?: boolean }) {
  const localized = getLocalizedSiteContent(locale, projects);
  const localizedProjects = localized.projects.map(project => ({
    ...project,
    detailHref: locale === "zh" && project.detailHref?.startsWith("/work/")
      ? `/zh${project.detailHref}` : project.detailHref,
  }));
  const copy = content.locales[locale];
  const studyCopy = fabricaContent[locale];
  const disciplines = Array.from(new Set(localizedProjects.flatMap(project => project.tokens))).slice(0, 8);
  return (
    <div className={`${styles.page} ${previous ? "" : styles.animatedPage}`} id="top" lang={locale === "zh" ? "zh-CN" : "en"}>
        <a className={styles.skipLink} href="#work">{copy.skipLink}</a>

        {previous ? <header className={styles.header}>
          <a className={styles.identity} href="#top">{profile.name.full}</a>
          <nav className={styles.nav} aria-label="Prototype navigation">
            <a href="#work">Work</a>
            <Link href="/experiments">Library</Link>
            <a href="https://www.deethin.site/">About</a>
            <a className={styles.askLink} href="mailto:wudiching@126.com">
              Ask my portfolio <ArrowUpRight />
            </a>
          </nav>
        </header> : <BookmarkNavigation locale={locale} referenceStudy={referenceStudy} production={production} />}

        <main>
          {previous ? <section className={styles.hero} aria-labelledby="hero-title">
            <HeroParticleField />
            <div className={styles.heroScrim} aria-hidden="true" />

            <div className={styles.heroHeading}>
              <h1 id="hero-title">Diqing Wu</h1>
              <p>Product design<br />&amp; AI-assisted building</p>
            </div>

            <div className={styles.heroBottom}>
              <p>{profile.brandingStatement}.</p>
              <a className={styles.heroCta} href="#work">
                Explore selected work <ArrowDown />
              </a>
            </div>
          </section> : referenceStudy ? <FabricaHeroStage disciplines={disciplines} label={studyCopy.disciplines}>
            <HeroExperience
              name={profile.name.full}
              statement={copy.heroStatement}
              heading={<div className={styles.heroHeading}>
                <h1 id="hero-title">{profile.name.full}</h1>
                <p>{copy.roleLines[0]}<br />{copy.roleLines[1]}</p>
              </div>}
              cta={<a className={styles.heroCta} href="#work">
                {copy.explore} <ArrowDown />
              </a>}
            />
          </FabricaHeroStage> : <HeroExperience
            name={profile.name.full}
            statement={copy.heroStatement}
            heading={<div className={styles.heroHeading}>
              <h1 id="hero-title">{profile.name.full}</h1>
              <p>{copy.roleLines[0]}<br />{copy.roleLines[1]}</p>
            </div>}
            cta={<a className={styles.heroCta} href="#work">
              {copy.explore} <ArrowDown />
            </a>}
          />}

          {referenceStudy ? <FabricaSections projects={localizedProjects} locale={locale} production={production} /> : <WorkSection projects={localizedProjects} locale={locale} scrollEntrances={!previous} />}
        </main>
        {!previous && <>
          {!referenceStudy && <ScrollEntrances />}
          <div className={styles.bottomBlur} aria-hidden="true">
            {[4, 8, 16].map(blur => <div key={blur} style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }} />)}
          </div>
        </>}
    </div>
  );
}
