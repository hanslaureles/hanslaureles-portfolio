import type { Metadata } from 'next';
export type MenuLink = { href: string; label: string; className?: string; target?: string; rel?: string };

export const cases: { slug: string; title: string; type: string; category: 'AI' | 'Web' | 'Mobile'; metadata: Metadata; mobileLinks: MenuLink[] }[] = [
  {
    "slug": "vellum",
    "title": "Vellum",
    "type": "Case Study",
    "category": "Mobile",
    "metadata": {
      "title": "Vellum — Mindful Mobile UX/UI Case Study · Hans Aaron Laureles",
      "description": "Case study on Vellum — a mindful mental wellness mobile app concept designed in Figma to help users reflect through journaling and gentle, low-pressure interactions.",
      "alternates": {
        "canonical": "https://hanslaureles.vercel.app/case-vellum.html"
      },
      "openGraph": {
        "type": "article",
        "url": "https://hanslaureles.vercel.app/case-vellum.html",
        "title": "Vellum — Mindful Mobile UX/UI Concept Case Study",
        "description": "Mindful mental wellness mobile app concept designed in Figma to help users reflect through ambient journaling and gentle, low-pressure interactions.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/vellum-mobile-app-vellum-mockup.3632e9ed.jpg"
        ]
      },
      "twitter": {
        "card": "summary_large_image",
        "title": "Vellum — Mindful Mobile UX/UI Concept Case Study",
        "description": "Mindful mental wellness mobile app concept designed in Figma to help users reflect through ambient journaling and gentle, low-pressure interactions.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/vellum-mobile-app-vellum-mockup.3632e9ed.jpg"
        ]
      }
    },
    "mobileLinks": [
      {
        "href": "index.html",
        "label": "Selected Work"
      },
      {
        "href": "about.html",
        "label": "About Me"
      },
      {
        "href": "case-lsfm.html",
        "label": "Flagship: LSFM AI HQ"
      },
      {
        "href": "Hans_Laureles_Resume.pdf",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "Resume (PDF) ↗"
      },
      {
        "href": "https://github.com/hanslaureles",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "GitHub Profile ↗"
      }
    ]
  },
  {
    "slug": "fintrack",
    "title": "FinTrack App",
    "type": "Case Study",
    "category": "Mobile",
    "metadata": {
      "title": "FinTrack App — Case Study · Hans Aaron Laureles",
      "description": "Case study on FinTrack — a minimalist personal finance mobile application concept designed to help young professionals understand spending patterns through clear visual hierarchy.",
      "alternates": {
        "canonical": "https://hanslaureles.vercel.app/case-fintrack.html"
      },
      "openGraph": {
        "type": "article",
        "url": "https://hanslaureles.vercel.app/case-fintrack.html",
        "title": "FinTrack — Personal Finance UX Flow Case Study",
        "description": "A budgeting app concept in Figma: clear visual hierarchy, a 2-tap expense flow and suggested categories.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/fintrack-mobile-app-fintrack-mockup.48bd6584.jpg"
        ]
      },
      "twitter": {
        "card": "summary_large_image",
        "title": "FinTrack — Personal Finance UX Flow Case Study",
        "description": "A budgeting app concept in Figma: clear visual hierarchy, a 2-tap expense flow and suggested categories.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/fintrack-mobile-app-fintrack-mockup.48bd6584.jpg"
        ]
      }
    },
    "mobileLinks": [
      {
        "href": "index.html",
        "label": "Selected Work"
      },
      {
        "href": "about.html",
        "label": "About Me"
      },
      {
        "href": "case-lsfm.html",
        "label": "Flagship: LSFM AI HQ"
      },
      {
        "href": "Hans_Laureles_Resume.pdf",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "Resume (PDF) ↗"
      },
      {
        "href": "https://github.com/hanslaureles",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "GitHub Profile ↗"
      }
    ]
  },
  {
    "slug": "lumina",
    "title": "Lumina Analytics",
    "type": "Case Study",
    "category": "Web",
    "metadata": {
      "title": "Lumina Analytics — Case Study · Hans Aaron Laureles",
      "description": "Case study on Lumina: a study and focus dashboard for students, designed in Figma and built in React, TypeScript and Chart.js.",
      "alternates": {
        "canonical": "https://hanslaureles.vercel.app/case-lumina.html"
      },
      "openGraph": {
        "type": "article",
        "url": "https://hanslaureles.vercel.app/case-lumina.html",
        "title": "Lumina Analytics — Study & Focus Dashboard Case Study",
        "description": "A study and focus dashboard for students, designed in Figma and built in React, TypeScript and Chart.js.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/lumina-website-lumina-mockup.7cc30dea.jpg"
        ]
      },
      "twitter": {
        "card": "summary_large_image",
        "title": "Lumina Analytics — Study & Focus Dashboard Case Study",
        "description": "A study and focus dashboard for students, designed in Figma and built in React, TypeScript and Chart.js.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/lumina-website-lumina-mockup.7cc30dea.jpg"
        ]
      }
    },
    "mobileLinks": [
      {
        "href": "index.html",
        "label": "Selected Work"
      },
      {
        "href": "about.html",
        "label": "About Me"
      },
      {
        "href": "case-lsfm.html",
        "label": "Flagship: LSFM AI HQ"
      },
      {
        "href": "Hans_Laureles_Resume.pdf",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "Resume (PDF) ↗"
      },
      {
        "href": "https://github.com/hanslaureles",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "GitHub Profile ↗"
      }
    ]
  },
  {
    "slug": "aura",
    "title": "Aura Coffee & Kitchen",
    "type": "Case Study",
    "category": "Web",
    "metadata": {
      "title": "Aura Coffee & Kitchen — Case Study · Hans Aaron Laureles",
      "description": "Case study on Aura Coffee & Kitchen — designing a warm artisanal coffeehouse e-commerce experience with bespoke drink customization, dynamic bag drawer, and 1-page Philippine express checkout.",
      "alternates": {
        "canonical": "https://hanslaureles.vercel.app/case-aura.html"
      },
      "openGraph": {
        "type": "article",
        "url": "https://hanslaureles.vercel.app/case-aura.html",
        "title": "Aura Coffee & Kitchen — Artisanal Specialty Commerce Case Study",
        "description": "A warm coffee-shop store demo: customise your drink, watch your free-delivery progress, and check out on one page.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/aura-website-aura-mockup.d7fe7f88.jpg"
        ]
      },
      "twitter": {
        "card": "summary_large_image",
        "title": "Aura Coffee & Kitchen — Artisanal Specialty Commerce Case Study",
        "description": "A warm coffee-shop store demo: customise your drink, watch your free-delivery progress, and check out on one page.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/aura-website-aura-mockup.d7fe7f88.jpg"
        ]
      }
    },
    "mobileLinks": [
      {
        "href": "index.html",
        "label": "Selected Work"
      },
      {
        "href": "about.html",
        "label": "About Me"
      },
      {
        "href": "case-lsfm.html",
        "label": "Flagship: LSFM AI HQ"
      },
      {
        "href": "Hans_Laureles_Resume.pdf",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "Resume (PDF) ↗"
      },
      {
        "href": "https://github.com/hanslaureles",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "GitHub Profile ↗"
      }
    ]
  },
  {
    "slug": "memory",
    "title": "Cognitive Memory Core",
    "type": "Case Study",
    "category": "AI",
    "metadata": {
      "title": "Cognitive Memory Core — Case Study · Hans Aaron Laureles",
      "description": "Case study on Memory Core, a lessons-learned memory for AI coding assistants: it stores past mistakes as lessons, finds the right one with BM25 before each task, and compiles repeated lessons into rules. Pure Python, no dependencies.",
      "alternates": {
        "canonical": "https://hanslaureles.vercel.app/case-memory.html"
      },
      "openGraph": {
        "type": "article",
        "url": "https://hanslaureles.vercel.app/case-memory.html",
        "title": "Cognitive Memory Core — A Lessons-Learned Memory for AI Coding Assistants",
        "description": "A lessons-learned memory for AI coding assistants: BM25 keyword search over past mistakes, in pure Python with zero dependencies.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/memory-core-memory-mockup.8a710b82.jpg"
        ]
      },
      "twitter": {
        "card": "summary_large_image",
        "title": "Cognitive Memory Core — A Lessons-Learned Memory for AI Coding Assistants",
        "description": "A lessons-learned memory for AI coding assistants: BM25 keyword search over past mistakes, in pure Python with zero dependencies.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/memory-core-memory-mockup.8a710b82.jpg"
        ]
      }
    },
    "mobileLinks": [
      {
        "href": "index.html",
        "label": "Selected Work"
      },
      {
        "href": "about.html",
        "label": "About Me"
      },
      {
        "href": "case-lsfm.html",
        "label": "Flagship: LSFM AI HQ"
      },
      {
        "href": "case-memory.html",
        "className": "active",
        "label": "Memory Core"
      },
      {
        "href": "Hans_Laureles_Resume.pdf",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "Resume (PDF) ↗"
      },
      {
        "href": "https://github.com/hanslaureles",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "GitHub Profile ↗"
      }
    ]
  },
  {
    "slug": "ciel",
    "title": "Manas: Ciel",
    "type": "Case Study",
    "category": "AI",
    "metadata": {
      "title": "Manas: Ciel — Case Study · Hans Aaron Laureles",
      "description": "Case study on Manas: Ciel, a bilingual voice assistant for my dev workstation: Groq Whisper speech-to-text, a custom FFmpeg voice filter, reads and writes my Obsidian notes, and hands tasks to five AI agents.",
      "alternates": {
        "canonical": "https://hanslaureles.vercel.app/case-ciel.html"
      },
      "openGraph": {
        "type": "article",
        "url": "https://hanslaureles.vercel.app/case-ciel.html",
        "title": "Manas: Ciel — Bilingual Voice Assistant Case Study",
        "description": "Bilingual voice assistant with Groq Whisper speech-to-text, a custom voice filter, live weather, web search, and read/write access to my Obsidian notes.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/ciel-ciel-mockup.76ad2967.jpg"
        ]
      },
      "twitter": {
        "card": "summary_large_image",
        "title": "Manas: Ciel — Bilingual Voice Assistant Case Study",
        "description": "Bilingual voice assistant with Groq Whisper speech-to-text, a custom voice filter, live weather, web search, and read/write access to my Obsidian notes.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/ciel-ciel-mockup.76ad2967.jpg"
        ]
      }
    },
    "mobileLinks": [
      {
        "href": "index.html",
        "label": "Selected Work"
      },
      {
        "href": "#",
        "className": "open-sakura-btn u-c-tone-pink u-fw-600",
        "label": "🌸 Ask Sakura (AI Copilot)"
      },
      {
        "href": "about.html",
        "label": "About Me"
      },
      {
        "href": "case-ciel.html",
        "className": "active u-c-tone-amber u-fw-600",
        "label": "✦ Manas: Ciel"
      },
      {
        "href": "case-lsfm.html",
        "label": "LSFM AI HQ"
      },
      {
        "href": "case-memory.html",
        "label": "Memory Core"
      },
      {
        "href": "Hans_Laureles_Resume.pdf",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "Resume (PDF) ↗"
      },
      {
        "href": "https://github.com/hanslaureles",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "GitHub Profile ↗"
      }
    ]
  },
  {
    "slug": "lsfm",
    "title": "LSFM AI HQ",
    "type": "Case Study",
    "category": "AI",
    "metadata": {
      "title": "LSFM AI HQ — Case Study · Hans Aaron Laureles",
      "description": "Case study on LSFM AI HQ — an autonomous 5-agent operations platform orchestrating Discord Gateway streaming, multi-provider LLM routing (Groq + Gemini, with an optional local Ollama mode on an AMD RX 6600 XT), and programmatic Google Workspace APIs.",
      "alternates": {
        "canonical": "https://hanslaureles.vercel.app/case-lsfm.html"
      },
      "openGraph": {
        "type": "article",
        "url": "https://hanslaureles.vercel.app/case-lsfm.html",
        "title": "LSFM AI HQ — Multi-Agent System Case Study",
        "description": "Autonomous 5-agent operations platform orchestrating Discord Gateway streaming, multi-provider LLM routing (Groq + Gemini, optional local Ollama), and automated tool pipelines.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/lsfm-hq-lsfm-hq-mockup.50a40e3c.jpg"
        ]
      },
      "twitter": {
        "card": "summary_large_image",
        "title": "LSFM AI HQ — Multi-Agent System Case Study",
        "description": "Autonomous 5-agent operations platform orchestrating Discord Gateway streaming, multi-provider LLM routing (Groq + Gemini, optional local Ollama), and automated tool pipelines.",
        "images": [
          "https://hanslaureles.vercel.app/images/og/lsfm-hq-lsfm-hq-mockup.50a40e3c.jpg"
        ]
      }
    },
    "mobileLinks": [
      {
        "href": "index.html",
        "label": "Selected Work"
      },
      {
        "href": "about.html",
        "label": "About Me"
      },
      {
        "href": "case-lsfm.html",
        "className": "active",
        "label": "Flagship: LSFM AI HQ"
      },
      {
        "href": "Hans_Laureles_Resume.pdf",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "Resume (PDF) ↗"
      },
      {
        "href": "https://github.com/hanslaureles",
        "target": "_blank",
        "rel": "noopener noreferrer",
        "label": "GitHub Profile ↗"
      }
    ]
  }
];
