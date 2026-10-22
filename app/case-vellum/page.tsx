import CaseLayout from '../../components/CaseLayout';
import MetricCard from '../../components/MetricCard';
import { cases } from '../../lib/cases';

export const metadata = cases.find(item => item.slug === 'vellum')!.metadata;

export default function Page() {
  return <CaseLayout slug="vellum" title="Vellum — Mindful Mobile UX/UI Case Study · Hans Aaron Laureles">{"\n    \n    "}
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
{"Case Study 06"}
</span>
{"\n        "}
<span className="badge">
{"Mobile UI/UX Design"}
</span>
{"\n        "}
<span className="badge">
{"Mental Wellness"}
</span>
{"\n        "}
<span className="badge">
{"Figma Prototype"}
</span>
{"\n      "}
</div>
{"\n\n      "}
<h1 className="case-title" data-case="vellum">
{"\n        Vellum — Mindful Mobile UX/UI"}
<br />
{"\n        "}
<span className="serif-italic">
{"& Ambient Reflection Concept"}
</span>
{"\n      "}
</h1>
{"\n\n      "}
<p className="case-lead">
{"\n        A calm, low-effort mobile journaling concept designed in Figma: no push nagging, no streak counters, and short, gentle reflection prompts instead.\n      "}
</p>
{"\n\n      "}
<div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
{"\n        "}
<a href="https://www.figma.com/community/file/1602682511114137942/laureles-vellum-mobile-app" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
{"\n          View Figma Community File ↗\n        "}
</a>
{"\n        "}
<a href="https://www.figma.com/proto/C84IU5Urr7f7JdOkCGHjBT/Laureles_Vellum---Mobile-App?node-id=119-327&p=f&t=HZ9fLxO5oAJbOe1s-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=119%3A327" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
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
{"Figma Interactive Prototype · iOS Guidelines"}
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
{"Mobile UI/UX & Interaction Design"}
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
{"Product Architect & Interaction Lead"}
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
{"Figma · Auto Layout · ProtoPie"}
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
{"\n            My design concern is game-style mechanics in wellness apps: daily push reminders, streak counters and badges. My assumption, which the prototype is built to test, is that for people who are already stressed, missing one day can feel like failing, and that this makes them quit.\n          "}
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
{"\n            Designed a calm journaling companion in Figma: a one-swipe mood check-in, guided breathing, and free writing, with no streaks, no red badges, and a muted palette that is easy on the eyes at night.\n          "}
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
{"0 Streaks"}
</div>
{"\n          "}
<div className="case-metric-label">
{"No Streak Counters or Red Badges"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-blue">
{"Protopie Motion"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Protopie Kinetic Motion Physics"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"Auto Layout 5"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Scalable Component Architecture"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"3 Flows"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Check-In, Breathing & Free Writing"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/vellum-mockup-480.aefaa558.avif 480w, images/vellum-mobile-app/vellum-mockup-960.456cab43.avif 960w, images/vellum-mobile-app/vellum-mockup-1600.3b5c1af6.avif 1600w, images/vellum-mobile-app/vellum-mockup-2400.6d15def8.avif 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<source type="image/webp" srcSet="images/vellum-mobile-app/vellum-mockup-480.8cf0be0d.webp 480w, images/vellum-mobile-app/vellum-mockup-960.98fdf7b9.webp 960w, images/vellum-mobile-app/vellum-mockup-1600.e232ef54.webp 1600w, images/vellum-mobile-app/vellum-mockup-2400.92eb367c.webp 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<img src="images/vellum-mobile-app/vellum-mockup-960.98fdf7b9.webp" alt="Vellum Mobile Interface Showcase" width="960" height="720" loading="eager" fetchPriority="high" decoding="async" data-full="images/vellum-mobile-app/vellum-mockup-2400.92eb367c.webp" />
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
{"VELLUM // CALM JOURNALING FLOWS"}
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
{"# Vellum interaction principles, as designed (a Figma + Protopie prototype)"}
</span>
{"\n"}
<span className="terminal-prompt">
{"[INPUT]"}
</span>
{"          Single-thumb swipe to pick a mood\n"}
<span className="terminal-prompt">
{"[INTERACTIONS]"}
</span>
{"   Three modes to choose from:\n                  ├─ Mood check-in (no typing)\n                  ├─ Guided breathing (visual pacing)\n                  └─ Free writing on a plain page\n"}
<span className="terminal-prompt">
{"[HEURISTICS]"}
</span>
{"     No streak counters · no red badges\n"}
<span className="terminal-success">
{"[PROTOTYPE]"}
</span>
{"      Figma + Protopie, Published to the Figma Community"}
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
<a href="#research">
{"02. Design Assumptions"}
</a>
</li>
{"\n          "}
<li>
<a href="#wireframes">
{"03. Structural Architecture"}
</a>
</li>
{"\n          "}
<li>
<a href="#design-system">
{"04. Visual & Interaction Craft"}
</a>
</li>
{"\n          "}
<li>
<a href="#outcomes">
{"05. Key Outcomes & Takeaways"}
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
{"// 01 · CONTEXT & PROBLEM"}
</div>
{"\n          "}
<h2>
{"The Paradox of Gamified Wellness"}
</h2>
{"\n          "}
<p>
{"\n            The design concern behind Vellum is game-style mechanics in wellness and journaling apps: daily push notifications, streak counters, badge unlocks and busy dashboards. My assumption is that for someone already anxious or burnt out, these can turn a missed day into pressure and shame.\n          "}
</p>
{"\n          "}
<div className="pull-quote">
{"\n            “How might we design a mental wellness companion that feels like opening a physical notebook on a quiet morning—calm, non-judgmental, and emotionally safe?”\n          "}
</div>
{"\n          "}
<p>
{"\n            Vellum was conceived to test a contrary hypothesis: by removing gamified streaks and replacing them with ambient breathing exercises, open-ended micro-journaling, and sensory micro-interactions, daily reflection becomes an intrinsically rewarding refuge rather than another item on a to-do list.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="research" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 02 · DESIGN ASSUMPTIONS"}
</div>
{"\n          "}
<h2>
{"Addressing Cognitive Friction in Journaling"}
</h2>
{"\n          "}
<p>
{"\n            I did not run user interviews for Vellum. The design starts from three friction points I took from reviewing common journaling apps; they are assumptions the prototype is built to test, not research findings:\n          "}
</p>
{"\n          "}
<div className="experience-timeline u-m-24px-0">
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"1. The “Blank Page” Paralysis"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"An empty text area asks people to decide what to write before they have started, which makes it easy to close the app instead."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"2. Streak Guilt & Burnout"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"A streak counter turns one missed day into a visible failure, which can push people to quit rather than come back."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"3. Visual Over-stimulation"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Bright gradients and saturated colours are harsh on the eyes late at night, when a reflection app is likely to be opened."}
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
{"// 03 · WIREFRAMING & PROGRESSION"}
</div>
{"\n          "}
<h2>
{"From Low-Fidelity Logic to Refined Polarity"}
</h2>
{"\n          "}
<p>
{"\n            Each core flow was mapped in wireframe form to test hierarchy before introducing typography, tactile shadows, and color temperature.\n          "}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/01-vellum-wireframe-onboarding-screen-390.e625d44e.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/01-vellum-wireframe-onboarding-screen-390.369567de.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/01-vellum-wireframe-onboarding-screen-390.369567de.webp" alt="Vellum Wireframe Onboarding" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/01-vellum-wireframe-onboarding-screen-390.369567de.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 1.1 — Low-Fidelity Onboarding Wireframe"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/01-vellum-onboarding-390.8f99e9f7.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/01-vellum-onboarding-390.a8788826.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/01-vellum-onboarding-390.a8788826.webp" alt="Vellum High-Fidelity Onboarding" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/01-vellum-onboarding-390.a8788826.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 1.2 — High-Fidelity Onboarding Flow"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/03-vellum-wireframe-mood-check-in-screen-390.48c44d56.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/03-vellum-wireframe-mood-check-in-screen-390.48a1b7c6.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/03-vellum-wireframe-mood-check-in-screen-390.48a1b7c6.webp" alt="Mood Check-in Wireframe" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/03-vellum-wireframe-mood-check-in-screen-390.48a1b7c6.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 2.1 — Mood Check-in Wireframe"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/03-vellum-mood-check-in-390.3d30c196.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/03-vellum-mood-check-in-390.f15fbe16.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/03-vellum-mood-check-in-390.f15fbe16.webp" alt="Mood Check-in UI" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/03-vellum-mood-check-in-390.f15fbe16.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 2.2 — Final Mood Check-in Interface"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/05-vellum-wireframe-breathing-exercise-screen-390.f20adfd4.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/05-vellum-wireframe-breathing-exercise-screen-390.b6c219ba.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/05-vellum-wireframe-breathing-exercise-screen-390.b6c219ba.webp" alt="Breathing Exercise Wireframe" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/05-vellum-wireframe-breathing-exercise-screen-390.b6c219ba.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.1 — Breathing Rhythm Wireframe"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/05-vellum-breathing-390.b38e8487.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/05-vellum-breathing-390.141d3a53.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/05-vellum-breathing-390.141d3a53.webp" alt="Breathing Exercise UI" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/05-vellum-breathing-390.141d3a53.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.2 — Ambient Guided Breathing Screen"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/04-vellum-wireframe-recommendation-screen-390.d5914807.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/04-vellum-wireframe-recommendation-screen-390.1707da51.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/04-vellum-wireframe-recommendation-screen-390.1707da51.webp" alt="Recommendations Wireframe" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/04-vellum-wireframe-recommendation-screen-390.1707da51.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.3 — Recommendation Engine Wireframe"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/04-vellum-recommendations-390.7a22d081.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/04-vellum-recommendations-390.e9000c21.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/04-vellum-recommendations-390.e9000c21.webp" alt="Recommendations UI" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/04-vellum-recommendations-390.e9000c21.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 3.4 — Personalized Habit Recommendations"}
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
{"// 04 · INTERACTION & DESIGN SYSTEM"}
</div>
{"\n          "}
<h2>
{"Tactile Calm: Warm Tones & Fluid Typography"}
</h2>
{"\n          "}
<p>
{"\n            Vellum utilizes a muted stone palette, generous touch targets (minimum 48px), and gentle spring transitions. Check-ins are achieved with a single thumb swipe, and reflection prompts provide intelligent micro-suggestions based on current mood state.\n          "}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/06-vellum-journal-390.3d79d999.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/06-vellum-journal-390.1c851c19.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/06-vellum-journal-390.1c851c19.webp" alt="Vellum Journal Entry Screen" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/06-vellum-journal-390.1c851c19.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 4.1 — Focused Freeform Journaling Mode"}
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
<source type="image/avif" srcSet="images/vellum-mobile-app/07-vellum-insights-390.c47f54fa.avif 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<source type="image/webp" srcSet="images/vellum-mobile-app/07-vellum-insights-390.61f8bed7.webp 390w" sizes="(max-width: 900px) calc(100vw - 32px), 480px" />
{"\n                  "}
<img src="images/vellum-mobile-app/07-vellum-insights-390.61f8bed7.webp" alt="Vellum Insights Screen" width="390" height="844" loading="lazy" decoding="async" data-full="images/vellum-mobile-app/07-vellum-insights-390.61f8bed7.webp" />
{"\n                "}
</picture>
{"\n              "}
</div>
{"\n              "}
<div className="gallery-caption">
{"Fig 4.2 — Longitudinal Emotional Clarity Trends"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="outcomes" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 05 · OUTCOMES & REFLECTION"}
</div>
{"\n          "}
<h2>
{"What the Design Delivers"}
</h2>
{"\n          "}
<p>
{"\n            Vellum is published to the Figma Community with its full component library, so the typography, the low-pressure flow and the components can be inspected directly.\n          "}
</p>
{"\n\n          "}
<div className="outcome-grid">
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"3 Modes"}
</div>
{"\n              "}
<div className="outcome-label">
{"Mood Check-In, Guided Breathing or Free Writing"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"0 Streaks"}
</div>
{"\n              "}
<div className="outcome-label">
{"No Streak Counters and No Red Badges"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="outcome-card">
{"\n              "}
<div className="outcome-number">
{"Auto Layout"}
</div>
{"\n              "}
<div className="outcome-label">
{"Component Library on Auto Layout & Variables"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
<p>
{"\n            "}
<strong>
{"What I would test next:"}
</strong>
{" whether removing streaks and badges keeps people coming back as well as game-style loops do. That is the design's central bet, and it is untested.\n          "}
</p>
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
<a href="case-lumina.html" className="pag-card">
{"\n          "}
<span className="pag-label">
{"← Previous Case Study"}
</span>
{"\n          "}
<span className="pag-title">
{"05 · Lumina Analytics (Study & Focus Dashboard)"}
</span>
{"\n        "}
</a>
{"\n        "}
<a href="case-fintrack.html" className="pag-card u-ta-right">
{"\n          "}
<span className="pag-label">
{"Next Case Study →"}
</span>
{"\n          "}
<span className="pag-title">
{"07 · FinTrack App (FinTech UX)"}
</span>
{"\n        "}
</a>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n\n  "}</CaseLayout>;
}
