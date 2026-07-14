import { coverage, marqueeItems } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Coverage() {
  return (
    <section
      id="coverage"
      className="dark-band relative scroll-mt-24 overflow-hidden bg-ink text-canvas"
      aria-labelledby="coverage-heading"
    >
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-stone">
            Coverage
          </p>
          <h2 id="coverage-heading" className="display mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
            Everywhere the DMV takes you
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">
            There are no zone maps and no service-area fine print. If your
            trip starts or ends in the DMV, we drive it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {coverage.regions.map((region, i) => (
            <Reveal key={region.label} delay={i * 0.08}>
              <h3 className="border-b border-white/15 pb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone">
                {region.label}
              </h3>
              <p className="mt-5 leading-relaxed text-white/85">{region.blurb}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20" delay={0.1}>
          <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-stone">
            Every airport in the region, every flight tracked
          </h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {coverage.airports.map((airport) => (
              <div key={airport.code} className="flex items-baseline gap-4">
                <span className="display text-5xl">{airport.code}</span>
                <span className="text-sm text-stone">{airport.name}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-stone">
            Flying private or into a regional airport? We cover those as well.
          </p>
        </Reveal>
      </div>

      {/* Area marquee */}
      <div className="relative border-t border-white/10 py-5" aria-hidden>
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex w-max shrink-0 items-center">
            {[...marqueeItems, ...marqueeItems].map((area, i) => (
              <span
                key={`${area}-${i}`}
                className="display mx-6 whitespace-nowrap text-2xl text-white/55"
              >
                {area} <span className="mx-6 text-white/35">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
