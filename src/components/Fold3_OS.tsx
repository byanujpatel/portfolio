"use client";

/*
 * Fold 3 — The Operating System.
 * Three horizontal rails (Build · Reason · Ship). Tools rendered as
 * staggered chips with magnetic hover. Layout is system-diagram, not 3-card row.
 */

import { motion } from "motion/react";
import { rails } from "@/lib/content";

export default function Fold3OS() {
  return (
    <section className="relative border-t border-line/40 bg-bg py-24 sm:py-28 lg:py-36" id="os">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: title block */}
          <div className="lg:col-span-5 lg:sticky lg:top-12 lg:self-start">
            <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
              <span className="h-px w-9 bg-fg-dim/40" />
              <span>03 / operating system</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-fg">
              What I reach<br />
              for, why, and<br />
              <span style={{ color: "var(--accent)" }}>when not to.</span>
            </h2>
            <p className="mt-7 max-w-[42ch] font-display text-[15px] leading-relaxed text-fg-mute">
              Tools are arguments. These are the ones I&apos;m willing to
              defend in a code review at 11pm. Substitutes welcome &mdash; the
              ratio of opinion to dogma matters more than the brand on the lid.
            </p>
          </div>

          {/* RIGHT: 3 rails */}
          <div className="space-y-10 lg:col-span-7 lg:space-y-12">
            {rails.map((rail, ri) => (
              <motion.div
                key={rail.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: ri * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-baseline gap-4 border-b border-line/50 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
                    {String(ri + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-bold tracking-[-0.025em] text-fg">
                    {rail.name}
                  </h3>
                  <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim sm:inline">
                    {rail.desc}
                  </span>
                </div>
                <p className="mt-3 max-w-[52ch] font-mono text-[11px] uppercase tracking-[0.16em] text-fg-mute sm:hidden">
                  {rail.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {rail.tools.map((tool, ti) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: ri * 0.06 + ti * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -2, scale: 1.04 }}
                      className="cursor-default rounded-lg border border-line/60 bg-bg-elev/60 px-3 py-1.5 font-mono text-[12px] text-fg-mute hover:border-accent hover:bg-accent-soft hover:text-fg"
                      style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
