import Image from "next/image";
import { fleet } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { TiltedCard } from "@/components/TiltedCard";

export function Fleet() {
  return (
    <section
      id="fleet"
      className="scroll-mt-24 bg-ink text-canvas"
      aria-labelledby="fleet-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/55">
            The fleet
          </p>
          <h2 id="fleet-heading" className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
            Chauffeured excellence.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {fleet.map((vehicle, i) => (
            <Reveal key={vehicle.name} delay={Math.min(i * 0.08, 0.3)}>
              <TiltedCard>
                <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.04]">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.name}, ${vehicle.category.toLowerCase()}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </TiltedCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
