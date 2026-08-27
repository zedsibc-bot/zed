import Image from "next/image";
import { company } from "@/app/data";
import { MailIcon, PhoneIcon, PinIcon } from "./icons";

export default function BrandsContact() {
  return (
    <section id="contact" className="bg-bg-darker py-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="label-kicker">08 / Brands &amp; Contact</span>
        <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
          Brands We Supply
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-2">
          A selection of the trusted brands we supply for construction,
          industrial, electrical, automotive, and hardware needs.
        </p>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden border border-hairline bg-bg">
          <Image
            src="/brands/brands.jpg"
            alt="Zed's retail and wholesale brand catalogue featuring construction, industrial, electrical, automotive, and hardware suppliers"
            width={1064}
            height={1327}
            sizes="(min-width: 1280px) 1064px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)"
            quality={85}
            className="h-auto w-full"
          />
        </div>

        <div className="mt-24 max-w-3xl">
          <span className="label-kicker">Contact Us</span>
          <h3 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
            Get In Touch
          </h3>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-hairline bg-bg-dark text-gold-deep">
                <PinIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  A New Home for Our Business
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-2">
                  We are excited to announce that we are moving to a new,
                  privately owned location. This new space will provide us with
                  a more stable and permanent home as we continue to grow and
                  serve our valued clients.
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-2">
                  The space is currently being prepared, and we will share
                  further updates regarding our official opening soon.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-hairline bg-bg-dark text-gold-deep">
                <MailIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Email</p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 inline-block text-sm leading-6 text-muted-2 underline-offset-4 hover:text-gold-deep hover:underline"
                >
                  {company.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-hairline bg-bg-dark text-gold-deep">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Phone</p>
                <a
                  href={`tel:${company.phoneTel}`}
                  className="mt-1 inline-block text-sm leading-6 text-muted-2 underline-offset-4 hover:text-gold-deep hover:underline"
                >
                  {company.phoneIntl}
                </a>
                <a
                  href={`tel:${company.secondaryPhoneTel}`}
                  className="mt-1 block text-sm leading-6 text-muted-2 underline-offset-4 hover:text-gold-deep hover:underline"
                >
                  {company.secondaryPhoneIntl}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
