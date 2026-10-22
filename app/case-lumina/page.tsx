import CaseLayout from '../../components/CaseLayout';
import MetricCard from '../../components/MetricCard';
import { cases } from '../../lib/cases';

export const metadata = cases.find(item => item.slug === 'lumina')!.metadata;

export default function Page() {
  return <CaseLayout slug="lumina" title="Lumina Analytics — Case Study · Hans Aaron Laureles">{"\n    \n    "}
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
{"Case Study 05"}
</span>
{"\n        "}
<span className="badge">
{"Study & Focus Dashboard"}
</span>
{"\n        "}
<span className="badge">
{"Design Systems"}
</span>
{"\n        "}
<span className="badge">
{"React & TypeScript"}
</span>
{"\n      "}
</div>
{"\n\n      "}
<h1 className="case-title" data-case="lumina">
{"\n        Lumina Analytics — A Study & Focus Dashboard"}
<br />
{"\n        "}
<span className="serif-italic">
{"Designed in Figma, Built in React"}
</span>
{"\n      "}
</h1>
{"\n\n      "}
<p className="case-lead">
{"\n        A dashboard for students to plan study tasks, run focus sessions and see their week at a glance. I designed it in Figma, then built a working front end in React, TypeScript and Chart.js that runs on sample data.\n      "}
</p>
{"\n\n      "}
<div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
{"\n        "}
<a href="https://lumina-interactive-dashboard.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary u-bg-lumina-green u-bd-c-lumina-green u-c-white">
{"\n          🚀 Launch Live Interactive App ↗\n        "}
</a>
{"\n        "}
<a href="https://www.figma.com/community/file/1603729139129977787/laureles-lumina-website" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
{"\n          View Figma Community File ↗\n        "}
</a>
{"\n        "}
<a href="https://www.figma.com/proto/QvMHlmgMupSFMx7J7VVMZu/Laureles_Lumina---Website?node-id=137-3&p=f&t=OfdkTq7RI3KtUbpC-1&scaling=min-zoom&content-scaling=fixed&page-id=3%3A4&starting-point-node-id=137%3A3" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
{"\n          View Prototype ↗\n        "}
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
{"Desktop Web"}
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
{"Product Design & Front End"}
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
{"Design & Front-End Build"}
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
{"React · TypeScript · Chart.js · Tailwind CSS"}
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
{" The Engineering Challenge\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            Study apps tend to split the work across a to-do list, a timer and a habit tracker, so answering \"what should I do next, and am I keeping up?\" takes several screens.\n          "}
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
{"\n            Designed and built one dashboard with five views (Dashboard, Tasks, Focus, Insights, Settings): key numbers and per-subject progress at a glance, a task list, a 25-minute focus timer, and weekly charts on demand.\n          "}
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
{"5 Views"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Dashboard, Tasks, Focus, Insights & Settings"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-blue">
{"Chart.js"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Focus & Task Bar Charts: 7 Days or 4 Weeks"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"Tailwind"}
</div>
{"\n          "}
<div className="case-metric-label">
{"One Theme Block for Colours"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"Figma → React"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Light Figma Design, Dark Live Build"}
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
<source type="image/avif" srcSet="images/lumina-website/lumina-mockup-480.dcd86236.avif 480w, images/lumina-website/lumina-mockup-960.27d9d3b6.avif 960w, images/lumina-website/lumina-mockup-1600.20ec6b1b.avif 1600w, images/lumina-website/lumina-mockup-2400.61aeb255.avif 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<source type="image/webp" srcSet="images/lumina-website/lumina-mockup-480.d6881fd9.webp 480w, images/lumina-website/lumina-mockup-960.adc91708.webp 960w, images/lumina-website/lumina-mockup-1600.79019dd8.webp 1600w, images/lumina-website/lumina-mockup-2400.e03110d9.webp 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<img src="images/lumina-website/lumina-mockup-960.adc91708.webp" alt="Lumina Dashboard Showcase" width="960" height="720" loading="eager" fetchPriority="high" decoding="async" data-full="images/lumina-website/lumina-mockup-2400.e03110d9.webp" />
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
{"LUMINA // WHAT THE LIVE APP RUNS"}
</div>
{"\n          "}
<div className="mono u-fs-0p75rem u-c-emerald-500">
{"● LIVE ON NETLIFY"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="terminal-body">
{"\n"}
<pre>
<span className="terminal-comment">
{"# Lumina live build: a client-only React app on built-in sample data (no backend, no live feed)"}
</span>
{"\n"}
<span className="terminal-prompt">
{"[VIEWS]"}
</span>
{"       Dashboard · Tasks · Focus · Insights · Settings (one React state switch)\n"}
<span className="terminal-prompt">
{"[DATA]"}
</span>
{"        Sample data in the components; tasks kept in React state\n"}
<span className="terminal-prompt">
{"[CHARTS]"}
</span>
{"      Chart.js via react-chartjs-2: two bar charts\n               ├─ Focus hours and tasks completed\n               └─ 7-day view: 7 daily bars · 30-day view: 4 weekly bars\n"}
<span className="terminal-prompt">
{"[TIMER]"}
</span>
{"       25-minute focus timer (setInterval, 1 s tick)\n"}
<span className="terminal-prompt">
{"[STYLE]"}
</span>
{"       Tailwind CSS v4 colour tokens (@theme)\n"}
<span className="terminal-success">
{"[DEPLOY]"}
</span>
{"      Vite + React 19 + TypeScript build, static on Netlify"}
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
{"01. Overview & Challenge"}
</a>
</li>
{"\n          "}
<li>
<a href="#architecture">
{"02. Information Architecture"}
</a>
</li>
{"\n          "}
<li>
<a href="#wireframes">
{"03. Wireframes to Screens"}
</a>
</li>
{"\n          "}
<li>
<a href="#design-system">
{"04. Theme & Settings"}
</a>
</li>
{"\n          "}
<li>
<a href="#live-implementation">
{"05. Live React Build"}
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
{"// 01 · OVERVIEW & CHALLENGE"}
</div>
{"\n          "}
<h2>
{"One Place to Plan, Focus & Review"}
</h2>
{"\n          "}
<p>
{"\n            Students keep tasks in one app, time their study sessions in another, and rarely see progress across subjects in one place. Lumina is my attempt to put those on one screen.\n          "}
</p>
{"\n          "}
<div className="pull-quote">
{"\n            “How do you show tasks, focus time and progress on one screen without it feeling crowded?”\n          "}
</div>
{"\n          "}
<p>
{"\n            Lumina combines study tasks, focus sessions and per-subject progress in one dashboard, designed in Figma and then built as a React app.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="architecture" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 02 · INFORMATION ARCHITECTURE"}
</div>
{"\n          "}
<h2>
{"Three-Tier Modular Hierarchy"}
</h2>
{"\n          "}
<p>
{"\n            To keep the screen calm, Lumina organises the work into three levels:\n          "}
</p>
{"\n          "}
<div className="experience-timeline u-m-24px-0">
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"1. The Glance Strip"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Four numbers at the top of the dashboard: focus sessions, tasks completed, a productivity score and pending tasks."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"2. Tasks & Focus"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"A task list where you add a task (Enter submits) and tick it done, plus a 25-minute focus timer."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"3. Insights"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Bar charts of focus hours and tasks completed: seven daily bars for the last 7 days, or four weekly bars for the last 30."}
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
{"// 03 · WIREFRAMES & SCREEN PROGRESSION"}
</div>
{"\n          "}
<h2>
{"From Wireframe Structure to Dense Visual Reality"}
</h2>
{"\n          "}
<p>
{"\n            Compare the initial structural wireframes against the deployed high-density interfaces:\n          "}
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
<source type="image/avif" srcSet="images/lumina-website/01-lumina-wireframe-dashboard-480.3d8fce35.avif 480w, images/lumina-website/01-lumina-wireframe-dashboard-960.ac979a6b.avif 960w, images/lumina-website/01-lumina-wireframe-dashboard-1440.63ee8100.avif 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/01-lumina-wireframe-dashboard-480.0963dcb4.webp 480w, images/lumina-website/01-lumina-wireframe-dashboard-960.8ce9da3a.webp 960w, images/lumina-website/01-lumina-wireframe-dashboard-1440.f92499e4.webp 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/01-lumina-wireframe-dashboard-960.8ce9da3a.webp" alt="Lumina Dashboard Wireframe" width="960" height="682" loading="lazy" decoding="async" data-full="images/lumina-website/01-lumina-wireframe-dashboard-1440.f92499e4.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 1.1 — Main Dashboard Layout Wireframe"}
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
<source type="image/avif" srcSet="images/lumina-website/01-lumina-dashboard-480.20739617.avif 480w, images/lumina-website/01-lumina-dashboard-960.43443081.avif 960w, images/lumina-website/01-lumina-dashboard-1472.2693d194.avif 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/01-lumina-dashboard-480.3336b8d3.webp 480w, images/lumina-website/01-lumina-dashboard-960.070eacf4.webp 960w, images/lumina-website/01-lumina-dashboard-1472.214f2f66.webp 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/01-lumina-dashboard-960.070eacf4.webp" alt="Lumina Dashboard UI" width="960" height="688" loading="lazy" decoding="async" data-full="images/lumina-website/01-lumina-dashboard-1472.214f2f66.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 1.2 — Dashboard Design (Figma)"}
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
<source type="image/avif" srcSet="images/lumina-website/02-lumina-wireframe-tasks-480.f9812aaf.avif 480w, images/lumina-website/02-lumina-wireframe-tasks-960.7d396f63.avif 960w, images/lumina-website/02-lumina-wireframe-tasks-1440.47399e02.avif 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/02-lumina-wireframe-tasks-480.4d4e692d.webp 480w, images/lumina-website/02-lumina-wireframe-tasks-960.2f7c561b.webp 960w, images/lumina-website/02-lumina-wireframe-tasks-1440.26c99904.webp 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/02-lumina-wireframe-tasks-960.2f7c561b.webp" alt="Lumina Tasks Wireframe" width="960" height="682" loading="lazy" decoding="async" data-full="images/lumina-website/02-lumina-wireframe-tasks-1440.26c99904.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 2.1 — Task Matrix Wireframe"}
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
<source type="image/avif" srcSet="images/lumina-website/02-lumina-tasks-480.a561f196.avif 480w, images/lumina-website/02-lumina-tasks-960.656266c0.avif 960w, images/lumina-website/02-lumina-tasks-1472.1db992ca.avif 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/02-lumina-tasks-480.112ec196.webp 480w, images/lumina-website/02-lumina-tasks-960.b05ae79b.webp 960w, images/lumina-website/02-lumina-tasks-1472.07f6d3c9.webp 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/02-lumina-tasks-960.b05ae79b.webp" alt="Lumina Tasks UI" width="960" height="688" loading="lazy" decoding="async" data-full="images/lumina-website/02-lumina-tasks-1472.07f6d3c9.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 2.2 — Task Management Interface"}
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
<source type="image/avif" srcSet="images/lumina-website/03-lumina-wireframe-focus-480.b6aebd64.avif 480w, images/lumina-website/03-lumina-wireframe-focus-960.991b5f9e.avif 960w, images/lumina-website/03-lumina-wireframe-focus-1440.c6b5c609.avif 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/03-lumina-wireframe-focus-480.1ee04a98.webp 480w, images/lumina-website/03-lumina-wireframe-focus-960.2adeaadb.webp 960w, images/lumina-website/03-lumina-wireframe-focus-1440.5bb1a73e.webp 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/03-lumina-wireframe-focus-960.2adeaadb.webp" alt="Lumina Focus Wireframe" width="960" height="682" loading="lazy" decoding="async" data-full="images/lumina-website/03-lumina-wireframe-focus-1440.5bb1a73e.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.1 — Focus Wireframe Flow"}
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
<source type="image/avif" srcSet="images/lumina-website/03-lumina-focus-480.ddb02577.avif 480w, images/lumina-website/03-lumina-focus-960.ffc73775.avif 960w, images/lumina-website/03-lumina-focus-1472.51bd458f.avif 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/03-lumina-focus-480.e290bb2c.webp 480w, images/lumina-website/03-lumina-focus-960.3485e0a6.webp 960w, images/lumina-website/03-lumina-focus-1472.303dfd49.webp 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/03-lumina-focus-960.3485e0a6.webp" alt="Lumina Deep Work Focus Screen" width="960" height="688" loading="lazy" decoding="async" data-full="images/lumina-website/03-lumina-focus-1472.303dfd49.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.2 — Deep Work Focus Timer Mode"}
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
<source type="image/avif" srcSet="images/lumina-website/04-lumina-wireframe-insights-480.4963e5c7.avif 480w, images/lumina-website/04-lumina-wireframe-insights-960.75e26062.avif 960w, images/lumina-website/04-lumina-wireframe-insights-1440.2d1eb470.avif 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/04-lumina-wireframe-insights-480.64634773.webp 480w, images/lumina-website/04-lumina-wireframe-insights-960.93f15e05.webp 960w, images/lumina-website/04-lumina-wireframe-insights-1440.3724a99a.webp 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/04-lumina-wireframe-insights-960.93f15e05.webp" alt="Lumina Insights Wireframe" width="960" height="682" loading="lazy" decoding="async" data-full="images/lumina-website/04-lumina-wireframe-insights-1440.3724a99a.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 4.1 — Insights Wireframe Architecture"}
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
<source type="image/avif" srcSet="images/lumina-website/04-lumina-insights-480.f3bffc17.avif 480w, images/lumina-website/04-lumina-insights-960.8ee168fa.avif 960w, images/lumina-website/04-lumina-insights-1472.bda93a07.avif 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/04-lumina-insights-480.69adcab7.webp 480w, images/lumina-website/04-lumina-insights-960.87b6c124.webp 960w, images/lumina-website/04-lumina-insights-1472.cf914dd8.webp 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/04-lumina-insights-960.87b6c124.webp" alt="Lumina Insights Screen" width="960" height="688" loading="lazy" decoding="async" data-full="images/lumina-website/04-lumina-insights-1472.cf914dd8.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 4.2 — Performance Insights & Analytics"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="design-system" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 04 · THEME & SETTINGS"}
</div>
{"\n          "}
<h2>
{"A Small, Consistent Theme"}
</h2>
{"\n          "}
<p>
{"\n            The live build keeps its colours in one Tailwind CSS "}
<code>
{"@theme"}
</code>
{" block: four obsidian greys and a border grey, three emerald shades and a glow. The body text is set in Inter. The Figma design uses a light palette; the React build is dark only.\n          "}
</p>
{"\n          "}
<div className="image-gallery">
{"\n            "}
<div className="gallery-item">
{"\n              "}
<div className="gallery-img-box">
{"\n                "}
<picture>
{"\n                  "}
<source type="image/avif" srcSet="images/lumina-website/05-lumina-wireframe-settings-480.94173348.avif 480w, images/lumina-website/05-lumina-wireframe-settings-960.4a10e9ec.avif 960w, images/lumina-website/05-lumina-wireframe-settings-1440.1d05164b.avif 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/05-lumina-wireframe-settings-480.0be1d949.webp 480w, images/lumina-website/05-lumina-wireframe-settings-960.8866a62e.webp 960w, images/lumina-website/05-lumina-wireframe-settings-1440.936be479.webp 1440w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/05-lumina-wireframe-settings-960.8866a62e.webp" alt="Lumina Settings Wireframe" width="960" height="682" loading="lazy" decoding="async" data-full="images/lumina-website/05-lumina-wireframe-settings-1440.936be479.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 5.1 — Settings & Preferences Wireframe"}
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
<source type="image/avif" srcSet="images/lumina-website/05-lumina-settings-480.db6a85b8.avif 480w, images/lumina-website/05-lumina-settings-960.af4a8b03.avif 960w, images/lumina-website/05-lumina-settings-1472.3311c8a3.avif 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/lumina-website/05-lumina-settings-480.a6221871.webp 480w, images/lumina-website/05-lumina-settings-960.34dfdd48.webp 960w, images/lumina-website/05-lumina-settings-1472.3c3898db.webp 1472w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/lumina-website/05-lumina-settings-960.34dfdd48.webp" alt="Lumina System Settings & Preferences" width="960" height="688" loading="lazy" decoding="async" data-full="images/lumina-website/05-lumina-settings-1472.3c3898db.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 5.2 — Settings Screen"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="live-implementation" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 05 · LIVE BUILD"}
</div>
{"\n          "}
<h2>
{"Built as a Working Web App"}
</h2>
{"\n          "}
<p>
{"\n            Beyond the Figma file, I built Lumina as a working front end in React and TypeScript and deployed it to Netlify. It runs in the browser on built-in sample data: there is no backend or account, and tasks you add reset when the page reloads.\n          "}
</p>
{"\n\n          "}
<div className="outcome-grid">
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"React + TS"}
</div>
{"\n              "}
<div className="outcome-label">
{"Five Typed View Components"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"Tailwind"}
</div>
{"\n              "}
<div className="outcome-label">
{"One Theme Block for Colours"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"Live"}
</div>
{"\n              "}
<div className="outcome-label">
{"Static Front End on Netlify, Sample Data"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
<div className="u-ta-center u-mt-32px">
{"\n            "}
<a href="https://lumina-interactive-dashboard.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary u-bg-lumina-green u-bd-c-lumina-green u-c-white">
{"\n              🚀 Experience Live Lumina App on Netlify ↗\n            "}
</a>
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
<a href="case-aura.html" className="pag-card">
{"\n          "}
<span className="pag-label">
{"← Previous Case Study"}
</span>
{"\n          "}
<span className="pag-title">
{"04 · Aura Coffee & Kitchen (Specialty Commerce)"}
</span>
{"\n        "}
</a>
{"\n        "}
<a href="case-vellum.html" className="pag-card u-ta-right">
{"\n          "}
<span className="pag-label">
{"Next Case Study →"}
</span>
{"\n          "}
<span className="pag-title">
{"06 · Vellum (Mindful Mobile UX/UI Concept)"}
</span>
{"\n        "}
</a>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n\n  "}</CaseLayout>;
}
