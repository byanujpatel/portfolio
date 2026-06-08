"use client";

/*
 * HeroFold1 — the 5-second hook.
 *
 * Structure:
 *   - top bar:     [AP. mark · handle]  [status pill]  [socials dock]
 *   - center-left: kicker → 3-line display headline → subline
 *   - below:       agent input — click anywhere to focus; placeholder hints
 *   - bottom:      ticker of recent ships
 *
 * Accent comes from the parent wrapper's `accent-*` class (CSS var --accent).
 */

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Command,
  ArrowsClockwise,
  Sparkle,
  GithubLogo,
  LinkedinLogo,
  XLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import SubstackLogo from "./SubstackLogo";
import { me, headline, subline, samplePrompts } from "@/lib/content";

/* ---------- SocialsDock — visible-in-one-glance contact strip ---------- */
const SOCIAL_ITEMS = [
  { label: "GitHub",   href: me.socials.github,   Icon: GithubLogo },
  { label: "LinkedIn", href: me.socials.linkedin, Icon: LinkedinLogo },
  { label: "X",        href: me.socials.twitter,  Icon: XLogo },
  { label: "Substack", href: me.socials.substack, Icon: SubstackLogo },
  { label: "Email",    href: `mailto:${me.email}`, Icon: EnvelopeSimple },
] as const;

const SocialsDock = memo(function SocialsDock() {
  return (
    <div
      className="hidden items-center gap-1.5 rounded-full border border-line/80 bg-bg-elev/60 p-1.5 backdrop-blur-md md:flex"
      aria-label="Contact links"
    >
      {SOCIAL_ITEMS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={label}
          className="grid h-10 w-10 place-items-center rounded-full text-fg-mute transition-all duration-200 hover:-translate-y-px hover:bg-accent-soft hover:text-fg"
          style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
          <Icon size={18} weight="bold" />
        </a>
      ))}
    </div>
  );
});

/* Mobile-only compact dock (icon-only) */
const SocialsDockMobile = memo(function SocialsDockMobile() {
  return (
    <div className="flex items-center gap-1.5 md:hidden" aria-label="Contact links">
      {SOCIAL_ITEMS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={label}
          className="grid h-10 w-10 place-items-center rounded-full border border-line/70 bg-bg-elev/60 text-fg-mute transition-all duration-200 hover:border-accent hover:text-fg"
          style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
          <Icon size={16} weight="bold" />
        </a>
      ))}
    </div>
  );
});

/* ---------- StatusPill ---------- */
const StatusPill = memo(function StatusPill() {
  return (
    <div className="hidden items-center gap-2.5 rounded-full border border-line/80 bg-bg-elev/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mute backdrop-blur-md sm:flex">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-accent breathe" />
      </span>
      <span className="hidden md:inline">{me.status}</span>
      <span className="md:hidden">Available</span>
      <span className="hidden text-line lg:inline">/</span>
      <span className="hidden lg:inline">{me.location}</span>
    </div>
  );
});

/* ---------- BrandMark ---------- */
const BrandMark = memo(function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-9 w-9 place-items-center rounded-lg border border-line bg-bg-elev font-mono text-sm font-bold tracking-tight text-fg">
        <span>{me.mark}</span>
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim sm:block">
        {me.name} <span className="text-line">·</span> {me.handle}
      </div>
    </div>
  );
});

/* ---------- TypewriterPrompt — auto-cycles prompts in the input ---------- */
function TypewriterPrompt({
  prompts,
  active,
}: {
  prompts: readonly string[];
  active: boolean;
}) {
  const [idx, setIdx] = useState(0);
  /* Lazy initial state — no sync setState inside effects. */
  const [text, setText] = useState(() => (active ? "" : prompts[0] ?? ""));
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">(
    () => (active ? "typing" : "holding"),
  );
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;
    const target = prompts[idx];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < target.length) {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), 38);
      } else {
        t = setTimeout(() => setPhase("holding"), 1800);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), 600);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(target.slice(0, text.length - 1)), 18);
      } else {
        /* Async-wrap to satisfy react-hooks/set-state-in-effect; the next tick
           counts as a callback, not synchronous effect body state. */
        t = setTimeout(() => {
          setIdx((i) => (i + 1) % prompts.length);
          setPhase("typing");
        }, 0);
        return;
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx, prompts, active, reduced]);

  return (
    <span className="pointer-events-none text-fg-mute">
      {text}
      <span className="caret" />
    </span>
  );
}

/* ---------- AgentExchange — the 5-second magnet wired to /api/ask ----------
 *
 * States:
 *   idle       — input + auto-cycling prompt
 *   streaming  — question pinned at top, answer tokens streaming in
 *   done       — answer settled, "ask another" + send-as-email shortcuts
 *   error      — agent unavailable, fall back to email handoff
 */

type ExchangeState = "idle" | "streaming" | "done" | "error";

function AgentExchange() {
  const [state, setState] = useState<ExchangeState>("idle");
  const [value, setValue] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState("idle");
    setValue("");
    setQuestion("");
    setAnswer("");
    setErrorMsg("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  /* Cmd/Ctrl + K focuses the input */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && state !== "idle") {
        reset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, reset]);

  const ask = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;

      setQuestion(trimmed);
      setAnswer("");
      setErrorMsg("");
      setState("streaming");

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ question: trimmed }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`agent http ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value: chunk } = await reader.read();
          if (done) break;
          buffer += decoder.decode(chunk, { stream: true });

          /* Parse SSE — each event is "data: <json>\n\n" */
          const lines = buffer.split("\n\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (payload === "[DONE]") {
              setState("done");
              return;
            }
            try {
              const obj = JSON.parse(payload);
              if (obj.t) setAnswer((a) => a + obj.t);
              if (obj.error) throw new Error(obj.error);
            } catch {
              /* malformed event — skip */
            }
          }
        }
        setState("done");
      } catch (err) {
        if (controller.signal.aborted) return;
        setErrorMsg(err instanceof Error ? err.message : "agent error");
        setState("error");
      }
    },
    [],
  );

  const isEmpty = value.length === 0;

  /* ----- IDLE state: input + typewriter ----- */
  if (state === "idle") {
    return (
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(value);
          }}
          onClick={() => inputRef.current?.focus()}
          className="input-glow group relative flex w-full cursor-text items-center gap-4 rounded-xl border border-line/70 bg-bg/60 px-5 py-4 backdrop-blur-md transition-shadow duration-500 sm:px-6 sm:py-5 sm:rounded-2xl"
          style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
          <span className="font-mono text-lg text-accent sm:text-xl">{">"}</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused ? "ask anything. try 'are you a founding-eng fit?'" : ""}
              spellCheck={false}
              autoComplete="off"
              aria-label="Ask the engineer anything"
              className="relative z-10 w-full bg-transparent font-display text-[17px] text-fg placeholder:text-fg-dim/70 caret-accent outline-none md:text-xl"
            />
            {isEmpty && !focused && (
              <div className="pointer-events-none absolute inset-0 flex items-center font-display text-[17px] md:text-xl">
                <TypewriterPrompt prompts={samplePrompts} active={!focused} />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isEmpty}
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-40 sm:flex"
            style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
          >
            ask
            <ArrowUpRight weight="bold" size={13} />
          </button>
          <kbd className="hidden items-center gap-1 rounded-md border border-line bg-bg px-2 py-1 font-mono text-[10px] text-fg-dim md:flex">
            <Command size={10} weight="bold" />
            K
          </kbd>
        </form>

        {/* prompt chips — fast paths so a recruiter doesn't have to type */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
            try:
          </span>
          {samplePrompts.slice(0, 3).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => ask(p)}
              className="rounded-full border border-line/60 bg-bg-elev/40 px-3 py-1.5 font-mono text-[11px] text-fg-mute transition-all duration-200 hover:-translate-y-px hover:border-accent hover:text-accent"
              style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ----- STREAMING / DONE / ERROR: pinned question + streamed answer ----- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full rounded-2xl border border-line bg-bg-elev/70 p-5 backdrop-blur-md sm:p-6 sm:rounded-3xl"
    >
      {/* Question */}
      <div className="flex items-start gap-3 border-b border-line/60 pb-4">
        <span className="mt-1 font-mono text-sm text-accent">{">"}</span>
        <p className="flex-1 font-display text-[15px] leading-relaxed text-fg">
          {question}
        </p>
      </div>

      {/* Answer */}
      <div className="relative pt-4">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
          {state === "streaming" && (
            <>
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-accent breathe" />
              </span>
              <span>agent · groq · llama-3.3</span>
            </>
          )}
          {state === "done" && (
            <>
              <Sparkle size={11} weight="fill" className="text-accent" />
              <span>answered · {answer.length} chars</span>
            </>
          )}
          {state === "error" && (
            <>
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>agent unavailable</span>
            </>
          )}
        </div>

        {state !== "error" && (
          <p className="font-display text-[15.5px] leading-relaxed text-fg-mute md:text-[16px]">
            {answer}
            {state === "streaming" && <span className="caret" />}
          </p>
        )}

        {state === "error" && (
          <p className="font-display text-[15px] leading-relaxed text-fg-mute">
            The agent can&apos;t talk right now ({errorMsg}). Email{" "}
            <a href={`mailto:${me.email}`} className="text-accent underline underline-offset-2">
              {me.email}
            </a>{" "}
            and Anuj will reply within a day.
          </p>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-line/70 bg-bg/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-mute transition-all duration-200 hover:-translate-y-px hover:border-accent hover:text-fg"
            style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
          >
            <ArrowsClockwise size={12} weight="bold" />
            ask another
          </button>
          <a
            href={`mailto:${me.email}?subject=${encodeURIComponent("Follow-up from your portfolio agent")}&body=${encodeURIComponent(`I asked: "${question}"\n\nThe agent said: "${answer}"\n\nFollow-up:`)}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent pl-3 pr-1 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink transition-transform duration-300 hover:scale-[1.02] active:scale-[0.97]"
            style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
          >
            email anuj this thread
            <span className="grid h-6 w-6 place-items-center rounded-full bg-bg/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={11} weight="bold" />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- ShipTicker — perpetual bottom strip ---------- */
const ShipTicker = memo(function ShipTicker() {
  const items = [
    "shipped Atlas Runtime v1",
    "11M events/day on Halfpipe",
    "Sieve replaced a $4k/mo vendor",
    "shipctl: branch → live in 47s",
    "Boring AI: 14k reads",
    "open to founding eng roles",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line/60 py-2.5">
      <div className="ticker-track font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
});

/* ---------- Headline ---------- */
function Headline() {
  return (
    <h1 className="font-display font-bold leading-[0.92] tracking-[-0.035em] text-fg">
      {headline.map((line, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: 0.15 + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="block text-[clamp(2.75rem,11vw,7rem)]"
          style={line.accent ? { color: "var(--accent)" } : undefined}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}

/* ---------- The Hero ---------- */
export default function HeroFold1() {
  /* Toggle the top rim line once user scrolls past the hero. */
  useEffect(() => {
    const rim = document.querySelector("[data-rim]") as HTMLElement | null;
    if (!rim) return;
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      rim.classList.toggle("is-visible", past);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* faint scan grid sits behind everything */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />

      {/* accent corner glow — clamped to viewport on mobile */}
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-[min(640px,80vw)] w-[min(640px,80vw)] rounded-full blur-[120px] sm:-right-40 sm:-top-40"
        style={{ background: "var(--accent-glow)" }}
      />
      {/* secondary lower-left glow for depth */}
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 h-[min(500px,70vw)] w-[min(500px,70vw)] rounded-full blur-[140px] opacity-50"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1480px] flex-col px-5 py-5 sm:px-8 md:px-12 lg:py-7">
        {/* TOP BAR */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-3 sm:gap-4"
        >
          <BrandMark />
          <div className="flex items-center gap-2 sm:gap-3">
            <StatusPill />
            <SocialsDock />
          </div>
          {/* mobile-only socials dock pinned to the right */}
          <div className="md:hidden">
            <SocialsDockMobile />
          </div>
        </motion.header>

        {/* CENTER: agent input (hero) + headline (secondary) */}
        <div className="flex flex-1 flex-col justify-center py-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-9">
              {/* AGENT INPUT — the primary visual anchor */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* glow behind the terminal */}
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl sm:opacity-50 sm:blur-3xl"
                  style={{ background: "var(--accent-glow)" }}
                />
                <div className="relative rounded-2xl border border-accent/30 bg-bg-elev/80 p-5 backdrop-blur-xl sm:p-6 sm:rounded-3xl">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="relative inline-flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-accent breathe" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
                      ask me anything
                    </span>
                  </div>
                  <AgentExchange />
                </div>
              </motion.div>

              {/* Headline — secondary, below the prompt */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10"
              >
                <Headline />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 max-w-[58ch] font-display text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-fg-mute"
              >
                {subline}
              </motion.p>
            </div>

            {/* Right rail — minimal signal, not a card sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:col-span-3 lg:flex lg:flex-col lg:items-end lg:justify-end lg:gap-6"
            >
              <div className="w-full max-w-[260px] space-y-5 text-right font-mono text-[11px] uppercase tracking-[0.16em]">
                <div>
                  <div className="text-fg-dim">years shipping</div>
                  <div className="mt-1 font-display text-3xl font-bold tracking-tight text-fg">
                    2
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>

        {/* BOTTOM: ticker + scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="space-y-4"
        >
          <ShipTicker />
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
            <span className="flex items-center gap-2">
              <span className="h-px w-6 bg-fg-dim/50" />
              scroll for proof
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
