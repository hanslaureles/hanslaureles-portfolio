/**
 * SENTINEL — AMBIENT AGENT TELEMETRY & SYSTEM VITALS ENGINE
 * Real-time telemetry, agent fleet monitoring, and interactive HUD for Hans Aaron Laureles's portfolio.
 */

(function () {
  'use strict';

  // DOM Elements
  let modal, backdrop, closeBtn, openBtn, heroPing, heroClock, hudPing, hudClock, logFeed, pingBtn, copyBtn;
  let eventInterval = null;
  let clockInterval = null;
  let pingInterval = null;
  let lastFocusedElement = null;

  // Realistic Agent Telemetry Event Templates
  const TELEMETRY_EVENTS = [
    { agent: 'EUNCHAE', emoji: '🛡️', msg: 'System vitals pulse: direct GPU memory at 41%, temp 48°C stable.' },
    { agent: 'SAKURA', emoji: '🌸', msg: 'Recruiter Copilot standby. BM25 embeddings index primed.' },
    { agent: 'KAZUHA', emoji: '💻', msg: 'Frontend DOM health check: CSS variable tokens and contrast nominal.' },
    { agent: 'CHAEWON', emoji: '⭐', msg: 'Career pipeline idle. Headless Chromium resume generator ready.' },
    { agent: 'YUNJIN', emoji: '🎨', msg: 'Asset pipeline check: 6 case study media assets verified.' },
    { agent: 'LSFM-CORE', emoji: '🌐', msg: 'Discord Gateway stream verified. 5 daemon threads responsive.' },
    { agent: 'EUNCHAE', emoji: '🛡️', msg: 'OAuth2 token valid. Zero unhandled exceptions in mailbox sync.' },
    { agent: 'SAKURA', emoji: '🌸', msg: 'Natural language query parser active with 0.98 confidence threshold.' }
  ];

  document.addEventListener('DOMContentLoaded', initSentinel);

  function initSentinel() {
    modal = document.getElementById('sentinelModal');
    backdrop = document.getElementById('sentinelBackdrop');
    closeBtn = document.getElementById('sentinelCloseBtn');
    openBtn = document.getElementById('sentinelToggleBtn');
    heroPing = document.getElementById('heroPingDisplay');
    heroClock = document.getElementById('heroClockDisplay');
    hudPing = document.getElementById('hudPingDisplay');
    hudClock = document.getElementById('hudClockDisplay');
    logFeed = document.getElementById('sentinelLogFeed');
    pingBtn = document.getElementById('sentinelPingSquadBtn');
    copyBtn = document.getElementById('sentinelCopyReportBtn');

    // Initialize Clock & Ping Tickers
    updateClock();
    clockInterval = setInterval(updateClock, 1000);

    updatePing();
    pingInterval = setInterval(updatePing, 3500);

    // Seed Initial Logs
    if (logFeed) {
      seedInitialLogs();
      startEventStream();
    }

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

    if (pingBtn) {
      pingBtn.addEventListener('click', handlePingSquad);
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

    // Keyboard Shortcuts: 'S' or 's' opens, 'Escape' closes
    document.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in an input, textarea, or contenteditable
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable ||
        activeEl.classList.contains('terminal-input')
      );

      if (e.key === 'Escape' && isModalOpen()) {
        closeModal();
      } else if ((e.key === 's' || e.key === 'S') && !isInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
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

  // --- Ping Micro-Jitter (15ms - 23ms) ---
  function updatePing() {
    const jitter = Math.floor(Math.random() * 9) + 15; // 15 to 23 ms
    const pingStr = `${jitter}ms`;
    if (heroPing) heroPing.textContent = pingStr;
    if (hudPing) hudPing.textContent = pingStr;
  }

  // --- Modal Open / Close ---
  function isModalOpen() {
    return modal && modal.classList.contains('is-open');
  }

  function openModal() {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
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
    
    const time = getManilaTimestamp();
    row.innerHTML = `
      <span class="log-time mono">[${time}]</span>
      <span class="log-agent mono">${emoji} ${agent}:</span>
      <span class="log-msg">${msg}</span>
    `;

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
    const initialSeed = [
      { agent: 'EUNCHAE', emoji: '🛡️', msg: 'Sentinel daemon initialized. Local direct inference telemetry linked.' },
      { agent: 'SAKURA', emoji: '🌸', msg: 'Chief of Staff copilot indexed. Ready for recruiter inquiries.' },
      { agent: 'KAZUHA', emoji: '💻', msg: 'DOM telemetry nominal. CSS token contrast verified WCAG AAA.' },
      { agent: 'CHAEWON', emoji: '⭐', msg: 'Career pipeline idle. Headless ATS-compliant PDF ready.' },
      { agent: 'LSFM-CORE', emoji: '🌐', msg: 'All 5 agent streams nominal across zero-cost open tier runtime.' }
    ];

    initialSeed.forEach(item => {
      appendLog(item.agent, item.emoji, item.msg);
    });
  }

  function startEventStream() {
    if (eventInterval) clearInterval(eventInterval);

    // Emit event every 6 to 9 seconds
    eventInterval = setInterval(() => {
      if (!document.hidden) {
        const randomIndex = Math.floor(Math.random() * TELEMETRY_EVENTS.length);
        const ev = TELEMETRY_EVENTS[randomIndex];
        appendLog(ev.agent, ev.emoji, ev.msg);
      }
    }, 7000);
  }

  // --- Interactive "Ping Squad" Simulation ---
  function handlePingSquad() {
    if (!pingBtn) return;
    pingBtn.disabled = true;
    const originalText = pingBtn.innerHTML;
    pingBtn.innerHTML = `<span>⏳ Pinging Squad...</span>`;

    appendLog('SENTINEL', '⚡', 'Initiating live probe across 5 local/cloud agent streams...', true);

    // Visual pulse across all agent cards
    const agentItems = document.querySelectorAll('.agent-fleet-item');
    agentItems.forEach((item, idx) => {
      setTimeout(() => {
        item.classList.add('pulse-highlight');
        setTimeout(() => item.classList.remove('pulse-highlight'), 600);
      }, idx * 80);
    });

    setTimeout(() => {
      const pingMs = Math.floor(Math.random() * 6) + 14;
      appendLog('SENTINEL', '🟢', `Probe complete: 5/5 agents nominal. Latency: ${pingMs}ms. Zero dropped packets.`, true);
      
      if (heroPing) heroPing.textContent = `${pingMs}ms`;
      if (hudPing) hudPing.textContent = `${pingMs}ms`;

      pingBtn.disabled = false;
      pingBtn.innerHTML = `<span>✓ Fleet Responding (${pingMs}ms)</span>`;

      setTimeout(() => {
        pingBtn.innerHTML = originalText;
      }, 2500);
    }, 700);
  }

  // --- Copy Architecture Report ---
  function handleCopyReport() {
    const time = getManilaTimestamp();
    const report = `# Hans Aaron Laureles — Multi-Agent System Telemetry Report
Timestamp: ${time} (Manila UTC+8)
Station: Manila, Philippines [14.5995° N, 120.9842° E]
Availability: Open for Full-Time & Remote AI Systems Engineering Roles (2026)

## Fleet Status (5/5 Agents Nominal)
- 🌸 Sakura (Chief of Staff): Recruiter Copilot & Multi-Agent Orchestration
- ⭐ Chaewon (Career Agent): Headless Chromium PDF Resume & Keyword Matching
- 💻 Kazuha (Frontend Agent): Design System Tokens & DOM Telemetry
- 🎨 Yunjin (Portfolio Agent): Case Study Sync & Interactive Demo Packaging
- 🛡️ Eunchae (Guardian Agent): Process Health Vitals & Automated Inbox Triage

## Infrastructure & Runtime
- Inference: Hybrid Local DirectML (AMD RX 6600 XT) / Cloud Groq & Gemini
- Operational Cost: $0.00/month (Open-tier & local GPU)
- Portfolio URL: https://hanslaureles.com
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
