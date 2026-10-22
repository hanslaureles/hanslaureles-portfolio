import './case.css';
import CaseLayout from '../../components/CaseLayout';
import MetricCard from '../../components/MetricCard';
import { cases } from '../../lib/cases';

export const metadata = cases.find(item => item.slug === 'memory')!.metadata;

export default function Page() {
  return <CaseLayout slug="memory" title="Cognitive Memory Core — Case Study · Hans Aaron Laureles">{"\n    \n    "}
{"\n    "}
<div className="case-hero">
{"\n      "}
<a href="index.html" className="case-back-link">
{"\n        ← Return to Selected Work\n      "}
</a>
{"\n      \n      "}
<div className="u-d-flex u-gap-8px u-mb-16px u-wrap-wrap">
{"\n        "}
<span className="badge badge-accent">
{"Case Study 03 · Applied AI Architecture"}
</span>
{"\n        "}
<span className="badge">
{"Lessons-Learned Memory"}
</span>
{"\n        "}
<span className="badge">
{"BM25 Search"}
</span>
{"\n        "}
<span className="badge">
{"Zero-Dependency Python"}
</span>
{"\n      "}
</div>
{"\n\n      "}
<h1 className="case-title" data-case="memory">
{"\n        Cognitive Memory Core —"}
<br />
{"\n        "}
<span className="serif-italic">
{"A Lessons-Learned Memory for AI Coding Assistants"}
</span>
{"\n      "}
</h1>
{"\n\n      "}
<p className="case-lead">
{"\n        AI coding assistants forget your corrections when the session ends. Memory Core saves each mistake as a lesson, finds the matching lessons before the next task starts, and turns lessons that keep coming back into written rules. It is pure Python with no dependencies.\n      "}
</p>
{"\n\n      "}
<dl className="case-summary" aria-label="Summary">
{"\n        "}
<div>
<dt>
{"Problem"}
</dt>
<dd>
{"Coding agents forget corrections between sessions and repeat the same mistakes."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Constraint"}
</dt>
<dd>
{"Recall runs before every task on a local workstation, so it uses the Python standard library only: no model download, no vector database."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Decision"}
</dt>
<dd>
{"Field-weighted BM25 with tag and severity boosts over a JSONL store of post-mortems."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Measured result"}
</dt>
<dd>
{"On 30 held-out queries: recall@3 0.90, MRR 0.87, 0.81 ms p50 on the 10-entry store (i5-12400F, Python 3.11, 2026-10-02). A naive substring baseline scores about the same at this size ("}
<a href="#results">
{"eval"}
</a>
{")."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Code"}
</dt>
<dd>
<a href="https://github.com/hanslaureles/cognitive-memory-core/tree/7f2525845c15f6778f835a037e16b1fa54961353/eval" target="_blank" rel="noopener noreferrer">
{"cognitive-memory-core/eval"}
</a>
{", rerun with "}
<code>
{"python eval/run_eval.py"}
</code>
</dd>
</div>
{"\n      "}
</dl>
{"\n\n      "}
<div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
{"\n        "}
<a href="#simulator" className="btn btn-primary">
{"\n          ⚡ Launch Live Memory Simulator ↓\n        "}
</a>
{"\n        "}
<a href="#architecture" className="btn btn-outline">
{"\n          Architecture Deep Dive ↓\n        "}
</a>
{"\n        "}
<a href="https://github.com/hanslaureles/cognitive-memory-core" target="_blank" rel="noopener noreferrer" className="btn btn-outline u-d-inline-flex u-items-center u-gap-6px">
{"\n          "}
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
</path>
</svg>
{"\n          View Code on GitHub ↗\n        "}
</a>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-meta-table">
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Platform"}
</div>
{"\n          "}
<div className="val">
{"Antigravity Rules · Discord Multi-Agent System · Local CLI"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Discipline"}
</div>
{"\n          "}
<div className="val">
{"Search & Developer Tooling"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Role"}
</div>
{"\n          "}
<div className="val">
{"Developer & Systems Builder (Solo)"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-meta-item">
{"\n          "}
<div className="label">
{"Stack"}
</div>
{"\n          "}
<div className="val">
{"Python 3.11 (Stdlib) · BM25 Scorer · JSONL"}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-challenge-grid">
{"\n        "}
<div className="case-challenge-card problem">
{"\n          "}
<div className="case-challenge-tag">
{"\n            "}
<span>
{"●"}
</span>
{" The Engineering Challenge (Session Amnesia)\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            AI coding assistants start every session blank, so they repeat mistakes you already corrected. The usual fix, a vector database, adds a model download and a stack of dependencies.\n          "}
</p>
{"\n        "}
</div>
{"\n        "}
<div className="case-challenge-card solution">
{"\n          "}
<div className="case-challenge-tag">
{"\n            "}
<span>
{"●"}
</span>
{" The Architecture Solution (BM25 Lesson Search)\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            Built a lessons-learned memory in the Python standard library only. Lessons live in a JSONL file, BM25 keyword search finds the relevant ones before each task, and repeated lessons are compiled into a rules file the assistant reads.\n          "}
</p>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
<div className="case-metrics-strip">
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-emerald">
{"0 Dependencies"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Python Standard Library Only"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-blue">
{"BM25 Scored"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Keyword Search over Past Lessons"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"10 Rules"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Compiled from Repeated Lessons"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"CI-Tested"}
</div>
{"\n          "}
<div className="case-metric-label">
{"pytest on every push"}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="case-banner u-mt-32px u-mb-24px">
{"\n        "}
<picture>
{"\n          "}
<source type="image/avif" srcSet="images/memory-core/memory-mockup-480.fe2cc1ea.avif 480w, images/memory-core/memory-mockup-960.2fc2c74f.avif 960w, images/memory-core/memory-mockup-1376.c97be728.avif 1376w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<source type="image/webp" srcSet="images/memory-core/memory-mockup-480.4ead0a78.webp 480w, images/memory-core/memory-mockup-960.18d7e109.webp 960w, images/memory-core/memory-mockup-1376.858de97b.webp 1376w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<img src="images/memory-core/memory-mockup-960.18d7e109.webp" alt="Memory Core lesson search interface mockup" width="960" height="536" loading="eager" fetchPriority="high" decoding="async" data-full="images/memory-core/memory-mockup-1376.858de97b.webp" />
{"\n        "}
</picture>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<details className="tech-detail u-m-24px-0-32px-0">
{"\n      "}
<summary>
{"Show the lesson recall loop"}
</summary>
{"\n      "}
<div className="terminal-window">
{"\n        "}
<div className="terminal-topbar">
{"\n          "}
<div className="terminal-dots">
{"\n            "}
<span className="terminal-dot red">
</span>
{"\n            "}
<span className="terminal-dot yellow">
</span>
{"\n            "}
<span className="terminal-dot green">
</span>
{"\n          "}
</div>
{"\n          "}
<div className="terminal-title">
{"MEMORY_CORE // LESSON RECALL LOOP"}
</div>
{"\n          "}
<div className="mono u-fs-0p75rem u-c-emerald-500">
{"● 10 RULES"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="terminal-body">
{"\n"}
<pre>
<span className="terminal-comment">
{"# How a lesson is found, used, and saved"}
</span>
{"\n"}
<span className="terminal-prompt">
{"[INPUT]"}
</span>
{"       Developer Intent / Prompt Stream ──> pre-flight trigger detection\n"}
<span className="terminal-prompt">
{"[PRE-FLIGHT]"}
</span>
{"  BM25 Relevance Scorer (experience_store.jsonl) ──> [TOP-3 MATCHES]\n"}
<span className="terminal-prompt">
{"[INJECTION]"}
</span>
{"   Matching lessons added to the prompt:\n               ├─ [MEM-005] PowerShell: Avoid nested double quotes in inline execution\n               ├─ [MEM-006] Windows Python: UTF-8 stdout reconfiguration against CP1252\n               └─ [MEM-007] Deployment: Git commits trigger build rather than direct uploads\n"}
<span className="terminal-prompt">
{"[EXECUTION]"}
</span>
{"   Agent Code Generation & Tool Execution with Active Guardrails\n"}
<span className="terminal-prompt">
{"[FEEDBACK]"}
</span>
{"    User Correction / Error Detected ──> reflect.py (merges a near-duplicate lesson of the same domain)\n"}
<span className="terminal-prompt">
{"[PERSIST]"}
</span>
{"     Repeated lessons compiled into rules ──> .agents/rules/learned_rules.md\n"}
<span className="terminal-success">
{"[OUTCOME]"}
</span>
{"     Lessons persist across sessions · 0 external pip dependencies · Recurring lessons gain weight"}
</pre>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n      "}
</details>
{"\n\n    "}
</div>
{"\n\n    "}
{"\n    "}
<div className="case-content-layout">
{"\n      \n      "}
{"\n      "}
<aside className="case-sidebar">
{"\n        "}
<div className="case-toc-title">
{"Table of Contents"}
</div>
{"\n        "}
<ul className="case-toc-list">
{"\n          "}
<li>
<a href="#dilemma">
{"01. Session Amnesia Dilemma"}
</a>
</li>
{"\n          "}
<li>
<a href="#decisions">
{"02. Design Decisions"}
</a>
</li>
{"\n          "}
<li>
<a href="#retrospective">
{"03. What Broke & What I’d Change"}
</a>
</li>
{"\n          "}
<li>
<a href="#simulator">
{"04. Live Recall Simulator"}
</a>
</li>
{"\n          "}
<li>
<a href="#architecture">
{"05. The 4 Parts of Memory Core"}
</a>
</li>
{"\n          "}
<li>
<a href="#math">
{"06. How BM25 Ranks Lessons"}
</a>
</li>
{"\n          "}
<li>
<a href="#heuristics">
{"07. The 10 Lessons in the Store"}
</a>
</li>
{"\n          "}
<li>
<a href="#results">
{"08. Impact & Benchmarks"}
</a>
</li>
{"\n        "}
</ul>
{"\n      "}
</aside>
{"\n\n      "}
{"\n      "}
<div className="case-main-narrative">
{"\n\n        "}
{"\n        "}
<section id="dilemma" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 01 · CONTEXT & MOTIVATION"}
</div>
{"\n          "}
<h2>
{"The Dilemma: AI Session Amnesia"}
</h2>
{"\n          "}
<p>
{"\n            Contemporary AI coding assistants are fundamentally stateless between sessions. Every new conversation, branch switch, or tool invocation begins with a clean slate. This creates a frustrating, repetitive developer experience:\n          "}
</p>
{"\n          "}
<ul className="u-m-16px-0-24px-20px u-lh-1p8">
{"\n            "}
<li>
<strong>
{"Regression Loops"}
</strong>
{": An agent repeats known anti-patterns (e.g. nested PowerShell quotes, robotic copy on lifestyle brands, or Netlify subdirectory 404 order)."}
</li>
{"\n            "}
<li>
<strong>
{"Tacit Knowledge Loss"}
</strong>
{": Non-obvious nuances uncovered through painful debugging are lost the moment the chat window closes."}
</li>
{"\n            "}
<li>
<strong>
{"Context Window Bloat"}
</strong>
{": Shoving entire multi-thousand-line project histories into prompt headers wastes token bandwidth and degrades attention quality."}
</li>
{"\n          "}
</ul>
{"\n          "}
<p>
{"\n            The goal is simple: "}
<strong>
{"a correction made once is remembered next time"}
</strong>
{", without pasting the whole project history into every prompt.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="decisions" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 02 · DESIGN DECISIONS"}
</div>
{"\n          "}
<h2>
{"Design Decisions & Their Costs"}
</h2>
{"\n          "}
<p>
{"\n            Each card is one decision: what I chose, what I passed over, why, and what it costs. The evidence links point at the public code or result file at a pinned commit.\n          "}
</p>
{"\n          "}
<div className="case-adr-list">
{"\n            "}
<article className="case-adr-card" aria-labelledby="adr-mem-01">
{"\n              "}
<div className="case-adr-id">
{"ADR-MEM-01"}
</div>
{"\n              "}
<h3 id="adr-mem-01">
{"Keyword BM25 in the standard library, not a vector database"}
</h3>
{"\n              "}
<dl className="case-adr-fields">
{"\n                "}
<dt>
{"Decision"}
</dt>
{"\n                "}
<dd>
{"Field-weighted BM25 over the JSONL lesson store, with tag and severity boosts, in the Python standard library only."}
</dd>
{"\n                "}
<dt>
{"Alternatives"}
</dt>
{"\n                "}
<dd>
{"Dense embeddings with ChromaDB, FAISS or sqlite-vss."}
</dd>
{"\n                "}
<dt>
{"Why"}
</dt>
{"\n                "}
<dd>
{"No model download, no embedding step on every write, and exact identifiers such as "}
<code>
{"TerminatorExpectedAtEndOfString"}
</code>
{" match as single tokens. 0.81 ms p50 on the real 10-entry store (500 calls, 2026-10-02)."}
</dd>
{"\n                "}
<dt>
{"Cost"}
</dt>
{"\n                "}
<dd>
{"It misses paraphrases that share no words with the rule (3 of 30 held-out queries) and is not clearly better than a substring baseline at this size. Latency grows linearly: 67 ms p50 at 1,000 entries and 695 ms at 10,000 (synthetic stores)."}
</dd>
{"\n                "}
<dt>
{"Evidence"}
</dt>
{"\n                "}
<dd>
<a href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/eval/results/2026-10-02.md" target="_blank" rel="noopener noreferrer">
<code>
{"eval/results/2026-10-02.md"}
</code>
</a>
{" · "}
<a href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/recall.py" target="_blank" rel="noopener noreferrer">
<code>
{"recall.py"}
</code>
</a>
</dd>
{"\n              "}
</dl>
{"\n            "}
</article>
{"\n            "}
<article className="case-adr-card" aria-labelledby="adr-mem-02">
{"\n              "}
<div className="case-adr-id">
{"ADR-MEM-02"}
</div>
{"\n              "}
<h3 id="adr-mem-02">
{"An OS file lock around every write, then an atomic replace"}
</h3>
{"\n              "}
<dl className="case-adr-fields">
{"\n                "}
<dt>
{"Decision"}
</dt>
{"\n                "}
<dd>
<code>
{"reflect.py"}
</code>
{" holds an OS lock ("}
<code>
{"msvcrt"}
</code>
{" on Windows, "}
<code>
{"fcntl"}
</code>
{" elsewhere) on "}
<code>
{"store.jsonl.lock"}
</code>
{" for the whole read-modify-write, writes a uniquely named temp file, and swaps it in with "}
<code>
{"os.replace"}
</code>
{"."}
</dd>
{"\n                "}
<dt>
{"Alternatives"}
</dt>
{"\n                "}
<dd>
{"Append to the JSONL file without a lock, or an age-based lockfile that other writers can take over."}
</dd>
{"\n                "}
<dt>
{"Why"}
</dt>
{"\n                "}
<dd>
{"Without the lock, two writers both read N lessons and both write N+1, so one lesson is lost. The OS releases the lock if its holder dies, so there is never a stale lock to reclaim."}
</dd>
{"\n                "}
<dt>
{"Cost"}
</dt>
{"\n                "}
<dd>
{"Other writers poll every 20 ms and give up with "}
<code>
{"TimeoutError"}
</code>
{" after 10 s. On Windows the swap fails while a reader has the store open, so it is retried for up to 1 s. The "}
<code>
{".lock"}
</code>
{" file must stay on disk."}
</dd>
{"\n                "}
<dt>
{"Evidence"}
</dt>
{"\n                "}
<dd>
<a href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/reflect.py" target="_blank" rel="noopener noreferrer">
<code>
{"reflect.py"}
</code>
</a>
{" · "}
<a href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/test_reflect_safety.py" target="_blank" rel="noopener noreferrer">
<code>
{"test_reflect_safety.py"}
</code>
</a>
</dd>
{"\n              "}
</dl>
{"\n            "}
</article>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="retrospective" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 03 · RETROSPECTIVE"}
</div>
{"\n          "}
<h2>
{"What Broke & What I Would Change"}
</h2>
{"\n          "}
<div className="u-d-grid u-cols-1fr-1fr u-gap-16px u-mb-24px">
{"\n            "}
<div className="u-bg-red-a05 u-bd-1px-solid-red-a20 u-p-18px u-rounded-8px">
{"\n              "}
<h3 className="u-c-tone-red u-mb-8px u-fs-0p95rem">
{"⚠️ What Broke in V1"}
</h3>
{"\n              "}
<p className="u-fs-0p88rem u-lh-1p5 u-c-text-secondary u-m-0">
{"\n                "}
<em>
{"Unmeasured retrospective, recalled rather than logged:"}
</em>
{" naive substring matching seemed to fire on generic coding words like "}
<code>
{"error"}
</code>
{", "}
<code>
{"file"}
</code>
{", and "}
<code>
{"test"}
</code>
{", injecting unrelated rules into the prompt context. The held-out eval (Evals & Metrics, below) measures recall, not false positives, so it neither confirms nor rules this out.\n              "}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="u-bg-emerald-a05 u-bd-1px-solid-emerald-a20 u-p-18px u-rounded-8px">
{"\n              "}
<h3 className="u-c-tone-emerald u-mb-8px u-fs-0p95rem">
{"✓ The Engineering Fix"}
</h3>
{"\n              "}
<p className="u-fs-0p88rem u-lh-1p5 u-c-text-secondary u-m-0">
{"\n                Implemented tokenization with an English coding stopword filter, added 3.0× weighting to exact domain tags, and introduced severity multipliers (1.4× for critical bugs) to isolate true matches.\n              "}
</p>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="simulator" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 04 · REAL-TIME RECALL DEMO"}
</div>
{"\n          "}
<h2>
{"Interactive Demo: Find Lessons Before a Task"}
</h2>
{"\n          "}
<p>
{"\n            Search the real lesson store below. Type a task or a bug, and BM25 ranks the 10 lessons by how well their symptoms, causes and rules match your words:\n          "}
</p>
{"\n\n          "}
{"\n          "}
<div className="memory-console-widget" id="memory-demo">
{"\n            "}
<div className="memory-console-header">
{"\n              "}
<div>
{"\n                "}
<span className="badge badge-accent u-fs-0p75rem">
{"LIVE LESSON SEARCH"}
</span>
{"\n                "}
<span className="mono u-ml-8px u-fs-0p85rem u-c-text-muted">
{"experience_store.jsonl · 10 lessons"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="mono u-fs-0p78rem u-c-accent">
{"CLIENT-SIDE BM25 · RUNS IN YOUR BROWSER"}
</div>
{"\n            "}
</div>
{"\n\n            "}
<div className="memory-query-bar">
{"\n              "}
<input type="text" id="demo-query-input" className="memory-query-input" placeholder="Type a task or bug keyword (e.g. 'navigation flexbox', 'coffee copy', 'netlify 404')..." defaultValue="navigation flexbox alignment wide screen" />
{"\n              "}
<button id="demo-run-btn" className="btn btn-primary btn-sm">
{"Find Lessons ⚡"}
</button>
{"\n            "}
</div>
{"\n\n            "}
<div className="memory-chips-row">
{"\n              "}
<span className="mono u-fs-0p75rem u-self-center u-c-text-muted">
{"SUGGESTIONS:"}
</span>
{"\n              "}
<button className="memory-chip" data-query="coffee store avoid robotic words">
{"☕ Coffee Copy"}
</button>
{"\n              "}
<button className="memory-chip" data-query="navigation bracket wrapped next line wide screen">
{"📐 Flexbox Brackets"}
</button>
{"\n              "}
<button className="memory-chip" data-query="netlify deploy 404 subfolder route redirect">
{"🌐 Netlify 404"}
</button>
{"\n              "}
<button className="memory-chip" data-query="philippines checkout payment gcash maya">
{"🇵🇭 PH Payments"}
</button>
{"\n              "}
<button className="memory-chip" data-query="powershell quotes terminator error">
{"💻 PowerShell Quotes"}
</button>
{"\n              "}
<button className="memory-chip" data-query="python charmap cp1252 unicode encode error">
{"🐍 Windows CP1252"}
</button>
{"\n              "}
<button className="memory-chip" data-query="netlify git commits deploy pipeline">
{"🚀 Git Deploy"}
</button>
{"\n              "}
<button className="memory-chip" data-query="cover letter parsing contact header">
{"📄 Doc Parsing"}
</button>
{"\n              "}
<button className="memory-chip" data-query="exponential backoff rate limit retry groq">
{"🔄 API Backoff"}
</button>
{"\n              "}
<button className="memory-chip" data-query="resume quantifiable metrics percentage numbers">
{"📊 Quantifiable Metrics"}
</button>
{"\n            "}
</div>
{"\n\n            "}
<div id="demo-output" className="memory-result-box">
{"\n              "}
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="architecture" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 05 · ENGINE SPECIFICATION"}
</div>
{"\n          "}
<h2>
{"The 4 Parts of Memory Core"}
</h2>
{"\n          "}
<p>
{"\n            No vector database and no pip packages. It needs only standard Python 3:\n          "}
</p>
{"\n\n          "}
<div className="u-d-grid u-cols-autofit-280 u-gap-16px u-m-24px-0">
{"\n            "}
<div className="agent-card">
{"\n              "}
<div className="agent-card-top">
{"\n                "}
<div className="agent-avatar-badge">
{"📂"}
</div>
{"\n                "}
<span className="agent-domain">
{"PILLAR 01 · DATA LEDGER"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="agent-role-title">
{"Lesson Store"}
</div>
{"\n              "}
<div className="agent-desc">
{"\n                An append-only JSONL file. Each lesson records what triggered the mistake, the symptom, the root cause, the rule to follow, tags, severity, and how often it has happened.\n              "}
</div>
{"\n              "}
<span className="agent-stack-tag">
{"experience_store.jsonl"}
</span>
{"\n            "}
</div>
{"\n\n            "}
<div className="agent-card">
{"\n              "}
<div className="agent-card-top">
{"\n                "}
<div className="agent-avatar-badge">
{"⚡"}
</div>
{"\n                "}
<span className="agent-domain">
{"PILLAR 02 · RETRIEVAL"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="agent-role-title">
{"Lesson Search"}
</div>
{"\n              "}
<div className="agent-desc">
{"\n                BM25 keyword search across past lessons, with extra weight for matching tags and for lessons that keep recurring. Returns the top matches fast enough to run before every task (measured latency and its conditions are under Results).\n              "}
</div>
{"\n              "}
<span className="agent-stack-tag">
{"recall.py · BM25 Algo"}
</span>
{"\n            "}
</div>
{"\n\n            "}
<div className="agent-card">
{"\n              "}
<div className="agent-card-top">
{"\n                "}
<div className="agent-avatar-badge">
{"🔄"}
</div>
{"\n                "}
<span className="agent-domain">
{"PILLAR 03 · REFLECTION"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="agent-role-title">
{"Lesson Logger"}
</div>
{"\n              "}
<div className="agent-desc">
{"\n                A CLI and Python API to record a new lesson. A near-duplicate in the same domain is merged into its closest match by word overlap (Jaccard), so a repeated mistake strengthens the existing lesson instead of adding a copy. "}
<code>
{"--supersedes MEM-xxx"}
</code>
{" retires an outdated rule: recall, dedupe and crystallize skip it from then on.\n              "}
</div>
{"\n              "}
<span className="agent-stack-tag">
{"reflect.py · Auto-Dedupe"}
</span>
{"\n            "}
</div>
{"\n\n            "}
<div className="agent-card">
{"\n              "}
<div className="agent-card-top">
{"\n                "}
<div className="agent-avatar-badge">
{"💎"}
</div>
{"\n                "}
<span className="agent-domain">
{"PILLAR 04 · COMPILER"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="agent-role-title">
{"Rule Compiler"}
</div>
{"\n              "}
<div className="agent-desc">
{"\n                Groups lessons by topic and compiles them into a rules file ("}
<code>
{"learned_rules.md"}
</code>
{") that the coding assistant reads at the start of every session.\n              "}
</div>
{"\n              "}
<span className="agent-stack-tag">
{"crystallize.py → learned_rules.md"}
</span>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="math" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 06 · ALGORITHMIC MECHANICS"}
</div>
{"\n          "}
<h2>
{"How BM25 Ranks Lessons"}
</h2>
{"\n          "}
<p>
{"\n            Vector embeddings alone frequently struggle with precise syntactic rules (e.g. distinguishing "}
<code>
{"`\"`"}
</code>
{" from "}
<code>
{"`'`"}
</code>
{" in PowerShell or exact CSS properties like "}
<code>
{"white-space: nowrap"}
</code>
{"). I designed a domain-weighted BM25 scoring algorithm:\n          "}
</p>
{"\n\n          "}
<div className="u-bg-surface u-bd-l-3px-solid-accent u-p-18px-24px u-rounded-4px u-m-20px-0 u-ff-font-mono u-fs-0p88rem">
{"\n            "}
<strong>
{"Score(D, Q)"}
</strong>
{" = ∑ IDF(qᵢ) · [ (TF_weighted · (k₁ + 1)) / (TF_weighted + k₁ · (1 - b + b · (|D| / avgDL))) ] · SeverityMult · FreqMult\n          "}
</div>
{"\n\n          "}
<p>
{"\n            Key architectural nuances:\n          "}
</p>
{"\n          "}
<ul className="u-m-16px-0-24px-20px u-lh-1p8">
{"\n            "}
<li>
<strong>
{"Multi-Field Weighting"}
</strong>
{": Tags are weighted at 3.0×, triggers at 2.5×, and symptoms at 2.0× relative to generic code diffs."}
</li>
{"\n            "}
<li>
<strong>
{"Frequency Compounding"}
</strong>
{": Lessons encountered multiple times receive an automatic multiplier ("}
<code>
{"1.0 + min(0.5, (freq - 1) * 0.1)"}
</code>
{"), ensuring battle-tested rules rank highest."}
</li>
{"\n            "}
<li>
<strong>
{"Zero Dependencies"}
</strong>
{": No PyTorch, no HuggingFace, no ChromaDB. Pure Python standard library ensures instant execution across any terminal or CI/CD container."}
</li>
{"\n          "}
</ul>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="heuristics" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 07 · ACTIVE PRODUCTION KNOWLEDGE"}
</div>
{"\n          "}
<h2>
{"The 10 Lessons in the Store"}
</h2>
{"\n          "}
<p>
{"\n            The store holds 10 lessons, each from a real mistake in my own projects:\n          "}
</p>
{"\n\n          "}
<div className="case-table-wrap">
{"\n            "}
<table className="case-table">
{"\n              "}
<thead>
{"\n                "}
<tr>
{"\n                  "}
<th>
{"ID"}
</th>
{"\n                  "}
<th>
{"Domain"}
</th>
{"\n                  "}
<th>
{"Observed Symptom"}
</th>
{"\n                  "}
<th>
{"Rule"}
</th>
{"\n                "}
</tr>
{"\n              "}
</thead>
{"\n              "}
<tbody>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-001"}
</td>
{"\n                  "}
<td>
{"Copywriting"}
</td>
{"\n                  "}
<td>
{"Robotic terms (SPECIMEN, PROTOCOL) in food e-commerce"}
</td>
{"\n                  "}
<td>
{"Strictly forbid sci-fi jargon for culinary/hospitality; use grounded tactile terms (Fresh Roast, Curated, Warm Batch, Shopping Bag)."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-002"}
</td>
{"\n                  "}
<td>
{"CSS Layout"}
</td>
{"\n                  "}
<td>
{"Closing bracket ']' wrapped onto separate line on desktop"}
</td>
{"\n                  "}
<td>
{"Never insert loose spaced bracket text inside inline-flex navigation elements; enforce "}
<code>
{"white-space: nowrap;"}
</code>
{"."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-003"}
</td>
{"\n                  "}
<td>
{"Edge Routing"}
</td>
{"\n                  "}
<td>
{"Netlify subdirectory /aura-store loads 404 page"}
</td>
{"\n                  "}
<td>
{"Explicit subfolder rewrite rules MUST precede the global catch-all rule ("}
<code>
{"/* /404.html 404"}
</code>
{") in both "}
<code>
{"_redirects"}
</code>
{" and "}
<code>
{"netlify.toml"}
</code>
{"."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-004"}
</td>
{"\n                  "}
<td>
{"Localization"}
</td>
{"\n                  "}
<td>
{"US card-only checkout fails Philippine conversion"}
</td>
{"\n                  "}
<td>
{"Philippine e-commerce must feature GCash, Maya, QR Ph, and Cash on Delivery (COD) alongside domestic +63 phone formatting."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-005"}
</td>
{"\n                  "}
<td>
{"CLI / Shell"}
</td>
{"\n                  "}
<td>
{"PowerShell "}
<code>
{"TerminatorExpectedAtEndOfString"}
</code>
{" crash"}
</td>
{"\n                  "}
<td>
{"Never nest unescaped double quotes inside double-quoted PowerShell commands; use single quotes or direct script invocations."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-006"}
</td>
{"\n                  "}
<td>
{"Windows Python"}
</td>
{"\n                  "}
<td>
<code>
{"UnicodeEncodeError"}
</code>
{" on terminal stdout"}
</td>
{"\n                  "}
<td>
{"Reconfigure stdout with "}
<code>
{"sys.stdout.reconfigure(encoding='utf-8')"}
</code>
{" or use ASCII status tokens to avoid cp1252 charmap crashes."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-007"}
</td>
{"\n                  "}
<td>
{"Deployment"}
</td>
{"\n                  "}
<td>
{"Manual Netlify direct uploads causing untracked git drift"}
</td>
{"\n                  "}
<td>
{"Always deploy web apps by committing and pushing to GitHub; Netlify listens to the repository and deploys pinned commit states."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-008"}
</td>
{"\n                  "}
<td>
{"Doc Parsing"}
</td>
{"\n                  "}
<td>
{"Cover letter body prematurely truncated on portfolio URL lines"}
</td>
{"\n                  "}
<td>
{"Never terminate cover letter parsing on contact lines containing portfolio links; only terminate on major structural markdown headers."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-009"}
</td>
{"\n                  "}
<td>
{"API Resiliency"}
</td>
{"\n                  "}
<td>
{"HTTP 429 Too Many Requests rate limits crashing async Discord loops"}
</td>
{"\n                  "}
<td>
{"Always implement exponential backoff retry (sleep 2–4s) and a multi-model rotation pool on both Groq and Gemini."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="mono">
{"MEM-010"}
</td>
{"\n                  "}
<td>
{"Resume Writing"}
</td>
{"\n                  "}
<td>
{"Subjective responsibility bullets failing ATS semantic parsers"}
</td>
{"\n                  "}
<td>
{"Every résumé experience bullet MUST lead with active verbs and quantify impact with verified metrics, latencies, or percentages."}
</td>
{"\n                "}
</tr>
{"\n              "}
</tbody>
{"\n            "}
</table>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="results" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 08 · EVALS & METRICS"}
</div>
{"\n          "}
<h2>
{"Retrieval Evals & Benchmarks"}
</h2>
{"\n          "}
<div className="benchmark-grid">
{"\n            "}
<div className="benchmark-card">
{"\n              "}
<div className="benchmark-val">
{"pytest"}
</div>
{"\n              "}
<div className="benchmark-label">
{"Automated Tests"}
</div>
{"\n              "}
<div className="benchmark-sub">
{"Recall, dedup, write safety & redaction, run by GitHub Actions on every push"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="benchmark-card">
{"\n              "}
<div className="benchmark-val">
{"0"}
</div>
{"\n              "}
<div className="benchmark-label">
{"External Packages"}
</div>
{"\n              "}
<div className="benchmark-sub">
{"Zero pip packages / pure stdlib"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="benchmark-card">
{"\n              "}
<div className="benchmark-val">
{"0.90"}
</div>
{"\n              "}
<div className="benchmark-label">
{"Recall@3, Held-Out Queries"}
</div>
{"\n              "}
<div className="benchmark-sub">
{"30 paraphrased queries · MRR 0.87"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
<h3 className="u-m-28px-0-12px-0">
{"Retrieval Eval: BM25 vs a Naive Substring Baseline"}
</h3>
{"\n          "}
<p>
{"\n            Each of the 30 queries is a paraphrase labelled with the one rule it should retrieve, and a test fails if\n            any query copies a 4-word run from the store. I wrote 15; the other 15 are with an independent reviewer to\n            replace or approve, so I'm not only grading my own test. The baseline ranks rules by how many query words\n            appear in them as substrings.\n          "}
</p>
{"\n          "}
<div className="eval-table-wrap">
{"\n            "}
<table className="eval-table">
{"\n              "}
<thead>
{"\n                "}
<tr>
<th scope="col">
{"Retriever"}
</th>
<th scope="col" className="num">
{"recall@1"}
</th>
<th scope="col" className="num">
{"recall@3"}
</th>
<th scope="col" className="num">
{"MRR"}
</th>
</tr>
{"\n              "}
</thead>
{"\n              "}
<tbody>
{"\n                "}
<tr>
<td>
{"BM25 ("}
<code>
{"recall.py"}
</code>
{")"}
</td>
<td className="num">
{"0.83"}
</td>
<td className="num">
{"0.90"}
</td>
<td className="num">
{"0.87"}
</td>
</tr>
{"\n                "}
<tr>
<td>
{"Naive substring baseline"}
</td>
<td className="num">
{"0.80"}
</td>
<td className="num">
{"0.93"}
</td>
<td className="num">
{"0.87"}
</td>
</tr>
{"\n              "}
</tbody>
{"\n            "}
</table>
{"\n          "}
</div>
{"\n          "}
<div className="eval-table-wrap">
{"\n            "}
<table className="eval-table">
{"\n              "}
<thead>
{"\n                "}
<tr>
<th scope="col">
{"Store size"}
</th>
<th scope="col" className="num">
{"Calls"}
</th>
<th scope="col" className="num">
{"p50"}
</th>
<th scope="col" className="num">
{"p95"}
</th>
</tr>
{"\n              "}
</thead>
{"\n              "}
<tbody>
{"\n                "}
<tr>
<td>
{"10 entries (real store)"}
</td>
<td className="num">
{"500"}
</td>
<td className="num">
{"0.81 ms"}
</td>
<td className="num">
{"0.87 ms"}
</td>
</tr>
{"\n                "}
<tr>
<td>
{"1,000 entries (synthetic)"}
</td>
<td className="num">
{"100"}
</td>
<td className="num">
{"67 ms"}
</td>
<td className="num">
{"70 ms"}
</td>
</tr>
{"\n                "}
<tr>
<td>
{"10,000 entries (synthetic)"}
</td>
<td className="num">
{"20"}
</td>
<td className="num">
{"695 ms"}
</td>
<td className="num">
{"744 ms"}
</td>
</tr>
{"\n              "}
</tbody>
{"\n            "}
</table>
{"\n          "}
</div>
{"\n          "}
<p className="eval-note">
{"Measured 2026-10-02 with "}
<code>
{"eval/run_eval.py"}
</code>
{" on an Intel Core i5-12400F,\n            Windows 11, Python 3.11.9, commit "}
<code>
{"a9a7e96"}
</code>
{" of\n            "}
<a href="https://github.com/hanslaureles/cognitive-memory-core" target="_blank" rel="noopener">
{"cognitive-memory-core"}
</a>
{".\n            Each call includes reading and parsing the JSONL store. Synthetic stores are the real entries plus seeded\n            filler drawn from the store's vocabulary. Full output: "}
<a href="https://github.com/hanslaureles/cognitive-memory-core/blob/7f2525845c15f6778f835a037e16b1fa54961353/eval/results/2026-10-02.md" target="_blank" rel="noopener noreferrer">
<code>
{"eval/results/2026-10-02.md"}
</code>
</a>
{"."}
</p>
{"\n          "}
<p>
{"\n            What this shows: on today's 10-entry store, BM25 is not clearly better than a substring search. It ties on\n            MRR, and with 10 entries a top-3 list covers 30% of the store, so recall@3 says little. Its three misses are\n            paraphrases with no shared words, such as \"add numbers to the achievements in my CV\" for the résumé-metrics\n            rule, which no keyword method can catch. Latency grows linearly with the store, because every call re-reads\n            and re-scores it. CI now fails if BM25 recall@3 or MRR falls below these numbers minus a tolerance.\n          "}
</p>
{"\n\n\n\n        "}
</section>
{"\n\n      "}
</div>
{"\n\n    "}
</div>
{"\n\n    "}
{"\n    "}
<div className="case-pagination-wrap u-mt-64px u-mb-32px">
{"\n      "}
<div className="case-pagination u-d-grid u-cols-1fr-1fr u-gap-24px">
{"\n        "}
<a href="case-ciel.html" className="pag-card">
{"\n          "}
<span className="pag-label">
{"← Previous Case Study"}
</span>
{"\n          "}
<span className="pag-title">
{"02 · Manas: Ciel (Voice AI Copilot & HUD)"}
</span>
{"\n        "}
</a>
{"\n        "}
<a href="case-aura.html" className="pag-card u-ta-right">
{"\n          "}
<span className="pag-label">
{"Next Case Study →"}
</span>
{"\n          "}
<span className="pag-title">
{"04 · Aura Coffee & Kitchen (Specialty Commerce)"}
</span>
{"\n        "}
</a>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n\n  "}</CaseLayout>;
}
