import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export type NarrativeBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "code"; value: string }
  | { type: "rule" };

interface NarrativeCaseStudyPageProps {
  projectId: string;
  blocks: NarrativeBlock[];
  status: string;
  mediaLayout?: "default" | "phone-story";
}

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);
  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index} className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.88em] text-neutral-800">{token.slice(1, -1)}</code>;
    if (token.startsWith("*") && token.endsWith("*")) return <em key={index}>{token.slice(1, -1)}</em>;
    return token;
  });
}

function ProjectFigure({ projectId, block }: { projectId: string; block: Extract<NarrativeBlock, { type: "image" }> }) {
  const imageUrl = `/assets/images/${projectId}/${block.src.replace(/^\.\//, "")}`;
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_22px_60px_-36px_rgba(0,0,0,0.38)]">
        {/* Editorial Markdown can reference GIFs and mixed image ratios, so native dimensions remain authoritative. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={block.alt} loading="lazy" decoding="async" className="h-auto w-full" />
      </div>
      {block.caption && <figcaption className="mt-3 text-xs leading-5 text-workspace-muted">{renderInline(block.caption)}</figcaption>}
    </figure>
  );
}

function renderBlock(block: NarrativeBlock, projectId: string, key: string) {
  if (block.type === "heading") {
    if (block.level === 1) return <h2 key={key} className="case-study-title max-w-5xl text-[#303030]">{renderInline(block.text)}</h2>;
    if (block.level === 2) return <h3 key={key} className="case-study-section-title max-w-4xl pt-8 text-[#303030]">{renderInline(block.text)}</h3>;
    return <h4 key={key} className="case-study-subsection-title max-w-3xl pt-4 text-[#303030]">{renderInline(block.text)}</h4>;
  }
  if (block.type === "paragraph") return <p key={key} className="max-w-[72ch] text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">{renderInline(block.text)}</p>;
  if (block.type === "quote") return <blockquote key={key} className="max-w-4xl rounded-2xl bg-[#e9e6e1] p-6 text-xl font-medium leading-8 text-neutral-700 sm:text-2xl sm:leading-9">{renderInline(block.text)}</blockquote>;
  if (block.type === "image") return <ProjectFigure key={key} projectId={projectId} block={block} />;
  if (block.type === "list") {
    const List = block.ordered ? "ol" : "ul";
    return <List key={key} className={`max-w-[72ch] space-y-2 pl-6 text-base leading-8 text-neutral-600 sm:text-lg ${block.ordered ? "list-decimal" : "list-disc"}`}>{block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}</List>;
  }
  if (block.type === "table") return (
    <div key={key} className="overflow-x-auto rounded-2xl border border-workspace-border bg-white">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm leading-6">
        <thead className="bg-neutral-50"><tr>{block.headers.map((header) => <th key={header} className="border-b border-workspace-border px-4 py-3 font-bold text-neutral-800">{renderInline(header)}</th>)}</tr></thead>
        <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-workspace-border/70 last:border-b-0">{row.map((cell, cellIndex) => <td key={cellIndex} className="align-top px-4 py-3 text-neutral-600">{renderInline(cell)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
  if (block.type === "code") return <pre key={key} className="overflow-x-auto rounded-2xl bg-workspace-text p-5 font-mono text-xs leading-6 text-neutral-200 sm:p-6"><code>{block.value}</code></pre>;
  return <hr key={key} className="border-workspace-border" />;
}

function NarrativeFlow({
  blocks,
  projectId,
  mediaLayout,
}: {
  blocks: NarrativeBlock[];
  projectId: string;
  mediaLayout: NonNullable<NarrativeCaseStudyPageProps["mediaLayout"]>;
}) {
  const output: ReactNode[] = [];
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const next = blocks[index + 1];

    if (mediaLayout === "phone-story" && block.type === "paragraph" && next?.type === "image") {
      const relatedImages: Extract<NarrativeBlock, { type: "image" }>[] = [];
      let imageIndex = index + 1;

      while (blocks[imageIndex]?.type === "image") {
        relatedImages.push(blocks[imageIndex] as Extract<NarrativeBlock, { type: "image" }>);
        imageIndex += 1;
      }

      output.push(
        <div
          key={`phone-story-${index}`}
          className="grid items-start gap-7 md:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.92fr)]"
        >
          {renderBlock(block, projectId, `paragraph-${index}`)}
          <div
            className={
              relatedImages.length > 1
                ? "grid grid-cols-2 gap-3 sm:gap-4"
                : "w-full max-w-xs justify-self-center md:justify-self-end"
            }
          >
            {relatedImages.map((imageBlock) => (
              <ProjectFigure key={imageBlock.src} projectId={projectId} block={imageBlock} />
            ))}
          </div>
        </div>,
      );
      index = imageIndex - 1;
      continue;
    }

    output.push(renderBlock(block, projectId, `block-${index}`));
  }
  return output;
}

export default function NarrativeCaseStudyPage({
  projectId,
  blocks,
  status,
  mediaLayout = "default",
}: NarrativeCaseStudyPageProps) {
  return (
    <main className="case-study-page min-h-screen bg-workspace-bg text-workspace-text">
      <header className="sticky top-0 z-20 border-b border-workspace-border bg-workspace-bg/92">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-mono text-xs font-bold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Workspace
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-workspace-muted">Case study · {status}</span>
        </div>
      </header>
      <article className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
        <div className="space-y-8 sm:space-y-10">
          <NarrativeFlow blocks={blocks} projectId={projectId} mediaLayout={mediaLayout} />
        </div>
      </article>
    </main>
  );
}
