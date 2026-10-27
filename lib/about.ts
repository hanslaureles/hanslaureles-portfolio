import type { MenuLink } from './cases';

export const aboutLinks: MenuLink[] = [
  { href: '/index.html', label: 'Selected Work' },
  {
    href: '#',
    label: '🌸 Ask Sakura (AI Copilot)',
    className: 'open-sakura-btn',
  },
  { href: '/about.html', label: 'About Me', className: 'active' },
  { href: '/case-lsfm.html', label: 'LSFM AI HQ' },
  { href: '/case-memory.html', label: 'Memory Core' },
  {
    href: '/aura-store/index.html',
    label: 'Aura Coffee (Live Store)',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    href: '/Hans_Laureles_Resume.pdf',
    label: 'Resume (PDF)',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    href: 'https://github.com/hanslaureles',
    label: 'GitHub Profile',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

export const experience = [
  {
    title: 'UI/UX & Frontend Engineer Intern',
    company:
      'ROC.PH Digital Marketing Services · General Trias, Cavite, Philippines',
    period: 'JUN 2024 – AUG 2024',
    color: 'var(--accent)',
    bullets: [
      'Designed web pages in Figma that work on any screen size, following established usability guidelines and a shared design system.',
      'Turned those designs into accessible HTML, CSS, Tailwind and React for live client websites.',
      'Worked in agile sprints with daily standups, code reviews, Git, and quick rounds of client feedback.',
    ],
  },
  {
    title: 'Creator & AI Systems Architect — Manas: Ciel',
    company:
      'Autonomous Voice Copilot & Real-Time Cognitive HUD · Solo Workstation Project',
    period: '2026 – PRESENT',
    color: '#F59E0B',
    bullets: [
      'Built a voice assistant you talk to out loud: it turns speech into text (Groq Whisper), answers in Japanese and English, and speaks with a custom voice filter.',
      'Ciel can check the weather, search the web, remember the recent conversation, and read and write my Obsidian notes.',
      "Built an animated web dashboard whose rings and waveform move with Ciel's voice.",
    ],
  },
  {
    title: 'Developer & Creator — LSFM AI HQ',
    company:
      'Autonomous Multi-Agent Operations Platform · Solo Workstation Project',
    period: '2025 – PRESENT',
    bullets: [
      'Built LSFM AI HQ, a 5-agent team on Discord where each agent has one job: daily briefings, email triage, job applications, design reviews, and code checks.',
      'The agents use cloud AI (Groq and Gemini, each a backup for the other) or a local model on my own computer for private work, and I choose the mode.',
      'Built the tools they use: a resume builder that makes a one-page PDF for applicant tracking systems, and an email sorter that labels my inbox and archives clutter without deleting anything.',
    ],
  },
  {
    title: 'Developer — Cognitive Memory Core',
    company:
      'Lessons-Learned Memory for AI Coding Assistants · Open-Source Project',
    period: '2026',
    bullets: [
      'Built a memory for AI coding assistants in plain Python, with no outside packages to install.',
      'Before each coding task, it searches past lessons by keyword and shows the ones that apply.',
      'Each mistake is saved as a lesson (what happened, why, and the rule for next time), so the assistant is less likely to repeat it.',
    ],
  },
  {
    title: 'Lead Mobile Developer & Systems Builder — Capstone: Patriot',
    company: 'DLSU–Dasmariñas · Three-Person BS CS Capstone',
    period: '2023 – 2025',
    bullets: [
      'Led mobile development of a React Native and TypeScript app for anonymous, keyword-matched student chats.',
      'Integrated AWS Lambda, DynamoDB and Cognito, with Redis-backed keyword lookup for matchmaking.',
      'Contributed to a beta capstone evaluated through app demonstrations and questionnaires with 50 campus participants.',
    ],
  },
];

export const milestones = [
  {
    type: 'ciel',
    period: '2026 – PRESENT',
    title: 'Creator & AI Architect — Manas: Ciel Voice HUD',
    description:
      'A voice assistant that answers out loud in Japanese and English, with weather, web search and an animated dashboard.',
    bullets: [
      'Custom voice filter on the spoken replies',
      'Live weather and web search',
      "Animated dashboard that moves with Ciel's voice",
    ],
    links: [
      { href: '/case-ciel.html', label: 'Explore Case Study' },
      { href: '/case-ciel.html#simulator', label: 'Launch Simulator' },
    ],
  },
  {
    type: 'lsfm',
    period: '2025 – PRESENT',
    title: 'Creator & Developer — LSFM AI HQ',
    description:
      'A team of five AI helpers on Discord, each with one job: briefings, email, job applications, design reviews and code checks.',
    bullets: [
      'Each agent has its own role and personality',
      'Cloud AI with a backup provider, or a private local model',
      'One-page resume PDFs built for applicant tracking systems',
    ],
    links: [
      { href: '/case-lsfm.html', label: 'Explore Case Study' },
      {
        href: '/Hans_Laureles_Resume.pdf',
        label: 'Resume PDF',
        target: '_blank',
      },
    ],
  },
  {
    type: 'memory',
    period: '2026',
    title: 'Developer — Cognitive Memory Core',
    description:
      'A lessons-learned memory for AI coding assistants: past mistakes are saved as lessons, recalled before each task, and compiled into workspace rules.',
    bullets: [
      'Finds the relevant lessons before each task',
      'Each lesson records what went wrong, why, and the rule for next time',
      'Plain Python, nothing extra to install',
    ],
    links: [{ href: '/case-memory.html', label: 'Explore Case Study' }],
  },
  {
    type: 'patriot',
    period: '2023 – 2025',
    title: 'Lead Mobile Developer — Capstone: Patriot (DLSU-D)',
    description:
      'A three-person capstone: anonymous one-to-one student messaging with keyword-based matching and an AWS backend.',
    bullets: [
      'AWS Lambda, DynamoDB and Cognito integration',
      'Redis-backed keyword lookup for matchmaking',
      'React Native and TypeScript app; beta evaluated by 50 campus participants',
    ],
  },
  {
    type: 'academic',
    period: '2021 – 2025',
    title: 'BS Computer Science — De La Salle University–Dasmariñas',
    description:
      'Completed degree in Computer Science with rigorous focus on foundational computing theory and systems engineering.',
    bullets: [
      'Distributed Systems, Algorithms & Complexities, Human-Computer Interaction',
      'Database Management Systems (SQL/NoSQL) & Object-Oriented Software Architecture',
    ],
  },
  {
    type: 'roc.ph',
    period: 'JUN 2024 – AUG 2024',
    title: 'UI/UX & Frontend Engineer Intern — ROC.ph',
    description:
      'Bridged design specifications and production code for client web applications in Cavite, Philippines.',
    bullets: [
      'Converted Figma component hierarchies into accessible HTML, Tailwind, and React',
      'Collaborated in agile sprint workflows, code reviews, and client revision loops',
      'Delivered responsive client websites across diverse SME businesses',
    ],
  },
];

export const skills = [
  {
    title: 'Applied AI & Agents',
    items: [
      'Multi-Agent Systems',
      'Hybrid Vector RAG (Dense + BM25)',
      'Model Context Protocol (MCP)',
      'LLM Evaluations',
      'Local GPU Inference (Ollama)',
      'Ollama & GGUF Quantization',
      'Structured JSON Schemas',
      'Tool & Function Calling',
      'Hybrid Cloud/Local Routing',
      'Groq & Gemini APIs',
      'Dense & Sparse Embeddings',
      'Persistent Agent Memory',
    ],
  },
  {
    title: 'Systems & Cloud Automation',
    items: [
      'Python (asyncio & OOP)',
      'Google Workspace REST APIs',
      'Headless Chromium / Edge',
      'Discord Gateway API',
      'AWS (Lambda, DynamoDB)',
      'Redis Caching & Queues',
      'Node.js & Express',
      'OAuth2 Credential Flow',
      'Git & CI/CD Pipelines',
    ],
  },
  {
    title: 'Interface Craft & Design',
    items: [
      'React',
      'Next.js (App Router)',
      'TypeScript & ES6+',
      'Design Tokens & CSS Vars',
      'Figma Prototyping',
      'Tailwind CSS',
      'WCAG 2.1 AA Compliance',
      'Information Architecture',
      'Micro-Interactions',
      'Usability Benchmarking',
    ],
  },
];
