import { useState } from "react";
import {
  displayEmail,
  displayTelephone,
  mailHref,
  phoneHref,
  site,
} from "@/config/site";
import { Wordmark } from "@/components/ui";
import { Dialog } from "@/components/Dialog";

type Doc = "privacy" | "accessibility" | null;

function DocDialog({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  const privacy = doc === "privacy";
  return (
    <Dialog
      open={doc !== null}
      onClose={onClose}
      titleId="footer-doc-title"
      closeLabel="Close this document"
    >
      <div className="flex min-h-full items-start justify-center px-4 py-20 sm:px-8 sm:py-24">
        <article className="w-full max-w-[46rem] border border-hair bg-stock p-6 text-ink sm:p-10">
          <span className="eyebrow text-[0.58rem] text-champagne">
            {privacy ? "Draft policy" : "Accessibility information"}
          </span>
          <h2
            id="footer-doc-title"
            className="mt-4 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-light leading-tight"
          >
            {privacy ? "Privacy Policy" : "Accessibility Statement"}
          </h2>
          <div className="mt-6 space-y-4 text-[0.98rem] leading-[1.8] text-slate">
            {privacy ? (
              <>
                <p>
                  <strong className="font-semibold text-ink">
                    Draft — not yet in force.
                  </strong>{" "}
                  This document is a working draft for review by{" "}
                  {site.name} and must be reviewed against applicable privacy law
                  before publication.
                </p>
                <p>
                  The enquiry form on this site asks for your name, telephone
                  number, an optional email address, your preferred location, the
                  type of project you are interested in, an optional description
                  of your project, your preferred contact method, and an optional
                  choice about receiving marketing updates.
                </p>
                <p>
                  Details you submit are used only to respond to your enquiry and,
                  if you separately opt in, to send occasional updates. Marketing
                  consent is never assumed or pre-ticked, and it is not required
                  to submit an enquiry.
                </p>
                <p>
                  This homepage is a design concept. No backend, form service or
                  analytics provider is connected, so no personal information is
                  transmitted from this build. A live privacy notice covering
                  retention, third-party processors, and your rights will be
                  published when the form is connected and the business confirms
                  its practices.
                </p>
              </>
            ) : (
              <>
                <p>
                  {site.name} is committed to making this website usable by the
                  widest possible audience, regardless of technology or ability.
                </p>
                <p>
                  <strong className="font-semibold text-ink">
                    What has been done here:
                  </strong>{" "}
                  semantic landmarks and a single clear heading hierarchy; visible
                  keyboard focus indicators on every interactive element; labelled
                  form controls with inline, announced error messages; descriptive
                  alternative text on meaningful images; sufficient colour contrast
                  for body text; touch targets of at least 44&nbsp;pixels; a
                  modal dialog that traps focus, responds to Escape and restores
                  focus on close; and full respect for the{" "}
                  <em>prefers-reduced-motion</em> setting, which disables
                  entrance animations and smooth scrolling.
                </p>
                <p>
                  Navigation, gallery controls and the enquiry form are operable
                  entirely from the keyboard. Images that fail to load degrade to a
                  designed surface rather than a broken element.
                </p>
                <p>
                  Known limitations of this concept build: the enquiry form is not
                  yet connected to a live inbox, telephone and email details are
                  pending confirmation from the business, and a full accessibility
                  audit should be completed before launch. If you encounter a
                  barrier, please contact the business so it can be addressed.
                </p>
              </>
            )}
          </div>
        </article>
      </div>
    </Dialog>
  );
}

export function Footer() {
  const [doc, setDoc] = useState<Doc>(null);
  const year = new Date().getFullYear();

  const contactRows = [
    {
      label: "Telephone",
      value: displayTelephone(),
      href: phoneHref(),
    },
    { label: "Email", value: displayEmail(), href: mailHref() },
  ];

  return (
    <footer
      data-rail="Colophon"
      data-rail-tone="dark"
      className="relative bg-ink text-stock"
    >
      <div className="shell py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <span className="inline-flex text-stock">
              <Wordmark size="lg" />
            </span>
            <p className="mt-7 max-w-[24rem] font-display text-[1.3rem] font-light italic leading-snug text-stock/75">
              Custom pool inspiration for a more beautiful way to experience
              outdoor living.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <h2 className="eyebrow text-[0.58rem] text-champagne">Explore</h2>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.98rem] text-stock/75 transition-colors duration-300 hover:text-champagne"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-3 md:col-start-10">
            <h2 className="eyebrow text-[0.58rem] text-champagne">Contact</h2>
            <dl className="mt-5 space-y-5">
              {contactRows.map((row) => (
                <div key={row.label}>
                  <dt className="eyebrow text-[0.54rem] text-stock/55">
                    {row.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-stock/85">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="underline decoration-champagne/60 underline-offset-4 transition-colors hover:text-champagne"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-stock/60">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="eyebrow text-[0.52rem] text-stock/45">
                  Service areas
                </dt>
                <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-stock/85">
                  {site.serviceAreas.join(", ")}, Florida
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-14 flex flex-col gap-6 border-t border-stock/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.84rem] text-stock/65">
            © <span className="tnum">{year}</span> {site.name}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <button
              type="button"
              onClick={() => setDoc("privacy")}
              className="eyebrow text-[0.56rem] text-stock/65 underline decoration-champagne/50 underline-offset-4 transition-colors hover:text-champagne"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setDoc("accessibility")}
              className="eyebrow text-[0.56rem] text-stock/65 underline decoration-champagne/50 underline-offset-4 transition-colors hover:text-champagne"
            >
              Accessibility
            </button>
            {site.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="eyebrow text-[0.56rem] text-stock/65 transition-colors hover:text-champagne"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-7 max-w-[62rem] border-l-2 border-champagne/60 pl-4 text-[0.78rem] leading-relaxed text-stock/45">
          Homepage concept for review. Business telephone number, email address,
          privacy policy, service details and live enquiry delivery are pending
          confirmation from {site.name}. Photography and design directions shown
          are illustrative and do not represent completed projects.
        </p>
      </div>

      <DocDialog doc={doc} onClose={() => setDoc(null)} />
    </footer>
  );
}
