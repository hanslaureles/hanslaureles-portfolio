import type { ReactNode } from 'react';

export default function Sections({ contact }: { contact: ReactNode }) {
  return (
    <>
      <section
        id="how-i-work"
        className="principles-section"
        aria-labelledby="how-i-work-title"
      >
        <div className="container">
          <h2 id="how-i-work-title" className="home-section-title">
            <span className="section-word" aria-hidden="true">
              METHOD
            </span>
            How I work
          </h2>
          <ol className="home-grid process-strip">
            <li>
              <a href="case-lsfm.html#problem">
                <span className="process-number">01</span>
                <h3>Problem &amp; constraint</h3>
                <p>Busywork spread across separate tools.</p>
              </a>
            </li>
            <li>
              <a href="case-lsfm.html#decisions">
                <span className="process-number">02</span>
                <h3>Decisions &amp; their costs</h3>
                <p>What I chose, what I passed over, why, and what it costs.</p>
              </a>
            </li>
            <li>
              <a href="case-lsfm.html#benchmarks">
                <span className="process-number">03</span>
                <h3>Results you can check</h3>
                <p>Every claim points to public code or a test.</p>
              </a>
            </li>
            <li>
              <a href="case-lsfm.html#retrospective">
                <span className="process-number">04</span>
                <h3>What broke &amp; what I&apos;d change</h3>
                <p>
                  A burst of notifications hit the AI service’s usage limit, so
                  I added a backup provider.
                </p>
              </a>
            </li>
          </ol>
        </div>
      </section>
      <section
        id="experience"
        className="experience-section"
        aria-labelledby="experience-title"
      >
        <div className="container">
          <h2 id="experience-title" className="home-section-title">
            <span className="section-word" aria-hidden="true">
              EXPERIENCE
            </span>
            Experience
          </h2>
          <ol className="resume-timeline">
            <li>
              <p className="timeline-date">Jun 2024 – Aug 2024</p>
              <div>
                <h3>UI/UX &amp; Frontend Engineer Intern</h3>
                <p className="timeline-place">
                  ROC.PH Digital Marketing Services
                </p>
                <p>
                  Designed and prototyped responsive web and mobile interfaces
                  in Figma.
                </p>
                <ul className="index-stack" aria-label="Tools">
                  <li>Figma</li>
                  <li>React</li>
                  <li>Tailwind CSS</li>
                  <li>HTML/CSS</li>
                </ul>
              </div>
            </li>
            <li>
              <p className="timeline-date">2021 – 2025</p>
              <div>
                <h3>BS Computer Science</h3>
                <p className="timeline-place">
                  De La Salle University–Dasmariñas
                </p>
                <p>
                  Distributed Systems, Software Engineering, Human-Computer
                  Interaction (HCI).
                </p>
                <ul className="index-stack" aria-label="Coursework">
                  <li>Algorithms &amp; Complexities</li>
                  <li>Database Management Systems</li>
                  <li>Object-Oriented Programming</li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section
        id="in-the-open"
        className="proof-section"
        aria-labelledby="proof-title"
      >
        <div className="container">
          <h2 id="proof-title" className="home-section-title">
            <span className="section-word" aria-hidden="true">
              PROOF
            </span>
            In the open
          </h2>
          <ul className="home-grid proof-strip">
            <li>
              <a
                href="https://github.com/hanslaureles/lsfm-ai-hq/actions/runs/39259275242"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="proof-label">Public LSFM AI HQ tests</span>
                <span className="proof-value">
                  434 automated tests, all passing
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/hanslaureles/cognitive-memory-core/actions/runs/37581718335"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="proof-label">Cognitive Memory Core tests</span>
                <span className="proof-value">
                  32 automated tests, all passing
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/hanslaureles"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="proof-label">Public GitHub activity</span>
                <span className="proof-value">
                  268 contributions in the past year
                </span>
              </a>
            </li>
          </ul>
          <p className="proof-date">
            As of <time dateTime="2026-10-21">21 Oct 2026</time>
          </p>
        </div>
      </section>
      {contact}
    </>
  );
}

export function ContactSection({ children }: { children: ReactNode }) {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact-card">
          <div className="contact-intro">
            <div className="badge badge-accent">
              Open to full-time remote roles
            </div>
            <h2 id="contact-title">
              Let&apos;s work <span className="serif-italic">together.</span>
            </h2>
          </div>
          <div className="contact-actions">
            {children}
            <div className="project-actions contact-links">
              <a
                href="https://linkedin.com/in/hanslaureles"
                className="project-case-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/hanslaureles"
                className="project-case-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="Hans_Laureles_Resume.pdf"
                className="project-case-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
