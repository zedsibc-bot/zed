import Image from "next/image";
import { aboutImages, company } from "@/app/data";
import GrowthTimeline from "./GrowthTimeline";

export default function About() {
  return (
    <section id="about" className="bg-bg-darker py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative pb-12 lg:pb-20">
          <div className="relative aspect-[5/4] overflow-hidden border border-hairline bg-bg p-3">
            <Image src={aboutImages[0].src} alt={aboutImages[0].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={85} className="object-cover p-3" />
          </div>
          <div className="relative mt-5 ml-auto aspect-[4/3] w-[78%] overflow-hidden border border-hairline bg-bg p-3 lg:absolute lg:-bottom-4 lg:-right-4 lg:mt-0">
            <Image src={aboutImages[1].src} alt={aboutImages[1].alt} fill sizes="(min-width: 1024px) 38vw, 80vw" quality={85} className="object-cover p-3" />
          </div>
        </div>

        <div className="max-w-2xl">
          <span className="label-kicker">01 / About Us</span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">Built from the ground up.</h2>
          <p className="mt-6 text-sm leading-7 text-muted-2">
            {company.name} has been revolutionizing the hardware industry since its inception in {company.established}. What began as an online store quickly gained popularity among DIY enthusiasts, professionals, and homeowners seeking reliable, high-quality tools and equipment.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-2">
            With the overwhelming support of our valued customers, we proudly opened our physical store on {company.physicalStore}. Today, the brand offers a wider range of products and a complete, in-store hardware experience.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-2">
            In 2025, the company expanded and re-established its presence in construction services under Zed&apos;s Industrial Builders Corporation, continuing to grow with stronger capabilities and partnerships.
          </p>

          <div className="mt-10 grid border border-hairline bg-hairline sm:grid-cols-2">
            <div className="bg-bg p-6">
              <h3 className="font-heading text-base font-bold uppercase tracking-wide text-ink">Vision</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">To provide high-standard construction and industrial supplies that guarantee customers get their money&apos;s worth, with the tools to tackle every project confidently.</p>
            </div>
            <div className="bg-bg p-6">
              <h3 className="font-heading text-base font-bold uppercase tracking-wide text-ink">Mission</h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">To provide customers with high-standard construction and industrial supplies that deliver reliable value.</p>
            </div>
          </div>

          <p className="mt-6 border-l-4 border-gold-deep bg-bg p-5 text-sm leading-6 text-muted-2">
            <strong className="font-semibold text-ink">Commitment:</strong> Zed&apos;s is committed to keeping customers satisfied through quality products and first-rate service, from inquiry to delivery.
          </p>

          <a href="#services" className="mt-8 inline-flex min-h-12 items-center bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep">Learn More</a>
        </div>
      </div>
      <GrowthTimeline />
    </section>
  );
}
