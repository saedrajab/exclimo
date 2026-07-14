import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Exclimo | Private Luxury Chauffeur Service in DC, Maryland & Virginia",
    template: "%s | Exclimo",
  },
  description:
    "Exclimo is a private luxury chauffeur service for Washington DC, Maryland and Virginia. Flight-tracked transfers at every regional airport (IAD, DCA, BWI and more), corporate travel and special events, with one fixed quote before every ride. Available 24/7. Call (571) 678-9209.",
  keywords: [
    "private chauffeur service DMV",
    "luxury car service Washington DC",
    "black car service Northern Virginia",
    "airport transfer Dulles IAD",
    "airport car service Reagan National DCA",
    "BWI airport transfer",
    "corporate car service DC",
    "wedding transportation Maryland",
    "chauffeur Reston VA",
    "Uber Black alternative DMV",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: "Exclimo | Private Luxury Chauffeur Service in the DMV",
    description:
      "Airport transfers, corporate travel and special events across DC, Maryland and Virginia. One fixed quote before every ride, around the clock.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclimo | Private Luxury Chauffeur Service in the DMV",
    description:
      "Private chauffeured rides across DC, Maryland and Virginia, with a fixed quote before every trip. Call (571) 678-9209.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: site.name,
  creator: site.legalName,
  publisher: site.legalName,
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-canvas text-ink">
        <a
          href="#home"
          className="sr-only z-[100] rounded-full bg-ink px-6 py-3 text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
