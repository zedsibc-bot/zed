import Image from "next/image";
import { company, heroFeatures } from "@/app/data";

export default function Hero() {
  return (
    <section id="home" className="bg-bg">
      <div className="relative overflow-hidden">
        <Image
          src="/assets/pdf/pg-16-01.png"
          alt=""
          fill
          preload
          sizes="100vw"
          quality={85}
          className="object-cover object-right"
        />
        <div className="relative z-10 mx-auto flex h-[calc(100dvh-6rem)] w-full max-w-7xl items-center px-6">
          <div className="max-w-[620px] bg-bg p-6 sm:p-8 lg:max-w-[580px] lg:p-10">
            <span className="label-kicker">Est. 2020 · Quezon City</span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold uppercase leading-none text-ink sm:text-4xl lg:text-5xl">
              Zed&apos;s Industrial Builders Corporation
              <span className="mt-3 block text-lg font-bold uppercase tracking-wide text-accent-2 sm:text-xl">
                Hardware Tools &amp; Equipment Trading
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted-2 sm:text-base">
              {company.fullName}. Authorized importer and supplier of
              construction and industrial supplies. From power tools to process
              instrumentation, serving customers nationwide since 2020.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${company.phoneTel}`}
                className="flex min-h-12 items-center justify-center bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent hover:text-white"
              >
                Call {company.phoneDisplay}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex min-h-12 items-center justify-center border-2 border-ink/15 px-7 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
              >
                GET A QUOTE
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-16 grid grid-cols-2 gap-px border border-hairline bg-hairline lg:grid-cols-4">
          {heroFeatures.map((f) => (
            <div key={f.title} className="flex items-center gap-4 bg-bg px-6 py-6">
              <div>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
                  {f.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}