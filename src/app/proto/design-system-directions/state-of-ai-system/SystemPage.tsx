'use client';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Copy,
  Download,
  ImageOff,
  Menu,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { copy, coverage, cssExport, evidence, sourceUrl, tokens, type EvidenceStatus, type Locale } from './content';
import s from './system.module.css';

type SectionId = (typeof copy.zh.nav)[number][0];

function contrast(hex: string, background = '#FFFFFF') {
  const luminance = (value: string) => {
    const rgb = value.replace('#', '').match(/.{2}/g)?.slice(0, 3).map((item) => parseInt(item, 16) / 255) ?? [1, 1, 1];
    const linear = rgb.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  const foreground = luminance(hex);
  const surface = luminance(background);
  return ((Math.max(foreground, surface) + 0.05) / (Math.min(foreground, surface) + 0.05)).toFixed(2);
}

function StatusBadge({ status, locale }: { status: EvidenceStatus; locale: Locale }) {
  return <span className={s.status} data-status={status}>{copy[locale].statuses[status]}</span>;
}

function Mosaic({ compact = false }: { compact?: boolean }) {
  return (
    <div className={s.mosaic} data-compact={compact} aria-label="Abstract gradient mosaic specimen">
      <span className={s.mosaicCoral} />
      <span className={s.mosaicLavender} />
      <span className={s.mosaicSlate} />
      <span className={s.mosaicMist} />
      <span className={s.mosaicIce} />
      <span className={s.mosaicNavy} />
    </div>
  );
}

function DataChart({ locale, animate = false }: { locale: Locale; animate?: boolean }) {
  const items = locale === 'zh'
    ? [['产品设计', 86], ['品牌与营销', 37], ['研究', 32], ['设计工程', 23]]
    : [['Product design', 86], ['Brand & marketing', 37], ['Research', 32], ['Design engineering', 23]];
  return (
    <div className={s.chart} data-animate={animate}>
      {items.map(([label, value], index) => (
        <div key={String(label)}>
          <span>{label}</span>
          <div><i style={{ '--chart-width': `${value}%`, '--chart-delay': `${index * 70}ms` } as CSSProperties} /></div>
          <strong>{value}%</strong>
        </div>
      ))}
    </div>
  );
}

function Section({ id, locale, children }: { id: SectionId; locale: Locale; children: ReactNode }) {
  const [title, description] = copy[locale].section[id];
  return (
    <section id={id} className={s.section}>
      <header className={s.sectionHeader}>
        <div><span>{String(copy[locale].nav.find(([item]) => item === id)?.[1])}</span><h2>{title}</h2></div>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}

export default function SystemPage() {
  const [locale, setLocale] = useState<Locale>('zh');
  const [active, setActive] = useState<SectionId>('overview');
  const [composition, setComposition] = useState(0);
  const [motionKey, setMotionKey] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [longCopy, setLongCopy] = useState(false);
  const [missing, setMissing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'error' | 'success'>('idle');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const c = copy[locale];
  const formMessage = formState === 'error' ? c.labels.required : formState === 'success' ? c.labels.success : '';
  const copyMessage = copyState === 'copied' ? c.labels.copied : copyState === 'failed' ? c.labels.copyFailed : '';

  const variables = useMemo(() => Object.fromEntries(tokens.map((token) => [token.css, token.value])) as CSSProperties, []);
  const jsonHref = '/proto/design-system-directions/state-of-ai-system/tokens.json';
  const cssHref = '/proto/design-system-directions/state-of-ai-system/tokens.css';

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id as SectionId);
    }, { rootMargin: '-18% 0px -68% 0px' });
    document.querySelectorAll('[data-state-of-ai-system] section[id]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormState('error');
      return;
    }
    setFormState('success');
  };

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const next = (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
    setComposition(next);
    document.getElementById(`soa-tab-${next}`)?.focus();
  };

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(cssExport);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <div
      className={s.root}
      data-state-of-ai-system
      data-reduced={reduced}
      style={variables}
      lang={locale === 'zh' ? 'zh-CN' : 'en'}
    >
      <a className={s.skip} href="#overview">{c.skip}</a>
      <header className={s.topbar}>
        <a className={s.brand} href="#overview" aria-label={`${c.title} ${c.subtitle}`}>
          <span>Ai</span><span>ID</span><b>26</b>
        </a>
        <div className={s.topActions}>
          <span className={s.version}>{c.version}</span>
          <button className={s.localeButton} type="button" onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}>
            {c.localeOther}
          </button>
          <a href={sourceUrl} target="_blank" rel="noreferrer">{c.source}<ArrowUpRight size={15} /></a>
        </div>
      </header>

      <div className={s.shell}>
        <aside className={s.sidebar}>
          <nav aria-label={locale === 'zh' ? '设计系统章节' : 'Design system sections'}>
            {c.nav.map(([id, label], index) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>{label}
              </a>
            ))}
          </nav>
          <div className={s.sidebarMeta}>
            <StatusBadge status="inferred" locale={locale} />
            <p>{c.coverageNote}</p>
          </div>
        </aside>

        <main className={s.main}>
          <section id="overview" className={s.overview}>
            <div className={s.heroMosaic}><Mosaic /></div>
            <div className={s.heroTitle}>
              <p>{c.subtitle}</p>
              <h1>{c.title}<br /><span>2026</span></h1>
            </div>
            <div className={s.heroFooter}>
              <p>{c.intro}</p>
              <div><StatusBadge status="observed" locale={locale} /><StatusBadge status="inferred" locale={locale} /><StatusBadge status="proposed" locale={locale} /><StatusBadge status="unknown" locale={locale} /></div>
            </div>
            <p className={s.description}>{c.description}</p>
            <div className={s.principles}>
              {c.principles.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </section>

          <Section id="evidence" locale={locale}>
            <div className={s.metricStrip}>
              <article><strong>9</strong><span>{c.labels.representativePages}</span></article>
              <article><strong>4</strong><span>{c.labels.pageFamilies}</span></article>
              <article><strong>{tokens.length}</strong><span>{locale === 'zh' ? '系统 tokens' : 'system tokens'}</span></article>
              <article><strong>1</strong><span>{c.labels.interactionGap}</span></article>
            </div>
            <div className={s.evidenceList}>
              {evidence.map((item) => (
                <article key={item.id}>
                  <div><StatusBadge status={item.status} locale={locale} /><code>{item.id}</code></div>
                  <h3>{item.family[locale]}</h3>
                  <p>{item.scope[locale]}</p>
                  <a href={item.url} target="_blank" rel="noreferrer">{item.method}<ArrowUpRight size={13} /></a>
                </article>
              ))}
            </div>
          </Section>

          <Section id="color" locale={locale}>
            <div className={s.palette}>
              {tokens.filter((token) => token.type === 'color').map((token) => {
                const darkText = Number(contrast('#000000', token.value)) >= 4.5;
                return (
                  <article key={token.id}>
                    <div className={s.swatch} style={{ background: token.value, color: darkText ? '#000' : '#fff' }}>
                      <span>Aa</span><code>{token.value}</code>
                    </div>
                    <div><h3>{token.id.replace('color.', '')}</h3><StatusBadge status={token.status as EvidenceStatus} locale={locale} /></div>
                  </article>
                );
              })}
            </div>
            <div className={s.colorContexts}>
              <article><span>{locale === 'zh' ? '阅读画布' : 'Reading canvas'}</span><h3>{locale === 'zh' ? '判断先于速度。' : 'Judgment before speed.'}</h3><code>{contrast('#000000', '#FFFFFF')}:1</code></article>
              <article><span>{locale === 'zh' ? '深色重点' : 'Dark emphasis'}</span><h3>{locale === 'zh' ? '设计角色正在向外扩展。' : 'The designer’s role is moving outward.'}</h3><code>{contrast('#FFFFFF', '#153250')}:1</code></article>
              <article><Mosaic compact /><span>{locale === 'zh' ? '品牌拼贴局部' : 'Local brand mosaic'}</span></article>
            </div>
          </Section>

          <Section id="typography" locale={locale}>
            <div className={s.typeHero}>
              <span>Aa</span>
              <div><h3>Beausite Classic</h3><p>Regular 400 · Medium 500 · Bold 700</p><code>font-feature-settings: “cv03”, “cv04”, “cv09”, “cv11”</code></div>
              <StatusBadge status="observed" locale={locale} />
            </div>
            <div className={s.typeRows}>
              {[
                ['Hero / 150', locale === 'zh' ? '设计正在重构' : 'Design is rebuilding', 'clamp(64px, 10vw, 150px)', '500 / .90 / -0.06em', 'inferred'],
                ['Display / 50', locale === 'zh' ? '工具、技艺与团队' : 'Tools, craft, and teams', '50px', '500 / 1.20 / -0.03em', 'observed'],
                ['Title / 40', locale === 'zh' ? '无限产出时代的技艺' : 'Craft in the age of infinite output', '40px', '500 / 1.10 / -0.04em', 'observed'],
                ['Body / 16', locale === 'zh' ? '研究内容以紧凑段落、直接小标题与大尺度留白形成阅读节奏。' : 'Research content uses compact paragraphs, direct subheads, and large pauses to shape reading rhythm.', '16px', '400 / 1.40 / -0.01em', 'observed'],
                ['Label / 12', 'SOURCE · AI IN DESIGN SURVEY · Q1 2026', '12px', '400 / 1.00 / 0', 'observed'],
              ].map(([name, sample, size, recipe, status]) => (
                <article key={name}>
                  <div><strong>{name}</strong><code>{recipe}</code><StatusBadge status={status as EvidenceStatus} locale={locale} /></div>
                  <p style={{ '--sample-size': size } as CSSProperties}>{sample}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section id="layout" locale={locale}>
            <div className={s.spacingScale}>
              {[4, 8, 10, 12, 16, 24, 32, 48, 60, 96].map((value) => <div key={value}><span style={{ height: value }} /><code>{value}</code></div>)}
            </div>
            <div className={s.gridSpecimen} aria-label={locale === 'zh' ? '十二列网格' : 'Twelve-column grid'}>
              {Array.from({ length: 12 }, (_, index) => <span key={index}>{index + 1}</span>)}
            </div>
            <div className={s.rules}>
              {[
                ['1440–1919', locale === 'zh' ? '宽屏主区间：完整编辑网格与 50px 标题层级。' : 'Primary wide range with full editorial grid and 50px display type.', 'observed'],
                ['900–1439', locale === 'zh' ? '中等区间：减少并列密度，保留章节节奏。' : 'Medium range reduces parallel density while retaining chapter rhythm.', 'observed'],
                ['≤899', locale === 'zh' ? '窄屏区间：内容顺序化，导航与数据块转为纵向。' : 'Narrow range linearizes content, navigation, and data blocks.', 'observed'],
                ['16px', locale === 'zh' ? '重复出现的页面边距与组件间距，归纳为基础 gutter。' : 'Repeated page and component spacing promoted to the base gutter.', 'inferred'],
              ].map(([label, body, status]) => <article key={label}><strong>{label}</strong><p>{body}</p><StatusBadge status={status as EvidenceStatus} locale={locale} /></article>)}
            </div>
          </Section>

          <Section id="surfaces" locale={locale}>
            <div className={s.graphicsGrid}>
              <article className={s.graphicMosaic}><Mosaic /><div><h3>{locale === 'zh' ? '六格渐变拼贴' : 'Six-cell gradient mosaic'}</h3><p>{locale === 'zh' ? '封面识别元素；保留为局部品牌图形，不提升为通用背景。' : 'A cover identifier kept as a local brand graphic rather than a universal background.'}</p><StatusBadge status="inferred" locale={locale} /></div></article>
              <article className={s.graphicChart}><DataChart locale={locale} /><div><h3>{locale === 'zh' ? '直接标注图表' : 'Direct-label chart'}</h3><p>{locale === 'zh' ? '黑色粗线条与大数字承担信息层级，不依赖阴影和卡片。' : 'Heavy black marks and large numerals carry hierarchy without shadows or dashboard cards.'}</p><StatusBadge status="inferred" locale={locale} /></div></article>
            </div>
            <div className={s.surfaceRules}>
              <div><span className={s.square} /><strong>0–4px</strong><p>{locale === 'zh' ? '内容容器接近方角' : 'Content containers stay nearly square'}</p></div>
              <div><span className={s.line} /><strong>1px</strong><p>{locale === 'zh' ? '结构由发丝线分隔' : 'Hairlines divide structure'}</p></div>
              <div><span className={s.noShadow} /><strong>None</strong><p>{locale === 'zh' ? '未观察到系统性阴影层级' : 'No systematic shadow hierarchy observed'}</p></div>
            </div>
          </Section>

          <Section id="components" locale={locale}>
            <div className={s.componentBlock}>
              <header><h3>Button</h3><StatusBadge status="inferred" locale={locale} /></header>
              <div className={s.buttonStates}>
                <button type="button" className={s.primaryButton}>{locale === 'zh' ? '阅读报告' : 'Read the report'}<ArrowRight size={17} /></button>
                <button type="button" className={s.secondaryButton}>{locale === 'zh' ? '查看案例' : 'View cases'}<ArrowUpRight size={17} /></button>
                <button type="button" className={s.primaryButton} disabled>{locale === 'zh' ? '即将发布' : 'Coming soon'}</button>
                <button type="button" className={s.primaryButton} data-force-focus>{locale === 'zh' ? '聚焦样例' : 'Focus sample'}</button>
              </div>
              <p className={s.componentNote}>{locale === 'zh' ? '实测到文字链接与 CTA 家族；这里的键盘 focus、disabled 和触控尺寸是可访问性补全。' : 'Text links and CTA families were observed; keyboard focus, disabled behavior, and touch sizing are accessibility proposals.'}</p>
            </div>

            <div className={s.componentBlock}>
              <header><h3>{locale === 'zh' ? '章节菜单' : 'Chapter menu'}</h3><StatusBadge status="inferred" locale={locale} /></header>
              <div className={s.menuDemo} onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false); }}>
                <button type="button" aria-expanded={menuOpen} aria-controls="soa-chapter-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={18} />{c.labels.openMenu}</button>
                {menuOpen && <div id="soa-chapter-menu">{['01 Tools', '02 Craft', '03 Teams'].map((item) => <a key={item} href="#compositions" onClick={() => setMenuOpen(false)}>{item}<ArrowRight size={18} /></a>)}</div>}
              </div>
            </div>

            <div className={s.componentBlock}>
              <header><h3>{locale === 'zh' ? '订阅表单' : 'Subscription form'}</h3><StatusBadge status="proposed" locale={locale} /></header>
              <form className={s.form} noValidate onSubmit={submitForm}>
                <label htmlFor="soa-email">{c.labels.email}</label>
                <div><input id="soa-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); if (formState !== 'idle') setFormState('idle'); }} placeholder="name@example.com" aria-describedby="soa-form-note soa-form-message" aria-invalid={formState === 'error'} /><button type="submit">{c.labels.submit}<ArrowRight size={16} /></button></div>
                <p id="soa-form-note">{c.labels.localOnly}</p>
                <p id="soa-form-message" className={s.formMessage} role="status">{formMessage}</p>
              </form>
            </div>
          </Section>

          <Section id="compositions" locale={locale}>
            <div className={s.tabs} role="tablist" aria-label={locale === 'zh' ? '组合示例' : 'Composition examples'}>
              {c.compositionTabs.map((label, index) => <button key={label} id={`soa-tab-${index}`} role="tab" aria-selected={composition === index} aria-controls={`soa-panel-${index}`} tabIndex={composition === index ? 0 : -1} onClick={() => setComposition(index)} onKeyDown={(event) => handleTabKey(event, index)}>{String(index + 1).padStart(2, '0')} {label}</button>)}
            </div>
            <div className={s.compositionStage} role="tabpanel" id={`soa-panel-${composition}`} aria-labelledby={`soa-tab-${composition}`} tabIndex={0}>
              {composition === 0 && <div className={s.coverComposition}><Mosaic /><div><span>{locale === 'zh' ? '设计师如何用 AI 重构工具、技艺与团队' : 'How designers are evolving tools, craft, and teams with AI'}</span><h3>AI in Design<br />Report <b>2026</b></h3><footer><p>Designer Fund × Foundation Capital</p><ArrowDown size={26} /></footer></div></div>}
              {composition === 1 && <div className={s.chapterComposition}><header><span>02</span><div><p>CRAFT</p><h3>{locale === 'zh' ? '无限产出时代的技艺' : 'Craft in the age of infinite output'}</h3></div></header><div className={s.chapterBody}><blockquote>{locale === 'zh' ? '速度提升了。判断力是否也在同步增长？' : 'Output is faster. Is judgment improving at the same pace?'}</blockquote><DataChart locale={locale} /></div><footer>SOURCE · AI IN DESIGN SURVEY · Q1 2026</footer></div>}
              {composition === 2 && <div className={s.caseComposition}><header><span>{locale === 'zh' ? '视频案例' : 'Video case studies'}</span><h3>{locale === 'zh' ? '七家公司，以七种方式面对同一变化。' : 'Seven companies. Seven ways of navigating the same shift.'}</h3></header><div>{['Sierra', 'Linear', 'Shopify', 'Stripe'].map((name, index) => <article key={name}><span>{String(index + 1).padStart(2, '0')}</span><h4>{name}</h4><p>{locale === 'zh' ? ['在规模扩大时守住细节','保护优秀设计背后的判断','设计师如何成长','为实验创造条件'][index] : ['Scaling while sweating the details','Protecting the thinking behind great design','Growing as a designer','Creating conditions for experimentation'][index]}</p><ArrowUpRight size={20} /></article>)}</div></div>}
            </div>
            <p className={s.componentNote}>{locale === 'zh' ? '内容标题来自已检查的公开页面；布局由本地组件和同一套 tokens 重构。' : 'Headlines come from inspected public pages; layouts are reconstructed with local components and the shared token set.'}</p>
          </Section>

          <Section id="motion" locale={locale}>
            <div className={s.motionControls}>
              <button type="button" className={s.secondaryButton} onClick={() => setMotionKey((key) => key + 1)}><RotateCcw size={16} />{c.labels.replay}</button>
              <label className={s.toggle}><input type="checkbox" checked={reduced} onChange={(event) => setReduced(event.target.checked)} /><span />{c.labels.reduced}</label>
            </div>
            <div key={motionKey} className={s.motionStage} data-play={motionKey > 0}>
              <Mosaic />
              <div><Sparkles size={24} /><h3>{locale === 'zh' ? '拼贴逐格显现' : 'Mosaic stagger reveal'}</h3><code>420ms · stagger 70ms · ease-out</code><p>{locale === 'zh' ? '补全提案：保留封面入场层级；减少动效时直接呈现最终状态。' : 'Proposed: preserve the cover entrance hierarchy; reduced motion shows the final state immediately.'}</p><StatusBadge status="proposed" locale={locale} /></div>
            </div>
            <div className={s.motionFacts}>
              <article><strong>{locale === 'zh' ? '已观察' : 'Observed'}</strong><p>{locale === 'zh' ? '网站使用滚动叙事、菜单状态与媒体过渡。' : 'The site uses scroll-led storytelling, menu states, and media transitions.'}</p></article>
              <article><strong>{locale === 'zh' ? '仍未知' : 'Still unknown'}</strong><p>{locale === 'zh' ? '精确持续时间、easing、打断和退出行为未完成计算样式验证。' : 'Exact duration, easing, interruption, and exit behavior were not verified through computed styles.'}</p></article>
            </div>
          </Section>

          <Section id="stress" locale={locale}>
            <div className={s.stressControls}>
              <label><input type="checkbox" checked={narrow} onChange={(event) => setNarrow(event.target.checked)} />{c.labels.narrow}</label>
              <label><input type="checkbox" checked={longCopy} onChange={(event) => setLongCopy(event.target.checked)} />{c.labels.long}</label>
              <label><input type="checkbox" checked={missing} onChange={(event) => setMissing(event.target.checked)} />{c.labels.missing}</label>
              <button type="button" onClick={() => { setNarrow(false); setLongCopy(false); setMissing(false); }}>{c.labels.reset}<RotateCcw size={14} /></button>
            </div>
            <div className={s.stressStage} data-narrow={narrow}>
              <article>
                {missing ? <div className={s.missingMedia}><ImageOff size={30} /><span>{c.labels.noMedia}</span></div> : <Mosaic compact />}
                <span>03 · TEAMS</span>
                <h3>{longCopy ? (locale === 'zh' ? '在组织、职责、工具和协作方式同时变化时，设计团队要如何重新定义自己的工作边界？' : 'How should design teams redefine the boundaries of their work when organizations, roles, tools, and collaboration models are changing at the same time?') : (locale === 'zh' ? '重新设计设计组织' : 'Redesigning the design org')}</h3>
                <button type="button" className={s.secondaryButton}>{locale === 'zh' ? '阅读章节' : 'Read chapter'}<ArrowRight size={16} /></button>
              </article>
            </div>
          </Section>

          <Section id="architecture" locale={locale}>
            <div className={s.aliasChain}>
              <code>color.coral<br /><b>#FE7141</b></code><ArrowRight size={20} /><code>accent.primary<br /><b>var(--soa-coral)</b></code><ArrowRight size={20} /><code>MosaicCell<br /><b>background: accent</b></code>
            </div>
            <div className={s.architectureRules}>
              <article><span>01</span><h3>Primitive</h3><p>{locale === 'zh' ? '保留公开 CSS 中的原始值与来源。' : 'Retains raw values and provenance from public CSS.'}</p></article>
              <article><span>02</span><h3>Semantic</h3><p>{locale === 'zh' ? '颜色角色和排版用途属于推断层。' : 'Color roles and typography purposes live in the inferred layer.'}</p></article>
              <article><span>03</span><h3>Component</h3><p>{locale === 'zh' ? '按钮、章节、图表和拼贴只消费语义别名。' : 'Buttons, chapters, charts, and mosaics consume semantic aliases.'}</p></article>
            </div>
            <details className={s.tokenDetails}>
              <summary>{locale === 'zh' ? `查看 ${tokens.length} 个 tokens` : `Inspect ${tokens.length} tokens`}<ArrowDown size={16} /></summary>
              <div><table><thead><tr><th>Token</th><th>{c.labels.rawValue}</th><th>{c.labels.evidence}</th></tr></thead><tbody>{tokens.map((token) => <tr key={token.id}><td><code>{token.id}</code></td><td><code>{token.value}</code></td><td><StatusBadge status={token.status as EvidenceStatus} locale={locale} /></td></tr>)}</tbody></table></div>
            </details>
          </Section>

          <Section id="handoff" locale={locale}>
            <div className={s.handoffGrid}>
              <div className={s.downloads}>
                <a href={jsonHref} download="state-of-ai-design.tokens.json"><span>{c.labels.downloadJson}</span><Download size={18} /></a>
                <a href={cssHref} download="state-of-ai-design.tokens.css"><span>{c.labels.downloadCss}</span><Download size={18} /></a>
                <a href={sourceUrl} target="_blank" rel="noreferrer"><span>{c.source}</span><ArrowUpRight size={18} /></a>
              </div>
              <div className={s.codeBlock}>
                <div><span>CSS variables</span><button type="button" onClick={copyCss} aria-label={c.labels.copy}><Copy size={17} /></button></div>
                <pre><code>{cssExport.slice(0, 560)}{cssExport.length > 560 ? '\n…' : ''}</code></pre>
                <p role="status">{copyMessage}</p>
              </div>
            </div>
            <div className={s.coverageTable}>
              {coverage.map(([path, family, scope]) => <div key={path}><code>{path}</code><strong>{family}</strong><p>{scope}</p></div>)}
            </div>
            <ul className={s.limitations}>{c.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul>
            <footer className={s.footer}><span>Captured {new Date('2026-10-06T00:00:00+08:00').toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en', { year: 'numeric', month: 'long', day: 'numeric' })}</span><span>Representative study · Proposal until adopted</span></footer>
          </Section>
        </main>
      </div>
    </div>
  );
}
