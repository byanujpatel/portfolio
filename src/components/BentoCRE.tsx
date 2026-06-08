"use client";

import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, FileText, File, Globe } from "@phosphor-icons/react/dist/ssr";

type Source = { id: string; icon: "blog" | "pdf" | "docx" | "url"; label: string };
type Output = { id: string; platform: string };

const sources: Source[] = [
  { id: "s1", icon: "blog", label: "blog-post.md" },
  { id: "s2", icon: "pdf", label: "whitepaper.pdf" },
  { id: "s3", icon: "url", label: "medium.com/article" },
  { id: "s4", icon: "docx", label: "report.docx" },
];

const outputs: Output[] = [
  { id: "o1", platform: "Twitter thread" },
  { id: "o2", platform: "LinkedIn post" },
  { id: "o3", platform: "Newsletter intro" },
  { id: "o4", platform: "IG carousel" },
];

const iconMap = {
  blog: FileText,
  pdf: File,
  docx: File,
  url: Globe,
};

const BentoCRE = memo(function BentoCRE() {
  const [active, setActive] = useState(0);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setProcessing(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % sources.length);
        setProcessing(false);
      }, 800);
    }, 2600);
    return () => clearInterval(i);
  }, []);

  const src = sources[active];

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 rounded-[2rem] bg-bg-elev/50 ring-1 ring-line/40" />
      <div className="relative flex h-full flex-col rounded-[2rem] border border-line/70 bg-bg-card/80 p-6 sm:p-7">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="flex items-center gap-2">
            <ArrowRight size={11} weight="bold" />
            content engine
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${processing ? "bg-yellow-400 animate-pulse" : "bg-accent"}`} />
            {processing ? "processing" : "ready"}
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center gap-6">
          {/* Source */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-fg-dim">input</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={src.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex h-16 w-16 items-center justify-center rounded-xl border border-line/50 bg-bg/60"
              >
                {(() => {
                  const Icon = iconMap[src.icon];
                  return <Icon size={22} weight="regular" className="text-fg-mute" />;
                })()}
              </motion.div>
            </AnimatePresence>
            <span className="font-mono text-[10px] text-fg-dim">{src.label}</span>
          </div>

          {/* Arrow */}
          <motion.div
            animate={processing ? { x: [0, 4, 0] } : {}}
            transition={{ repeat: processing ? Infinity : 0, duration: 0.6 }}
          >
            <ArrowRight size={18} className="text-accent" weight="bold" />
          </motion.div>

          {/* Outputs */}
          <div className="flex flex-col gap-1.5">
            {outputs.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: processing && i === (active % outputs.length) ? 1 : 0.4, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-line/40 bg-bg/40 px-3 py-1.5 font-mono text-[10px] text-fg-mute"
              >
                {o.platform}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default BentoCRE;
