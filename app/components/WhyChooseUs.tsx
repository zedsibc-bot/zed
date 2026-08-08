import Image from "next/image";
import { whyChoose, whyImage } from "@/app/data";

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-xl">
            <div className="border border-hairline bg-bg-darker p-3">
              <Image
                src={whyImage}
                alt="Zed's Industrial Builders Corporation, Quezon City"
                width={1296}
                height={864}
                quality={85}
                className="relative w-full"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="h-2 w-2 bg-gold-deep" aria-hidden="true" />
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-muted-2">
                Established 2020 · Quezon City
              </p>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <span className="label-kicker">04 / Why Zed&apos;s</span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted-2">
              We take pride in offering an extensive range of tools and
              equipment. Our carefully curated selection features reputable
              brands known for durability, performance, and customer
              satisfaction.
            </p>

            <div className="mt-10 grid gap-px bg-hairline sm:grid-cols-2">
              {whyChoose.map((w) => (
                <div
                  key={w.title}
                  className="border-l-2 border-gold-deep bg-bg p-6"
                >
                  <h3 className="font-heading text-base font-bold uppercase tracking-wide text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-2">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}