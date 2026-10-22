import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import type { MenuLink } from '../lib/cases';
import Icon from './home/Icon';

export default function Header({
  current,
  mobileLinks,
  showSakura = false,
  home = false,
}: {
  current?: 'work' | 'about';
  mobileLinks?: MenuLink[];
  showSakura?: boolean;
  home?: boolean;
}) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="index.html"
          className="brand-mark"
          aria-label="Hans Laureles Home"
        >
          <div className="brand-title">
            <span className="brand-dot" />
            Hans Aaron Laureles
          </div>
          <div className="brand-subtitle">
            Applied AI Engineer // Full-Stack Builder
          </div>
        </a>
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a
                href="index.html"
                className={`nav-link${current === 'work' ? ' active' : ''}`}
              >
                Selected Work
              </a>
            </li>
            <li>
              <a
                href="about.html"
                className={`nav-link${current === 'about' ? ' active' : ''}`}
              >
                About Me
              </a>
            </li>
            <li>
              <a
                href="Hans_Laureles_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Resume {home ? <Icon name="arrow-up-right" /> : '↗'}
              </a>
            </li>
            {current && (
              <li>
                <a
                  href="https://github.com/hanslaureles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  GitHub {home ? <Icon name="arrow-up-right" /> : '↗'}
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="header-actions">
          {showSakura && (
            <button
              className="sakura-nav-btn"
              id="sakuraNavBtn"
              aria-label="Ask Sakura AI Recruiter Assistant"
              title="Ask Sakura AI Copilot (Ctrl+K)"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <span aria-hidden={home || undefined}>🌸</span>{' '}
              <span>Ask Sakura</span>
            </button>
          )}
          <ThemeToggle home={home} />
          {mobileLinks && (
            <MobileMenu
              links={mobileLinks}
              contact={home || current === 'about'}
              home={home}
            />
          )}
        </div>
      </div>
    </header>
  );
}
