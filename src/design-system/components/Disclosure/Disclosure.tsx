import type { DetailsHTMLAttributes, ReactNode } from "react";
import styles from "./Disclosure.module.css";

export interface DisclosureProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  summary: ReactNode;
}

export function Disclosure({ children, className, summary, ...props }: DisclosureProps) {
  return (
    <details className={[styles.disclosure, className].filter(Boolean).join(" ")} {...props}>
      <summary className={styles.summary}>
        <span>{summary}</span>
        <span aria-hidden="true" className={styles.indicator}>
          +
        </span>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
