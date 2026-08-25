export const profile = {
  name: "Anuj Patel",
  initials: "AP",
  role: "Applied AI + Backend Engineer",
  location: "India",
  email: "byanujpatel@gmail.com",
  status: "Open: AI / backend / full-stack",
  headline: "I build AI products",
  subhead: "LLM apps / FastAPI / agents / full-stack MVPs",
  socials: [
    { label: "GitHub", href: "https://github.com/byanujpatel" },
    { label: "LinkedIn", href: "https://linkedin.com/in/byanujpatel" },
    { label: "X", href: "https://x.com/byanujpatel" },
  ],
} as const;

export const audience = [
  "Founders",
  "Startups",
  "AI teams",
] as const;

export const valueProps = [
  {
    label: "Solve",
    text: "Rough idea -> usable product",
  },
  {
    label: "Ship",
    text: "MVP -> demo -> user loop",
  },
  {
    label: "Fit",
    text: "UX + APIs + LLM workflows",
  },
] as const;

export const projects = [
  {
    name: "VANI",
    type: "Voice AI agent",
    problem: "Text-first AI excludes people who prefer to speak — across languages and devices.",
    solution: "Voice-first assistant built on Sarvam AI -> talk, ask, get answers",
    stack: ["Sarvam AI", "Voice", "LLMs", "Python"],
    signal: "Voice-first",
    links: [
      { label: "Demo", href: "https://x.com/byanujpatel/status/2089730103928598667" },
      { label: "GitHub", href: "https://github.com/byanujpatel/Sarvam-AI/tree/main/VANI-Project" },
    ],
  },
  {
    name: "Smriti",
    type: "Voice health companion",
    problem: "Families struggle to track medications, routines, and health updates for loved ones.",
    solution: "Voice-first health memory + companion built for families",
    stack: ["Voice", "Memory", "LLMs", "Python"],
    signal: "Voice + memory",
    links: [
      { label: "Live", href: "https://smriti-health-companion.onrender.com/" },
      { label: "GitHub", href: "https://github.com/byanujpatel/Smriti-Health-Companion" },
    ],
  },
  {
    name: "Content Repurposing Engine",
    type: "AI content engine",
    problem: "Creators waste hours adapting one idea for each platform.",
    solution: "Docs / URLs / PDFs -> content drafts",
    stack: ["Python", "FastAPI", "LLMs", "Streamlit"],
    signal: "<10s loop",
    links: [
      { label: "Live", href: "https://repurposemycontent.streamlit.app" },
      { label: "GitHub", href: "https://github.com/byanujpatel/content-repurposing-engine" },
    ],
  },
  {
    name: "TrendChain AI",
    type: "Crypto trend engine",
    problem: "Crypto creators need timely ideas from noisy live sources.",
    solution: "YouTube / HN / CoinGecko / news -> viral ideas",
    stack: ["Python", "LLMs", "CoinGecko", "HN"],
    signal: "Live signals",
    links: [
      { label: "Live", href: "https://crypto-trend-finder.streamlit.app" },
      { label: "GitHub", href: "https://github.com/byanujpatel/TrendChain-AI/tree/main" },
    ],
  },
] as const;

export const stack = [
  {
    group: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "MERN"],
  },
  {
    group: "Backend",
    tools: ["Node", "Express", "FastAPI", "APIs"],
  },
  {
    group: "AI",
    tools: ["LLMs", "Agents", "Evals", "RAG"],
  },
  {
    group: "Shipping",
    tools: ["Observability", "Vercel", "GitHub", "MVPs"],
  },
] as const;

export const proof = [
  "Ship MVPs",
  "Wire APIs + LLMs",
  "Think product",
] as const;

export const faqs = [
  {
    q: "What role is Anuj best fit for?",
    a: "Applied AI engineer, backend engineer, or full-stack engineer on a product team that needs someone who can turn rough ideas into shipped workflows.",
  },
  {
    q: "Is he only an AI engineer?",
    a: "No. AI is the product layer he is leaning into, but the core strength is backend and full-stack shipping.",
  },
  {
    q: "What kind of problems should I contact him for?",
    a: "LLM apps, API-heavy products, MVPs, internal AI tools, RAG workflows, agent prototypes, and product demos that need to become real.",
  },
  {
    q: "Can you build voice agents with LiveKit and Sarvam AI?",
    a: "Yes. VANI is built on Sarvam AI for multilingual voice, and Smriti is a voice-first health companion. I wire LiveKit realtime pipelines — STT -> LLM -> TTS — into FastAPI backends that handle memory, RAG, and product logic.",
  },
  {
    q: "How much does a voice AI agent cost and how fast can you ship it?",
    a: "Prototype in 5-10 days, production hardening after. Pricing depends on scope: a single voice workflow starts small, with managed hosting and usage-based LLM/voice costs kept transparent. Ask for a 15-min scoping call.",
  },
  {
    q: "Do you work with startups and businesses outside India?",
    a: "Yes. Remote-first — I work with founders, startups and teams globally. Overlap hours, async updates, and shipping a live demo you can share with users, not slides.",
  },
  {
    q: "What makes this portfolio different?",
    a: "It shows the work, the operating style, and the public learning loop in one place instead of hiding behind generic resume language.",
  },
] as const;

export const agentSuggestions = [
  "Why hire Anuj?",
  "Best project?",
  "What can he build?",
] as const;
