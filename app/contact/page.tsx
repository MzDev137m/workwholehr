import Icon from "@/components/Icon";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Pager from "@/components/Pager";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact — Workwhole HR",
  description: "Book a live walkthrough or ask a question.",
};

const STEPS = [
  { n: "01", t: "Kick-off call",     d: "We learn your setup, headcount and payroll streams." },
  { n: "02", t: "Custom demo",       d: "Loaded with your profile so the numbers feel real." },
  { n: "03", t: "Trial or PoC",      d: "Free sandbox for your team to try end-to-end." },
  { n: "04", t: "Contract & go-live",d: "Signed plan with milestones and a success owner." },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.pageHero}>
        <div className="container page-fade">
          <span className={styles.heroKicker}>Contact sales</span>
          <h1 className={styles.heroTitle}>Let&apos;s see if we&apos;re a fit.</h1>
          <span className="orange-rule" />
          <p className={styles.heroLede}>
            Tell us your headcount, payroll streams and the biggest HR headache
            you&apos;re trying to solve. We&apos;ll come to the call with a demo
            tenant already loaded with a matching profile.
          </p>
        </div>
      </section>

      {/* FORM + SIDE PANEL */}
      <Section alt>
        <Reveal className={styles.wrap}>
          <form className={styles.form} action="mailto:sales@hr-module.local" method="post">
            <div className={styles.formHead}>
              <span className={styles.formKicker}>Request a demo</span>
              <h2 className={styles.formTitle}>Send us a quick brief</h2>
              <span className="orange-rule" />
              <p className={styles.formLede}>
                Fields marked with a diamond are required.
                Every request is read by a human.
              </p>
            </div>

            <div className={styles.row}>
              <label className="form-field">
                <span>Full name<em className={styles.req} /></span>
                <input type="text" name="name" required placeholder="Jane Doe" />
              </label>
              <label className="form-field">
                <span>Work email<em className={styles.req} /></span>
                <input type="email" name="email" required placeholder="jane@company.com" />
              </label>
            </div>
            <div className={styles.row}>
              <label className="form-field">
                <span>Company<em className={styles.req} /></span>
                <input type="text" name="company" required placeholder="Acme Manufacturing" />
              </label>
              <label className="form-field">
                <span>Headcount<em className={styles.req} /></span>
                <select name="headcount" required defaultValue="">
                  <option value="" disabled>Select…</option>
                  <option>Under 250</option>
                  <option>250 – 1,000</option>
                  <option>1,000 – 5,000</option>
                  <option>5,000+</option>
                </select>
              </label>
            </div>
            <div className={styles.row}>
              <label className="form-field">
                <span>Country</span>
                <input type="text" name="country" placeholder="Pakistan" />
              </label>
              <label className="form-field">
                <span>Phone (optional)</span>
                <input type="tel" name="phone" placeholder="+92 300 000 0000" />
              </label>
            </div>
            <label className={`form-field ${styles.full}`}>
              <span>What are you hoping to solve first?</span>
              <textarea
                name="message"
                rows={5}
                placeholder="e.g. Payroll cycle is too slow, biometric data doesn't reconcile, statutory registers are manual…"
              />
            </label>

            <label className={styles.consent}>
              <input type="checkbox" name="consent" defaultChecked />
              <span>I agree that Workwhole HR may contact me about this request. Your details are never shared.</span>
            </label>

            <div className={styles.submitRow}>
              <button type="submit" className="btn btn-orange">
                Send message
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="reset" className="btn btn-outline-navy">Clear form</button>
            </div>
          </form>

          <aside className={styles.side}>
            <div className={styles.sideCard}>
              <div className={styles.sideKicker}>What happens next</div>
              <h3 className={styles.sideTitle}>From first email to go-live</h3>
              <span className="orange-rule" />
              <ol className={styles.stepsList}>
                {STEPS.map((s) => (
                  <li key={s.n}>
                    <span className={styles.stepNum}>{s.n}</span>
                    <div>
                      <b>{s.t}</b>
                      <em>{s.d}</em>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.replyCard}>
              <span className={styles.replyIcon} aria-hidden>
                <Icon name="check" size={18} />
              </span>
              <div>
                <b>Every request is read by a human.</b>
                <em>Not routed through a queue &mdash; a real HR-suite consultant reviews it.</em>
              </div>
            </div>
          </aside>
        </Reveal>
      </Section>

      <Pager currentHref="/contact" />
    </>
  );
}
