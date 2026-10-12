import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal primitive: focus moves in on open, Tab is trapped,
 * Escape closes, body scroll locks, and focus returns to the trigger on close.
 */
export function Dialog({
  open,
  onClose,
  titleId,
  closeLabel = "Close",
  children,
}: {
  open: boolean;
  onClose: () => void;
  titleId: string;
  closeLabel?: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      // Move focus to the dialog itself so its label is announced, then let
      // Tab walk into the content in DOM order.
      panelRef.current?.focus();
    }, 40);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      ).filter((n) => !n.hasAttribute("disabled"));
      if (nodes.length === 0) return;
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

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open]);

  const close = useCallback(() => onCloseRef.current(), []);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120]">
          <motion.div
            className="absolute inset-0 bg-ink-deep/[0.97]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28 }}
            onClick={close}
            aria-hidden
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="absolute inset-0 outline-none"
          >
            <div
              className="absolute inset-0 overflow-y-auto overscroll-contain"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              {children}
            </div>

            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="absolute right-4 top-4 z-20 flex size-12 items-center justify-center border border-stock/35 bg-ink-deep/70 text-stock transition-colors duration-200 hover:border-champagne hover:bg-ink-deep hover:text-champagne sm:right-6 sm:top-6"
            >
              <X aria-hidden className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
