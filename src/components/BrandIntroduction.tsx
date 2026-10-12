import { site } from "@/config/site";
import { ButtonLink, Eyebrow, Plate, Reveal } from "@/components/ui";

export function BrandIntroduction() {
  return (
    <section
      id="approach"
      data-rail="Our Approach"
      data-rail-tone="light"
      className="paper relative bg-stock py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-x-10 gap-y-12 lg:grid-cols-12 lg:gap-x-14">
          {/* Plate — portrait catalogue plate with its caption set apart */}
          <Reveal className="lg:col-span-5" y={34}>
            <figure className="relative">
              <div className="absolute -left-6 top-0 hidden h-full w-px bg-hair lg:block" />
              <Plate
                src={site.images.intro}
                alt="Modern courtyard pool in Naples, Florida, with pale limestone coping, still teal water reflecting a white rendered wall and a teak privacy screen, and a single lounge chair at the edge."
                className="aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]"
                imgClassName="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <figcaption className="mt-5 flex items-start gap-4">
                <span aria-hidden className="mt-3 h-px w-8 shrink-0 bg-champagne" />
                <span className="font-display text-[1.15rem] italic leading-snug text-slate">
                  An outdoor space designed around you.
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Editorial column */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow>More than a swimming pool</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,5.2vw,4.4rem)] font-light leading-[1.02] tracking-[-0.012em] text-ink">
                Designed for the Way
                <br className="hidden sm:block" /> You Want to Live.
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8 border-t border-hair pt-8">
                <p className="text-[1.02rem] leading-[1.8] text-slate">
                  A thoughtfully designed pool can transform the way you
                  experience your home. From peaceful mornings beside the water
                  to afternoons spent with family and evenings entertaining
                  outdoors, the right design brings your entire outdoor space
                  together.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-[1.02rem] leading-[1.8] text-slate">
                Glamour Custom Pools is focused on creating custom pool concepts
                that complement your property, reflect your preferences, and
                bring your vision for outdoor living to life.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="#contact" variant="navy" icon="arrow">
                  Discuss your vision
                </ButtonLink>
                <span className="eyebrow text-[0.6rem] leading-relaxed text-slate/80">
                  Concept copy — to be reviewed
                  <br className="hidden sm:block" /> against the final service offer.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
