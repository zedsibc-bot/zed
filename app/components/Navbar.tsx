"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { company } from "@/app/data";
import {
  CloseIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
} from "./icons";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Permits", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      );

    const pick = () => {
      const refY = 110;
      let current = sections[0]?.id ?? ids[0];
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= refY) {
          current = el.id;
        } else {
          break;
        }
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        current = sections[sections.length - 1]?.id ?? current;
      }
      return current;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setActive(pick());
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function goTo(href: string) {
    const id = href.slice(1);
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
      setActive(id);
    });
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="bg-gold">
        <div className="mx-auto flex min-h-12 max-w-7xl items-center justify-between gap-6 px-6 py-2 text-xs font-semibold text-ink">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${company.phoneTel}`}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {company.phoneDisplay}
            </a>
            <a
              href={`tel:${company.secondaryPhoneTel}`}
              className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 lg:flex"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {company.secondaryPhoneDisplay}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 md:flex"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {company.email}
            </a>
          </div>
          <p className="hidden tracking-wider uppercase sm:block">
            Hardware Tools &amp; Equipment Trading
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-bg transition-shadow duration-300 ${
          scrolled || open ? "shadow-md shadow-black/5" : ""
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
          <a
            href="#home"
            className="flex items-center gap-2.5 font-heading text-xl font-bold text-ink"
          >
            <span className="relative block h-10 w-10 shrink-0">
              <Image
                src="/logo/logo.jpg"
                alt="Zed's Industrial Builders Corporation"
                fill
                sizes="40px"
                className="object-contain"
              />
            </span>
            <span>
              Zed&apos;s <span className="text-accent-2">Industrial</span>{" "}
              <span className="hidden sm:inline">Builders Corporation</span>
            </span>
          </a>

          <ul className="hidden items-center gap-6 text-sm font-semibold capitalize text-muted-2 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(l.href);
                  }}
                  aria-current={active === l.href.slice(1) ? "true" : undefined}
                  className={`transition-colors hover:text-gold-deep ${
                    active === l.href.slice(1)
                      ? "text-gold-deep underline decoration-gold-deep underline-offset-8"
                      : ""
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${company.phoneTel}`}
              className="hidden min-h-12 items-center gap-2 px-3 py-3 text-sm font-bold uppercase tracking-wide text-gold-deep transition-colors hover:text-accent-2 md:flex"
            >
              <PhoneIcon className="h-4 w-4" />
              {company.phoneDisplay}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                goTo("#contact");
              }}
              className="hidden min-h-12 bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent hover:text-white sm:inline-block"
            >
              Get A Quote
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-12 w-12 items-center justify-center text-ink lg:hidden"
            >
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="fixed inset-0 top-16 z-40 flex flex-col bg-bg px-8 pb-10 pt-6 lg:hidden">
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(l.href);
                    }}
                    aria-current={
                      active === l.href.slice(1) ? "true" : undefined
                    }
                    className={`block border-b border-hairline py-4 font-heading text-2xl font-semibold capitalize text-ink transition-colors hover:text-gold-deep ${
                      active === l.href.slice(1) ? "text-gold-deep" : ""
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("#contact");
                }}
                className="bg-gold px-6 py-4 text-center text-base font-bold uppercase tracking-wide text-ink"
              >
                Get A Quote
              </a>
              <a
                href={`mailto:${company.email}`}
                className="border border-ink/20 px-6 py-4 text-center text-base font-semibold uppercase tracking-wide text-ink"
              >
                {company.email}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
