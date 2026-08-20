import Link from "next/link";
import Icon from "./Icon";
import styles from "./SiteFooter.module.css";

const PRODUCT = [
  { href: "/",              label: "Overview" },
  { href: "/modules",       label: "All modules" },
  { href: "/#s-how",        label: "How it works" },
  { href: "/#s-reports",    label: "Reports & dashboards" },
  { href: "/#s-additional", label: "Additional features" },
];

const MODULES_LINKS = [
  { href: "/modules/employee-lifecycle", label: "Employee Lifecycle" },
  { href: "/modules/attendance",         label: "Attendance & Shift" },
  { href: "/modules/payroll",            label: "Payroll & Salary" },
  { href: "/modules/leaves",             label: "Leaves & Holidays" },
  { href: "/modules/overtime",           label: "Overtime" },
  { href: "/modules/compliance",         label: "Compliance" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container-fluid ${styles.inner}`}>

        {/* Brand + blurb + socials */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand}>
            <span className={styles.mark} aria-hidden>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <span className={styles.wordmark}>
              <span className={styles.wordmarkTop}>WORKWHOLE HR</span>
              <span className={styles.wordmarkBottom}>Your enterprise HR partner</span>
            </span>
          </Link>
          <p className={styles.blurb}>
            One integrated HR system for the complete employee journey &mdash;
            hiring to final settlement, with payroll, leave, overtime and
            compliance built in.
          </p>
          <div className={styles.socialRow}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} className={styles.socialLink} aria-label={s.label}>
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div className={styles.linksCol}>
          <div className={styles.colTitle}>Product</div>
          <ul className={styles.linkList}>
            {PRODUCT.map((l) => (
              <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Modules */}
        <div className={styles.linksCol}>
          <div className={styles.colTitle}>Modules</div>
          <ul className={styles.linkList}>
            {MODULES_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Get in touch */}
        <div className={styles.contactCol}>
          <div className={styles.colTitle}>Get in touch</div>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden><Icon name="mapPin" size={16} /></span>
              <address className={styles.addr}>
                Software Technology Park<br />Karachi, Pakistan
              </address>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden><Icon name="phone" size={16} /></span>
              <a href="tel:+92-21-000-0000" className={styles.contactLink}>+92-21-000-0000</a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden><Icon name="mail" size={16} /></span>
              <a href="mailto:sales@hr-module.local" className={styles.contactLink}>sales@hr-module.local</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`container-fluid ${styles.bottomInner}`}>
          <span className={styles.copy}>&copy; {year} Workwhole HR. All rights reserved.</span>
          <span className={styles.credit}>
            Developed by{" "}
            <a
              href="https://mzdev137.vercel.app"
              className={styles.creditLink}
              target="_blank"
              rel="noreferrer"
            >
              MZ Corporation
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5A2.5 2.5 0 1 1 4.98 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.65 4.77 6.1V21H18.4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 7.3s-.24-1.66-.97-2.4c-.93-.98-1.98-.98-2.46-1.04C16.7 3.5 12 3.5 12 3.5s-4.7 0-8.07.36c-.48.06-1.53.06-2.46 1.04C.74 5.64.5 7.3.5 7.3S.24 9.24.24 11.19v1.62c0 1.95.26 3.89.26 3.89s.24 1.66.97 2.4c.93.98 2.14.95 2.69 1.05C6.14 20.5 12 20.5 12 20.5s4.7 0 8.07-.36c.48-.06 1.53-.06 2.46-1.04.73-.74.97-2.4.97-2.4s.26-1.94.26-3.89v-1.62c0-1.95-.26-3.9-.26-3.9zM9.5 15.4V8.6l6.2 3.4-6.2 3.4z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 3 17l-1.5 5.5L7 21a11 11 0 0 0 13.5-17.5z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13 22v-8h3l.5-4H13V7.6c0-1.15.32-1.93 1.97-1.93H17V2.13A28 28 0 0 0 14.13 2C11.28 2 9.4 3.66 9.4 6.7v3.3H6.5v4h2.9v8z"/>
      </svg>
    ),
  },
];
