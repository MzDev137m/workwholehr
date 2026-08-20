import Link from "next/link";
import { NAV_ORDER } from "@/lib/data";
import styles from "./Pager.module.css";

type Props = {
  currentHref: string;
  prevLabel?: string;
  prevHref?: string;
  nextLabel?: string;
  nextHref?: string;
};

export default function Pager({
  currentHref,
  prevLabel,
  prevHref,
  nextLabel,
  nextHref,
}: Props) {
  let prev = prevHref ? { href: prevHref, label: prevLabel ?? "Previous" } : null;
  let next = nextHref ? { href: nextHref, label: nextLabel ?? "Next" } : null;

  if (!prev || !next) {
    const idx = NAV_ORDER.findIndex((n) => n.href === currentHref);
    if (idx !== -1) {
      if (!prev && idx > 0) prev = NAV_ORDER[idx - 1];
      if (!next && idx < NAV_ORDER.length - 1) next = NAV_ORDER[idx + 1];
    }
  }

  if (!prev && !next) return null;

  return (
    <nav className={styles.pager} aria-label="Page navigation">
      <div className="container">
        <div className={styles.row}>
          {prev ? (
            <Link href={prev.href} className={`${styles.btn} ${styles.prev}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                <span className={styles.dir}>Previous</span>
                <span className={styles.name}>{prev.label}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link href={next.href} className={`${styles.btn} ${styles.next}`}>
              <span>
                <span className={styles.dir}>Next</span>
                <span className={styles.name}>{next.label}</span>
              </span>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </nav>
  );
}
