import Link from "next/link";
import Icon from "./Icon";
import { modules } from "@/lib/data";
import styles from "./ModulePreviews.module.css";

/**
 * Shows all 9 sub-modules with a mini in-product preview
 * (a plausible screenshot-esque widget) so the home page carries
 * real product texture rather than only descriptions.
 */
export default function ModulePreviews() {
  return (
    <div className={styles.grid}>
      {modules.map((m, i) => {
        return (
          <article
            key={m.slug}
            className={styles.card}
          >
            <div className={styles.head}>
              <span className={styles.iconWrap} aria-hidden>
                <Icon name={m.icon} size={20} />
              </span>
              <div>
                <div className={styles.moduleNum}>
                  M{String(i + 1).padStart(2, "0")}
                </div>
                <div className={styles.name}>{m.name}</div>
              </div>
              <span className={styles.count}>
                {m.features.length}
                <em>features</em>
              </span>
            </div>

            <p className={styles.tag}>{m.tagline}</p>

            <div className={styles.preview}>{renderPreview(m.slug)}</div>

            <Link href={`/modules/${m.slug}`} className={styles.link}>
              Open module
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function renderPreview(slug: string) {
  switch (slug) {
    case "employee-lifecycle":
      return <EmployeeCard />;
    case "attendance":
      return <AttendanceMini />;
    case "payroll":
      return <PayslipMini />;
    case "leaves":
      return <LeavesMini />;
    case "overtime":
      return <OvertimeMini />;
    case "loans":
      return <LoanMini />;
    case "transport":
      return <TransportMini />;
    case "reports":
      return <ReportsMini />;
    case "compliance":
      return <ComplianceMini />;
    default:
      return null;
  }
}

/* -------- Mini preview widgets -------- */

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLbl}>{label}</span>
      <span className={`${styles.rowVal} ${mono ? styles.mono : ""}`}>{value}</span>
    </div>
  );
}

function EmployeeCard() {
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <span className={styles.miniAvatar}>##</span>
        <div>
          <div className={styles.miniTitle}>Employee record</div>
          <div className={styles.miniMeta}>EMP-#### · Department · Grade #</div>
        </div>
        <span className={`${styles.miniPill} ${styles.pOk}`}>Active</span>
      </div>
      <Row label="Joining" value="DD-MMM-YYYY" mono />
      <Row label="Contract" value="Permanent" />
      <Row label="Shift" value="Shift A · 07:00–15:30" />
    </div>
  );
}

function AttendanceMini() {
  const bars = [70, 84, 62, 78, 88, 72, 90];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <div className={styles.miniTitle}>Today · Present</div>
        <span className={styles.miniPct}>91.8%</span>
      </div>
      <div className={styles.attBars}>
        {bars.map((h, i) => (
          <div key={i} className={styles.attCol}>
            <span style={{ height: `${h}%` }} />
            <em>{days[i]}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function PayslipMini() {
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <div>
          <div className={styles.miniTitle}>Pay-slip · sample</div>
          <div className={styles.miniMeta}>EMP-####</div>
        </div>
        <span className={`${styles.miniPill} ${styles.pLock}`}>Locked</span>
      </div>
      <Row label="Basic" value="82,000" mono />
      <Row label="OT · 22h" value="9,240" mono />
      <Row label="Tax + EOBI" value="-14,120" mono />
      <div className={styles.miniFoot}>
        <span>Net paid</span>
        <strong className={styles.mono}>PKR 113,120</strong>
      </div>
    </div>
  );
}

function LeavesMini() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const kind = (i: number) =>
    [4, 11, 18].includes(i) ? "pl" : [7, 21].includes(i) ? "sl" : [14].includes(i) ? "cl" : "";
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <div className={styles.miniTitle}>Leaves · Sept</div>
        <span className={styles.miniMetaR}>PL 8 · SL 4 · CL 2</span>
      </div>
      <div className={styles.calGrid}>
        {days.map((d) => {
          const k = kind(d);
          return (
            <span
              key={d}
              className={`${styles.calCell} ${k ? styles["cal_" + k] : ""}`}
            />
          );
        })}
      </div>
      <div className={styles.calLegend}>
        <em className={styles.cal_pl} /> PL
        <em className={styles.cal_sl} /> SL
        <em className={styles.cal_cl} /> CL
      </div>
    </div>
  );
}

function OvertimeMini() {
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <div className={styles.miniTitle}>OT Approval Queue</div>
        <span className={`${styles.miniPill} ${styles.pWarn}`}>3 pending</span>
      </div>
      <ul className={styles.otList}>
        <li>
          <span className={styles.otAvatar}>##</span>
          <span className={styles.otBody}>
            <b>Section A · 12h</b><em>Department · EMP-####</em>
          </span>
          <span className={styles.otBtn}>Approve</span>
        </li>
        <li>
          <span className={styles.otAvatar}>##</span>
          <span className={styles.otBody}>
            <b>Section B · 8h</b><em>Department · EMP-####</em>
          </span>
          <span className={styles.otBtn}>Approve</span>
        </li>
      </ul>
    </div>
  );
}

function LoanMini() {
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <div className={styles.miniTitle}>Employee Loan · L-4218</div>
        <span className={styles.miniPct}>68%</span>
      </div>
      <Row label="Principal" value="120,000" mono />
      <Row label="Instalment" value="10,000 × 12" mono />
      <div className={styles.loanBar}>
        <span style={{ width: "68%" }} />
      </div>
      <div className={styles.loanMeta}>
        <span>Paid <b className={styles.mono}>81,600</b></span>
        <span>Balance <b className={styles.mono}>38,400</b></span>
      </div>
    </div>
  );
}

function TransportMini() {
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <div>
          <div className={styles.miniTitle}>Route ## · Sample</div>
          <div className={styles.miniMeta}>Bus ####-#### · ## seats</div>
        </div>
        <span className={`${styles.miniPill} ${styles.pOk}`}>On-time</span>
      </div>
      <ol className={styles.routeList}>
        <li><span className={styles.routeDot} /> 06:45 · Stop 1</li>
        <li><span className={styles.routeDot} /> 06:58 · Stop 2</li>
        <li><span className={`${styles.routeDot} ${styles.routeDotNow}`} /> 07:12 · Stop 3</li>
        <li><span className={styles.routeDot} /> 07:30 · Factory Gate</li>
      </ol>
    </div>
  );
}

function ReportsMini() {
  const vals = [42, 58, 51, 67, 74, 61, 78, 82];
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <div className={styles.miniTitle}>Head-count vs Budget</div>
        <span className={styles.miniMetaR}>Aug 2026</span>
      </div>
      <div className={styles.reportBars}>
        {vals.map((v, i) => (
          <span key={i} style={{ height: `${v}%` }} />
        ))}
      </div>
      <div className={styles.reportFoot}>
        <span>Actual <b>6,842</b></span>
        <span>Budget <b>7,100</b></span>
        <span className={styles.varOk}>-3.6%</span>
      </div>
    </div>
  );
}

function ComplianceMini() {
  return (
    <div className={styles.miniPanel}>
      <div className={styles.miniHead}>
        <div className={styles.miniTitle}>EOBI Contribution</div>
        <span className={`${styles.miniPill} ${styles.pOk}`}>Filed</span>
      </div>
      <Row label="Period" value="Jul 2026" mono />
      <Row label="Employees" value="6,842" mono />
      <Row label="Employer" value="1,368,400" mono />
      <Row label="Employee" value="205,260" mono />
      <div className={styles.miniFoot}>
        <span>Total remitted</span>
        <strong className={styles.mono}>PKR 1.57M</strong>
      </div>
    </div>
  );
}
