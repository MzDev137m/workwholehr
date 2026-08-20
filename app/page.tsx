import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import ModulePreviews from "@/components/ModulePreviews";
import {
  modules,
  workflow,
  whySystem,
  integrations,
  deployment,
  additional,
  MODULE_GROUPS,
} from "@/lib/data";
import styles from "./page.module.css";

const HERO_BULLETS = [
  "Complete employee lifecycle — hiring to final settlement",
  "Attendance, payroll, overtime and compliance in one place",
  "Battle-tested across 6,800+ employees",
];

/* 4-column feature strip under hero (like the reference template) */
const FEATURE_STRIP = [
  {
    icon: "shield" as const,
    title: "Production-proven",
    text: "Battle-tested across manufacturing and multi-site operations.",
  },
  {
    icon: "briefcase" as const,
    title: "Compliance-first Payroll",
    text: "EOBI, Social Security, PF, gratuity and factory-audit ready.",
  },
  {
    icon: "bolt" as const,
    title: "Rapid Rollout",
    text: "Excel loaders migrate legacy data — go from paper to production quickly.",
  },
  {
    icon: "chart" as const,
    title: "Live Dashboards",
    text: "Section-wise strength, salary and OT budget with variance drill-down.",
  },
];

/* Executive summary numbers (from PDF §01) — richer tiles with icons + sub-labels */
const EXEC_STATS = [
  { v: "10",   l: "Modules",   s: "Working as one platform",           icon: "layers"    as const },
  { v: "200+", l: "Live forms",s: "Already in daily use",              icon: "grid"      as const },
  { v: "60+",  l: "Reports",   s: "Print + click-through",             icon: "chart"     as const },
  { v: "3",    l: "Streams",   s: "Staff · Wages · Compliance payroll",icon: "wallet"    as const },
];

/* "What you get at go-live" — grouped columns with category labels */
const DAY_ONE_COLS = [
  {
    icon: "layers"   as const,
    title: "Foundation & workflow",
    items: [
      "One system for the whole HR job — no side-files in Excel.",
      "Workflow for designation, grade, promotion and transfer.",
      "Shift and rest-day engine — night rotations, ASO, off-day rules.",
      "Payroll for staff, wages and compliance-paid workers.",
      "OT from request to posting with per-department budget.",
    ],
  },
  {
    icon: "chart"    as const,
    title: "Insight & compliance",
    items: [
      "Live dashboards for headcount, salary and overtime.",
      "Approval matrix you configure yourself.",
      "Excel loaders for legacy data — safe and repeatable.",
      "Ready-made compliance reports — EOBI, SS, PF, gratuity, ASO.",
      "Emailed pay-slips, bank-transfer files, printable registers.",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — corporate split (navy left / graphic right)
          ============================================================ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden>
          <span className={styles.heroBgTint} />
          <span className={styles.heroGlow1} />
          <span className={styles.heroGlow2} />
        </div>

        <div className={`container-fluid ${styles.heroInner} page-fade`}>
          <div className={styles.heroCopy}>
            <span className={styles.heroKicker}>
              <span className={styles.kickerDot} />
              Enterprise HR &amp; Payroll · v1.0
            </span>
            <h1 className={styles.heroTitle}>
              A complete <span className={styles.orangeWord}>HR&nbsp;module</span><br />
              from start to end.
            </h1>
            <span className="orange-rule" />
            <p className={styles.heroLede}>
              One integrated system for the complete employee journey — from
              hiring to final settlement, with payroll, leave, overtime and
              compliance built in.
            </p>

            <ul className={styles.heroBullets}>
              {HERO_BULLETS.map((b) => (
                <li key={b}>
                  <span className={styles.heroDiamond} aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className={styles.heroCta}>
              <Link href="/contact" className="btn btn-orange">
                Book a walkthrough
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a href="#s-modules" className="btn btn-outline-white">
                Explore modules
              </a>
            </div>

            <div className={styles.heroTrust}>
              <div>
                <span className={styles.trustV}>Enterprise</span>
                <span className={styles.trustL}>Multi-site ready</span>
              </div>
              <div>
                <span className={styles.trustV}>3 Streams</span>
                <span className={styles.trustL}>Staff · Wages · Compliance</span>
              </div>
              <div>
                <span className={styles.trustV}>10 Modules</span>
                <span className={styles.trustL}>One integrated platform</span>
              </div>
            </div>
          </div>

          <div className={styles.heroArt} aria-hidden>
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURE STRIP — 4 circular orange icons (below hero)
          ============================================================ */}
      <section className={styles.featureStrip}>
        <div className={`container ${styles.featureInner}`}>
          <Reveal stagger className={styles.featureGrid}>
            {FEATURE_STRIP.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <span className={styles.featureIconWrap} aria-hidden>
                  <Icon name={f.icon} size={26} />
                </span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          §01 EXECUTIVE SUMMARY
          ============================================================ */}
      <Section
        id="s-exec"
        eyebrow="Section 01 · Executive Summary"
        title={<>A complete HR job, start to end.</>}
        lead="This site follows the same order the printed proposal follows — how HR actually runs in a factory."
      >
        <Reveal className={styles.execFlow}>
          {["Master data","Hiring","Attendance","Leave","OT","Payroll","Compliance","Dashboards"].map((s, i, arr) => (
            <span key={s} className={styles.execFlowStep}>
              <span className={styles.execFlowNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.execFlowLbl}>{s}</span>
              {i < arr.length - 1 && (
                <span className={styles.execFlowArrow} aria-hidden>→</span>
              )}
            </span>
          ))}
        </Reveal>

        <Reveal stagger className={styles.execBand}>
          {EXEC_STATS.map((e) => (
            <div key={e.l} className={styles.execStat}>
              <span className={styles.execIcon} aria-hidden>
                <Icon name={e.icon} size={20} />
              </span>
              <div className={styles.execV}>{e.v}</div>
              <div className={styles.execL}>{e.l}</div>
              <div className={styles.execS}>{e.s}</div>
              <span className={styles.execCorner} aria-hidden />
            </div>
          ))}
        </Reveal>

        <div className={styles.dayOneBlock}>
          <div className={styles.dayOneHeader}>
            <h3 className={styles.dayOneHead}>What you get at go-live</h3>
            <p className={styles.dayOneLede}>
              Everything below is turned on from the first release &mdash; not a
              roadmap promise.
            </p>
          </div>

          <div className={styles.dayOneSplit}>
            {DAY_ONE_COLS.map((col) => (
              <div key={col.title} className={styles.dayOneCol}>
                <div className={styles.dayOneColHead}>
                  <span className={styles.dayOneColIcon} aria-hidden>
                    <Icon name={col.icon} size={18} />
                  </span>
                  <h4 className={styles.dayOneColTitle}>{col.title}</h4>
                </div>
                <ul className={styles.dayOneList}>
                  {col.items.map((li) => (
                    <li key={li}>
                      <span className={styles.dayOneDiamond} aria-hidden />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
          §02 WHY THIS SYSTEM IS NEEDED
          ============================================================ */}
      <Section
        id="s-why"
        alt
        eyebrow="Section 02"
        title="Why this system is needed"
        lead={whySystem.intro}
      >
        <Reveal className={styles.whyGrid}>
          {/* Problem card */}
          <div className={`${styles.whyCard} ${styles.whyProblem}`}>
            <div className={styles.whyCardHead}>
              <span className={styles.whyIcon} aria-hidden>
                <Icon name="spark" size={22} />
              </span>
              <div>
                <span className={styles.whyKicker}>Today</span>
                <h3 className={styles.whyCardTitle}>The problem this solves</h3>
              </div>
            </div>
            <ul className={styles.whyList}>
              {whySystem.problems.map((p, i) => (
                <li key={p}>
                  <span className={styles.whyNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bridge — vs marker */}
          <div className={styles.whyBridge} aria-hidden>
            <span className={styles.whyBridgeLine} />
            <span className={styles.whyBridgeMark}>VS</span>
            <span className={styles.whyBridgeLine} />
          </div>

          {/* Wins card */}
          <div className={`${styles.whyCard} ${styles.whyGood}`}>
            <div className={styles.whyCardHead}>
              <span className={`${styles.whyIcon} ${styles.whyIconGood}`} aria-hidden>
                <Icon name="check" size={22} />
              </span>
              <div>
                <span className={`${styles.whyKicker} ${styles.whyKickerGood}`}>After go-live</span>
                <h3 className={styles.whyCardTitle}>What good looks like</h3>
              </div>
            </div>
            <ul className={styles.whyList}>
              {whySystem.wins.map((w, i) => (
                <li key={w}>
                  <span className={`${styles.whyNum} ${styles.whyNumGood}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* ============================================================
          §03 HOW IT WORKS — 6-stage lifecycle
          ============================================================ */}
      <Section
        id="s-how"
        eyebrow="Section 03"
        title="How the system works"
        lead="From requisition to final settlement, every transition is captured, approved and posted through the same six-stage flow."
      >
        <Reveal stagger className={styles.workflow}>
          {workflow.map((w, i) => (
            <div key={w.step} className={styles.workflowStep}>
              {/* Big stage number as background */}
              <div className={styles.wfHero}>
                <span className={styles.wfBigNum}>{w.step}</span>
                <span className={styles.wfStage}>Stage</span>
              </div>

              {/* Icon + title row */}
              <div className={styles.wfHead}>
                {w.icon && (
                  <span className={styles.wfIcon} aria-hidden>
                    <Icon name={w.icon} size={22} />
                  </span>
                )}
                <h3 className={styles.wfTitle}>{w.title}</h3>
              </div>

              <p className={styles.wfDetail}>{w.detail}</p>

              {/* Inputs / Outputs split rail */}
              <div className={styles.wfRail}>
                {w.inputs && (
                  <div className={styles.wfIO}>
                    <span className={styles.wfIOLbl}>
                      <span className={styles.wfIODot} />
                      Inputs
                    </span>
                    <ul className={styles.wfIOList}>
                      {w.inputs.map((v) => <li key={v}>{v}</li>)}
                    </ul>
                  </div>
                )}
                {w.outputs && (
                  <div className={`${styles.wfIO} ${styles.wfIOOut}`}>
                    <span className={styles.wfIOLbl}>
                      <span className={`${styles.wfIODot} ${styles.wfIODotOut}`} />
                      Outputs
                    </span>
                    <ul className={styles.wfIOList}>
                      {w.outputs.map((v) => <li key={v}>{v}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              {/* Connector to next stage */}
              {i < workflow.length - 1 && (
                <span className={styles.wfConnector} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ============================================================
          §04 MODULES
          ============================================================ */}
      <Section
        id="s-modules"
        alt
        eyebrow="Section 04"
        title="What each module does"
        lead="Nine modules — each operates standalone but shares the same employee master, calendar and approval matrix."
      >
        {/* Category legend — People / Time / Money / Insight */}
        <Reveal stagger className={styles.modGroupGrid}>
          {MODULE_GROUPS.map((g, i) => {
            const icons: Record<string, "users" | "clock" | "wallet" | "shield"> = {
              people:  "users",
              time:    "clock",
              money:   "wallet",
              insight: "shield",
            };
            const count = g.slugs.length;
            return (
              <div key={g.key} className={styles.modGroup}>
                <span className={styles.modGroupNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.modGroupIcon} aria-hidden>
                  <Icon name={icons[g.key] ?? "layers"} size={22} />
                </span>
                <div className={styles.modGroupBody}>
                  <span className={styles.modGroupKicker}>Group</span>
                  <h4 className={styles.modGroupTitle}>{g.label}</h4>
                  <p className={styles.modGroupCount}>{count} module{count === 1 ? "" : "s"}</p>
                </div>
              </div>
            );
          })}
        </Reveal>

        {/* Module cards */}
        <Reveal>
          <ModulePreviews />
        </Reveal>

        {/* Close-CTA row with summary numbers */}
        <div className={styles.modFoot}>
          <div className={styles.modFootStats}>
            <div>
              <span className={styles.modFootV}>{modules.length}</span>
              <span className={styles.modFootL}>modules</span>
            </div>
            <span className={styles.modFootDivider} aria-hidden />
            <div>
              <span className={styles.modFootV}>
                {modules.reduce((n, m) => n + m.features.length, 0)}+
              </span>
              <span className={styles.modFootL}>features in total</span>
            </div>
            <span className={styles.modFootDivider} aria-hidden />
            <div>
              <span className={styles.modFootV}>1</span>
              <span className={styles.modFootL}>employee master</span>
            </div>
          </div>
          <Link href="/modules" className="btn btn-orange">
            Browse every module
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* ============================================================
          §05 REPORTS & DASHBOARDS (summary card, no interactive demo)
          ============================================================ */}
      <Section
        id="s-reports"
        eyebrow="Section 05"
        title="Reports & dashboards"
        lead="Every screen you work on has a matching report you can print. Dashboards use the same records — nothing worked out separately in Excel."
      >
        {/* Type legend — 3 report categories */}
        <Reveal stagger className={styles.reportTypes}>
          {[
            { icon: "chart"  as const, name: "Dashboards", detail: "Interactive live views for leadership" },
            { icon: "grid"   as const, name: "Registers",  detail: "Printable monthly and audit registers" },
            { icon: "layers" as const, name: "Analytics",  detail: "Cross-cut analysis over history" },
          ].map((t) => (
            <div key={t.name} className={styles.reportType}>
              <span className={styles.reportTypeIcon} aria-hidden>
                <Icon name={t.icon} size={20} />
              </span>
              <div>
                <span className={styles.reportTypeName}>{t.name}</span>
                <span className={styles.reportTypeDetail}>{t.detail}</span>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal stagger className={styles.reportsGrid}>
          {[
            { type: "Dashboard", tag: "Budget",     name: "Headcount vs Budget",           detail: "Section-wise budgeted vs actual headcount and salary, with rolling-window variance.",
              bars: [62, 74, 58, 82, 71], highlights: ["Variance drill-down", "Section-level split", "Export to Excel"] },
            { type: "Dashboard", tag: "People",     name: "Workforce Overview",            detail: "Joiners, terminations, on-leave and status counts at a glance.",
              bars: [54, 68, 60, 78, 66], highlights: ["Join & term chart", "Live leave list", "Filter by dept"] },
            { type: "Dashboard", tag: "Attendance", name: "Executive Attendance Digest",   detail: "Leadership snapshot with department and shift drill-down.",
              bars: [70, 78, 72, 84, 88], highlights: ["Present / absent split", "Dept drill-down", "Shift-wise view"] },
            { type: "Analytics", tag: "Payroll",    name: "Payroll & Wages Analytics",     detail: "Analytical view across streams, departments and cost centres.",
              bars: [40, 55, 66, 71, 82], highlights: ["Staff · Wages · Comp", "Cost-centre view", "Trend lines"] },
            { type: "Register",  tag: "Overtime",   name: "OT Compliance Register",        detail: "OT hours vs budget by department in a regulator-friendly format.",
              bars: [58, 44, 62, 74, 66], highlights: ["Regulator-friendly", "Budget vs actual", "Printable"] },
            { type: "Live",      tag: "Shift",      name: "Live Shift Board",              detail: "Present / absent / on-leave by department and shift, refreshed live.",
              bars: [80, 84, 76, 88, 90], highlights: ["Live refresh", "Shift & dept view", "Attendance %"] },
          ].map((r) => (
            <div key={r.name} className={styles.reportCard}>
              <div className={styles.reportHead}>
                <div className={styles.reportTags}>
                  <span className={styles.reportType_}>{r.type}</span>
                  <span className={styles.reportTag}>{r.tag}</span>
                </div>
                <div className={styles.reportSpark} aria-hidden>
                  {r.bars.map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <h4 className={styles.reportName}>{r.name}</h4>
              <p className={styles.reportDetail}>{r.detail}</p>
              <ul className={styles.reportHighlights}>
                {r.highlights.map((h) => (
                  <li key={h}>
                    <span className={styles.reportDot} aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        {/* Foot strip — 60+ reports summary */}
        <div className={styles.reportFoot}>
          <div>
            <span className={styles.reportFootV}>60+</span>
            <span className={styles.reportFootL}>reports and registers &mdash; the six above are a sample</span>
          </div>
          <span className={styles.reportFootNote}>
            <span className={styles.reportFootDiamond} aria-hidden />
            Every report is built on the same tables as operations &mdash; numbers on screen match numbers on paper.
          </span>
        </div>
      </Section>

      {/* ============================================================
          §06 CONNECTIONS
          ============================================================ */}
      <Section
        id="s-integrations"
        alt
        eyebrow="Section 06"
        title="Connections to other systems"
        lead="Connects to the tools an HR team already relies on — devices, email, banks, general ledger and Excel."
      >
        <Reveal stagger className={`grid grid-3 ${styles.intGrid}`}>
          {integrations.map((c) => (
            <div key={c.name} className={`card card-hover ${styles.intCard}`}>
              <span className={styles.intTag}>{c.tag}</span>
              <h4 className={styles.intTitle}>{c.name}</h4>
              <p className={styles.intDetail}>{c.detail}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ============================================================
          §07 WHAT RUNS WHERE
          ============================================================ */}
      <Section
        id="s-deployment"
        eyebrow="Section 07"
        title="What runs where"
        lead="Standard Windows Server + SQL Server infrastructure; lightweight desktop clients kept current by an auto-updater."
      >
        {/* Stack diagram — Client → Network → Server */}
        <Reveal className={styles.stackDiagram}>
          {[
            { icon: "grid"   as const, name: "Client",  detail: "Windows 10 / 11 desktop app" },
            { icon: "layers" as const, name: "Network", detail: "TCP 1433 · SMTP · shared folder" },
            { icon: "shield" as const, name: "Server",  detail: "Windows Server + SQL Server" },
          ].map((n, i, arr) => (
            <span key={n.name} className={styles.stackNode}>
              <span className={styles.stackNodeIcon} aria-hidden>
                <Icon name={n.icon} size={22} />
              </span>
              <span className={styles.stackNodeBody}>
                <span className={styles.stackNodeName}>{n.name}</span>
                <span className={styles.stackNodeDetail}>{n.detail}</span>
              </span>
              {i < arr.length - 1 && (
                <span className={styles.stackArrow} aria-hidden>→</span>
              )}
            </span>
          ))}
        </Reveal>

        {/* Cards with spec chips */}
        <Reveal stagger className={styles.depGrid}>
          {deployment.map((d, i) => {
            const specs: Record<string, string[]> = {
              Server:   ["Windows Server 2016+", "SQL Server 2016+", "Live + Test catalogues", "Auto-backup"],
              Client:   ["Windows 10 / 11", ".NET 4.5+", "Auto-updater", "No per-user install"],
              Network:  ["TCP 1433 (LAN / VPN)", "SMTP relay", "Server-side scheduler", "Shared-folder ingest"],
              Optional: ["ASP.NET MVC · IIS", "Same SQL back-end", "Chart.js offline", "No CDN calls"],
            };
            const icons: Record<string, "shield" | "grid" | "layers" | "chart"> = {
              Server: "shield", Client: "grid", Network: "layers", Optional: "chart",
            };
            return (
              <div key={d.name} className={styles.depCard}>
                <div className={styles.depCardHead}>
                  <span className={styles.depCardNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.depCardIcon} aria-hidden>
                    <Icon name={icons[d.tag] ?? "layers"} size={22} />
                  </span>
                  <div>
                    <span className={styles.depCardTag}>{d.tag}</span>
                    <h4 className={styles.depCardTitle}>{d.name}</h4>
                  </div>
                </div>
                <p className={styles.depCardDetail}>{d.detail}</p>
                <ul className={styles.depSpecList}>
                  {(specs[d.tag] ?? []).map((s) => (
                    <li key={s}>
                      <span className={styles.depSpecDot} aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Reveal>
      </Section>

      {/* ============================================================
          EXTRA — ADDITIONAL MODULES & FEATURES
          ============================================================ */}
      <Section
        id="s-additional"
        alt
        eyebrow="Additional"
        title="Additional modules & features"
        lead="Four extra pieces that ship in the full HR suite and work alongside the core modules."
      >
        {/* Top navigator — 4 anchor pills for scanning */}
        <Reveal stagger className={styles.exNav}>
          {[
            { id: "ex-wages",      icon: "wallet" as const, kind: "Module",  title: additional.wages.title,      meta: `${additional.wages.features.length} features`      },
            { id: "ex-compliance", icon: "shield" as const, kind: "Module",  title: additional.compliance.title, meta: `${additional.compliance.features.length} features` },
            { id: "ex-approvals",  icon: "workflow" as const, kind: "Feature",title: additional.approvals.title,  meta: `${additional.approvals.chains.length} chains`      },
            { id: "ex-alerts",     icon: "mail"   as const, kind: "Feature", title: additional.alerts.title,     meta: `${additional.alerts.categories.length} categories` },
          ].map((n, i) => (
            <a key={n.id} href={`#${n.id}`} className={styles.exNavItem}>
              <span className={styles.exNavNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.exNavIcon} aria-hidden>
                <Icon name={n.icon} size={18} />
              </span>
              <span className={styles.exNavBody}>
                <span className={styles.exNavKind}>{n.kind}</span>
                <span className={styles.exNavTitle}>{n.title}</span>
                <span className={styles.exNavMeta}>{n.meta}</span>
              </span>
            </a>
          ))}
        </Reveal>

        {/* Wages */}
        <Reveal className={styles.extraCard} id="ex-wages">
          <div className={styles.extraHeadRich}>
            <span className={`${styles.extraIcon} ${styles.extraIconModule}`} aria-hidden>
              <Icon name="wallet" size={22} />
            </span>
            <div className={styles.extraHeadBody}>
              <span className={`${styles.extraTag} ${styles.tagModule}`}>{additional.wages.tag}</span>
              <h3 className={styles.extraTitle}>{additional.wages.title}</h3>
              <p className={styles.extraSummary}>{additional.wages.summary}</p>
            </div>
            <span className={styles.extraCount}>
              <b>{additional.wages.features.length}</b>
              <em>features</em>
            </span>
          </div>
          <ul className={styles.chipRow}>
            {additional.wages.features.map((f) => (
              <li key={f} className="chip">{f}</li>
            ))}
          </ul>
        </Reveal>

        {/* Compliance */}
        <Reveal className={styles.extraCard} id="ex-compliance">
          <div className={styles.extraHeadRich}>
            <span className={`${styles.extraIcon} ${styles.extraIconModule}`} aria-hidden>
              <Icon name="shield" size={22} />
            </span>
            <div className={styles.extraHeadBody}>
              <span className={`${styles.extraTag} ${styles.tagModule}`}>{additional.compliance.tag}</span>
              <h3 className={styles.extraTitle}>{additional.compliance.title}</h3>
              <p className={styles.extraSummary}>{additional.compliance.summary}</p>
            </div>
            <span className={styles.extraCount}>
              <b>{additional.compliance.features.length}</b>
              <em>features</em>
            </span>
          </div>
          <ul className={styles.chipRow}>
            {additional.compliance.features.map((f) => (
              <li key={f} className="chip">{f}</li>
            ))}
          </ul>
        </Reveal>

        {/* Approvals — dynamic chains */}
        <Reveal className={styles.extraCard} id="ex-approvals">
          <div className={styles.extraHeadRich}>
            <span className={`${styles.extraIcon} ${styles.extraIconFeature}`} aria-hidden>
              <Icon name="workflow" size={22} />
            </span>
            <div className={styles.extraHeadBody}>
              <span className={`${styles.extraTag} ${styles.tagFeature}`}>{additional.approvals.tag}</span>
              <h3 className={styles.extraTitle}>{additional.approvals.title}</h3>
              <p className={styles.extraSummary}>{additional.approvals.summary}</p>
            </div>
            <span className={`${styles.extraCount} ${styles.extraCountAccent}`}>
              <b>{additional.approvals.chains.length}</b>
              <em>chains</em>
            </span>
          </div>

          <div className={styles.chainsList}>
            {additional.approvals.chains.map((c) => (
              <div key={c.name} className={styles.chainBlock}>
                <div className={styles.chainHead}>
                  <span className={styles.chainName}>{c.name} chain</span>
                  <span className={styles.chainCount}>
                    {c.steps.length} step{c.steps.length === 1 ? "" : "s"}
                  </span>
                </div>

                <ol className={styles.chainSteps}>
                  {c.steps.map((s, i) => (
                    <li key={s}>
                      <span className={styles.chainStepNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.chainStepLbl}>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <p className={styles.chainsNote}>
            <span className={styles.chainsNoteDiamond} aria-hidden />
            Any form in the suite can be wired to any of these chains &mdash; no code change required.
          </p>
        </Reveal>

        {/* Alerts */}
        <Reveal className={styles.extraCard} id="ex-alerts">
          <div className={styles.extraHeadRich}>
            <span className={`${styles.extraIcon} ${styles.extraIconFeature}`} aria-hidden>
              <Icon name="mail" size={22} />
            </span>
            <div className={styles.extraHeadBody}>
              <span className={`${styles.extraTag} ${styles.tagFeature}`}>{additional.alerts.tag}</span>
              <h3 className={styles.extraTitle}>{additional.alerts.title}</h3>
              <p className={styles.extraSummary}>{additional.alerts.summary}</p>
            </div>
            <span className={`${styles.extraCount} ${styles.extraCountAccent}`}>
              <b>{additional.alerts.categories.length}</b>
              <em>categories</em>
            </span>
          </div>
          <div className={styles.alertsGrid}>
            {additional.alerts.categories.map((a) => (
              <div key={a.name} className={styles.alertCard}>
                <span className={styles.alertDot} aria-hidden />
                <div>
                  <b>{a.name}</b>
                  <em>{a.detail}</em>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Explore-modules CTA after Additional */}
        <Reveal className={styles.exploreCta}>
          <div className={styles.exploreCtaCopy}>
            <span className={styles.exploreCtaKicker}>Ready to dive deeper?</span>
            <h3 className={styles.exploreCtaTitle}>
              Explore the modules
            </h3>
            <p className={styles.exploreCtaLede}>
              Open the modules index to browse every module &mdash; grouped by
              People, Time, Money, and Insight &amp; Compliance &mdash; and drill
              into feature breakdowns.
            </p>
          </div>
          <Link href="/modules" className="btn btn-orange">
            Explore modules
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </Section>

    </>
  );
}

/* Hero preview — cleaner product-dashboard mockup */
function HeroPreview() {
  const bars = [58, 74, 62, 88, 71, 92, 84];
  const labels = ["S1", "S2", "S3", "S4", "S5", "S6", "S7"];
  return (
    <div className={styles.preview}>
      {/* Top bar / window chrome */}
      <div className={styles.pvBar}>
        <span className={styles.pvDot} />
        <span className={styles.pvDot} />
        <span className={styles.pvDot} />
        <span className={styles.pvBarTitle}>hr-module · Dashboard</span>
      </div>

      <div className={styles.pvBody}>
        {/* KPI row */}
        <div className={styles.pvKpis}>
          <div className={styles.pvKpi}>
            <span className={styles.pvKpiLbl}>Employees</span>
            <span className={styles.pvKpiVal}>6,842</span>
            <span className={styles.pvKpiTrend}>+112 · trend</span>
          </div>
          <div className={styles.pvKpi}>
            <span className={styles.pvKpiLbl}>Attendance</span>
            <span className={styles.pvKpiVal}>91.8%</span>
            <span className={styles.pvKpiTrend}>6,281 present</span>
          </div>
          <div className={styles.pvKpi}>
            <span className={styles.pvKpiLbl}>Payroll</span>
            <span className={styles.pvKpiVal}>PKR 214M</span>
            <span className={styles.pvKpiTrend}>posted</span>
          </div>
        </div>

        {/* Chart card */}
        <div className={styles.pvChart}>
          <div className={styles.pvChartHead}>
            <span className={styles.pvChartTitle}>Attendance · by section</span>
            <span className={styles.pvChartMeta}>% present</span>
          </div>
          <div className={styles.pvBars}>
            {bars.map((h, i) => (
              <div key={i} className={styles.pvBarCol}>
                <span className={styles.pvBarFill} style={{ height: `${h}%` }} />
                <em>{labels[i]}</em>
              </div>
            ))}
          </div>
        </div>

        {/* Activity row */}
        <div className={styles.pvActivity}>
          <span className={styles.pvActDot} />
          <div>
            <b>OT request approved</b>
            <em>Section A · Department · EMP-####</em>
          </div>
          <span className={styles.pvActTag}>Live</span>
        </div>
      </div>
    </div>
  );
}
