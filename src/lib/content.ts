/*
 * Single source of truth for portfolio content.
 * Editing your story = editing this file. No other place stores copy.
 */

export const me = {
  name: "Anuj Patel",
  mark: "AP.",
  handle: "engineer #001",
  location: "India",
  status: "Available · founding eng or freelance",
  email: "anujpatel2899@gmail.com",
  socials: {
    github: "https://github.com/byanujpatel",
    linkedin: "https://linkedin.com/in/byanujpatel",
    twitter: "https://twitter.com/byanujpatel",
    substack: "https://byanujpatel.substack.com",
  },
};

/* Headline. Three lines, the third one carries the brand in accent. */
export const headline: ReadonlyArray<{
  text: string;
  weight: number;
  accent: boolean;
}> = [
  { text: "I build",         weight: 700, accent: false },
  { text: "what decks",      weight: 700, accent: false },
  { text: "promise.",        weight: 800, accent: true  },
];

/* Subline — one breath. YC-tight. */
export const subline =
  "Backend systems and AI agents. Ship before polish.";

/* Auto-cycling prompts in the agent input.
   Real, specific, opinionated — they ARE the value prop on first paint. */
export const samplePrompts = [
  "are you a founding-engineer fit?",
  "what did you ship last?",
  "what's your stack in 2026?",
  "are you open to freelance?",
];

/* Bento proof cards — Fold 2.
   oneliners are outcome-first. Swipe in your real numbers and case details later. */
export type Project = {
  id: string;
  name: string;
  kind: "AI Agent" | "Backend" | "Full-stack" | "Infra";
  oneliner: string;
  metric: { value: string; label: string };
  stack: readonly string[];
  shipped: string;
  href?: string;
};

export const projects: readonly Project[] = [
  {
    id: "content-repurposing-engine",
    name: "Content Repurposing Engine",
    kind: "AI Agent",
    oneliner: "AI-powered platform that transforms any source content—blog, PDF, docx, URL—into platform-optimized variations in under 10 seconds.",
    metric: { value: "<10s", label: "content repurposed" },
    stack: ["Python", "FastAPI", "LLMs"],
    shipped: "2025",
    href: "https://repurposemycontent.streamlit.app", // TODO: add deployed URL
  },
  {
    id: "health-label",
    name: "Health Label",
    kind: "Full-stack",
    oneliner: "Scan barcodes or label text for instant, science-backed health ratings—making smarter choices effortless.",
    metric: { value: "Instant", label: "health ratings" },
    stack: ["Python", "ML", "API"],
    shipped: "2025",
    href: "https://github.com/byanujpatel/HealthLabel", // TODO: add GitHub URL
  },
  {
    id: "alpha-audit",
    name: "Alpha Audit",
    kind: "AI Agent",
    oneliner: "Autonomous corporate integrity auditor—scrapes SEC filings, cross-references live web signals, and calculates a Decoupling Coefficient with screenshot proof.",
    metric: { value: "Auto", label: "integrity audit" },
    stack: ["Python", "Web Scraping", "LLMs"],
    shipped: "2026",
    href: "https://github.com/byanujpatel/AlphaAudit", // TODO: add GitHub URL
  },
];

/* Operating system rails — Fold 3.
   4 tools per rail max. Tighter. */
export const rails = [
  {
    name: "Build",
    desc: "What I reach for first.",
    tools: ["TypeScript", "Go", "Python", "Postgres"],
  },
  {
    name: "Reason",
    desc: "Where the AI work lives.",
    tools: ["GPT-OSS", "Anthropic", "pgvector", "Modal"],
  },
  {
    name: "Ship",
    desc: "How it gets to a user this week.",
    tools: ["Vercel", "Fly.io", "Linear", "Cursor"],
  },
] as const;

/* Receipts — Fold 4. Verb-first, 1 line each. */
export const receipts = [
  { date: "2025", what: "Shipped Content Repurposing Engine. AI-powered content transformation platform." },
  { date: "2025", what: "Built Health Label. Instant science-backed health ratings from barcode scans." },
  { date: "2026", what: "Created Alpha Audit. Autonomous corporate integrity auditor with SEC cross-referencing." },
];

/* Thesis — Fold 5. Two sentences. The founder bait. */
export const thesis = `Most AI work in 2026 is still a demo dressed as a product. The interesting work is the part nobody posts about: the retry logic, the idempotency, the cache that survives a bad deploy. I want to be the engineer you call when the wrapper breaks and there's nothing on Stack Overflow yet.`;

export const handshakeBlurb = "One line. What you're building. I reply in a day.";
