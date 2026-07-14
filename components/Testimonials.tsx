import { Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-mute">
            Word of mouth
          </p>
          <h2 id="testimonials-heading" className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
            What riders say
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-2 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i * 0.08, 0.24)} className="h-full">
              <figure className="flex h-full flex-col bg-cloud p-8">
                <div className="flex gap-1" aria-label="5 out of 5 stars" role="img">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} className="fill-ink text-ink" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <span className="block font-medium">{t.name}</span>
                  <span className="mt-0.5 block text-sm text-mute">{t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
