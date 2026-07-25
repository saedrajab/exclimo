# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

The warning above is real: this repo runs Next.js 16 (App Router) with React 19, Tailwind CSS 4, and zod 4 — all newer than most training data. Check `node_modules/next/dist/docs/` (organized as `01-app/`, `02-pages/`, `03-architecture/`) before using framework APIs you aren't certain about.

## Commands

The package manager is **bun** (`bun.lock`).

- `bun dev` — dev server at http://localhost:3000
- `bun run build` — production build (also the de-facto typecheck gate)
- `bun run lint` — ESLint (flat config, `eslint.config.mjs`)
- `bunx tsc --noEmit` — typecheck only

There is no test suite.

## What this is

A single-page marketing/landing site for Exclimo, a luxury chauffeur service in the DC/Maryland/Virginia (DMV) area. One route: `app/page.tsx` composes the section components from `components/` in visual order (Header → Hero → About → Services → Fleet → HowItWorks → WhyUs → Coverage → Testimonials → Faq → BookingSection → Footer) and inlines LocalBusiness/WebSite/FAQ JSON-LD. SEO surface lives in `app/` as code: `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`, plus `public/llms.txt`.

## Architecture

**Content is data, separated from components.** All marketing copy (services, fleet, steps, whyUs, testimonials, coverage, marquee, FAQs) lives in `lib/content.ts`; business facts (name, phone, address, geo, nav) live in `lib/site.ts`. Components render from these modules — copy edits belong there, not in JSX. Contact details appear in several places beyond `lib/site.ts` (JSON-LD in `page.tsx`, `.env.example`, `public/llms.txt`), so changing a phone/email means sweeping the repo, not editing one file.

**Booking flow** (the only interactive/server feature):
1. `components/BookingSection.tsx` (client) submits to the `sendRideRequest` server action.
2. `lib/actions.ts` (`"use server"`) — silently accepts honeypot submissions (`company` field), validates with zod, rate-limits by IP (in-memory, 5 per 15 min, single-instance only).
3. `lib/booking.ts` — `rideRequestSchema` (zod), `toFieldErrors` (one message per field), `fieldOrder` (drives focus-first-invalid-field in the form), and `buildRideRequestSubject`/`buildRideRequestLines` (plain-text body for the server email).
4. `lib/email.ts` — nodemailer with a cached transport. With `SMTP_*` env vars set it sends for real; without them it uses an Ethereal test inbox in development (emails captured, never delivered, preview URL logged) and throws in production — the client then shows an inline error with the phone number and email address (there is deliberately no `mailto:` fallback; it was removed as unprofessional).

**Env vars** are documented in `.env.example`: `NEXT_PUBLIC_SITE_URL` (canonical URL for sitemap/robots/JSON-LD) and `SMTP_HOST/PORT/USER/PASS`, optional `BOOKING_TO_EMAIL`/`BOOKING_FROM_EMAIL`. Note the `.gitignore` pattern `.env*` also ignores `.env.example` — it exists locally but is not committed.

**Styling** is Tailwind CSS 4 via the PostCSS plugin: there is no `tailwind.config.*`; theme tokens and custom CSS live in `app/globals.css`. The design language (Nike-inspired) is documented in `nike-DESIGN.md`. Animations use the `motion` package (`motion/react`), typically through the `components/Reveal.tsx` scroll-reveal wrapper; icons are `lucide-react` plus custom ones in `components/animated-icons.tsx`.

Imports use the `@/*` alias (repo root).

## Copy conventions

Deliberate wording decisions — keep them when touching user-facing text:

- Coverage is described at region level only ("DC, Maryland & Virginia", "the DMV"). Never enumerate city lists — they imply service limits. The Reston business address is the one allowed specific location.
- Airports are referred to inclusively ("all regional airports"), not by naming specific ones.
- Tone is business-professional ("our staff", not "a real person"); avoid em-dashes in user-facing strings.
