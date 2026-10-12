import { site } from "@/config/site";
import { Eyebrow, Reveal, scrollToId } from "@/components/ui";

const COAST =
  "M 150 -10 C 168 40, 176 62, 200 84 C 218 100, 208 128, 216 158 C 224 190, 210 214, 220 244 C 230 270, 214 294, 226 320 C 236 346, 218 366, 206 392 C 196 414, 208 436, 198 460 C 190 480, 178 500, 172 530";

type Area = {
  name: string;
  short: string;
  body: string;
  x: number;
  y: number;
};

const areas: Area[] = [
  {
    name: "Naples, Florida",
    short: "Naples",
    body: "Custom pool possibilities for the homes and outdoor spaces of Naples.",
    x: 56.5,
    y: 46.9,
  },
  {
    name: "Marco Island, Florida",
    short: "Marco Island",
    body: "Explore pool concepts suited to your property and your vision for island living.",
    x: 53,
    y: 75.4,
  },
  {
    name: "Bonita Springs, Florida",
    short: "Bonita Springs",
    body: "Consider a custom outdoor space designed to complement your home and lifestyle.",
    x: 51.5,
    y: 16.2,
  },
];

function selectArea(name: string) {
  window.dispatchEvent(
    new CustomEvent("gcp:prefill", { detail: { location: name } }),
  );
  scrollToId("contact");
}

export function ServiceAreas() {
  return (
    <section
      id="areas"
      data-rail="Service Areas"
      data-rail-tone="light"
      className="paper relative bg-stock-2 py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Where we build</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,5.2vw,4.4rem)] font-light leading-[1.02] tracking-[-0.015em] text-ink">
                Proudly Focused on
                <br className="hidden sm:block" /> Southwest Florida.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <Reveal delay={0.14}>
              <p className="text-[1.02rem] leading-[1.8] text-slate">
                Exploring a new pool for your property? Start a conversation
                about your vision and your location.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-12">
          {/* Schematic coastal orientation graphic — no office location implied */}
          <Reveal className="lg:col-span-5" y={30}>
            <div className="relative w-full overflow-hidden border border-hair bg-stock">
              <svg
                viewBox="0 0 400 520"
                role="img"
                aria-label="Schematic orientation graphic of the Southwest Florida coastline showing the relative positions of Bonita Springs, Naples and Marco Island."
                className="block h-auto w-full"
              >
                <defs>
                  <pattern
                    id="gcp-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#C5A574"
                      strokeOpacity="0.22"
                      strokeWidth="0.6"
                    />
                  </pattern>
                </defs>

                <rect width="400" height="520" fill="url(#gcp-grid)" />

                {/* Water */}
                <path
                  d={`${COAST} L -10 530 L -10 -10 Z`}
                  fill="#426E70"
                  fillOpacity="0.12"
                />
                {/* Land */}
                <path
                  d={`${COAST} L 420 530 L 420 -10 Z`}
                  fill="#11252B"
                  fillOpacity="0.05"
                />
                {/* Coastline */}
                <path
                  d={COAST}
                  fill="none"
                  stroke="#11252B"
                  strokeOpacity="0.55"
                  strokeWidth="1.6"
                />

                {/* Gulf hairlines */}
                {[130, 210, 290, 370, 450].map((yy, i) => (
                  <line
                    key={yy}
                    x1={30 + i * 8}
                    y1={yy}
                    x2={95 + i * 8}
                    y2={yy}
                    stroke="#426E70"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                  />
                ))}

                {/* Barrier island suggestion near Marco */}
                <path
                  d="M 186 400 C 178 414, 176 432, 182 446"
                  fill="none"
                  stroke="#11252B"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />

                <text
                  x="46"
                  y="486"
                  fill="#426E70"
                  fillOpacity="0.75"
                  fontFamily="Manrope, sans-serif"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="4"
                >
                  GULF OF MEXICO
                </text>
                <text
                  x="316"
                  y="44"
                  fill="#11252B"
                  fillOpacity="0.45"
                  fontFamily="Manrope, sans-serif"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="3.4"
                >
                  FLORIDA
                </text>
              </svg>

              {/* Interactive city markers */}
              {areas.map((a) => (
                <button
                  key={a.short}
                  type="button"
                  onClick={() => selectArea(a.name)}
                  aria-label={`Discuss a custom pool in ${a.name} — prefill the enquiry form`}
                  className="group absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                >
                  <span
                    aria-hidden
                    className="block size-2.5 rotate-45 bg-ocean transition-colors duration-300 group-hover:bg-champagne"
                  />
                  <span className="eyebrow text-[0.5rem] leading-tight text-ink/75 transition-colors duration-300 group-hover:text-ink">
                    {a.short}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-[0.8rem] leading-relaxed text-slate/85">
              Schematic orientation only — showing the three areas served. No
              office location is implied.
            </p>
          </Reveal>

          {/* Location panels */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ul>
              {areas.map((a, i) => (
                <Reveal
                  as="li"
                  key={a.name}
                  delay={i * 0.08}
                  className="group border-t border-hair last:border-b"
                >
                  <div className="px-1 py-7 sm:py-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="font-display text-[clamp(1.55rem,2.6vw,2.15rem)] font-normal leading-tight text-ink">
                        {a.name}
                      </h3>
                      <span className="eyebrow tnum text-[0.6rem] text-champagne">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 max-w-[34rem] text-[0.99rem] leading-[1.75] text-slate">
                      {a.body}
                    </p>
                    <button
                      type="button"
                      onClick={() => selectArea(a.name)}
                      className="eyebrow mt-5 inline-flex min-h-[2.75rem] items-center gap-3 border-b border-ink/25 pb-1 text-[0.6rem] text-ink transition-colors duration-300 hover:border-champagne hover:text-ocean"
                    >
                      Discuss a pool here
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.16}>
              <p className="mt-8 flex gap-3 text-[0.82rem] leading-relaxed text-slate/85">
                <span aria-hidden className="text-champagne">—</span>
                <span>
                  Service coverage, addresses and any office details are added
                  once confirmed by {site.name}.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
