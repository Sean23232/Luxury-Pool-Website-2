import { Eyebrow, Reveal } from "@/components/ui";

const steps = [
  {
    n: "01",
    title: "The Conversation",
    body: "We begin by discussing your vision, property, priorities, preferred style, and the experience you want to create.",
  },
  {
    n: "02",
    title: "Understanding Your Space",
    body: "The next step is to understand the site and the practical considerations that may influence the design and project scope.",
  },
  {
    n: "03",
    title: "Planning Your Pool",
    body: "Explore a design direction and discuss the features, materials, and details that best fit your goals.",
  },
  {
    n: "04",
    title: "Discussing the Next Steps",
    body: "Review the proposed scope, budget expectations, timing, and the steps required to move the project forward.",
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      data-rail="The Process"
      data-rail-tone="dark"
      className="relative overflow-hidden bg-ink py-20 text-stock sm:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 opacity-[0.35] lg:block"
        style={{
          background: "linear-gradient(to left, rgba(66,110,112,0.35), rgba(17,37,43,0))",
        }}
      />

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="stock">The process</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-[clamp(2.15rem,5vw,4.2rem)] font-light leading-[1.02] tracking-[-0.015em] text-stock">
                From First Conversation to
                <br className="hidden sm:block" /> Your Future Backyard.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <Reveal delay={0.14}>
              <p className="text-[1.02rem] leading-[1.8] text-stock/70">
                Every great project begins with a clear understanding of what
                matters to you.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Desktop: horizontal timeline — a champagne rule with diamond
            markers, each step hanging beneath it like a fold-out plate */}
        <div className="relative mt-16 hidden lg:block">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(to_right,rgba(197,165,116,0.8),rgba(197,165,116,0.3)_60%,rgba(197,165,116,0.06))]"
          />
          <ol className="relative grid grid-cols-4 gap-x-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.1} className="relative pt-11">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 z-10 block size-[11px] -translate-x-[5.5px] -translate-y-[5.5px] rotate-45 bg-champagne"
                />
                <span className="block font-display tnum text-[clamp(3.25rem,4.4vw,4.5rem)] font-light leading-[0.92] text-champagne">
                  {s.n}
                </span>
                <span aria-hidden className="mt-5 block h-px w-12 bg-champagne/45" />
                <h3 className="mt-5 font-display text-[1.6rem] font-normal leading-tight text-stock">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[19rem] text-[0.95rem] leading-[1.75] text-stock/65">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="mt-12 lg:hidden">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 0.07}
              className="relative border-l border-champagne/35 pb-10 pl-7 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[5px] top-[0.7rem] block size-[9px] rotate-45 bg-champagne"
              />
              <span className="font-display tnum block text-[3rem] font-light leading-none text-champagne">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-[1.5rem] font-normal leading-tight text-stock">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[34rem] text-[0.97rem] leading-[1.75] text-stock/65">
                {s.body}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[46rem] border-t border-stock/15 pt-6 text-[0.84rem] leading-relaxed text-stock/60">
            Shown as an indicative outline for discussion only — it is not a
            guaranteed contractual workflow. Final steps, timelines, pricing and
            deliverables are confirmed by the business.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
