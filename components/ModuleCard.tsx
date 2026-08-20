import Link from "next/link";
import Icon from "./Icon";
import styles from "./ModuleCard.module.css";

type Props = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  count?: number;
};

export default function ModuleCard({
  slug,
  name,
  icon,
  tagline,
  count,
}: Props) {
  return (
    <Link href={`/modules/${slug}`} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.iconWrap} aria-hidden>
          <Icon name={icon} size={22} />
        </span>
        {count !== undefined && (
          <span className={styles.count}>
            {count} <span>features</span>
          </span>
        )}
      </div>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.tag}>{tagline}</p>
      <span className={styles.link}>
        Explore module
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
