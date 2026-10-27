'use client';

import { useEffect, useState, type ReactNode } from 'react';

export default function AboutView({
  cards,
  git,
}: {
  cards: ReactNode;
  git: ReactNode;
}) {
  const [view, setView] = useState('cards');
  useEffect(() => {
    const sync = () => {
      let saved = null;
      try {
        saved = localStorage.getItem('hans_about_view_pref');
      } catch {}
      const mode = location.hash === '#cards' ? 'cards'
        : location.hash === '#git' || saved === 'git' ? 'git' : 'cards';
      setView(mode);
      if (!location.hash) history.replaceState(null, '', `${location.pathname}${location.search}#${mode}`);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);
  function select(mode: string) {
    setView(mode);
    if (location.hash !== `#${mode}`) history.pushState(null, '', `${location.pathname}${location.search}#${mode}`);
    try {
      localStorage.setItem('hans_about_view_pref', mode);
    } catch {}
  }
  return (
    <>
      <div
        className="section-header"
        style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}
      >
        <div>
          <div className="section-tag">// 01 · TRACK RECORD</div>
          <h2 className="type-h3">Engineering Experience &amp; Systems</h2>
        </div>
        <div
          className="view-toggle-wrap"
          role="tablist"
          aria-label="Experience View Switcher"
          onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const mode = event.key === 'Home' ? 'cards' : event.key === 'End' ? 'git'
              : view === 'cards' ? 'git' : 'cards';
            select(mode);
            event.currentTarget.querySelector<HTMLButtonElement>(mode === 'cards' ? '#btnViewCards' : '#btnViewGit')?.focus();
          }}
        >
          <button
            className={`view-toggle-btn${view === 'cards' ? ' active' : ''}`}
            id="btnViewCards"
            role="tab"
            tabIndex={view === 'cards' ? 0 : -1}
            aria-selected={view === 'cards'}
            aria-controls="experience-cards-view"
            onClick={() => select('cards')}
          >
            <span>📄 Executive Cards</span>
          </button>
          <button
            className={`view-toggle-btn${view === 'git' ? ' active' : ''}`}
            id="btnViewGit"
            role="tab"
            tabIndex={view === 'git' ? 0 : -1}
            aria-selected={view === 'git'}
            aria-controls="experience-git-view"
            onClick={() => select('git')}
          >
            <span>🌿 $ git log --graph</span>
          </button>
        </div>
      </div>
      <div
        className="experience-timeline"
        id="experience-cards-view"
        role="tabpanel"
        aria-labelledby="btnViewCards"
        tabIndex={0}
        style={{ display: view === 'cards' ? 'flex' : 'none' }}
      >
        {cards}
      </div>
      <div
        className="git-timeline-container"
        id="experience-git-view"
        role="tabpanel"
        aria-labelledby="btnViewGit"
        tabIndex={0}
        style={{ display: view === 'git' ? 'block' : 'none' }}
      >
        {git}
      </div>
    </>
  );
}
