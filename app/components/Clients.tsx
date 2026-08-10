import Image from "next/image";
import { clientsImage } from "@/app/data";

export default function Clients() {
  return (
    <section id="clients" className="bg-bg-darker py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <span className="label-kicker">05 / Clients &amp; Partners</span>
        <div className="mt-4">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Who We Supply</h2>
            <p className="mt-6 text-sm leading-7 text-muted-2">Construction, industrial, water and utilities, agriculture, and private builders—locally and internationally.</p>
            <figure className="mt-10 border border-hairline bg-bg p-3">
              <div className="relative aspect-[4/3] overflow-hidden"><Image src={clientsImage} alt="Tools and hardware on display at Zed's Industrial Builders Corporation" fill sizes="(min-width: 1024px) 50vw, 100vw" quality={85} className="object-cover" /></div>
            </figure>
          </div>
        </div>

      </div>
    </section>
  );
}
