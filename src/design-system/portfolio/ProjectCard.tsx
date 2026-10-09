import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";
import { resolveAsset } from "@/lib/content";
import type { ProjectData } from "@/types/content";
import { portfolioTokens } from "./tokens";
import styles from "./project-card.module.css";

/** The same component is rendered by the homepage and the V2 catalogue. */
export default function ProjectCard({ project, title = project.title, image = true, preview = false, media }: {
  project: ProjectData; title?: string; image?: boolean; preview?: boolean; media?: ReactNode;
}) {
  const asset = resolveAsset(project.id, project.assets.coverVideo ?? project.assets.cover);
  const tags = <div className={styles.tags}>{project.tokens.map(tag => <span key={tag}>{tag}</span>)}</div>;
  return <article className={styles.card} data-preview={preview} style={portfolioTokens as CSSProperties}>
    <Link href={project.detailHref ?? "/#work"} className={styles.link}>
      {image && <div className={styles.media}>
        {media ?? (/\.(mp4|webm)$/.test(asset) ? <video src={asset} poster={resolveAsset(project.id, project.assets.cover)} autoPlay muted loop playsInline preload="metadata" aria-label={title} /> : <ResponsiveProjectImage src={asset} alt="" />)}
        <div className={styles.overlay}>{tags}<span className={styles.arrow}><ArrowUpRight aria-hidden="true" /></span></div>
      </div>}
      <div className={styles.body}><span className={styles.meta}>{project.metadata.type}{project.metadata.year && ` · ${project.metadata.year}`}</span><h3>{title}</h3>{!image && tags}</div>
    </Link>
  </article>;
}
