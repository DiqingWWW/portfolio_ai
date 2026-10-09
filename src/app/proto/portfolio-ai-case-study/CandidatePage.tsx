import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense, type CSSProperties } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/i18n/dictionary";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CandidateCaseStudy, CandidateMedia } from "@content/projects/portfolio-operating-system/case-study.candidate.types";
import { resultFirstCuration } from "@content/projects/portfolio-operating-system/case-study.curation";
import { portfolioNarrative } from "@content/projects/portfolio-operating-system/case-study.narrative";
import { draftEvidenceCrops, reviewPresentation } from "@content/projects/portfolio-operating-system/review-presentation";
import { caseStudyBreakpoints as bp, caseStudyImageSizes } from "../design-system-directions/deethin-system-v2/case-study.registry";
import { portfolioTokens as caseStudyTokens } from "@/design-system/portfolio/tokens";
import primitives from "../design-system-directions/deethin-system-v2/CaseStudyPrimitives.module.css";
import ScrollEntrances from "./ScrollEntrances";
import GalleryControls from "./GalleryControls";
import LiveLaptopPreview from "./LiveLaptopPreview";
import styles from "./page.module.css";

function SourceSection({ id, sourceIds, children }: { id: string; sourceIds: readonly string[]; children: React.ReactNode }) {
  return <section id={id} data-source-ids={sourceIds.join(" ")} className={styles.section}>{children}</section>;
}
function Media({ media }: { media: CandidateMedia }) {
  return <figure className={styles.figure} data-source-ids={media.sourceIds.join(" ")}><div className={styles.mediaFrame}><Image src={`/assets/images/portfolio-operating-system/${media.src}`} alt={media.alt} width={media.width} height={media.height} sizes={caseStudyImageSizes} /></div><figcaption>{media.caption}</figcaption></figure>;
}
function DraftEvidence({ media, labels }: { media: CandidateMedia; labels: readonly string[] }) {
  return <div className={styles.draftPair} data-source-ids={media.sourceIds.join(" ")}>{draftEvidenceCrops.map((crop,i) => <figure key={labels[i]} className={styles.figure}><div className={styles.draftCrop} style={{ "--crop-ratio": `${crop.width} / ${crop.height}`, "--crop-width": `${media.width / crop.width * 100}%`, "--crop-left": `${-crop.x / crop.width * 100}%`, "--crop-top": `${-crop.y / crop.height * 100}%` } as CSSProperties}><Image src={`/assets/images/portfolio-operating-system/${media.src}`} alt={`${media.alt}: ${labels[i]}`} width={media.width} height={media.height} sizes={caseStudyImageSizes} /></div><figcaption>{labels[i]}</figcaption></figure>)}</div>;
}
function DataTable({ label, headings, rows }: { label: string; headings: readonly string[]; rows: readonly { key: string; cells: readonly string[]; sourceIds?: readonly string[] }[] }) {
  return <div className={styles.tableScroll}><table aria-label={label}><thead><tr>{headings.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.key} data-source-ids={row.sourceIds?.join(" ")}><th scope="row">{row.key}</th>{row.cells.map((cell,i) => <td key={i} data-label={headings[i+1]}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
/** Media conditions cannot consume CSS vars: interpolate the shared registry explicitly. */
function ResponsiveRules() {
  return <style>{`
    @media (max-width:${bp.table}) {
      .${styles.artifacts}, .${styles.decisions} {grid-template-columns:var(--grid-two)}
      .${styles.workflowComparison} {grid-template-columns:var(--grid-single)}
      .${styles.tableScroll} thead {display:none}
      .${styles.tableScroll} table,.${styles.tableScroll} tbody,.${styles.tableScroll} tr {display:block;width:100%}
      .${styles.tableScroll} tr {padding-block:var(--space-4);border-block-start:var(--stroke-1) solid var(--color-border-subtle)}
      .${styles.tableScroll} :is(th,td) {display:grid;grid-template-columns:var(--grid-key-value);gap:var(--space-4);padding:var(--space-2) 0;border:0}
      .${styles.tableScroll} tr:last-child :is(th,td) {border-block-end:0}
      .${styles.tableScroll} td::before {content:attr(data-label);color:var(--color-text-accent);font-family:var(--font-family-mono);font-size:var(--font-size-label)}
    }
    @media (max-width:${bp.compact}) {
      .${styles.header} nav {display:none}
      .${styles.artifacts},.${styles.decisions},.${styles.diagramAreas},.${styles.approvalPaths},.${styles.meta},.${styles.architectureList} {grid-template-columns:var(--grid-single)}
      .${styles.sharedBasis},.${styles.questionList} > div {grid-template-columns:var(--grid-single)}
      .${styles.reviewFlow} {grid-template-columns:var(--grid-single)}
      .${styles.reviewFlow} li {justify-content:center}
      .${styles.reviewFlow} svg {transform:rotate(var(--flow-turn))}
      .${styles.branchSource} {display:inline-flex}
      .${styles.diagramLane} > svg {display:none}
      .${styles.delegationFlow} ol {grid-template-columns:var(--grid-single)}
      .${styles.delegationFlow} li {padding:var(--space-4) var(--space-12) var(--space-4) var(--space-4)}
      .${styles.delegationFlow} li > svg {inset-inline-end:var(--space-8);transform:rotate(var(--flow-turn))}
      .${styles.heroCopy} {padding:var(--space-6)}
      .${styles.galleryItem} {padding:var(--space-4)}
    }
  `}</style>;
}

export default function CandidatePage({ content, projectRoute = false }: { content: CandidateCaseStudy; projectRoute?: boolean }) {
  const ui = resultFirstCuration[content.locale];
  const narrative = portfolioNarrative[content.locale];
  const { background, workflow, infrastructure } = narrative;
  const suffix = content.locale === "zh" ? "CN" : "EN";
  const asset = (filename: string) => `/assets/images/portfolio-operating-system/${filename}`;
  const presentation = reviewPresentation[content.locale];
  const quality = content.qualitySystem;
  const second = quality.secondDesign;
  return <main className={styles.page} style={caseStudyTokens as CSSProperties} data-portfolio-ai-candidate lang={content.locale}>
    <ResponsiveRules />
    <a className={styles.skip} href="#hero">{ui.home}</a>
    <header className={styles.header}><a href={ui.artifacts[0].href} className={styles.wordmark}>{ui.identity}</a><nav aria-label={ui.nav}><a href="#hero">{ui.home}</a><a href="#system">{ui.workflow}</a><a href="#quality">{infrastructure.label}</a></nav>{projectRoute && <Suspense><LanguageSwitcher locale={content.locale} label={getDictionary(content.locale).shared.languageName} className={`${styles.wordmark} ${styles.languageControl}`} /></Suspense>}</header>
    <article id="top">
      <SourceSection id="hero" sourceIds={content.hero.sourceIds}>
        <div className={styles.heroStage}>
        <div className={styles.heroCopy}><h1>{ui.titleSegments.map((part,i) => <Fragment key={i}><span className={styles.phrase}>{part}</span>{i < ui.titleSegments.length-1 && <wbr />}</Fragment>)}</h1><p>{content.thesis}</p><dl className={styles.meta}><div><dt>Role</dt><dd>{content.meta.role}</dd></div><div><dt>Timeline</dt><dd>{content.meta.timeline}</dd></div><div><dt>Type</dt><dd>{content.meta.type}</dd></div></dl></div>
        <a className={styles.heroShowcase} href={ui.artifacts[0].href} aria-label={ui.artifacts[0].action} data-scroll-entrance data-source-ids="pos-hero-01 pos-product-01"><LiveLaptopPreview src={ui.screenSrc} title={ui.screenTitle} /></a>
        </div>
      </SourceSection>

      <SourceSection id="background" sourceIds={portfolioNarrative.sourceIds}>
        <div className={styles.sectionHeading} data-scroll-entrance><span className={styles.eyebrow}>{background.label}</span><h2>{background.title}</h2><p>{background.introduction}</p></div>
        <div className={styles.narrativeBlock} data-scroll-entrance><p>{background.axes}</p><DataTable label={background.title} headings={background.headings} rows={background.rows} /><p>{background.ambition}</p></div>
      </SourceSection>

      <SourceSection id="system" sourceIds={[...content.operatingSystem.sourceIds, ...portfolioNarrative.sourceIds]}>
        <div className={styles.sectionHeading} data-scroll-entrance><span className={styles.eyebrow}>{ui.workflow}</span><h2>{workflow.title}</h2><p>{workflow.summary}</p></div>
        <div className={`${styles.delegationFlow} ${styles.sharedBasis}`} data-scroll-entrance><ol><li><span className={styles.eyebrow}>01</span><strong>{workflow.basis}</strong><p>{workflow.basisDetail}</p><ArrowRight aria-hidden="true" /></li></ol><p>{workflow.basisNote}</p></div>
        <div className={styles.workflowComparison} data-scroll-entrance>
          <figure className={styles.figure}><h3>{workflow.conventional}</h3><a href={asset(`traditional-workflow-v1_${suffix}.png`)} target="_blank" rel="noreferrer" aria-label={`${workflow.open}: ${workflow.conventional}`}><Image src={asset(`traditional-workflow-v1_${suffix}.png`)} alt={workflow.conventional} width={1086} height={1448} sizes={`(max-width: ${bp.table}) 90vw, 45vw`} /></a><figcaption>{workflow.conventionalNote}</figcaption></figure>
          <figure className={styles.figure}><h3>{workflow.native}</h3><a href={asset(`ai-workflow-blueprint_${suffix}.svg`)} target="_blank" rel="noreferrer" aria-label={`${workflow.open}: ${workflow.native}`}><Image src={asset(`ai-workflow-blueprint_${suffix}.png`)} alt={workflow.native} width={1100} height={1490} sizes={`(max-width: ${bp.table}) 90vw, 45vw`} /></a><figcaption>{workflow.nativeNote}</figcaption></figure>
        </div>
        <div className={styles.narrativeBlock} data-scroll-entrance><h3>{workflow.methodTitle}</h3><p>{workflow.method} <a href={portfolioNarrative.methodSources[0].href}>{portfolioNarrative.methodSources[0].label}</a> {workflow.methodPractice}</p><p>{workflow.methodLoop} <a href={portfolioNarrative.methodSources[1].href}>{portfolioNarrative.methodSources[1].label}</a></p></div>
        <details className={styles.progressiveDetail}><summary>{workflow.questionsTitle}</summary><dl className={styles.questionList}>{workflow.questions.map(item => <div key={item.key}><dt><span className={styles.eyebrow}>{item.key}</span><strong>{item.question}</strong></dt><dd>{item.answer}</dd></div>)}</dl></details>
        <div className={styles.narrativeBlock} data-scroll-entrance><h3>{workflow.outcomesTitle}</h3><p>{workflow.outcomes}</p><figure className={styles.figure}><a href={asset("design-directions-picker.png")} target="_blank" rel="noreferrer" aria-label={workflow.open}><Image className={styles.narrativeImage} src={asset("design-directions-picker.png")} alt={workflow.directionsAlt} width={1824} height={138} sizes={caseStudyImageSizes} /></a><figcaption>{workflow.directionsCaption}</figcaption></figure></div>
        <div className={styles.galleryGroup} data-scroll-entrance><GalleryControls title={ui.allStages} previous={ui.previous} next={ui.next}>{quality.firstDesign.stages.map(stage => <article key={stage.label} className={styles.galleryItem} data-source-ids={stage.sourceIds.join(" ")}><div className={styles.galleryVisuals}>{stage.media.map(m => <Media key={m.src} media={m} />)}</div><div className={styles.galleryCopy}><span className={styles.eyebrow}>{stage.label}</span><h4>{stage.title}</h4><p>{stage.text}</p></div></article>)}</GalleryControls></div>
        <p className={styles.narrativeParagraph} data-scroll-entrance>{workflow.gatekeeper}</p>
        <details className={styles.progressiveDetail} data-source-ids={content.aiNative.sourceIds.join(" ")}><summary>{ui.nativeDetails}</summary><div className={styles.subsectionHeading}><h3>{content.aiNative.title}</h3><p>{content.aiNative.definition}</p></div><DataTable label={content.aiNative.title} headings={[ui.scope,ui.conventional,ui.native,ui.project]} rows={content.aiNative.traits.map(t => ({key:t.scope,cells:[t.conventional,t.native,t.projectEvidence],sourceIds:t.sourceIds}))} /></details>
        <details className={styles.progressiveDetail}><summary>{infrastructure.memory}</summary><DataTable label={infrastructure.memory} headings={[ui.scope,ui.job,ui.implementation]} rows={content.operatingSystem.modules.map(m => ({key:m.label,cells:[m.purpose,m.implementation],sourceIds:m.sourceIds}))} /></details>
        <details className={styles.progressiveDetail}><summary>{content.operatingSystem.governance.title}</summary><p>{content.operatingSystem.governance.summary}</p><DataTable label={content.operatingSystem.governance.title} headings={[ui.scope,ui.rule,ui.job]} rows={content.operatingSystem.governance.levels.map(l => ({key:l.scope,cells:[l.home,l.job],sourceIds:content.operatingSystem.governance.sourceIds}))} /></details>
      </SourceSection>

      <SourceSection id="quality" sourceIds={[...quality.sourceIds, ...portfolioNarrative.sourceIds]}>
        <div className={styles.sectionHeading} data-scroll-entrance><span className={styles.eyebrow}>{infrastructure.label}</span><h2>{infrastructure.title}</h2><p>{infrastructure.summary}</p><p>{infrastructure.context}</p></div>
        <div className={styles.narrativeBlock} data-scroll-entrance><h3>{infrastructure.windowTitle}</h3><p>{infrastructure.windowText}</p><p>{infrastructure.windowIntent}</p><figure className={styles.figure}><a href={`${presentation.systemHref}#patterns`}><Image className={styles.narrativeImage} src={asset(`design-system-intent_${suffix}.jpg`)} alt={infrastructure.intentCaption} width={959} height={content.locale === "zh" ? 688 : 713} sizes={caseStudyImageSizes} /></a><figcaption>{infrastructure.intentCaption}</figcaption></figure><Link className={primitives.button} href={presentation.systemHref}>{ui.explore}<ArrowUpRight aria-hidden="true" /></Link></div>
        <div className={styles.galleryGroup} data-scroll-entrance><div className={styles.subsectionHeading}><h3>{second.title}</h3><p>{second.summary}</p></div><GalleryControls title={second.title} previous={ui.previous} next={ui.next}>
          {second.failures.map((f,index) => <article key={f.title} className={styles.galleryItem} data-stage={index === 0 ? "before" : "during"} data-source-ids={f.sourceIds.join(" ")}><span className={styles.eyebrow}>{index === 0 ? presentation.stages.before : presentation.stages.during}</span>{f.media ? index === 1 ? <DraftEvidence media={f.media} labels={presentation.draftPanels} /> : <Media media={f.media} /> : <div className={styles.galleryCopy}><h4>{presentation.motionTitle}</h4><ul className={styles.interactionChecklist}>{presentation.motionParts.map(part => <li key={part}>{part}</li>)}</ul></div>}<div className={styles.galleryCopy}><h4>{f.title}</h4><p>{f.finding}</p><p>{f.consequence}</p></div></article>)}
          <article className={styles.galleryItem} data-stage="during" data-source-ids={second.sourceIds.join(" ")}><span className={styles.eyebrow}>{presentation.stages.during}</span><h4>{ui.mapping}</h4><ol className={styles.architectureList}>{second.acceptedArchitecture.map(item => <li key={item.asset}><strong>{item.asset}</strong><span>{item.responsibility}</span><p>{item.decision}</p></li>)}</ol><p>{ui.mappingNote}</p></article>
          <article className={styles.galleryItem} data-stage="after" data-source-ids={second.sourceIds.join(" ")}><span className={styles.eyebrow}>{presentation.stages.after}</span><figure className={styles.systemOverview}><a href={presentation.overview.fullSrc} target="_blank" rel="noreferrer"><Image src={presentation.overview.src} alt={presentation.overview.alt} width={presentation.overview.width} height={presentation.overview.height} sizes={caseStudyImageSizes} /></a><figcaption>{presentation.overview.caption}</figcaption></figure><h4>{infrastructure.current}</h4><p>{presentation.currentNote}</p><Link className={primitives.button} data-variant="inverse" href={presentation.systemHref}>{ui.explore}<ArrowUpRight aria-hidden="true" /></Link></article>
        </GalleryControls></div>
        <div className={styles.narrativeBlock} data-scroll-entrance><h3>{infrastructure.mappingTitle}</h3><p>{infrastructure.mappingText}</p><p>{infrastructure.mappingPurpose}</p><figure className={styles.figure}><a href={asset(`figma-code-mapping-v1_${suffix}.png`)} target="_blank" rel="noreferrer" aria-label={workflow.open}><Image className={styles.narrativeImage} src={asset(`figma-code-mapping-v1_${suffix}.png`)} alt={infrastructure.mappingAlt} width={1536} height={1024} sizes={caseStudyImageSizes} /></a><figcaption>{infrastructure.mappingNote}</figcaption></figure></div>
        <div data-scroll-entrance><h3>{infrastructure.nextTitle}</h3><div className={styles.decisions}>{infrastructure.next.map((item,i) => <article key={item.text} className={primitives.decision}><span className={styles.eyebrow}>{String(i+1).padStart(2,"0")}</span>{item.title && <h4>{item.title}</h4>}<p>{item.text}</p></article>)}</div></div>
      </SourceSection>
      <footer className={styles.contactFooter} data-source-ids={portfolioNarrative.sourceIds.join(" ")}><p data-scroll-entrance>{infrastructure.closing}</p></footer>
    </article>
    <div className={styles.bottomBlur} aria-hidden="true"><div /><div /><div /></div>
    <ScrollEntrances />
  </main>;
}
