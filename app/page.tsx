import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyUs } from "@/components/WhyUs";
import { Coverage } from "@/components/Coverage";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";
import { faqs, services } from "@/lib/content";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      legalName: site.legalName,
      description:
        "Private luxury chauffeur service covering Washington DC, Maryland and Virginia. Flight-tracked airport transfers, corporate travel and special events with fixed personal quotes, available 24/7.",
      slogan: "Arrive in excellence.",
      url: site.url,
      telephone: "+1-(571) 678-9209",
      email: site.email,
      image: `${site.url}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      areaServed: [
        { "@type": "City", name: "Washington, DC" },
        { "@type": "State", name: "Maryland" },
        { "@type": "State", name: "Virginia" },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      priceRange: "$$",
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: "Washington DC, Maryland and Virginia (DMV)",
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#business` },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: "Exclimo | Private Luxury Chauffeur Service in DC, Maryland & Virginia",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#business` },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Coverage />
        <Testimonials />
        <Faq />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
