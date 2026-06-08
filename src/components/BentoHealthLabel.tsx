"use client";

import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Barcode, ShieldCheck, ShieldWarning, Shield } from "@phosphor-icons/react/dist/ssr";

type Rating = { id: string; name: string; score: number; color: string };

const ratings: Rating[] = [
  { id: "r1", name: "Protein Bar X", score: 82, color: "text-green-400" },
  { id: "r2", name: "Soda Classic", score: 24, color: "text-red-400" },
  { id: "r3", name: "Organic Juice", score: 71, color: "text-green-400" },
  { id: "r4", name: "Chips Flame", score: 18, color: "text-red-400" },
];

const BentoHealthLabel = memo(function BentoHealthLabel() {
  const [active, setActive] = useState(0);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setScanning(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % ratings.length);
        setScanning(false);
      }, 700);
    }, 2400);
    return () => clearInterval(i);
  }, []);

  const current = ratings[active];
  const ScoreIcon = current.score >= 60 ? ShieldCheck : current.score >= 40 ? Shield : ShieldWarning;

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 rounded-[2rem] bg-bg-elev/50 ring-1 ring-line/40" />
      <div className="relative flex h-full flex-col rounded-[2rem] border border-line/70 bg-bg-card/80 p-6 sm:p-7">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="flex items-center gap-2">
            <Barcode size={11} weight="bold" />
            health label
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${scanning ? "bg-yellow-400 animate-pulse" : "bg-accent"}`} />
            {scanning ? "scanning" : "ready"}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3"
            >
              <ScoreIcon size={48} weight="fill" className={current.color} />
              <span className="font-display text-3xl font-bold tracking-tight text-fg">
                {current.score}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
                / 100 health score
              </span>
            </motion.div>
          </AnimatePresence>
          <span className="font-mono text-[11px] text-fg-mute">{current.name}</span>
        </div>
      </div>
    </div>
  );
});

export default BentoHealthLabel;
