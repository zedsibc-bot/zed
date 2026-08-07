import Image from "next/image";
import { gallery } from "@/app/data";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="label-kicker">06 / Store Gallery</span>
        <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
          Store Gallery
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-2">
          A look inside our physical store at Tandang Sora Avenue, Quezon
          City.
        </p>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((g) => (
            <figure
              key={g.src}
              className={`relative h-full overflow-hidden border border-hairline ${
                g.big ? "row-span-2" : ""
              }`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                quality={85}
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}