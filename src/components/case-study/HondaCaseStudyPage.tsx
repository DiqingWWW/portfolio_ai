import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";
import { hondaCaseStudy, hondaContentBalance, type HondaMedia } from "@content/projects/honda-hmi-design-system/case-study.en";
import InteractiveMindmap from "@/components/case-study/InteractiveMindmap";
import InteractiveStrategyMap from "@/components/case-study/InteractiveStrategyMap";
import OverviewTable from "@/components/case-study/OverviewTable";

const project = hondaCaseStudy;
const assetRoot = `/assets/images/${project.projectId}`;

function SourceSection({ sourceIds, children, className = "" }: { sourceIds: readonly string[]; children: React.ReactNode; className?: string }) {
  return <section data-source-ids={sourceIds.join(" ")} className={className}>{children}</section>;
}

function Figure({ media, priority = false }: { media: HondaMedia; priority?: boolean }) {
  return (
    <figure data-source-ids={media.sourceIds.join(" ")} className="min-w-0">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-38px_rgba(0,0,0,0.45)]">
        {/* Project media includes GIFs and varied source ratios; preserve their native dimensions. */}
        <ResponsiveProjectImage src={`${assetRoot}/${media.src}`} alt={media.alt} priority={priority} className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-workspace-muted">{media.caption}</figcaption>
    </figure>
  );
}

function SectionHeading({ title, summary }: { title: string; summary: string }) {
  return (
    <div className="max-w-5xl space-y-3">
      <h3 className="case-study-section-title text-neutral-800">{title}</h3>
      <p className="max-w-[64ch] text-base leading-8 text-neutral-600 sm:text-lg">{summary}</p>
    </div>
  );
}

export default function HondaCaseStudyPage() {
  void hondaContentBalance;

  return (
    <main className="case-study-page min-h-screen bg-workspace-bg text-workspace-text">
      <header className="sticky top-0 z-30 border-b border-workspace-border bg-workspace-bg/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-mono text-xs font-bold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Workspace
          </Link>
          <span className="text-right font-mono text-[10px] uppercase tracking-[0.16em] text-workspace-muted">Case study · {project.status}</span>
        </div>
      </header>

      <article className="mx-auto max-w-7xl px-5 pb-28 pt-12 sm:px-8 sm:pt-20">
        <SourceSection sourceIds={project.background.sourceIds} className="space-y-9 sm:space-y-12">
          <div className="max-w-6xl">
            <h2 className="case-study-title text-neutral-800">{project.title}</h2>
            <p className="mt-6 max-w-[68ch] text-base leading-8 text-neutral-600 sm:text-lg">{project.background.promise}</p>
          </div>

          <div className="space-y-8">
            {project.background.covers.map((media, index) => <Figure key={media.src} media={media} priority={index === 0} />)}
          </div>

          <div className="grid gap-5 rounded-2xl bg-[#e9e6e1] p-6 text-sm text-neutral-600 sm:grid-cols-3">
            <p><strong className="text-neutral-800">Role</strong><br />{project.meta.role}</p>
            <p><strong className="text-neutral-800">Duration</strong><br />{project.meta.duration}</p>
            <p><strong className="text-neutral-800">Tools</strong><br />{project.meta.tools}</p>
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
          <SectionHeading title={project.problem.title} summary={project.problem.summary} />
          <OverviewTable
            label="four dimensions projected across company, team, and user impact"
            columns={["Dimension", "Company", "Team", "User"]}
            rows={project.problem.impactMatrix.map((row) => [row.dimension, row.company, row.team, row.user])}
          />
        </SourceSection>

        <SourceSection sourceIds={project.analysis.sourceIds} className="mt-28 space-y-8 sm:mt-40 sm:space-y-10">
          <SectionHeading title={project.analysis.title} summary={project.analysis.summary} />
          <InteractiveStrategyMap impacts={project.problem.impacts} rootCauses={project.analysis.rootCauses} metrics={project.analysis.metrics} phases={project.analysis.phases} />
        </SourceSection>

        <SourceSection sourceIds={project.solution.sourceIds} className="mt-28 space-y-10 sm:mt-40 sm:space-y-14">
          <SectionHeading title={project.solution.title} summary={project.solution.summary} />

          {project.solution.decisions.map((decision, index) => (
            <section key={decision.title} data-source-ids={decision.sourceIds.join(" ")} className="space-y-6 pt-2 sm:space-y-8 sm:pt-4">
              <div className="max-w-5xl space-y-3">
                <h4 className="case-study-subsection-title text-neutral-800">{decision.title}</h4>
                <p className="max-w-[68ch] text-base leading-8 text-neutral-600 sm:text-lg">{decision.text}</p>
              </div>

              {"mindmap" in decision && decision.mindmap && <InteractiveMindmap tree={decision.mindmap} />}

              {decision.media.length > 0 && (
                <div className="space-y-8">
                  {decision.media.map((media) => <Figure key={media.src} media={media} />)}
                </div>
              )}

              {index === 1 && (
                <p className="max-w-[68ch] text-sm leading-6 text-neutral-500">Design Platform is open by default so its resources, guidelines, and adaptation rules are immediately visible. Readers can switch to either of the other system layers.</p>
              )}
            </section>
          ))}
        </SourceSection>

        <SourceSection sourceIds={project.validation.sourceIds} className="mt-28 space-y-8 sm:mt-40 sm:space-y-10">
          <SectionHeading title={project.validation.title} summary={project.validation.summary} />

          <OverviewTable
            label="Success Metrics, measurement methods, and evidence status"
            columns={["Success Metric", "Measurement method", "Current status"]}
            rows={project.validation.metricFramework.map((row) => [row.metric, row.method, row.status])}
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
