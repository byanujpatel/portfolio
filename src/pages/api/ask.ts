import type { APIRoute } from "astro";
import { profile, projects, stack, valueProps } from "@/data/portfolio";

export const prerender = false;

const MODEL = "openai/gpt-oss-120b";

const knowledgeBase = `
ABOUT
- Name: ${profile.name}
- Role: ${profile.role}
- Location: ${profile.location}
- Status: ${profile.status}
- Email: ${profile.email}
- Positioning: ${profile.headline} ${profile.subhead}

VALUE
${valueProps.map((item) => `- ${item.label}: ${item.text}`).join("\n")}

PROJECTS
${projects
  .map(
    (project) =>
      `- ${project.name}: ${project.type}. Problem: ${project.problem} Solution: ${project.solution} Stack: ${project.stack.join(", ")}. Signal: ${project.signal}. Links: ${project.links.map((link) => `${link.label} ${link.href}`).join(", ")}.`,
  )
  .join("\n")}

STACK
${stack.map((group) => `- ${group.group}: ${group.tools.join(", ")}`).join("\n")}
`.trim();

function fallbackAnswer(question: string) {
  const lower = question.toLowerCase();

  if (
    lower.includes("write code") ||
    lower.includes("sum function") ||
    lower.includes("python function") ||
    lower.includes("javascript") ||
    lower.includes("leetcode")
  ) {
    return "This agent is for Anuj's portfolio: fit, projects, stack, and availability. Ask it why Anuj fits an applied AI or backend role.";
  }

  if (lower.includes("founder") || lower.includes("hire")) {
    return "Anuj fits founder-led teams that need AI MVPs shipped fast: UX, APIs, LLM calls, and working demos.";
  }

  if (lower.includes("trend") || lower.includes("crypto") || lower.includes("youtube")) {
    return "TrendChain AI: YouTube, Hacker News, CoinGecko, and news data -> viral crypto content ideas.";
  }

  if (lower.includes("content") || lower.includes("repurpos")) {
    return "Content Repurposing Engine: docs, URLs, and PDFs -> platform-ready drafts in under 10 seconds.";
  }

  if (lower.includes("health") || lower.includes("label")) {
    return "Health Label: barcode or nutrition label -> simple health score.";
  }

  if (lower.includes("project") || lower.includes("strongest")) {
    return "Best signals: Content Repurposing Engine, TrendChain AI, Health Label. Pattern: AI workflow + backend + usable product.";
  }

  if (lower.includes("backend") || lower.includes("full")) {
    return "Backend-leaning full-stack: Python, FastAPI, APIs, LLM workflows, and clean product UI.";
  }

  return "Anuj builds applied AI products: LLM apps, FastAPI backends, agents, and full-stack MVPs.";
}

export const POST: APIRoute = async ({ request }) => {
  let question = "";

  try {
    const body = await request.json();
    question = String(body?.question || "").trim();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!question) {
    return Response.json({ error: "Ask a question first." }, { status: 400 });
  }

  if (question.length > 600) {
    return Response.json({ error: "Keep the question under 600 characters." }, { status: 413 });
  }

  const apiKey = import.meta.env.GROQ_API_KEY || process.env.GROQ_API_KEY;

  if (!apiKey) {
    return Response.json({ answer: fallbackAnswer(question), mode: "fallback" });
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.35,
        max_completion_tokens: 220,
        messages: [
          {
            role: "system",
            content: `You are the portfolio agent for ${profile.name}. Answer visitors who are deciding whether to hire or contact him.

Rules:
- Speak in third person about Anuj.
- Be direct, specific, and plain.
- Use only the knowledge base.
- Keep answers under 28 words.
- If the knowledge base does not answer it, say that and suggest emailing ${profile.email}.
- Do not answer coding, homework, or general AI questions.
- No corporate fluff.

Knowledge base:
${knowledgeBase}`,
          },
          { role: "user", content: question },
        ],
      }),
    });

    if (!groqResponse.ok) {
      return Response.json({ answer: fallbackAnswer(question), mode: "fallback" });
    }

    const data = await groqResponse.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    return Response.json({
      answer: answer || fallbackAnswer(question),
      mode: answer ? "live" : "fallback",
    });
  } catch {
    return Response.json({ answer: fallbackAnswer(question), mode: "fallback" });
  }
};
