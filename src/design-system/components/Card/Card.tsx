import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Card.module.css";

type DivProps = HTMLAttributes<HTMLDivElement>;
type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

function classes(base: string, className?: string) {
  return [base, className].filter(Boolean).join(" ");
}

export const Card = forwardRef<HTMLDivElement, DivProps>(function Card(
  { className, ...props },
  ref,
) {
  return <article ref={ref} className={classes(styles.card, className)} {...props} />;
});

export const CardMedia = forwardRef<HTMLDivElement, DivProps>(function CardMedia(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={classes(styles.media, className)} {...props} />;
});

export const CardBody = forwardRef<HTMLDivElement, DivProps>(function CardBody(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={classes(styles.body, className)} {...props} />;
});

export const CardTitle = forwardRef<HTMLHeadingElement, HeadingProps>(function CardTitle(
  { className, ...props },
  ref,
) {
  return <h3 ref={ref} className={classes(styles.title, className)} {...props} />;
});

export const CardDescription = forwardRef<HTMLParagraphElement, ParagraphProps>(
  function CardDescription({ className, ...props }, ref) {
    return <p ref={ref} className={classes(styles.description, className)} {...props} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, DivProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={classes(styles.footer, className)} {...props} />;
});
