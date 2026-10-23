'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { questions } from '../../lib/home';

export default function Faq({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <section
      id="recruiter-faq"
      className={`faq-section${ready ? ' faq-enhanced' : ''}`}
      aria-labelledby="faq-title"
    >
      <div className="container">
        <h2 id="faq-title" className="home-section-title">
          <span className="section-word" aria-hidden="true">
            FAQ
          </span>
          Recruiter FAQ
        </h2>
        {ready && (
          <div className="faq-layout">
            <div
              className="faq-tabs"
              role="tablist"
              aria-label="Recruiter questions"
              aria-orientation="vertical"
            >
              {questions.map((item, i) => (
                <button
                  key={item.label}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  id={`faq-tab-${i}`}
                  className="faq-tab"
                  role="tab"
                  aria-controls="faq-answer"
                  aria-selected={i === selected}
                  tabIndex={i === selected ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(event) => {
                    const next =
                      event.key === 'ArrowDown'
                        ? (i + 1) % 5
                        : event.key === 'ArrowUp'
                          ? (i + 4) % 5
                          : event.key === 'Home'
                            ? 0
                            : event.key === 'End'
                              ? 4
                              : null;
                    if (next === null) return;
                    event.preventDefault();
                    tabs.current[next]?.focus();
                    setSelected(next);
                  }}
                >
                  <span className="faq-tab-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
            <div
              id="faq-answer"
              className="faq-answer"
              tabIndex={0}
              role="tabpanel"
              aria-atomic="true"
              aria-labelledby={`faq-tab-${selected}`}
              aria-live="polite"
            >
              <span className="faq-number" aria-hidden="true">
                {String(selected + 1).padStart(2, '0')}
              </span>
              <h3>{questions[selected].question}</h3>
              <p>{questions[selected].answer}</p>
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
