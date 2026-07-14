"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-cloud" aria-labelledby="faq-heading">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-mute">
              FAQ
            </p>
            <h2 id="faq-heading" className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
              Questions, answered
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-mute">
              Anything else? Call{" "}
              <a href={site.phoneHref} className="font-medium text-ink underline underline-offset-4">
                {site.phone}
              </a>{" "}
              and our staff will answer.
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            {faqs.map((faq, i) => {
              const open = openIndex === i;
              return (
                <Reveal key={faq.question} delay={Math.min(i * 0.05, 0.25)}>
                  <div className="border-b border-hairline">
                    <h3>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-6 py-6 text-left font-medium"
                        aria-expanded={open}
                        aria-controls={`faq-panel-${i}`}
                        onClick={() => setOpenIndex(open ? null : i)}
                      >
                        {faq.question}
                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-label={faq.question}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 leading-relaxed text-mute">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
