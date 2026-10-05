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
      'ciel',
      'help',
      'status',
      'agents',
      'vitals',
      'roster',
      'projects',
      'audit',
      'rules',
      'brain',
      'resume',
      'sakura',
      'github',
      'contact',
      'overview',
      'git log',
      'about',
      'clear'
    ];

    // Initial Welcome Banner
    const INITIAL_BANNER = `
<div class="term-line term-comment"># Hans's Multi-Agent System // interactive portfolio console (runs in your browser)</div>
<div class="term-line"><span class="term-prompt">&gt;</span> <span class="term-cmd">list-agents</span></div>
<div class="term-line"><span class="term-success">[MULTI-AGENT]</span> 5 agents: Sakura, Chaewon, Yunjin, Kazuha, Eunchae <span class="term-badge">HOSTED ON MY PC</span></div>
<div class="term-line"><span class="term-success">[COORDINATOR]</span> Sakura: daily briefings, Gmail triage &amp; the !apply pipeline.</div>
<div class="term-line"><span class="term-success">[CAREER]</span> Chaewon: job scouting, ATS tailoring &amp; single-page resume PDFs.</div>
<div class="term-line"><span class="term-success">[CODE &amp; KNOWLEDGE]</span> Kazuha: answers codebase questions &amp; reviews uncommitted changes.</div>
<div class="term-line"><span class="term-success">[DESIGN]</span> Yunjin: portfolio asset audits &amp; design critiques.</div>
<div class="term-line"><span class="term-success">[SYSTEM GUARDIAN]</span> Eunchae: hardware vitals &amp; health reports.</div>
<div class="term-line"><span class="term-accent">&gt;&gt; INTERACTIVE CONSOLE READY // not connected to the live agents</span></div>
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
        case 'ciel':
        case 'manas':
        case 'wisdom':
        case 'hud':
          showCiel();
          break;

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

        case 'overview':
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
        case 'heuristics':
          simulateRecall(args.join(' '));
          break;

        case 'memory':
          if (args.length > 0) {
            simulateRecall(args.join(' '));
          } else {
            showRules();
          }
          break;

        case 'rules':
        case 'guidelines':
          showRules();
          break;

        case 'audit':
        case 'yunjin':
          showAuditReport();
          break;

        case 'brain':
        case 'obsidian':
        case 'mcp':
          showBrain();
          break;

        case 'vitals':
        case 'watchdog':
        case 'hardware':
          showVitals();
          break;

        case 'roster':
        case 'swarm':
        case 'fleet':
        case 'topology':
          showSwarm();
          break;

        case 'case-fintrack':
        case 'fintrack':
          appendOutput(`
            <div class="term-line term-success">[FINTRACK-DISPATCH] Personal Finance &amp; Behavioral Budgeting UX</div>
            <div class="term-line">📊 Two-tap transaction input with non-shame, loss-aversion feedback (Figma prototype).</div>
            <div class="term-line">⚡ Auto Layout components &amp; variables · One daily safe-to-spend number.</div>
            <div class="term-line">👉 <a href="case-fintrack.html" class="term-link">Read FinTrack Case Study (case-fintrack.html) ↗</a></div>
          `);
          break;

        case 'case-vellum':
        case 'vellum':
          appendOutput(`
            <div class="term-line term-success">[VELLUM-DISPATCH] Mindful Reflection Workspace Mobile Concept</div>
            <div class="term-line">🌿 A Figma journaling concept: swipe-based check-ins, no push nagging, a two-scale type hierarchy.</div>
            <div class="term-line">⚡ Protopie gesture prototypes · Ambient contrast palettes · No streaks, no red badges.</div>
            <div class="term-line">👉 <a href="case-vellum.html" class="term-link">Read Vellum Case Study (case-vellum.html) ↗</a></div>
          `);
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
            <div class="term-line">Target: Hans Aaron Laureles — Applied AI Engineer &amp; Full-Stack Builder</div>
            <div class="term-line term-muted">Origin: Manila, Philippines [GMT+8] · DLSU-D Computer Science</div>
          `);
          break;

        case 'github':
        case 'gh':
          appendOutput(`
            <div class="term-line term-success">[GITHUB-DISPATCH] Connecting to GitHub profile...</div>
            <div class="term-line">🐙 Profile: <a href="https://github.com/hanslaureles" target="_blank" rel="noopener" class="term-link">github.com/hanslaureles ↗</a></div>
            <div class="term-line">⭐ Multi-Agent Swarm: <a href="https://github.com/hanslaureles/lsfm-ai-hq" target="_blank" rel="noopener" class="term-link">github.com/hanslaureles/lsfm-ai-hq ↗</a></div>
            <div class="term-line">💠 Voice Copilot HUD: <a href="https://github.com/hanslaureles/manas-ciel" target="_blank" rel="noopener" class="term-link">github.com/hanslaureles/manas-ciel ↗</a></div>
            <div class="term-line">🧠 Developer Memory: <a href="https://github.com/hanslaureles/cognitive-memory-core" target="_blank" rel="noopener" class="term-link">github.com/hanslaureles/cognitive-memory-core ↗</a></div>
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
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-badge success">HEAD -&gt; main</span> <span class="term-muted">[2026 – Present]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent" style="color:#FBBF24;">feat(ciel):</strong> Architect &amp; Developer — Manas: Ciel Voice HUD</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Groq Whisper Large v3 Turbo transcription &amp; FFmpeg audio normalization</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Custom voice filter (high-pass, presence EQ, light echo) over Edge-TTS</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Remembers the last 8 exchanges &amp; reads/writes my Obsidian notes</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• 4 background checks (hardware, Git, daily log, portfolio) &amp; real-time audio HUD</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">└──</span> <a href="case-ciel.html" class="term-link">View Case Study: case-ciel.html ↗</a></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-muted">[2025 – 2026]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent">feat(lsfm):</strong> Creator &amp; Developer — LSFM AI HQ</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Asynchronous Discord Gateway streaming &amp; isolated persona boundaries</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Multi-provider LLM router (Groq ⇄ Gemini, cross-provider fallback) with optional local Ollama on AMD RX 6600 XT</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Headless Edge single-page ATS vector PDF compiler</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">└──</span> <a href="case-lsfm.html" class="term-link">View Case Study: case-lsfm.html ↗</a></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-muted">[2024 – 2025]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent">feat(memory):</strong> Developer — Cognitive Memory Core</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Zero-dependency BM25 lesson search &amp; structured lessons</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Repeated lessons compiled into workspace rules</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">└──</span> <a href="case-memory.html" class="term-link">View Case Study: case-memory.html ↗</a></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-muted">[Jun 2024 – Aug 2024]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent">feat(roc.ph):</strong> UI/UX &amp; Frontend Engineer Intern — ROC.ph</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Figma design token translation to semantic HTML, Tailwind CSS &amp; React</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Delivered responsive client websites across diverse SME businesses</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">└──</span> <a href="about.html" class="term-link">Read Career Details: about.html ↗</a></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-muted">[2023 – 2024]</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span> <strong class="term-accent">feat(patriot):</strong> Lead Mobile Developer — Capstone: Patriot</div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• Serverless microservices on AWS Lambda, DynamoDB, Redis &amp; Cognito</span></div>
  <div class="term-line"><span class="term-git-pipe">|</span>   <span class="term-muted">• React Native cross-platform mobile client with student cohort evaluations</span></div>
</div>

<div class="term-git-entry">
  <div class="term-line"><span class="term-git-graph">*</span> <span class="term-muted">[2021 – 2025]</span></div>
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
  <tr><td><span class="term-highlight" style="color: #FBBF24;">ciel</span></td><td>✦ Manas: Ciel bilingual voice assistant</td></tr>
  <tr><td><span class="term-highlight">status</span></td><td>Show each agent's engine and schedule</td></tr>
  <tr><td><span class="term-highlight">agents</span></td><td>Learn what each of the 5 AI agents does</td></tr>
  <tr><td><span class="term-highlight">vitals</span></td><td>⚡ Eunchae's CPU/RAM/disk watchdog and the workstation hardware</td></tr>
  <tr><td><span class="term-highlight">matrix</span></td><td>🛡️ Inspect 5-agent system orchestration matrix</td></tr>
  <tr><td><span class="term-highlight">projects</span></td><td>Explore selected case studies &amp; live demos</td></tr>
  <tr><td><span class="term-highlight">audit</span></td><td>🎨 View Yunjin's 92/100 design audit &amp; resolution</td></tr>
  <tr><td><span class="term-highlight">rules</span></td><td>🧠 Inspect the 10 learned lessons &amp; rules</td></tr>
  <tr><td><span class="term-highlight">brain</span></td><td>🤖 Inspect Obsidian AI Brain &amp; MCP bridge</td></tr>
  <tr><td><span class="term-highlight">resume</span></td><td>Download Hans's single-page PDF resume</td></tr>
  <tr><td><span class="term-highlight">sakura</span></td><td>🌸 Chat with Ask Sakura AI assistant</td></tr>
  <tr><td><span class="term-highlight">overview</span></td><td>Open the agent overview (status snapshot + replay)</td></tr>
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
<div class="term-line term-cyan" style="font-weight: 600;">// 5-AGENT SYSTEM — ENGINES &amp; TRIGGERS <span class="term-badge" style="white-space: nowrap;">[SIMULATED / REPLAY]</span></div>
<div class="term-line term-muted">Default models and schedules from the public lsfm-ai-hq repo (no live connection).</div>
<table class="term-table">
  <thead>
    <tr class="term-muted">
      <th>AGENT</th><th>ROLE</th><th>PRIMARY ENGINE</th><th>TRIGGER / SCHEDULE</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🌸 Sakura</td><td>Team Coordinator</td><td>Groq (qwen3.8-27b)</td><td>Briefing after 08:00 · rollup after 20:00 · !apply, !inbox, !triage</td>
    </tr>
    <tr>
      <td>🐯 Chaewon</td><td>Career Assistant</td><td>Groq (gpt-oss-120b) · headless Edge PDF</td><td>Sunday resume rebuild after 22:00 · !scout, !tailor, !pdf</td>
    </tr>
    <tr>
      <td>🐍 Yunjin</td><td>Design Reviewer</td><td>Gemini (gemini-3.6-flash)</td><td>Weekly portfolio audit · !audit, !critique</td>
    </tr>
    <tr>
      <td>🦢 Kazuha</td><td>Code &amp; Knowledge</td><td>Groq (qwen3.8-27b) · RAG: Gemini embeddings + BM25</td><td>Research scout Mon/Wed/Fri after 09:30 · !ask, !search, !git</td>
    </tr>
    <tr>
      <td>🥔 Eunchae</td><td>System Health</td><td>Groq (gpt-oss-20b) · psutil watchdog</td><td>Every 5 min · vitals card after 08:00 · Obsidian heartbeat every 15 min</td>
    </tr>
  </tbody>
</table>
<div class="term-line term-muted" style="margin-top: 4px;">All agents share one LLM layer: Groq first, Gemini (gemini-3.6-flash) if Groq fails, optional local Ollama (qwen2.5-coder:7b).</div>
<div class="term-line term-muted">Host: Intel Core i5-12400F · 16 GB DDR4 · AMD Radeon RX 6600 XT (8 GB) · Manila, Philippines (UTC+8)</div>
<div class="term-line term-cyan" style="margin-top: 4px;">💡 Tip: Type <span class="term-highlight">'agents'</span> to see what each agent does, or <span class="term-highlight">'projects'</span> to view work.</div>
      `.trim());
    }

    function showAgents() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// 5-AGENT SYSTEM — ROSTER &amp; RESPONSIBILITIES</div>
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
  <div class="term-line"><strong class="term-highlight">🦢 Kazuha (Code &amp; Knowledge)</strong></div>
  <div class="term-line term-muted">Answers questions about the codebase and reviews uncommitted changes.</div>
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
    <td>Autonomous Multi-Agent System (5 Specialized Agents)</td>
    <td><a href="case-lsfm.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent" style="color: #FBBF24;">02. Manas: Ciel</strong></td>
    <td>Bilingual voice assistant &amp; web dashboard</td>
    <td><a href="case-ciel.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">03. Cognitive Memory Core</strong></td>
    <td>Lessons-learned memory for AI coding assistants</td>
    <td><a href="case-memory.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">04. Aura Coffee &amp; Kitchen</strong></td>
    <td>Artisanal Specialty Commerce (Live Demo)</td>
    <td><a href="aura-store/index.html" target="_blank" class="term-link">Launch Store ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">05. Lumina Analytics</strong></td>
    <td>Study &amp; Focus Dashboard (Figma + React)</td>
    <td><a href="case-lumina.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">06. Vellum (Mobile Concept)</strong></td>
    <td>Mindful Mental Wellness Mobile Concept</td>
    <td><a href="case-vellum.html" class="term-link">Case Study ↗</a></td>
  </tr>
  <tr>
    <td><strong class="term-accent">07. FinTrack App</strong></td>
    <td>Personal Finance &amp; Budgeting UX Concept</td>
    <td><a href="case-fintrack.html" class="term-link">Case Study ↗</a></td>
  </tr>
</table>
<div class="term-line term-muted" style="margin-top: 6px;">💡 Tip: Click any link above or scroll down to the Selected Works showcase.</div>
      `.trim());
    }

    function showCiel() {
      appendOutput(`
<div class="term-line" style="color: #F59E0B; font-weight: 600;">✨ MANAS: CIEL // BILINGUAL VOICE ASSISTANT</div>
<table class="term-table">
  <tr><td><strong class="term-highlight">CORE ARCHITECTURE</strong></td><td class="term-cyan">Async Python 3.11 server (aiohttp) · two-mode planner</td></tr>
  <tr><td><strong class="term-highlight">AUDIO PIPELINE</strong></td><td>FFmpeg 16kHz Mono Normalization + Groq Whisper Large v3 Turbo (OpenAI Whisper fallback)</td></tr>
  <tr><td><strong class="term-highlight">VOICE FILTER</strong></td><td style="color: #10B981;">High-pass · Presence EQ · Light Echo · Edge-TTS (ja-JP-NanamiNeural + en-US-AvaNeural)</td></tr>
  <tr><td><strong class="term-highlight">OBSIDIAN NOTES</strong></td><td>Reads &amp; writes my vault (Rules, Profile, Preferences, Daily log)</td></tr>
  <tr><td><strong class="term-highlight">LIVE DATA</strong></td><td class="term-cyan">Weather (wttr.in) + Web Search (DDGS)</td></tr>
  <tr><td><strong class="term-highlight">MEMORY</strong></td><td class="term-cyan">Remembers the last 8 exchanges</td></tr>
  <tr><td><strong class="term-highlight">BACKGROUND CHECKS</strong></td><td>4 Checks: Hardware Vitals, Git Status, Obsidian Daily Log, Portfolio Markers</td></tr>
  <tr><td><strong class="term-highlight">AGENTS</strong></td><td>Hands tasks to the 5 LSFM agents: Sakura, Chaewon, Kazuha, Yunjin, Eunchae</td></tr>
  <tr><td><strong class="term-highlight">LIVE SIMULATOR</strong></td><td><a href="case-ciel.html#simulator" class="term-link">In-Page Voice Demo ↗</a></td></tr>
  <tr><td><strong class="term-highlight">CASE STUDY</strong></td><td><a href="case-ciel.html" class="term-link">portfolio-site/case-ciel.html ↗</a></td></tr>
</table>
<div class="term-line term-muted" style="margin-top: 6px;">💡 Tip: Type <span class="term-highlight">'projects'</span> to view all works, or explore the full case study: <a href="case-ciel.html" class="term-link">Read Manas: Ciel Case Study →</a></div>
      `.trim());
    }

    function showSentinelTelemetry(args) {
      appendOutput(`
<div class="term-line term-success">============================================================</div>
<div class="term-line term-accent" style="font-weight: 600;">📡 AGENT OVERVIEW // LSFM AI HQ</div>
<div class="term-line term-success">============================================================</div>
<div class="term-line">Location: Manila, Philippines · UTC+8</div>
<div class="term-line">Agent System: <span class="term-badge">5 AGENTS · LOCAL HOST</span> · Data: <span class="term-cyan">status snapshot in the panel (online only if a heartbeat is under 15 min old); events are a scripted replay</span></div>
<table class="term-table" style="margin-top: 6px;">
  <thead>
    <tr class="term-muted">
      <th>AGENT</th><th>ROLE</th><th>RUNS ON</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🌸 Sakura</td><td>Team Coordinator</td><td><span class="term-badge">● LOCAL</span></td>
    </tr>
    <tr>
      <td>⭐ Chaewon</td><td>Career Assistant</td><td><span class="term-badge">● LOCAL</span></td>
    </tr>
    <tr>
      <td>💻 Kazuha</td><td>Code &amp; Knowledge</td><td><span class="term-badge">● LOCAL</span></td>
    </tr>
    <tr>
      <td>🎨 Yunjin</td><td>Design Reviewer</td><td><span class="term-badge">● LOCAL</span></td>
    </tr>
    <tr>
      <td>🛡️ Eunchae</td><td>System Health</td><td><span class="term-badge">● LOCAL</span></td>
    </tr>
  </tbody>
</table>
<div class="term-line term-cyan" style="margin-top: 6px;">[OVERVIEW] Opening the agent overview...</div>
      `.trim());

      if (window.openSentinelHUD) {
        setTimeout(() => {
          window.openSentinelHUD();
        }, 350);
      }
    }

    function showBenchmarks() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// INFERENCE MODES: TRADE-OFFS</div>
<table class="term-table">
  <thead>
    <tr class="term-muted">
      <th>PROPERTY</th><th>LOCAL MODE (OLLAMA · RX 6600 XT)</th><th>CLOUD MODE (GROQ ⇄ GEMINI)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Model</td><td>qwen2.5-coder:7b</td><td>per agent: qwen3.8-27b, gpt-oss-120b, gpt-oss-20b (Groq) or gemini-3.6-flash (Yunjin), each falling back to the other provider</td>
    </tr>
    <tr>
      <td>Runs On</td><td class="term-success">Own hardware</td><td>Groq / Gemini APIs</td>
    </tr>
    <tr>
      <td>Works Offline</td><td class="term-success">Yes (inference)</td><td class="term-muted">No</td>
    </tr>
    <tr>
      <td>Where Prompts Go</td><td class="term-success">Stay on the workstation</td><td class="term-muted">Sent to Groq / Google</td>
    </tr>
    <tr>
      <td>Speed (p50)</td><td>28 tokens/s · 7.7 s cold load</td><td>303 ms to first token · 459 tokens/s (network round trip)</td>
    </tr>
  </tbody>
</table>
<div class="term-line term-muted" style="margin-top: 4px;">Measured 2026-10-01, N=10, same streamed prompt at temperature 0, on an i5-12400F with the RX 6600 XT (model fully in VRAM). Groq times include this machine's internet path. Source: lsfm-ai-hq bench/results/2026-10-01.md.</div>
<div class="term-line term-success" style="margin-top: 6px;">Trade-off: local mode buys privacy and offline use; cloud mode buys output quality. The operator picks per task with !mode.</div>
      `.trim());
    }

    function showSkills() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// HANS AARON LAURELES — 3-PILLAR SYSTEMS ENGINEERING TRIAD</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><span class="term-highlight">01. APPLIED AI &amp; MULTI-AGENT SYSTEMS</span></div>
  <div class="term-line term-muted">  • Multi-Agent Teams (LSFM AI HQ: 5 Discord agents, one job each)</div>
  <div class="term-line term-muted">  • Local GPU Inference: Ollama on AMD RX 6600 XT, GGUF Quantization</div>
  <div class="term-line term-muted">  • Multi-Provider LLM Routing (Groq LPUs + Gemini, each the other's fallback, local Ollama mode)</div>
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
  <div class="term-line"><span class="term-highlight">03. FRONTEND &amp; INTERFACE DESIGN</span></div>
  <div class="term-line term-muted">  • Modern Web: Vanilla JS/ES6+, React, Next.js, TypeScript, HTML5 Semantic Living Specs</div>
  <div class="term-line term-muted">  • Design Systems: CSS Custom Properties, Design Tokens, Swiss Typography Hierarchy</div>
  <div class="term-line term-muted">  • High-Dwell Telemetry Boards, Terminal UIs, WCAG 2.1 AA (axe-checked in CI)</div>
</div>
      `.trim());
    }

    function showCaseStudy() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// CASE STUDY 01: LSFM AI HQ — AUTONOMOUS MULTI-AGENT SYSTEM</div>
<div class="term-line">A production multi-agent operations platform orchestrating career surveillance, email batch classification, and vector knowledge memory across 5 specialized agents.</div>
<div class="term-line" style="margin: 8px 0;">
  <div class="term-muted">• Architecture: 5 Discord bots sharing one asyncio event loop, blocking work in worker threads</div>
  <div class="term-muted">• Inference: per-agent Groq and Gemini models with cross-provider fallback, optional local Ollama on AMD Radeon RX 6600 XT</div>
  <div class="term-muted">• Automation: two-tier Gmail classification into 10 labels, headless Edge ATS resume compiler</div>
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
<div class="term-line term-muted">Compiled with Headless Edge ATS Engine · Selectable-Text PDF</div>
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
<div class="term-line term-muted">Example: <span class="term-highlight">rag gpu</span> or <span class="term-highlight">rag design tokens</span></div>
        `.trim());
        return;
      }

      const qLower = query.toLowerCase();
      let matchedSnippets = [];

      if (qLower.includes('vulkan') || qLower.includes('directml') || qLower.includes('rx 6600') || qLower.includes('gpu') || qLower.includes('amd')) {
        matchedSnippets = [
          {
            doc: 'case-lsfm.html: Section 03',
            score: '0.942',
            text: 'LLM Router: three modes (local / cloud / auto). Local mode runs Ollama qwen2.5-coder:7b on an AMD Radeon RX 6600 XT (8GB VRAM); cloud mode uses per-agent models (Groq qwen3.8-27b by default, Gemini for Yunjin), each falling back to the other provider. Measured 2026-10-01 (N=10): local decodes about 28 tokens/s; Groq returns the first token in about 303 ms over the network.'
          },
          {
            doc: 'lsfm-ai-hq/llm_client.py',
            score: '0.887',
            text: 'Local mode keeps prompts, credentials and resumes on the workstation. There is no automatic cloud-to-local failover: auto mode tries Ollama first and falls through to the agent\'s cloud chain (Groq and Gemini) on a local error.'
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
            text: 'Interface design: design tokens, CSS custom properties, Swiss editorial typography, WCAG 2.1 AA accessibility checks.'
          }
        ];
      } else if (qLower.includes('email') || qLower.includes('gmail') || qLower.includes('eunchae')) {
        matchedSnippets = [
          {
            doc: 'lsfm-ai-hq/gmail_engine.py',
            score: '0.961',
            text: 'Sakura Gmail Engine: Google OAuth2 triage. Two-tier classification (deterministic sender/domain rules, then an LLM JSON classifier) across 10 custom Gmail labels, with non-destructive bulk-archiving (label changes only, never deletes).'
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

      let html = `<div class="term-line term-accent">⚡ MATCHING LESSONS (${matches.length} found):</div>`;
      matches.forEach(m => {
        html += `
          <div class="term-block" style="margin: 6px 0; border-left: 2px solid var(--accent); padding-left: 8px;">
            <div class="term-line"><span class="term-cyan">[${m.id}] ${m.domain}</span></div>
            <div class="term-line">• <strong>Rule</strong>: ${escapeHtml(m.rule)}</div>
            <div class="term-line term-muted">• <strong>Avoided</strong>: ${escapeHtml(m.symptom)}</div>
          </div>
        `;
      });
      html += `<div class="term-line term-success">✓ Keyword-matched in your browser against a sample of experience_store.jsonl (the Python BM25 engine measures 0.81 ms median on the 10-lesson store)</div>`;
      appendOutput(html.trim());
    }

    function showRules() {
      appendOutput(`
        <div class="term-line term-cyan">// WORKSPACE LESSONS &amp; RULES (Obsidian: 03 - Rules &amp; Memory)</div>
        <div class="term-line term-muted">Rules compiled from lessons about real bugs:</div>
        <div class="term-block" style="margin: 6px 0;">
          <div class="term-line"><span class="term-highlight">[MEM-001] COPYWRITING</span>: Forbid sci-fi jargon in hospitality; use tactile culinary words.</div>
          <div class="term-line"><span class="term-highlight">[MEM-002] CSS-LAYOUT</span>: No spaced brackets in flex nav; enforce white-space: nowrap.</div>
          <div class="term-line"><span class="term-highlight">[MEM-003] EDGE-ROUTING</span>: Explicit subfolder redirects must precede catch-all 404 in Netlify.</div>
          <div class="term-line"><span class="term-highlight">[MEM-004] LOCALIZATION</span>: PH checkout must include GCash, Maya, and COD with +63 format.</div>
          <div class="term-line"><span class="term-highlight">[MEM-005] CLI-SHELL</span>: Avoid nested double quotes in PowerShell; use dedicated script files.</div>
          <div class="term-line"><span class="term-highlight">[MEM-006] WINDOWS-PYTHON</span>: Reconfigure stdout to UTF-8 to prevent cp1252 charmap crashes.</div>
          <div class="term-line"><span class="term-highlight">[MEM-007] DEPLOYMENT</span>: Deploy via Git commits/push; avoid manual file uploads to Netlify.</div>
          <div class="term-line"><span class="term-highlight">[MEM-008] DOC-PARSING</span>: Never terminate cover letter parsing prematurely on contact lines.</div>
          <div class="term-line"><span class="term-highlight">[MEM-009] API-RESILIENCY</span>: Implement exponential backoff (2-4s) &amp; multi-model rotation pool.</div>
          <div class="term-line"><span class="term-highlight">[MEM-010] RESUME-WRITING</span>: Always ground bullet points in real stacks &amp; verified metrics.</div>
        </div>
        <div class="term-line">👉 <a href="case-memory.html" class="term-link">Read Cognitive Memory Case Study (case-memory.html) ↗</a></div>
      `.trim());
    }

    function showAuditReport() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// YUNJIN DESIGN CRITIC &amp; QA AUDIT REPORT</div>
<div class="term-line"><span class="term-success">[STATUS]</span> Portfolio Health Score: <strong class="term-highlight">92 / 100</strong> <span class="term-muted">(Yunjin audit, 2026-09-23)</span></div>
<table class="term-table">
  <thead>
    <tr class="term-muted"><th>CHECK</th><th>RESULT</th><th>DETAIL</th></tr>
  </thead>
  <tbody>
    <tr><td>Asset Hygiene</td><td class="term-success">49 / 49 Valid</td><td>0 broken links at audit time</td></tr>
    <tr><td>Top Recommendation</td><td class="term-accent">Optimize images</td><td>Convert to WebP/AVIF with lazy-loading to protect LCP</td></tr>
    <tr><td>Follow-Up</td><td class="term-success">Shipped 2026-10-01</td><td>Responsive AVIF/WebP + lazy-loading: 58.7 MB of PNGs → 7–143 KB per page</td></tr>
  </tbody>
</table>
<div class="term-line term-muted" style="margin-top: 6px;">Audit Log Source: LE-SSERAFIM-AI-HQ/portfolio_audits/2026-09-23_portfolio_audit.md</div>
      `.trim());
    }

    function showBrain() {
      appendOutput(`
<div class="term-line term-cyan" style="font-weight: 600;">// OBSIDIAN NOTES // VAULT STRUCTURE</div>
<div class="term-line"><span class="term-success">[BRIDGE]</span> Antigravity reaches the vault through an MCP server. The LSFM agents and Ciel use obsidian_client.py (public in lsfm-ai-hq) over Obsidian's Local REST API, with a filesystem fallback. The vault's notes stay private.</div>
<div class="term-block" style="margin: 6px 0;">
  <div class="term-line"><span class="term-highlight">00 - Hub</span>: Central dashboard, quick links &amp; navigation indices</div>
  <div class="term-line"><span class="term-highlight">01 - User</span>: Candidate profile, master resume, interview defense playbook</div>
  <div class="term-line"><span class="term-highlight">02 - Agents</span>: Roster dossiers for Sakura, Chaewon, Yunjin, Kazuha, Eunchae</div>
  <div class="term-line"><span class="term-highlight">03 - Rules &amp; Memory</span>: 10 lessons [MEM-001 to MEM-010]</div>
  <div class="term-line"><span class="term-highlight">04 - Projects</span>: Architectural specs for LSFM, Memory Core, Aura, Lumina, FinTrack</div>
  <div class="term-line"><span class="term-highlight">05 - Daily Logs</span>: Automated timestamped agent dispatches &amp; daily briefings</div>
</div>
<div class="term-line term-muted">Local REST API Endpoint: https://127.0.0.1:27124 (Zero-Cloud Local Storage)</div>
      `.trim());
    }

    function showVitals() {
      appendOutput(`
<div class="term-line term-comment"># Eunchae Watchdog // Workstation hardware (no live readings on this site)</div>
<div class="term-line term-cyan">&gt; sys.watchdog --hardware</div>

<div class="term-line"><span class="term-success">[HOST]</span> Intel Core i5-12400F (12 Logical Threads @ 2.50–4.40 GHz)</div>
<div class="term-line"><span class="term-success">[SILICON]</span> AMD Radeon RX 6600 XT (8GB GDDR6 VRAM · Ollama local mode)</div>
<div class="term-line"><span class="term-success">[MEMORY]</span> 16 GB DDR4-3200 (2 × 8 GB, dual-channel)</div>

<div class="term-line term-muted" style="margin-top: 6px;">The watchdog samples CPU, RAM and disk via psutil every 5 minutes on the workstation. The portfolio has no live connection to it, so no readings are shown here.</div>
      `.trim());
    }

    function showSwarm() {
      appendOutput(`
<div class="term-line term-comment"># LSFM AI HQ // 5-Agent Roster</div>
<div class="term-line term-cyan">&gt; lsfm.agents --roster</div>

<div class="term-line"><strong class="term-accent">AGENT ROSTER:</strong></div>
<div class="term-line">  1. 🌸 <strong>Sakura</strong>   | Chief of Staff      | #command-center   | <span class="term-badge success">ORCHESTRATOR</span></div>
<div class="term-line">     └─ Daily briefings (!briefing), Gmail triage (!inbox, !clean), !apply pipeline</div>
<div class="term-line">  2. 🦢 <strong>Kazuha</strong>   | Code &amp; Knowledge    | #frontend-lab     | <span class="term-badge">CODE REVIEW</span></div>
<div class="term-line">     └─ Codebase Q&amp;A (!ask, !search), reviews uncommitted changes (!git, !review)</div>
<div class="term-line">  3. 🎨 <strong>Yunjin</strong>   | Document Architect  | #portfolio-audits | <span class="term-badge">DESIGN CRITIC</span></div>
<div class="term-line">     └─ Automated DOM &amp; asset audits (!audit), design critiques (!critique)</div>
<div class="term-line">  4. 🐯 <strong>Chaewon</strong>  | Career Strategist   | #job-tailoring    | <span class="term-badge">ATS RADAR</span></div>
<div class="term-line">     └─ Job scouting (!scout), ATS tailoring (!apply), headless vector PDF (!pdf)</div>
<div class="term-line">  5. 🥔 <strong>Eunchae</strong>  | System Guardian     | #pc-vitals        | <span class="term-badge">VITALS WATCHDOG</span></div>
<div class="term-line">     └─ Hardware vitals via psutil (5-min cycle), health reports (!health)</div>

<div class="term-line term-muted" style="margin-top: 6px;">Inference: Groq ⇄ Gemini, per-agent models with cross-provider fallback · optional local Ollama (RX 6600 XT) · self-hosted</div>
      `.trim());
    }

    function showMemoryCaseStudy() {
      appendOutput(`
        <div class="term-line term-cyan">// CASE STUDY 03: MEMORY CORE</div>
        <div class="term-line">A lessons-learned memory for AI coding assistants: BM25 finds past lessons before each task, and repeated lessons are compiled into workspace rules. Pure Python, no dependencies.</div>
        <div class="term-line" style="margin: 6px 0;">
          <div class="term-muted">• Latency: 0.81 ms p50 recall on the real 10-entry store (500 calls, i5-12400F, eval 2026-10-02); grows linearly, 695 ms at 10,000 synthetic entries</div>
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
        try { localStorage.setItem('hans_portfolio_theme', mode); } catch (e) {}
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
