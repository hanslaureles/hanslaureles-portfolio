'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { transition } from '../../lib/home-browser';

const filters = ['All', 'AI', 'Web', 'Mobile'];
export default function Discovery({
  gallery,
  index,
}: {
  gallery: ReactNode;
  index: ReactNode;
}) {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('gallery');
  const [ready, setReady] = useState(false);
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    section.current
      ?.querySelectorAll<HTMLElement>('.project-card,.index-project')
      .forEach((item) => {
        item.hidden = filter !== 'All' && item.dataset.category !== filter;
      });
  }, [filter]);
  function change(nextFilter: string, nextView: string) {
    void transition(
      () =>
        flushSync(() => {
          setFilter(nextFilter);
          setView(nextView);
        }),
      'work',
    );
  }
  return (
    <section
      ref={section}
      id="selected-work"
      className="work-section"
      aria-labelledby="selected-work-title"
    >
      <div className="container">
        <div className="section-heading-row">
          <h2 id="selected-work-title" className="home-section-title">
            <span className="section-word" aria-hidden="true">
              WORK
            </span>
            Selected work
          </h2>
          <div className="work-controls" hidden={!ready}>
            <div
              className="work-filters"
              role="tablist"
              aria-label="Project category"
            >
              {filters.map((label, i) => (
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  key={label}
                  id={`filter-${label.toLowerCase()}`}
                  type="button"
                  role="tab"
                  aria-selected={filter === label}
                  aria-controls="work-results"
                  tabIndex={filter === label ? 0 : -1}
                  data-filter={label}
                  onClick={() => change(label, view)}
                  onKeyDown={(event) => {
                    const next =
                      event.key === 'ArrowRight'
                        ? (i + 1) % 4
                        : event.key === 'ArrowLeft'
                          ? (i + 3) % 4
                          : event.key === 'Home'
                            ? 0
                            : event.key === 'End'
                              ? 3
                              : null;
                    if (next === null) return;
                    event.preventDefault();
                    tabs.current[next]?.focus();
                    change(filters[next], view);
                  }}
                >
                  {label}{' '}
                  <span className="filter-count">{[7, 3, 2, 2][i]}</span>
                </button>
              ))}
            </div>
            <div className="work-views" role="group" aria-label="Project view">
              {['gallery', 'index'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  data-view={mode}
                  aria-pressed={view === mode}
                  aria-controls="work-results"
                  onClick={() => change(filter, mode)}
                >
                  {mode === 'gallery' ? 'Gallery' : 'Index'}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          id="work-results"
          role={ready ? 'tabpanel' : undefined}
          tabIndex={ready ? 0 : undefined}
          aria-labelledby={ready ? `filter-${filter.toLowerCase()}` : undefined}
        >
          <div
            id="work-gallery"
            className="project-grid"
            hidden={view !== 'gallery'}
          >
            {gallery}
          </div>
          <ol id="work-index" className="work-index" hidden={view !== 'index'}>
            {index}
          </ol>
        </div>
      </div>
    </section>
  );
}
