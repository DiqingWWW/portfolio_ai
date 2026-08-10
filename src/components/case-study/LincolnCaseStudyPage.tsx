import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";
import {
  lincolnCaseStudy,
  lincolnContentBalance,
  type LincolnMedia,
} from "@content/projects/lincoln-text-expression/case-study.en";
import OverviewTable from "@/components/case-study/OverviewTable";

const project = lincolnCaseStudy;
const assetRoot = `/assets/images/${project.projectId}`;

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
  priority = false,
  inverse = false,
}: {
  media: LincolnMedia;
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

function HeroPhone({ media, className, priority = false }: { media: LincolnMedia; className: string; priority?: boolean }) {
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

function PhoneCollage({ media }: { media: readonly LincolnMedia[] }) {
  return (
    <div data-source-ids={media.flatMap((item) => item.sourceIds).join(" ")}>
      <div className="relative mx-auto h-[25rem] w-full max-w-[34rem] sm:h-[38rem] lg:h-[42rem]" aria-label="Three current profile states">
        <HeroPhone media={media[0]} className="absolute bottom-0 left-[1%] z-10 w-[42%] -rotate-2" />
        <HeroPhone media={media[1]} className="absolute left-[29%] top-0 z-20 w-[42%]" priority />
        <HeroPhone media={media[2]} className="absolute bottom-[1%] right-[1%] z-30 w-[42%] rotate-2" />
      </div>
      <div className="mx-auto mt-8 grid w-full gap-4 sm:grid-cols-3">
        {media.map((item) => <p key={item.src} className="text-sm leading-6 text-[#655f59]">{item.caption}</p>)}
      </div>
    </div>
  );
}

export default function LincolnCaseStudyPage() {
  void lincolnContentBalance;

  return (
    <main className="case-study-page min-h-screen bg-[#f4f0ea] text-[#26211d]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f4f0ea]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b6c2f]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Workspace
          </Link>
          <span className="max-w-[52vw] text-right text-[10px] uppercase leading-4 tracking-[0.14em] text-[#706960]">{project.projectName} · Case study</span>
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
              {project.hero.archetypes.map((item) => (
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

        <SourceSection sourceIds={project.hero.sourceIds} className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="w-full rounded-2xl bg-[#e7dfd3] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#695841]">Six cross-context dimensions</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.hero.dimensions.map((dimension) => <li key={dimension} className="text-lg font-semibold text-[#302820]">{dimension}</li>)}
            </ul>
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.longText.sourceIds} className="bg-[#f4f0ea]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <SectionHeading title={project.longText.title} summary={project.longText.summary} />

            <div className="mt-16 w-full">
              <h4 className="case-study-subsection-title text-[#2a2118]">{project.longText.countTitle}</h4>
              <p className="mt-4 text-base leading-8 text-[#655f59] sm:text-lg">{project.longText.countSummary}</p>
            </div>

            <ol className="mt-10 grid w-full grid-cols-2 gap-2 lg:grid-cols-3" aria-label="Text counting and validation chain">
              {project.longText.chain.map((step, index) => (
                <li key={step.stage} className="rounded-2xl bg-[#e7dfd3] p-4 text-sm leading-5 text-[#2a2118] sm:p-5">
                  <span className="block text-[10px] text-[#8b672f]">{String(index + 1).padStart(2, "0")}</span>
                  <strong className="mt-2 block text-sm sm:text-base">{step.stage}</strong>
                  <span className="mt-1.5 block text-xs text-[#655f59] sm:text-sm">{step.responsibility}</span>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <OverviewTable label="reproducible multilingual and emoji counting behavior" columns={["Input", "Visible count increase", "Evidence status"]} rows={project.longText.testCases.map((row) => [row.input, row.increase, row.status])} />
            </div>

            <div className="mt-20 grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:gap-x-10 lg:px-16">
              {project.longText.media.map((item) => <PhoneFigure key={item.src} media={item} />)}
            </div>

            <div className="mt-16 w-full">
              <h4 className="case-study-subsection-title text-[#2a2118]">{project.longText.statesTitle}</h4>
              <p className="mt-3 text-sm leading-6 text-[#655f59] sm:text-base">{project.longText.statesSummary}</p>
            </div>
            <div className="mt-8 grid w-full grid-cols-2 gap-2" aria-label="Long-text feedback and recovery states">
              {project.longText.states.map((item) => (
                <div key={item.state} className="rounded-2xl bg-[#231e1a] p-4 text-white sm:p-5">
                  <p className="text-base font-semibold text-white sm:text-lg">{item.state}</p>
                  <p className="mt-2 text-xs leading-5 text-[#c8bdb2] sm:text-sm sm:leading-6">{item.behavior}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 w-full text-base font-medium leading-8 text-[#4c3a25]">{project.longText.allowance}</p>
          </div>
        </SourceSection>

        <SourceSection sourceIds={[...project.identityEvidence.sourceIds, ...project.shortText.sourceIds]} className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <SectionHeading title={project.shortText.title} summary={project.shortText.summary} />
          <div className="mt-14">
            <PhoneCollage media={project.identityEvidence.media} />
          </div>
          <div className="mt-14 grid w-full gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-[#26211d] p-6 text-white sm:p-8">
              <p className="text-xl font-semibold leading-8 text-white">{project.shortText.decision}</p>
            </div>
            <div className="rounded-2xl bg-[#e7dfd3] p-6 sm:p-8">
              <p className="text-base leading-8 text-[#655f59]">{project.shortText.implementationBoundary}</p>
            </div>
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.vin.sourceIds} className="bg-[#2a241f] text-white">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <SectionHeading title={project.vin.title} summary={project.vin.summary} inverse />
            <div className="mt-14 grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:gap-x-10 lg:px-16">
              {project.vin.media.map((item) => <PhoneFigure key={item.src} media={item} inverse />)}
            </div>
            <div className="mt-16 w-full space-y-6">
              <p className="text-xl font-semibold leading-8 text-[#f1d5a4] sm:text-2xl sm:leading-9">{project.vin.decision}</p>
              <p className="text-sm leading-7 text-[#bfb4a9]">{project.vin.evidenceBoundary}</p>
            </div>
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.framework.sourceIds} className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
          <SectionHeading title={project.framework.title} summary={project.framework.summary} />
          <div className="mt-12">
            <OverviewTable label="text-rule decision framework" columns={project.framework.columns} rows={project.framework.rows} />
          </div>
        </SourceSection>

        <SourceSection sourceIds={project.validation.sourceIds} className="bg-[#e7dfd3]">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
            <SectionHeading title={project.validation.title} summary={project.validation.summary} />
            <div className="mt-12">
              <OverviewTable label="measurement plan by text archetype" columns={["Text type / scenario", "Priority measures", "Validation question"]} rows={project.validation.metrics.map((row) => [row.scenario, row.measures, row.question])} />
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
