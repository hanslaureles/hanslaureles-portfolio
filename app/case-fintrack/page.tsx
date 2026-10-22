import CaseLayout from '../../components/CaseLayout';
import MetricCard from '../../components/MetricCard';
import { cases } from '../../lib/cases';

export const metadata = cases.find(item => item.slug === 'fintrack')!.metadata;

export default function Page() {
  return <CaseLayout slug="fintrack" title="FinTrack App — Case Study · Hans Aaron Laureles">{"\n    \n    "}
{"\n    "}
<div className="case-hero">
{"\n      "}
<a href="index.html" className="case-back-link">
{"\n        ← Return to Selected Work\n      "}
</a>
{"\n      \n      "}
<div className="u-d-flex u-gap-8px u-mb-16px u-wrap-wrap">
{"\n        "}
<span className="badge badge-accent">
{"Case Study 07"}
</span>
{"\n        "}
<span className="badge">
{"FinTech UI/UX"}
</span>
{"\n        "}
<span className="badge">
{"Personal Finance"}
</span>
{"\n        "}
<span className="badge">
{"Figma Prototype"}
</span>
{"\n      "}
</div>
{"\n\n      "}
<h1 className="case-title" data-case="fintrack">
{"\n        FinTrack — Personal Finance & Expense Flow"}
<br />
{"\n        "}
<span className="serif-italic">
{"& Behavioral Budgeting Concept"}
</span>
{"\n      "}
</h1>
{"\n\n      "}
<p className="case-lead">
{"\n        A Figma prototype that redesigns expense logging as a 2-tap flow (amount, then a suggested category), with gentle overspend nudges and a month-end balance curve. It is built to test whether fewer taps make daily logging stick.\n      "}
</p>
{"\n\n      "}
<div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
{"\n        "}
<a href="https://www.figma.com/community/file/1618156433373187066/laureles-fintrack-mobile-app" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
{"\n          View Figma Community File ↗\n        "}
</a>
{"\n        "}
<a href="https://www.figma.com/proto/x7Si9om6yXdVCgXrskZfTY/Laureles_FinTrack---Mobile-App?node-id=1-1000&p=f&t=zpSjUwOxJ9v9teqQ-1&scaling=scale-down&content-scaling=fixed&page-id=16%3A4&starting-point-node-id=1%3A1000" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
{"\n          Launch Interactive Prototype ↗\n        "}
</a>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-meta-table">
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Platform"}
</div>
{"\n          "}
<div className="val">
{"iOS / Android Mobile"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Discipline"}
</div>
{"\n          "}
<div className="val">
{"Algorithmic UX & Behavioral FinTech"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Role"}
</div>
{"\n          "}
<div className="val">
{"Lead Product Architect (Solo)"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Stack"}
</div>
{"\n          "}
<div className="val">
{"Figma · Auto Layout · Variables"}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-challenge-grid">
{"\n        "}
<div className="case-challenge-card problem">
{"\n          "}
<div className="case-challenge-tag">
{"\n            "}
<span>
{"●"}
</span>
{" The Design Challenge\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            The design starts from one assumption: logging stops when it asks too much (multi-step forms, alarm-style alerts on small overspends, analytics that hide the one number you need today). The prototype is built to test that, not to prove it.\n          "}
</p>
{"\n        "}
</div>
{"\n        "}
<div className="case-challenge-card solution">
{"\n          "}
<div className="case-challenge-tag">
{"\n            "}
<span>
{"●"}
</span>
{" The Architecture Solution\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            Designed a two-tap expense flow (amount, then one of four suggested categories), neutral feedback on overspends, a daily safe-to-spend number and a month-end balance curve, all built from Figma components and design tokens.\n          "}
</p>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
<div className="case-metrics-strip">
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-emerald">
{"2-Tap Logging"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Amount, Then One of 4 Suggested Categories"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-blue">
{"No-Shame UX"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Neutral Feedback on Overspend, No Alarms"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"0 Clutter"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Single-Ceiling Daily Velocity UX"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"Figma Tokens"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Auto Layout Components & Variables"}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-banner u-mt-32px u-mb-24px">
{"\n        "}
<picture>
{"\n          "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/fintrack-mockup-480.d086d51f.avif 480w, images/fintrack-mobile-app/fintrack-mockup-960.215104eb.avif 960w, images/fintrack-mobile-app/fintrack-mockup-1417.cef3f6c0.avif 1417w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/fintrack-mockup-480.b79afc12.webp 480w, images/fintrack-mobile-app/fintrack-mockup-960.e23087e7.webp 960w, images/fintrack-mobile-app/fintrack-mockup-1417.86873f6d.webp 1417w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<img src="images/fintrack-mobile-app/fintrack-mockup-960.e23087e7.webp" alt="FinTrack Mobile App Showcase" width="960" height="714" loading="eager" fetchPriority="high" decoding="async" data-full="images/fintrack-mobile-app/fintrack-mockup-1417.86873f6d.webp" />
{"\n        "}
</picture>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="terminal-window u-m-24px-0-32px-0">
{"\n        "}
<div className="terminal-topbar">
{"\n          "}
<div className="terminal-dots">
{"\n            "}
<span className="terminal-dot red">
</span>
{"\n            "}
<span className="terminal-dot yellow">
</span>
{"\n            "}
<span className="terminal-dot green">
</span>
{"\n          "}
</div>
{"\n          "}
<div className="terminal-title">
{"FINTRACK // DESIGNED EXPENSE FLOW"}
</div>
{"\n          "}
<div className="mono u-fs-0p75rem u-c-emerald-500">
{"● FIGMA PROTOTYPE"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="terminal-body">
{"\n"}
<pre>
<span className="terminal-comment">
{"# FinTrack 2-tap expense flow, as designed (a Figma prototype: nothing below is computed)"}
</span>
{"\n"}
<span className="terminal-prompt">
{"[INPUT]"}
</span>
{"       Amount ──> 4 suggested categories, one tap to pick\n"}
<span className="terminal-prompt">
{"[BUDGET]"}
</span>
{"      Screens designed around one number:\n               ├─ Safe-to-spend today (monthly budget minus recurring fixed costs)\n               ├─ Overspend nudge when a day runs well above the usual pace\n               └─ Month-end balance curve\n"}
<span className="terminal-prompt">
{"[TONE]"}
</span>
{"        Neutral feedback on overspend: no red alarms or shaming copy\n"}
<span className="terminal-success">
{"[PROTOTYPE]"}
</span>
{"   Figma flow built from Auto Layout components & design tokens"}
</pre>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n\n    "}
{"\n    "}
<div className="case-content-layout">
{"\n      \n      "}
{"\n      "}
<aside className="case-sidebar">
{"\n        "}
<div className="case-toc-title">
{"Table of Contents"}
</div>
{"\n        "}
<ul className="case-toc-list">
{"\n          "}
<li>
<a href="#overview">
{"01. Overview & The Problem"}
</a>
</li>
{"\n          "}
<li>
<a href="#user-insights">
{"02. Cognitive Load in Banking"}
</a>
</li>
{"\n          "}
<li>
<a href="#wireframes">
{"03. Wireframing Progression"}
</a>
</li>
{"\n          "}
<li>
<a href="#design-craft">
{"04. Visual Hierarchy & Speed"}
</a>
</li>
{"\n          "}
<li>
<a href="#outcomes">
{"05. Outcomes & Takeaways"}
</a>
</li>
{"\n        "}
</ul>
{"\n      "}
</aside>
{"\n\n      "}
{"\n      "}
<div className="case-main-narrative">
{"\n        \n        "}
{"\n        "}
<section id="overview" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 01 · OVERVIEW & PROBLEM"}
</div>
{"\n          "}
<h2>
{"The Intimidation of Modern Budgeting"}
</h2>
{"\n          "}
<p>
{"\n            My working assumption is that people starting their first jobs give up on budgeting apps because logging an expense means category dropdowns, mental arithmetic and dense tables. FinTrack is designed to test that assumption, not to report it.\n          "}
</p>
{"\n          "}
<div className="pull-quote">
{"\n            “Can logging an expense take just two taps: the amount, then a category?”\n          "}
</div>
{"\n          "}
<p>
{"\n            The FinTrack screens use visual proportion instead of tables of numbers: colour-coded budget rings, a two-tap expense flow and category breakdowns.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="user-insights" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 02 · DESIGN ASSUMPTIONS"}
</div>
{"\n          "}
<h2>
{"Key Usability Friction Factors"}
</h2>
{"\n          "}
<p>
{"\n            I did not run user testing for FinTrack. The design starts from three friction points I took from reviewing common budgeting apps; they are assumptions the prototype is built to test, not research findings:\n          "}
</p>
{"\n          "}
<div className="experience-timeline u-m-24px-0">
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"1. Manual Input Friction"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Every extra tap needed to log an expense (for example, picking through nested categories) is one more reason to skip logging that day."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"2. Lack of Contextual Safe-to-Spend Limits"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"The question a budget should answer first is "}
<em>
{"\"How much can I safely spend today?\""}
</em>
{", not what happened last month."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"3. Cluttered Financial Visualizations"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Small line graphs on a phone screen are hard to read and rarely tell you what to do next."}
</p>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="wireframes" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 03 · WIREFRAMES & ITERATION"}
</div>
{"\n          "}
<h2>
{"Simplifying Structural Workflows"}
</h2>
{"\n          "}
<p>
{"\n            The iterative wireframe progression below demonstrates how complex ledger screens were condensed into intuitive, finger-friendly mobile touch points:\n          "}
</p>
{"\n\n          "}
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/01-fintrack-wireframe-dashboard-390.18e7ebd0.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/01-fintrack-wireframe-dashboard-390.14bb9855.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/fintrack-mobile-app/01-fintrack-wireframe-dashboard-390.14bb9855.webp" alt="FinTrack Dashboard Wireframe" width="390" height="924" loading="lazy" decoding="async" data-full="images/fintrack-mobile-app/01-fintrack-wireframe-dashboard-390.14bb9855.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 1.1 — Financial Dashboard Wireframe"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/01-fintrack-dashboard-430.15604dc8.avif 430w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/01-fintrack-dashboard-430.d8f5e968.webp 430w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/fintrack-mobile-app/01-fintrack-dashboard-430.d8f5e968.webp" alt="FinTrack Dashboard UI" width="430" height="1062" loading="lazy" decoding="async" data-full="images/fintrack-mobile-app/01-fintrack-dashboard-430.d8f5e968.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 1.2 — High-Fidelity Home Dashboard"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/02-fintrack-wireframe-add-expense-390.52386247.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/02-fintrack-wireframe-add-expense-390.e8c64af7.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/fintrack-mobile-app/02-fintrack-wireframe-add-expense-390.e8c64af7.webp" alt="FinTrack Add Expense Wireframe" width="390" height="884" loading="lazy" decoding="async" data-full="images/fintrack-mobile-app/02-fintrack-wireframe-add-expense-390.e8c64af7.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 2.1 — 1-Tap Expense Logging Wireframe"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/02-fintrack-add-expense-430.78c02dd4.avif 430w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/02-fintrack-add-expense-430.7eeaa048.webp 430w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/fintrack-mobile-app/02-fintrack-add-expense-430.7eeaa048.webp" alt="FinTrack Add Expense UI" width="430" height="1122" loading="lazy" decoding="async" data-full="images/fintrack-mobile-app/02-fintrack-add-expense-430.7eeaa048.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 2.2 — Rapid Number-Pad Input Flow"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/03-fintrack-wireframe-transactions-430.178d9148.avif 430w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/03-fintrack-wireframe-transactions-430.266a35ad.webp 430w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/fintrack-mobile-app/03-fintrack-wireframe-transactions-430.266a35ad.webp" alt="Transactions Wireframe" width="430" height="924" loading="lazy" decoding="async" data-full="images/fintrack-mobile-app/03-fintrack-wireframe-transactions-430.266a35ad.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.1 — Clean Ledger Feed Wireframe"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/03-fintrack-transactions-466.d6b708d0.avif 466w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/03-fintrack-transactions-466.99585687.webp 466w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/fintrack-mobile-app/03-fintrack-transactions-466.99585687.webp" alt="Transactions Feed UI" width="466" height="920" loading="lazy" decoding="async" data-full="images/fintrack-mobile-app/03-fintrack-transactions-466.99585687.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.2 — Grouped Transaction History Feed"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/04-fintrack-analytics-390.337179fb.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/04-fintrack-analytics-390.27c9ff6c.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/fintrack-mobile-app/04-fintrack-analytics-390.27c9ff6c.webp" alt="Spending Analytics UI" width="390" height="1186" loading="lazy" decoding="async" data-full="images/fintrack-mobile-app/04-fintrack-analytics-390.27c9ff6c.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 4.1 — Category Spending Analytics"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/fintrack-mobile-app/05-fintrack-savings-goals-390.0b356990.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/fintrack-mobile-app/05-fintrack-savings-goals-390.1c7cb827.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/fintrack-mobile-app/05-fintrack-savings-goals-390.1c7cb827.webp" alt="Savings Goals UI" width="390" height="968" loading="lazy" decoding="async" data-full="images/fintrack-mobile-app/05-fintrack-savings-goals-390.1c7cb827.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 4.2 — Visual Savings Goals Targets"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="design-craft" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 04 · VISUAL HIERARCHY & SPEED"}
</div>
{"\n          "}
<h2>
{"Glanceable Visual Feedback"}
</h2>
{"\n          "}
<p>
{"\n            By utilizing high-contrast typography, distinctive category iconography, and tactile card elevations, the FinTrack screens depict a purchase recorded in two taps, followed by a screen showing an updated safe-to-spend balance. The prototype computes nothing; the numbers are part of the design.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="outcomes" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 05 · OUTCOMES & LEARNINGS"}
</div>
{"\n          "}
<h2>
{"What the Design Delivers"}
</h2>
{"\n          "}
<div className="outcome-grid">
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"2 Taps"}
</div>
{"\n              "}
<div className="outcome-label">
{"To Log an Expense: Amount, Then a Suggested Category"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"1 Number"}
</div>
{"\n              "}
<div className="outcome-label">
{"A Daily Safe-to-Spend Ceiling Instead of Category Budgets"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"AA"}
</div>
{"\n              "}
<div className="outcome-label">
{"WCAG Contrast Target for Every View (Not Yet Audited)"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n      "}
</div>
{"\n\n    "}
</div>
{"\n\n    "}
{"\n    "}
<div className="case-pagination-wrap">
{"\n      "}
<div className="case-pagination">
{"\n        "}
<a href="case-vellum.html" className="pag-card">
{"\n          "}
<span className="pag-label">
{"← Previous Case Study"}
</span>
{"\n          "}
<span className="pag-title">
{"06 · Vellum (Mindful Mobile UX/UI Concept)"}
</span>
{"\n        "}
</a>
{"\n        "}
<a href="case-lsfm.html" className="pag-card u-ta-right">
{"\n          "}
<span className="pag-label">
{"Next Case Study →"}
</span>
{"\n          "}
<span className="pag-title">
{"01 · LSFM AI HQ (5-Agent Team)"}
</span>
{"\n        "}
</a>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n\n  "}</CaseLayout>;
}
