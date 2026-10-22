import './case.css';
import type { CSSProperties } from 'react';
import CaseLayout from '../../components/CaseLayout';
import MetricCard from '../../components/MetricCard';
import { cases } from '../../lib/cases';

export const metadata = cases.find(item => item.slug === 'ciel')!.metadata;

export default function Page() {
  return <CaseLayout slug="ciel" title="Manas: Ciel — Case Study · Hans Aaron LaurelesLifecycle of one Ciel voice request">{"\n    \n    "}
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
{"Case Study 02 · Voice AI Copilot"}
</span>
{"\n        "}
<span className="badge">
{"Voice AI"}
</span>
{"\n        "}
<span className="badge">
{"Agent Control"}
</span>
{"\n        "}
<span className="badge">
{"Obsidian Notes"}
</span>
{"\n      "}
</div>
{"\n\n      "}
<h1 className="case-title" data-case="ciel">
{"\n        Manas: Ciel —"}
<br />
{"\n        "}
<span className="serif-italic">
{"A Bilingual Voice Assistant for My Dev Workstation"}
</span>
{"\n      "}
</h1>
{"\n\n      "}
<p className="case-lead">
{"\n        Ciel listens, answers in Japanese and English, hands tasks to my five LSFM agents, reads and writes my Obsidian notes, remembers the last 8 exchanges in each HUD tab, and speaks up when something on my PC needs attention. (The name comes from an anime character; the requirements came from my own workflow.)\n      "}
</p>
{"\n\n      "}
<dl className="case-summary" aria-label="Summary">
{"\n        "}
<div>
<dt>
{"Problem"}
</dt>
<dd>
{"My working context is spread across the terminal, Discord, Obsidian notes and LLM chat tabs, and switching between them by hand breaks focus."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Constraint"}
</dt>
<dd>
{"One voice, in Japanese and English, running on my own PC, that can act on the workstation (hand tasks to the agents, read notes, check vitals) and not only chat."}
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Decision"}
</dt>
<dd>
{"Speak each sentence as soon as it is written: Edge-TTS gets up to three sentences at once and the HUD plays them in order. Groq, Whisper and Ollama are called with Python's standard library, no SDK: HTTPS for Groq and Whisper, local HTTP for Ollama ("}
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
{"Time to first audio fell from 4.60 s to 1.41 s p50 (N=10 each, same prompt and machine, 2026-10-02). The cost: mission-complete p95 rose from 5.99 s to 7.20 s ("}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-02-ttfa-before.md" target="_blank" rel="noopener noreferrer">
{"before"}
</a>
{" · "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-02-ttfa-after.md" target="_blank" rel="noopener noreferrer">
{"after"}
</a>
{")."}
<MetricCard id="ttfa-2026-10-02" />
</dd>
</div>
{"\n        "}
<div>
<dt>
{"Code"}
</dt>
<dd>
{"Server side in lsfm-ai-hq: "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/speech_stream.py" target="_blank" rel="noopener noreferrer">
{"speech_stream.py"}
</a>
{", "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/ciel_server.py" target="_blank" rel="noopener noreferrer">
{"ciel_server.py"}
</a>
{" (the HUD code is private)"}
</dd>
</div>
{"\n      "}
</dl>
{"\n\n      "}
<div className="u-d-flex u-gap-12px u-wrap-wrap u-mb-36px">
{"\n        "}
<a href="#simulator" className="btn btn-primary">
{"\n          ⚡ Try the Voice Demo ↓\n        "}
</a>
{"\n        "}
<a href="#pillars" className="btn btn-outline">
{"\n          See the 4 Parts ↓\n        "}
</a>
{"\n        "}
<a href="https://github.com/hanslaureles/manas-ciel" target="_blank" rel="noopener noreferrer" className="btn btn-outline u-d-inline-flex u-items-center u-gap-6px">
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
{"Local Microservices · WebSockets · Chromium HUD · Obsidian Vault"}
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
{"Voice AI & Multi-Agent Systems"}
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
{"Developer & Systems Architect (Solo)"}
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
{"Python 3.11 (aiohttp) · Groq Whisper Turbo · Edge-TTS · FFmpeg DSP · Vanilla JS/CSS"}
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
{"\n            Siri, Alexa and ChatGPT Voice are built for everyone, so they can't see my code, my notes, or my running agents, and they forget everything between sessions.\n          "}
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
{"\n            Built Ciel as an async Python server: Groq Whisper Large v3 Turbo transcribes speech (OpenAI Whisper as fallback), Edge-TTS voices pass through a custom FFmpeg voice filter, and Ciel remembers the last 8 exchanges of each HUD tab separately, reads and writes my Obsidian notes, and runs background checks on my PC.\n          "}
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
<div className="case-metric-num accent-amber">
{"2-Tier"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Speech-to-Text (Groq → OpenAI)"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-emerald">
{"JA + EN"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Bilingual Edge-TTS Voices"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="case-metric-cell">
{"\n          "}
<div className="case-metric-num accent-blue">
{"8 Exchanges"}
</div>
{"\n          "}
<div className="case-metric-label">
{"Remembered, Plus Obsidian Notes"}
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
{"LSFM Agents Ciel Can Call"}
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
<source type="image/avif" srcSet="images/ciel/ciel-mockup-480.eecfa9ee.avif 480w, images/ciel/ciel-mockup-960.980d44a3.avif 960w, images/ciel/ciel-mockup-1600.c5fa93f8.avif 1600w, images/ciel/ciel-mockup-2400.1bdc3468.avif 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<source type="image/webp" srcSet="images/ciel/ciel-mockup-480.259bebad.webp 480w, images/ciel/ciel-mockup-960.2f7b7f9e.webp 960w, images/ciel/ciel-mockup-1600.9b316812.webp 1600w, images/ciel/ciel-mockup-2400.cd51387e.webp 2400w" sizes="(max-width: 1280px) calc(100vw - 32px), 1240px" />
{"\n          "}
<img src="images/ciel/ciel-mockup-960.2f7b7f9e.webp" alt="Manas: Ciel voice assistant web dashboard mockup" width="960" height="720" loading="eager" fetchPriority="high" decoding="async" data-full="images/ciel/ciel-mockup-2400.cd51387e.webp" />
{"\n        "}
</picture>
{"\n      "}
</div>
{"\n\n      "}
{"\n      "}
<details className="tech-detail u-m-24px-0-32px-0">
{"\n      "}
<summary>
{"Show the voice pipeline diagram"}
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
{"MANAS_CIEL // VOICE PIPELINE"}
</div>
{"\n          "}
<div className="mono u-fs-0p75rem u-c-amber-500">
{"● VOICE FILTER ON"}
</div>
{"\n        "}
</div>
{"\n        "}
<div className="terminal-body">
{"\n"}
<pre>
<span className="terminal-comment">
{"# How one voice request flows through Ciel"}
</span>
{"\n"}
<span className="terminal-prompt">
{"[INGEST]"}
</span>
{"      Browser MediaRecorder (webm) ──> FFmpeg 16 kHz mono + voice-band filter\n"}
<span className="terminal-prompt">
{"[ASR]"}
</span>
{"         Groq Whisper Large v3 Turbo (Domain Vocabulary Prompting) ──> OpenAI whisper-1 fallback\n"}
<span className="terminal-prompt">
{"[ROUTER]"}
</span>
{"      Ciel planner (two modes)\n               ├─ Mode 1: Universal Knowledge & Reasoning (Algorithms, Architecture, CS, Philosophy)\n               ├─ Mode 2: Multi-Agent Coordination (5 LSFM Agents) & reads/writes Obsidian notes\n               ├─ Context: remembers the last 8 exchanges + Obsidian note reads\n               └─ Tools: [ciel_read_rules, ciel_read_profile, ciel_search_vault, ciel_save_to_daily, live_weather, web_search]\n"}
<span className="terminal-prompt">
{"[DSP AUDIO]"}
</span>
{"   Edge-TTS ja-JP-NanamiNeural ──> 350 ms pause ──> en-US-AvaNeural ──> FFmpeg Filter:\n               ├─ highpass=f=120 + equalizer=f=3500 (presence lift)\n               └─ aecho (light echo)\n"}
<span className="terminal-prompt">
{"[HUD WS]"}
</span>
{"      Live Concentric Rings Broadcast ──> Audio Reactive Waveform & Background-Check Alerts\n"}
<span className="terminal-success">
{"[STATUS]"}
</span>
{"      Two-mode routing · last 8 exchanges · general knowledge"}
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
<a href="#concept">
{"01. The Problem: Scattered Context"}
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
{"04. Voice Demo"}
</a>
</li>
{"\n          "}
<li>
<a href="#pillars">
{"05. The 4 Parts of Manas: Ciel"}
</a>
</li>
{"\n          "}
<li>
<a href="#audio-dsp">
{"06. How the Voice Sounds"}
</a>
</li>
{"\n          "}
<li>
<a href="#vault-sync">
{"07. Reading & Writing My Notes"}
</a>
</li>
{"\n          "}
<li>
<a href="#sentinels">
{"08. Background Checks"}
</a>
</li>
{"\n          "}
<li>
<a href="#benchmarks">
{"09. Production Benchmarks"}
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
<section id="concept" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 01 · CONTEXT & PROBLEM"}
</div>
{"\n          "}
<h2>
{"The Problem: A Developer's Context Is Scattered Across Five Tools"}
</h2>
{"\n          "}
<p>
{"\n            In modern software engineering, developers are bombarded by fragmentation: switching between terminal shells, Slack or Discord communication channels, Obsidian documentation vaults, and cloud LLM web interfaces. \n          "}
</p>
{"\n          "}
<p>
{"\n            Rather than another generic chatbot, I built "}
<strong>
{"Manas: Ciel"}
</strong>
{" as one voice for all of it. Ciel works in "}
<strong>
{"two modes"}
</strong>
{": answer general technical questions (algorithms, architecture, systems design), or act on my workstation: hand tasks to the five LSFM agents, check hardware vitals, and read the learned rules in my Obsidian notes.\n          "}
</p>
{"\n          "}
<div className="u-bg-amber-a06 u-bd-l-3px-solid-amber-500 u-p-16px-20px u-rounded-4px u-m-20px-0">
{"\n            "}
<p className="u-m-0 u-fs-0p92rem u-lh-1p6 u-c-text-primary">
{"\n              "}
<strong>
{"Design Stance:"}
</strong>
{" Ciel speaks as a calm, precise peer, not a servant: the system prompt rules out anime-style address such as \"Master\" or \"マスター\".\n            "}
</p>
{"\n          "}
</div>
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
<article className="case-adr-card" aria-labelledby="adr-ciel-01">
{"\n              "}
<div className="case-adr-id">
{"ADR-CIEL-01"}
</div>
{"\n              "}
<h3 id="adr-ciel-01">
{"Standard-library HTTP calls for Groq, Whisper and Ollama; an SDK only for Gemini"}
</h3>
{"\n              "}
<dl className="case-adr-fields">
{"\n                "}
<dt>
{"Decision"}
</dt>
{"\n                "}
<dd>
{"Groq chat (including streaming), Groq and OpenAI Whisper, and local Ollama are called with Python's "}
<code>
{"urllib"}
</code>
{". Gemini goes through Google's "}
<code>
{"google-genai"}
</code>
{" SDK."}
</dd>
{"\n                "}
<dt>
{"Alternatives"}
</dt>
{"\n                "}
<dd>
{"The "}
<code>
{"groq"}
</code>
{" and "}
<code>
{"openai"}
</code>
{" Python SDKs for every provider."}
</dd>
{"\n                "}
<dt>
{"Why"}
</dt>
{"\n                "}
<dd>
{"Groq and Whisper take simple JSON (or a multipart upload) over HTTPS, and Ollama takes the same JSON over plain HTTP on the local machine ("}
<code>
{"127.0.0.1"}
</code>
{"), so the same lightweight standard-library approach covers all three without an SDK, and the retry rules live in my code: Groq's fractional "}
<code>
{"Retry-After"}
</code>
{" (e.g. 1.5 s) is honoured once if it is 4 s or less, then the next model is tried."}
</dd>
{"\n                "}
<dt>
{"Cost"}
</dt>
{"\n                "}
<dd>
{"Streaming, multipart uploads and 429 handling are hand-written, so each needs its own tests ("}
<code>
{"GroqRetryAfterTest"}
</code>
{")."}
</dd>
{"\n                "}
<dt>
{"Evidence"}
</dt>
{"\n                "}
<dd>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/llm_client.py" target="_blank" rel="noopener noreferrer">
<code>
{"llm_client.py"}
</code>
</a>
{" · "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/voice_engine.py" target="_blank" rel="noopener noreferrer">
<code>
{"voice_engine.py"}
</code>
</a>
</dd>
{"\n              "}
</dl>
{"\n            "}
</article>
{"\n            "}
<article className="case-adr-card" aria-labelledby="adr-ciel-02">
{"\n              "}
<div className="case-adr-id">
{"ADR-CIEL-02"}
</div>
{"\n              "}
<h3 id="adr-ciel-02">
{"Speak each sentence as soon as it is written"}
</h3>
{"\n              "}
<dl className="case-adr-fields">
{"\n                "}
<dt>
{"Decision"}
</dt>
{"\n                "}
<dd>
{"Stream the synthesis reply and send each finished sentence to Edge-TTS (up to three requests at once); the HUD plays the clips in order."}
</dd>
{"\n                "}
<dt>
{"Alternatives"}
</dt>
{"\n                "}
<dd>
{"Voice the whole reply after the LLM finishes (the 2026-10-01 design)."}
</dd>
{"\n                "}
<dt>
{"Why"}
</dt>
{"\n                "}
<dd>
{"Time to first audio fell from 4.60 s to 1.41 s p50 (N=10 each, 2026-10-02, same prompt and machine)."}
</dd>
{"\n                "}
<dt>
{"Cost"}
</dt>
{"\n                "}
<dd>
{"Mission-complete p95 rose from 5.99 s to 7.20 s: the joined replay MP3 waits for the slowest clip, and clips play strictly in order, so one slow clip holds back the sentences after it."}
</dd>
{"\n                "}
<dt>
{"Evidence"}
</dt>
{"\n                "}
<dd>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-02-ttfa-before.md" target="_blank" rel="noopener noreferrer">
<code>
{"before"}
</code>
</a>
{" · "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-02-ttfa-after.md" target="_blank" rel="noopener noreferrer">
<code>
{"after"}
</code>
</a>
{" · "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/speech_stream.py" target="_blank" rel="noopener noreferrer">
<code>
{"speech_stream.py"}
</code>
</a>
{" · "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/ciel_orchestrator.py" target="_blank" rel="noopener noreferrer">
<code>
{"ciel_orchestrator.py"}
</code>
</a>
{" (clip queue, three at once, in order)"}
</dd>
{"\n              "}
</dl>
{"\n            "}
</article>
{"\n            "}
<article className="case-adr-card" aria-labelledby="adr-ciel-03">
{"\n              "}
<div className="case-adr-id">
{"ADR-CIEL-03"}
</div>
{"\n              "}
<h3 id="adr-ciel-03">
{"Push telemetry over the WebSocket instead of polling"}
</h3>
{"\n              "}
<dl className="case-adr-fields">
{"\n                "}
<dt>
{"Decision"}
</dt>
{"\n                "}
<dd>
{"The server pushes CPU, RAM and disk readings to connected HUDs every 5 s, and samples only while a client is connected."}
</dd>
{"\n                "}
<dt>
{"Alternatives"}
</dt>
{"\n                "}
<dd>
{"The HUD polling an HTTP endpoint on a timer (how it worked before)."}
</dd>
{"\n                "}
<dt>
{"Why"}
</dt>
{"\n                "}
<dd>
{"Nothing is sampled or requested when no HUD is open, and the readings arrive on the WebSocket the HUD already holds for mission events."}
</dd>
{"\n                "}
<dt>
{"Cost"}
</dt>
{"\n                "}
<dd>
{"The HUD needs reconnect logic with backoff, and still fetches one snapshot over HTTP when it (re)connects."}
</dd>
{"\n                "}
<dt>
{"Evidence"}
</dt>
{"\n                "}
<dd>
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/ciel_server.py" target="_blank" rel="noopener noreferrer">
<code>
{"ciel_server.py"}
</code>
</a>
{" (5 s push, snapshot endpoint) · the HUD's reconnect and snapshot code is in "}
<code>
{"hud.js"}
</code>
{", in a private repo"}
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
{"\n                Synchronous weather queries to "}
<code>
{"wttr.in"}
</code>
{" and live web search during voice generation caused the audio stream to block and stutter when the user had high internet latency.\n              "}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="u-bg-emerald-a05 u-bd-1px-solid-emerald-a20 u-p-18px u-rounded-8px">
{"\n              "}
<h3 className="u-c-tone-emerald u-mb-8px u-fs-0p95rem">
{"→ The Fix (Shipped)"}
</h3>
{"\n              "}
<p className="u-fs-0p88rem u-lh-1p5 u-c-text-secondary u-m-0">
{"\n                "}
<strong>
{"Fixed, and the code is public in lsfm-ai-hq:"}
</strong>
{" every blocking call in a mission now runs in a worker thread via "}
<code>
{"asyncio.to_thread"}
</code>
{": named mission tools (weather, web search, both LLM calls, psutil, Obsidian, git, Gmail, the PDF build) have per-call timeouts, while FFmpeg runs off the event loop without a timeout. The server's event loop keeps serving other clients while a mission waits. Independent agents run concurrently with "}
<code>
{"asyncio.gather"}
</code>
{". A call that times out ends as an honest "}
<code>
{"failed"}
</code>
{" (\"timed out after N s\"), never an empty success. At most two missions run at once; a few more queue, and anything beyond that is refused with a 503 instead of flooding the thread pool. Regression tests prove the loop keeps ticking while a tool blocks.\n              "}
</p>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
<div className="u-bg-white-a02 u-bd-1px-solid-border u-p-20px u-rounded-8px u-mt-24px">
{"\n            "}
<h3 className="u-mb-8px u-fs-0p95rem u-d-flex u-items-center u-gap-8px">
{"\n              "}
<span className="u-c-accent">
{"🛠️"}
</span>
{" Production Architecture Note\n            "}
</h3>
{"\n            "}
<p className="u-fs-0p88rem u-lh-1p6 u-c-text-secondary u-m-0">
{"\n              While "}
<code>
{"edge-tts"}
</code>
{" needs no API key and returned an English clip in 0.42 s p50 in the "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-01.md" target="_blank" rel="noopener noreferrer">
{"2026-10-01 bench"}
</a>
{" (a network round trip to Microsoft's service), enterprise production deployment would swap it for self-hosted Kokoro/Vits pipelines or dedicated WebRTC audio streaming to satisfy enterprise uptime SLAs.\n            "}
</p>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="simulator" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 04 · SCRIPTED HUD DEMO"}
</div>
{"\n          "}
<h2>
{"Voice Demo: What Ciel Can Do"}
</h2>
{"\n          "}
<p>
{"\n            A scripted demo of Ciel's replies. Click any prompt chip to see the kind of response Ciel gives. Replies are pre-written examples, not live output:\n          "}
</p>
{"\n\n          "}
{"\n          "}
<div className="ciel-hud-widget" id="ciel-demo">
{"\n            "}
<div className="ciel-hud-header">
{"\n              "}
<div>
{"\n                "}
<span className="badge badge-accent u-fs-0p75rem u-bg-amber-a20 u-bd-c-amber-500 u-c-amber-400">
{"MANAS: CIEL HUD"}
</span>
{"\n                "}
<span className="mono u-ml-8px u-fs-0p85rem u-c-text-muted">
{"Scripted demo · pre-written replies"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="ciel-telemetry-badge">
{"\n                "}
<span className="pulse-gold">
</span>
{"\n                "}
<span>
{"VOICE FILTER: ON"}
</span>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n\n            "}
<div className="ciel-visualizer-box">
{"\n              "}
<div className="ciel-rings-graphic">
{"\n                "}
<div className="ciel-ring r1">
</div>
{"\n                "}
<div className="ciel-ring r2">
</div>
{"\n                "}
<div className="ciel-ring r3">
</div>
{"\n                "}
<div className="ciel-ring r4">
</div>
{"\n              "}
</div>
{"\n              "}
<div className="ciel-waveform-strip" id="waveformStrip">
{"\n                "}
<div className="ciel-wave-bar u-h-18px">
</div>
{"\n                "}
<div className="ciel-wave-bar u-h-28px">
</div>
{"\n                "}
<div className="ciel-wave-bar u-h-42px">
</div>
{"\n                "}
<div className="ciel-wave-bar u-h-22px">
</div>
{"\n                "}
<div className="ciel-wave-bar u-h-36px">
</div>
{"\n                "}
<div className="ciel-wave-bar u-h-46px">
</div>
{"\n                "}
<div className="ciel-wave-bar u-h-20px">
</div>
{"\n                "}
<div className="ciel-wave-bar u-h-32px">
</div>
{"\n                "}
<div className="ciel-wave-bar u-h-14px">
</div>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n\n            "}
<div className="ciel-prompt-chips">
{"\n              "}
<span className="mono u-fs-0p75rem u-self-center u-c-text-muted">
{"VOICE QUERY:"}
</span>
{"\n              "}
<button className="ciel-chip active" data-query="squad">
{"👥 5-Agent System Status"}
</button>
{"\n              "}
<button className="ciel-chip" data-query="weather">
{"🌤️ Live Weather (wttr.in)"}
</button>
{"\n              "}
<button className="ciel-chip" data-query="search">
{"🌐 Web Search (DDGS)"}
</button>
{"\n              "}
<button className="ciel-chip" data-query="raft">
{"🧠 General Knowledge (Raft)"}
</button>
{"\n              "}
<button className="ciel-chip" data-query="rules">
{"📜 Obsidian Learned Rules"}
</button>
{"\n              "}
<button className="ciel-chip" data-query="career">
{"🎯 Working Preferences"}
</button>
{"\n              "}
<button className="ciel-chip" data-query="vitals">
{"⚡ Hardware & Vitals"}
</button>
{"\n              "}
<button className="ciel-chip" data-query="dispatch">
{"🚀 Dispatch Sakura"}
</button>
{"\n            "}
</div>
{"\n\n            "}
<div className="ciel-dsp-badge mono" id="demoDspBadge">
{"\n              ⚡ AUDIO PIPELINE: FFmpeg 16 kHz mono + voice-band filter → Groq Whisper Turbo → Edge-TTS + voice filter\n            "}
</div>
{"\n\n            "}
<div id="ciel-demo-output" className="ciel-response-box">
{"\n              "}
<span className="u-c-amber-400">
{"[CIEL · SAMPLE REPLY]"}
</span>
{" Delegating to the 5-agent team. Eunchae reports CPU, RAM and disk use; Yunjin scans the portfolio for broken assets; Kazuha lists the current branch and uncommitted files; Sakura pulls today's priorities from the daily log. Summary compiled for you.\n            "}
</div>
{"\n          "}
</div>
{"\n          "}
<p className="u-fs-0p85rem u-c-text-muted">
{"The live HUD gets these steps from "}
<code>
{"ciel_server.py"}
</code>
{" over a WebSocket at "}
<code>
{"/ws"}
</code>
{", as they happen: "}
<code>
{"plan_formed"}
</code>
{" when Ciel has a plan, "}
<code>
{"agent_state"}
</code>
{" for each agent it delegates to, "}
<code>
{"ciel_audio_chunk"}
</code>
{" for each spoken clip, then "}
<code>
{"ciel_complete"}
</code>
{" or "}
<code>
{"ciel_error"}
</code>
{". CPU and RAM are pushed every 5 s. Each tab has its own session id, so a mission's events reach only the tab that asked, and the HUD's stamp shows how the plan was made (by the LLM, by a keyword fast path, or by a fallback). The HUD's own browser tests replay these events against a faked server in CI."}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="pillars" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 05 · ARCHITECTURAL FOUNDATION"}
</div>
{"\n          "}
<h2>
{"The 4 Parts of Manas: Ciel"}
</h2>
{"\n          "}
<p>
{"\n            Ciel has four parts: agent control, memory and notes, speech, and background checks.\n          "}
</p>
{"\n\n          "}
<div className="u-d-grid u-cols-autofit-280 u-gap-16px u-m-24px-0">
{"\n            "}
<div className="agent-card">
{"\n              "}
<div className="agent-card-top">
{"\n                "}
<div className="agent-avatar-badge u-bg-amber-a15 u-c-amber-500 u-bd-c-amber-a30">
{"⚡"}
</div>
{"\n                "}
<span className="agent-domain u-c-tone-amber">
{"PILLAR 01 · ORCHESTRATION"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="agent-role-title">
{"Agent Control"}
</div>
{"\n              "}
<div className="agent-desc">
{"\n                Ciel hands tasks to the five LSFM agents (Sakura, Chaewon, Kazuha, Yunjin, Eunchae) and collects their results, so I don't have to switch to Discord.\n              "}
</div>
{"\n              "}
<span className="agent-stack-tag">
{"lsfm-ai-hq · ciel_orchestrator.py"}
</span>
{"\n            "}
</div>
{"\n\n            "}
<div className="agent-card">
{"\n              "}
<div className="agent-card-top">
{"\n                "}
<div className="agent-avatar-badge u-bg-emerald-a15 u-c-emerald-500 u-bd-c-emerald-a30">
{"🧠"}
</div>
{"\n                "}
<span className="agent-domain u-c-tone-emerald">
{"PILLAR 02 · KNOWLEDGE"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="agent-role-title">
{"Memory & Obsidian Notes"}
</div>
{"\n              "}
<div className="agent-desc">
{"\n                Remembers the last 8 exchanges per HUD tab (up to 16 tabs; the least recently used is forgotten first), checks live weather (`wttr.in`) and the web (`ddgs`), and reads and writes my Obsidian notes (`ciel_read_rules`, `ciel_read_profile`, `ciel_search_vault`, `ciel_save_to_daily`).\n              "}
</div>
{"\n              "}
<span className="agent-stack-tag">
{"Last 8 Exchanges · wttr.in · DDGS · Obsidian"}
</span>
{"\n            "}
</div>
{"\n\n            "}
<div className="agent-card">
{"\n              "}
<div className="agent-card-top">
{"\n                "}
<div className="agent-avatar-badge u-bg-blue-a15 u-c-blue-500 u-bd-c-blue-a30">
{"🎙️"}
</div>
{"\n                "}
<span className="agent-domain u-c-tone-blue">
{"PILLAR 03 · SPEECH DSP"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="agent-role-title">
{"Clean Audio In, Clear Voice Out"}
</div>
{"\n              "}
<div className="agent-desc">
{"\n                FFmpeg conversion to 16 kHz mono with a voice-band filter, Groq Whisper Large v3 Turbo with domain vocabulary prompting, an OpenAI Whisper fallback, and live Web Audio ring reactivity.\n              "}
</div>
{"\n              "}
<span className="agent-stack-tag">
{"Groq Whisper Turbo · Edge-TTS DSP"}
</span>
{"\n            "}
</div>
{"\n\n            "}
<div className="agent-card">
{"\n              "}
<div className="agent-card-top">
{"\n                "}
<div className="agent-avatar-badge u-bg-purple-a15 u-c-purple-500 u-bd-c-purple-a30">
{"🛡️"}
</div>
{"\n                "}
<span className="agent-domain u-c-tone-purple">
{"PILLAR 04 · TELEMETRY"}
</span>
{"\n              "}
</div>
{"\n              "}
<div className="agent-role-title">
{"Background Checks"}
</div>
{"\n              "}
<div className="agent-desc">
{"\n                Background loop running 4 checks every 45 seconds: hardware CPU/RAM/disk, Git status, today's Obsidian daily log, and portfolio TODO markers. Pushes the top 3 suggestions to the HUD over WebSockets.\n              "}
</div>
{"\n              "}
<span className="agent-stack-tag">
{"proactive_sentinel.py · WebSockets"}
</span>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="audio-dsp" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 06 · SIGNAL PROCESSING & DSP"}
</div>
{"\n          "}
<h2>
{"How the Voice Sounds: Audio Cleanup & Voice Filter"}
</h2>
{"\n          "}
<p>
{"\n            Plain text-to-speech sounds flat. To give Ciel a calm, close presence, the pipeline has two FFmpeg stages, one on the way in and one on the way out:\n          "}
</p>
{"\n\n          "}
<div className="u-bg-surface u-bd-l-3px-solid-amber-500 u-p-18px-24px u-rounded-4px u-m-20px-0 u-ff-font-mono u-fs-0p88rem">
{"\n            "}
<strong>
{"Inbound (speech-to-text prep), piped in memory:"}
</strong>
<br />
{"\n            "}
<code>
{"ffmpeg -i pipe:0 -ar 16000 -ac 1 -af \"volume=1.8,highpass=f=80,lowpass=f=7500\" -f wav pipe:1"}
</code>
<br />
{"\n            "}
<strong>
{"Outbound (voice filter over the JA + EN Edge-TTS clips):"}
</strong>
<br />
{"\n            "}
<code>
{"[0:a]apad=pad_dur=0.35[a0];[a0][1:a]concat=n=2:v=0:a=1,highpass=f=120,equalizer=f=3500:t=q:w=1.2:g=3.0,aecho=0.85:0.8:25|45:0.18|0.09,volume=0.30"}
</code>
{"\n          "}
</div>
{"\n\n          "}
<p>
{"\n            Engineering rationale for these parameters:\n          "}
</p>
{"\n          "}
<ul className="u-m-16px-0-24px-20px u-lh-1p8">
{"\n            "}
<li>
<strong>
{"16 kHz Mono Conversion"}
</strong>
{": Whisper models are trained on 16,000 Hz single-channel audio. Converting the browser's WebM/Opus recording through stdin/stdout pipes avoids temp files and container ambiguity, and the 80 Hz–7.5 kHz band-pass trims rumble and hiss before transcription."}
</li>
{"\n            "}
<li>
<strong>
{"Bilingual Sequencing"}
</strong>
{": The Japanese line plays first, then a 350 ms pause, then the English line, so the two voices read as one deliberate utterance rather than an overlap."}
</li>
{"\n            "}
<li>
<strong>
{"Presence, Not Speed"}
</strong>
{": A 120 Hz high-pass removes room boom and a +3 dB lift at 3.5 kHz adds clarity. The voices themselves are tuned slightly lower and slower (−2 to −3 Hz pitch, −1 to −2% rate) for a calm delivery."}
</li>
{"\n            "}
<li>
<strong>
{"\"Inside the Mind\" Echo"}
</strong>
{": Two faint reflections at 25 ms and 45 ms create the sense of an internal thought rather than an external loudspeaker, without the smear of a full reverb."}
</li>
{"\n            "}
<li>
<strong>
{"Bounded Audio Cache"}
</strong>
{": Rendered replies are kept in "}
<code>
{"audio_cache/"}
</code>
{"; on server start-up only the 35 most recent files are kept, so the cache can't grow without bound."}
</li>
{"\n          "}
</ul>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="vault-sync" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 07 · READ & WRITE NOTES"}
</div>
{"\n          "}
<h2>
{"Ciel Reads and Writes My Obsidian Notes"}
</h2>
{"\n          "}
<p>
{"\n            Most voice assistants can't see your notes. Ciel reads and writes my Obsidian vault through Obsidian's Local REST API, and falls back to reading the files on disk:\n          "}
</p>
{"\n\n          "}
<details className="tech-detail u-m-20px-0">
{"\n          "}
<summary>
{"Show the vault tool definitions"}
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
{"OBSIDIAN_VAULT_BRIDGE // TOOL DEFINITIONS"}
</div>
{"\n              "}
<div className="mono u-fs-0p75rem u-c-emerald-500">
{"● LOCAL REST + DISK FALLBACK"}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="terminal-body">
{"\n"}
<pre>
<span className="terminal-comment">
{"# Vault tools Ciel's planner can choose (paraphrased from ciel_orchestrator.py)"}
</span>
{"\ntools = [\n    {\n        \"name\": \"ciel_read_rules\",\n        \"description\": \"Reads the workspace learned rules from 03 Knowledge/Learned_Rules.md\"\n    },\n    {\n        \"name\": \"ciel_read_profile\",\n        \"description\": \"Reads Hans's professional profile from 03 Knowledge/Profile.md\"\n    },\n    {\n        \"name\": \"ciel_read_preferences\",\n        \"description\": \"Reads Hans's working style and communication preferences from 03 Knowledge/Preferences.md\"\n    },\n    {\n        \"name\": \"ciel_search_vault\",\n        \"description\": \"Searches the Obsidian vault notes for a specific note or topic\"\n    },\n    {\n        \"name\": \"ciel_save_to_daily\",\n        \"description\": \"Saves findings or notes to today's Obsidian daily log\"\n    }\n]"}
</pre>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n          "}
</details>
{"\n\n          "}
<p>
{"\n            When Hans asks: "}
<em>
{"\"What are my working preferences?\""}
</em>
{" or "}
<em>
{"\"Remind me of the rule regarding edge redirect syntax,\""}
</em>
{" Ciel picks the matching tool, reads the note, and answers from it. If Obsidian's REST plugin is off, it reads the file from disk instead, so the request still succeeds.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="sentinels" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 08 · BACKGROUND CHECKS"}
</div>
{"\n          "}
<h2>
{"Background Checks: Ciel Speaks Up First"}
</h2>
{"\n          "}
<p>
{"\n            Passive voice assistants only speak when spoken to. Ciel runs a background-check loop ("}
<code>
{"proactive_sentinel.py"}
</code>
{") every 45 seconds while the HUD is connected, ranks what it finds (warning > action > info), and surfaces the top 3 across 4 checks:\n          "}
</p>
{"\n\n          "}
<div className="u-d-grid u-cols-autofit-240 u-gap-14px u-m-20px-0">
{"\n            "}
<div className="u-bg-surface u-bd-1px-solid-border u-rounded-8px u-p-16px">
{"\n              "}
<div className="u-fw-600 u-c-tone-amber u-mb-6px">
{"⚡ Hardware Check"}
</div>
{"\n              "}
<p className="u-fs-0p85rem u-c-text-secondary u-m-0 u-lh-1p5">
{"\n                Reads psutil vitals and warns when CPU load passes 85%, RAM passes 88%, or drive C: drops under 20 GB free. Each warning offers a one-click hand-off to Eunchae.\n              "}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="u-bg-surface u-bd-1px-solid-border u-rounded-8px u-p-16px">
{"\n              "}
<div className="u-fw-600 u-c-tone-emerald u-mb-6px">
{"🗓️ Daily Log Check"}
</div>
{"\n              "}
<p className="u-fs-0p85rem u-c-text-secondary u-m-0 u-lh-1p5">
{"\n                Opens today's Obsidian daily log. If it's missing, Ciel suggests Sakura's briefing; otherwise it routes the first unchecked priority to the matching agent by keyword.\n              "}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="u-bg-surface u-bd-1px-solid-border u-rounded-8px u-p-16px">
{"\n              "}
<div className="u-fw-600 u-c-tone-blue u-mb-6px">
{"📄 Portfolio Check"}
</div>
{"\n              "}
<p className="u-fs-0p85rem u-c-text-secondary u-m-0 u-lh-1p5">
{"\n                Scans the portfolio's "}
<code>
{"index.html"}
</code>
{" for leftover TODO or FIXME markers and offers a Yunjin audit.\n              "}
</p>
{"\n            "}
</div>
{"\n            "}
<div className="u-bg-surface u-bd-1px-solid-border u-rounded-8px u-p-16px">
{"\n              "}
<div className="u-fw-600 u-c-tone-purple u-mb-6px">
{"🐙 Git Check"}
</div>
{"\n              "}
<p className="u-fs-0p85rem u-c-text-secondary u-m-0 u-lh-1p5">
{"\n                Runs "}
<code>
{"git status --porcelain"}
</code>
{" on the workspace and, at 3 or more uncommitted changes, offers a Kazuha review of the diff.\n              "}
</p>
{"\n            "}
</div>
{"\n          "}
</div>
{"\n\n          "}
<p>
{"\n            When an anomaly is flagged, Ciel displays an advisory telemetry badge on the Voice HUD (e.g. "}
<code>
{"✦ 2 ADVISORY"}
</code>
{") and emits a non-intrusive notification toast allowing one-click resolution.\n          "}
</p>
{"\n        "}
</section>
{"\n\n        "}
{"\n        "}
<section id="benchmarks" className="case-body-section">
{"\n          "}
<div className="section-tag">
{"// 09 · PIPELINE STAGES & TIMINGS"}
</div>
{"\n          "}
<h2>
{"Pipeline Stages & Measured Timings"}
</h2>
{"\n\n          "}
<figure className="lifecycle-figure">
{"\n            "}
<svg className="lifecycle-svg" viewBox="0 0 360 512" role="img" aria-labelledby="lcTitle lcDesc">
{"\n              "}
<title id="lcTitle">
{"Lifecycle of one Ciel voice request"}
</title>
{"\n              "}
<desc id="lcDesc">
{"Eight stages, top to bottom: the HUD sends speech or text; it is transcribed; the server admits the mission; the router plans it; tools and agents run in worker threads; the synthesis LLM streams its reply; each finished sentence is voiced and sent to the HUD while the rest is written; the mission completes with the report and a joined MP3, or ends as ciel_error."}
</desc>
{"\n              "}
<defs>
{"\n                "}
<marker id="lcArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
{"\n                  "}
<path d="M0,0 L10,5 L0,10 z" className="lc-arrowhead">
</path>
{"\n                "}
</marker>
{"\n              "}
</defs>
{"\n              "}
<g className="lc-step">
<rect x="20" y="4" width="320" height="46" rx="8">
</rect>
<text x="36" y="23" className="lc-title">
{"1 · HUD"}
</text>
<text x="36" y="40" className="lc-sub">
{"Push-to-talk WebM upload, or a typed prompt"}
</text>
</g>
{"\n              "}
<line x1="180" y1="50" x2="180" y2="66" className="lc-link" marker-end="url(#lcArrow)">
</line>
{"\n              "}
<g className="lc-step">
<rect x="20" y="70" width="320" height="46" rx="8">
</rect>
<text x="36" y="89" className="lc-title">
{"2 · Transcribe"}
</text>
<text x="36" y="106" className="lc-sub">
{"FFmpeg 16 kHz mono → Groq Whisper (OpenAI fallback)"}
</text>
</g>
{"\n              "}
<line x1="180" y1="116" x2="180" y2="132" className="lc-link" marker-end="url(#lcArrow)">
</line>
{"\n              "}
<g className="lc-step">
<rect x="20" y="136" width="320" height="46" rx="8">
</rect>
<text x="36" y="155" className="lc-title">
{"3 · Admit"}
</text>
<text x="36" y="172" className="lc-sub">
{"2 missions run, 8 wait, the rest get a 503"}
</text>
</g>
{"\n              "}
<line x1="180" y1="182" x2="180" y2="198" className="lc-link" marker-end="url(#lcArrow)">
</line>
{"\n              "}
<g className="lc-step">
<rect x="20" y="202" width="320" height="46" rx="8">
</rect>
<text x="36" y="221" className="lc-title">
{"4 · Route"}
</text>
<text x="36" y="238" className="lc-sub">
{"Keyword fast paths, else a Groq JSON plan"}
</text>
</g>
{"\n              "}
<line x1="180" y1="248" x2="180" y2="264" className="lc-link" marker-end="url(#lcArrow)">
</line>
{"\n              "}
<g className="lc-step">
<rect x="20" y="268" width="320" height="46" rx="8">
</rect>
<text x="36" y="287" className="lc-title">
{"5 · Tools & agents"}
</text>
<text x="36" y="304" className="lc-sub">
{"Threads with timeouts; PDF & Gmail get their own pool"}
</text>
</g>
{"\n              "}
<line x1="180" y1="314" x2="180" y2="330" className="lc-link" marker-end="url(#lcArrow)">
</line>
{"\n              "}
<g className="lc-step">
<rect x="20" y="334" width="320" height="46" rx="8">
</rect>
<text x="36" y="353" className="lc-title">
{"6 · Synthesize (streaming)"}
</text>
<text x="36" y="370" className="lc-sub">
{"Groq writes the JA line, the EN line, then the report"}
</text>
</g>
{"\n              "}
<line x1="180" y1="380" x2="180" y2="396" className="lc-link" marker-end="url(#lcArrow)">
</line>
{"\n              "}
<g className="lc-step lc-accent">
<rect x="20" y="400" width="320" height="46" rx="8">
</rect>
<text x="36" y="419" className="lc-title">
{"7 · Speak while writing"}
</text>
<text x="36" y="436" className="lc-sub">
{"Each finished sentence → Edge-TTS + filter → HUD"}
</text>
</g>
{"\n              "}
<line x1="180" y1="446" x2="180" y2="462" className="lc-link" marker-end="url(#lcArrow)">
</line>
{"\n              "}
<g className="lc-step">
<rect x="20" y="466" width="320" height="42" rx="8">
</rect>
<text x="36" y="485" className="lc-title">
{"8 · Complete"}
</text>
<text x="36" y="501" className="lc-sub">
{"Report + joined MP3 for replay, or ciel_error"}
</text>
</g>
{"\n            "}
</svg>
{"\n            "}
<figcaption>
{"One voice request, end to end. Stage timings are in the tables below, with their run counts and dates."}
</figcaption>
{"\n          "}
</figure>
{"\n          "}
<p>
{"\n            Every voice turn runs through these stages on my workstation (Intel Core i5-12400F, 16GB DDR4, AMD Radeon RX 6600 XT, Windows 11). The p50 column comes from "}
<code>
{"bench/bench_ciel.py"}
</code>
{" in the public repo: N = 10 runs per stage on 2026-10-01 (full results, including p95 and max:\n            "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-01.md" target="_blank" rel="noopener noreferrer">
<code>
{"bench/results/2026-10-01.md"}
</code>
</a>
{"). Network stages are round trips from this machine at that time, not compute times. A full mission for a general-knowledge prompt (routing, synthesis and bilingual speech) took "}
<strong>
{"4.43 s p50"}
</strong>
{" (max 5.71 s).\n          "}
</p>
{"\n\n          "}
{"\n          "}
<div className="case-table-wrap">
{"\n          "}
<table className="case-table">
{"\n            "}
<thead>
{"\n              "}
<tr>
{"\n                "}
<th>
{"PIPELINE STAGE"}
</th>
{"\n                "}
<th>
{"ENGINE"}
</th>
{"\n                "}
<th>
{"WHAT HAPPENS"}
</th>
{"\n                "}
<th className="u-ws-nowrap">
{"P50 (N=10)"}
</th>
{"\n              "}
</tr>
{"\n            "}
</thead>
{"\n            "}
<tbody>
{"\n              "}
<tr>
{"\n                "}
<td>
{"Audio Conversion"}
</td>
{"\n                "}
<td>
{"FFmpeg"}
</td>
{"\n                "}
<td>
{"Resample to 16 kHz mono WAV with a fixed gain (×1.8) and an 80 Hz–7.5 kHz band-pass."}
</td>
{"\n                "}
<td>
{"32 ms"}
</td>
{"\n              "}
</tr>
{"\n              "}
<tr>
{"\n                "}
<td>
{"Speech-to-Text"}
</td>
{"\n                "}
<td>
{"Groq Whisper Large v3 Turbo → OpenAI whisper-1"}
</td>
{"\n                "}
<td>
{"Domain-vocabulary prompt; the OpenAI tier runs only if Groq fails."}
</td>
{"\n                "}
<td>
{"0.50 s · network"}
</td>
{"\n              "}
</tr>
{"\n              "}
<tr>
{"\n                "}
<td>
{"Intent Routing"}
</td>
{"\n                "}
<td>
{"Keyword pre-router + Groq qwen3.8-27b"}
</td>
{"\n                "}
<td>
{"Fast paths for weather, search, and memory reset; the LLM returns a JSON plan for everything else."}
</td>
{"\n                "}
<td>
{"0.58 s · network"}
</td>
{"\n              "}
</tr>
{"\n              "}
<tr>
{"\n                "}
<td>
{"Tools & Agents"}
</td>
{"\n                "}
<td>
{"wttr.in · DDGS · Obsidian REST · 5 LSFM agents"}
</td>
{"\n                "}
<td>
{"Runs the planned tools in worker threads with per-call timeouts; delegated agents run concurrently."}
</td>
{"\n                "}
<td>
{"Per tool: vitals 0.50 s, web search 4.6 s · network"}
</td>
{"\n              "}
</tr>
{"\n              "}
<tr>
{"\n                "}
<td>
{"Synthesis"}
</td>
{"\n                "}
<td>
{"Groq qwen3.8-27b"}
</td>
{"\n                "}
<td>
{"Writes the full report plus short Japanese and English lines to speak."}
</td>
{"\n                "}
<td>
{"0.96 s · network"}
</td>
{"\n              "}
</tr>
{"\n              "}
<tr>
{"\n                "}
<td>
{"Voice"}
</td>
{"\n                "}
<td>
{"Edge-TTS + FFmpeg filter"}
</td>
{"\n                "}
<td>
{"Japanese clip, a 350 ms pause, then the English clip, filtered off the event loop in worker threads (no timeout). In this 2026-10-01 run the full MP3 was rendered before playback; streaming is below."}
</td>
{"\n                "}
<td>
{"2.80 s · network (filter alone 81 ms)"}
</td>
{"\n              "}
</tr>
{"\n            "}
</tbody>
{"\n          "}
</table>
{"\n          "}
</div>
{"\n\n          "}
<h3 className="u-m-36px-0-12px-0">
{"Streaming Speech: Time to First Audio"}
</h3>
{"\n          "}
<p>
{"\n            The table above shows the cost: no sound until the whole reply had been voiced. Ciel now streams the synthesis reply and voices each spoken sentence as soon as the LLM finishes writing it (up to three Edge-TTS requests at once). The HUD plays the clips in order while the rest is still being generated. Time to first audio runs from the start of the mission until the first playable audio URL is broadcast to the HUD; the HUD's fetch of a local file comes on top.\n          "}
</p>
{"\n          "}
<div className="case-table-wrap">
{"\n          "}
<table className="case-table">
{"\n            "}
<thead>
{"\n              "}
<tr>
{"\n                "}
<th>
{"FULL MISSION, N=10 EACH"}
</th>
{"\n                "}
<th className="u-ws-nowrap">
{"BEFORE (WHOLE REPLY)"}
</th>
{"\n                "}
<th className="u-ws-nowrap">
{"AFTER (PER SENTENCE)"}
</th>
{"\n              "}
</tr>
{"\n            "}
</thead>
{"\n            "}
<tbody>
{"\n              "}
<tr>
{"\n                "}
<td>
{"Time to first audio, p50 / p95"}
</td>
{"\n                "}
<td>
{"4.60 s / 5.99 s"}
</td>
{"\n                "}
<td>
{"1.41 s / 2.00 s"}
</td>
{"\n              "}
</tr>
{"\n              "}
<tr>
{"\n                "}
<td>
{"Mission complete, p50 / p95"}
</td>
{"\n                "}
<td>
{"4.60 s / 5.99 s"}
</td>
{"\n                "}
<td>
{"4.29 s / 7.20 s"}
</td>
{"\n              "}
</tr>
{"\n            "}
</tbody>
{"\n          "}
</table>
{"\n          "}
</div>
{"\n          "}
<p className="u-fs-0p8rem u-c-text-muted">
{"\n            Measured 2026-10-02 with "}
<code>
{"bench/bench_ciel.py --stages e2e_mission --runs 10"}
</code>
{": the same general-knowledge prompt, Groq paced 45 s between runs, on an Intel Core i5-12400F, Windows 11, Python 3.11.9, ffmpeg 9.0.2, edge-tts 7.2.8. Network round trips from this machine, not compute times; with 10 runs, p95 is the max. Code: LE-SSERAFIM-AI-HQ "}
<code>
{"3315b69"}
</code>
{" (before) and "}
<code>
{"3eedda9"}
</code>
{" (after), public in lsfm-ai-hq since "}
<code>
{"14a319f"}
</code>
{" ("}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/speech_stream.py" target="_blank" rel="noopener noreferrer">
<code>
{"speech_stream.py"}
</code>
</a>
{"). Full results: "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-02-ttfa-before.md" target="_blank" rel="noopener noreferrer">
<code>
{"ttfa-before.md"}
</code>
</a>
{", "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/5fb3216aeaad3cbbb07cae3deef26c81d470da1f/bench/results/2026-10-02-ttfa-after.md" target="_blank" rel="noopener noreferrer">
<code>
{"ttfa-after.md"}
</code>
</a>
{".\n          "}
</p>
{"\n          "}
<p>
{"\n            The trade-off is in the second row. The first sentence is heard about 3.2 s sooner at p50, but the joined MP3 kept for replay waits for the slowest clip. In one of the ten runs a single Edge-TTS clip took 6.2 s, which set the 7.20 s worst case. Clips play strictly in order, so a slow clip also holds back the sentences after it; the pauses this causes between sentences are not measured yet.\n          "}
</p>
{"\n\n          "}
<h3 className="u-m-36px-0-12px-0">
{"One Recorded Mission, Call by Call"}
</h3>
{"\n          "}
<p>
{"\n            The tables above pool many runs. This is a single mission as it happened: the median of 10 runs\n            (3.14 s end to end), with each timed call drawn at its recorded start and end. First audio was ready at\n            "}
<strong>
{"1.25 s"}
</strong>
{", while the synthesis LLM was still writing.\n          "}
</p>
{"\n          "}
<figure className="trace-figure" aria-describedby="traceCaption">
{"\n            "}
<div className="trace-chart" aria-hidden="true">
{"\n              "}
<div className="trace-row">
{"\n                "}
<span className="trace-label">
{"Router LLM · 492 ms"}
</span>
{"\n                "}
<span className="trace-track">
<span className="trace-bar is-llm" style={{"--start": "0.00%", "--width": "12.30%"} as CSSProperties}>
</span>
</span>
{"\n              "}
</div>
{"\n              "}
<div className="trace-row">
{"\n                "}
<span className="trace-label">
{"Synthesis LLM (streamed) · 852 ms"}
</span>
{"\n                "}
<span className="trace-track">
<span className="trace-bar is-llm" style={{"--start": "12.31%", "--width": "21.31%"} as CSSProperties}>
</span>
</span>
{"\n              "}
</div>
{"\n              "}
<div className="trace-row">
{"\n                "}
<span className="trace-label">
{"Voice clip 1 · 409 ms"}
</span>
{"\n                "}
<span className="trace-track">
<span className="trace-bar is-voice" style={{"--start": "20.88%", "--width": "10.23%"} as CSSProperties}>
</span>
</span>
{"\n              "}
</div>
{"\n              "}
<div className="trace-row">
{"\n                "}
<span className="trace-label">
{"Voice clip 2 · 1.04 s"}
</span>
{"\n                "}
<span className="trace-track">
<span className="trace-bar is-voice" style={{"--start": "22.14%", "--width": "26.05%"} as CSSProperties}>
</span>
</span>
{"\n              "}
</div>
{"\n              "}
<div className="trace-row">
{"\n                "}
<span className="trace-label">
{"Voice clip 3 · 1.76 s"}
</span>
{"\n                "}
<span className="trace-track">
<span className="trace-bar is-voice" style={{"--start": "24.26%", "--width": "44.04%"} as CSSProperties}>
</span>
</span>
{"\n              "}
</div>
{"\n              "}
<div className="trace-row">
{"\n                "}
<span className="trace-label">
{"Voice clip 4 · 1.86 s"}
</span>
{"\n                "}
<span className="trace-track">
<span className="trace-bar is-voice" style={{"--start": "31.12%", "--width": "46.42%"} as CSSProperties}>
</span>
</span>
{"\n              "}
</div>
{"\n              "}
<div className="trace-markers">
{"\n                "}
<div className="trace-marker" style={{"--at": "31.13%"} as CSSProperties}>
<span>
{"First audio 1.25 s"}
</span>
</div>
{"\n                "}
<div className="trace-marker is-end" style={{"--at": "78.53%"} as CSSProperties}>
<span>
{"Done 3.14 s"}
</span>
</div>
{"\n              "}
</div>
{"\n            "}
</div>
{"\n            "}
<div className="trace-axis" aria-hidden="true">
<span>
{"0 s"}
</span>
<span>
{"1 s"}
</span>
<span>
{"2 s"}
</span>
<span>
{"3 s"}
</span>
<span>
{"4 s"}
</span>
</div>
{"\n            "}
<table className="sr-only">
{"\n              "}
<caption>
{"Timed calls in one recorded Ciel mission, in milliseconds after the mission started. First audio at 1.25 s; mission complete at 3.14 s."}
</caption>
{"\n              "}
<thead>
<tr>
<th scope="col">
{"Call"}
</th>
<th scope="col">
{"Starts"}
</th>
<th scope="col">
{"Ends"}
</th>
<th scope="col">
{"Duration"}
</th>
</tr>
</thead>
{"\n              "}
<tbody>
<tr>
<td>
{"Router LLM"}
</td>
<td>
{"0 ms"}
</td>
<td>
{"492 ms"}
</td>
<td>
{"492 ms"}
</td>
</tr>
<tr>
<td>
{"Synthesis LLM (streamed)"}
</td>
<td>
{"492 ms"}
</td>
<td>
{"1.34 s"}
</td>
<td>
{"852 ms"}
</td>
</tr>
<tr>
<td>
{"Voice clip 1"}
</td>
<td>
{"835 ms"}
</td>
<td>
{"1.24 s"}
</td>
<td>
{"409 ms"}
</td>
</tr>
<tr>
<td>
{"Voice clip 2"}
</td>
<td>
{"886 ms"}
</td>
<td>
{"1.93 s"}
</td>
<td>
{"1.04 s"}
</td>
</tr>
<tr>
<td>
{"Voice clip 3"}
</td>
<td>
{"970 ms"}
</td>
<td>
{"2.73 s"}
</td>
<td>
{"1.76 s"}
</td>
</tr>
<tr>
<td>
{"Voice clip 4"}
</td>
<td>
{"1.24 s"}
</td>
<td>
{"3.10 s"}
</td>
<td>
{"1.86 s"}
</td>
</tr>
</tbody>
{"\n            "}
</table>
{"\n            "}
<figcaption id="traceCaption">
{"\n              Run 6 of 10, recorded 2026-10-05 with "}
<code>
{"bench/bench_ciel.py --stages e2e_mission"}
</code>
{"\n              (LE-SSERAFIM-AI-HQ "}
<code>
{"c740ed6"}
</code>
{", Intel Core i5-12400F,\n              Python 3.11.9, edge-tts 7.2.8). Purple: Groq LLM calls; green: Edge-TTS\n              clips, up to three at once. Gaps are time outside the timed calls and are not broken down. Network round trips\n              from this machine, not compute times. Raw data: "}
<a href="https://github.com/hanslaureles/lsfm-ai-hq/blob/d6ef3802e716197a705f60db11f41fecd914bda0/bench/results/2026-10-05-trace.json" target="_blank" rel="noopener noreferrer">
<code>
{"bench/results/2026-10-05-trace.json"}
</code>
</a>
{".\n            "}
</figcaption>
{"\n          "}
</figure>
{"\n\n\n        "}
</section>
{"\n\n      "}
</div>
{"\n    "}
</div>
{"\n\n    "}
{"\n    "}
<div className="case-pagination-wrap u-mt-64px u-mb-32px">
{"\n      "}
<div className="case-pagination u-d-grid u-cols-1fr-1fr u-gap-24px">
{"\n        "}
<a href="case-lsfm.html" className="pag-card">
{"\n          "}
<span className="pag-label">
{"← Previous Case Study"}
</span>
{"\n          "}
<span className="pag-title">
{"01 · LSFM AI HQ (Multi-Agent System)"}
</span>
{"\n        "}
</a>
{"\n        "}
<a href="case-memory.html" className="pag-card u-ta-right">
{"\n          "}
<span className="pag-label">
{"Next Case Study →"}
</span>
{"\n          "}
<span className="pag-title">
{"03 · Memory Core (Lessons-Learned Memory)"}
</span>
{"\n        "}
</a>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n\n  "}</CaseLayout>;
}
