'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    function shortcut(event: KeyboardEvent) {
      const target = event.target instanceof Element ? event.target : null;
      if (event.code === 'KeyT' && event.altKey && !event.ctrlKey && !event.metaKey && !event.repeat && !event.isComposing && event.keyCode !== 229 && !event.getModifierState('AltGraph') && !target?.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])')) {
        event.preventDefault();
        toggle();
      }
    }
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  function toggle() {
    const next = document.documentElement.getAttribute('data-theme') !== 'dark';
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    try { localStorage.setItem('hans_portfolio_theme', next ? 'dark' : 'light'); } catch {}
    setDark(next);
  }
  return <button className="theme-toggle-btn" aria-label="Toggle light and dark theme" title="Toggle theme (Alt+T)" aria-keyshortcuts="Alt+T" onClick={toggle}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {dark ? <><circle cx="12" cy="12" r="5" />{[[12,1,12,3],[12,21,12,23],[4.22,4.22,5.64,5.64],[18.36,18.36,19.78,19.78],[1,12,3,12],[21,12,23,12],[4.22,19.78,5.64,18.36],[18.36,5.64,19.78,4.22]].map(([x1,y1,x2,y2]) => <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}</> : <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />}
    </svg>
  </button>;
}
