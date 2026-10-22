import Icon from './Icon';

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-headline-wrap">
          <h1 id="hero-title" className="hero-headline">
            Applied AI Engineer building autonomous multi-agent pipelines &amp;
            modern web applications.
          </h1>
        </div>
        <div className="hero-unified-box">
          <div className="hero-box-header">
            <div className="hero-chip">
              <span className="hero-chip-icon">
                <Icon name="graduation-cap" />
              </span>
              <span>BS Computer Science Graduate · DLSU-D</span>
            </div>
            <div className="hero-chip hero-chip-live">
              <span className="badge-dot" aria-hidden="true" />
              <span>
                Based in Cavite, PH · open to remote Applied AI &amp; full-stack
                roles
              </span>
            </div>
            <a className="hero-chip hero-chip-proof" href="#in-the-open">
              <span className="hero-chip-icon" aria-hidden="true">
                <Icon name="circle-check" />
              </span>
              <span>
                Built and tested in the open <Icon name="arrow-down" />
              </span>
            </a>
          </div>
          <div className="hero-box-body">
            <p className="hero-lead-text">
              I build <strong>AI agents that do real work</strong> and{' '}
              <strong>the web interfaces around them</strong>. My agents can use
              cloud AI services or run privately on my own computer, and I
              design the screens people use to work with them.
            </p>
            <div className="hero-proof-strip">
              <a href="case-lsfm.html" className="hero-proof-item">
                <span>
                  01 <Icon name="arrow-up-right" />
                </span>
                <span>
                  <strong>LSFM AI HQ:</strong> A team of five AI helpers on
                  Discord that sort my email, tailor my resume for each job and
                  check my code
                </span>
              </a>
              <a href="case-ciel.html" className="hero-proof-item">
                <span>
                  02 <Icon name="arrow-up-right" />
                </span>
                <span>
                  <strong>Manas: Ciel:</strong> A voice assistant for my desk
                  that answers out loud in Japanese and English, with weather,
                  web search and a live dashboard
                </span>
              </a>
              <a href="case-memory.html" className="hero-proof-item">
                <span>
                  03 <Icon name="arrow-up-right" />
                </span>
                <span>
                  <strong>Memory Core:</strong> Saves the mistakes my AI coding
                  tools make and reminds them before the next task
                </span>
              </a>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#selected-work" className="btn btn-primary">
              Explore Selected Work <Icon name="arrow-down" />
            </a>
            <button
              type="button"
              id="heroOverviewBtn"
              className="btn btn-outline"
              aria-haspopup="dialog"
            >
              LSFM AI HQ <span aria-hidden="true">·</span>{' '}
              <span className="btn-micro-badge">5 Agents</span>
            </button>
            <a
              href="Hans_Laureles_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Resume (PDF) <Icon name="arrow-up-right" />
            </a>
            <a
              href="https://github.com/hanslaureles"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <span>
                GitHub <Icon name="arrow-up-right" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
