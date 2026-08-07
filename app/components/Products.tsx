import { productLines } from "@/app/data";

export default function Products() {
  return (
    <section id="products" className="bg-bg-darker py-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="label-kicker">03 / Product Lines</span>
        <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
          Product Lines
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-2">
          An extensive range of tools and equipment to meet diverse needs. From
          power tools to hand tools, gardening equipment to safety gear.
        </p>

        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {productLines.map((p) => (
            <div
              key={p.title}
              className="bg-bg p-7"
            >
              <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-gold-deep">
                {p.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-[2px] w-[6px] shrink-0 bg-accent-2/70"
                    />
                    <span className="text-sm leading-5 text-muted-2">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}