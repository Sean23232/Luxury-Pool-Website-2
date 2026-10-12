import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  displayEmail,
  displayTelephone,
  mailHref,
  phoneHref,
  site,
} from "@/config/site";
import { Eyebrow, Reveal, scrollToId } from "@/components/ui";

type Values = {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  interest: string;
  vision: string;
  contactMethod: "Phone Call" | "Text Message" | "Email";
  marketingConsent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  fullName: "",
  phone: "",
  email: "",
  location: "",
  interest: "",
  vision: "",
  contactMethod: "Phone Call",
  marketingConsent: false,
};

const locations = ["Naples", "Marco Island", "Bonita Springs", "Other"];
const interests = [
  "New Custom Pool",
  "Luxury Pool Design",
  "Pool and Outdoor Living",
  "Not Sure Yet",
];

const fieldBase =
  "w-full appearance-none rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[1rem] text-ink transition-colors duration-300 placeholder:text-slate/75 focus:border-champagne focus:outline-none";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="eyebrow block text-[0.6rem] text-slate">
      {children}
      {required && (
        <span className="ml-1 text-champagne" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[0.82rem] leading-snug text-alert">
      {message}
    </p>
  );
}

function validate(v: Values): Errors {
  const e: Errors = {};

  if (!v.fullName.trim()) e.fullName = "Please enter your full name.";

  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Please enter a phone number.";
  else if (digits.length < 7) e.phone = "Please enter a valid phone number.";

  if (v.email.trim()) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim());
    if (!ok) e.email = "Please enter a valid email address, or leave it blank.";
  }

  if (!v.location) e.location = "Please choose a preferred location.";
  if (!v.interest) e.interest = "Please choose what you are interested in.";

  if (v.contactMethod === "Email" && !v.email.trim()) {
    e.email = "An email address is needed if you would prefer an email reply.";
  }

  return e;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Service-area panels can pre-select the location field.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<{ location?: string }>).detail;
      if (detail?.location) {
        setValues((prev) => ({ ...prev, location: detail.location as string }));
        setErrors((prev) => ({ ...prev, location: undefined }));
      }
    };
    window.addEventListener("gcp:prefill", onPrefill);
    return () => window.removeEventListener("gcp:prefill", onPrefill);
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const focusFirstError = (e: Errors) => {
    const order: (keyof Values)[] = [
      "fullName",
      "phone",
      "email",
      "location",
      "interest",
    ];
    const first = order.find((k) => e[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    const payload = {
      ...values,
      email: values.email.trim() || undefined,
      source: "Glamour Custom Pools website enquiry",
    };

    if (!site.formEndpoint) {
      // No backend configured — nothing is transmitted and nothing is claimed.
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? `We could not send your enquiry (${err.message}). Please try again, or call us directly.`
          : "We could not send your enquiry. Please try again, or call us directly.",
      );
    }
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setStatus("idle");
    setServerError(null);
    window.setTimeout(() => {
      formRef.current?.querySelector<HTMLElement>('[name="fullName"]')?.focus();
    }, 40);
  };

  return (
    <section
      id="contact"
      data-rail="Contact"
      data-rail-tone="light"
      className="paper relative bg-stock py-20 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* ── Left: editorial column ── */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Let&rsquo;s talk about your project</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.02] tracking-[-0.015em] text-ink">
                Tell Us What
                <br className="hidden sm:block" /> You&rsquo;re Imagining.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-[32rem] text-[1.02rem] leading-[1.8] text-slate">
                Share a few details about the pool you&rsquo;re considering, and
                we can begin with a conversation about your goals and next steps.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 border-t border-hair">
                <div className="border-b border-hair py-5">
                  <dt className="eyebrow text-[0.58rem] text-slate">Business</dt>
                  <dd className="mt-2 font-display text-[1.5rem] leading-tight text-ink">
                    {site.name}
                  </dd>
                </div>
                <div className="border-b border-hair py-5">
                  <dt className="eyebrow text-[0.58rem] text-slate">Service areas</dt>
                  <dd className="mt-2 text-[0.98rem] leading-relaxed text-ink">
                    {site.serviceAreas.join(", ")}, Florida
                  </dd>
                </div>
                <div className="border-b border-hair py-5">
                  <dt className="eyebrow text-[0.58rem] text-slate">Telephone</dt>
                  <dd className="mt-2 text-[0.98rem] leading-relaxed">
                    {phoneHref() ? (
                      <a
                        href={phoneHref() as string}
                        className="text-ink underline decoration-champagne decoration-1 underline-offset-4 transition-colors hover:text-ocean"
                      >
                        {displayTelephone()}
                      </a>
                    ) : (
                      <span className="text-slate">
                        {displayTelephone()}{" "}
                        <span className="eyebrow ml-1 text-[0.55rem] text-champagne">
                          — to be supplied
                        </span>
                      </span>
                    )}
                  </dd>
                </div>
                <div className="border-b border-hair py-5">
                  <dt className="eyebrow text-[0.58rem] text-slate">Email</dt>
                  <dd className="mt-2 text-[0.98rem] leading-relaxed">
                    {mailHref() ? (
                      <a
                        href={mailHref() as string}
                        className="text-ink underline decoration-champagne decoration-1 underline-offset-4 transition-colors hover:text-ocean"
                      >
                        {displayEmail()}
                      </a>
                    ) : (
                      <span className="text-slate">{displayEmail()}</span>
                    )}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* ── Right: the form ── */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-hair bg-stock-2/70 p-6 sm:p-9 lg:p-10">
              <p className="eyebrow flex items-center gap-3 text-[0.55rem] leading-relaxed text-ocean">
                <span aria-hidden className="h-px w-6 bg-ocean" />
                Concept form — not yet connected to a live inbox
              </p>

              {status === "success" ? (
                <div
                  className="mt-8"
                  role="status"
                  aria-live="polite"
                  tabIndex={-1}
                >
                  <span className="eyebrow text-[0.6rem] text-champagne">
                    Enquiry prepared
                  </span>
                  <h3 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-light leading-tight text-ink">
                    Thank you, {values.fullName.trim().split(" ")[0] || "there"}.
                  </h3>
                  <p className="mt-5 text-[1rem] leading-[1.8] text-slate">
                    Your details have been checked and are ready — but nothing
                    has been sent anywhere. This homepage is a design concept and
                    the form is not yet connected to a live inbox.
                  </p>
                  <p className="mt-4 text-[0.95rem] leading-[1.8] text-slate">
                    Once a form service or backend is configured at{" "}
                    <code className="bg-hair px-1.5 py-0.5 text-[0.85rem] text-ink">
                      formSubmissionEndpoint
                    </code>{" "}
                    in the site configuration, submissions will be delivered
                    directly to {site.name}. Until then, please call or email
                    using the details alongside.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="eyebrow mt-8 inline-flex min-h-[3rem] items-center gap-3 border border-ink/25 px-6 text-[0.62rem] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-stock"
                  >
                    Start another enquiry
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-7">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <Label htmlFor="gcp-name" required>
                        Full name
                      </Label>
                      <input
                        id="gcp-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "gcp-name-err" : undefined}
                        className={`${fieldBase} ${errors.fullName ? "border-alert" : ""}`}
                        placeholder="Your name"
                      />
                      <ErrorText id="gcp-name-err" message={errors.fullName} />
                    </div>

                    <div className="sm:col-span-1">
                      <Label htmlFor="gcp-phone" required>
                        Phone number
                      </Label>
                      <input
                        id="gcp-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        value={values.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "gcp-phone-err" : undefined}
                        className={`${fieldBase} ${errors.phone ? "border-alert" : ""}`}
                        placeholder="(239) 000-0000"
                      />
                      <ErrorText id="gcp-phone-err" message={errors.phone} />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="gcp-email">Email address (optional)</Label>
                      <input
                        id="gcp-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "gcp-email-err" : undefined}
                        className={`${fieldBase} ${errors.email ? "border-alert" : ""}`}
                        placeholder="you@example.com"
                      />
                      <ErrorText id="gcp-email-err" message={errors.email} />
                    </div>

                    <div className="sm:col-span-1">
                      <Label htmlFor="gcp-location" required>
                        Preferred location
                      </Label>
                      <select
                        id="gcp-location"
                        name="location"
                        required
                        value={values.location}
                        onChange={(e) => set("location", e.target.value)}
                        aria-invalid={!!errors.location}
                        aria-describedby={errors.location ? "gcp-location-err" : undefined}
                        className={`field ${fieldBase} pr-8 ${
                          errors.location ? "border-alert" : ""
                        } ${values.location ? "text-ink" : "text-slate/90"}`}
                      >
                        <option value="">Please select</option>
                        {locations.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                      <ErrorText id="gcp-location-err" message={errors.location} />
                    </div>

                    <div className="sm:col-span-1">
                      <Label htmlFor="gcp-interest" required>
                        What are you interested in?
                      </Label>
                      <select
                        id="gcp-interest"
                        name="interest"
                        required
                        value={values.interest}
                        onChange={(e) => set("interest", e.target.value)}
                        aria-invalid={!!errors.interest}
                        aria-describedby={errors.interest ? "gcp-interest-err" : undefined}
                        className={`field ${fieldBase} pr-8 ${
                          errors.interest ? "border-alert" : ""
                        } ${values.interest ? "text-ink" : "text-slate/90"}`}
                      >
                        <option value="">Please select</option>
                        {interests.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      <ErrorText id="gcp-interest-err" message={errors.interest} />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="gcp-vision">
                        Tell us about your vision (optional)
                      </Label>
                      <textarea
                        id="gcp-vision"
                        name="vision"
                        rows={4}
                        value={values.vision}
                        onChange={(e) => set("vision", e.target.value)}
                        className={`${fieldBase} resize-y leading-relaxed`}
                        placeholder="The style you like, how you use your outdoor space, what matters most to you…"
                      />
                    </div>

                    <fieldset className="sm:col-span-2">
                      <legend className="eyebrow text-[0.6rem] text-slate">
                        Preferred contact method
                      </legend>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {(["Phone Call", "Text Message", "Email"] as const).map(
                          (m) => {
                            const on = values.contactMethod === m;
                            return (
                              <label
                                key={m}
                                className={`eyebrow inline-flex min-h-[2.85rem] cursor-pointer items-center border px-5 text-[0.58rem] transition-colors duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-champagne ${
                                  on
                                    ? "border-ink bg-ink text-stock"
                                    : "border-ink/25 text-ink hover:border-ink/60"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="contactMethod"
                                  value={m}
                                  checked={on}
                                  onChange={() => set("contactMethod", m)}
                                  className="sr-only"
                                />
                                {m}
                              </label>
                            );
                          },
                        )}
                      </div>
                    </fieldset>

                    <div className="sm:col-span-2">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          name="marketingConsent"
                          checked={values.marketingConsent}
                          onChange={(e) => set("marketingConsent", e.target.checked)}
                          className="mt-1 size-4 shrink-0 accent-ocean"
                        />
                        <span className="text-[0.86rem] leading-relaxed text-slate">
                          Optional: send me occasional design inspiration and
                          updates about {site.name}. This is separate from my
                          enquiry and is not required — I can unsubscribe at any
                          time.
                        </span>
                      </label>
                    </div>
                  </div>

                  {status === "error" && serverError && (
                    <p
                      role="alert"
                      className="mt-7 border-l-2 border-alert bg-alert/5 px-4 py-3 text-[0.9rem] leading-relaxed text-alert"
                    >
                      {serverError}
                    </p>
                  )}

                  <div className="mt-9 flex flex-col gap-5 border-t border-hair pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="eyebrow inline-flex min-h-[3.4rem] w-full items-center justify-center gap-3 border border-ink bg-ink px-7 text-[0.66rem] text-stock transition-colors duration-300 hover:border-ink-raised hover:bg-ink-raised disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {status === "submitting" ? "Sending…" : "Let’s discuss your pool"}
                    </button>
                    <p className="max-w-[18rem] text-[0.78rem] leading-relaxed text-slate/85">
                      Fields marked <span className="text-champagne">*</span> are
                      required. Your details are used only to reply to this
                      enquiry.
                    </p>
                  </div>
                </form>
              )}
            </div>

            <p className="mt-5 text-[0.8rem] leading-relaxed text-slate/85">
              Live delivery requires a connected backend, form service or email
              integration — configured in{" "}
              <code className="bg-hair px-1.5 py-0.5 text-[0.78rem] text-ink">
                formSubmissionEndpoint
              </code>
              . No enquiry is transmitted from this concept build.
            </p>

            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="eyebrow mt-6 text-[0.58rem] text-slate transition-colors hover:text-ink"
            >
              ← Back to top
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
