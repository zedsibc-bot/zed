import { company } from "@/app/data";

export default function CtaBanner() {
  return (
    <section className="bg-bg-darkest">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-16 text-center lg:flex-row lg:text-left">
        <div className="max-w-2xl">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold">
            From Inquiry To Delivery
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
            Quality products and first-rate services, from inquiry to delivery
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/75">
            Send us your requirements for tools, equipment, fabrication, or
            industrial supplies and we will quote you.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${company.phoneTel}`}
            className="inline-flex min-h-12 items-center bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Call {company.phoneDisplay}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="inline-flex min-h-12 items-center border border-white/60 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
