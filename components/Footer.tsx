import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="dark-band bg-ink text-canvas">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center bg-canvas">
                <span className="display text-xl leading-none text-ink">E</span>
              </span>
              <span className="display text-2xl tracking-[0.08em]">Exclimo</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed text-stone">
              {site.tagline}. Licensed, insured, and on the road in Washington DC,
              Maryland and Virginia around the clock.
            </p>
          </div>

          <nav aria-label="Footer, explore" className="lg:col-span-2">
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-stone">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-white/85 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer, services" className="lg:col-span-2">
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-stone">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-white/85 hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-stone">
              Contact
            </h3>
            <address className="mt-5 space-y-3 not-italic">
              <p className="text-white/85">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p>
                <a href={site.phoneHref} className="text-white/85 hover:underline">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={site.emailHref} className="text-white/85 hover:underline">
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>
          <p>Licensed &amp; insured · Serving DC, Maryland &amp; Virginia</p>
          <a href="#home" className="hover:underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
