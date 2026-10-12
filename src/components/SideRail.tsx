import { useEffect, useState } from "react";

type RailState = { label: string; tone: "dark" | "light"; index: number };

/**
 * The catalogue "running head": a hairline spine down the left edge of the
 * page with the current section name set vertically, like a bound volume.
 */
export function SideRail() {
  const [state, setState] = useState<RailState>({
    label: "Prologue",
    tone: "dark",
    index: 1,
  });

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rail]"),
    );
    if (sections.length === 0) return;

    const apply = (el: HTMLElement) => {
      const i = sections.indexOf(el);
      setState({
        label: el.dataset.rail ?? "",
        tone: el.dataset.railTone === "light" ? "light" : "dark",
        index: i + 1,
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) apply(visible[0].target as HTMLElement);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const dark = state.tone === "dark";
  const color = dark ? "#F6F3EC" : "#11252B";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-0 z-[70] hidden w-[6.5rem] transition-colors duration-700 lg:block"
      style={{ color }}
    >
      <span
        className="absolute inset-y-0 right-0 w-px transition-colors duration-700"
        style={{
          background: dark ? "rgba(246,243,236,0.16)" : "rgba(17,37,43,0.13)",
        }}
      />
      <span
        className="absolute left-0 top-0 h-16 w-px transition-colors duration-700"
        style={{ background: "#C5A574" }}
      />

      <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-center">
        <div
          className="flex items-center gap-4 px-2 py-5 transition-colors duration-700"
          style={{
            writingMode: "vertical-rl",
            background: dark ? "rgba(11,24,29,0.6)" : "rgba(246,243,236,0.8)",
          }}
        >
          <span
            className="eyebrow text-[0.58rem] opacity-70"
            style={{ transform: "rotate(180deg)" }}
          >
            {state.label}
          </span>
          <span
            className="eyebrow tnum text-[0.55rem]"
            style={{
              transform: "rotate(180deg)",
              color: dark ? "#C5A574" : "#8a6a3c",
            }}
          >
            {String(state.index).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
