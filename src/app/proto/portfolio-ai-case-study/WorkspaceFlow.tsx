import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CandidateCaseStudy } from "@content/projects/portfolio-operating-system/case-study.candidate.types";
import { resultFirstCuration } from "@content/projects/portfolio-operating-system/case-study.curation";
import { workspaceImageSizes } from "../design-system-directions/deethin-system-v2/case-study.registry";
import styles from "./page.module.css";

/** Owner-selected ImageGen illustration; original source relationships stay inspectable. */
export default function WorkspaceFlow({ content }: { content: CandidateCaseStudy }) {
  const graph = content.operatingSystem.sharedWorkspace;
  const ui = resultFirstCuration[content.locale];
  const node = (id: string) => graph.nodes.find(n => n.id === id)!;
  return <figure className={styles.workspaceDiagram} data-scroll-entrance data-source-ids={graph.sourceIds.join(" ")}>
    <figcaption><strong>{graph.title}</strong><span>{graph.description}</span></figcaption>
    <div className={styles.flowViewport}>
      <a href={ui.flowImage.src} target="_blank" rel="noreferrer" aria-label={ui.flowOpen}>
        <Image className={styles.workspaceRaster} src={ui.flowImage.src} width={ui.flowImage.width} height={ui.flowImage.height} sizes={workspaceImageSizes} alt={graph.description} />
      </a>
    </div>
    <p className={styles.flowNote}><span>{ui.flowImageNote}</span><span>{ui.flowHint}</span></p>
    <details className={styles.progressiveDetail}><summary>{ui.relationDetails}</summary><ol className={styles.edgeList}>{graph.edges.map((edge,i) => <li key={i}><span>{node(edge.from).label}</span><ArrowRight aria-hidden="true" /><span>{node(edge.to).label}</span>{edge.label && <small>{edge.label}</small>}</li>)}</ol></details>
  </figure>;
}
