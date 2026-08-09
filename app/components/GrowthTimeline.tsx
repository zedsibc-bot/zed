import { growthTimeline } from "@/app/data";
import { BoltIcon, CheckIcon, GearIcon, PumpIcon, WrenchIcon } from "./icons";

const timelineIcons = [GearIcon, WrenchIcon, PumpIcon, BoltIcon, CheckIcon];

export default function GrowthTimeline() {
  return (
    <div className="mx-auto mt-24 max-w-7xl px-6">
      <section aria-labelledby="growth-title" className="border-y border-hairline bg-bg-darker">
        <div className="grid gap-5 border-b border-hairline px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end lg:gap-16">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              Company History
            </p>
            <h2
              id="growth-title"
              className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-ink sm:text-4xl"
            >
              Our Growth
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-2">
            From a trusted tools depot to an expanding construction and
            industrial supply business.
          </p>
        </div>

        <div className="relative px-6 py-4 sm:px-10 sm:py-6">
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[4.25rem] top-10 w-px bg-ink lg:left-[13.35rem]"
          />
          <ol>
            {growthTimeline.map((milestone, index) => {
              const Icon = timelineIcons[index];

              return (
                <li
                  key={milestone.number}
                  className="relative grid grid-cols-[3rem_2.5rem_minmax(0,1fr)] gap-x-4 border-b border-hairline py-7 last:border-b-0 lg:grid-cols-[10rem_3.5rem_minmax(0,1fr)] lg:gap-x-8 lg:py-9"
                >
                  <div className="col-start-1 row-start-1 pt-1 lg:text-right">
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">
                      {milestone.number}
                    </p>
                    <p className="mt-1 font-heading text-sm font-bold tracking-wide text-ink">
                      {milestone.year}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="col-start-2 row-start-1 z-10 flex h-10 w-10 items-center justify-center border border-ink bg-gold text-ink"
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="col-start-3 row-start-1 max-w-2xl">
                    <h3 className="font-heading text-base font-bold uppercase tracking-wide text-ink sm:text-lg">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-2">
                      {milestone.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div aria-hidden="true" className="h-1 bg-gold" />
      </section>
    </div>
  );
}
