"use client";

/*
 * BentoShipctl — "Live Status" archetype.
 * Deploy progress bar that loops; status pill morphs through stages with
 * spring physics. Notification badge pops in on "live" with overshoot.
 */

import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket, GitBranch, CheckCircle } from "@phosphor-icons/react/dist/ssr";

type Stage = "pulling" | "building" | "deploying" | "live";

const stages: { id: Stage; label: string; pct: number; ms: number }[] = [
  { id: "pulling",   label: "fetching branch",  pct: 18, ms: 1100 },
  { id: "building",  label: "build · 14 layers", pct: 62, ms: 1700 },
  { id: "deploying", label: "deploying · us-east",  pct: 86, ms: 1300 },
  { id: "live",      label: "live · 47s total",   pct: 100, ms: 2400 },
];

const BentoShipctl = memo(function BentoShipctl() {
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setStageIdx((i) => (i + 1) % stages.length);
    }, stages[stageIdx].ms);
    return () => clearTimeout(t);
  }, [stageIdx]);

  const stage = stages[stageIdx];
  const isLive = stage.id === "live";

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 rounded-[2rem] bg-bg-elev/50 ring-1 ring-line/40" />
      <div className="relative flex h-full flex-col gap-4 rounded-[2rem] border border-line/70 bg-bg-card/80 p-6 sm:p-7">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="flex items-center gap-2">
            <GitBranch size={11} weight="bold" />
            feat/agent-retries
          </span>
          <AnimatePresence>
            {isLive && (
              <motion.span
                key="live-badge"
                initial={{ opacity: 0, scale: 0.6, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
                className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-accent-ink"
              >
                <CheckCircle size={10} weight="fill" />
                live
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="font-mono text-[12.5px] text-fg-mute">
            <span className="text-accent">{">"}</span> shipctl deploy ./
          </div>

          {/* progress bar */}
          <div className="relative h-1.5 overflow-hidden rounded-full bg-bg/80">
            <motion.div
              animate={{ width: `${stage.pct}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="absolute inset-y-0 left-0 rounded-full bg-accent"
            />
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <span className="shimmer-bar absolute inset-0" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em]"
            >
              <span className="text-fg-mute">{stage.label}</span>
              <span className="text-fg-dim">{stage.pct}%</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 border-t border-line/60 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
          <Rocket size={11} weight="bold" />
          ephemeral env · auto-teardown 24h
        </div>
      </div>
    </div>
  );
});

export default BentoShipctl;
