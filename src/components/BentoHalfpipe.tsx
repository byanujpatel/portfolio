"use client";

/*
 * BentoHalfpipe — "Wide Data Stream" archetype.
 * Live counter ticks up by realistic event volume; a faint sparkline beats below.
 */

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Pulse } from "@phosphor-icons/react/dist/ssr";

const SPARK_POINTS = 48;

const BentoHalfpipe = memo(function BentoHalfpipe() {
  const [count, setCount] = useState(11_421_904);
  const [spark, setSpark] = useState<number[]>(() =>
    Array.from({ length: SPARK_POINTS }, (_, i) => 30 + Math.sin(i / 3) * 18 + Math.random() * 8),
  );
  const flashRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const i = setInterval(() => {
      const delta = Math.floor(80 + Math.random() * 240);
      setCount((c) => c + delta);
      setSpark((prev) => {
        const next = prev.slice(1);
        next.push(20 + Math.random() * 56);
        return next;
      });
      if (flashRef.current) {
        flashRef.current.style.color = "var(--accent)";
        setTimeout(() => {
          if (flashRef.current) flashRef.current.style.color = "";
        }, 240);
      }
    }, 900);
    return () => clearInterval(i);
  }, []);

  const max = Math.max(...spark, 1);
  const path = spark
    .map((v, i) => {
      const x = (i / (SPARK_POINTS - 1)) * 100;
      const y = 100 - (v / max) * 100;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 rounded-[2rem] bg-bg-elev/50 ring-1 ring-line/40" />
      <div className="relative flex h-full flex-col gap-5 rounded-[2rem] border border-line/70 bg-bg-card/80 p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="flex items-center gap-2">
            <Pulse size={11} weight="bold" />
            events ingested · last 24h
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent breathe" />
            streaming
          </span>
        </div>

        <div className="flex flex-1 flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <motion.div
              key={Math.floor(count / 1000)}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-fg"
            >
              <span ref={flashRef} className="transition-colors duration-[260ms]">
                {count.toLocaleString("en-US")}
              </span>
            </motion.div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
              <span className="text-accent">+{Math.floor(80 + Math.random() * 240)}</span>
              <span className="text-line/80"> /tick · </span>
              p95 latency 38ms
            </div>
          </div>

          {/* sparkline */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[60px] w-full flex-shrink-0 sm:h-[78px] sm:w-[44%]">
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L 100 100 L 0 100 Z`} fill="url(#sparkFill)" />
            <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* tiny meta row */}
        <div className="flex items-center gap-4 border-t border-line/60 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
          <span>region: us-east · eu-west</span>
          <span className="text-line">/</span>
          <span>zero on-call nights this quarter</span>
        </div>
      </div>
    </div>
  );
});

export default BentoHalfpipe;
