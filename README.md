# Anuj Patel Portfolio

Minimal Astro portfolio for applied AI, backend, and full-stack positioning.

## Commands

```bash
npm run dev
npm run build
```

Local dev runs at `http://127.0.0.1:4321/`.

## Content

- Main portfolio copy and project data: `src/data/portfolio.ts`
- One-page site: `src/pages/index.astro`
- Portfolio chatbot endpoint: `src/pages/api/ask.ts`
- Journey and article drafts: `src/content/`

## Chatbot

The chatbot uses `GROQ_API_KEY` on the server when available. If the key is
missing or the model request fails, it returns a safe portfolio-specific
fallback answer so the UI still works.
