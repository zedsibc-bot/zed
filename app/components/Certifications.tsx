"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { certifications } from "@/app/data";

export default function Certifications() {
  const [activeCertification, setActiveCertification] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const certification =
    activeCertification === null ? null : certifications[activeCertification];

  function closeViewer() {
    setActiveCertification(null);
    setActivePage(0);
  }

  const showPage = useCallback((offset: number) => {
    if (!certification) return;
    setActivePage((current) =>
      (current + offset + certification.pages.length) % certification.pages.length
    );
  }, [certification]);

  useEffect(() => {
    if (!certification) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft" && certification.pages.length > 1) showPage(-1);
      if (event.key === "ArrowRight" && certification.pages.length > 1) showPage(1);
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [certification, showPage]);

  return (
    <div id="certifications" className="mt-24 border-t border-hairline pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="label-kicker">07 / Registration</span>
        <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
          Registration
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-2">
          View Zed&apos;s business registrations, permits, and supplier credentials.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certifications.map((item, certificationIndex) => (
            <button
              key={`${item.title}-${item.code}`}
              type="button"
              suppressHydrationWarning
              onClick={(event) => {
                returnFocusRef.current = event.currentTarget;
                setActivePage(0);
                setActiveCertification(certificationIndex);
              }}
              className="group overflow-hidden border border-hairline bg-bg text-left transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-gold-deep hover:shadow-lg hover:shadow-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep"
            >
              <span className="relative block aspect-[4/5] overflow-hidden bg-bg-dark p-3">
                <Image
                  src={item.pages[0].src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  quality={75}
                  className="object-contain p-3 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02]"
                />
              </span>
              <span className="block p-5">
                <span className="block font-heading text-sm font-bold uppercase tracking-wide text-ink">
                  {item.title}
                </span>
                <span className="mt-2 flex items-center justify-between gap-3 text-sm text-muted-2">
                  <span>{item.code}</span>
                  {item.pages.length > 1 && (
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
                      {item.pages.length} pages
                    </span>
                  )}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      {certification && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certification-viewer-title"
          onClick={closeViewer}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-darkest/90 p-4 sm:p-8"
        >
          <div
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-full w-full max-w-5xl flex-col border border-white/20 bg-bg p-4 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
                  Registration
                </p>
                <h3 id="certification-viewer-title" className="mt-2 font-heading text-xl font-bold text-ink sm:text-2xl">
                  {certification.title} · {certification.code}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                suppressHydrationWarning
                onClick={closeViewer}
                className="min-h-11 shrink-0 border border-hairline px-4 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:border-gold-deep hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
              >
                Close
              </button>
            </div>

            <div className="relative mt-5 h-[min(65vh,680px)] min-h-64 bg-bg-darker">
              <Image
                src={certification.pages[activePage].src}
                alt={certification.pages[activePage].alt}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                quality={85}
                className="object-contain p-2"
              />
            </div>

            {certification.pages.length > 1 && (
              <div className="mt-5 flex items-center justify-between gap-4">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => showPage(-1)}
                  className="min-h-11 border border-hairline px-4 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:border-gold-deep hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
                >
                  Previous
                </button>
                <p aria-live="polite" className="text-sm font-semibold text-muted-2">
                  Page {activePage + 1} of {certification.pages.length}
                </p>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => showPage(1)}
                  className="min-h-11 border border-hairline px-4 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:border-gold-deep hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
