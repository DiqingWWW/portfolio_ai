import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary, type Locale } from "@/i18n/dictionary";
import type { LincolnDerivation, LincolnMedia } from "@content/projects/lincoln-text-expression/case-study.en";
import OverviewTable from "@/components/case-study/OverviewTable";

type WidenContent<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly WidenContent<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: WidenContent<T[Key]> }
      : T;

type LincolnProject = WidenContent<typeof import("@content/projects/lincoln-text-expression/case-study.en").lincolnCaseStudy>;

const labels = {
  en: {
    tradeoff: "Trade-off",
    decision: "Decision",
    presentation: "What the rule decides",
    profileStates: "Three current profile states",
    chain: "Text counting and validation chain",
    chainColumns: ["Input", "Visible count increase", "Evidence status"],
    feedbackStates: "Long-text feedback and recovery states",
    archetypeTable: "Three text archetypes and their design questions",
    archetypeColumns: ["Text archetype", "Current case", "Core property", "Priority design question"],
    dimensions: "Six cross-context dimensions",
    frameworkTable: "Text-rule decision framework",
    validationTable: "Measurement plan by text archetype",
    validationColumns: ["Text type / scenario", "Priority measures", "Validation question"],
  },
  zh: {
    tradeoff: "权衡",
    decision: "判断",
    presentation: "决定的信息呈现",
    profileStates: "三个当前个人资料状态",
    chain: "文本计数与校验链路",
    chainColumns: ["输入", "界面计数变化", "证据状态"],
    feedbackStates: "长文本反馈与恢复状态",
    archetypeTable: "三类文本原型及其设计问题",
    archetypeColumns: ["文本原型", "当前案例", "核心属性", "优先设计问题"],
    dimensions: "六个跨场景判断维度",
    frameworkTable: "文本规则决策框架",
    validationTable: "按文本原型划分的测量计划",
    validationColumns: ["文本类型 / 场景", "优先测量项", "验证问题"],
  },
} as const;

function SourceSection({
  sourceIds,
  children,
  className = "",
}: {
  sourceIds: readonly string[];
  children: React.ReactNode;
  className?: string;
}) {
  return <section data-source-ids={sourceIds.join(" ")} className={className}>{children}</section>;
}

function SectionHeading({ title, summary, inverse = false }: { title: string; summary: string; inverse?: boolean }) {
  return (
    <div className="w-full">
      <h3 className={`case-study-section-title text-balance ${inverse ? "!text-white" : "text-[#26211d]"}`}>{title}</h3>
      <p className={`mt-5 text-base leading-8 sm:text-lg ${inverse ? "text-[#d7cec4]" : "text-[#655f59]"}`}>{summary}</p>
    </div>
  );
}

function PhoneFigure({
  media,
  assetRoot,
  priority = false,
  inverse = false,
}: {
  media: LincolnMedia;
  assetRoot: string;
  priority?: boolean;
  inverse?: boolean;
}) {
  return (
    <figure data-source-ids={media.sourceIds.join(" ")} className="mx-auto w-full max-w-[15rem] min-w-0 sm:max-w-[18rem]">
      <div className="overflow-hidden rounded-[1.25rem] bg-white shadow-[0_24px_64px_-36px_rgba(25,18,12,0.58)]">
        <ResponsiveProjectImage
          src={`${assetRoot}/${media.src}`}
          alt={media.alt}
          width={1206}
          height={2622}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      <figcaption className={`mt-4 text-xs leading-5 sm:text-sm sm:leading-6 ${inverse ? "text-[#d7cec4]" : "text-[#625c55]"}`}>
        {media.caption}
      </figcaption>
    </figure>
  );
}

function HeroPhone({ media, assetRoot, className, priority = false }: { media: LincolnMedia; assetRoot: string; className: string; priority?: boolean }) {
  return (
    <figure data-source-ids={media.sourceIds.join(" ")} className={className}>
      <ResponsiveProjectImage
        src={`${assetRoot}/${media.src}`}
        alt={media.alt}
        width={1206}
        height={2622}
        priority={priority}
        className="h-auto w-full rounded-[1.1rem] shadow-[0_30px_72px_-32px_rgba(0,0,0,0.88)]"
      />
    </figure>
  );
}

function PhoneCollage({ media, assetRoot, locale }: { media: readonly LincolnMedia[]; assetRoot: string; locale: Locale }) {
  return (
    <div data-source-ids={media.flatMap((item) => item.sourceIds).join(" ")}>
      <div className="relative mx-auto h-[25rem] w-full max-w-[34rem] sm:h-[38rem] lg:h-[42rem]" aria-label={labels[locale].profileStates}>
        <HeroPhone media={media[0]} assetRoot={assetRoot} className="absolute bottom-0 left-[1%] z-10 w-[42%] -rotate-2" />
        <HeroPhone media={media[1]} assetRoot={assetRoot} className="absolute left-[29%] top-0 z-20 w-[42%]" priority />
        <HeroPhone media={media[2]} assetRoot={assetRoot} className="absolute bottom-[1%] right-[1%] z-30 w-[42%] rotate-2" />
      </div>
      <div className="mx-auto mt-8 grid w-full gap-4 sm:grid-cols-3">
        {media.map((item) => <p key={item.src} className="text-sm leading-6 text-[#655f59]">{item.caption}</p>)}
      </div>
    </div>
  );
}

function Derivation({ derivation }: { derivation: LincolnDerivation }) {
  return (
    <details
      data-source-ids={derivation.sourceIds.join(" ")}
      className="lincoln-derivation mt-10 w-full rounded-2xl bg-[#e7dfd3] open:bg-[#dfd5c5]"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b6c2f] sm:px-8">
        <span className="flex items-start gap-2 text-base font-semibold text-[#2a2118] sm:text-lg"><span aria-hidden="true">💡</span><span>{derivation.title}</span></span>
        <ChevronDown className="lincoln-chevron-down hidden h-5 w-5 shrink-0 text-[#8b672f]" aria-hidden="true" />
        <ChevronUp className="lincoln-chevron-up h-5 w-5 shrink-0 text-[#8b672f]" aria-hidden="true" />
      </summary>
      <div className="px-6 pb-6 sm:px-8 sm:pb-8">
        <p className="text-sm leading-7 text-[#655f59] sm:text-base">{derivation.summary}</p>
        <ul className="mt-4 space-y-3">
          {derivation.points.map((point) => (
            <li key={point} className="text-sm leading-7 text-[#3f372f] sm:text-base">{point}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}

function DecisionRow({
  tradeoff,
  decision,
  presentation,
  locale,
  inverse = false,
}: {
  tradeoff: string;
  decision: string;
  presentation: string;
  locale: Locale;
  inverse?: boolean;
}) {
  return (
    <div className="mt-14 grid w-full gap-6 lg:grid-cols-2">
      <div className={`rounded-2xl p-6 sm:p-8 ${inverse ? "bg-[#17130f]" : "bg-[#26211d]"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ad9572]">{labels[locale].tradeoff}</p>
        <p className={`mt-4 text-base leading-8 ${inverse ? "text-[#e8ded3]" : "text-white"}`}>{tradeoff}</p>
      </div>
      <div className="rounded-2xl bg-[#17130f] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ad9572]">{labels[locale].decision}</p>
        <p className="mt-4 text-base leading-8 text-[#e8ded3]">{decision}</p>
      </div>
      <div className="rounded-2xl bg-[#17130f] p-6 sm:p-8 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ad9572]">{labels[locale].presentation}</p>
        <p className="mt-4 text-base leading-8 text-[#e8ded3] sm:text-lg">{presentation}</p>
      </div>
    </div>
  );
}

export default function LincolnCaseStudyPage({ project, locale }: { project: LincolnProject; locale: Locale }) {
  const dictionary = getDictionary(locale);
  const localLabels = labels[locale];
  const assetRoot = `/assets/images/${project.projectId}`;

  return (
    <main className="case-study-page min-h-screen bg-[#f4f0ea] text-[#26211d]">
      <style>{`.lincoln-derivation[open] .lincoln-chevron-down{display:block}.lincoln-derivation[open] .lincoln-chevron-up{display:none}`}</style>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f4f0ea]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href={locale === "zh" ? "/zh" : "/"} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b6c2f]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />{dictionary.shared.workspace}
          </Link>
          <div className="flex items-center gap-1"><span className="hidden max-w-[42vw] text-right text-[10px] uppercase leading-4 tracking-[0.14em] text-[#706960] sm:block">{project.projectName} · {dictionary.shared.caseStudy}</span><LanguageSwitcher locale={locale} label={dictionary.shared.languageName} /></div>
        </div>
      </header>

      <article>
        <SourceSection sourceIds={project.hero.sourceIds} className="overflow-hidden bg-[#17130f] text-white">
          <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-24">
            <div className="w-full">
              <h2 className="case-study-title text-balance !text-white">{project.title}</h2>
              <p className="mt-7 text-xl font-medium leading-8 text-[#f0e7dc] sm:text-2xl sm:leading-9">{project.hero.proposition}</p>
            </div>

            <figure data-source-ids={project.hero.cover.sourceIds.join(" ")} className="mt-12 overflow-hidden rounded-2xl sm:mt-16">
              <ResponsiveProjectImage src={`${assetRoot}/${project.hero.cover.src}`} alt={project.hero.cover.alt} width={1200} height={900} priority className="h-auto w-full" />
            </figure>

            <div className="mt-14 w-full">
              <p className="text-base leading-8 text-[#c9bfb5] sm:text-lg">{project.hero.context}</p>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {project.hero.meta.map((item) => (
                  <p key={item.label} className="text-sm leading-6 text-[#d7cec4]"><span className="block text-[10px] uppercase tracking-[0.14em] text-[#ad9572]">{item.label}</span>{item.value}</p>
                ))}
              </div>
              <p className="mt-10 text-sm leading-7 text-[#a99f95]">{project.hero.evidenceBoundary}</p>
            </div>
          </div>

          <div className="pb-12 sm:pb-16">
            <div className="mx-auto grid max-w-7xl gap-3 px-5 sm:grid-cols-3 sm:px-8">
              {project.hero.questions.map((item) => (
                <div key={item.name} className="rounded-2xl bg-[#2a241f] px-5 py-8 sm:px-7">
                  <p className="text-xl font-semibold text-white">{item.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#ad9572]">{item.examples}</p>
                  <p className="mt-5 text-sm leading-6 text-[#bdb3a8]">{item.property}</p>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#efd6aa]">{item.question}</p>
                </div>
              ))}
            </div>
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.shortText.sourceIds} className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <SectionHeading title={project.shortText.title} summary={project.shortText.summary} />
          <div className="mt-14">
            <PhoneCollage media={project.shortText.media} assetRoot={assetRoot} locale={locale} />
          </div>
          <DecisionRow tradeoff={project.shortText.tradeoff} decision={project.shortText.decision} presentation={project.shortText.presentation} locale={locale} />
          <Derivation derivation={project.shortText.derivation} />
        </SourceSection>

        <SourceSection sourceIds={project.vin.sourceIds} className="bg-[#2a241f] text-white">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <SectionHeading title={project.vin.title} summary={project.vin.summary} inverse />
            <div className="mt-14 grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:gap-x-10 lg:px-16">
              {project.vin.media.map((item) => <PhoneFigure key={item.src} media={item} assetRoot={assetRoot} inverse />)}
            </div>
            <DecisionRow tradeoff={project.vin.tradeoff} decision={project.vin.decision} presentation={project.vin.presentation} locale={locale} inverse />
            <div className="mt-8 w-full">
              <p className="text-sm leading-7 text-[#bfb4a9]">{project.vin.evidenceBoundary}</p>
            </div>
            <Derivation derivation={project.vin.derivation} />
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.longText.sourceIds} className="bg-[#f4f0ea]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <SectionHeading title={project.longText.title} summary={project.longText.summary} />

            <DecisionRow tradeoff={project.longText.tradeoff} decision={project.longText.decision} presentation={project.longText.presentation} locale={locale} />

            <div className="mt-16 w-full">
              <h4 className="case-study-subsection-title text-[#2a2118]">{project.longText.countTitle}</h4>
              <p className="mt-4 text-base leading-8 text-[#655f59] sm:text-lg">{project.longText.countSummary}</p>
            </div>

            <ol className="mt-10 grid w-full grid-cols-2 gap-2 lg:grid-cols-3" aria-label={localLabels.chain}>
              {project.longText.chain.map((step, index) => (
                <li key={step.stage} className="rounded-2xl bg-[#e7dfd3] p-4 text-sm leading-5 text-[#2a2118] sm:p-5">
                  <span className="block text-[10px] text-[#8b672f]">{String(index + 1).padStart(2, "0")}</span>
                  <strong className="mt-2 block text-sm sm:text-base">{step.stage}</strong>
                  <span className="mt-1.5 block text-xs text-[#655f59] sm:text-sm">{step.responsibility}</span>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <OverviewTable label={localLabels.chain} columns={localLabels.chainColumns} rows={project.longText.testCases.map((row) => [row.input, row.increase, row.status])} enlargeLabel={dictionary.shared.enlarge} closeLabel={dictionary.shared.closeExpanded} />
            </div>

            <div className="mt-20 grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:gap-x-10 lg:px-16">
              {project.longText.media.map((item) => <PhoneFigure key={item.src} media={item} assetRoot={assetRoot} />)}
            </div>

            <div className="mt-16 w-full">
              <h4 className="case-study-subsection-title text-[#2a2118]">{project.longText.statesTitle}</h4>
              <p className="mt-3 text-sm leading-6 text-[#655f59] sm:text-base">{project.longText.statesSummary}</p>
            </div>
            <div className="mt-8 grid w-full grid-cols-2 gap-2" aria-label={localLabels.feedbackStates}>
              {project.longText.states.map((item) => (
                <div key={item.state} className="rounded-2xl bg-[#231e1a] p-4 text-white sm:p-5">
                  <p className="text-base font-semibold text-white sm:text-lg">{item.state}</p>
                  <p className="mt-2 text-xs leading-5 text-[#c8bdb2] sm:text-sm sm:leading-6">{item.behavior}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 w-full text-base font-medium leading-8 text-[#4c3a25]">{project.longText.allowance}</p>

            <Derivation derivation={project.longText.derivation} />
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.archetypes.sourceIds} className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <SectionHeading title={project.archetypes.title} summary={project.archetypes.summary} />
          <OverviewTable label={localLabels.archetypeTable} columns={localLabels.archetypeColumns} rows={project.archetypes.rows} enlargeLabel={dictionary.shared.enlarge} closeLabel={dictionary.shared.closeExpanded} />
          <div className="mt-14 w-full rounded-2xl bg-[#e7dfd3] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#695841]">{localLabels.dimensions}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.archetypes.dimensions.map((dimension) => <li key={dimension} className="text-lg font-semibold text-[#302820]">{dimension}</li>)}
            </ul>
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.framework.sourceIds} className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <SectionHeading title={project.framework.title} summary={project.framework.summary} />
          <div className="mt-12">
            <OverviewTable label={localLabels.frameworkTable} columns={project.framework.columns} rows={project.framework.rows} enlargeLabel={dictionary.shared.enlarge} closeLabel={dictionary.shared.closeExpanded} />
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.validation.sourceIds} className="bg-[#e7dfd3]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <SectionHeading title={project.validation.title} summary={project.validation.summary} />
            <div className="mt-12">
              <OverviewTable label={localLabels.validationTable} columns={localLabels.validationColumns} rows={project.validation.metrics.map((row) => [row.scenario, row.measures, row.question])} enlargeLabel={dictionary.shared.enlarge} closeLabel={dictionary.shared.closeExpanded} />
            </div>
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.closing.sourceIds} className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <blockquote className="w-full text-2xl font-semibold leading-8 text-[#26211d]">{project.closing.statement}</blockquote>
        </SourceSection>
      </article>
    </main>
  );
}
