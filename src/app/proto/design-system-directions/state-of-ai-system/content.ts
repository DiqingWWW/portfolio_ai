export type Locale = 'zh' | 'en';
export type EvidenceStatus = 'observed' | 'inferred' | 'proposed' | 'unknown';

export type Localized = { zh: string; en: string };

export const sourceUrl = 'https://stateofaidesign.com/';
export const capturedAt = '2026-10-06';

export const evidence = [
  {
    id: 'e-home-source',
    url: sourceUrl,
    family: { zh: '首页', en: 'Homepage' },
    method: 'public HTML + embedded Framer CSS',
    scope: {
      zh: '颜色变量、字体文件、字号、间距、页面结构与响应式区间',
      en: 'Color variables, font files, type sizes, spacing, page structure, and responsive ranges',
    },
    status: 'observed' as const,
  },
  {
    id: 'e-home-visual',
    url: 'https://framerusercontent.com/assets/A09Xgh73SLRYZSBFXJ9fBxyvHlY.png',
    family: { zh: '首页视觉', en: 'Homepage visual' },
    method: 'published Open Graph image',
    scope: {
      zh: '白色画布、超大黑色标题、抽象渐变拼贴与极简导航',
      en: 'White canvas, oversized black title, abstract gradient mosaic, and minimal navigation',
    },
    status: 'observed' as const,
  },
  {
    id: 'e-about',
    url: 'https://stateofaidesign.com/about',
    family: { zh: 'About', en: 'About' },
    method: 'rendered document + public HTML',
    scope: {
      zh: '长篇研究说明、合作伙伴列表、方法论与数据摘要',
      en: 'Long-form research framing, partner directory, methodology, and data summaries',
    },
    status: 'observed' as const,
  },
  {
    id: 'e-chapters',
    url: 'https://stateofaidesign.com/chapters/tools',
    family: { zh: '报告章节', en: 'Report chapters' },
    method: 'three public chapter documents',
    scope: {
      zh: 'Tools、Craft、Teams 三个章节的编辑布局、图表与章节导航',
      en: 'Editorial layouts, charts, and chapter navigation across Tools, Craft, and Teams',
    },
    status: 'observed' as const,
  },
  {
    id: 'e-cases',
    url: 'https://stateofaidesign.com/cases/sierra',
    family: { zh: '案例页面', en: 'Case studies' },
    method: 'four public case-study documents',
    scope: {
      zh: 'Sierra、Linear、Shopify 与 Stripe 案例的媒体、引述与章节结构',
      en: 'Media, quotations, and section structures in the Sierra, Linear, Shopify, and Stripe cases',
    },
    status: 'observed' as const,
  },
  {
    id: 'e-interaction-gap',
    url: sourceUrl,
    family: { zh: '交互状态', en: 'Interaction states' },
    method: 'browser inspection attempt',
    scope: {
      zh: '页面可加载，但重页面导致自动化检查超时；精确 hover、focus 与动画参数未验证',
      en: 'The page loaded, but heavy-page automation timed out; exact hover, focus, and motion parameters remain unverified',
    },
    status: 'unknown' as const,
  },
] as const;

export const tokens = [
  { id: 'color.ink', css: '--soa-ink', value: '#000000', type: 'color', status: 'observed', evidence: ['e-home-source'] },
  { id: 'color.paper', css: '--soa-paper', value: '#FFFFFF', type: 'color', status: 'observed', evidence: ['e-home-source'] },
  { id: 'color.coral', css: '--soa-coral', value: '#FE7141', type: 'color', status: 'observed', evidence: ['e-home-source'] },
  { id: 'color.lavender', css: '--soa-lavender', value: '#CDABFE', type: 'color', status: 'observed', evidence: ['e-home-source'] },
  { id: 'color.slate', css: '--soa-slate', value: '#597E87', type: 'color', status: 'observed', evidence: ['e-home-source'] },
  { id: 'color.mist', css: '--soa-mist', value: '#D1DDD3', type: 'color', status: 'observed', evidence: ['e-home-source'] },
  { id: 'color.ice', css: '--soa-ice', value: '#F5F9FC', type: 'color', status: 'observed', evidence: ['e-home-source'] },
  { id: 'color.navy', css: '--soa-navy', value: '#153250', type: 'color', status: 'observed', evidence: ['e-home-source'] },
  { id: 'font.display', css: '--soa-font-display', value: '"Beausite Classic Medium", Arial, sans-serif', type: 'fontFamily', status: 'observed', evidence: ['e-home-source'] },
  { id: 'font.body', css: '--soa-font-body', value: '"Beausite Classic Regular", Arial, sans-serif', type: 'fontFamily', status: 'observed', evidence: ['e-home-source'] },
  { id: 'font.mono', css: '--soa-font-mono', value: '"Geist Mono", monospace', type: 'fontFamily', status: 'observed', evidence: ['e-home-source'] },
  { id: 'type.hero', css: '--soa-type-hero', value: 'clamp(4rem, 10vw, 9.375rem)', type: 'dimension', status: 'inferred', evidence: ['e-home-source', 'e-home-visual'] },
  { id: 'type.display', css: '--soa-type-display', value: '3.125rem', type: 'dimension', status: 'observed', evidence: ['e-home-source'] },
  { id: 'type.title', css: '--soa-type-title', value: '2.5rem', type: 'dimension', status: 'observed', evidence: ['e-home-source'] },
  { id: 'type.body', css: '--soa-type-body', value: '1rem', type: 'dimension', status: 'observed', evidence: ['e-home-source'] },
  { id: 'space.gutter', css: '--soa-gutter', value: '1rem', type: 'dimension', status: 'inferred', evidence: ['e-home-source'] },
  { id: 'space.section', css: '--soa-section', value: '6rem', type: 'dimension', status: 'inferred', evidence: ['e-home-source'] },
  { id: 'border.hairline', css: '--soa-hairline', value: '1px solid #000000', type: 'string', status: 'inferred', evidence: ['e-home-visual'] },
  { id: 'motion.demo', css: '--soa-motion-demo', value: '420ms cubic-bezier(.22,1,.36,1)', type: 'string', status: 'proposed', evidence: [] },
] as const;

export const copy = {
  zh: {
    locale: '中文', localeOther: 'EN', skip: '跳到内容', source: '查看源网站', version: '研究版 0.1',
    title: 'State of AI Design', subtitle: '设计系统研究',
    intro: '从研究报告网站中提取出的编辑型视觉系统：超大标题、严格网格、黑白结构与高饱和渐变拼贴共同组织长篇内容、数据图表和案例。',
    description: '本页面基于 9 个公开页面（覆盖 4 类页面族）与首页公开 CSS 构建。无法验证的交互参数保持为“未知”，为演示补齐的行为标为“补全提案”。',
    nav: [['overview','概览'],['evidence','证据'],['color','颜色'],['typography','字体'],['layout','布局'],['surfaces','图形'],['components','组件'],['compositions','组合'],['motion','动效'],['stress','压力测试'],['architecture','架构'],['handoff','交付']] as const,
    statuses: { observed: '实测', inferred: '推断', proposed: '补全提案', unknown: '未知' },
    principles: [
      ['编辑优先', '让标题、章节编号和引述建立叙事节奏，界面装饰保持克制。'],
      ['对比承载结构', '黑白负责阅读秩序，品牌色主要出现在封面拼贴、图表和重点区块。'],
      ['数据也要有姿态', '图表使用粗线条、直接标注和大数字，避免默认仪表盘语言。'],
      ['模块化长文', '报告章节、方法论和案例复用同一网格，但允许各自拥有不同媒体节奏。'],
    ],
    section: {
      overview: ['概览', '视觉语言、范围与证据状态'], evidence: ['证据与覆盖', '哪些页面被检查，以及结论来自哪里'],
      color: ['颜色', '黑白骨架与受控的品牌色'], typography: ['字体', 'Beausite Classic 的紧凑编辑层级'],
      layout: ['间距与布局', '16px 基础节奏、分栏与超大留白'], surfaces: ['图形与表面', '渐变拼贴、粗线图表和近乎无圆角的容器'],
      components: ['组件', '导航、章节标签、按钮、数据卡与订阅表单'], compositions: ['组合示例', '由同一组 tokens 与组件构建的三种页面模式'],
      motion: ['动效', '可重放的提案与明确的未知项'], stress: ['压力测试', '中英文、长文本、窄屏与媒体缺失'],
      architecture: ['架构', '原始值、语义别名与组件使用方式'], handoff: ['Handoff', '可导出的 tokens、代码片段、覆盖与限制'],
    },
    labels: {
      inspected: '已检查', representativePages: '代表性页面', pageFamilies: '页面族', sourceCss: '公开 CSS', interactionGap: '交互缺口',
      rawValue: '原始值', role: '用途', evidence: '证据', specimen: '示例', rules: '规则',
      replay: '重放动效', reduced: '减少动效', narrow: '320px 容器', long: '长文本', missing: '媒体缺失', reset: '重置',
      copy: '复制 CSS', copied: '已复制', copyFailed: '复制失败，请手动选择', downloadJson: '下载 tokens.json', downloadCss: '下载 tokens.css',
      localOnly: '本地演示，不会提交数据。', email: '邮箱', submit: '获取报告', required: '请输入有效邮箱。', success: '已完成本地演示。',
      chooseChapter: '选择章节', close: '关闭', openMenu: '打开章节菜单', noMedia: '媒体不可用',
    },
    compositionTabs: ['报告封面', '章节与数据', '案例目录'],
    coverageNote: '代表性检查覆盖了当前公开页面族，不等于穷举隐藏路由、CMS 状态或未来发布内容。',
    limits: [
      'Beausite Classic 字体文件可从公开 CSS 识别；中文由系统无衬线字体回退，不声称原站有中文设计。',
      '原站精确 hover、focus、滚动触发时机与 easing 因浏览器自动化超时而未验证。',
      '动效重放、语言切换、表单验证与压力测试控件是本设计系统网站的补全提案。',
      '渐变拼贴为 CSS 重构示例，不复制原站图像资产，也不代表可复用的品牌素材授权。',
      '导出格式是本地 JSON/CSS 交付，不是 Figma 或 Tokens Studio 的直接导入格式。',
    ],
  },
  en: {
    locale: 'EN', localeOther: '中文', skip: 'Skip to content', source: 'View source site', version: 'Study 0.1',
    title: 'State of AI Design', subtitle: 'Design system study',
    intro: 'An editorial visual system extracted from a research-report website: oversized type, a strict grid, black-and-white structure, and saturated gradient mosaics organize long-form stories, data, and case studies.',
    description: 'This reference is based on nine public pages across four page families and the homepage’s published CSS. Unverified interaction parameters remain Unknown; behavior added for the demo is labeled Proposed.',
    nav: [['overview','Overview'],['evidence','Evidence'],['color','Color'],['typography','Typography'],['layout','Layout'],['surfaces','Graphics'],['components','Components'],['compositions','Compositions'],['motion','Motion'],['stress','Stress'],['architecture','Architecture'],['handoff','Handoff']] as const,
    statuses: { observed: 'Observed', inferred: 'Inferred', proposed: 'Proposed', unknown: 'Unknown' },
    principles: [
      ['Editorial first', 'Headlines, chapter numbers, and quotations establish rhythm while interface decoration stays restrained.'],
      ['Contrast carries structure', 'Black and white organize reading; brand colors concentrate in mosaics, charts, and emphasis blocks.'],
      ['Data has a point of view', 'Charts use heavy rules, direct labels, and large numerals instead of default dashboard styling.'],
      ['Modular long-form', 'Report chapters, methodology, and cases share a grid while keeping distinct media rhythms.'],
    ],
    section: {
      overview: ['Overview', 'Visual language, scope, and evidence states'], evidence: ['Evidence & coverage', 'What was inspected and how each conclusion was reached'],
      color: ['Color', 'A black-and-white frame with controlled brand accents'], typography: ['Typography', 'A compact editorial hierarchy built around Beausite Classic'],
      layout: ['Spacing & layout', 'A 16px base rhythm, editorial columns, and large pauses'], surfaces: ['Graphics & surfaces', 'Gradient mosaics, heavy chart marks, and nearly square containers'],
      components: ['Components', 'Navigation, chapter labels, buttons, data cards, and subscription form'], compositions: ['Composition examples', 'Three page patterns built from the same tokens and components'],
      motion: ['Motion', 'Replayable proposals alongside explicit unknowns'], stress: ['Stress testing', 'Bilingual copy, long content, narrow widths, and missing media'],
      architecture: ['Architecture', 'Raw values, semantic aliases, and component usage'], handoff: ['Handoff', 'Exportable tokens, snippets, coverage, and limitations'],
    },
    labels: {
      inspected: 'Inspected', representativePages: 'representative pages', pageFamilies: 'page families', sourceCss: 'public CSS', interactionGap: 'interaction gap',
      rawValue: 'Raw value', role: 'Role', evidence: 'Evidence', specimen: 'Specimen', rules: 'Rules',
      replay: 'Replay motion', reduced: 'Reduce motion', narrow: '320px container', long: 'Long copy', missing: 'Missing media', reset: 'Reset',
      copy: 'Copy CSS', copied: 'Copied', copyFailed: 'Copy failed; select manually', downloadJson: 'Download tokens.json', downloadCss: 'Download tokens.css',
      localOnly: 'Local demo. No data is submitted.', email: 'Email', submit: 'Get the report', required: 'Enter a valid email address.', success: 'Local demo completed.',
      chooseChapter: 'Choose chapter', close: 'Close', openMenu: 'Open chapter menu', noMedia: 'Media unavailable',
    },
    compositionTabs: ['Report cover', 'Chapter & data', 'Case directory'],
    coverageNote: 'Representative inspection covers the current public page families. It does not enumerate hidden routes, CMS states, or future releases.',
    limits: [
      'Beausite Classic files were identifiable in public CSS. Chinese falls back to the system sans; this does not claim the source has a Chinese design.',
      'Exact source hover, focus, scroll triggers, and easing were not verified because browser automation timed out on the heavy page.',
      'Motion replay, language switching, form validation, and stress controls are Proposed behavior for this reference site.',
      'The gradient mosaic is a CSS reconstruction. It does not copy source imagery or imply permission to reuse brand assets.',
      'Exports are local JSON and CSS handoff files, not direct Figma or Tokens Studio imports.',
    ],
  },
} as const;

export const coverage = [
  ['/', 'Homepage', 'structure, tokens, hero, chapter and case index'],
  ['/about', 'About', 'research framing, partners, methodology, credits'],
  ['/chapters/tools', 'Chapter', 'editorial story, charts, chapter navigation'],
  ['/chapters/craft', 'Chapter', 'editorial story and quote/data patterns'],
  ['/chapters/teams', 'Chapter', 'editorial story and organizational data'],
  ['/cases/sierra', 'Case study', 'video-led case page and interview structure'],
  ['/cases/linear', 'Case study', 'case page and editorial modules'],
  ['/cases/shopify', 'Case study', 'case page and editorial modules'],
  ['/cases/stripe', 'Case study', 'case page and editorial modules'],
] as const;

export const tokenExport = {
  name: 'State of AI Design — extracted study',
  version: '0.1.0',
  source: sourceUrl,
  capturedAt,
  evidence,
  tokens,
};

export const cssExport = `[data-state-of-ai-system] {\n${tokens
  .map((token) => `  ${token.css}: ${token.value};`)
  .join('\n')}\n}`;
