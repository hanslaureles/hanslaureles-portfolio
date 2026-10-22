import type { CSSProperties } from 'react';
import CaseLayout from '../../components/CaseLayout';
import MetricCard from '../../components/MetricCard';
import { cases } from '../../lib/cases';

export const metadata = cases.find(item => item.slug === 'lsfm')!.metadata;

export default function Page() {
  return <CaseLayout slug="lsfm" title="LSFM AI HQ — Case Study · Hans Aaron Laureles">{"\n\n    "}
{"\n    "}
<div className="case-hero">
{"\n      "}
<a href="index.html" className="case-back-link">
{"\n        ← Return to Selected Work\n      "}
</a>
{"\n\n      "}
<div className="u-d-flex u-gap-8px u-mb-16px u-wrap-wrap">
{"\n        "}
<span className="badge badge-accent">
{"Case Study 01 · Multi-Agent System"}
</span>
{"\n        "}
<span className="badge">
{"Applied AI Systems"}
</span>
{"\n        "}
<span className="badge">
{"Multi-Agent Orchestration"}
</span>
{"\n      "}
</div>
{"\n\n      "}
<h1 className="case-title" data-case="lsfm">
{"\n        LSFM AI HQ — Five AI Agents"}
<br />
{"\n        "}
<span className="serif-italic">
{"for My Inbox, Job Search & Code"}
</span>
{"\n      "}
</h1>
{"\n\n      "}
<p className="case-lead">
{"\n        Five Discord agents, each with one job. Each agent calls its own Groq or Gemini model and falls back to\n        the other provider, or uses a local Ollama model on an AMD RX 6600 XT. They sort Gmail into labels and build one-page\n        ATS resumes with headless Edge or Chrome. Job applications wait in an approval channel, and mail is never deleted.\n      "}
</p>
{"\n\n      "}
<dl className="case-summary" aria-label="Summary">
{"\n        "}
<div>
<dt>
{"Problem"}
</dt>
<dd>
{"Busywork across separate tools: digging through promotional email for the messages that matter, reformatting resumes for each applicant tracking system, switching tabs."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Constraint"}
</dt>
<dd>
{"One person, one PC: five agents in one asyncio event loop, cloud models by default, and no step that deletes mail or sends an application without approval."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Decision"}
</dt>
<dd>
{"One job per agent, each with its own model and a fallback to the other provider. Gmail rules run before the LLM, and heavy jobs (PDF builds, triage) get their own two-thread pool ("}
<a href="#decisions">
{"decisions"}
</a>
{")."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Measured result"}
</dt>
<dd>
{"LLM round trip 736 ms p50 and 6,177 ms p95 (N=50, 2026-10-02); per agent from 312 ms (Sakura) to 4,861 ms (Yunjin) ("}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-02-telemetry.md" target="_blank" rel="noopener noreferrer">
{"telemetry"}
</a>
{"). Email-triage accuracy is not measured yet."}
<MetricCard id="llm-roundtrip-2026-10-02" />
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Code"}
</dt>
<dd>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/tree/f665b88ad339dc25dc17a97a65f14de5f3a760e4" target="_blank" rel="noopener noreferrer">
{"lsfm-ai-hq"}
</a>
{" (public export of the private build)"}
</dd>
</div>
{"\n      "}
</dl>
{"\n\n      "}
<div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
{"\n        "}
<a href="#topology" className="btn btn-primary">
{"\n          Explore Agent Architecture ↓\n        "}
</a>
{"\n        "}
<a href="#inference" className="btn btn-outline">
{"\n          Inference & Hardware Stack ↓\n        "}
</a>
{"\n        "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq" target="_blank" rel="noopener noreferrer" className="btn btn-outline u-d-inline-flex u-items-center u-gap-6px">
{"\n          "}
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
{"\n            "}
<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
{"\n            "}
</path>
{"\n          "}
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
{"Discord Gateway · Groq + Gemini APIs · Local Workstation"}
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
{"AI Systems & Agent Architecture"}
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
{"Python 3.11 · Groq + Gemini REST · Ollama (optional) · Headless Edge/Chrome · SQLite"}
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
{" The Engineering Challenge\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            Hosted multi-agent setups bill for every model call, so cost grows with each agent and task; they also create brittle\n            single-point-of-failure network dependencies, and hide agent decision states inside terminal black boxes\n            where users cannot intervene.\n          "}
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
{" The Architecture Solution\n          "}
</div>
{"\n          "}
<p className="case-challenge-text">
{"\n            Engineered an asynchronous 5-agent system on Discord Gateway with operator-selectable routing: per-agent\n            cloud models on Groq and Gemini, each with the other provider as a cross-provider fallback, and a\n            local Ollama mode ("}
<code>
{"qwen2.5-coder:7b"}
</code>
{" on an RX 6600 XT) for private work, switchable live with\n            "}
<code>
{"!mode"}
</code>
{".\n          "}
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
{"Self-Hosted"}
</div>
{"\n          "}
<div className="case-metric-label">
{"On a personal workstation"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-blue">
{"3 Modes"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Local · Cloud · Auto Routing"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"5 Agents"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Discord Bots, One Event Loop"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num">
{"Single-Page"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Vector ATS PDF Output"}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<div className="hardware-rig-card">
{"\n        "}
<div className="hardware-rig-header">
{"\n          "}
<div className="hardware-rig-title">
{"\n            "}
<span>
{"🖥️"}
</span>
{" Physical Workstation Specs (Local Execution Rig)\n          "}
</div>
{"\n          "}
<span className="hardware-rig-badge">
{"● Hosts the 5 Agents"}
</span>
{"\n        "}
</div>
{"\n        "}
<div className="hardware-rig-grid">
{"\n          "}
<div className="hardware-spec-item">
{"\n            "}
<span className="hardware-spec-label">
{"Processor"}
</span>
{"\n            "}
<span className="hardware-spec-val">
{"Intel Core i5-12400F"}
</span>
{"\n            "}
<span className="hardware-spec-sub">
{"6 Cores · 12 Threads · 4.4 GHz boost"}
</span>
{"\n          "}
</div>
{"\n          "}
<div className="hardware-spec-item">
{"\n            "}
<span className="hardware-spec-label">
{"Graphics & VRAM"}
</span>
{"\n            "}
<span className="hardware-spec-val">
{"AMD Radeon RX 6600 XT"}
</span>
{"\n            "}
<span className="hardware-spec-sub">
{"8GB GDDR6 · Optional local inference"}
</span>
{"\n          "}
</div>
{"\n          "}
<div className="hardware-spec-item">
{"\n            "}
<span className="hardware-spec-label">
{"System Memory"}
</span>
{"\n            "}
<span className="hardware-spec-val">
{"16GB DDR4 3200MHz"}
</span>
{"\n            "}
<span className="hardware-spec-sub">
{"Dual-Channel (2 × 8GB)"}
</span>
{"\n          "}
</div>
{"\n          "}
<div className="hardware-spec-item">
{"\n            "}
<span className="hardware-spec-label">
{"Hosting"}
</span>
{"\n            "}
<span className="hardware-spec-val u-c-tone-emerald">
{"Own Workstation"}
</span>
{"\n            "}
<span className="hardware-spec-sub">
{"No paid servers; cloud calls go to Groq & Gemini APIs"}
</span>
{"\n          "}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="hardware-rig-footnote">
{"\n          "}
<span>
{"⚡"}
</span>
{"\n          "}
<span>
<strong>
{"Resource-Conscious Architecture:"}
</strong>
{" In cloud mode, inference runs on Groq and Gemini, so\n            the five agents leave the GPU idle for gaming or rendering. Local mode moves inference onto the RX 6600 XT\n            when keeping prompts on the machine matters more than speed."}
</span>
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
<source type="image/avif" srcSet="images/lsfm-hq/lsfm-hq-mockup-480.c86b4aba.avif 480w, images/lsfm-hq/lsfm-hq-mockup-960.9ba78915.avif 960w, images/lsfm-hq/lsfm-hq-mockup-1600.02722453.avif 1600w, images/lsfm-hq/lsfm-hq-mockup-2400.1dc6a8f5.avif 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<source type="image/webp" srcSet="images/lsfm-hq/lsfm-hq-mockup-480.8e5bec8b.webp 480w, images/lsfm-hq/lsfm-hq-mockup-960.08acbeb1.webp 960w, images/lsfm-hq/lsfm-hq-mockup-1600.a9a3b45c.webp 1600w, images/lsfm-hq/lsfm-hq-mockup-2400.9e520f6c.webp 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<img src="images/lsfm-hq/lsfm-hq-mockup-960.08acbeb1.webp" alt="LSFM AI HQ Discord Operations Interface Mockup" width="960" height="720" loading="eager" fetchPriority="high" decoding="async" data-full="images/lsfm-hq/lsfm-hq-mockup-2400.9e520f6c.webp" />
{"\n        "}
</picture>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<details className="tech-detail u-m-24px-0-32px-0">
{"\n      "}
<summary>
{"Show the architecture overview"}
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
{"LSFM_AI_HQ // ARCHITECTURE RUNTIME TELEMETRY"}
</div>
{"\n          "}
<div className="mono u-fs-0p75rem u-c-emerald-500">
{"● ARCHITECTURE OVERVIEW"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="terminal-body">
{"\n          "}
<pre>
<span className="terminal-comment">
{"# LSFM Multi-Agent Operations System Overview"}
</span>
{"\n"}
<span className="terminal-prompt">
{"[GATEWAY]"}
</span>
{"     Discord WebSocket Stream ──> Async Event Dispatcher (discord.py, one asyncio loop)\n"}
<span className="terminal-prompt">
{"[ROUTER]"}
</span>
{"      query_llm() · mode = local | cloud | auto  (!mode):\n               ├─ Cloud: Groq ──> on error: Gemini   (Yunjin: Gemini ──> on error: Groq)\n               └─ Local: Ollama (qwen2.5-coder:7b) on AMD RX 6600 XT · tried first in auto mode\n"}
<span className="terminal-prompt">
{"[PIPELINE]"}
</span>
{"    The 5-agent team, one job each:\n               ├─ 1. 🌸 Sakura   :: Chief of Staff, Briefings & Gmail Triage (!briefing, !inbox, !apply)\n               ├─ 2. 🦢 Kazuha   :: Code & Knowledge (codebase Q&A, !ask / !search, !git / !review)\n               ├─ 3. 🎨 Yunjin   :: Document Architect & Portfolio Critic (!audit, !critique)\n               ├─ 4. 🐯 Chaewon  :: Career Strategist & ATS Vector PDF Tailor (!tailor, !pdf, !scout)\n               └─ 5. 🥔 Eunchae  :: System Guardian & Vitals Watchdog (!vitals, !health)\n"}
<span className="terminal-prompt">
{"[TOOLS]"}
</span>
{"       Headless Edge (`--print-to-pdf`) + Gmail REST API (OAuth2) + Gemini embeddings over SQLite\n"}
<span className="terminal-success">
{"[STATUS]"}
</span>
{"      Agents hosted on my PC · Credentials stay on the workstation · Cloud mode sends prompts to Groq / Gemini"}
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
{"\n\n      "}
{"\n      "}
<aside className="case-sidebar">
{"\n        "}
<div className="case-toc-title">
{"Architecture Sections"}
</div>
{"\n        "}
<ul className="case-toc-list">
{"\n          "}
<li>
<a href="#problem">
{"01. Problem & The Autonomous Vision"}
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
<a href="#topology">
{"04. Multi-Agent System Architecture"}
</a>
</li>
{"\n          "}
<li>
<a href="#inference">
{"05. Hybrid Local/Cloud Inference"}
</a>
</li>
{"\n          "}
<li>
<a href="#tools">
{"06. Programmatic Tool Pipelines"}
</a>
</li>
{"\n          "}
<li>
<a href="#benchmarks">
{"07. Guarantees & Failure Modes"}
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
<section id="problem" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 01 · CONTEXT & MOTIVATION"}
</div>
{"\n          "}
<h2>
{"Too Many Tabs, Too Much Busywork"}
</h2>
{"\n          "}
<p>
{"\n            A lot of my day went to busywork spread across separate tools: digging through promotional email to find\n            the university or banking messages that mattered, reformatting resumes for each applicant tracking system\n            (ATS), and switching between browser tabs.\n          "}
</p>
{"\n          "}
<p>
{"\n            While commercial AI assistants exist, they suffer from two fundamental design flaws:\n          "}
</p>
{"\n          "}
<div className="experience-timeline u-m-24px-0">
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"1. High Recurring Subscription Overhead"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"Cloud-only multi-agent platforms incur unpredictable API token bills and\n                subscription fatigue that scale rapidly without guarantee of uptime or privacy."}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="experience-card">
{"\n              "}
<h3 className="u-mb-8px">
{"2. Monolithic Chatbot Bottleneck"}
</h3>
{"\n              "}
<p className="u-fs-0p95rem">
{"A single chat window forced to handle calendar, email, resume formatting,\n                and job tracking collapses under context pollution and loses specialization."}
</p>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n          "}
<div className="pull-quote">
{"\n            “How might we architect a self-hosted operations headquarters where specialized AI agents\n            coordinate autonomously over familiar interfaces, backed by local GPU acceleration?”\n          "}
</div>
{"\n          "}
<p>
{"\n            "}
<strong>
{"LSFM AI HQ"}
</strong>
{" was engineered from first principles to solve this: a distributed, multi-agent\n            platform running on personal hardware, orchestrating dedicated domain specialists through a unified Discord\n            interface with real-world tool execution.\n          "}
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
<article className="case-adr-card" aria-labelledby="adr-lsfm-01">
{"\n              "}
<div className="case-adr-id">
{"ADR-LSFM-01"}
</div>
{"\n              "}
<h3 id="adr-lsfm-01">
{"Rules first, the LLM only for unknown mail"}
</h3>
{"\n              "}
<dl className="case-adr-fields">
{"\n                "}
<dt>
{"Decision"}
</dt>
{"\n                "}
<dd>
{"Sakura's Gmail classifier checks sender, domain and keyword rules first. Only mail no rule recognises goes to the LLM (temperature 0.1). The prompt asks for JSON only; the classifier pulls a JSON object out of the reply when there is one, and falls back to a rule-based label when there isn't."}
</dd>
{"\n                "}
<dt>
{"Alternatives"}
</dt>
{"\n                "}
<dd>
{"Send every email to the LLM."}
</dd>
{"\n                "}
<dt>
{"Why"}
</dt>
{"\n                "}
<dd>
{"Common senders (job platforms, banks, shops, newsletters) get the same label every time with no model call; the LLM only handles the long tail."}
</dd>
{"\n                "}
<dt>
{"Cost"}
</dt>
{"\n                "}
<dd>
{"The rule lists are maintained by hand, and neither tier's accuracy is measured yet: there is no labelled email set."}
</dd>
{"\n                "}
<dt>
{"Evidence"}
</dt>
{"\n                "}
<dd>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/gmail_engine.py" target="_blank" rel="noopener noreferrer">
<code>
{"gmail_engine.py"}
</code>
</a>
</dd>
{"\n              "}
</dl>
{"\n            "}
</article>
{"\n            "}
<article className="case-adr-card" aria-labelledby="adr-lsfm-02">
{"\n              "}
<div className="case-adr-id">
{"ADR-LSFM-02"}
</div>
{"\n              "}
<h3 id="adr-lsfm-02">
{"A separate two-thread pool for heavy jobs"}
</h3>
{"\n              "}
<dl className="case-adr-fields">
{"\n                "}
<dt>
{"Decision"}
</dt>
{"\n                "}
<dd>
{"PDF builds (headless Edge, up to 25 s), Gmail triage and sweeps run on their own 2-worker pool. LLM text calls stay on asyncio's default executor."}
</dd>
{"\n                "}
<dt>
{"Alternatives"}
</dt>
{"\n                "}
<dd>
{"Run everything on the default executor."}
</dd>
{"\n                "}
<dt>
{"Why"}
</dt>
{"\n                "}
<dd>
{"A burst of heavy jobs could take every default thread and make quick calls (vitals, chat replies, Obsidian reads) wait behind them."}
</dd>
{"\n                "}
<dt>
{"Cost"}
</dt>
{"\n                "}
<dd>
{"Only two heavy jobs run at once; the rest queue. LLM calls deliberately stay off this pool, or a chat reply would wait behind a PDF build."}
</dd>
{"\n                "}
<dt>
{"Evidence"}
</dt>
{"\n                "}
<dd>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/heavy_jobs.py" target="_blank" rel="noopener noreferrer">
<code>
{"heavy_jobs.py"}
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
{"\n                Unbounded asynchronous Discord Gateway event listeners without rate-limit backoff triggered HTTP 429\n                rate limit exceptions from Groq API during sudden batch notification spikes.\n              "}
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
{"\n                Added a second provider: any Groq failure, including a 429, now falls through to Gemini instead of\n                failing the request. "}
<strong>
{"What I'd change next:"}
</strong>
{" a 429 waits for Groq's "}
<code>
{"Retry-After"}
</code>
{" and a circuit breaker sends a provider that keeps failing to the back of the line, but there's still no jittered backoff after a server error and no\n                shared rate limiter across the five agents, and the HTTP calls are blocking (run in worker threads).\n                V2 moves to an async client with a token bucket and jittered exponential backoff.\n              "}
</p>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="topology" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 04 · MULTI-AGENT ARCHITECTURE & DELEGATION"}
</div>
{"\n          "}
<h2>
{"Five Agents, One Job Each"}
</h2>
{"\n          "}
<p>
{"\n            Rather than relying on a monolithic prompt that collapses under context pollution, LSFM AI HQ decomposes\n            operations across five autonomous domain agents. Each agent runs as its own Discord client with its own\n            prompt boundary and tool bindings; "}
<code>
{"run_all.py"}
</code>
{" hosts all five on a single asyncio event loop\n            and pushes blocking tool work (LLM calls, Gmail, PDF builds) onto worker threads:\n          "}
</p>
{"\n\n          "}
<div className="agent-row-list">
{"\n\n            "}
{"\n            "}
<div className="agent-row-card">
{"\n              "}
<div className="agent-row-main">
{"\n                "}
<div className="agent-row-avatar">
{"🌸"}
</div>
{"\n                "}
<div className="agent-row-info">
{"\n                  "}
<div className="agent-row-headline">
{"\n                    "}
<span className="agent-row-name">
{"Sakura"}
</span>
{"\n                    "}
<span className="agent-row-role">
{"// Chief of Staff & System Orchestrator"}
</span>
{"\n                  "}
</div>
{"\n                  "}
<p className="agent-row-desc">
{"Operator command ingestion, daily morning briefings, Gmail inbox triage,\n                    brain-mode switching, and the inter-agent "}
<code>
{"!apply"}
</code>
{" job-application pipeline."}
</p>
{"\n                "}
</div>
{"\n              "}
</div>
{"\n              "}
<div className="agent-row-tag">
{"\n                "}
<span className="agent-stack-tag">
{"Orchestration · Gmail Triage"}
</span>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n\n            "}
{"\n            "}
<div className="agent-row-card">
{"\n              "}
<div className="agent-row-main">
{"\n                "}
<div className="agent-row-avatar">
{"🦢"}
</div>
{"\n                "}
<div className="agent-row-info">
{"\n                  "}
<div className="agent-row-headline">
{"\n                    "}
<span className="agent-row-name">
{"Kazuha"}
</span>
{"\n                    "}
<span className="agent-row-role">
{"// Code & Knowledge"}
</span>
{"\n                  "}
</div>
{"\n                  "}
<p className="agent-row-desc">
{"Answers questions about the codebase from a SQLite search index and reviews\n                    uncommitted changes ("}
<code>
{"!git"}
</code>
{", "}
<code>
{"!review"}
</code>
{") before they are committed."}
</p>
{"\n                "}
</div>
{"\n              "}
</div>
{"\n              "}
<div className="agent-row-tag">
{"\n                "}
<span className="agent-stack-tag">
{"Codebase Q&A · Change Reviews"}
</span>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n\n            "}
{"\n            "}
<div className="agent-row-card">
{"\n              "}
<div className="agent-row-main">
{"\n                "}
<div className="agent-row-avatar">
{"🎨"}
</div>
{"\n                "}
<div className="agent-row-info">
{"\n                  "}
<div className="agent-row-headline">
{"\n                    "}
<span className="agent-row-name">
{"Yunjin"}
</span>
{"\n                    "}
<span className="agent-row-role">
{"// Document Architect & QA Critic"}
</span>
{"\n                  "}
</div>
{"\n                  "}
<p className="agent-row-desc">
{"Automated DOM tree auditing, broken-asset scanning across every portfolio\n                    page, and LLM-written design critiques with a portfolio health score."}
</p>
{"\n                "}
</div>
{"\n              "}
</div>
{"\n              "}
<div className="agent-row-tag">
{"\n                "}
<span className="agent-stack-tag">
{"DOM Auditing · Design Critique"}
</span>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n\n            "}
{"\n            "}
<div className="agent-row-card">
{"\n              "}
<div className="agent-row-main">
{"\n                "}
<div className="agent-row-avatar">
{"🐯"}
</div>
{"\n                "}
<div className="agent-row-info">
{"\n                  "}
<div className="agent-row-headline">
{"\n                    "}
<span className="agent-row-name">
{"Chaewon"}
</span>
{"\n                    "}
<span className="agent-row-role">
{"// Career Strategist & ATS Tailor"}
</span>
{"\n                  "}
</div>
{"\n                  "}
<p className="agent-row-desc">
{"Job scouting across LinkedIn, Indeed and JobStreet, ATS fit analysis,\n                    tailored resume drafting, and headless vector PDF compilation."}
</p>
{"\n                "}
</div>
{"\n              "}
</div>
{"\n              "}
<div className="agent-row-tag">
{"\n                "}
<span className="agent-stack-tag">
{"ATS Vectors · Headless PDF"}
</span>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n\n            "}
{"\n            "}
<div className="agent-row-card">
{"\n              "}
<div className="agent-row-main">
{"\n                "}
<div className="agent-row-avatar">
{"🥔"}
</div>
{"\n                "}
<div className="agent-row-info">
{"\n                  "}
<div className="agent-row-headline">
{"\n                    "}
<span className="agent-row-name">
{"Eunchae"}
</span>
{"\n                    "}
<span className="agent-row-role">
{"// System Guardian & Telemetry"}
</span>
{"\n                  "}
</div>
{"\n                  "}
<p className="agent-row-desc">
{"Hardware vitals watchdog (CPU, RAM and disk via psutil on a 5-minute\n                    cycle) with on-demand health reports and check-ins."}
</p>
{"\n                "}
</div>
{"\n              "}
</div>
{"\n              "}
<div className="agent-row-tag">
{"\n                "}
<span className="agent-stack-tag">
{"Hardware Watchdog · Health Reports"}
</span>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="u-mt-36px u-mb-24px">
{"\n            "}
<div className="u-d-flex u-justify-space-between u-items-baseline u-mb-12px u-wrap-wrap u-gap-8px">
{"\n              "}
<h3 className="u-m-0 u-fs-1p05rem u-c-text-primary">
{"The 6-Step Request Lifecycle"}
</h3>
{"\n              "}
<span className="mono u-fs-0p75rem u-c-accent">
{"END-TO-END PIPELINE"}
</span>
{"\n            "}
</div>
{"\n            "}
<p className="u-fs-0p92rem u-c-text-secondary u-mb-16px">
{"\n              Here is how a real user request travels through the multi-agent system from start to finish:\n            "}
</p>
{"\n\n            "}
<div className="lifecycle-grid">
{"\n              "}
<div className="lifecycle-card">
{"\n                "}
<div className="lifecycle-card-header">
{"\n                  "}
<span className="lifecycle-step-num">
{"STEP 01"}
</span>
{"\n                  "}
<span className="lifecycle-actor">
{"Operator Input"}
</span>
{"\n                "}
</div>
{"\n                "}
<div className="lifecycle-card-title">
{"Ingest"}
</div>
{"\n                "}
<p className="lifecycle-card-desc">
{"The operator posts a command or a job link in Discord, for example\n                  "}
<code>
{"!apply <url>"}
</code>
{"."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="lifecycle-card">
{"\n                "}
<div className="lifecycle-card-header">
{"\n                  "}
<span className="lifecycle-step-num">
{"STEP 02"}
</span>
{"\n                  "}
<span className="lifecycle-actor">
{"🌸 Sakura"}
</span>
{"\n                "}
</div>
{"\n                "}
<div className="lifecycle-card-title">
{"Triage & Context"}
</div>
{"\n                "}
<p className="lifecycle-card-desc">
{"Sakura scrapes the posting, extracts the role and company, and hands\n                  each part of the work to the right specialist."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="lifecycle-card">
{"\n                "}
<div className="lifecycle-card-header">
{"\n                  "}
<span className="lifecycle-step-num">
{"STEP 03"}
</span>
{"\n                  "}
<span className="lifecycle-actor">
{"Hybrid Router"}
</span>
{"\n                "}
</div>
{"\n                "}
<div className="lifecycle-card-title">
{"Smart Model Routing"}
</div>
{"\n                "}
<p className="lifecycle-card-desc">
{"Routes to each agent's cloud model on Groq or Gemini (falling back to the other provider on errors), or to the\n                  local AMD GPU when the operator selects local mode for private work."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="lifecycle-card">
{"\n                "}
<div className="lifecycle-card-header">
{"\n                  "}
<span className="lifecycle-step-num">
{"STEP 04"}
</span>
{"\n                  "}
<span className="lifecycle-actor">
{"Specialist Bot"}
</span>
{"\n                "}
</div>
{"\n                "}
<div className="lifecycle-card-title">
{"Deterministic Tool Work"}
</div>
{"\n                "}
<p className="lifecycle-card-desc">
{"The assigned bot executes real tools: compiles ATS PDFs, triages Gmail,\n                  or checks frontend tokens."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="lifecycle-card">
{"\n                "}
<div className="lifecycle-card-header">
{"\n                  "}
<span className="lifecycle-step-num">
{"STEP 05"}
</span>
{"\n                  "}
<span className="lifecycle-actor">
{"🌸 Sakura"}
</span>
{"\n                "}
</div>
{"\n                "}
<div className="lifecycle-card-title">
{"Assemble the Proposal"}
</div>
{"\n                "}
<p className="lifecycle-card-desc">
{"Combines the tailored resume, curated case studies, and tech pitch into\n                  one master proposal."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="lifecycle-card">
{"\n                "}
<div className="lifecycle-card-header">
{"\n                  "}
<span className="lifecycle-step-num">
{"STEP 06"}
</span>
{"\n                  "}
<span className="lifecycle-actor">
{"Operator"}
</span>
{"\n                "}
</div>
{"\n                "}
<div className="lifecycle-card-title">
{"Human Approval"}
</div>
{"\n                "}
<p className="lifecycle-card-desc">
{"The proposal is posted to an approvals channel; nothing is submitted\n                  anywhere until the operator reviews it."}
</p>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n\n            "}
{"\n            "}
<div className="u-bg-bg u-bd-1px-solid-border-subtle u-rounded-radius-sm u-p-16px-20px u-d-flex u-items-center u-justify-space-between u-gap-16px u-wrap-wrap">
{"\n              "}
<div className="u-d-flex u-items-center u-gap-12px">
{"\n                "}
<span className="u-fs-1p5rem">
{"🔐"}
</span>
{"\n                "}
<div>
{"\n                  "}
<div className="u-fw-600 u-fs-0p88rem u-c-text-primary">
{"Public code, private\n                    data"}
</div>
{"\n                  "}
<div className="u-fs-0p78rem u-c-text-secondary u-mt-2px">
{"\n                    "}
<strong>
{"In the public repo:"}
</strong>
{" the Obsidian vault client (Local REST API with a filesystem\n                    fallback), per-agent model assignments, 429-aware model rotation, the QA audit step in\n                    "}
<code>
{"!apply"}
</code>
{", the scheduled jobs, Ciel's orchestrator and server, and the test suite with CI.\n                    "}
<strong>
{"Kept private:"}
</strong>
{" my vault notes and daily logs, my job-application tracker and resume\n                    (the repo ships templates), bot credentials, standalone helper scripts, and the Ciel HUD front end.\n                  "}
</div>
{"\n                "}
</div>
{"\n              "}
</div>
{"\n              "}
<span className="badge badge-accent u-ws-nowrap">
{"Data Stays Private"}
</span>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="inference" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 05 · INFERENCE RUNTIME"}
</div>
{"\n          "}
<h2>
{"Multi-Provider Routing: Groq, Gemini & an Optional Local GPU"}
</h2>
{"\n          "}
<p>
{"\n            A core engineering priority was "}
<strong>
{"high-quality output within provider rate limits"}
</strong>
{" without locking\n            the system to one provider. Every agent calls a single dispatcher, "}
<code>
{"query_llm()"}
</code>
{", whose\n            behavior the operator switches live from Discord with "}
<code>
{"!mode local | cloud | auto"}
</code>
{":\n          "}
</p>
{"\n          "}
<ul className="exp-bullets u-mb-24px">
{"\n            "}
<li>
<strong>
{"Cloud mode (per-agent model, cross-provider fallback):"}
</strong>
{" Each agent has its own cloud\n              model (table below). Sakura, Chaewon, Kazuha and Eunchae go to Groq first; if Groq errors or is\n              rate-limited, the same prompt is retried on Google Gemini ("}
<code>
{"gemini-3.6-flash"}
</code>
{"). Yunjin runs\n              the other way round: Gemini first, then Groq ("}
<code>
{"qwen/qwen3.8-27b"}
</code>
{") before the call fails."}
</li>
{"\n            "}
<li>
<strong>
{"Local mode (Ollama):"}
</strong>
{" Runs "}
<code>
{"qwen2.5-coder:7b"}
</code>
{" on the workstation's\n              "}
<strong>
{"AMD Radeon RX 6600 XT"}
</strong>
{", keeping prompts on the machine. Local mode fails fast if Ollama\n              isn't running rather than silently sending prompts to the cloud."}
</li>
{"\n            "}
<li>
<strong>
{"Auto mode (local first):"}
</strong>
{" Probes Ollama with a 1.2 s health check; if it's up, the local\n              model answers, and any local error falls through to the cloud chain above."}
</li>
{"\n            "}
<li>
<strong>
{"What it does not do (yet):"}
</strong>
{" There is no automatic cloud-to-local failover. When both\n              cloud providers are exhausted in cloud mode, the request fails with the collected provider errors."}
</li>
{"\n          "}
</ul>
{"\n\n          "}
{"\n          "}
<div className="routing-table-container">
{"\n            "}
<table className="routing-table">
{"\n              "}
<thead>
{"\n                "}
<tr>
{"\n                  "}
<th>
{"Engine / Model"}
</th>
{"\n                  "}
<th>
{"Assigned To"}
</th>
{"\n                  "}
<th>
{"Provider"}
</th>
{"\n                  "}
<th>
{"Why We Use It"}
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
<td className="routing-model-cell">
{"qwen/qwen3.8-27b"}
</td>
{"\n                  "}
<td>
{"Sakura, Kazuha · default cloud model · Yunjin's fallback"}
</td>
{"\n                  "}
<td>
<span className="routing-speed-badge">
{"Groq"}
</span>
</td>
{"\n                  "}
<td>
{"Orchestration and code work on Groq's low-latency LPUs."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="routing-model-cell">
{"openai/gpt-oss-120b"}
</td>
{"\n                  "}
<td>
{"Chaewon"}
</td>
{"\n                  "}
<td>
<span className="routing-speed-badge">
{"Groq"}
</span>
</td>
{"\n                  "}
<td>
{"The larger model for resume and cover-letter writing."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="routing-model-cell">
{"openai/gpt-oss-20b"}
</td>
{"\n                  "}
<td>
{"Eunchae"}
</td>
{"\n                  "}
<td>
<span className="routing-speed-badge">
{"Groq"}
</span>
</td>
{"\n                  "}
<td>
{"A small, fast model for frequent QA and health reports."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="routing-model-cell">
{"gemini-3.6-flash"}
</td>
{"\n                  "}
<td>
{"Yunjin · cloud fallback for the other four"}
</td>
{"\n                  "}
<td>
<span className="routing-speed-badge">
{"Google"}
</span>
</td>
{"\n                  "}
<td>
{"Yunjin's design critiques, and a second provider so a Groq outage or rate limit doesn't fail the request."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="routing-model-cell">
{"gemini-embedding-001"}
</td>
{"\n                  "}
<td>
{"Kazuha's RAG index"}
</td>
{"\n                  "}
<td>
<span className="routing-speed-badge">
{"Google"}
</span>
</td>
{"\n                  "}
<td>
{"3072-dimension embeddings for the SQLite knowledge-base vector store."}
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td className="routing-model-cell">
{"qwen2.5-coder:7b"}
</td>
{"\n                  "}
<td>
{"All agents in local / auto mode"}
</td>
{"\n                  "}
<td>
<span className="routing-speed-badge">
{"Ollama · RX 6600 XT"}
</span>
</td>
{"\n                  "}
<td>
{"Keeps prompts on the workstation when privacy matters more than output quality."}
</td>
{"\n                "}
</tr>
{"\n              "}
</tbody>
{"\n            "}
</table>
{"\n          "}
</div>
{"\n          "}
<p className="u-fs-0p8rem u-c-text-muted u-mt-n12px u-mb-24px">
{"Model names\n            come from "}
<code>
{"DEFAULT_CONFIG"}
</code>
{" in "}
<code>
{"llm_client.py"}
</code>
{", and the mode and models can be\n            overridden in "}
<code>
{"memory/brain_mode.json"}
</code>
{"."}
</p>
{"\n\n          "}
<details className="tech-detail">
{"\n          "}
<summary>
{"Show the "}
<code>
{"query_llm()"}
</code>
{" code"}
</summary>
{"\n          "}
<div className="terminal-window">
{"\n            "}
<div className="terminal-topbar">
{"\n              "}
<div className="terminal-dots">
{"\n                "}
<span className="terminal-dot red">
</span>
{"\n                "}
<span className="terminal-dot yellow">
</span>
{"\n                "}
<span className="terminal-dot green">
</span>
{"\n              "}
</div>
{"\n              "}
<div className="terminal-title">
{"llm_client.py // query_llm() (condensed)"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="terminal-body">
{"\n              "}
<pre>
<span className="terminal-cmd">
{"def"}
</span>
{" "}
<span className="terminal-prompt">
{"query_llm"}
</span>
{"(prompt: str, system_instruction: str = \"\", temperature: float = 0.4) -> str:\n    mode = get_brain_mode()                "}
<span className="terminal-comment">
{"# \"local\" | \"cloud\" | \"auto\", set via !mode"}
</span>
{"\n    errors = []\n\n    "}
<span className="terminal-cmd">
{"if"}
</span>
{" mode == \"local\":\n        "}
<span className="terminal-cmd">
{"if not"}
</span>
{" check_ollama_status()[0]:\n            "}
<span className="terminal-cmd">
{"raise"}
</span>
{" RuntimeError(\"Brain mode is 'local', but Ollama is not running\")\n        "}
<span className="terminal-cmd">
{"return"}
</span>
{" call_local_ollama(prompt, system_instruction)   "}
<span className="terminal-comment">
{"# qwen2.5-coder:7b"}
</span>
{"\n\n    "}
<span className="terminal-cmd">
{"if"}
</span>
{" mode == \"auto\":\n        ollama_up, models = check_ollama_status()          "}
<span className="terminal-comment">
{"# 1.2 s probe of :11434"}
</span>
{"\n        "}
<span className="terminal-cmd">
{"if"}
</span>
{" ollama_up "}
<span className="terminal-cmd">
{"and"}
</span>
{" models:\n            "}
<span className="terminal-cmd">
{"try"}
</span>
{":\n                "}
<span className="terminal-cmd">
{"return"}
</span>
{" call_local_ollama(prompt, system_instruction)\n            "}
<span className="terminal-cmd">
{"except"}
</span>
{" Exception "}
<span className="terminal-cmd">
{"as"}
</span>
{" e:\n                errors.append(f\"Local Ollama: {e}\")        "}
<span className="terminal-comment">
{"# fall through to cloud"}
</span>
{"\n\n    "}
<span className="terminal-comment">
{"# Cloud chain: Groq first, Gemini as the cross-provider fallback"}
</span>
{"\n    "}
<span className="terminal-comment">
{"# (agents whose model is Gemini, i.e. Yunjin, run the reverse: Gemini, then Groq)"}
</span>
{"\n    "}
<span className="terminal-cmd">
{"try"}
</span>
{":\n        "}
<span className="terminal-cmd">
{"return"}
</span>
{" call_groq(prompt, system_instruction, temperature=temperature)\n    "}
<span className="terminal-cmd">
{"except"}
</span>
{" Exception "}
<span className="terminal-cmd">
{"as"}
</span>
{" e:\n        errors.append(f\"Groq Cloud: {e}\")\n    "}
<span className="terminal-cmd">
{"try"}
</span>
{":\n        "}
<span className="terminal-cmd">
{"return"}
</span>
{" call_gemini(prompt, system_instruction, temperature=temperature)\n    "}
<span className="terminal-cmd">
{"except"}
</span>
{" Exception "}
<span className="terminal-cmd">
{"as"}
</span>
{" e:\n        errors.append(f\"Gemini: {e}\")\n    "}
<span className="terminal-cmd">
{"raise"}
</span>
{" RuntimeError(f\"All LLM providers failed: {'; '.join(errors)}\")"}
</pre>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n          "}
</details>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="tools" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 06 · REAL-WORLD APIS & TOOLS"}
</div>
{"\n          "}
<h2>
{"Deterministic Automation: Headless PDF & Gmail Triage"}
</h2>
{"\n          "}
<p>
{"\n            Language models are only as useful as their ability to alter state in the real world. LSFM AI HQ integrates\n            two critical programmatic tools:\n          "}
</p>
{"\n\n          "}
<div className="experience-timeline u-m-24px-0">
{"\n            "}
{"\n            "}
<div className="experience-card">
{"\n              "}
<div className="exp-header">
{"\n                "}
<div>
{"\n                  "}
<div className="exp-title">
{"Headless ATS Resume Compilation Engine"}
</div>
{"\n                  "}
<div className="exp-company">
{"Single-Page Strict Formatting via Microsoft Edge"}
</div>
{"\n                "}
</div>
{"\n                "}
<div className="badge badge-accent">
{"PDF_ENGINE"}
</div>
{"\n              "}
</div>
{"\n              "}
<ul className="exp-bullets">
{"\n                "}
<li>
{"Parses structured markdown specifications into calibrated HTML/CSS with exact point-based typography\n                  and line heights."}
</li>
{"\n                "}
<li>
{"Launches Microsoft Edge in headless mode ("}
<code>
{"--headless --disable-gpu --print-to-pdf"}
</code>
{") to\n                  compile a pixel-perfect, 1-page PDF directly to vector format."}
</li>
{"\n                "}
<li>
{"Renders the resume as real, selectable PDF text rather than an image, so no OCR is needed and it stays parseable by\n                  automated Applicant Tracking Systems."}
</li>
{"\n              "}
</ul>
{"\n            "}
</div>
{"\n\n            "}
{"\n            "}
<div className="experience-card">
{"\n              "}
<div className="exp-header">
{"\n                "}
<div>
{"\n                  "}
<div className="exp-title">
{"Google Workspace OAuth2 Batch Triage Engine"}
</div>
{"\n                  "}
<div className="exp-company">
{"Sorts Mail into 10 Labels; Archives, Never Deletes"}
</div>
{"\n                "}
</div>
{"\n                "}
<div className="badge badge-accent">
{"GMAIL_ENGINE"}
</div>
{"\n              "}
</div>
{"\n              "}
<ul className="exp-bullets">
{"\n                "}
<li>
{"Integrates with Google Gmail API using OAuth2 user credential refreshes with secure local token\n                  storage."}
</li>
{"\n                "}
<li>
{"Provisions 10 nested labels ("}
<code>
{"LSFM/Interviews"}
</code>
{", "}
<code>
{"LSFM/University"}
</code>
{",\n                  "}
<code>
{"LSFM/Finance"}
</code>
{", "}
<code>
{"LSFM/Clutter"}
</code>
{") and classifies unread emails using structured\n                  JSON prompts."}
</li>
{"\n                "}
<li>
{"Features an automated "}
<code>
{"!clean"}
</code>
{" sweep that safely archives non-urgent newsletters while\n                  keeping critical university, human VIP, and banking notices highlighted."}
</li>
{"\n              "}
</ul>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="u-mt-36px u-mb-24px">
{"\n            "}
<div className="u-d-flex u-justify-space-between u-items-baseline u-mb-8px u-wrap-wrap u-gap-8px">
{"\n              "}
<h3 className="u-m-0 u-fs-1p05rem u-c-text-primary">
{"Safety Rules the Agents Can’t Break\n              "}
</h3>
{"\n              "}
<span className="mono u-fs-0p75rem u-c-accent">
{"RELIABLE AUTOMATION · HUMAN IN THE\n                LOOP"}
</span>
{"\n            "}
</div>
{"\n            "}
<p className="u-fs-0p92rem u-c-text-secondary u-mb-16px">
{"\n              Autonomous agents are only helpful if you can trust them. LSFM HQ enforces three boundaries:\n            "}
</p>
{"\n\n            "}
<div className="guardrails-grid">
{"\n              "}
<div className="guardrail-card">
{"\n                "}
<div className="guardrail-icon-wrap">
{"🛡️"}
</div>
{"\n                "}
<div className="guardrail-title">
{"No Delete Path"}
</div>
{"\n                "}
<p className="guardrail-desc">
{"The Gmail engine can only add labels and archive; there is no Gmail trash\n                  or delete call anywhere in the codebase. Bulk sweeps ("}
<code>
{"!clean"}
</code>
{", "}
<code>
{"!cleanse"}
</code>
{") run\n                  only when the operator types the command."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="guardrail-card">
{"\n                "}
<div className="guardrail-icon-wrap">
{"🔒"}
</div>
{"\n                "}
<div className="guardrail-title">
{"Credentials Stay Local"}
</div>
{"\n                "}
<p className="guardrail-desc">
{"API keys and OAuth tokens live in git-ignored local files. Cloud mode sends\n                  prompts to Groq and Google; switching to local mode keeps inference on the workstation's GPU."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="guardrail-card">
{"\n                "}
<div className="guardrail-icon-wrap">
{"🔄"}
</div>
{"\n                "}
<div className="guardrail-title">
{"Independent Reconnects"}
</div>
{"\n                "}
<p className="guardrail-desc">
<code>
{"run_all.py"}
</code>
{" starts each bot as its own asyncio task with a\n                  reconnect loop and backoff, so one bot's gateway error never takes the other four down."}
</p>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<div className="u-mt-36px u-mb-24px">
{"\n            "}
<div className="u-d-flex u-justify-space-between u-items-baseline u-mb-8px u-wrap-wrap u-gap-8px">
{"\n              "}
<h3 className="u-m-0 u-fs-1p05rem u-c-text-primary">
{"5 Multi-Surface Interfaces"}
</h3>
{"\n              "}
<span className="mono u-fs-0p75rem u-c-accent">
{"5 AGENTS · MULTIPLE\n                TOUCHPOINTS"}
</span>
{"\n            "}
</div>
{"\n            "}
<p className="u-fs-0p92rem u-c-text-secondary u-mb-16px">
{"\n              LSFM HQ is not locked into a single chat window. Its work shows up across five touchpoints:\n            "}
</p>
{"\n\n            "}
<div className="interfaces-matrix-grid">
{"\n              "}
<div className="interface-card">
{"\n                "}
<div className="interface-header">
{"\n                  "}
<span className="interface-icon">
{"💬"}
</span>
{"\n                  "}
<span className="interface-title">
{"Discord Gateway"}
</span>
{"\n                "}
</div>
{"\n                "}
<p className="interface-desc">
{"Natural desktop and mobile chat operations with interactive buttons, embeds,\n                  and status updates."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="interface-card">
{"\n                "}
<div className="interface-header">
{"\n                  "}
<span className="interface-icon">
{"🌸"}
</span>
{"\n                  "}
<span className="interface-title">
{"Web Copilot (Sakura)"}
</span>
{"\n                "}
</div>
{"\n                "}
<p className="interface-desc">
{"An in-browser BM25 copilot on this portfolio, modeled on Sakura's persona. It\n                  runs entirely client-side and is not connected to the live agents."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="interface-card">
{"\n                "}
<div className="interface-header">
{"\n                  "}
<span className="interface-icon">
{"💻"}
</span>
{"\n                  "}
<span className="interface-title">
{"Setup Scripts"}
</span>
{"\n                "}
</div>
{"\n                "}
<p className="interface-desc">
{"Python scripts in "}
<code>
{"scripts/"}
</code>
{" for Gmail OAuth setup, Discord\n                  channel provisioning, and one-time mass inbox sorting."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="interface-card">
{"\n                "}
<div className="interface-header">
{"\n                  "}
<span className="interface-icon">
{"📥"}
</span>
{"\n                  "}
<span className="interface-title">
{"Gmail Labels"}
</span>
{"\n                "}
</div>
{"\n                "}
<p className="interface-desc">
{"Triage results land directly in the inbox as ten "}
<code>
{"LSFM/"}
</code>
{" labels,\n                  visible on any Gmail client."}
</p>
{"\n              "}
</div>
{"\n\n              "}
<div className="interface-card">
{"\n                "}
<div className="interface-header">
{"\n                  "}
<span className="interface-icon">
{"⚡"}
</span>
{"\n                  "}
<span className="interface-title">
{"Single Launcher"}
</span>
{"\n                "}
</div>
{"\n                "}
<p className="interface-desc">
<code>
{"python run_all.py"}
</code>
{" starts all five bots in one process, each\n                  with its own reconnect loop."}
</p>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="benchmarks" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 07 · OPERATING CHARACTERISTICS"}
</div>
{"\n          "}
<h2>
{"What the System Guarantees"}
</h2>
{"\n          "}
<p>
{"\n            The figures below are properties you can confirm by reading the public code, not performance claims.\n            The one measured number, LLM round-trip latency, is in the footnote with its source; triage accuracy is the next milestone.\n          "}
</p>
{"\n\n          "}
<div className="benchmark-grid">
{"\n            "}
<div className="benchmark-card">
{"\n              "}
<div className="benchmark-val">
{"0 Servers*"}
</div>
{"\n              "}
<div className="benchmark-label">
{"Paid Hosting"}
</div>
{"\n              "}
<div className="benchmark-sub">
{"Bots run on a personal workstation"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="benchmark-card">
{"\n              "}
<div className="benchmark-val">
{"10 Labels"}
</div>
{"\n              "}
<div className="benchmark-label">
{"Automated Gmail Classification"}
</div>
{"\n              "}
<div className="benchmark-sub">
{"Rules first, LLM for edge cases"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="benchmark-card">
{"\n              "}
<div className="benchmark-val">
{"0 Deletes"}
</div>
{"\n              "}
<div className="benchmark-label">
{"Non-Destructive Inbox Sweeps"}
</div>
{"\n              "}
<div className="benchmark-sub">
{"Label + archive only"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="benchmark-card">
{"\n              "}
<div className="benchmark-val">
{"1 Page"}
</div>
{"\n              "}
<div className="benchmark-label">
{"ATS Vector Resume"}
</div>
{"\n              "}
<div className="benchmark-sub">
{"Headless Edge, a few seconds per build"}
</div>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n          "}
<p className="u-fs-0p8rem u-c-text-muted u-mt-n12px u-mb-24px">
{"*No paid\n            servers: the agents run on a personal workstation, and cloud LLM calls go to the Groq and Gemini APIs. API\n            spend isn't stated here because there is no dated billing record to cite yet. LLM round trip (not streamed, as the bots call it): "}
<strong>
{"736 ms p50, 6.18 s p95"}
</strong>
{" over 50 calls, ten per agent, in cloud mode on 2026-10-02, from 312 ms (Sakura, Groq) to 4.86 s (Yunjin, Gemini) at p50 ("}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-02-telemetry.md" target="_blank" rel="noopener noreferrer">
<code>
{"2026-10-02-telemetry.md"}
</code>
</a>
{"). Triage accuracy isn't listed: a labeled email evaluation set is still to be built."}
</p>
{"\n\n          "}
<h3 className="u-m-32px-0-12px-0">
{"Failure Modes & Where the Code Handles Them"}
</h3>
{"\n          "}
<p>
{"\n            Each row links to the exact lines in the public repo, pinned to commit\n            "}
<code>
{"14a319f"}
</code>
{" so the links don't drift, and names the test that exercises it.\n          "}
</p>
{"\n          "}
<div className="case-table-wrap">
{"\n            "}
<table className="case-table">
{"\n              "}
<thead>
{"\n                "}
<tr>
<th scope="col">
{"When this fails"}
</th>
<th scope="col">
{"What the system does"}
</th>
<th scope="col">
{"Code & test"}
</th>
</tr>
{"\n              "}
</thead>
{"\n              "}
<tbody>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"Discord gateway drops a bot"}
</td>
{"\n                  "}
<td>
{"Restarts that bot alone with jittered backoff (3 s, growing 1.5× to 15 s; reset after a session over 60 s). A bad token or missing intents stops it instead of retrying forever."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/14a319fb9fa1b65794382c3e7a566d3b9b2fbf0e/run_all.py#L49-L83" target="_blank" rel="noopener noreferrer">
<code>
{"run_all.py"}
</code>
{" L49–83"}
</a>
<br />
<code>
{"GatewayRetryTest"}
</code>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"Groq answers 429"}
</td>
{"\n                  "}
<td>
{"Honours "}
<code>
{"Retry-After"}
</code>
{" (including decimals like 1.5 s) once if it is 4 s or less; otherwise moves to the next Groq model."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/14a319fb9fa1b65794382c3e7a566d3b9b2fbf0e/llm_client.py#L212-L227" target="_blank" rel="noopener noreferrer">
<code>
{"llm_client.py"}
</code>
{" L212–227"}
</a>
<br />
<code>
{"GroqRetryAfterTest"}
</code>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"Groq answers 413 (request too large)"}
</td>
{"\n                  "}
<td>
{"Skips the other Groq models, since each would get the same request, and moves on to Gemini; Groq's reason is logged. The evening rollup caps the day's log it sends at 12 KB, keeping the agents' own posts first."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/410f66e5f8210ff8331856204d3aa9a771605c44/llm_client.py#L310-L318" target="_blank" rel="noopener noreferrer">
<code>
{"llm_client.py"}
</code>
{" L310–318"}
</a>
<br />
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/410f66e5f8210ff8331856204d3aa9a771605c44/sakura_engine.py#L228-L263" target="_blank" rel="noopener noreferrer">
<code>
{"sakura_engine.py"}
</code>
{" L228–263"}
</a>
<br />
<code>
{"TestRollupDispatchCap"}
</code>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"The PC restarts mid-morning, or a post is half sent"}
</td>
{"\n                  "}
<td>
{"Each scheduled post claims its day before its first message, so it is never sent twice; if writing it fails, nothing is claimed and the next check tries again; if sending fails halfway, one notice names the command to send it by hand (for example "}
<code>
{"!rollup"}
</code>
{")."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/410f66e5f8210ff8331856204d3aa9a771605c44/daily_once.py#L41-L77" target="_blank" rel="noopener noreferrer">
<code>
{"daily_once.py"}
</code>
{" L41–77"}
</a>
<br />
<code>
{"RunDailyTest"}
</code>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"The bots are started twice"}
</td>
{"\n                  "}
<td>
{"The second start exits with the running copy's PID; nothing is killed."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/410f66e5f8210ff8331856204d3aa9a771605c44/instance_lock.py#L46-L50" target="_blank" rel="noopener noreferrer">
<code>
{"instance_lock.py"}
</code>
{" L46–50"}
</a>
<br />
<code>
{"InstanceLockTest"}
</code>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"A whole cloud provider is down"}
</td>
{"\n                  "}
<td>
{"Groq agents fall back to Gemini when a Gemini key is configured, and Yunjin (Gemini first) falls back to Groq. If both fail, the error names each provider instead of returning empty text."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/14a319fb9fa1b65794382c3e7a566d3b9b2fbf0e/llm_client.py#L376-L402" target="_blank" rel="noopener noreferrer">
<code>
{"llm_client.py"}
</code>
{" L376–402"}
</a>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"Obsidian's REST API is offline or slow"}
</td>
{"\n                  "}
<td>
{"Writes go straight to the vault folder on disk. A lock plus append mode keeps two agents logging at once from overwriting each other."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/14a319fb9fa1b65794382c3e7a566d3b9b2fbf0e/obsidian_client.py#L171-L205" target="_blank" rel="noopener noreferrer">
<code>
{"obsidian_client.py"}
</code>
{" L171–205"}
</a>
<br />
<code>
{"ObsidianHttpStubTest"}
</code>
{", "}
<code>
{"DiskAppendTest"}
</code>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"An LLM-chosen note path tries to leave the vault"}
</td>
{"\n                  "}
<td>
{"Rejects "}
<code>
{"../"}
</code>
{" and drive paths before anything touches the disk or the REST API."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/14a319fb9fa1b65794382c3e7a566d3b9b2fbf0e/obsidian_client.py#L98-L111" target="_blank" rel="noopener noreferrer">
<code>
{"obsidian_client.py"}
</code>
{" L98–111"}
</a>
<br />
<code>
{"VaultPathGuardTest"}
</code>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"A reply is longer than Discord allows"}
</td>
{"\n                  "}
<td>
{"Splits it into numbered embeds and clips titles and citation fields to Discord's limits, so a long answer never fails to send."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/14a319fb9fa1b65794382c3e7a566d3b9b2fbf0e/discord_utils.py#L122-L185" target="_blank" rel="noopener noreferrer">
<code>
{"discord_utils.py"}
</code>
{" L122–185"}
</a>
<br />
<code>
{"EmbedLimitsTest"}
</code>
{", "}
<code>
{"ChunkPropertyTest"}
</code>
</td>
{"\n                "}
</tr>
{"\n                "}
<tr>
{"\n                  "}
<td>
{"Eunchae's QA review returns no usable score"}
</td>
{"\n                  "}
<td>
{"The application package fails QA as \"unscored\" instead of passing with a default score."}
</td>
{"\n                  "}
<td>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/14a319fb9fa1b65794382c3e7a566d3b9b2fbf0e/eunchae_engine.py#L319-L337" target="_blank" rel="noopener noreferrer">
<code>
{"eunchae_engine.py"}
</code>
{" L319–337"}
</a>
<br />
<code>
{"TestEunchaeQAHonestFailures"}
</code>
</td>
{"\n                "}
</tr>
{"\n              "}
</tbody>
{"\n            "}
</table>
{"\n          "}
</div>
{"\n\n          "}
{"\n          "}
<h3 className="u-m-32px-0-12px-0">
{"Email Triage: How Classification Works"}
</h3>
{"\n          "}
<p>
{"\n            Sakura's Gmail engine performs automated classification across "}
<strong>
{"10 custom Gmail labels"}
</strong>
{"\n            with non-destructive bulk-archiving. Each unread message passes through two tiers:\n          "}
</p>
{"\n          "}
<ul className="exp-bullets u-mb-24px">
{"\n            "}
<li>
<strong>
{"Tier 1 · Deterministic rules:"}
</strong>
{" known senders, domains, and keywords map straight to a\n              label with no model call, so common mail is fast and fully predictable."}
</li>
{"\n            "}
<li>
<strong>
{"Tier 2 · LLM classifier:"}
</strong>
{" anything the rules don't recognize is classified by the LLM\n              into a strict JSON category, parsed defensively, and mapped to one of the "}
<code>
{"LSFM/"}
</code>
{" labels."}
</li>
{"\n            "}
<li>
<strong>
{"Bulk sweeps:"}
</strong>
{" "}
<code>
{"!clean"}
</code>
{" and "}
<code>
{"!cleanse"}
</code>
{" archive promotions and\n              newsletters by changing labels only. Nothing is trashed or deleted, so every sweep can be undone from All\n              Mail."}
</li>
{"\n          "}
</ul>
{"\n\n\n          "}
{"\n          "}
<div className="u-bg-white-a02 u-bd-1px-solid-border u-p-20px u-rounded-8px u-mt-24px">
{"\n            "}
<h4 className="u-mb-8px u-fs-0p95rem u-d-flex u-items-center u-gap-8px">
{"\n              "}
<span className="u-c-accent">
{"🛠️"}
</span>
{" Engineering Transparency: How I Built This\n            "}
</h4>
{"\n            "}
<p className="u-fs-0p88rem u-lh-1p6 u-c-text-secondary u-m-0">
{"\n              This system was designed and developed through an iterative AI-assisted engineering workflow. I authored\n              how the 5 agents split the work, designed the structured JSON output contracts, wrote the test suite, and verified\n              every generated prompt and system invariant, while leveraging AI agent pairing (Google Antigravity) for\n              rapid boilerplate scaffolding, API client generation, and documentation review.\n            "}
</p>
{"\n          "}
</div>
{"\n\n          "}
<div className="pull-quote u-mt-32px">
{"\n            “The most valuable AI systems are not the largest models, but the ones with the tightest feedback loops,\n            lowest operational friction, and most deterministic tool execution.”\n          "}
</div>
{"\n        "}
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
<a href="case-fintrack.html" className="pag-card">
{"\n          "}
<span className="pag-label">
{"← Previous Case Study"}
</span>
{"\n          "}
<span className="pag-title">
{"07 · FinTrack App (FinTech UX)"}
</span>
{"\n        "}
</a>
{"\n        "}
<a href="case-ciel.html" className="pag-card u-ta-right">
{"\n          "}
<span className="pag-label">
{"Next Case Study →"}
</span>
{"\n          "}
<span className="pag-title">
{"02 · Manas: Ciel (Voice AI Copilot & HUD)"}
</span>
{"\n        "}
</a>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n\n  "}</CaseLayout>;
}
