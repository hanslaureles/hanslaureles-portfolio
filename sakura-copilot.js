/**
 * SAKURA RECRUITER AI COPILOT
 * Author: Hans Aaron Laureles
 */

(function () {
  'use strict';

  // ============================================================================
  // 1. CURATED KNOWLEDGE CORPUS (Pre-Indexed Chunks)
  // ============================================================================
  const KNOWLEDGE_BASE = [
    {
      id: "KNOW-01",
      title: "React, Next.js & Frontend Interface Craft",
      category: "Frontend Engineering",
      keywords: ["react", "nextjs", "next.js", "frontend", "ui", "ux", "typescript", "javascript", "tailwind", "css", "html", "design systems", "wcag", "swiss"],
      summary: "Hans is a high-craft frontend engineer and systems architect specializing in React, Next.js, TypeScript, and design token architectures. He bridges computer science rigor with executive Swiss editorial typography and WCAG AAA accessibility.",
      evidence: "Engineered production client interfaces at ROC (roc.ph) with React and Tailwind; architected Lumina Analytics (high-density B2B dashboard with Chart.js); built Aura Coffee (/aura-store) with vanilla CSS tokens; and developed Patriot Capstone in React Native.",
      linkUrl: "case-lumina.html",
      linkText: "Explore Lumina Analytics Case Study →",
      secondaryUrl: "case-aura.html",
      secondaryText: "View Aura Coffee E-Commerce →"
    },
    {
      id: "KNOW-02",
      title: "LSFM AI HQ — 5-Agent Autonomous Swarm",
      category: "Autonomous Systems",
      keywords: ["lsfm", "ai hq", "agents", "swarm", "autonomous", "discord", "multi-agent", "orchestration", "asyncio", "python", "gmail", "triage", "sakura", "chaewon", "kazuha", "yunjin", "eunchae"],
      summary: "Hans architected LSFM AI HQ, an autonomous 5-agent operations platform orchestrating Discord Gateway streaming, isolated domain personas, and shared cognitive memory at $0.00 operational cost.",
      evidence: "Operates 5 specialized daemons: Sakura (Chief of Staff & dispatch), Chaewon (Career & ATS PDF compiler), Yunjin (Design critic), Kazuha (Frontend & Git Sentinel), and Eunchae (System Guardian & QA runner). Integrated with Google Workspace OAuth2 for automated Gmail triage (120+ emails sorted into 10 hierarchical labels).",
      linkUrl: "case-lsfm.html",
      linkText: "Read LSFM AI HQ Architecture Deep-Dive →"
    },
    {
      id: "KNOW-03",
      title: "Local GPU Inference on AMD Radeon RX 6600 XT",
      category: "Inference & Hardware",
      keywords: ["gpu", "hardware", "directml", "vulkan", "amd", "rx 6600 xt", "ollama", "local ai", "inference", "qwen", "groq", "hybrid", "offline", "silicon"],
      summary: "Hans engineered a zero-cost hybrid inference router combining Groq Cloud (Qwen-2.5-70B, sub-300ms) with local hardware acceleration on his AMD Radeon RX 6600 XT (8GB VRAM) via DirectML and Ollama (qwen2.5-coder:7b).",
      evidence: "Features automatic local silicon failover if internet disconnects, guaranteeing 100% offline autonomy, local code generation, and zero recurring SaaS subscription costs.",
      linkUrl: "case-lsfm.html",
      linkText: "Inspect Hybrid Router in Case Study →"
    },
    {
      id: "KNOW-04",
      title: "Cognitive Memory Core — Zero-Dependency Memory Flywheel",
      category: "Cognitive Architecture",
      keywords: ["memory", "cognitive", "bm25", "agent-memory", "recall", "reflect", "crystallize", "rules", "antigravity", "episodic", "retrieval", "flywheel", "amnesia"],
      summary: "Hans designed and built the Cognitive Memory Core, a self-improving developer agent engine written in 100% pure Python standard library with zero pip dependencies.",
      evidence: "Executes BM25 heuristic retrieval before agent execution, logs structured failure post-mortems (trigger, symptom, root cause, permanent rule), and auto-crystallizes high-frequency lessons into Antigravity workspace rules to permanently eliminate regression errors.",
      linkUrl: "case-memory.html",
      linkText: "Read Cognitive Memory Case Study →"
    },
    {
      id: "KNOW-05",
      title: "UI/UX & Frontend Internship at ROC.ph",
      category: "Professional Experience",
      keywords: ["roc", "roc.ph", "internship", "work experience", "ui/ux", "figma", "client", "wordpress", "tailwind", "design tokens", "heuristics"],
      summary: "Hans served as UI/UX & Frontend Engineer Intern at ROC (roc.ph) in General Trias, Cavite (June – August 2024), taking client products from Figma design specs to production web deployments.",
      evidence: "Architected responsive interfaces applying Nielsen Norman Group usability heuristics; converted Figma designs into semantic HTML5, modern CSS, Tailwind, and React; participated in agile client reviews and Git workflows across production client websites.",
      linkUrl: "about.html",
      linkText: "Read Career Background in About Me →"
    },
    {
      id: "KNOW-06",
      title: "Patriot Capstone — Cloud & Systems Architecture",
      category: "Cloud & Systems",
      keywords: ["patriot", "capstone", "aws", "lambda", "dynamodb", "redis", "cognito", "serverless", "cloud", "react native", "algorithms", "mobile"],
      summary: "As Lead Mobile Developer for his BS CS capstone at DLSU-D, Hans engineered 'Patriot', a real-time mobile matchmaking and community system built on serverless cloud microservices.",
      evidence: "Built cross-platform mobile frontend in React Native (TypeScript) integrated with AWS Lambda, DynamoDB, Redis in-memory caching, and AWS Cognito auth. Designed custom algorithmic interest scoring via multidimensional matrices and conducted structured usability evaluations with student cohorts.",
      linkUrl: "about.html",
      linkText: "View Capstone Architecture in About Me →"
    },
    {
      id: "KNOW-07",
      title: "Cloud Infrastructure, APIs & Automation",
      category: "Backend & DevOps",
      keywords: ["aws", "cloud", "backend", "api", "apis", "rest", "oauth2", "google workspace", "gmail api", "headless edge", "chromium", "redis", "docker", "automation"],
      summary: "Hans's systems stack includes AWS (Lambda, DynamoDB, Cognito, S3), Redis in-memory caching, asynchronous Python microservices (asyncio), Google Workspace REST APIs with OAuth2 token rotation, and headless Edge/Chromium automation.",
      evidence: "Engineered headless Edge PDF pipelines that compile single-page ATS-compliant vector PDFs directly, and OAuth2 batch triage sorting unread emails into 10 hierarchical labels.",
      linkUrl: "about.html",
      linkText: "View 3-Pillar Technical Matrix →"
    },
    {
      id: "KNOW-08",
      title: "Aura Coffee & Kitchen — Interactive E-Commerce",
      category: "Live Interactive Project",
      keywords: ["aura", "coffee", "store", "ecommerce", "e-commerce", "shop", "checkout", "gcash", "maya", "philippines", "payment rails", "customizer"],
      summary: "Hans designed and engineered Aura Coffee & Kitchen, an artisanal specialty coffeehouse web store featuring dynamic drink customization, slide-over bag drawer, and localized Philippine mobile payment rails.",
      evidence: "Fully interactive production build live directly on this site at /aura-store! Features drink temperature/milk customizers, delivery threshold trackers, and 1-page checkout simulating GCash, Maya, and QR Ph.",
      linkUrl: "aura-store/index.html",
      linkText: "⚡ Launch Interactive Store Demo (/aura-store) →",
      secondaryUrl: "case-aura.html",
      secondaryText: "Read Aura Design Case Study →"
    },
    {
      id: "KNOW-09",
      title: "Education, Degree & Academic Background",
      category: "Education & Credentials",
      keywords: ["education", "degree", "college", "university", "dlsu", "dlsu-d", "computer science", "bs cs", "academics", "gpa", "coursework"],
      summary: "Hans graduated with a Bachelor of Science in Computer Science (BS CS) from De La Salle University–Dasmariñas (DLSU-D, 2021–2025).",
      evidence: "Completed rigorous coursework in Distributed Systems, Algorithms & Complexities, Software Engineering, Database Management Systems, Human-Computer Interaction (HCI), and Object-Oriented Software Design.",
      linkUrl: "about.html",
      linkText: "Read Academic History on About Page →"
    },
    {
      id: "KNOW-10",
      title: "Candidate Profile, Location & Contact Details",
      category: "Candidate Logistics",
      keywords: ["contact", "email", "location", "hire", "job", "salary", "remote", "cavite", "manila", "philippines", "availability", "resume", "pdf"],
      summary: "Hans Aaron Laureles is based in Cavite, Philippines, and is actively seeking full-time AI Systems Engineer, Applied AI, or Full-Stack Builder opportunities (Open to Remote, Hybrid, or Relocation).",
      evidence: "Email: hanslaureles92@gmail.com | Portfolio: hanslaureles.vercel.app | GitHub: github.com/hanslaureles. You can download his 1-page executive ATS vector resume directly from this site.",
      linkUrl: "Hans_Laureles_Resume.pdf",
      linkText: "📄 Download Hans's 1-Page ATS Resume (PDF) →"
    },
    {
      id: "KNOW-11",
      title: "Sentinel Telemetry & Ambient Mission Control",
      category: "Telemetry & Observability",
      keywords: ["sentinel", "telemetry", "mission control", "hud", "ping", "vitals", "clock", "manila", "status", "fleet", "heartbeat", "ambient"],
      summary: "Hans architected the Sentinel Telemetry system, providing live ambient status beacons, sub-20ms latency monitoring, and an interactive mission-control HUD for his 5-agent swarm.",
      evidence: "Live directly on this site! Click the hero status beacon (or press 'S' / type 'sentinel' in the terminal) to open the Sentinel HUD, featuring real-time Manila UTC+8 clock, fleet status across 5 agents, simulated live fleet probes, and clipboard architecture report export.",
      linkUrl: "index.html#sentinel",
      linkText: "⚡ Inspect Sentinel Telemetry HUD (Press 'S') →"
    },
    {
      id: "KNOW-12",
      title: "Git Career Timeline ($ git log --graph)",
      category: "Developer Experience",
      keywords: ["git log", "timeline", "git", "commits", "career track", "milestones", "history", "graph", "career timeline"],
      summary: "Hans built an authentic developer-native Git branch career timeline view across the homepage interactive terminal and the About page.",
      evidence: "Recruiters can run 'git log' in the homepage CLI or toggle the '$ git log --graph' mode on about.html to inspect commit hashes, milestone branches (v1.0 to v2.5), and copy individual commit SHAs with 1 click.",
      linkUrl: "about.html#git",
      linkText: "🌿 View $ git log Timeline on About Page →"
    },
    {
      id: "KNOW-13",
      title: "FinTrack App — Algorithmic Financial Intelligence",
      category: "Algorithmic UX & FinTech",
      keywords: ["fintrack", "fintech", "finance", "budget", "budgeting", "expense", "transaction", "loss aversion", "heuristics", "money", "spending"],
      summary: "Hans architected FinTrack to eliminate personal budget abandonment through a sub-3.2s transaction input engine, behavioral loss aversion nudges, and predictive month-end burn curves.",
      evidence: "Engineered with modular Figma design tokens, Auto Layout 5.0, single-ceiling daily velocity monitoring, and non-shame behavioral economics feedback achieving 94% usability task completion in testing.",
      linkUrl: "case-fintrack.html",
      linkText: "📊 Read FinTrack Mobile Case Study →"
    },
    {
      id: "KNOW-14",
      title: "Vellum Minimal OS — Ambient Reflection Workspace",
      category: "Interaction Systems & Mobile UX",
      keywords: ["vellum", "minimalist", "calm", "wellness", "mood tracking", "reflection", "mobile concept", "ambient", "os", "gestures"],
      summary: "Hans designed Vellum, an ambient mobile reflection companion engineered to combat notification fatigue and cognitive context-switching friction.",
      evidence: "Features fluid gesture-driven journaling, dual-scale Swiss typographic hierarchy, and calm ambient color palettes built using Auto Layout 5.0 tokenized components.",
      linkUrl: "case-vellum.html",
      linkText: "🌿 Explore Vellum Mobile Case Study →"
    },
    {
      id: "KNOW-15",
      title: "Obsidian AI Brain & Model Context Protocol (MCP) Bridge",
      category: "Knowledge Systems & Tooling",
      keywords: ["obsidian", "mcp", "model context protocol", "second brain", "vault", "knowledge graph", "memory", "brain", "local rest api", "stdio"],
      summary: "Hans established a live native Model Context Protocol (MCP) bridge connecting Antigravity and local swarm daemons directly to his Obsidian AI Brain.",
      evidence: "Enables agents to query learned heuristics from Learned_Rules.md, fetch project dossiers, and append automated session logs over a zero-cloud local HTTPS REST API running on port 27124.",
      linkUrl: "case-lsfm.html",
      linkText: "🤖 Read Multi-Agent Swarm Architecture →"
    },
    {
      id: "KNOW-16",
      title: "Yunjin Automated Design Audit & QA Suite",
      category: "Quality Assurance & Standards",
      keywords: ["audit", "yunjin", "qa", "wcag", "accessibility", "standards", "lint", "health", "score", "assets"],
      summary: "Hans built Yunjin, an automated portfolio design critic and QA auditor in the LSFM Swarm that verifies asset hygiene, contrast ratios, and WCAG AAA compliance.",
      evidence: "Scanned all 9 portfolio pages with 49/49 verified image assets, 100% valid semantic HTML specs, and engineered first-200px problem/solution contrast cards across all 6 case studies.",
      linkUrl: "case-lsfm.html",
      linkText: "🎨 View LSFM Daemon Roster →"
    },
    {
      id: "KNOW-17",
      title: "Manas: Ciel — Divine Wisdom AI Voice Copilot & HUD",
      category: "Voice AI & Multi-Agent Systems",
      keywords: ["ciel", "manas", "voice", "hud", "thought acceleration", "groq", "whisper", "tensura", "divine wisdom", "elevenlabs", "obsidian", "mcp", "speech", "copilot", "audio", "dsp", "latency", "real-time"],
      summary: "Hans architected Manas: Ciel, an autonomous voice-first cognitive copilot and local HUD operating at sub-800ms speech-to-speech roundtrips using Groq Whisper Turbo, Llama-3.3-70B, and Thought Acceleration DSP.",
      evidence: "Features real-time speech loop with local PyAudio streaming, Thought Acceleration DSP (+5Hz pitch, 1.25x tempo), direct tool invocation into Obsidian AI Brain via MCP, dual-monitor visual state telemetry, and proactive 4-domain background sentinels.",
      linkUrl: "case-ciel.html",
      linkText: "🔮 Read Manas: Ciel Case Study →",
      secondaryUrl: "case-ciel.html#simulator",
      secondaryText: "⚡ Test Voice Simulator →"
    }
  ];

  // ============================================================================
  // 2. IN-MEMORY KNOWLEDGE INDEX
  // ============================================================================
  const STOP_WORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'were', 'will', 'with', 'does', 'tell', 'me', 'about',
    'what', 'who', 'how', 'can', 'did', 'do', 'hans', 'laureles'
  ]);

  function tokenize(text) {
    if (!text) return [];
    const tokens = text
      .toLowerCase()
      .replace(/[^a-z0-9_\-\.\s]/g, ' ')
      .split(/\s+/)
      .map(t => t.trim())
      .filter(t => t.length > 1 && !STOP_WORDS.has(t));
    return tokens;
  }

  class KnowledgeIndexEngine {
    constructor(corpus, k1 = 1.5, b = 0.75) {
      this.corpus = corpus;
      this.k1 = k1;
      this.b = b;
      this.N = corpus.length;
      this.docTokens = [];
      this.docLengths = [];
      this.docFreqs = {};
      this.avgdl = 0;

      this.index();
    }

    index() {
      let totalLength = 0;

      this.corpus.forEach(doc => {
        // Combined searchable text with keyword weighting
        const combined = `${doc.title} ${doc.title} ${doc.keywords.join(' ')} ${doc.category} ${doc.summary} ${doc.evidence}`;
        const tokens = tokenize(combined);
        this.docTokens.push(tokens);
        this.docLengths.push(tokens.length);
        totalLength += tokens.length;

        const uniqueInDoc = new Set(tokens);
        uniqueInDoc.forEach(token => {
          this.docFreqs[token] = (this.docFreqs[token] || 0) + 1;
        });
      });

      this.avgdl = this.N > 0 ? totalLength / this.N : 1;
    }

    computeIDF(term) {
      const n = this.docFreqs[term] || 0;
      // Robertson-Spärck Jones IDF formula
      return Math.log(1 + (this.N - n + 0.5) / (n + 0.5));
    }

    search(query, topK = 3) {
      const startTime = performance.now();
      const qTokens = tokenize(query);

      if (qTokens.length === 0) {
        return {
          results: [],
          latencyMs: (performance.now() - startTime).toFixed(1),
          queryTokens: []
        };
      }

      const scores = this.corpus.map((doc, idx) => {
        const tokens = this.docTokens[idx];
        const docLen = this.docLengths[idx];
        let score = 0;

        // Frequency map in doc
        const termFreqs = {};
        tokens.forEach(t => termFreqs[t] = (termFreqs[t] || 0) + 1);

        qTokens.forEach(qt => {
          const tf = termFreqs[qt] || 0;
          if (tf > 0) {
            const idf = this.computeIDF(qt);
            const num = tf * (this.k1 + 1);
            const denom = tf + this.k1 * (1 - this.b + this.b * (docLen / this.avgdl));
            score += idf * (num / denom);

            // Title & keyword boost
            if (doc.keywords.includes(qt)) score += 1.5;
            if (doc.title.toLowerCase().includes(qt)) score += 2.0;
          }
        });

        return { doc, score };
      });

      scores.sort((a, b) => b.score - a.score);
      const filtered = scores.filter(s => s.score > 0.3).slice(0, topK);
      const latencyMs = (performance.now() - startTime).toFixed(1);

      return {
        results: filtered,
        latencyMs,
        queryTokens: qTokens
      };
    }
  }

  const engine = new KnowledgeIndexEngine(KNOWLEDGE_BASE);

  // ============================================================================
  // 3. DRAWER DOM CREATION & STYLES INJECTION
  // ============================================================================
  function injectSakuraDrawer() {
    if (document.getElementById('sakuraDrawer')) return;

    // 1. Floating Launcher Button (Bottom Right)
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'sakuraFloatingBtn';
    floatingBtn.className = 'sakura-floating-trigger';
    floatingBtn.setAttribute('aria-label', 'Open Ask Sakura AI Recruiter Assistant');
    floatingBtn.innerHTML = `
      <span class="sakura-badge-pulse"></span>
      <span class="sakura-trigger-icon">🌸</span>
      <span class="sakura-trigger-text">Ask Sakura</span>
      <span class="sakura-trigger-tag">AI</span>
    `;
    document.body.appendChild(floatingBtn);

    // 2. Slide-Over Drawer Shell
    const drawerHtml = `
      <div class="sakura-backdrop" id="sakuraBackdrop"></div>
      <aside class="sakura-drawer" id="sakuraDrawer" role="dialog" aria-modal="true" aria-label="Ask Sakura AI Recruiter Assistant">
        
        <!-- Header -->
        <div class="sakura-header">
          <div class="sakura-brand">
            <div class="sakura-avatar">🌸</div>
            <div class="sakura-meta">
              <div class="sakura-title">
                <span>Sakura</span>
                <span class="sakura-tag">Portfolio Assistant</span>
              </div>
              <div class="sakura-sub">Ask anything about Hans's work &amp; experience</div>
            </div>
          </div>
          <button class="sakura-close-btn" id="sakuraCloseBtn" aria-label="Close Drawer (ESC)">✕ <span class="mono" style="font-size: 0.75rem; opacity: 0.6;">ESC</span></button>
        </div>

        <!-- Status Banner -->
        <div class="sakura-telemetry">
          <span class="telemetry-live-dot"></span>
          <span>Online · Ready to answer questions</span>
        </div>

        <!-- Body -->
        <div class="sakura-body">
          
          <!-- Search Input Box -->
          <div class="sakura-search-box">
            <span class="search-prompt">&gt;</span>
            <input 
              type="text" 
              id="sakuraSearchInput" 
              class="sakura-input" 
              placeholder="Ask anything (e.g., 'What cloud services has Hans used?')..."
              autocomplete="off"
              spellcheck="false"
            />
            <button class="sakura-clear-input" id="sakuraClearInput" style="display: none;" aria-label="Clear Input">✕</button>
          </div>

          <!-- Quick Suggestion Prompts -->
          <div class="sakura-prompt-chips">
            <div class="chips-label mono">// QUICK QUESTIONS:</div>
            <div class="chips-list">
              <button class="sakura-chip" data-query="Tell me about the Manas Ciel voice AI copilot">Manas: Ciel Voice AI?</button>
              <button class="sakura-chip" data-query="Does Hans know React and Next.js?">React &amp; Next.js Experience?</button>
              <button class="sakura-chip" data-query="Tell me about the LSFM 5-agent swarm">5-Agent Autonomous Swarm?</button>
              <button class="sakura-chip" data-query="How does FinTrack reduce budgeting friction?">FinTrack 3.2s Logging?</button>
              <button class="sakura-chip" data-query="What did Hans do at ROC.ph internship?">ROC.ph Internship Work?</button>
              <button class="sakura-chip" data-query="Tell me about Vellum Minimal OS">Vellum Reflection OS?</button>
              <button class="sakura-chip" data-query="Local GPU inference on AMD RX 6600 XT">Local GPU Inference?</button>
              <button class="sakura-chip" data-query="What backend, AWS and cloud systems has Hans used?">AWS &amp; Cloud Systems?</button>
              <button class="sakura-chip" data-query="Tell me about the Cognitive Memory Core project">Cognitive Memory Project?</button>
              <button class="sakura-chip" data-query="What were the results of Yunjin's audit?">Yunjin Design Audit?</button>
              <button class="sakura-chip" data-query="How does the Sentinel Telemetry system work?">Sentinel Telemetry HUD?</button>
              <button class="sakura-chip" data-query="Tell me about the git log career timeline">Git Career Timeline?</button>
            </div>
          </div>

          <!-- Output Results Feed -->
          <div class="sakura-output" id="sakuraOutput">
            <div class="sakura-welcome-state">
              <div class="sakura-greeting-title">Ask me anything about Hans.</div>
              <p>
                Hi! I'm <strong>Sakura</strong>, a helper Hans created to answer questions while you explore. You can ask about the technologies he enjoys using, his projects, or his past work experience.
              </p>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="sakura-footer">
          <div class="sakura-footer-links">
            <a href="Hans_Laureles_Resume.pdf" target="_blank" rel="noopener noreferrer" class="sakura-foot-btn">
              📄 Download Resume
            </a>
            <a href="case-lsfm.html" class="sakura-foot-btn">
              ⭐ LSFM Case Study
            </a>
            <button class="sakura-foot-btn" id="sakuraCopyEmail">
              ✉️ Copy Email
            </button>
          </div>
        </div>

      </aside>
    `;

    const container = document.createElement('div');
    container.innerHTML = drawerHtml;
    document.body.appendChild(container);

    initSakuraEvents();
  }

  // ============================================================================
  // 4. EVENT BINDINGS & INTERACTIONS
  // ============================================================================
  function initSakuraEvents() {
    const drawer = document.getElementById('sakuraDrawer');
    const backdrop = document.getElementById('sakuraBackdrop');
    const closeBtn = document.getElementById('sakuraCloseBtn');
    const floatingBtn = document.getElementById('sakuraFloatingBtn');
    const inputField = document.getElementById('sakuraSearchInput');
    const clearBtn = document.getElementById('sakuraClearInput');
    const outputContainer = document.getElementById('sakuraOutput');
    const chips = document.querySelectorAll('.sakura-chip');
    const copyEmailBtn = document.getElementById('sakuraCopyEmail');

    // Also connect any header nav buttons marked with .open-sakura-btn
    const navTriggers = document.querySelectorAll('.open-sakura-btn, #sakuraNavBtn');

    function openDrawer(initialQuery = '') {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        inputField.focus();
        if (initialQuery) {
          inputField.value = initialQuery;
          executeSearch(initialQuery);
        }
      }, 150);
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    floatingBtn.addEventListener('click', () => openDrawer());
    navTriggers.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    }));

    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Global Keyboard Shortcuts (ESC to close, Ctrl+K or / to open)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
      if ((e.key === '/' || (e.ctrlKey && e.key.toLowerCase() === 'k')) && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openDrawer();
      }
    });

    // Input handlers
    let debounceTimer;
    inputField.addEventListener('input', () => {
      const q = inputField.value.trim();
      clearBtn.style.display = q ? 'block' : 'none';

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        executeSearch(q);
      }, 60);
    });

    clearBtn.addEventListener('click', () => {
      inputField.value = '';
      clearBtn.style.display = 'none';
      inputField.focus();
      executeSearch('');
    });

    // Quick chips
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        inputField.value = query;
        clearBtn.style.display = 'block';
        executeSearch(query);
      });
    });

    // Copy Email button in footer
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('hanslaureles92@gmail.com').then(() => {
          const original = copyEmailBtn.innerHTML;
          copyEmailBtn.innerHTML = '✅ Copied to Clipboard!';
          setTimeout(() => copyEmailBtn.innerHTML = original, 2000);
        });
      });
    }

    function executeSearch(query) {
      if (!query || query.length < 2) {
        outputContainer.innerHTML = `
          <div class="sakura-welcome-state">
            <div class="sakura-greeting-title">Ask me anything about Hans.</div>
            <p>
              Hi! I'm <strong>Sakura</strong>, a helper Hans created to answer questions while you explore. You can ask about the technologies he enjoys using, his projects, or his past work experience.
            </p>
          </div>
        `;
        return;
      }

      const { results, latencyMs, queryTokens } = engine.search(query);

      if (results.length === 0) {
        outputContainer.innerHTML = `
          <div class="sakura-no-results">
            <div class="mono" style="color: var(--accent); margin-bottom: 8px;">// NO MATCH FOUND</div>
            <h3>I couldn't find an answer for "${escapeHtml(query)}"</h3>
            <p>Try asking with keywords like <code>React</code>, <code>AWS</code>, <code>ROC.ph</code>, <code>Projects</code>, or <code>Education</code>, or browse Hans's case studies directly below.</p>
            <div style="margin-top: 16px;">
              <a href="about.html" class="btn btn-outline btn-sm">Read Full Profile (About Me) →</a>
            </div>
          </div>
        `;
        return;
      }

      // Render Best Match & Secondary Matches
      const topMatch = results[0];
      const otherMatches = results.slice(1);

      let html = `
        <div class="sakura-search-meta">
          <span class="mono" style="color: #F472B6; font-weight: 600;">🌸 SAKURA BRIEFING</span>
          <span class="mono" style="color: var(--text-muted);">${results.length} relevant topic${results.length > 1 ? 's' : ''} found</span>
        </div>

        <div class="sakura-answer-card primary">
          <div class="card-header-bar">
            <span class="sakura-category-tag">${topMatch.doc.category}</span>
            <span class="sakura-score-badge">Top Match</span>
          </div>

          <h3 class="sakura-answer-title">${topMatch.doc.title}</h3>
          
          <div class="sakura-answer-lead">
            ${topMatch.doc.summary}
          </div>

          <div class="sakura-answer-evidence">
            <strong>Key Evidence & Production Context:</strong><br>
            ${topMatch.doc.evidence}
          </div>

          <div class="sakura-actions">
            ${topMatch.doc.linkUrl ? `<a href="${topMatch.doc.linkUrl}" class="sakura-action-link">${topMatch.doc.linkText}</a>` : ''}
            ${topMatch.doc.secondaryUrl ? `<a href="${topMatch.doc.secondaryUrl}" class="sakura-action-link secondary">${topMatch.doc.secondaryText}</a>` : ''}
          </div>
        </div>
      `;

      if (otherMatches.length > 0) {
        html += `
          <div class="mono chips-label" style="margin-top: 24px; margin-bottom: 12px;">// ALSO RELEVANT:</div>
          <div class="sakura-secondary-list">
        `;
        otherMatches.forEach(item => {
          html += `
            <div class="sakura-answer-card secondary-card">
              <div class="card-header-bar">
                <span class="sakura-category-tag">${item.doc.category}</span>
                <span class="mono" style="font-size: 0.75rem; color: var(--text-muted);">Related</span>
              </div>
              <h4 style="margin: 6px 0 8px; font-size: 1rem;">${item.doc.title}</h4>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0 0 10px;">${item.doc.summary}</p>
              ${item.doc.linkUrl ? `<a href="${item.doc.linkUrl}" class="sakura-action-link sm">${item.doc.linkText}</a>` : ''}
            </div>
          `;
        });
        html += `</div>`;
      }

      outputContainer.innerHTML = html;
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSakuraDrawer);
  } else {
    injectSakuraDrawer();
  }

})();
