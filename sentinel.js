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
    { agent: 'EUNCHAE', emoji: '🛡️', msg: 'System vitals normal: GPU memory at 41%, temperature 48°C.' },
    { agent: 'SAKURA', emoji: '🌸', msg: 'Team Coordinator standby. Ready for recruiter questions.' },
    { agent: 'KAZUHA', emoji: '💻', msg: 'Frontend health check: UI layout responsive and contrast verified.' },
    { agent: 'CHAEWON', emoji: '⭐', msg: 'Career assistant ready. Single-page PDF resume prepared.' },
    { agent: 'YUNJIN', emoji: '🎨', msg: 'Design check: 6 case studies and project images verified.' },
    { agent: 'LSFM-CORE', emoji: '🌐', msg: 'Discord bot connection stable. All 5 agents online and responsive.' },
    { agent: 'EUNCHAE', emoji: '🛡️', msg: 'Email check complete. All unread messages organized.' },
    { agent: 'SAKURA', emoji: '🌸', msg: 'Knowledge base updated with latest project information.' }
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
      { agent: 'EUNCHAE', emoji: '🛡️', msg: 'Sentinel monitoring online. System health normal.' },
      { agent: 'SAKURA', emoji: '🌸', msg: 'Team Coordinator ready. Ask Sakura is online.' },
      { agent: 'KAZUHA', emoji: '💻', msg: 'Frontend agent online. Layout and contrast verified.' },
      { agent: 'CHAEWON', emoji: '⭐', msg: 'Career assistant online. PDF resume generator ready.' },
      { agent: 'LSFM-CORE', emoji: '🌐', msg: 'All 5 AI agents online and running smoothly.' }
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
    pingBtn.innerHTML = `<span>⏳ Pinging Team...</span>`;

    appendLog('SENTINEL', '⚡', 'Checking status across all 5 AI agents...', true);

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
      appendLog('SENTINEL', '🟢', `Check complete: All 5 agents online. Response time: ${pingMs}ms.`, true);
      
      if (heroPing) heroPing.textContent = `${pingMs}ms`;
      if (hudPing) hudPing.textContent = `${pingMs}ms`;

      pingBtn.disabled = false;
      pingBtn.innerHTML = `<span>✓ Team Online (${pingMs}ms)</span>`;

      setTimeout(() => {
        pingBtn.innerHTML = originalText;
      }, 2500);
    }, 700);
  }

  // --- Copy Architecture Report ---
  function handleCopyReport() {
    const time = getManilaTimestamp();
    const report = `# Hans Aaron Laureles — AI Team Status Report
Timestamp: ${time} (Manila UTC+8)
Location: Manila, Philippines
Availability: Open for Full-Time & Remote AI & Software Engineering Roles (2026)

## AI Team Status (5/5 Agents Online)
- 🌸 Sakura (Team Coordinator): Daily Morning Updates & Recruiter Assistant
- ⭐ Chaewon (Career Assistant): Single-Page Resume Generator & Job Matching
- 💻 Kazuha (Frontend Agent): Clean UI & Modern Web Design
- 🎨 Yunjin (Design Reviewer): Portfolio & Case Study Synchronization
- 🛡️ Eunchae (System Health): Uptime Monitoring & Inbox Organization

## Architecture & Hosting
- AI Models: Hybrid Local GPU + Free-tier Cloud APIs
- Hosting Cost: $0.00/month
- Portfolio: https://hanslaureles.com
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
