"use client";

import { motion, useReducedMotion } from "motion/react";
import { PlaneTakeoff, ReceiptText } from "lucide-react";
import { site } from "@/lib/site";

const GLASS_D =
  "M150 112C160 101 178 90 200 84C228 78 258 77 284 81C306 87 330 99 346 110C290 106 210 108 150 112Z";

function SedanArt() {
  const reduce = useReducedMotion();
  const draw = (delay: number, duration = 1.5) => ({
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration, delay: reduce ? 0 : delay, ease: "easeInOut" as const },
  });
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, delay: reduce ? 0 : delay, ease: "easeOut" as const },
  });

  return (
    <svg
      viewBox="0 54 580 148"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full text-canvas"
      role="img"
      aria-label="Line drawing of a luxury sedan"
    >
      {/* ground fades in — a pathLength draw would override the dash pattern */}
      <motion.path d="M28 190H552" strokeOpacity="0.25" strokeDasharray="2 10" {...fade(1.5)} />
      {/* body silhouette: rear bumper, trunk, roofline, hood, nose, wheel arches */}
      <motion.path
        d="M66 177C52 172 46 162 49 151C51 143 57 136 66 131C80 124 95 121 110 120C138 103 158 88 178 80C208 70 258 68 290 74C312 79 342 97 360 112C368 116 378 118 390 119C420 121 452 122 476 125C492 127 505 132 511 139C516 146 519 153 519 160C519 169 513 175 503 178L459 178A34 34 0 1 0 397 178L181 178A34 34 0 1 0 119 178L66 177Z"
        {...draw(0, 1.9)}
      />
      {/* glass tint + greenhouse outline + B-pillar */}
      <motion.path d={GLASS_D} fill="rgb(255 255 255 / 0.05)" stroke="none" {...fade(1.6)} />
      <motion.path d={GLASS_D} strokeOpacity="0.85" {...draw(0.35)} />
      <motion.path d="M291 81L287 110" strokeWidth="1.75" strokeOpacity="0.85" {...draw(0.7, 0.5)} />
      {/* door seams */}
      <motion.path d="M389 120C388 138 387 156 386 172" strokeWidth="1.5" strokeOpacity="0.45" {...draw(0.8, 0.7)} />
      <motion.path d="M287 114C286 134 285 154 284 172" strokeWidth="1.5" strokeOpacity="0.45" {...draw(0.85, 0.7)} />
      <motion.path d="M196 116C195 134 194 152 193 170" strokeWidth="1.5" strokeOpacity="0.45" {...draw(0.9, 0.7)} />
      {/* door handles + mirror */}
      <motion.path d="M295 125L319 125" strokeWidth="1.75" strokeOpacity="0.8" {...draw(1.05, 0.4)} />
      <motion.path d="M204 126L228 126" strokeWidth="1.75" strokeOpacity="0.8" {...draw(1.1, 0.4)} />
      <motion.path
        d="M366 110C367 104 373 101 378 103C381 105 379 109 373 110C370 111 367 111 366 110Z"
        fill="currentColor"
        stroke="none"
        {...fade(0.95)}
      />
      {/* shoulder line between the arches */}
      <motion.path d="M188 145C260 141 330 140 392 143" strokeWidth="1.5" strokeOpacity="0.25" {...draw(1.15, 1)} />
      {/* headlight + taillight: filled slivers hugging the body edges */}
      <motion.path
        d="M481 129C492 129 503 134 509 141C510 143 508 144 505 143C497 138 488 133 480 131C478 130 479 129 481 129Z"
        fill="currentColor"
        fillOpacity="0.9"
        stroke="none"
        {...fade(1.2)}
      />
      <motion.path
        d="M67 128C60 131 55 136 52 143C51 145 53 146 55 145C59 139 63 134 69 130C71 129 69 128 67 128Z"
        fill="currentColor"
        fillOpacity="0.9"
        stroke="none"
        {...fade(1.25)}
      />
      {/* wheels: tire, rim, hub, five spokes */}
      {[150, 428].map((cx, i) => (
        <g key={cx} transform={`translate(${cx} 164)`}>
          <motion.circle r="26" {...draw(0.5 + i * 0.15)} />
          <motion.circle r="16" strokeWidth="1.5" strokeOpacity="0.75" {...draw(0.7 + i * 0.15)} />
          <motion.circle r="4.5" strokeWidth="1.5" strokeOpacity="0.6" {...draw(0.85 + i * 0.15)} />
          <motion.path
            d="M0 -5L0 -14.5M4.8 -1.6L13.8 -4.5M2.9 4L8.5 11.7M-2.9 4L-8.5 11.7M-4.8 -1.6L-13.8 -4.5"
            strokeWidth="1.5"
            strokeOpacity="0.55"
            {...draw(0.95 + i * 0.15, 0.8)}
          />
        </g>
      ))}
    </svg>
  );
}

function FloatingCard({
  className,
  delay,
  children,
}: {
  className?: string;
  delay: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-md ${className}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="dark-band relative overflow-hidden bg-ink text-canvas"
      aria-labelledby="hero-heading"
    >
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_0%,rgb(255_255_255/0.10),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              className="text-xs font-medium uppercase tracking-[0.35em] text-stone"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Private chauffeur service · DC · MD · VA
            </motion.p>

            <motion.h1
              id="hero-heading"
              className="display mt-6 text-[64px] sm:text-8xl lg:text-[104px]"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Arrive in
              <br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.9)]">
                excellence.
              </span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-lg leading-relaxed text-stone"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              Exclimo is a private chauffeur company serving the DMV. You get
              the comfort of a professionally chauffeured car at rates that
              compete with premium rideshare, from a team that answers its
              own phone.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <a
                href="#book"
                className="flex h-12 items-center rounded-full bg-canvas px-8 font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95"
              >
                Request a ride
              </a>
              <a
                href={site.phoneHref}
                className="flex h-12 items-center gap-2 rounded-full border border-white/25 px-8 font-medium text-canvas transition-colors hover:bg-white/10"
              >
                Call {site.phone}
              </a>
            </motion.div>

            <motion.dl
              className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-white/10"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                ["24/7", "Available every day"],
                ["All", "Airports in the region"],
                ["0", "Surge pricing, ever"],
              ].map(([stat, label]) => (
                <div key={label} className="px-5 first:pl-0">
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="display block text-4xl">{stat}</span>
                    <span className="mt-1 block text-xs font-medium text-stone">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <div className="relative hidden lg:col-span-5 lg:block">
            {/* py reserves clear zones above and below the car for the cards */}
            <div className="py-24">
              <SedanArt />
            </div>
            <FloatingCard className="right-0 top-0" delay={2}>
              <PlaneTakeoff size={22} aria-hidden />
              <span className="text-sm">
                <strong className="block font-medium">Flight-tracked pickups</strong>
                <span className="text-stone">IAD · DCA · BWI and more</span>
              </span>
            </FloatingCard>
            <FloatingCard className="bottom-0 left-0" delay={2.2}>
              <ReceiptText size={22} aria-hidden />
              <span className="text-sm">
                <strong className="block font-medium">Fixed quote before you ride</strong>
                <span className="text-stone">It never surges.</span>
              </span>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
