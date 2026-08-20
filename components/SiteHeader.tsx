"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { modules, additional } from "@/lib/data";
import styles from "./SiteHeader.module.css";

type NavItem = {
  href: string;
  label: string;
  icon: "home" | "layers" | "grid" | "mail" | "bolt";
  submenu?: { href: string; label: string; icon: string }[];
};

/* Additional items — dynamically fed from the `additional` data block */
const ADDITIONAL_ICONS: Record<string, string> = {
  wages: "wallet",
  compliance: "shield",
  approvals: "workflow",
  alerts: "mail",
};

const HOME_SECTIONS = [
  { href: "/#s-exec",         label: "01 · Executive Summary",       icon: "layers"    },
  { href: "/#s-why",          label: "02 · Why This System",         icon: "spark"     },
  { href: "/#s-how",          label: "03 · How It Works",            icon: "workflow"  },
  { href: "/#s-modules",      label: "04 · What Each Module Does",   icon: "grid"      },
  { href: "/#s-reports",      label: "05 · Reports & Dashboards",    icon: "chart"     },
  { href: "/#s-integrations", label: "06 · Connections",             icon: "layers"    },
  { href: "/#s-deployment",   label: "07 · What Runs Where",         icon: "shield"    },
  { href: "/#s-additional",   label: "Additional Modules & Features",icon: "bolt"      },
];

const SECTION_IDS = HOME_SECTIONS.map((s) => s.href.replace("/#", ""));

const ADDITIONAL_SUBMENU = (
  Object.keys(additional) as (keyof typeof additional)[]
).map((key) => {
  const block = additional[key];
  const anchor = `ex-${key}`;
  return {
    href:  `/#${anchor}`,
    label: block.title,
    icon:  ADDITIONAL_ICONS[key] ?? "bolt",
  };
});

const NAV: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  {
    href: "/#s-exec",
    label: "Sections",
    icon: "layers",
    submenu: HOME_SECTIONS,
  },
  {
    href: "/#s-additional",
    label: "Additional",
    icon: "bolt",
    submenu: ADDITIONAL_SUBMENU,
  },
  {
    href: "/modules",
    label: "Modules",
    icon: "grid",
    submenu: modules.map((m) => ({
      href:  `/modules/${m.slug}`,
      label: m.name,
      icon:  m.icon,
    })),
  },
  { href: "/contact", label: "Contact", icon: "mail" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [mobileOpenSub, setMobileOpenSub] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  // Body scroll lock when the mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Any scroll → sticky shadow.
      // Past the hero (approx viewport height) → switch to navy theme.
      const past = y > Math.min(560, window.innerHeight * 0.7);
      setScrolled(past || y > 12);
      document.documentElement.classList.toggle("hdr-past-hero", past);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.classList.remove("hdr-past-hero");
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenSub(null);
    setActiveSection(null);
  }, [pathname]);

  // Scroll-spy: track which section is in view (home page only).
  // Position-based so scrolling back up to the hero clears the highlight.
  useEffect(() => {
    if (pathname !== "/") return;

    const findActive = () => {
      const nodes = SECTION_IDS
        .map((id) => document.getElementById(id))
        .filter((n): n is HTMLElement => Boolean(n));
      if (!nodes.length) return;

      // Trigger line: 30% down from the top of the viewport.
      const line = window.scrollY + window.innerHeight * 0.3;

      // Active = last section whose top has crossed the trigger line.
      // If none crossed yet (still on hero / feature strip), active = null.
      let active: string | null = null;
      for (const n of nodes) {
        const top = n.getBoundingClientRect().top + window.scrollY;
        if (top <= line) active = n.id;
        else break;
      }
      setActiveSection(active);
    };

    findActive();
    window.addEventListener("scroll", findActive, { passive: true });
    window.addEventListener("resize", findActive);
    return () => {
      window.removeEventListener("scroll", findActive);
      window.removeEventListener("resize", findActive);
    };
  }, [pathname]);

  const isRouteActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isNavActive = (n: NavItem) => {
    // Additional — active when the additional section is scrolled into view
    if (n.label === "Additional") {
      return pathname === "/" && activeSection === "s-additional";
    }
    // Sections — active for any home section EXCEPT the additional one
    if (n.label === "Sections") {
      return pathname === "/" && !!activeSection && activeSection !== "s-additional";
    }
    // Home — only active when on home AND no section is in view
    if (n.href === "/") {
      return pathname === "/" && !activeSection;
    }
    return isRouteActive(n.href);
  };

  const isSubItemActive = (href: string) =>
    !!activeSection && href === `/#${activeSection}`;

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.open : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Workwhole HR home">
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

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((n) => {
            const hasSub = !!n.submenu?.length;
            const active = isNavActive(n);
            return (
              <div
                key={n.href}
                className={styles.navItem}
                onMouseEnter={() => hasSub && setOpenSub(n.href)}
                onMouseLeave={() => hasSub && setOpenSub(null)}
              >
                <Link
                  href={n.href}
                  className={`${styles.link} ${active ? styles.linkActive : ""}`}
                  aria-haspopup={hasSub || undefined}
                  aria-expanded={hasSub ? openSub === n.href : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    // Home while already on "/": scroll to top smoothly.
                    if (n.href === "/" && pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setOpen(false);
                    }
                  }}
                >
                  <span className={styles.linkIcon} aria-hidden>
                    <Icon name={n.icon} size={14} />
                  </span>
                  {n.label}
                  {hasSub && (
                    <svg
                      className={styles.chev}
                      width="10" height="10" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.4"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </Link>

                {hasSub && (
                  <div className={`${styles.dropdown} ${openSub === n.href ? styles.dropdownOpen : ""}`}>
                    <div className={styles.dropdownInner}>
                      <div className={styles.dropdownGrid}>
                        {n.submenu!.map((s) => {
                          const subActive = isSubItemActive(s.href);
                          return (
                            <Link
                              key={s.href}
                              href={s.href}
                              className={`${styles.dropItem} ${subActive ? styles.dropItemActive : ""}`}
                            >
                              <span className={styles.dropIcon} aria-hidden>
                                <Icon name={s.icon} size={16} />
                              </span>
                              <span className={styles.dropLabel}>{s.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                      <Link href={n.href} className={styles.dropAll}>
                        {n.href === "/" ? "Open the full page" : `View all ${n.label.toLowerCase()}`}
                        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                          <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer + backdrop */}
      <div
        className={`${styles.mobileBackdrop} ${open ? styles.mobileBackdropOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`${styles.mobileDrawer} ${open ? styles.mobileDrawerOpen : ""}`}
        aria-hidden={!open}
      >
        {/* Drawer header */}
        <div className={styles.drawerHead}>
          <Link href="/" className={styles.drawerBrand} onClick={() => setOpen(false)}>
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
          <button
            type="button"
            className={styles.drawerClose}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer nav — accordion for items with submenus */}
        <div className={styles.drawerSectionLbl}>Menu</div>
        <nav className={styles.drawerNav} aria-label="Mobile primary">
          {NAV.map((n) => {
            const hasSub = !!n.submenu?.length;
            const active = isNavActive(n);
            const subOpen = mobileOpenSub === n.href;
            return (
              <div key={n.href} className={styles.drawerGroup}>
                <div className={styles.drawerRow}>
                  <Link
                    href={n.href}
                    className={`${styles.drawerLink} ${active ? styles.linkActive : ""}`}
                    onClick={(e) => {
                      if (n.href === "/" && pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      // Close the drawer for every main-link tap
                      setOpen(false);
                    }}
                  >
                    <span className={styles.drawerLinkIcon} aria-hidden>
                      <Icon name={n.icon} size={16} />
                    </span>
                    <span className={styles.drawerLinkLabel}>{n.label}</span>
                  </Link>
                  {hasSub && (
                    <button
                      type="button"
                      className={`${styles.drawerToggle} ${subOpen ? styles.drawerToggleOpen : ""}`}
                      onClick={() => setMobileOpenSub(subOpen ? null : n.href)}
                      aria-expanded={subOpen}
                      aria-label={`Toggle ${n.label} submenu`}
                    >
                      <span className={styles.drawerCount}>{n.submenu!.length}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasSub && (
                  <div className={`${styles.drawerSubWrap} ${subOpen ? styles.drawerSubWrapOpen : ""}`}>
                    <ul className={styles.drawerSub}>
                      {n.submenu!.map((s, si) => {
                        const subActive = isSubItemActive(s.href);
                        return (
                          <li key={s.href} style={{ "--i": si } as React.CSSProperties}>
                            <Link
                              href={s.href}
                              className={`${styles.drawerSubLink} ${subActive ? styles.linkActive : ""}`}
                              onClick={() => setOpen(false)}
                            >
                              <span className={styles.drawerSubIcon} aria-hidden>
                                <Icon name={s.icon} size={14} />
                              </span>
                              <span>{s.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Contact block above CTA */}
        <div className={styles.drawerContact}>
          <div className={styles.drawerSectionLbl}>Get in touch</div>
          <ul className={styles.drawerContactList}>
            <li>
              <span className={styles.drawerContactIcon} aria-hidden><Icon name="mapPin" size={14} /></span>
              <span>Software Technology Park, Karachi</span>
            </li>
            <li>
              <span className={styles.drawerContactIcon} aria-hidden><Icon name="phone" size={14} /></span>
              <a href="tel:+92-21-000-0000">+92-21-000-0000</a>
            </li>
            <li>
              <span className={styles.drawerContactIcon} aria-hidden><Icon name="mail" size={14} /></span>
              <a href="mailto:sales@hr-module.local">sales@hr-module.local</a>
            </li>
          </ul>
        </div>

        {/* Drawer footer CTA */}
        <div className={styles.drawerFoot}>
          <Link href="/contact" className="btn btn-orange" onClick={() => setOpen(false)}>
            Request a demo
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </aside>
    </header>
  );
}
