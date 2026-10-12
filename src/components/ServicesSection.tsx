import { ButtonLink, Eyebrow, Reveal } from "@/components/ui";

const services = [
  {
    n: "01",
    title: "Custom Pool Construction",
    body: "Explore a pool designed around the character of your property, your preferred style, and the way you plan to use your outdoor space.",
  },
  {
    n: "02",
    title: "Luxury Pool Design",
    body: "Discover design directions that balance visual appeal, functionality, and the overall look of your home.",
  },
  {
    n: "03",
    title: "Outdoor Living Integration",
    body: "Consider how your pool, surrounding deck, landscaping, and outdoor entertaining areas can work together as one cohesive space.",
  },
  {
    n: "04",
    title: "Personalized Project Consultation",
    body: "Start with a conversation about your ideas, property, preferences, and the next steps toward a custom pool.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      data-rail="Services"
      data-rail-tone="light"
      className="paper relative bg-stock py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Eyebrow>What we consider</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.04] tracking-[-0.012em] text-ink">
                A More Personal Approach to Pool Building.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-[30rem] text-[1.02rem] leading-[1.8] text-slate">
                Your pool should feel like a natural extension of your home. The
                starting point is understanding your space, your priorities, and
                what you want your finished outdoor environment to feel like.
              </p>
            </Reveal>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {services.map((s, i) => (
              <Reveal
                key={s.n}
                as="li"
                delay={i * 0.06}
                className="group border-t border-hair transition-colors duration-500 last:border-b hover:bg-white/70"
              >
                <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 px-1 py-8 sm:gap-x-8 sm:py-9">
                  <span className="eyebrow tnum pt-[0.45rem] text-[0.7rem] text-champagne transition-colors duration-500 group-hover:text-ocean">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.05rem)] font-normal leading-tight text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[40rem] text-[0.98rem] leading-[1.75] text-slate">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start gap-5 border-t border-hair pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow text-[0.6rem] leading-relaxed text-slate/85">
              Concept service copy — to be confirmed against the final offer.
            </p>
            <ButtonLink href="#contact" variant="navy" icon="arrow">
              Tell us what you have in mind
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
