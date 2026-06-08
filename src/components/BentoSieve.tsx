"use client";

/*
 * BentoSieve — "Command Input" archetype.
 * RAG query typewriter that cycles through real-looking retrieval queries
 * and shows a "processing" shimmer + top-1 result preview.
 */

import { memo, useEffect, useState } from "react";
import { motion } from "motion/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const queries = [
  {
    q: "find precedent for ssr hydration mismatch in next 16",
    src: "internal docs · turbopack notes",
    score: "0.91",
  },
  {
    q: "summarize last 30d of customer churn signals",
    src: "snowflake · posthog events",
    score: "0.87",
  },
  {
    q: "what changed in deploy 4f2a that broke webhooks",
    src: "git log · sentry traces",
    score: "0.94",
  },
  {
    q: "fastest way to dedupe 8M rows by composite key",
    src: "pgvector · stackoverflow",
    score: "0.83",
  },
];

const BentoSieve = memo(function BentoSieve() {
  const [qIdx, setQIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "thinking" | "answered">("typing");

  const current = queries[qIdx];

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed.length < current.q.length) {
        t = setTimeout(() => setTyped(current.q.slice(0, typed.length + 1)), 32);
      } else {
        t = setTimeout(() => setPhase("thinking"), 220);
      }
    } else if (phase === "thinking") {
      t = setTimeout(() => setPhase("answered"), 850);
    } else {
      t = setTimeout(() => {
        setQIdx((i) => (i + 1) % queries.length);
        setTyped("");
        setPhase("typing");
      }, 2300);
    }
    return () => clearTimeout(t);
  }, [typed, phase, current.q]);

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 rounded-[2rem] bg-bg-elev/50 ring-1 ring-line/40" />
      <div className="relative flex h-full flex-col gap-4 rounded-[2rem] border border-line/70 bg-bg-card/80 p-6 sm:p-7">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="flex items-center gap-2">
            <MagnifyingGlass size={11} weight="bold" />
            retrieval
          </span>
          <span>p95 · 184ms</span>
        </div>

        {/* query bar */}
        <div className="relative overflow-hidden rounded-xl border border-line/60 bg-bg/70 px-3 py-2.5 font-mono text-[12.5px]">
          <span className="text-accent">{">"}</span>{" "}
          <span className="text-fg-mute">{typed}</span>
          {phase === "typing" && <span className="caret" />}
          {phase === "thinking" && (
            <span className="relative ml-1 inline-block h-3 w-3 align-middle">
              <span className="absolute inset-0 rounded-full border border-accent border-t-transparent animate-spin" style={{ animationDuration: "0.9s" }} />
            </span>
          )}
          {/* shimmer when thinking */}
          {phase === "thinking" && (
            <span className="shimmer-bar pointer-events-none absolute inset-0 overflow-hidden" />
          )}
        </div>

        {/* top result */}
        <div className="flex flex-1 flex-col justify-end gap-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">top match</div>
          <motion.div
            key={phase === "answered" ? qIdx : -1}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase === "answered" ? 1 : 0.25, y: phase === "answered" ? 0 : 8 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="rounded-xl border border-line/50 bg-bg/60 p-3"
          >
            <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
              <span>{current.src}</span>
              <span className="rounded-md bg-bg-elev px-1.5 py-0.5 text-accent">
                {current.score}
              </span>
            </div>
            <div className="mt-2 font-display text-[13px] leading-snug text-fg-mute">
              {phase === "answered"
                ? "Use a stable layout id; defer client-only branches behind " +
                  "use-effect; gate hydration with a Suspense boundary."
                : "—"}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export default BentoSieve;
