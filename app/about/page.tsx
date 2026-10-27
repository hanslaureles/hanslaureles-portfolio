import type { Metadata } from 'next';
import Sakura from '../../components/Sakura';
import AboutView from '../../components/AboutView';
import ReadingProgress from '../../components/ReadingProgress';
import ContactEmail from '../../components/ContactEmail';
import { experience, milestones, skills } from '../../lib/about';

const socialTitle =
  'About Hans Aaron Laureles — Applied AI Engineer & Full-Stack Builder';
const socialDescription =
  'Biography, systems track, multi-agent engineering, and technical capabilities of Hans Aaron Laureles — Applied AI Engineer.';
const image =
  'https://hanslaureles.vercel.app/images/og/profile-pic.3bff5884.jpg';
export const metadata: Metadata = {
  title: 'About Me — Hans Aaron Laureles · Applied AI Engineer',
  description:
    'Biography, systems track, multi-agent engineering, and technical capabilities of Hans Aaron Laureles — Applied AI Engineer & Full-Stack Builder.',
  alternates: { canonical: 'https://hanslaureles.vercel.app/about.html' },
  openGraph: {
    type: 'profile',
    url: 'https://hanslaureles.vercel.app/about.html',
    title: socialTitle,
    description: socialDescription,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title: socialTitle,
    description: socialDescription,
    images: [image],
  },
};

export default async function About() {
  return (
    <>
      <main id="main-content" className="section-spacing">
        <div className="container">
          <a href="index.html" className="case-back-link">
            Return to Selected Work
          </a>
          <div className="about-hero-grid">
            <div className="portrait-wrapper">
              <div className="portrait-frame">
                <picture>
                  <source
                    type="image/avif"
                    srcSet="images/profile-pic-480.43163c35.avif 480w, images/profile-pic-960.60057a6a.avif 960w, images/profile-pic-1600.cec07c1a.avif 1600w, images/profile-pic-2400.8d516c5b.avif 2400w"
                    sizes="(max-width: 900px) 90vw, 340px"
                  />
                  <source
                    type="image/webp"
                    srcSet="images/profile-pic-480.6dfd3635.webp 480w, images/profile-pic-960.7db1c34c.webp 960w, images/profile-pic-1600.77f11b99.webp 1600w, images/profile-pic-2400.9d7014ed.webp 2400w"
                    sizes="(max-width: 900px) 90vw, 340px"
                  />
                  <img
                    src="images/profile-pic-960.7db1c34c.webp"
                    alt="Hans Aaron Laureles Portrait"
                    width="960"
                    height="960"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    data-full="images/profile-pic-2400.9d7014ed.webp"
                  />
                </picture>
              </div>
              <div
                className="mono"
                style={{
                  marginTop: 14,
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  textAlign: 'center',
                }}
              >
                HANS AARON LAURELES · CAVITE, PH
              </div>
            </div>
            <div className="about-narrative">
              <div className="badge badge-accent" style={{ marginBottom: 16 }}>
                The Engineer Behind the Architecture
              </div>
              <h1 className="type-h2">
                I build AI agents that are useful,
                <br />
                <span className="serif-italic">
                  and interfaces people enjoy using.
                </span>
              </h1>
              <p className="lead">
                I&apos;m <strong>Hans Aaron Laureles</strong>, a Computer
                Science graduate from De La Salle University–Dasmariñas focused
                on AI agent teams that use real tools, running models locally or
                in the cloud, and the full-stack web apps around them.
              </p>
              <p>
                I studied distributed computing, databases and algorithms. When
                language models started using real tools instead of only
                generating text, I moved my focus there:{' '}
                <strong>
                  sharing work across several AI models, running them on my own
                  computer, and making sure they use tools predictably.
                </strong>
              </p>
              <p>
                My frontend and UI/UX work, sharpened during my internship at{' '}
                <strong>ROC.PH</strong>, shapes how I build agents: I treat them
                as products people use. The agents are hosted on my own PC, and
                the screens around them should be quick to read and hard to
                misuse.
              </p>
            </div>
          </div>
          <hr className="hairline" style={{ margin: '48px 0' }} />
          <section className="section-spacing-sm" id="experience">
            <AboutView
              cards={experience.map((item) => (
                <div
                  className="experience-card"
                  key={item.title}
                  style={
                    item.color
                      ? {
                          borderLeft: `3px solid ${item.color}`,
                          paddingLeft: 20,
                        }
                      : undefined
                  }
                >
                  <div className="exp-header">
                    <div>
                      <div className="exp-title">{item.title}</div>
                      <div className="exp-company">{item.company}</div>
                    </div>
                    <div className="exp-period">{item.period}</div>
                  </div>
                  <ul className="exp-bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
              git={
                <>
                  <div className="git-terminal-header">
                    <div className="terminal-dots">
                      <span className="terminal-dot red" />
                      <span className="terminal-dot yellow" />
                      <span className="terminal-dot green" />
                    </div>
                    <div className="git-terminal-title mono">
                      $ git log --graph --oneline --decorate --stat
                    </div>
                    <div className="git-terminal-meta mono">
                      branch: main · 6 milestones
                    </div>
                  </div>
                  <div className="git-stream">
                    {milestones.map((item, i) => (
                      <div className="git-commit-entry" key={item.type}>
                        <div className="git-rail">
                          <span
                            className={`git-node-dot${i === 0 ? ' active' : ''}`}
                            style={
                              i === 0
                                ? {
                                    background: '#F59E0B',
                                    boxShadow:
                                      '0 0 10px rgba(245, 158, 11, 0.6)',
                                  }
                                : undefined
                            }
                          />
                          <span
                            className={`git-node-line${i === milestones.length - 1 ? ' end' : ''}`}
                          />
                        </div>
                        <div className="git-commit-body">
                          <div className="git-commit-top">
                            <div className="git-sha-wrap">
                              <span className="git-graph-symbol">*</span>
                              {i === 0 && (
                                <span className="git-badge head">
                                  HEAD -&gt; main
                                </span>
                              )}
                            </div>
                            <div className="git-date mono">{item.period}</div>
                          </div>
                          <div className="git-commit-title">
                            <strong
                              className="git-type"
                              style={i === 0 ? { color: '#FBBF24' } : undefined}
                            >
                              feat({item.type}):
                            </strong>{' '}
                            {item.title}
                          </div>
                          <div className="git-commit-author mono">
                            Author: Hans Aaron Laureles
                            &lt;hanslaureles92@gmail.com&gt;
                          </div>
                          <div className="git-commit-desc">
                            {item.description}
                          </div>
                          <ul className="git-commit-bullets mono">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>+ {bullet}</li>
                            ))}
                          </ul>
                          {item.links && (
                            <div className="git-commit-actions">
                              {item.links.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target={link.target}
                                  className="git-link-pill"
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              }
            />
          </section>
          <section className="section-spacing-sm">
            <div className="section-header">
              <div>
                <div className="section-tag">// 02 · CONTINUOUS LEARNING</div>
                <h2 className="type-h3">
                  Applied AI Competencies &amp; Growth
                </h2>
              </div>
            </div>
            <p style={{ marginBottom: 24, maxWidth: 800 }}>
              What I&apos;m practising now: getting AI agents to work together,
              running AI models on my own computer, and making them use tools
              reliably.
            </p>
            <div className="experience-timeline">
              <div className="experience-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-title">
                      ChatGPT Prompt Engineering for Developers
                    </div>
                    <div className="exp-company">
                      DeepLearning.AI · Co-created with OpenAI
                    </div>
                  </div>
                  <div className="badge badge-accent">PRACTICE</div>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Writing instructions that get reliable, structured answers
                  from AI models, and breaking big tasks into smaller steps.
                </p>
              </div>
              <div className="experience-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-title">Local Models on My GPU</div>
                    <div className="exp-company">
                      Ollama · on my own graphics card
                    </div>
                  </div>
                  <div className="badge badge-accent">PRACTICE</div>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Running smaller open AI models on an ordinary gaming graphics
                  card, so private work can stay on my computer.
                </p>
              </div>
            </div>
          </section>
          <section className="section-spacing-sm">
            <div className="section-header">
              <div>
                <div className="section-tag">// 03 · CAPABILITIES</div>
                <h2 className="type-h3">Core Engineering &amp; Design Stack</h2>
              </div>
            </div>
            <div className="skills-grid-triad">
              {skills.map((skill, i) => (
                <div className="skill-category" key={skill.title}>
                  <h3>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--accent)' }}
                    >
                      {i === 0 ? (
                        <>
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </>
                      ) : i === 1 ? (
                        <>
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </>
                      ) : (
                        <>
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </>
                      )}
                    </svg>{' '}
                    {skill.title}
                  </h3>
                  <div className="skill-pills">
                    {skill.items.map((item) => (
                      <span className="skill-pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="section-spacing-sm">
            <div
              className="hero-stats-panel"
              style={{ textAlign: 'center', padding: '48px 24px' }}
            >
              <h2 className="type-h3" style={{ marginBottom: 12 }}>
                Hiring for AI or full-stack work? Let&rsquo;s talk.
              </h2>
              <p style={{ maxWidth: 580, margin: '0 auto 24px auto' }}>
                I&apos;m based in Cavite, Philippines, and open to full-time
                remote Applied AI and full-stack roles.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <ContactEmail />
                <a
                  href="Hans_Laureles_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>{' '}
                  <span>Download Resume (PDF)</span>
                </a>
                <a
                  href="https://github.com/hanslaureles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>{' '}
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ReadingProgress />
      <Sakura />
    </>
  );
}
