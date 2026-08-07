import { services } from "@/app/data";

export default function Services() {
  return (
    <section id="services" className="bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="label-kicker">02 / What We Supply</span>
        <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
          Services &amp; Supplies
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-2">
          Complete hardware, construction and industrial solutions. From
          fabrication services to process instrumentation.
        </p>

        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group flex flex-col bg-bg p-7"
            >
              <span className="font-heading text-xs font-bold text-muted-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-heading text-base font-bold uppercase tracking-wide text-gold-deep">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}