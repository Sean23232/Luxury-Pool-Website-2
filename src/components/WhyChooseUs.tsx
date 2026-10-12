import { site } from "@/config/site";
import { Eyebrow, Plate, Reveal } from "@/components/ui";

const blocks = [
  {
    n: "01",
    title: "A Design That Feels Personal",
    body: "Your home, outdoor space, and lifestyle should guide the direction of your pool.",
  },
  {
    n: "02",
    title: "Beauty Meets Everyday Function",
    body: "A beautiful pool should also make sense for how you plan to relax, entertain, and enjoy your property.",
  },
  {
    n: "03",
    title: "A Clear Starting Point",
    body: "An initial conversation helps establish your priorities and clarify what a custom pool project may involve.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why"
      data-rail="Why Glamour"
      data-rail-tone="light"
      className="paper relative bg-stock pt-20 sm:pt-24 lg:pt-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12 lg:gap-x-14">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>The Glamour approach</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.02] tracking-[-0.015em] text-ink">
                Your Vision Should
                <br className="hidden sm:block" /> Lead the Design.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-[30rem] text-[1.02rem] leading-[1.8] text-slate">
                Credibility in a pool project comes from clarity — a considered
                point of view, honest conversation about what is possible, and
                design decisions made for your property rather than a template.
              </p>
            </Reveal>
          </div>

          <ul className="lg:col-span-6 lg:col-start-7">
            {blocks.map((b, i) => (
              <Reveal
                as="li"
                key={b.n}
                delay={i * 0.08}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-hair py-8 last:border-b sm:gap-x-8 sm:py-9"
              >
                <span className="eyebrow tnum pt-[0.5rem] text-[0.68rem] text-champagne">
                  {b.n}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.1rem)] font-normal leading-tight text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-[36rem] text-[0.99rem] leading-[1.75] text-slate">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Full-bleed plate — a hard edge between catalogue stock and photograph */}
      <Reveal y={34} className="mt-16 lg:mt-24">
        <figure className="relative">
          <Plate
            src={site.images.detail}
            alt="Close detail of clear water sheeting over the pale travertine edge of an infinity pool in warm golden-hour light."
            className="h-[46vh] min-h-[16rem] w-full sm:h-[52vh] lg:h-[58vh]"
            imgClassName="object-cover object-center"
            sizes="100vw"
          />
          <figcaption className="shell mt-5 flex items-start gap-4">
            <span aria-hidden className="mt-3 h-px w-8 shrink-0 bg-champagne" />
            <span className="font-display text-[1.1rem] italic leading-snug text-slate">
              The edge detail is where a pool is either considered or merely
              built.
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
