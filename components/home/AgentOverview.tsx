'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { agents } from '../../lib/home';
import {
  manilaTime,
  missionReplay,
  parseStatus,
  replayEvents,
  timeAgo,
} from '../../lib/agent-status';
import { altShortcutBlocked, motionDisabled } from '../../lib/home-browser';
import Icon from './Icon';

type Log = {
  agent: string;
  icon: string;
  msg: string;
  highlight?: boolean;
  time: string;
  id: number;
};
export default function AgentOverview() {
  const [open, setOpen] = useState(false),
    [raw, setRaw] = useState<unknown>(null),
    [viewTime, setViewTime] = useState(0),
    [clock, setClock] = useState('--:--:--');
  const [logs, setLogs] = useState<Log[]>([]),
    [replaying, setReplaying] = useState(false),
    [highlight, setHighlight] = useState(''),
    [copied, setCopied] = useState(false);
  const modal = useRef<HTMLDivElement>(null),
    feed = useRef<HTMLDivElement>(null),
    timers = useRef<ReturnType<typeof setTimeout>[]>([]),
    copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined),
    sequence = useRef(0),
    eventIndex = useRef(3);
  const view = parseStatus(raw, viewTime),
    online = view
      ? Object.values(view.agents).filter((a) => a.state === 'online').length
      : 0,
    age = view ? timeAgo(viewTime - view.generatedAt) : '';
  const metadata = [];
  if (view?.latency) {
    const l = view.latency;
    metadata.push(
      `LLM round trip p50 ${Math.round(l.p50).toLocaleString('en-US')} ms, p95 ${Math.round(l.p95).toLocaleString('en-US')} ms (N=${l.n}, measured ${l.date})`,
    );
  }
  if (view?.packages) {
    const p = view.packages;
    metadata.push(
      `${p.count} job-application package${p.count === 1 ? '' : 's'} in the last ${p.days} days`,
    );
  }
  function append(
    event: { agent: string; icon: string; msg: string },
    highlight = false,
  ) {
    const entry = {
      ...event,
      highlight,
      time: manilaTime(),
      id: sequence.current++,
    };
    setLogs((previous) => [...previous, entry].slice(-30));
  }
  function cancelReplay() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setReplaying(false);
    setHighlight('');
  }
  useEffect(() => {
    const controller = new AbortController(),
      timeout = setTimeout(() => controller.abort(), 5000);
    void fetch('/data/status.json', {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) return;
        const data: unknown = await response.json();
        if (parseStatus(data, Date.now())) {
          setViewTime(Date.now());
          setRaw(data);
        }
      })
      .catch(() => {})
      .finally(() => clearTimeout(timeout));
    const updateClock = () => setClock(manilaTime());
    updateClock();
    const interval = setInterval(updateClock, 1000);
    append(
      {
        agent: 'REPLAY',
        icon: 'play',
        msg: 'Scripted replay. Each event mirrors a real agent schedule; this is not a live feed.',
      },
      true,
    );
    replayEvents.slice(0, 3).forEach((event) => append(event));
    return () => {
      controller.abort();
      clearTimeout(timeout);
      clearInterval(interval);
      timers.current.forEach(clearTimeout);
      clearTimeout(copyTimer.current);
    };
  }, []);
  useEffect(() => {
    const show = () => {
      setViewTime(Date.now());
      setOpen(true);
    };
    const close = () => setOpen(false);
    const toggle = () => {
      setViewTime(Date.now());
      setOpen((value) => !value);
    };
    window.openSentinelHUD = show;
    window.closeSentinelHUD = close;
    window.toggleSentinelHUD = toggle;
    const click = (event: Event) => {
      if (
        (event.target as Element).closest?.(
          '#heroOverviewBtn,#sentinelToggleBtn,#footerSentinelBar',
        )
      ) {
        event.preventDefault();
        show();
      }
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (
        event.code === 'KeyS' &&
        event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.repeat &&
        !altShortcutBlocked(event)
      ) {
        event.preventDefault();
        toggle();
      }
      if (
        (event.key === 'Enter' || event.key === ' ') &&
        (event.target as Element).id === 'footerSentinelBar'
      ) {
        event.preventDefault();
        show();
      }
    };
    document.addEventListener('click', click);
    document.addEventListener('keydown', key);
    const motion = () => {
      if (motionDisabled()) cancelReplay();
    };
    window.addEventListener('portfoliomotionchange', motion);
    return () => {
      document.removeEventListener('click', click);
      document.removeEventListener('keydown', key);
      window.removeEventListener('portfoliomotionchange', motion);
      delete window.openSentinelHUD;
      delete window.closeSentinelHUD;
      delete window.toggleSentinelHUD;
    };
  }, []);
  useEffect(() => {
    if (!open || !modal.current) return;
    const element = modal.current;
    window.portfolioOverlay?.open(element);
    element.querySelector<HTMLButtonElement>('#sentinelCloseBtn')?.focus();
    return () => window.portfolioOverlay?.close(element);
  }, [open]);
  useEffect(() => {
    if (feed.current) feed.current.scrollTop = feed.current.scrollHeight;
  }, [logs]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (open && !replaying && !document.hidden && !motionDisabled()) {
        append(replayEvents[eventIndex.current % replayEvents.length]);
        eventIndex.current++;
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [open, replaying]);
  useEffect(() => {
    const opener = document.getElementById('sentinelToggleBtn');
    if (view && opener)
      opener.setAttribute(
        'aria-label',
        `Open the agent overview (status snapshot published ${age}; not a live connection)`,
      );
  }, [raw, viewTime]);
  function replay() {
    if (replaying) return;
    if (motionDisabled()) {
      missionReplay.forEach((event) => append(event));
      return;
    }
    cancelReplay();
    setReplaying(true);
    append(
      {
        agent: 'REPLAY',
        icon: 'play',
        msg: 'Mission replay: the !apply job-application pipeline, step by step.',
      },
      true,
    );
    missionReplay.forEach((event, i) => {
      timers.current.push(
        setTimeout(
          () => {
            append(event);
            setHighlight(event.agent.toLowerCase());
            timers.current.push(setTimeout(() => setHighlight(''), 600));
          },
          (i + 1) * 650,
        ),
      );
    });
    timers.current.push(
      setTimeout(
        () => {
          append(
            {
              agent: 'REPLAY',
              icon: 'check',
              msg: 'Replay complete. In production, each step is an LLM call or tool run on the workstation.',
            },
            true,
          );
          setReplaying(false);
        },
        (missionReplay.length + 1) * 650,
      ),
    );
  }
  async function copyReport() {
    const current = parseStatus(raw, Date.now());
    const status = current
      ? `Agent status: snapshot published ${timeAgo(Date.now() - current.generatedAt)} (${new Date(current.generatedAt).toISOString()}); ` +
        ['sakura', 'chaewon', 'kazuha', 'yunjin', 'eunchae']
          .map((id) => `${id} ${current.agents[id].state}`)
          .join(', ')
      : 'Agent status: no snapshot loaded (scripted replay only)';
    const report = `# Hans Aaron Laureles — Multi-Agent System Status Report
Timestamp: ${manilaTime()} (UTC+8)
${status}
Location: Cavite, Philippines
Availability: Open for Full-Time & Remote AI & Software Engineering Roles (2026)

## Multi-Agent System Overview (5 Agents)
- Sakura (Coordinator Agent): Daily Briefings, Gmail Triage & Job-Application Pipeline
- Chaewon (Career Agent): Single-Page Resume Generator & Job Matching
- Kazuha (Code & Knowledge): Answers codebase questions & reviews uncommitted changes
- Yunjin (Design Reviewer Agent): Portfolio Audits & Case Study Critique
- Eunchae (System Guardian Agent): Hardware Vitals & Health Reports

## Architecture & Hosting
- AI Models: Groq + Gemini cloud APIs, with an optional local Ollama mode
- Agents: Discord bots running on a local workstation (no cloud hosting)
- Portfolio: https://hanslaureles.vercel.app/
- GitHub: https://github.com/hanslaureles
`;
    const feedback = () => {
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    };
    try {
      await navigator.clipboard.writeText(report);
      feedback();
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = report;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.append(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        feedback();
      } catch (error) {
        console.error('Clipboard copy failed', error);
      } finally {
        textarea.remove();
      }
    }
  }
  return (
    <div
      ref={modal}
      id="sentinelModal"
      className={`sentinel-modal${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sentinelModalTitle"
      aria-describedby="sentinelSimNote"
      aria-hidden={!open}
    >
      <div
        className="sentinel-backdrop"
        id="sentinelBackdrop"
        onClick={() => setOpen(false)}
      />
      <div className="sentinel-hud-container">
        <div className="sentinel-hud">
          <div className="sentinel-hud-header">
            <div className="sentinel-hud-title-group">
              <div className="sentinel-status-pill is-simulated">
                <span
                  className="sentinel-pulse-beacon is-simulated"
                  aria-hidden="true"
                />
                <span className="mono">AGENT OVERVIEW · LSFM AI HQ</span>
              </div>
              <h2 id="sentinelModalTitle" className="sentinel-title">
                Agent Overview
              </h2>
              <p className="sentinel-sim-note" id="sentinelSimNote">
                <span className="sentinel-sim-badge" id="agentOverviewBadge">
                  {view ? 'Snapshot' : 'Simulated / Replay'}
                </span>{' '}
                <span id="agentOverviewNote">
                  {view
                    ? `Agent status comes from a snapshot my workstation published ${age}. A bot counts as online only if it checked in within the last 15 minutes. The event stream below is still a scripted replay.`
                    : 'This panel replays scripted events. The agents run on my local workstation, and this site has no live connection to them.'}
                </span>
              </p>
            </div>
            <button
              className="sentinel-close-btn"
              id="sentinelCloseBtn"
              aria-label="Close the agent overview"
              onClick={() => setOpen(false)}
            >
              <span className="mono">
                ESC <Icon name="x" />
              </span>
            </button>
          </div>
          <div className="sentinel-metrics-grid">
            <div className="sentinel-metric-card">
              <span className="sentinel-metric-label mono">AGENT SYSTEM</span>
              <div
                className={`sentinel-metric-val${!view || online > 0 ? ' highlight-green' : ''}`}
              >
                <span id="agentOverviewAgentsVal">
                  {view ? `${online}/5 ONLINE` : '5 AGENTS'}
                </span>
              </div>
              <span
                className="sentinel-metric-sub mono"
                id="agentOverviewAgentsSub"
              >
                {view
                  ? 'Online = heartbeat under 15 min old'
                  : 'Discord bots · local host'}
              </span>
            </div>
            <div className="sentinel-metric-card">
              <span className="sentinel-metric-label mono">DATA SOURCE</span>
              <div className="sentinel-metric-val">
                <span id="agentOverviewSourceVal">
                  {view ? 'SNAPSHOT' : 'REPLAY'}
                </span>
              </div>
              <span
                className="sentinel-metric-sub mono"
                id="agentOverviewSourceSub"
              >
                {view ? `Published ${age}` : 'Scripted · not a live feed'}
              </span>
            </div>
            <div className="sentinel-metric-card">
              <span className="sentinel-metric-label mono">LOCAL TIME</span>
              <div className="sentinel-metric-val" id="hudClockDisplay">
                {clock}
              </div>
              <span className="sentinel-metric-sub mono">
                UTC+8 · Cavite, PH
              </span>
            </div>
            <div className="sentinel-metric-card">
              <span className="sentinel-metric-label mono">AVAILABILITY</span>
              <div className="sentinel-metric-val highlight-accent">
                <span>OPEN</span>
              </div>
              <span className="sentinel-metric-sub mono">
                Full-time &amp; Remote Roles
              </span>
            </div>
          </div>
          <p
            className="sentinel-sim-note sentinel-snapshot-meta"
            id="agentOverviewMeta"
            hidden={!metadata.length}
          >
            {metadata.join(' · ')}
          </p>
          <div className="sentinel-hud-body">
            <div className="sentinel-roster-column">
              <div className="sentinel-subheading mono">
                <span>AGENT ROSTER</span>
                <span className="sentinel-subheading-tag">
                  RUNS ON A LOCAL WORKSTATION
                </span>
              </div>
              <div className="agent-fleet-list" id="agentFleetList">
                {agents.map((agent) => {
                  const status = view?.agents[agent.id],
                    state = status?.state;
                  const badge =
                    state === 'online'
                      ? '● ONLINE'
                      : state === 'starting'
                        ? '● STARTING'
                        : state === 'last-seen'
                          ? `LAST SEEN ${timeAgo(viewTime - status!.beat!).toUpperCase()}`
                          : state === 'offline'
                            ? 'OFFLINE'
                            : state === 'unknown'
                              ? 'UNKNOWN'
                              : '● LOCAL';
                  const badgeClass =
                    state === 'online'
                      ? 'badge-online'
                      : state === 'last-seen'
                        ? 'badge-stale'
                        : state === 'offline' || state === 'unknown'
                          ? 'badge-offline'
                          : 'badge-ready';
                  return (
                    <div
                      className={`agent-fleet-item${highlight === agent.id ? ' pulse-highlight' : ''}`}
                      data-agent={agent.id}
                      key={agent.id}
                    >
                      <div className="agent-fleet-header">
                        <div className="agent-fleet-identity">
                          <span className="agent-fleet-emoji">
                            <Icon name={agent.icon} />
                          </span>
                          <div>
                            <div className="agent-fleet-name">{agent.name}</div>
                            <div className="agent-fleet-domain mono">
                              {agent.domain}
                            </div>
                          </div>
                        </div>
                        <span className={`agent-status-badge ${badgeClass}`}>
                          {badge}
                        </span>
                      </div>
                      <div className="agent-fleet-meta">
                        <span className="mono">{agent.meta}</span>
                        {agent.id === 'sakura' ? (
                          <button
                            className="agent-inline-action-btn"
                            id="sentinelOpenSakuraBtn"
                            onClick={() => {
                              flushSync(() => setOpen(false));
                              if (window.openSakuraCopilot)
                                window.openSakuraCopilot();
                              else
                                document
                                  .getElementById('sakuraFloatingBtn')
                                  ?.click();
                            }}
                          >
                            Chat with Sakura
                          </button>
                        ) : agent.id === 'chaewon' ? (
                          <a
                            href="/Hans_Laureles_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="agent-inline-action-btn"
                          >
                            View PDF
                          </a>
                        ) : agent.id === 'yunjin' ? (
                          <a
                            href="/case-lsfm.html"
                            className="agent-inline-action-btn"
                          >
                            Read Case Study
                          </a>
                        ) : (
                          <span className="mono text-muted">
                            {agent.id === 'kazuha'
                              ? 'Reviews Uncommitted Changes'
                              : '5-min vitals cycle'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sentinel-stream-column">
              <div className="sentinel-subheading mono">
                <span>SAMPLE EVENT STREAM</span>
                <span className="sentinel-sim-badge">Simulated / Replay</span>
              </div>
              <div
                ref={feed}
                className="sentinel-terminal-feed"
                id="sentinelLogFeed"
                role="log"
                aria-live="polite"
                tabIndex={0}
              >
                {logs.map((log) => (
                  <div
                    className={`sentinel-log-row ${log.highlight ? 'log-highlight' : ''}`}
                    key={log.id}
                  >
                    <span className="log-time mono">[{log.time}]</span>{' '}
                    <span className="log-agent mono">
                      <Icon name={log.icon} /> {log.agent}:
                    </span>{' '}
                    <span className="log-msg">{log.msg}</span>
                  </div>
                ))}
              </div>
              <div className="sentinel-actions-row">
                <button
                  className="btn btn-sm btn-primary"
                  id="sentinelReplayBtn"
                  disabled={replaying}
                  onClick={replay}
                >
                  <span>
                    <Icon name="play" />{' '}
                    {replaying ? 'Replaying...' : 'Replay a Mission'}
                  </span>
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  id="sentinelCopyReportBtn"
                  onClick={copyReport}
                >
                  <span>
                    <Icon name={copied ? 'check' : 'clipboard'} />{' '}
                    {copied
                      ? 'Copied Report to Clipboard!'
                      : 'Copy Summary Report'}
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="sentinel-hud-footer">
            <div
              className="mono"
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
            >
              LOCATION // CAVITE, PH · AGENT SYSTEM // 5 SPECIALIZED AGENTS ·
              SELF-HOSTED ON A WORKSTATION
            </div>
            <div
              className="mono"
              style={{ fontSize: '0.75rem', color: 'var(--accent)' }}
            >
              ALT+S TO TOGGLE · ESC TO CLOSE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
