import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { site } from "@/config/site";
import { CallButton, Wordmark } from "@/components/ui";
import { MobileNavigation } from "@/components/MobileNavigation";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-[background-color,box-shadow,border-color] duration-500 ${
          solid
            ? "border-b border-champagne/25 bg-ink/95 shadow-[0_18px_40px_-32px_rgba(11,24,29,0.9)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell-flush flex h-[4.75rem] items-center justify-between gap-6 lg:h-[6rem]">
          <span
            className="text-stock"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
              });
            }}
          >
            <span className="hidden sm:inline-flex">
              <Wordmark size="lg" />
            </span>
            <span className="sm:hidden">
              <Wordmark size="sm" />
            </span>
          </span>

          <nav aria-label="Primary" className="hidden min-w-0 items-center gap-5 lg:flex xl:gap-7">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative eyebrow whitespace-nowrap text-[0.58rem] tracking-[0.2em] text-stock/85 transition-colors duration-300 hover:text-stock"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden xl:block">
              <CallButton
                variant="ivory"
                className="whitespace-nowrap px-4! text-[0.58rem]! tracking-[0.2em]! min-h-[2.9rem]!"
              >
                Call to discuss your pool
              </CallButton>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex size-11 items-center justify-center border border-stock/35 text-stock transition-colors duration-300 hover:border-champagne hover:text-champagne lg:hidden"
            >
              <Menu
                aria-hidden
                className="size-5"
                strokeWidth={1.5}
                style={{
                  transform: menuOpen ? "rotate(90deg)" : "none",
                  transition: "transform 0.35s ease",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
