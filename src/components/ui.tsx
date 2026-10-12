import { useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { phoneHref, site } from "@/config/site";

/* ─────────────────────────────  TONE  ───────────────────────────── */

export type Tone = "ink" | "stock";

/* ─────────────────────────  WORDMARK  ───────────────────────────── */
/* Typographic lockup — Cormorant display over a champagne hairline and
   tracked Manrope small caps. Uses currentColor so it reverses on navy. */

export function Wordmark({
  size = "lg",
  className = "",
  href = "#top",
  onClick,
}: {
  size?: "lg" | "sm";
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const main =
    size === "lg"
      ? "text-[clamp(1.3rem,1.5vw,1.8rem)]"
      : "text-[1.1rem] sm:text-[1.2rem]";
  const sub = size === "lg" ? "text-[0.56rem]" : "text-[0.5rem]";

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={`${site.name} — back to top of page`}
      className={`group inline-flex w-max flex-col items-stretch text-current ${className}`}
    >
      <span
        className={`font-display font-medium uppercase leading-none tracking-[0.2em] transition-opacity duration-300 group-hover:opacity-80 ${main}`}
      >
        {site.wordmarkPrimary}
      </span>
      <span aria-hidden className="my-[0.4em] h-px w-full bg-champagne/70" />
      <span
        className={`font-sans font-bold uppercase leading-none tracking-[0.3em] ${sub}`}
      >
        {site.wordmarkSecondary}
      </span>
    </a>
  );
}

/* ─────────────────────────  EYEBROW  ────────────────────────────── */

export function Eyebrow({
  children,
  tone = "ink",
  rule = true,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  rule?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-4 ${className}`}
      style={{ color: tone === "ink" ? "#11252B" : "#F6F3EC" }}
    >
      <span aria-hidden className="h-px w-9 shrink-0 bg-champagne" />
      <span className="eyebrow">{children}</span>
      {rule && <span aria-hidden className="h-px w-10 shrink-0 bg-champagne/45 sm:w-16" />}
    </span>
  );
}

/* ─────────────────────────  REVEAL  ─────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const shared = {
    className,
    variants,
    initial: "hidden" as const,
    whileInView: "show" as const,
      viewport: { once: true, amount: 0.15 },
  };

  if (reduce) {
    if (as === "span") return <span className={className}>{children}</span>;
    if (as === "li") return <li className={className}>{children}</li>;
    return <div className={className}>{children}</div>;
  }

  if (as === "span") return <motion.span {...shared}>{children}</motion.span>;
  if (as === "li") return <motion.li {...shared}>{children}</motion.li>;
  return <motion.div {...shared}>{children}</motion.div>;
}

/* ─────────────────────────  BUTTONS  ────────────────────────────── */

type Variant = "navy" | "ivory" | "ghostLight" | "ghostDark";

const variantClasses: Record<Variant, string> = {
  navy: "bg-ink text-stock border border-ink hover:bg-ink-raised hover:border-ink-raised",
  ivory: "bg-stock text-ink border border-stock hover:bg-white hover:border-white",
  ghostLight:
    "bg-transparent text-stock border border-stock/45 hover:bg-stock hover:text-ink hover:border-stock",
  ghostDark:
    "bg-transparent text-ink border border-ink/25 hover:bg-ink hover:text-stock hover:border-ink",
};

const baseBtn =
  "eyebrow inline-flex min-h-[3.25rem] items-center justify-center gap-3 px-6 text-center text-[0.6rem] leading-[1.35] transition-[background-color,color,border-color,transform] duration-300 ease-out active:translate-y-px sm:px-7 sm:text-[0.68rem]";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: "phone" | "arrow" | "none";
};

export function ButtonLink({
  href,
  onClick,
  ariaLabel,
  ...rest
}: CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
    onClick?: () => void;
    ariaLabel?: string;
  }) {
  const { variant = "navy", className = "", icon = "none" } = rest;
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseBtn} ${variantClasses[variant]} ${className}`}
    >
      <span>{rest.children}</span>
      {icon === "phone" && <Phone aria-hidden className="size-4 shrink-0" strokeWidth={1.6} />}
      {icon === "arrow" && <ArrowUpRight aria-hidden className="size-4 shrink-0" strokeWidth={1.6} />}
    </a>
  );
}

/**
 * Every phone CTA in the site routes through this component.
 * While the owner's number is unconfirmed it falls back to the contact
 * section — no fabricated tel: link is ever produced.
 */
export function CallButton({
  children,
  variant = "navy",
  className = "",
  fallbackHref = "#contact",
  icon = "phone",
}: CommonProps & { fallbackHref?: string }) {
  const href = phoneHref() ?? fallbackHref;
  return (
    <ButtonLink
      href={href}
      variant={variant}
      className={className}
      icon={icon}
      ariaLabel={
        phoneHref()
          ? `Call Glamour Custom Pools on ${site.telephone}`
          : `${children as string} — business number pending, goes to the enquiry form`
      }
    >
      {children}
    </ButtonLink>
  );
}

/* ─────────────────────────  PLATE / IMAGE  ──────────────────────── */

/**
 * An image "plate" from the catalogue. If the asset fails to load it degrades
 * to a designed navy/champagne surface rather than a broken image.
 */
export function Plate({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  fill = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  fill?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const position = fill ? "absolute inset-0" : "relative";

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${position} overflow-hidden bg-ink ${className}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 95% at 22% 8%, #1B343B 0%, #11252B 55%, #0B181D 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #C5A574 0 1px, transparent 1px 16px)",
          }}
        />
        <span className="absolute bottom-4 left-4 eyebrow text-[0.6rem] text-champagne/80">
          Image pending
        </span>
      </div>
    );
  }

  return (
    <div className={`${position} overflow-hidden bg-ink-deep ${className}`}>
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        decoding={eager ? "sync" : "async"}
        fetchPriority={eager ? "high" : "auto"}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/* ───────────────────────  MISC STRUCTURE  ───────────────────────── */

export function SectionHead({
  eyebrow,
  title,
  intro,
  tone = "ink",
  titleId,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  titleId?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={titleId}
          className={`mt-7 font-display font-light leading-[0.98] tracking-[-0.01em] ${
            tone === "ink" ? "text-ink" : "text-stock"
          } text-[clamp(2.1rem,5vw,4.25rem)]`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.14}>
          <p
            className={`mt-6 max-w-[36rem] text-[1.02rem] leading-[1.75] ${
              tone === "ink" ? "text-slate" : "text-stock/70"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}
