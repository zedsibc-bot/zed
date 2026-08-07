import { clients } from "@/app/data";

const supplySectors = [
  {
    sector: "Construction & Development",
    names: "TAFT HDRO · MASGRO · MAXIPACIFIC · BALDO CONSTRUCTION · WOA KING BUILDERS · ROCK POINT",
  },
  {
    sector: "Architecture & Design",
    names: "TIER ONE ARCHITECTURE",
  },
  {
    sector: "Water & Utilities",
    names: "METRO PACIFIC WATER SOLUTION · MATUNO RIVER",
  },
  {
    sector: "Agriculture & Food",
    names: "PHILMALAY POULTRY BREEDERS · CAVITE BIOFUEL PRODUCERS · AEROWEST FOOD CORP.",
  },
  {
    sector: "Industrial & Fabrication",
    names: "FABWERX · VTSA INTERNATIONAL · INNOV BLOCK · IRAYA VENTURES · MECS",
  },
  {
    sector: "Private & Terminal",
    names: "CATHY CEPEDA · ART JOHN LY · CALACA BAY TERMINAL",
  },
];

export default function Clients() {
  return (
    <section id="clients" className="bg-bg-darker py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div>
          <span className="label-kicker">05 / Clients &amp; Partners</span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Who We Supply
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted-2">
              Construction, industrial, water &amp; utilities, agriculture,
              and private builders — locally and internationally.
            </p>

            <div className="mt-10 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {supplySectors.map((s) => (
                <div key={s.sector} className="bg-bg p-6">
                  <p className="font-heading text-xs font-bold uppercase tracking-wide text-gold-deep">
                    {s.sector}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-muted-2">
                    {s.names}
                  </p>
                </div>
              ))}
            </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div className="border border-hairline bg-bg p-8">
            <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-ink">
              Local Clients
            </h3>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {clients.local.map((c) => (
                <span
                  key={c}
                  className="border border-hairline px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-2"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-hairline bg-bg p-8">
            <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-ink">
              International Clients
            </h3>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {clients.international.map((c) => (
                <span
                  key={c}
                  className="border border-gold-deep/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gold-deep"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}