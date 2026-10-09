"use client";

import { useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { architecture as baseArchitecture, visualNotes as baseNotes } from "./architecture";
import { copy as baseCopy } from "./content";
import { contrast, gradientStops, showcaseColors as baseColors } from "./tokens";
import s from "./system.module.css";
import { useCatalogue } from "./CatalogueLocale";

export function ColorGuide() {
  const { t, localize } = useCatalogue(); const notes = localize(baseNotes); const showcaseColors = localize(baseColors);

  return <><p>{notes.colors}</p><div className={s.ratioBar} aria-label={t("60% 基底、30% 对比、10% 点睛")}><span>60 / Base</span><span>30 / Contrast</span><span>10</span></div>
    <div className={s.palette}>{showcaseColors.map(color => <article key={color.id}><div className={s.swatch} style={{ background: `var(--ds-${color.id})`, color: color.against }}><span>Aa</span><code>{color.value}</code></div><h3>{color.name}</h3><code>--ds-{color.id}</code><p>{color.use}</p><small>{color.source}<br />{t("与")}{color.against}：{contrast(color.value, color.against)}:1</small></article>)}</div>
    <p className={s.note}>{notes.colorNote}</p><h3 className={s.subheading}>{notes.gradientTitle}</h3><div className={s.gradientSample}><span>165° / Hero fallback</span></div><div className={s.gradientStops}>{gradientStops.map(stop => <div key={stop.name}><i style={{ background: stop.value }} /><strong>{stop.name}</strong><code>{stop.value}</code></div>)}</div><p className={s.note}>{notes.gradientNote}</p>
    <div className={s.labelSamples}><div><span className={s.dataLabel}>{notes.labelTitle}</span><small>{contrast("#0087fb", "#ffffff")}:1 / on white</small></div><div><span className={s.dataLabel}>{notes.labelTitle}</span><small>{contrast("#73d1f8", "#101010")}:1 / on ink</small></div></div><p className={s.note}>{notes.labelNote}</p></>;
}

function SpaceThumbnail({ index }: { index: number }) {
  const { t } = useCatalogue();

  if (index === 0) return <div className={s.miniPage}><span>← gutter →</span><div><b>Content</b><code>max 1440px</code></div><span>16–40px</span></div>;
  if (index === 1) return <div className={s.miniSections}><b>Section A</b><span>↕ 64–128px</span><b>Section B</b></div>;
  if (index === 2) return <div className={s.miniGrids}>{[12,6,1].map(n => <div key={n}><code>{n} col</code><div style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>{Array.from({length:n},(_,i)=><i key={i}/>)}</div></div>)}</div>;
  if (index === 3) return <div className={s.miniProjects}>{[0,1].map(i=><div key={i}><div/><b>Project {i+1}</b></div>)}<code>gap 8 · cover 4:3</code></div>;
  if (index === 4) return <div className={s.miniControl}><code>↕12 / ↔20 / gap8</code><button type="button" className={s.button}><ArrowUpRight size={18} aria-hidden="true"/>48px min</button></div>;
  if (index === 5) return <div className={s.miniReading}><code>← max 65ch →</code><p>{t("让文字自然呼吸。")}<br/>{t("让信息按顺序被阅读。")}<br/>{t("行高 1.8，不缩小字号。")}</p></div>;
  return <div className={s.miniResponsive}><div><code>320px</code><span>Aa</span><i/></div><div><code>200%</code><strong>Aa</strong><i/></div></div>;
}

export function SpaceGuide() {
  const { t, localize } = useCatalogue(); const notes = localize(baseNotes); const copy = localize(baseCopy);

  return <><p className={s.note}>{notes.spacingNote}</p><div className={s.spaceCards}>{copy.layout.map(([title,value,detail],i)=><article key={title}><div className={s.thumbnail}><SpaceThumbnail index={i}/></div><div><h3>{title}</h3><code>{value}</code><p>{i===3 ? t("≥700px 两列，gap 8px；<700px 单列。V2 封面 4:3，标题常驻，辅助标签按交互显示。") : detail}</p></div></article>)}</div></>;
}

export function SurfaceGuide({ onOpen }: { onOpen: () => void }) {
  const { t, localize } = useCatalogue(); const notes = localize(baseNotes);

  return <><div className={s.contextSamples}><article><span className={s.dataLabel}>{notes.surfaces[0][0]}</span><div className={s.lightSurfaces}><span>White</span><span>Ink</span><span>Accent</span></div><p>{notes.surfaces[0][1]}</p></article><article><span className={s.dataLabel}>{notes.surfaces[1][0]}</span><div className={s.darkSurfaces}>{["Result","Architecture","Workflow"].map((label,i)=><div key={label}><span className={s.dataLabel}>{label}</span><strong>{["Evidence first.","A nested system.","Review together."][i]}</strong></div>)}</div><p>{notes.surfaces[1][1]}</p></article></div>
    <div className={s.radiusGuide}>{notes.radius.map(([name,value,detail],i)=><article key={name}><div style={{borderRadius:`var(--ds-radius-${["control","card","panel","pill"][i]})`}}><span>{name}</span><code>{value}</code></div><p>{detail}</p></article>)}</div>
    <div className={s.elevationGuide}><div className={s.depthPreview} aria-hidden="true"><span>Content / 0</span><span>Sticky / 20</span><span>Toast / 40</span><strong>Modal / top layer</strong></div><div><h3>{notes.elevationTitle}</h3><p>{notes.elevation}</p><button type="button" className={s.button} data-variant="secondary" onClick={onOpen}>{t("打开真实弹窗")}<ArrowUpRight size={18} aria-hidden="true"/></button></div></div></>;
}

export function MotionGallery({ project }: { project: React.ReactNode }) {
  const { t, localize } = useCatalogue(); const notes = localize(baseNotes);

  const [mask, setMask] = useState(0);
  const [stagger, setStagger] = useState(0);
  return <div className={s.motionGallery}>{notes.motionDemos.map(([label,title,detail],i)=><article key={label}><span className={s.dataLabel}>{label}</span><h3>{title}</h3><div className={s.motionPreview}>
    {i===0 && <button className={s.button} type="button">{t("Explore work")}<ArrowUpRight size={18} aria-hidden="true"/></button>}
    {i===1 && <button className={s.quietUnderline} type="button">{t("Discover the details")}<ArrowUpRight size={18} aria-hidden="true"/></button>}
    {i===2 && project}
    {i===3 && <><div className={s.maskTitle} key={mask} data-play={mask>0}><span>{t("Selected work.")}</span></div><button className={s.replayButton} type="button" onClick={()=>setMask(v=>v+1)}><RotateCcw size={18} aria-hidden="true"/>{t("重播标题")}</button></>}
    {i===4 && <><div className={s.staggerCards} key={stagger} data-play={stagger>0}>{["01 / Observe","02 / Define","03 / Refine"].map((text,j)=><div key={text} style={{animationDelay:`${j*70}ms`}}>{text}</div>)}</div><button className={s.replayButton} type="button" onClick={()=>setStagger(v=>v+1)}><RotateCcw size={18} aria-hidden="true"/>{t("重播卡片")}</button></>}
    </div><p>{detail}</p></article>)}</div>;
}

export function ArchitectureGuide() {
  const { t, localize } = useCatalogue(); const architecture = localize(baseArchitecture);

  return <><span className={s.dataLabel}>{architecture.title} · Proposed</span><p>{architecture.intro}</p><pre className={s.code}><code>{architecture.chain}</code></pre><div className={s.architectureLayers}>{architecture.collections.map(collection=><article key={collection.name}><span className={s.dataLabel}>{collection.purpose}</span><h3>{collection.name}</h3><p>{collection.summary}</p><ul>{collection.details.map(detail=><li key={detail}>{detail}</li>)}</ul></article>)}</div>
    <section className={s.tokenExplanation} aria-labelledby="variable-type-title"><span className={s.dataLabel}>TYPE / NAME / SCOPE</span><h3 id="variable-type-title">{architecture.typeRule.title}</h3>{architecture.typeRule.body.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>
    <div className={s.modeContexts}>{architecture.contexts.map(context=><article key={context.name} data-mode={context.name.toLowerCase()}><span className={s.dataLabel}>{context.surface}</span><h3>{context.name}</h3><strong>{context.sample}</strong><p>{context.apply}</p></article>)}</div>
    <h3 className={s.subheading}>{t("手工映射表：每一项都是 Color variable")}</h3><p className={s.note}>{t("表中的 text / surface / border 是语义用途，不是变量类型。Light / Inverse 两列应通过 Figma variable alias 选择器指向 primitive，不要复制名称为文本值。")}</p>
    <div className={s.semanticTable} role="table" aria-label={t("Semantic color 手工别名映射")}><div className={s.semanticHeader} role="row">{architecture.mappingHeaders.map(header=><span key={header} role="columnheader">{header}</span>)}</div>{architecture.mappings.map(row=><div key={row[0]} role="row">{row.map((cell,index)=><span key={architecture.mappingHeaders[index]} role={index===0?"rowheader":"cell"} data-label={architecture.mappingHeaders[index]}>{cell}</span>)}</div>)}</div>
    <div className={s.manualBinding}><div><span className={s.dataLabel}>ONE COMPLETE EXAMPLE</span><h3>{t("一条别名链应该长这样")}</h3><pre className={s.code}><code>{architecture.manualAlias}</code></pre></div><ol>{architecture.manualSteps.map(([name,detail])=><li key={name}><h3>{name}</h3><p>{detail}</p></li>)}</ol></div>
    <h3 className={s.subheading}>{t("当前色板的完成度")}</h3><dl className={s.rules}>{architecture.paletteStatus.map(([name,description])=><div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}</dl>
    <dl className={s.rules}>{architecture.styles.map(([name,description])=><div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}</dl>
    <div className={s.specimenSpecs}>{architecture.specimens.map(spec=><article key={spec.name}><span className={s.dataLabel}>{spec.status}</span><h3>{spec.name}</h3><code>{spec.source}</code><dl>{spec.rows.map(([property,value,mapping])=><div key={property}><dt>{property}</dt><dd><p>{value}</p><p className={s.mapping}>{mapping}</p></dd></div>)}</dl></article>)}</div>
    <ol className={s.adoption}>{architecture.migration.map(([name,detail])=><li key={name}><h3>{name}</h3><p>{detail}</p></li>)}</ol><div className={s.sourceLinks}>{architecture.sources.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={16} aria-hidden="true"/></a>)}</div></>;
}
