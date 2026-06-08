"use client";

/*
 * Fold 4 — Receipts. A commit-log style timeline. Date column on the left,
 * vertical hairline, dot markers, entry text on the right. Each entry
 * fades+blurs in on viewport. Datelines are mono so they read like git log.
 */

import { motion } from "motion/react";
import { receipts } from "@/lib/content";

export default function Fold4Receipts() {
  return (
    <section className="relative border-t border-line/40 bg-bg py-24 sm:py-28 lg:py-36" id="receipts">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* HEADER */}
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
              <span className="h-px w-9 bg-fg-dim/40" />
              <span>04 / receipts</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-fg">
              The log,<br />
              <span style={{ color: "var(--accent)" }}>not the resume.</span>
            </h2>
            <p className="mt-6 max-w-[40ch] font-display text-[15px] leading-relaxed text-fg-mute">
              Years employed is a useless metric. Things shipped is the
              metric. Recent first.
            </p>
          </div>

          {/* TIMELINE */}
          <div className="relative lg:col-span-8">
            {/* the rail */}
            <div className="pointer-events-none absolute left-[5.5rem] top-0 h-full w-px bg-line/60 sm:left-[7.5rem]" aria-hidden />
            <ol className="space-y-7">
              {receipts.map((r, i) => (
                <motion.li
                  key={r.date + i}
                  initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-[5.5rem_1fr] items-start gap-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                >
                  <div className="pt-1 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
                    {r.date}
                  </div>
                  <div className="relative pl-7">
                    {/* dot marker on the rail */}
                    <span className="absolute -left-[5px] top-[7px] h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" />
                    <p className="font-display text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-fg">
                      {r.what}
                    </p>
                  </div>
                </motion.li>
              ))}
              {/* trailing entry — the present */}
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: receipts.length * 0.06 + 0.1 }}
                className="relative grid grid-cols-[5.5rem_1fr] items-start gap-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
              >
                <div className="pt-1 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  now
                </div>
                <div className="relative pl-7">
                  <span className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent breathe" />
                  <p className="font-display text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-fg-mute">
                    Looking for the next thing to break in production for the right reason.
                  </p>
                </div>
              </motion.li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
