import CaseLayout from '../../components/CaseLayout';
import { cases } from '../../lib/cases';

export const metadata = cases.find((item) => item.slug === 'vellum')!.metadata;

export default function Page() {
  return (
    <CaseLayout
      slug="vellum"
      title="Vellum — Mindful Mobile UX/UI Case Study · Hans Aaron Laureles"
    >
      <div className="case-hero">
        <a href="/index.html" className="case-back-link">
          Return to Selected Work
        </a>
        <div className="u-d-flex u-gap-8px u-mb-16px u-wrap-wrap">
          <span className="badge badge-accent">Case Study 06</span>
          <span className="badge">Mobile UI/UX Design</span>
          <span className="badge">Mental Wellness</span>
          <span className="badge">Figma Prototype</span>
        </div>
        <h1 className="case-title" data-case="vellum">
          Vellum — Mindful Mobile UX/UI
          <br /> <span className="serif-italic">&amp; Ambient Reflection Concept</span>
        </h1>
        <p className="case-lead">
          A calm, low-effort mobile journaling concept designed in Figma: no push nagging, no streak
          counters, and short, gentle reflection prompts instead.
        </p>
        <div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
          <a
            href="https://www.figma.com/community/file/1602682511114137942/laureles-vellum-mobile-app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View Figma Community File
          </a>
          <a
            href="https://www.figma.com/proto/C84IU5Urr7f7JdOkCGHjBT/Laureles_Vellum---Mobile-App?node-id=119-327&p=f&t=HZ9fLxO5oAJbOe1s-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=119%3A327"
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
            <div className="val">Figma Interactive Prototype · iOS Guidelines</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Discipline</div>
            <div className="val">Mobile UI/UX &amp; Interaction Design</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Role</div>
            <div className="val">Product Architect &amp; Interaction Lead</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Stack</div>
            <div className="val">Figma · Auto Layout · ProtoPie</div>
          </div>
        </div>
        <div className="case-challenge-grid">
          <div className="case-challenge-card problem">
            <div className="case-challenge-tag">
              <span>●</span> The Design Challenge
            </div>
            <p className="case-challenge-text">
              My design concern is game-style mechanics in wellness apps: daily push reminders,
              streak counters and badges. My assumption, which the prototype is built to test, is
              that for people who are already stressed, missing one day can feel like failing, and
              that this makes them quit.
            </p>
          </div>
          <div className="case-challenge-card solution">
            <div className="case-challenge-tag">
              <span>●</span> The Architecture Solution
            </div>
            <p className="case-challenge-text">
              Designed a calm journaling companion in Figma: a one-swipe mood check-in, guided
              breathing, and free writing, with no streaks, no red badges, and a muted palette that
              is easy on the eyes at night.
            </p>
          </div>
        </div>
        <div className="case-metrics-strip">
          <div className="case-metric-cell">
            <div className="case-metric-num accent-emerald">0 Streaks</div>
            <div className="case-metric-label">No Streak Counters or Red Badges</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num accent-blue">Protopie Motion</div>
            <div className="case-metric-label">Protopie Kinetic Motion Physics</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num">Auto Layout 5</div>
            <div className="case-metric-label">Scalable Component Architecture</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num">3 Flows</div>
            <div className="case-metric-label">Check-In, Breathing &amp; Free Writing</div>
          </div>
        </div>
        <div className="case-banner u-mt-32px u-mb-24px">
          <picture>
            <source
              type="image/avif"
              srcSet="/images/vellum-mobile-app/vellum-mockup-480.aefaa558.avif 480w, /images/vellum-mobile-app/vellum-mockup-960.456cab43.avif 960w, /images/vellum-mobile-app/vellum-mockup-1600.3b5c1af6.avif 1600w, /images/vellum-mobile-app/vellum-mockup-2400.6d15def8.avif 2400w"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1240px"
            />
            <source
              type="image/webp"
              srcSet="/images/vellum-mobile-app/vellum-mockup-480.8cf0be0d.webp 480w, /images/vellum-mobile-app/vellum-mockup-960.98fdf7b9.webp 960w, /images/vellum-mobile-app/vellum-mockup-1600.e232ef54.webp 1600w, /images/vellum-mobile-app/vellum-mockup-2400.92eb367c.webp 2400w"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1240px"
            />
            <img
              src="/images/vellum-mobile-app/vellum-mockup-960.98fdf7b9.webp"
              alt="Vellum Mobile Interface Showcase"
              width="960"
              height="720"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              data-full="/images/vellum-mobile-app/vellum-mockup-2400.92eb367c.webp"
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
            <div className="terminal-title">VELLUM // CALM JOURNALING FLOWS</div>
            <div className="mono u-fs-0p75rem u-c-emerald-500">● FIGMA PROTOTYPE</div>
          </div>
          <div className="terminal-body">
            <pre>
              <span className="terminal-comment">
                # Vellum interaction principles, as designed (a Figma + Protopie prototype)
              </span>
              {`
`}
              <span className="terminal-prompt">[INPUT]</span>
              {`          Single-thumb swipe to pick a mood
`}
              <span className="terminal-prompt">[INTERACTIONS]</span>
              {`   Three modes to choose from:
                  ├─ Mood check-in (no typing)
                  ├─ Guided breathing (visual pacing)
                  └─ Free writing on a plain page
`}
              <span className="terminal-prompt">[HEURISTICS]</span>
              {`     No streak counters · no red badges
`}
              <span className="terminal-success">[PROTOTYPE]</span>
              {`      Figma + Protopie, Published to the Figma Community`}
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
              <a href="#research">02. Design Assumptions</a>
            </li>
            <li>
              <a href="#wireframes">03. Structural Architecture</a>
            </li>
            <li>
              <a href="#design-system">04. Visual &amp; Interaction Craft</a>
            </li>
            <li>
              <a href="#outcomes">05. Key Outcomes &amp; Takeaways</a>
            </li>
          </ul>
        </aside>
        <div className="case-main-narrative">
          <section id="overview" className="case-body-section">
            <div className="section-tag">// 01 · CONTEXT &amp; PROBLEM</div>
            <h2>The Paradox of Gamified Wellness</h2>
            <p>
              The design concern behind Vellum is game-style mechanics in wellness and journaling
              apps: daily push notifications, streak counters, badge unlocks and busy dashboards. My
              assumption is that for someone already anxious or burnt out, these can turn a missed
              day into pressure and shame.
            </p>
            <div className="pull-quote">
              “How might we design a mental wellness companion that feels like opening a physical
              notebook on a quiet morning—calm, non-judgmental, and emotionally safe?”
            </div>
            <p>
              Vellum was conceived to test a contrary hypothesis: by removing gamified streaks and
              replacing them with ambient breathing exercises, open-ended micro-journaling, and
              sensory micro-interactions, daily reflection becomes an intrinsically rewarding refuge
              rather than another item on a to-do list.
            </p>
          </section>
          <section id="research" className="case-body-section">
            <div className="section-tag">// 02 · DESIGN ASSUMPTIONS</div>
            <h2>Addressing Cognitive Friction in Journaling</h2>
            <p>
              I did not run user interviews for Vellum. The design starts from three friction points
              I took from reviewing common journaling apps; they are assumptions the prototype is
              built to test, not research findings:
            </p>
            <div className="experience-timeline u-m-24px-0">
              <div className="experience-card">
                <h3 className="u-mb-8px">1. The “Blank Page” Paralysis</h3>
                <p className="u-fs-0p95rem">
                  An empty text area asks people to decide what to write before they have started,
                  which makes it easy to close the app instead.
                </p>
              </div>
              <div className="experience-card">
                <h3 className="u-mb-8px">2. Streak Guilt &amp; Burnout</h3>
                <p className="u-fs-0p95rem">
                  A streak counter turns one missed day into a visible failure, which can push
                  people to quit rather than come back.
                </p>
              </div>
              <div className="experience-card">
                <h3 className="u-mb-8px">3. Visual Over-stimulation</h3>
                <p className="u-fs-0p95rem">
                  Bright gradients and saturated colours are harsh on the eyes late at night, when a
                  reflection app is likely to be opened.
                </p>
              </div>
            </div>
          </section>
          <section id="wireframes" className="case-body-section">
            <div className="section-tag">// 03 · WIREFRAMING &amp; PROGRESSION</div>
            <h2>From Low-Fidelity Logic to Refined Polarity</h2>
            <p>
              Each core flow was mapped in wireframe form to test hierarchy before introducing
              typography, tactile shadows, and color temperature.
            </p>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/01-vellum-wireframe-onboarding-screen-390.e625d44e.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/01-vellum-wireframe-onboarding-screen-390.369567de.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/01-vellum-wireframe-onboarding-screen-390.369567de.webp"
                      alt="Vellum Wireframe Onboarding"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/01-vellum-wireframe-onboarding-screen-390.369567de.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 1.1 — Low-Fidelity Onboarding Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/01-vellum-onboarding-390.8f99e9f7.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/01-vellum-onboarding-390.a8788826.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/01-vellum-onboarding-390.a8788826.webp"
                      alt="Vellum High-Fidelity Onboarding"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/01-vellum-onboarding-390.a8788826.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 1.2 — High-Fidelity Onboarding Flow</div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/03-vellum-wireframe-mood-check-in-screen-390.48c44d56.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/03-vellum-wireframe-mood-check-in-screen-390.48a1b7c6.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/03-vellum-wireframe-mood-check-in-screen-390.48a1b7c6.webp"
                      alt="Mood Check-in Wireframe"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/03-vellum-wireframe-mood-check-in-screen-390.48a1b7c6.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 2.1 — Mood Check-in Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/03-vellum-mood-check-in-390.3d30c196.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/03-vellum-mood-check-in-390.f15fbe16.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/03-vellum-mood-check-in-390.f15fbe16.webp"
                      alt="Mood Check-in UI"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/03-vellum-mood-check-in-390.f15fbe16.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 2.2 — Final Mood Check-in Interface</div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/05-vellum-wireframe-breathing-exercise-screen-390.f20adfd4.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/05-vellum-wireframe-breathing-exercise-screen-390.b6c219ba.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/05-vellum-wireframe-breathing-exercise-screen-390.b6c219ba.webp"
                      alt="Breathing Exercise Wireframe"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/05-vellum-wireframe-breathing-exercise-screen-390.b6c219ba.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 3.1 — Breathing Rhythm Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/05-vellum-breathing-390.b38e8487.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/05-vellum-breathing-390.141d3a53.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/05-vellum-breathing-390.141d3a53.webp"
                      alt="Breathing Exercise UI"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/05-vellum-breathing-390.141d3a53.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 3.2 — Ambient Guided Breathing Screen</div>
              </div>
            </div>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/04-vellum-wireframe-recommendation-screen-390.d5914807.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/04-vellum-wireframe-recommendation-screen-390.1707da51.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/04-vellum-wireframe-recommendation-screen-390.1707da51.webp"
                      alt="Recommendations Wireframe"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/04-vellum-wireframe-recommendation-screen-390.1707da51.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 3.3 — Recommendation Engine Wireframe</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/04-vellum-recommendations-390.7a22d081.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/04-vellum-recommendations-390.e9000c21.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/04-vellum-recommendations-390.e9000c21.webp"
                      alt="Recommendations UI"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/04-vellum-recommendations-390.e9000c21.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 3.4 — Personalized Habit Recommendations</div>
              </div>
            </div>
          </section>
          <section id="design-system" className="case-body-section">
            <div className="section-tag">// 04 · INTERACTION &amp; DESIGN SYSTEM</div>
            <h2>Tactile Calm: Warm Tones &amp; Fluid Typography</h2>
            <p>
              Vellum utilizes a muted stone palette, generous touch targets (minimum 48px), and
              gentle spring transitions. Check-ins are achieved with a single thumb swipe, and
              reflection prompts provide intelligent micro-suggestions based on current mood state.
            </p>
            <div className="image-gallery">
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/06-vellum-journal-390.3d79d999.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/06-vellum-journal-390.1c851c19.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/06-vellum-journal-390.1c851c19.webp"
                      alt="Vellum Journal Entry Screen"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/06-vellum-journal-390.1c851c19.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">Fig 4.1 — Focused Freeform Journaling Mode</div>
              </div>
              <div className="gallery-item">
                <div className="gallery-img-box">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/vellum-mobile-app/07-vellum-insights-390.c47f54fa.avif 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/vellum-mobile-app/07-vellum-insights-390.61f8bed7.webp 390w"
                      sizes="(max-width: 900px) calc(100vw - 32px), 480px"
                    />
                    <img
                      src="/images/vellum-mobile-app/07-vellum-insights-390.61f8bed7.webp"
                      alt="Vellum Insights Screen"
                      width="390"
                      height="844"
                      loading="lazy"
                      decoding="async"
                      data-full="/images/vellum-mobile-app/07-vellum-insights-390.61f8bed7.webp"
                    />
                  </picture>
                </div>
                <div className="gallery-caption">
                  Fig 4.2 — Longitudinal Emotional Clarity Trends
                </div>
              </div>
            </div>
          </section>
          <section id="outcomes" className="case-body-section">
            <div className="section-tag">// 05 · OUTCOMES &amp; REFLECTION</div>
            <h2>What the Design Delivers</h2>
            <p>
              Vellum is published to the Figma Community with its full component library, so the
              typography, the low-pressure flow and the components can be inspected directly.
            </p>
            <div className="outcome-grid">
              <div className="outcome-card">
                <div className="outcome-number">3 Modes</div>
                <div className="outcome-label">Mood Check-In, Guided Breathing or Free Writing</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-number">0 Streaks</div>
                <div className="outcome-label">No Streak Counters and No Red Badges</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-number">Auto Layout</div>
                <div className="outcome-label">
                  Component Library on Auto Layout &amp; Variables
                </div>
              </div>
            </div>
            <p>
              <strong>What I would test next:</strong> whether removing streaks and badges keeps
              people coming back as well as game-style loops do. That is the design's central bet,
              and it is untested.
            </p>
          </section>
        </div>
      </div>
      <div className="case-pagination-wrap">
        <div className="case-pagination">
          <a href="/case-lumina.html" className="pag-card">
            <span className="pag-label">Previous Case Study</span>{' '}
            <span className="pag-title">05 · Lumina Analytics (Study &amp; Focus Dashboard)</span>
          </a>
          <a href="/case-fintrack.html" className="pag-card u-ta-right">
            <span className="pag-label">Next Case Study</span>{' '}
            <span className="pag-title">07 · FinTrack App (FinTech UX)</span>
          </a>
        </div>
      </div>
    </CaseLayout>
  );
}
