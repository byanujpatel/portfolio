"use client";

/*
 * Fold 5 — Thesis. A single oversized display paragraph, asymmetrically
 * placed. Specific words highlighted in accent for emphasis. Subtle parallax
 * on scroll: the text rises slightly faster than the surrounding section.
 */

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { thesis } from "@/lib/content";

/* Split the thesis into runs so specific phrases can be accented */
const accentPhrases = [
  "retry logic",
  "idempotency",
  "cache that survives",
  "founding teams",
  "backends that can't go down",
];

function renderRich(text: string) {
  // crude: replace each accentPhrase with a marked span
  const parts: (string | { accent: string })[] = [text];
  for (const phrase of accentPhrases) {
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (typeof p !== "string") continue;
      const idx = p.indexOf(phrase);
      if (idx === -1) continue;
      const before = p.slice(0, idx);
      const after = p.slice(idx + phrase.length);
      parts.splice(i, 1, before, { accent: phrase }, after);
      i += 2;
    }
  }
  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <span key={i} style={{ color: "var(--accent)" }}>{p.accent}</span>
    ),
  );
}

export default function Fold5Thesis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-line/40 bg-bg py-32 sm:py-40 lg:py-48"
      id="thesis"
    >
      {/* faint accent wash */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-50 blur-[160px]"
        style={{ background: "var(--accent-glow)" }}
        aria-hidden
      />

      <div className="mx-auto grid max-w-[1480px] gap-12 px-5 sm:px-8 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-3 lg:pt-3">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
            <span className="h-px w-9 bg-fg-dim/40" />
            <span>05 / thesis</span>
          </div>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute">
            why I&apos;m available
          </div>
        </div>

        <motion.div style={{ y }} className="lg:col-span-9">
          <p className="font-display text-[clamp(1.6rem,3.2vw,2.7rem)] font-medium leading-[1.22] tracking-[-0.02em] text-fg">
            {renderRich(thesis)}
          </p>
          <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
            <span className="h-px w-9 bg-fg-dim/40" />
            <span>signed, the engineer</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
