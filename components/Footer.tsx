export default function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) return <footer className="site-footer site-footer-minimal"><div className="container"><div className="footer-bottom"><div>© 2026 Hans Aaron Laureles · All Rights Reserved</div><div className="u-d-flex u-gap-16px u-items-center"><a href="https://github.com/hanslaureles" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="index.html" className="u-c-accent">← Selected Work</a></div></div></div></footer>;
  return <footer className="site-footer"><div className="container"><div className="footer-bottom"><div>© 2026 Hans Aaron Laureles · All Rights Reserved</div><div><a href="index.html" style={{ color: 'var(--accent)' }}>hanslaureles.com</a></div></div></div></footer>;
}
