"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "motion/react";
import { FileMagnifyingGlass, Warning, CheckCircle, Camera } from "@phosphor-icons/react/dist/ssr";

type Claim = { id: string; text: string; status: "verified" | "flagged" | "pending" };

const claims: Claim[] = [
  { id: "c1", text: "Revenue grew 40% YoY", status: "flagged" },
  { id: "c2", text: "Zero material litigation", status: "verified" },
  { id: "c3", text: "AI division profitable", status: "flagged" },
  { id: "c4", text: "Carbon neutral by 2025", status: "verified" },
  { id: "c5", text: "No regulatory actions", status: "pending" },
];

const statusIcon = {
  verified: <CheckCircle size={13} weight="fill" className="text-green-400" />,
  flagged: <Warning size={13} weight="fill" className="text-red-400" />,
  pending: <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />,
};

const BentoAlphaAudit = memo(function BentoAlphaAudit() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 8));
    }, 400);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 rounded-[2rem] bg-bg-elev/50 ring-1 ring-line/40" />
      <div className="relative flex h-full flex-col rounded-[2rem] border border-line/70 bg-bg-card/80 p-6 sm:p-7">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="flex items-center gap-2">
            <FileMagnifyingGlass size={11} weight="bold" />
            alpha audit
          </span>
          <span className="flex items-center gap-1.5">
            <Camera size={10} className="text-fg-dim" />
            <span>{Math.min(progress, 100)}%</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-bg-elev">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="mt-4 flex-1 space-y-2">
          {claims.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > i * 20 ? 1 : 0.3 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2.5 rounded-lg border border-line/40 bg-bg/40 px-3 py-2"
            >
              {statusIcon[c.status]}
              <span className="flex-1 truncate font-mono text-[11px] text-fg-mute">{c.text}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-dim">{c.status}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-fg-dim">
          <span className="h-1 w-1 rounded-full bg-accent" />
          Decoupling Coefficient: 0.73
        </div>
      </div>
    </div>
  );
});

export default BentoAlphaAudit;
