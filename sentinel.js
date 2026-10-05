/**
 * AGENT OVERVIEW PANEL
 * The portfolio has no live connection to the LSFM AI HQ agents, which run on a local workstation.
 * - Agent status comes from /data/status.json, a snapshot that LE-SSERAFIM-AI-HQ's
 *   eunchae_publisher writes on demand. A bot reads "online" only if its heartbeat is under
 *   15 minutes old at the moment the page is viewed; anything older reads "last seen …".
 * - If the snapshot is missing or malformed, the panel stays on the scripted replay.
 * - The event stream is always a scripted replay; each event mirrors a real schedule or
 *   pipeline step in LE-SSERAFIM-AI-HQ (bot_*.py). No numbers are generated or faked.
 */

(function () {
  'use strict';

  // DOM Elements
  let modal, backdrop, closeBtn, openBtn, heroClock, hudClock, logFeed, replayBtn, copyBtn;
  let eventInterval = null;
  let clockInterval = null;
  let replayTimers = [];
  let lastFocusedElement = null;

  // Each event describes a real schedule (tasks.loop) or command in the public lsfm-ai-hq repo.
  const REPLAY_EVENTS = [
    { agent: 'EUNCHAE', emoji: '🛡️', msg: 'Watchdog cycle: CPU, RAM and disk sampled via psutil (every 5 min).' },
    { agent: 'SAKURA', emoji: '🌸', msg: 'Daily briefing posts once a day after 08:00.' },
    { agent: 'YUNJIN', emoji: '🎨', msg: 'Weekly portfolio audit: page structure and image assets scanned.' },
    { agent: 'SAKURA', emoji: '🌸', msg: 'On !inbox: unread mail is classified into 10 LSFM/ Gmail labels.' },
    { agent: 'KAZUHA', emoji: '💻', msg: 'On !ask: answers are grounded in the SQLite + Gemini-embedding knowledge base.' },
    { agent: 'CHAEWON', emoji: '⭐', msg: 'On !pdf: the single-page ATS resume is compiled with headless Edge.' }
  ];

  // Scripted replay of the real !apply pipeline in bot_sakura.py, in its actual order.
  const MISSION_REPLAY = [
    { agent: 'SAKURA', emoji: '🌸', msg: '!apply <job url> received: scraping the posting, extracting role and company.' },
    { agent: 'CHAEWON', emoji: '⭐', msg: 'Analyzing ATS fit and tailoring the resume and cover letter.' },
    { agent: 'YUNJIN', emoji: '🎨', msg: 'Curating the flagship case studies that best match the role.' },
    { agent: 'KAZUHA', emoji: '💻', msg: 'Drafting the frontend tech pitch and CS positioning.' },
    { agent: 'EUNCHAE', emoji: '🛡️', msg: 'QA check: the package is scored against the team\'s recorded failure lessons.' },
    { agent: 'SAKURA', emoji: '🌸', msg: 'Master proposal compiled and posted to the approvals channel for review.' }
  ];

  // --- Agent status snapshot (/data/status.json, schema 1) ---
  const STATUS_URL = '/data/status.json';
  const AGENT_IDS = ['sakura', 'chaewon', 'kazuha', 'yunjin', 'eunchae'];
  const ONLINE_MAX_AGE_MS = 15 * 60 * 1000;  // eunchae_publisher.STALE_AFTER_S
  const CLOCK_SKEW_MS = 5 * 60 * 1000;       // tolerated drift between viewer and workstation clocks
  const FETCH_TIMEOUT_MS = 5000;
  let snapshot = null;

  function parseUtc(value) {
    if (typeof value !== 'string') return null;
    const t = Date.parse(value);
    return Number.isFinite(t) ? t : null;
  }

  // Turns the raw file into what the panel shows, judged at time `now` (ms). Returns null
  // for anything that is not a usable schema-1 snapshot, so the caller keeps the replay.
  function parseStatus(raw, now) {
    if (!raw || typeof raw !== 'object' || raw.schema_version !== 1) return null;
    const generatedAt = parseUtc(raw.generated_at);
    if (generatedAt === null || generatedAt > now + CLOCK_SKEW_MS) return null;
    if (!raw.swarm || typeof raw.swarm !== 'object') return null;

    const agents = {};
    AGENT_IDS.forEach(id => {
      const s = raw.swarm[id];
      const beat = s && typeof s === 'object' ? parseUtc(s.last_heartbeat_utc) : null;
      const fresh = beat !== null && beat <= now + CLOCK_SKEW_MS && now - beat <= ONLINE_MAX_AGE_MS;
      let state;
      if (beat !== null && beat > now + CLOCK_SKEW_MS) state = 'unknown';       // heartbeat from the future
      else if (fresh && s.status === 'online') state = 'online';
      else if (fresh && s.status === 'not_ready') state = 'starting';
      else if (beat !== null) state = 'last-seen';
      else if (s && s.status === 'offline') state = 'offline';
      else state = 'unknown';
      agents[id] = { state, beat };
    });

    const lat = raw.llm_latency;
    const latency = lat && typeof lat === 'object' && Number.isFinite(lat.p50_ms) && Number.isFinite(lat.p95_ms)
      && Number.isInteger(lat.sample_count) && lat.sample_count > 0 && typeof lat.measured_on === 'string'
      ? { p50: lat.p50_ms, p95: lat.p95_ms, n: lat.sample_count, date: lat.measured_on }
      : null;
    const m = raw.missions;
    const packages = m && Number.isInteger(m.application_packages) && m.application_packages >= 0
      ? { count: m.application_packages, days: m.window_days } : null;

    return { generatedAt, agents, latency, packages };
  }

  function timeAgo(ms) {
    const min = Math.floor(Math.max(0, ms) / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return `${min} min ago`;
    const h = Math.floor(min / 60);
    if (h < 48) return `${h} h ago`;
    return `${Math.floor(h / 24)} days ago`;
  }

  const BADGES = {
    'online': ['badge-online', () => '● ONLINE'],
    'starting': ['badge-ready', () => '● STARTING'],
    'last-seen': ['badge-stale', (a, now) => `LAST SEEN ${timeAgo(now - a.beat).toUpperCase()}`],
    'offline': ['badge-offline', () => 'OFFLINE'],
    'unknown': ['badge-offline', () => 'UNKNOWN']
  };

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Re-run on every open: "online" and "… ago" depend on when the panel is viewed.
  function renderSnapshot() {
    if (!snapshot) return;
    const now = Date.now();
    const raw = snapshot.raw;
    const view = parseStatus(raw, now);
    if (!view) return;

    let onlineCount = 0;
    AGENT_IDS.forEach(id => {
      const a = view.agents[id];
      if (a.state === 'online') onlineCount++;
      const badge = document.querySelector(`.agent-fleet-item[data-agent="${id}"] .agent-status-badge`);
      if (!badge) return;
      const [cls, label] = BADGES[a.state];
      badge.classList.remove('badge-online', 'badge-ready', 'badge-stale', 'badge-offline');
      badge.classList.add(cls);
      badge.textContent = label(a, now);
    });

    const age = timeAgo(now - view.generatedAt);
    setText('agentOverviewAgentsVal', `${onlineCount}/5 ONLINE`);
    const countEl = document.getElementById('agentOverviewAgentsVal');
    if (countEl && countEl.parentElement) countEl.parentElement.classList.toggle('highlight-green', onlineCount > 0);
    setText('agentOverviewAgentsSub', 'Online = heartbeat under 15 min old');
    setText('agentOverviewSourceVal', 'SNAPSHOT');
    setText('agentOverviewSourceSub', `Published ${age}`);
    setText('agentOverviewNote',
      `Agent status comes from a snapshot my workstation published ${age}. A bot counts as online only if it ` +
      'checked in within the last 15 minutes. The event stream below is still a scripted replay.');
    setText('agentOverviewBadge', 'Snapshot');
    setText('heroAgentBadge', `Snapshot · ${age}`);
    const opener = document.getElementById('sentinelToggleBtn');
    if (opener) opener.setAttribute('aria-label', `Open the agent overview (status snapshot published ${age}; not a live connection)`);

    const meta = [];
    if (view.latency) {
      meta.push(`LLM round trip p50 ${Math.round(view.latency.p50).toLocaleString('en-US')} ms, ` +
        `p95 ${Math.round(view.latency.p95).toLocaleString('en-US')} ms (N=${view.latency.n}, measured ${view.latency.date})`);
    }
    if (view.packages) {
      meta.push(`${view.packages.count} job-application package${view.packages.count === 1 ? '' : 's'} in the last ${view.packages.days} days`);
    }
    const metaEl = document.getElementById('agentOverviewMeta');
    if (metaEl && meta.length) {
      metaEl.textContent = meta.join(' · ');
      metaEl.hidden = false;
    }
  }

  // Any failure (404, offline preview, timeout, bad JSON) leaves the replay untouched, silently.
  async function loadSnapshot() {
    if (!window.fetch) return;
    const ctrl = window.AbortController ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS) : null;
    try {
      const res = await fetch(STATUS_URL, { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined });
      if (!res.ok) return;
      const raw = await res.json();
      if (!parseStatus(raw, Date.now())) return;
      snapshot = { raw };
      renderSnapshot();
    } catch (e) {
      // keep the replay
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  document.addEventListener('DOMContentLoaded', initSentinel);

  function initSentinel() {
    modal = document.getElementById('sentinelModal');
    backdrop = document.getElementById('sentinelBackdrop');
    closeBtn = document.getElementById('sentinelCloseBtn');
    openBtn = document.getElementById('sentinelToggleBtn');
    heroClock = document.getElementById('heroClockDisplay');
    hudClock = document.getElementById('hudClockDisplay');
    logFeed = document.getElementById('sentinelLogFeed');
    replayBtn = document.getElementById('sentinelReplayBtn');
    copyBtn = document.getElementById('sentinelCopyReportBtn');

    // Clock is real (Manila local time); there is deliberately no latency/ping readout.
    updateClock();
    clockInterval = setInterval(updateClock, 1000);

    // Seed Initial Logs
    if (logFeed) {
      seedInitialLogs();
      startEventStream();
    }

    if (modal) loadSnapshot();

    // Attach Event Listeners
    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }

    const footerOpenBtn = document.getElementById('footerSentinelBar');
    if (footerOpenBtn) {
      footerOpenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }

    if (replayBtn) {
      replayBtn.addEventListener('click', handleReplayMission);
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', handleCopyReport);
    }

    // Connect to Sakura Copilot button inside modal
    const sentinelOpenSakura = document.getElementById('sentinelOpenSakuraBtn');
    if (sentinelOpenSakura) {
      sentinelOpenSakura.addEventListener('click', () => {
        closeModal();
        if (window.openSakuraCopilot) {
          window.openSakuraCopilot();
        } else {
          const sakuraNav = document.getElementById('sakuraNavBtn');
          if (sakuraNav) sakuraNav.click();
        }
      });
    }

    // Keyboard Shortcuts: Alt+S toggles, Escape closes. A modifier is
    // required (WCAG 2.1.4); e.code keeps it working with macOS Option.
    // It stands down while typing: macOS Option+S types "ß" and AltGr layouts
    // (Polish, German, ...) type accented letters in text fields.
    function altShortcutBlocked(e) {
      if (e.isComposing || e.keyCode === 229) return true;
      if (e.getModifierState && e.getModifierState('AltGraph')) return true;
      const el = e.target instanceof Element ? e.target : null;
      return Boolean(el && (el.isContentEditable || el.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')));
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isModalOpen()) {
        closeModal();
      } else if (e.code === 'KeyS' && e.altKey && !e.ctrlKey && !e.metaKey && !e.repeat && !altShortcutBlocked(e)) {
        e.preventDefault();
        // Toggle modal
        if (isModalOpen()) {
          closeModal();
        } else {
          openModal();
        }
      }
    });

    // Expose global methods
    window.openSentinelHUD = openModal;
    window.closeSentinelHUD = closeModal;
    window.toggleSentinelHUD = () => isModalOpen() ? closeModal() : openModal();
  }

  // --- Clock Logic (Manila UTC+8) ---
  function updateClock() {
    try {
      const now = new Date();
      // Format time in Asia/Manila timezone
      const timeString = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);

      const fullString = `${timeString} UTC+8`;

      if (heroClock) heroClock.textContent = fullString;
      if (hudClock) hudClock.textContent = timeString;
    } catch (e) {
      // Fallback
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const manila = new Date(utc + (3600000 * 8));
      const str = manila.toTimeString().split(' ')[0];
      if (heroClock) heroClock.textContent = `${str} UTC+8`;
      if (hudClock) hudClock.textContent = str;
    }
  }

  // --- Modal Open / Close ---
  function isModalOpen() {
    return modal && modal.classList.contains('is-open');
  }

  function openModal() {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    renderSnapshot();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    // app.js owns scroll lock, inert background and focus return for all overlays.
    if (window.portfolioOverlay) window.portfolioOverlay.open(modal);
    else document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    if (window.portfolioOverlay) {
      window.portfolioOverlay.close(modal); // also returns focus to the opener
    } else {
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
    }
  }

  // --- Event Stream Logging ---
  function getManilaTimestamp() {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());
    } catch (e) {
      return new Date().toTimeString().split(' ')[0];
    }
  }

  function appendLog(agent, emoji, msg, isHighlight = false) {
    if (!logFeed) return;

    const row = document.createElement('div');
    row.className = `sentinel-log-row ${isHighlight ? 'log-highlight' : ''}`;
    
    // Built with textContent so messages like "!apply <job url>" render literally, never as markup.
    const parts = [
      ['log-time mono', `[${getManilaTimestamp()}]`],
      ['log-agent mono', `${emoji} ${agent}:`],
      ['log-msg', msg]
    ];
    parts.forEach(([cls, text], i) => {
      const span = document.createElement('span');
      span.className = cls;
      span.textContent = text;
      row.appendChild(span);
      if (i < parts.length - 1) row.appendChild(document.createTextNode(' '));
    });

    logFeed.appendChild(row);

    // Keep maximum 30 log lines
    while (logFeed.children.length > 30) {
      logFeed.removeChild(logFeed.firstChild);
    }

    // Auto-scroll to bottom
    logFeed.scrollTop = logFeed.scrollHeight;
  }

  function seedInitialLogs() {
    logFeed.innerHTML = '';
    appendLog('REPLAY', '▶', 'Scripted replay. Each event mirrors a real agent schedule; this is not a live feed.', true);
    REPLAY_EVENTS.slice(0, 3).forEach(ev => appendLog(ev.agent, ev.emoji, ev.msg));
  }

  function startEventStream() {
    if (eventInterval) clearInterval(eventInterval);

    // Cycle through the schedule events in order (deterministic, no random data).
    let nextIndex = 3;
    eventInterval = setInterval(() => {
      if (!document.hidden && isModalOpen() && !(replayBtn && replayBtn.disabled)) {
        const ev = REPLAY_EVENTS[nextIndex % REPLAY_EVENTS.length];
        nextIndex++;
        appendLog(ev.agent, ev.emoji, ev.msg);
      }
    }, 7000);
  }

  // --- Scripted "Replay a Mission" walkthrough of the real !apply pipeline ---
  function handleReplayMission() {
    if (!replayBtn || replayBtn.disabled) return;
    replayBtn.disabled = true;
    const originalText = replayBtn.innerHTML;
    replayBtn.innerHTML = `<span>▶ Replaying...</span>`;
    replayTimers.forEach(clearTimeout);
    replayTimers = [];

    appendLog('REPLAY', '▶', 'Mission replay: the !apply job-application pipeline, step by step.', true);

    const agentItems = document.querySelectorAll('.agent-fleet-item');
    MISSION_REPLAY.forEach((step, idx) => {
      replayTimers.push(setTimeout(() => {
        appendLog(step.agent, step.emoji, step.msg);
        const card = Array.from(agentItems).find(el => el.dataset.agent === step.agent.toLowerCase());
        if (card) {
          card.classList.add('pulse-highlight');
          setTimeout(() => card.classList.remove('pulse-highlight'), 600);
        }
      }, (idx + 1) * 650));
    });

    replayTimers.push(setTimeout(() => {
      appendLog('REPLAY', '■', 'Replay complete. In production, each step is an LLM call or tool run on the workstation.', true);
      replayBtn.disabled = false;
      replayBtn.innerHTML = originalText;
    }, (MISSION_REPLAY.length + 1) * 650));
  }

  // --- Copy Architecture Report ---
  function handleCopyReport() {
    const time = getManilaTimestamp();
    const view = snapshot ? parseStatus(snapshot.raw, Date.now()) : null;
    const statusLine = view
      ? `Agent status: snapshot published ${timeAgo(Date.now() - view.generatedAt)} (${new Date(view.generatedAt).toISOString()}); ` +
        AGENT_IDS.map(id => `${id} ${view.agents[id].state}`).join(', ')
      : 'Agent status: no snapshot loaded (scripted replay only)';
    const report = `# Hans Aaron Laureles — Multi-Agent System Status Report
Timestamp: ${time} (Manila UTC+8)
${statusLine}
Location: Manila, Philippines
Availability: Open for Full-Time & Remote AI & Software Engineering Roles (2026)

## Multi-Agent System Overview (5 Agents)
- 🌸 Sakura (Coordinator Agent): Daily Briefings, Gmail Triage & Job-Application Pipeline
- ⭐ Chaewon (Career Agent): Single-Page Resume Generator & Job Matching
- 💻 Kazuha (Code & Knowledge): Answers codebase questions & reviews uncommitted changes
- 🎨 Yunjin (Design Reviewer Agent): Portfolio Audits & Case Study Critique
- 🛡️ Eunchae (System Guardian Agent): Hardware Vitals & Health Reports

## Architecture & Hosting
- AI Models: Groq + Gemini cloud APIs, with an optional local Ollama mode
- Agents: Discord bots running on a local workstation (no cloud hosting)
- Portfolio: https://hanslaureles.vercel.app/
- GitHub: https://github.com/hanslaureles
`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(report).then(() => {
        showCopyFeedback();
      }).catch(() => {
        fallbackCopy(report);
      });
    } else {
      fallbackCopy(report);
    }
  }

  function showCopyFeedback() {
    if (!copyBtn) return;
    const orig = copyBtn.innerHTML;
    copyBtn.innerHTML = `<span>✓ Copied Report to Clipboard!</span>`;
    setTimeout(() => {
      copyBtn.innerHTML = orig;
    }, 2000);
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopyFeedback();
    } catch (e) {
      console.error('Clipboard copy failed', e);
    }
    document.body.removeChild(ta);
  }

})();
