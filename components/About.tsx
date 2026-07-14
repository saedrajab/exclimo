import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const checklist = [
  "Licensed & commercially insured",
  "Background-checked chauffeurs",
  "Flight tracking on every airport trip",
  "All-inclusive personal quotes",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24" aria-labelledby="about-heading">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-mute">
              About Exclimo
            </p>
            <h2 id="about-heading" className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
              A private company.
              <br />
              A personal standard.
            </h2>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-charcoal">
                Rideshare solved getting a car. It never solved knowing the car
                will actually be there at 4:45 on a Tuesday morning. That
                certainty is what we sell.
              </p>
              <p className="mt-5 leading-relaxed text-mute">
                We&apos;re a private, owner-operated chauffeur company based in
                Reston, Virginia, and we drive all of Washington DC, Maryland and
                Northern Virginia. Our staff reviews every request and sends
                back a single quote. A professional chauffeur does the driving.
                The price never changes after you book.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink">
                      <Check size={13} className="text-canvas" aria-hidden />
                    </span>
                    <span className="text-[15px] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
