import { groq, MODEL } from "@/lib/groq";
import { me, projects, rails, receipts, thesis } from "@/lib/content";

/*
 * POST /api/ask
 *
 * Body: { question: string }
 * Returns: text/event-stream of token deltas, terminated by [DONE].
 *
 * The agent persona: a concise stand-in for Anuj. It has the portfolio
 * as ground truth (projects, rails, receipts, thesis) in its system prompt.
 * It never claims to be Anuj himself, but it speaks for him in a tight voice.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const KB = `
ABOUT ANUJ:
- Name: ${me.name}
- Location: ${me.location}
- Status: ${me.status}
- Email: ${me.email}

PROJECTS (shipped, not slideware):
${projects
  .map(
    (p) =>
      `- ${p.name} (${p.kind}, ${p.shipped}). ${p.oneliner} Headline metric: ${p.metric.value} ${p.metric.label}. Stack: ${p.stack.join(", ")}.`,
  )
  .join("\n")}

STACK / OPERATING SYSTEM:
${rails
  .map((r) => `- ${r.name}: ${r.desc} Tools: ${r.tools.join(", ")}.`)
  .join("\n")}

RECEIPTS (recent first):
${receipts.map((r) => `- ${r.date}: ${r.what}`).join("\n")}

THESIS:
${thesis}
`.trim();

const SYSTEM_PROMPT = `You are the portfolio agent for ${me.name}, a backend / AI-native engineer based in ${me.location}, currently open to founding-engineer roles.

YOUR JOB:
Answer visitor questions about Anuj's work, fit, availability, and POV. Visitors are usually recruiters, founders, or fellow engineers vetting him for a role.

VOICE:
- Speak in third person about Anuj ("Anuj built...", "He shipped..."). NEVER pretend to be Anuj himself.
- Concise, specific, confident. Builder energy. No corporate fluff, no "I am an AI", no apologies, no hedging.
- Max 3 short sentences for most answers. 5 sentences only if comparing multiple projects or explaining nuance.
- Cite specific numbers, dates, and project names from the knowledge base when relevant. Never invent metrics.
- If asked something the knowledge base does NOT cover, say so plainly in one sentence and suggest emailing ${me.email}.
- Never use em dashes. Never use the words "elevate", "seamless", "leverage", "unleash", "next-gen", or "synergy".

FORMAT:
- Plain prose. No bullet points unless explicitly asked for a list.
- Lowercase fragments are fine when matching the brand voice.

KNOWLEDGE BASE (ground truth — do not contradict):
${KB}
`;

export async function POST(request: Request) {
  let question: string;
  try {
    const body = await request.json();
    question = (body?.question || "").toString().trim();
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  if (!question) {
    return new Response(JSON.stringify({ error: "missing question" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (question.length > 600) {
    return new Response(JSON.stringify({ error: "question too long" }), {
      status: 413,
      headers: { "content-type": "application/json" },
    });
  }
  if (!process.env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: "agent unavailable" }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await groq().chat.completions.create({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: question },
          ],
          temperature: 0.4,
          max_completion_tokens: 320,
          stream: true,
        });

        for await (const chunk of completion) {
          const raw = chunk.choices?.[0]?.delta?.content;
          if (raw) {
            /* Brand-voice scrubber: em-dashes banned, unicode dashes normalized. */
            const delta = raw
              .replace(/—/g, ", ")
              .replace(/[‐‑–]/g, "-")
              .replace(/\b(elevate|seamless|leverage|unleash|next-gen|synergy)\b/gi, (m) => {
                const subs: Record<string, string> = {
                  elevate: "raise",
                  seamless: "smooth",
                  leverage: "use",
                  unleash: "ship",
                  "next-gen": "modern",
                  synergy: "fit",
                };
                return subs[m.toLowerCase()] ?? m;
              });
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ t: delta })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "unknown";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-store, no-transform",
      "connection": "keep-alive",
      "x-accel-buffering": "no",
    },
  });
}
