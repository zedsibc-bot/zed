import { company } from "@/app/data";

export default function CtaBanner() {
  return (
    <section className="bg-gold">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-16 text-center lg:flex-row lg:text-left">
        <div className="max-w-2xl">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            From Inquiry To Delivery
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-ink sm:text-3xl">
            Quality products and first-rate services, from inquiry to delivery
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink/80">
            Send us your requirements for tools, equipment, fabrication, or
            industrial supplies and we will quote you.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${company.phoneTel}`}
            className="inline-flex min-h-12 items-center bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-muted-dark"
          >
            Call {company.phoneDisplay}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="inline-flex min-h-12 items-center border-2 border-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-gold"
          >
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}