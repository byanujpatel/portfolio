/*
 * Groq client. Singleton, server-only.
 * Keep this file out of any "use client" boundary.
 */

import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.warn("[groq] GROQ_API_KEY not set; /api/ask will degrade.");
}

let _client: Groq | null = null;

export function groq(): Groq {
  if (!_client) {
    _client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _client;
}

/* Default model — OpenAI's open-source GPT-OSS, served by Groq.
   120B flagship, ~250ms TTFT. This voice represents Anuj in 3-second
   recruiter reads; quality beats latency. Swap to `openai/gpt-oss-20b`
   if you need ~2x speed. */
export const MODEL = "openai/gpt-oss-120b";
