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
      'sentinel',
      'telemetry',
      'git log',
      'timeline',
      'milestones',
      'help',
      'status',
      'benchmark',
      'skills',
      'case-lsfm',
      'case-memory',
      'case-aura',
      'aura',
      'sakura',
      'copilot',
      'recall',
      'rules',
      'resume',
      'github',
      'rag',
      'whoami',
      'contact',
      'theme',
      'clear'
    ];

    // Initial Welcome Banner
    const INITIAL_BANNER = `
<div class="term-line term-comment"># Initializing LSFM Autonomous Hybrid Multi-Agent System...</div>
<div class="term-line"><span class="term-prompt">&gt;</span> <span class="term-cmd">python -u run_all.py --mode production --inference hybrid</span></div>
<div class="term-line"><span class="term-success">[LSFM-DAEMON]</span> 5 Discord Gateway streams: Sakura, Chaewon, Yunjin, Kazuha, Eunchae... <span class="term-badge success">ONLINE</span></div>
<div class="term-line"><span class="term-success">[INFERENCE-ROUTER]</span> Local Ollama on AMD RX 6600 XT (DirectML) initialized. <span class="term-cyan">TTFT: 190ms</span>.</div>
<div class="term-line"><span class="term-success">[INFERENCE-ROUTER]</span> Cloud Groq Provider (Qwen 2.5 70B) connected. <span class="term-cyan">Failover: 1200ms</span>.</div>
<div class="term-line"><span class="term-success">[GMAIL-ENGINE]</span> Authenticated OAuth2. Batch classified 123 emails into 10 labels.</div>
<div class="term-line"><span class="term-success">[PDF-ENGINE]</span> Microsoft Edge Headless: compiled single-page ATS-compliant PDF in 840ms.</div>
<div class="term-line"><span class="term-accent">&gt;&gt; ALL SYSTEMS OPERATIONAL // INTERACTIVE SHELL READY</span></div>
<div class="term-line term-muted" style="margin-top: 6px;">Type <span class="term-highlight">'help'</span> or click the suggestion chips below to explore:</div>
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
          <span class="term-prompt">guest@lsfm-swarm:~$</span>
          <span class="term-cmd-echo">${escapeHtml(trimmed)}</span>
        </div>
      `);

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (command) {
        case 'git':
        case 'git-log':
        case 'timeline':
        case 'milestones':
        case 'log':
        case 'history':
          showGitLog();
          break;

        case 'sentinel':
        case 'telemetry':
        case 'squad':
        case 'ping':
          showSentinelTelemetry(args);
          break;

        case 'help':
        case '?':
          showHelp();
          break;

        case 'status':
          showStatus();
          break;

        case 'benchmark':
        case 'benchmarks':
          showBenchmarks();
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
<div class="term-line term-cyan" style="font-weight: 600;">AVAILABLE RECRUITER PLAYGROUND COMMANDS:</div>
<table class="term-table">
  <tr><td><span class="term-highlight">sentinel</span></td><td>Launch Ambient Agent Swarm Telemetry &amp; Vitals HUD</td></tr>
  <tr><td><span class="term-highlight">git log</span></td><td>Interactive Git branch graph of career milestones &amp; education</td></tr>
  <tr><td><span class="term-highlight">status</span></td><td>Live ping & telemetry of the 5 LSFM AI HQ daemons</td></tr>
  <tr><td><span class="term-highlight">benchmark</span></td><td>Local AMD DirectML vs Cloud Groq latency & cost matrix</td></tr>
  <tr><td><span class="term-highlight">skills</span></td><td>Interactive 3-Pillar Systems Engineering Triad</td></tr>
  <tr><td><span class="term-highlight">case-lsfm</span></td><td>Architecture briefing for Flagship LSFM Multi-Agent HQ</td></tr>
  <tr><td><span class="term-highlight">case-memory</span></td><td>Briefing for Cognitive Memory Core &amp; Self-Improving Engine</td></tr>
  <tr><td><span class="term-highlight">case-aura</span></td><td>Artisanal coffeehouse e-commerce case study</td></tr>
  <tr><td><span class="term-highlight">aura</span></td><td>⚡ Launch live interactive Aura Coffee web store</td></tr>
  <tr><td><span class="term-highlight">sakura</span></td><td>🌸 Open Ask Sakura Recruiter AI Copilot drawer</td></tr>
  <tr><td><span class="term-highlight">recall &lt;query&gt;</span></td><td>Query Cognitive Memory for past heuristics (e.g. 'recall nav')</td></tr>
  <tr><td><span class="term-highlight">rules</span></td><td>Displays workspace learned rules compiled from real-world post-mortems</td></tr>
  <tr><td><span class="term-highlight">resume</span></td><td>Directly triggers download of Hans's 1-page ATS Resume PDF</td></tr>
  <tr><td><span class="term-highlight">github</span></td><td>Opens Hans's official GitHub profile & repositories in new tab</td></tr>
  <tr><td><span class="term-highlight">rag &lt;query&gt;</span></td><td>Query Kazuha's vector vault (e.g. 'rag DirectML', 'rag tokens')</td></tr>
  <tr><td><span class="term-highlight">whoami</span></td><td>Displays current session role and candidate bio</td></tr>
  <tr><td><span class="term-highlight">contact</span></td><td>Displays Hans's email, GitHub, and LinkedIn coordinates</td></tr>
  <tr><td><span class="term-highlight">theme [dark|light]</span></td><td>Toggle portfolio visual theme directly from CLI</td></tr>
  <tr><td><span class="term-highlight">clear</span></td><td>Clear terminal viewport</td></tr>
</table>
<div class="term-line term-muted" style="margin-top: 6px;">💡 Tip: Press <span class="term-cyan">[Tab]</span> for autocomplete, <span class="term-cyan">[↑/↓]</span> for command history.</div>
      `.trim());
    }

    function showStatus() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// LSFM AI HQ — DAEMON HEALTH &amp; TELEMETRY</div>
<table class="term-table">
  <thead>
    <tr class="term-muted">
      <th>AGENT</th><th>ROLE</th><th>ACTIVE MODEL</th><th>LATENCY</th><th>STATUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🌸 Sakura</td><td>Chief of Staff</td><td>Groq · Qwen 2.5 70B</td><td class="term-cyan">182ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🐯 Chaewon</td><td>Career Strategist</td><td>Hybrid Failover Router</td><td class="term-cyan">210ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🐍 Yunjin</td><td>Document Architect</td><td>DirectML · Local 7B</td><td class="term-cyan">190ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🦢 Kazuha</td><td>Knowledge Officer</td><td>SQLite Vector RAG (3072d)</td><td class="term-cyan">42ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🥔 Eunchae</td><td>Inbox &amp; Ops Triage</td><td>Gmail API · Batch Classifier</td><td class="term-cyan">310ms</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
  </tbody>
</table>
<div class="term-line term-muted" style="margin-top: 4px;">Hardware: AMD Radeon RX 6600 XT (8GB VRAM) · DirectML · Zero Recurring Cost</div>
<div class="term-line term-cyan" style="margin-top: 4px;">💡 Tip: Type <span class="term-highlight">'sentinel'</span> or click [ sentinel 📡 ] to open the full mission-control HUD.</div>
      `.trim());
    }

    function showSentinelTelemetry(args) {
      appendOutput(`
<div class="term-line term-success">============================================================</div>
<div class="term-line term-accent" style="font-weight: 600;">📡 SENTINEL // AGENT SWARM TELEMETRY &amp; SYSTEM VITALS</div>
<div class="term-line term-success">============================================================</div>
<div class="term-line">Station: Manila, Philippines [14.5995° N, 120.9842° E] · UTC+8</div>
<div class="term-line">Swarm Health: <span class="term-badge success">● 5/5 NOMINAL</span> · Latency: <span class="term-cyan">18ms</span> · Uptime: <span class="term-cyan">99.9%</span></div>
<table class="term-table" style="margin-top: 6px;">
  <thead>
    <tr class="term-muted">
      <th>AGENT</th><th>ROLE</th><th>RUNTIME</th><th>STATUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🌸 Sakura</td><td>Chief of Staff</td><td>Groq / Gemini Hybrid</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>⭐ Chaewon</td><td>Career Agent</td><td>Headless Edge AST</td><td><span class="term-badge success">● READY</span></td>
    </tr>
    <tr>
      <td>💻 Kazuha</td><td>Frontend Agent</td><td>DOM &amp; Design System</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
    <tr>
      <td>🎨 Yunjin</td><td>Portfolio Agent</td><td>Markdown &amp; Asset Sync</td><td><span class="term-badge success">● READY</span></td>
    </tr>
    <tr>
      <td>🛡️ Eunchae</td><td>Guardian Agent</td><td>OAuth2 &amp; Process Vitals</td><td><span class="term-badge success">● ONLINE</span></td>
    </tr>
  </tbody>
</table>
<div class="term-line term-cyan" style="margin-top: 6px;">[SENTINEL-DISPATCH] Launching Sentinel Telemetry HUD...</div>
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
