import { whyUs } from "@/lib/content";
import { AnimatedIcon, IconHover } from "@/components/animated-icons";
import { Reveal } from "@/components/Reveal";

export function WhyUs() {
  return (
    <section aria-labelledby="why-heading">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-mute">
            The Exclimo difference
          </p>
          <h2 id="why-heading" className="display mt-6 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
            Why the DMV rides with us
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.08, 0.3)}>
              <IconHover className="group">
                <span className="flex size-14 items-center justify-center rounded-full bg-cloud transition-colors duration-300 group-hover:bg-ink group-hover:text-canvas">
                  <AnimatedIcon name={item.icon} size={26} />
                </span>
                <h3 className="mt-5 font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {item.description}
                </p>
              </IconHover>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
