// case-memory.html: in-browser recall demo.
// Moved out of the page for the CSP (Phase 5A): script-src allows no inline script.
(function() {
  const MEMORIES = [
    {
      id: "MEM-001",
      domain: "COPYWRITING",
      rule: "When writing or designing for hospitality, food & beverage, or culinary retail, strictly forbid terminal/sci-fi terms (SPECIMEN, MANIFEST, INVENTORY HASH, PROTOCOL). Use grounded, tactile, sensory words (Fresh Roast, Curated, Warm, Batch, Bag, Table, Handcrafted).",
      symptom: "User flagged that copy sounds 'robotic' or 'computer-like' (e.g. using 'SPECIMEN', 'MANIFEST', 'PROTOCOL', 'INDEX', 'DEPLOYMENT')",
      rootCause: "Defaulting to high-tech, cyberpunk, or developer-native jargon instead of domain-authentic, warm, sensory culinary language",
      tags: ["copywriting", "tone", "cafe", "coffee", "culinary", "hospitality", "ux-writing", "branding"],
      severity: "HIGH",
      frequency: 2
    },
    {
      id: "MEM-002",
      domain: "CSS-LAYOUT",
      rule: "Never insert spaced bracket text '[ LABEL ]' in navigation or inline-flex elements. If bracket styling is desired, use CSS ::before and ::after pseudo-elements, or guarantee no whitespace before the bracket and enforce 'white-space: nowrap;' on the parent element.",
      symptom: "Trailing closing bracket ']' wrapped onto a separate line underneath the link label on wide screens",
      rootCause: "Raw text format '[ ITEM ]' contains whitespace before the bracket; browser text wrapping engine treats space before ']' as a legal wrap opportunity",
      tags: ["css", "flexbox", "navigation", "whitespace", "typography", "layout", "responsive", "ui"],
      severity: "HIGH",
      frequency: 2
    },
    {
      id: "MEM-003",
      domain: "EDGE-ROUTING",
      rule: "In Netlify static sites with nested sub-projects, explicit subfolder rewrite rules MUST precede any global catch-all rule ('/* /404.html 404'). Also duplicate redirect configuration in both '_redirects' and 'netlify.toml' for guaranteed edge resolution across deploy contexts.",
      symptom: "Visiting subdirectory route like /aura-store loads 404 error page instead of index.html",
      rootCause: "Catch-all 404 rewrite rule '/* /404.html 404' was placed before subdirectory rules or subdirectory lacked explicit index rewrites in _redirects and netlify.toml",
      tags: ["netlify", "deployment", "redirects", "routing", "hosting", "subdirectories", "edge", "404"],
      severity: "HIGH",
      frequency: 3
    },
    {
      id: "MEM-004",
      domain: "LOCALIZATION",
      rule: "When developing e-commerce checkout for the Philippines market, always include GCash, Maya, QR Ph, and Cash on Delivery (COD) as primary options alongside cards, and pre-fill phone number fields with Philippines format (+63 / 09XX).",
      symptom: "US/Western-centric payment options (Stripe Card only, Apple Pay) fail to meet local conversion expectations",
      rootCause: "The predominant payment rail in the Philippines is digital mobile wallets (GCash, Maya, GrabPay) and Cash on Delivery (COD) / QR Ph",
      tags: ["ecommerce", "payments", "philippines", "gcash", "maya", "localization", "checkout", "forms"],
      severity: "MEDIUM",
      frequency: 1
    },
    {
      id: "MEM-005",
      domain: "CLI-SHELL",
      rule: "On Windows PowerShell environments, never nest double-quotes inside double-quoted command strings. Always pass arguments directly to Python executables, invoke dedicated script files, or escape with backticks (`\") if inline string evaluation is unavoidable.",
      symptom: "PowerShell command fails with 'TerminatorExpectedAtEndOfString' or parser quotation syntax error",
      rootCause: "Passing nested double quotes inside 'powershell -Command \"...\"' triggers premature string termination in Windows PowerShell parser",
      tags: ["cli", "powershell", "windows", "terminal", "shell", "escaping", "scripting"],
      severity: "MEDIUM",
      frequency: 2
    },
    {
      id: "MEM-006",
      domain: "WINDOWS-PYTHON",
      rule: "In Python CLI scripts on Windows, always wrap stdout with sys.stdout.reconfigure(encoding='utf-8') or use ASCII status badges to prevent cp1252 charmap encoding crashes.",
      symptom: "UnicodeEncodeError: 'charmap' codec can't encode character: character maps to <undefined>",
      rootCause: "Default Windows console stdout uses legacy code page (cp1252) which lacks glyphs for modern Unicode and emoji characters",
      tags: ["windows", "python", "unicode", "charmap", "cp1252", "terminal", "cli", "encoding"],
      severity: "HIGH",
      frequency: 1
    },
    {
      id: "MEM-007",
      domain: "DEPLOYMENT-WORKFLOW",
      rule: "Always deploy and update portfolio and web projects by committing/pushing to GitHub rather than uploading directly to Netlify. Netlify automatically listens to the GitHub repository and deploys the latest commit.",
      symptom: "Manual Netlify drag-and-drop or direct CLI deployments causing out-of-sync git trees, race conditions, or uncommitted code drift",
      rootCause: "Bypassing Git source control leads to untracked deployment state and breaks continuous integration version pinning",
      tags: ["netlify", "deployment", "git", "github", "ci-cd", "automation", "workflow", "pipeline"],
      severity: "HIGH",
      frequency: 3
    },
    {
      id: "MEM-008",
      domain: "DOCUMENT-PROCESSING",
      rule: "Never terminate cover letter parsing on contact lines containing portfolio URLs; only terminate on major section headers.",
      symptom: "Cover letter generator prematurely truncating body text whenever an email or portfolio URL appears",
      rootCause: "Regex delimiter was matching generic URL patterns as document terminators instead of structural section markdown headers",
      tags: ["parsing", "regex", "cover-letter", "resume", "pdf", "markdown", "document"],
      severity: "MEDIUM",
      frequency: 2
    },
    {
      id: "MEM-009",
      domain: "API-RESILIENCY",
      rule: "Always implement exponential backoff retry (sleep 2-4s) and multi-model rotation pool across both Groq and local Ollama.",
      symptom: "HTTP 429 Too Many Requests rate-limit exceptions crashing async Discord agent event loops during concurrent burst prompts",
      rootCause: "Burst multi-agent invocations exceeded cloud API rate limits without a graceful retry or fallback tier",
      tags: ["api", "groq", "ratelimit", "backoff", "resilience", "retry", "concurrency", "llm", "agents"],
      severity: "CRITICAL",
      frequency: 4
    },
    {
      id: "MEM-010",
      domain: "RESUME-WRITING",
      rule: "Always include quantifiable percentages, latency benchmarks, or dollar amounts in resume bullet points.",
      symptom: "Vague, subjective resume bullet points failing ATS semantic parsers and technical hiring manager screens",
      rootCause: "Describing job responsibilities instead of measurable business outcomes and verified engineering metrics",
      tags: ["resume", "ats", "career", "metrics", "quantifiable", "writing", "benchmarks", "numbers"],
      severity: "HIGH",
      frequency: 2
    }
  ];

  const STOPWORDS = new Set(["a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "with", "by", "is", "are", "was", "it", "its", "of", "that", "this", "do", "how", "what", "why", "when", "where"]);

  function tokenize(str) {
    return (str || "").toLowerCase()
      .replace(/[^a-z0-9\-_ ]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 1 && !STOPWORDS.has(w));
  }

  function scoreMemory(mem, queryTokens) {
    if (!queryTokens.length) return 0;
    let score = 0;
    const weights = { tags: 3.0, rule: 2.0, symptom: 2.0, trigger: 2.0, domain: 2.0 };

    const memTokens = {
      tags: (mem.tags || []).join(" ").toLowerCase(),
      rule: (mem.rule || "").toLowerCase(),
      symptom: (mem.symptom || "").toLowerCase(),
      trigger: (mem.trigger || "").toLowerCase(),
      domain: (mem.domain || "").toLowerCase()
    };

    queryTokens.forEach(q => {
      for (let f in weights) {
        if (memTokens[f] && memTokens[f].includes(q)) {
          score += weights[f];
        }
      }
    });

    const sevMult = { critical: 1.4, high: 1.25, medium: 1.0, low: 0.85 }[mem.severity.toLowerCase()] || 1.0;
    const freqMult = 1.0 + Math.min(0.5, (mem.frequency - 1) * 0.1);
    return score * sevMult * freqMult;
  }

  function runRecall(query) {
    const queryTokens = tokenize(query);
    const outputEl = document.getElementById('demo-output');
    if (!queryTokens.length) {
      outputEl.innerHTML = '<span class="u-c-gray-400">Please enter a search term above...</span>';
      return;
    }

    const scored = MEMORIES.map(m => ({ mem: m, score: scoreMemory(m, queryTokens) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    if (!scored.length) {
      // The query is typed by the visitor: text, never HTML (Codex 5A A6).
      const ok = document.createElement('span');
      ok.className = 'u-c-green-400';
      ok.textContent = `[OK] Zero past failure patterns or anti-patterns matched for "${query}".`;
      outputEl.replaceChildren(ok, '\nSafe to proceed with implementation!');
      return;
    }

    let out = `## ⚡ MATCHING LESSONS (checked before the task)\nMatched ${scored.length} lesson(s) for query: "${query}"\n\n`;

    scored.slice(0, 3).forEach((item, idx) => {
      const m = item.mem;
      out += `### [${m.id}] ${m.domain} (Relevance Score: ${item.score.toFixed(2)})\n`;
      out += `• MANDATORY RULE: ${m.rule}\n`;
      out += `• AVOIDED SYMPTOM: ${m.symptom}\n`;
      out += `• KEYWORDS: ${m.tags.join(', ')}\n\n`;
    });

    outputEl.innerText = out;
  }

  const input = document.getElementById('demo-query-input');
  const btn = document.getElementById('demo-run-btn');

  if (btn && input) {
    btn.addEventListener('click', () => runRecall(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runRecall(input.value);
    });

    document.querySelectorAll('.memory-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-query');
        input.value = q;
        runRecall(q);
      });
    });

    // Run initial default
    runRecall(input.value);
  }
})();
