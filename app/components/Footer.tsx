import Image from "next/image";
import { company } from "@/app/data";
import { MailIcon, PhoneIcon } from "./icons";

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Certifications", href: "#gallery" },
];

const supportLinks = [
  { label: "Contact", href: "#contact" },
  { label: "Get A Quote", href: "#contact" },
  { label: "Brands", href: "#contact" },
  { label: "Clients", href: "#clients" },
  { label: "Why Choose Us", href: "#why-us" },
];

export default function Footer() {
  return (
    <footer className="bg-bg">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
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
              Zed&apos;s <span className="text-accent-2">Industrial</span> Builders
              Corporation
            </span>
          </a>
          <p className="mt-5 text-sm leading-6 text-muted-2">
            Hardware tools and equipment trading. High-standard construction
            and industrial supplies since {company.established}.
          </p>
          <div className="mt-6 space-y-2">
            <a
              href={`tel:${company.phoneTel}`}
              className="flex items-center gap-2.5 text-sm text-muted-2 transition-colors hover:text-gold-deep"
            >
              <PhoneIcon className="h-4 w-4 text-gold-deep" />
              {company.phoneIntl}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2.5 text-sm text-muted-2 transition-colors hover:text-gold-deep"
            >
              <MailIcon className="h-4 w-4 text-gold-deep" />
              {company.email}
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-ink">
            Company
          </h3>
          <ul className="mt-5 space-y-3">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm capitalize text-muted-2 transition-colors hover:text-gold-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold text-ink">
            Useful Links
          </h3>
          <ul className="mt-5 space-y-3">
            {supportLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm capitalize text-muted-2 transition-colors hover:text-gold-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hairline-top">
        <p className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-muted-faint">
          © 2026 Zed&apos;s Industrial Builders Corporation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}