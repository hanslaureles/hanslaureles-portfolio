import CaseLayout from '../../components/CaseLayout';
import { cases } from '../../lib/cases';

export const metadata = cases.find((item) => item.slug === 'fintrack')!.metadata;

export default function Page() {
  return (
    <CaseLayout slug="fintrack" title="FinTrack App — Case Study · Hans Aaron Laureles">
      <div className="case-hero">
        <a href="index.html" className="case-back-link">
          Return to Selected Work
        </a>
        <div className="u-d-flex u-gap-8px u-mb-16px u-wrap-wrap">
          <span className="badge badge-accent">Case Study 07</span>
          <span className="badge">FinTech UI/UX</span>
          <span className="badge">Personal Finance</span>
          <span className="badge">Figma Prototype</span>
        </div>
        <h1 className="case-title" data-case="fintrack">
          FinTrack — Personal Finance &amp; Expense Flow
          <br /> <span className="serif-italic">&amp; Behavioral Budgeting Concept</span>
        </h1>
        <p className="case-lead">
          A Figma prototype that redesigns expense logging as a 2-tap flow (amount, then a suggested
          category), with gentle overspend nudges and a month-end balance curve. It is built to test
          whether fewer taps make daily logging stick.
        </p>
        <div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
          <a
            href="https://www.figma.com/community/file/1618156433373187066/laureles-fintrack-mobile-app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View Figma Community File
          </a>
          <a
            href="https://www.figma.com/proto/x7Si9om6yXdVCgXrskZfTY/Laureles_FinTrack---Mobile-App?node-id=1-1000&p=f&t=zpSjUwOxJ9v9teqQ-1&scaling=scale-down&content-scaling=fixed&page-id=16%3A4&starting-point-node-id=1%3A1000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Launch Interactive Prototype
          </a>
        </div>
        <div className="case-meta-table">
          <div className="case-meta-item">
            <div className="label">Platform</div>
            <div className="val">iOS / Android Mobile</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Discipline</div>
            <div className="val">Algorithmic UX &amp; Behavioral FinTech</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Role</div>
            <div className="val">Lead Product Architect (Solo)</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Stack</div>
            <div className="val">Figma · Auto Layout · Variables</div>
          </div>
        </div>
        <div className="case-challenge-grid">
          <div className="case-challenge-card problem">
            <div className="case-challenge-tag">
              <span>●</span> The Design Challenge
            </div>
            <p className="case-challenge-text">
              The design starts from one assumption: logging stops when it asks too much (multi-step
              forms, alarm-style alerts on small overspends, analytics that hide the one number you
              need today). The prototype is built to test that, not to prove it.
            </p>
          </div>
          <div className="case-challenge-card solution">
            <div className="case-challenge-tag">
              <span>●</span> The Architecture Solution
            </div>
            <p className="case-challenge-text">
              Designed a two-tap expense flow (amount, then one of four suggested categories),
              neutral feedback on overspends, a daily safe-to-spend number and a month-end balance
              curve, all built from Figma components and design tokens.
            </p>
          </div>
        </div>
        <div className="case-metrics-strip">
          <div className="case-metric-cell">
            <div className="case-metric-num accent-emerald">2-Tap Logging</div>
            <div className="case-metric-label">Amount, Then One of 4 Suggested Categories</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num accent-blue">No-Shame UX</div>
            <div className="case-metric-label">Neutral Feedback on Overspend, No Alarms</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num">0 Clutter</div>
            <div className="case-metric-label">Single-Ceiling Daily Velocity UX</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num">Figma Tokens</div>
            <div className="case-metric-label">Auto Layout Components &amp; Variables</div>
          </div>
        </div>
        <div className="case-banner u-mt-32px u-mb-24px">
          <picture>
            <source
              type="image/avif"
              srcSet="images/fintrack-mobile-app/fintrack-mockup-480.d086d51f.avif 480w, images/fintrack-mobile-app/fintrack-mockup-960.215104eb.avif 960w, images/fintrack-mobile-app/fintrack-mockup-1417.cef3f6c0.avif 1417w"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1240px"
            />
            <source
              type="image/webp"
              srcSet="images/fintrack-mobile-app/fintrack-mockup-480.b79afc12.webp 480w, images/fintrack-mobile-app/fintrack-mockup-960.e23087e7.webp 960w, images/fintrack-mobile-app/fintrack-mockup-1417.86873f6d.webp 1417w"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1240px"
            />
            <img
              src="images/fintrack-mobile-app/fintrack-mockup-960.e23087e7.webp"
              alt="FinTrack Mobile App Showcase"
              width="960"
              height="714"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              data-full="images/fintrack-mobile-app/fintrack-mockup-1417.86873f6d.webp"
            />
          </picture>
        </div>
        <div className="terminal-window u-m-24px-0-32px-0">
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
            </div>
            <div className="terminal-title">FINTRACK // DESIGNED EXPENSE FLOW</div>
            <div className="mono u-fs-0p75rem u-c-emerald-500">● FIGMA PROTOTYPE</div>
          </div>
          <div className="terminal-body">
            <pre>
              <span className="terminal-comment">
                # FinTrack 2-tap expense flow, as designed (a Figma prototype: nothing below is
                computed)
              </span>
              {`
`}
              <span className="terminal-prompt">[INPUT]</span>
              {`       Amount ──> 4 suggested categories, one tap to pick
`}
              <span className="terminal-prompt">[BUDGET]</span>
              {`      Screens designed around one number:
               ├─ Safe-to-spend today (monthly budget minus recurring fixed costs)
               ├─ Overspend nudge when a day runs well above the usual pace
               └─ Month-end balance curve
`}
              <span className="terminal-prompt">[TONE]</span>
              {`        Neutral feedback on overspend: no red alarms or shaming copy
`}
              <span className="terminal-success">[PROTOTYPE]</span>
              {`   Figma flow built from Auto Layout components & design tokens`}
            </pre>
          </div>
        </div>
      </div>
      <div className="case-content-layout">
        <aside className="case-sidebar">
          <div className="case-toc-title">Table of Contents</div>
          <ul className="case-toc-list">
            <li>
              <a href="#overview">01. Overview &amp; The Problem</a>
            </li>
            <li>
              <a href="#user-insights">02. Cognitive Load in Banking</a>
            </li>
            <li>
              <a href="#wireframes">03. Wireframing Progression</a>
            </li>
            <li>
              <a href="#design-craft">04. Visual Hierarchy &amp; Speed</a>
            </li>
            <li>
              <a href="#outcomes">05. Outcomes &amp; Takeaways</a>
            </li>
          </ul>
        </aside>
        <div className="case-main-narrative">
          <section id="overview" className="case-body-section">
            <div className="section-tag">// 01 · OVERVIEW &amp; PROBLEM</div>
            <h2>The Intimidation of Modern Budgeting</h2>
            <p>
              My working assumption is that people starting their first jobs give up on budgeting
              apps because logging an expense means category dropdowns, mental arithmetic and dense
              tables. FinTrack is designed to test that assumption, not to report it.
            </p>
            <div className="pull-quote">
              “Can logging an expense take just two taps: the amount, then a category?”
            </div>
            <p>
              The FinTrack screens use visual proportion instead of tables of numbers: colour-coded
              budget rings, a two-tap expense flow and category breakdowns.
            </p>
          </section>
          <section id="user-insights" className="case-body-section">
            <div className="section-tag">// 02 · DESIGN ASSUMPTIONS</div>
            <h2>Key Usability Friction Factors</h2>
            <p>
              I did not run user testing for FinTrack. The design starts from three friction points
              I took from reviewing common budgeting apps; they are assumptions the prototype is
              built to test, not research findings:
            </p>
            <div className="experience-timeline u-m-24px-0">
              <div className="experience-card">
                <h3 className="u-mb-8px">1. Manual Input Friction</h3>
                <p className="u-fs-0p95rem">
                  Every extra tap needed to log an expense (for example, picking through nested
                  categories) is one more reason to skip logging that day.
                </p>
              </div>
              <div className="experience-card">
                <h3 className="u-mb-8px">2. Lack of Contextual Safe-to-Spend Limits</h3>
                <p className="u-fs-0p95rem">
                  The question a budget should answer first is{' '}
                  <em>"How much can I safely spend today?"</em>, not what happened last month.
                </p>
              </div>
              <div className="experience-card">
                <h3 className="u-mb-8px">3. Cluttered Financial Visualizations</h3>
                <p className="u-fs-0p95rem">
                  Small line graphs on a phone screen are hard to read and rarely tell you what to
                  do next.
                </p>
              </div>
            </div>
          </section>
          <section id="wireframes" className="case-body-section">
            <div className="section-tag">// 03 · WIREFRAMES &amp; ITERATION</div>
            <h2>Simplifying Structural Workflows</h2>
            <p>
              The iterative wireframe progression below demonstrates how complex ledger screens were
              condensed into intuitive, finger-friendly mobile touch points:
            </p>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="images/fintrack-mobile-app/01-fintrack-wireframe-dashboard-390.18e7ebd0.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="images/fintrack-mobile-app/01-fintrack-wireframe-dashboard-390.14bb9855.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="images/fintrack-mobile-app/01-fintrack-wireframe-dashboard-390.14bb9855.webp"
                      alt="FinTrack Dashboard Wireframe"
                      width="390"
                      height="924"
                      loading="lazy"
                      decoding="async"
                      data-full="images/fintrack-mobile-app/01-fintrack-wireframe-dashboard-390.14bb9855.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 1.1 — Financial Dashboard Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="images/fintrack-mobile-app/01-fintrack-dashboard-430.15604dc8.avif 430w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="images/fintrack-mobile-app/01-fintrack-dashboard-430.d8f5e968.webp 430w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="images/fintrack-mobile-app/01-fintrack-dashboard-430.d8f5e968.webp"
                      alt="FinTrack Dashboard UI"
                      width="430"
                      height="1062"
                      loading="lazy"
                      decoding="async"
                      data-full="images/fintrack-mobile-app/01-fintrack-dashboard-430.d8f5e968.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 1.2 — High-Fidelity Home Dashboard</div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="images/fintrack-mobile-app/02-fintrack-wireframe-add-expense-390.52386247.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="images/fintrack-mobile-app/02-fintrack-wireframe-add-expense-390.e8c64af7.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="images/fintrack-mobile-app/02-fintrack-wireframe-add-expense-390.e8c64af7.webp"
                      alt="FinTrack Add Expense Wireframe"
                      width="390"
                      height="884"
                      loading="lazy"
                      decoding="async"
                      data-full="images/fintrack-mobile-app/02-fintrack-wireframe-add-expense-390.e8c64af7.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 2.1 — 1-Tap Expense Logging Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="images/fintrack-mobile-app/02-fintrack-add-expense-430.78c02dd4.avif 430w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="images/fintrack-mobile-app/02-fintrack-add-expense-430.7eeaa048.webp 430w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="images/fintrack-mobile-app/02-fintrack-add-expense-430.7eeaa048.webp"
                      alt="FinTrack Add Expense UI"
                      width="430"
                      height="1122"
                      loading="lazy"
                      decoding="async"
                      data-full="images/fintrack-mobile-app/02-fintrack-add-expense-430.7eeaa048.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 2.2 — Rapid Number-Pad Input Flow</div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="images/fintrack-mobile-app/03-fintrack-wireframe-transactions-430.178d9148.avif 430w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="images/fintrack-mobile-app/03-fintrack-wireframe-transactions-430.266a35ad.webp 430w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="images/fintrack-mobile-app/03-fintrack-wireframe-transactions-430.266a35ad.webp"
                      alt="Transactions Wireframe"
                      width="430"
                      height="924"
                      loading="lazy"
                      decoding="async"
                      data-full="images/fintrack-mobile-app/03-fintrack-wireframe-transactions-430.266a35ad.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 3.1 — Clean Ledger Feed Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="images/fintrack-mobile-app/03-fintrack-transactions-466.d6b708d0.avif 466w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="images/fintrack-mobile-app/03-fintrack-transactions-466.99585687.webp 466w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="images/fintrack-mobile-app/03-fintrack-transactions-466.99585687.webp"
                      alt="Transactions Feed UI"
                      width="466"
                      height="920"
                      loading="lazy"
                      decoding="async"
                      data-full="images/fintrack-mobile-app/03-fintrack-transactions-466.99585687.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 3.2 — Grouped Transaction History Feed</div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="images/fintrack-mobile-app/04-fintrack-analytics-390.337179fb.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="images/fintrack-mobile-app/04-fintrack-analytics-390.27c9ff6c.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="images/fintrack-mobile-app/04-fintrack-analytics-390.27c9ff6c.webp"
                      alt="Spending Analytics UI"
                      width="390"
                      height="1186"
                      loading="lazy"
                      decoding="async"
                      data-full="images/fintrack-mobile-app/04-fintrack-analytics-390.27c9ff6c.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 4.1 — Category Spending Analytics</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="images/fintrack-mobile-app/05-fintrack-savings-goals-390.0b356990.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="images/fintrack-mobile-app/05-fintrack-savings-goals-390.1c7cb827.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="images/fintrack-mobile-app/05-fintrack-savings-goals-390.1c7cb827.webp"
                      alt="Savings Goals UI"
                      width="390"
                      height="968"
                      loading="lazy"
                      decoding="async"
                      data-full="images/fintrack-mobile-app/05-fintrack-savings-goals-390.1c7cb827.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 4.2 — Visual Savings Goals Targets</div>
              </div>
            </div>
          </section>
          <section id="design-craft" className="case-body-section">
            <div className="section-tag">// 04 · VISUAL HIERARCHY &amp; SPEED</div>
            <h2>Glanceable Visual Feedback</h2>
            <p>
              By utilizing high-contrast typography, distinctive category iconography, and tactile
              card elevations, the FinTrack screens depict a purchase recorded in two taps, followed
              by a screen showing an updated safe-to-spend balance. The prototype computes nothing;
              the numbers are part of the design.
            </p>
          </section>
          <section id="outcomes" className="case-body-section">
            <div className="section-tag">// 05 · OUTCOMES &amp; LEARNINGS</div>
            <h2>What the Design Delivers</h2>
            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-number">2 Taps</div>
                <div className="outcome-label">
                  To Log an Expense: Amount, Then a Suggested Category
                </div>
              </div>
              <div className="outcome-card">
                <div className="outcome-number">1 Number</div>
                <div className="outcome-label">
                  A Daily Safe-to-Spend Ceiling Instead of Category Budgets
                </div>
              </div>
              <div className="outcome-card">
                <div className="outcome-number">AA</div>
                <div className="outcome-label">
                  WCAG Contrast Target for Every View (Not Yet Audited)
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="case-pagination-wrap">
        <div className="case-pagination">
          <a href="case-vellum.html" className="pag-card">
            <span className="pag-label">Previous Case Study</span>{' '}
            <span className="pag-title">06 · Vellum (Mindful Mobile UX/UI Concept)</span>
          </a>
          <a href="case-lsfm.html" className="pag-card u-ta-right">
            <span className="pag-label">Next Case Study</span>{' '}
            <span className="pag-title">01 · LSFM AI HQ (5-Agent Team)</span>
          </a>
        </div>
      </div>
    </CaseLayout>
  );
}
