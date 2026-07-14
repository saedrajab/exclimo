import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { AnimatedIcon, IconHover } from "@/components/animated-icons";
import { Reveal } from "@/components/Reveal";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-canvas" aria-labelledby="services-heading">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-mute">
              What we drive
            </p>
            <h2 id="services-heading" className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
              Services
            </h2>
          </div>
          <a
            href="#book"
            className="group flex items-center gap-2 font-medium underline-offset-8 hover:underline"
          >
            Request a ride
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </Reveal>

        <div className="mt-14 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={Math.min(i * 0.06, 0.3)} className="h-full">
              <IconHover className="group flex h-full flex-col bg-canvas">
                <div className="flex h-44 items-center justify-center bg-cloud text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-canvas">
                  <AnimatedIcon name={service.icon} size={44} strokeWidth={1.5} />
                </div>
                <div className="flex flex-1 flex-col px-1 pb-10 pt-5">
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    {service.description}
                  </p>
                  <a
                    href="#book"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                    aria-label={`Request a ride, ${service.title}`}
                  >
                    Request this ride
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                </div>
              </IconHover>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
