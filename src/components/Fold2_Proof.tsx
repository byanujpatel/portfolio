import BentoCRE from "./BentoCRE";
import BentoHealthLabel from "./BentoHealthLabel";
import BentoAlphaAudit from "./BentoAlphaAudit";
import { projects } from "@/lib/content";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/*
 * Fold 2 — Proof.
 * Asymmetric bento: 3 cards. Labels OUTSIDE / BELOW each card per high-end
 * design skill. Each card is its own memoized client component that runs an
 * isolated perpetual micro-animation. No shared state, no parent re-renders.
 */

function CardLabel({
  index,
  name,
  kind,
  oneliner,
  metric,
  stack,
  shipped,
  href,
}: {
  index: number;
  name: string;
  kind: string;
  oneliner: string;
  metric: { value: string; label: string };
  stack: readonly string[];
  shipped: string;
  href?: string;
}) {
  const label = (
    <div className="mt-4 flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
            0{index + 1}
          </span>
          <h3 className="font-display text-[20px] font-bold tracking-[-0.02em] text-fg sm:text-[22px]">
            {name}
          </h3>
          <span className="rounded-full border border-line/60 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-mute">
            {kind}
          </span>
        </div>
        <div className="text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
            {shipped}
          </span>
        </div>
      </div>
      <p className="max-w-[58ch] font-display text-[14.5px] leading-relaxed text-fg-mute">
        {oneliner}
      </p>
      <div className="mt-1 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line/50 bg-bg-elev/60 px-1.5 py-0.5 font-mono text-[10px] text-fg-dim"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="text-right">
          <span className="font-display text-[13px] font-bold text-accent">
            {metric.value}
          </span>{" "}
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
            {metric.label}
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block transition-all duration-200"
      >
        {label}
        <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-dim transition-colors duration-200 group-hover:text-accent">
          view project <ArrowUpRight size={12} weight="bold" />
        </span>
      </a>
    );
  }

  return label;
}

export default function Fold2Proof() {
  const [cre, healthLabel, alphaAudit] = projects;

  return (
    <section className="relative border-t border-line/40 bg-bg py-24 sm:py-28 lg:py-36" id="proof">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 md:px-12">
        {/* SECTION HEADER — left aligned, NOT centered, asymmetric */}
        <div className="grid gap-8 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-dim">
              <span className="h-px w-9 bg-fg-dim/40" />
              <span>02 / proof</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5.5vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-fg">
              Shipped, not<br />
              <span style={{ color: "var(--accent)" }}>in slides.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <p className="max-w-[42ch] font-display text-[15px] leading-relaxed text-fg-mute">
              Each tile below is a live preview of something I actually
              shipped &mdash; animation states model the real behaviour.
              Click through for the post-mortems.
            </p>
          </div>
        </div>

        {/* THE BENTO — 12 col grid, 3 cards. */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-12 md:gap-x-6 md:gap-y-12">
          {/* CRE — 5 cols */}
          <article className="md:col-span-5">
            <a href={cre.href} target="_blank" rel="noopener noreferrer" className="block">
              <div className="card-grain h-[320px] md:h-[400px] transition-all duration-200 hover:ring-accent/40">
                <BentoCRE />
              </div>
            </a>
            <CardLabel index={0} {...cre} />
          </article>

          {/* Health Label — 7 cols */}
          <article className="md:col-span-7">
            <a href={healthLabel.href} target="_blank" rel="noopener noreferrer" className="block">
              <div className="card-grain h-[320px] md:h-[400px] transition-all duration-200 hover:ring-accent/40">
                <BentoHealthLabel />
              </div>
            </a>
            <CardLabel index={1} {...healthLabel} />
          </article>

          {/* Alpha Audit — full width */}
          <article className="md:col-span-12">
            <a href={alphaAudit.href} target="_blank" rel="noopener noreferrer" className="block">
              <div className="card-grain h-[320px] md:h-[400px] transition-all duration-200 hover:ring-accent/40">
                <BentoAlphaAudit />
              </div>
            </a>
            <CardLabel index={2} {...alphaAudit} />
          </article>
        </div>
      </div>
    </section>
  );
}
