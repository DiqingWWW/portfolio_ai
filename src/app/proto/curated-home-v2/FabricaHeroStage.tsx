import type { ReactNode } from "react";
import styles from "./page.module.css";

export default function FabricaHeroStage({
  children,
  disciplines,
  label,
}: {
  children: ReactNode;
  disciplines: string[];
  label: string;
}) {
  return <div className={styles.studyHeroStage}>
    <div className={styles.studyHeroShell}>
      {children}
      <section className={styles.studyDisciplineStrip} aria-label={label}>
        <div className={styles.studyDisciplineViewport}>
          <div className={styles.studyDisciplineTrack}>
            {[0, 1].map(group => <div key={group} aria-hidden={group === 1}>
              {disciplines.map(discipline => <span key={discipline}>{discipline}</span>)}
            </div>)}
          </div>
        </div>
        <span>©2026</span>
      </section>
    </div>
  </div>;
}
