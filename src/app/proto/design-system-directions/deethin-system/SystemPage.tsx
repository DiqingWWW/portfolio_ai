"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, X, Plus, RotateCcw, AlertCircle, LoaderCircle } from "lucide-react";
import honda from "../../../../../content/projects/honda-hmi-design-system/project.json";
import { directions } from "../data";
import { colors, contrast, dimensions, exportedSystem, tokenVariables, typeScale } from "./tokens";
import { copy } from "./content";
import s from "./system.module.css";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section className={s.section} id={id}><h2>{title}</h2>{children}</section>;
}

function Rules({ rows }: { rows: readonly (readonly string[])[] }) {
  return <dl className={s.rules}>{rows.map(([label, value, detail]) => <div key={label}><dt>{label}</dt><dd>{detail ? <><strong>{value}</strong><p>{detail}</p></> : value}</dd></div>)}</dl>;
}

function ProjectCard({ long = false, image = true }: { long?: boolean; image?: boolean }) {
  return <article className={s.projectCard}>
    {image && <div className={s.projectMedia}><Image src="/assets/images/honda-hmi-design-system/cover2-display.webp" alt="Honda HMI design system 项目封面" width={1600} height={900} sizes="(max-width: 700px) 100vw, 50vw" /></div>}
    <div className={s.cardBody}><span className={s.meta}>{honda.metadata.type} · {honda.metadata.year}</span><h3>{long ? copy.stressTitle : honda.title}</h3><p>{honda.descriptions.short}</p><div className={s.tags}>{honda.tokens.map(tag => <span key={tag}>{tag}</span>)}</div><a className={s.projectLink} href={honda.detailHref}>Read case study <ArrowUpRight aria-hidden="true" size={20} /></a></div>
  </article>;
}

export default function SystemPage() {
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
    timer.current = setTimeout(() => { setBusy(false); setNotice("演示已完成。未写入文件或发送任何数据。"); }, 900);
  }
  function download(format: "json" | "css") {
    const text = format === "json" ? JSON.stringify(exportedSystem, null, 2) : `.deethin-system-06 {\n${Object.entries(tokenVariables).map(([key, value]) => `  ${key}: ${value};`).join("\n")}\n`;
    const url = URL.createObjectURL(new Blob([text], { type: format === "json" ? "application/json" : "text/css" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `deethin-system-06.tokens.${format}`; anchor.click(); URL.revokeObjectURL(url);
    setNotice(`${format.toUpperCase()} token 文件已生成；状态仍为 Proposed。`);
  }

  return <main className={s.root} style={tokenVariables as CSSProperties} data-reduced={reduced} lang="zh-CN">
    <a className={s.skip} href="#principles">跳到规范正文</a>
    <header className={s.header}><Link href="/" className={s.wordmark}>Diqing Wu<span>Design systems / 06</span></Link><a href="#handoff" className={s.headerLink}>Inspect the system <ArrowUpRight size={18} aria-hidden="true" /></a></header>
    <div className={s.hero}>
      <h1>{copy.title.split("\n").map(line => <span key={line}>{line}</span>)}</h1>
      <div className={s.heroBottom}><p>{copy.intro}</p><a className={s.button} href="#components">查看真实组件 <ArrowRight size={18} aria-hidden="true" /></a></div>
      <div className={s.heroStrip}><span>Deethin × Fabrica</span><span>Tokens. Components. Motion.</span><span>Proposed · 22 Sep 2026</span></div>
    </div>
    <nav className={s.directions} aria-label="六个设计方向">{directions.map((d, i) => <Link key={d.slug} href={`/proto/design-system-directions/${d.slug}`}>{i + 1}. {d.label}</Link>)}<Link href="/proto/design-system-directions/deethin-system" aria-current="page">6. Deethin system</Link></nav>
    <div className={s.workspace}>
      <aside className={s.index}><nav aria-label="规范章节">{copy.nav.map(([id, label], index) => <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</nav><p>可见规则 = 实际 token<br />不覆盖正式网站</p></aside>
      <div className={s.content}>
        <Section id="principles" title="A point of view."><p className={s.lead}>{copy.provenance}</p><div className={s.principles}>{copy.principles.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div></Section>
        <Section id="color" title="Color has a role."><p>色值来自本页实际使用的 token。对比度按下方指定的前景／背景计算，不把不同背景上的比值混为一谈。</p><div className={s.palette}>{colors.map(color => <article key={color.id}><div className={s.swatch} style={{ background: color.value, color: Number(contrast(color.value, color.against)) >= 4.5 ? color.against : "#101010" }}><span>Aa</span><code>{color.value}</code></div><h3>{color.name}</h3><code>--ds-{color.id}</code><p>{color.use}</p><small>{color.source}<br />与 {color.against}：{contrast(color.value, color.against)}:1</small></article>)}</div><p className={s.note}>正文 ≥4.5:1；大字与可见控件边界 ≥3:1。16% ink 分隔线只作装饰分组，不承担输入边界；状态始终带文字或图标。</p></Section>
        <Section id="type" title="Type sets the pace."><p>Inter / system sans 负责内容；JetBrains Mono 负责代码和测量。复用网站已有字体，不新增字体请求。语义层级与视觉尺寸分开。</p><div className={s.typeList}>{typeScale.map(t => <div className={s.typeRow} key={t.id}><div style={{ fontSize: `var(--ds-type-${t.id})`, lineHeight: t.leading, fontWeight: t.weight, letterSpacing: t.tracking }}>{t.label === "Display" ? "Aa" : t.label}</div><div><code>{t.size} · {t.weight}<br />line {t.leading} · tracking {t.tracking}</code><p>{t.use}</p></div></div>)}</div><p className={s.note}>紧字距只用于英文标题。中文标题恢复 normal tracking / 1.25 行高；中文正文 1.8。禁止用超小标签装载重要信息。</p></Section>
        <Section id="space" title="Space, made explicit."><div className={s.rulers}>{Object.entries(dimensions).filter(([key]) => key.startsWith("space-")).map(([key, value]) => <div key={key}><code>{key}</code><span style={{ width: value }} /><b>{value}</b></div>)}</div><Rules rows={copy.layout} /><div className={s.gridDemo} aria-label="响应式布局网格">{Array.from({ length: 12 }, (_, i) => <span key={i}>{i + 1}</span>)}</div><div className={s.anatomy}><div><span className={s.measure}>padding-block 12 · inline 20</span><button className={s.button} type="button" onClick={save}><ArrowUpRight size={18} aria-hidden="true" />检查间距</button><span className={s.measure}>min-height 48 · gap 8 · pill</span></div><p>这里的按钮与状态库用同一个 class 和 token；不是另外画的一张框模型图。控件有最小高度，没有固定高度锁死放大的文字。</p></div></Section>
        <Section id="assets" title="A quiet visual vocabulary."><div className={s.iconStrip}>{[ArrowUpRight, ArrowRight, Check, X, Plus, RotateCcw, AlertCircle].map((Icon, i) => <Icon key={i} size={24} strokeWidth={1.5} aria-hidden="true" />)}</div><Rules rows={copy.assets} /><div className={s.surfaceSamples}><div style={{ borderRadius: "var(--ds-radius-control)" }}>Control <code>8px</code></div><div style={{ borderRadius: "var(--ds-radius-card)" }}>Project <code>18px</code></div><div style={{ borderRadius: "var(--ds-radius-panel)" }}>Chapter <code>28px</code></div></div></Section>
        <Section id="components" title="States are the system."><p>下面是可对照的视觉状态样本；hover / focus / pressed 被固定展示，真实交互请用下方演示。不可用与加载状态不能重复触发。</p><div className={s.buttonMatrix}>{["primary", "secondary", "quiet"].map(variant => <article key={variant}><h3>{variant}</h3>{copy.states.map(state => <div className={s.stateRow} key={state}><code>{state}</code><button type="button" className={s.button} data-variant={variant} data-state={state} disabled={state === "disabled"} aria-disabled={state === "loading" || undefined} aria-busy={state === "loading"} onClick={state === "loading" ? undefined : save}>{state === "loading" && <LoaderCircle size={16} className={s.spinner} aria-hidden="true" />}{state === "loading" ? "Saving…" : "View project"}</button></div>)}</article>)}</div><div className={s.demoBar}><button className={s.button} type="button" aria-busy={busy} aria-disabled={busy} onClick={save}>{busy ? "Saving…" : "运行保存演示"}{!busy && <ArrowRight size={18} aria-hidden="true" />}</button><p>保持焦点、固定最小宽度、900ms 后返回反馈。</p></div>
        <h3 className={s.subheading}>Text field / 6 states</h3><div className={s.inputGrid}>{copy.inputStates.map(state => <div className={s.field} key={state}><label htmlFor={`example-${state}`}>{state}</label><input id={`example-${state}`} className={s.input} data-state={state} readOnly disabled={state === "disabled"} defaultValue={state === "filled" ? "Diqing Wu" : state === "error" ? "invalid-email" : ""} placeholder="Your name" aria-invalid={state === "error" || undefined} aria-describedby={state === "error" ? "example-error-help" : undefined} />{state === "error" && <span id="example-error-help" className={s.error}><AlertCircle size={16} aria-hidden="true" />请输入有效的邮箱地址。</span>}</div>)}</div><p className={s.note}>label→input 8px；input padding 12×16px、min-height 48px；helper gap 8px；font-size 16px 防止 iOS 聚焦缩放。disabled 与 read-only 不等价。</p>
        <h3 className={s.subheading}>Selection / native controls</h3><div className={s.selection}><label><input type="checkbox" />允许保存这次本地偏好</label><label><input type="checkbox" defaultChecked />已选状态</label><label><input type="checkbox" disabled />不可用状态</label></div><fieldset className={s.selection}><legend>预览密度（改变下面的样本宽度）</legend><label><input type="radio" name="density" checked={!narrow} onChange={() => setNarrow(false)} />流式</label><label><input type="radio" name="density" checked={narrow} onChange={() => setNarrow(true)} />320px</label></fieldset>
        </Section>
        <Section id="patterns" title="From parts to portfolio."><div className={s.projectGrid}><ProjectCard /><ProjectCard image={false} long /></div><p className={s.note}>卡片 padding 桌面 24px / 小屏 20px，内容 gap 16px，标签 gap 8px；封面 16:9。标题和摘要始终可读，不把必要内容藏到 hover。长标题换行，不静默截断。</p><div className={s.patternGrid}><div><h3>Disclosure</h3>{copy.disclosure.map(([q, a], i) => <details className={s.disclosure} key={q} open={i === 0}><summary>{q}<Plus size={20} aria-hidden="true" /></summary><p>{a}</p></details>)}</div><div><h3>Form + feedback</h3><form noValidate onSubmit={event => { event.preventDefault(); const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); setError(!valid); if (valid) save(); else emailInput.current?.focus(); }}><div className={s.field}><label htmlFor="live-email">邮箱（仅本地校验）</label><input ref={emailInput} className={s.input} id="live-email" type="email" autoComplete="email" value={email} onChange={event => { setEmail(event.target.value); if (error) setError(false); }} aria-invalid={error} aria-describedby="live-help" /><span id="live-help" className={error ? s.error : s.helper}>{error ? "请输入包含 @ 和域名的邮箱地址。" : "不会发送邮件，也不会保存你的地址。"}</span></div><button className={s.button} aria-disabled={busy} aria-busy={busy} type="submit">{busy ? "Checking…" : "检查并演示反馈"}</button></form><button type="button" className={s.textLink} onClick={() => dialog.current?.showModal()}>打开设计决策对话框 <ArrowUpRight size={18} aria-hidden="true" /></button></div></div></Section>
        <Section id="motion" title="Movement with meaning."><p>首页复杂开场保留在生产页面；这里用独立舞台检验相同的编辑节奏，不重复播放整段 WebGL 开场。</p><div className={s.motionStage}><div className={s.motionWords} key={replay} data-play={replay > 0}>{["Evidence.", "Structure.", "Movement."].map((word, i) => <span style={{ animationDelay: `${i * 70}ms` }} key={word}>{word}</span>)}</div><button type="button" className={s.button} data-variant="inverse" onClick={() => setReplay(value => value + 1)}><RotateCcw size={18} aria-hidden="true" />重播叙事动效</button></div><label className={s.switch}><input type="checkbox" role="switch" checked={reduced} onChange={event => setReduced(event.target.checked)} />减少动态效果（全页预览）</label><Rules rows={copy.motion} /></Section>
        <Section id="stress" title="When content pushes back."><div className={s.testControls}><label><input type="checkbox" checked={narrow} onChange={event => setNarrow(event.target.checked)} />样本宽度 320px</label><label><input type="checkbox" checked={largeText} onChange={event => setLargeText(event.target.checked)} />样本文字 200%</label></div><p>这是组件压力样本，不冒充整页浏览器缩放测试。也请在真实 320px viewport 检查导航与布局。</p><div className={s.stress} data-large={largeText} data-narrow={narrow}><ProjectCard long /><div className={s.empty}><h3>暂无匹配项目</h3><p>清除筛选可查看现有作品。这里是空状态样本，不是实际项目列表。</p><button className={s.button} data-variant="secondary" type="button" onClick={() => { setNarrow(false); setLargeText(false); setNotice("已重置组件压力样本。"); }}>重置样本</button></div></div></Section>
        <Section id="handoff" title="A traceable handoff."><p>Primitive → semantic → component → local mode。此页通过 tokens.ts 生成 CSS variables，并用同一来源展示参数与导出；公开网站的自动提取文件另外保存，不直接作为全站主题导入。</p><pre className={s.code}><code>{copy.snippet}</code></pre><div className={s.demoBar}><button className={s.button} type="button" onClick={() => download("json")}>下载 tokens.json</button><button className={s.button} data-variant="secondary" type="button" onClick={() => download("css")}>下载 tokens.css</button></div><p className={s.note}>版本 0.1.0 · Proposed · Figma mapping 尚未绑定 · 未迁移正式组件。完整来源、限制、迁移与验收说明见 research/design-system-v6/DESIGN_SYSTEM.md。</p></Section>
      </div>
    </div>
    <footer className={s.footer}><span>Diqing Wu</span><p>A living proposal, not a silent replacement.</p><a href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "instant" }); }}>Back to top <ArrowUpRight size={20} aria-hidden="true" /></a></footer>
    <div className={s.toast} role="status" aria-live="polite" aria-atomic="true">{notice && <><Check size={20} aria-hidden="true" /><p>{notice}</p><button type="button" aria-label="关闭提示" onClick={() => setNotice("")}><X size={18} /></button></>}</div>
    <dialog className={s.dialog} ref={dialog} aria-labelledby="decision-title" aria-describedby="decision-description"><div className={s.dialogHeading}><h2 id="decision-title">Review, then adopt.</h2><button type="button" className={s.iconButton} aria-label="关闭设计决策对话框" onClick={() => dialog.current?.close()}><X size={20} /></button></div><p id="decision-description">这里只演示受保护的决策界面。确认不会修改生产系统，也不会标记方向已通过；实际采用需要你的明确反馈。</p><form method="dialog"><button className={s.button} value="close">返回规范</button></form></dialog>
  </main>;
}
