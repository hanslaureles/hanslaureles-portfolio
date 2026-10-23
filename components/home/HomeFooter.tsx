import { projects } from '../../lib/home';

export default function HomeFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <nav className="footer-top-grid footer-map" aria-label="Portfolio map">
          <div className="footer-links-group">
            <h3>Case studies</h3>
            <ul className="footer-nav-list">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a href={`case-${project.slug}.html`}>{project.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-links-group">
            <h3>On this page</h3>
            <ul className="footer-nav-list">
              <li>
                <a href="#request-pipeline">Watch a request run</a>
              </li>
              <li>
                <a href="#selected-work">Selected work</a>
              </li>
              <li>
                <a href="#how-i-work">How I work</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#in-the-open">In the open</a>
              </li>
              <li>
                <a href="#recruiter-faq">Recruiter FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h3>More</h3>
            <ul className="footer-nav-list">
              <li>
                <a href="about.html">About me</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="footer-bottom">
          <div>© 2026 Hans Aaron Laureles · All Rights Reserved</div>
          <div
            className="footer-sentinel-bar"
            id="footerSentinelBar"
            role="button"
            tabIndex={0}
            title="Open the agent overview (Alt+S)"
          >
            <span
              className="sentinel-pulse-beacon-sm is-simulated"
              aria-hidden="true"
            />
            <span className="mono">
              AGENT OVERVIEW // LSFM AI HQ · 5-AGENT TEAM · UTC+8 CAVITE
            </span>
          </div>
          <div>Modern Web Engineering, AI Agents &amp; Clean Design</div>
        </div>
      </div>
    </footer>
  );
}
