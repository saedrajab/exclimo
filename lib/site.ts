export const site = {
  name: "Exclimo",
  legalName: "Exclimo, LLC",
  tagline: "Private luxury chauffeur service for the DMV",
  // Set NEXT_PUBLIC_SITE_URL in production; falls back to the planned domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.exclimo.com",
  phone: "571-678-9209",
  phoneHref: "tel:+15716789209",
  email: "exclimo1@gmail.com",
  emailHref: "mailto:exclimo1@gmail.com",
  address: {
    street: "1578 Cameron Crescent Dr Ste 12",
    city: "Reston",
    state: "VA",
    zip: "20190",
    full: "1578 Cameron Crescent Dr Ste 12, Reston, VA 20190",
  },
  // Approximate coordinates for Reston, VA 20190
  geo: { lat: 38.9586, lng: -77.357 },
  region: "DC, Maryland & Virginia",
} as const;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Coverage", href: "#coverage" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;
