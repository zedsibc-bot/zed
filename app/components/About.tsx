import { company } from "@/app/data";

export default function About() {
  return (
    <section id="about" className="bg-bg-darker">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div>
          <span className="label-kicker">01 / About Us</span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-ink sm:text-4xl">
            About Us
          </h2>
          <p className="mt-6 text-sm leading-7 text-muted-2">
            {company.name} has been revolutionizing the hardware industry since
            its inception in {company.established}. What began as an online
            store quickly gained popularity among DIY enthusiasts,
            professionals, and homeowners seeking reliable, high-quality tools
            and equipment.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-2">
            With the overwhelming support of our valued customers, we proudly
            opened our physical store on {company.physicalStore}. Today, the
            brand has evolved into {company.fullName}, offering a wider range
            of products and serving customers with a complete, in-store
            hardware experience.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-2">
            In 2025, the company expanded and re-established its presence in
            construction services under Zed&apos;s Industrial Builders
            Corporation (Est. 2025), continuing to grow with expanding
            capabilities, strong partnerships, and a future-focused approach.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="border border-hairline bg-bg p-6">
              <h3 className="font-heading text-base font-bold uppercase tracking-wide text-gold-deep">
                Vision
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                To provide our customers with high-standard construction and
                industrial supplies that guarantee they get their money&apos;s
                worth. Empower individuals with the right tools and equipment
                to bring their ideas to life, tackle projects with confidence,
                and achieve outstanding results.
              </p>
            </div>
            <div className="border border-hairline bg-bg p-6">
              <h3 className="font-heading text-base font-bold uppercase tracking-wide text-gold-deep">
                Mission
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-2">
                To provide our customers with high-standard construction and
                industrial supplies to guarantee they get their money&apos;s
                worth.
              </p>
            </div>
          </div>

          <p className="mt-6 border-l-4 border-gold-deep bg-bg p-5 text-sm leading-6 text-muted-2">
            <strong className="font-semibold text-gold-deep">Commitment:</strong>{" "}
            Zed&apos;s is committed to ensuring that we keep our customers
            satisfied as we provide quality products and first-rate services,
            from inquiry to delivery.
          </p>

          <a
            href="#services"
            className="mt-8 inline-flex min-h-12 items-center bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent hover:text-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}