import { forwardRef, useId, type InputHTMLAttributes } from "react";
import styles from "./TextField.module.css";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  description?: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { className, description, error, id: suppliedId, label, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = suppliedId ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      {description ? (
        <span className={styles.description} id={descriptionId}>
          {description}
        </span>
      ) : null}
      <input
        ref={ref}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={[styles.input, error ? styles.invalid : "", className]
          .filter(Boolean)
          .join(" ")}
        id={inputId}
        {...props}
      />
      {error ? (
        <span className={styles.error} id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
});
