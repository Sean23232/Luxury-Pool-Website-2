import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { ButtonLink, CallButton, Eyebrow, Plate } from "@/components/ui";

export function FinalCallToAction() {
  const reduce = useReducedMotion();
  const rise = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduce ? 0 : 0.8, delay: reduce ? 0 : d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="cta"
      data-rail="An Invitation"
      data-rail-tone="dark"
      className="relative isolate overflow-hidden bg-ink-deep"
    >
      <Plate
        fill
        src={site.images.cta}
        alt="Exceptional custom pool at golden hour, warm exterior lighting coming on across a contemporary Florida residence behind a pale travertine deck."
        imgClassName="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(11,24,29,0.94) 0%, rgba(11,24,29,0.78) 45%, rgba(11,24,29,0.52) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(11,24,29,0.85) 0%, rgba(11,24,29,0.2) 45%, rgba(11,24,29,0.6) 100%)",
        }}
      />

      <div className="shell relative z-10 flex min-h-[34rem] flex-col justify-center py-24 sm:py-28 lg:min-h-[40rem] lg:py-36">
        <motion.div {...rise(0.05)}>
          <Eyebrow tone="stock">Your next chapter starts outside</Eyebrow>
        </motion.div>

        <motion.h2
          {...rise(0.14)}
          className="mt-7 max-w-[16ch] font-display text-[clamp(2.4rem,6.4vw,5.5rem)] font-light leading-[1] tracking-[-0.015em] text-stock"
        >
          Imagine What Your Backyard Could Become.
        </motion.h2>

        <motion.p
          {...rise(0.24)}
          className="mt-7 max-w-[34rem] text-[1.02rem] leading-[1.8] text-stock/75"
        >
          Whether you have a clear vision or are just beginning to explore the
          possibilities, let&rsquo;s talk about the pool you have in mind.
        </motion.p>

        <motion.div
          {...rise(0.34)}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <CallButton variant="ivory" className="w-full sm:w-auto">
            Call Glamour Custom Pools
          </CallButton>
          <ButtonLink
            href="#contact"
            variant="ghostLight"
            icon="arrow"
            className="w-full sm:w-auto"
          >
            Start a conversation
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
