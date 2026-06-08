"use client";

/*
 * BentoAtlas — "Intelligent List" archetype.
 * A vertical task queue that an AI agent is "prioritizing" in real time.
 * Items shuffle position every few seconds using layoutId for the smooth swap.
 */

import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Circle, ArrowsLeftRight } from "@phosphor-icons/react/dist/ssr";

type Task = {
  id: string;
  text: string;
  weight: number; // higher = more urgent
  status: "queued" | "running" | "done";
};

const seed: Task[] = [
  { id: "t1", text: "retry idempotent webhook dispatch",  weight: 9, status: "running" },
  { id: "t2", text: "rerank top-5 for query #4812",        weight: 7, status: "queued" },
  { id: "t3", text: "summarize incident 24-h timeline",    weight: 6, status: "queued" },
  { id: "t4", text: "flush cold cache for tenant 0x9f",    weight: 5, status: "queued" },
  { id: "t5", text: "trigger replay for failed run",       weight: 4, status: "done" },
];

const BentoAtlas = memo(function BentoAtlas() {
  const [tasks, setTasks] = useState<Task[]>(seed);

  useEffect(() => {
    const i = setInterval(() => {
      setTasks((prev) => {
        const next = prev.map((t) => ({
          ...t,
          weight: Math.max(1, t.weight + (Math.random() < 0.5 ? -1 : 1) * Math.ceil(Math.random() * 2)),
        }));
        // resort by weight desc
        next.sort((a, b) => b.weight - a.weight);
        // mark top one as running, rest queued (except already done)
        return next.map((t, idx) => ({
          ...t,
          status: t.status === "done" ? "done" : idx === 0 ? "running" : "queued",
        }));
      });
    }, 2600);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative h-full">
      {/* card chrome — double-bezel */}
      <div className="absolute inset-0 rounded-[2rem] bg-bg-elev/50 ring-1 ring-line/40" />
      <div className="relative flex h-full flex-col gap-4 rounded-[2rem] border border-line/70 bg-bg-card/80 p-6 sm:p-7">
        {/* mini header inside card */}
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="flex items-center gap-2">
            <ArrowsLeftRight size={11} weight="bold" />
            agent queue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent breathe" />
            live
          </span>
        </div>

        <ol className="relative flex-1 space-y-1.5">
          <AnimatePresence initial={false}>
            {tasks.map((t) => (
              <motion.li
                key={t.id}
                layout
                layoutId={t.id}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="flex items-center gap-3 rounded-xl border border-line/50 bg-bg/60 px-3 py-2.5"
              >
                {t.status === "done" ? (
                  <CheckCircle size={15} weight="fill" className="text-accent" />
                ) : t.status === "running" ? (
                  <span className="relative inline-flex h-3.5 w-3.5">
                    <span className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" style={{ animationDuration: "1.4s" }} />
                  </span>
                ) : (
                  <Circle size={15} weight="regular" className="text-fg-dim" />
                )}
                <span className={`flex-1 truncate font-mono text-[12.5px] ${t.status === "done" ? "text-fg-dim line-through decoration-fg-dim/40" : "text-fg-mute"}`}>
                  {t.text}
                </span>
                <span className="rounded-md bg-bg-elev px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-dim">
                  w·{t.weight}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </div>
  );
});

export default BentoAtlas;
