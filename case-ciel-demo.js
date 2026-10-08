// case-ciel.html: voice demo chips (fixed sample replies).
// Moved out of the page for the CSP (Phase 5A): script-src allows no inline script.
// Interactive Simulator Logic for Ciel Case Study
(function() {
  const chips = document.querySelectorAll('.ciel-chip');
  const output = document.getElementById('ciel-demo-output');
  const dspBadge = document.getElementById('demoDspBadge');
  const bars = document.querySelectorAll('.ciel-wave-bar');

  const RESPONSES = {
    squad: {
      dsp: "⚡ AUDIO PIPELINE: Groq Whisper Turbo → Multi-Agent System Router → Edge-TTS + voice filter",
      text: "[CIEL] Delegating to the 5-agent team. Eunchae reports CPU, RAM and disk use; Yunjin scans the portfolio for broken assets; Kazuha lists the current branch and uncommitted files; Sakura pulls today's priorities from the daily log. Summary compiled for you."
    },
    raft: {
      dsp: "⚡ GENERAL KNOWLEDGE mode (Groq qwen3.8-27b) → Direct Synthesis",
      text: "[CIEL] Notice: The Raft consensus algorithm decomposes state machine replication into 3 distinct subproblems: Leader Election, Log Replication, and Safety. Nodes exist as Follower, Candidate, or Leader. When a follower detects a randomized heartbeat timeout (150–300ms), it transitions to Candidate, increments its term, and requests votes. Upon receiving a majority quorum, the node ascends to Leader and begins serving client requests with atomic log append guarantees."
    },
    rules: {
      dsp: "⚡ OBSIDIAN NOTES: Vault Read `03 Knowledge/Learned_Rules.md` → Ciel Synthesizer",
      text: "[CIEL] Accessing Obsidian Learned Rules. 10 rules currently active: Rule MEM-005 enforces avoiding nested double quotes in PowerShell inline scripts; Rule MEM-006 mandates explicit UTF-8 reconfiguration in Windows Python consoles; Rule MEM-007 requires atomic Git commits for build triggers rather than manual asset copying."
    },
    career: {
      dsp: "⚡ OBSIDIAN NOTES: Vault Read `03 Knowledge/Preferences.md` → Ciel Synthesizer",
      text: "[CIEL] Reading your working preferences. Tone: professional but warm, answer first, no filler. Budget: use the hardware you already have before buying anything new. Models: 7B to 9B quantised, to stay inside the RX 6600 XT's 8 GB of VRAM. Deploys: always commit and push to GitHub, never drag and drop. E-commerce demos: GCash, Maya, QR Ph and cash on delivery, with +63 phone numbers."
    },
    vitals: {
      dsp: "⚡ HARDWARE CHECK: psutil → Ciel",
      text: "[CIEL] Hardware check: psutil reads CPU load, RAM used of total, and free space on drive C:, and I read the three figures back in one sentence."
    },
    dispatch: {
      dsp: "⚡ AGENT DISPATCH: JSON plan → agents_needed: ['sakura'] → in-process delegation",
      text: "[CIEL] Task dispatched to Sakura (Coordinator Agent). Sakura is preparing the recruiter briefing with the latest case studies and is ready to answer recruiter questions."
    },
    weather: {
      dsp: "⚡ LIVE WEATHER: wttr.in → Ciel",
      text: "[CIEL] Weather for Cavite / Manila from wttr.in: conditions, temperature and feels-like, humidity, wind speed and direction, UV index, and today's high and low, read back in one sentence."
    },
    search: {
      dsp: "⚡ WEB SEARCH: DuckDuckGo (DDGS) → cited sources",
      text: "[CIEL] Web search done. I pulled the top DuckDuckGo results and cite each source by title and link so you can check them yourself."
    }
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const query = chip.getAttribute('data-query');
      const data = RESPONSES[query] || RESPONSES.squad;

      // Pulse visualizer
      bars.forEach((b, i) => {
        const h = Math.floor(Math.random() * 36) + 12;
        b.style.height = `${h}px`;
      });

      dspBadge.textContent = data.dsp;
      output.innerHTML = `<span class="u-c-amber-400">[PROCESSING...]</span>`;

      setTimeout(() => {
        // Every reply is a fixed example; the tag keeps sample numbers from reading as live telemetry.
        output.innerHTML = `<span class="u-c-amber-400">[CIEL · SAMPLE REPLY]</span> ${data.text.replace('[CIEL] ', '')}`;
      }, 180);
    });
  });
})();
