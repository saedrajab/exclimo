export type IconName =
  | "plane"
  | "briefcase"
  | "sparkles"
  | "route"
  | "clock"
  | "landmark"
  | "shield"
  | "star";

export type ServiceItem = {
  icon: IconName;
  title: string;
  description: string;
};

export const services: ServiceItem[] = [
  {
    icon: "plane",
    title: "Airport Transfers",
    description:
      "Flight-tracked pickups and drop-offs at every airport in the region: Dulles, Reagan National, BWI and the private and regional airfields. Your chauffeur adjusts to delays automatically and meets you curbside or at baggage claim.",
  },
  {
    icon: "briefcase",
    title: "Corporate & Executive Travel",
    description:
      "Discreet, punctual rides to meetings, roadshows and client visits. The cabin is quiet enough to take a call in, and if your 3 o'clock runs long, your car waits.",
  },
  {
    icon: "sparkles",
    title: "Weddings & Special Events",
    description:
      "Weddings, galas, anniversaries, a night at the Kennedy Center: on the days that matter most, the car should be the one thing you never think about. We make sure it is.",
  },
  {
    icon: "route",
    title: "Point-to-Point Rides",
    description:
      "Door-to-door private rides anywhere in the DMV, at rates that compete with premium rideshare and without surge pricing.",
  },
  {
    icon: "clock",
    title: "Early Mornings & Late Nights",
    description:
      "4 a.m. flight? Midnight arrival? We operate around the clock, every day of the year. Your ride is confirmed in advance and waiting before you are.",
  },
  {
    icon: "landmark",
    title: "Government & Diplomatic",
    description:
      "Reliable, low-profile service for official travel across Washington: embassies, federal offices, Capitol Hill. Professionalism you can put on the record.",
  },
];

export const steps = [
  {
    number: "01",
    title: "Request",
    description:
      "Tell us where and when: pickup, drop-off, and your flight details if you're flying. Two minutes online, or one phone call.",
  },
  {
    number: "02",
    title: "Confirm",
    description:
      "Our staff reviews your request and replies with one all-inclusive quote. Tolls and wait time are already in the number, and the number doesn't change.",
  },
  {
    number: "03",
    title: "Ride",
    description:
      "Your chauffeur arrives ahead of schedule in a spotless car. Sit back; from here, getting you there is our responsibility.",
  },
];

export const whyUs: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Licensed & Insured",
    description:
      "Exclimo is fully licensed and commercially insured, and every chauffeur passes a background check.",
  },
  {
    icon: "clock",
    title: "On-Time, Every Time",
    description:
      "We plan the route and watch traffic and flights ahead of time, so your chauffeur is usually there before you are.",
  },
  {
    icon: "route",
    title: "Transparent Quotes",
    description:
      "You get one quote before you ride, at rates competitive with premium rideshare. The price we quote is the price you pay.",
  },
  {
    icon: "star",
    title: "A Private Standard",
    description:
      "We're a private, owner-operated company. Every trip carries our name, and we hold ourselves to that standard.",
  },
];

export const testimonials = [
  {
    quote:
      "My 5:40 a.m. Dulles pickup was outside at 5:25, engine warm, trunk open. That is the whole review.",
    name: "Sarah M.",
    detail: "Northern Virginia · Airport transfer",
  },
  {
    quote:
      "We use Exclimo for every client visit now. The quote is fixed before the ride and the car is spotless. It makes us look good.",
    name: "David K.",
    detail: "Washington, DC · Corporate travel",
  },
  {
    quote:
      "They drove our wedding party between venues all evening without a single hiccup. Our photographer asked for their card.",
    name: "Priya & Alex",
    detail: "Maryland · Special event",
  },
];

export const coverage = {
  regions: [
    { label: "Washington DC", blurb: "The whole District, door to door." },
    { label: "Maryland", blurb: "Anywhere in the state, starting at the DC line." },
    { label: "Virginia", blurb: "All of Northern Virginia and well beyond." },
  ],
  airports: [
    { code: "IAD", name: "Washington Dulles International" },
    { code: "DCA", name: "Ronald Reagan Washington National" },
    { code: "BWI", name: "Baltimore/Washington International" },
  ],
};

export const marqueeItems = [
  "Washington DC",
  "Maryland",
  "Virginia",
  "IAD",
  "DCA",
  "BWI",
  "The whole DMV",
  "Door to door",
];

export const faqs = [
  {
    question: "How is Exclimo priced compared to Uber or Lyft?",
    answer:
      "You get a personal, all-inclusive quote before you ride. Our rates sit in the same range as premium rideshare tiers like Uber Black, but they never surge. Tolls, fuel and wait time are already in the quote, and the quote is what you pay.",
  },
  {
    question: "What areas does Exclimo cover?",
    answer:
      "We serve the whole DMV region (Washington DC, Maryland and Northern Virginia), including every airport in it: Dulles, Reagan National, BWI and the smaller regional airfields. Longer trips outside the region are available on request.",
  },
  {
    question: "Do you track flights for airport pickups?",
    answer:
      "Yes. Give us your airline and flight number when you book and we watch the flight in real time. If you land early or late, your chauffeur adjusts to the new time at no extra charge.",
  },
  {
    question: "Is this instant booking?",
    answer:
      "No, and that's by design. You send a ride request with your trip details, and our staff checks availability and replies with a quote by email or phone, usually within the hour. We don't charge anything until your trip is confirmed.",
  },
  {
    question: "How far in advance should I request a ride?",
    answer:
      "A day's notice guarantees availability, especially for early-morning airport departures. Same-day requests are often possible; call 571-525-6666 and we'll do our best to accommodate you.",
  },
  {
    question: "Are your chauffeurs licensed and insured?",
    answer:
      "Yes. Exclimo, LLC is fully licensed and commercially insured, and every chauffeur passes a background check. Child seats are available on request; just mention it when you book.",
  },
];
