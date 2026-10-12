import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { Eyebrow, Plate, Reveal, scrollToId } from "@/components/ui";
import { Dialog } from "@/components/Dialog";

type Concept = {
  key: string;
  title: string;
  label: string;
  description: string;
  src: string;
  alt: string;
  cell: string;
  ratio: string;
};

const concepts: Concept[] = [
  {
    key: "modern-infinity",
    title: "The Modern Infinity",
    label: "Modern Infinity",
    description: "Clean lines, uninterrupted views, and a beautifully understated finish.",
    src: site.images.concepts.infinity,
    alt: "Infinity-edge pool at a contemporary residence, its vanishing edge merging with a hazy distant landscape beyond dark stone coping.",
    cell: "lg:col-span-8",
    ratio: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10]",
  },
  {
    key: "private-resort",
    title: "The Resort Escape",
    label: "Private Resort",
    description: "A relaxed, resort-inspired setting designed for everyday enjoyment.",
    src: site.images.concepts.resort,
    alt: "Tropical backyard pool framed by layered palms and bird-of-paradise planting, with teak loungers and ivory cushions on a pale stone deck.",
    cell: "lg:col-span-4 lg:mt-16",
    ratio: "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[3/4]",
  },
  {
    key: "contemporary-classic",
    title: "The Contemporary Classic",
    label: "Timeless Elegance",
    description: "A refined design that brings enduring character to your outdoor space.",
    src: site.images.concepts.classic,
    alt: "Symmetrical geometric pool with pale honed stone coping, clipped hedges and slender palms flanking a white rendered residence with a colonnaded loggia.",
    cell: "lg:col-span-5",
    ratio: "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5]",
  },
  {
    key: "family-retreat",
    title: "The Family Retreat",
    label: "Family Living",
    description: "Room to relax, reconnect, and make the most of life at home.",
    src: site.images.concepts.family,
    alt: "Spacious residential pool with a wide shallow lounging shelf, pale stone deck and a covered outdoor dining area lit by warm lamps at early evening.",
    cell: "lg:col-span-7 lg:mt-24",
    ratio: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10]",
  },
  {
    key: "tropical-modern",
    title: "The Tropical Modern",
    label: "Tropical Modern",
    description: "Natural surroundings and contemporary design in perfect balance.",
    src: site.images.concepts.tropical,
    alt: "Modern rectangular pool bordered by monstera, ferns and sabal palms against board-formed concrete and warm timber slat cladding.",
    cell: "lg:col-span-7",
    ratio: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10]",
  },
  {
    key: "evening-oasis",
    title: "The Evening Oasis",
    label: "Evening Oasis",
    description: "A striking outdoor atmosphere as the Florida evening settles in.",
    src: site.images.concepts.evening,
    alt: "Twilight pool beside a covered patio, subtle underwater lighting glowing through muted teal water beneath a deep indigo sky.",
    cell: "lg:col-span-5 lg:mt-14",
    ratio: "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5]",
  },
];

function GalleryLightbox({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const count = concepts.length;
  const concept = concepts[index < 0 ? 0 : index];

  const go = useCallback(
    (delta: number) => onIndex(((index < 0 ? 0 : index) + delta + count) % count),
    [index, count, onIndex],
  );

  useEffect(() => {
    if (index < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, go]);

  return (
    <Dialog
      open={index >= 0}
      onClose={onClose}
      titleId="lightbox-title"
      closeLabel="Close design preview"
    >
      <div className="flex min-h-full w-full flex-col justify-center px-4 py-20 sm:px-10">
        <div className="mx-auto w-full max-w-[76rem]">
          <div className="flex items-end justify-between gap-6 border-b border-stock/20 pb-4">
            <span className="eyebrow tnum text-[0.62rem] text-champagne">
              {String(index + 1).padStart(2, "0")}
              <span className="text-stock/60"> / {String(count).padStart(2, "0")}</span>
            </span>
            <span className="eyebrow text-[0.58rem] text-stock/60">
              Design inspiration — not a completed project
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="relative aspect-[4/3] w-full bg-ink-deep sm:aspect-[16/10]">
                <img
                  src={concept.src}
                  alt={concept.alt}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <span className="eyebrow text-[0.6rem] text-champagne">
                {concept.label}
              </span>
              <h3
                id="lightbox-title"
                className="mt-4 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-light leading-[1.05] text-stock"
              >
                {concept.title}
              </h3>
              <p className="mt-5 text-[0.98rem] leading-[1.75] text-stock/70">
                {concept.description}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous design concept"
                  className="flex size-12 items-center justify-center border border-stock/30 text-stock transition-colors duration-300 hover:border-champagne hover:text-champagne"
                >
                  <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next design concept"
                  className="flex size-12 items-center justify-center border border-stock/30 text-stock transition-colors duration-300 hover:border-champagne hover:text-champagne"
                >
                  <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.setTimeout(() => scrollToId("contact"), 120);
                  }}
                  className="eyebrow ml-2 min-h-[3rem] border border-stock/30 px-5 text-[0.6rem] text-stock transition-colors duration-300 hover:border-champagne hover:text-champagne"
                >
                  Discuss this direction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export function InspirationGallery() {
  const [active, setActive] = useState<number>(-1);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const open = (i: number) => {
    setActive(i);
  };

  const close = useCallback(() => {
    setActive(-1);
    const el = triggerRefs.current[active];
    window.setTimeout(() => el?.focus(), 30);
  }, [active]);

  return (
    <section
      id="designs"
      data-rail="Pool Designs"
      data-rail-tone="light"
      className="paper relative bg-stock-2 py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Pool inspiration gallery</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,5.4vw,4.6rem)] font-light leading-[1] tracking-[-0.015em] text-ink">
                Find Your Kind of
                <br className="hidden sm:block" /> Extraordinary.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <Reveal delay={0.14}>
              <p className="text-[1.02rem] leading-[1.8] text-slate">
                Every property has its own character. Explore a few design
                directions to inspire what your own outdoor space could become.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 flex gap-3 border-t border-hair pt-5 text-[0.82rem] leading-relaxed text-slate/85">
                <span aria-hidden className="text-champagne">—</span>
                <span>
                  Design directions shown for inspiration. These are not
                  photographs of completed Glamour Custom Pools projects.
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
          {concepts.map((c, i) => (
            <li key={c.key} className={c.cell}>
              <Reveal y={30} className="h-full">
                <button
                  type="button"
                  ref={(el) => {
                    triggerRefs.current[i] = el;
                  }}
                  onClick={() => open(i)}
                  aria-label={`Open preview: ${c.title}. ${c.description}`}
                  className="group block w-full text-left"
                >
                  <Plate
                    src={c.src}
                    alt={c.alt}
                    className={`${c.ratio} w-full`}
                    imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.045]"
                    sizes="(min-width: 1024px) 55vw, (min-width: 640px) 45vw, 92vw"
                  />
                  <div className="mt-5 flex items-start gap-4">
                    <span className="eyebrow tnum mt-[0.45rem] shrink-0 text-[0.6rem] text-champagne">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[1.4rem] font-normal leading-tight text-ink transition-colors duration-300 group-hover:text-ocean sm:text-[1.55rem]">
                        {c.label}
                      </span>
                      <span
                        aria-hidden
                        className="mt-2 block h-px w-full origin-left scale-x-[0.12] bg-champagne transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                      <span className="mt-3 block text-[0.92rem] leading-relaxed text-slate">
                        {c.description}
                      </span>
                    </span>
                  </div>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <GalleryLightbox index={active} onIndex={setActive} onClose={close} />
    </section>
  );
}
