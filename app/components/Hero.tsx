import Image from "next/image";
import { company, heroFeatures } from "@/app/data";
import { PhoneIcon } from "./icons";

export default function Hero() {
  return (
    <section id="home" className="bg-bg">
      <div className="relative overflow-hidden">
        <Image
          src="/assets/img/pg-16-01.webp"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover object-right"
        />
        <div className="relative z-10 mx-auto flex h-[calc(100dvh-6rem)] w-full max-w-7xl items-center px-6">
          <div className="max-w-[580px] bg-bg p-5 sm:p-6 lg:max-w-[540px] lg:p-8">
            <span className="label-kicker">Est. 2020 · Caloocan City</span>
            <h1 className="mt-3 font-heading text-2xl font-extrabold uppercase leading-[1.05] text-ink sm:text-3xl lg:text-4xl">
              Zed&apos;s Industrial Builders Corporation
              <span className="mt-2 block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-accent-2 sm:text-xs">
                Formerly Zed&apos;s Tools Depot · Hardware Tools &amp; Equipment Trading
              </span>
            </h1>
            <p className="mt-3 max-w-lg text-xs leading-5 text-muted-2 sm:text-sm sm:leading-6">
              {company.fullName}. Authorized importer and supplier of construction and industrial supplies. From power tools to process instrumentation, serving customers nationwide since 2020.
            </p>
            <p className="mt-3 max-w-lg border-l-2 border-gold-deep pl-3 text-xs font-medium leading-5 text-ink sm:text-sm sm:leading-6">
              Zed&apos;s—a name synonymous with quality, reliability, and exceptional
              customer service. Trust us to provide the tools and equipment you
              need to bring your ideas to life!
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={`tel:${company.phoneTel}`} className="flex min-h-11 items-center justify-center bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-ink hover:bg-accent hover:text-white">
                Call {company.phoneDisplay}
              </a>
              <a href={`mailto:${company.email}`} className="flex min-h-11 items-center justify-center border-2 border-ink/15 px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-ink hover:border-gold-deep hover:text-gold-deep">
                GET A QUOTE
              </a>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-ink sm:text-sm">
              <span className="flex items-center gap-2 text-muted-2">
                <PhoneIcon className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                Call us:
              </span>
              <a
                href={`tel:${company.phoneTel}`}
                className="underline-offset-4 hover:text-gold-deep hover:underline"
              >
                {company.phoneIntl}
              </a>
              <a
                href={`tel:${company.secondaryPhoneTel}`}
                className="underline-offset-4 hover:text-gold-deep hover:underline"
              >
                {company.secondaryPhoneIntl}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-16 grid grid-cols-2 border border-hairline bg-hairline lg:grid-cols-4">
          {heroFeatures.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4 bg-bg px-6 py-6">
              <div>
                <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">{feature.title}</h2>
                <p className="mt-1 text-xs leading-5 text-muted">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
