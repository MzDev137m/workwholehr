import Link from "next/link";
import Section from "@/components/Section";
import ModuleCard from "@/components/ModuleCard";
import Reveal from "@/components/Reveal";
import Pager from "@/components/Pager";
import { modules, MODULE_GROUPS, getModule } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "All modules — Workwhole HR",
  description:
    "Nine HR sub-modules grouped by People, Time, Money and Insight & Compliance.",
};

export default function ModulesIndex() {
  const totalFeatures = modules.reduce((n, m) => n + m.features.length, 0);
  return (
    <>
      <section className={styles.pageHero}>
        <div className="container page-fade">
          <span className={styles.heroKicker}>Product architecture</span>
          <h1 className={styles.heroTitle}>All modules</h1>
          <p className={styles.heroLede}>
            {modules.length} sub-modules · {totalFeatures}+ features · one platform.
            Each module runs standalone but shares the same employee master,
            approval matrix, calendar and audit trail.
          </p>
          <div className={styles.heroCta}>
            <Link href="/contact" className="btn btn-orange">Request demo</Link>
            <Link href="/" className="btn btn-outline-white">Back to overview</Link>
          </div>
        </div>
      </section>

      {MODULE_GROUPS.map((g) => (
        <Section key={g.key} eyebrow={g.label} title={`${g.label} modules`}>
          <Reveal stagger className="grid grid-3">
            {g.slugs
              .map((s) => getModule(s))
              .filter((m): m is NonNullable<typeof m> => Boolean(m))
              .map((m) => (
                <ModuleCard
                  key={m.slug}
                  slug={m.slug}
                  name={m.name}
                  icon={m.icon}
                  tagline={m.tagline}
                  count={m.features.length}
                />
              ))}
          </Reveal>
        </Section>
      ))}

      <Pager currentHref="/modules" />
    </>
  );
}
