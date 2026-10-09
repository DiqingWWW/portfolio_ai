import type { HTMLAttributes } from "react";
import styles from "./foundations.module.css";

export type DesignSystemScopeProps = HTMLAttributes<HTMLDivElement>;

export function DesignSystemScope({ className, ...props }: DesignSystemScopeProps) {
  return (
    <div
      className={[styles.scope, className].filter(Boolean).join(" ")}
      data-design-system-scope="draft"
      {...props}
    />
  );
}
