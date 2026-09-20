/**
 * HANS LAURELES — INTERACTIVE RECRUITER PLAYGROUND TERMINAL
 * Simulated Unix CLI for exploring multi-agent architecture, hardware benchmarks, and engineering skills.
 */

(function () {
  'use strict';

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', initTerminal);

  function initTerminal() {
    const terminalWindow = document.querySelector('.terminal-window');
    const outputContainer = document.getElementById('terminal-output');
    const inputField = document.getElementById('terminal-input');
    const inputRow = document.getElementById('terminal-input-row');
    const quickChips = document.querySelectorAll('.term-chip');

    if (!terminalWindow || !outputContainer || !inputField) return;

    // Command History State
    const history = [];
    let historyIndex = -1;

    // Available Commands for Auto-complete
    const COMMANDS = [
      'help',
      'status',
      'agents',
      'projects',
      'resume',
      'sakura',
      'github',
      'contact',
      'sentinel',
      'git log',
      'about',
      'clear'
    ];

    // Initial Welcome Banner
    const INITIAL_BANNER = `
<div class="term-line term-comment"># Connecting to Hans's AI Agent Team...</div>
<div class="term-line"><span class="term-prompt">&gt;</span> <span class="term-cmd">check-team --status</span></div>
<div class="term-line"><span class="term-success">[AI TEAM]</span> 5 Agents Online: Sakura, Chaewon, Yunjin, Kazuha, Eunchae... <span class="term-badge success">ONLINE</span></div>
<div class="term-line"><span class="term-success">[COORDINATOR]</span> Sakura ready for questions &amp; daily updates.</div>
<div class="term-line"><span class="term-success">[CAREER]</span> Chaewon ready with single-page resume &amp; job matching.</div>
<div class="term-line"><span class="term-success">[FRONTEND]</span> Kazuha verified responsive design &amp; clean code.</div>
<div class="term-line"><span class="term-success">[DESIGN]</span> Yunjin verified 6 case studies &amp; project demos.</div>
<div class="term-line"><span class="term-success">[SYSTEM HEALTH]</span> Eunchae monitoring uptime &amp; inbox organization.</div>
<div class="term-line"><span class="term-accent">&gt;&gt; ALL 5 AGENTS ONLINE // INTERACTIVE CONSOLE READY</span></div>
<div class="term-line term-muted" style="margin-top: 6px;">Type <span class="term-highlight">'help'</span> or click any command button below to explore:</div>
`.trim();

    outputContainer.innerHTML = INITIAL_BANNER;

    // Focus input when clicking anywhere inside terminal
    terminalWindow.addEventListener('click', (e) => {
      // Don't steal focus if clicking a link or chip
      if (e.target.closest('a') || e.target.closest('.term-chip') || e.target.closest('.terminal-topbar')) {
        return;
      }
      inputField.focus();
    });

    // Handle Quick Action Chips
    quickChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = chip.getAttribute('data-cmd') || chip.textContent.trim().replace(/^\[|\]$/g, '');
        executeCommand(cmd);
        inputField.focus();
      });
    });

    // Keyboard Navigation & Command Execution
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const raw = inputField.value.trim();
        if (raw) {
          history.push(raw);
          historyIndex = history.length;
        }
        executeCommand(raw);
        inputField.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          inputField.value = history[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          inputField.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          inputField.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        handleTabComplete();
      }
    });

    function handleTabComplete() {
      const current = inputField.value.trim().toLowerCase();
      if (!current) return;
      const matches = COMMANDS.filter(cmd => cmd.startsWith(current));
      if (matches.length === 1) {
        inputField.value = matches[0];
      } else if (matches.length > 1) {
        appendOutput(`<div class="term-line term-muted">Suggestions: ${matches.map(m => `<span class="term-cyan">${m}</span>`).join('  ')}</div>`);
      }
    }

    function appendOutput(html) {
      const div = document.createElement('div');
      div.className = 'term-block';
      div.innerHTML = html;
      outputContainer.appendChild(div);
      // Auto-scroll terminal to bottom
      terminalWindow.scrollTop = terminalWindow.scrollHeight;
    }

    function executeCommand(rawInput) {
      if (!rawInput) return;

      const trimmed = rawInput.trim();
      // Render user command line in output
      appendOutput(`
        <div class="term-line">
          <span class="term-prompt">guest@hanslaureles:~$</span>
          <span class="term-cmd-echo">${escapeHtml(trimmed)}</span>
        </div>
      `);

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (command) {
        case 'help':
        case '?':
          showHelp();
          break;

        case 'status':
          showStatus();
          break;

        case 'agents':
        case 'agent':
        case 'team':
        case 'squad':
          showAgents();
          break;

        case 'projects':
        case 'works':
        case 'portfolio':
        case 'cases':
          showProjects();
          break;

        case 'sentinel':
        case 'telemetry':
        case 'ping':
          showSentinelTelemetry(args);
          break;

        case 'git':
        case 'git-log':
        case 'timeline':
        case 'milestones':
        case 'log':
        case 'history':
          showGitLog();
          break;

        case 'skills':
        case 'stack':
          showSkills();
          break;

        case 'case-lsfm':
        case 'lsfm':
        case 'case':
          showCaseStudy();
          break;

        case 'resume':
        case 'cv':
        case 'pdf':
          triggerResumeDownload();
          break;

        case 'rag':
        case 'search':
        case 'ask':
          simulateRAG(args.join(' '));
          break;

        case 'recall':
        case 'memory':
        case 'heuristics':
          simulateRecall(args.join(' '));
          break;

        case 'rules':
        case 'guidelines':
          showRules();
          break;

        case 'case-memory':
        case 'memory-core':
          showMemoryCaseStudy();
          break;

        case 'case-aura':
        case 'aura':
        case 'store':
          appendOutput(`
            <div class="term-line term-success">[STORE-DISPATCH] Launching Aura Coffee &amp; Kitchen Live Demo...</div>
            <div class="term-line">☕ Web App: Artisanal Coffeehouse E-Commerce Experience</div>
            <div class="term-line">✨ Features: Multi-option drink customizer, dynamic slide-over bag drawer, 1-page checkout</div>
            <div class="term-line">🔗 URL: <a href="aura-store/index.html" target="_blank" rel="noopener" class="term-link">aura-store/index.html ↗</a></div>
            <div class="term-line">📖 Case Study: <a href="case-aura.html" class="term-link">case-aura.html ↗</a></div>
          `);
          window.open('aura-store/index.html', '_blank');
          break;

        case 'sakura':
        case 'copilot':
        case 'ask-sakura':
          appendOutput(`
            <div class="term-line term-success">[SAKURA-COPILOT] Opening Ask Sakura Recruiter Assistant...</div>
            <div class="term-line">🌸 Sakura is ready to answer questions about Hans's experience, stack, and projects!</div>
          `);
          if (window.SakuraCopilot && typeof window.SakuraCopilot.open === 'function') {
            window.SakuraCopilot.open();
          } else {
            const drawer = document.getElementById('sakuraDrawer');
            const backdrop = document.getElementById('sakuraBackdrop');
            if (drawer) drawer.classList.add('open');
            if (backdrop) backdrop.classList.add('open');
          }
          break;

        case 'whoami':
          appendOutput(`
            <div class="term-line term-cyan">guest@recruiter</div>
            <div class="term-line term-muted">Access Level: VIP Recruiter / Engineering Leader</div>
            <div class="term-line">Target: Hans Aaron Laureles — AI Systems Engineer & Full-Stack Builder</div>
            <div class="term-line term-muted">Origin: Manila, Philippines [GMT+8] · DLSU-D Computer Science</div>
          `);
          break;

        case 'github':
        case 'gh':
          appendOutput(`
            <div class="term-line term-success">[GITHUB-DISPATCH] Connecting to GitHub profile...</div>
            <div class="term-line">🐙 Profile: <a href="https://github.com/hanslaureles" target="_blank" rel="noopener" class="term-link">https://github.com/hanslaureles ↗</a></div>
            <div class="term-line">⭐ Flagship Swarm: <a href="https://github.com/hanslaureles/lsfm-ai-hq" target="_blank" rel="noopener" class="term-link">https://github.com/hanslaureles/lsfm-ai-hq ↗</a></div>
          `);
          window.open('https://github.com/hanslaureles', '_blank');
          break;

        case 'contact':
        case 'email':
          appendOutput(`
            <div class="term-line term-success">Direct Contact Channels:</div>
            <div class="term-line">📧 Email: <a href="mailto:hanslaureles92@gmail.com" class="term-link">hanslaureles92@gmail.com</a></div>
            <div class="term-line">💼 LinkedIn: <a href="https://linkedin.com/in/hanslaureles" target="_blank" rel="noopener" class="term-link">linkedin.com/in/hanslaureles ↗</a></div>
            <div class="term-line">🐙 GitHub: <a href="https://github.com/hanslaureles" target="_blank" rel="noopener" class="term-link">github.com/hanslaureles ↗</a></div>
          `);
          break;

        case 'theme':
          handleThemeCommand(args[0]);
          break;

        case 'clear':
        case 'cls':
          outputContainer.innerHTML = '';
          break;

        default:
          appendOutput(`
            <div class="term-line term-accent">zsh: command not found: ${escapeHtml(command)}</div>
            <div class="term-line term-muted">Type <span class="term-highlight">'help'</span> to view all available commands.</div>
          `);
          break;
      }

      // Keep scrolled to bottom
      terminalWindow.scrollTop = terminalWindow.scrollHeight;
    }

    // --- Command Implementations ---

    function showGitLog() {
      appendOutput(`
<div class="term-line term-comment"># Git Commit Graph: Career Milestones &amp; Architecture Trajectory</div>
<div class="term-line term-cyan">$ git log --graph --oneline --decorate --stat</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-git-sha">8f4a21d</span> <span class="term-badge success">HEAD -&gt; main</span> <span class="term-badge">tag: v2.5.0</span> <span class="term-muted">[2025 – Present]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent">feat(swarm):</strong> Lead AI Systems Architect — LSFM AI HQ</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Asynchronous Discord Gateway streaming &amp; isolated persona boundaries</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• DirectML local GPU inference failover router on AMD RX 6600 XT</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Headless Chromium single-page ATS vector PDF compiler (&lt;850ms)</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">└──</span> <a href="case-lsfm.html" class="term-link">View Case Study: case-lsfm.html ↗</a></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-git-sha">c71e08a</span> <span class="term-badge">tag: v2.0.0</span> <span class="term-muted">[2024 – 2025]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent">feat(memory):</strong> Engine Architect — Cognitive Memory Core</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Zero-dependency BM25 heuristic recall core &amp; structured post-mortems</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Workspace rule crystallization permanently eliminating AI session amnesia</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">└──</span> <a href="case-memory.html" class="term-link">View Case Study: case-memory.html ↗</a></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-git-sha">9f3a21c</span> <span class="term-badge">tag: v1.5.0</span> <span class="term-muted">[Jun 2024 – Aug 2024]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent">feat(roc.ph):</strong> UI/UX &amp; Frontend Engineer Intern — ROC.ph</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Figma design token translation to semantic HTML, Tailwind CSS &amp; React</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• 95% on-time sprint delivery across 10+ production client deployments</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">└──</span> <a href="about.html" class="term-link">Read Career Details: about.html ↗</a></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-git-sha">5d89b12</span> <span class="term-badge">tag: v1.0.0</span> <span class="term-muted">[2023 – 2024]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent">feat(patriot):</strong> Lead Systems Architect — Capstone: Patriot</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Serverless microservices on AWS Lambda, DynamoDB, Redis &amp; Cognito</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• React Native cross-platform mobile client with 4.4+/5 usability rating</span></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-git-sha">4b129aa</span> <span class="term-badge">tag: foundation</span> <span class="term-muted">[2021 – 2025]</span></div>
  <div class="term-line"><span class="term-git-space">&nbsp;</span> <strong class="term-accent">feat(academic):</strong> BS Computer Science — De La Salle University–Dasmariñas</div>
  <div class="term-line"><span class="term-git-space">&nbsp;</span>   <span class="term-muted">• Algorithms, Distributed Systems, Software Engineering, DBMS, HCI</span></div>
</div>

<div class="term-line term-muted" style="margin-top: 10px;">
  💡 Tip: View full details on the <a href="about.html" class="term-link">About Me page</a> or click <a href="Hans_Laureles_Resume.pdf" target="_blank" class="term-link">Download Resume (PDF)</a>.
</div>
      `.trim());
    }

    function showHelp() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">AVAILABLE COMMANDS:</div>
<table class="term-table">
  <tr><td><span class="term-highlight">status</span></td><td>Check live status of all 5 AI agents</td></tr>
  <tr><td><span class="term-highlight">agents</span></td><td>Learn what each AI agent does</td></tr>
  <tr><td><span class="term-highlight">projects</span></td><td>Explore selected case studies &amp; live demos</td></tr>
  <tr><td><span class="term-highlight">resume</span></td><td>Download Hans's single-page PDF resume</td></tr>
  <tr><td><span class="term-highlight">sakura</span></td><td>🌸 Chat with Ask Sakura AI assistant</td></tr>
  <tr><td><span class="term-highlight">sentinel</span></td><td>Open full system health modal</td></tr>
  <tr><td><span class="term-highlight">github</span></td><td>Open GitHub profile &amp; repositories</td></tr>
  <tr><td><span class="term-highlight">contact</span></td><td>Display email and professional links</td></tr>
  <tr><td><span class="term-highlight">git log</span></td><td>View timeline of milestones &amp; education</td></tr>
  <tr><td><span class="term-highlight">clear</span></td><td>Clear terminal screen</td></tr>
</table>
<div class="term-line term-muted" style="margin-top: 6px;">💡 Tip: Click any quick command button above, or press <span class="term-cyan">[Tab]</span> for autocomplete.</div>
      `.trim());
    }

    function showStatus() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// AI TEAM — LIVE STATUS</div>
<table class="term-table">
  <thead>
    <tr class="term-muted">
      <th>AGENT</th><th>ROLE</th><th>SPEED</th><th>STATUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🌸 Sakura</td><td>Team Coordinator</td><td class="term-cyan">18ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🐯 Chaewon</td><td>Career Assistant</td><td class="term-cyan">18ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🐍 Yunjin</td><td>Design Reviewer</td><td class="term-cyan">19ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🦢 Kazuha</td><td>Frontend &amp; Code</td><td class="term-cyan">17ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🥔 Eunchae</td><td>System Health</td><td class="term-cyan">20ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
  </tbody>
</table>
<div class="term-line term-muted" style="margin-top: 4px;">Location: Manila, Philippines (UTC+8) · Zero Cloud Hosting Cost</div>
<div class="term-line term-cyan" style="margin-top: 4px;">💡 Tip: Type <span class="term-highlight">'agents'</span> to see what each agent does, or <span class="term-highlight">'projects'</span> to view work.</div>
      `.trim());
    }

    function showAgents() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// AI TEAM — ROSTER &amp; RESPONSIBILITIES</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><strong class="term-highlight">🌸 Sakura (Team Coordinator)</strong></div>
  <div class="term-line term-muted">Sends daily morning updates, schedules tasks, coordinates between agents, and answers recruiter questions via Ask Sakura.</div>
</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><strong class="term-highlight">🐯 Chaewon (Career Assistant)</strong></div>
  <div class="term-line term-muted">Scouts software &amp; AI job openings, matches role requirements, and generates single-page PDF resumes.</div>
</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><strong class="term-highlight">🐍 Yunjin (Design Reviewer)</strong></div>
  <div class="term-line term-muted">Reviews case studies, checks design systems, and formats single-page resume documents.</div>
</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><strong class="term-highlight">🦢 Kazuha (Frontend &amp; Code)</strong></div>
  <div class="term-line term-muted">Checks code quality, reviews Git changes, and tests web components for accessibility and speed.</div>
</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><strong class="term-highlight">🥔 Eunchae (System Health)</strong></div>
  <div class="term-line term-muted">Monitors uptime, tests computer memory, and organizes unread emails into folders automatically.</div>
</div>
      `.trim());
    }

    function showProjects() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// SELECTED WORKS &amp; CASE STUDIES</div>
<table class="term-table">
  <tr>
    <td><strong class="term-accent">01. LSFM AI HQ</strong></td>
    <td>Autonomous AI Team (5 Agents)</td>
    <td><a href="case-lsfm.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">02. Lumina Analytics</strong></td>
    <td>SaaS Analytics &amp; Data Visualization</td>
    <td><a href="case-lumina.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">03. Vellum OS</strong></td>
    <td>Calm Mental Wellness Mobile Interface</td>
    <td><a href="case-vellum.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">04. FinTrack App</strong></td>
    <td>Personal Finance &amp; Budgeting Mobile UX</td>
    <td><a href="case-fintrack.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">05. Aura Coffee &amp; Kitchen</strong></td>
    <td>Artisanal Coffeehouse Web Store (Live Demo)</td>
    <td><a href="aura-store/index.html" target="_blank" class="term-link">Launch Store ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">06. Cognitive Memory Core</strong></td>
    <td>Long-term Memory Engine for AI Agents</td>
    <td><a href="case-memory.html" class="term-link">Case Study ↗</a></td>
  </tr>
</table>
<div class="term-line term-muted" style="margin-top: 6px;">💡 Tip: Click any link above or scroll down to the Selected Works showcase.</div>
      `.trim());
    }

    function showSentinelTelemetry(args) {
      appendOutput(`
<div class="term-line term-success">============================================================</div>
<div class="term-line term-accent" style="font-weight: 600;">📡 SENTINEL // AI TEAM STATUS &amp; SYSTEM HEALTH</div>
<div class="term-line term-success">============================================================</div>
<div class="term-line">Location: Manila, Philippines · UTC+8</div>
<div class="term-line">Team Health: <span class="term-badge success">● 5/5 ONLINE</span> · Response Speed: <span class="term-cyan">18ms</span></div>
<table class="term-table" style="margin-top: 6px;">
  <thead>
    <tr class="term-muted">
      <th>AGENT</th><th>ROLE</th><th>STATUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🌸 Sakura</td><td>Team Coordinator</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>⭐ Chaewon</td><td>Career Assistant</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>💻 Kazuha</td><td>Frontend Agent</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🎨 Yunjin</td><td>Design Reviewer</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🛡️ Eunchae</td><td>System Health</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
  </tbody>
</table>
<div class="term-line term-cyan" style="margin-top: 6px;">[SENTINEL] Opening System Health HUD...</div>
      `.trim());

      if (window.openSentinelHUD) {
        setTimeout(() => {
          window.openSentinelHUD();
        }, 350);
      }
    }

    function showBenchmarks() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// HARDWARE INFERENCE &amp; EFFICIENCY BENCHMARKS</div>
<table class="term-table">
  <thead>
    <tr class="term-muted">
      <th>METRIC</th><th>LOCAL DIRECTML (RX 6600 XT)</th><th>CLOUD GROQ (QWEN 70B)</th><th>COMMERCIAL SAAS (OPENAI/CLAUDE)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Time-to-First-Token</td><td class="term-success">190ms (Local Silicon)</td><td class="term-success">280ms (Cloud LPUs)</td><td class="term-muted">850ms - 1,400ms</td>
    </tr>
    <tr>
      <td>Monthly Operating Cost</td><td class="term-success">$0.00 / month</td><td class="term-success">$0.00 (Free Tier)</td><td class="term-accent">$250 - $800 / month</td>
    </tr>
    <tr>
      <td>Offline Resilience</td><td class="term-success">100% Air-Gapped Capable</td><td class="term-muted">Network Dependent</td><td class="term-accent">Single Point of Failure</td>
    </tr>
    <tr>
      <td>Data Privacy &amp; PII</td><td class="term-success">Zero Outbound Telemetry</td><td class="term-muted">Zero Retention Policy</td><td class="term-accent">Vendor Data Policy Risk</td>
    </tr>
    <tr>
      <td>PDF Build Throughput</td><td class="term-success">840ms (Headless Edge)</td><td>N/A</td><td class="term-muted">3,500ms (Third-party API)</td>
    </tr>
  </tbody>
</table>
<div class="term-line term-success" style="margin-top: 6px;">Architectural Verdict: Hybrid tiering provides maximum enterprise reliability at zero recurring overhead.</div>
      `.trim());
    }

    function showSkills() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// HANS AARON LAURELES — 3-PILLAR SYSTEMS ENGINEERING TRIAD</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><span class="term-highlight">01. APPLIED AI &amp; MULTI-AGENT SWARMS</span></div>
  <div class="term-line term-muted">  • Autonomous Multi-Agent Swarms (Discord Gateway API, Decentralized Daemons)</div>
  <div class="term-line term-muted">  • Local GPU Inference: Ollama, AMD DirectML, Vulkan, GGUF 4-bit/8-bit Quantization</div>
  <div class="term-line term-muted">  • Hybrid Cloud/Local Failover Routers (Groq, Qwen 2.5 70B, Circuit Breakers)</div>
  <div class="term-line term-muted">  • Hybrid Vector RAG (Dense Cosine + Sparse BM25 + Reciprocal Rank Fusion)</div>
</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><span class="term-highlight">02. SYSTEMS, TOOLING &amp; CLOUD AUTOMATION</span></div>
  <div class="term-line term-muted">  • Python (asyncio, OOP, SQLite3, Requests, BeautifulSoup, PyPDF2)</div>
  <div class="term-line term-muted">  • Headless Browser Automation (Microsoft Edge Chromium CDP, Single-Page ATS Rendering)</div>
  <div class="term-line term-muted">  • Google Workspace REST APIs (OAuth2, Gmail Batch Triage, 10-Label Classification)</div>
  <div class="term-line term-muted">  • Distributed Systems: AWS Lambda, DynamoDB, Redis Caching, Node.js</div>
</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><span class="term-highlight">03. EXECUTIVE INTERFACE CRAFT &amp; FRONTEND</span></div>
  <div class="term-line term-muted">  • Modern Web: Vanilla JS/ES6+, React, Next.js, TypeScript, HTML5 Semantic Living Specs</div>
  <div class="term-line term-muted">  • Design Systems: CSS Custom Properties, Design Tokens, Swiss Typography Hierarchy</div>
  <div class="term-line term-muted">  • High-Dwell Telemetry Boards, Terminal UIs, WCAG AAA Accessibility, Sub-Second FCP</div>
</div>
      `.trim());
    }

    function showCaseStudy() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// CASE STUDY 01: LSFM AI HQ — AUTONOMOUS MULTI-AGENT SYSTEM</div>
<div class="term-line">A production multi-agent operations platform orchestrating career surveillance, email batch classification, and vector knowledge memory across 5 isolated daemons.</div>
<div class="term-line" style="margin: 8px 0;">
  <div class="term-muted">• Architecture: 5 specialized agents running concurrent asyncio loops on Discord Gateway</div>
  <div class="term-muted">• Hybrid Silicon: AMD Radeon RX 6600 XT via DirectML + Groq Cloud LPU acceleration</div>
  <div class="term-muted">• Automation: 123 unread emails batch-triaged, headless ATS resume compiler in 840ms</div>
  <div class="term-muted">• Storage: Local zero-server SQLite Vector Vault with RRF hybrid retrieval</div>
</div>
<div class="term-line">
  👉 <a href="case-lsfm.html" class="term-link" style="font-weight: 600; text-decoration: underline;">Read Full Architectural Case Study &amp; Benchmarks (case-lsfm.html) ↗</a>
</div>
      `.trim());
    }

    function triggerResumeDownload() {
      appendOutput(`
<div class="term-line term-success">[PDF-ENGINE] Fetching canonical single-page ATS resume...</div>
<div class="term-line">Initiating download: <span class="term-cyan">Hans_Laureles_Resume.pdf</span> (236 KB)</div>
<div class="term-line term-muted">Compiled with Headless Edge ATS Engine · 100% Vector Output</div>
      `.trim());

      const downloadLink = document.createElement('a');
      downloadLink.href = 'Hans_Laureles_Resume.pdf';
      downloadLink.download = 'Hans_Aaron_Laureles_Resume.pdf';
      downloadLink.target = '_blank';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

    function simulateRAG(query) {
      if (!query) {
        appendOutput(`
<div class="term-line term-accent">Usage: rag &lt;search_query&gt;</div>
<div class="term-line term-muted">Example: <span class="term-highlight">rag DirectML</span> or <span class="term-highlight">rag design tokens</span></div>
        `.trim());
        return;
      }

      const qLower = query.toLowerCase();
      let matchedSnippets = [];

      if (qLower.includes('directml') || qLower.includes('rx 6600') || qLower.includes('gpu') || qLower.includes('amd')) {
        matchedSnippets = [
          {
            doc: 'case-lsfm.html: Section 03',
            score: '0.942',
            text: 'Hybrid Local/Cloud Inference Router: Ollama local engine running on AMD Radeon RX 6600 XT (8GB VRAM) via DirectML and Vulkan. TTFT benchmark: 190ms with 0.00$ recurring cloud cost.'
          },
          {
            doc: 'local_ai_agents_playbook.md',
            score: '0.887',
            text: 'Local execution ensures zero data leakage for private credentials and resumes. Automatic circuit breaker trips to local GPU when cloud Groq threshold exceeds 1200ms.'
          }
        ];
      } else if (qLower.includes('token') || qLower.includes('css') || qLower.includes('color') || qLower.includes('typography')) {
        matchedSnippets = [
          {
            doc: 'portfolio-site/styles.css: Tokens',
            score: '0.935',
            text: 'Design Tokens: --font-sans: "Inter", --font-serif: "Newsreader", --font-mono: "JetBrains Mono". Semantic Palette: --accent: #2B6CB0 (Primary Blue), --surface-dark: #0E0F12.'
          },
          {
            doc: 'master_resume.md: Skills',
            score: '0.891',
            text: 'Executive Interface Craft: Design Tokens, CSS Custom Properties, Swiss Editorial Typography, WCAG AAA Accessibility benchmarks.'
          }
        ];
      } else if (qLower.includes('email') || qLower.includes('gmail') || qLower.includes('eunchae')) {
        matchedSnippets = [
          {
            doc: 'lsfm-swarm/memory/specifications.md',
            score: '0.961',
            text: 'Eunchae Guardian Daemon: Google Workspace OAuth2 batch triage. Successfully classified 123 emails into 10 hierarchical labels with 98%+ precision.'
          }
        ];
      } else {
        matchedSnippets = [
          {
            doc: 'rag_vault.sqlite: Master Index',
            score: '0.865',
            text: `Semantic nearest neighbor found in codebase matching query "${escapeHtml(query)}": Candidate profile Hans Aaron Laureles (DLSU-D BS Computer Science), 5-agent LSFM autonomous architecture.`
          }
        ];
      }

      let html = `<div class="term-line term-cyan">// KAZUHA VECTOR RAG VAULT — QUERY: "${escapeHtml(query)}"</div>`;
      matchedSnippets.forEach((s, idx) => {
        html += `
<div class="term-block" style="margin: 6px 0; border-left: 2px solid var(--accent); padding-left: 8px;">
  <div class="term-line"><span class="term-highlight">Chunk [${idx + 1}]</span> <span class="term-muted">Source:</span> <span class="term-cyan">${s.doc}</span> <span class="term-muted">(Cosine Score: ${s.score})</span></div>
  <div class="term-line term-muted">${s.text}</div>
</div>`;
      });
      html += `<div class="term-line term-success">✓ Grounded context synthesized from local vault (211 indexed chunks)</div>`;

      appendOutput(html.trim());
    }

    function simulateRecall(query) {
      if (!query || !query.trim()) {
        appendOutput(`
          <div class="term-line term-accent">Usage: recall &lt;query&gt;</div>
          <div class="term-line term-muted">Example: <span class="term-cyan">recall navigation flexbox</span>, <span class="term-cyan">recall coffee copy</span>, <span class="term-cyan">recall netlify</span></div>
        `);
        return;
      }

      const MEMORIES = [
        {
          id: "MEM-001",
          domain: "COPYWRITING",
          rule: "Forbid terminal/sci-fi terms (SPECIMEN, PROTOCOL) for culinary/hospitality; use grounded tactile terms (Fresh Roast, Curated, Warm Batch, Shopping Bag).",
          symptom: "Robotic copy in coffeehouse store",
          tags: ["copywriting", "tone", "cafe", "coffee", "culinary", "hospitality"]
        },
        {
          id: "MEM-002",
          domain: "CSS-LAYOUT",
          rule: "Never insert spaced bracket text in navigation flex items; enforce white-space: nowrap to prevent trailing ']' wraps.",
          symptom: "Bracket wrapped onto separate line on desktop",
          tags: ["css", "flexbox", "navigation", "whitespace", "typography", "layout"]
        },
        {
          id: "MEM-003",
          domain: "EDGE-ROUTING",
          rule: "Subfolder rewrites (/aura-store/*) MUST precede global catch-all (/* /404.html 404) in _redirects and netlify.toml.",
          symptom: "Subdirectory /aura-store routed to 404",
          tags: ["netlify", "deployment", "redirects", "routing", "hosting", "404"]
        },
        {
          id: "MEM-004",
          domain: "LOCALIZATION",
          rule: "Philippine e-commerce must feature GCash, Maya, QR Ph, and COD alongside +63 mobile phone format.",
          symptom: "US card-only checkout failed local conversion",
          tags: ["ecommerce", "payments", "philippines", "gcash", "maya", "checkout"]
        },
        {
          id: "MEM-005",
          domain: "CLI-SHELL",
          rule: "Avoid nested double quotes inside double-quoted PowerShell commands; pass script files or single-quoted literals.",
          symptom: "PowerShell TerminatorExpectedAtEndOfString crash",
          tags: ["cli", "powershell", "windows", "terminal", "shell", "escaping"]
        },
        {
          id: "MEM-006",
          domain: "WINDOWS-PYTHON",
          rule: "Reconfigure stdout with sys.stdout.reconfigure(encoding='utf-8') or use ASCII badges to prevent cp1252 charmap crashes.",
          symptom: "UnicodeEncodeError on Windows stdout",
          tags: ["windows", "python", "unicode", "charmap", "cp1252", "terminal"]
        }
      ];

      const qLower = query.toLowerCase();
      const matches = MEMORIES.filter(m => 
        m.tags.some(t => qLower.includes(t)) || 
        m.domain.toLowerCase().includes(qLower) || 
        m.rule.toLowerCase().includes(qLower) ||
        m.symptom.toLowerCase().includes(qLower)
      );

      if (!matches.length) {
        appendOutput(`
          <div class="term-line term-success">[RECALL-ENGINE] Zero past failure patterns found for "${escapeHtml(query)}". Safe to proceed.</div>
        `);
        return;
      }

      let html = `<div class="term-line term-accent">⚡ ACTIVE HEURISTICS RETRIEVED (${matches.length} matched):</div>`;
      matches.forEach(m => {
        html += `
          <div class="term-block" style="margin: 6px 0; border-left: 2px solid var(--accent); padding-left: 8px;">
            <div class="term-line"><span class="term-cyan">[${m.id}] ${m.domain}</span></div>
            <div class="term-line">• <strong>Rule</strong>: ${escapeHtml(m.rule)}</div>
            <div class="term-line term-muted">• <strong>Avoided</strong>: ${escapeHtml(m.symptom)}</div>
          </div>
        `;
      });
      html += `<div class="term-line term-success">✓ Retrieved from local experience_store.jsonl in 11ms</div>`;
      appendOutput(html.trim());
    }

    function showRules() {
      appendOutput(`
        <div class="term-line term-cyan">// WORKSPACE LEARNED RULES (.agents/rules/learned_rules.md)</div>
        <div class="term-line term-muted">Auto-crystallized heuristics from real-world post-mortems:</div>
        <div class="term-block" style="margin: 6px 0;">
          <div class="term-line"><span class="term-highlight">[MEM-001] COPYWRITING</span>: Forbid sci-fi jargon in hospitality; use tactile culinary words.</div>
          <div class="term-line"><span class="term-highlight">[MEM-002] CSS-LAYOUT</span>: No spaced brackets in flex nav; enforce white-space: nowrap.</div>
          <div class="term-line"><span class="term-highlight">[MEM-003] EDGE-ROUTING</span>: Explicit subfolder redirects must precede catch-all 404 in Netlify.</div>
          <div class="term-line"><span class="term-highlight">[MEM-004] LOCALIZATION</span>: PH checkout must include GCash, Maya, and COD with +63 format.</div>
          <div class="term-line"><span class="term-highlight">[MEM-005] CLI-SHELL</span>: Avoid nested double quotes in PowerShell; use script files.</div>
          <div class="term-line"><span class="term-highlight">[MEM-006] WINDOWS-PYTHON</span>: Reconfigure stdout to UTF-8 to prevent cp1252 crashes.</div>
        </div>
        <div class="term-line">👉 <a href="case-memory.html" class="term-link">Read Cognitive Memory Case Study (case-memory.html) ↗</a></div>
      `.trim());
    }

    function showMemoryCaseStudy() {
      appendOutput(`
        <div class="term-line term-cyan">// CASE STUDY 06: COGNITIVE MEMORY CORE</div>
        <div class="term-line">Zero-dependency developer agent engine eliminating AI session amnesia through BM25 heuristic recall and self-crystallizing workspace rules.</div>
        <div class="term-line" style="margin: 6px 0;">
          <div class="term-muted">• Latency: 12ms average BM25 tokenized retrieval across active JSONL store</div>
          <div class="term-muted">• Footprint: 100% Python standard library, zero external vector DB dependencies</div>
          <div class="term-muted">• Integrations: Antigravity Customizations (.agents/rules/) + LE SSERAFIM Discord HQ</div>
        </div>
        <div class="term-line">👉 <a href="case-memory.html" class="term-link" style="font-weight: 600; text-decoration: underline;">Open Case Study &amp; Live Simulator (case-memory.html) ↗</a></div>
      `.trim());
    }

    function handleThemeCommand(arg) {
      const mode = (arg || '').toLowerCase();
      if (mode === 'dark' || mode === 'light') {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('hans_portfolio_theme', mode);
        // Sync icon buttons
        const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
        themeToggleButtons.forEach(btn => {
          btn.innerHTML = mode === 'dark'
            ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
            : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        });
        appendOutput(`<div class="term-line term-success">✓ Theme updated to: ${mode} mode</div>`);
      } else {
        appendOutput(`
<div class="term-line term-accent">Usage: theme &lt;dark|light&gt;</div>
<div class="term-line term-muted">Example: <span class="term-highlight">theme dark</span> or <span class="term-highlight">theme light</span></div>
        `.trim());
      }
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }
})();
