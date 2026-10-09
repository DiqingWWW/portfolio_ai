"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, X, Plus, RotateCcw, AlertCircle, LoaderCircle } from "lucide-react";
import honda from "../../../../../content/projects/honda-hmi-design-system/project.json";
import { directions } from "../data";
import { dimensions, figmaVariableManifest, typeScale as baseTypeScale } from "./tokens";
import { copy as baseCopy } from "./content";
import { homepageCatalogueCopy as baseHomepageCopy } from "./homepage-content";
import s from "./system.module.css";
import { ArchitectureGuide, ColorGuide, MotionGallery, SpaceGuide, SurfaceGuide } from "./Explainers";
import { visualNotes as baseVisualNotes } from "./architecture";
import SystemCoverage from "./SystemCoverage";
import { systemCoverage as baseCoverage } from "./system-coverage";
import { portfolioTokens } from "@/design-system/portfolio/tokens";
import SharedProjectCard from "@/design-system/portfolio/ProjectCard";
import HomepagePatterns from "@/design-system/portfolio/HomepagePatterns";
import type { ProjectData } from "@/types/content";
import { getLocalizedSiteContent, type Locale } from "@/i18n/dictionary";
import { CatalogueLocale, useCatalogue } from "./CatalogueLocale";


function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section className={s.section} id={id}><h2>{title}</h2>{children}</section>;
}

function Rules({ rows }: { rows: readonly (readonly string[])[] }) {
  return <dl className={s.rules}>{rows.map(([label, value, detail]) => <div key={label}><dt>{label}</dt><dd>{detail ? <><strong>{value}</strong><p>{detail}</p></> : value}</dd></div>)}</dl>;
}

function ProjectCard({ long = false, image = true, preview = false }: { long?: boolean; image?: boolean; preview?: boolean }) {
  const { locale, localize } = useCatalogue();
  const copy = localize(baseCopy);
  const project = getLocalizedSiteContent(locale, [honda as ProjectData]).projects[0];
  return <SharedProjectCard project={project} title={long ? copy.stressTitle : project.title} image={image} preview={preview} />;
}

export default function SystemPage({ projectHref, locale = "zh" }: { projectHref?: string; locale?: Locale }) {
  return <CatalogueLocale.Provider value={locale}><SystemPageBody projectHref={projectHref} /></CatalogueLocale.Provider>;
}

function SystemPageBody({ projectHref }: { projectHref?: string }) {
  const { locale, t, localize } = useCatalogue();
  const copy = localize(baseCopy);
  const homepageCatalogueCopy = localize(baseHomepageCopy);
  const visualNotes = localize(baseVisualNotes);
  const systemCoverage = localize(baseCoverage);
  const typeScale = localize(baseTypeScale);
  const [reduced, setReduced] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [replay, setReplay] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function save() {
    if (busy) return;
    setBusy(true); setNotice("");
    timer.current = setTimeout(() => { setBusy(false); setNotice(t("演示已完成。未写入文件或发送任何数据。")); }, 900);
  }
  function download(format: "json" | "css") {
    const text = format === "json" ? JSON.stringify(figmaVariableManifest, null, 2) : `.deethin-system-06-v2 {\n${Object.entries(portfolioTokens).map(([key, value]) => `  ${key}: ${value};`).join("\n")}\n`;
    const url = URL.createObjectURL(new Blob([text], { type: format === "json" ? "application/json" : "text/css" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = format === "json" ? "deethin-system-v2.figma-variables.json" : "deethin-system-v2.tokens.css"; anchor.click(); URL.revokeObjectURL(url);
    setNotice(format === "json" ? `${t("历史提案 manifest 已生成：")}${figmaVariableManifest.audit.variableCount}${t(" variables。它不是当前 Inuse 架构，也不是通用导入文件。")}` : t("CSS registry 已导出，包含首页来源项与逐项标记的待定项；导出不代表全部批准。"));
  }

  return <main className={s.root} style={portfolioTokens as CSSProperties} data-reduced={reduced} lang={locale === "zh" ? "zh-CN" : "en"}>
    <a className={s.skip} href="#principles">{t("跳到规范正文")}</a>
    <header className={s.header}><Link href={projectHref ?? "/"} className={s.wordmark}>Diqing Wu<span>Design systems / 06 · V2</span></Link><a href="/proto/design-system-directions/deethin-system#principles" target="_blank" rel="noreferrer" className={s.headerLink}>{t("对照 V1 原版")}<ArrowUpRight size={18} aria-hidden="true" /></a><Link className={s.headerLink} href={locale === "en" ? "/zh/work/portfolio-operating-system/design-system" : "/work/portfolio-operating-system/design-system"}>{locale === "en" ? "中文" : "EN"}</Link></header>
    <div className={s.hero}>
      <h1>{copy.title.split("\n").map(line => <span key={line}>{line}</span>)}</h1>
      <div className={s.heroBottom}><p>{copy.intro}</p><a className={s.button} href="#components">{t("查看真实组件")}<ArrowRight size={18} aria-hidden="true" /></a></div>
      <div className={s.heroStrip}><span>Deethin × Fabrica</span><span>Tokens. Components. Motion.</span><span>V2 · Proposed · 26 Sep 2026</span></div>
    </div>
    <nav className={s.directions} aria-label={t("六个设计方向")}>{directions.map((d, i) => <Link key={d.slug} href={`/proto/design-system-directions/${d.slug}`}>{i + 1}. {d.label}</Link>)}<Link href="/proto/design-system-directions/deethin-system">6. Deethin system / V1</Link><Link href={projectHref ? `${locale === "zh" ? "/zh" : ""}/work/portfolio-operating-system/design-system` : "/proto/design-system-directions/deethin-system-v2"} aria-current="page">6. Deethin system / V2</Link></nav>
    <div className={s.workspace}>
      <aside className={s.index}><nav aria-label={t("规范章节")}>{copy.nav.map(([id, label], index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</nav><p>{homepageCatalogueCopy.index[0]}<br />{homepageCatalogueCopy.index[1]}</p></aside>
      <div className={s.content}>
        <Section id="principles" title={t("A point of view.")}><p className={s.lead}>{copy.provenance}</p><div className={s.principles}>{copy.principles.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div></Section>
        <Section id="color" title={t("Color has a role.")}><ColorGuide /></Section>
        <Section id="type" title={t("Type sets the pace.")}><p>{t("Inter / system sans 负责内容；JetBrains Mono 负责代码和测量。复用网站已有字体，不新增字体请求。语义层级与视觉尺寸分开。")}</p><div className={s.typeList}>{typeScale.map(t => <div className={s.typeRow} key={t.id}><div style={{ fontSize: `var(--ds-type-${t.id})`, lineHeight: t.leading, fontWeight: t.weight, letterSpacing: t.tracking }}>{t.label === "Display" ? "Aa" : t.label}</div><div><code>{t.size} · {t.weight}<br />line {t.leading} · tracking {t.tracking}</code><p>{t.use}</p></div></div>)}</div><p className={s.note}>{t("紧字距只用于英文标题。中文标题恢复 normal tracking / 1.25 行高；中文正文 1.8。禁止用超小标签装载重要信息。")}</p></Section>
        <Section id="space" title={t("Space, made explicit.")}><div className={s.rulers}>{Object.entries(dimensions).filter(([key]) => key.startsWith("space-")).map(([key, value]) => <div key={key}><code>{key}</code><span style={{ width: value }} /><b>{value}</b></div>)}</div><SpaceGuide /><div className={s.gridDemo} aria-label={t("响应式布局网格")}>{Array.from({ length: 12 }, (_, i) => <span key={i}>{i + 1}</span>)}</div><div className={s.anatomy}><div><span className={s.measure}>padding-block 12 · inline 20</span><button className={s.button} type="button" onClick={save}><ArrowUpRight size={18} aria-hidden="true" />{t("检查间距")}</button><span className={s.measure}>min-height 48 · gap 8 · pill</span></div><p>{t("这里的按钮与状态库用同一个 class 和 token；不是另外画的一张框模型图。控件有最小高度，没有固定高度锁死放大的文字。")}</p></div></Section>
        <Section id="assets" title={t("A quiet visual vocabulary.")}><div className={s.iconStrip}>{[ArrowUpRight, ArrowRight, Check, X, Plus, RotateCcw, AlertCircle].map((Icon, i) => <Icon key={i} size={24} strokeWidth={1.5} aria-hidden="true" />)}</div><Rules rows={copy.assets.slice(0, 4)} /><SurfaceGuide onOpen={() => dialog.current?.showModal()} /></Section>
        <Section id="components" title={t("States are the system.")}><p>{t("下面是可对照的视觉状态样本；hover / focus / pressed 被固定展示，真实交互请用下方演示。不可用与加载状态不能重复触发。")}</p><div className={s.buttonMatrix}>{["primary", "secondary", "quiet"].map(variant => <article key={variant}><h3>{variant}</h3>{copy.states.map(state => <div className={s.stateRow} key={state}><code>{state}</code><button type="button" className={s.button} data-variant={variant} data-state={state} disabled={state === "disabled"} aria-disabled={state === "loading" || undefined} aria-busy={state === "loading"} onClick={state === "loading" ? undefined : save}>{state === "loading" && <LoaderCircle size={16} className={s.spinner} aria-hidden="true" />}{state === "loading" ? t("Saving…") : t("View project")}{state !== "loading" && <ArrowUpRight size={18} aria-hidden="true" />}</button></div>)}</article>)}</div><div className={s.demoBar}><button className={s.button} type="button" aria-busy={busy} aria-disabled={busy} onClick={save}>{busy ? t("Saving…") : t("运行保存演示")}{!busy && <ArrowRight size={18} aria-hidden="true" />}</button><p>{t("保持焦点、固定最小宽度、900ms 后返回反馈。")}</p></div>
        <div className={s.demoBar}><button type="button" className={s.quietUnderline} onClick={save}>{t("Quiet / animated underline")}<ArrowUpRight size={18} aria-hidden="true" /></button></div><p className={s.note}>{visualNotes.focus}</p><h3 className={s.subheading}>{t("Text field / 6 states")}</h3><div className={s.inputGrid}>{copy.inputStates.map(state => <div className={s.field} key={state}><label htmlFor={`example-${state}`}>{state}</label><input id={`example-${state}`} className={s.input} data-state={state} readOnly disabled={state === "disabled"} defaultValue={state === "filled" ? "Diqing Wu" : state === "error" ? "invalid-email" : ""} placeholder={t("Your name")} aria-invalid={state === "error" || undefined} aria-describedby={state === "error" ? "example-error-help" : undefined} />{state === "error" && <span id="example-error-help" className={s.error}><AlertCircle size={16} aria-hidden="true" />{t("请输入有效的邮箱地址。")}</span>}</div>)}</div><p className={s.note}>{t("label→input 8px；input padding 12×16px、min-height 48px；helper gap 8px；font-size 16px 防止 iOS 聚焦缩放。disabled 与 read-only 不等价。")}</p>
        <h3 className={s.subheading}>{t("Selection / native controls")}</h3><div className={s.selection}><label><input type="checkbox" />{t("允许保存这次本地偏好")}</label><label><input type="checkbox" defaultChecked />{t("已选状态")}</label><label><input type="checkbox" disabled />{t("不可用状态")}</label></div><fieldset className={s.selection}><legend>{t("预览密度（改变下面的样本宽度）")}</legend><label><input type="radio" name="density" checked={!narrow} onChange={() => setNarrow(false)} />{t("流式")}</label><label><input type="radio" name="density" checked={narrow} onChange={() => setNarrow(true)} />320px</label></fieldset>
        </Section>
        <Section id="patterns" title={t("From parts to portfolio.")}><div className={s.projectGrid}><div><p className={s.sampleCaption}>{t("REST / 可 hover 或用 Tab 聚焦")}</p><ProjectCard /></div><div><p className={s.sampleCaption}>{t("REVEALED / 固定展示辅助信息")}</p><ProjectCard preview /></div></div><p className={s.note}>{visualNotes.cardNote}</p><div className={s.patternGrid}><div><h3>{t("Disclosure")}</h3>{copy.disclosure.map(([q, a], i) => <details className={s.disclosure} key={q} open={i === 0}><summary>{q}<Plus size={20} aria-hidden="true" /></summary><p>{a}</p></details>)}</div><div><h3>{t("Form + feedback")}</h3><form noValidate onSubmit={event => { event.preventDefault(); const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); setError(!valid); if (valid) save(); else emailInput.current?.focus(); }}><div className={s.field}><label htmlFor="live-email">{t("邮箱（仅本地校验）")}</label><input ref={emailInput} className={s.input} id="live-email" type="email" autoComplete="email" value={email} onChange={event => { setEmail(event.target.value); if (error) setError(false); }} aria-invalid={error} aria-describedby="live-help" /><span id="live-help" className={error ? s.error : s.helper}>{error ? t("请输入包含 @ 和域名的邮箱地址。") : t("不会发送邮件，也不会保存你的地址。")}</span></div><button className={s.button} aria-disabled={busy} aria-busy={busy} type="submit">{busy ? t("Checking…") : t("检查并演示反馈")}</button></form><button type="button" className={s.textLink} onClick={() => dialog.current?.showModal()}>{t("打开设计决策对话框")}<ArrowUpRight size={18} aria-hidden="true" /></button></div></div></Section>
        <Section id="motion" title={t("Movement with meaning.")}><p>{t("首页复杂开场保留在生产页面；这里用独立舞台检验相同的编辑节奏，不重复播放整段 WebGL 开场。")}</p><div className={s.motionStage}><div className={s.motionWords} key={replay} data-play={replay > 0}>{[t("Evidence."), t("Structure."), t("Movement.")].map((word, i) => <span style={{ animationDelay: `${i * 70}ms` }} key={word}>{word}</span>)}</div><button type="button" className={s.button} data-variant="inverse" onClick={() => setReplay(value => value + 1)}><RotateCcw size={18} aria-hidden="true" />{t("重播叙事动效")}</button></div><label className={s.switch}><input type="checkbox" role="switch" checked={reduced} onChange={event => setReduced(event.target.checked)} />{t("减少动态效果（全页预览）")}</label><MotionGallery project={<ProjectCard />} /><Rules rows={copy.motion} /></Section>
        <Section id="stress" title={t("When content pushes back.")}><div className={s.testControls}><label><input type="checkbox" checked={narrow} onChange={event => setNarrow(event.target.checked)} />{t("样本宽度 320px")}</label><label><input type="checkbox" checked={largeText} onChange={event => setLargeText(event.target.checked)} />{t("样本文字 200%")}</label></div><p>{t("这是组件压力样本，不冒充整页浏览器缩放测试。也请在真实 320px viewport 检查导航与布局。")}</p><div className={s.stress} data-large={largeText} data-narrow={narrow}><ProjectCard long /><div className={s.empty}><h3>{t("暂无匹配项目")}</h3><p>{t("清除筛选可查看现有作品。这里是空状态样本，不是实际项目列表。")}</p><button className={s.button} data-variant="secondary" type="button" onClick={() => { setNarrow(false); setLargeText(false); setNotice(t("已重置组件压力样本。")); }}>{t("重置样本")}</button></div><ProjectCard image={false} long /></div></Section>
        <Section id="home-patterns" title={systemCoverage.title}><SystemCoverage /><HomepagePatterns reduced={reduced} /></Section>
        <Section id="architecture" title={t("A system behind the system.")}><details><summary>{systemCoverage.legacy}</summary><ArchitectureGuide /></details></Section>
        <Section id="handoff" title={t("A traceable handoff.")}><p>{systemCoverage.bindingNote}</p><pre className={s.code}><code>{copy.snippet}</code></pre><div className={s.demoBar}><button className={s.button} data-variant="secondary" type="button" onClick={() => download("css")}>{t("下载 CSS tokens")}</button></div><details><summary>{systemCoverage.legacy}</summary><div className={s.exportAudit}><span className={s.dataLabel}>{figmaVariableManifest.audit.valid ? "LEGACY MANIFEST INTERNALLY VALID" : "AUDIT FAILED"}</span><strong>{figmaVariableManifest.audit.collectionCount} collections · {figmaVariableManifest.audit.variableCount} variables</strong><p>{figmaVariableManifest.audit.valid ? t("内部名称、mode 值和 alias 目标完整；这只验证历史提案本身，不代表当前 Inuse 采用该架构。") : figmaVariableManifest.audit.errors.join("；")}</p></div><button className={s.button} type="button" disabled={!figmaVariableManifest.audit.valid} onClick={() => download("json")}>{t("下载历史 MCP / Plugin manifest")}</button></details></Section>
      </div>
    </div>
    <footer className={s.footer}><span>Diqing Wu</span><p>{t("A living proposal, not a silent replacement.")}</p><a href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "instant" }); }}>{t("Back to top")}<ArrowUpRight size={20} aria-hidden="true" /></a></footer>
    <div className={s.toast} role="status" aria-live="polite" aria-atomic="true">{notice && <><Check size={20} aria-hidden="true" /><p>{notice}</p><button type="button" aria-label={t("关闭提示")} onClick={() => setNotice("")}><X size={18} /></button></>}</div>
    <dialog className={s.dialog} ref={dialog} aria-labelledby="decision-title" aria-describedby="decision-description"><div className={s.dialogHeading}><h2 id="decision-title">{t("Review, then adopt.")}</h2><button type="button" className={s.iconButton} aria-label={t("关闭设计决策对话框")} onClick={() => dialog.current?.close()}><X size={20} /></button></div><p id="decision-description">{t("这里只演示受保护的决策界面。确认不会修改生产系统，也不会标记方向已通过；实际采用需要你的明确反馈。")}</p><form method="dialog"><button className={s.button} value="close">{t("返回规范")}</button></form></dialog>
  </main>;
}
