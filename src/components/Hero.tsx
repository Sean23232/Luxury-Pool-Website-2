import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { ButtonLink, CallButton, Eyebrow, Plate } from "@/components/ui";

export function HeroSection() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.85, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      data-rail="Prologue"
      data-rail-tone="dark"
      className="relative isolate flex min-h-[92svh] w-full flex-col overflow-hidden bg-ink-deep"
    >
      <Plate
        fill
        eager
        src={site.images.hero}
        alt="Contemporary Southwest Florida residence at golden hour, with a long infinity-edge pool whose still water meets the horizon beyond pale stone terraces and tall palms."
        imgClassName="object-cover object-[52%_center] md:object-[center_58%]"
      />

      {/* Legibility scrims — deep at the base for the type, dark at the top for the header */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(11,24,29,0.95) 0%, rgba(11,24,29,0.72) 22%, rgba(11,24,29,0.34) 55%, rgba(11,24,29,0.58) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(11,24,29,0.88) 0%, rgba(11,24,29,0.45) 42%, rgba(11,24,29,0) 72%)",
        }}
      />

      {/* Champagne spine rule running out of the eyebrow into the plate */}
      <div
        aria-hidden
        className="absolute left-0 top-[38%] hidden h-px w-full lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(197,165,116,0.75) 0%, rgba(197,165,116,0.28) 38%, rgba(197,165,116,0) 78%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-end shell pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        <motion.div {...rise(0.05)}>
          <Eyebrow tone="stock">Bespoke Pool Design &amp; Construction</Eyebrow>
        </motion.div>

        <h1 className="mt-7 max-w-[19ch] text-stock">
          <motion.span
            {...rise(0.16)}
            className="block font-display text-[clamp(2.65rem,8.4vw,7rem)] font-light leading-[0.9] tracking-[-0.015em]"
          >
            Your Backyard,
            <br />
            Reimagined.
          </motion.span>
          <motion.span
            {...rise(0.3)}
            className="mt-4 block max-w-[22ch] pl-[0.06em] font-display text-[clamp(1.45rem,3.4vw,2.75rem)] font-light italic leading-[1.1] text-champagne sm:mt-5"
          >
            A New Standard of Outdoor Living.
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.42)}
          className="mt-7 max-w-[34rem] text-[1rem] leading-[1.75] text-stock/80 sm:text-[1.06rem]"
        >
          Beautifully considered custom pools, designed around your home, your
          lifestyle, and the way you want to live outdoors.
        </motion.p>

        <motion.div
          {...rise(0.54)}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <CallButton variant="ivory" className="w-full sm:w-auto">
            Let&rsquo;s talk about your pool
          </CallButton>
          <ButtonLink
            href="#designs"
            variant="ghostLight"
            icon="arrow"
            className="w-full sm:w-auto"
          >
            Explore the designs
          </ButtonLink>
        </motion.div>

        <motion.div
          {...rise(0.66)}
          className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-stock/15 pt-6"
        >
          {site.serviceAreas.map((area, i) => (
            <span key={area} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="text-champagne">·</span>}
              <span className="eyebrow text-[0.62rem] text-stock/65">{area}</span>
            </span>
          ))}
              <span className="eyebrow text-[0.62rem] text-stock/60">Florida</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-4 lg:flex xl:right-14"
      >
        <span
          className="eyebrow text-[0.58rem] text-stock/55"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-stock/25">
          <span className="rail-drop absolute inset-0 block bg-champagne" />
        </span>
      </div>
    </section>
  );
}
