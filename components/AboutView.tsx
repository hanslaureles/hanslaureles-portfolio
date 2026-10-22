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
    let saved = null;
    try {
      saved = localStorage.getItem('hans_about_view_pref');
    } catch {}
    if (location.hash === '#git' || saved === 'git') setView('git');
  }, []);
  function select(mode: string) {
    setView(mode);
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
        >
          <button
            className={`view-toggle-btn${view === 'cards' ? ' active' : ''}`}
            id="btnViewCards"
            role="tab"
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
        style={{ display: view === 'cards' ? 'flex' : 'none' }}
      >
        {cards}
      </div>
      <div
        className="git-timeline-container"
        id="experience-git-view"
        role="tabpanel"
        style={{ display: view === 'git' ? 'block' : 'none' }}
      >
        {git}
      </div>
    </>
  );
}
