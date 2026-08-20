import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { modules, getModule } from "@/lib/data";
import styles from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) return {};
  return {
    title: `${mod.name} — Workwhole HR`,
    description: mod.tagline,
  };
}

export default async function ModulePage({ params }: Params) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const idx = modules.findIndex((m) => m.slug === slug);

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner} page-fade`}>
          <div className={styles.heroCopy}>
            <div className={styles.crumbs}>
              <Link href="/modules">Modules</Link>
              <span>·</span>
              <span>{mod.name}</span>
            </div>
            <div className={styles.heroHead}>
              <span className={styles.iconWrap} aria-hidden>
                <Icon name={mod.icon} size={30} />
              </span>
              <div>
                <span className={styles.heroKicker}>
                  Module {String(idx + 1).padStart(2, "0")}
                </span>
                <h1 className={styles.heroTitle}>{mod.name}</h1>
              </div>
            </div>
            <span className="orange-rule" />
            <p className={styles.heroLede}>{mod.summary}</p>
            <div className={styles.heroCta}>
              <Link href="/contact" className="btn btn-orange">Book demo</Link>
              <Link href="/modules" className="btn btn-outline-white">All modules</Link>
            </div>
          </div>

          <aside className={styles.aside}>
            <div className={styles.asideTitle}>Inside this module</div>
            <div className={styles.asideStat}>
              <span className={styles.asideValue}>{mod.features.length}</span>
              <span className={styles.asideLabel}>built-in features</span>
            </div>
            <div className={styles.asideRule} />
            <ul className={styles.asideList}>
              {mod.features.slice(0, 6).map((f) => (
                <li key={f.name}>
                  <Icon name="check" size={14} />
                  <span>{f.name}</span>
                </li>
              ))}
              {mod.features.length > 6 && (
                <li className={styles.asideMore}>
                  + {mod.features.length - 6} more below
                </li>
              )}
            </ul>
          </aside>
        </div>
      </section>

      {/* HIGHLIGHTS strip — quick metric-style callouts */}
      <section className={styles.highlights}>
        <div className="container">
          <Reveal stagger className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <span className={styles.highlightV}>{mod.features.length}</span>
              <span className={styles.highlightL}>Built-in features</span>
            </div>
            <div className={styles.highlightCard}>
              <span className={styles.highlightV}>Standard</span>
              <span className={styles.highlightL}>Check → Verify → Approve chain</span>
            </div>
            <div className={styles.highlightCard}>
              <span className={styles.highlightV}>Excel</span>
              <span className={styles.highlightL}>Bulk-loader for legacy data</span>
            </div>
            <div className={styles.highlightCard}>
              <span className={styles.highlightV}>Audit</span>
              <span className={styles.highlightL}>Full trail on every change</span>
            </div>
          </Reveal>
        </div>
      </section>

      <Section
        alt
        eyebrow="Feature breakdown"
        title="Every screen, every workflow"
        lead="Each item below is a real, production-tested capability — not a roadmap promise."
      >
        <Reveal stagger className={styles.featuresGrid}>
          {mod.features.map((f, i) => (
            <div key={f.name} className={styles.featureCard}>
              <span className={styles.featureNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={styles.featureTitle}>{f.name}</h3>
                <p className={styles.featureDetail}>{f.detail}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* OTHER MODULES — every module except the current one */}
      <section className={styles.related}>
        <div className="container">
          <div className={styles.relatedHead}>
            <span className="eyebrow">Other modules</span>
            <h2 className={styles.relatedTitle}>Explore the rest of the suite</h2>
          </div>
          <Reveal stagger className={styles.relatedGrid}>
            {modules
              .filter((m) => m.slug !== slug)
              .map((m) => (
                <Link key={m.slug} href={`/modules/${m.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedIcon} aria-hidden>
                    <Icon name={m.icon} size={22} />
                  </span>
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedKicker}>Module</span>
                    <h3 className={styles.relatedName}>{m.name}</h3>
                    <p className={styles.relatedTag}>{m.tagline}</p>
                  </div>
                  <span className={styles.relatedArrow} aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
