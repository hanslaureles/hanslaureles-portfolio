'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function MobileMenu() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLDivElement>(null);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!open || !drawer.current) return;
    const el = drawer.current;
    window.portfolioOverlay?.open(el);
    el.querySelector('button')?.focus();
    function escape(event: KeyboardEvent) { if (event.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('keydown', escape); window.portfolioOverlay?.close(el); };
  }, [open]);
  return <><button className="mobile-menu-btn" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobileMenu" onClick={() => setOpen(true)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg></button>{mounted && createPortal(<div ref={drawer} id="mobileMenu" className={`mobile-drawer${open ? ' open' : ''}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Navigation menu"><div className="mobile-drawer-header"><div className="brand-title"><span className="brand-dot" />Hans Laureles</div><button className="mobile-drawer-close btn btn-outline btn-sm" aria-label="Close menu" onClick={() => setOpen(false)}>✕ Close</button></div><ul className="mobile-drawer-links"><li><a href="index.html">Selected Work</a></li><li><a href="about.html">About Me</a></li><li><a href="Hans_Laureles_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume (PDF) ↗</a></li></ul></div>, document.body)}</>;
}
