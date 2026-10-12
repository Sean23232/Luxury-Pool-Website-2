/**
 * ─────────────────────────────────────────────────────────────────────────────
 * GLAMOUR CUSTOM POOLS — CENTRAL BUSINESS CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Every value the owner must confirm lives here. Values set to `null` are
 * unfilled placeholders and are rendered as clearly-labelled placeholders in
 * the UI — never as invented business data.
 *
 * TO GO LIVE, UPDATE:
 *   1. telephone        → verified business number (digits only, e.g. "1234567890")
 *   2. telephoneDisplay → verified number as it should appear on screen
 *   3. email            → verified business email address
 *   4. formEndpoint     → backend / form-service URL that accepts POST JSON
 *   5. canonicalUrl     → final production domain
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type NavItem = { label: string; href: string };

export const site = {
  name: "Glamour Custom Pools",
  wordmarkPrimary: "Glamour",
  wordmarkSecondary: "Custom Pools",

  /** null = not yet supplied by the owner. Do NOT invent a number. */
  telephone: null as string | null,
  /** Display string shown on screen. null = shows a labelled placeholder. */
  telephoneDisplay: null as string | null,

  /** null = not yet supplied by the owner. */
  email: null as string | null,

  /** null = no live inbox connected. The form never claims delivery when null. */
  formEndpoint: null as string | null,

  canonicalUrl: "https://example.com/",

  serviceAreas: ["Naples", "Marco Island", "Bonita Springs"] as const,

  nav: [
    { label: "Home", href: "#top" },
    { label: "Our Approach", href: "#approach" },
    { label: "Pool Designs", href: "#designs" },
    { label: "Service Areas", href: "#areas" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  social: [] as { label: string; href: string }[],

  images: {
    hero: "images/hero.jpg",
    intro: "images/intro.jpg",
    cta: "images/cta-goldenhour.jpg",
    detail: "images/detail.jpg",
    concepts: {
      infinity: "images/concept-infinity.jpg",
      resort: "images/concept-resort.jpg",
      classic: "images/concept-classic.jpg",
      family: "images/concept-family.jpg",
      tropical: "images/concept-tropical.jpg",
      evening: "images/concept-evening.jpg",
    },
  },
} as const;

/** Returns a tel: href, or null while the owner's number is still unconfirmed. */
export function phoneHref(): string | null {
  if (!site.telephone) return null;
  const digits = site.telephone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

/** Returns a mailto: href, or null while the owner's email is still unconfirmed. */
export function mailHref(): string | null {
  return site.email ? `mailto:${site.email}` : null;
}

/** Human-readable placeholders shown wherever verified details are pending. */
export const placeholders = {
  telephone: "Telephone — pending owner confirmation",
  email: "Email — pending owner confirmation",
} as const;

export function displayTelephone(): string {
  return site.telephoneDisplay ?? site.telephone ?? placeholders.telephone;
}

export function displayEmail(): string {
  return site.email ?? placeholders.email;
}
