import { ReactNode } from "react";
import styles from "./Section.module.css";

type Props = {
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  alt?: boolean;
  tight?: boolean;
  center?: boolean;
  children?: ReactNode;
  id?: string;
};

export default function Section({
  eyebrow,
  title,
  lead,
  alt,
  tight,
  center,
  children,
  id,
}: Props) {
  return (
    <section
      id={id}
      className={`${tight ? "section-tight" : "section"} ${alt ? "section-alt" : ""}`}
    >
      <div className="container">
        {(eyebrow || title || lead) && (
          <header
            className={`${styles.head} ${center ? styles.headCenter : ""}`}
          >
            {eyebrow && (
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden />
                {eyebrow}
              </span>
            )}
            {title && <h2 className={styles.title}>{title}</h2>}
            <span className={styles.rule} aria-hidden />
            {lead && <p className={styles.lead}>{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
