"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";

function Wordmark() {
  return (
    <a href="#home" className="flex items-center gap-3" aria-label="Exclimo, home">
      <span className="flex size-9 items-center justify-center bg-ink">
        <span className="display text-xl leading-none text-canvas">E</span>
      </span>
      <span className="display text-2xl tracking-[0.08em]">Exclimo</span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 sm:-top-9">
      {/* Utility bar */}
      <div className="hidden h-9 items-center bg-cloud text-xs font-medium sm:flex">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <p className="text-charcoal">
            Serving Washington DC · Maryland · Virginia · 24/7
          </p>
          <div className="flex items-center gap-6">
            <a href={site.phoneHref} className="hover:underline">
              {site.phone}
            </a>
            <a href={site.emailHref} className="hover:underline">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <div
        className={`bg-canvas transition-shadow ${
          scrolled ? "shadow-[inset_0_-1px_0_var(--hairline-soft)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Wordmark />

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium underline-offset-8 hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-[15px] font-medium xl:flex"
            >
              <Phone size={16} aria-hidden />
              {site.phone}
            </a>
            <a
              href="#book"
              className="hidden h-11 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-canvas transition-transform hover:scale-[1.03] active:scale-95 sm:flex"
            >
              Request a Ride
            </a>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full bg-cloud lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-canvas px-6 pb-10 pt-6 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display border-b border-hairline-soft py-5 text-4xl"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4 pt-10">
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center rounded-full bg-ink px-8 font-medium text-canvas"
            >
              Request a Ride
            </a>
            <a
              href={site.phoneHref}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-cloud px-8 font-medium"
            >
              <Phone size={16} aria-hidden /> {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
