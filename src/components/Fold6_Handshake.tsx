"use client";

/*
 * Fold 6 — Handshake. Single oversized line, one input, one CTA, the email,
 * socials inline. No form fields, no validation theatre, no "Send" spinner.
 * It opens mail with the visitor's question pre-filled.
 */

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, GithubLogo, LinkedinLogo, XLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import SubstackLogo from "./SubstackLogo";
import { me, handshakeBlurb } from "@/lib/content";

const socials = [
  { label: "github", href: me.socials.github, Icon: GithubLogo },
  { label: "linkedin", href: me.socials.linkedin, Icon: LinkedinLogo },
  { label: "twitter", href: me.socials.twitter, Icon: XLogo },
  { label: "substack", href: me.socials.substack, Icon: SubstackLogo },
  { label: "email", href: `mailto:${me.email}`, Icon: EnvelopeSimple },
];

export default function Fold6Handshake() {
  const [msg, setMsg] = useState("");
  const send = () => {
    const subject = "Building something — want you in";
    const body = msg.trim() || "Hey Anuj — quick intro / what we're building / want to talk.";
    window.location.href = `mailto:${me.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="relative border-t border-line/40 bg-bg pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-16" id="handshake">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
              <span className="h-px w-9 bg-fg-dim/40" />
              <span>06 / handshake</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.04em] text-fg"
            >
              Tell me what<br />
              you&apos;re <span style={{ color: "var(--accent)" }}>building.</span>
            </motion.h2>
            <p className="mt-6 max-w-[44ch] font-display text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-fg-mute">
              {handshakeBlurb}
            </p>
          </div>

          <div className="lg:col-span-5 lg:pt-12">
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="space-y-4"
            >
              <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim" htmlFor="hs-msg">
                what are you building
              </label>
              <textarea
                id="hs-msg"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="a vertical AI agent for ops teams, looking for a founding engineer who can ship a working demo by friday"
                rows={4}
                className="input-glow w-full resize-none rounded-2xl border border-line/70 bg-bg-elev/60 p-4 font-display text-[14.5px] leading-relaxed text-fg placeholder-fg-dim/80 outline-none backdrop-blur-md transition-shadow duration-500"
                style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
              />
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`mailto:${me.email}`}
                  className="font-mono text-[12px] text-fg-mute underline decoration-line/60 decoration-1 underline-offset-4 hover:text-accent"
                >
                  {me.email}
                </a>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent pl-5 pr-1 py-1 font-mono text-[12px] uppercase tracking-[0.14em] text-accent-ink transition-transform duration-300 hover:scale-[1.02] active:scale-[0.97]"
                  style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
                >
                  send it
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-bg/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={13} weight="bold" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER STRIP */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-line/50 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent breathe" />
            </span>
            <span>built by hand · {new Date().getFullYear()}</span>
            <span className="text-line/80">/</span>
            <span>{me.location}</span>
          </div>
          <div className="flex items-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="grid h-12 w-12 place-items-center rounded-xl border border-line/60 bg-bg-elev/40 text-fg-mute transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
              >
                <Icon size={20} weight="bold" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
