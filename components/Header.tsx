import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

export default function Header({ current }: { current?: 'work' | 'about' }) {
  return <header className="site-header"><div className="container header-inner">
    <a href="index.html" className="brand-mark" aria-label="Hans Laureles Home"><div className="brand-title"><span className="brand-dot" />Hans Aaron Laureles</div><div className="brand-subtitle">Applied AI Engineer // Full-Stack Builder</div></a>
    <nav aria-label="Main Navigation"><ul className="nav-links">
      <li><a href="index.html" className={`nav-link${current === 'work' ? ' active' : ''}`}>Selected Work</a></li>
      <li><a href="about.html" className={`nav-link${current === 'about' ? ' active' : ''}`}>About Me</a></li>
      <li><a href="Hans_Laureles_Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link">Resume ↗</a></li>
    </ul></nav>
    <div className="header-actions"><ThemeToggle />{current && <MobileMenu />}</div>
  </div></header>;
}
