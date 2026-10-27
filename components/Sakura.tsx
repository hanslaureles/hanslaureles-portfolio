'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import Icon from './home/Icon';
import '../lib/home-browser';

type Answer = {
  id: string;
  title: string;
  category: string;
  summary: string;
  evidence: string;
  link: string;
  linkText: string;
  secondaryUrl?: string;
  secondaryText?: string;
};
const prompts = [
  ['Tell me about the Manas Ciel voice AI copilot', 'Manas: Ciel Voice AI?'],
  ['Does Hans know React?', 'React Experience?'],
  ['Tell me about the LSFM AI HQ 5-agent team', 'The 5-Agent Team?'],
  ['How does FinTrack reduce budgeting friction?', 'FinTrack Two-Tap Logging?'],
  ['What did Hans do at ROC.ph internship?', 'ROC.ph Internship Work?'],
  ['Tell me about Vellum Minimal OS', 'Vellum Reflection OS?'],
  ['Local GPU inference on AMD RX 6600 XT', 'Local GPU Inference?'],
  [
    'What backend, AWS and cloud systems has Hans used?',
    'AWS & Cloud Systems?',
  ],
  [
    'Tell me about the Cognitive Memory Core project',
    'Cognitive Memory Project?',
  ],
  ["What were the results of Yunjin's audit?", 'Yunjin Design Audit?'],
  ['How does the agent overview panel work?', 'Agent Overview Panel?'],
  ['Tell me about the git log career timeline', 'Git Career Timeline?'],
];
function Welcome() {
  return (
    <div className="sakura-welcome-state">
      <div className="sakura-greeting-title">Ask me anything about Hans.</div>
      <p>
        Hi! I'm <strong>Sakura</strong>, a helper Hans created to answer
        questions while you explore. You can ask about the technologies he
        enjoys using, his projects, or his past work experience.
      </p>
    </div>
  );
}
export default function Sakura({ home = false }: { home?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState('');
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const drawer = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const pending = useRef<AbortController | null>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  function close() {
    setOpen(false);
    if (drawer.current) window.portfolioOverlay?.close(drawer.current);
  }
  useEffect(() => {
    setMounted(true);
    function show(event?: Event) {
      event?.preventDefault();
      flushSync(() => setOpen(true));
      if (drawer.current) window.portfolioOverlay?.open(drawer.current);
      input.current?.focus();
    }
    const triggers = document.querySelectorAll('.open-sakura-btn');
    triggers.forEach((trigger) => trigger.addEventListener('click', show));
    function keys(event: KeyboardEvent) {
      if (event.isComposing) return;
      if (event.key === 'Escape') close();
      if (
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        event.code === 'KeyK'
      )
        show(event);
    }
    window.openSakuraCopilot = show;
    document.addEventListener('keydown', keys);
    return () => {
      triggers.forEach((trigger) => trigger.removeEventListener('click', show));
      document.removeEventListener('keydown', keys);
      delete window.openSakuraCopilot;
      pending.current?.abort();
      clearTimeout(debounce.current);
      clearTimeout(copyTimer.current);
    };
  }, []);
  async function search(question: string) {
    clearTimeout(debounce.current);
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    setError('');
    if (question.trim().length < 2) {
      setAnswers(null);
      setBusy(false);
      return;
    }
    setBusy(true);
    setSearched(question);
    try {
      const response = await fetch('/api/sakura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });
      if (!response.ok)
        throw new Error(
          response.status === 429
            ? 'Too many questions. Try again in a minute.'
            : 'Unable to answer. Please try again.',
        );
      const body = await response.json();
      if (!controller.signal.aborted) setAnswers(body.answers);
    } catch (failure) {
      if (!controller.signal.aborted)
        setError(
          failure instanceof Error
            ? failure.message
            : 'Unable to answer. Please try again.',
        );
    } finally {
      if (!controller.signal.aborted) setBusy(false);
    }
  }
  function change(value: string) {
    setQuery(value);
    pending.current?.abort();
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      void search(value);
    }, 300);
  }
  function icon(name: string, fallback: string) {
    return home ? <Icon name={name} /> : fallback;
  }
  if (!mounted) return null;
  return createPortal(
    <>
      <button
        id="sakuraFloatingBtn"
        className="sakura-floating-trigger"
        aria-label="Open Ask Sakura AI Recruiter Assistant"
        onClick={() => window.openSakuraCopilot?.()}
      >
        <span className="sakura-badge-pulse" />
        <span className="sakura-trigger-icon" aria-hidden="true">
          🌸
        </span>
        <span className="sakura-trigger-text">Ask Sakura</span>
        <span className="sakura-trigger-tag">AI</span>
      </button>
      <div>
        <div
          className={`sakura-backdrop${open ? ' active' : ''}`}
          id="sakuraBackdrop"
          onClick={close}
        />
        <div
          className={`sakura-drawer${open ? ' active' : ''}`}
          id="sakuraDrawer"
          ref={drawer}
          role="dialog"
          aria-modal="true"
          aria-label="Ask Sakura AI Recruiter Assistant"
        >
          <div className="sakura-header">
            <div className="sakura-brand">
              <div className="sakura-avatar">{icon('workflow', '🌸')}</div>
              <div className="sakura-meta">
                <div className="sakura-title">
                  <span>Sakura</span>
                  <span className="sakura-tag">Portfolio Assistant</span>
                </div>
                <div className="sakura-sub">
                  Ask anything about Hans's work &amp; experience
                </div>
              </div>
            </div>
            <button
              className="sakura-close-btn"
              id="sakuraCloseBtn"
              aria-label="Close Drawer (ESC)"
              onClick={close}
            >
              {icon('x', '✕')}{' '}
              <span
                className="mono"
                style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
              >
                ESC
              </span>
            </button>
          </div>
          <div className="sakura-telemetry">
            <span className="telemetry-live-dot" />
            <span>Online · Ready to answer questions</span>
          </div>
          <div className="sakura-body">
            <div className="sakura-search-box">
              <span className="search-prompt">&gt;</span>
              <input
                type="text"
                id="sakuraSearchInput"
                ref={input}
                className="sakura-input"
                placeholder="Ask anything (e.g., 'What cloud services has Hans used?')..."
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={(event) => change(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.nativeEvent.isComposing)
                    void search(query);
                }}
              />
              <button
                className="sakura-clear-input"
                id="sakuraClearInput"
                style={{ display: query.trim() ? 'block' : 'none' }}
                aria-label="Clear Input"
                onClick={() => {
                  setQuery('');
                  void search('');
                  input.current?.focus();
                }}
              >
                {icon('x', '✕')}
              </button>
            </div>
            <div className="sakura-prompt-chips">
              <div className="chips-label mono">// QUICK QUESTIONS:</div>
              <div className="chips-list">
                {prompts.map(([question, label]) => (
                  <button
                    className="sakura-chip"
                    data-query={question}
                    key={question}
                    onClick={() => {
                      setQuery(question);
                      void search(question);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="sakura-output"
              id="sakuraOutput"
              aria-live="polite"
              aria-label="Sakura's answers"
              aria-busy={busy}
              onClick={(event) => {
                const link = (event.target as Element).closest(
                  'a[href$="#project-lsfm"]',
                );
                if (!link || !window.openSentinelHUD) return;
                event.preventDefault();
                flushSync(close);
                const button = document.getElementById('sentinelToggleBtn');
                (button?.getClientRects().length
                  ? button
                  : document.getElementById('heroOverviewBtn')
                )?.focus();
                window.openSentinelHUD();
              }}
            >
              {error ? (
                <p role="alert">{error}</p>
              ) : answers === null ? (
                <Welcome />
              ) : !answers.length ? (
                <div className="sakura-no-results">
                  <div
                    className="mono"
                    style={{ color: 'var(--accent)', marginBottom: 8 }}
                  >
                    // NO MATCH FOUND
                  </div>
                  <h3>I couldn't find an answer for &quot;{searched}&quot;</h3>
                  <p>
                    Try asking with keywords like <code>React</code>,{' '}
                    <code>AWS</code>, <code>ROC.ph</code>, <code>Projects</code>
                    , or <code>Education</code>, or browse Hans's case studies
                    directly below.
                  </p>
                  <div style={{ marginTop: 16 }}>
                    <a href="/about.html" className="btn btn-outline btn-sm">
                      Read Full Profile (About Me)
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="sakura-search-meta">
                    <span
                      className="mono"
                      style={{ color: 'var(--tone-pink)', fontWeight: 600 }}
                    >
                      {icon('workflow', '🌸')} SAKURA BRIEFING
                    </span>
                    <span
                      className="mono"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {answers.length} relevant topic
                      {answers.length > 1 ? 's' : ''} found
                    </span>
                  </div>
                  <div className="sakura-answer-card primary">
                    <div className="card-header-bar">
                      <span className="sakura-category-tag">
                        {answers[0].category}
                      </span>
                      <span className="sakura-score-badge">Top Match</span>
                    </div>
                    <h3 className="sakura-answer-title">{answers[0].title}</h3>
                    <div className="sakura-answer-lead">
                      {answers[0].summary}
                    </div>
                    <div className="sakura-answer-evidence">
                      <strong>Key Evidence &amp; Production Context:</strong>
                      <br />
                      {answers[0].evidence}
                    </div>
                    <div className="sakura-actions">
                      <a href={answers[0].link} className="sakura-action-link">
                        {answers[0].linkText}
                      </a>
                      {answers[0].secondaryUrl && (
                        <a
                          href={answers[0].secondaryUrl}
                          className="sakura-action-link secondary"
                        >
                          {answers[0].secondaryText || ''}
                        </a>
                      )}
                    </div>
                  </div>
                  {answers.length > 1 && (
                    <>
                      <div
                        className="mono chips-label"
                        style={{ marginTop: 24, marginBottom: 12 }}
                      >
                        // ALSO RELEVANT:
                      </div>
                      <div className="sakura-secondary-list">
                        {answers.slice(1).map((answer) => (
                          <div
                            className="sakura-answer-card secondary-card"
                            key={answer.id}
                          >
                            <div className="card-header-bar">
                              <span className="sakura-category-tag">
                                {answer.category}
                              </span>
                              <span
                                className="mono"
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'var(--text-muted)',
                                }}
                              >
                                Related
                              </span>
                            </div>
                            <h4
                              style={{ margin: '6px 0 8px', fontSize: '1rem' }}
                            >
                              {answer.title}
                            </h4>
                            <p
                              style={{
                                fontSize: '0.88rem',
                                color: 'var(--text-secondary)',
                                margin: '0 0 10px',
                              }}
                            >
                              {answer.summary}
                            </p>
                            <a
                              href={answer.link}
                              className="sakura-action-link sm"
                            >
                              {answer.linkText}
                            </a>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="sakura-footer">
            <div className="sakura-footer-links">
              <a
                href="/Hans_Laureles_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="sakura-foot-btn"
              >
                {icon('clipboard', '📄')} Download Resume
              </a>
              <a href="/case-lsfm.html" className="sakura-foot-btn">
                {icon('briefcase', '⭐')} LSFM Case Study
              </a>
              <button
                className="sakura-foot-btn"
                id="sakuraCopyEmail"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      'hanslaureles92@gmail.com',
                    );
                    setCopied(true);
                    clearTimeout(copyTimer.current);
                    copyTimer.current = setTimeout(
                      () => setCopied(false),
                      2000,
                    );
                  } catch {
                    setError('Unable to copy. Email hanslaureles92@gmail.com.');
                  }
                }}
              >
                {copied ? (
                  <>{icon('check', '✅')} Copied to Clipboard!</>
                ) : (
                  <>{icon('mail', '✉️')} Copy Email</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
