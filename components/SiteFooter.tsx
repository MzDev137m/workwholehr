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
                Pakistan
              </address>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden><Icon name="phone" size={16} /></span>
              <a href="tel:+923004783996" className={styles.contactLink}>0300-4783996</a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden><Icon name="mail" size={16} /></span>
              <a href="mailto:m.muzammal.dev@gmail.com" className={styles.contactLink}>m.muzammal.dev@gmail.com</a>
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
    href: "https://www.linkedin.com/in/muzammal-tariq/",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5A2.5 2.5 0 1 1 4.98 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.65 4.77 6.1V21H18.4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923004783996",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 3 17l-1.5 5.5L7 21a11 11 0 0 0 13.5-17.5z"/>
      </svg>
    ),
  },
];
