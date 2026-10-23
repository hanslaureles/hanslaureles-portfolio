import './case.css';
import CaseLayout from '../../components/CaseLayout';
import { cases } from '../../lib/cases';

export const metadata = cases.find((item) => item.slug === 'memory')!.metadata;

export default function Page() {
  return (
    <CaseLayout slug="memory" title="Cognitive Memory Core — Case Study · Hans Aaron Laureles">
      <div className="case-hero">
        <a href="index.html" className="case-back-link">
          ← Return to Selected Work
        </a>
        <div className="u-d-flex u-gap-8px u-mb-16px u-wrap-wrap">
          <span className="badge badge-accent">Case Study 03 · Applied AI Architecture</span>
          <span className="badge">Lessons-Learned Memory</span>
          <span className="badge">BM25 Search</span>
          <span className="badge">Zero-Dependency Python</span>
        </div>
        <h1 className="case-title" data-case="memory">
          Cognitive Memory Core —<br />{' '}
          <span className="serif-italic">A Lessons-Learned Memory for AI Coding Assistants</span>
        </h1>
        <p className="case-lead">
          AI coding assistants forget your corrections when the session ends. Memory Core saves each
          mistake as a lesson, finds the matching lessons before the next task starts, and turns
          lessons that keep coming back into written rules. It is pure Python with no dependencies.
        </p>
        <dl className="case-summary" aria-label="Summary">
          <div>
            <dt>Problem</dt>
            <dd>Coding agents forget corrections between sessions and repeat the same mistakes.</dd>
          </div>
          <div>
            <dt>Constraint</dt>
            <dd>
              Recall runs before every task on a local workstation, so it uses the Python standard
              library only: no model download, no vector database.
            </dd>
          </div>
          <div>
            <dt>Decision</dt>
            <dd>
              Field-weighted BM25 with tag and severity boosts over a JSONL store of post-mortems.
            </dd>
          </div>
          <div>
            <dt>Measured result</dt>
            <dd>
              On 30 held-out queries: recall@3 0.90, MRR 0.87, 0.81 ms p50 on the 10-entry store
              (i5-12400F, Python 3.11, 2026-10-02). A naive substring baseline scores about the same
              at this size (<a href="#results">eval</a>).
            </dd>
          </div>
          <div>
            <dt>Code</dt>
            <dd>
              <a
                href="https://github.com/hanslaureles/cognitive-memory-core/tree/7f2525845c15f6778f835a037e16b1fa54961353/eval"
                target="_blank"
                rel="noopener noreferrer"
              >
                cognitive-memory-core/eval
              </a>
              , rerun with <code>python eval/run_eval.py</code>
            </dd>
          </div>
        </dl>
        <div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
          <a href="#simulator" className="btn btn-primary">
            ⚡ Launch Live Memory Simulator ↓
          </a>
          <a href="#architecture" className="btn btn-outline">
            Architecture Deep Dive ↓
          </a>
          <a
            href="https://github.com/hanslaureles/cognitive-memory-core"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline u-d-inline-flex u-items-center u-gap-6px"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>{' '}
            View Code on GitHub ↗
          </a>
        </div>
        <div className="case-meta-table">
          <div className="case-meta-item">
            <div className="label">Platform</div>
            <div className="val">Antigravity Rules · Discord Multi-Agent System · Local CLI</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Discipline</div>
            <div className="val">Search &amp; Developer Tooling</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Role</div>
            <div className="val">Developer &amp; Systems Builder (Solo)</div>
          </div>
          <div className="case-meta-item">
            <div className="label">Stack</div>
            <div className="val">Python 3.11 (Stdlib) · BM25 Scorer · JSONL</div>
          </div>
        </div>
        <div className="case-challenge-grid">
          <div className="case-challenge-card problem">
            <div className="case-challenge-tag">
              <span>●</span> The Engineering Challenge (Session Amnesia)
            </div>
            <p className="case-challenge-text">
              AI coding assistants start every session blank, so they repeat mistakes you already
              corrected. The usual fix, a vector database, adds a model download and a stack of
              dependencies.
            </p>
          </div>
          <div className="case-challenge-card solution">
            <div className="case-challenge-tag">
              <span>●</span> The Architecture Solution (BM25 Lesson Search)
            </div>
            <p className="case-challenge-text">
              Built a lessons-learned memory in the Python standard library only. Lessons live in a
              JSONL file, BM25 keyword search finds the relevant ones before each task, and repeated
              lessons are compiled into a rules file the assistant reads.
            </p>
          </div>
        </div>
        <div className="case-metrics-strip">
          <div className="case-metric-cell">
            <div className="case-metric-num accent-emerald">0 Dependencies</div>
            <div className="case-metric-label">Python Standard Library Only</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num accent-blue">BM25 Scored</div>
            <div className="case-metric-label">Keyword Search over Past Lessons</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num">10 Rules</div>
            <div className="case-metric-label">Compiled from Repeated Lessons</div>
          </div>
          <div className="case-metric-cell">
            <div className="case-metric-num">CI-Tested</div>
            <div className="case-metric-label">pytest on every push</div>
          </div>
        </div>
        <div className="case-banner u-mt-32px u-mb-24px">
          <picture>
            <source
              type="image/avif"
              srcSet="images/memory-core/memory-mockup-480.fe2cc1ea.avif 480w, images/memory-core/memory-mockup-960.2fc2c74f.avif 960w, images/memory-core/memory-mockup-1376.c97be728.avif 1376w"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1240px"
            />
            <source
              type="image/webp"
              srcSet="images/memory-core/memory-mockup-480.4ead0a78.webp 480w, images/memory-core/memory-mockup-960.18d7e109.webp 960w, images/memory-core/memory-mockup-1376.858de97b.webp 1376w"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1240px"
            />
            <img
              src="images/memory-core/memory-mockup-960.18d7e109.webp"
              alt="Memory Core lesson search interface mockup"
              width="960"
              height="536"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              data-full="images/memory-core/memory-mockup-1376.858de97b.webp"
            />
          </picture>
        </div>
        <details className="tech-detail u-m-24px-0-32px-0">
          <summary>Show the lesson recall loop</summary>
          <div className="terminal-window">
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <div className="terminal-title">MEMORY_CORE // LESSON RECALL LOOP</div>
              <div className="mono u-fs-0p75rem u-c-emerald-500">● 10 RULES</div>
            </div>
            <div className="terminal-body">
              <pre>
                <span className="terminal-comment"># How a lesson is found, used, and saved</span>
                {`
`}
                <span className="terminal-prompt">[INPUT]</span>
                {`       Developer Intent / Prompt Stream ──> pre-flight trigger detection
`}
                <span className="terminal-prompt">[PRE-FLIGHT]</span>
                {`  BM25 Relevance Scorer (experience_store.jsonl) ──> [TOP-3 MATCHES]
`}
                <span className="terminal-prompt">[INJECTION]</span>
                {`   Matching lessons added to the prompt:
               ├─ [MEM-005] PowerShell: Avoid nested double quotes in inline execution
               ├─ [MEM-006] Windows Python: UTF-8 stdout reconfiguration against CP1252
               └─ [MEM-007] Deployment: Git commits trigger build rather than direct uploads
`}
                <span className="terminal-prompt">[EXECUTION]</span>
                {`   Agent Code Generation & Tool Execution with Active Guardrails
`}
                <span className="terminal-prompt">[FEEDBACK]</span>
                {`    User Correction / Error Detected ──> reflect.py (merges a near-duplicate lesson of the same domain)
`}
                <span className="terminal-prompt">[PERSIST]</span>
                {`     Repeated lessons compiled into rules ──> .agents/rules/learned_rules.md
`}
                <span className="terminal-success">[OUTCOME]</span>
                {`     Lessons persist across sessions · 0 external pip dependencies · Recurring lessons gain weight`}
              </pre>
            </div>
          </div>
        </details>
      </div>
      <div className="case-content-layout">
        <aside className="case-sidebar">
          <div className="case-toc-title">Table of Contents</div>
          <ul className="case-toc-list">
            <li>
              <a href="#dilemma">01. Session Amnesia Dilemma</a>
            </li>
            <li>
              <a href="#decisions">02. Design Decisions</a>
            </li>
            <li>
              <a href="#retrospective">03. What Broke &amp; What I’d Change</a>
            </li>
            <li>
              <a href="#simulator">04. Live Recall Simulator</a>
            </li>
            <li>
              <a href="#architecture">05. The 4 Parts of Memory Core</a>
            </li>
            <li>
              <a href="#math">06. How BM25 Ranks Lessons</a>
            </li>
            <li>
              <a href="#heuristics">07. The 10 Lessons in the Store</a>
            </li>
            <li>
              <a href="#results">08. Impact &amp; Benchmarks</a>
            </li>
          </ul>
        </aside>
        <div className="case-main-narrative">
          <section id="dilemma" className="case-body-section">
            <div className="section-tag">// 01 · CONTEXT &amp; MOTIVATION</div>
            <h2>The Dilemma: AI Session Amnesia</h2>
            <p>
              Contemporary AI coding assistants are fundamentally stateless between sessions. Every
              new conversation, branch switch, or tool invocation begins with a clean slate. This
              creates a frustrating, repetitive developer experience:
            </p>
            <ul className="u-m-16px-0-24px-20px u-lh-1p8">
              <li>
                <strong>Regression Loops</strong>: An agent repeats known anti-patterns (e.g. nested
                PowerShell quotes, robotic copy on lifestyle brands, or Netlify subdirectory 404
                order).
              </li>
              <li>
                <strong>Tacit Knowledge Loss</strong>: Non-obvious nuances uncovered through painful
                debugging are lost the moment the chat window closes.
              </li>
              <li>
                <strong>Context Window Bloat</strong>: Shoving entire multi-thousand-line project
                histories into prompt headers wastes token bandwidth and degrades attention quality.
              </li>
            </ul>
            <p>
              The goal is simple: <strong>a correction made once is remembered next time</strong>,
              without pasting the whole project history into every prompt.
            </p>
          </section>
          <section id="decisions" className="case-body-section">
            <div className="section-tag">// 02 · DESIGN DECISIONS</div>
            <h2>Design Decisions &amp; Their Costs</h2>
            <p>
              Each card is one decision: what I chose, what I passed over, why, and what it costs.
              The evidence links point at the public code or result file at a pinned commit.
            </p>
            <div className="case-adr-list">
              <article className="case-adr-card" aria-labelledby="adr-mem-01">
                <div className="case-adr-id">ADR-MEM-01</div>
                <h3 id="adr-mem-01">Keyword BM25 in the standard library, not a vector database</h3>
                <dl className="case-adr-fields">
                  <dt>Decision</dt>
                  <dd>
                    Field-weighted BM25 over the JSONL lesson store, with tag and severity boosts,
                    in the Python standard library only.
                  </dd>
                  <dt>Alternatives</dt>
                  <dd>Dense embeddings with ChromaDB, FAISS or sqlite-vss.</dd>
                  <dt>Why</dt>
                  <dd>
                    No model download, no embedding step on every write, and exact identifiers such
                    as <code>TerminatorExpectedAtEndOfString</code> match as single tokens. 0.81 ms
                    p50 on the real 10-entry store (500 calls, 2026-10-02).
                  </dd>
                  <dt>Cost</dt>
                  <dd>
                    It misses paraphrases that share no words with the rule (3 of 30 held-out
                    queries) and is not clearly better than a substring baseline at this size.
                    Latency grows linearly: 67 ms p50 at 1,000 entries and 695 ms at 10,000
                    (synthetic stores).
                  </dd>
                  <dt>Evidence</dt>
                  <dd>
                    <a
                      href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/eval/results/2026-10-02.md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <code>eval/results/2026-10-02.md</code>
                    </a>{' '}
                    ·{' '}
                    <a
                      href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/recall.py"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <code>recall.py</code>
                    </a>
                  </dd>
                </dl>
              </article>
              <article className="case-adr-card" aria-labelledby="adr-mem-02">
                <div className="case-adr-id">ADR-MEM-02</div>
                <h3 id="adr-mem-02">An OS file lock around every write, then an atomic replace</h3>
                <dl className="case-adr-fields">
                  <dt>Decision</dt>
                  <dd>
                    <code>reflect.py</code> holds an OS lock (<code>msvcrt</code> on Windows,{' '}
                    <code>fcntl</code> elsewhere) on <code>store.jsonl.lock</code> for the whole
                    read-modify-write, writes a uniquely named temp file, and swaps it in with{' '}
                    <code>os.replace</code>.
                  </dd>
                  <dt>Alternatives</dt>
                  <dd>
                    Append to the JSONL file without a lock, or an age-based lockfile that other
                    writers can take over.
                  </dd>
                  <dt>Why</dt>
                  <dd>
                    Without the lock, two writers both read N lessons and both write N+1, so one
                    lesson is lost. The OS releases the lock if its holder dies, so there is never a
                    stale lock to reclaim.
                  </dd>
                  <dt>Cost</dt>
                  <dd>
                    Other writers poll every 20 ms and give up with <code>TimeoutError</code> after
                    10 s. On Windows the swap fails while a reader has the store open, so it is
                    retried for up to 1 s. The <code>.lock</code> file must stay on disk.
                  </dd>
                  <dt>Evidence</dt>
                  <dd>
                    <a
                      href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/reflect.py"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <code>reflect.py</code>
                    </a>{' '}
                    ·{' '}
                    <a
                      href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/test_reflect_safety.py"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <code>test_reflect_safety.py</code>
                    </a>
                  </dd>
                </dl>
              </article>
            </div>
          </section>
          <section id="retrospective" className="case-body-section">
            <div className="section-tag">// 03 · RETROSPECTIVE</div>
            <h2>What Broke &amp; What I Would Change</h2>
            <div className="u-d-grid u-cols-1fr-1fr u-gap-16px u-mb-24px">
              <div className="u-bg-red-a05 u-bd-1px-solid-red-a20 u-p-18px u-rounded-8px">
                <h3 className="u-c-tone-red u-mb-8px u-fs-0p95rem">⚠️ What Broke in V1</h3>
                <p className="u-fs-0p88rem u-lh-1p5 u-c-text-secondary u-m-0">
                  <em>Unmeasured retrospective, recalled rather than logged:</em> naive substring
                  matching seemed to fire on generic coding words like <code>error</code>,{' '}
                  <code>file</code>, and <code>test</code>, injecting unrelated rules into the
                  prompt context. The held-out eval (Evals &amp; Metrics, below) measures recall,
                  not false positives, so it neither confirms nor rules this out.
                </p>
              </div>
              <div className="u-bg-emerald-a05 u-bd-1px-solid-emerald-a20 u-p-18px u-rounded-8px">
                <h3 className="u-c-tone-emerald u-mb-8px u-fs-0p95rem">✓ The Engineering Fix</h3>
                <p className="u-fs-0p88rem u-lh-1p5 u-c-text-secondary u-m-0">
                  Implemented tokenization with an English coding stopword filter, added 3.0×
                  weighting to exact domain tags, and introduced severity multipliers (1.4× for
                  critical bugs) to isolate true matches.
                </p>
              </div>
            </div>
          </section>
          <section id="simulator" className="case-body-section">
            <div className="section-tag">// 04 · REAL-TIME RECALL DEMO</div>
            <h2>Interactive Demo: Find Lessons Before a Task</h2>
            <p>
              Search the real lesson store below. Type a task or a bug, and BM25 ranks the 10
              lessons by how well their symptoms, causes and rules match your words:
            </p>
            <div className="memory-console-widget" id="memory-demo">
              <div className="memory-console-header">
                <div>
                  <span className="badge badge-accent u-fs-0p75rem">LIVE LESSON SEARCH</span>{' '}
                  <span className="mono u-ml-8px u-fs-0p85rem u-c-text-muted">
                    experience_store.jsonl · 10 lessons
                  </span>
                </div>
                <div className="mono u-fs-0p78rem u-c-accent">
                  CLIENT-SIDE BM25 · RUNS IN YOUR BROWSER
                </div>
              </div>
              <div className="memory-query-bar">
                <input
                  type="text"
                  id="demo-query-input"
                  className="memory-query-input"
                  placeholder="Type a task or bug keyword (e.g. 'navigation flexbox', 'coffee copy', 'netlify 404')..."
                  defaultValue="navigation flexbox alignment wide screen"
                />
                <button id="demo-run-btn" className="btn btn-primary btn-sm">
                  Find Lessons ⚡
                </button>
              </div>
              <div className="memory-chips-row">
                <span className="mono u-fs-0p75rem u-self-center u-c-text-muted">SUGGESTIONS:</span>
                <button className="memory-chip" data-query="coffee store avoid robotic words">
                  ☕ Coffee Copy
                </button>
                <button
                  className="memory-chip"
                  data-query="navigation bracket wrapped next line wide screen"
                >
                  📐 Flexbox Brackets
                </button>
                <button
                  className="memory-chip"
                  data-query="netlify deploy 404 subfolder route redirect"
                >
                  🌐 Netlify 404
                </button>
                <button
                  className="memory-chip"
                  data-query="philippines checkout payment gcash maya"
                >
                  🇵🇭 PH Payments
                </button>
                <button className="memory-chip" data-query="powershell quotes terminator error">
                  💻 PowerShell Quotes
                </button>
                <button
                  className="memory-chip"
                  data-query="python charmap cp1252 unicode encode error"
                >
                  🐍 Windows CP1252
                </button>
                <button className="memory-chip" data-query="netlify git commits deploy pipeline">
                  🚀 Git Deploy
                </button>
                <button className="memory-chip" data-query="cover letter parsing contact header">
                  📄 Doc Parsing
                </button>
                <button
                  className="memory-chip"
                  data-query="exponential backoff rate limit retry groq"
                >
                  🔄 API Backoff
                </button>
                <button
                  className="memory-chip"
                  data-query="resume quantifiable metrics percentage numbers"
                >
                  📊 Quantifiable Metrics
                </button>
              </div>
              <div id="demo-output" className="memory-result-box"></div>
            </div>
          </section>
          <section id="architecture" className="case-body-section">
            <div className="section-tag">// 05 · ENGINE SPECIFICATION</div>
            <h2>The 4 Parts of Memory Core</h2>
            <p>No vector database and no pip packages. It needs only standard Python 3:</p>
            <div className="u-d-grid u-cols-autofit-280 u-gap-16px u-m-24px-0">
              <div className="agent-card">
                <div className="agent-card-top">
                  <div className="agent-avatar-badge">📂</div>
                  <span className="agent-domain">PILLAR 01 · DATA LEDGER</span>
                </div>
                <div className="agent-role-title">Lesson Store</div>
                <div className="agent-desc">
                  An append-only JSONL file. Each lesson records what triggered the mistake, the
                  symptom, the root cause, the rule to follow, tags, severity, and how often it has
                  happened.
                </div>
                <span className="agent-stack-tag">experience_store.jsonl</span>
              </div>
              <div className="agent-card">
                <div className="agent-card-top">
                  <div className="agent-avatar-badge">⚡</div>
                  <span className="agent-domain">PILLAR 02 · RETRIEVAL</span>
                </div>
                <div className="agent-role-title">Lesson Search</div>
                <div className="agent-desc">
                  BM25 keyword search across past lessons, with extra weight for matching tags and
                  for lessons that keep recurring. Returns the top matches fast enough to run before
                  every task (measured latency and its conditions are under Results).
                </div>
                <span className="agent-stack-tag">recall.py · BM25 Algo</span>
              </div>
              <div className="agent-card">
                <div className="agent-card-top">
                  <div className="agent-avatar-badge">🔄</div>
                  <span className="agent-domain">PILLAR 03 · REFLECTION</span>
                </div>
                <div className="agent-role-title">Lesson Logger</div>
                <div className="agent-desc">
                  A CLI and Python API to record a new lesson. A near-duplicate in the same domain
                  is merged into its closest match by word overlap (Jaccard), so a repeated mistake
                  strengthens the existing lesson instead of adding a copy.{' '}
                  <code>--supersedes MEM-xxx</code> retires an outdated rule: recall, dedupe and
                  crystallize skip it from then on.
                </div>
                <span className="agent-stack-tag">reflect.py · Auto-Dedupe</span>
              </div>
              <div className="agent-card">
                <div className="agent-card-top">
                  <div className="agent-avatar-badge">💎</div>
                  <span className="agent-domain">PILLAR 04 · COMPILER</span>
                </div>
                <div className="agent-role-title">Rule Compiler</div>
                <div className="agent-desc">
                  Groups lessons by topic and compiles them into a rules file (
                  <code>learned_rules.md</code>) that the coding assistant reads at the start of
                  every session.
                </div>
                <span className="agent-stack-tag">crystallize.py → learned_rules.md</span>
              </div>
            </div>
          </section>
          <section id="math" className="case-body-section">
            <div className="section-tag">// 06 · ALGORITHMIC MECHANICS</div>
            <h2>How BM25 Ranks Lessons</h2>
            <p>
              Vector embeddings alone frequently struggle with precise syntactic rules (e.g.
              distinguishing <code>`"`</code> from <code>`'`</code> in PowerShell or exact CSS
              properties like <code>white-space: nowrap</code>). I designed a domain-weighted BM25
              scoring algorithm:
            </p>
            <div className="u-bg-surface u-bd-l-3px-solid-accent u-p-18px-24px u-rounded-4px u-m-20px-0 u-ff-font-mono u-fs-0p88rem">
              <strong>Score(D, Q)</strong> = ∑ IDF(qᵢ) · [ (TF_weighted · (k₁ + 1)) / (TF_weighted +
              k₁ · (1 - b + b · (|D| / avgDL))) ] · SeverityMult · FreqMult
            </div>
            <p>Key architectural nuances:</p>
            <ul className="u-m-16px-0-24px-20px u-lh-1p8">
              <li>
                <strong>Multi-Field Weighting</strong>: Tags are weighted at 3.0×, triggers at 2.5×,
                and symptoms at 2.0× relative to generic code diffs.
              </li>
              <li>
                <strong>Frequency Compounding</strong>: Lessons encountered multiple times receive
                an automatic multiplier (<code>1.0 + min(0.5, (freq - 1) * 0.1)</code>), ensuring
                battle-tested rules rank highest.
              </li>
              <li>
                <strong>Zero Dependencies</strong>: No PyTorch, no HuggingFace, no ChromaDB. Pure
                Python standard library ensures instant execution across any terminal or CI/CD
                container.
              </li>
            </ul>
          </section>
          <section id="heuristics" className="case-body-section">
            <div className="section-tag">// 07 · ACTIVE PRODUCTION KNOWLEDGE</div>
            <h2>The 10 Lessons in the Store</h2>
            <p>The store holds 10 lessons, each from a real mistake in my own projects:</p>
            <div className="case-table-wrap">
              <table className="case-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Domain</th>
                    <th>Observed Symptom</th>
                    <th>Rule</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mono">MEM-001</td>
                    <td>Copywriting</td>
                    <td>Robotic terms (SPECIMEN, PROTOCOL) in food e-commerce</td>
                    <td>
                      Strictly forbid sci-fi jargon for culinary/hospitality; use grounded tactile
                      terms (Fresh Roast, Curated, Warm Batch, Shopping Bag).
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-002</td>
                    <td>CSS Layout</td>
                    <td>Closing bracket ']' wrapped onto separate line on desktop</td>
                    <td>
                      Never insert loose spaced bracket text inside inline-flex navigation elements;
                      enforce <code>white-space: nowrap;</code>.
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-003</td>
                    <td>Edge Routing</td>
                    <td>Netlify subdirectory /aura-store loads 404 page</td>
                    <td>
                      Explicit subfolder rewrite rules MUST precede the global catch-all rule (
                      <code>/* /404.html 404</code>) in both <code>_redirects</code> and{' '}
                      <code>netlify.toml</code>.
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-004</td>
                    <td>Localization</td>
                    <td>US card-only checkout fails Philippine conversion</td>
                    <td>
                      Philippine e-commerce must feature GCash, Maya, QR Ph, and Cash on Delivery
                      (COD) alongside domestic +63 phone formatting.
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-005</td>
                    <td>CLI / Shell</td>
                    <td>
                      PowerShell <code>TerminatorExpectedAtEndOfString</code> crash
                    </td>
                    <td>
                      Never nest unescaped double quotes inside double-quoted PowerShell commands;
                      use single quotes or direct script invocations.
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-006</td>
                    <td>Windows Python</td>
                    <td>
                      <code>UnicodeEncodeError</code> on terminal stdout
                    </td>
                    <td>
                      Reconfigure stdout with <code>sys.stdout.reconfigure(encoding='utf-8')</code>{' '}
                      or use ASCII status tokens to avoid cp1252 charmap crashes.
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-007</td>
                    <td>Deployment</td>
                    <td>Manual Netlify direct uploads causing untracked git drift</td>
                    <td>
                      Always deploy web apps by committing and pushing to GitHub; Netlify listens to
                      the repository and deploys pinned commit states.
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-008</td>
                    <td>Doc Parsing</td>
                    <td>Cover letter body prematurely truncated on portfolio URL lines</td>
                    <td>
                      Never terminate cover letter parsing on contact lines containing portfolio
                      links; only terminate on major structural markdown headers.
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-009</td>
                    <td>API Resiliency</td>
                    <td>HTTP 429 Too Many Requests rate limits crashing async Discord loops</td>
                    <td>
                      Always implement exponential backoff retry (sleep 2–4s) and a multi-model
                      rotation pool on both Groq and Gemini.
                    </td>
                  </tr>
                  <tr>
                    <td className="mono">MEM-010</td>
                    <td>Resume Writing</td>
                    <td>Subjective responsibility bullets failing ATS semantic parsers</td>
                    <td>
                      Every résumé experience bullet MUST lead with active verbs and quantify impact
                      with verified metrics, latencies, or percentages.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section id="results" className="case-body-section">
            <div className="section-tag">// 08 · EVALS &amp; METRICS</div>
            <h2>Retrieval Evals &amp; Benchmarks</h2>
            <div className="benchmark-grid">
              <div className="benchmark-card">
                <div className="benchmark-val">pytest</div>
                <div className="benchmark-label">Automated Tests</div>
                <div className="benchmark-sub">
                  Recall, dedup, write safety &amp; redaction, run by GitHub Actions on every push
                </div>
              </div>
              <div className="benchmark-card">
                <div className="benchmark-val">0</div>
                <div className="benchmark-label">External Packages</div>
                <div className="benchmark-sub">Zero pip packages / pure stdlib</div>
              </div>
              <div className="benchmark-card">
                <div className="benchmark-val">0.90</div>
                <div className="benchmark-label">Recall@3, Held-Out Queries</div>
                <div className="benchmark-sub">30 paraphrased queries · MRR 0.87</div>
              </div>
            </div>
            <h3 className="u-m-28px-0-12px-0">
              Retrieval Eval: BM25 vs a Naive Substring Baseline
            </h3>
            <p>
              Each of the 30 queries is a paraphrase labelled with the one rule it should retrieve,
              and a test fails if any query copies a 4-word run from the store. I wrote 15; the
              other 15 are with an independent reviewer to replace or approve, so I'm not only
              grading my own test. The baseline ranks rules by how many query words appear in them
              as substrings.
            </p>
            <div className="eval-table-wrap">
              <table className="eval-table">
                <thead>
                  <tr>
                    <th scope="col">Retriever</th>
                    <th scope="col" className="num">
                      recall@1
                    </th>
                    <th scope="col" className="num">
                      recall@3
                    </th>
                    <th scope="col" className="num">
                      MRR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      BM25 (<code>recall.py</code>)
                    </td>
                    <td className="num">0.83</td>
                    <td className="num">0.90</td>
                    <td className="num">0.87</td>
                  </tr>
                  <tr>
                    <td>Naive substring baseline</td>
                    <td className="num">0.80</td>
                    <td className="num">0.93</td>
                    <td className="num">0.87</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="eval-table-wrap">
              <table className="eval-table">
                <thead>
                  <tr>
                    <th scope="col">Store size</th>
                    <th scope="col" className="num">
                      Calls
                    </th>
                    <th scope="col" className="num">
                      p50
                    </th>
                    <th scope="col" className="num">
                      p95
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10 entries (real store)</td>
                    <td className="num">500</td>
                    <td className="num">0.81 ms</td>
                    <td className="num">0.87 ms</td>
                  </tr>
                  <tr>
                    <td>1,000 entries (synthetic)</td>
                    <td className="num">100</td>
                    <td className="num">67 ms</td>
                    <td className="num">70 ms</td>
                  </tr>
                  <tr>
                    <td>10,000 entries (synthetic)</td>
                    <td className="num">20</td>
                    <td className="num">695 ms</td>
                    <td className="num">744 ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="eval-note">
              Measured 2026-10-02 with <code>eval/run_eval.py</code> on an Intel Core i5-12400F,
              Windows 11, Python 3.11.9, commit <code>a9a7e96</code> of{' '}
              <a
                href="https://github.com/hanslaureles/cognitive-memory-core"
                target="_blank"
                rel="noopener"
              >
                cognitive-memory-core
              </a>
              . Each call includes reading and parsing the JSONL store. Synthetic stores are the
              real entries plus seeded filler drawn from the store's vocabulary. Full output:{' '}
              <a
                href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/eval/results/2026-10-02.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <code>eval/results/2026-10-02.md</code>
              </a>
              .
            </p>
            <p>
              What this shows: on today's 10-entry store, BM25 is not clearly better than a
              substring search. It ties on MRR, and with 10 entries a top-3 list covers 30% of the
              store, so recall@3 says little. Its three misses are paraphrases with no shared words,
              such as "add numbers to the achievements in my CV" for the résumé-metrics rule, which
              no keyword method can catch. Latency grows linearly with the store, because every call
              re-reads and re-scores it. CI now fails if BM25 recall@3 or MRR falls below these
              numbers minus a tolerance.
            </p>
          </section>
        </div>
      </div>
      <div className="case-pagination-wrap u-mt-64px u-mb-32px">
        <div className="case-pagination u-d-grid u-cols-1fr-1fr u-gap-24px">
          <a href="case-ciel.html" className="pag-card">
            <span className="pag-label">← Previous Case Study</span>{' '}
            <span className="pag-title">02 · Manas: Ciel (Voice AI Copilot &amp; HUD)</span>
          </a>
          <a href="case-aura.html" className="pag-card u-ta-right">
            <span className="pag-label">Next Case Study →</span>{' '}
            <span className="pag-title">04 · Aura Coffee &amp; Kitchen (Specialty Commerce)</span>
          </a>
        </div>
      </div>
    </CaseLayout>
  );
}
