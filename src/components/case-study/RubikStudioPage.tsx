import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { rubikStudioCaseStudy as project } from "@content/projects/rubik-studio/case-study.zh";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";
import { getDictionary, type Locale } from "@/i18n/dictionary";

const assetRoot = "/assets/images/rubik-studio";
const red = "#f04b35";
type Media = { sourceIds: readonly string[]; src: string; alt: string; caption: string; truthStatus: string; width: number; height: number };

function Figure({ media, priority = false, className = "", showCaption = true, showTruthStatus = true }: { media: Media; priority?: boolean; className?: string; showCaption?: boolean; showTruthStatus?: boolean }) {
  return <figure data-source-ids={media.sourceIds.join(" ")} className={className}>
    <div className="overflow-hidden bg-white shadow-[0_24px_70px_-48px_rgba(0,0,0,0.42)]"><ResponsiveProjectImage src={`${assetRoot}/${media.src}`} alt={media.alt} width={media.width} height={media.height} priority={priority} className="h-auto w-full" /></div>
    {showCaption ? <figcaption className="mt-3 max-w-[76ch] text-xs leading-5 text-neutral-500">{media.caption}{showTruthStatus ? <> <span className="font-medium text-neutral-700">{media.truthStatus}</span></> : null}</figcaption> : null}
  </figure>;
}

function GeniusCanvasCarousel() {
  const media = project.geniusCanvas.media[1];
  return <figure data-source-ids={media.sourceIds.join(" ")} className="mt-12">
    <div className="overflow-x-auto overscroll-x-contain pb-4" aria-label="GeniusCanvas 界面方向，可横向滚动">
      <div className="flex w-max gap-4 pr-5">
        {project.geniusCanvas.directions.map((title, index) => <article key={title} className="w-[calc((100vw-3.5rem)/2.5)] min-w-[240px] max-w-[480px] shrink-0 snap-start">
          <h3 className="mb-1 text-sm font-bold text-neutral-900">{title}</h3>
          <div className="relative mx-2 aspect-[1.1/1] overflow-hidden bg-transparent">
            <ResponsiveProjectImage src={`${assetRoot}/${media.src}`} alt={`${title}界面`} width={media.width} height={media.height} className="absolute top-1/2 w-[500%] max-w-none -translate-y-1/2 mix-blend-multiply" style={{ left: `-${index * 100}%` }} />
          </div>
        </article>)}
      </div>
    </div>
    <figcaption className="mt-2 text-xs leading-5 text-neutral-500">根据实际软件脱敏生成</figcaption>
  </figure>;
}

function HighlightedText({ text, highlights }: { text: string; highlights: readonly string[] }) {
  const pattern = new RegExp(`(${highlights.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return <>{text.split(pattern).map((part, index) => highlights.includes(part) ? <span key={`${part}-${index}`} className="font-semibold" style={{ color: red }}>{part}</span> : part)}</>;
}

function Chapter({ number, title, description }: { number: string; title: string; description?: string }) {
  return <div className="max-w-4xl"><p className="font-mono text-xs font-bold tracking-[0.12em]" style={{ color: red }}>{number}</p><h2 className="case-study-section-title mt-3 text-neutral-950">{title}</h2>{description ? <p className="mt-5 max-w-[68ch] text-base leading-8 text-neutral-600 sm:text-lg">{description}</p> : null}</div>;
}

function Controls({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  return <div className="fixed left-4 right-4 top-4 z-50 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
    <Link href={locale === "zh" ? "/zh" : "/"} aria-label={dictionary.shared.workspace} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent"><ArrowLeft className="h-5 w-5" aria-hidden="true" /></Link>
    <div className="rounded-xl bg-white/95 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.35)]"><LanguageSwitcher locale={locale} label={dictionary.shared.languageName} /></div>
  </div>;
}

export default function RubikStudioPage({ locale }: { locale: Locale }) {
  if (locale !== "zh") return <main className="relative min-h-screen bg-white"><Controls locale={locale} /><ResponsiveProjectImage src={`${assetRoot}/rubikstudio_EN-display.webp`} mobileSrc={`${assetRoot}/rubikstudio_EN-mobile.webp`} alt="Rubik Studio project overview" width={736} height={2138} priority className="h-auto w-full" /></main>;

  return <main className="case-study-page min-h-screen bg-[#fbfaf8] text-neutral-950"><Controls locale={locale} /><article>
    <section data-source-ids={project.hero.sourceIds.join(" ")} className="relative overflow-hidden border-b border-black/5 bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-28 sm:hidden">
        <header className="min-w-0"><p className="font-mono text-xs font-bold tracking-[0.16em] text-neutral-500">RUBIK STUDIO</p><h1 className="mt-5 max-w-full break-all text-[clamp(2.75rem,12vw,4rem)] font-bold leading-[0.96] tracking-[-0.045em] text-neutral-950">{project.title}</h1></header>
        <div className="relative mt-10 aspect-[1.9/1]">
          <ResponsiveProjectImage src={`${assetRoot}/${project.hero.media[0].src}`} alt={project.hero.media[0].alt} width={project.hero.media[0].width} height={project.hero.media[0].height} priority className="absolute inset-y-0 right-0 h-full w-[130%] max-w-none object-contain object-right" />
        </div>
        <div className="mt-10"><p className="text-base leading-8 text-neutral-600">{project.hero.summary}</p><blockquote className="mt-8 text-xl font-semibold leading-8 text-neutral-900">{project.hero.proposition}</blockquote>
          <div data-source-ids={project.hero.historicalSignals.sourceIds.join(" ")} className="mt-10 border-y border-black/10 py-6">
            <dl className="grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4">
              {project.hero.historicalSignals.items.map((item) => <div key={item.label}><dt className="whitespace-nowrap text-[1.65rem] font-bold leading-none tracking-[-0.025em] sm:text-[1.75rem]" style={{ color: red }}>{item.value}</dt><dd className="mt-1 text-xs font-medium leading-5 text-neutral-700">{item.label}</dd></div>)}
            </dl>
          </div>
          <dl className="mt-12 grid gap-6 border-t border-black/10 pt-7">{project.hero.meta.map((item) => <div key={item.label}><dt className="text-xs text-neutral-500">{item.label}</dt><dd className="mt-2 text-sm font-bold leading-6 text-neutral-900">{item.value}</dd></div>)}</dl>
        </div>
      </div>
      <div className="relative mx-auto hidden min-h-[clamp(720px,62vw,900px)] max-w-[1440px] overflow-hidden px-[clamp(2rem,3.35vw,3rem)] py-[clamp(7rem,8.4vw,7.5rem)] sm:block">
        <ResponsiveProjectImage src={`${assetRoot}/${project.hero.media[0].src}`} alt={project.hero.media[0].alt} width={project.hero.media[0].width} height={project.hero.media[0].height} priority className="pointer-events-none absolute inset-0 h-full w-full translate-x-[14%] object-contain object-center" />
        <div className="relative z-10 w-[48%] min-w-0">
          <header><p className="font-mono text-[clamp(0.6rem,0.84vw,0.75rem)] font-bold tracking-[0.16em] text-neutral-500">RUBIK STUDIO</p><h1 className="mt-[clamp(1rem,1.4vw,1.25rem)] w-[170%] text-wrap-balance text-[clamp(3.25rem,6.2vw,5.75rem)] font-bold leading-[0.96] tracking-[-0.045em] text-neutral-950">{project.title}</h1></header>
          <div className="mt-[clamp(2.5rem,4vw,4rem)]"><p className="max-w-[52ch] text-[clamp(0.88rem,1.25vw,1.125rem)] leading-[1.75] text-neutral-600">{project.hero.summary}</p><blockquote className="mt-[clamp(1.5rem,2.25vw,2rem)] max-w-[42ch] text-[clamp(1rem,1.4vw,1.25rem)] font-semibold leading-[1.6] text-neutral-900">{project.hero.proposition}</blockquote>
            <div data-source-ids={project.hero.historicalSignals.sourceIds.join(" ")} className="mt-[clamp(1.75rem,2.8vw,2.5rem)] border-y border-black/10 py-[clamp(1.25rem,1.7vw,1.5rem)]">
              <dl className="grid grid-cols-4 gap-[clamp(0.5rem,1.4vw,1.25rem)]">{project.hero.historicalSignals.items.map((item) => <div key={item.label}><dt className="whitespace-nowrap text-[clamp(1.2rem,2.1vw,1.75rem)] font-bold leading-none tracking-[-0.025em]" style={{ color: red }}>{item.value}</dt><dd className="mt-1 text-[clamp(0.58rem,0.82vw,0.75rem)] font-medium leading-5 text-neutral-700">{item.label}</dd></div>)}</dl>
            </div>
            <dl className="mt-[clamp(1.75rem,2.8vw,2.5rem)] grid grid-cols-3 gap-[clamp(0.75rem,1.7vw,1.5rem)] border-t border-black/10 pt-[clamp(1.25rem,1.9vw,1.75rem)]">{project.hero.meta.map((item) => <div key={item.label}><dt className="text-[clamp(0.6rem,0.8vw,0.75rem)] text-neutral-500">{item.label}</dt><dd className="mt-2 text-[clamp(0.72rem,0.98vw,0.875rem)] font-bold leading-6 text-neutral-900">{item.value}</dd></div>)}</dl>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-20 sm:py-32" data-source-ids={project.result.sourceIds.join(" ")}><div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start"><div className="lg:sticky lg:top-24"><Chapter number="02 / 核心界面" title={project.result.title} description={project.result.summary} /></div><Figure media={project.result.media} showCaption={false} /></div></section>

    <section className="bg-[#f7f6f3] py-20 sm:py-28" data-source-ids={project.role.sourceIds.join(" ")}><div className="mx-auto max-w-[1320px] px-5 sm:px-8"><Chapter number="02.1 / 项目范围" title={project.role.title} /><dl className="mt-10 grid gap-px overflow-hidden border border-black/5 bg-black/5 md:grid-cols-5">{project.role.rows.map((row) => <div key={row.label} className="bg-white p-6"><dt className="text-xs font-medium text-neutral-500">{row.label}</dt><dd className="mt-3 text-sm font-bold leading-6 text-neutral-900">{row.value}</dd></div>)}</dl></div></section>

    <section className="bg-white py-20 text-neutral-950 sm:py-32" data-source-ids={project.workspace.sourceIds.join(" ")}><div className="mx-auto max-w-[1320px] px-5 sm:px-8"><div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end"><div><p className="font-mono text-xs font-bold tracking-[0.12em]" style={{ color: red }}>02.1 / 信息架构</p><h2 className="case-study-section-title mt-3 text-neutral-950">{project.workspace.title}</h2><p className="mt-5 max-w-[60ch] text-base leading-8 text-neutral-600 sm:text-lg">{project.workspace.summary}</p></div><Figure media={project.workspace.media} showCaption={false} /></div><div className="mt-14 grid gap-px bg-black/5 md:grid-cols-4">{project.workspace.layers.map((layer, index) => <article key={layer.id} className="bg-[#f7f6f3] p-6"><span className="font-mono text-xs font-bold" style={{ color: red }}>0{index + 1}</span><h3 className="mt-4 text-lg font-bold text-neutral-950">{layer.label}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{layer.purpose}</p><p className="mt-5 text-xs font-medium text-neutral-500">{layer.placement}</p></article>)}</div></div></section>

    <section className="bg-white py-20 sm:py-32" data-source-ids={project.taskEntry.sourceIds.join(" ")}><div className="mx-auto max-w-[1320px] px-5 sm:px-8"><Chapter number="02.2 / AI 工作流" title={project.taskEntry.title} description={project.taskEntry.summary} /><p className="mt-6 max-w-[68ch] text-sm leading-7 text-neutral-500">{project.taskEntry.tradeoff}</p><div className="mt-12 space-y-14"><Figure media={project.taskEntry.media[0]} showCaption={false} /><div><h3 className="case-study-subsection-title text-neutral-900">从选中代码到形成可继续使用的解释</h3><p className="mt-4 max-w-[68ch] text-base leading-8 text-neutral-600"><HighlightedText text={project.taskEntry.codeExplanation} highlights={project.taskEntry.codeExplanationHighlights} /></p></div><Figure media={project.taskEntry.media[1]} showTruthStatus={false} /><Figure media={project.taskEntry.media[2]} showTruthStatus={false} /></div></div></section>

    <section className="bg-white py-20 sm:py-28" data-source-ids={project.capabilityPath.sourceIds.join(" ")}><div className="mx-auto max-w-[1320px] px-5 sm:px-8"><Chapter number="02.3 / 产品能力" title={project.capabilityPath.title} description={project.capabilityPath.summary} /><ol className="mt-12 grid gap-px overflow-hidden border border-black/5 bg-black/5 md:grid-cols-5">{project.capabilityPath.steps.map((step, index) => <li key={step.id} className="relative bg-[#f7f6f3] p-6 sm:p-7"><span className="font-mono text-xs font-bold" style={{ color: red }}>{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-lg font-bold text-neutral-900">{step.label}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{step.description}</p>{index < 4 ? <ArrowRight className="absolute -right-3 top-8 z-10 hidden h-6 w-6 rounded-full bg-white p-1 text-neutral-500 shadow-sm md:block" aria-hidden="true" /> : null}</li>)}</ol></div></section>

    <section className="bg-[#f3f1ed] py-20 sm:py-32" data-source-ids={project.adoption.sourceIds.join(" ")}><div className="mx-auto max-w-[1320px] px-5 sm:px-8"><Chapter number="02.4 / 结果采用" title={project.adoption.title} description={project.adoption.summary} /><p className="mt-6 max-w-[68ch] text-base leading-8 text-neutral-600">{project.adoption.analysis}</p><h3 className="case-study-subsection-title mt-12 text-neutral-900">{project.adoption.flowTitle}</h3><div className="mt-7 overflow-x-auto pb-3"><div className="grid min-w-[720px] grid-cols-4 gap-px bg-black/5">{project.adoption.flow.map((item, index) => <article key={`${item.from}-${item.to}`} className="relative bg-white p-5"><span className="font-mono text-xs font-bold" style={{ color: red }}>0{index + 1}</span><div className="mt-4 flex items-center gap-2 text-sm font-bold text-neutral-900"><span>{item.from}</span><ArrowRight className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" /><span>{item.to}</span></div></article>)}</div></div></div></section>

    <section className="bg-white py-20 sm:py-32"><div className="mx-auto max-w-[1320px] px-5 sm:px-8"><Chapter number="03 / 系统连续性" title="会话、状态与反馈" description="AI 助手进入长期专业工作后，界面还要处理任务连续性、不同范围的风险，以及每条结果如何被评价。" /><div className="mt-14 space-y-5"><Disclosure title={project.sessions.title} sourceIds={project.sessions.sourceIds} summary={project.sessions.summary} open><p className="mt-4 max-w-[68ch] text-sm leading-7 text-neutral-500">{project.sessions.tradeoff}</p><Figure media={project.sessions.media[0]} className="mt-9" /><div className="mt-8 grid gap-6 md:grid-cols-3">{project.sessions.media.slice(1).map((media) => <Figure key={media.src} media={media} showTruthStatus={false} />)}</div></Disclosure><Disclosure title={project.states.title} sourceIds={project.states.sourceIds} summary={project.states.summary}><div className="mt-8 grid gap-px overflow-hidden bg-black/5 md:grid-cols-2">{project.states.rows.map((row) => <article key={row.state} className="bg-[#f7f6f3] p-6"><h3 className="font-bold text-neutral-900">{row.state}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{row.placement} · {row.question}</p></article>)}</div><div className="mt-8 grid gap-6 md:grid-cols-3">{project.states.evidence.map((media) => <Figure key={media.src} media={media} />)}</div></Disclosure><Disclosure title={project.feedback.title} sourceIds={project.feedback.sourceIds} summary={project.feedback.summary}><p className="mt-4 max-w-[68ch] text-sm leading-7 text-neutral-500">{project.feedback.enterpriseValue}</p><p className="mt-4 max-w-[68ch] text-sm leading-7 text-neutral-500">{project.feedback.iteration}</p><Figure media={project.feedback.media} className="mt-9" /></Disclosure></div></div></section>

    <section className="bg-[#f0efeb] py-20 sm:py-32" data-source-ids={project.geniusCanvas.sourceIds.join(" ")}><div className="mx-auto max-w-[1320px] px-5 sm:px-8"><Chapter number="04 / 设计探索" title={project.geniusCanvas.title} description={project.geniusCanvas.summary} /><p className="mt-6 max-w-[68ch] text-sm leading-7 text-neutral-500">{project.geniusCanvas.boundary}</p><div className="mt-12"><Figure media={project.geniusCanvas.media[0]} showCaption={false} /></div><div className="mt-12 grid gap-px overflow-hidden bg-black/5 md:grid-cols-3">{project.geniusCanvas.relationship.map((item) => <div key={`${item.from}-${item.to}`} className="bg-white p-6"><p className="text-sm font-bold text-neutral-900">{item.from}</p><ArrowRight className="my-4 h-4 w-4" style={{ color: red }} aria-hidden="true" /><p className="text-sm leading-6 text-neutral-600">{item.to}</p></div>)}</div><GeniusCanvasCarousel /><div className="mt-16"><h3 className="case-study-subsection-title text-neutral-900">当生成对象发生变化，哪些设计问题仍然成立？</h3><p className="mt-5 max-w-[68ch] text-base leading-8 text-neutral-600">{project.geniusCanvas.transferQuestion}</p><div className="mt-8 overflow-hidden border border-black/5 bg-white"><div className="hidden grid-cols-[0.24fr_0.38fr_0.38fr] bg-[#ebe9e4] px-6 py-4 text-xs font-bold text-neutral-600 md:grid"><span>设计问题</span><span>Rubik Studio 的材料依据</span><span>HMI / 3D 工具中值得研究的问题</span></div>{project.geniusCanvas.transferRows.map((row) => <div key={row.question} className="grid gap-3 border-t border-black/5 p-6 first:border-t-0 md:grid-cols-[0.24fr_0.38fr_0.38fr]"><strong className="text-sm text-neutral-900">{row.question}</strong><span className="text-sm leading-6 text-neutral-600">{row.studio}</span><span className="text-sm leading-6 text-neutral-600">{row.hmi}</span></div>)}</div></div></div></section>

    <section className="bg-white py-24 sm:py-36" data-source-ids={project.reflection.sourceIds.join(" ")}><div className="mx-auto max-w-[1320px] px-5 sm:px-8"><Chapter number="05 / 回顾" title={project.reflection.title} /><blockquote className="mt-10 max-w-[48ch] text-2xl font-semibold leading-9 text-neutral-900">{project.reflection.statement}</blockquote></div></section>
  </article></main>;
}

function Disclosure({ title, sourceIds, summary, open = false, children }: { title: string; sourceIds: readonly string[]; summary: string; open?: boolean; children: React.ReactNode }) {
  return <details data-source-ids={sourceIds.join(" ")} open={open} className="group border-t border-black/10 py-7 last:border-b"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-xl font-bold text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-workspace-accent">{title}<ChevronDown className="h-5 w-5 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary><p className="mt-5 max-w-[68ch] text-base leading-8 text-neutral-600">{summary}</p>{children}</details>;
}
