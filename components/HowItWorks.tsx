import { steps } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function HowItWorks() {
  return (
    <section className="bg-cloud" aria-labelledby="how-heading">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-mute">
            From request to ride
          </p>
          <h2 id="how-heading" className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
            How it works
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-hairline">
          {steps.map((step, i) => (
            <li key={step.number} className="md:px-10 md:first:pl-0 md:last:pr-0">
              <Reveal delay={i * 0.1}>
                <span
                  className="display block text-8xl text-transparent [-webkit-text-stroke:1.5px_#111111]"
                  aria-hidden
                >
                  {step.number}
                </span>
                <h3 className="display mt-4 text-3xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-mute">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
