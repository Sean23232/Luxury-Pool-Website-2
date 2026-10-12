import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { site } from "@/config/site";
import { CallButton, Wordmark } from "@/components/ui";

export function MobileNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const nodes = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [],
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[95] lg:hidden"
          ref={panelRef}
        >
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
          />
          <div className="absolute inset-x-0 top-0 flex h-[4.75rem] items-center justify-between px-6 sm:px-11">
            <span className="text-stock">
              <Wordmark size="sm" onClick={onClose} />
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex size-11 items-center justify-center border border-stock/35 text-stock transition-colors hover:border-champagne hover:text-champagne"
            >
              <X aria-hidden className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 top-[4.75rem] overflow-y-auto px-6 pb-10 pt-6 sm:px-11">
            <nav aria-label="Mobile">
              <ul className="border-t border-stock/15">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.06 + i * 0.05,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="border-b border-stock/15"
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline gap-5 py-5 text-stock"
                    >
                      <span className="eyebrow tnum w-7 shrink-0 text-[0.6rem] text-champagne">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[2rem] font-light leading-none">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.32, duration: 0.4, ease: "easeOut" }}
              className="mt-9"
            >
              <CallButton variant="ivory" className="w-full">
                Call to discuss your pool
              </CallButton>
              <p className="mt-6 eyebrow text-[0.6rem] leading-relaxed text-stock/55">
                {site.serviceAreas.join(" · ")}
                <br />
                <span className="text-champagne/70">Southwest Florida</span>
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
