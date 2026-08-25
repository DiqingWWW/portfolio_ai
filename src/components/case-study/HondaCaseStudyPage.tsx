import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";
import { hondaCaseStudy as hondaEn, hondaContentBalance as hondaEnBalance } from "@content/projects/honda-hmi-design-system/case-study.en";
import { hondaCaseStudy as hondaZh, hondaContentBalance as hondaZhBalance } from "@content/projects/honda-hmi-design-system/case-study.zh";
import InteractiveMindmap from "@/components/case-study/InteractiveMindmap";
import InteractiveStrategyMap from "@/components/case-study/InteractiveStrategyMap";
import OverviewTable from "@/components/case-study/OverviewTable";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary, type Locale } from "@/i18n/dictionary";

type HondaProject = typeof hondaEn | typeof hondaZh;
type HondaMedia = HondaProject["background"]["covers"][number] | HondaProject["solution"]["decisions"][number]["media"][number];
const assetRoot = "/assets/images/honda-hmi-design-system";

const mediaPresentation: Record<string, { width: number; height: number; mobileSrc?: string }> = {
  "cover1-display.webp": { width: 1600, height: 898 },
  "cover2-display.webp": { width: 1600, height: 897 },
  "visual-language_EN-display.webp": { width: 1600, height: 913 },
  "visual-language_CN-display.webp": { width: 1600, height: 913 },
  "logo-and-icons_EN-display.webp": { width: 1600, height: 913 },
  "logo-and-icons_CN-display.webp": { width: 1600, height: 913 },
  "tokens-and-components_EN-display.webp": { width: 1600, height: 1871 },
  "tokens-and-components_CN-display.webp": { width: 1600, height: 1825 },
  "responsive-theme-adaptation.gif": {
    width: 1920,
    height: 920,
    mobileSrc: `${assetRoot}/responsive-theme-adaptation-mobile.webp`,
  },
  "vehicle-language-adaptation.gif": {
    width: 1920,
    height: 914,
    mobileSrc: `${assetRoot}/vehicle-language-adaptation-mobile.webp`,
  },
  "design-to-code_EN-display.webp": { width: 1600, height: 913 },
  "design-to-code_CN-display.webp": { width: 1600, height: 913 },
};

function SourceSection({ sourceIds, children, className = "" }: { sourceIds: readonly string[]; children: React.ReactNode; className?: string }) {
  return <section data-source-ids={sourceIds.join(" ")} className={className}>{children}</section>;
}

function Figure({ media, priority = false }: { media: HondaMedia; priority?: boolean }) {
  const presentation = mediaPresentation[media.src];
  return (
    <figure data-source-ids={media.sourceIds.join(" ")} className="min-w-0">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-38px_rgba(0,0,0,0.45)]">
        {/* Project media includes GIFs and varied source ratios; preserve their native dimensions. */}
        <ResponsiveProjectImage
          src={`${assetRoot}/${media.src}`}
          mobileSrc={presentation?.mobileSrc}
          width={presentation?.width}
          height={presentation?.height}
          alt={media.alt}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-workspace-muted">{media.caption}</figcaption>
    </figure>
  );
}

function SectionHeading({ title, summary, emphasis }: { title: string; summary: string; emphasis?: string }) {
  const emphasisStart = emphasis ? summary.indexOf(emphasis) : -1;
  return (
    <div className="max-w-5xl space-y-3">
      <h3 className="case-study-section-title text-neutral-800">{title}</h3>
      <p className="max-w-[64ch] text-base leading-8 text-neutral-600 sm:text-lg">
        {emphasisStart >= 0 ? <>{summary.slice(0, emphasisStart)}<strong className="font-semibold text-neutral-800">{summary.slice(emphasisStart, emphasisStart + emphasis!.length)}</strong>{summary.slice(emphasisStart + emphasis!.length)}</> : summary}
      </p>
    </div>
  );
}

export default function HondaCaseStudyPage({ project, locale }: { project: HondaProject; locale: Locale }) {
  const dictionary = getDictionary(locale);
  const { shared, honda } = dictionary;
  void (locale === "zh" ? hondaZhBalance : hondaEnBalance);

  return (
    <main className="case-study-page min-h-screen bg-workspace-bg text-workspace-text">
      <header className="sticky top-0 z-30 border-b border-workspace-border bg-workspace-bg/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href={locale === "zh" ? "/zh" : "/"} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-mono text-xs font-bold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />{shared.workspace}
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-right font-mono text-[10px] uppercase tracking-[0.16em] text-workspace-muted sm:inline">{shared.caseStudy} · {project.status}</span>
            <LanguageSwitcher locale={locale} label={shared.languageName} />
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-7xl px-5 pb-28 pt-12 sm:px-8 sm:pt-20">
        <SourceSection sourceIds={project.background.sourceIds} className="space-y-9 sm:space-y-12">
          <div className="max-w-6xl">
            <h1 className="case-study-title text-neutral-800">{project.title}</h1>
            <p className="mt-6 max-w-[68ch] text-base leading-8 text-neutral-600 sm:text-lg">{project.background.promise}</p>
          </div>

          <div className="space-y-8">
            {project.background.covers.map((media, index) => <Figure key={media.src} media={media} priority={index === 0} />)}
          </div>

          <div className="grid gap-5 rounded-2xl bg-[#e9e6e1] p-6 text-sm text-neutral-600 sm:grid-cols-3">
            <p><strong className="text-neutral-800">{shared.role}</strong><br />{project.meta.role}</p>
            <p><strong className="text-neutral-800">{shared.duration}</strong><br />{project.meta.duration}</p>
            <p><strong className="text-neutral-800">{shared.tools}</strong><br />{project.meta.tools}</p>
          </div>

          <p className="max-w-[68ch] text-base leading-8 text-neutral-600 sm:text-lg">{project.background.summary}</p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.background.achievements.map((achievement) => (
              <div key={achievement.value} className="rounded-2xl bg-neutral-800 p-5 text-white">
                <strong className="text-2xl font-semibold">{achievement.value}</strong>
                <p className="mt-2 text-sm font-medium leading-5 text-neutral-100">{achievement.label}</p>
                <p className="mt-3 text-xs leading-5 text-neutral-300">{achievement.note}</p>
              </div>
            ))}
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.problem.sourceIds} className="mt-28 space-y-8 sm:mt-40 sm:space-y-10">
          <SectionHeading title={project.problem.title} summary={project.problem.summary} emphasis={project.problem.emphasis} />
          <OverviewTable
            label={honda.problemTableLabel}
            columns={honda.problemColumns}
            rows={project.problem.impactMatrix.map((row) => [row.dimension, row.company, row.team, row.user])}
            enlargeLabel={shared.enlarge}
            closeLabel={shared.closeExpanded}
          />
        </SourceSection>

        <SourceSection sourceIds={project.analysis.sourceIds} className="mt-28 space-y-8 sm:mt-40 sm:space-y-10">
          <SectionHeading title={project.analysis.title} summary={project.analysis.summary} emphasis={project.analysis.emphasis} />
          <InteractiveStrategyMap impacts={project.problem.impacts} rootCauses={project.analysis.rootCauses} metrics={project.analysis.metrics} phases={project.analysis.phases} labels={honda.strategy} />
          <p className="max-w-[68ch] text-base leading-8 text-neutral-600 sm:text-lg">{project.analysis.phaseRationale}</p>
        </SourceSection>

        <SourceSection sourceIds={project.researchFoundation.sourceIds} className="mt-28 space-y-8 sm:mt-40 sm:space-y-10">
          <SectionHeading title={project.researchFoundation.title} summary={project.researchFoundation.summary} />
          <div className="grid gap-5 lg:grid-cols-3">
            {project.researchFoundation.studies.map((study) => (
              <article key={study.title} data-source-ids={study.sourceIds.join(" ")} className="rounded-2xl bg-[#e9e6e1] p-6 sm:p-7">
                <h4 className="case-study-subsection-title text-neutral-800">{study.title}</h4>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{study.text}</p>
                {"keyTakeaways" in study && study.keyTakeaways ? (
                  <ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-600">
                    {study.keyTakeaways.map((item) => <li key={item}>— {item}</li>)}
                  </ul>
                ) : null}
                {"steps" in study && study.steps ? (
                  <ol className="mt-5 space-y-4">
                    {study.steps.map((item) => (
                      <li key={item.step}>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-workspace-accent">{item.step}</p>
                        <p className="mt-1 text-sm font-semibold text-neutral-800">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-neutral-600">{item.description}</p>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </article>
            ))}
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.solution.sourceIds} className="mt-28 space-y-10 sm:mt-40 sm:space-y-14">
          <SectionHeading title={project.solution.title} summary={project.solution.summary} />

          {project.solution.decisions.map((decision, index) => (
            <section key={decision.title} data-source-ids={decision.sourceIds.join(" ")} className="space-y-6 pt-2 sm:space-y-8 sm:pt-4">
              <div className="max-w-5xl space-y-3">
                <h4 className="case-study-subsection-title text-neutral-800">{decision.title}</h4>
                <p className="max-w-[68ch] text-base leading-8 text-neutral-600 sm:text-lg">{decision.text}</p>
              </div>

              {"mindmap" in decision && decision.mindmap && <InteractiveMindmap tree={decision.mindmap} locale={locale} instruction={honda.mindmapInstruction} emptyText={honda.mindmapEmpty} />}

              {decision.media.length > 0 && (
                <div className="space-y-8">
                  {decision.media.map((media) => <Figure key={media.src} media={media} />)}
                </div>
              )}

              {index === 1 && (
                <p className="max-w-[68ch] text-sm leading-6 text-neutral-500">{honda.platformNote}</p>
              )}
            </section>
          ))}
        </SourceSection>

        <SourceSection sourceIds={project.validation.sourceIds} className="mt-28 space-y-8 sm:mt-40 sm:space-y-10">
          <SectionHeading title={project.validation.title} summary={project.validation.summary} />

          <OverviewTable
            label={honda.metricTableLabel}
            columns={honda.metricColumns}
            rows={project.validation.metricFramework.map((row) => [row.metric, row.definition, row.method, row.status])}
            enlargeLabel={shared.enlarge}
            closeLabel={shared.closeExpanded}
          />

          <div className="rounded-2xl bg-[#e9e6e1] p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h4 className="case-study-subsection-title text-neutral-800">Design System {project.validation.roadmap[0].phase}</h4>
              <span className="text-sm font-semibold text-neutral-600">{project.validation.roadmap[0].status}</span>
            </div>
            <p className="mt-3 max-w-[68ch] text-base leading-7 text-neutral-600">{project.validation.roadmap[0].summary}</p>
            <p className="mt-3 max-w-[90ch] text-sm leading-6 text-neutral-600">{project.validation.roadmap[0].scope}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {project.validation.results.map((result) => (
              <article key={result.value} className="rounded-2xl bg-neutral-800 p-6 text-white sm:p-8">
                <strong className="text-5xl font-semibold tracking-[-0.03em]">{result.value}</strong>
                <h4 className="mt-4 text-xl font-semibold text-white">{result.label}</h4>
                <p className="mt-4 text-sm leading-6 text-neutral-200">{result.method}</p>
                <p className="mt-4 text-xs leading-5 text-neutral-300">{result.boundary}</p>
              </article>
            ))}
          </div>

          <div className="rounded-2xl bg-[#e9e6e1] p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h4 className="case-study-subsection-title text-neutral-800">Design System {project.validation.roadmap[1].phase}</h4>
              <span className="text-sm font-semibold text-neutral-600">{project.validation.roadmap[1].status}</span>
            </div>
            <p className="mt-3 max-w-[68ch] text-sm leading-6 text-neutral-600">{project.validation.roadmap[1].summary}</p>
            <p className="mt-3 max-w-[90ch] text-sm leading-6 text-neutral-600">{project.validation.roadmap[1].scope}</p>
          </div>

          <blockquote className="max-w-6xl rounded-2xl bg-[#e9e6e1] p-7 text-2xl font-medium leading-8 text-neutral-700 sm:p-10">{project.validation.closing}</blockquote>
        </SourceSection>
      </article>
    </main>
  );
}
