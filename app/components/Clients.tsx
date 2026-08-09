import Image from "next/image";
import { clients, clientsImage } from "@/app/data";

const supplySectors = [
  { sector: "Construction & Development", names: "TAFT HDRO · MASGRO · MAXIPACIFIC · BALDO CONSTRUCTION · WOA KING BUILDERS · ROCK POINT" },
  { sector: "Architecture & Design", names: "TIER ONE ARCHITECTURE" },
  { sector: "Water & Utilities", names: "METRO PACIFIC WATER SOLUTION · MATUNO RIVER" },
  { sector: "Agriculture & Food", names: "PHILMALAY POULTRY BREEDERS · CAVITE BIOFUEL PRODUCERS · AEROWEST FOOD CORP." },
  { sector: "Industrial & Fabrication", names: "FABWERX · VTSA INTERNATIONAL · INNOV BLOCK · IRAYA VENTURES · MECS" },
  { sector: "Private & Terminal", names: "CATHY CEPEDA · ART JOHN LY · CALACA BAY TERMINAL" },
];

export default function Clients() {
  return (
    <section id="clients" className="bg-bg-darker py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <span className="label-kicker">05 / Clients &amp; Partners</span>
        <div className="mt-4 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Who We Supply</h2>
            <p className="mt-6 text-sm leading-7 text-muted-2">Construction, industrial, water and utilities, agriculture, and private builders—locally and internationally.</p>
            <figure className="mt-10 border border-hairline bg-bg p-3">
              <div className="relative aspect-[4/3] overflow-hidden"><Image src={clientsImage} alt="Tools and hardware on display at Zed's Industrial Builders Corporation" fill sizes="(min-width: 1024px) 50vw, 100vw" quality={85} className="object-cover" /></div>
            </figure>
          </div>

          <dl className="border-y border-hairline">
            {supplySectors.map((sector) => (
              <div key={sector.sector} className="grid gap-2 border-b border-hairline py-5 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-heading text-xs font-bold uppercase tracking-wide text-ink">{sector.sector}</dt>
                <dd className="text-sm leading-6 text-muted-2">{sector.names}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid border border-hairline bg-hairline lg:grid-cols-2">
          <div className="bg-bg p-7 sm:p-8">
            <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-ink">Local Clients</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {clients.local.map((client) => <span key={client} className="border border-hairline px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-2">{client}</span>)}
            </div>
          </div>
          <div className="bg-bg p-7 sm:p-8">
            <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-ink">International Clients</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {clients.international.map((client) => <span key={client} className="border border-hairline px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-2">{client}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
